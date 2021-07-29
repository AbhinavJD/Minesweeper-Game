import { Component, OnInit } from '@angular/core';
const TOTAL_COLUMNS = 10
const TOTAL_ROWS = 10
const TOTAL_BOMB = 10
@Component({
  selector: 'app-mineswepper',
  templateUrl: './mineswepper.component.html',
  styleUrls: ['./mineswepper.component.styl']
})

export class MineswepperComponent implements OnInit {
  totalMines: any;
  startDisableBtn = false;
  showAllCellValue = false; // true to show all cells Values flag
  highlightBombColor = false;
  lost = 0;
  constructor() { }
  gameDataValueArray = [];
  tempClickedCells = [];
  ngOnInit() {
    this.totalMines = TOTAL_BOMB;
    this.getRandomNumbers()
    this.plotBomb(this.gameDataValueArray);
    this.getHintData(this.gameDataValueArray);
  }

  //initial Array ready with 0 as values
  getRandomNumbers(){
    for (let index = 0; index < TOTAL_ROWS; index++) {
      let rowWiseColumnValueArray = [];
      for (let index = 0; index < TOTAL_COLUMNS; index++) {
        // const randNumber = Math.floor((Math.random() * 3) + 1);
        // rowWiseColumnValueArray.push(randNumber);
        rowWiseColumnValueArray.push(0);
      }
      this.gameDataValueArray.push(rowWiseColumnValueArray);
    }
    console.log('initial array:', this.gameDataValueArray);
  }
  //Bomb Plant in array
  plotBomb(gameDataArray){
    for (let index = 0; index < TOTAL_BOMB; index++) {
      const rowRandNumber = Math.floor((Math.random() * TOTAL_ROWS));
      const colRandNumber = Math.floor((Math.random() * TOTAL_COLUMNS));
      gameDataArray[rowRandNumber][colRandNumber] = 'B'
    }
    console.log('plot bomb: ', gameDataArray);
  }
  //get hints where the bomb is
  getHintData(gameDataArray){
    for (let row = 0; row < gameDataArray.length  ; row++) {
      for (let col = 0; col < gameDataArray[row].length ; col++) {
        
        const element = gameDataArray[row][col];
        if(element == 'B'){
          this.checkIfPreviousNeighbourExists(gameDataArray, row, col);
        }
      }
    }
    console.log('hintdata: ', gameDataArray)
  }
  //checking neighbours cells present or not
  checkIfPreviousNeighbourExists(dataArray, row, col){
    this.checkUpperRow(dataArray, row, col);
    this.checkMiddleRow(dataArray, row, col);
    this.checkBottomRow(dataArray, row, col);
  }
  checkUpperRow(dataArray, row, col){
    let tempRow = row - 1 
    let tempCol = col - 1
    for (let i = 0; i < 3; i++) {
      if(tempRow != -1 && tempCol != -1 && tempRow != dataArray.length && tempCol != dataArray[tempRow].length){
        let val = this.checkValueForValuesInCell(dataArray, tempRow, tempCol)
        dataArray[tempRow][tempCol] = val
        //tempCol += 1
      }
      tempCol += 1
    }
  }
  checkMiddleRow(dataArray, row, col){
    let tempRow = row 
    let tempCol = col - 1
    for (let i = 0; i < 3; i++) {
      if(tempRow != -1 && tempCol != -1 && tempRow != dataArray.length && tempCol != dataArray[tempRow].length){
        let val = this.checkValueForValuesInCell(dataArray, tempRow, tempCol)
        dataArray[tempRow][tempCol] = val
        //tempCol += 1
      }
      tempCol += 1
    }
  }
  checkBottomRow(dataArray, row, col){
    let tempRow = row + 1
    let tempCol = col - 1
    for (let i = 0; i < 3; i++) {
      if(tempRow != -1 && tempCol != -1 && tempRow != dataArray.length && tempCol != dataArray[tempRow].length){
        let val = this.checkValueForValuesInCell(dataArray, tempRow, tempCol)
        dataArray[tempRow][tempCol] = val
        //tempCol += 1
      }
      tempCol += 1
    }
  }
  checkValueForValuesInCell(dataArray, row, col){
    let val = dataArray[row][col]
    if(val == '0') {
      return val = '1';
    } else if(val == '1'){
      return val = '2';
    } else if(val == '2') {
      return val = '3';
    } else if(val == '3') {
      return val = '4';
    } else if(val == 'B') {
      return val;
    }
  }
  startGame(){
    this.startDisableBtn = true;
  }
  resetGame(){
    this.gameDataValueArray = []
    this.getRandomNumbers()
    this.plotBomb(this.gameDataValueArray);
    this.getHintData(this.gameDataValueArray);
    this.startDisableBtn = false;
    //startDisableBtn = false;
    this.showAllCellValue = false; // true to show all cells Values flag
    this.highlightBombColor = false;
    this.totalMines = 10
  }

