const tabBtns = document.getElementsByClassName('main-nav__btn');

function changeToTab(tabId) {
    document.querySelector('.tab--selected').classList.remove('tab--selected');
    document.getElementById(`tab-${tabId}`).classList.add('tab--selected');
}

function getActiveTabId(element) {
    return element.id.replace(/tab-(\d)-btn/, (match, p) => `${p}`);
}

function changeToBtn(btn) {
    document.querySelector('.main-nav__btn--selected').classList.remove('main-nav__btn--selected');
    btn.classList.add('main-nav__btn--selected');
}

for (const btn of tabBtns) {
    btn.addEventListener('click', () => {
        if (!btn.classList.contains('main-nav__btn--selected')) {
            changeToBtn(btn);
            const tabId = getActiveTabId(btn);
            changeToTab(tabId);
        }
    })
}