// Global config
const WA_NUMBER_PRIMARY = '2348130002452'; // main WhatsApp (no plus)

// DOM ready
document.addEventListener('DOMContentLoaded', () => {

  // Prevent accidental form submission by Enter key
  const reservationForm = document.getElementById('reservationForm');
  if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => e.preventDefault());
  }

  // Quick book buttons on cards (only for non-anchors)
  document.querySelectorAll('.book-btn').forEach(btn => {
    // if it's an <a> (we converted room preview buttons to anchors) do nothing
    if (btn.tagName.toLowerCase() === 'a') return;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const roomText = btn.getAttribute('data-room') || btn.textContent.trim();
      // NOTE: Avoid using prompt() here to prevent pop-up blocking in some browsers.
      // Keep quick card booking simple — open WhatsApp with a short prefilled message.
      const message = `Hello Grand Seasons Hotel, I want to book: ${roomText}.`;
      const url = `https://wa.me/${WA_NUMBER_PRIMARY}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
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
      const url = `https://wa.me/${WA_NUMBER_PRIMARY}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  // Reservation form anchor/button (recommended anchor in HTML)
  const resBtn = document.getElementById('resBookBtn');
  if (resBtn) {
    resBtn.addEventListener('click', (e) => {
      e.preventDefault(); // we'll handle opening

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

      // basic validation
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
      const url = `https://wa.me/${WA_NUMBER_PRIMARY}?text=${encodeURIComponent(message)}`;

      // set href for progressive enhancement & open in new tab
      resBtn.setAttribute('href', url);
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

}); // end DOMContentLoaded

// WhatsApp Booking Logic
const WA_NUMBER_PRIMARY = '2348130002452'; // main WhatsApp number (no plus)

function openWhatsApp(number, message) {
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

document.addEventListener('DOMContentLoaded', () => {
  const resBtn = document.getElementById('resBookBtn');
  if (resBtn) {
    resBtn.addEventListener('click', (e) => {
      e.preventDefault(); // stops form/page refresh

      const room = document.getElementById('resRoom').value;
      const name = document.getElementById('resName').value || 'Guest';
      const checkin = document.getElementById('resCheckin').value || 'TBD';
      const checkout = document.getElementById('resCheckout').value || 'TBD';
      const adults = document.getElementById('resAdults').value || 'TBD';
      const children = document.getElementById('resChildren').value || 'TBD';

      const message = `Hello Grand Seasons Hotel, my name is ${name}. I would like to book: ${room}. Check-in: ${checkin}. Check-out: ${checkout}. Adults: ${adults}. Children: ${children}.`;
      openWhatsApp(WA_NUMBER_PRIMARY, message);
    });
  }
});

// Simple slideshow (unchanged)
let slideIndex = 0;
showSlides();
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
