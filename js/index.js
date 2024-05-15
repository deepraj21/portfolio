

//for Engineering culture
const cultureItemArray = [...document.getElementsByClassName('main-culture__item')];

window.onscroll = () => {
    if (window.innerWidth >= 768) {
        if ((cultureItemArray[0].offsetTop - cultureItemArray[1].offsetTop > -400) || (cultureItemArray[1].offsetTop - cultureItemArray[2].offsetTop > -100)) {
            cultureItemArray[0].classList.add('main-culture__item--out')
        } else {
            cultureItemArray[0].classList.remove('main-culture__item--out')
        }
        if (cultureItemArray[1].offsetTop - cultureItemArray[2].offsetTop >= -300) {
            cultureItemArray[1].classList.add('main-culture__item--out')
        } else {
            cultureItemArray[1].classList.remove('main-culture__item--out')
        }
    }

};



//animate symbols
const animateSymbols = {
    texts: document.querySelector(".main-first__hero-text").innerText,
    textOneLine: document.querySelector(".main-first__hero-text").innerText.replaceAll(/[\n, ]+/g, ''),
    blinkingSetInterval: 0,
    isVisible: true,

    init: function() {
        let res = ""
        const textArray = this.texts.split('\n')
        for (let j = 0; j < textArray.length; j++) {
            for (let k = 0; k < textArray[j].length; k++) {
                if (textArray[j][k] !== ' ') {
                    res += '<span class="letter">' + textArray[j][k] + '</span>'
                } else {

                    res += textArray[j][k]
                }
            }
            if (j !== textArray.length - 1) res += '<br>'
        }
        document.querySelector(".main-first__hero-text").innerHTML = res;
        const letters = [...document.querySelectorAll(".letter")];
        animateSymbols.change_to(letters);
        document.addEventListener("keypress", (event) => {
            if (event.key === "Enter" && this.cycleIndex === 0 && this.isVisible) {
                clearInterval(this.blinkingSetInterval)
                document.querySelector(".main-first__hero-text").innerHTML = res;
                const letters = [...document.querySelectorAll(".letter")];
                animateSymbols.change_to(letters);
            }
        });
    },

    easeFunc: x => x * x * x * x * x,
    cycleIndex: 0,
    charCycles: 50,
    allCharacters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', ']', '['],
    blinkingCharacters: {
        'e': '3',
        'i': '1',
        'o': '0',
        'b': '6',
        'l': '1',
        'j': '1',
        'u': '4',
        'r': '7',
    },

    change_to: function(letters) {
        const indexLettersToAnimateArray = [],
            indexLettersToTextArray = [];
        for (let i = 0; i < letters.length; i++) {
            if (letters[i] !== null) {
                indexLettersToAnimateArray.push(i)
            }
        }
        indexLettersToAnimateArray.sort(() => 0.5 - Math.random());
        this.cycleIndex++;
        const countLetterToText = Math.floor(this.easeFunc(this.cycleIndex / this.charCycles) * indexLettersToAnimateArray.length);

        if (this.cycleIndex <= this.charCycles) {
            setTimeout(() => {
                for (let j = 0; j < countLetterToText; j++) {
                    indexLettersToTextArray.push(indexLettersToAnimateArray[j]);
                }
                letters = letters.map((el, index) => {
                    if (el === null) return null;
                    if (indexLettersToTextArray.includes(index)) {
                        el.innerText = this.textOneLine[index]
                        return null;
                    } else {
                        const indexAllCharacters = Math.floor((Math.random() * this.allCharacters.length));
                        el.innerText = this.allCharacters[indexAllCharacters];
                        return el;
                    }
                })
                this.change_to(letters);
            }, this.easeFunc(this.cycleIndex / this.charCycles) * 100 + 40);
        } else {
            document.querySelector('.main-first__text').classList.add('main-first--visible')
            setTimeout(() => document.querySelector('.main-github').classList.add('main-first--visible'), 1000)

            this.cycleIndex = 0;
            document.querySelector(".main-first__hero-text").insertAdjacentHTML('beforeend', '<span class="main-first__hero-text--cursor">_</span>');

            const indexBlinkingLettersArray = [];
            for (let i = 0; i < this.textOneLine.length; i++) {
                if (this.blinkingCharacters[this.textOneLine[i]] !== undefined) {
                    indexBlinkingLettersArray.push(i)
                }
            }
            const letters = [...document.querySelectorAll(".letter")];
            const getIndexLetter = () => indexBlinkingLettersArray[Math.floor((Math.random() * indexBlinkingLettersArray.length))]
            let oldLetter, letter, indexLetter;
            this.blinkingSetInterval = setInterval(() => {
                do {
                    indexLetter = getIndexLetter();
                    letter = this.textOneLine[indexLetter];
                } while (letter === oldLetter)
                letters[indexLetter].innerText = this.blinkingCharacters[letter];
                setTimeout(() => {
                    letters[indexLetter].innerText = letter
                }, 200);
                oldLetter = letter;
            }, 1000)
        }

    },

}

animateSymbols.init();

