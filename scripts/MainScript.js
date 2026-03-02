// Hide loading screen when page fully loads
document.documentElement.classList.add('loading-lock');

window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Add slight delay for visual effect
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.documentElement.classList.remove('loading-lock');
    }, 5000);
});

const nav = document.querySelector('.hud-nav');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.hud-right .nav-link');

if (nav && navToggle) {
    navToggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('nav-open');
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-open');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.setAttribute('aria-label', 'Open navigation menu');
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 560) {
            nav.classList.remove('nav-open');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.setAttribute('aria-label', 'Open navigation menu');
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const heroCtaButton = document.querySelector('.cta-button');
    const profileSection = document.getElementById('profile-section');
    const skillsPanel = document.getElementById('skills');
    const projectsPanel = document.getElementById('project-section');

    if (heroCtaButton && profileSection) {
        heroCtaButton.addEventListener('click', () => {
            profileSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    const setupRevealObserver = (element, visibleClass) => {
        if (!element) {
            return;
        }

        if (!('IntersectionObserver' in window)) {
            element.classList.add(visibleClass);
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    element.classList.add(visibleClass);
                    return;
                }

                element.classList.remove(visibleClass);
            });
        }, {
            threshold: 0.28
        });

        observer.observe(element);
    };

    setupRevealObserver(skillsPanel, 'skills-visible');
    setupRevealObserver(projectsPanel, 'projects-visible');
});
