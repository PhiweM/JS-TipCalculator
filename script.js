const bill = document.getElementById('bill');
const tipBtns = document.querySelectorAll('#btn');
const tipCustom  = document.querySelector('.btn6');
const people = document.getElementById('input-people');
const errorMsg = document.getElementById('feedback');
const results = document.querySelectorAll('.value');
const resetBtn = document.getElementById('reset');

let billValue = 0.0;//default total bill for all
let tipValue = 0;//default value 
let peopleValue = 1;

bill.addEventListener('input', setBillValue);

tipBtns.forEach(btn => {
    btn.addEventListener('click', handleClick);
});

tipCustom .addEventListener('input', setTipCustomValue);
people.addEventListener('input', setPeopleValue);
resetBtn.addEventListener('click', reset);



// function validateFloat(s){
//     var rgx = /^[0-9]*\.?[0-9]*$/;
//     return s.match(rgx);
// }

// function validateInt(s) {
//     var rgx = /^[0-9]*$/;
//     return s.match(rgx);
// }

function setBillValue() {
    if(bill.value.includes(',')){
        bill.value = bill.value.replace(',','.');
    }
    billValue = parseFloat(bill.value);
    calculateTip();
}

function handleClick(event){
    tipBtns.forEach(btn => {
        
        if(event.target.getAttribute('data-num')== btn.getAttribute('data-num')){
            tipValue = parseFloat(btn.getAttribute('data-num'));
            // btn.classList.add('btn-active');
        }
    });

    //clear custom tip
    tipCustom.value = '';

    calculateTip();
}


function setTipCustomValue(){
   
    tipValue = parseFloat(tipCustom.value/100);
    if(tipCustom.value !== ''){
        calculateTip();
    }
}


function setPeopleValue(){
    peopleValue = parseFloat(people.value);

    if(peopleValue <= 0){
        errorMsg.classList.add('show-error-msg');
        people.classList.add('error-outline');
        setTimeout(function(){
            errorMsg.classList.remove('show-error-msg');
            people.classList.remove('error-outline');
        }, 4000);
    }

    calculateTip();
}


function calculateTip(){
    if (peopleValue >=1 ){
        let tipAmount = billValue * tipValue / peopleValue;
        let total = billValue * (tipValue + 1) / peopleValue;
        results[0].innerHTML = '$' + tipAmount.toFixed(2);
        results[1].innerHTML = '$' + total.toFixed(2);
    }
}

//reset input fields and results display to 0
function reset(){
    bill.value = '0.0';
    setBillValue();    

    results.innerHTML = '$' + 0.00;

    people.value = '1';
    setPeopleValue();

    // if( peopleValue <= 0){
    //     resetBtn.classList.add('result-reset');
    //     setTimeout(function(){
    //         resetBtn.classList.remove('result-reset');
    //     }, 3000);
    // } 
}















