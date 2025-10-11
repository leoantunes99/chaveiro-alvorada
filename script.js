// ===== SCROLL ANIMATION =====
const myObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => myObserver.observe(el));

// ===== MENU MOBILE TOGGLE =====
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');

  // Trocar ícone do menu
  const icon = menuToggle.querySelector('i');
  if (navLinks.classList.contains('active')) {
    icon.classList.remove('bx-menu');
    icon.classList.add('bx-x');
  } else {
    icon.classList.remove('bx-x');
    icon.classList.add('bx-menu');
  }
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    // Fechar menu mobile ao clicar em um link
    navLinks.classList.remove('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.remove('bx-x');
    icon.classList.add('bx-menu');

    // Scroll suave para a seção
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const headerOffset = 80; // Altura do header fixo
      const elementPosition = targetSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===== ANIMAÇÃO ON SCROLL =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px"
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Adicionar animação fade in
      entry.target.style.opacity = "0";
      entry.target.style.transform = "translateY(30px)";

      setTimeout(() => {
        entry.target.style.transition = "all 0.6s ease";
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }, 100);

      // Parar de observar após animar
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observar todos os cards e botões
document.querySelectorAll('.service-card, .testimonial-card, .whatsapp-button').forEach(element => {
  observer.observe(element);
});

// ===== HEADER SCROLL EFFECT =====
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  // Adicionar sombra quando scrollar
  if (currentScroll > 50) {
    header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
  } else {
    header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
  }

  // Esconder/mostrar header baseado na direção do scroll (opcional)
  if (currentScroll > lastScroll && currentScroll > 100) {
    // Scrolling down
    header.style.transform = 'translateY(-100%)';
  } else {
    // Scrolling up
    header.style.transform = 'translateY(0)';
  }

  lastScroll = currentScroll;
});

// ===== PULSAR BOTÃO WHATSAPP =====
setInterval(() => {
  const whatsappFloat = document.querySelector('.whatsapp-float');
  whatsappFloat.style.animation = 'pulse 1s';

  setTimeout(() => {
    whatsappFloat.style.animation = '';
  }, 1000);
}, 4000);

// ===== ADICIONAR ANIMAÇÕES CSS DINAMICAMENTE =====
const style = document.createElement('style');
style.innerHTML = `
    @keyframes pulse {
        0% {
            transform: scale(1);
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        }
        50% {
            transform: scale(1.1);
            box-shadow: 0 8px 30px rgba(37, 211, 102, 0.4);
        }
        100% {
            transform: scale(1);
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        }
    }
`;
document.head.appendChild(style);

// ===== TESTIMONIALS CAROUSEL DRAG =====

const swiper = new Swiper('.swiper', {
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },

  slidesPerView: 1,
  spaceBetween: 20,

  loop: true,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  breakpoints: {
    640: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    1188: {
      slidesPerView: 3,
      spaceBetween: 40
    }
  }
});