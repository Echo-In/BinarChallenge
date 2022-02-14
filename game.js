class Game {

    constructor(itemName) {
        this.itemName = itemName;
    }

    highlightHandPlayer() {
        document.querySelector(`.player #${this.itemName}`).classList.add("highlight-hover");
    }

    removeHighlightHandPlayer() {
        document.querySelector(`.player #${this.itemName}`).classList.remove("highlight-hover");
    }

    playGame(){
        let listHand = ["Batu","Gunting","Kertas"];
        const random = Math.floor(Math.random() * 3);
        let comHand = listHand[random];
        let resultGame = {
            playResult : "",
            playLog : "",
            playResultMessage : ""

        };
        document.querySelector(`.com #${comHand}`).classList.add("highlight-item");
        document.querySelector(`.player #${this.itemName}`).classList.add("highlight-item");
        
        if (this.itemName === "Batu" && comHand === "Gunting") {
            resultGame.playResult = "Win";
            resultGame.playResultMessage = "Player 1 Win";
        } 
        else if (this.itemName === "Kertas" && comHand === "Batu") {
            resultGame.playResult = "Win";
            resultGame.playResultMessage = "Player 1 Win";
        }
        else if (this.itemName === "Gunting" && comHand === "Kertas") {
            resultGame.playResult = "Win";
            resultGame.playResultMessage = "Player 1 Win";
        }
        else if (this.itemName === comHand) {
            resultGame.playResult = "Draw";
            resultGame.playResultMessage = "Draw";
        }
        else {
            resultGame.playResult = "Lose";
            resultGame.playResultMessage = "Com Win";
        }
        resultGame.playLog = `Player choose: ${this.itemName} and Com choose : ${comHand}`;
        return resultGame;
    }
 
    resetHighlight(){
        if(document.querySelector(`.com #${this.itemName}`).classList.toString().match("highlight-item")){
            document.querySelector(`.com #${this.itemName}`).classList.remove("highlight-item");
        }
        if(document.querySelector(`.player #${this.itemName}`).classList.toString().match("highlight-item")){
            document.querySelector(`.player #${this.itemName}`).classList.remove("highlight-item");
        }
        if(document.querySelector(`.com #${this.itemName}`).classList.toString().match("highlight-hover")){
            document.querySelector(`.com #${this.itemName}`).classList.remove("highlight-hover");
        }
        if(document.querySelector(`.player #${this.itemName}`).classList.toString().match("highlight-hover")){
            document.querySelector(`.player #${this.itemName}`).classList.remove("highlight-hover");
        }

    }

}

const listPlayerItems = document.querySelectorAll('.player .play-image-div');

const resultBanner = document.createElement("div");
resultBanner.style.height = "166.93px";
resultBanner.style.width = "271.11px";
resultBanner.style.color = "white";
resultBanner.style.fontSize = "40px";
resultBanner.style.textAlign = "center";
resultBanner.style.transform = "rotate(-28.87deg)";
resultBanner.style.textTransform = "uppercase";
resultBanner.style.borderRadius = "10px";
resultBanner.style.alignItems = "center";
resultBanner.style.justifyContent = "center";
resultBanner.style.display = "flex";
resultBanner.className = "result-banner";

const vsText = document.createElement("div");
vsText.style.fontStyle= "normal";
vsText.style.fontWeight= "bold";
vsText.style.fontSize= "144px";
vsText.style.lineHeight= "196px";
vsText.style.letterSpacing= "0.1em";
vsText.style.color= "#bd0000";
vsText.className = "vs-text";
vsText.textContent = 'VS';


listPlayerItems.forEach((element)=>{
    const game = new Game(element.id)

    element.addEventListener("click", () => {
        let result = game.playGame(element.id);
        console.log(result.playLog);
        if(result.playResult=="Win"){
            resultBanner.style.backgroundColor = "#4C9654";
            resultBanner.textContent = "Player 1 Win";
            document.getElementById("GameResult").append(resultBanner);
            if (document.getElementsByClassName("vs-text").length > 0) {
                document.querySelector("#GameResult .vs-text").remove();
            }
        }
        else if(result.playResult=="Lose"){
            resultBanner.style.backgroundColor = "#4C9654";
            resultBanner.textContent = "Com Win";
            document.getElementById("GameResult").append(resultBanner);
            if (document.getElementsByClassName("vs-text").length > 0) {
                document.querySelector("#GameResult .vs-text").remove();
            }
        }
        else {
            resultBanner.style.backgroundColor = "#035B0C";
            resultBanner.textContent = "Draw";
            document.getElementById("GameResult").append(resultBanner);
            if (document.getElementsByClassName("vs-text").length > 0) {
                document.querySelector("#GameResult .vs-text").remove();
            }
        }
        console.log(result.playResultMessage);
    }
    )
    element.addEventListener("mouseover", () => {
        if(!element.classList.toString().match("highlight-item")){
            game.highlightHandPlayer();
        }
    }
    )
    element.addEventListener("mouseout", () => {
        if(!element.classList.toString().match("highlight-item")){
            game.removeHighlightHandPlayer();
        }
    }
    )
});

document.getElementById("ResetGame").addEventListener("click", () => {
    listPlayerItems.forEach((element)=>{
        const game = new Game(element.id)
        game.resetHighlight();
    })
    const isResultExist = document.getElementsByClassName('result-banner');
    if (isResultExist.length > 0) {
        document.querySelector(`#GameResult .result-banner`).remove();
        document.querySelector("#GameResult").append(vsText);
    }
});