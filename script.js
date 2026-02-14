// 1. SELECT ELEMENTS
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const typingElement = document.getElementById('typing-text');

// 2. THEME TOGGLE LOGIC
const initializeTheme = () => {
    const savedTheme = localStorage.getItem('selam-portfolio-theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }
};

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('selam-portfolio-theme', isDark ? 'dark' : 'light');
});

// 3. TYPING EFFECT LOGIC
const introText = "Hello, I'm Selam Mengistu.\nI build AI agents for websites."; 
let index = 0;

function typeEffect() {
    if (index < introText.length) {
        if (introText.charAt(index) === "\n") {
            typingElement.innerHTML += "<br>"; 
        } else {
            typingElement.innerHTML += introText.charAt(index);
        }
        
        index++;
        const randomSpeed = Math.floor(Math.random() * 50) + 70;
        setTimeout(typeEffect, randomSpeed);
    }
}

// 4. NEW: CASE STUDY TOGGLE LOGIC
// This finds all "Read Case Study" buttons and makes them functional
function initCaseStudies() {
    const caseButtons = document.querySelectorAll('.toggle-case-study');
    
    caseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const caseStudyContent = button.nextElementSibling;
            
            // Toggle the 'active' class to slide open/closed
            caseStudyContent.classList.toggle('active');
            
            // Update button text based on state
            if (caseStudyContent.classList.contains('active')) {
                button.textContent = "Close Case Study";
            } else {
                button.textContent = "Read Case Study";
            }
        });
    });
}

// 5. BOOTSTRAP THE PAGE
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initCaseStudies(); // Initialize the new feature
    
    // Start typing after a small delay (500ms) for better UX
    setTimeout(typeEffect, 500);
});
