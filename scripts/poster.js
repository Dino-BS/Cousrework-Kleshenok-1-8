// Загрузка XML
const container = document.getElementById('eventsContainer');
const filterButtons = document.querySelectorAll('.filter-btn');

async function loadEvents(filterValue = 'all') {
  try {
    const response = await fetch('../pages/poster.xml');
    const xmlText = await response.text();
    const xml = new DOMParser().parseFromString(xmlText, "text/xml");
    const events = xml.querySelectorAll('event');

    container.innerHTML = '';

    events.forEach(event => {
      const category = event.getAttribute('category');
      const id = event.getAttribute('id');

      if (filterValue === 'all' || filterValue === category) {
        const title = event.querySelector('title').textContent;
        const desc = event.querySelector('description').textContent;
        const date = event.querySelector('date').textContent;
        const price = event.querySelector('price').textContent;
        const img = event.querySelector('image').textContent;

        const cardHtml = `
  <div class="event-card" data-category="${category}">
    <div class="event-image">
      <img src="${img}" alt="${title}">
    </div>
    <div class="event-content">
      <div class="event-date">${date}</div>
      <h3>${title}</h3>
      <p>${desc}</p>
      <div class="event-price">${price}</div>
      <div class="card-buttons">
        <a href="event-detail.html?id=${id}" class="btn-event btn-details">О мероприятии</a>
        <a href="contact.html" class="btn-ticket">Записаться</a>
    </div>
  </div>
`;
        container.insertAdjacentHTML('beforeend', cardHtml);
      }
    });
  } catch (err) {
    console.error("Ошибка:", err);
  }
}

// Фильтры
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    loadEvents(btn.getAttribute('data-filter'));
  });
});

loadEvents();
