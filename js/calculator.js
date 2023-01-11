/* Author: Min Yang */
/* project: Scientific Calculator */

let mathExp = "";


/**
 * const variables declaration
 */
const inputExp = document.getElementById("expression");
const result = document.getElementById("result");
const SECOND_FUNC = document.getElementById("2nd-function");
const PI = document.getElementById("pi");
const E = document.getElementById("e");
const NUM0 =  document.getElementById("0");
const NUM1 =  document.getElementById("1");
const NUM2 =  document.getElementById("2");
const NUM3 =  document.getElementById("3");
const NUM4 =  document.getElementById("4");
const NUM5 =  document.getElementById("5");
const NUM6 =  document.getElementById("6");
const NUM7 =  document.getElementById("7");
const NUM8 =  document.getElementById("8");
const NUM9 =  document.getElementById("9");
const SQUARE = document.getElementById("square");
const CUBE = document.getElementById("cube");
const RECPRC = document.getElementById("recprc");
const ABS = document.getElementById("abs");
const EXP = document.getElementById("exp");
const CBRT = document.getElementById("cbrt");
const SQRT = document.getElementById("sqrt");
const FACTORIAL = document.getElementById("factorial");
const NTH_ROOT = document.getElementById("nth-root");
const POWER = document.getElementById("power");
const POWER_OF_TWO = document.getElementById("two-base-power");
const POWER_OF_TEN = document.getElementById("ten-base-power");
const N_BASE_LOG = document.getElementById("nbase-log");
const LOG = document.getElementById("log");
const POWER_OF_E = document.getElementById("e-base-power");
const LN = document.getElementById("ln");

const leftParenthese = document.getElementById("leftprt");
const rightParenthese = document.getElementById("rightprt");
const decimalPoint =  document.getElementById("decimal-point");

const operatorPlus =  document.getElementById("add");
const operatorMinus =  document.getElementById("subtract");
const operatorMultiply =  document.getElementById("mulitply");
const operatorDivide =  document.getElementById("divide");
const operatorMod =  document.getElementById("mod");
const operators = [operatorPlus.value, operatorMinus.value, operatorMultiply.value, operatorDivide.value, operatorMod.value];
const sign = document.getElementById("sign");

const backspace = document.getElementById("backspace");
const evaluate = document.getElementById("equal");
const clear = document.getElementById("clear");   


/**
 * user-defined functions to fulfil the logic and actions associated with click event of related button elements
 */
function findIndexofLastOperatorOfMathExp(exp) {
    let index = "null";
    for (let i = exp.length - 1; i >= 0; i--) {
        if (operators.includes(exp[i])) {
            index = i;
            return index;
        }
    }
    return index;
}
function findIndexofMathcingLHParenthese(exp) {
    let index = "null";
    for (let i = exp.length - 1; i >= 0; i--) {
        if (exp[i] == "(") {
            index = i;
            return index;
        }
    }
    return index;
}
function sqr(number) {
    return number * number;
}
function cube(number) {
    return number * number * number;
}
function sqrt(number) {
    return Math.sqrt(number);
}
function cbrt(number) {
    return Math.cbrt(number);
}
function abs(number) {
    return Math.abs(number);
}
function nthRoot(number, exponent) {
    let positiveNumber;
    let result;
    if((exponent % 2 == 1) && number < 0){
        positiveNumber = -number;
        return result = -Math.pow(positiveNumber, 1 / exponent);
    }
    else {
        return result = Math.pow(number, 1 / exponent);
    }
}
function factorial(number) {
    if (number == 0 || number == 1) {
        return 1;
    }
    return number * factorial(number-1);
}
function logbsN(number, base) {
    return Math.log(number)/Math.log(base);
}
function log(number) {
    return Math.log10(number);
}
function ln(number) {
    return Math.log(number);
}
function activate2ndButton() {
    SQUARE.parentElement.className = "underlay";
    SQRT.parentElement.className = "underlay";
    POWER.parentElement.className = "underlay";
    POWER_OF_TEN.parentElement.className = "underlay";
    LOG.parentElement.className = "underlay";
    LN.parentElement.className = "underlay";
}
function deactivate2ndButton() {
    SQUARE.parentElement.className = "overlay";
    SQRT.parentElement.className = "overlay";
    POWER.parentElement.className = "overlay";
    POWER_OF_TEN.parentElement.className = "overlay";
    LOG.parentElement.className = "overlay";
    LN.parentElement.className = "overlay";
}
function applyOperandToMathExp(inputExp, operand) {
    let oldStr = inputExp;
    if (oldStr[oldStr.length - 1] == ")") {
        return inputExp = oldStr.slice(0, -1) + operand + ")";
    }
    else if (oldStr[oldStr.length - 1] == ")" && oldStr[oldStr.length - 2] == ")") {
        return inputExp = oldStr.slice(0, -2) + operand + "))";
    }
    else {
        return inputExp += operand;
    }
}
function applyOperatorToMathExp(inputExp, operator, result) {
    if (inputExp.slice(-1) == "=") {
        inputExp = "";
        return inputExp = result + operator;
    }
    if (operators.includes(inputExp.slice(-1))){
        return inputExp = inputExp.slice(0, -1) + operator;
    }
    else {
        return inputExp += operator;
    }  
}
function applyFuncToMathExp(currentInputExp, funcName, result) {
    let newInputExp ="";
    if (currentInputExp == "") {// handle no string in inputbox
        return newInputExp = funcName + "(" + result + ")";
    }
    else {
        let oldStr = currentInputExp;
        let indexOfLastOperator  = findIndexofLastOperatorOfMathExp(oldStr);
        if (oldStr[oldStr.length - 1] == ")") { //handle the last sub-mathexpression enclosed by parentheses;
            let indexOfLastLHParenthese = findIndexofMathcingLHParenthese(oldStr);
            if (funcName == "nthRoot" || funcName == "logbsN") {//handle self-defined functions with 2 args
                return newInputExp = oldStr.slice(0, indexOfLastLHParenthese) + funcName + oldStr.slice(indexOfLastLHParenthese, -1) + ", )";
            }
            else {//handle self-defined functions with 1 arg
                return newInputExp = oldStr.slice(0, indexOfLastLHParenthese) + funcName + oldStr.slice(indexOfLastLHParenthese);
            }
        }
        else { //handle last sub-mathexpression is not enclosed by parentheses
            if (indexOfLastOperator  == "null") {//handle no last operator existent case
                if (funcName == "nthRoot" || funcName == "logbsN") {//handle self-defined functions with 2 args
                    return newInputExp = funcName + "(" + oldStr + ", )";
                }
                else {//handle self-defined functions with 1 arg
                    return newInputExp = funcName + "(" + oldStr + ")";
                }                                   
            }
            else {//handle last operator existent case
                return newInputExp = oldStr.slice(0, indexOfLastOperator + 1) + funcName + "(" + oldStr.slice(indexOfLastOperator + 1) + ")";
            }                                                   
        }   
    }
}


