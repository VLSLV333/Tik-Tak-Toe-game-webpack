let oScore = 0
let xScore = 0

let row1X = 0
let row1O = 0
let row2X = 0 
let row2O = 0
let row3X = 0
let row3O = 0
let row4X = 0
let row4O = 0
let row5X = 0
let row5O = 0
let row6X = 0
let row6O = 0
let diag1X = 0
let diag1O = 0
let diag2X = 0
let diag2O = 0

let moves = 0

let winningRow

function randomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min) + min);
}

function randomlyChooseActivePlayer(){
    let playersClass = ['x','o']
    let activePlayer
    let waitingPlayer
    let lastIndex = 2

    switch(playersClass[randomNumber(0,lastIndex)]){
        case 'x':
            activePlayer = document.getElementsByClassName('x')
            activePlayer[0].setAttribute('id', 'active')
            activePlayer[0].innerText = 'Player X, it is Your move'
            waitingPlayer = document.getElementsByClassName('o') 
            waitingPlayer[0].setAttribute('id', 'waiting')
            waitingPlayer[0].innerText = 'Player O, wait for X to move'
            break
        case 'o':
            activePlayer = document.getElementsByClassName('o')
            activePlayer[0].setAttribute('id', 'active')
            activePlayer[0].innerText = 'Player O, it is Your move'
            waitingPlayer = document.getElementsByClassName('x') 
            waitingPlayer[0].setAttribute('id', 'waiting')
            waitingPlayer[0].innerText = 'Player X, wait for O to move'
            break
        default:
            break
    }
}

randomlyChooseActivePlayer()

function changeActivePlayer(actLetter){
    let waitLetter
    if (actLetter === 'x'){
        waitLetter = 'o'
    } else{
        waitLetter = 'x'
    }
    let activePlayerSign = document.getElementById('active')
    let waitingPlayerSign = document.getElementById('waiting')
    activePlayerSign.setAttribute('id', 'waiting')
    waitingPlayerSign.setAttribute('id', 'active')
    waitingPlayerSign.innerText = `Player ${waitLetter.toUpperCase()}, it is Your move`
    activePlayerSign.innerText = `Player ${actLetter.toUpperCase()}, wait for ${waitLetter.toUpperCase()} to move`
}

function placeSigns(btn){
    let activePlayerSign = document.getElementById('active')
    btn.classList.add(activePlayerSign.classList[0])
    btn.innerText = activePlayerSign.classList[0].toUpperCase()
    changeActivePlayer(activePlayerSign.classList[0])  
}

function getVarName(varObj){
    clearRowPoints()
    return Object.keys(varObj)[0]
}

function clearRowPoints(){
    row1X = 0
    row1O = 0
    row2X = 0
    row2O = 0
    row3X = 0
    row3O = 0
    row4X = 0
    row4O = 0
    row5X = 0
    row5O = 0
    row6X = 0
    row6O = 0
    diag1X = 0
    diag1O = 0
    diag2X = 0
    diag2O = 0
    moves = 0
    winningRow = undefined
}

function changeWinnerRow(winer, num){
    for (let i = 0; i < winer.length; i++){
        winer[i].classList.add(`win${num}`)
    }
}

function changeScore(){
    let winnerPlayerSign = document.getElementById('waiting')
    let winnerTable
    switch(winnerPlayerSign.classList[0]){
        case 'o':
            winnerTable = document.getElementById('oScore')
            oScore++ 
            winnerTable.innerText = `Player O score: ${oScore}`
            break
        case 'x':
            winnerTable = document.getElementById('xScore')
            xScore++ 
            winnerTable.innerText = `Player X score: ${xScore}`
            break
        default:
            break
    }
}

function showMessage(){
    let timeOutToClearMessage = 2500
    let messageP = document.getElementById('message')
    let winnerPlayerSign = document.getElementById('waiting')
    messageP.innerText = `Player ${winnerPlayerSign.classList[0].toUpperCase()} Won!`
    messageP.classList.toggle('visible')
    setTimeout( () => messageP.classList.toggle('visible'),timeOutToClearMessage)
}

