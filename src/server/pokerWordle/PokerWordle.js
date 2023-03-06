const fs = require("fs");
const Poker = require("./Poker");
const Random = require("../util/Random");
const PokerPattern = require("./PokerPattern");

const DRAW_CARD_AMT = 10;

// a poker wordle game
function PokerWordle() {
    // type of poker, json data
    var POKER_DATA;

    var pattern_ans_ls;
    var cur_patt_idx;

    var card_ls = new Array();

    this.drawCard = drawCard;
    this.guessPattern = guessPattern;
    this.doPatternMatch = doPatternMatch;

    construct();
    return;

    function construct() {
        POKER_DATA = JSON.parse(fs.readFileSync(router.getServerRoot()+"\\pokerWordle\\gameData.json")).poker;

        let pattern = new PokerPattern();
        // console.warn(pattern.toString());

        pattern_ans_ls = [pattern];
        cur_patt_idx = 0;

        initCardLs();
    }


    /////////////////////////////////////////////////
    /*************** public function ***************/

    // draw card from card pool
    // RETURN a list of card & number of remaining card;
    function drawCard() {        
        let drawCard_ls = new Array();
        for(let idx = 0; idx < DRAW_CARD_AMT && card_ls.length > 0; ++idx) {
            // pokerRecord { face, rank }
            let pokerRecord = card_ls.pop();
            drawCard_ls.push(pokerRecord);
        }
        return drawCard_ls;
    }

    // return the guessing is correct or not
    function guessPattern(pokerPattern) {
        return pattern_ans_ls[cur_patt_idx].equals(pokerPattern);
    }
    
    function doPatternMatch(poker) {
        return pattern_ans_ls[cur_patt_idx].doMatch(poker);
    }


    /////////////////////////////////////////////////
    /*************** private function **************/

    function initCardLs() {
        card_ls = new Array();

        // the card ls will contain poker in order
        for(let face of POKER_DATA.faces) {
            for(let rank of POKER_DATA.ranks) {
                card_ls.push(new Poker(face, rank));
            }
        }

        // random the card order
        card_ls = Random.randomizeArray(card_ls);
    }
}
module.exports = PokerWordle;