// Animates elements into view as the user scrolls
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealElements.forEach((element) => revealObserver.observe(element));

window.addEventListener('load', () => {
  const productSection = document.querySelector('.products-grid-section');
  if (productSection) {
    productSection.classList.add('visible');
    revealObserver.unobserve(productSection);
  }
});

// Smooth sections if local anchors are clicked within the page
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const targetId = anchor.getAttribute('href');
    if (targetId && targetId !== '#') {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        event.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});
