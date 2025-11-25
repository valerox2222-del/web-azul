// ========================================
// MENÚ RESPONSIVO
// ========================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', function () {
    navMenu.classList.toggle('active');
    this.classList.toggle('active');
});

// Cerrar menú al hacer click en un enlace
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', function () {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ========================================
// PARTÍCULAS ANIMADAS EN CANVAS
// ========================================

const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 80;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = 'rgba(0, 212, 255, 0.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    ctx.strokeStyle = `rgba(0, 212, 255, ${1 - distance / 120})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        connectParticles();
        requestAnimationFrame(animate);
    }

    init();
    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ========================================
// TYPING EFFECT
// ========================================

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Aplicar typing effect al título principal
const heroTitle = document.querySelector('.hero h1');
if (heroTitle) {
    const originalText = heroTitle.textContent;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !heroTitle.dataset.typed) {
                typeWriter(heroTitle, originalText, 80);
                heroTitle.dataset.typed = 'true';
            }
        });
    });
    observer.observe(heroTitle);
}

// ========================================
// FORMULARIO DE CONTACTO
// ========================================

const contactoForm = document.getElementById('contactoForm');

if (contactoForm) {
    contactoForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const empresa = document.getElementById('empresa').value;
        const mensaje = document.getElementById('mensaje').value;

        if (!nombre || !email || !empresa || !mensaje) {
            alert('Por favor completa todos los campos obligatorios');
            return;
        }

        const whatsappMensaje = encodeURIComponent(
            `Hola, soy ${nombre} de ${empresa}.\\n\\n` +
            `Email: ${email}\\n` +
            `Teléfono: ${telefono || 'No proporcionado'}\\n\\n` +
            `Mensaje: ${mensaje}`
        );

        window.open(`https://wa.me/34XXXXXXXXX?text=${whatsappMensaje}`, '_blank');

        alert('¡Mensaje enviado! Nos pondremos en contacto pronto.');
        contactoForm.reset();
    });
}

// ========================================
// SCROLL ANIMATIONS AVANZADAS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const scrollObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animate-in');
            }, index * 100);
        }
    });
}, observerOptions);

// Observar elementos con animación escalonada
document.querySelectorAll('.servicio-card, .info-card, .valor').forEach(el => {
    el.classList.add('scroll-animate');
    scrollObserver.observe(el);
});

// ========================================
// PARALLAX EFFECT MEJORADO
// ========================================

window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;

    // Parallax en hero
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }

    // Parallax en secciones
    const sections = document.querySelectorAll('.servicios, .sobre-nosotros');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const offset = (window.innerHeight - rect.top) * 0.1;
            section.style.transform = `translateY(${offset}px)`;
        }
    });
});

// ========================================
// CONTADOR ANIMADO
// ========================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const hasPlus = element.textContent.includes('+');
    const hasPercent = element.textContent.includes('%');

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current) + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
        }
    }, 16);
}

const statsObserver = new IntersectionObserver(function (entries) {
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
// NAVBAR EFFECTS
// ========================================

const header = document.querySelector('.header');
let lastScrollTop = 0;

window.addEventListener('scroll', function () {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ========================================
// SMOOTH SCROLL
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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
// MOUSE MOVE EFFECTS
// ========================================

document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.servicio-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        } else {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        }
    });
});

console.log('✨ SEO Para El Baix - Animaciones cargadas correctamente');

// ========================================
// EFECTOS PREMIUM ADICIONALES
// ========================================

// Efecto glitch en títulos al pasar el mouse
document.querySelectorAll('h2').forEach(title => {
    let glitchInterval;

    title.addEventListener('mouseenter', () => {
        const originalText = title.textContent;
        const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
        let iterations = 0;

        clearInterval(glitchInterval);
        glitchInterval = setInterval(() => {
            title.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (index < iterations) {
                        return originalText[index];
                    }
                    return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                })
                .join('');

            if (iterations >= originalText.length) {
                clearInterval(glitchInterval);
            }

            iterations += 1 / 3;
        }, 30);
    });

    title.addEventListener('mouseleave', () => {
        clearInterval(glitchInterval);
        title.textContent = title.textContent;
    });
});

// Efecto ripple mejorado en botones
document.querySelectorAll('.btn, button').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            pointer-events: none;
            transform: scale(0);
            animation: rippleEffect 0.6s ease-out;
        `;

        this.style.position = 'relative';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Añadir keyframe para ripple
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Mejorar scroll reveal con delays escalonados
const revealElements = document.querySelectorAll('.servicio-card, .info-card, .blog-card');
revealElements.forEach((el, index) => {
    el.style.transitionDelay = `${index * 0.1}s`;
});

// Efecto de parallax mejorado en imágenes
const parallaxImages = document.querySelectorAll('.sobre-imagen img, .blog-card img');
window.addEventListener('scroll', () => {
    parallaxImages.forEach(img => {
        const rect = img.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
            img.style.transform = `translateY(${scrollPercent * 20}px) scale(1.05)`;
        }
    });
});

// Animación de números con easing
function animateValue(element, start, end, duration, hasPlus = false, hasPercent = false) {
    const range = end - start;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (easeOutQuart)
        const easeOut = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (range * easeOut));

        element.textContent = current + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// Aplicar animación de números a las estadísticas
const statsObserver2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const statElements = entry.target.querySelectorAll('.stat h3');
            statElements.forEach(stat => {
                const text = stat.textContent;
                const hasPlus = text.includes('+');
                const hasPercent = text.includes('%');
                const value = parseInt(text.replace(/[^0-9]/g, ''));
                animateValue(stat, 0, value, 2000, hasPlus, hasPercent);
            });
            entry.target.dataset.animated = 'true';
        }
    });
}, { threshold: 0.5 });

const heroStats2 = document.querySelector('.hero-stats');
if (heroStats2) {
    statsObserver2.observe(heroStats2);
}

console.log('✨ Efectos premium cargados correctamente');
