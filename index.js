const fromcur = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const btn = document.querySelector("form button");
const exicon = document.querySelector("form .reverse");
const amount = document.querySelector("form input");
const exrate = document.querySelector("form .result");

// displaying options of currencies
 
[fromcur, tocurr].forEach((select, i)=>{
    for(let curcode in Country_List){
        const selected = (i===0 && curcode === "USD") || (i===1 && curcode === "GBP") ? "selected" : "";
        select.insertAdjacentHTML("beforeend", `<option value="${curcode}" ${selected}>${curcode}</option>`);
    }
    select.addEventListener("change",()=>{
        const code = select.value;
        const imgtag = select.parentElement.querySelector("img");
        imgtag.src=`https://flagcdn.com/48x36/${Country_List[code].toLowerCase()}.png`;
    });
});

// exchanging rates through api's

async function getExchangeRates(){
    const amountVal = amount.value || 1;
    exrate.innerText = "Getting Exchange Rates...";
    try{
        const response = await fetch(` https://v6.exchangerate-api.com/v6/e4d899f5587461b353dd3691/latest/${fromcur.value}`);
        const result = await response.json();
        const exRate = result.conversion_rates[tocurr.value];
        const total = (amountVal*exRate).toFixed(2);
        exrate.innerText = `${amountVal} ${fromcur.value} = ${total} ${tocurr.value}`;
    }
    catch(error){
        exrate.innerText = "Something Went Wrong...";
    }
}



window.addEventListener("load",getExchangeRates);
btn.addEventListener("click",(e)=>{
    e.preventDefault();
    getExchangeRates();
});


exicon.addEventListener("click",()=>{
    [fromcur.value, tocurr.value]=[tocurr.value , fromcur.value];
    [fromcur,tocurr].forEach((select)=>{
        const code = select.value;
        const imgtag = select.parentElement.querySelector("img");
        imgtag.src=`https://flagcdn.com/48x36/${Country_List[code].toLowerCase()}.png`;
    });
    getExchangeRates();
});