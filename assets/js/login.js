const authWrapper = document.querySelector('.auth-wrapper');
const loginTrigger = document.querySelector('.login-trigger');
const registerTrigger = document.querySelector('.register-trigger');

registerTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    authWrapper.classList.add('toggled');
    document.body.classList.add('signup');
    document.body.classList.remove('signin');
});

loginTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    authWrapper.classList.remove('toggled');
    document.body.classList.add('signin');
    document.body.classList.remove('signup');
});

// Initial state
document.body.classList.add('signin');