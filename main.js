const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numberEl = document.getElementById("numbers");
const symbolEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

// Generate event listen
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numberEl.checked;
    const hasSymbols = symbolEl.checked;
    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbols, length);
    // console.log(typeof length);
});

// Copy password to clipboard
clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;
    if(!password) {
        return;
    }
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password coppied to clipboard');
});

//Generate Password Function
function generatePassword(lower, upper, number, symbol, length) {
// Initialize password variable
// Filter out unchecked type
// Loop over length call and generate function for each type
// Add final password to the password variable and return
    let generatedPassword = '';
    const typeCount = lower + upper + number + symbol;
    console.log('typeCount: ' + typeCount);
    const typeArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);
    // console.log('TypeArr ',  typeArr);

    if(typeCount === 0) {
        return '';
    }

    for(let i = 0; i<length; i += typeCount)
    {
        typeArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            // console.log('funcName: ', funcName);

            generatedPassword += randomFunc[funcName]();
        });
    }
    const finalPassword = (generatedPassword.slice(0, length));
    return finalPassword;
}

// Generate Functions
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}