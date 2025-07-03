const cookiesCloseBtn = document.querySelector(".cookies__close-btn");
const cookiesConfirmBtn = document.querySelector(".cookies__confirm-btn");
const cookiesWindow = document.querySelector(".cookies");

if (localStorage.getItem('cookiesConfirmed')) {
    cookiesWindow.remove();
}

cookiesCloseBtn.addEventListener("click", () => {
    cookiesWindow.remove();
});

cookiesConfirmBtn.addEventListener("click", () => {
    localStorage.setItem('cookiesConfirmed', true);
    cookiesWindow.remove();
});
