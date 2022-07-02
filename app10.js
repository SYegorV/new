
//  calculator:

// определяем поле для вывода результата:
// и создаем контейнер для клавиатуры:
const output = document.querySelector('output') // повтор
const outputone = document.querySelector('outputone') // повтор
const input = document.querySelector('input') // повтор
const oneput = document.querySelector('oneput') // повтор
let signMinus = false // true - number отрицательное
const asdfg = document.querySelector('asdfg')


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
        document.getElementById(`${oneput.textContent*2}`).innerHTML = ''        
        document.getElementById(`${oneput.textContent*2}`).style.color = ''
    } else if (value.match(/<-|Backspace/)) { // если нажат символ <-
        // <- уменьшаем строку на один символ
        
        document.getElementById(`${oneput.textContent*2}`).innerHTML = document.getElementById(`${oneput.textContent*2}`).innerHTML.substring(0, document.getElementById(`${oneput.textContent*2}`).innerHTML.length - 1)
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
    if (document.getElementById(`${oneput.textContent}`).value === document.getElementById(`${oneput.textContent-1}`).title) {        
        document.getElementById(`${oneput.textContent*2}`).innerHTML = 'true'
        
    } else {
        document.getElementById(`${oneput.textContent*2}`).style.color = 'red'
        document.getElementById(`${oneput.textContent*2}`).innerHTML = 'false'
    }    
}


