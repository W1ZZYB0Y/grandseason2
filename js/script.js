// Global config
const WA_NUMBER_PRIMARY = '2348130002452'; // main WhatsApp number (no plus)

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
      const message = `Hello Grand Seasons Hotel, I want to book: ${roomText}.`;
      const url = `https://wa.me/${WA_NUMBER_PRIMARY}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  });

  // Hero section “Book Now” button
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

  // === NEW RESERVATION SECTION LOGIC ===
  const newReservationForm = document.getElementById('reservationForm');
  if (newReservationForm) {
    newReservationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('guestName')?.value.trim();
      const room = document.getElementById('roomType')?.value;
      const checkin = document.getElementById('checkIn')?.value;
      const checkout = document.getElementById('checkOut')?.value;
      const adults = document.getElementById('adults')?.value || '1';
      const children = document.getElementById('children')?.value || '0';

      if (!name || !room || !checkin || !checkout) {
        alert('Please fill in all required fields.');
        return;
      }

      const message = `Hello Grand Seasons Hotel, my name is ${name}. I would like to book a ${room}. Check-in: ${checkin}, Check-out: ${checkout}. Adults: ${adults}, Children: ${children}.`;

      const url = `https://wa.me/${WA_NUMBER_PRIMARY}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

}); // end DOMContentLoaded

// === Simple slideshow ===
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