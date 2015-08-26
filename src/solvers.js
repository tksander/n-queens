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
    if(matrix.hasAnyRooksConflicts()){
      
      return false;
    }

    if(rookCounter === num){
      
      return matrix.rows();
    }

    for(row=0; row <= num - 1; row++){
      for(col=0; col <= num - 1; col++){
        
        if(matrix.attributes[row][col] === 1){
          // do nothing
        }

        else {
          
          matrix.attributes[row][col] = 1;
          rookCounter++;
          var result = recurse(matrix);

          if(result){
            
            return matrix;
            
            //increment solution counter;
            //toggle initial rook. 
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
window.countNRooksSolutions = function(num) {
  var board = new Board({'n':num});
  var rookCounter = 0;
  var solutionCount = 0;
  var rowCounter = 0;
  var row = 0;

  if (num === 1 || num === 0) {
    return 1;
  }

  for (var i = 0; i < num - 1; i++){
    board.attributes[rowCounter][i] = 0;
    rowCounter++;
  } 

  var recurse = function (matrix, rowIndex) {

  // check if passed matrix is valid  
    if(rookCounter === num){

      solutionCount++;
      rowIndex--;

      return;
    }

    for(var col = 0; col < num; col++) {
      //toggle rook
      matrix.attributes[rowIndex][col] = 1;
      //check to see if the current board has any conflicts
      if(matrix.hasAnyColConflicts()){
        //due to conflict toggle off rook;
        matrix.attributes[rowIndex][col] = 0;

      }
      else {
    
        rowIndex++;
        rookCounter++;


        recurse(matrix, rowIndex); 

        rookCounter--;
        rowIndex--;
        matrix.attributes[rowIndex][col] = 0;
      }

    }

    //start at row 0 insert rook at column 0
    //recurse with new board
    //start at row 1 insert rook at column 0
    //check for conflicts and solution
      //if there is a conflict toggle back to 0
      

  }


  recurse(board, row);



  //everytime it returns true increment solutionCount
  console.log('Number of solutions for ' + num + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(num) {
  var solution = []; 
  var board = new Board({'n':num});
  var rookCounter = 0;
  var solutionCount = 0;
  var rowCounter = 0;
  var row = 0;

  if (num === 1) {
    return [[1]];
  }
 

  for (var i = 0; i < num - 1; i++){
    board.attributes[rowCounter][i] = 0;
    rowCounter++;
  } 

  var recurse = function (matrix, rowIndex) {
  // check if passed matrix is valid  
    if(rookCounter === num){

      return matrix.rows();
    }

    for(var col = 0; col < num; col++) {
      //toggle rook
      matrix.attributes[rowIndex][col] = 1;
      //check to see if the current board has any conflicts

      if(matrix.hasAnyColConflicts() || matrix.hasAnyMajorDiagonalConflicts() || matrix.hasAnyMinorDiagonalConflicts()){
        //due to conflict toggle off rook;
        matrix.attributes[rowIndex][col] = 0;

      }
      else {
  
        rowIndex++; 
        rookCounter++;


        var result = recurse(matrix, rowIndex); 
        if(result){

          return result;
        }
        rookCounter--;
        rowIndex--;
        matrix.attributes[rowIndex][col] = 0;

      }

    }
    
  }


  solution = recurse(board, row);
  if(solution === undefined){
    
    solution = board.rows();
    return solution;
  }
  console.log('Single solution for ' + num + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(num) {
  var solution = []; 
  var board = new Board({'n':num});
  var rookCounter = 0;
  var solutionCount = 0;
  var rowCounter = 0;
  var row = 0;

  if (num === 1) {
    return 1;
  }
 

  for (var i = 0; i < num - 1; i++){
    board.attributes[rowCounter][i] = 0;
    rowCounter++;
  } 

  var recurse = function (matrix, rowIndex) {
  // check if passed matrix is valid  
    if(rookCounter === num){
      solutionCount++;
      rowCounter--;
      return;
    }

    for(var col = 0; col < num; col++) {
      //toggle rook
      matrix.attributes[rowIndex][col] = 1;
      //check to see if the current board has any conflicts

      if(matrix.hasAnyColConflicts() || matrix.hasAnyMajorDiagonalConflicts() || matrix.hasAnyMinorDiagonalConflicts()){
        //due to conflict toggle off rook;
        matrix.attributes[rowIndex][col] = 0;

      }
      else {
  
        rowIndex++; 
        rookCounter++;


        var result = recurse(matrix, rowIndex); 
        if(result){

          return result;
        }
        rookCounter--;
        rowIndex--;
        matrix.attributes[rowIndex][col] = 0;

      }

    }
    
  }


  recurse(board, row);

  console.log('Number of solutions for ' + num + ' queens:', solutionCount);
  return solutionCount;
};
