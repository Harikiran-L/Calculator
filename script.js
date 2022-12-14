// const numberButtons = document.querySelectorAll('[data-number]')
// const operationButtons = document.querySelectorAll('[data-operation]')
// const equalsButton = document.querySelector('[data-equals]')
// const allClearButton = document.querySelector('[data-all-clear]')
// const deleteButton = document.querySelector('[data-delete]')
// const previousText = document.querySelector('[data-previous-text]')
// const currentText = document.querySelector('[data-current-text]')



// console.log(equalsButton.innerText)


class Calculator{
    constructor(previousText,currentText){
        this.previousText = previousText
        this.currentText = currentText
        this.clear()
        
    }
    clear(){
        this.currentOperand =''
        this.previousOperand = ''
        this.operation = undefined
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }
    appendNumber(number){
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand  = this.currentOperand.toString() + number.toString()
        //this.currentOperand = number
    }
    chooseOperations(operation){
        if (this.currentOperand === '')return
        if (this.currentOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''

    }
    compute(){
        let computation 
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || (isNaN(current))) return
        switch(this.operation){
            case "+":
                computation = prev + current
                break
            case "-":
                computation = prev - current
                break
            case "*":
                computation = prev * current
                break
            case "÷":
                computation = prev / current
                break
            default:
                return

            }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand  = ''
    }
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = stringNumber.parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)){
            integerDigits = ''
        }else{
            integerDisplay= integerDigits.toLocalString('en',{maximumFractionDigits:0})
        }if (decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`

        }else{
            return integerDisplay
        }


    }
    updateDisplay(){
        this.currentText.textContent = this.currentOperand 
        if (this.operation != null){
            this.previousText.textContent = `${this.previousOperand} ${this.operation}`
        }else{
            this.previousText.textContent = ''
        }
        
        

    }

}



console.log("Something")

const numberButtons =document.querySelectorAll("#number")
const operationButtons = document.querySelectorAll("#operation")
const equalsButton = document.querySelector("#equals")
const allClearButton = document.querySelector("#all-clear")
const deleteButton = document.querySelector("#delete")
const previousText = document.querySelector("#previous-text")
const currentText = document.querySelector("#current-text")


let number1 = equalsButton.textContent
console.log(number1)

const calculator = new Calculator(previousText,currentText)

numberButtons.forEach(button =>{
    button.addEventListener('click',() =>{
        calculator.appendNumber(button.textContent)
        calculator.updateDisplay()

    })
})

operationButtons.forEach(button =>{
    button.addEventListener('click',() =>{
        calculator.chooseOperations(button.textContent)
        calculator.updateDisplay()

    })
})

equalsButton.addEventListener('click', button =>{
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener("click", button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener("click", button => {
    calculator.delete()
    calculator.updateDisplay()
})