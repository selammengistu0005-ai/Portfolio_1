const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const typingElement = document.getElementById('typing-text');

// 1. Theme Toggle Logic
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Check for saved user preference
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
}

// 2. Typing Effect Logic
const name = "Hello, I'm Selam Mengistu.";
let index = 0;

function typeEffect() {
    if (index < name.length) {
        typingElement.innerHTML += name.charAt(index);
        index++;
        setTimeout(typeEffect, 100); // Speed of typing
    }
}

// Start typing on load
window.onload = typeEffect;