const express = require("express")
const app = express();
const http = require("http")
const server = http.createServer(app);
const { MongoClient, ServerApiVersion } = require('mongodb');
const io = require('socket.io')(server);
app.use(express.json());
var polyline = require("@mapbox/polyline");
var QRCode = require('qrcode');

const TOKEN_SIZE = 8;
const BASE_URL = "http://localhost:3000";

var players = new Set()

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const uri = "mongodb+srv://Projet-TW-4:DkTLkWo7BXmN1Ua@cluster0.lbkjq.mongodb.net/TW4?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect();


function httpRequest(URL, callback) {
  http.get(URL, resp => {
    data = "";

    resp.on("data", chunk => {
      data += chunk
    });

    resp.on("end", () => {
      callback(data);
    });
  });
}

function newPassword(alreadyUsed) {
  elements = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~:?#[]@!$&'()*+,;=".split("");

  pass = "";

  do {
    pass = "";

    for (i = 0; i < TOKEN_SIZE; i++) {
      pass += elements[Math.floor(Math.random()*elements.length)];
    }
  } while (alreadyUsed.includes(pass));

  return pass;
}

async function generateUserToken() {
  db = client.db("TW4");
  collec = db.collection("user");
  res = await collec.find({}).toArray();
  return newPassword(res.map(e => e.token))
}

app.get("/listPlaces", async(req, res) => {
  db = client.db("TW4");
  collec = db.collection("places");

  places = await collec.find({}).toArray();

  res.json(places);
});

async function alreadyExist(username) {
  db = client.db("TW4");
  collec = db.collection("user");
  res = await collec.find({"username": username}).toArray();
  return res.length != 0;
}

app.post("/create", async(req, res) => {
  username = req.body["name"];
  if (await alreadyExist(username)) {
    res.statusCode = 404;
    res.send("User already exist");
  } else {
    token = await generateUserToken();

    db = client.db("TW4");
    collec = db.collection("user");
    ins = await collec.insertOne({"username": username, "token": token, "trips": []});
    res.json({"token": token});
  }
});

app.post("/getUserInfo", async(req, res) => {
  token = req.body["token"];

  db = client.db("TW4");
  collec = db.collection("user");
  user_infos = await collec.find({token: token}).toArray();
  res.json(user_infos);
});

app.get("/conn/:token", async(req, res) => {
  console.log("conn");
  res.sendFile(__dirname + "/static/connection.html");
});

app.get("/qrcode/:token", async(req, res) => {
  base64 = await QRCode.toDataURL(BASE_URL + "/conn/" + req.params.token);
  im = base64.split(",")[1];
  img = Buffer.from(im, "base64");

  res.writeHead(200, {
    "Content-Type": "image/png",
    "Content-Length": img.length
  });
  res.end(img);
});

app.post("/getRoute", (req, res) => {
  empl1 = req.body[0];
  empl2 = req.body[1];
  console.log(empl1, empl2);

  http.get(`http://router.project-osrm.org/route/v1/foot/${empl1[0]},${empl1[1]};${empl2[0]},${empl2[1]}?overview=simplified&geometries=polyline`, resp => {
    data = "";

    resp.on("data", chunk => {
      data += chunk
    });

    resp.on("end", () => {
      geometry = JSON.parse(data).routes[0].geometry;
      res.json(polyline.decode(geometry));
    });

  })
  //res.json({"nope": "nope"});
});

app.post("/getAvis", async(req, res) => {
  id = req.body["id"];
  db = client.db("TW4");
  collec = db.collection("avis");
  avisL = await collec.find({id_lieu: id}).toArray();
  toSend = []
  for (a of avisL) {
    toSend.push(a["avis"])
  }
  res.json(toSend);
});

app.post("/addAvis", async(req, res) => {
  id = req.body["id"];
  avisL = req.body["avis"];

  db = client.db("TW4");
  collec = db.collection("avis");
  for (avis of avisL) {
    if (avis["nom"] == null) {
      await collec.insertOne({id_lieu: id, avis: avis});
    } else {
      await collec.replaceOne(
        {"id_lieu": id, "avis.nom": avis["nom"]}, // Filtre pour remplacer l'avis si il existe déjà
        {id_lieu: id, avis: avis}, // Le nouvel avis
        {upsert: true}); // Créer un nouvel avis si le filtre ne trouve pas de query correspondante
    }
  }

  res.json(req.body);
});

app.post("/saveTrip", async(req, res) => {
  tokenU = req.body["tokenUser"];
  tripName = req.body["TripName"]
  List = req.body["List"]

  db = client.db("TW4");
  collec = db.collection("user");

  await collec.updateOne(
    {token: tokenU},
    {$set: {tripName: List}}
  );

  res.send("ok");

});

function getCompleteRoute(L, startPoint, callback) {
  console.log("_________________");
  L = [startPoint].concat(L);
  points = "";
  for (p of L) {
    points += p[0].toString() + "," + p[1].toString();
    points += ";"
  }
  
  points = points.substring(0, points.length-1);
  console.log(points);
  httpRequest(`http://router.project-osrm.org/trip/v1/foot/${points}?source=first&geometries=polyline&roundtrip=false&destination=last` /*`http://127.0.0.1:5000/trip/v1/foot/${points}?source=first&geometries=polyline&roundtrip=false&destination=last`*/, data => {
    console.log(data);
    geometry = JSON.parse(data).trips[0].geometry;
    callback(polyline.decode(geometry));
  });
}
//getCompleteRoute([[2.1484799385071, 43.925579071045], [2.1436800956726, 43.929229736328]], [2.14513, 43.92274], res =>console.log(res));

server.listen(3001, () => {
  console.log("listening on *:3001");
});

io.on("connection", (socket) => {
  if (players.size < 2) {
    players.add(socket.id);
    console.log("Someone joinned: " + (players.size).toString() + " player(s)");

    socket.on("test", (arg) => {
      io.emit("pressed", data=[socket.id, arg]);
    });
  };

  socket.on("disconnect", (socket) => {
    players.delete(socket.id);
    console.log("Someone left: " + (players.size).toString() + " player(s)");
  });
  socket.on("Itineraire",function(obj, callback){
    var startPoint=obj.location;
    var L=obj.Itineraire
    getCompleteRoute(L,startPoint,res =>  callback(res))
    //console.log("go");
    //console.log(r);
  });
})
// TODO: AJouter les joueurs dans un JSON pour les déconnections
