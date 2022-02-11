const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');

const turn = document.querySelector('.turn');
const step = document.querySelector('.step');

const settingsBtns = document.querySelectorAll('.settings-btn');
const restartBtns = document.querySelectorAll('.restart-btn');

const tenResults = document.querySelector('.results');

const overlay = document.querySelector('.overlay');
const modalOpponent = document.querySelector('.opponent');
const modalPlayer = document.querySelector('.player');
const modalResult = document.querySelector('.result');

const humanBtn = document.querySelector('.human-btn');
const aiBtn = document.querySelector('.ai-btn');
const xBtn = document.querySelector('.x-btn');
const oBtn = document.querySelector('.o-btn');

const resultMessage = document.querySelector('.result-message');

// Settings from Modals
let opponent = 'Opponent';
let player = 'X';

// State
let currentPlayer = 'X';
let counter = 0;
let currentWinCombo = [];

let virtBoard = [
  '', '', '',
  '', '', '',
  '', '', ''
];

const winSequences = [
  [0, 1, 2], // horizontal
  [3, 4, 5],
  [6, 7, 8],
  
  [0, 3, 6], // vertical
  [1, 4, 7],
  [2, 5, 8],
  
  [0, 4, 8], // diagonal
  [2, 4, 6]
];

let recordsHistory = [];



modalOpponent.addEventListener('click', handleOpponentChoice);
modalPlayer.addEventListener('click', handlePlayerChoice);
board.addEventListener('click', handleCellClick);
settingsBtns.forEach(btn => {
  btn.addEventListener('click', openSettings)
});
restartBtns.forEach(btn => {
  btn.addEventListener('click', restartGame)
});
window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);



function handleOpponentChoice(e) {
  if (e.target.classList.contains('human-btn')) {
    opponent = 'Opponent';
    modalOpponent.classList.remove('active');
    modalPlayer.classList.add('active');
  };
  if (e.target.classList.contains('ai-btn')) {
    opponent = 'AI';
    modalOpponent.classList.remove('active');
    modalPlayer.classList.add('active');
  };
};

function handlePlayerChoice(e) {
  if (e.target.classList.contains('x-btn')) {
    player = 'X';
    modalPlayer.classList.remove('active');
    overlay.classList.remove('active');

    startGame(opponent, player);
  };
  if (e.target.classList.contains('o-btn')) {
    player = 'O';
    modalPlayer.classList.remove('active');
    overlay.classList.remove('active');

    startGame(opponent, player);
  };
};


function startGame(opponent, player) {
  if (opponent == 'AI' && player == 'O') {
    moveAI()
  }
};

function moveAI() {
  // choose idx
  let cellIdx = chooseIdx(virtBoard);
  // update virtBoard
  virtBoard[cellIdx] = currentPlayer;
  // (timeout 500ms)
  setTimeout(() => {
    // update cell
    cells[cellIdx].innerText = currentPlayer;
    cells[cellIdx].classList.add(currentPlayer.toLowerCase());
    // check Win
    checkGameOver();
    // flip Curr Player
    (currentPlayer == 'X') ? currentPlayer = 'O' : currentPlayer = 'X';
    // update Info Board
    turn.innerText = currentPlayer;
    counter++;
    step.innerText = counter;
  }, 500);
};

function chooseIdx(board) {
  for (let i = 0; i< board.length; i++) {
    if (board[i] == '') return i
  }
};


function handleCellClick(e) {
  if (e.target.innerText == '') {
    // update Virt Board
    const cellIdx = +e.target.dataset.cell;
    virtBoard[cellIdx] = currentPlayer;
    

    // update Cell
    e.target.innerText = currentPlayer;
    e.target.classList.add(currentPlayer.toLowerCase());

    // check Win
    checkGameOver();

    // flip Current Player
    (currentPlayer == 'X') ? currentPlayer = 'O' : currentPlayer = 'X';

    // update Info Board
    turn.innerText = currentPlayer;
    counter++;
    step.innerText = counter;

    if (opponent == 'AI' && !checkWin(virtBoard)) {
      moveAI()
    }
  }
};

