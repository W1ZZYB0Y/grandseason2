// === Global Config ===
const WA_NUMBER_PRIMARY = '2348130002452'; // main WhatsApp number (no plus)

// === Helper Functions ===
function isMobileDevice() {
  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent);
}

function openWhatsApp(number, message) {
  const encodedMsg = encodeURIComponent(message);
  let url = '';

  // Use native app if mobile, web if desktop
  if (isMobileDevice()) {
    url = `whatsapp://send?phone=${number}&text=${encodedMsg}`;
  } else {
    url = `https://web.whatsapp.com/send?phone=${number}&text=${encodedMsg}`;
  }

  // Open in new tab or app
  window.open(url, '_blank', 'noopener,noreferrer');
}

// === DOM Ready ===
document.addEventListener('DOMContentLoaded', () => {
  // Prevent accidental form submission by Enter key
  const reservationForm = document.getElementById('reservationForm');
  if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => e.preventDefault());
  }

  // Quick book buttons on room cards
  document.querySelectorAll('.book-btn').forEach(btn => {
    if (btn.tagName.toLowerCase() === 'a') return;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const roomText = btn.getAttribute('data-room') || btn.textContent.trim();
      const message = `Hello Grand Seasons Hotel, I want to book: ${roomText}.`;
      openWhatsApp(WA_NUMBER_PRIMARY, message);
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
      openWhatsApp(WA_NUMBER_PRIMARY, message);
    });
  }

  // === NEW Reservation Section ===
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

      // Show temporary toast (mobile-friendly feedback)
      showToast('Opening WhatsApp...');
      openWhatsApp(WA_NUMBER_PRIMARY, message);
    });
  }
});

// === Simple Toast Notification ===
function showToast(message) {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.position = 'fixed';
  toast.style.bottom = '20px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.background = '#28a745';
  toast.style.color = '#fff';
  toast.style.padding = '10px 18px';
  toast.style.borderRadius = '20px';
  toast.style.fontSize = '14px';
  toast.style.boxShadow = '0 3px 10px rgba(0,0,0,0.2)';
  toast.style.zIndex = '9999';
  toast.style.transition = 'opacity 0.4s ease';
  document.body.appendChild(toast);

  setTimeout(() => { toast.style.opacity = '0'; }, 2000);
  setTimeout(() => { toast.remove(); }, 2500);
}

// === Slideshow ===
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