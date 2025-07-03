const cookiesWindow = document.querySelector(".cookies");

if (localStorage.getItem('cookiesConfirmed')) {
    cookiesWindow.remove();
} else {
    const cookiesCloseBtn = document.querySelector(".cookies__close-btn");
    const cookiesConfirmBtn = document.querySelector(".cookies__confirm-btn");

    //cookiesWindow.focus();

    cookiesCloseBtn.addEventListener("click", () => {
        cookiesWindow.remove();
    });

    cookiesConfirmBtn.addEventListener("click", () => {
        localStorage.setItem('cookiesConfirmed', true);
        cookiesWindow.remove();
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') cookiesWindow.remove();
    });

}


