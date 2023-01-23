 
let gameOver = document.getElementById("game-over");








const gridBoxes = document.querySelectorAll("#gameBoard div");  
const noPassObstacles  = ["rock", "torch", "lava"];








var currentLevel = 1; //starting level
var riderOn = false; // is the rider on?
var currentLocationOfMary = 0;
var currentAnimation; // allow 1 animation per level
var widthOfBoard = 10;
var endGame = "false";
var gameStatus = "none";












const levels =[
    //level 0
    ["","","","","","","","","","",
    "","","","","","","","","","",
    "","","","","","","","","","",
    "","","","","","","","","","",
    "","","","","","","","","","",
    "","","","","","","","","","",
    "","","","","","","","","","",
    "","","","","","","","","","",
    "","","","","","","","","","",
    "","","","","","","","","",""],
   
   //level 1
    ["lava", "lava", "lava", "lava", "lava","lava","lava","lava","lava","lava",
   "lava", "torch", "torch", "torch", "torch","torch","","doorside","port","lava",
   "lava", "torch", "animate", "animate", "animate","animate","animate","animate","torch","lava",
   "lava", "lava", "lava", "lava", "","lava","lava","lava","lava","lava",
   "lava", "lava", "lava", "torch", "","torch","lava","lava","lava","lava",
   "lava","lava","","","","","","","lava","lava",
   "lava","lava","","torch","","torch","","torch","lava","lava",
   "lava","torch","","torch","lava","torch","","","","lava",
   "lava","key","","torch","lava","torch","lava","lava","maryup","lava",
   "lava","lava","lava","lava","lava","lava","lava","lava","lava","lava"],



   
   
    //level 2
    ["torch", "torch", "torch", "torch", "torch","torch","torch","torch","","port",
    "torch", "", "", "", "","","","","","",
    "torch", "", "lava", "lava", "","lava","lava","","","torch",
    "torch", "", "lava", "lava", "","lava","lava","","","torch",
    "torch", "", "", "","key","","","","", "torch",
    "torch","","lava","lava","","lava","lava","","","torch",
    "torch","","lava","lava","","lava","lava","","","torch",
    "torch","","","","","","","","","torch",
    "torch","","","","","","","","","torch",
    "torch","torch","torch","torch","torch","torch","torch","torch","maryup","torch"],
   
   
    //level 3
    ["lava", "lava", "port", "lava", "lava","lava","lava","key","lava","lava",
    "lava", "lava", "door", "lava", "lava","lava","lava","","lava","lava",
    "", "", "", "", "","","","","","",
    "lava", "lava", "", "lava", "lava","lava","lava","","lava","lava",
    "lava", "lava", "", "lava", "lava","lava","lava","","lava","lava",
    "","","","","","","","","","",
    "lava","lava","","lava","lava","lava","lava","","lava","lava",
    "lava","lava","","lava","lava","lava","lava","","lava","lava",
    "","","","","","","","","","",
    "","","","","","","","","","maryup"],
   
    //level 4
    ["lava", "lava", "lava", "torch", "","torch","lava","lava","lava","lava",
    "lava", "lava", "lava", "torch", "","","","","","port",
    "lava", "lava", "lava", "torch", "","torch","lava","lava","lava","lava",
    "torch", "torch", "torch", "torch", "","torch","torch","torch","torch","torch",
    "key", "", "", "", "","","","","","",
    "torch","torch","torch","torch","torch","","torch","torch","torch","torch",
    "lava","lava","lava","lava","torch","","torch","lava","lava","lava",
    "lava","lava","lava","lava","torch","","torch","lava","lava","lava",
    "lava","lava","lava","lava","torch","","torch","lava","lava","lava",
    "lava","lava","lava","lava","torch","maryup","torch","lava","lava","lava"],




    //level 5
    ["", "", "", "", "","","","","","port",
    "", "lava", "lava", "", "lava","lava","","lava","lava","",
    "", "lava", "lava", "", "lava","lava","","lava","lava","",
    "", "", "", "", "","","","","","",
    "key", "lava", "lava", "", "lava","lava","","lava","lava","",
    "","lava","lava","","lava","lava","","lava","lava","",
    "","","","","","","","","","",
    "","lava","lava","","lava","lava","","lava","lava","",
    "","lava","lava","","lava","lava","","lava","lava","",
    "","","","","","maryup","","","",""],








    ]; //end of levels
   
   
