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

const carousel = document.querySelector('.testimonials-carousel');
let cards = Array.from(carousel.children);
let index = 1; // começa no 1 porque vamos clonar
let cardWidth;

// ===== Clonar os primeiros e últimos cards =====
const firstClone = cards[0].cloneNode(true);
const lastClone = cards[cards.length - 1].cloneNode(true);
firstClone.classList.add("clone");
lastClone.classList.add("clone");

carousel.appendChild(firstClone);
carousel.insertBefore(lastClone, cards[0]);

// Atualiza lista de cards
cards = Array.from(carousel.children);

// ===== Indicadores =====
const indicatorsContainer = document.querySelector('.carousel-indicators');
indicatorsContainer.innerHTML = "";
cards.slice(1, -1).forEach((_, i) => {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => {
    index = i + 1; // +1 por causa do clone inicial
    updateCarousel();
    updateIndicators();
    restartAutoplay();
  });
  indicatorsContainer.appendChild(dot);
});
const dots = document.querySelectorAll('.dot');

// ===== Atualizar carrossel =====
function updateCarousel(animate = true) {
  cardWidth = cards[0].offsetWidth + 28; // largura do card + gap
  const containerWidth = carousel.offsetWidth;
  const offset = (containerWidth - cardWidth) / 2; // centralizar

  if (!animate) {
    carousel.style.transition = "none";
  } else {
    carousel.style.transition = "transform 0.6s ease";
  }

  carousel.style.transform = `translateX(${-index * cardWidth + offset}px)`;
}

// ===== Atualizar bolinhas =====
function updateIndicators() {
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index - 1); // -1 por causa do clone
  });
}

// ===== Autoplay =====
let autoplayInterval;
function startAutoplay() {
  autoplayInterval = setInterval(() => {
    index++;
    updateCarousel();
    updateIndicators();
  }, 4000);
}
function stopAutoplay() { clearInterval(autoplayInterval); }
function restartAutoplay() { stopAutoplay(); startAutoplay(); }
startAutoplay();

// ===== Loop infinito =====
carousel.addEventListener("transitionend", () => {
  if (cards[index].classList.contains("clone")) {
    if (index === cards.length - 1) {
      index = 1; // pulou pro clone do primeiro → volta pro real
    } else if (index === 0) {
      index = cards.length - 2; // pulou pro clone do último → volta pro real
    }
    updateCarousel(false); // sem animação
    updateIndicators();
  }
});

// ===== Drag & Touch =====
let isDown = false, startX, moveX;

function handleMove(diff) {
  if (diff < -50) index++;
  if (diff > 50) index--;
  updateCarousel();
  updateIndicators();
  restartAutoplay();
}

carousel.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX;
  carousel.classList.add("dragging");
  stopAutoplay();
});

carousel.addEventListener("mouseup", (e) => {
  if (!isDown) return;
  isDown = false;
  carousel.classList.remove("dragging");
  moveX = e.pageX - startX;
  handleMove(moveX);
});

carousel.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  const walk = e.pageX - startX;
  carousel.style.transition = "none";
  carousel.style.transform = `translateX(${-index * cardWidth + walk}px)`;
});

carousel.addEventListener("mouseleave", () => { isDown = false; });

carousel.addEventListener("touchstart", (e) => {
  isDown = true;
  startX = e.touches[0].pageX;
  carousel.classList.add("dragging");
  stopAutoplay();
});

carousel.addEventListener("touchend", (e) => {
  if (!isDown) return;
  isDown = false;
  carousel.classList.remove("dragging");
  moveX = e.changedTouches[0].pageX - startX;
  handleMove(moveX);
});

carousel.addEventListener("touchmove", (e) => {
  if (!isDown) return;
  const walk = e.touches[0].pageX - startX;
  carousel.style.transition = "none";
  carousel.style.transform = `translateX(${-index * cardWidth + walk}px)`;
});

// ===== Recalcular no resize =====
window.addEventListener("resize", () => updateCarousel(false));

// ===== Inicia centralizado =====
updateCarousel(false);