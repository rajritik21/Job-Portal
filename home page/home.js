// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const authButtons = document.querySelector('.auth-buttons');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    authButtons.classList.toggle('active');
});

// Active link highlighting
const navLinksAll = document.querySelectorAll('.nav-links a');
navLinksAll.forEach(link => {
    link.addEventListener('click', function() {
        navLinksAll.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) {
        navLinks.classList.remove('active');
        authButtons.classList.remove('active');
    }
});

// Your existing JavaScript code...