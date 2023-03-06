(function() {
    const $pokerCardWrapper = $("#poker-card-wrapper");
    const $pokerCardTemplate = $($("#poker-card-template").html()).clone();
    const $btnGuessFaceWrapper = $("#guess-face-wrapper");
    const $btnGuessRankWrapper = $("#guess-rank-wrapper");
    const $guessResult = $("#guess-result");
    const $usedCardWrapper = $("#used-card-wrapper");

    var game_sid;
    var remain_card_num;

    construct();
    return;

    async function construct() {
        buildUI();

        // remove template
        $("template").remove();

        // init game content
        await newGame();
        drawCard();
    }


    //////////////////////////////////////////////////
    /*************** private function ***************/
    
    function buildUI() {
        /* draw card section */
        $("#btnDrawCard").click(async function() {
            if(remain_card_num == 0) {
                await newGame();
            }
            drawCard();
        });


        /* select face section */
        $btnGuessFaceWrapper.find("button").click((evt) => {
            let $target = $(evt.target);
            $btnGuessFaceWrapper.children().not($target).removeClass("selected");
            $target.addClass("selected");
        });
        $btnGuessRankWrapper.find("button").click((evt) => {
            let $target = $(evt.target);
            $btnGuessRankWrapper.children().not($target).removeClass("selected");
            $target.addClass("selected");
        });

        // init guessing to any
        var guess_face = "any";
        var guess_rank = "any";

        $("#guess-face-any")    .click(()=>{ guess_face = "any"; });
        $("#guess-face-D")      .click(()=>{ guess_face = "D"; });
        $("#guess-face-S")      .click(()=>{ guess_face = "S"; });
        $("#guess-face-H")      .click(()=>{ guess_face = "H"; });
        $("#guess-face-C")      .click(()=>{ guess_face = "C"; });
        $("#guess-face-red")    .click(()=>{ guess_face = "red"; });
        $("#guess-face-black")  .click(()=>{ guess_face = "black"; });

        $("#guess-rank-any")        .click(()=>{ guess_rank = "any"; });
        $("#guess-rank-even")       .click(()=>{ guess_rank = "even"; });
        $("#guess-rank-odd")        .click(()=>{ guess_rank = "odd"; });
        $("#guess-rank-number")     .click(()=>{ guess_rank = "number"; });
        $("#guess-rank-notNumber")  .click(()=>{ guess_rank = "notNumber"; });

        $("#btnGuess").click(() => {guessPattern(guess_face, guess_rank)});
    }

    // start the game and store the game session id
    async function newGame() {
        const {sid} = await ajaxStartGame();
        game_sid = sid;
        localStorage.setItem("pokerWordle-session", game_sid);
        remain_card_num = 52;
    }

    async function drawCard() {
        // draw 5 card from the card pool
        const card_ls = await ajaxDrawCard();

        // build card ui
        $pokerCardWrapper.empty();
        for(let cardRecord of card_ls) {
            let $pokerCard = $pokerCardTemplate.clone();

            $pokerCard.find(".poker-face").html(pokerFaceToIcon(cardRecord.face));
            $pokerCard.find(".poker-face").toggleClass("color-red", cardRecord.face == "D" || cardRecord.face == "H");

            $pokerCard.find(".poker-rank-ul").html(cardRecord.rank);
            $pokerCard.find(".poker-rank-br").html(cardRecord.rank);

            $pokerCard.click(() => { onCardClick(cardRecord, $pokerCard) });

            $pokerCardWrapper.append($pokerCard);
        }

        return;
    }

    async function onCardClick(cardRecord, $pokerCard) {
        $pokerCard.off("click");
        const doMatch = await ajaxCheckMatch(cardRecord.face, cardRecord.rank);
        $pokerCard.find(".match").addClass(doMatch ? "fa-circle-check color-green" : "fa-circle-xmark color-red");
        $pokerCard.find(".poker-card").css({"--rot_deg": Random.getRanInt(-3,4)+"deg"});
        $usedCardWrapper.append($pokerCard);

        new Audio("../asset/audio/cardFlip_"+getCardFlipType()+".wav").play();

        return;


        function getCardFlipType() {
            return (['a', 'b'][Random.getRanInt(0,2)])+(Random.getRanInt(1,4));
        }
    }

    async function guessPattern(guess_face, guess_rank) {
        const {doGuessCorrect} = await ajaxGuessPattern(guess_face, guess_rank);
        $guessResult.toggleClass("fa-check", doGuessCorrect);
        $guessResult.toggleClass("fa-xmark", !doGuessCorrect);
    }

    function pokerFaceToIcon(face) {
        switch(face) {
            case "D": return "♦";
            case "S": return "♣";
            case "H": return "♥";
            case "C": return "♠";
            default:
                console.error("[pokerFaceToIcon] unknown face", face);
                return "";
        }
    }


    //////////////////////////////////////////////////
    /********************* Ajax *********************/

    function ajaxStartGame() {
        let data = {
            stored_sid: localStorage.getItem("pokerWordle-session"),
        }

        return new Promise(resolve => {
            $.get({
                url: "../action/pokerWordle/startGame",
                data: data,
                success: resolve
            })
        });
    }

    function ajaxDrawCard() {
        let data = {
            sid: localStorage.getItem("pokerWordle-session"),
        };

        return new Promise(resolve => {
            $.get({
                url: "../action/pokerWordle/drawCard",
                data: data,
                success: resolve,
            })
        });
    }

    function ajaxGuessPattern(guess_face, guess_rank) {
        let data = {
            sid: localStorage.getItem("pokerWordle-session"),
            guess_face: guess_face,
            guess_rank: guess_rank,
        }

        return new Promise(resolve => {
            $.get({
                url: "../action/pokerWordle/guessPattern",
                data: data,
                success: resolve,
                error: (res) => { console.error(res.responseText); },
            })
        })
    }

    function ajaxCheckMatch(face, rank) {
        let data = {
            sid: localStorage.getItem("pokerWordle-session"),
            face: face,
            rank: rank
        };

        return new Promise(resolve => {
            $.get({
                url: "../action/pokerWordle/checkMatch",
                data: data,
                success: resolve,
                error: (res) => { console.error(res.responseText); }
            })
        });
    }
}) ();