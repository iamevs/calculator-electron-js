var DisplayCalculator = document.querySelector('.calc_display')
var MainDisplay = document.querySelector('.calc_display :nth-child(2)')
var HistoricDisplay = document.querySelector('.calc_display :nth-child(1)')
var CalculatorKeys = document.querySelectorAll('td')

CalculatorKeys.forEach(item => {

    item.onclick = (ev) => {

        const key = ev.target
        const OperatorAction = key.dataset.function? key.dataset.function : 'number'
        var MainNum = MainDisplay.textContent
if(OperatorAction == 'decimal' && !MainDisplay.textContent.includes('.')){
    MainDisplay.textContent = MainDisplay.textContent + '.'
}
if(OperatorAction == 'clear'){
    MainDisplay.textContent = '0'
    HistoricDisplay.textContent = '...'

    DisplayCalculator.dataset.firstvalue = null
    DisplayCalculator.dataset.operatorKey = null
}

if(OperatorAction == 'erase'){
    MainDisplay.textContent = MainDisplay.textContent.slice(0, -1);
    if(MainDisplay.textContent == ''){
        MainDisplay.textContent = '0'
    }
}

if(OperatorAction == 'negpos'){
    if(MainDisplay.textContent !== '0'){
      if(MainDisplay.textContent.includes('-')){
        MainDisplay.textContent = MainDisplay.textContent.replace('-', '')
      }else{
        MainDisplay.textContent = '-' + MainDisplay.textContent
    }
  }
}

if(OperatorAction == 'add' || OperatorAction == 'sub' || OperatorAction == 'divide' || OperatorAction == 'multiply' || OperatorAction == 'pot' || OperatorAction == 'percent'){
    DisplayCalculator.dataset.firstvalue = MainDisplay.textContent
    DisplayCalculator.dataset.operatorKey = OperatorAction

    HistoricDisplay.textContent = MainDisplay.textContent + `  ${key.textContent}`
    decimalCount = 0
    MainDisplay.textContent = '0'
}

if(OperatorAction == 'equal'){
    if(DisplayCalculator.dataset.firstvalue !== '' && DisplayCalculator.dataset.operatorKey !== ''){
        if(DisplayCalculator.dataset.firstvalue && DisplayCalculator.dataset.operatorKey){

        const firstValue = DisplayCalculator.dataset.firstvalue
        const operator = DisplayCalculator.dataset.operatorKey
        const secondValue =  MainDisplay.textContent
      
        MainDisplay.textContent = SimpleCalculate(firstValue, operator, secondValue)

        HistoricDisplay.textContent = HistoricDisplay.textContent + ' ' + secondValue

        DisplayCalculator.dataset.firstvalue = ''
        DisplayCalculator.dataset.operatorKey = ''
            }
    }
}
function SimpleCalculate(n1, operator, n2) {

    let result = ''

    var Number1 = parseFloat(n1)
    var Number2 = parseFloat(n2)

    switch (operator) {
        case 'add':
            result = Number1 + Number2
        break;
        case 'sub':
            result = Number1 - Number2
        break;
        case 'multiply':
            result = Number1 * Number2
        break;
        case 'divide':
            result = Number1 / Number2
        break;
        case 'percent':
            result = percent(Number1, Number2)
        break;
         case 'pot':
            result = Math.pow(Number1, Number2)
        break;
    }
    return result.toString()
}

function percent(percent, total) {
    return ((percent/ 100) * total).toFixed(2)
}

switch (OperatorAction) {
    case 'root':
        MainDisplay.textContent = Math.sqrt(MainDisplay.textContent)
    break;
    case 'tan':
        MainDisplay.textContent = Math.tan(MainDisplay.textContent)
    break;
    case 'sin':
        MainDisplay.textContent = Math.sin(MainDisplay.textContent)
    break;
    case 'cos':
        MainDisplay.textContent = Math.cos(MainDisplay.textContent)
    break;
    case 'log':
        MainDisplay.textContent = Math.log(MainDisplay.textContent)
    break;
    case 'exp':
        MainDisplay.textContent = Math.exp(MainDisplay.textContent)
    break;
    case 'e':
        MainDisplay.textContent = Math.E
    break;
    case 'pi':
        MainDisplay.textContent = Math.PI
    break;
}

if(OperatorAction == 'fact'){

function CalcFact(Number1){
if(Number1 == 0 || Number1 == 1){

    return 1;
}else{

    return Number1 * CalcFact(Number1 - 1);
}}
    MainDisplay.textContent = CalcFact(MainDisplay.textContent) 
}

if(OperatorAction === 'number'){
    if(MainNum === '0'){

        MainDisplay.textContent = key.textContent
    }else{

        MainDisplay.textContent = MainNum + key.textContent
    }
   }
  }
})