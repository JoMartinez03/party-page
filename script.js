const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  if (header) header.classList.toggle('scrolled', window.scrollY > 24);
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
  document.documentElement.style.setProperty('--scroll-percent', `${scrollPercent}%`);
});

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const animatedObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('animate-in'); });
}, { threshold: .08 });
document.querySelectorAll('.service-card,.trust-item,.contact-card').forEach(el => animatedObserver.observe(el));

const faqCarousel = document.querySelector('.faq-carousel');
if (faqCarousel) {
  const track = faqCarousel.querySelector('.faq-track');
  const slides = [...faqCarousel.querySelectorAll('.faq-slide')];
  const prev = faqCarousel.querySelector('.faq-prev');
  const next = faqCarousel.querySelector('.faq-next');
  const current = faqCarousel.querySelector('.faq-current');
  const dotsWrap = faqCarousel.querySelector('.faq-dots');
  let faqIndex = 0;
  let touchStartX = 0;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'faq-dot';
    dot.setAttribute('aria-label', `Ir a la pregunta ${i + 1}`);
    dot.addEventListener('click', () => { faqIndex = i; updateFaq(); });
    dotsWrap.appendChild(dot);
  });

  const dots = [...dotsWrap.querySelectorAll('.faq-dot')];
  function updateFaq() {
    track.style.transform = `translateX(-${faqIndex * 100}%)`;
    current.textContent = faqIndex + 1;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === faqIndex));
  }
  function moveFaq(step) {
    faqIndex = (faqIndex + step + slides.length) % slides.length;
    updateFaq();
  }
  prev.addEventListener('click', () => moveFaq(-1));
  next.addEventListener('click', () => moveFaq(1));
  track.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 45) moveFaq(delta < 0 ? 1 : -1);
  }, { passive: true });
  updateFaq();
}

const sections=[...document.querySelectorAll('main section[id]')];
const navAnchors=[...document.querySelectorAll('.nav-links a[href^="#"]')];
window.addEventListener('scroll',()=>{
  let current='';
  sections.forEach(section=>{ if(window.scrollY>=section.offsetTop-180) current=section.id; });
  navAnchors.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${current}`));
});

window.addEventListener('DOMContentLoaded',()=>{
  const orbOne=document.querySelector('.orb-one'), orbTwo=document.querySelector('.orb-two'), hero=document.querySelector('.hero');
  if(orbOne&&orbTwo&&hero){
    hero.addEventListener('mousemove',e=>{const rect=hero.getBoundingClientRect();const x=((e.clientX-rect.left)/rect.width-.5)*40;const y=((e.clientY-rect.top)/rect.height-.5)*40;orbOne.style.transform=`translate(${x}px, ${y}px)`;orbTwo.style.transform=`translate(${-x*.8}px, ${-y*.8}px)`;});
    hero.addEventListener('mouseleave',()=>{orbOne.style.transform='translate(0, 0)';orbTwo.style.transform='translate(0, 0)';});
  }
});
