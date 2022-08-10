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
    console.log(equations.textContent);
    equationArray=Array.from(equations.textContent);
    

}