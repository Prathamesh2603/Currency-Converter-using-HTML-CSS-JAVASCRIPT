const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const selects = document.querySelectorAll("select");
const convertBtn = document.querySelector("button");
const fromCurr = document.querySelector("#from-select-country");
const toCurr = document.querySelector("#to-select-country");
const toinput = document.querySelector("#to-input");

for (const select of selects) {
    for (const currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.id === "from-select-country" && currCode === "USD") {
            newOption.selected = "selected";
        }
        else if (select.id === "to-select-country" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.appendChild(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/24.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

convertBtn.addEventListener("click", () => {
    updateExchangeRate();
});

let updateExchangeRate = async () => {
    let amount = document.querySelector("#from-input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate;
    for (const key in data[fromCurr.value.toLowerCase()]) {
        if (toCurr.value.toLowerCase() === key) {
            rate = data[fromCurr.value.toLowerCase()][key];
        }       
    }
    let finalVal = amtVal * rate;
    toinput.value = finalVal;
}
window.addEventListener("load", () => {
    updateExchangeRate();
});