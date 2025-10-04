// Global config
const WA_NUMBER_PRIMARY = '2348130002452'; // main WhatsApp (no plus)

// Helper function
function openWhatsApp(number, message) {
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

// DOM ready
document.addEventListener('DOMContentLoaded', () => {

  // Prevent accidental form submission by Enter key
  const reservationForm = document.getElementById('reservationForm');
  if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => e.preventDefault());
  }

  // Quick book buttons on cards (skip anchors)
  document.querySelectorAll('.book-btn').forEach(btn => {
    if (btn.tagName.toLowerCase() === 'a') return;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const roomText = btn.getAttribute('data-room') || btn.textContent.trim();
      const message = `Hello Grand Seasons Hotel, I want to book: ${roomText}.`;
      openWhatsApp(WA_NUMBER_PRIMARY, message);
    });
  });

  // Hero reservation button (if present)
  const heroBtn = document.getElementById('heroBookBtn');
  if (heroBtn) {
    heroBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const checkin = document.getElementById('heroCheckin')?.value || 'TBD';
      const checkout = document.getElementById('heroCheckout')?.value || 'TBD';
      const adults = document.getElementById('heroAdults')?.value || 'TBD';
      const children = document.getElementById('heroChildren')?.value || 'TBD';
      const message = `Hello Grand Seasons Hotel, I would like to book a room. Check-in: ${checkin}. Check-out: ${checkout}. Adults: ${adults}. Children: ${children}.`;
      openWhatsApp(WA_NUMBER_PRIMARY, message);
    });
  }

  // Reservation form button
  const resBtn = document.getElementById('resBookBtn');
  if (resBtn) {
    resBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const room = document.getElementById('resRoom')?.value || 'TBD';
      const nameEl = document.getElementById('resName');
      const checkinEl = document.getElementById('resCheckin');
      const checkoutEl = document.getElementById('resCheckout');
      const adultsEl = document.getElementById('resAdults');
      const childrenEl = document.getElementById('resChildren');

      const name = nameEl?.value?.trim();
      const checkin = checkinEl?.value;
      const checkout = checkoutEl?.value || 'TBD';
      const adults = adultsEl?.value || 'TBD';
      const children = childrenEl?.value || 'TBD';

      // Basic validation
      if (!name) {
        alert('Please enter your full name.');
        nameEl?.focus();
        return;
      }
      if (!checkin) {
        alert('Please select a check-in date.');
        checkinEl?.focus();
        return;
      }

      const message = `Hello Grand Seasons Hotel, my name is ${name}. I would like to book: ${room}. Check-in: ${checkin}. Check-out: ${checkout}. Adults: ${adults}. Children: ${children}.`;
      openWhatsApp(WA_NUMBER_PRIMARY, message);
    });
  }

}); // end DOMContentLoaded

// Simple slideshow
let slideIndex = 0;
function showSlides() {
  const slides = document.getElementsByClassName('mySlides');
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;
  if (slides[slideIndex - 1]) slides[slideIndex - 1].style.display = 'block';
  setTimeout(showSlides, 3000);
}
showSlides();
