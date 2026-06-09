/* ============================================================
   SELAM MENGISTU — PORTFOLIO v2.0
   script.js
   ============================================================ */

// 1. ELEMENT REFERENCES
const themeToggle   = document.getElementById('theme-toggle');
const body          = document.body;
const typingElement = document.getElementById('typing-text');

// ============================================================
// 2. THEME — default is dark, toggle switches to light-mode
// ============================================================
const THEME_KEY = 'selam-portfolio-theme-v2';

function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    // Default: dark. Only apply light-mode class if explicitly saved.
    if (saved === 'light') {
        body.classList.add('light-mode');
    }
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');
    localStorage.setItem(THEME_KEY, isLight ? 'light' : 'dark');
});

// ============================================================
// 3. TYPING EFFECT
// ============================================================
const introLines = [
    "Hello, I'm Selam Mengistu.",
    "I build AI agents for websites."
];

let lineIndex  = 0;
let charIndex  = 0;
let isDeleting = false;
let isPaused   = false;

function typeEffect() {
    const currentLine = introLines[lineIndex];

    if (isPaused) return;

    if (!isDeleting) {
        // Typing forward
        typingElement.innerHTML =
            introLines.slice(0, lineIndex).join('<br>') +
            (lineIndex > 0 ? '<br>' : '') +
            currentLine.slice(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentLine.length) {
            // Finished typing the current line
            if (lineIndex < introLines.length - 1) {
                // Move to next line after a short pause
                lineIndex++;
                charIndex = 0;
                setTimeout(typeEffect, 500);
                return;
            } else {
                // All lines done — stop, cursor keeps blinking
                return;
            }
        }
    }

    const speed = Math.floor(Math.random() * 45) + 60;
    setTimeout(typeEffect, speed);
}

// ============================================================
// 4. CASE STUDY ACCORDION
// ============================================================
function initCaseStudies() {
    const buttons = document.querySelectorAll('.toggle-case-study');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const panel = button.nextElementSibling;
            const isOpen = panel.classList.contains('active');

            // Close all other open panels first
            document.querySelectorAll('.case-study.active').forEach(openPanel => {
                if (openPanel !== panel) {
                    openPanel.classList.remove('active');
                    const siblingBtn = openPanel.previousElementSibling;
                    if (siblingBtn) {
                        siblingBtn.textContent = 'View Case Study';
                        siblingBtn.classList.remove('open');
                    }
                }
            });

            // Toggle clicked panel
            panel.classList.toggle('active', !isOpen);
            button.classList.toggle('open', !isOpen);
            button.textContent = isOpen ? 'View Case Study' : 'Close Case Study';
        });
    });
}

// ============================================================
// 5. CARD ENTRANCE ANIMATION (Intersection Observer)
// ============================================================
function initCardAnimations() {
    const cards = document.querySelectorAll('.project-frame');

    // Set initial state via inline style
    cards.forEach(card => {
        card.style.opacity    = '0';
        card.style.transform  = 'translateY(32px)';
        card.style.transition = 'opacity 0.55s ease, transform 0.55s cubic-bezier(0.34, 1.2, 0.64, 1)';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Stagger by index
                const card  = entry.target;
                const index = Array.from(cards).indexOf(card);
                setTimeout(() => {
                    card.style.opacity   = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 90);
                observer.unobserve(card);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => observer.observe(card));
}

// ============================================================
// 6. "VIEW MY WORK" CHIP — smooth scroll (already in HTML
//    via inline onclick, this is a fallback for any .chip)
// ============================================================
function initChips() {
    document.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const gallery = document.querySelector('.project-gallery');
            if (gallery) {
                gallery.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ============================================================
// 7. BOOTSTRAP
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initCaseStudies();
    initCardAnimations();
    initChips();

    // Start typing after a short load delay
    setTimeout(typeEffect, 600);
});
