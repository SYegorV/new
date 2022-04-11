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



