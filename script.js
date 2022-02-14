const pieceTemplate = document.querySelector("template");
const container = document.querySelector(".container");
const win = document.querySelector(".opt");
const yAxis = ["top", "center", "bottom"];
const xAxis = ["left", "center", "right"];
const gridLine = ["1/2", "2/3", "3/4"];
const pos = [1, 2, 3, 4, 5, 6, 7, 8];
pos.sort(function (a, b) {
  return 0.5 - Math.random();
});
const pieceArray = [];
const pieceElements = [];
let emptyPos = 9;
class piece {
  constructor(pos, shufflePos) {
    this.pos = pos;
    this.shufflePos = shufflePos;
    this.backgroundPos = [
      xAxis[(pos % 3) - 1 == -1 ? 2 : (pos % 3) - 1],
      yAxis[
        pos % 3 == 0
          ? Math.floor(pos / 3) - 1 < 0
            ? 0
            : Math.floor(pos / 3) - 1
          : Math.floor(pos / 3)
      ],
    ];
  }
  createPiece() {
    const pieceTemplateClone =
      pieceTemplate.content.cloneNode(true).children[0];
    pieceTemplateClone.style.backgroundPosition = `${this.backgroundPos[1]} ${this.backgroundPos[0]}`;
    pieceTemplateClone.id = `piece${this.shufflePos}`;
    container.append(pieceTemplateClone);
    pieceElements.push(pieceTemplateClone);
  }
}

function createPieceRandomly() {
  for (const p of pos) {
    pieceArray.push(new piece(p, pos.indexOf(p) + 1));
    pieceArray[pieceArray.length - 1].createPiece();
  }
}
createPieceRandomly();
function checkForEnd() {
  const temp = pieceElements.map((el) => {
    return Number(el.id.replace("piece", ""));
  });
  if (
    temp.every((el, index) => {
      return el == pos[index];
    })
  ) {
    setTimeout(() => {
      win.classList.add("active");
    }, 1000);
  }
}
function mouseMoveHandler(el) {
  const pos = Number(el.id.replace("piece", ""));
  const temp = emptyPos;
  if (emptyPos % 3 == 0 && pos == emptyPos + 1) return;
  if ((emptyPos == 1 || emptyPos == 4 || emptyPos == 7) && pos == emptyPos - 1)
    return;
  if (
    pos == emptyPos + 3 ||
    pos == emptyPos - 3 ||
    pos == emptyPos + 1 ||
    pos == emptyPos - 1
  ) {
    emptyPos = pos;
    el.id = `piece${temp}`;
    checkForEnd();
  }
}
pieceElements.forEach((el) => {
  el.onmousedown = function () {
    el.addEventListener("mousemove", mouseMoveHandler(el));
  };
});
