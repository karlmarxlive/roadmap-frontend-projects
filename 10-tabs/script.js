const tabBtns = document.getElementsByClassName('main-nav__btn');
const indicator = document.querySelector('.main-nav__indicator');
const tabList = document.querySelector('[role="tablist"]');
let isSwapping = false;

const tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));

tabList.addEventListener('keydown', e => {
  const currentIndex = tabs.indexOf(document.activeElement);
  if (currentIndex === -1) return;                

  let targetIndex = currentIndex;

  switch (e.key) {
    case 'ArrowRight':
    case 'ArrowDown':
      targetIndex = (currentIndex + 1) % tabs.length;
      break;
    case 'ArrowLeft':
    case 'ArrowUp':
      targetIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      break;
    case 'Home':
      targetIndex = 0;
      break;
    case 'End':
      targetIndex = tabs.length - 1;
      break;
    case 'Enter':
    case ' ':
      e.preventDefault();
      document.activeElement.click();             
      return;
    default:
      return;                                     
  }

  e.preventDefault();                           
  tabs[targetIndex].focus();                      
});


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
    return element.dataset.tab;
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