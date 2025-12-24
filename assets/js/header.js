// Header JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const headerElement = document.querySelector('header');
    if (headerElement) {
        fetch('../components/header.html')
            .then(response => response.text())
            .then(data => {
                headerElement.innerHTML = data;
                // Set active nav item
                setActiveNav();
            })
            .catch(error => console.error('Error loading header:', error));
    }

    const footerElement = document.querySelector('footer');
    if (footerElement) {
        fetch('../components/footer.html')
            .then(response => response.text())
            .then(data => {
                footerElement.innerHTML = data;
            })
            .catch(error => console.error('Error loading footer:', error));
    }
});

function setActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('header nav a');
    
    // Remove active from all
    navLinks.forEach(link => link.classList.remove('active'));
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === '/' && currentPath === '/') {
            link.classList.add('active');
        } else if (href === currentPath.substring(1)) {
            link.classList.add('active');
        }
    });
}