let fullFunc = [];
let nextFunc = [];
let tempString = '';
let result = 0;
let curr1 = 0;
let curr2 = 0;
let tempResult = 0;
let finished = false;


const buttons = document.querySelectorAll('button')
buttons.forEach(button => {
    button.addEventListener('click',saveKey)  
});

function saveKey(key){
    let currKey = key.target.className

    if(currKey === '+' || currKey === '-' || currKey === '*' || currKey === '/'){

        if(isNaN(parseInt(fullFunc[0]))){           //if lst[0] is not a number, remove it
            fullFunc.pop(); 
        }  
        
        if(tempString !==''){             
            fullFunc.push(tempString);              //if tempString is not empty, push it to fullFunc and reset tempString
            tempString='';
            calculate(fullFunc);
        }
        
        if(fullFunc.length >=2 && /[\+\-\*\/]$/.test(fullFunc)){
            fullFunc.pop();                         //if input signs multiple times, remove privous one
        }

        if(finished==true){                         //if input next calculatoin base on answer, remove last two input from nextFunc
            fullFunc.pop();
            fullFunc.pop();
            finished = false;
        }

        fullFunc.push(`${currKey}`);
    }
    else if(!isNaN(parseInt(currKey))){             //↓ if input a number after the answer, clean the fullFunc
        if(finished === true && /[\+\-\*\/]$/.test(fullFunc[fullFunc.length-2])){
            fullFunc = [];
            finished = false;
        }
        tempString += currKey;                      //temp number container for containing num>9
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
    result = parseInt(lst[0]);


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
                result = result + parseInt(lst[i+2]);
            }
            if(lst[i+1]=='-'){
                result = result - parseInt(lst[i+2]);
            }
            if(lst[i+1]=='*'){
                result = result * parseInt(lst[i+2]);     //additional multiply and divide prevent there is only 2 numbers
            }
            if(lst[i+1]=='/'){
                result = result / parseInt(lst[i+2]);
            }
        }
    }

    let nextFunc = [`${result}`, `${fullFunc[fullFunc.length-2]}`, `${fullFunc[fullFunc.length-1]}`];
    fullFunc = nextFunc;                        //↑ continue last calculation
    tempString = '';
    finished = true;

    console.log(result)
    return result;
}