document.getElementById("startbutton").addEventListener("click", startGame);
// start game
window.onload = function(){
    document.getElementById("gameBoard").style.visibility = "hidden";
   
   
}








function startGame(){
    document.getElementById("gameBoard").style.visibility = "visible";
    document.getElementById("start").style.display = "none";
    document.getElementById("startbutton").style.display = "none";
    document.getElementById("instructions").style.display = "none";




    start = "true";
    loadLevel();
}












//move tank
document.addEventListener("keydown", function(e){
   
    if(endGame != true){
   
    switch(e.keyCode){
        case 37://left arrow
            if(currentLocationOfMary % widthOfBoard !== 0){
                tryToMove("left");
            }
            break;
        case 38://up arrow
            if(currentLocationOfMary - widthOfBoard >= 0){
                tryToMove("up");
            }
            break;
        case 39://right arrow
            if(currentLocationOfMary % widthOfBoard < widthOfBoard - 1){
                tryToMove("right");
            }
            break;
        case 40://down arrow
            if(currentLocationOfMary + widthOfBoard < widthOfBoard * widthOfBoard){
                tryToMove("down");
            }
            break;
    }//switch
    }
});//key event listener








//try to move tank
function tryToMove(direction){
   
    //location before move
    let oldLocation = currentLocationOfMary;
   
    // class of location before mpve
    let oldClassName = gridBoxes[oldLocation].className;
   
    let nextLocation = 0; // location we wish to move to
    let nextClass = "";   // class of location we wish to move to
   
    let nextLocation2 = 0;
    let nextClass2 = "";
   
    let newClass = "";    // new class to switch to if move successful
   
    console.log(nextClass);
   
    switch(direction){
        case "left":
            nextLocation = currentLocationOfMary - 1;
            break;
        case "right":
            nextLocation = currentLocationOfMary + 1;
            break;
        case "up":
            nextLocation = currentLocationOfMary - widthOfBoard;
            break;
        case "down":
            nextLocation = currentLocationOfMary + widthOfBoard;
            break;
       
    }//switch
   
    nextClass = gridBoxes[nextLocation].className;
   
    //if the obstacle is not possible, don't move
    if(noPassObstacles.includes(nextClass)){ return; }
   
    //if it's a fence, and there is no rider, don't move
    if(!riderOn && nextClass.includes("door")) {return;}
    if(nextClass == "doorside" && direction == "up" ) {return;}
    if(nextClass == "doorside" && direction == "down" ) {return;}
    if(nextClass == "door" && direction == "left" ) {return;}
    if(nextClass == "door" && direction == "right" ) {return;}




    //if there is a fence, move two spaces with animation
    if(riderOn && nextClass.includes("door")){
       
        //rider must be on to jump
        if(riderOn){
            gridBoxes[currentLocationOfMary].className = "";
            oldClassName = gridBoxes[nextLocation].className;
           
           
            //set values according to direction
            if(direction == "left"){
                if(nextClass == "door") {
                    return;
                } else {
                    nextClass = "openleft";
                    nextClass2 = "marykeyleft";
                    nextLocation2 = nextLocation - 1;
                }
               
            } else if(direction == "right"){
                if(nextClass == "door") {
                    return;
                } else {
                    nextClass = "openright";
                    nextClass2 = "marykeyright";
                    nextLocation2 = nextLocation + 1;
                }
               
            }else if(direction == "up"){
                if(nextClass == "doorside") {
                    return;
                } else {
                    nextClass = "openup";
                    nextClass2 = "marykeyup";
                    nextLocation2 = nextLocation - widthOfBoard;
                    }
            }else if(direction == "down"){
                if(nextClass == "doorside") {
                    return;
                } else {
                    nextClass = "opendown";
                    nextClass2 = "marykeydown";
                    nextLocation2 = nextLocation + widthOfBoard;
                }
               
            }
            //show tank jumping
            gridBoxes[nextLocation].className = nextClass;
           
            setTimeout(function(){
               
                //set jump back to just a fence
                gridBoxes[nextLocation].className = oldClassName;
               
                //update current location of tank to be 2 space past take off
                currentLocationOfMary = nextLocation2;
               
                //get class of boxes after jump
                nextClass = gridBoxes[currentLocationOfMary].className;
               
                //show tank and rider after landing
                gridBoxes[currentLocationOfMary].className = nextClass2;
               
                //if next box is a flag, go up a level
                levelUp(nextClass);
               
            },350);
           
           
        }//if rider on
    }//if class has fence
   
    //if there is a rider, add rider
    if(nextClass == "key"){
        riderOn = true;
    }




    if(!riderOn && nextClass == "port"){ return; }
   
    //if there is a bridge in the old location keep it
    if(oldClassName.includes("bridge")) {
        gridBoxes[oldLocation].className = "bridge";
    } else {
        gridBoxes[oldLocation].className = "";
    } // else
   
    //build name of new class
    newClass = (riderOn) ? "marykey" : "mary";
    newClass += direction;
   
    //if there is a bridge in the new location, keep it
    if(gridBoxes[nextLocation].classList.contains("bridge")){
        newClass += " bridge";
    }
   
    //move 1 space
    currentLocationOfMary = nextLocation;
    gridBoxes[currentLocationOfMary].className = newClass;
   
    // if it is an enemy
    if(nextClass.includes("enemy")){
        document.getElementById("youlosescreen").style.display = "block";
        endGame = true;
        gameStatus = "lose";
        clearTimeout(currentAnimation);
        return;
    }
   
    //move up to next level if needed
    levelUp(nextClass);
   
}//tryToMove




