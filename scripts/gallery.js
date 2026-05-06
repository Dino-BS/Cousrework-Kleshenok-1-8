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