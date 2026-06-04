// Main interactive behavior for navigation, theme, scroll, and page features
const navToggle = document.getElementById('nav-toggle');
const siteNav = document.getElementById('site-nav');
const themeToggle = document.querySelectorAll('#theme-toggle');
const scrollTopButton = document.getElementById('scroll-top');
const pageLoader = document.getElementById('page-loader');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevButton = document.getElementById('prev-testimonial');
const nextButton = document.getElementById('next-testimonial');
const filterButtons = document.querySelectorAll('.filter-button');
const portfolioCards = document.querySelectorAll('.portfolio-card, .product-card');
const faqItems = document.querySelectorAll('.faq-item');
let testimonialIndex = 0;

// Toggle mobile navigation menu
navToggle?.addEventListener('click', () => {
  siteNav?.classList.toggle('open');
});

// Activate nav link based on current body page attribute
function highlightActiveLink() {
  const page = document.body.dataset.page;
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href').includes(`${page}.html`) || (page === 'home' && link.getAttribute('href') === 'index.html'));
  });
}

// Sticky scroll-to-top button visibility
function handleScroll() {
  const threshold = window.innerHeight / 2;
  scrollTopButton?.classList.toggle('visible', window.scrollY > threshold);
}

scrollTopButton?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', handleScroll);

// Theme toggling and local storage persistence
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('fitfuel-theme', theme);
  themeToggle.forEach((button) => {
    button.textContent = theme === 'dark' ? 'Light' : 'Dark';
  });
}

function loadTheme() {
  const savedTheme = localStorage.getItem('fitfuel-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
}

themeToggle.forEach((button) => {
  button.addEventListener('click', () => {
    const current = document.documentElement.dataset.theme;
    setTheme(current === 'dark' ? 'light' : 'dark');
  });
});

// Testimonial carousel functions
function showTestimonial(index) {
  testimonialCards.forEach((card, idx) => {
    card.classList.toggle('active', idx === index);
  });
}

prevButton?.addEventListener('click', () => {
  testimonialIndex = (testimonialIndex - 1 + testimonialCards.length) % testimonialCards.length;
  showTestimonial(testimonialIndex);
});

nextButton?.addEventListener('click', () => {
  testimonialIndex = (testimonialIndex + 1) % testimonialCards.length;
  showTestimonial(testimonialIndex);
});

// Portfolio filtering
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;

    portfolioCards.forEach((card) => {
      const category = card.dataset.category;
      card.style.display = filter === 'all' || category === filter ? 'grid' : 'none';
    });
  });
});

const addBundleButtons = document.querySelectorAll('.add-bundle');
const bundleSummary = document.getElementById('bundle-summary');
const bundleCountValue = document.getElementById('bundle-count');
const bundleTotalValue = document.getElementById('bundle-total');
const bundleItems = [];

function updateBundleSummary() {
  if (!bundleSummary || !bundleCountValue || !bundleTotalValue) return;
  const count = bundleItems.length;
  const total = bundleItems.reduce((sum, item) => sum + item.price, 0);
  bundleCountValue.textContent = count;
  bundleTotalValue.textContent = `$${total.toFixed(2)}`;
  bundleSummary.hidden = count === 0;
}

function launchConfetti(targetButton) {
  const rootStyles = getComputedStyle(document.documentElement);
  const colors = [
    rootStyles.getPropertyValue('--accent').trim(),
    rootStyles.getPropertyValue('--secondary').trim(),
    rootStyles.getPropertyValue('--primary').trim(),
  ];
  const rect = targetButton.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < 10; i += 1) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.backgroundColor = colors[i % colors.length] || '#ff6f55';

    const angle = Math.random() * Math.PI * 2;
    const distance = 40 + Math.random() * 40;
    const tx = `${Math.cos(angle) * distance}px`;
    const ty = `${Math.sin(angle) * distance - 20}px`;
    const r = `${Math.random() * 360}deg`;

    piece.style.setProperty('--tx', tx);
    piece.style.setProperty('--ty', ty);
    piece.style.setProperty('--r', r);
    piece.style.left = `${centerX}px`;
    piece.style.top = `${centerY}px`;

    document.body.appendChild(piece);
    piece.addEventListener('animationend', () => piece.remove());
  }
}

addBundleButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    const name = button.dataset.name;
    const price = Number(button.dataset.price);
    if (!name || Number.isNaN(price)) return;

    bundleItems.push({ name, price });
    updateBundleSummary();
    button.textContent = '✓ Added';
    button.disabled = true;
    button.classList.add('button-success');
    launchConfetti(button);
  });
});

// FAQ accordion
faqItems.forEach((item) => {
  const question = item.querySelector('.faq-question');
  question?.addEventListener('click', () => {
    const isExpanded = item.classList.toggle('active');
    question.setAttribute('aria-expanded', isExpanded.toString());
  });
});

// Animated counters for the homepage
function runCounters() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach((counter) => {
    const updateValue = () => {
      const target = +counter.dataset.target;
      const current = +counter.textContent;
      const increment = Math.ceil(target / 160);
      if (current < target) {
        counter.textContent = `${Math.min(current + increment, target)}`;
        requestAnimationFrame(updateValue);
      }
    };
    updateValue();
  });
}

// Remove loader after page has loaded and initialize features
window.addEventListener('load', () => {
  pageLoader?.classList.add('loaded');
  setTimeout(() => pageLoader?.remove(), 600);
  loadTheme();
  highlightActiveLink();
  handleScroll();
  runCounters();
  showTestimonial(testimonialIndex);
});

// Close mobile menu when clicking outside on small screens
window.addEventListener('click', (event) => {
  if (!siteNav?.contains(event.target) && !navToggle?.contains(event.target)) {
    siteNav?.classList.remove('open');
  }
});
