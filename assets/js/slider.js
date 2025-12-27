document.addEventListener('DOMContentLoaded', function() {
    const heroSlider = document.getElementById('heroSlider');
    const heroTrack = heroSlider.querySelector('.hero-track');
    const slideCards = heroTrack.querySelectorAll('.slide-card');
    const prevBtn = heroSlider.querySelector('.prev-slide');
    const nextBtn = heroSlider.querySelector('.next-slide');
    const slideIndicators = heroSlider.querySelector('.slide-indicators');
    const progressBar = heroSlider.querySelector('.progress-bar');
    
    let currentSlide = 0;
    const totalSlides = slideCards.length;
    let slideInterval;
    
   
    slideCards.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('slide-indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        slideIndicators.appendChild(indicator);
    });
    
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        heroTrack.style.transform = `translateX(-${currentSlide * 25}%)`;
        
        
        document.querySelectorAll('.slide-indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
        
       
        progressBar.style.width = `${(currentSlide + 1) / totalSlides * 100}%`;
        
       
        const activeSlide = slideCards[currentSlide];
        const slideContent = activeSlide.querySelector('.slide-content');
        slideContent.style.animation = 'none';
        setTimeout(() => {
            slideContent.style.animation = 'slideContentIn 1s cubic-bezier(0.215, 0.610, 0.355, 1) forwards';
        }, 10);
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        goToSlide(currentSlide);
    }
    

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
  
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoSlide() {
        clearInterval(slideInterval);
    }
    

    heroSlider.addEventListener('mouseenter', stopAutoSlide);
    heroSlider.addEventListener('mouseleave', startAutoSlide);
    

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    heroSlider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    heroSlider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const difference = touchStartX - touchEndX;
        
        if (Math.abs(difference) > swipeThreshold) {
            if (difference > 0) {
                nextSlide(); 
            } else {
                prevSlide(); 
            }
        }
    }
    
 
    startAutoSlide();
    

    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', function() {
            const game = this.dataset.game;
            const gameName = this.querySelector('.game-name').textContent;
            
            this.style.transform = 'scale(0.95) rotate(5deg)';
            this.style.boxShadow = '0 30px 50px rgba(255, 45, 117, 0.4)';
            
            setTimeout(() => {
                this.style.transform = '';
                this.style.boxShadow = '';
                alert(`Launching ${gameName}...`);
            }, 300);
        });
    });
    
    document.querySelectorAll('.stream-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const liveBadge = this.querySelector('.live-badge');
            if (liveBadge) {
                liveBadge.style.animation = 'livePulse 0.5s infinite';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const liveBadge = this.querySelector('.live-badge');
            if (liveBadge) {
                liveBadge.style.animation = 'livePulse 2s infinite';
            }
        });
        
        card.addEventListener('click', function() {
            const streamer = this.querySelector('.streamer-details h4').textContent;
            alert(`Opening ${streamer}'s stream...`);
        });
    });
});

function createInteractiveParticles() {
    const container = document.createElement('div');
    container.className = 'interactive-particles';
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9998;
    `;
    document.body.appendChild(container);
    
    for (let i = 0; i < 30; i++) {
        createInteractiveParticle(container);
    }
}

function createInteractiveParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 2;
    const colors = ['#ff2d75', '#ff5a3d', '#00ffea', '#9146ff', '#0099ff'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        box-shadow: 0 0 ${size * 2}px ${color};
        opacity: 0.3;
        animation: floatParticle ${Math.random() * 20 + 10}s ease-in-out infinite;
    `;
    
    container.appendChild(particle);
}

const floatAnimation = document.createElement('style');
floatAnimation.textContent = `
    @keyframes floatParticle {
        0%, 100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.3;
        }
        25% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(90deg);
            opacity: 0.6;
        }
        50% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(180deg);
            opacity: 0.3;
        }
        75% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(270deg);
            opacity: 0.6;
        }
    }
`;
document.head.appendChild(floatAnimation);

document.addEventListener('DOMContentLoaded', createInteractiveParticles);