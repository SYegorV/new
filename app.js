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




//      calculate:                    //////////////////////////////////////
// определяем поле для вывода результата:
// и создаем контейнер для клавиатуры:
const output = document.querySelector('output')
let memoryMS = 0 // определяем memory
let signMinus = false // true - number отрицательное
let i = 0

// поиск кнопки и добавление к кнопке обработчика события "клик":
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        //по клику вызывается функция со значением кнопки в качестве параметра
        calc(this.value)
        const qwer = document.getElementById('id_pl_mi').value
        if (this.value === qwer) {            
            calc(qwer)
        }
    })
})

// вводить символы с клавиатуры:
// обработчик события "нажатие клавиши"
// метод match -- [ filter передает функции calc аргумент соответствующий в нем условию]
// если значением event.key является один из символов, указанных в квадратных скобках ([])
// обратная косая черта - экранирование
// | -- альтерация Backspace или Enter
// то вызывается calc с event.key в качестве параметра, иначе ничего не делаем
// Shift успешно отбрасывается
document.addEventListener('keydown', event => {
    if ((event.key).match(/[0-9%\/*\-+\(\)=]|Backspace|Enter/)) calc(event.key)
})

// код читается снизу вверх
// функция принимает значение кнопки или ключ клавиши
function calc(value) {
    // если нажат знак равенства или Enter
    if (value.match(/=|Enter/)) {
        // пробуем выполнить операцию:
        try {
            // вычисляем значение строки
            ////output.textContent =  eval(output.textContent);
            const n = 8 // 8 знаков дробной части к вычисляемому результату
            let s = eval(output.textContent).toFixed(n) // исходное число // строчка            
            let f = Math.floor( Number(s)) 
            let t = Number(s)- f // дробная часть //число            
            let v = Math.floor( Number(s)) // целая чать
            let Strt = String(t) // число в строку
            let Strtt = Strt.replace(/0*$/,'')            
            let tt = Number(Strtt) // строчка в число
            output.textContent = Number(`${v + tt}`) // строчка в число
            if (value.match(/=/)) {                
            }              
        } catch { // если операцию выполнить невозможно
            let oldValue = output.textContent // сохраняем значение поля
            let newValue = 'недопустимое выражение' // create new переменную
            output.textContent = newValue // выводим value новой переменной в поле
            // через полторы секунды возвращаем полю предыдущее значение:
            setTimeout(() => {
                output.textContent = oldValue
            }, 1500)
        }
    } else if (value.match(/=/&&/Rvt/)) {
        
    } else if (value === 'MS') { // else if нажат simbol MS
        // write number in memory
        // пробуем выполнить операцию:
        try {
            output.textContent =  eval(output.textContent);
            memoryMS = Number(output.textContent) // save value поля
            // clear поле:
            output.textContent = ''            
        } catch { // если операцию выполнить невозможно
            let oldValue = output.textContent // save value поля
            let newValue = 'недопустимое выражение' // create new переменную
            output.textContent = newValue // выводим value новой переменной в поле
            // через полторы секунды возвращаем полю предыдущее значение:
            setTimeout(() => {
                output.textContent = oldValue
            }, 1500)
        }                
    } else if (value === 'MR') { // если нажат simbol MR
        // вывести number from memory on индикатор
        output.textContent = memoryMS.toFixed(4)        
    } else if (value === 'M+') { // если нажат simbol M+
        // add to number in memory numbers on индикаторе
        memoryMS = Number(memoryMS) + Number(output.textContent)
        output.textContent = ''
    } else if (value === 'M-') { // если нажат simbol M-
        // компенсация from number in memory number on индикаторе
        memoryMS = Number(memoryMS) - Number(output.textContent)
        output.textContent = ''                
    } else if (value === 'MC') { // если нажат simbol MC
        // clear number in memory
        memoryMS = Number(0)
        output.textContent = ''                
    } else if (value === 'AC') { // если нажат simbol AC
        // clear number in memory
        memoryMS = Number(0)
        output.textContent = ''                
    } else if (value === 'C') { // если нажат simbol С
        // clear поле
        output.textContent = ''
    } else if (value.match(/<-/)) { // если нажат simbol <-
        // <- уменьшаем строку на один simbol:
        output.textContent = output.textContent.substring(0, output.textContent.length - 1)
    } else if (value.match(/-<>/)) { // если нажат символ &plusmn
        signMinus = !signMinus //смена знака        
        output.textContent = Number(signMinus ? - + Number(output.textContent): Number(output.textContent))
    } else if (value.match(/CE|Backspace/)) { // если нажат символ CE или Backspace 
        // CE уменьшаем строку на один simbol
        // Backspace вводим предыдущий [символ/действие] повтор
        output.textContent = output.textContent.substring(0, output.textContent.length - 1)
    } else if ( value === '.'|value === '*'|value === '/'|value === '+'|value === '-' && output.textContent.substring(output.textContent.length - 1, output.textContent.length) === '.'|output.textContent.substring(output.textContent.length - 1, output.textContent.length) === '*'|output.textContent.substring(output.textContent.length - 1, output.textContent.length) === '/'|output.textContent.substring(output.textContent.length - 1, output.textContent.length) === '+'|output.textContent.substring(output.textContent.length - 1, output.textContent.length) === '-' ) {
        
    } else if ( output.textContent.length > 32 - 1 ) { // ввод 32 simbols in поле
        let oldValue = output.textContent // save value поля
        let newValue = 'недопустимое выражение' // create new переменную
        output.textContent = newValue // выводим value новой переменной в поле
        // через полторы секунды возвращаем полю предыдущее значение:
        setTimeout(() => {
            output.textContent = oldValue
        }, 1500)
    } else if (value === '.'|value === '0'|value === '1'|value === '2'|value === '3'|value === '4'|value === '5'|value === '6'|value === '7'|value === '8'|value === '9') {
        const n1 = 12 // 12 знаков целой части
        const n2 = 8 // 8 знаков дробная часть

        let ss = output.textContent // исходное число        
        ss = Number(ss + value).toFixed(n2+2)        
        let ff = Math.floor( Number(ss)).toFixed(n2+2)        
        let tt = (Number(ss)- ff).toFixed(n2 + 2) // дробная часть // строчка        
        if (tt > 0 ) {            
            i = i + 1            
            zxcone(i, ss, n1, n2, value)            
        } else {
            zxctwo(tt, ss, n1, n2, value)
        }        
    } else { // если нажата любая другая (отфильтрованная) кнопка или клавиша
        // write value in поле:
        output.textContent += value        
    }
}

function zxcone(i, ss, n1, n2, value) {
    let tt = (Number(ss)%1).toFixed(2 + i) // дробная часть // строчка    
    let replacett = Number((Number(tt.replace(/0*$/,''))).toFixed(i)) // дробная часть // число    
    let vv = Math.floor( Number(ss)) // целая чать // число
    let Strvv = String(vv) // число в строку
    let Strreplacett = String(replacett) // число в строку    
    if (Strvv.length > n1) {
        let oldValue = output.textContent // сохраняем значение поля
        let newValue = 'целая чать более 12 цифр' // создаем новую переменную
        output.textContent = newValue // выводим значение новой переменной в поле
        // через полторы секунды возвращаем полю предыдущее значение:
        setTimeout(() => {
            output.textContent = oldValue
        }, 1500)
    } else if (Strreplacett.length - 2 >= n2 + 1) {
        let oldValue = output.textContent // сохраняем значение поля
        let newValue = 'дробная часть более 8 цифр' // создаем новую переменную
        output.textContent = newValue // выводим значение новой переменной в поле
        // через полторы секунды возвращаем полю предыдущее значение:
        setTimeout(() => {
            output.textContent = oldValue
        }, 1500)
    } else { //(Strvv.length < n1||Strreplacett.length - 2 < n2 + 1) {
        output.textContent += value
    }
}

function zxctwo(tt, ss, n1, n2, value) {    
    let replacett = Number(tt.replace(/0*$/,'')) // дробная часть // число    
    let vv = Math.floor( Number(ss)) // целая чать // число
    let Strvv = String(vv) // число в строку
    let Strreplacett = String(replacett) // число в строку    
    if (Strvv.length > n1) {
        let oldValue = output.textContent // сохраняем значение поля
        let newValue = 'целая чать более 12 цифр' // создаем новую переменную
        output.textContent = newValue // выводим значение новой переменной в поле
        // через полторы секунды возвращаем полю предыдущее значение:
        setTimeout(() => {
            output.textContent = oldValue
        }, 1500)
    } else if (Strreplacett.length - 2 >= n2 + 1) {
        let oldValue = output.textContent // сохраняем значение поля
        let newValue = 'дробная часть более 8 цифр' // создаем новую переменную
        output.textContent = newValue // выводим значение новой переменной в поле
        // через полторы секунды возвращаем полю предыдущее значение:
        setTimeout(() => {
            output.textContent = oldValue
        }, 1500)
    } else { //(Strvv.length < n1||Strreplacett.length - 2 < n2 + 1) {
        output.textContent += value
    }    
}



//      privat:                    //////////////////////////////////////
// определяем поле для вывода результата:
const o77utput = document.querySelector('o77utput')
const asdfg = document.querySelector('asdfg')
const createput = document.querySelector('createput')
let s77ignMinus = false // true - number отрицательное
const textarea = document.querySelector('textarea')
const buttonout = document.querySelector('buttonout')
const outText = document.querySelector('outText')
let saveValue = 0


// поиск кнопки и добавление к кнопке обработчика события "клик":
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        //по клику вызывается функция со значением кнопки в качестве параметра
        c77alc(this.value)      
    })
})

// функция принимает значение кнопки
function c77alc(value) {
    if (value === '?') {        
        s77ignMinus = !s77ignMinus //смена знака
        s77ignMinus ? asdf(): asdfg.textContent=''             
    }
    if (value === 'Create') {        
        s77ignMinus = !s77ignMinus //смена знака        
        const qwer = document.getElementById('i77d_pl_mi').value
        document.getElementById('i77d_pl_mi').value = 'сообщение: '        
        document.getElementById('Create_New_messeg').textContent = s77ignMinus ? parametrsone='Написать новое сообщение': parametrstwo='Создать сообщение'
        saveText(qwer)
        createcoob()
    }
    
    if (value === 'parametrs') {
        s77ignMinus = !s77ignMinus //смена знака        
        document.getElementById('switchOn_switchOff_parametrs').textContent = s77ignMinus ? parametrsone='Отключить параметры': parametrstwo='Показать параметры'        
        finish()        
    }
}

function finish() {
    if (document.getElementById('switchOn_switchOff_parametrs').textContent === 'Отключить параметры' ) {
    o77utput.innerHTML = `<div class="b77ox4"> <br>
        Записка самоуничтожится 
        <select>
            <option value="male" selected> после прочтения </option>
            <option value="female" > через 1 час </option>
        </select>        
        <div class="b77ox4">
            <br>
            Секретный пароль
        </div>
        
        <div class="b77ox5">
        Введите пароль для дешифрования записки
        </div>        
        <input type="text">        
        <div class="b77ox5">
            <br>
            Повторите пароль
        </div>        
        <input type="text">

        <br><br>
        <div class="b77ox4">
        Уведомление об уничтожении
        </div>
        <div class="b77ox5">
            E-mail для получения уведомления об уничтожении записки
        </div>
        <input type="text">        
    </div>`
    }
    if (document.getElementById('switchOn_switchOff_parametrs').textContent === 'Показать параметры' ) {
        o77utput.innerHTML = ''
    }
}

function createcoob() {
    if (document.getElementById('Create_New_messeg').textContent === 'Написать новое сообщение' ) {
        createput.innerHTML = `<div class="b77ox7">
        Ссылка на сообщение готова:
        <p> https://github.com/privatText/github.io/${'o2crvBky'} 
        <div class="b77ox5">
        Сообщение самоуничтожится после прочтения
        </div>
        </p>        
        </div>`
    }
    if (document.getElementById('Create_New_messeg').textContent === 'Создать сообщение' ) {
        createput.innerHTML = ''
    }
    
}

function saveText(qwer) {
    if (document.getElementById('Create_New_messeg').textContent === 'Написать новое сообщение' ) {
        saveValue++
        outText.innerHTML = `${saveValue} ${qwer} `
    }

}

function asdf() {
    asdfg.innerHTML = `<p> С помощью SharedSecret вы можете создавать сообщения, которые самоуничтожаются после, как их прочитают
    <br><br>
    1 Напишите сообщение ниже, зашифруйте его и получите ссылку
    <br>
    2 Отправьте ссылку тому, кто должен прочесть сообщение
    <br>
    3 Сообщение самоуничтожится после, как его прочитают
    <br><br>
    Нажав кнопку "параметры", вы можете указать пароль для дешифрования сообщения, установить срок действия и настроить уведомление о прочтении, когда сообщение будет уничтожено
</p>`
}



