// Detect Keyboard language and insert text into
const keyboard = navigator.keyboard;

let english = true;

const line1 = document.getElementById("line1");


window.onload = () => {
    keyboard.getLayoutMap().then((keyboardLayoutMap) => {
        const key1 = keyboardLayoutMap.get("Digit1");

        if(key1 !== "1") {
            english = false;
            window.alert("Non-english keyboard detected. Please contact puzzle makers.");
        }
    });
}