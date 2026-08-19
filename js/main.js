/**
 * Ranger Con — JavaScript principal
 */

document.addEventListener('DOMContentLoaded', () => {
  initPixelBackground();
  initNavigation();
  initScrollEffects();
  initNosotrosTabs();
  initEquipo();
  initEventos();
  initVideojuego();
  initRifa();
  initSumate();
  initPartners();
  initContactForm();
  initModal();
});

/* ---- Fondo de píxeles animado ---- */
function initPixelBackground() {
  const canvas = document.getElementById('pixelCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const colors = ['#ff3131', '#6366f1', '#ffd700', '#22c55e', '#ff6b35', '#a855f7'];
  let columns = [];
  let mouseX = 0;
  let mouseY = 0;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const spacing = 28;
    columns = [];
    for (let x = spacing; x < canvas.width; x += spacing) {
      columns.push({
        x,
        dots: Array.from({ length: Math.ceil(canvas.height / 12) + 2 }, (_, i) => ({
          y: i * 12 - Math.random() * 20,
          speed: 0.3 + Math.random() * 0.8,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: 0.15 + Math.random() * 0.5,
          size: 1 + Math.random() * 1.5
        }))
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const parallaxX = (mouseX - canvas.width / 2) * 0.005;
    const parallaxY = (mouseY - canvas.height / 2) * 0.003;

    columns.forEach(col => {
      col.dots.forEach(dot => {
        dot.y += dot.speed;
        if (dot.y > canvas.height + 10) {
          dot.y = -10;
          dot.color = colors[Math.floor(Math.random() * colors.length)];
        }

        ctx.beginPath();
        ctx.arc(
          col.x + parallaxX,
          dot.y + parallaxY,
          dot.size,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = dot.color;
        ctx.globalAlpha = dot.opacity;
        ctx.fill();
      });
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  resize();
  draw();
}

/* ---- Navegación ---- */
function initNavigation() {
  const header = document.getElementById('header');
  const nav = document.getElementById('nav');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  menuToggle?.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle?.classList.remove('active');
      menuToggle?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 50);

    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  });
}

/* ---- Efectos de scroll ---- */
function initScrollEffects() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.ticket-card, .schedule-item, .evento-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

  const style = document.createElement('style');
  style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);
}

/* ---- Nosotros ---- */
const nosotrosData = {
  resumen: {
    title: '¿Qué es RangerCon?',
    text: 'RangerCon es el primer y más grande evento argentino dedicado exclusivamente a la franquicia Power Rangers. Nacimos de la pasión de fans que crecieron con los Rangers y queremos celebrar esa historia en comunidad, con cosplay, paneles, videojuegos retro y mucho más.'
  },
  historia: {
    title: 'Nuestra Historia',
    text: 'Comenzamos en 2023 como un pequeño encuentro online de fans. La respuesta fue tan positiva que en 2024 organizamos la primera edición presencial en Buenos Aires, reuniendo a más de 500 asistentes y 80 cosplayers de todo el país.'
  },
  vision: {
    title: 'Nuestra Visión',
    text: 'Convertirnos en el referente latinoamericano de los eventos de tokusatsu y Power Rangers, creando un espacio de celebración, creación y comunidad para todas las generaciones de fans.'
  },
  valores: {
    title: 'Nuestros Valores',
    text: 'Comunidad, inclusión, pasión y creatividad. Creemos que el universo Ranger es para todos, sin importar la edad, la generación favorita o el nivel de cosplay. Todos son bienvenidos al equipo.'
  },
  mision: {
    title: 'Nuestra Misión',
    text: 'Organizar eventos de calidad que celebren la cultura Power Rangers, conecten a fans de toda Argentina y den espacio a artistas, creadores y cosplayers locales que aman la saga.'
  },
  stand: {
    title: 'Nuestro Stand',
    text: 'En cada evento contamos con un stand oficial de RangerCon donde podés encontrar merchandise exclusivo, participar en juegos y actividades, y conocer al equipo organizador. ¡Pasate a saludar!'
  }
};

const nosotrosStatsHTML = `
  <div class="nosotros-stats">
    <div class="nosotros-stat">
      <svg class="nosotros-stat-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M22 4L14 20H20L18 36L28 18H22L22 4Z" fill="url(#boltGrad)" stroke="#FFD700" stroke-width="0.5"/>
        <defs>
          <linearGradient id="boltGrad" x1="14" y1="4" x2="28" y2="36">
            <stop stop-color="#FFD700"/>
            <stop offset="1" stop-color="#FF6B35"/>
          </linearGradient>
        </defs>
      </svg>
      <div>
        <span class="nosotros-stat-value red">+500 Asistentes</span>
        <span class="nosotros-stat-label">en nuestra última edición</span>
      </div>
    </div>
    <div class="nosotros-stat">
      <svg class="nosotros-stat-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="20" cy="14" r="8" fill="#FFD700"/>
        <rect x="10" y="24" width="20" height="14" rx="4" fill="#6366f1"/>
        <rect x="13" y="17" width="14" height="5" rx="2" fill="#ff3131" opacity="0.8"/>
      </svg>
      <div>
        <span class="nosotros-stat-value yellow">+80 Cosplayers</span>
        <span class="nosotros-stat-label">de todo Argentina</span>
      </div>
    </div>
  </div>
`;

function initNosotrosTabs() {
  const container = document.getElementById('nosotrosContent');
  const navItems = document.querySelectorAll('.nosotros-nav-item');
  if (!container) return;

  function renderTab(tab) {
    const data = nosotrosData[tab];
    if (!data) return;

    container.innerHTML = `
      <div class="nosotros-panel">
        <h2 class="nosotros-title">${data.title}</h2>
        <p class="nosotros-text">${data.text}</p>
        ${nosotrosStatsHTML}
      </div>
    `;
  }

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      renderTab(item.dataset.tab);
    });
  });

  renderTab('resumen');
}

