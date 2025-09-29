document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-link');

    // Options for the Intersection Observer
    const options = {
        rootMargin: '0px',
        // Trigger the change when section is 20% from the top of the viewport
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.id;
            const correspondingLink = document.querySelector(`a[href="#${id}"]`);

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

    // Observe all content sections
    sections.forEach(section => {
        observer.observe(section);
    });

    // Optional: Add smooth scrolling for link clicks (modern CSS 'scroll-behavior: smooth' usually handles this)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 10, // Small offset for better visual
                    behavior: 'smooth'
                });
            }
        });
    });
});