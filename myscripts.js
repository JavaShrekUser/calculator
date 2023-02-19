let fullFunc = [];
let nextFunc = [];
let showFunc = [];
let tempString = '';
let showString = '';
let result = 0;
let curr1 = 0;
let curr2 = 0;
let tempResult = 0;
let finished = false;
let cleaned = false;
let isComma = false;
let isNegative = false;

const equal = document.querySelector('button.equal');
equal.addEventListener('click',operate);

const clear = document.querySelector('button.clear');
clear.addEventListener('click',clean);

const delet = document.querySelector('button.delet');
delet.addEventListener('click',backspace);

const negative = document.querySelector('button.negative');
negative.addEventListener('click',addNegative);

const point = document.querySelector('button.point');
point.addEventListener('click',addPoint);

const sign = document.querySelector('div.sign');
const fullFunction = document.querySelector('div.fullFunction');
const current = document.querySelector('div.current');


const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click',saveKey)  
});

function saveKey(key){
    let currKey = key.target.className

    if(currKey === '+' || currKey === '-' || currKey === '*' || currKey === '/' || currKey === '%'){

        if(tempString == '' && fullFunc.length==0){
            tempString = '0';
        }
        
        if(tempString !==''){         
            fullFunc.push(tempString);              //if tempString is not empty, push it to fullFunc and reset tempString
            tempString='';
            isComma = false;
            calculate(fullFunc);
        }

        if(isNaN(parseFloat(fullFunc[0]))){          //if lst[0] is not a number, remove it.
            fullFunc.pop(); 
        }  
        
        if(fullFunc.length >=2 && /[\+\-\*\%\/]$/.test(fullFunc)){
            fullFunc.pop();                         //if input signs multiple times, remove privous one
        }

        if(finished==true){                         //if input next calculatoin base on answer, remove last two input from nextFunc
            fullFunc.pop();
            fullFunc.pop();
            finished = false;
        }

        isComma = false;
        isNegative = false;

        fullFunc.push(`${currKey}`);
        fullFunction.textContent = fullFunc.join("");
        sign.textContent = currKey;
        current.textContent='0';


        console.log(tempString)
        console.log(fullFunc)

    }
    else if(!isNaN(parseFloat(currKey))){             //↓ if input a number after the answer, clean the fullFunc
        if(finished === true && /[\+\-\*\%\/]$/.test(fullFunc[fullFunc.length-2])){
            fullFunc = [];
            finished = false;
        }

        if(isNaN(parseFloat(fullFunc[0]))){          //if lst[0] is not a number, remove it.
            fullFunc.pop(); 
        }  

        if(tempString.length <= 14){
            tempString += currKey;                      //temp number container for containing num>9
        }
        clear.textContent='C'
        cleaned = false;
        current.textContent=tempString;

        console.log(tempString)
        console.log(fullFunc)
    }
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
        else if(lst[lst.length-2]=='%'){
            curr1 = lst[lst.length-3];
            curr2 = lst[lst.length-1];
            tempResult = curr1%curr2;
            lst = lst.slice(0,-3);
            lst.push(`${tempResult}`);
            fullFunc = lst;
        }
    }
}

function operate(){
    result = parseFloat(fullFunc[0]);

    if(tempString!==''){                        //put tempstring into list because calculate function didn't do
        fullFunc.push(tempString);  
        tempString='';
        if(fullFunc.length>=5){
            calculate(fullFunc);
        }
    }
    
    console.log(fullFunc)

    if(fullFunc.length >=3){
        if(isNaN(parseFloat(fullFunc[fullFunc.length-1]))){     //remove if last input in list is not number
            fullFunc.pop();
        }

        for(let i=0;i<fullFunc.length-1;i++){            //final calculation

            if(fullFunc.length>2){
                if(fullFunc[i+1]=='+'){
                    result = result + parseFloat(fullFunc[i+2]);
                }
                if(fullFunc[i+1]=='-'){
                    result = result - parseFloat(fullFunc[i+2]);
                }
                if(fullFunc[i+1]=='*'){
                    result = result * parseFloat(fullFunc[i+2]);     //additional multiply and divide prevent there is only 2 numbers
                }
                if(fullFunc[i+1]=='/'){
                    result = result / parseFloat(fullFunc[i+2]);
                }
                if(fullFunc[i+1]=='%'){
                    result = result % parseFloat(fullFunc[i+2]);
                }
            }
        }
    
        fullFunction.textContent = fullFunc.join("");
        let nextFunc = [`${result}`, `${fullFunc[fullFunc.length-2]}`, `${fullFunc[fullFunc.length-1]}`];
        fullFunc = nextFunc;                        //↑ continue last calculation
        tempString = '';

        finished = true;
        clear.textContent = 'AC'
        cleaned = true;

        result = Math.round(result * 100000000) / 100000000;

        current.textContent = result;
        sign.textContent = '=';
    }
}

function clean(){
    if(cleaned===false){
        tempString = '';
        cleaned = true;
        current.textContent = '0';
    }
    else{
        fullFunc = [];
        nextFunc = [];
        tempString = '';
        result = 0;
        curr1 = 0;
        curr2 = 0;
        tempResult = 0;
        finished = false;
        cleaned = false;
        isComma = false;
        isNegative = false;

        fullFunction.textContent = '';
        current.textContent = '0';
        sign.textContent = '';

    }
    clear.textContent = 'AC'
}

function backspace(){
    tempString = tempString.slice(0, -1);
    current.textContent=tempString;
    return tempString;
}

function addPoint(){ 
    if(isComma == false){
        tempString = tempString + '.';
        isComma = true;
    }
    current.textContent=tempString;
}

function addNegative(){
    if(isNegative == false){
        tempString = '-' + tempString;
        isNegative = true; //搞一个tempFullFunc
    }
    else{
        tempString = tempString.slice(1);
        isNegative = false;
    }
    current.textContent=tempString;

    if(tempString===''){
        current.textContent='0';
    }
    else if(tempString==='-'){
        current.textContent='-0';
    }
}

//a function for if 0000 in tempstring