/**
 * bind functions/actions to click events on corresponding related button elements
 * fulfil the functionalities which the calcualtor is bound to have
 */
SECOND_FUNC.addEventListener("click", () => {
    let style = getComputedStyle(SECOND_FUNC);
    if(style['background-color'] != "rgb(108, 101, 205)") {
        SECOND_FUNC.style.backgroundColor = "rgb(108, 101, 205)";
        SECOND_FUNC.style.borderWidth= "1px";
        SECOND_FUNC.style.borderRadius= "3px";
        activate2ndButton();
    }
    else {
        SECOND_FUNC.style = "auto";
        deactivate2ndButton();
    }
});
PI.addEventListener("click", () => {
    inputExp.value = applyOperandToMathExp(inputExp.value, PI.value);
});
E.addEventListener("click", () => {
    inputExp.value = applyOperandToMathExp(inputExp.value, E.value);
});              
NUM0.addEventListener("click", () => {
    inputExp.value = applyOperandToMathExp(inputExp.value, NUM0.value);
});
NUM1.addEventListener("click", () => {
    inputExp.value = applyOperandToMathExp(inputExp.value, NUM1.value);
});
NUM2.addEventListener("click", () => {
    inputExp.value = applyOperandToMathExp(inputExp.value, NUM2.value);
});
NUM3.addEventListener("click", () => {
    inputExp.value = applyOperandToMathExp(inputExp.value, NUM3.value);
});
NUM4.addEventListener("click", () => {
    inputExp.value = applyOperandToMathExp(inputExp.value, NUM4.value);
});
NUM5.addEventListener("click", () => {
    inputExp.value = applyOperandToMathExp(inputExp.value, NUM5.value);
});
NUM6.addEventListener("click", () => {
    inputExp.value = applyOperandToMathExp(inputExp.value, NUM6.value);
});
NUM7.addEventListener("click", () => {
    inputExp.value = applyOperandToMathExp(inputExp.value, NUM7.value);
});
NUM8.addEventListener("click", () => {
    inputExp.value = applyOperandToMathExp(inputExp.value, NUM8.value);
});
NUM9.addEventListener("click", () => {
    inputExp.value = applyOperandToMathExp(inputExp.value, NUM9.value);
});

