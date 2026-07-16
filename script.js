/* ============ LOADER ============ */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 800);
});

/* ============ LENIS SMOOTH SCROLL ============ */
const lenis = new Lenis({
  duration: 1.05,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 0.9,
  anchors: true,
});

// Use one animation loop so Lenis and ScrollTrigger stay perfectly synchronized.
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

/* ============ CUSTOM CURSOR ============ */
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
let mouseX = 0, mouseY = 0;
let outlineX = 0, outlineY = 0;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

function animateOutline() {
  outlineX += (mouseX - outlineX) * 0.15;
  outlineY += (mouseY - outlineY) * 0.15;
  cursorOutline.style.left = outlineX + 'px';
  cursorOutline.style.top = outlineY + 'px';
  requestAnimationFrame(animateOutline);
}
animateOutline();

// Hover effect on interactive elements
const hoverElements = document.querySelectorAll('a, button, .skill-tag, .project-card, .certificate-card, .achievement-card, input, textarea');
hoverElements.forEach(el => {
  el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
});

/* ============ NAVBAR ============ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// Active link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 150;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});

/* ============ MOBILE MENU ============ */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

/* ============ THEME TOGGLE ============ */
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

const sunIcon = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
const moonIcon = '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>';

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  themeIcon.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
  localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  setTheme(current === 'light' ? 'dark' : 'light');
});

/* ============ TYPING ANIMATION ============ */
const typingText = document.getElementById('typingText');
const phrases = ['Python Developer', 'Data Analyst', 'Machine Learning Enthusiast', 'Data Science Student', 'Problem Solver'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typingText.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === current.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typeSpeed = 500;
  }

  setTimeout(type, typeSpeed);
}
type();

/* ============ REVEAL ON SCROLL ============ */
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
revealElements.forEach(el => revealObserver.observe(el));

/* ============ COUNTER ANIMATION ============ */
const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-count'));
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          el.textContent = target + '+';
          clearInterval(interval);
        } else {
          el.textContent = current;
        }
      }, 40);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

/* ============ SWIPER CERTIFICATES ============ */
new Swiper('.certificatesSwiper', {
  slidesPerView: 1,
  spaceBetween: 24,
  loop: true,
  autoplay: { delay: 3500, disableOnInteraction: false },
  pagination: { el: '.swiper-pagination', clickable: true },
  breakpoints: {
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 }
  }
});

/* ============ HERO IMAGE PARALLAX ============ */
const heroImage = document.getElementById('heroImage');
document.addEventListener('mousemove', (e) => {
  if (window.innerWidth < 900) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  heroImage.style.transform = `translate(${x}px, ${y}px)`;
});

/* ============ BACK TO TOP ============ */
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) backToTop.classList.add('visible');
  else backToTop.classList.remove('visible');
});
backToTop.addEventListener('click', () => {
  lenis.scrollTo(0, { duration: 1.5 });
});

/* ============ DOWNLOAD RESUME ============ */
document.getElementById('downloadResume').addEventListener('click', (e) => {
  e.preventDefault();
  showToast('Resume download will start shortly...', 'success');
  // In production, link to actual resume PDF
  // window.location.href = 'resume.pdf';
});

/* ============ TOAST ============ */
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = 'toast show ' + type;
  setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ============ CONTACT FORM ============ */
const contactForm = document.getElementById('contactForm');
const emailJsConfig = {
  publicKey: 'mGYmYqLVQ1OFakfIO',
  serviceId: 'service_9uq74ic',
  templateId: 'template_zjts8bm',
};

emailjs.init({ publicKey: emailJsConfig.publicKey });

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const original = btn.innerHTML;
  btn.innerHTML = '<span>Sending...</span>';
  btn.disabled = true;

  try {
    await emailjs.sendForm(emailJsConfig.serviceId, emailJsConfig.templateId, contactForm);
    showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
    contactForm.reset();
  } catch (error) {
    console.error('EmailJS error:', error);
    showToast('Message could not be sent. Please try again later.', 'error');
  } finally {
    btn.innerHTML = original;
    btn.disabled = false;
  }
});

/* ============ MAGNETIC BUTTONS ============ */
document.querySelectorAll('.btn, .theme-toggle, .social-sidebar a').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 768) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

/* ============ GSAP HERO ANIMATION ============ */
gsap.from('.hero-greeting', { opacity: 0, y: 30, duration: 1, delay: 0.8 });
gsap.from('.hero-name', { opacity: 0, y: 50, duration: 1, delay: 1 });
gsap.from('.hero-title', { opacity: 0, y: 30, duration: 1, delay: 1.2 });
gsap.from('.typing-wrapper', { opacity: 0, y: 30, duration: 1, delay: 1.4 });
gsap.from('.hero-description', { opacity: 0, y: 30, duration: 1, delay: 1.6 });
gsap.from('.hero-buttons', { opacity: 0, y: 30, duration: 1, delay: 1.8 });
gsap.from('.hero-image-container', { opacity: 0, scale: 0.8, duration: 1.2, delay: 1, ease: 'back.out(1.7)' });
gsap.from('.floating-badge', { opacity: 0, scale: 0, duration: 0.8, delay: 1.8, stagger: 0.15, ease: 'back.out(1.7)' });
