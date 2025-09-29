document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. AOS Initialization ---
    AOS.init({
        duration: 1000,
        once: true, // Animations only happen once when scrolling down
        offset: 100 // Trigger animations sooner
    });

    // --- 2. Typed.js for Hero Section ---
    if (document.getElementById('typed-output')) {
        new Typed('#typed-output', {
            strings: [
                "I craft beautiful web experiences.",
                "I build high-performance SPAs.",
                "I am a Frontend Developer & Tech Enthusiast."
            ],
            typeSpeed: 50,
            backSpeed: 25,
            loop: true,
            startDelay: 1000,
            backDelay: 2000
        });
    }

    // --- 3. Particles.js for Hero Background ---
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#00bcd4" // Matches --color-primary
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
                    "value": 0.5,
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
                    "color": "#00bcd4", // Matches --color-primary
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 6,
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
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
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

    // --- 4. Spy-Scrolling Logic (Desktop) ---
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-link'); // Desktop links

    const options = {
        rootMargin: '-50px 0px -50% 0px', // Adjust active link when section is more in the middle
        threshold: 0.1 // When at least 10% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.id;
            const correspondingLink = document.querySelector(`#desktop-nav a[href="#${id}"]`);

            if (entry.isIntersecting) {
                // Remove 'active' class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add 'active' class to the currently visible section's link
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
    
    // --- 5. Mobile Hamburger Menu Logic ---
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


    // --- 6. Universal Smooth Scroll (for both desktop and mobile links) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Adjust scroll position to account for the fixed header on mobile or sticky elements
                const offset = window.innerWidth <= 768 ? 70 : 0; // Height of mobile header
                window.scrollTo({
                    top: targetElement.offsetTop - offset, 
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 7. Custom Glowing Cursor ---
    const customCursor = document.getElementById('custom-cursor');
    if (customCursor) {
        document.addEventListener('mousemove', (e) => {
            customCursor.style.left = e.clientX + 'px';
            customCursor.style.top = e.clientY + 'px';
        });
    }

    // --- 8. Skill Progress Bar Animation ---
    const skillBars = document.querySelectorAll('.progress-bar');
    const skillSection = document.getElementById('skills');

    if (skillSection && skillBars.length > 0) {
        const skillObserverOptions = {
            root: null, // relative to the viewport
            rootMargin: '0px',
            threshold: 0.5 // Trigger when 50% of the section is visible
        };

        const skillObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillBars.forEach(bar => {
                        const progress = bar.dataset.progress; // Get progress from data-progress attribute
                        bar.style.setProperty('--progress-width', `${progress}%`); // Set CSS variable
                        bar.classList.add('animate'); // Trigger CSS animation
                    });
                    observer.unobserve(skillSection); // Stop observing once animated
                }
            });
        }, skillObserverOptions);

        skillObserver.observe(skillSection);
    }


    // --- 9. Reading Progress Indicator ---
    const progressBar = document.getElementById('reading-progress-indicator');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = document.documentElement.scrollTop;
            const progress = (scrolled / scrollTotal) * 100;

            progressBar.style.setProperty('--progress-height', `${progress}%`);
            progressBar.querySelector('::after').style.height = `${progress}%`;
        });
    }
});