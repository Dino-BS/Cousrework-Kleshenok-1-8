document.addEventListener('DOMContentLoaded', () => {
  
  // Поиск кнопки и меню по классам
  const burger = document.querySelector('.burger');
  const mobileMenu = document.getElementById('mobileMenu');

  // Добавляем или убираем классы открыт или закрыт
  function toggleMenu() {
    mobileMenu.classList.toggle('open');
    burger.classList.toggle('active');
  }

  // Вешаем событие клика на бургер
  burger.addEventListener('click', (e) => {
    // Останавливаем дальнейший клик
    e.stopPropagation(); 
    toggleMenu();
  });

  // Тык в любое место экрана ,кроме модуля
  document.addEventListener('click', (e) => {
    // Проверяем: если меню открыто и мы тыкнули не в него и не в бургер
    if (mobileMenu.classList.contains('open') && 
        !mobileMenu.contains(e.target) && 
        !burger.contains(e.target)) {
      
      // Закрываем все,если тык мимо
      mobileMenu.classList.remove('open');
      burger.classList.remove('active');
    }
  });

  // Форма обратной связи
  const contactForm = document.querySelector('.contact-form-new');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Останавливаем стандартную отправку
      
      // Собираем данные из формы
      const formData = {
        firstName: document.getElementById('f-name').value.trim(),
        lastName: document.getElementById('l-name').value.trim(),
        middleName: document.getElementById('m-name').value.trim(),
        email: document.getElementById('email').value.trim(),
        question: document.getElementById('question').value.trim()
      };

      // Валидация
      if (!formData.firstName || !formData.lastName || !formData.middleName) {
        alert('Пожалуйста, заполните все поля ФИО!');
        return;
      }

      if (!formData.email || !formData.email.includes('@')) {
        alert('Пожалуйста, введите корректный email!');
        return;
      }

      if (!formData.question || formData.question.length < 10) {
        alert('Пожалуйста, опишите ваш вопрос подробнее (минимум 10 символов)!');
        return;
      }

      console.log('Отправка данных:', formData);
      
      // Сообщение об отправке
      alert(`Спасибо, ${formData.firstName}!\n\nВаше сообщение отправлено.\nМы ответим на ${formData.email} в ближайшие 48 часов.`);
      
      // Очищаем форму 
      contactForm.reset();
    });

    // Кнопка стереть очищает форму
    const resetBtn = contactForm.querySelector('button[type="reset"]');
    if (resetBtn) {
      resetBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Вы уверены, что хотите очистить форму?')) {
          contactForm.reset();
        }
      });
    }
  }
});