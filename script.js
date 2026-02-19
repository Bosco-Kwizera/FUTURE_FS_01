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

            // Success message
            feedbackEl.textContent = '✅ Thanks for reaching out! I\'ll reply soon.';
            feedbackEl.style.color = '#3b82f6';
            
            // Open email client with pre-filled message (optional)
            const userConfirmed = confirm('Would you like to send this message via email? (Click Cancel to just see the success message)');
            
            if (userConfirmed) {
                const subject = `Portfolio Contact from ${name}`;
                const body = `Name: ${name}%0A%0AEmail: ${email}%0A%0AMessage: ${message}`;
                window.location.href = `mailto:kbosco891@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
            }
            
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

    // Track CV downloads
    const cvButtons = document.querySelectorAll('.cv-btn, .contact-cv .btn');
    cvButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('CV accessed');
            // You can add Google Analytics tracking here later
        });
    });

    // Make phone numbers clickable on mobile
    const phoneLink = document.querySelector('a[href="tel:+250788882069"]');
    if (phoneLink) {
        phoneLink.addEventListener('click', function(e) {
            // Only prevent default on non-mobile devices
            if (window.innerWidth > 768) {
                e.preventDefault();
                alert('📱 Phone: +250 788882069\n💬 WhatsApp: https://wa.me/250788882069');
            }
        });
    }

    // Project Images Carousel
    const carouselSlides = document.getElementById('carouselSlides');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.indicator');
    
    if (carouselSlides && prevBtn && nextBtn && indicators.length > 0) {
        let currentIndex = 0;
        const totalSlides = document.querySelectorAll('.carousel-slide').length;
        let autoSlideInterval;
        
        // Function to update carousel position
        function updateCarousel(index) {
            // Ensure index is within bounds
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;
            
            // Update slide position
            carouselSlides.style.transform = `translateX(-${index * 100}%)`;
            currentIndex = index;
            
            // Update indicators
            indicators.forEach((indicator, i) => {
                if (i === currentIndex) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }
        
        // Next slide
        function nextSlide() {
            updateCarousel(currentIndex + 1);
        }
        
        // Previous slide
        function prevSlide() {
            updateCarousel(currentIndex - 1);
        }
        
        // Start auto sliding
        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
        }
        
        // Stop auto sliding
        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }
        
        // Event listeners for buttons
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            startAutoSlide(); // Restart timer after manual navigation
        });
        
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            startAutoSlide(); // Restart timer after manual navigation
        });
        
        // Event listeners for indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                updateCarousel(index);
                stopAutoSlide();
                startAutoSlide(); // Restart timer after manual navigation
            });
        });
        
        // Pause auto-slide when hovering over carousel
        const carouselContainer = document.querySelector('.carousel-container');
        carouselContainer.addEventListener('mouseenter', stopAutoSlide);
        carouselContainer.addEventListener('mouseleave', startAutoSlide);
        
        // Start auto sliding
        startAutoSlide();
        
        // Touch support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        carouselContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoSlide();
        }, { passive: true });
        
        carouselContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoSlide();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left - next slide
                nextSlide();
            } else if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right - previous slide
                prevSlide();
            }
        }
    }
})();