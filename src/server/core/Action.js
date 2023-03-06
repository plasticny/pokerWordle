const PokerWordleAction = require("../pokerWordle/PokerWordleAction");
const Logger = require("./Logger");

function Action(app) {
    var instance = this;

    this.setAction = setAction;

    init();
    return;

    function init() {
        PokerWordleAction(instance);
    }


    //////////////////////////////////////////////////
    /**************** public function ***************/

    function setAction(url, action) {
        app.get(url, (req, res) => {
            Logger.logReq(req);
            action(req, res);
        });
    }
}
module.exports = Action;