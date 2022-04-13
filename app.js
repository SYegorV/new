const slides = document.querySelectorAll('.slide')

// активные слайды [0-5]:
// slides[5].classList.add('active')

/* убрать анимацию со слайдов и добавить на активный слайд*/
/* of - ключевое слово откуда будем брать*/
for (const slide of slides) {
    /*click - название события*/
    /*addEventListener добавление слушателей*/
    slide.addEventListener('click', () => {
        /* создадим функцию --- clearActiveClasses() */
        clearActiveClasses() 
        slide.classList.add('active') /*добавляем наш класс active*/
    })
}

function clearActiveClasses() {
    /* метод forEach */
    /* slide на каждой итерации */
    slides.forEach((slide) => {
        slide.classList.remove('active')
    })
}
///////////////////////////////////////////////////////////////////
const item = document.querySelector('.item')
// запрос к классу:
const placeholders = document.querySelectorAll('.placeholder')

item.addEventListener('dragstart', dragstart) // первое событие 
item.addEventListener('dragend', dragend) // второе событие

for (const placeholder of placeholders) {
    placeholder.addEventListener('dragover', dragover)
    placeholder.addEventListener('dragenter', dragenter)
    placeholder.addEventListener('dragleave', dragleave)
    placeholder.addEventListener('drop', dragdrop) // отпустили
}

function dragstart(event) {
    // console.log('drag start', event.target) // отслеживаем в консоли
    event.target.classList.add('hold') // класс hold в css
    setTimeout( () => event.target.classList.add('hide'), 0 ) // продвинутая функция
}

function dragend(event) {
    // console.log('drag end') // отслеживаем в консоли
    event.target.className = 'item' // на выбор
    // event.target.classList.remove('hold', 'hide') //удалить класс
}
/////////////////////////////////////////////////////////////////////////
function dragover(event) {
    event.preventDefault()
    // console.log('drag over') // отслеживаем в консоли
}

function dragenter(event) {
    event.target.classList.add('hovered') // наведенный
    // console.log('drag enter') // отслеживаем в консоли
}

function dragleave(event) {
    event.target.classList.remove('hovered') //удалить
    // console.log('drag leave') // отслеживаем в консоли
}

function dragdrop(event) {
    event.target.classList.remove('hovered')
    event.target.append(item)
    // console.log('drag drop') // отслеживаем в консоли
}



//      slider:                    //////////////////////////////////////

const upBtn = document.querySelector('.up-button')
const downBtn = document.querySelector('.down-button')
const sidebar = document.querySelector('.sidebar')
const container33 = document.querySelector('.container33')

// подсчет слайдов:
const mainSlide = document.querySelector('.main-slide')
const slidesCount = mainSlide.querySelectorAll('div').length // получаем все div (массив и коллекция)
//а какой слайд активный?
let activeSlideIndex = 0

sidebar.style.top = `-${(slidesCount-1)*300}px`     //vh`   //`-300vh`

upBtn.addEventListener('click', () => {
    changeSlide('up')
})

downBtn.addEventListener('click', () => {
    changeSlide('down')    
})

function changeSlide(direction) {
    if (direction === 'up') {
        activeSlideIndex++
        if (activeSlideIndex === slidesCount) {
            activeSlideIndex = 0
        }
    } else if (direction === 'down') {
        activeSlideIndex--
        if (activeSlideIndex < 0) {
            activeSlideIndex = slidesCount - 1
        }
    }
    const height = container33.clientHeight
    // минус это направление    
    mainSlide.style.transform = `translateY(-${activeSlideIndex * height}px)`
    sidebar.style.transform = `translateY(${activeSlideIndex * height}px)`
}

//      minigame:                    //////////////////////////////////////
const board = document.querySelector('#board')
const colors = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71'] //массив
// const colors = ['red', 'blue', 'green', 'yellow', 'purple'] //массив
const SQUARES_NUMBER = 144 // 450 квадратиков

for (let i = 0; i < SQUARES_NUMBER; i++) {
    const square = document.createElement('div') // какой тег нужно создать [div]
    square.classList.add('square') // чтобы квадратик был квадратиком нужно добавить класс
    // делее добавляем слушателя событий для каждого квадратика:
    square.addEventListener('mouseover', () => setColor(square)) // вызывается при наведении мыши на квадрат
    square.addEventListener('mouseleave', () => removeColor(square)) // убираем мышь 
    board.append(square) //добавить в сам html
}

function setColor(element) {
    const color = getRandomColor()
    element.style.backgroundColor = color // параметр : случайный цвет из массива
    // element.style.backgroundColor = 'red'
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}` // за счет обратных ковычек могу динамический цвет вставить + добавили светящийся эффект
}

function removeColor(element) {
    element.style.backgroundColor = '#1d1d1d' //возвращаем цвет
    element.style.boxShadow = `0 0 2px #000`
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}



//      gaming aim:                    //////////////////////////////////////
const startBtn = document.querySelector('#start11')

const screens = document.querySelectorAll('.screen')

const timeList = document.querySelector('#time-list')

const timeEl = document.querySelector('#time')
const board11 = document.querySelector('#board11')
let time = 0 // какую кнопку нажал и сколько времени нужно поместить?
let score = 0

startBtn.addEventListener('click', (event) => {
    event.preventDefault() // удалили # отображающаяся в url браузера при клике
    screens[0].classList.add('up') // screens это массив

})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')){ // contains а есть ли у элемента класс?
        // console.log(event.target.getAttribute('data-time'))
        // console.log(event.target)
        time = parseInt(event.target.getAttribute('data-time')) // из строчки в число
        screens[1].classList.add('up')
        startGame() // функция для начала игры
    }
})

// клик по кругу
board11.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove() // удалить круг
        createRandomCircle() // вновь вызвать
    }
})



//DEBUG
//startGame()


function startGame() {
    //screens[1].classList.add('up') // перенесли в timeList
    

    setInterval(decreaseTime, 1000) //вызывать этот интервал каждую секунду 1000 [милисек]
    // timeEl.innerHTML = `00:${time}`
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time        
        if (current < 10) {
            current = `0${current}`
        }
        //timeEl.innerHTML = `00:${current}` // отлично время отображается
        setTime(current)
    }    
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide') // на ваше усмотрение // удалить заголовок со временем
    //timeEl.parentNode.remove() // удалить заголовок со временем
    board11.innerHTML = `<h1> счет: <span class="primary"> ${score} </span> </h1>`

}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    // диструктиризация: {}
    const {width, height} = board11.getBoundingClientRect() // ориентир от размера 
    const x = getRandomNumber(0, width-size) // 150
    const y = getRandomNumber(0, height-size) // 200
    circle.classList.add('circle')
    circle.style.width = `${size}px` // '15px'
    circle.style.height = `${size}px` // '15px'
    circle.style.top = `${y}px`
    circle.style.left = `${x}px` // по горизонтали 

    board11.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}




