Gameboard={
    Xspots:[],
    Ospots:[],
    freeSpots:Array.from(document.querySelectorAll(".container div")),
    spot1:document.querySelector(".spot1"),
    spot2:document.querySelector(".spot2"),
    spot3:document.querySelector(".spot3"),
    spot4:document.querySelector(".spot4"),
    spot5:document.querySelector(".spot5"),
    spot6:document.querySelector(".spot6"),
    spot7:document.querySelector(".spot7"),
    spot8:document.querySelector(".spot8"),
    spot9:document.querySelector(".spot9")
}
function checkWin(playerList){
    var winlist = {
        win1:[Gameboard.spot1,Gameboard.spot2,Gameboard.spot3],
        win2:[Gameboard.spot4,Gameboard.spot5,Gameboard.spot6],
        win3:[Gameboard.spot7,Gameboard.spot8,Gameboard.spot9],
        win4:[Gameboard.spot1,Gameboard.spot4,Gameboard.spot7],
        win5:[Gameboard.spot2,Gameboard.spot5,Gameboard.spot8],
        win6:[Gameboard.spot3,Gameboard.spot6,Gameboard.spot9],
        win7:[Gameboard.spot1,Gameboard.spot5,Gameboard.spot9],
        win8:[Gameboard.spot3,Gameboard.spot5,Gameboard.spot7],
    }
   
    for(key in winlist){
        var item = winlist[key]
        if(item.every(elem=>playerList.includes(elem))){
            item.forEach(element => {
                element.style.color="lightgreen"
                Gameboard.freeSpots=[]
            });
        }
    }
};

displayController={
    playX: function(spot){
        spot.innerHTML="X"
    },
    playO: function(spot){
        spot.innerHTML="O"
    }
}

Gameboard.freeSpots.forEach((spot)=>{
    spot.addEventListener("click",()=>{
        var spotsLength=Gameboard.freeSpots.length
        if(spotsLength>0){
           makeMove(spot)
           computerMove();
        } 
    })
});
function makeMove(spot){
    displayController.playX(spot)
    Gameboard.Xspots.push(spot)
    const index = Gameboard.freeSpots.indexOf(spot);
    Gameboard.freeSpots.splice(index,1)
    checkWin(Gameboard.Xspots);

}
function computerMove(){
    var spotsLength=Gameboard.freeSpots.length
    if(spotsLength>0){
        var spotIndex = Math.floor(Math.random()*spotsLength);
        spot=Gameboard.freeSpots[spotIndex]
        displayController.playO(spot)
        Gameboard.Ospots.push(spot) 
        const index = Gameboard.freeSpots.indexOf(spot)
        Gameboard.freeSpots.splice(index,1)
        checkWin(Gameboard.Ospots)
    }
}