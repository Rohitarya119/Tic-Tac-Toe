let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // player O = human, player X = computer
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) { // human player
            box.innerText = "O";
            box.disabled = true;
            turnO = false;
            if (!checkWinner()) {
                setTimeout(computerMove, 500); // computer plays after 0.5s
            }
        }
    });
});

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const showWinner = (winner) => {
    if (winner === "O") {
        msg.innerText = "🎉 You Win!";
    } else if (winner === "X") {
        msg.innerText = "😢 You Lost!";
    } else if (winner === "draw") {
        msg.innerText = "🤝 It's a Draw!";
    }
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }

    // 👇 Check for draw (if all boxes filled and no winner)
    let allFilled = true;
    boxes.forEach((box) => {
        if (box.innerText === "") {
            allFilled = false;
        }
    });
    if (allFilled) {
        showWinner("draw");
        return true;
    }

    return false;
};

// ✨ Computer random move
const computerMove = () => {
    let emptyBoxes = [];
    boxes.forEach((box) => {
        if (box.innerText === "") {
            emptyBoxes.push(box);
        }
    });

    if (emptyBoxes.length > 0 && !checkWinner()) {
        let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
        randomBox.innerText = "X";
        randomBox.disabled = true;
        turnO = true;
        checkWinner();
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);