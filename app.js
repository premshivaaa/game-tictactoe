document.addEventListener('DOMContentLoaded', function() {
    let boxes = document.querySelectorAll(".box");
    let resetButton = document.querySelector("#reset-btn");
    let newGameButton = document.querySelector("#newgame-btn");
    let msg = document.querySelector("#msg");
    let msgContainer = document.querySelector(".msg-container");
    let modeButton = document.querySelector("#mode-btn");
    let buttons = document.querySelector(".button");
    let body = document.querySelector("body");

    let turn = true; //playerX = True, playerO = false

    const winPatterns = [
        [0,1,2] , [3,4,5] , [6,7,8] , [0,3,6] , [1,4,7] , [2,5,8] , [0,4,8] , [2,4,6]
    ];
    let count = 0;
    let mode = true;

    //all-functions

    const gameDraw = () =>{
        msg.innerText = "Game is Tie or Draw";
        msgContainer.classList.remove("hide");
        disableBoxes();
        count = 0;
    };

    const resetGame = () =>{
        turn = true;
        enableBoxes();
        msgContainer.classList.add("hide");
        count = 0;
    };

    const enableBoxes = () =>{
        boxes.forEach(box => {
            box.disabled = false;
            box.innerText = "";
            box.classList.add("box");
            box.classList.remove("box2");
        });
    };
    
    const disableBoxes = () =>{
        boxes.forEach(box => {
            box.disabled = true;
        });
    };

    const showWinner = (winner) =>{
        msg.innerText = `Congratulations! The winner is ${winner}`;
        msgContainer.classList.remove("hide");
        disableBoxes();
    };
    
    const checkWinner = () =>{
        for(let pattern of winPatterns){
            let pos1val = boxes[pattern[0]].innerText;
            let pos2val = boxes[pattern[1]].innerText;
            let pos3val = boxes[pattern[2]].innerText;

            if(pos1val != "" && pos2val != "" && pos3val != ""){
                if(pos1val == pos2val && pos2val == pos3val){
                    showWinner(pos1val);
                    return true;
                }
            }
        }
        return false;
    };

    //event listeners

    newGameButton.addEventListener("click" , resetGame);
    resetButton.addEventListener("click" , resetGame);

    boxes.forEach((box) => {
        box.addEventListener("click" , () =>{
            if(turn){
                box.innerText = "X";
                box.classList.add("box2");
                box.classList.remove("box");
                turn = false;
            }
            else{
                box.innerText = "O";
                box.classList.add("box");
                box.classList.remove("box2");
                turn = true;
            }
            box.disabled = true;
            count++;
            
            if(!checkWinner() && count === 9){
                gameDraw();
            }
        });
    });

    modeButton.addEventListener("click" , () =>{
        if(mode){
            body.classList.add("mode2");
            body.classList.remove("mode1");
            
            document.querySelectorAll('.button').forEach(btn => {
                btn.classList.add("mode2-btn");
                btn.classList.remove("button");
            });
            mode = false;
        }
        else{
            body.classList.add("mode1");
            body.classList.remove("mode2");
            
            document.querySelectorAll('.mode2-btn').forEach(btn => {
                btn.classList.add("button");
                btn.classList.remove("mode2-btn");
            });
            mode = true;
        }
    });
});