//move up a level
function levelUp(nextClass){
    if(nextClass == "port" && riderOn){
        if(currentLevel < levels.length - 1){
            document.getElementById("levelup").style.display = "block";
           
        }
        clearTimeout(currentAnimation);
        setTimeout (function(){
            document.getElementById("levelup").style.display = "none";
            currentLevel++;
            if(currentLevel < levels.length){
                loadLevel();
            } else {
                document.getElementById("playAgain").style.display = "block";
                gameStatus = "win";
                console.log("win");
                endGame = true;
                return;
               
            }
        },1000);
    }
   
}//levelUp








//load levels 0 - maxlevel
function loadLevel(){
    let levelMap = levels[currentLevel];
    let animateBoxes;
    riderOn = false;
    endGame = false;
   
    //load board
    for (i = 0; i < gridBoxes.length; i++){
        gridBoxes[i].className = levelMap[i];
        if(levelMap[i].includes("mary")) currentLocationOfMary = i;
       
       
    }//for
   
    animateBoxes = document.querySelectorAll(".animate");
   
    animateEnemy(animateBoxes, 0, "right");
   
}//loadLevel




//animate enemy left to right (could add up and down to this)
//boxes - array of grid boxes that include animation
//index - current location of animation
//direction - current direction of animation
function animateEnemy( boxes, index, direction){
   
        //exit function if no animation
        if(boxes.length <= 0){return;}
       
        if( boxes[index].className.includes("mary")){
            console.log("lose");
            document.getElementById("youlosescreen").style.display = "block";
            gameStatus = "lose";
            endGame = true;
            return;
        }else{
            //update image
            if(direction == "right"){
                boxes[index].classList.add("enemyright");
            } else {
                boxes[index].classList.add("enemyleft");
            }
           
        //remove images from other boxes
        for(i = 0; i < boxes.length; i++){
            if(i != index){
                boxes[i].classList.remove("enemyleft");
                boxes[i].classList.remove("enemyright");    
            }
        }//for
       
       
       
        //moving right
        if(direction == "right"){
            // turn around if hit right side
            if(index == boxes.length - 1){
                index--;
                direction = "left";
            } else {
                index++;
            }
           
        //moving left  
        } else {
            //turn around if hit left side
            if(index == 0){
                index++;
                direction = "right";
            } else {
                index--;
            }
        } // else
           
        currentAnimation = setTimeout(function(){
            animateEnemy(boxes, index, direction);
        }, 750);
       
       
        }
   
   
}//animateEnemy




document.getElementById("lose").addEventListener("click", restart);
document.getElementById("pa").addEventListener("click", restart);










function restart(){
    document.getElementById("gameBoard").style.visibility = "visible";
    console.log("restart");
    if(gameStatus == "lose"){
        document.getElementById("youlosescreen").style.display = "none";
        document.getElementById("lose").style.display = "none";
       
    }
   
    else {
        document.getElementById("playAgain").style.display = "none";
        document.getElementById("pa").style.display = "none";
       
       
    }
    currentLevel = 1;
    endGame = false;
    loadLevel();
}










































































