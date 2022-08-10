const buttons=document.querySelectorAll('button');
const equations=document.querySelector('.equation');
const equalSign=document.getElementById('equal')
let dotflag=0;
let previousnum=NaN;
let previoustext='';

buttons.forEach(button=>{
    button.addEventListener('mouseover',higlight,false);
    button.addEventListener('mouseleave',removehiglight,false)
    button.addEventListener('click',buttonClicked,false)
});
equalSign.addEventListener('click',equalButtonClicked,false)
function higlight(){
    this.classList.add('highlight')
}
function removehiglight(){
    if(this.classList.contains('highlight')){
        this.classList.remove('highlight')
    }    
}
function buttonClicked(){
    let currentText=this.textContent;
    let currentnum=Number(this.textContent)
    if(isNaN(currentnum)
    &&currentText!='Clear'
    &&currentText!='C'
    &&currentText!='.'
    ||currentText=='C'&&previoustext=='.'){
        dotflag=0;
    }
    if(isNaN(currentnum)
    &&!isNaN(previousnum)
    &&currentText!='Clear'
    &&dotflag==0
    &&currentText!='C'
    &&currentText!='='||!isNaN(currentnum)){
        if(equations.textContent.length<22){
            equations.textContent+=currentText;
            previousnum=Number(this.textContent)
            previoustext=this.textContent;
        }
    }
    if(currentText=='Clear'){
        equations.textContent='';
        previoustext='';
        previousnum=NaN;
    }
    if(currentText=='C'){
        equations.textContent=equations.textContent.slice(0,-1);
        previoustext=equations.textContent.charAt(equations.textContent.length-1);
        previousnum=Number(previoustext);
        if(previoustext==''){
            previousnum=NaN;
        }
    }

    if(currentText=='.'){
        dotflag=1;
    }

}
function equalButtonClicked(){
    let numbercount=0;
    let equationArray=Array.from(equations.textContent);
    let numbers=[];
    let signs=[];
    console.log(equationArray);
    equationArray.forEach((elem)=>{
        if(isNaN(elem)&&elem!='.'){
          signs.push(elem);
          numbercount++             
        }
       else{
        if(!numbers[numbercount]){
            numbers[numbercount]=''
        };
            numbers[numbercount]+=elem;
       }
       console.log(elem)
    });
    let result=0;
    let index;
    if(signs.length==0){
        result=numbers[0];
    }
    while(signs.length!=0){
        if(signs.includes("^")){
            index=signs.indexOf("^");
            result=Math.pow(Number(numbers[index]),Number(numbers[index+1]))
            signs.splice(index,1);
            numbers.splice(index+1,1);
            numbers[index]=result;
            continue;
        }
        if(signs.includes("*")){
            index=signs.indexOf("*");
            result=Number(numbers[index])*Number(numbers[index+1])
            signs.splice(index,1);
            numbers.splice(index+1,1);
            numbers[index]=result;
            continue;
        }
        else if(signs.includes("/")){
            index=signs.indexOf("/");
            result=Number(numbers[index])/Number(numbers[index+1])
            signs.splice(index,1);
            numbers.splice(index+1,1);
            numbers[index]=result;
            continue;
        };
        if(signs.includes("+")){
            index=signs.indexOf("+");
            result=Number(numbers[index])+Number(numbers[index+1])
            signs.splice(index,1);
            numbers.splice(index+1,1);
            numbers[index]=result;
            continue;
        }
        else if(signs.includes("-")){
            index=signs.indexOf("-");
            result=Number(numbers[index])-Number(numbers[index+1])
            signs.splice(index,1);
            numbers.splice(index+1,1);
            numbers[index]=result;
            continue;
        };
        break;
    }
    console.log(result)
    const results=document.querySelector('.result');
    results.textContent=result;

};