class Calculator{
    constructor(previousTE, currentTE){
        this.previousTE = previousTE;
        this.currentTE = currentTE;
        this.clear();
    }
    clear(){
        this.currentOperand = "";
        this.perviousOperand = "";
        this.operation = '';
    }
    del(){
        this.currentOperand = this.currentOperand.substring(0, this.currentOperand.length-1);
    }
    appendNum(number){
        if(number=="." && this.currentOperand.indexOf(".")!=-1){
            return

        }
        this.currentOperand += number;
    }
    chooseOp(operation){
        if(this.currentOperand==="") return;
        if(this.previousOperand!=''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";

    }
    compute(){
        let computation;
        let previous = parseFloat(this.previousOperand);
        let current = parseFloat(this.currentOperand);
        if(isNaN(previous)|| isNaN(current))return;
        switch(this.operation){
            case "+":
                computation = previous+current;
                break;
            case "-":
                computation = previous-current;
                break;
            case "*":
                computation = previous*current;
                break;
            case "/":
                computation = previous/current;
                break;
            default:
                return
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = "";

    }
    update(){
        this.currentTE.innerText = this.currentOperand;
        this.previousTE.innerText = this.previousOperand;
    }
}


const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]")
const delButton = document.querySelector("[data-delete]")
const acButton = document.querySelector("[data-ac]")
const previousTE = document.querySelector("[data-previousOperand]")
const currentTE = document.querySelector("[data-currentOperand]")

const calculator = new Calculator(previousTE, currentTE)

numberButtons.forEach(button =>{
    button.addEventListener("click", function(){
        calculator.appendNum(button.innerText);
        calculator.update();
    })
})

operationButtons.forEach(button =>{
    button.addEventListener("click", function(){
        calculator.chooseOp(button.innerText);
        calculator.update();
    })
})

acButton.addEventListener("click", function(){
    calculator.clear();
    calculator.update();
})
equalsButton.addEventListener("click", function(){
    calculator.compute();
    calculator.update();
})

delButton.addEventListener("click", function(){
    calculator.del();
    calculator.update();
})