const express = require("express")
const app = express();
const http = require("http").createServer(app);

app.get("/test", (req, res) => {
	res.json({"ca marche": "oui"});
});

http.listen(3000, () => {
	console.log("listening on *:3000");
});
