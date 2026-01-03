// Simple dynamic script for GameHub

// Theme changer
document.addEventListener('DOMContentLoaded', function() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            document.body.className = theme;
            themeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Scroll to top
    const scrollTopBtn = document.getElementById('scrollTop');
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollTopBtn.style.display = 'block';
            } else {
                scrollTopBtn.style.display = 'none';
            }
        });
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Hero Slider
    const heroSlider = document.getElementById('heroSlider');
    if (heroSlider) {
        const track = heroSlider.querySelector('.hero-track');
        const slides = track.querySelectorAll('.slide-card');
        const prevBtn = heroSlider.querySelector('.prev-slide');
        const nextBtn = heroSlider.querySelector('.next-slide');
        const indicators = heroSlider.querySelector('.slide-indicators');
        const progressBar = heroSlider.querySelector('.progress-bar');

        let currentSlide = 0;
        let autoSlideInterval;

        // Create indicators
        slides.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
            indicator.addEventListener('click', () => goToSlide(index));
            indicators.appendChild(indicator);
        });

        function updateIndicators() {
            indicators.querySelectorAll('.indicator').forEach((ind, index) => {
                ind.classList.toggle('active', index === currentSlide);
            });
        }

        function goToSlide(index) {
            currentSlide = index;
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            updateIndicators();
            resetAutoSlide();
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            goToSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            goToSlide(currentSlide);
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(nextSlide, 5000);
        }

        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);

        // Auto slide
        resetAutoSlide();

        // Progress bar animation
        let progress = 0;
        setInterval(() => {
            progress = (progress + 1) % 100;
            progressBar.style.width = `${progress}%`;
        }, 50);
    }

    // Games page functionality
    const gamesGrid = document.getElementById('gamesGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const categoryItems = document.querySelectorAll('.category-item');

    if (gamesGrid && loadMoreBtn) {
        let gamesLoaded = 6; // Initial games loaded
        const gamesPerLoad = 6;

        // Sample additional games data
        const additionalGames = [
            {
                title: "Space Warriors",
                image: "https://via.placeholder.com/300x200/2d3748/ffffff?text=Space+Warriors",
                category: "action",
                rating: 4.6,
                players: "1.8M",
                description: "Epic space battles await.",
                tags: ["Action", "Sci-Fi"]
            },
            {
                title: "Medieval Quest",
                image: "https://via.placeholder.com/300x200/4a5568/ffffff?text=Medieval+Quest",
                category: "rpg",
                rating: 4.4,
                players: "3.2M",
                description: "Journey through medieval lands.",
                tags: ["RPG", "Fantasy"]
            },
            {
                title: "Racing Thunder",
                image: "https://via.placeholder.com/300x200/805ad5/ffffff?text=Racing+Thunder",
                category: "racing",
                rating: 4.7,
                players: "2.1M",
                description: "High-speed racing action.",
                tags: ["Racing", "Sports"]
            },
            {
                title: "Strategy Empire",
                image: "https://via.placeholder.com/300x200/e53e3e/ffffff?text=Strategy+Empire",
                category: "strategy",
                rating: 4.5,
                players: "950K",
                description: "Build your empire to victory.",
                tags: ["Strategy", "Simulation"]
            },
            {
                title: "Basketball Legends",
                image: "https://via.placeholder.com/300x200/38a169/ffffff?text=Basketball+Legends",
                category: "sports",
                rating: 4.3,
                players: "4.1M",
                description: "Become a basketball legend.",
                tags: ["Sports", "Simulation"]
            },
            {
                title: "Puzzle Master",
                image: "https://via.placeholder.com/300x200/d69e2e/ffffff?text=Puzzle+Master",
                category: "strategy",
                rating: 4.8,
                players: "2.9M",
                description: "Challenge your mind with puzzles.",
                tags: ["Puzzle", "Strategy"]
            }
        ];

        // Load more games function
        function loadMoreGames() {
            const startIndex = gamesLoaded;
            const endIndex = Math.min(gamesLoaded + gamesPerLoad, additionalGames.length);

            for (let i = startIndex; i < endIndex; i++) {
                const game = additionalGames[i];
                const gameCard = createGameCard(game);
                gamesGrid.appendChild(gameCard);
            }

            gamesLoaded += gamesPerLoad;

            // Hide load more button if all games are loaded
            if (gamesLoaded >= additionalGames.length) {
                loadMoreBtn.style.display = 'none';
            }
        }

        // Create game card element
        function createGameCard(game) {
            const gameCard = document.createElement('div');
            gameCard.className = 'game-card';
            gameCard.setAttribute('data-category', game.category);
            gameCard.innerHTML = `
                <div class="game-image">
                    <img src="${game.image}" alt="${game.title}">
                    <div class="game-overlay">
                        <button class="play-btn">Play Now</button>
                        <button class="wishlist-btn"><i class="fas fa-heart"></i></button>
                    </div>
                </div>
                <div class="game-info">
                    <h3>${game.title}</h3>
                    <div class="game-meta">
                        <span class="rating"><i class="fas fa-star"></i> ${game.rating}</span>
                        <span class="players">${game.players} players</span>
                    </div>
                    <p>${game.description}</p>
                    <div class="game-tags">
                        ${game.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            `;
            return gameCard;
        }

        // Load more button event listener
        loadMoreBtn.addEventListener('click', loadMoreGames);
    }

    // Category filtering
    if (categoryItems.length > 0) {
        categoryItems.forEach(item => {
            item.addEventListener('click', function() {
                const category = this.getAttribute('data-category');

                // Remove active class from all items
                categoryItems.forEach(cat => cat.classList.remove('active'));
                // Add active class to clicked item
                this.classList.add('active');

                // Filter games
                const gameCards = document.querySelectorAll('.game-card');
                gameCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.5s ease forwards';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Tournament filtering functionality
    const gameFilter = document.getElementById('game-filter');
    const typeFilter = document.getElementById('type-filter');
    const statusFilter = document.getElementById('status-filter');
    const prizeFilter = document.getElementById('prize-filter');
    const tournamentCards = document.querySelectorAll('.tournament-card');
    const filterResults = document.querySelector('.filter-results');

    function filterTournaments() {
        const gameValue = gameFilter ? gameFilter.value : '';
        const typeValue = typeFilter ? typeFilter.value : '';
        const statusValue = statusFilter ? statusFilter.value : '';
        const prizeValue = prizeFilter ? prizeFilter.value : '';

        let visibleCount = 0;

        tournamentCards.forEach(card => {
            const game = card.querySelector('.tournament-game').textContent.toLowerCase();
            const status = card.querySelector('.tournament-status').textContent.toLowerCase();
            const prize = parseInt(card.querySelector('.tournament-prize').textContent.replace(/[$,]/g, ''));

            let showCard = true;

            if (gameValue && !game.includes(gameValue)) showCard = false;
            if (statusValue && !status.includes(statusValue)) showCard = false;
            if (prizeValue && prize < parseInt(prizeValue)) showCard = false;

            // Type filtering would need additional data attributes on cards
            // For now, we'll skip type filtering as it requires more complex implementation

            if (showCard) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease forwards';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        if (filterResults) {
            filterResults.textContent = `Showing ${visibleCount} tournament${visibleCount !== 1 ? 's' : ''}`;
        }
    }

    // Add event listeners for filters
    if (gameFilter) gameFilter.addEventListener('change', filterTournaments);
    if (typeFilter) typeFilter.addEventListener('change', filterTournaments);
    if (statusFilter) statusFilter.addEventListener('change', filterTournaments);
    if (prizeFilter) prizeFilter.addEventListener('change', filterTournaments);

    // Community join form handling
    const joinForm = document.querySelector('.join-form');
    if (joinForm) {
        joinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Simulate form submission
            alert('Thank you for joining the community! We\'ll review your application and get back to you soon.');
            this.reset();
        });
    }

    // Tournament registration simulation
    const registerButtons = document.querySelectorAll('.tournament-btn.primary');
    registerButtons.forEach(button => {
        if (button.textContent.includes('Register')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const tournamentName = this.closest('.tournament-card').querySelector('.tournament-title').textContent;
                alert(`Registration opened for ${tournamentName}! You'll be redirected to the registration page.`);
            });
        }
    });
});