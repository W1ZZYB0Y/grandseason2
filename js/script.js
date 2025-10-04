// Global config
const WA_NUMBER_PRIMARY = '2348130002452'; // main WhatsApp (no plus)

// Book buttons on cards (room quick book)
document.addEventListener('DOMContentLoaded', () => {

  // Quick book buttons on room cards
  document.querySelectorAll('.book-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const roomText = btn.getAttribute('data-room') || btn.textContent.trim();
      const checkin = prompt('Check-in date (YYYY-MM-DD)', '') || '';
      const checkout = prompt('Check-out date (YYYY-MM-DD)', '') || '';
      const adults = prompt('Number of adults', '2') || '2';
      const children = prompt('Number of children', '0') || '0';

      const message = `Hello Grand Seasons Hotel, I want to book: ${roomText}. Check-in: ${checkin}. Check-out: ${checkout}. Adults: ${adults}. Children: ${children}.`;
      const url = `https://wa.me/${WA_NUMBER_PRIMARY}?text=${encodeURIComponent(message)}`;
      window.location.href = url; // opens in same tab (safe from pop-up blocking)
    });
  });

  // Hero reservation button
  const heroBtn = document.getElementById('heroBookBtn');
  if (heroBtn) {
    heroBtn.addEventListener('click', () => {
      const checkin = document.getElementById('heroCheckin').value || 'TBD';
      const checkout = document.getElementById('heroCheckout').value || 'TBD';
      const adults = document.getElementById('heroAdults').value || 'TBD';
      const children = document.getElementById('heroChildren').value || 'TBD';
      const message = `Hello Grand Seasons Hotel, I would like to book a room. Check-in: ${checkin}. Check-out: ${checkout}. Adults: ${adults}. Children: ${children}.`;
      const url = `https://wa.me/${WA_NUMBER_PRIMARY}?text=${encodeURIComponent(message)}`;
      window.location.href = url;
    });
  }

  // Reservation form full page (Book via WhatsApp)
  const resBtn = document.getElementById('resBookBtn');
  if (resBtn) {
    resBtn.addEventListener('click', (e) => {
      e.preventDefault(); // prevent form reload if inside <form>

      const room = document.getElementById('resRoom').value;
      const name = document.getElementById('resName').value || 'Guest';
      const checkin = document.getElementById('resCheckin').value || 'TBD';
      const checkout = document.getElementById('resCheckout').value || 'TBD';
      const adults = document.getElementById('resAdults').value || 'TBD';
      const children = document.getElementById('resChildren').value || 'TBD';

      const message = `Hello Grand Seasons Hotel, my name is ${name}. I would like to book: ${room}. Check-in: ${checkin}. Check-out: ${checkout}. Adults: ${adults}. Children: ${children}.`;

      // Instead of window.open, set href dynamically
      resBtn.setAttribute(
        'href',
        `https://wa.me/${WA_NUMBER_PRIMARY}?text=${encodeURIComponent(message)}`
      );

      // Open it in a new tab safely
      window.open(resBtn.href, '_blank', 'noopener,noreferrer');
    });
  }
});

// Simple slideshow logic
let slideIndex = 0;
showSlides();

function showSlides() {
  const slides = document.getElementsByClassName('mySlides');
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;
  slides[slideIndex - 1].style.display = 'block';
  setTimeout(showSlides, 3000); // Change image every 3 seconds
                         }
