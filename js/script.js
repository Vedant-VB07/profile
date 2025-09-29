/* --- PRELOADER HIDING LOGIC (NEW) --- */
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Use a slight delay (500ms) to ensure the animation is seen for a moment
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 500); 
    }
});


// 1. Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

/* =======================================================
    COLOR CHANGER (GSAP ScrollTrigger) 
    ======================================================= */
const initColorChanger = () => {
    const scrollColorElems = document.querySelectorAll(".content-section[data-bgcolor]");
    const contentArea = document.getElementById('content-area');

    if (!contentArea) return;
    
    // Get the initial background and text color from the content area's CSS
    const initialBg = window.getComputedStyle(contentArea).backgroundColor;
    const initialText = window.getComputedStyle(document.body).color;


    scrollColorElems.forEach((colorSection, i) => {
        // Determine the color of the previous section for the transition back
        const prevBg = i === 0 ? initialBg : scrollColorElems[i - 1].dataset.bgcolor;
        const prevText = i === 0 ? initialText : scrollColorElems[i - 1].dataset.textcolor;

        ScrollTrigger.create({
            trigger: colorSection,
            // Trigger animation when the top of the section enters the middle of the viewport
            start: "top 50%", 
            
            // Animate content area background & body text color when entering the section
            onEnter: () => {
                // Animate the translucent background (contentArea)
                gsap.to(contentArea, {
                    backgroundColor: colorSection.dataset.bgcolor,
                    duration: 0.5,
                    overwrite: "auto"
                });
                // Animate the text color (body)
                gsap.to("body", {
                    color: colorSection.dataset.textcolor,
                    duration: 0.5,
                    overwrite: "auto"
                });
            },
            
            // Animate back when scrolling up
            onLeaveBack: () => {
                 // Animate the translucent background (contentArea)
                gsap.to(contentArea, {
                    backgroundColor: prevBg,
                    duration: 0.5,
                    overwrite: "auto"
                });
                // Animate the text color (body)
                gsap.to("body", {
                    color: prevText,
                    duration: 0.5,
                    overwrite: "auto"
                });
            }
        });
    });
};


/* =======================================================
    EXISTING SCRIPTS (Re-organized)
    ======================================================= */
document.addEventListener('DOMContentLoaded', () => {
    
    // 💥 0. INITIALIZE PARTICLES.JS (MOVED HERE FOR RELIABILITY) 💥
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80, // Number of particles
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#00bcd4" // Primary accent color (Cyan)
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 1.0, /* 🔥 MAX OPACITY */
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ff9100", // Secondary accent color for lines (Orange)
                    "opacity": 0.9, /* 🔥 NEAR MAX OPACITY */
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse" // Particles push away when cursor hovers
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push" // New particles appear when clicked
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 400,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

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
                        // This will set the width to '100%' based on the HTML attribute
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
                const progress = scrollTotal > 0 ? (scrolled / scrollTotal) * 100 : 0; 
                
                const styleElement = document.getElementById('progress-style') || document.createElement('style');
                styleElement.id = 'progress-style';
                styleElement.innerHTML = `#reading-progress-indicator::after { height: ${progress}%; }`;
                document.head.appendChild(styleElement);
            }
        });
    }
});