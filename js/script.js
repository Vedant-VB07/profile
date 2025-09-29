// 1. Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

/* =======================================================
   COLOR CHANGER (GSAP ScrollTrigger)
   ======================================================= */
const initColorChanger = () => {
    const scrollColorElems = document.querySelectorAll(".content-section[data-bgcolor]");
    
    scrollColorElems.forEach((colorSection, i) => {
        // Determine the color of the previous section for the transition back
        // Defaults to the body's initial color (set in CSS) if it's the first section
        const prevBg = i === 0 ? "var(--color-dark-bg)" : scrollColorElems[i - 1].dataset.bgcolor;
        const prevText = i === 0 ? "var(--color-text-light)" : scrollColorElems[i - 1].dataset.textcolor;

        ScrollTrigger.create({
            trigger: colorSection,
            // Trigger animation when the top of the section enters the middle of the viewport
            start: "top 50%", 
            
            // Animate body colors when entering the section
            onEnter: () =>
                gsap.to("body", {
                    backgroundColor: colorSection.dataset.bgcolor,
                    color: colorSection.dataset.textcolor,
                    duration: 0.5,
                    overwrite: "auto"
                }),
            
            // Animate body colors back to the previous section's colors when scrolling up
            onLeaveBack: () =>
                gsap.to("body", {
                    backgroundColor: prevBg,
                    color: prevText,
                    duration: 0.5,
                    overwrite: "auto"
                })
        });
    });
};


/* =======================================================
   EXISTING SCRIPTS (Re-organized)
   ======================================================= */
document.addEventListener('DOMContentLoaded', () => {

    // Initialize the GSAP Color Changer
    initColorChanger();

    // --- 1. AOS Initialization (Scroll Reveal Animations) ---
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // --- 2. Typed.js for Hero Section ---
    if (document.getElementById('typed-output')) {
        new Typed('#typed-output', {
            strings: [
                "Sophomore @IIT Gandhinagar | CSE.",
                "Exploring Software, Systems, and Cybersecurity.",
                "Events Coordinator @Blithchron | Senator."
            ],
            typeSpeed: 50,
            backSpeed: 25,
            loop: true,
            startDelay: 1000,
            backDelay: 2000
        });
    }

    // --- 3. Dynamic Nav Highlighting (IntersectionObserver) ---
    // NOTE: This IntersectionObserver is kept for nav highlighting, but the color change is now handled by GSAP.
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-link'); 
    
    const options = {
        rootMargin: '-20% 0px -70% 0px', 
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.id;
            const correspondingLink = document.querySelector(`#desktop-nav a[href="#${id}"]`);

            if (entry.isIntersecting) {
                // Update Navigation Links (Gulp effect)
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }, options);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    // --- End Dynamic Nav Highlighting ---


    // --- 4. Mobile Hamburger Menu Logic ---
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (menuToggle && mobileNav && mobileNavLinks.length > 0) {
        menuToggle.addEventListener('click', () => {
            const isMenuOpen = mobileNav.style.display === 'flex';
            mobileNav.style.display = isMenuOpen ? 'none' : 'flex';
            menuToggle.textContent = isMenuOpen ? '☰' : '✕';
        });
        
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.style.display = 'none';
                menuToggle.textContent = '☰';
            });
        });
    }


    // --- 5. Universal Smooth Scroll ---
    // This is the original logic. The `html { scroll-behavior: smooth; }` in CSS is usually enough, but this JS ensures custom offsets and works in older browsers.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offset = window.innerWidth <= 768 ? 70 : 0; 
                window.scrollTo({
                    top: targetElement.offsetTop - offset, 
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 6. Custom Glowing Cursor ---
    const customCursor = document.getElementById('custom-cursor');
    if (customCursor && !('ontouchstart' in window || navigator.maxTouchPoints)) {
        document.addEventListener('mousemove', (e) => {
            customCursor.style.left = e.clientX + 'px';
            customCursor.style.top = e.clientY + 'px';
        });
    } else if (customCursor) {
        customCursor.style.display = 'none';
    }


    // --- 7. Skill Progress Bar Animation ---
    const skillSection = document.getElementById('skills');

    if (skillSection) {
        const skillBars = document.querySelectorAll('.progress-bar');
        const skillObserverOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const skillObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillBars.forEach(bar => {
                        // Use getAttribute('data-progress') instead of dataset.progress as it might not be set in the initial structure
                        const progress = bar.getAttribute('data-progress');
                        bar.style.setProperty('width', `${progress}%`);
                    });
                    observer.unobserve(skillSection);
                }
            });
        }, skillObserverOptions);

        skillObserver.observe(skillSection);
    }


    // --- 8. Reading Progress Indicator ---
    const progressBar = document.getElementById('reading-progress-indicator');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            if (window.getComputedStyle(progressBar.parentNode).display !== 'none' && window.innerWidth > 768) {
                const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
                const scrolled = document.documentElement.scrollTop;
                // Ensure scrollTotal is not zero to prevent division by zero
                const progress = scrollTotal > 0 ? (scrolled / scrollTotal) * 100 : 0; 
                
                // Directly set the CSS variable or inject the style (simplifying the style injection)
                const styleElement = document.getElementById('progress-style') || document.createElement('style');
                styleElement.id = 'progress-style';
                styleElement.innerHTML = `#reading-progress-indicator::after { height: ${progress}%; }`;
                document.head.appendChild(styleElement);
            }
        });
    }
});