/* ---- El Equipo ---- */
const boltIconSVG = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 2L8 12H12L11 22L17 10H13L13 2Z" fill="#FFD700" stroke="#FF6B35" stroke-width="0.4"/></svg>';

const equipoData = {
  mighty: [
    { color: 'red', name: 'Red Ranger', actor: 'Jason Lee Scott', zord: 'Tyrannosaurus' },
    { color: 'blue', name: 'Blue Ranger', actor: 'Billy Cranston', zord: 'Triceratops' },
    { color: 'yellow', name: 'Yellow Ranger', actor: 'Trini Kwan', zord: 'Sabertooth Tiger' },
    { color: 'pink', name: 'Pink Ranger', actor: 'Kimberly Ann Hart', zord: 'Pterodactyl' },
    { color: 'green', name: 'Green Ranger', actor: 'Tommy Oliver', zord: 'Dragonzord' },
    { color: 'black', name: 'Black Ranger', actor: 'Zack Taylor', zord: 'Mastodon' }
  ],
  zeo: [
    { color: 'red', name: 'Zeo Ranger V', actor: 'Tommy Oliver', zord: 'Red Battlezord' },
    { color: 'blue', name: 'Zeo Ranger III', actor: 'Rocky DeSantos', zord: 'Blue Battlezord' },
    { color: 'yellow', name: 'Zeo Ranger IV', actor: 'Tanya Sloan', zord: 'Yellow Battlezord' },
    { color: 'pink', name: 'Zeo Ranger II', actor: 'Katherine Hillard', zord: 'Pink Battlezord' },
    { color: 'green', name: 'Zeo Ranger I', actor: 'Adam Park', zord: 'Green Battlezord' },
    { color: 'gold', name: 'Gold Ranger', actor: 'Jason Lee Scott', zord: 'Pyramidas' }
  ]
};

