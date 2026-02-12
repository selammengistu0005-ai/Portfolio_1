// 1. SELECT ELEMENTS
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const typingElement = document.getElementById('typing-text');

// 2. THEME TOGGLE LOGIC
// This function checks for a saved theme in the browser's memory
const initializeTheme = () => {
    const savedTheme = localStorage.getItem('selam-portfolio-theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }
};

themeToggle.addEventListener('click', () => {
    // Toggle the class on the body
    body.classList.toggle('dark-mode');
    
    // Save the preference so it persists on refresh
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('selam-portfolio-theme', isDark ? 'dark' : 'light');
});

// 3. TYPING EFFECT LOGIC
const introText = "Hello, I'm Selam Mengistu.\nI build AI agents for websites."; 
let index = 0;

function typeEffect() {
    if (index < introText.length) {
        // NEW LOGIC: If the character is \n, add a line break tag
        if (introText.charAt(index) === "\n") {
            typingElement.innerHTML += "<br>"; 
        } else {
            // Use innerHTML instead of textContent
            typingElement.innerHTML += introText.charAt(index);
        }
        
        index++;
        const randomSpeed = Math.floor(Math.random() * 50) + 70;
        setTimeout(typeEffect, randomSpeed);
    }
}

// 4. BOOTSTRAP THE PAGE
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    
    // Start typing after a small delay (500ms) for better UX
    setTimeout(typeEffect, 500);
});

