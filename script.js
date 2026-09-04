const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');


// =========================
// HEADER + SCROLL
// =========================

window.addEventListener('scroll', () => {

  header.classList.toggle(
    'scrolled',
    window.scrollY > 24
  );


  const scrollHeight =
    document.documentElement.scrollHeight -
    window.innerHeight;


  const scrollPercent =
    scrollHeight > 0
      ? (window.scrollY / scrollHeight) * 100
      : 0;


  document.documentElement.style.setProperty(
    '--scroll-percent',
    `${scrollPercent}%`
  );

});


// =========================
// MENÚ MOBILE
// =========================

menuToggle.addEventListener('click', () => {

  const open =
    navLinks.classList.toggle('open');


  menuToggle.setAttribute(
    'aria-expanded',
    open ? 'true' : 'false'
  );

});


// Cerrar menú al seleccionar una sección

document.querySelectorAll('.nav-links a').forEach(link => {

  link.addEventListener('click', () => {

    navLinks.classList.remove('open');

    menuToggle.setAttribute(
      'aria-expanded',
      'false'
    );

  });

});


// =========================
// ANIMACIONES REVEAL
// =========================

const observer = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add('visible');


        if (
          entry.target.classList.contains(
            'reveal-delay-1'
          )
        ) {

          entry.target.classList.add(
            'reveal-delay-1-active'
          );

        }


        if (
          entry.target.classList.contains(
            'reveal-delay-2'
          )
        ) {

          entry.target.classList.add(
            'reveal-delay-2-active'
          );

        }

      }

    });

  },
  {
    threshold: 0.12
  }
);


document
  .querySelectorAll('.reveal')
  .forEach(el => observer.observe(el));


// =========================
// ANIMACIONES DE TARJETAS
// =========================

const animatedObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            'animate-in'
          );

        }

      });

    },
    {
      threshold: 0.08
    }
  );


document
  .querySelectorAll(
    '.service-card, .trust-item, .contact-card'
  )
  .forEach(el =>
    animatedObserver.observe(el)
  );


// =========================
// FAQ ACCORDION
// =========================

document
  .querySelectorAll('.faq-item button')
  .forEach(button => {

    button.addEventListener('click', () => {

      const item =
        button.closest('.faq-item');


      document
        .querySelectorAll('.faq-item')
        .forEach(other => {

          if (other !== item) {

            other.classList.remove(
              'active'
            );

          }

        });


      item.classList.toggle('active');

    });

  });


// =========================
// NAV ACTIVE
// =========================

const sections = [
  ...document.querySelectorAll(
    'main section[id]'
  )
];


const navAnchors = [
  ...document.querySelectorAll(
    '.nav-links a[href^="#"]'
  )
];


window.addEventListener('scroll', () => {

  let current = '';


  sections.forEach(section => {

    if (
      window.scrollY >=
      section.offsetTop - 180
    ) {

      current = section.id;

    }

  });


  navAnchors.forEach(a => {

    a.classList.toggle(
      'active',
      a.getAttribute('href') === `#${current}`
    );

  });

});


// =========================
// EFECTO ORB DEL HERO
// =========================

window.addEventListener(
  'DOMContentLoaded',
  () => {

    const orbOne =
      document.querySelector('.orb-one');

    const orbTwo =
      document.querySelector('.orb-two');

    const hero =
      document.querySelector('.hero');


    if (
      orbOne &&
      orbTwo &&
      hero
    ) {

      hero.addEventListener(
        'mousemove',
        e => {

          const rect =
            hero.getBoundingClientRect();


          const x =
            (
              (e.clientX - rect.left) /
              rect.width -
              0.5
            ) * 40;


          const y =
            (
              (e.clientY - rect.top) /
              rect.height -
              0.5
            ) * 40;


          orbOne.style.transform =
            `translate(${x}px, ${y}px)`;


          orbTwo.style.transform =
            `translate(${-x * 0.8}px, ${-y * 0.8}px)`;

        }
      );


      hero.addEventListener(
        'mouseleave',
        () => {

          orbOne.style.transform =
            'translate(0, 0)';


          orbTwo.style.transform =
            'translate(0, 0)';

        }
      );

    }

  }
);