function clearWinId(){
    let winIdElement = document.getElementsByClassName('win')
    let winIdElement2 = document.getElementsByClassName('win2')
    let winIdElement3 = document.getElementsByClassName('win3')
    let winIdElement4 = document.getElementsByClassName('win4')
    if(winIdElement.length !== 0){
        for (let i = winIdElement.length - 1; i >= 0; i--){
            winIdElement[i].classList.remove('win')
        }
    } else if(winIdElement2.length !== 0){
        for (let i = winIdElement2.length - 1; i >= 0; i--){
            winIdElement2[i].classList.remove('win2')
        }
    } else if(winIdElement3.length !== 0){
        for (let i = winIdElement3.length - 1; i >= 0; i--){
            winIdElement3[i].classList.remove('win3')
        }
    } else if(winIdElement4.length !== 0){
        for (let i = winIdElement4.length - 1; i >= 0; i--){
            winIdElement4[i].classList.remove('win4')
        }
    }
}

function newGame(){
    let btns = document.getElementsByClassName('btn')
    for(let i = 0; i < btns.length; i++){
       btns[i].innerText = ''
       if(btns[i].classList.contains('o')){
        btns[i].classList.toggle('o')
       } else if (btns[i].classList.contains('x')){
       btns[i].classList.toggle('x')
    }
}
    clearRowPoints()
    randomlyChooseActivePlayer()
    clearWinId()
}

function win(str){
    let winerRow = document.getElementsByClassName(str)
    let sliceIndex1 = -1
    let sliceIndex2 = -2
    let winnerRows = 3
    let winnerRows2 = 6
    if (str.slice(sliceIndex1) <= winnerRows && str.slice(sliceIndex2, sliceIndex1) === 'w'){
        changeWinnerRow(winerRow, '')
    } else if (str.slice(sliceIndex1) <= winnerRows2 && str.slice(sliceIndex2, sliceIndex1) === 'w'){
        changeWinnerRow(winerRow, '2')
    } else if (str.slice(sliceIndex1) === '1' && str.slice(sliceIndex2, sliceIndex1) === 'g'){
        changeWinnerRow(winerRow, '3')
    } else if (str.slice(sliceIndex1) === '2' && str.slice(sliceIndex2, sliceIndex1) === 'g'){
        changeWinnerRow(winerRow, '4')
    }
    showMessage()
    changeScore()   
}

function draw(){
    let timeOutToClearMessage = 2500
    let messageP = document.getElementById('message')
    messageP.innerText = `Draw!`
    messageP.classList.toggle('visible')
    setTimeout( () => messageP.classList.toggle('visible'),timeOutToClearMessage)
    let score1 = document.getElementById('oScore')
    oScore++ 
    score1.innerText = `Player O score: ${oScore}`
    let score2 = document.getElementById('xScore')
    xScore++ 
    score2.innerText = `Player X score: ${xScore}`
}

