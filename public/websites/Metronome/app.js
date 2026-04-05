const PLAY = 'fa-solid fa-play fa-4x'
const PAUSE = 'fa-solid fa-pause fa-4x'
const bpm = document.getElementById('bpm')
const btn = document.getElementById('btn')
const btnBack = document.getElementById('btnBack')
const semi1 = document.getElementById('semi1')
const semi2 = document.getElementById('semi2')
const semi3 = document.getElementById('semi3')
const semi4 = document.getElementById('semi4')
const beep = new Audio('beep.mp3')
let isPaused = true
let myInterval
let num = 0

btn.addEventListener('click', handleClick)
window.addEventListener('keydown', e => {
  if (e.key !== ' ') return
  handleClick()
})

function handleClick () {
  isPaused = !isPaused
  const bpmInt = Math.floor(60000 / bpm.value)
  if (isPaused === false) {
    btn.setAttribute('class', PAUSE)
    myInterval = setInterval(handleInterval, bpmInt)
  } else if (isPaused === true) {
    clearInterval(myInterval)
    btn.setAttribute('class', PLAY)
    semi1.setAttribute('class', 'semi1')
    semi2.setAttribute('class', 'semi2')
    semi3.setAttribute('class', 'semi3')
    semi4.setAttribute('class', 'semi4')
    num = 0
    return num
  }
}

function handleInterval () {
  num++
  if (num > 4) num = 1
  console.log(num)
  beep.play()
  switch (num) {
    case 1:
      semi4.setAttribute('class', 'semi4')
      semi1.setAttribute('class', 'red1')
      break
    case 2:
      semi1.setAttribute('class', 'semi1')
      semi2.setAttribute('class', 'red2')
      break
    case 3:
      semi2.setAttribute('class', 'semi2')
      semi3.setAttribute('class', 'red3')
      break
    case 4:
      semi3.setAttribute('class', 'semi3')
      semi4.setAttribute('class', 'red4')
      break
  }
}
