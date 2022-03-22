const express = require("express")
const app = express();
const http = require("http").createServer(app);
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://Projet-TW-4:DkTLkWo7BXmN1Ua@cluster0.lbkjq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect();


app.get("/test", async (req, res) => {
  res.json({"ca marche": "oui"});

  db = client.db("TW4");
  collec = db.collection("test");
  collec.insertMany([{"a": 1, "b": 2}]).then((ins) => {
    console.log(ins);
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
