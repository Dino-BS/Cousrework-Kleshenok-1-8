const galleryTriggers = document.querySelectorAll('.card-btn, .g-card-image');

galleryTriggers.forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    e.preventDefault();

    // Получаем ID 
    const modalId = trigger.getAttribute('href') || trigger.closest('.g-card').querySelector('a').getAttribute('href');
    const targetModal = document.querySelector(modalId);

    if (targetModal) {
      targetModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Запрещаем скролл фона
    }
  });
});

const closeButtons = document.querySelectorAll('.modal-close');
const modals = document.querySelectorAll('.modal');

closeButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const modal = btn.closest('.modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Закрытие по клику на фон
modals.forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});