function checkWin(board) {
  let win = false;
  for (let [a, b ,c] of winSequences) {
    if (board[a] == '') continue;
    if(board[a] == board[b] && board[b] == board[c]) {
      win = true;
      break
    }
  }
  return win
};

function checkGameOver() {
  if (checkWin(virtBoard)) {
    // paint cells
    // - find winCombo
    // - setWinCombo
    // - add win class
    paintWinCells();
    // -- in Restart & Settings remove win class, clear currWinCombo

    // show modal with text WIN
    showResultModal(true);
    let who = (currentPlayer == player) ? 'You' : opponent;
    let msg = `${currentPlayer} (${who}) won in ${(counter + 1)} steps!`;
    composeResultMsg(msg);
    // print results
    printResultsToTable(msg);
  } else if (countEmptyCells(virtBoard) == 0) {
    // show modal with text DRAW
    showResultModal(true);
    let msg = 'It\'s a Draw';
    composeResultMsg(msg);
    // print results
    printResultsToTable(msg);
  }
};

function countEmptyCells(board) {
  let num = 0;
  for (let cell of board) {
    if (cell == '') {
      num += 1
    }
  }
  return num
};

function showResultModal(bool) {
  if (bool) {
    overlay.classList.add('active');
    modalResult.classList.add('active');
  } else {
    overlay.classList.remove('active');
    modalResult.classList.remove('active');
  }
};

function composeResultMsg(msg) {
  resultMessage.innerText = msg
};

function printResultsToTable(msg) {
  recordsHistory.push(msg);
  if (recordsHistory.length > 10) {
    recordsHistory = recordsHistory.slice(1);
  };
  refreshListContent()
};

function refreshListContent() {
  tenResults.innerHTML = '';
  for (let record of recordsHistory) {
    let li = document.createElement('li');
    li.textContent = record;
    tenResults.append(li);
  }
};

function restartGame() {
  // update State
  currentPlayer = 'X';
  counter = 0;
  virtBoard.fill('');
  // clear board styles
  cells.forEach(cell => {
    cell.classList.remove('o');
    cell.classList.remove('x');
    cell.classList.remove('win');
    cell.innerText = '';
  });
  // reset Info
  turn.innerText = 'X';
  step.innerText = '0';
  // close resultModal
  modalResult.classList.remove('active');
  overlay.classList.remove('active');
  // if vs AI and go 2nd, make AI move
  if (opponent == 'AI' && player == 'O') {
    moveAI()
  }
};

function openSettings() {
  // update State
  currentPlayer = 'X';
  counter = 0;
  virtBoard.fill('');
  // clear board styles
  cells.forEach(cell => {
    cell.classList.remove('o');
    cell.classList.remove('x');
    cell.classList.remove('win');
    cell.innerText = '';
  });
  // reset Info
  turn.innerText = 'X';
  step.innerText = '0';
  // close resultModal
  modalResult.classList.remove('active');
  overlay.classList.add('active');
  // open 1st settings Modal
  modalOpponent.classList.add('active');
};

function setLocalStorage() {
  let records = JSON.stringify(recordsHistory);
  localStorage.setItem('games', records);
};

function getLocalStorage() {
  let storedRecords = JSON.parse(localStorage.getItem('games'));

  if (storedRecords == null || storedRecords.length == 0) return;
  recordsHistory = storedRecords;
  refreshListContent();
}

function findWinCombo(board) {
  for (let [a, b ,c] of winSequences) {
    if (board[a] == '') continue;
    if(board[a] == board[b] && board[b] == board[c]) {
      currentWinCombo = [a, b, c];
      break
    }
  }
};

function paintWinCells() {
  findWinCombo(virtBoard);
  console.log(currentWinCombo);
  for (let idx of currentWinCombo) {
    cells[idx].classList.add('win')
  }
};