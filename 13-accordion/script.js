document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.faq__item');

    items.forEach(item => {
        const questionButton = item.querySelector('.faq__question');
        const answerWrapper = item.querySelector('.faq__answer-wrapper');
        const answerContent = item.querySelector('.faq__answer');
        
        const contentHeight = answerContent.scrollHeight;
        item.dataset.height = contentHeight;

        questionButton.addEventListener('click', () => {
            const isActive = item.classList.contains('faq__item--active');
            const isAnyActive = document.querySelector('.faq__item--active');
            
            // Close all items
            if (isAnyActive) {
                const activeItem = document.querySelector('.faq__item--active');
                const activeWrapper = activeItem.querySelector('.faq__answer-wrapper');
                
                activeWrapper.style.maxHeight = '0';
                activeWrapper.style.opacity = '0';
                activeItem.classList.remove('faq__item--active');
                activeItem.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
            }
            
            // Toggle clicked item
            if (!isActive) {
                // Force reflow to ensure animation works
                answerWrapper.style.maxHeight = '0';
                void answerWrapper.offsetHeight;
                
                // Open the clicked item
                answerWrapper.style.maxHeight = `${contentHeight}px`;
                answerWrapper.style.opacity = '1';
                item.classList.add('faq__item--active');
                questionButton.setAttribute('aria-expanded', 'true');
            }
        });
    });
});