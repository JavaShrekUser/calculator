let fullFunc = [];
let nextFunc = [];
tempString = '';
let result = 0;
let curr1 = 0;
let curr2 = 0;
let tempResult = 0;


const buttons = document.querySelectorAll('button')
buttons.forEach(button => {
    button.addEventListener('click',saveKey)  
});

function saveKey(key){
    let currKey = key.target.className

    if(currKey === '+' || currKey === '-' || currKey === '*' || currKey === '/'){
        if(tempString !==''){                       //if tempString is not empty, push it to fullFunc and reset tempString
            fullFunc.push(tempString);
            tempString='';
            calculate(fullFunc);
        }
        
        if(fullFunc.length >=2 && /[\+\-\*\/]$/.test(fullFunc)){
            fullFunc.pop();                         //if input signs multiple times, remove privous one
        }

        fullFunc.push(`${currKey}`);
    }
    else if(!isNaN(parseInt(currKey))){             //temp number container for containing num>9
        tempString += currKey;
        console.log(tempString)
    }
    console.log(fullFunc);
}

function calculate(lst){                            //prior multiply and divide part
    if(lst.length>=3){
        if(lst[lst.length-2]=='*'){
            curr1 = lst[lst.length-3];
            curr2 = lst[lst.length-1];
            tempResult = curr1*curr2;
            lst = lst.slice(0,-3);
            lst.push(`${tempResult}`);
            fullFunc = lst;
        }
        else if(lst[lst.length-2]=='/'){
            curr1 = lst[lst.length-3];
            curr2 = lst[lst.length-1];
            tempResult = curr1/curr2;
            lst = lst.slice(0,-3);
            lst.push(`${tempResult}`);
            fullFunc = lst;
        }
    }
}

const equal = document.querySelector('button.equal');
equal.addEventListener('click',operate);

function operate(){
    lst = fullFunc;
    result = lst[0];

    if(tempString!==''){                        //put tempstring into list because calculate function didn't do
        fullFunc.push(tempString);
        tempString='';
        console.log(fullFunc);
    }

    if(isNaN(parseInt(lst[lst.length-1]))){     //remove if last input in list is not number
        fullFunc.pop();
    }

    for(let i=0;i<lst.length-1;i++){            //final calculation
        if(lst.length>2){
            if(lst[i+1]=='+'){
                result = result + lst[i+2];
            }
            if(lst[i+1]=='-'){
                result = result - lst[i+2];
            }
            if(lst[i+1]=='*'){
                result = result * lst[i+2];     //additional multiply and divide prevent there is only 2 numbers
            }
            if(lst[i+1]=='/'){
                result = result / lst[i+2];
            }
        }
    }

    let nextFunc = [`${result}`, `${fullFunc[fullFunc.length-2]}`, `${fullFunc[fullFunc.length-1]}`];
    fullFunc = nextFunc;                        //↑ continue last calculation
    tempString = '';

    console.log(result)
    return result;
}

// when press =, if last input !=number, remove last sign
// before input a number, if there is a sign, remove it

