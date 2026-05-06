// Загрузка данных
const eventId = new URLSearchParams(window.location.search).get('id');

const response = await fetch('poster.xml');
const xmlText = await response.text();
const xml = new DOMParser().parseFromString(xmlText, "text/xml");
const event = xml.querySelector(`event[id="${eventId}"]`);

// Заполнение данных
document.title = `${event.querySelector('title').textContent} | AD ASTRA`;
document.getElementById('heroImage').src = event.querySelector('image').textContent;
document.getElementById('eventTitle').textContent = event.querySelector('title').textContent;
document.getElementById('eventShortDesc').textContent = event.querySelector('description').textContent;
document.getElementById('eventDate').textContent = event.querySelector('date').textContent;
document.getElementById('eventPrice').textContent = event.querySelector('price').textContent;

const categories = { 'lecture': 'Лекция', 'exhibition': 'Выставка', 'interactive': 'Интерактив' };
document.getElementById('eventCategory').textContent = categories[event.getAttribute('category')] || event.getAttribute('category');

let fullText = event.querySelector('full_text').textContent;

// Проверяем, есть ли вообще упоминание ведущего
if (fullText.includes('Ведущий:')) {

  let lines = fullText.split('\n');

  let speakerLine = lines[0];

  // Ищем, на какой позиции находится тире
  let dashIndex = speakerLine.indexOf('—');

  if (dashIndex !== -1) {
    // Вырезаем текст от начала до тире 
    let name = speakerLine.substring(0, dashIndex);

    // Вырезаем всё остальное, начиная от тире и до конца строки
    let description = speakerLine.substring(dashIndex);

    document.getElementById('speakerInfo').innerHTML = '<strong>' + name + '</strong>' + description;
  } else {
    // Если тире вдруг нет, просто выводим как есть
    document.getElementById('speakerInfo').innerHTML = speakerLine;
  }

  // Показываем блок с ведущим
  document.getElementById('speakerBlock').style.display = 'block';

  // Удаляем первую строку из массива строк
  lines.shift();

  // Оставшиеся строки склеиваем обратно в один текст
  document.getElementById('eventFullText').innerHTML = lines.join('<br><br>');

} else {
  // Если ведущего в тексте нет, просто заменяем все переносы строк
  document.getElementById('eventFullText').innerHTML = fullText.split('\n').join('<br><br>');
}
// Управление формой бронирования
const modal = document.getElementById('bookingModal');
const form = document.getElementById('bookingForm');

// Открыть
document.getElementById('bookButton').addEventListener('click', () => {
  modal.classList.add('active');
});

// Закрыть на крестик
document.getElementById('closeModal').addEventListener('click', () => {
  modal.classList.remove('active');
});

// Закрыть по клику на темный фон
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.remove('active');
});

// Отправка формы
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Останавливаем перезагрузку страницы
  modal.classList.remove('active');
  form.reset(); // Очищаем поля
  alert('Заявка отправлена!');
});
