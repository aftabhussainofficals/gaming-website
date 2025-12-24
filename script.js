document.addEventListener('DOMContentLoaded', function() {
    
    const userProfile = document.getElementById('userProfile');
    const dropdownMenu = userProfile.querySelector('.dropdown-menu');
    
    userProfile.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdownMenu.classList.toggle('active');
    });
    
    document.addEventListener('click', function(e) {
        if (!userProfile.contains(e.target)) {
            dropdownMenu.classList.remove('active');
        }
    });
    
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        const icon = this.querySelector('i');
        if (document.body.classList.contains('light-mode')) {
            icon.classList.remove('fa-palette');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-palette');
        }
    });
    
    const notificationBtn = document.querySelector('.notification-btn');
    notificationBtn.addEventListener('click', function() {
        this.style.transform = 'scale(0.9) rotate(360deg)';
        setTimeout(() => {
            this.style.transform = '';
            const count = this.querySelector('.notification-count');
            if (parseInt(count.textContent) > 0) {
                count.textContent = '0';
                count.style.background = 'linear-gradient(135deg, #333, #666)';
            }
        }, 300);
    });
    
    
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
        let current = 0;
        const increment = target / 50;
        
        const updateStat = () => {
            if (current < target) {
                current += increment;
                if (current > target) current = target;
                
                if (stat.textContent.includes('$')) {
                    stat.textContent = '$' + Math.floor(current).toLocaleString() + (stat.textContent.includes('M') ? 'M' : '');
                } else {
                    stat.textContent = Math.floor(current).toLocaleString();
                }
                setTimeout(updateStat, 30);
            }
        };
        updateStat();
    });
    
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('click', function() {
            const stat = this.dataset.stat;
            alert(`Viewing detailed stats for ${stat}!`);
        });
    });
    
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.addEventListener('click', function() {
            const game = this.dataset.game;
            const gameName = this.querySelector('.game-name').textContent;
            alert(`Launching ${gameName}...`);
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });

    const streamCards = document.querySelectorAll('.stream-card');
    streamCards.forEach(card => {
        card.addEventListener('click', function() {
            alert('Opening stream...');
        });
    });
    
    const viewAllBtn = document.querySelector('.view-all');
    viewAllBtn.addEventListener('click', function() {
        alert('Showing all live streams!');
    });
    
    const ctaButtons = document.querySelectorAll('.cta-btn');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.classList.contains('explore') ? 'exploring games' : 
                         this.classList.contains('join') ? 'joining community' : 'starting stream';
            alert(`You are now ${action}!`);
        });
    });
    
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            themeButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const theme = this.dataset.theme;
            changeTheme(theme);
        });
    });
    
    function changeTheme(theme) {
        const root = document.documentElement;
        
        document.body.className = document.body.className.replace(/theme-\w+/g, '');
        
        document.body.classList.add(`theme-${theme}`);

        switch(theme) {
            case 'blue':
                updateColors('#0099ff', '#0066cc');
                break;
            case 'red':
                updateColors('#ff2d75', '#ff5a3d');
                break;
            case 'green':
                updateColors('#00ff9d', '#00cc7a');
                break;
            case 'purple':
                updateColors('#9146ff', '#a970ff');
                break;
            case 'cyber':
                updateColors('#00ffea', '#0099ff');
                break;
        }
    }
    
    function updateColors(primary, secondary) {
        document.documentElement.style.setProperty('--primary-color', primary);
        document.documentElement.style.setProperty('--secondary-color', secondary);
    }
    
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input').value;
        if (email) {
            const btn = this.querySelector('button');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i>';
            btn.style.background = 'linear-gradient(135deg, #00ff00, #00cc00)';
            
            setTimeout(() => {
                alert(`Welcome to GameHub newsletter! Confirmation sent to ${email}`);
                btn.innerHTML = originalHTML;
                btn.style.background = 'linear-gradient(135deg, #ff2d75, #ff5a3d)';
                this.reset();
            }, 1000);
        }
    });
    
    
    const xpFill = document.querySelector('.xp-fill');
    let xpWidth = 62;
    
    setInterval(() => {
        xpWidth = (xpWidth + 0.1) % 100;
        xpFill.style.width = `${xpWidth}%`;
    }, 1000);
 
    createChatParticles();
});

function createChatParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'chat-particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
    `;
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 20; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    const colors = ['#ff2d75', '#ff5a3d', '#00ffea', '#9146ff', '#0099ff'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: ${color};
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        box-shadow: 0 0 10px ${color};
        opacity: 0;
        animation: chatFloat ${Math.random() * 10 + 5}s linear infinite;
    `;
    
    container.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
        createParticle(container);
    }, (Math.random() * 10000 + 5000));
}

const style = document.createElement('style');
style.textContent = `
    @keyframes chatFloat {
        0% {
            transform: translateY(100vh) translateX(0) scale(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) translateX(${Math.random() * 200 - 100}px) scale(1);
            opacity: 0;
        }
    }
    
    .light-mode {
        --bg-color: #f5f7fa;
        --text-color: #333333;
        --card-bg: rgba(255, 255, 255, 0.9);
    }
    
    body.light-mode {
        background: var(--bg-color);
        color: var(--text-color);
    }
    
    body.light-mode .live-stats {
        background: linear-gradient(90deg, #ff7eb3 0%, #ffb3a7 100%);
    }
    
    body.light-mode .stat-card,
    body.light-mode .game-card,
    body.light-mode .stream-card {
        background: var(--card-bg);
        border-color: rgba(0, 0, 0, 0.1);
        color: var(--text-color);
    }
    
    body.light-mode .footer-section a,
    body.light-mode .footer-section p,
    body.light-mode .copyright {
        color: #666666;
    }
`;
document.head.appendChild(style);