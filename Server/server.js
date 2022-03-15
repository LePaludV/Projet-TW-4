const express = require("express")
const app = express();
const http = require("http").createServer(app);

app.get("/test", (req, res) => {
	res.json({"ca marche": "oui"});
});

http.listen(3001, () => {
	console.log("listening on *:3001");
});
