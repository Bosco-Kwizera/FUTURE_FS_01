// Mobile menu functionality
(function() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked (mobile only)
    navLinksItems.forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Contact form validation and feedback
    const contactForm = document.getElementById('contactForm');
    const feedbackEl = document.getElementById('formFeedback');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                feedbackEl.textContent = '⚠️ All fields are required.';
                feedbackEl.style.color = '#ef4444';
                return;
            }
            
            if (!email.includes('@') || !email.includes('.')) {
                feedbackEl.textContent = '⚠️ Please enter a valid email.';
                feedbackEl.style.color = '#ef4444';
                return;
            }

            feedbackEl.textContent = '✅ Thanks for reaching out! I\'ll reply soon.';
            feedbackEl.style.color = '#3b82f6';
            contactForm.reset();
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === "#" || href === "") return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Update active nav link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavLink() {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinksItems.forEach(link => {
                    link.style.color = '#9ca3af';
                    link.classList.remove('active');
                });
                if (navLink) {
                    navLink.style.color = '#3b82f6';
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Call once on page load

    // REMOVED: The 3D tilt effect for cards (lines 88-105 were removed)
})();