function initEquipo() {
  const grid = document.getElementById('equipoGrid');
  const tabs = document.querySelectorAll('.equipo-tab');
  if (!grid) return;

  function renderCards(team) {
    const rangers = equipoData[team] || [];
    grid.innerHTML = rangers.map((r, i) => `
      <button class="ranger-card ranger-card--${r.color}" aria-label="${r.name}" style="animation-delay: ${i * 0.06}s">
        <div class="ranger-card-inner">
          <div class="ranger-card-face ranger-card-front">
            <div class="ranger-card-icon">${boltIconSVG}</div>
            <span class="ranger-card-name">${r.name}</span>
            <span class="ranger-card-hint">Toca para más info</span>
          </div>
          <div class="ranger-card-face ranger-card-back">
            <span class="ranger-card-label">ACTOR / PERSONAJE</span>
            <span class="ranger-card-value">${r.actor}</span>
            <span class="ranger-card-label">ZORD</span>
            <span class="ranger-card-value">${r.zord}</span>
          </div>
        </div>
      </button>
    `).join('');

    grid.querySelectorAll('.ranger-card').forEach(card => {
      card.addEventListener('click', () => {
        const wasFlipped = card.classList.contains('flipped');
        grid.querySelectorAll('.ranger-card').forEach(c => c.classList.remove('flipped'));
        if (!wasFlipped) card.classList.add('flipped');
      });
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderCards(tab.dataset.team);
    });
  });

  renderCards('mighty');
}

/* ---- Eventos ---- */
const pinIconSVG = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>';

const eventosData = {
  proximos: [
    {
      date: '15 NOV 2025',
      title: 'RangerCon 2025 — Buenos Aires',
      location: 'Centro Cultural Borges, CABA',
      desc: 'El evento más grande de Power Rangers de Argentina. Cosplays, paneles, videojuegos y más.',
      hasFlyer: true
    },
    {
      date: '22 NOV 2025',
      title: 'Meet & Greet Rangers',
      location: 'Online via Discord',
      desc: 'Conversación con actores y fans de la saga. Especial aniversario MMPR.',
      hasFlyer: true
    }
  ],
  pasados: [
    {
      date: 'NOV 2024',
      title: 'RangerCon 2024',
      location: 'Buenos Aires',
      desc: 'Primera edición con más de 500 asistentes y 80 cosplayers registrados.',
      hasFlyer: false
    },
    {
      date: 'JUN 2023',
      title: 'RangerCon Online 2023',
      location: 'Streaming',
      desc: 'Evento virtual con paneles, trivias y exhibición de cosplays.',
      hasFlyer: false
    }
  ]
};

function initEventos() {
  const grid = document.getElementById('eventosGrid');
  const tabs = document.querySelectorAll('.eventos-tab');
  if (!grid) return;

  function renderEvents(filter) {
    const events = eventosData[filter] || [];
    grid.innerHTML = events.map((ev, i) => `
      <article class="evento-card" style="animation-delay: ${i * 0.08}s">
        <span class="evento-date">${ev.date}</span>
        <h3 class="evento-name">${ev.title}</h3>
        <p class="evento-location">${pinIconSVG}${ev.location}</p>
        <p class="evento-desc">${ev.desc}</p>
        ${ev.hasFlyer ? '<button class="evento-btn" type="button">VER FLYER + INFO →</button>' : ''}
      </article>
    `).join('');

    grid.querySelectorAll('.evento-card').forEach((el, i) => {
      setTimeout(() => {
        el.style.opacity = '1';
      }, i * 80);
    });

    grid.querySelectorAll('.evento-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        showModal('Próximamente', 'El flyer e info detallada de este evento estará disponible pronto.');
      });
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderEvents(tab.dataset.filter);
    });
  });

  renderEvents('proximos');
}

/* ---- Sumate ---- */
const sumateColors = [
  { id: 'red', label: 'Red', name: 'Red Ranger', hex: '#ff3131' },
  { id: 'blue', label: 'Blue', name: 'Blue Ranger', hex: '#3b82f6' },
  { id: 'yellow', label: 'Yellow', name: 'Yellow Ranger', hex: '#ffd700' },
  { id: 'pink', label: 'Pink', name: 'Pink Ranger', hex: '#ec4899' },
  { id: 'green', label: 'Green', name: 'Green Ranger', hex: '#22c55e' },
  { id: 'black', label: 'Black', name: 'Black Ranger', hex: '#c0c0c0' },
  { id: 'other', label: 'Otro', name: 'Otro / No definido', hex: '#a0a0b0' }
];

