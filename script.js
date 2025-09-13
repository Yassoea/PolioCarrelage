/* script.js
   - slider autoplay + pager interaction
   - mobile nav toggle
   - smooth scroll for navbar
*/

document.addEventListener('DOMContentLoaded', () => {
  // year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // ---------- NAV BURGER ----------
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');

  burger.addEventListener('click', () => {
    const expanded = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('show');
    burger.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  navLinks.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
        burger.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // ---------- SLIDER ----------
  const slides = Array.from(document.querySelectorAll('.slide'));
  const leftDots = Array.from(document.querySelectorAll('.pager-dot'));
  const bottomDots = Array.from(document.querySelectorAll('.bottom-dot'));

  let current = 0;
  let autoplayInterval = null;
  const AUTOPLAY_MS = 4500;

  function setActiveSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    leftDots.forEach(d => d.classList.remove('active'));
    bottomDots.forEach(d => d.classList.remove('active'));

    slides[index].classList.add('active');
    leftDots[index].classList.add('active');
    bottomDots[index].classList.add('active');
    current = index;
  }

  // clicking left vertical dots
  leftDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      setActiveSlide(idx);
      resetAutoplay();
    });
  });

  // clicking bottom dots
  bottomDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      setActiveSlide(idx);
      resetAutoplay();
    });
  });

  // autoplay
  function nextSlide() {
    const next = (current + 1) % slides.length;
    setActiveSlide(next);
  }

  function startAutoplay(){
    stopAutoplay();
    autoplayInterval = setInterval(nextSlide, AUTOPLAY_MS);
  }
  function stopAutoplay(){
    if (autoplayInterval) { clearInterval(autoplayInterval); autoplayInterval = null; }
  }
  function resetAutoplay(){
    startAutoplay();
  }

  // initialize
  setActiveSlide(0);
  startAutoplay();

  // pause on hover (desktop)
  const sliderWrap = document.querySelector('.hero-slider');
  sliderWrap.addEventListener('mouseenter', stopAutoplay);
  sliderWrap.addEventListener('mouseleave', startAutoplay);

  // keyboard navigation left/right
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      setActiveSlide((current - 1 + slides.length) % slides.length);
      resetAutoplay();
    } else if (e.key === 'ArrowRight') {
      setActiveSlide((current + 1) % slides.length);
      resetAutoplay();
    }
  });

  // ---------- SMOOTH SCROLL ----------
  const navAnchors = document.querySelectorAll('a[href^="#"]');
  navAnchors.forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
