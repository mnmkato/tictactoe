function Gameboard (){
    Xspots=[]
    Ospots=[]
    spots=["","","","","","","","",""]
    winSpots=[]
    readyToPlay=true
    gameMode="Human"
    availablespots=["0","1","2","3","4","5","6","7","8"]

    return{Xspots,Ospots,spots,winSpots,readyToPlay,gameMode,availablespots}
}
function GameController(gameboard) {
    
    const players = {
        player1: "Player One",
        player2: "Player Two"
    };
    let activePlayer = players.player1;
    switchPlayer= function(){
        if (activePlayer === players.player1) {
            activePlayer = players.player2;
        } else {
            activePlayer = players.player1;
        }
    }
    const play = function(index) {
        if (activePlayer === players.player1) {
            gameboard.spots[index] = "X";
            gameboard.Xspots.push(index);
            checkWin(gameboard.Xspots);
            activePlayer = players.player2;
        } else {
            gameboard.spots[index] = "O";
            gameboard.Ospots.push(index);
            checkWin(gameboard.Ospots);
            activePlayer = players.player1;
        }
    };
    const checkWin = function (playerList){
        var winlist = {
            win1:["0","1","2"],
            win2:["3","4","5"],
            win3:["6","7","8"],
            win4:["0","3","6"],
            win5:["1","4","7"],
            win6:["2","5","8"],
            win7:["0","4","8"],
            win8:["2","4","6"],
        }
        for(key in winlist){
            var item = winlist[key]
            if(item.every(elem=>playerList.includes(elem))){
                gameboard.winSpots=item;
            }
        }
    }
    const resetAvailableSpots=function(){
        gameboard.availablespots = gameboard.availablespots.filter((element) => {
            return !gameboard.Xspots.includes(element) && !gameboard.Ospots.includes(element);
          });
    }
    const getRandomAvailableSpot =function(){
        var length=gameboard.availablespots.length
        if(length>0){
            var index = Math.floor(Math.random()*length);
        }
        return gameboard.availablespots[index]
    }
    const computerPlay=function (){
        resetAvailableSpots()
        randomAvailableSpot = getRandomAvailableSpot();
        gameboard.spots[randomAvailableSpot] = "O";
        gameboard.Ospots.push(randomAvailableSpot);
        resetAvailableSpots()
        checkWin(gameboard.Ospots);
        activePlayer = players.player1;
    }
 
    return { play,computerPlay };
}

function ScreenController(){
    
    var gameboard = Gameboard();
    const container = document.querySelector(".container");

    //add listener to the board
    gameController = GameController(gameboard);
    container.addEventListener("click",(e)=>{
        const targetTile = e.target
        if(targetTile.textContent=="" && gameboard.readyToPlay){
            const index = targetTile.classList.value
            gameController.play(index);
            updateScreen();
            if(gameboard.gameMode=="PC" && gameboard.readyToPlay){
                gameController.computerPlay();
                updateScreen();
            } 
        }
    })
    
    
    const updateScreen = function () {
        //make 3 by 3 tiles and sync tiles with Gameboard data
        container.innerHTML=""
        for (i=0; i<gameboard.spots.length; i++) {
            const tile =document.createElement("div")
            tile.classList.add(i)
            tile.textContent = gameboard.spots[i];
            container.appendChild(tile)
        }        
        //check win status
        winSpots = gameboard.winSpots
        if(winSpots.length==0){   
            updatePlayerTiles()
        } else {
            updateWinTiles()
            gameboard.readyToPlay=false
        }
    };
    //manage next player tiles status
    var nextPlayer = 1;
    
    const updatePlayerTiles=function(){
        const player1Header = document.querySelector(".one")
        const player2Header = document.querySelector(".two")
        if(nextPlayer==1){
            player1Header.classList.add("active")
            player2Header.classList.remove("active")
            nextPlayer=2
        } else { 
            player2Header.classList.add("active")
            player1Header.classList.remove("active")
            nextPlayer=1
        }
    }
    //make winning tiles green
    const updateWinTiles = function(){
        container.childNodes.forEach(child => {
            const i = child.classList && child.classList.value;
            if(winSpots.includes(i)){
                child.style.color="lightgreen";
            }
        })
    }
    //switch game mode
    const playermodes = document.querySelectorAll(".gameMode")
    playermodes.forEach((mode)=>{
        mode.addEventListener("click",(e)=>{
            selectedMode = e.target
            //AI Algorithm not yet implemented
            if(selectedMode.textContent!="AI"){
                playermodes.forEach((mode)=>{
                    mode.classList.remove("chosen")
                })
                selectedMode.classList.add("chosen")
                gameboard=Gameboard();
                gameController = GameController(gameboard);
                gameboard.gameMode=selectedMode.textContent 
                nextPlayer=1
                updateScreen()  
            }
        })
    })
    updateScreen();
}
ScreenController()