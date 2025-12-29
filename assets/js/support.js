
document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const item = this.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all items
            document.querySelectorAll('.faq-item').forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // FAQ Category Switching
    const categories = document.querySelectorAll('.category');
    const faqSections = document.querySelectorAll('.faq-items');
    
    categories.forEach(category => {
        category.addEventListener('click', function() {
            const categoryType = this.dataset.category;
            
            // Update active category
            categories.forEach(cat => cat.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding FAQ section
            faqSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === `${categoryType}-faq`) {
                    section.classList.add('active');
                }
            });
        });
    });
    
    // Support Search
    const searchInput = document.getElementById('supportSearch');
    const searchBtn = document.querySelector('.search-btn');
    
    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            // Show search results (simulated)
            showSearchResults(query);
            searchInput.value = '';
        }
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    function showSearchResults(query) {
        // Create results modal
        const modal = document.createElement('div');
        modal.className = 'search-results-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-search"></i> Search Results</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <p class="search-query">Showing results for: <strong>"${query}"</strong></p>
                    <div class="results">
                        <div class="result-item">
                            <i class="fas fa-file-alt"></i>
                            <div>
                                <h4>How to reset your password</h4>
                                <p>Step-by-step guide to recover your account</p>
                                <span class="result-category">Account</span>
                            </div>
                        </div>
                        <div class="result-item">
                            <i class="fas fa-video"></i>
                            <div>
                                <h4>Video: Troubleshooting game crashes</h4>
                                <p>Common fixes for game performance issues</p>
                                <span class="result-category">Technical</span>
                            </div>
                        </div>
                        <div class="result-item">
                            <i class="fas fa-book"></i>
                            <div>
                                <h4>Payment troubleshooting guide</h4>
                                <p>Solutions for billing and payment problems</p>
                                <span class="result-category">Billing</span>
                            </div>
                        </div>
                    </div>
                    <div class="no-results" style="display: none;">
                        <i class="fas fa-search"></i>
                        <h4>No results found</h4>
                        <p>Try different keywords or browse our help categories</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="contact-support">Contact Support</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add styles
        const styles = document.createElement('style');
        styles.textContent = `
            .search-results-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(10px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            .modal-content {
                background: linear-gradient(135deg, rgba(20, 20, 40, 0.95), rgba(26, 26, 53, 0.95));
                border: 2px solid rgba(0, 255, 234, 0.3);
                border-radius: 20px;
                width: 90%;
                max-width: 700px;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .modal-header h3 {
                color: #00ffea;
                font-family: 'Orbitron', monospace;
                font-size: 1.5rem;
                display: flex;
                align-items: center;
                gap: 10px;
                margin: 0;
            }
            
            .close-modal {
                background: transparent;
                border: none;
                color: #ffffff;
                font-size: 2rem;
                cursor: pointer;
                line-height: 1;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .close-modal:hover {
                color: #ff2d75;
            }
            
            .modal-body {
                padding: 1.5rem;
            }
            
            .search-query {
                color: #cccccc;
                margin-bottom: 2rem;
                font-size: 1.1rem;
            }
            
            .search-query strong {
                color: #ffffff;
            }
            
            .results {
                margin-bottom: 2rem;
            }
            
            .result-item {
                display: flex;
                align-items: flex-start;
                gap: 15px;
                padding: 1.5rem;
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 15px;
                margin-bottom: 1rem;
                transition: all 0.3s ease;
                cursor: pointer;
            }
            
            .result-item:hover {
                border-color: rgba(0, 255, 234, 0.3);
                transform: translateX(5px);
            }
            
            .result-item i {
                font-size: 1.8rem;
                color: #00ffea;
                margin-top: 5px;
            }
            
            .result-item h4 {
                color: #ffffff;
                margin: 0 0 5px 0;
                font-size: 1.1rem;
            }
            
            .result-item p {
                color: #aaaaaa;
                margin: 0 0 8px 0;
                font-size: 0.9rem;
            }
            
            .result-category {
                display: inline-block;
                padding: 4px 12px;
                background: rgba(0, 255, 234, 0.1);
                color: #00ffea;
                border-radius: 12px;
                font-size: 0.8rem;
                font-weight: 600;
            }
            
            .no-results {
                text-align: center;
                padding: 3rem 1.5rem;
            }
            
            .no-results i {
                font-size: 3rem;
                color: #aaaaaa;
                margin-bottom: 1rem;
            }
            
            .no-results h4 {
                color: #ffffff;
                margin: 0 0 1rem 0;
            }
            
            .no-results p {
                color: #cccccc;
                margin: 0;
            }
            
            .modal-footer {
                padding: 1.5rem;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                text-align: center;
            }
            
            .contact-support {
                padding: 12px 24px;
                background: linear-gradient(135deg, #ff2d75, #ff5a3d);
                border: none;
                border-radius: 10px;
                color: white;
                font-family: 'Exo 2', sans-serif;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .contact-support:hover {
                transform: translateY(-3px);
                box-shadow: 0 10px 20px rgba(255, 45, 117, 0.3);
            }
        `;
        document.head.appendChild(styles);
        
        // Close modal
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
            styles.remove();
        });
        
        // Contact support button
        modal.querySelector('.contact-support').addEventListener('click', () => {
            modal.remove();
            styles.remove();
            document.querySelector('.contact-form-section').scrollIntoView({
                behavior: 'smooth'
            });
        });
        
        // Result item click
        modal.querySelectorAll('.result-item').forEach(item => {
            item.addEventListener('click', function() {
                const title = this.querySelector('h4').textContent;
                showNotification(`Opening article: ${title}`, 'info');
                modal.remove();
                styles.remove();
            });
        });
    }
    
    // Support Channel Buttons
    const startChatBtn = document.querySelector('.start-chat');
    const sendEmailBtn = document.querySelector('.send-email');
    const visitForumBtn = document.querySelector('.visit-forum');
    const browseArticlesBtn = document.querySelector('.browse-articles');
    
    if (startChatBtn) {
        startChatBtn.addEventListener('click', function() {
            toggleChatWidget();
        });
    }
    
    if (sendEmailBtn) {
        sendEmailBtn.addEventListener('click', function() {
            document.querySelector('.contact-form-section').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    if (visitForumBtn) {
        visitForumBtn.addEventListener('click', function() {
            showNotification('Opening Community Forum...', 'info');
        });
    }
    
    if (browseArticlesBtn) {
        browseArticlesBtn.addEventListener('click', function() {
            showNotification('Opening Knowledge Base...', 'info');
        });
    }
    
    // Live Chat Widget
    const chatWidget = document.getElementById('chatWidget');
    const chatToggle = document.getElementById('chatToggle');
    const minimizeChat = document.querySelector('.minimize-chat');
    const sendBtn = document.querySelector('.send-btn');
    const chatInput = document.querySelector('.chat-input input');
    
    function toggleChatWidget() {
        chatWidget.classList.toggle('open');
        chatToggle.style.display = chatWidget.classList.contains('open') ? 'none' : 'flex';
    }
    
    if (chatToggle) {
        chatToggle.addEventListener('click', toggleChatWidget);
    }
    
    if (minimizeChat) {
        minimizeChat.addEventListener('click', toggleChatWidget);
    }
    
    if (sendBtn && chatInput) {
        sendBtn.addEventListener('click', function() {
            sendMessage();
        });
        
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            addMessageToChat(message, 'user');
            chatInput.value = '';
            
            // Simulate bot response
            setTimeout(() => {
                const responses = [
                    "Thanks for your message! One of our support agents will be with you shortly.",
                    "I understand you're having an issue. Let me connect you with a specialist.",
                    "Could you provide more details about your problem?",
                    "I've found a helpful article that might solve your issue. Would you like me to share it?"
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addMessageToChat(randomResponse, 'bot');
            }, 1000);
        }
    }
    
    function addMessageToChat(message, sender) {
        const chatMessages = document.querySelector('.chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.innerHTML = `
            <div class="avatar">${sender === 'bot' ? 'B' : 'U'}</div>
            <div class="content">
                <span class="name">${sender === 'bot' ? 'Support Bot' : 'You'}</span>
                <p>${message}</p>
                <span class="time">Just now</span>
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Contact Form Submission
    const supportForm = document.getElementById('supportForm');
    
    if (supportForm) {
        supportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #00ff00, #00cc00)';
                
                // Reset form after success
                setTimeout(() => {
                    supportForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = 'linear-gradient(135deg, #ff2d75, #ff5a3d)';
                    showNotification('Your support request has been submitted! We\'ll contact you within 24 hours.', 'success');
                }, 1500);
            }, 2000);
        });
    }
    
    // File Upload Preview
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            const files = this.files;
            const fileInfo = this.nextElementSibling.nextElementSibling;
            
            if (files.length > 0) {
                const fileNames = Array.from(files).map(file => file.name).join(', ');
                fileInfo.textContent = `${files.length} file(s) selected: ${fileNames.substring(0, 50)}${fileNames.length > 50 ? '...' : ''}`;
                fileInfo.style.color = '#00ffea';
            } else {
                fileInfo.textContent = 'Max 3 files, 10MB each';
                fileInfo.style.color = '#aaaaaa';
            }
        });
    }
    
    // Quick Help Cards Animation
    const helpCards = document.querySelectorAll('.help-card');
    helpCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(card);
    });
    
    // System Status Updates
    function updateSystemStatus() {
        const statusBadges = document.querySelectorAll('.status-badge');
        
        statusBadges.forEach(badge => {
            if (badge.classList.contains('operational')) {
                // Random chance for status change (for demo purposes)
                if (Math.random() < 0.01) { // 1% chance
                    badge.classList.remove('operational');
                    badge.classList.add('degraded');
                    badge.textContent = 'Degraded';
                    badge.style.background = 'rgba(255, 215, 0, 0.2)';
                    badge.style.color = '#ffd700';
                    
                    // Revert after 30 seconds
                    setTimeout(() => {
                        badge.classList.remove('degraded');
                        badge.classList.add('operational');
                        badge.textContent = 'Operational';
                        badge.style.background = 'rgba(0, 255, 0, 0.2)';
                        badge.style.color = '#00ff00';
                    }, 30000);
                }
            }
        });
    }
    
    // Update status every 10 seconds
    setInterval(updateSystemStatus, 10000);
    
    // Notification System
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
    
    // Initialize chat with welcome message
    setTimeout(() => {
        addMessageToChat("Welcome to GameHub Support! How can I help you today?", 'bot');
    }, 1000);
});