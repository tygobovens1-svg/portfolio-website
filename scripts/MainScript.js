// Lock scroll while the loading overlay is visible.
document.documentElement.classList.add("loading-lock");

window.addEventListener("load", () => {
    const loadingScreen = document.getElementById("loadingScreen");

    // Keep a short delay for the intended loading transition timing.
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.classList.add("hidden");
        }

        document.documentElement.classList.remove("loading-lock");
    }, 500);
});

const nav = document.querySelector(".hud-nav");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".hud-right .nav-link");

if (nav && navToggle) {
    const setNavToggleState = (isOpen) => {
        navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        navToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    };

    const closeNav = () => {
        nav.classList.remove("nav-open");
        setNavToggleState(false);
    };

    navToggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("nav-open");
        setNavToggleState(isOpen);
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", closeNav);
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 560) {
            closeNav();
        }
    });
}

window.addEventListener("DOMContentLoaded", () => {
    const heroCtaButton = document.querySelector(".cta-button");
    const profileSection = document.getElementById("profile-section");
    const pilotProfileTop = document.querySelector(".profile-top");
    const skillsPanel = document.getElementById("skills");
    const projectsPanel = document.getElementById("project-section");

    if (heroCtaButton && profileSection) {
        heroCtaButton.addEventListener("click", () => {
            profileSection.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    }

    const setupRevealObserver = (element, visibleClass) => {
        if (!element) {
            return;
        }

        if (!("IntersectionObserver" in window)) {
            element.classList.add(visibleClass);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        element.classList.add(visibleClass);
                        return;
                    }

                    element.classList.remove(visibleClass);
                });
            },
            {
                threshold: 0.28,
            }
        );

        observer.observe(element);
    };

    setupRevealObserver(pilotProfileTop, "profile-visible");
    setupRevealObserver(skillsPanel, "skills-visible");
    setupRevealObserver(projectsPanel, "projects-visible");
});
