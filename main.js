let textOutput = document.getElementById('text');

let wpm = 500;
let wordsShown = 1;


let queue = [];
let text = "";
let split = null;
let wordIndex = 0;
let endIndex = 0


function load(text) {
    // textOutput.style.fontSize = "1em";
    textOutput.style.fontSize = `min(${20 / wordsShown}vw, 20vh)`;
    console.log(text)
    wordIndex = 0;
    split = text.split(' ');
    endIndex = split.length;
    display();
}

function display() {
    let word = split.slice(wordIndex, wordIndex + wordsShown).join(' ');
    console.log(split)
    textOutput.innerText = word;
    wordIndex += wordsShown;
    if (wordIndex < endIndex) {
        setTimeout(() => window.requestAnimationFrame(display), (60 / (wpm / wordsShown)) * 1000);
    } else {
        setTimeout(init, (60 / (wpm / wordsShown)) * 1000);
    }
}

let init = () => {
    textOutput.innerText = "";
    fetch("https://en.wikipedia.org/api/rest_v1/page/random/summary")
        .then(response => text = response.json().then(j => load(j["extract"])))
};

// load("the quick brown fox jumped over the lazy dog meow")

init()