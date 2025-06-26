const tabBtns = document.getElementsByClassName('main-nav__btn');
const indicator = document.querySelector('.main-nav__indicator');
let isSwapping = false;

function changeToTab(id, btn) {
    if (isSwapping) return;
    isSwapping = true;

    const currentTab = document.querySelector('.tab--selected');
    const nextTab = document.getElementById(`tab-${id}`);
    const nextBtn = document.getElementById(`tab-${id}-btn`);
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
        currentTab.setAttribute('hidden', '');
    }, {once:true});

    nextTab.addEventListener('animationend', () => {
        nextTab.classList.remove('tab--enter');
        nextTab.classList.add('tab--selected');
        nextTab.removeAttribute('hidden');

        changeToBtn(nextBtn);
        isSwapping = false;
    }, {once: true});
}

function getActiveTabId(element) {
    return element.id.replace(/tab-(\d)-btn/, (_, p) => `${p}`);
}

function changeToBtn(nextBtn) {
    const currentBtn = document.querySelector('.main-nav__btn--selected');
    currentBtn.classList.remove('main-nav__btn--selected');
    currentBtn.setAttribute('aria-selected', 'false');
    currentBtn.setAttribute('tabindex', '-1');

    nextBtn.classList.add('main-nav__btn--selected');
    nextBtn.setAttribute('aria-selected', 'true');
    nextBtn.setAttribute('tabindex', '0');
}

function moveIndicator(btn){
  const btnRect = btn.getBoundingClientRect();
  const ulRect  = btn.parentElement.parentElement.getBoundingClientRect();
  indicator.style.width     = `${btnRect.width}px`;
  indicator.style.transform = `translateX(${btnRect.left - ulRect.left}px)`;
}
moveIndicator(document.querySelector('.main-nav__btn--selected'));

function updateIndicator() {
    moveIndicator(document.querySelector('.main-nav__btn--selected'));
}

window.addEventListener('resize', updateIndicator);

for (const btn of tabBtns) {
    btn.addEventListener('click', () => {
        if (!btn.classList.contains('main-nav__btn--selected')) {
            changeToTab(getActiveTabId(btn), btn);
            moveIndicator(btn);
        }
    })
}