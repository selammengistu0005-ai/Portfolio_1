// 1. SELECT ELEMENTS
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const typingElement = document.getElementById('typing-text');

// 2. THEME TOGGLE LOGIC
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Save preference to Local Storage
    const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('portfolio-theme', currentTheme);
});

// Check for saved user preference on page load
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
}

// 3. TYPING EFFECT LOGIC
const introText = "Hello, I'm Selam Mengistu.";
let charIndex = 0;

function typeEffect() {
    if (charIndex < introText.length) {
        // Add the character
        typingElement.textContent += introText.charAt(charIndex);
        charIndex++;
        
        // Randomize typing speed slightly for a "human" bot feel
        const delay = Math.floor(Math.random() * 50) + 70; 
        setTimeout(typeEffect, delay);
    } else {
        // Optional: Add a CSS class to stop the cursor from blinking 
        // or to trigger a second line of text!
        typingElement.style.borderRight = "none";
    }
}

// 4. INITIALIZE
document.addEventListener('DOMContentLoaded', () => {
    // Start typing after a short initial delay
    setTimeout(typeEffect, 500);
});
