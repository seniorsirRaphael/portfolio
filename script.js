// DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');

// Navigation scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    const icon = mobileMenuBtn.querySelector('i');
    
    if (navMenu.classList.contains('show')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        navMenu.style.display = 'flex';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.background = 'white';
        navMenu.style.flexDirection = 'column';
        navMenu.style.padding = '1rem';
        navMenu.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        navMenu.style.borderRadius = '0 0 0.5rem 0.5rem';
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        navMenu.style.display = 'none';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            // Close mobile menu if open
            if (navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
                navMenu.style.display = 'none';
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            }
            
            // Smooth scroll to target
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Contact form handling
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
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Create WhatsApp message
        const whatsappMessage = `Hello! I'm ${data.name}.\n\nService needed: ${data.service}\n\nMessage: ${data.message}\n\nEmail: ${data.email}`;
        const whatsappUrl = `https://wa.me/254757319350?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Open WhatsApp after a short delay
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
        }, 2000);
        
    } catch (error) {
        console.error('Form submission error:', error);
        showToast('Failed to send message. Please try again.', 'error');
    } finally {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

// Toast notification function
function showToast(message, type = 'success') {
    const toastMessage = toast.querySelector('.toast-message');
    const toastIcon = toast.querySelector('.toast-icon');
    
    // Set message
    toastMessage.textContent = message;
    
    // Set icon based on type
    if (type === 'success') {
        toastIcon.className = 'fas fa-check-circle toast-icon';
        toast.style.background = '#10b981';
    } else if (type === 'error') {
        toastIcon.className = 'fas fa-exclamation-circle toast-icon';
        toast.style.background = '#ef4444';
    }
    
    // Show toast
    toast.classList.add('show');
    
    // Hide toast after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
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
document.querySelectorAll('.service-card, .about-card, .testimonial-card, .contact-card').forEach(el => {
    observer.observe(el);
});

// Service card expand/collapse functionality
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
        const features = card.querySelector('.service-features');
        const isExpanded = features.style.display === 'block';
        
        // Toggle visibility
        if (isExpanded) {
            features.style.display = 'none';
            card.style.height = 'auto';
        } else {
            features.style.display = 'block';
            card.style.height = 'auto';
        }
    });
});

// Portfolio stats counter animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
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
            const targets = [500, 1000, 50, 24]; // Corresponding to the stats
            
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
    document.querySelector('.footer-bottom p').innerHTML = 
        `&copy; ${currentYear} SeniorSirRaphael. All rights reserved.`;
});

// Lazy loading for images (if any are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        if (navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
            navMenu.style.display = 'none';
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        }
        
        // Hide toast
        if (toast.classList.contains('show')) {
            toast.classList.remove('show');
        }
    }
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
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active navigation link highlighting
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}, 10);

// Replace the original scroll event listener
window.removeEventListener('scroll', () => {}); // Remove if exists
window.addEventListener('scroll', debouncedScrollHandler);

// Console log for debugging
console.log('SeniorSirRaphael website loaded successfully!');
console.log('Contact: siraphaelmwendwa@gmail.com | +254 757 319 350');
