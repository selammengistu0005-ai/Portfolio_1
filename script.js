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
const introText = "Hello, I'm Selam Mengistu.";
let index = 0;

function typeEffect() {
    if (index < introText.length) {
        // Append one character at a time
        typingElement.textContent += introText.charAt(index);
        index++;
        
        // Randomize typing speed slightly (70ms to 120ms) 
        // to make it look like a real chatbot agent is responding
        const randomSpeed = Math.floor(Math.random() * 50) + 70;
        setTimeout(typeEffect, randomSpeed);
    } else {
        // Once finished, we keep the blinking cursor 
        // (Handled via CSS animation on the #typing-text ID)
    }
}

// 4. BOOTSTRAP THE PAGE
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    
    // Start typing after a small delay (500ms) for better UX
    setTimeout(typeEffect, 500);
});
