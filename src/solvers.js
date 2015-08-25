/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(num) {
  var board = new Board({'n':num});
  var solution = []; //fixme
  var rookCounter = 0;
  var rowCounter = 0;
  if (num === 1 || num === 0) {
    return [[1]];
  }
  for (var i = 0; i < num - 1; i++){
    board.attributes[rowCounter][i] = 0;
    rowCounter++;
  } 

  var recurse = function (matrix) {
    var row = 0;
    var col = 0;

    if(matrix.hasAnyRooksConflicts()){
      return false;
    }

    if(rookCounter === num){
      return matrix.rows();
    }

    for(row=0; row <= num - 1; row++){
      for(col=0; col <= num - 1; col++){
        if(col === 1 && row === 1){

        }
        if(matrix.attributes[row][col] === 1){
        }

        else {
          matrix.attributes[row][col] = 1;
          rookCounter++;
          var result = recurse(matrix);

          if(result){
            return matrix;
          } 

          else {
            matrix.attributes[row][col] = 0;
            rookCounter--;
          }

        }
      }
    }
  }

  solution = recurse(board);
  solution = solution.rows();
  console.log('Single solution for ' + num + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solution = undefined; //fixme
  //
  //everytime it returns true increment solutionCount
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
