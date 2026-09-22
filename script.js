const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  if (header) header.classList.toggle('scrolled', window.scrollY > 24);

  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = scrollHeight > 0
    ? (window.scrollY / scrollHeight) * 100
    : 0;

  document.documentElement.style.setProperty(
    '--scroll-percent',
    `${scrollPercent}%`
  );
});

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');

    menuToggle.setAttribute(
      'aria-expanded',
      open ? 'true' : 'false'
    );
  });

  document.querySelectorAll('.nav-links a').forEach(link =>
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    })
  );
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: .12
});

document.querySelectorAll('.reveal').forEach(el => {
  observer.observe(el);
});

const animatedObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, {
  threshold: .08
});

document
  .querySelectorAll('.service-card,.trust-item,.contact-card')
  .forEach(el => animatedObserver.observe(el));


// =========================
// FAQ
// =========================

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

    dot.setAttribute(
      'aria-label',
      `Ir a la pregunta ${i + 1}`
    );

    dot.addEventListener('click', () => {
      faqIndex = i;
      updateFaq();
    });

    dotsWrap.appendChild(dot);
  });

  const dots = [
    ...dotsWrap.querySelectorAll('.faq-dot')
  ];

  function updateFaq() {

    track.style.transform =
      `translateX(-${faqIndex * 100}%)`;

    current.textContent = faqIndex + 1;

    dots.forEach((dot, i) =>
      dot.classList.toggle(
        'active',
        i === faqIndex
      )
    );
  }

  function moveFaq(step) {

    faqIndex =
      (faqIndex + step + slides.length) %
      slides.length;

    updateFaq();
  }

  prev.addEventListener(
    'click',
    () => moveFaq(-1)
  );

  next.addEventListener(
    'click',
    () => moveFaq(1)
  );

  track.addEventListener(
    'touchstart',
    e => {
      touchStartX = e.changedTouches[0].clientX;
    },
    {
      passive: true
    }
  );

  track.addEventListener(
    'touchend',
    e => {

      const delta =
        e.changedTouches[0].clientX -
        touchStartX;

      if (Math.abs(delta) > 45) {
        moveFaq(
          delta < 0 ? 1 : -1
        );
      }

    },
    {
      passive: true
    }
  );

  updateFaq();
}


// =========================
// NAV
// =========================

const sections = [
  ...document.querySelectorAll('main section[id]')
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

  navAnchors.forEach(a =>
    a.classList.toggle(
      'active',
      a.getAttribute('href') === `#${current}`
    )
  );

});