// function asdf() {
//     asdfg.innerHTML = `<table class="table00"> 
//     <tr>
//         <td id="1" title="сегодня">dnes :</td>
//         <td><div class="box6">
//             <button class="box1" value="C"> C </button>
//             <button class="box1" value="<-"> &#x232B </button>
//             <button class="box1" value="?"> &#8594 </button>
//             <input class="box3" type="text" id="2" placeholder=" input word">
//             <div class="navbar3"> <outputone class="box10" id="4"> </outputone> </div>
//         </div></td>
//     </tr>
//     <tr>
//         <td id="5" title="имя">jméno :</td>
//         <td><div class="box6">
//             <button class="box1" value="C"> C </button>
//             <button class="box1" value="<-"> &#x232B </button>
//             <button class="box1" value="?"> &#8594 </button>
//             <input class="box3" type="text" id="6" placeholder=" input word">
//             <div class="navbar3"> <outputone class="box10" id="12"> </outputone> </div>
//         </div></td>
//     </tr>
//     <tr>
//         <td id="13" title="друг">kamarád :</td>
//         <td><div class="box6">
//             <button class="box1" value="C"> C </button>
//             <button class="box1" value="<-"> &#x232B </button>
//             <button class="box1" value="?"> &#8594 </button>
//             <input class="box3" type="text" id="14" placeholder=" input word">
//             <div class="navbar3"> <outputone id="28"> </outputone> </div>
//         </div></td>               
//     </tr>
//     <tr>
//         <td id="29" title="иностранец">cizinec :</td>
//         <td><div class="box6">
//             <button class="box1" value="C"> C </button>
//             <button class="box1" value="<-"> &#x232B </button>
//             <button class="box1" value="?"> &#8594 </button>
//             <input class="box3" type="text" id="30" placeholder=" input word">
//             <div class="navbar3"> <outputone id="60"> </outputone> </div>
//         </div></td>               
//     </tr>
//     <tr>
//         <td id="61" title="врач">doktor :</td>
//         <td><div class="box6">
//             <button class="box1" value="C"> C </button>
//             <button class="box1" value="<-"> &#x232B </button>
//             <button class="box1" value="?"> &#8594 </button>
//             <input class="box3" type="text" id="62" placeholder=" input word">
//             <div class="navbar3"> <outputone id="124"> </outputone> </div>
//         </div></td>               
//     </tr>
//     <tr>
//         <td id="125" title="девушка">slečna :</td>
//         <td><div class="box6">
//             <button class="box1" value="C"> C </button>
//             <button class="box1" value="<-"> &#x232B </button>
//             <button class="box1" value="?"> &#8594 </button>
//             <input class="box3" type="text" id="126" placeholder=" input word">
//             <div class="navbar3"> <outputone id="252"> </outputone> </div>
//         </div></td>               
//     </tr>
//     <tr>
//         <td id="253" title="муж">manžel :</td>
//         <td><div class="box6">
//             <button class="box1" value="C"> C </button>
//             <button class="box1" value="<-"> &#x232B </button>
//             <button class="box1" value="?"> &#8594 </button>
//             <input class="box3" type="text" id="254" placeholder=" input word">
//             <div class="navbar3"> <outputone id="508"> </outputone> </div>
//         </div></td>               
//     </tr>
//     <tr>
//         <td id="509" title="жена">manželka :</td>
//         <td><div class="box6">
//             <button class="box1" value="C"> C </button>
//             <button class="box1" value="<-"> &#x232B </button>
//             <button class="box1" value="?"> &#8594 </button>
//             <input class="box3" type="text" id="510" placeholder=" input word">
//             <div class="navbar3"> <outputone id="1020"> </outputone> </div>
//         </div></td>               
//     </tr>
//     <tr>
//         <td id="1021" title="работа">práce :</td>
//         <td><div class="box6">
//             <button class="box1" value="C"> C </button>
//             <button class="box1" value="<-"> &#x232B </button>
//             <button class="box1" value="?"> &#8594 </button>
//             <input class="box3" type="text" id="1022" placeholder=" input word">
//             <div class="navbar3"> <outputone id="2044"> </outputone> </div>
//         </div></td>               
//     </tr>
//     <tr>
//         <td id="2045" title="город">mésto :</td>
//         <td><div class="box6">
//             <button class="box1" value="C"> C </button>
//             <button class="box1" value="<-"> &#x232B </button>
//             <button class="box1" value="?"> &#8594 </button>
//             <input class="box3" type="text" id="2046" placeholder=" input word">
//             <div class="navbar3"> <outputone id="4092"> </outputone> </div>
//         </div></td>               
//     </tr>
//     <tr>
//         <td id="4093" title="дом">dúm :</td>
//         <td><div class="box6">
//             <button class="box1" value="C"> C </button>
//             <button class="box1" value="<-"> &#x232B </button>
//             <button class="box1" value="?"> &#8594 </button>
//             <input class="box3" type="text" id="4094" placeholder=" input word">
//             <div class="navbar3"> <outputone id="8188"> </outputone> </div>
//         </div></td>               
//     </tr>
//     <tr>
//         <td id="8189" title="квартира">byt :</td>
//         <td><div class="box6">
//             <button class="box1" value="C"> C </button>
//             <button class="box1" value="<-"> &#x232B </button>
//             <button class="box1" value="?"> &#8594 </button>
//             <input class="box3" type="text" id="8190" placeholder=" input word">
//             <div class="navbar3"> <outputone id="16380"> </outputone> </div>
//         </div></td>               
//     </tr>
//     <tr>
//         <td id="16381" title="университет">univerzita :</td>
//         <td><div class="box6">
//             <button class="box1" value="C"> C </button>
//             <button class="box1" value="<-"> &#x232B </button>
//             <button class="box1" value="?"> &#8594 </button>
//             <input class="box3" type="text" id="16382" placeholder=" input word">
//             <div class="navbar3"> <outputone id="32764"> </outputone> </div>
//         </div></td>               
//     </tr>
//     <tr>
//         <td id="32765" title="библиотека">knihovna :</td>
//         <td><div class="box6">
//             <button class="box1" value="C"> C </button>
//             <button class="box1" value="<-"> &#x232B </button>
//             <button class="box1" value="?"> &#8594 </button>
//             <input class="box3" type="text" id="32766" placeholder=" input word">
//             <div class="navbar3"> <outputone id="65532"> </outputone> </div>
//         </div></td>               
//     </tr>
//     <tr>
//         <td id="65533" title="больница">nemocníce :</td>
//         <td><div class="box6">
//             <button class="box1" value="C"> C </button>
//             <button class="box1" value="<-"> &#x232B </button>
//             <button class="box1" value="?"> &#8594 </button>
//             <input class="box3" type="text" id="65534" placeholder=" input word">
//             <div class="navbar3"> <outputone id="131068"> </outputone> </div>
//         </div></td>               
//     </tr>
//     <tr>
//         <td id="131069" title="кофе">káva :</td>
//         <td><div class="box6">
//             <button class="box1" value="C"> C </button>
//             <button class="box1" value="<-"> &#x232B </button>
//             <button class="box1" value="?"> &#8594 </button>
//             <input class="box3" type="text" id="131070" placeholder=" input word">
//             <div class="navbar3"> <outputone id="262140"> </outputone> </div>
//         </div></td>               
//     </tr>
//     <tr>
//         <td id="262141" title="кофейня">kavárna :</td>
//         <td><div class="box6">
//             <button class="box1" value="C"> C </button>
//             <button class="box1" value="<-"> &#x232B </button>
//             <button class="box1" value="?"> &#8594 </button>
//             <input class="box3" type="text" id="262142" placeholder=" input word">
//             <div class="navbar3"> <outputone id="524284"> </outputone> </div>
//         </div></td>               
//     </tr>
//     <tr>
//         <td id="524285" title="ресторан">restaurace :</td>
//         <td><div class="box6">
//             <button class="box1" value="C"> C </button>
//             <button class="box1" value="<-"> &#x232B </button>
//             <button class="box1" value="?"> &#8594 </button>
//             <input class="box3" type="text" id="524286" placeholder=" input word">
//             <div class="navbar3"> <outputone id="1048572"> </outputone> </div>
//         </div></td>               
//     </tr>
//     <tr>
//         <td id="1048573" title="банк">banka :</td>
//         <td><div class="box6">
//             <button class="box1" value="C"> C </button>
//             <button class="box1" value="<-"> &#x232B </button>
//             <button class="box1" value="?"> &#8594 </button>
//             <input class="box3" type="text" id="1048574" placeholder=" input word">
//             <div class="navbar3"> <outputone id="2097148"> </outputone> </div>
//         </div></td>               
//     </tr>
//     <tr>
//         <td id="2097149" title="компьютер">počítač :</td>
//         <td><div class="box6">
//             <button class="box1" value="C"> C </button>
//             <button class="box1" value="<-"> &#x232B </button>
//             <button class="box1" value="?"> &#8594 </button>
//             <input class="box3" type="text" id="2097150" placeholder=" input word">
//             <div class="navbar3"> <outputone id="4194300"> </outputone> </div>
//         </div></td>               
//     </tr>
//     <tr>
//         <td id="4194301" title="гости">návštěva :</td>
//         <td><div class="box6">
//             <button class="box1" value="C"> C </button>
//             <button class="box1" value="<-"> &#x232B </button>
//             <button class="box1" value="?"> &#8594 </button>
//             <input class="box3" type="text" id="4194302" placeholder=" input word">
//             <div class="navbar3"> <outputone id="8388604"> </outputone> </div>
//         </div></td>               
//     </tr>
//     <tr>
//         <td id="8388605" title="хороший">dobrý :</td>
//         <td><div class="box6">
//             <button class="box1" value="C"> C </button>
//             <button class="box1" value="<-"> &#x232B </button>
//             <button class="box1" value="?"> &#8594 </button>
//             <input class="box3" type="text" id="8388606" placeholder=" input word">
//             <div class="navbar3"> <outputone id="16777212"> </outputone> </div>
//         </div></td>               
//     </tr>
//     <tr>
//         <td id="16777213" title="красивый">hezký :</td>
//         <td><div class="box6">
//             <button class="box1" value="C"> C </button>
//             <button class="box1" value="<-"> &#x232B </button>
//             <button class="box1" value="?"> &#8594 </button>
//             <input class="box3" type="text" id="16777214" placeholder=" input word">
//             <div class="navbar3"> <outputone id="33554428"> </outputone> </div>
//         </div></td>               
//     </tr>
//     <tr>
//         <td id="33554429" title="молодой">mladý :</td>
//         <td><div class="box6">
//             <button class="box1" value="C"> C </button>
//             <button class="box1" value="<-"> &#x232B </button>
//             <button class="box1" value="?"> &#8594 </button>
//             <input class="box3" type="text" id="33554430" placeholder=" input word">
//             <div class="navbar3"> <outputone id="67108860"> </outputone> </div>
//         </div></td>               
//     </tr>
//     <tr>
//         <td id="67108861" title="старый">starý :</td>
//         <td><div class="box6">
//             <button class="box1" value="C"> C </button>
//             <button class="box1" value="<-"> &#x232B </button>
//             <button class="box1" value="?"> &#8594 </button>
//             <input class="box3" type="text" id="67108862" placeholder=" input word">
//             <div class="navbar3"> <outputone id="134217724"> </outputone> </div>
//         </div></td>               
//     </tr>
//     <tr>
//         <td id="134217725" title="привет">ahoj :</td>
//         <td><div class="box6">
//             <button class="box1" value="C"> C </button>
//             <button class="box1" value="<-"> &#x232B </button>
//             <button class="box1" value="?"> &#8594 </button>
//             <input class="box3" type="text" id="134217726" placeholder=" input word">
//             <div class="navbar3"> <outputone id="268435452"> </outputone> </div>
//         </div></td>               
//     </tr>
//     <tr>
//         <td id="268435453" title="знакомство">seznámení :</td>
//         <td><div class="box6">
//             <button class="box1" value="C"> C </button>
//             <button class="box1" value="<-"> &#x232B </button>
//             <button class="box1" value="?"> &#8594 </button>
//             <input class="box3" type="text" id="268435454" placeholder=" input word">
//             <div class="navbar3"> <outputone id="536870908"> </outputone> </div>
//         </div></td>               
//     </tr>
//     <tr>
//         <td id="536870909" title="привет">čau :</td>
//         <td><div class="box6">
//             <button class="box1" value="C"> C </button>
//             <button class="box1" value="<-"> &#x232B </button>
//             <button class="box1" value="?"> &#8594 </button>
//             <input class="box3" type="text" id="536870910" placeholder=" input word">
//             <div class="navbar3"> <outputone id="1073741820"> </outputone> </div>
//         </div></td>               
//     </tr>
//     <tr>
//         <td id="1073741821" title="привет">nazdar :</td>
//         <td><div class="box6">
//             <button class="box1" value="C"> C </button>
//             <button class="box1" value="<-"> &#x232B </button>
//             <button class="box1" value="?"> &#8594 </button>
//             <input class="box3" type="text" id="1073741822" placeholder=" input word">
//             <div class="navbar3"> <outputone id="2147483644"> </outputone> </div>
//         </div></td>               
//     </tr>
// </table>`
// }






