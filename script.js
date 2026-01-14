// script.js - Regenerated for Bootstrap Integration

// DOM Elements
const navbar = document.getElementById('mainNav');
const mobileMenuBtn = document.querySelector('.navbar-toggler');
const contactForm = document.getElementById('contactForm');
const toastEl = document.getElementById('toast');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

// Initialize Bootstrap Components
let bootstrapToast = null;

// Initialize Bootstrap Toast if it exists
if (toastEl) {
    bootstrapToast = new bootstrap.Toast(toastEl, {
        delay: 5000,
        animation: true
    });
}

// Navigation scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('scrolled');
        navbar.classList.remove('navbar-scrolled');
    }
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            // Close mobile menu if open
            const navbarCollapse = document.getElementById('navbarNav');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
            
            // Smooth scroll to target
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update URL without page reload
            history.pushState(null, null, `#${target.id}`);
        }
    });
});

// Contact form handling
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            service: formData.get('service'),
            message: formData.get('message')
        };
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            // Simulate form submission (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            showBootstrapToast('Message sent successfully! I\'ll get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Create WhatsApp message (optional)
            if (data.service && data.message) {
                const whatsappMessage = `Hello Raphael! I'm ${data.name}.\n\nService needed: ${data.service}\n\nMessage: ${data.message}\n\nEmail: ${data.email}`;
                const whatsappUrl = `https://wa.me/254757319350?text=${encodeURIComponent(whatsappMessage)}`;
                
                // Ask user if they want to open WhatsApp
                setTimeout(() => {
                    if (confirm('Would you like to continue this conversation on WhatsApp for faster response?')) {
                        window.open(whatsappUrl, '_blank');
                    }
                }, 1000);
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            showBootstrapToast('Failed to send message. Please try again.', 'error');
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Bootstrap Toast notification function
function showBootstrapToast(message, type = 'success') {
    if (!toastEl || !bootstrapToast) return;
    
    const toastBody = toastEl.querySelector('.toast-body');
    const toastHeader = toastEl.querySelector('.toast-header');
    
    // Set message
    if (toastBody) {
        toastBody.textContent = message;
    }
    
    // Set type/color
    if (type === 'success') {
        toastEl.querySelector('.toast-header').classList.remove('bg-danger');
        toastEl.querySelector('.toast-header').classList.add('bg-primary');
    } else if (type === 'error') {
        toastEl.querySelector('.toast-header').classList.remove('bg-primary');
        toastEl.querySelector('.toast-header').classList.add('bg-danger');
    }
    
    // Show toast
    bootstrapToast.show();
}

// Fallback custom toast function (if Bootstrap toast fails)
function showToast(message, type = 'success') {
    // Create custom toast element
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.innerHTML = `
        <div class="custom-toast-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    toast.style.position = 'fixed';
    toast.style.top = '20px';
    toast.style.right = '20px';
    toast.style.background = type === 'success' ? '#10b981' : '#ef4444';
    toast.style.color = 'white';
    toast.style.padding = '1rem 1.5rem';
    toast.style.borderRadius = '0.5rem';
    toast.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
    toast.style.zIndex = '1001';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'transform 0.3s ease';
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after 5 seconds
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .about-card, .testimonial-card, .contact-card, .portfolio-card').forEach(el => {
    observer.observe(el);
});

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
    
    // Optional: Click to expand features on mobile
    card.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            const features = card.querySelector('.service-features');
            if (features) {
                features.style.display = features.style.display === 'none' ? 'block' : 'none';
            }
        }
    });
});

// Portfolio stats counter animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const hasPlus = element.textContent.includes('+');
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = Math.floor(target) + (hasPlus ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (hasPlus ? '+' : '');
        }
    }, 16);
}

// Animate counters when portfolio section is visible
const portfolioSection = document.getElementById('portfolio');
let countersAnimated = false;

const portfolioObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
            const statNumbers = document.querySelectorAll('.stat-number');
            const targets = [500, 1000, 50, 24];
            
            statNumbers.forEach((stat, index) => {
                const target = targets[index];
                animateCounter(stat, target);
            });
            
            countersAnimated = true;
        }
    });
}, { threshold: 0.5 });

if (portfolioSection) {
    portfolioObserver.observe(portfolioSection);
}

// Dynamic year in footer
document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    const footerCopyright = document.querySelector('.footer-bottom p');
    
    if (footerCopyright) {
        footerCopyright.innerHTML = `&copy; ${currentYear} SeniorSirRaphael. All rights reserved.`;
    }
    
    // Initialize any other components
    initializePage();
});

// Initialize page
function initializePage() {
    // Add active class to home link on load
    const homeLink = document.querySelector('a[href="#home"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }
    
    // Add scroll event listener for nav highlighting
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Initialize scroll position
    updateActiveNavLink();
    
    // Add hover effect to contact cards
    document.querySelectorAll('.contact-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-3px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Handle form select styling
    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
        serviceSelect.addEventListener('change', function() {
            if (this.value) {
                this.style.color = '#1a1a1a';
            } else {
                this.style.color = '#6b7280';
            }
        });
    }
}

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        }
    });
    
    // Email validation
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput && emailInput.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailInput.classList.add('is-invalid');
            isValid = false;
        }
    }
    
    return isValid;
}

// Add form validation to contact form
if (contactForm) {
    const formInputs = contactForm.querySelectorAll('input, select, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
            }
        });
        
        input.addEventListener('input', () => {
            if (input.value.trim()) {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
            }
        });
    });
}

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Hide toast
        if (bootstrapToast) {
            bootstrapToast.hide();
        }
    }
    
    // Tab key navigation for better accessibility
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('click', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Performance optimization: Debounced scroll handler
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll handlers
const debouncedScrollHandler = debounce(() => {
    // Navigation scroll effect
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('scrolled');
        navbar.classList.remove('navbar-scrolled');
    }

    // Active navigation link highlighting
    updateActiveNavLink();
}, 10);

// Replace the original scroll event listener
window.addEventListener('scroll', debouncedScrollHandler);

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Reset counters animation if needed
        if (window.innerWidth >= 768) {
            const features = document.querySelectorAll('.service-features');
            features.forEach(feature => {
                feature.style.display = 'block';
            });
        }
    }, 250);
});

// Add CSS for keyboard navigation
const style = document.createElement('style');
style.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid #2563eb;
        outline-offset: 2px;
    }
    
    .is-valid {
        border-color: #10b981 !important;
    }
    
    .is-invalid {
        border-color: #ef4444 !important;
    }
    
    .custom-toast {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    }
    
    .custom-toast.error {
        background: #ef4444;
    }
    
    .custom-toast-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .custom-toast i {
        font-size: 1.25rem;
    }
`;
document.head.appendChild(style);

// Export WhatsApp contact function
window.openWhatsApp = function(message = '') {
    const whatsappUrl = `https://wa.me/254757319350?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
};

// Export call function
window.callNumber = function() {
    window.location.href = 'tel:+254757319350';
};

// Console log for debugging
console.log('SeniorSirRaphael website loaded successfully!');
console.log('Contact: siraphaelmwendwa@gmail.com | +254 757 319 350');

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page loaded in ${pageLoadTime}ms`);
    });
}

// Service worker registration (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(
            registration => {
                console.log('ServiceWorker registration successful');
            },
            error => {
                console.log('ServiceWorker registration failed: ', error);
            }
        );
    });
}
