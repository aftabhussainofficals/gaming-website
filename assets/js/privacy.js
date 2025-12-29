
// Privacy Policy Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for table of contents
    const tocLinks = document.querySelectorAll('.toc-nav a');
    
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Highlight active section
                tocLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Highlight current section on scroll
    const sections = document.querySelectorAll('.privacy-section');
    const navLinks = document.querySelectorAll('.toc-nav a');
    
    function highlightCurrentSection() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightCurrentSection);
    
    // Cookie Consent Management
    const cookieConsent = document.getElementById('cookieConsent');
    const cookieAcceptBtn = document.querySelector('.cookie-accept-btn');
    const cookieSettingsBtn = document.querySelector('.cookie-settings-btn');
    const manageConsentBtn = document.querySelector('.manage-consent');
    const cookieSettingsBtn2 = document.querySelector('.cookie-settings');
    
    // Show cookie consent if not accepted
    if (!getCookie('cookie_consent')) {
        setTimeout(() => {
            cookieConsent.classList.add('show');
        }, 1000);
    }
    
    // Accept all cookies
    if (cookieAcceptBtn) {
        cookieAcceptBtn.addEventListener('click', function() {
            setCookie('cookie_consent', 'accepted', 365);
            setCookie('cookie_analytics', 'true', 365);
            setCookie('cookie_functional', 'true', 365);
            cookieConsent.classList.remove('show');
            showNotification('Cookie preferences saved!', 'success');
        });
    }
    
    // Cookie settings
    if (cookieSettingsBtn) {
        cookieSettingsBtn.addEventListener('click', function() {
            showCookieSettingsModal();
        });
    }
    
    if (cookieSettingsBtn2) {
        cookieSettingsBtn2.addEventListener('click', function() {
            showCookieSettingsModal();
        });
    }
    
    if (manageConsentBtn) {
        manageConsentBtn.addEventListener('click', function() {
            showCookieSettingsModal();
        });
    }
    
    // Cookie management functions
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/;SameSite=Lax";
    }
    
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
        }
        return null;
    }
    
    function showCookieSettingsModal() {
        const modal = document.createElement('div');
        modal.className = 'cookie-settings-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-sliders-h"></i> Cookie Settings</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="cookie-option">
                        <div class="option-header">
                            <h4>Essential Cookies</h4>
                            <label class="toggle-switch">
                                <input type="checkbox" checked disabled>
                                <span class="slider"></span>
                            </label>
                        </div>
                        <p>Required for the website to function properly. Cannot be disabled.</p>
                    </div>
                    
                    <div class="cookie-option">
                        <div class="option-header">
                            <h4>Functional Cookies</h4>
                            <label class="toggle-switch">
                                <input type="checkbox" id="functional-cookies" ${getCookie('cookie_functional') ? 'checked' : ''}>
                                <span class="slider"></span>
                            </label>
                        </div>
                        <p>Remember your preferences and settings for a better experience.</p>
                    </div>
                    
                    <div class="cookie-option">
                        <div class="option-header">
                            <h4>Analytical Cookies</h4>
                            <label class="toggle-switch">
                                <input type="checkbox" id="analytics-cookies" ${getCookie('cookie_analytics') ? 'checked' : ''}>
                                <span class="slider"></span>
                            </label>
                        </div>
                        <p>Help us understand how visitors use our website.</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="save-settings">Save Preferences</button>
                    <button class="accept-all">Accept All</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add styles
        const styles = document.createElement('style');
        styles.textContent = `
            .cookie-settings-modal {
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
                max-width: 500px;
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
            
            .cookie-option {
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 15px;
                padding: 1.5rem;
                margin-bottom: 1rem;
            }
            
            .option-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 0.5rem;
            }
            
            .option-header h4 {
                color: #ffffff;
                margin: 0;
                font-size: 1.1rem;
            }
            
            .toggle-switch {
                position: relative;
                display: inline-block;
                width: 50px;
                height: 24px;
            }
            
            .toggle-switch input {
                opacity: 0;
                width: 0;
                height: 0;
            }
            
            .slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #333;
                transition: .4s;
                border-radius: 24px;
            }
            
            .slider:before {
                position: absolute;
                content: "";
                height: 16px;
                width: 16px;
                left: 4px;
                bottom: 4px;
                background-color: white;
                transition: .4s;
                border-radius: 50%;
            }
            
            input:checked + .slider {
                background-color: #00ffea;
            }
            
            input:focus + .slider {
                box-shadow: 0 0 1px #00ffea;
            }
            
            input:checked + .slider:before {
                transform: translateX(26px);
            }
            
            .cookie-option p {
                color: #aaaaaa;
                font-size: 0.9rem;
                margin: 0;
            }
            
            .modal-footer {
                padding: 1.5rem;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                display: flex;
                gap: 10px;
                justify-content: flex-end;
            }
            
            .save-settings, .accept-all {
                padding: 10px 20px;
                border: none;
                border-radius: 10px;
                font-family: 'Exo 2', sans-serif;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .save-settings {
                background: linear-gradient(135deg, #00ffea, #0099ff);
                color: white;
            }
            
            .accept-all {
                background: linear-gradient(135deg, #ff2d75, #ff5a3d);
                color: white;
            }
            
            .save-settings:hover, .accept-all:hover {
                transform: translateY(-3px);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            }
        `;
        document.head.appendChild(styles);
        
        // Close modal
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
            styles.remove();
        });
        
        // Save settings
        modal.querySelector('.save-settings').addEventListener('click', () => {
            const functional = modal.querySelector('#functional-cookies').checked;
            const analytics = modal.querySelector('#analytics-cookies').checked;
            
            setCookie('cookie_consent', 'custom', 365);
            setCookie('cookie_functional', functional.toString(), 365);
            setCookie('cookie_analytics', analytics.toString(), 365);
            
            cookieConsent.classList.remove('show');
            modal.remove();
            styles.remove();
            showNotification('Cookie preferences saved!', 'success');
        });
        
        // Accept all
        modal.querySelector('.accept-all').addEventListener('click', () => {
            setCookie('cookie_consent', 'accepted', 365);
            setCookie('cookie_analytics', 'true', 365);
            setCookie('cookie_functional', 'true', 365);
            cookieConsent.classList.remove('show');
            modal.remove();
            styles.remove();
            showNotification('All cookies accepted!', 'success');
        });
    }
    
    // Download PDF functionality
    const downloadLink = document.querySelector('.download-link');
    if (downloadLink) {
        downloadLink.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Downloading Privacy Policy PDF...', 'info');
            
            // Simulate download
            setTimeout(() => {
                showNotification('PDF downloaded successfully!', 'success');
            }, 1500);
        });
    }
    
    // Data request functionality
    const dataRequestBtn = document.querySelector('.data-request');
    if (dataRequestBtn) {
        dataRequestBtn.addEventListener('click', function() {
            showDataRequestForm();
        });
    }
    
    function showDataRequestForm() {
        const modal = document.createElement('div');
        modal.className = 'data-request-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-file-export"></i> Data Request</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="dataRequestForm">
                        <div class="form-group">
                            <label for="requestType">Request Type</label>
                            <select id="requestType" required>
                                <option value="">Select request type</option>
                                <option value="access">Data Access Request</option>
                                <option value="rectification">Data Rectification</option>
                                <option value="erasure">Data Erasure Request</option>
                                <option value="restriction">Processing Restriction</option>
                                <option value="portability">Data Portability</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="email">Email Address</label>
                            <input type="email" id="email" required placeholder="Your registered email">
                        </div>
                        
                        <div class="form-group">
                            <label for="description">Additional Details</label>
                            <textarea id="description" rows="4" placeholder="Provide any additional details about your request..."></textarea>
                        </div>
                        
                        <div class="form-group">
                            <label class="checkbox-label">
                                <input type="checkbox" required>
                                <span>I confirm that I am the owner of this account or have authorization to make this request</span>
                            </label>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="submit" form="dataRequestForm" class="submit-request">Submit Request</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add styles
        const styles = document.createElement('style');
        styles.textContent = `
            .data-request-modal {
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
            
            .data-request-modal .modal-content {
                background: linear-gradient(135deg, rgba(20, 20, 40, 0.95), rgba(26, 26, 53, 0.95));
                border: 2px solid rgba(0, 255, 234, 0.3);
                border-radius: 20px;
                width: 90%;
                max-width: 500px;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
            }
            
            .form-group {
                margin-bottom: 1.5rem;
            }
            
            .form-group label {
                display: block;
                color: #ffffff;
                margin-bottom: 0.5rem;
                font-weight: 500;
            }
            
            .form-group select,
            .form-group input,
            .form-group textarea {
                width: 100%;
                padding: 12px;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 10px;
                color: white;
                font-family: 'Exo 2', sans-serif;
                font-size: 1rem;
            }
            
            .form-group select:focus,
            .form-group input:focus,
            .form-group textarea:focus {
                outline: none;
                border-color: #00ffea;
                box-shadow: 0 0 0 2px rgba(0, 255, 234, 0.2);
            }
            
            .checkbox-label {
                display: flex;
                align-items: flex-start;
                gap: 10px;
                cursor: pointer;
                color: #cccccc;
                font-size: 0.9rem;
            }
            
            .checkbox-label input[type="checkbox"] {
                margin-top: 3px;
                width: 16px;
                height: 16px;
                accent-color: #00ffea;
            }
            
            .submit-request {
                width: 100%;
                padding: 12px;
                background: linear-gradient(135deg, #00ffea, #0099ff);
                border: none;
                border-radius: 10px;
                color: white;
                font-family: 'Exo 2', sans-serif;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .submit-request:hover {
                transform: translateY(-3px);
                box-shadow: 0 10px 20px rgba(0, 255, 234, 0.3);
            }
        `;
        document.head.appendChild(styles);
        
        // Close modal
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
            styles.remove();
        });
        
        // Form submission
        modal.querySelector('#dataRequestForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = modal.querySelector('.submit-request');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Data request submitted successfully! Our team will contact you within 30 days.', 'success');
                modal.remove();
                styles.remove();
            }, 2000);
        });
    }
    
    // Notification system
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="close-notification">&times;</button>
        `;
        
        // Add styles
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
    
    // Animate sections on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(section);
    });
    
    // Print functionality
    const printBtn = document.createElement('button');
    printBtn.className = 'print-privacy-btn';
    printBtn.innerHTML = '<i class="fas fa-print"></i> Print Policy';
    printBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        background: linear-gradient(135deg, #00ffea, #0099ff);
        color: white;
        border: none;
        padding: 15px 25px;
        border-radius: 50px;
        cursor: pointer;
        font-family: 'Exo 2', sans-serif;
        font-weight: 600;
        font-size: 16px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 1000;
        box-shadow: 0 5px 20px rgba(0, 255, 234, 0.3);
        transition: all 0.3s ease;
    `;
    
    printBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 10px 25px rgba(0, 255, 234, 0.4)';
    });
    
    printBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 20px rgba(0, 255, 234, 0.3)';
    });
    
    printBtn.addEventListener('click', function() {
        window.print();
    });
    
    document.body.appendChild(printBtn);
    
    // Add print styles
    const printStyle = document.createElement('style');
    printStyle.textContent = `
        @media print {
            header, footer, .privacy-sidebar, .print-privacy-btn, .cookie-consent {
                display: none !important;
            }
            
            .privacy-content {
                background: white !important;
                color: black !important;
                box-shadow: none !important;
                border: 1px solid #ddd !important;
            }
            
            h1, h2, h3, h4, h5, h6 {
                color: black !important;
            }
            
            a {
                color: #0066cc !important;
            }
            
            .bg-overlay {
                display: none !important;
            }
            
            .privacy-section {
                page-break-inside: avoid;
            }
        }
    `;
    document.head.appendChild(printStyle);
    
    // Initialize
    highlightCurrentSection();
});