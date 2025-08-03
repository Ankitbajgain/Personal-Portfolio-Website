// Performance optimization flags
let isScrolling = false;
let isAnimating = false;
let ticking = false;

// Initialize AOS (Animate On Scroll) Library with enhanced settings
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 120,
        easing: 'ease-out-cubic',
        disable: false, // Enable on all devices for better experience
        mirror: false,
        anchorPlacement: 'top-bottom'
    });
    
    // Add stagger animation for skill boxes
    const skillBoxes = document.querySelectorAll('.skills .box');
    skillBoxes.forEach((box, index) => {
        box.setAttribute('data-aos-delay', (index + 1) * 100);
    });
    
    // Add pulse animation to icons on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-pulse');
                setTimeout(() => {
                    entry.target.classList.remove('animate-pulse');
                }, 1000);
            }
        });
    }, observerOptions);
    
    // Observe all icons
    document.querySelectorAll('.icon i').forEach(icon => {
        observer.observe(icon);
    });
    
    // Add magnetic hover effect to buttons
    const buttons = document.querySelectorAll('button, .btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add parallax effect to floating shapes
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // Add typing animation enhancement
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        typewriterElement.addEventListener('animationend', function() {
            this.style.borderRight = '2px solid transparent';
        });
    }
    
    // Add smooth count animation for experience numbers
    const counters = document.querySelectorAll('.counter');
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;
                
                const updateCount = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCount();
                countObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.7 });
    
    counters.forEach(counter => {
        countObserver.observe(counter);
    });
});

// Optimized Loading Screen
window.addEventListener('load', function() {
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            // Clean up will-change properties
            document.querySelectorAll('.loader-text, .loader-circle').forEach(el => {
                el.style.willChange = 'auto';
            });
        }, 400);
    }, 1200);
});

// Optimized Custom Cursor (Desktop only)
if (window.innerWidth > 768) {
    const cursor = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let outlineX = 0, outlineY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Use requestAnimationFrame for smooth cursor movement
    function animateCursor() {
        // Smooth cursor dot movement
        cursorX += (mouseX - cursorX) * 0.9;
        cursorY += (mouseY - cursorY) * 0.9;
        
        // Smooth cursor outline movement (slightly delayed)
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Optimized cursor effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .skill-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (!isAnimating) {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.3)';
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.2)';
            }
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%)';
            cursorOutline.style.transform = 'translate(-50%, -50%)';
        });
    });
}

// Optimized Sticky Navigation and Scroll Button
let nav = document.querySelector("nav");
let scrollBtn = document.querySelector(".scroll-button a");

function updateNavigation() {
    if (window.scrollY > 20) {
        nav.classList.add("sticky");
        if (scrollBtn) {
            scrollBtn.classList.add("show");
            scrollBtn.style.display = "flex";
        }
    } else {
        nav.classList.remove("sticky");
        if (scrollBtn) {
            scrollBtn.classList.remove("show");
            scrollBtn.style.display = "none";
        }
    }
}

// Throttled scroll handler for better performance
function handleScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateNavigation();
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', handleScroll, { passive: true });

// Side Navigation Menu
let body = document.querySelector("body");
let navBar = document.querySelector(".navbar");
let menuBtn = document.querySelector(".menu-btn");
let cancelBtn = document.querySelector(".cancel-btn");

if (menuBtn) {
    menuBtn.addEventListener('click', function() {
        navBar.classList.add("active");
        menuBtn.style.opacity = "0";
        menuBtn.style.pointerEvents = "none";
        body.style.overflow = "hidden";
        if (scrollBtn) scrollBtn.style.pointerEvents = "none";
    });
}

if (cancelBtn) {
    cancelBtn.addEventListener('click', function() {
        navBar.classList.remove("active");
        menuBtn.style.opacity = "1";
        menuBtn.style.pointerEvents = "auto";
        body.style.overflow = "auto";
        if (scrollBtn) scrollBtn.style.pointerEvents = "auto";
    });
}

// Close mobile navigation when clicking on navigation links
let navLinks = document.querySelectorAll(".menu li a");
navLinks.forEach(link => {
    link.addEventListener("click", function() {
        navBar.classList.remove("active");
        if (menuBtn) {
            menuBtn.style.opacity = "1";
            menuBtn.style.pointerEvents = "auto";
        }
        body.style.overflow = "auto";
    });
});

