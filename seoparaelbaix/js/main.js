// ========================================
// MENÚ RESPONSIVO
// ========================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    this.classList.toggle('active');
});

// Cerrar menú al hacer click en un enlace
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ========================================
// FORMULARIO DE CONTACTO
// ========================================

const contactoForm = document.getElementById('contactoForm');

contactoForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener valores del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const empresa = document.getElementById('empresa').value;
    const mensaje = document.getElementById('mensaje').value;

    // Validar que los campos obligatorios estén completos
    if (!nombre || !email || !empresa || !mensaje) {
        alert('Por favor completa todos los campos obligatorios');
        return;
    }

    // Crear mensaje para WhatsApp
    const whatsappMensaje = encodeURIComponent(
        `Hola, soy ${nombre} de ${empresa}.\n\n` +
        `Email: ${email}\n` +
        `Teléfono: ${telefono || 'No proporcionado'}\n\n` +
        `Mensaje: ${mensaje}`
    );

    // Redirigir a WhatsApp
    window.open(`https://wa.me/34XXXXXXXXX?text=${whatsappMensaje}`, '_blank');

    // También enviar email (simulado)
    console.log('Formulario enviado:', {
        nombre,
        email,
        telefono,
        empresa,
        mensaje
    });

    // Mostrar mensaje de éxito
    alert('¡Mensaje enviado! Nos pondremos en contacto pronto.');

    // Limpiar formulario
    contactoForm.reset();
});

// ========================================
// SCROLL ANIMATION
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos
document.querySelectorAll('.servicio-card, .blog-card, .info-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========================================
// NAVBAR STICKY EFFECTS
// ========================================

const header = document.querySelector('.header');
let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.boxShadow = 'var(--shadow)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ========================================
// SMOOTH SCROLL PARA ENLACES INTERNOS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// CONTADOR ANIMADO (Numbers Counter)
// ========================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 16);
}

// Observer para activar contadores cuando sean visibles
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
            const statElements = entry.target.querySelectorAll('.stat h3');
            statElements.forEach(stat => {
                const value = parseInt(stat.textContent);
                animateCounter(stat, value);
            });
            entry.target.dataset.counted = 'true';
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ========================================
// EFECTOS ADICIONALES
// ========================================

// Efecto de parallax en hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
    }
});

// Agregar clase active al enlace del navbar según scroll
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

console.log('SEO Para El Baix - Script inicializado correctamente');
