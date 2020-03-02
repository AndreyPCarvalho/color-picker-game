let squaresNum
let colors = []
let pickedColor
let squareArr = document.querySelectorAll('.square')
let colorDisplay = document.getElementById('colorDisplay')
let header = document.querySelector('#header')
let restartBtn = document.querySelector('button')
let buttons = document.querySelectorAll('button')
let modeButtons = document.querySelectorAll('.mode')


init()

function init(){
  resetGame(6)
  pickedColor = pickRandColor()
  colorDisplay.textContent = pickedColor
  for(let i = 0; i < modeButtons.length; i++){
    modeButtons[i].addEventListener('click', function(){
      modeButtons[0].classList.remove('selected')
      modeButtons[1].classList.remove('selected')
      modeButtons[2].classList.remove('selected')
      this.classList.add('selected')
      resetGame((i+1)*3)
    })
  }
  for(let i = 0; i < squareArr.length; i++){
    //add initial colors to the squares
    squareArr[i].style.backgroundColor = colors[i]
  
    //add event listeners to the squares
    squareArr[i].addEventListener('click',function(){
      //compare if the picked color is equal to one on the clicked square
      let clickedColor = this.style.backgroundColor
      if(clickedColor === pickedColor){
        //change all squares to have the picked color
        //change colors button changes to 'play again?' button
        changeColors(pickedColor)
        document.querySelector('#message').textContent = 'Correct!'
        header.style.backgroundColor = pickedColor
        for(let i=0; i<buttons.length; i++){
          buttons[i].style.color = clickedColor
        }
        restartBtn.textContent = 'Play Again?'
      }
      else{
        //hide the square with a fade out
        document.querySelector('#message').textContent = 'Try Again'
        this.style.backgroundColor = '#232323'
      }
    })
  }
  restartBtn.addEventListener('click', function(){
    if(modeButtons[0].classList.contains('selected')){
      resetGame(3)
    }
    else if(modeButtons[1].classList.contains('selected')){
      resetGame(6)
    }
    else{
      resetGame(9)
    }
  })
}

function changeColors(color){
  for(let i=0; i<squareArr.length; i++){
    squareArr[i].style.backgroundColor = color
  }
}

function pickRandColor(){
  const randInt = Math.floor(Math.random()*colors.length)
  return colors[randInt]
}

function getRandomColors(numOfSquares){
  //create an array
  let colorArr = []
  //add random colors to the array
  for(let i=0; i<numOfSquares; i++){
    colorArr[i] = 'rgb('+
    Math.floor(Math.random()*255 + 1)+
    ', '+
    Math.floor(Math.random()*255 + 1)+
    ', '+
    Math.floor(Math.random()*255 + 1)+
    ')'
  }
  //return it
  return colorArr
}

function resetGame(num){
  //receive the max of squares as a parameter (num)

  //fills the array with the number of colors
  colors = getRandomColors(num)
  
  //sets the colors to the maximum number of squares passed as the parameter
  for( let i = 0; i < squareArr.length; i++ ){
    if(colors[i]){
      squareArr[i].style.backgroundColor = colors[i]
      squareArr[i].style.display = 'block'
    }
    else{
      //hides the squares that shouldn't be colored
      squareArr[i].style.display = 'none'
    }
  }
  header.style.backgroundColor = '#2359AB'
  for(let i=0; i<buttons.length; i++){
    buttons[i].style.color = '#2359AB'
  }
  pickedColor = pickRandColor()
  colorDisplay.textContent = pickedColor
  document.querySelector('#message').textContent = ''
  restartBtn.textContent = 'New Colors'
}