// Optimized Typewriter Effect
function typeWriter(element, text, speed = 120) {
    if (!element) return;
    
    let i = 0;
    element.innerHTML = '';
    element.classList.add('animating');
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            element.classList.remove('animating');
            element.classList.add('animation-complete');
        }
    }
    type();
}

// Initialize typewriter effect when page loads
window.addEventListener('load', function() {
    setTimeout(() => {
        const typewriterElement = document.querySelector('.typewriter');
        if (typewriterElement) {
            typeWriter(typewriterElement, 'Ankit Bajgain', 130);
        }
    }, 1800);
});

// Optimized Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        if (counter.dataset.animated) return; // Prevent re-animation
        
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 1500;
        const startTime = performance.now();
        
        counter.dataset.animated = 'true';
        counter.classList.add('animating');
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(target * easeOutQuart(progress));
            counter.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.classList.remove('animating');
                counter.classList.add('animation-complete');
            }
        }
        
        requestAnimationFrame(updateCounter);
    });
}

// Easing function for smoother animation
function easeOutQuart(t) {
    return 1 - (--t) * t * t * t;
}

// Optimized Skill Bar Animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        if (bar.dataset.animated) return; // Prevent re-animation
        
        const width = bar.getAttribute('data-width');
        bar.dataset.animated = 'true';
        bar.classList.add('animating');
        
        setTimeout(() => {
            bar.style.width = width;
            setTimeout(() => {
                bar.classList.remove('animating');
                bar.classList.add('animation-complete');
            }, 1500);
        }, index * 150); // Stagger animation
    });
}

// Optimized Intersection Observer
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -30px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('skills')) {
                animateCounters();
                animateSkillBars();
            }
        }
    });
}, observerOptions);

// Observe sections
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    observer.observe(section);
});

// Contact Modal Functions
function openContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.classList.add('active');
        body.style.overflow = 'hidden';
    }
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.classList.remove('active');
        body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('contactModal');
    if (e.target === modal) {
        closeContactModal();
    }
});

// Initialize EmailJS
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your public key
    emailjs.init("EE339AKtUMm9zDXfV");
});

// Contact Form Submission with EmailJS
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[name="name"]').value;
        const email = contactForm.querySelector('input[name="email"]').value;
        const subject = contactForm.querySelector('input[name="subject"]').value;
        const message = contactForm.querySelector('textarea[name="message"]').value;
        
        // Validate form
        if (!name || !email || !subject || !message) {
            showToast('Please fill in all fields', 'error');
            return;
        }
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
        submitBtn.disabled = true;
        
        // Send email using EmailJS
        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
            to_email: 'bajgainankit@gmail.com'
        };
        
        emailjs.send('service_pb5qpuq', 'template_dgbye78', templateParams)
            .then(function(response) {
                console.log('Email sent successfully:', response);
                submitBtn.innerHTML = '<i class="fas fa-check"></i> <span>Message Sent!</span>';
                showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
                
                setTimeout(() => {
                    closeContactModal();
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            })
            .catch(function(error) {
                console.error('Email sending failed:', error);
                submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> <span>Failed to Send</span>';
                showToast('Failed to send message. Please try again or contact me directly.', 'error');
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            });
    });
}

// Contact Information Click Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Email click to open email client functionality
    const emailItem = document.querySelector('.contact-item .fa-envelope');
    if (emailItem) {
        const emailParent = emailItem.closest('.contact-item');
        const emailValue = emailParent.querySelector('.value');
        
        emailParent.style.cursor = 'pointer';
        emailParent.addEventListener('click', function(e) {
            const email = 'bajgainankit@gmail.com';
            const subject = 'Hello from Portfolio Website';
            const body = 'Hi Ankit,%0D%0A%0D%0AI visited your portfolio and would like to connect.%0D%0A%0D%0ABest regards,';
            
            // Try to open default email client first
            const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${body}`;
            
            try {
                window.location.href = mailtoLink;
                showToast('Opening email client...');
            } catch (error) {
                // Fallback to Gmail web interface
                const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${body}`;
                window.open(gmailLink, '_blank');
                showToast('Opening Gmail...');
            }
        });
        
        // Right-click for additional options
        emailParent.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            showEmailOptions(e.pageX, e.pageY);
        });
    }
    
    // Phone click functionality - call on mobile, copy on desktop
    const phoneItem = document.querySelector('.contact-item .fa-phone');
    if (phoneItem) {
        const phoneParent = phoneItem.closest('.contact-item');
        phoneParent.style.cursor = 'pointer';
        phoneParent.addEventListener('click', function() {
            const phone = '+977 9862133032';
            
            // Check if user is on mobile device
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                            (navigator.maxTouchPoints && navigator.maxTouchPoints > 1);
            
            if (isMobile) {
                // On mobile: Open phone dialer
                window.location.href = `tel:${phone}`;
                showToast('Opening phone dialer...');
            } else {
                // On desktop: Copy to clipboard
                navigator.clipboard.writeText(phone).then(() => {
                    showToast('Phone number copied to clipboard!');
                }).catch(() => {
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = phone;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    showToast('Phone number copied to clipboard!');
                });
            }
        });
        
        // Right-click for additional options (desktop only)
        phoneParent.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            showPhoneOptions(e.pageX, e.pageY);
        });
    }
    
    // LinkedIn click functionality (already has link)
    const linkedinItem = document.querySelector('.contact-item .fa-linkedin');
    if (linkedinItem) {
        const linkedinParent = linkedinItem.closest('.contact-item');
        linkedinParent.style.cursor = 'pointer';
    }
});

