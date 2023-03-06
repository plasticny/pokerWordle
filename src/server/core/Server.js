const express = require("express");
const Action = require("./Action.js");
const Router = require("./router.js");
const SessionController = require("./SessionController.js");

const doPublicServer = false;
const PORT = 8888;
const IP = 	"192.168.0.107";
// IPv4 218.252.62.18

// express
const app = express();

// router
global.router = new Router(app);

// session controller
global.sessionController = new SessionController();

// action
Action(app);

// start server
if(doPublicServer) {
    app.listen(PORT, IP);
} else {
    app.listen(PORT);
}

console.log("Server started")
console.log("Src Root:", router.getSrcRoot());
console.log("Port:", PORT);
console.log("IP:", doPublicServer ? IP : "Not Public");
console.log("**************** LOG START *****************");