SQUARE.addEventListener("click", () => {
    inputExp.value = applyFuncToMathExp(inputExp.value, SQUARE.value, result.value);
});
CUBE.addEventListener("click", () => {
    inputExp.value = applyFuncToMathExp(inputExp.value, CUBE.value, result.value);
});                ;                
RECPRC.addEventListener("click", () => {
    inputExp.value = applyFuncToMathExp(inputExp.value, RECPRC.value, result.value);
});
ABS.addEventListener("click", () => {
    inputExp.value = applyFuncToMathExp(inputExp.value, ABS.value, result.value);
});
SQRT.addEventListener("click", () => {
    inputExp.value = applyFuncToMathExp(inputExp.value, SQRT.value, result.value);
});
CBRT.addEventListener("click", () => {
    inputExp.value = applyFuncToMathExp(inputExp.value, CBRT.value, result.value);
});
FACTORIAL.addEventListener("click", () => {
    inputExp.value = applyFuncToMathExp(inputExp.value, FACTORIAL.value, result.value);
});
NTH_ROOT.addEventListener("click", () => {
    inputExp.value = applyFuncToMathExp(inputExp.value, NTH_ROOT.value, result.value);
});
POWER_OF_TEN.addEventListener("click", () => {
    inputExp.value = applyFuncToMathExp(inputExp.value, POWER_OF_TEN.value, result.value);
});
POWER_OF_TWO.addEventListener("click", () => {
    inputExp.value = applyFuncToMathExp(inputExp.value, POWER_OF_TWO.value, result.value);
});
LOG.addEventListener("click", () => {
    inputExp.value = applyFuncToMathExp(inputExp.value, LOG.value, result.value);
});
N_BASE_LOG.addEventListener("click", () => {
    inputExp.value = applyFuncToMathExp(inputExp.value, N_BASE_LOG.value, result.value);
});
LN.addEventListener("click", () => {
    inputExp.value = applyFuncToMathExp(inputExp.value, LN.value, result.value);
});
POWER_OF_E.addEventListener("click", () => {
    inputExp.value = applyFuncToMathExp(inputExp.value, POWER_OF_E.value, result.value);
});             

leftParenthese.addEventListener("click", () => {
    inputExp.value += leftParenthese.value;
});
rightParenthese.addEventListener("click", () => {
    inputExp.value += rightParenthese.value;
});
decimalPoint.addEventListener("click", () => {
    //judge if last char is not a number
    if (!(/^\d$/.test(inputExp.value.slice(-1)))){
        inputExp.value += "0";
    }
    inputExp.value += decimalPoint.value;                  
});

operatorPlus.addEventListener("click", () => {
    inputExp.value = applyOperatorToMathExp(inputExp.value, operatorPlus.value, result.value);
});
operatorMinus.addEventListener("click", () => {
    inputExp.value = applyOperatorToMathExp(inputExp.value, operatorMinus.value, result.value);                   
});
operatorMultiply.addEventListener("click", () => {
    inputExp.value = applyOperatorToMathExp(inputExp.value, operatorMultiply.value, result.value);  
});
operatorDivide.addEventListener("click", () => {
    inputExp.value = applyOperatorToMathExp(inputExp.value, operatorDivide.value, result.value);
});
operatorMod.addEventListener("click", () => {
    inputExp.value = applyOperatorToMathExp(inputExp.value, operatorMod.value, result.value);
});
EXP.addEventListener("click", () => {
    inputExp.value = applyOperatorToMathExp(inputExp.value, EXP.value, result.value);
}); 
POWER.addEventListener("click", () => {
    inputExp.value = applyOperatorToMathExp(inputExp.value, POWER.value, result.value);
});

sign.addEventListener ("click", () => {
    let oldStr = inputExp.value;
    let indexOfLastOperator = findIndexofLastOperatorOfMathExp(oldStr);

    if (oldStr[indexOfLastOperator] == "+" && oldStr[indexOfLastOperator - 1] == "("){
        inputExp.value = oldStr.slice(0, indexOfLastOperator) + "-" + oldStr.slice(indexOfLastOperator + 1);
    }
    else if (oldStr[indexOfLastOperator] == "-" && oldStr[indexOfLastOperator - 1] == "(") {
        inputExp.value = oldStr.slice(0, indexOfLastOperator) + "+" + oldStr.slice(indexOfLastOperator + 1);
    }
    else if (oldStr[indexOfLastOperator] == "+" && indexOfLastOperator == 0)
    {
        inputExp.value = "-" + oldStr.slice(indexOfLastOperator + 1);
    }
    else if (oldStr[indexOfLastOperator] == "-" && indexOfLastOperator == 0)
    {
        inputExp.value = "+" + oldStr.slice(indexOfLastOperator + 1);
    }
    else {
        inputExp.value = oldStr.slice(0, indexOfLastOperator + 1) + "(-" + oldStr.slice(indexOfLastOperator + 1) + ")";
    }
});

backspace.addEventListener("click", () => {
    inputExp.value = inputExp.value.slice(0, -1);
});
evaluate.addEventListener("click", () => {
    if (inputExp.value.slice(-1) !== "=") {
        mathExp = inputExp.value;
        inputExp.value += evaluate.value;
        try {
            mathExp = mathExp.replace("π", "(Math.PI)");
            mathExp = mathExp.replace(".e+", "*10^");
            mathExp = mathExp.replace("e^", "(Math.E)^");
            mathExp = mathExp.replace("e", "(Math.E)");
            mathExp = mathExp.replace("^", "**");
            result.value = eval(mathExp);
        } catch (error) {
            result.value = error.message;
    }
    }
});

clear.addEventListener("click", () => {
    mathExp = "";
    inputExp.value = "";
    result.value = "0";
});