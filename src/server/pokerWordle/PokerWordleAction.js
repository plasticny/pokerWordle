const PokerWordle = require("../pokerWordle/PokerWordle");
const Poker = require("./Poker");
const PokerPattern = require("./PokerPattern");

// handling action of poker wordle
function PokerWordleAction(action) {
    this.startGame = startGame;

    construct();
    return;

    function construct() {
        action.setAction("/action/pokerWordle/startGame", startGame);
        action.setAction("/action/pokerWordle/checkMatch", checkMatch);
        action.setAction("/action/pokerWordle/drawCard", drawCard);
        action.setAction("/action/pokerWordle/guessPattern", guessPattern);
    }


    ///////////////////////////////////////////////
    /****************** Action *******************/


    // start Game
    // request data: 
    //      stored_sid: the sid stored in the client storage
    function startGame(req, res) {
        // if client already store a sid, end that session first
        const {stored_sid} = req.query;
        if(stored_sid != null && sessionController.isSessionExist(stored_sid)) {
            sessionController.deleteSession(stored_sid);
        }

        // start new game session
        let sid = sessionController.newSession(new PokerWordle());
        res.send({sid: sid});
    }

    function checkMatch(req, res) {
        const { sid, face, rank } = req.query;

        if(sid == null) { errorSidNotGiven(res); return; }

        let game = sessionController.getSession(sid);
        if(game == null) { errorGameSessionNotExist(res); return; }

        res.send(game.doPatternMatch(new Poker(face, rank)));
        return;
    }

    function drawCard(req, res) {
        const {sid} = req.query;

        if(sid == null) { errorSidNotGiven(res); return; }

        let game = sessionController.getSession(sid);
        if(game == null) { errorGameSessionNotExist(res); return; }

        res.send(game.drawCard());
        return;
    }

    function guessPattern(req, res) {
        const {sid, guess_face, guess_rank} = req.query;

        if(sid == null) { errorSidNotGiven(res); return; }

        let game = sessionController.getSession(sid);
        if(game == null) { errorGameSessionNotExist(res); return; }

        res.send({doGuessCorrect: game.guessPattern(new PokerPattern(guess_face, guess_rank))});
        return;
    }
    

    ///////////////////////////////////////////////
    /************* Private function **************/

    function errorSidNotGiven(res) {
        // response error if game session id is not given
        res.status(400).send(
            "[PokerWordleAction] sid not given"
        );
    }

    function errorGameSessionNotExist(res) {
        // response error if game session id is not given
        res.status(400).send(
            "[PokerWordleAction] game session of given sid not exist"
        );
    }
}
module.exports = PokerWordleAction;