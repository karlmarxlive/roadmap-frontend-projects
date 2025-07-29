document.addEventListener('DOMContentLoaded', () => {
    const faqContainer = document.querySelector('.faq');
    let activeItem = null;

    const closeItem = (item) => {
        const wrapper = item.querySelector('.faq__answer-wrapper');
        const button = item.querySelector('.faq__question');
        
        item.classList.remove('faq__item--active');
        button.setAttribute('aria-expanded', 'false');
        wrapper.style.maxHeight = '0';
        wrapper.style.opacity = '0';
    };

    const openItem = (item) => {
        const wrapper = item.querySelector('.faq__answer-wrapper');
        const button = item.querySelector('.faq__question');
        const content = item.querySelector('.faq__answer');
        
        // Force reflow to ensure animation works
        wrapper.style.maxHeight = '0';
        void wrapper.offsetHeight;
        
        const contentHeight = content.scrollHeight;
        item.classList.add('faq__item--active');
        button.setAttribute('aria-expanded', 'true');
        wrapper.style.maxHeight = `${contentHeight}px`;
        wrapper.style.opacity = '1';
    };

    faqContainer.addEventListener('click', (event) => {
        const questionButton = event.target.closest('.faq__question');
        if (!questionButton) return;

        const clickedItem = questionButton.closest('.faq__item');
        
        // If there's an active item and it's not the one being clicked, close it
        if (activeItem && activeItem !== clickedItem) {
            closeItem(activeItem);
        }
        
        // Toggle the clicked item
        if (activeItem === clickedItem) {
            closeItem(clickedItem);
            activeItem = null;
        } else {
            openItem(clickedItem);
            activeItem = clickedItem;
        }
    });
});