// Phone options menu
function showPhoneOptions(x, y) {
    // Remove existing menu if any
    const existingMenu = document.querySelector('.phone-options-menu');
    if (existingMenu) {
        existingMenu.remove();
    }
    
    const menu = document.createElement('div');
    menu.className = 'phone-options-menu';
    menu.style.cssText = `
        position: fixed;
        top: ${y}px;
        left: ${x}px;
        background: white;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10002;
        padding: 8px 0;
        min-width: 200px;
        font-family: 'Inter', sans-serif;
    `;
    
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                    (navigator.maxTouchPoints && navigator.maxTouchPoints > 1);
    
    const options = [
        {
            icon: 'fas fa-phone',
            text: isMobile ? 'Call Now' : 'Call (Mobile Only)',
            action: () => {
                const phone = '+977 9862133032';
                if (isMobile) {
                    window.location.href = `tel:${phone}`;
                    showToast('Opening phone dialer...');
                } else {
                    showToast('Calling feature available on mobile devices');
                }
            }
        },
        {
            icon: 'fab fa-whatsapp',
            text: 'WhatsApp',
            action: () => {
                const phone = '9779862133032'; // WhatsApp format without +
                const message = 'Hello Ankit, I visited your portfolio and would like to connect.';
                const whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
                window.open(whatsappLink, '_blank');
                showToast('Opening WhatsApp...');
            }
        },
        {
            icon: 'fas fa-copy',
            text: 'Copy Phone Number',
            action: () => {
                const phone = '+977 9862133032';
                navigator.clipboard.writeText(phone).then(() => {
                    showToast('Phone number copied to clipboard!');
                }).catch(() => {
                    const textArea = document.createElement('textarea');
                    textArea.value = phone;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    showToast('Phone number copied to clipboard!');
                });
            }
        }
    ];
    
    options.forEach(option => {
        const item = document.createElement('div');
        item.style.cssText = `
            padding: 12px 16px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 12px;
            transition: background-color 0.2s ease;
            font-size: 14px;
            color: #333;
        `;
        
        item.innerHTML = `<i class="${option.icon}" style="width: 16px;"></i> ${option.text}`;
        
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f5f5f5';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
        });
        
        item.addEventListener('click', function() {
            option.action();
            menu.remove();
        });
        
        menu.appendChild(item);
    });
    
    document.body.appendChild(menu);
    
    // Close menu when clicking elsewhere
    setTimeout(() => {
        document.addEventListener('click', function closeMenu() {
            if (menu.parentNode) {
                menu.remove();
            }
            document.removeEventListener('click', closeMenu);
        });
    }, 100);
}