function followGame(btn, actClass){
   let pointsToWin = 3
   let sliceEndIndex = -1
   let numberOfMovesForDraw = 9

   let midBtnCheck1 = btn.classList.contains('row2') && btn.classList.contains('row5')
   let midBtnCheck2 = btn.classList.contains('diag1') && btn.classList.contains('diag2')

   let leftUpCheck = btn.classList.contains('diag1') && btn.classList.contains('row1') && btn.classList.contains('row4')
   let rightUpCheck = btn.classList.contains('diag2') && btn.classList.contains('row1') &&btn.classList.contains('row6')

   let leftBotCheck = btn.classList.contains('diag2') && btn.classList.contains('row3') &&btn.classList.contains('row4')
   let rightBotCheck = btn.classList.contains('diag1') && btn.classList.contains('row3')&&btn.classList.contains('row6')

   let midUpCheck = btn.classList.contains('row1') && btn.classList.contains('row5')
   let midbotCheck = btn.classList.contains('row3') && btn.classList.contains('row5')

   let leftMidCheck = btn.classList.contains('row2') && btn.classList.contains('row4')
   let rightMidCheck = btn.classList.contains('row2') && btn.classList.contains('row6')

    if (midBtnCheck1 && midBtnCheck2 && actClass === 'x'){
        row2O++
        row5O++
        diag1O++
        diag2O++
        moves++
    } else if (midBtnCheck1 && midBtnCheck2 && actClass === 'o'){
        row2X++
        row5X++
        diag1X++
        diag2X++
        moves++
    } else if (leftUpCheck && actClass === 'x'){
        row1O++
        row4O++
        diag1O++
        moves++
    } else if (leftUpCheck && actClass === 'o'){
        row1X++
        row4X++
        diag1X++
        moves++
    } else if (rightUpCheck && actClass === 'x'){
        row1O++
        row6O++
        diag2O++
        moves++
    } else if (rightUpCheck && actClass === 'o'){
        row1X++
        row6X++
        diag2X++
        moves++
    } else if (leftBotCheck && actClass === 'x'){
        row3O++
        row4O++
        diag2O++
        moves++
    } else if (leftBotCheck && actClass === 'o'){
        row3X++
        row4X++
        diag2X++
        moves++
    } else if (rightBotCheck && actClass === 'x'){
        row3O++
        row6O++
        diag1O++
        moves++
    } else if (rightBotCheck && actClass === 'o'){
        row3X++
        row6X++
        diag1X++
        moves++
    } else if (midUpCheck && actClass === 'x'){
        row1O++
        row5O++
        moves++
    } else if (midUpCheck && actClass === 'o'){
        row1X++
        row5X++
        moves++
    } else if (midbotCheck && actClass === 'x'){
        row3O++
        row5O++
        moves++
    } else if (midbotCheck && actClass === 'o'){
        row3X++
        row5X++
        moves++
    } else if (leftMidCheck && actClass === 'x'){
        row2O++
        row4O++
        moves++
    } else if (leftMidCheck && actClass === 'o'){
        row2X++
        row4X++
        moves++
    } else if (rightMidCheck && actClass === 'x'){
        row2O++
        row6O++
        moves++
    } else if (rightMidCheck && actClass === 'o'){
        row2X++
        row6X++
        moves++
    }
    if( row1O === pointsToWin) {
        winningRow = getVarName({ row1O }).slice(0,sliceEndIndex)
    } else if (row1X === pointsToWin){
        winningRow = getVarName({ row1X }).slice(0,sliceEndIndex)
    } else if (row2O === pointsToWin){
        winningRow = getVarName({ row2O }).slice(0,sliceEndIndex)
    } else if (row2X === pointsToWin){
        winningRow = getVarName({ row2X }).slice(0,sliceEndIndex)
    } else if (row3O === pointsToWin){
        winningRow = getVarName({ row3O }).slice(0,sliceEndIndex)
    } else if (row3X === pointsToWin){
        winningRow = getVarName({ row3X }).slice(0,sliceEndIndex)
    } else if (row4O === pointsToWin){
        winningRow = getVarName({ row4O }).slice(0,sliceEndIndex)
    } else if (row4X === pointsToWin){
        winningRow = getVarName({ row4X }).slice(0,sliceEndIndex)
    } else if (row5O === pointsToWin){
        winningRow = getVarName({ row5O }).slice(0,sliceEndIndex)
    } else if (row5X === pointsToWin){
        winningRow = getVarName({ row5X }).slice(0,sliceEndIndex)
    } else if (row6O === pointsToWin){
        winningRow = getVarName({ row6O }).slice(0,sliceEndIndex)
    } else if (row6X === pointsToWin){
        winningRow = getVarName({ row6X }).slice(0,sliceEndIndex)
    } else if (diag1O === pointsToWin){
        winningRow = getVarName({ diag1O }).slice(0,sliceEndIndex)
    } else if (diag1X === pointsToWin){
        winningRow = getVarName({ diag1X }).slice(0,sliceEndIndex)
    } else if (diag2O === pointsToWin){
        winningRow = getVarName({ diag2O }).slice(0,sliceEndIndex)
    } else if (diag2X === pointsToWin){
        winningRow = getVarName({ diag2X }).slice(0,sliceEndIndex)
    } else if ( moves === numberOfMovesForDraw){
       draw()
    }
    if (winningRow !== undefined){
        win(winningRow)
    }
}

let buttons = document.getElementsByClassName('btn')

for(let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('click', () => {
        if (winningRow !== undefined){
            newGame()
        }
        if (buttons[i].classList.contains('x') || buttons[i].classList.contains('o')){
            return
        }
        placeSigns(buttons[i])
        let activePlayerSign = document.getElementById('active')
        followGame(buttons[i], activePlayerSign.classList[0])
    })
}

let newGameBtn = document.getElementById('newG')


newGameBtn.addEventListener('click', () => newGame())