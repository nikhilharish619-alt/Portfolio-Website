/**
 * Portfolio Website - Interactive Features
 * Nikhil Harish | Yellow/Gold Theme
 */

// ===== DOM ELEMENTS =====
const header = document.getElementById('header');
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav-link');
const skillTabs = document.querySelectorAll('.skill-tab');
const skillGrids = document.querySelectorAll('.skills-grid');
const backToTop = document.getElementById('backToTop');

// ===== MOBILE NAVIGATION =====
function openNav() {
    navMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeNav() {
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
}

navToggle?.addEventListener('click', openNav);
navClose?.addEventListener('click', closeNav);

navLinks.forEach(link => {
    link.addEventListener('click', closeNav);
});

document.addEventListener('click', (e) => {
    if (navMenu?.classList.contains('active') &&
        !navMenu.contains(e.target) &&
        !navToggle?.contains(e.target)) {
        closeNav();
    }
});

// ===== HEADER SCROLL EFFECT =====
let lastScroll = 0;

function handleHeaderScroll() {
    const currentScroll = window.scrollY;

    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }

    lastScroll = currentScroll;
}

window.addEventListener('scroll', handleHeaderScroll, { passive: true });

// ===== BACK TO TOP BUTTON =====
function handleBackToTop() {
    if (window.scrollY > 500) {
        backToTop?.classList.add('visible');
    } else {
        backToTop?.classList.remove('visible');
    }
}

window.addEventListener('scroll', handleBackToTop, { passive: true });

// ===== SKILL TABS =====
skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        skillTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        skillGrids.forEach(grid => grid.classList.remove('active'));
        const tabId = tab.dataset.tab;
        const targetGrid = document.getElementById(tabId);
        if (targetGrid) {
            targetGrid.classList.add('active');
        }
    });
});

// ===== DASHBOARD TILE TOGGLE =====
const dashboardTiles = document.querySelectorAll('.dashboard-tile');
const dashboardIframe = document.getElementById('dashboard-iframe');
const dashboardViewerTitle = document.querySelector('.dashboard-viewer-title');
const dashboardExternalLink = document.querySelector('.dashboard-external-link');

dashboardTiles.forEach(tile => {
    tile.addEventListener('click', () => {
        // Remove active class from all tiles
        dashboardTiles.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tile
        tile.classList.add('active');

        // Get the dashboard URL from data attribute
        const dashboardUrl = tile.dataset.url;
        const dashboardTitle = tile.querySelector('h3').textContent;

        // Update iframe source
        if (dashboardIframe) {
            dashboardIframe.src = dashboardUrl;
        }

        // Update viewer title
        if (dashboardViewerTitle) {
            dashboardViewerTitle.textContent = dashboardTitle;
        }

        // Update external link
        if (dashboardExternalLink) {
            dashboardExternalLink.href = dashboardUrl;
        }
    });
});

// ===== CERTIFICATION SELECTION =====
const certTiles = document.querySelectorAll('.cert-tile');
const certDisplayImage = document.getElementById('cert-display-image');
const certViewerTitle = document.querySelector('.cert-viewer-title');
const certDescription = document.getElementById('cert-description');
const certSkillsContainer = document.getElementById('cert-skills');

certTiles.forEach(tile => {
    tile.addEventListener('click', () => {
        // Remove active class from all tiles
        certTiles.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tile
        tile.classList.add('active');

        // Get data from attributes
        const imageSrc = tile.dataset.image;
        const title = tile.dataset.title;
        const desc = tile.dataset.desc;
        const skillsString = tile.dataset.skills;

        // Update viewer with animation
        if (certDisplayImage) {
            certDisplayImage.style.opacity = '0';
            certDisplayImage.style.transform = 'scale(0.95)';

            setTimeout(() => {
                certDisplayImage.src = imageSrc;
                certDisplayImage.style.opacity = '1';
                certDisplayImage.style.transform = 'scale(1)';
            }, 300);
        }

        if (certViewerTitle) certViewerTitle.textContent = title;
        if (certDescription) certDescription.textContent = desc;

        // Update skills
        if (certSkillsContainer && skillsString) {
            const skills = skillsString.split(',').map(s => s.trim());
            certSkillsContainer.innerHTML = skills.map(skill => `<span>${skill}</span>`).join('');
        }
    });
});

// ===== SCROLL REVEAL ANIMATION =====
function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;

    // Group elements by type for independent stagger delays
    const elementTypes = [
        '.service-card',
        '.project-card',
        '.skill-item',
        '.education-card',
        '.cert-tile',
        '.contact-card',
        '.stat-item'
    ];

    elementTypes.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - revealPoint) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                element.style.transitionDelay = `${index * 0.05}s`;
            }
        });
    });
}

// Set initial state for reveal elements
document.querySelectorAll('.service-card, .project-card, .skill-item, .contact-card, .cert-tile').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
});

window.addEventListener('scroll', revealOnScroll, { passive: true });
revealOnScroll(); // Initial check

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const headerHeight = header?.offsetHeight || 80;
            const targetPosition = targetElement.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== ACTIVE NAV LINK HIGHLIGHT =====
function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLink?.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveNavLink, { passive: true });

// ===== INTERSECTION OBSERVER FOR SECTION ANIMATIONS =====
const observerOptions = {
    root: null,
    rootMargin: '-50px',
    threshold: 0.1
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    sectionObserver.observe(section);
});

// ===== CARD HOVER EFFECTS =====
document.querySelectorAll('.service-card, .project-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// ===== PARALLAX EFFECT FOR HERO =====
const heroContent = document.querySelector('.hero-content');
const heroDecorations = document.querySelector('.hero-decorations');

function handleParallax() {
    const scrolled = window.scrollY;

    if (scrolled < window.innerHeight) {
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
            heroContent.style.opacity = 1 - (scrolled / 800);
        }
        if (heroDecorations) {
            heroDecorations.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    }
}

window.addEventListener('scroll', handleParallax, { passive: true });

// ===== TYPING ANIMATION FOR HERO (Optional) =====
class TypeWriter {
    constructor(element, words, wait = 3000) {
        this.element = element;
        this.words = words;
        this.wait = parseInt(wait, 10);
        this.wordIndex = 0;
        this.txt = '';
        this.isDeleting = false;
        this.type();
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.element.textContent = this.txt;

        let typeSpeed = 80;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 400;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// ===== COUNTER ANIMATION FOR STATS =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }

    updateCounter();
}

// Observe stats for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const value = parseInt(stat.textContent);
                if (!isNaN(value) && !stat.classList.contains('animated')) {
                    stat.classList.add('animated');
                    animateCounter(stat, value);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu?.classList.contains('active')) {
        closeNav();
    }
});

// ===== CONSOLE EASTER EGG =====
console.log('%c👋 Welcome!', 'font-size: 24px; font-weight: bold; color: #FFD700;');
console.log('%cNikhil Harish | Senior Aviation Data & BI Specialist', 'font-size: 14px; color: #a0a0a0;');
console.log('%cBuilt with passion and attention to detail.', 'font-size: 12px; color: #666;');

// ===== PAGE LOAD COMPLETE =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Trigger hero animations
    setTimeout(() => {
        document.querySelectorAll('.animate-slide-right, .animate-fade-in').forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }, 100);
});

// ===== SMOOTH CURSOR GLOW EFFECT (Optional Enhancement) =====
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.service-card, .project-card, .contact-card');

    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});
