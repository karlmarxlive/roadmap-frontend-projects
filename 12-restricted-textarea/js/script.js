const input = document.querySelector('.message__input');
const counter = document.querySelector('.message__counter');
const characterLimit = input.maxLength;

function updateTextarea() {
    const len = input.value.length;
    counter.textContent = `${len}/${characterLimit}`;

    const limitReached = len >= characterLimit;
    input.classList.toggle('message__input--limit', limitReached);
    counter.classList.toggle('message__counter--limit', limitReached);
};

input.addEventListener('beforeinput', (e) => {
    if (input.value.length >= characterLimit && e.inputType.startsWith('insert')) {
        e.preventDefault();
    }
});

input.addEventListener('input', updateTextarea);

updateTextarea();