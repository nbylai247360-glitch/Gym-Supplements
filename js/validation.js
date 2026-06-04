// JavaScript form validation for the contact page
const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');

function showMessage(message, success = true) {
  if (!formFeedback) return;
  formFeedback.textContent = message;
  formFeedback.style.color = success ? 'var(--primary)' : '#ef4444';
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');

  if (!nameInput?.value.trim() || !emailInput?.value.trim() || !subjectInput?.value.trim() || !messageInput?.value.trim()) {
    showMessage('Please fill in all required fields.', false);
    return;
  }

  if (!validateEmail(emailInput.value.trim())) {
    showMessage('Please enter a valid email address.', false);
    return;
  }

  showMessage('Thank you! Your message has been submitted successfully.');
  contactForm.reset();
});

const trackForm = document.getElementById('track-form');
const trackFeedback = document.getElementById('track-feedback');
trackForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const orderId = document.getElementById('order-id');
  const trackingEmail = document.getElementById('tracking-email');

  if (!orderId?.value.trim() || !trackingEmail?.value.trim()) {
    if (trackFeedback) trackFeedback.textContent = 'Please enter your order ID and email.';
    return;
  }

  if (!validateEmail(trackingEmail.value.trim())) {
    if (trackFeedback) trackFeedback.textContent = 'Please enter a valid email address.';
    return;
  }

  if (trackFeedback) {
    trackFeedback.textContent = `Tracking updated for ${orderId.value.trim()}. Check your inbox for the latest details.`;
    trackFeedback.style.color = 'var(--primary)';
  }
  trackForm.reset();
});
