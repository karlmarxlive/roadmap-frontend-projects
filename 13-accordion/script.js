const questions = document.querySelectorAll('.faq__question');

questions.forEach((question) => {
    question.addEventListener('click', (event) => {
        event.preventDefault();
        if (question.hasAttribute('open')) question.removeAttribute('open');
        else {
            questions.forEach((question) => question.removeAttribute('open'));
            question.setAttribute('open', '');
        }
    })
})