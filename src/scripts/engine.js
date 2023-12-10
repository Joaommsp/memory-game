const emojis = [
  "😎",
  "😎",
  "😍",
  "😍",
  "😱",
  "😱",
  "😡",
  "😡",
  "😼",
  "😼",
  "💀",
  "💀",
  "👽",
  "👽",
  "💩",
  "💩",
  "🐵",
  "🐵",
  "❤",
  "❤"
]
let openCards = []

let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2: -1))

emojis.forEach((element, i) => {
  let box = document.createElement("div")
  box.classList.add("item")
  box.classList.add("boxOpen")
  box.onclick = handleClick
  box.innerHTML = shuffleEmojis[i]
  box.style.pointerEvents = "none"
  box.id = `card#${i}`
  document.querySelector(".game").appendChild(box)

  setInterval(() => {
    box.classList.remove("boxOpen")
    box.style.pointerEvents = "all"
  }, 6000)
}) 
  
function handleClick() {
  if(openCards.length < 2) {
    this.classList.add("boxOpen")
    openCards.push(this)
  }
  if(openCards.length == 2) {
    setTimeout(checkMatch, 500)
  }
  console.log(openCards)
}

function checkMatch() {
  if(openCards[0].innerHTML === openCards[1].innerHTML && openCards[0].id != openCards[1].id ) {
    sound("correct.mp3")
    openCards[0].classList.add("boxMatch")
    openCards[1].classList.add("boxMatch")
    openCards[1].style.pointerEvents = "none"
    openCards[0].style.pointerEvents = "none"
    count.textContent = `Muito Bem!`
  }
  else {
    sound("missed.mp3")
    openCards[0].classList.remove("boxOpen")
    openCards[1].classList.remove("boxOpen")
    count.textContent = `Tente novamente!`
  }

  openCards = []

  if(document.querySelectorAll(".boxMatch").length === emojis.length) {
    count.textContent = `Parabéns`

    let resetGame = setInterval(() => {
      alert("Você venceu!!")
      window.location.reload()
      clearInterval(resetGame)
    }, 2000)
    
  }
}

function sound(soundName) {
  let audio = new Audio(`./src/sounds/${soundName}`)
  audio.volume = 0.8
  audio.play()
}

let count = document.getElementById("count")
let currentTime = 5

function countDown() {
  console.log(count)
  count.textContent = `O jogo vai começar em ${currentTime} segundos`
  currentTime --
}

function initialize() {
  let initializeGame =  setInterval(() => {
    countDown()
    console.log(currentTime)

      if(currentTime == -1 ) {
        clearInterval(initializeGame)
        count.textContent = "Vamos Lá!"
      }
      
  }, 1000)

  
}
  initialize()