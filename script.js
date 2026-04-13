// script.js - JS avancé élégant pour portfolio Georges Elonga
// Particles.js inspired background, typing effect, skill counters, parallax, dark/light toggle

// Particle Background for Hero (canvas)
function initParticles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'hero-particles';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    document.querySelector('.hero').appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(233, 69, 96, 0.3)';
            ctx.fill();
        });
        requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Typing Effect for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Skill Counters
function animateCounters() {
    const counters = document.querySelectorAll('.skills span');
    counters.forEach((span, index) => {
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        setTimeout(() => {
            span.style.transition = 'all 0.6s ease';
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Parallax Effect
function parallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.profile-pic');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Dark/Light Toggle
function initToggle() {
    const toggle = document.createElement('button');
    toggle.innerHTML = '<i class="fas fa-moon"></i>';
    toggle.className = 'theme-toggle';
    toggle.style.cssText = 'position:fixed;top:20px;right:20px;z-index:1000;background:var(--accent-color);color:white;border:none;border-radius:50%;width:50px;height:50px;cursor:pointer;font-size:1.2rem;box-shadow:0 4px 15px rgba(0,0,0,0.3);transition:all 0.3s ease;';
    document.body.appendChild(toggle);

    let isDark = true;
    toggle.addEventListener('click', () => {
        isDark = !isDark;
        document.body.classList.toggle('light-theme', !isDark);
        toggle.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    });
}

// Intersection Observer for animations (enhanced)
function initObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                if (entry.target.classList.contains('skills')) animateCounters();
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.service-card, .portfolio-item, .testimonial, .skills').forEach(el => observer.observe(el));
}

// Existing functions + new
document.addEventListener('DOMContentLoaded', () => {
    // Existing
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    function openModal(text) {
        document.getElementById('modalText').textContent = text;
        document.getElementById('portfolioModal').style.display = 'flex';
    }
    window.closeModal = closeModal = () => document.getElementById('portfolioModal').style.display = 'none';

    document.querySelector('.contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Message envoyé à georgeelonga06@gmail.com ! (Démo)');
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // New elegant features
    setTimeout(() => typeWriter(document.querySelector('.hero-title'), 'Georges Elonga'), 500);
    initParticles();
    animateCounters();
    parallax();
    initToggle();
    initObserver();
});
