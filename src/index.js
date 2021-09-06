module.exports = function solveSudoku(board) {
  solve(board);
  return board;
}

function solve(board) {
  const size = board.length;
  const currPos = findEmpty(board);

  if (currPos === null) {
    return true;
  }

  for (let i = 1; i < size + 1; i++) {
    const currNum = i;
    const isValid = validate(currNum, currPos, board);

    if (isValid) {
      const [x, y] = currPos;
      board[x][y] = currNum;

      if (solve(board)) {
        return true;
      }

      board[x][y] = 0;
    }
  }

  return false;
}

function findEmpty(board) {
  const size = board.length;

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (board[r][c] === 0) {
        return [r, c];
      }
    }
  }

  return null;
}

function validate(num, pos, board) {
  const size = board.length;
  const boxSize = Math.sqrt(size);

  const [r, c] = pos;

  // check rows
  for (let i = 0; i < size; i++) {
    if (i !== r && board[i][c] === num) {
      return false;
    }
  }

  // check cols
  for (let i = 0; i < size; i++) {
    if (i !== c && board[r][i] === num) {
      return false;
    }
  }

  // check box
  const boxRow = Math.floor(r / boxSize) * boxSize;
  const boxCol = Math.floor(c / boxSize) * boxSize;

  for (let i = boxRow; i < boxRow + boxSize; i++) {
    for (let j = boxCol; j < boxCol + boxSize; j++) {
      if (i !== r && j !== c && board[i][j] === num) {
        return false;
      }
    }
  }

  return true;
}
