/**
 * PORTAFOLIO SPA - SCRIPT.JS
 * Vanilla JavaScript interactions for a modern Single Page Application.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Dynamic Current Year in Footer
    // ==========================================
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ==========================================
    // 2. Sticky Navbar Effect
    // ==========================================
    const navbar = document.getElementById('navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    // Initial check in case page is loaded midway down
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    // ==========================================
    // 3. Intersection Observer for Scroll Animations
    // ==========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add class to trigger CSS animation
                entry.target.classList.add('show');
                // Optional: Stop observing once shown to keep them visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => scrollObserver.observe(el));

    // ==========================================
    // 4. Smooth Scrolling for Anchor Links (Enhancement)
    // ==========================================
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just '#' or empty
            if (targetId === '#' || targetId === '') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Use fixed offset to match CSS scroll-padding and avoid dynamic height gaps
                const navOffset = 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navOffset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open when a link is clicked
                const navbarCollapse = document.getElementById('navbarNav');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    // Use Bootstrap's Collapse API
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    }
                }
            }
        });
    });

    // ==========================================
    // 5. Contact Form Handling (Simulation)
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get button and change state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Enviando...';
            submitBtn.disabled = true;
            
            // Simulate API Call / DB Connection
            // NOTE: Here is where you would put your fetch() call to the backend DB connection
            setTimeout(() => {
                // Success state
                submitBtn.classList.remove('btn-accent');
                submitBtn.classList.add('btn-success');
                submitBtn.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>¡Mensaje Enviado!';
                
                // Reset form
                contactForm.reset();
                
                // Revert button after 3 seconds
                setTimeout(() => {
                    submitBtn.classList.remove('btn-success');
                    submitBtn.classList.add('btn-accent');
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 3000);
                
            }, 1500); // Simulated network delay
        });
    }

    // ==========================================
    // 6. Manual Navigation Highlight (Intersection Observer)
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinksList = document.querySelectorAll('.nav-link');

    const highlightMenu = () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const navHeight = navbar.offsetHeight + 100;

            if (window.scrollY >= (sectionTop - navHeight)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinksList.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', highlightMenu);
    highlightMenu(); // Initial call

    // ==========================================
    // 7. Dynamic Pixel Particles Generation (Hero)
    // ==========================================
    const particleContainer = document.getElementById('particle-container');
    if (particleContainer) {
        const particleCount = 80; // Cantidad masiva de partículas
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('span');
            particle.className = 'pixel-particle';
            
            // Random values for a varied explosion effect
            const angle = Math.random() * Math.PI * 2;
            const distance = 150 + Math.random() * 200;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            const size = 8 + Math.random() * 8; // Aumentado de 4-10 a 8-16
            const duration = 2 + Math.random() * 3;
            const delay = Math.random() * 4;
            const rot = Math.random() * 360;
            
            // Apply variables to CSS
            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);
            particle.style.setProperty('--p-size', `${size}px`);
            particle.style.setProperty('--p-duration', `${duration}s`);
            particle.style.setProperty('--p-delay', `${delay}s`);
            particle.style.setProperty('--p-rot', `${rot}deg`);
            
            particleContainer.appendChild(particle);
        }
    }

});
