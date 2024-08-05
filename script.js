const inputSlider = document.querySelector("[dataLengthSlider]");
const dataNumber = document.querySelector("[dataLengthNumber]");
const passwordDisplay = document.querySelector("[dataPasswordDisplay]");
const copyBtn = document.querySelector("[copybtn]");
const copyMsg = document.querySelector("[data-copyMsg]");
const upperCaseCheck = document.querySelector("#uppercase");
const lowerCaseCheck = document.querySelector("#lowercase");
const dataNumberCheck = document.querySelector("#numbers");
const dataSymbolsCheck = document.querySelector("#symbols");
const generateBtn = document.querySelector(".generateBtn");
const dataIndicator = document.querySelector("#data-indicator");
const allCheckBox = document.querySelectorAll("input[type=checkbox]")
const symbols = "`~!@#$%&*()_-+{]{]\|.<>?/,'";

let password = "";
let passwordLength = 10;
dataNumber.innerHTML = 10;
let checkcount = 0;
// document.querySelector("#uppercase").ariaChecked
function handleslider() {
    inputSlider.value = passwordLength;
    dataNumber.innerHTML = passwordLength;
    const min=inputSlider.min;
    const max=inputSlider.max;
    inputSlider.style.backgroundSize=((passwordLength-min)*100/(max-min))+"% 100%"
    changeStrengthColor();
}

function getRandomInteger(min, max) {

    return Math.floor(Math.random() * (max - min)) + min;

}

function getRandomNumber() {
    return getRandomInteger(0, 9);
}

function getRandomUpperCase() {
    return String.fromCharCode(getRandomInteger(65, 90));
}

function getRandomLowerCase() {
    return String.fromCharCode(getRandomInteger(97, 122));
}

function getRandomSymbols() {
    const indOfSymbols = getRandomInteger(0, symbols.length);
    return symbols[indOfSymbols];

}

// Shuffle password
// fiher yates algorithm
function shufflePassword(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        // const [i] = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    let str = "";
    arr.forEach((el) => {
        str += el;
    })
    return str;
}

// copy to clipboard
async function copytoClipboard() {

    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerHTML = "Copied";
    }
    catch (e) {
        copyMsg.innerHTML = "failed";
    }

    copyMsg.classList.add("active");
    setTimeout(() => {
        copyMsg.classList.remove("active");

    }, 2000);
}

// change length of pass according to slider
inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleslider();

})

// copy password
copyBtn.addEventListener('click', () => {
    console.log(passwordDisplay.value + "called");
    if (passwordDisplay.value) {
        // console.log("CopyBtn funcn called");
        copytoClipboard();

    }
});

// handling check box
function handlecheckBox() {
    checkcount = 0;
    allCheckBox.forEach(checkbox => {
        if (checkbox.checked) {
            checkcount++;

        }

    });
    // edge case all checked and lengthOfpass>1
    if (passwordLength < checkcount) {
        passwordLength = checkcount;
        handleslider();
    }

}

allCheckBox.forEach(checkbox => {
    checkbox.addEventListener('change', handlecheckBox)

});

// let's generate new password
generateBtn.addEventListener('click', () => {
    if (checkcount <= 0) {
        console.log("checkcount" + checkcount);
        return;
    }
    if (passwordLength < checkcount)
        passwordLength = checkcount;
    handleslider();

    // remove old password
    password = "";

    // if (upperCaseCheck.checked)
    //     password += getRandomUpperCase();


    // if (lowerCaseCheck.checked)
    //     password += getRandomLowerCase();

    // if (dataSymbolsCheck.checked)
    //     password += getRandomSymbols();

    // if (dataNumberCheck.checked)
    //     password += getRandomNumber();

    // remaining password
    let funcArr = [];

    if (upperCaseCheck.checked)
        funcArr.push(getRandomUpperCase);

    if (lowerCaseCheck.checked)
        funcArr.push(getRandomLowerCase);

    if (dataSymbolsCheck.checked)
        funcArr.push(getRandomSymbols);

    if (dataNumberCheck.checked)
        funcArr.push(getRandomNumber);

    // compulsary addition
    for (let i = 0; i < funcArr.length; i++) {
        password += funcArr[i]();
        console.log("compulsory pass " + password + " " + password.length);
    }
    console.log(funcArr.length);
    console.log(password);
    // remaining addition
    for (let i = 0; i < passwordLength - funcArr.length; i++) {
        let randomIndex = getRandomInteger(0, funcArr.length);
        password += funcArr[randomIndex]();
    }
    password = shufflePassword(Array.from(password));
    console.log("remaining password " + password + " " + password.length);
    passwordDisplay.value = password;
});


const strength=document.querySelector(".strength");
function changeStrengthColor()
{
    if(passwordLength<8)
    {
        
        strength.ins
    }
    else if(passwordLength>8)
    {
       

    }
}