
//  calculator:

// определяем поле для вывода результата:
// и создаем контейнер для клавиатуры:
const output = document.querySelector('output') // повтор
const outputone = document.querySelector('outputone') // повтор
const input = document.querySelector('input') // повтор
const oneput = document.querySelector('oneput') // повтор
let signMinus = false // true - number отрицательное
const asdfg = document.querySelector('asdfg')
let saveValue = 1


// поиск кнопки и добавление к кнопке обработчика события "клик":
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        //по клику вызывается функция со значением кнопки в качестве параметра
        calc(this.value)        

              

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
    if ((event.key).match(/Backspace|Enter/)) calc(event.key)
})

// поиск input и добавление обработчика события "клик":
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('click', function() {
        //по клику вызывается функция со значением кнопки в качестве параметра     
        oneput.textContent = this.id        
        // calc(this.id)
        //console.log(oneput.textContent)
    })
})

// код читается снизу вверх
// функция принимает значение кнопки или ключ клавиши
function calc(value) {

    // if (value === 'rus') {
    //     signMinus = !signMinus //смена знака
    //     signMinus ? asdf(): asdfg.textContent=''             
    // }

    if (value.match(/Enter/)) { // если нажат знак равенства или Enter
        // пробуем выполнить операцию:
        try {            
            // записываем значение в поле:
            saveText()                         
        }
        catch { // если операцию выполнить невозможно
        //     let oldValue = output.textContent // сохраняем значение поля
        //     let newValue = 'недопустимое выражение' // создаем новую переменную
        //     output.textContent = newValue // выводим значение новой переменной в поле
        //     // через полторы секунды возвращаем полю предыдущее значение:
        //     setTimeout(() => {
        //         output.textContent = oldValue
        //     }, 1500)
        }
    } else if (value === 'CC') { // если нажат символ С
        // очищаем все поле       
        
    } else if (value === 'C') { // если нажат символ С
        // очищаем поле        
        document.getElementById(`${oneput.textContent}${saveValue+1}`).innerHTML = ''        
        document.getElementById(`${oneput.textContent}${saveValue+1}`).style.color = ''
    } else if (value.match(/<-|Backspace/)) { // если нажат символ <-
        // <- уменьшаем строку на один символ
        
        document.getElementById(`${oneput.textContent}${saveValue+1}`).innerHTML = document.getElementById(`${oneput.textContent}${saveValue+1}`).innerHTML.substring(0, document.getElementById(`${oneput.textContent}${saveValue+1}`).innerHTML.length - 1)
    } else if ( output.textContent.length > 32 - 1 ) { // ввод 32 симолов в поле
        let oldValue = output.textContent // сохраняем значение поля
        let newValue = 'недопустимое выражение' // создаем новую переменную
        output.textContent = newValue // выводим значение новой переменной в поле
        // через полторы секунды возвращаем полю предыдущее значение:
        setTimeout(() => {
            output.textContent = oldValue
        }, 1500)
    } else { // если нажата любая другая (отфильтрованная) кнопка или клавиша        
        saveText()
    }
}

function saveText() {
    //console.log(`${oneput.textContent}${saveValue-1}`)
    //console.log(document.getElementById(`${oneput.textContent`${saveValue-1}`}`).title)
    


    if (document.getElementById(`${oneput.textContent}`).value === document.getElementById(`${oneput.textContent}${saveValue-1}`).title) {        
        document.getElementById(`${oneput.textContent}${saveValue+1}`).innerHTML = 'true'
        
    } else {
        document.getElementById(`${oneput.textContent}${saveValue+1}`).style.color = 'red'
        document.getElementById(`${oneput.textContent}${saveValue+1}`).innerHTML = 'false'
    }    
}