  // Clicked on cell
  clickedOnCell(rowIndex, colIndex, $event){
    this.checkCellValue(rowIndex, colIndex, $event);
    this.openCell($event);
    const isCellPresent = this.isCellAlreadyClicked(rowIndex,colIndex);
    if(!isCellPresent){
      this.tempClickedCells.push(colIndex);
    } else {
      console.log('already present')
    }
  }
  // check cell value
  checkCellValue(rowIndex, colIndex, $event){
    const value = $event.srcElement.innerText;
    if(value == 'B') {
      console.log('Clicked on Bomb!')
    
      this.showAllCells()
    }
  }
  // Check in array element already exits
  isCellAlreadyClicked(rowIndex, colIndex){
    if(this.tempClickedCells.indexOf(rowIndex+colIndex) != -1){
      return true;
    } else {
      return false;
    }
  }

  // cell opened on click
  openCell(event){
    event.srcElement.classList.add("clicked");
  }
  //show All cells Value if clicked on Bomb
  showAllCells(){
    this.showAllCellValue = true;
    this.highlightBombColor = true
    this.lost += 1;
  }

  onRightClick(event){
    var isPresent = event.srcElement.classList.contains("mark");
    if(this.totalMines != 0 || isPresent){
      if(!isPresent){
        event.srcElement.classList.add("mark");
        this.totalMines = this.totalMines - 1;
      } else {
        event.srcElement.classList.remove("mark");
        this.totalMines = this.totalMines + 1;
      }
    }
    return false;
  }
}


// let previousRow;
//     let nextRow;
//     let previousCol;
//     let nextCol;
//     if(row - 1 != -1) {
//       previousRow = row - 1
//     } else {
//       previousRow = row
//     }
//     if(row != dataArray.length) {
//       nextRow = row + 1
//     } else {
//       nextRow = row
//     }
//     if(col - 1 != -1) {
//       previousCol = col - 1 
//     } else {
//       previousCol = col
//     }
//     if(col != dataArray.length) {
//       nextCol = col + 1
//     } else {
//       nextCol = col
//     }
//     // previous row
//     if(dataArray[previousRow][previousCol] != undefined){
//       let val = this.checkValueForValuesInCell(dataArray, previousRow, previousCol)
//       dataArray[previousRow][previousCol] = val;
//     }
//     if(dataArray[previousRow][col] != undefined ){
//       let val = this.checkValueForValuesInCell(dataArray, previousRow, col)
//       dataArray[previousRow][col] = val;
//     }
//     if(dataArray[previousRow][nextCol] != undefined ){
//       let val = this.checkValueForValuesInCell(dataArray, previousRow, nextCol)
//       dataArray[previousRow][nextCol] = val;
//     }
//     // currentRow
//     if(dataArray[row][previousCol] != undefined ){
//       let val = this.checkValueForValuesInCell(dataArray, row, previousCol)
//       dataArray[row][previousCol] = val;
//     }
//     if(dataArray[row][col] != undefined){
//       let val = this.checkValueForValuesInCell(dataArray, row, col)
//       dataArray[row][col] = val;
//     }
//     if(dataArray[row][nextCol] != undefined ){
//       let val = this.checkValueForValuesInCell(dataArray, row, nextCol)
//       dataArray[row][nextCol] = val;
//     }
//     // next row
//     if(dataArray[nextRow][previousCol] != undefined ){
//       let val = this.checkValueForValuesInCell(dataArray, nextRow, previousCol)
//       dataArray[nextRow][previousCol] = val;
//     }
//     if(dataArray[nextRow][col] != undefined ){
//       let val = this.checkValueForValuesInCell(dataArray, nextRow, col)
//       dataArray[nextRow][col] = val;
//     }
//     if(dataArray[nextRow][nextCol] != undefined ){
//       let val = this.checkValueForValuesInCell(dataArray, nextRow, nextCol)
//       dataArray[nextRow][nextCol] = val;
//     }