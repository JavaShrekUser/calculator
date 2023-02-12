let fullFunc = [];
tempString = '';
let result = 0;
let curr1 = 0;
let curr2 = 0;
let tempResult = 0;

function operate(num1,sign,num2){

    if(sign === '+'){

    }
    else if(sign === '-'){

    }
    else if(sign === '*'){

    }
    else if(sign === '/'){

    }

    return result;
}

function add(a,b){
    return a+b;
}

function minus(a,b){
    return a-b;
}

function times(a,b){
    return a*b;
}

function divide(a,b){
    if(a===0){
        return "Error"
    }
    else{
        return a/b;
    }
}

const buttons = document.querySelectorAll('button')
buttons.forEach(button => {
    button.addEventListener('click',saveKey)  
});

function saveKey(key){
    let currKey = key.target.className

    if(currKey == '+' || currKey == '-' || currKey == '*' || currKey == '/'){
        if(tempString !==''){                       //if tempString is not empty, push it to fullFunc and reset tempString
            fullFunc.push(tempString);
            tempString='';
            calculate(fullFunc);
        }
        
        if(fullFunc.length >=2 &&                   //if there is a sign before next sign, remove privious one
            (fullFunc[fullFunc.length-1] == '+' ||  //could polish -> number area sign area
            fullFunc[fullFunc.length-1] == '-' || 
            fullFunc[fullFunc.length-1] == '*' || 
            fullFunc[fullFunc.length-1] == '/')){
                fullFunc = fullFunc.slice(0,-1);
            }
            
        fullFunc.push(`${currKey}`);
    }
    else{
        tempString += currKey;
        console.log(tempString)
    }
    console.log(fullFunc);
}

function calculate(lst){                            //change the lst in the suqare
    if(lst.length>=3){
        if(lst[lst.length-2]=='*'){
            curr1 = lst[lst.length-3];
            curr2 = lst[lst.length-1];
            tempResult = times(curr1,curr2);
            lst = lst.slice(0,-3);
            lst.push(`${tempResult}`);
            fullFunc = lst;
        }
        else if(lst[lst.length-2]=='/'){
            curr1 = lst[lst.length-3];
            curr2 = lst[lst.length-1];
            tempResult = divide(curr1,curr2);
            lst = lst.slice(0,-3);
            lst.push(`${tempResult}`);
            fullFunc = lst;
        }
    }
}