// =========================
// HERO
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

    if (orbOne && orbTwo && hero) {

      hero.addEventListener(
        'mousemove',
        e => {

          const rect =
            hero.getBoundingClientRect();

          const x =
            (
              (e.clientX - rect.left) /
              rect.width -
              .5
            ) * 40;

          const y =
            (
              (e.clientY - rect.top) /
              rect.height -
              .5
            ) * 40;

          orbOne.style.transform =
            `translate(${x}px, ${y}px)`;

          orbTwo.style.transform =
            `translate(${-x * .8}px, ${-y * .8}px)`;

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


// =========================
// GALERÍA DE EVENTOS
// =========================

const eventGallery = {

  sonido: [
    'sonido-05.jpg',
    'sonido-02.jpg',
    'sonido-03.jpg',
    'sonido-04.jpg',
    'sonido-01.jpg'
  ],

  iluminacion: [

    // CAMBIO:
    // Ahora la imagen 2/6 es iluminacion-06.jpg
    'iluminacion-03.jpg',
    'iluminacion-06.jpg',
    'iluminacion-02.jpg',
    'iluminacion-04.jpg',
    'iluminacion-05.jpg'

  ],

  karaoke: [
    'karaoke-01.jpg',
    'karaoke-02.jpg',
    'karaoke-03.jpg'
  ],

  playstation: [
    'playstation-01.jpg',
    'playstation-02.jpg',
    'playstation-03.jpg',
    'playstation-04.jpg',
    'playstation-05.jpg'
  ]

};


const eventMeta = {

  sonido: {
    label: 'Sonido',
    title: 'Sonido para tu evento'
  },

  iluminacion: {
    label: 'Iluminación',
    title: 'Iluminación que transforma'
  },

  karaoke: {
    label: 'Karaoke',
    title: 'Noches de karaoke'
  },

  playstation: {
    label: 'PlayStation 5',
    title: 'Experiencia gamer'
  }

};


const makeEventItem = (
  category,
  file
) => ({

  category,

  src:
    `assets/eventos/${category}/${file}`,

  alt:
    `${eventMeta[category].label} de Party Pro en eventos`,

  title:
    eventMeta[category].title,

  label:
    eventMeta[category].label

});


const allEventImages =
  Object.entries(eventGallery).flatMap(
    ([category, files]) =>
      files.map(file =>
        makeEventItem(category, file)
      )
  );


// =========================
// TODOS
// =========================

// CAMBIO:
// Ahora "Todos" muestra únicamente:
// 1. Sonido
// 2. Iluminación
// 3. Noches de karaoke
// 4. Experiencia gamer

const mixedPreview = [

  makeEventItem(
    'sonido',
    eventGallery.sonido[4]
  ),

  makeEventItem(
    'iluminacion',
    eventGallery.iluminacion[0]
  ),

  makeEventItem(
    'karaoke',
    eventGallery.karaoke[0]
  ),

  makeEventItem(
    'playstation',
    eventGallery.playstation[0]
  )

].filter(
  item =>
    item.src &&
    !item.src.endsWith('/undefined')
);


// =========================
// ELEMENTOS GALERÍA
// =========================

const eventFilters = [
  ...document.querySelectorAll('.event-filter')
];

const eventCards = [
  ...document.querySelectorAll(
    '#eventos .event-photo'
  )
];

const galleryLightbox =
  document.querySelector('.gallery-lightbox');

const eventsMore =
  document.getElementById('events-more');

let activeEventFilter = 'all';

let activeGalleryImages =
  allEventImages;

let galleryIndex = 0;

let galleryTouchStart = 0;


// =========================
// FILTROS
// =========================

const itemsForFilter = filter =>

  filter === 'all'

    ? allEventImages

    : (
      eventGallery[filter] || []
    ).map(file =>
      makeEventItem(filter, file)
    );


const previewForFilter = filter =>

  filter === 'all'

    ? mixedPreview

    : itemsForFilter(filter).slice(0, 5);


// =========================
// MOSAICO
// =========================

const renderEventMosaic = filter => {

  const preview =
    previewForFilter(filter);

  eventCards.forEach(
    (card, index) => {

      const item =
        preview[index];

      card.hidden =
        !item;

      card.classList.toggle(
        'is-empty',
        !item
      );

      if (!item) {
        return;
      }

      const img =
        card.querySelector('img');

      const strong =
        card.querySelector(
          '.event-caption strong'
        );

      const small =
        card.querySelector(
          '.event-caption small'
        );

      img.src =
        item.src;

      img.alt =
        item.alt;

      strong.textContent =
        item.title;

      small.textContent =
        item.label;

      card.dataset.previewIndex =
        String(index);

    }
  );

};


// =========================
// LIGHTBOX
// =========================

if (
  galleryLightbox &&
  eventCards.length
) {

  const lightboxImage =
    galleryLightbox.querySelector(
      '.lightbox-image'
    );

  const lightboxCounter =
    galleryLightbox.querySelector(
      '.lightbox-counter'
    );

  const closeButton =
    galleryLightbox.querySelector(
      '.lightbox-close'
    );

  const prevButton =
    galleryLightbox.querySelector(
      '.lightbox-prev'
    );

  const nextButton =
    galleryLightbox.querySelector(
      '.lightbox-next'
    );


  const renderGallery = () => {

    const item =
      activeGalleryImages[galleryIndex];

    if (!item) {
      return;
    }

    lightboxImage.src =
      item.src;

    lightboxImage.alt =
      item.alt;

    lightboxCounter.textContent =
      `${galleryIndex + 1} / ${activeGalleryImages.length}`;

  };


  const openGallery = index => {

    if (
      !activeGalleryImages.length
    ) {
      return;
    }

    galleryIndex =
      Math.max(
        0,
        Math.min(
          index,
          activeGalleryImages.length - 1
        )
      );

    renderGallery();

    galleryLightbox.classList.add(
      'open'
    );

    galleryLightbox.setAttribute(
      'aria-hidden',
      'false'
    );

    document.body.classList.add(
      'lightbox-open'
    );

    closeButton.focus();

  };


  const closeGallery = () => {

    galleryLightbox.classList.remove(
      'open'
    );

    galleryLightbox.setAttribute(
      'aria-hidden',
      'true'
    );

    document.body.classList.remove(
      'lightbox-open'
    );

  };


  const moveGallery = step => {

    galleryIndex =
      (
        galleryIndex +
        step +
        activeGalleryImages.length
      ) %
      activeGalleryImages.length;

    renderGallery();

  };


  // =========================
  // CLICK EN LAS FOTOS
  // =========================

  eventCards.forEach(
    card => {

      card.addEventListener(
        'click',
        () => {

          const preview =
            previewForFilter(
              activeEventFilter
            );

          const shown =
            preview[
              Number(
                card.dataset.previewIndex || 0
              )
            ];

          activeGalleryImages =
            itemsForFilter(
              activeEventFilter
            );

          const match =
            activeGalleryImages.findIndex(
              item =>
                item.src === shown?.src
            );

          openGallery(
            match >= 0
              ? match
              : 0
          );

        }
      );

    }
  );


  // =========================
  // CAMBIAR FILTRO
  // =========================

  eventFilters.forEach(
    filter => {

      filter.addEventListener(
        'click',
        () => {

          eventFilters.forEach(
            f =>
              f.classList.remove(
                'active'
              )
          );

          filter.classList.add(
            'active'
          );

          activeEventFilter =
            filter.dataset.filter;

          activeGalleryImages =
            itemsForFilter(
              activeEventFilter
            );

          renderEventMosaic(
            activeEventFilter
          );

        }
      );

    }
  );


  // =========================
  // VER MÁS FOTOS
  // =========================

  if (eventsMore) {

    eventsMore.addEventListener(
      'click',
      () => {

        activeGalleryImages =
          itemsForFilter(
            activeEventFilter
          );

        openGallery(0);

      }
    );

  }


  // =========================
  // CONTROLES LIGHTBOX
  // =========================

  closeButton.addEventListener(
    'click',
    closeGallery
  );

  prevButton.addEventListener(
    'click',
    () => moveGallery(-1)
  );

  nextButton.addEventListener(
    'click',
    () => moveGallery(1)
  );


  galleryLightbox.addEventListener(
    'click',
    e => {

      if (
        e.target === galleryLightbox
      ) {
        closeGallery();
      }

    }
  );


  document.addEventListener(
    'keydown',
    e => {

      if (
        !galleryLightbox.classList.contains(
          'open'
        )
      ) {
        return;
      }

      if (e.key === 'Escape') {
        closeGallery();
      }

      if (e.key === 'ArrowLeft') {
        moveGallery(-1);
      }

      if (e.key === 'ArrowRight') {
        moveGallery(1);
      }

    }
  );


  // =========================
  // SWIPE MOBILE
  // =========================

  galleryLightbox.addEventListener(
    'touchstart',
    e => {

      galleryTouchStart =
        e.changedTouches[0].clientX;

    },
    {
      passive: true
    }
  );


  galleryLightbox.addEventListener(
    'touchend',
    e => {

      const d =
        e.changedTouches[0].clientX -
        galleryTouchStart;

      if (Math.abs(d) > 45) {

        moveGallery(
          d < 0 ? 1 : -1
        );

      }

    },
    {
      passive: true
    }
  );


  // =========================
  // INICIALIZAR GALERÍA
  // =========================

  renderEventMosaic('all');

}