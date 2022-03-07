class Game {
    constructor(itemName) {
        this.itemName = itemName;
        this.listHand = ["Batu","Gunting","Kertas"];
    }

    stopGame() {
        // document.querySelector(`.player #${this.itemName}`).classList.remove("highlight-hover");
        this.listHand.forEach((element) => {
            if(document.querySelector(`.player #${element}`).classList.toString().match("hover-highlight")){
                document.querySelector(`.player #${element}`).classList.remove("hover-highlight");
            }
        });
        this.listHand.forEach((element) => {
            if(!document.querySelector(`.player #${element}`).classList.toString().match("disable-click")){
                document.querySelector(`.player #${element}`).classList.add("disable-click");
            }
        });
    }

    playGame(){
        // let isPlayed = 0;
        const random = Math.floor(Math.random() * 3);
        let comHand = this.listHand[random];
        
        //let resultMessage = "";
        //let classNameResult = "";
        let resultGame = {
            playResult : "",
            playLog : "",
            playResultMessage : ""

        };
        //1 = win , 2 = lose, 3 = draw
        //win con: batu-gunting , gunting-kertas, kertas-batu
        document.querySelector(`.com #${comHand}`).classList.add("highlight-item");
        document.querySelector(`.player #${this.itemName}`).classList.add("highlight-item");
        
        if ((this.itemName === "Batu" && comHand === "Gunting")
            ||(this.itemName === "Kertas" && comHand === "Batu")
            ||(this.itemName === "Gunting" && comHand === "Kertas")) {
            resultGame.playResult = "Win";
            resultGame.playResultMessage = "Player 1 Win";
            document.querySelector(`#ResultBanner`).classList.add("win-background-result");
        } 
        else if (this.itemName === comHand) {
            resultGame.playResult = "Draw";
            resultGame.playResultMessage = "Draw";
            document.querySelector(`#ResultBanner`).classList.add("draw-background-result");
        }
        else {
            resultGame.playResult = "Lose";
            resultGame.playResultMessage = "Com Win";
            document.querySelector(`#ResultBanner`).classList.add("win-background-result");
        }

        document.querySelector(`#resultText`).innerText = resultGame.playResultMessage;
        resultGame.playLog = `Player choose: ${this.itemName} and Com choose : ${comHand}`;
        return resultGame;

    }
 
    resetGame(){
        //resetHighlight
        if(document.querySelector(`.com #${this.itemName}`).classList.toString().match("highlight-item")){
            document.querySelector(`.com #${this.itemName}`).classList.remove("highlight-item");
        }
        if(document.querySelector(`.player #${this.itemName}`).classList.toString().match("highlight-item")){
            document.querySelector(`.player #${this.itemName}`).classList.remove("highlight-item");
        }
        if(!document.querySelector(`.player #${this.itemName}`).classList.toString().match("hover-highlight")){
            document.querySelector(`.player #${this.itemName}`).classList.add("hover-highlight");
        }

        //resetResultBanner
        if(document.querySelector(`#GameResult #VSText`).classList.toString().match("hide-banner")){
            document.querySelector(`#GameResult #VSText`).classList.remove("hide-banner");
        }
        if(!document.querySelector(`#GameResult #ResultBanner`).classList.toString().match("hide-banner")){
            document.querySelector(`#GameResult #ResultBanner`).classList.add("hide-banner");
        }

        //resetDisableClickEvent
        this.listHand.forEach((element) => {
            if(document.querySelector(`.player #${element}`).classList.toString().match("disable-click")){
                document.querySelector(`.player #${element}`).classList.remove("disable-click");
            }
        });
    }

    showResult(){
        if(!document.querySelector(`#GameResult #VSText`).classList.toString().match("hide-banner")){
            document.querySelector(`#GameResult #VSText`).classList.add("hide-banner");
        }
        
        if(document.querySelector(`#GameResult #ResultBanner`).classList.toString().match("hide-banner")){
            document.querySelector(`#GameResult #ResultBanner`).classList.remove("hide-banner");
        }
        // document.querySelector(`#GameResult #VSText`).classList.toString();
        // document.querySelector(`#GameResult #ResultBanner`).classList.toString();
    }
}

const listPlayerItems = document.querySelectorAll('.player .play-image-div');

let isPlayed = false;

listPlayerItems.forEach((element)=>{
    const game = new Game(element.id)
    
    element.addEventListener("click", () => {
        if(isPlayed == false){
            let result = game.playGame(element.id);
            game.showResult();
            console.log(result.playLog);
            game.stopGame();
            console.log(result.playResultMessage);
            isPlayed = true;
        }
    }
    )
});


document.getElementById("ResetGame").addEventListener("click", () => {
    listPlayerItems.forEach((element)=>{
        const game = new Game(element.id)
        //game.resetHighlight();
        game.resetGame();
        isPlayed = false;
    })
});