function initSumate() {
  const grid = document.getElementById('sumateColors');
  const form = document.getElementById('sumateForm');
  const selectedName = document.getElementById('sumateSelectedName');
  const selectedBox = document.getElementById('sumateSelected');
  const submitBtn = form?.querySelector('.sumate-submit');
  if (!grid || !form) return;

  grid.innerHTML = sumateColors.map(c => `
    <button type="button" class="sumate-color-item" data-id="${c.id}" style="--c: ${c.hex}">
      <span class="sumate-color-dot">${boltIconSVG}</span>
      <span class="sumate-color-name">${c.label}</span>
    </button>
  `).join('');

  function selectColor(color) {
    grid.querySelectorAll('.sumate-color-item').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.id === color.id);
    });
    form.dataset.theme = color.id;
    form.style.setProperty('--accent', color.hex);
    if (selectedName) {
      selectedName.textContent = color.name;
      selectedName.style.color = color.hex;
    }
    if (selectedBox) selectedBox.style.borderColor = color.hex;
    if (submitBtn) submitBtn.style.backgroundColor = color.hex;
  }

  grid.querySelectorAll('.sumate-color-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const color = sumateColors.find(c => c.id === btn.dataset.id);
      if (color) selectColor(color);
    });
  });

  selectColor(sumateColors[0]);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    showModal(
      '¡Listo!',
      `¡Gracias, <strong>${name}</strong>! Te sumaste al equipo como <strong>${selectedName?.textContent || 'Ranger'}</strong>. Nos pondremos en contacto pronto.`
    );
    form.reset();
    selectColor(sumateColors[0]);
  });
}

/* ---- Nuestro Videojuego ---- */
function initVideojuego() {
  const btn = document.getElementById('videojuegoNotify');
  if (!btn) return;

  btn.addEventListener('click', () => {
    showModal('¡Anotado!', 'Te vamos a avisar apenas tengamos noticias del proyecto. ¡Gracias por el interés!');
  });
}

/* ---- Rifa Ranger ---- */
function initRifa() {
  document.querySelectorAll('.ticket-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const opcion = btn.dataset.ticket;
      showModal(
        '¡Números seleccionados!',
        `Elegiste <strong>${opcion}</strong> para la Rifa Ranger. En una versión con backend, serías redirigido al pago. ¡Gracias por sumarte!`
      );
    });
  });
}

/* ---- Nuestros Aliados ---- */
const partnersData = [
  { name: 'TJDF', desc: 'Tokusatsu Japan Distrib. Fan', color: '#ffd700' },
  { name: 'STK Stickers', desc: 'Merch & Collectibles', color: '#22c55e' },
  { name: 'A. Grove Ind.', desc: 'Producción Audiovisual', color: '#a855f7' },
  { name: 'Lytio3D', desc: 'Impresión 3D & Props', color: '#c2687e' },
  { name: 'Ficcion Stunt', desc: 'Shows de Acrobacia', color: '#ec4899' },
  { name: 'Filmaction ARG', desc: 'Registro Fotográfico', color: '#3b82f6' },
  { name: 'Leo Retro Gamer', desc: 'Videojuegos Retro', color: '#f59e0b' },
  { name: 'Byuro', desc: 'Desarrollador Full Stack', color: '#6366f1' }
];

function initPartners() {
  const grid = document.getElementById('partnersGrid');
  if (!grid) return;

  grid.innerHTML = partnersData.map(p => `
    <div class="partner-card" style="--c: ${p.color}">
      <span class="partner-icon"><span class="partner-icon-dot"></span></span>
      <h3 class="partner-name">${p.name}</h3>
      <p class="partner-desc">${p.desc}</p>
    </div>
  `).join('');
}

/* ---- Formulario de contacto ---- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    showModal(
      'Mensaje enviado',
      `¡Gracias, <strong>${name}</strong>! Recibimos tu consulta y te responderemos a la brevedad.`
    );
    form.reset();
  });
}

/* ---- Modal ---- */
let modalCallback = null;

function initModal() {
  const modal = document.getElementById('modal');
  const overlay = document.getElementById('modalOverlay');
  const closeBtn = document.getElementById('modalClose');
  const confirmBtn = document.getElementById('modalBtn');

  function closeModal() {
    modal?.classList.remove('active');
    modal?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  overlay?.addEventListener('click', closeModal);
  closeBtn?.addEventListener('click', closeModal);
  confirmBtn?.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

function showModal(title, message) {
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalMessage = document.getElementById('modalMessage');

  if (!modal) return;

  modalTitle.textContent = title;
  modalMessage.innerHTML = message;
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
