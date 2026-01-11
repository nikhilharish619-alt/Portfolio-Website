/**
 * Portfolio Website - Interactive Features
 * Author: Nikhil Harish
 */

// ===== DOM ELEMENTS =====
const header = document.getElementById('header');
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav-link');
const skillTabs = document.querySelectorAll('.skill-tab');
const skillGrids = document.querySelectorAll('.skills-grid');

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

// Close nav when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', closeNav);
});

// Close nav when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !navToggle.contains(e.target)) {
        closeNav();
    }
});

// ===== HEADER SCROLL EFFECT =====
let lastScroll = 0;

function handleHeaderScroll() {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 100) {
        header.style.background = 'rgba(10, 15, 28, 0.95)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(10, 15, 28, 0.8)';
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
}

window.addEventListener('scroll', handleHeaderScroll, { passive: true });

// ===== SKILL TABS =====
skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active from all tabs
        skillTabs.forEach(t => t.classList.remove('active'));
        // Add active to clicked tab
        tab.classList.add('active');
        
        // Hide all grids
        skillGrids.forEach(grid => grid.classList.remove('active'));
        // Show corresponding grid
        const tabId = tab.dataset.tab;
        const targetGrid = document.getElementById(tabId);
        if (targetGrid) {
            targetGrid.classList.add('active');
        }
    });
});

// ===== SCROLL REVEAL ANIMATION =====
function revealOnScroll() {
    const reveals = document.querySelectorAll('.timeline-item, .project-card, .skill-card, .education-card, .highlight-card');
    const windowHeight = window.innerHeight;
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (elementTop < windowHeight - revealPoint) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) translateX(0)';
        }
    });
}

// Initial reveal check
revealOnScroll();
window.addEventListener('scroll', revealOnScroll, { passive: true });

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = header.offsetHeight;
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

// ===== TYPING EFFECT (Optional Enhancement) =====
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
        
        let typeSpeed = 100;
        
        if (this.isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // Optionally unobserve after revealing
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// ===== PROJECT CARD TILT EFFECT =====
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== SKILL CARD HOVER EFFECT =====
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== PARALLAX EFFECT FOR HERO =====
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    if (heroContent) {
        const scrolled = window.scrollY;
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / 800);
    }
}, { passive: true });

// ===== CONSOLE EASTER EGG =====
console.log('%c👋 Hey there, curious developer!', 'font-size: 24px; font-weight: bold; color: #3b82f6;');
console.log('%cInterested in how this site was built? Let\'s connect!', 'font-size: 14px; color: #94a3b8;');

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile nav
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeNav();
    }
});

// ===== PERFORMANCE: DEBOUNCE SCROLL EVENTS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to non-critical scroll handlers
const debouncedReveal = debounce(revealOnScroll, 10);

// ===== PAGE LOAD COMPLETE =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.animate-fade-up').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }, 100);
});
