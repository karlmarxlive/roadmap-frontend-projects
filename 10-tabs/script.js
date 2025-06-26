const tabBtns = document.getElementsByClassName('main-nav__btn');
const indicator = document.querySelector('.nav-indicator');
let isSwapping = false;

function changeToTab(tabId, btn) {
    if (isSwapping) return;
    isSwapping = true;

    const currentTab = document.querySelector('.tab--selected');
    const nextTab = document.getElementById(`tab-${tabId}`);
    if (currentTab === nextTab) {
        isSwapping = false;
        return;
    }

    nextTab.style.display = 'flex';
    nextTab.classList.add('tab--enter');

    currentTab.classList.add('tab--leave');

    currentTab.addEventListener('animationend', () => {
        currentTab.classList.remove('tab--leave', 'tab--selected');
        currentTab.style.display = 'none';
    }, {once:true});

    nextTab.addEventListener('animationend', () => {
        nextTab.classList.remove('tab--enter');
        nextTab.classList.add('tab--selected');
        changeToBtn(btn);
        isSwapping = false;
    }, {once: true});
}

function getActiveTabId(element) {
    return element.id.replace(/tab-(\d)-btn/, (_, p) => `${p}`);
}

function changeToBtn(btn) {
    document.querySelector('.main-nav__btn--selected')
            .classList.remove('main-nav__btn--selected');
    btn.classList.add('main-nav__btn--selected');
}

function moveIndicator(btn){
  const btnRect = btn.getBoundingClientRect();
  const ulRect  = btn.parentElement.parentElement.getBoundingClientRect();
  indicator.style.width     = `${btnRect.width}px`;
  indicator.style.transform = `translateX(${btnRect.left - ulRect.left}px)`;
}
moveIndicator(document.querySelector('.main-nav__btn--selected'));

for (const btn of tabBtns) {
    btn.addEventListener('click', () => {
        if (!btn.classList.contains('main-nav__btn--selected')) {
            changeToTab(getActiveTabId(btn), btn);
            moveIndicator(btn);
        }
    })
}