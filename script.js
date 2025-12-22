// Main JavaScript for Gaming Website

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initParticles();
    initHeaderEffects();
    initAnimations();
    initGamesSlider();
    initCounters();
    initNewsletter();
    initBackToTop();
    initInteractiveElements();
    
    // Check for reduced motion preference
    checkMotionPreference();
});

// Particles Background
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 50;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 5 + 2}px;
            height: ${Math.random() * 5 + 2}px;
            background: var(--primary-color);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.3 + 0.1};
        `;
        container.appendChild(particle);
        particles.push({
            element: particle,
            x: Math.random() * 100,
            y: Math.random() * 100,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 5 + 2
        });
    }
    
    // Animate particles
    function animateParticles() {
        particles.forEach(p => {
            p.x = (p.x + p.speedX) % 100;
            p.y = (p.y + p.speedY) % 100;
            
            p.element.style.left = `${p.x}%`;
            p.element.style.top = `${p.y}%`;
            
            // Add floating effect
            const float = Math.sin(Date.now() * 0.001 + p.x) * 10;
            p.element.style.transform = `translateY(${float}px)`;
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

// Header Scroll Effects
function initHeaderEffects() {
    const header = document.getElementById('mainHeader');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class for background change
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Search toggle
    const searchBtn = document.getElementById('searchBtn');
    const searchBox = document.getElementById('searchBox');
    
    if (searchBtn && searchBox) {
        searchBtn.addEventListener('click', function() {
            searchBox.classList.toggle('active');
            if (searchBox.classList.contains('active')) {
                searchBox.querySelector('input').focus();
            }
        });
        
        // Close search when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchBox.contains(e.target) && !searchBtn.contains(e.target)) {
                searchBox.classList.remove('active');
            }
        });
    }
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Initialize animations
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.game-card, .tournament-card, .news-card').forEach(el => {
        observer.observe(el);
    });
}

// Games Slider
function initGamesSlider() {
    const slider = document.getElementById('gamesSlider');
    if (!slider) return;
    
    const track = slider.querySelector('.slider-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    const games = [
        {
            id: 1,
            title: 'Cyberpunk 2077',
            category: 'rpg',
            image: 'assets/images/game1.jpg',
            rating: 4.8,
            players: '2.4M',
            tags: ['RPG', 'Open World', 'Futuristic']
        },
        // Add more games...
    ];
    
    // Create game cards
    games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.setAttribute('data-category', game.category);
        card.innerHTML = `
            <div class="game-image">
                <span class="game-rating">${game.rating}</span>
                <span class="game-category">${game.tags[0]}</span>
            </div>
            <div class="game-content">
                <h3 class="game-title">${game.title}</h3>
                <div class="game-meta">
                    <span class="meta-item">
                        <i class="fas fa-users"></i>
                        ${game.players}
                    </span>
                    <span class="meta-item">
                        <i class="fas fa-tag"></i>
                        ${game.tags.join(', ')}
                    </span>
                </div>
                <button class="game-action">
                    <i class="fas fa-play"></i>
                    Play Now
                </button>
            </div>
        `;
        track.appendChild(card);
    });
    
    // Slider functionality
    let position = 0;
    const cardWidth = 300;
    const gap = 20;
    const visibleCards = Math.floor(slider.clientWidth / (cardWidth + gap));
    
    nextBtn.addEventListener('click', () => {
        const maxPosition = -(games.length - visibleCards) * (cardWidth + gap);
        position = Math.max(position - (cardWidth + gap), maxPosition);
        track.style.transform = `translateX(${position}px)`;
        updateButtons();
    });
    
    prevBtn.addEventListener('click', () => {
        position = Math.min(position + (cardWidth + gap), 0);
        track.style.transform = `translateX(${position}px)`;
        updateButtons();
    });
    
    function updateButtons() {
        const maxPosition = -(games.length - visibleCards) * (cardWidth + gap);
        prevBtn.disabled = position >= 0;
        nextBtn.disabled = position <= maxPosition;
    }
    
    // Category filtering
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.dataset.category;
            const cards = document.querySelectorAll('.game-card');
            
            cards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Animated counters
function initCounters() {
    const counters = document.querySelectorAll('.stat-value');
    
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.count);
        const suffix = counter.dataset.suffix || '';
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + suffix;
            }
        };
        
        // Start when visible
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.unobserve(counter);
            }
        });
        
        observer.observe(counter);
    });
}

// Newsletter form
function initNewsletter() {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // Simulate API call
        const submitBtn = this.querySelector('button');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <span>Successfully subscribed! Check your email for confirmation.</span>
            `;
            
            form.parentNode.insertBefore(successMsg, form.nextSibling);
            form.reset();
            
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMsg.remove();
            }, 5000);
        }, 1500);
    });
}

// Back to top button
function initBackToTop() {
    const backBtn = document.getElementById('backToTop');
    if (!backBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backBtn.classList.add('visible');
        } else {
            backBtn.classList.remove('visible');
        }
    });
    
    backBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Interactive elements
function initInteractiveElements() {
    // Tournament join buttons
    const joinBtns = document.querySelectorAll('.tournament-join');
    joinBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tournament = this.closest('.tournament-card');
            const title = tournament.querySelector('.tournament-title').textContent;
            
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Joining...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i> Joined!';
                this.classList.add('joined');
                
                // Show success notification
                showNotification(`Successfully joined ${title}!`);
            }, 1000);
        });
    });
    
    // Game action buttons
    const gameActions = document.querySelectorAll('.game-action');
    gameActions.forEach(btn => {
        btn.addEventListener('click', function() {
            const game = this.closest('.game-card');
            const title = game.querySelector('.game-title').textContent;
            
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            
            setTimeout(() => {
                // Simulate game launch
                showNotification(`Launching ${title}...`);
                this.innerHTML = '<i class="fas fa-play"></i> Play Now';
            }, 2000);
        });
    });
}

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--card-bg);
        color: white;
        padding: 15px 20px;
        border-radius: var(--border-radius-md);
        display: flex;
        align-items: center;
        gap: 15px;
        z-index: 9999;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        border-left: 4px solid ${type === 'success' ? 'var(--success-color)' : 'var(--danger-color)'};
        transform: translateX(150%);
        transition: transform 0.3s ease;
    `;
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(150%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(150%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Check reduced motion preference
function checkMotionPreference() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // Disable animations
        document.body.classList.add('reduce-motion');
    }
}

// Responsive adjustments
window.addEventListener('resize', function() {
    // Reinitialize slider on resize
    initGamesSlider();
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Service Worker for PWA (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(
            registration => {
                console.log('ServiceWorker registration successful');
            },
            err => {
                console.log('ServiceWorker registration failed: ', err);
            }
        );
    });
}