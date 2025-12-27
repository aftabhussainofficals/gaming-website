
document.addEventListener('DOMContentLoaded', function() {
    const authWrapper = document.querySelector('.auth-wrapper');
    const registerTrigger = document.querySelector('.register-trigger');
    const loginTrigger = document.querySelector('.login-trigger');
    const body = document.body;

   
    if (registerTrigger) {
        registerTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            authWrapper.classList.add('toggled');
            body.classList.remove('signin');
            body.classList.add('signup');
           
            createSignupParticles();
        });
    }

    if (loginTrigger) {
        loginTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            authWrapper.classList.remove('toggled');
            body.classList.remove('signup');
            body.classList.add('signin');
            createLoginParticles();
        });
    }
    const loginForm = document.querySelector('.credentials-panel.signin form');
    const registerForm = document.querySelector('.credentials-panel.signup form');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-button');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Authenticating...';
            submitBtn.disabled = true;
        
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Login Successful!';
                submitBtn.style.background = 'linear-gradient(135deg, #00ff00, #00cc00)';
                
                setTimeout(() => {
                    window.location.href = '../index.html';
                }, 1000);
            }, 1500);
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-button');
            const originalText = submitBtn.innerHTML;
           
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
            submitBtn.disabled = true;
            
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Account Created!';
                submitBtn.style.background = 'linear-gradient(135deg, #00ff00, #00cc00)';
                
                setTimeout(() => {
                    authWrapper.classList.remove('toggled');
                    body.classList.remove('signup');
                    body.classList.add('signin');
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = 'linear-gradient(135deg, #ff2d75 0%, #ff5a3d 100%)';
                    }, 500);
                }, 1000);
            }, 1500);
        });
    }

   
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const platform = this.classList[1];
            const platformName = platform.charAt(0).toUpperCase() + platform.slice(1);
            
            this.style.transform = 'scale(0.9)';
            this.style.boxShadow = `0 0 30px ${this.style.color}`;
            
            setTimeout(() => {
                this.style.transform = '';
                this.style.boxShadow = '';
                alert(`Redirecting to ${platformName} login...`);
            }, 300);
        });
    });

   
    createFloatingParticles();
});

function createFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'floating-particles';
    document.body.appendChild(particleContainer);

    for (let i = 0; i < 15; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 8 + 2;
    const colors = [
        'rgba(255, 45, 117, 0.3)',
        'rgba(0, 255, 234, 0.3)',
        'rgba(255, 90, 61, 0.3)',
        'rgba(145, 70, 255, 0.3)'
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 15}s;
    `;
    
    container.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
        createParticle(container);
    }, Math.random() * 15000 + 10000);
}

function createLoginParticles() {
    const colors = ['#00ffea', '#0099ff', '#00b8d4'];
    createParticleBurst(colors, 15);
}

function createSignupParticles() {
    const colors = ['#ff2d75', '#ff5a3d', '#ff9500'];
    createParticleBurst(colors, 15);
}

function createParticleBurst(colors, count) {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'burst-particle';
        
        const size = Math.random() * 10 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 300 + 200;
        const distance = Math.random() * 100 + 50;
        
        particle.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            left: ${centerX}px;
            top: ${centerY}px;
            pointer-events: none;
            z-index: 1000;
            box-shadow: 0 0 ${size * 2}px ${color};
        `;
        
        document.body.appendChild(particle);
        
        const startTime = Date.now();
        const duration = 1000;
        
        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            
            const x = centerX + Math.cos(angle) * speed * progress;
            const y = centerY + Math.sin(angle) * speed * progress;
            const scale = 1 - progress;
            const opacity = 1 - progress;
            
            particle.style.transform = `translate(${x - centerX}px, ${y - centerY}px) scale(${scale})`;
            particle.style.opacity = opacity;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        }
        
        requestAnimationFrame(animate);
    }
}

const burstStyle = document.createElement('style');
burstStyle.textContent = `
    @keyframes burst {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(var(--tx), var(--ty)) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(burstStyle);