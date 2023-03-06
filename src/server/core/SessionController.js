const uuid = require("uuid");
const Logger = require("./Logger");

function SessionController() {
    // key: session id (Number), value: session obj
    var session_map = new Map();

    this.newSession = newSession;
    this.getSession = getSession;
    this.countSession = countSession;
    this.deleteSession = deleteSession;
    this.isSessionExist = isSessionExist;

    return;


    function newSession(session_obj) {
        let new_uuid = uuid.v4();
        session_map.set(new_uuid, session_obj);
        Logger.logNewSession(new_uuid);
        return new_uuid;
    }

    function getSession(sid) {
        return session_map.get(sid);
    }

    function countSession() {
        return session_map.size;
    }

    function deleteSession(sid) {
        session_map.delete(sid);
        Logger.logDeleteSession(sid);
    }

    function isSessionExist(sid) {
        return session_map.has(sid);
    }
}
module.exports = SessionController;