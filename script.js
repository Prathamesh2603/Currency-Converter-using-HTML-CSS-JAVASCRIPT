const BASE_URL = "";

const selects = document.querySelectorAll("select");

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