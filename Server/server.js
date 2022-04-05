const express = require("express")
const app = express();
const http = require("http")
const server = http.createServer(app);
const { MongoClient, ServerApiVersion } = require('mongodb');
const io = require('socket.io')(server);
app.use(express.json());
var polyline = require("@mapbox/polyline");

const TOKEN_SIZE = 8;

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
  /*alpha = "abcdefghijklmnopqrstuvwxyz";
  elements = alpha.split("").concat(alpha.toUpperCase().split(""));*/
  elements = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~:/?#[]@!$&'()*+,;=".split("");

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

app.post("/create", async(req, res) => {
  username = req.body["name"];
  token = await generateUserToken();

  db = client.db("TW4");
  collec = db.collection("user");
  ins = await collec.insertOne({"username": username, "token": token, "trips": []})
  console.log(ins);
  res.json({"token": token});
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

function getCompleteRoute(L, startPoint, callback) {
  L = [startPoint].concat(L);
  points = "";
  for (p of L) {
    points += p[0].toString() + "," + p[1].toString();
    points += ";"
  }
  points = points.substring(0, points.length-1);

  httpRequest(`http://router.project-osrm.org/trip/v1/foot/${points}?source=first&geometries=polyline`, data => {
    geometry = JSON.parse(data).trips[0].geometry;
    callback(polyline.decode(geometry));
  });
}
//getCompleteRoute([[2.1484799385071, 43.925579071045], [2.1436800956726, 43.929229736328]], [2.14513, 43.92274], res => console.log(res));
  
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
  socket.on("Itineraire",(obj)=>{
    console.log(obj);
  });
})
// TODO: AJouter les joueurs dans un JSON pour les déconnections
