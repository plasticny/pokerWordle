const fs = require("fs");
const Random = require("../util/Random");

// pattern that player need to guess
function PokerPattern(_face_pattern, _rank_pattern) {
    var face_pattern;
    var rank_pattern;

    this.equals = equals;
    this.doMatch = doMatch;
    this.toString = toString;
    this.getFacePattern = () => { return face_pattern; }
    this.getRankPattern = () => { return rank_pattern; }

    construct();
    return;


    function construct() {
        const GAME_DATA = JSON.parse(fs.readFileSync(router.getServerRoot()+"\\pokerWordle\\gameData.json"));
        
        // randomly generate a pattern
        let getRanInt = Random.getRanInt;
        face_pattern = _face_pattern || GAME_DATA.pattern.faces[getRanInt(0, GAME_DATA.pattern.faces.length)];
        rank_pattern = _rank_pattern || GAME_DATA.pattern.ranks[getRanInt(0, GAME_DATA.pattern.ranks.length)];
    }


    //////////////////////////////////////////////////
    /*************** public function ****************/

    function toString() {
        return face_pattern + " " + rank_pattern;
    }

    // params: other pokerPattern obj
    function equals(pokerPattern) {
        return face_pattern == pokerPattern.getFacePattern() && rank_pattern == pokerPattern.getRankPattern();
    }

    function doMatch(poker) {
        return doFaceMatch(poker.face) && doRankMatch(poker.rank);
    }


    //////////////////////////////////////////////////
    /*************** private function ***************/

    function doFaceMatch(face) {
        switch(face_pattern) {
            case "any":
                return true;
            case "red":
                return face == "D" || face == "H";
            case "black":
                return face == "S" || face == "C";
            default:
                return face === face_pattern;
        }
    }

    function doRankMatch(rank) {
        switch(rank_pattern) {
            case "odd":
                return rankToNumber(rank)%2 == 1;
            case "even":
                return rankToNumber(rank)%2 == 0;
            case "number":
                return isRankNumber(rank);
            case "notNumber":
                return !isRankNumber(rank);
            case "any":
                return true;
            default:
                console.error("[PokerPattern.doRankMatch] unknown rank pattern", rank_pattern);
                return false;
        }
    }

    function rankToNumber(rank) {
        switch(rank) {
            case "A":   return 1;
            case "J":   return 11;
            case "Q":   return 12;
            case "K":   return 13;
            default:    return Number(rank);
        }
    }

    function isRankNumber(rank) {
        switch(rank) {
            case "A":
            case "J":
            case "Q":
            case "K":
                return false;
            default:
                return true;
        }
    }
}
module.exports = PokerPattern;