class Logger {
    static logReq(req) {
        console.log("[" + new Date().toLocaleString() + "] " + req.ip + " " + req.url);
    }

    static logNewSession(uuid) {
        console.log(
            "[" + new Date().toLocaleString() + "] {New Session} "+uuid+" ("+sessionController.countSession()+")"
        );
    }

    static logDeleteSession(sid) {
        console.log(
            "[" + new Date().toLocaleString() + "] {Delete Session} "+sid+" ("+sessionController.countSession()+")"
        );
    }
}
module.exports = Logger;