// Email options menu
function showEmailOptions(x, y) {
    // Remove existing menu if any
    const existingMenu = document.querySelector('.email-options-menu');
    if (existingMenu) {
        existingMenu.remove();
    }
    
    const menu = document.createElement('div');
    menu.className = 'email-options-menu';
    menu.style.cssText = `
        position: fixed;
        top: ${y}px;
        left: ${x}px;
        background: white;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10002;
        padding: 8px 0;
        min-width: 200px;
        font-family: 'Inter', sans-serif;
    `;
    
    const options = [
        {
            icon: 'fas fa-envelope',
            text: 'Default Email Client',
            action: () => {
                const email = 'bajgainankit@gmail.com';
                const subject = 'Hello from Portfolio Website';
                const body = 'Hi Ankit,%0D%0A%0D%0AI visited your portfolio and would like to connect.%0D%0A%0D%0ABest regards,';
                const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${body}`;
                window.location.href = mailtoLink;
                showToast('Opening default email client...');
            }
        },
        {
            icon: 'fab fa-google',
            text: 'Gmail Web',
            action: () => {
                const email = 'bajgainankit@gmail.com';
                const subject = 'Hello from Portfolio Website';
                const body = 'Hi Ankit,%0D%0A%0D%0AI visited your portfolio and would like to connect.%0D%0A%0D%0ABest regards,';
                const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${body}`;
                window.open(gmailLink, '_blank');
                showToast('Opening Gmail...');
            }
        },
        {
            icon: 'fas fa-copy',
            text: 'Copy Email Address',
            action: () => {
                const email = 'bajgainankit@gmail.com';
                navigator.clipboard.writeText(email).then(() => {
                    showToast('Email copied to clipboard!');
                }).catch(() => {
                    const textArea = document.createElement('textarea');
                    textArea.value = email;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    showToast('Email copied to clipboard!');
                });
            }
        }
    ];
    
    options.forEach(option => {
        const item = document.createElement('div');
        item.style.cssText = `
            padding: 12px 16px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 12px;
            transition: background-color 0.2s ease;
            font-size: 14px;
            color: #333;
        `;
        
        item.innerHTML = `<i class="${option.icon}" style="width: 16px;"></i> ${option.text}`;
        
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f5f5f5';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
        });
        
        item.addEventListener('click', function() {
            option.action();
            menu.remove();
        });
        
        menu.appendChild(item);
    });
    
    document.body.appendChild(menu);
    
    // Close menu when clicking elsewhere
    setTimeout(() => {
        document.addEventListener('click', function closeMenu() {
            if (menu.parentNode) {
                menu.remove();
            }
            document.removeEventListener('click', closeMenu);
        });
    }, 100);
}

// Toast notification function
function showToast(message, type = 'success') {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    
    const iconClass = type === 'error' ? 'fas fa-exclamation-circle' : 'fas fa-check-circle';
    const bgColor = type === 'error' ? 
        'linear-gradient(135deg, #dc3545 0%, #c82333 100%)' : 
        'linear-gradient(135deg, #161d23 0%, #0f444c 100%)';
    
    toast.innerHTML = `
        <i class="${iconClass}"></i>
        <span>${message}</span>
    `;
    
    // Add toast styles
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10001;
        display: flex;
        align-items: center;
        gap: 8px;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after duration based on type
    const duration = type === 'error' ? 5000 : 3000;
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, duration);
}

// Optimized Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Reduced Parallax Effect (only on desktop for performance)
if (window.innerWidth > 768) {
    let parallaxTicking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        // Reduced parallax intensity for better performance
        shapes.forEach((shape, index) => {
            const speed = 0.2 + (index * 0.05);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        parallaxTicking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!parallaxTicking) {
            requestAnimationFrame(updateParallax);
            parallaxTicking = true;
        }
    }, { passive: true });
}

// Optimized Dynamic Text Effect
const dynamicTexts = [
    "Software Engineer",
    "Web Developer", 
    "Problem Solver",
    "Creative Thinker"
];

let textIndex = 0;
const professionText = document.querySelector('.profession-text');

function changeText() {
    if (professionText) {
        professionText.style.opacity = '0';
        setTimeout(() => {
            textIndex = (textIndex + 1) % dynamicTexts.length;
            professionText.textContent = dynamicTexts[textIndex];
            professionText.style.opacity = '1';
        }, 250);
    }
}

// Change text every 4 seconds (reduced frequency)
setInterval(changeText, 4000);

// Performance monitoring and cleanup
window.addEventListener('beforeunload', function() {
    // Clean up any ongoing animations
    document.querySelectorAll('.animating').forEach(el => {
        el.style.willChange = 'auto';
    });
});

// Disable animations on slow devices
if (navigator.hardwareConcurrency <= 2) {
    document.documentElement.style.setProperty('--transition-fast', 'none');
    document.documentElement.style.setProperty('--transition-smooth', 'none');
    document.documentElement.style.setProperty('--transition-slow', 'none');
}
