
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
    const sections = document.querySelectorAll('.legal-section');
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
    printBtn.className = 'print-terms-btn';
    printBtn.innerHTML = '<i class="fas fa-print"></i> Print Terms';
    printBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        background: linear-gradient(135deg, #ff2d75, #ff5a3d);
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
        box-shadow: 0 5px 20px rgba(255, 45, 117, 0.3);
        transition: all 0.3s ease;
    `;
    
    printBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 10px 25px rgba(255, 45, 117, 0.4)';
    });
    
    printBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 20px rgba(255, 45, 117, 0.3)';
    });
    
    printBtn.addEventListener('click', function() {
        window.print();
    });
    
    document.body.appendChild(printBtn);
    
    // Add print styles
    const printStyle = document.createElement('style');
    printStyle.textContent = `
        @media print {
            header, footer, .legal-sidebar, .print-terms-btn {
                display: none !important;
            }
            
            .legal-content {
                background: white !important;
                color: black !important;
                box-shadow: none !important;
                border: 1px solid #ddd !important;
            }
            
            h1, h2, h3, h4, h5, h6 {
                color: black !important;
            }
            
            .legal-link {
                color: #0066cc !important;
            }
            
            .bg-overlay {
                display: none !important;
            }
        }
    `;
    document.head.appendChild(printStyle);
    
    // Copy section link functionality
    const sectionHeaders = document.querySelectorAll('.section-header h2');
    
    sectionHeaders.forEach(header => {
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-section-link';
        copyBtn.innerHTML = '<i class="fas fa-link"></i>';
        copyBtn.title = 'Copy section link';
        copyBtn.style.cssText = `
            background: transparent;
            border: none;
            color: #00ffea;
            cursor: pointer;
            font-size: 1rem;
            margin-left: 15px;
            padding: 5px 10px;
            border-radius: 5px;
            transition: all 0.3s ease;
        `;
        
        copyBtn.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(0, 255, 234, 0.1)';
        });
        
        copyBtn.addEventListener('mouseleave', function() {
            this.style.background = 'transparent';
        });
        
        copyBtn.addEventListener('click', function() {
            const section = header.closest('.legal-section');
            const sectionId = section.getAttribute('id');
            const url = `${window.location.origin}${window.location.pathname}#${sectionId}`;
            
            navigator.clipboard.writeText(url).then(() => {
                const originalHTML = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i>';
                this.style.color = '#00ff00';
                
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                    this.style.color = '#00ffea';
                }, 2000);
            });
        });
        
        header.appendChild(copyBtn);
    });
    
    // Initialize
    highlightCurrentSection();
});