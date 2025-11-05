    const sections = document.querySelectorAll('section');
    const skillFills = document.querySelectorAll('.skill-bar-fill');

    const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
                    bar.style.width = bar.dataset.width;
                });
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    sections.forEach(s => io.observe(s));

    const navLinks = document.querySelectorAll('nav a');
    function onScroll() {
        let fromTop = window.scrollY + 200;
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) return;
            const section = document.querySelector(href);
            if (section) {
                if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', onScroll);
    window.addEventListener('load', onScroll);

    /* Mobile menu toggle */
    const menuToggle = document.querySelector('.menu-toggle');
    const navElement = document.querySelector('nav');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navElement.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking a link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navElement.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    /* add a 'loaded' class after DOM is ready to trigger small entrance animations */
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.addEventListener('DOMContentLoaded', () => {
            // small timeout so CSS transitions have a visible entrance
            setTimeout(() => document.body.classList.add('loaded'), 120);
        });
    }