const express = require("express")
const app = express();
const http = require("http");
const server = http.createServer(app);
const { MongoClient, ServerApiVersion } = require('mongodb');
const io = require('socket.io')(http);
app.use(express.json());
var polyline = require("@mapbox/polyline");


var players = new Set()

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

const uri = "mongodb+srv://Projet-TW-4:DkTLkWo7BXmN1Ua@cluster0.lbkjq.mongodb.net/TW4?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect();


app.get("/test", async (req, res) => {
  res.json({"ca marche": "oui"});

  db = client.db("TW4");
  collec = db.collection("test");
  collec.insertMany([{"a": 3, "b": 4}]).then((ins) => {
    console.log(ins);
  });
});

app.get("/listPlaces", async(req, res) => {
  db = client.db("TW4");
  collec = db.collection("places");

  places = await collec.find({}).toArray();

  res.json(places);
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
  });

  //res.json({"nope": "nope"});
});

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
	})
});

// TODO: AJouter les joueurs dans un JSON pour les déconnections
