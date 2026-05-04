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
});
