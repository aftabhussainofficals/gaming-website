
document.addEventListener('DOMContentLoaded', function() {
    // Sample review data
    const sampleReviews = [
        {
            id: 1,
            reviewer: {
                name: "CyberNinja",
                avatar: "CN",
                level: 42,
                playtime: "256 hrs"
            },
            game: "Valorant",
            rating: 5,
            title: "Best Competitive FPS Out There",
            text: "As someone who's played CS:GO for years, I was skeptical about Valorant. But Riot Games has created something special here. The combination of tactical shooting with unique agent abilities creates a fresh take on the genre. The gunplay feels crisp, the maps are well-designed, and the anti-cheat system actually works! The only downside is the occasional toxicity in ranked matches, but that's gaming in 2025.",
            date: "2 days ago",
            likes: 124,
            shares: 8
        },
        {
            id: 2,
            reviewer: {
                name: "PixelQueen",
                avatar: "PQ",
                level: 38,
                playtime: "189 hrs"
            },
            game: "Genshin Impact",
            rating: 4,
            title: "Beautiful World, Grindy Endgame",
            text: "The world of Teyvat is absolutely stunning. The art style, music, and exploration are top-notch. Each region feels unique and alive. The character designs are incredible and the combat system is surprisingly deep. However, the gacha system can be frustrating, and the endgame becomes very grindy. Resin system needs improvement. Still, for a free-to-play game, it's incredible value.",
            date: "1 week ago",
            likes: 89,
            shares: 12
        },
        {
            id: 3,
            reviewer: {
                name: "StrategyKing",
                avatar: "SK",
                level: 55,
                playtime: "512 hrs"
            },
            game: "League of Legends",
            rating: 4,
            title: "Still the King of MOBAs",
            text: "After 10+ years, League continues to evolve and improve. The constant updates, new champions, and balance changes keep the game fresh. The esports scene is unmatched. The learning curve is steep but rewarding. My only complaint is the toxicity in lower ranks - the reporting system needs work. But the core gameplay is solid and the community is massive.",
            date: "3 days ago",
            likes: 67,
            shares: 5
        },
        {
            id: 4,
            reviewer: {
                name: "BuilderBob",
                avatar: "BB",
                level: 29,
                playtime: "78 hrs"
            },
            game: "Minecraft",
            rating: 5,
            title: "Timeless Masterpiece",
            text: "There's a reason Minecraft has remained popular for over a decade. The freedom to create anything you can imagine is unmatched. The recent updates have added so much depth while keeping the core experience intact. Whether you're building epic structures, exploring deep caves, or fighting the Ender Dragon, there's always something to do. Perfect for all ages.",
            date: "1 month ago",
            likes: 201,
            shares: 15
        },
        {
            id: 5,
            reviewer: {
                name: "ApexPredator",
                avatar: "AP",
                level: 47,
                playtime: "321 hrs"
            },
            game: "Fortnite",
            rating: 4,
            title: "Constantly Evolving Battle Royale",
            text: "Fortnite's ability to reinvent itself every season is impressive. The building mechanics add a unique layer of strategy that other BRs lack. The crossover events are fun and the cosmetics are great. Performance is smooth even on lower-end systems. The only issue is the skill gap - new players might struggle against veterans. But the creative mode is a fantastic addition.",
            date: "2 weeks ago",
            likes: 92,
            shares: 9
        },
        {
            id: 6,
            reviewer: {
                name: "RPGMaster",
                avatar: "RM",
                level: 61,
                playtime: "450 hrs"
            },
            game: "Wuthering Waves",
            rating: 5,
            title: "Breath of Fresh Air for ARPG Fans",
            text: "Kuro Games has delivered an exceptional action RPG. The combat system is fluid and satisfying, with perfect parry mechanics that feel incredibly rewarding. The world is beautifully crafted with attention to detail in every corner. The story is engaging and the character progression system is deep without being overwhelming. Server stability has improved significantly since launch.",
            date: "1 day ago",
            likes: 156,
            shares: 21
        }
    ];

    // Initialize reviews
    const reviewsGrid = document.querySelector('.reviews-grid');
    const loadMoreBtn = document.querySelector('.load-more-btn');
    let displayedReviews = 3;
    
    // Render reviews
    function renderReviews(reviews) {
        reviewsGrid.innerHTML = '';
        
        reviews.slice(0, displayedReviews).forEach(review => {
            const reviewCard = createReviewCard(review);
            reviewsGrid.appendChild(reviewCard);
        });
        
        // Show/hide load more button
        if (displayedReviews >= reviews.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-flex';
        }
    }
    
    // Create review card HTML
    function createReviewCard(review) {
        const card = document.createElement('div');
        card.className = 'review-card';
        card.dataset.id = review.id;
        
        // Generate stars HTML
        const starsHtml = Array.from({length: 5}, (_, i) => 
            `<i class="fas fa-star${i < review.rating ? '' : ' empty'}"></i>`
        ).join('');
        
        card.innerHTML = `
            <div class="review-header">
                <div class="reviewer-info">
                    <div class="reviewer-avatar">${review.reviewer.avatar}</div>
                    <div class="reviewer-details">
                        <h4>${review.reviewer.name}</h4>
                        <span>Level ${review.reviewer.level} • ${review.reviewer.playtime} played</span>
                    </div>
                </div>
                <div class="game-badge">${review.game}</div>
            </div>
            
            <div class="review-content">
                <h3 class="review-title">${review.title}</h3>
                <p class="review-text">${review.text}</p>
                <a href="#" class="read-more" data-id="${review.id}">
                    Read Full Review <i class="fas fa-arrow-right"></i>
                </a>
            </div>
            
            <div class="review-footer">
                <div class="rating">
                    <div class="stars">${starsHtml}</div>
                    <span class="rating-value">${review.rating}/5</span>
                </div>
                <div class="review-actions">
                    <button class="like-btn" data-id="${review.id}">
                        <i class="fas fa-thumbs-up"></i> <span class="like-count">${review.likes}</span>
                    </button>
                    <button class="share-btn" data-id="${review.id}">
                        <i class="fas fa-share"></i> Share
                    </button>
                </div>
            </div>
        `;
        
        // Add event listeners
        card.querySelector('.read-more').addEventListener('click', function(e) {
            e.preventDefault();
            showReviewModal(review);
        });
        
        card.querySelector('.like-btn').addEventListener('click', function() {
            likeReview(this, review.id);
        });
        
        card.querySelector('.share-btn').addEventListener('click', function() {
            shareReview(review);
        });
        
        return card;
    }
    
    // Load more reviews
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            displayedReviews += 3;
            renderReviews(sampleReviews);
            
            // Scroll to newly loaded reviews
            const newCards = Array.from(reviewsGrid.children).slice(-3);
            if (newCards.length > 0) {
                newCards[0].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }
    
    // Show review modal
    function showReviewModal(review) {
        const modal = document.createElement('div');
        modal.className = 'review-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-star"></i> Full Review</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="modal-reviewer">
                        <div class="modal-avatar">${review.reviewer.avatar}</div>
                        <div class="modal-reviewer-info">
                            <h4>${review.reviewer.name}</h4>
                            <p>Level ${review.reviewer.level} • ${review.reviewer.playtime} played</p>
                        </div>
                    </div>
                    
                    <div class="modal-rating">
                        <div class="modal-stars">
                            ${Array.from({length: 5}, (_, i) => 
                                `<i class="fas fa-star${i < review.rating ? '' : ' empty'}"></i>`
                            ).join('')}
                        </div>
                        <div class="modal-game">${review.game}</div>
                    </div>
                    
                    <h2 class="modal-title">${review.title}</h2>
                    
                    <div class="modal-text">
                        ${review.text}
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="modal-date">Posted ${review.date}</div>
                    <div class="modal-actions">
                        <button class="modal-like-btn" data-id="${review.id}">
                            <i class="fas fa-thumbs-up"></i> ${review.likes}
                        </button>
                        <button class="modal-share-btn" data-id="${review.id}">
                            <i class="fas fa-share"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add modal styles if not already added
        if (!document.querySelector('#modal-styles')) {
            const styles = document.createElement('style');
            styles.id = 'modal-styles';
            styles.textContent = `
                .review-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    backdrop-filter: blur(10px);
                    display: none;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    padding: 2rem;
                }
                
                .review-modal.open {
                    display: flex;
                    animation: fadeIn 0.3s ease;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                .modal-content {
                    background: linear-gradient(135deg, rgba(20, 20, 40, 0.95), rgba(26, 26, 53, 0.95));
                    border: 2px solid rgba(255, 45, 117, 0.3);
                    border-radius: 25px;
                    width: 100%;
                    max-width: 800px;
                    max-height: 90vh;
                    overflow-y: auto;
                    position: relative;
                }
                
                .modal-header {
                    padding: 2rem 2.5rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .modal-header h3 {
                    color: #ffffff;
                    font-family: 'Orbitron', monospace;
                    font-size: 1.8rem;
                    margin: 0;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                
                .modal-header i {
                    color: #ffd700;
                }
                
                .close-modal {
                    background: transparent;
                    border: none;
                    color: #ffffff;
                    font-size: 2.5rem;
                    cursor: pointer;
                    line-height: 1;
                    padding: 0;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                }
                
                .close-modal:hover {
                    color: #ff2d75;
                    transform: rotate(90deg);
                }
                
                .modal-body {
                    padding: 2.5rem;
                }
                
                .modal-reviewer {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    margin-bottom: 2rem;
                }
                
                .modal-avatar {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #ff2d75, #ff5a3d);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: bold;
                    font-size: 1.8rem;
                }
                
                .modal-reviewer-info h4 {
                    color: #ffffff;
                    font-size: 1.5rem;
                    margin-bottom: 5px;
                }
                
                .modal-reviewer-info p {
                    color: #00ffea;
                    font-size: 1rem;
                    margin: 0;
                }
                
                .modal-rating {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    margin-bottom: 2rem;
                }
                
                .modal-stars {
                    display: flex;
                    gap: 5px;
                }
                
                .modal-stars i {
                    color: #ffd700;
                    font-size: 1.5rem;
                }
                
                .modal-game {
                    padding: 8px 20px;
                    background: linear-gradient(135deg, #00ffea, #0099ff);
                    border-radius: 20px;
                    color: white;
                    font-weight: 600;
                }
                
                .modal-title {
                    color: #ffffff;
                    font-size: 2rem;
                    margin-bottom: 1.5rem;
                    line-height: 1.3;
                }
                
                .modal-text {
                    color: #cccccc;
                    font-size: 1.1rem;
                    line-height: 1.8;
                    margin-bottom: 2rem;
                }
                
                .modal-footer {
                    padding: 2rem 2.5rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .modal-date {
                    color: #aaaaaa;
                    font-size: 0.9rem;
                }
                
                .modal-actions {
                    display: flex;
                    gap: 15px;
                }
                
                .modal-like-btn,
                .modal-share-btn {
                    padding: 10px 20px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                    color: #cccccc;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-family: 'Exo 2', sans-serif;
                    font-weight: 500;
                }
                
                .modal-like-btn:hover,
                .modal-share-btn:hover {
                    background: rgba(255, 255, 255, 0.1);
                    border-color: rgba(255, 255, 255, 0.2);
                    color: #ffffff;
                }
            `;
            document.head.appendChild(styles);
        }
        
        // Show modal
        setTimeout(() => {
            modal.classList.add('open');
        }, 10);
        
        // Close modal
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.classList.remove('open');
            setTimeout(() => {
                modal.remove();
            }, 300);
        });
        
        // Like button in modal
        modal.querySelector('.modal-like-btn').addEventListener('click', function() {
            likeReview(this, review.id);
        });
        
        // Share button in modal
        modal.querySelector('.modal-share-btn').addEventListener('click', function() {
            shareReview(review);
        });
        
        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('open');
                setTimeout(() => {
                    modal.remove();
                }, 300);
            }
        });
    }
    
    // Like review function
    function likeReview(button, reviewId) {
        const likeCount = button.querySelector('.like-count') || button;
        let currentLikes = parseInt(likeCount.textContent) || 0;
        
        if (button.classList.contains('liked')) {
            currentLikes--;
            button.classList.remove('liked');
            button.querySelector('i')?.classList.replace('fas', 'far');
        } else {
            currentLikes++;
            button.classList.add('liked');
            button.querySelector('i')?.classList.replace('far', 'fas');
        }
        
        likeCount.textContent = currentLikes;
        
        // Update in sample data
        const review = sampleReviews.find(r => r.id === reviewId);
        if (review) {
            review.likes = currentLikes;
        }
    }
    
    // Share review function
    function shareReview(review) {
        const shareText = `Check out this review of ${review.game} on GameHub: "${review.title}"`;
        const shareUrl = window.location.href;
        
        if (navigator.share) {
            navigator.share({
                title: `${review.game} Review`,
                text: shareText,
                url: shareUrl
            }).then(() => {
                showNotification('Review shared successfully!', 'success');
            }).catch(err => {
                console.log('Error sharing:', err);
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(`${shareText}\n${shareUrl}`).then(() => {
                showNotification('Review link copied to clipboard!', 'success');
            });
        }
    }
    
    // Review form submission
    const reviewForm = document.getElementById('reviewForm');
    const reviewText = document.getElementById('reviewText');
    const charCount = document.querySelector('.char-count');
    
    if (reviewForm) {
        // Character count for review text
        if (reviewText && charCount) {
            reviewText.addEventListener('input', function() {
                const length = this.value.length;
                charCount.textContent = `${length}/1000 characters`;
                
                if (length > 1000) {
                    charCount.style.color = '#ff2d75';
                } else if (length > 800) {
                    charCount.style.color = '#ffd700';
                } else {
                    charCount.style.color = '#aaaaaa';
                }
            });
        }
        
        // Form submission
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const gameSelect = document.getElementById('gameSelect');
            const rating = document.querySelector('input[name="rating"]:checked');
            const title = document.getElementById('reviewTitle').value.trim();
            const text = reviewText.value.trim();
            
            // Validate form
            if (!gameSelect.value) {
                showNotification('Please select a game', 'error');
                return;
            }
            
            if (!rating) {
                showNotification('Please provide a rating', 'error');
                return;
            }
            
            if (text.length < 50) {
                showNotification('Review must be at least 50 characters', 'error');
                return;
            }
            
            if (text.length > 1000) {
                showNotification('Review cannot exceed 1000 characters', 'error');
                return;
            }
            
            // Create new review
            const newReview = {
                id: sampleReviews.length + 1,
                reviewer: {
                    name: "You",
                    avatar: "ME",
                    level: 1,
                    playtime: "Just now"
                },
                game: gameSelect.options[gameSelect.selectedIndex].text,
                rating: parseInt(rating.value),
                title: title,
                text: text,
                date: "Just now",
                likes: 0,
                shares: 0
            };
            
            // Add to sample reviews
            sampleReviews.unshift(newReview);
            
            // Reset form
            reviewForm.reset();
            charCount.textContent = "0/1000 characters";
            
            // Reset star rating
            document.querySelectorAll('input[name="rating"]').forEach(radio => {
                radio.checked = false;
            });
            
            // Update display
            displayedReviews = 3;
            renderReviews(sampleReviews);
            
            // Show success message
            showNotification('Your review has been submitted!', 'success');
            
            // Scroll to new review
            setTimeout(() => {
                document.querySelector('.review-card')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 500);
        });
    }
    
    // Star rating interaction
    const starLabels = document.querySelectorAll('.star-rating label');
    starLabels.forEach(label => {
        label.addEventListener('mouseenter', function() {
            const stars = this.parentElement.querySelectorAll('label');
            const index = Array.from(stars).indexOf(this);
            
            stars.forEach((star, i) => {
                if (i <= index) {
                    star.style.color = '#ffd700';
                }
            });
        });
        
        label.addEventListener('mouseleave', function() {
            const stars = this.parentElement.querySelectorAll('label');
            const checked = this.parentElement.querySelector('input:checked');
            
            if (checked) {
                const index = parseInt(checked.value) - 1;
                stars.forEach((star, i) => {
                    star.style.color = i <= index ? '#ffd700' : '#444';
                });
            } else {
                stars.forEach(star => {
                    star.style.color = '#444';
                });
            }
        });
    });
    
    // Filter and sort functionality
    function createFilterBar() {
        const featuredSection = document.querySelector('.featured-reviews');
        const sectionHeader = document.querySelector('.section-header');
        
        const filterBar = document.createElement('div');
        filterBar.className = 'filter-bar';
        filterBar.innerHTML = `
            <div class="filter-group">
                <label for="filterGame"><i class="fas fa-gamepad"></i> Filter by Game:</label>
                <select id="filterGame">
                    <option value="all">All Games</option>
                    <option value="valorant">Valorant</option>
                    <option value="fortnite">Fortnite</option>
                    <option value="genshin">Genshin Impact</option>
                    <option value="minecraft">Minecraft</option>
                    <option value="league">League of Legends</option>
                </select>
            </div>
            
            <div class="filter-group">
                <label for="filterRating"><i class="fas fa-star"></i> Minimum Rating:</label>
                <select id="filterRating">
                    <option value="0">Any Rating</option>
                    <option value="3">3+ Stars</option>
                    <option value="4">4+ Stars</option>
                    <option value="5">5 Stars</option>
                </select>
            </div>
            
            <div class="sort-options">
                <button class="sort-btn active" data-sort="newest">Newest</button>
                <button class="sort-btn" data-sort="rating">Highest Rated</button>
                <button class="sort-btn" data-sort="helpful">Most Helpful</button>
            </div>
        `;
        
        featuredSection.insertBefore(filterBar, sectionHeader.nextSibling);
        
        // Add event listeners
        const filterGame = document.getElementById('filterGame');
        const filterRating = document.getElementById('filterRating');
        const sortBtns = document.querySelectorAll('.sort-btn');
        
        let currentFilter = {
            game: 'all',
            rating: 0,
            sort: 'newest'
        };
        
        function applyFilters() {
            let filteredReviews = [...sampleReviews];
            
            // Filter by game
            if (currentFilter.game !== 'all') {
                filteredReviews = filteredReviews.filter(review => 
                    review.game.toLowerCase().includes(currentFilter.game)
                );
            }
            
            // Filter by rating
            if (currentFilter.rating > 0) {
                filteredReviews = filteredReviews.filter(review => 
                    review.rating >= currentFilter.rating
                );
            }
            
            // Sort reviews
            switch (currentFilter.sort) {
                case 'newest':
                    filteredReviews.sort((a, b) => b.id - a.id);
                    break;
                case 'rating':
                    filteredReviews.sort((a, b) => b.rating - a.rating);
                    break;
                case 'helpful':
                    filteredReviews.sort((a, b) => b.likes - a.likes);
                    break;
            }
            
            // Re-render reviews
            displayedReviews = 3;
            renderReviews(filteredReviews);
        }
        
        if (filterGame) {
            filterGame.addEventListener('change', function() {
                currentFilter.game = this.value;
                applyFilters();
            });
        }
        
        if (filterRating) {
            filterRating.addEventListener('change', function() {
                currentFilter.rating = parseInt(this.value);
                applyFilters();
            });
        }
        
        sortBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                sortBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                currentFilter.sort = this.dataset.sort;
                applyFilters();
            });
        });
    }
    
    // Create filter bar
    createFilterBar();
    
    // Notification system
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="close-notification">&times;</button>
        `;
        
        // Add styles if not already added
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, rgba(20, 20, 40, 0.95), rgba(26, 26, 53, 0.95));
                    border: 1px solid rgba(0, 255, 234, 0.3);
                    border-radius: 10px;
                    padding: 1rem 1.5rem;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    z-index: 10000;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
                    animation: slideInRight 0.3s ease;
                    max-width: 400px;
                }
                
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                .notification.success {
                    border-color: #00ff00;
                }
                
                .notification.success i {
                    color: #00ff00;
                }
                
                .notification.info {
                    border-color: #00ffea;
                }
                
                .notification.info i {
                    color: #00ffea;
                }
                
                .notification.error {
                    border-color: #ff2d75;
                }
                
                .notification.error i {
                    color: #ff2d75;
                }
                
                .notification i {
                    font-size: 1.5rem;
                }
                
                .notification span {
                    color: #ffffff;
                    flex: 1;
                }
                
                .close-notification {
                    background: transparent;
                    border: none;
                    color: #cccccc;
                    font-size: 1.5rem;
                    cursor: pointer;
                    line-height: 1;
                    padding: 0;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .close-notification:hover {
                    color: #ffffff;
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(notification);
        
        // Close notification
        notification.querySelector('.close-notification').addEventListener('click', () => {
            notification.remove();
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
    
    // Animate review cards on load
    function animateReviewCards() {
        const reviewCards = document.querySelectorAll('.review-card');
        
        reviewCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    // Initialize everything
    renderReviews(sampleReviews);
    animateReviewCards();
});