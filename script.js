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
    "I build websites."
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
// 4. CASE STUDY CANVAS
// ============================================================

// ---- 4a. Project data ----
// Gallery items render as styled placeholder tiles until a real
// `src` is added — then they'll render the actual screenshot instead.
const PROJECT_DATA = {

    powergym: {
        theme: 'gold',
        icon: '💪',
        title: 'Power Gym',
        category: 'GYM • FITNESS',
        gallery: [
            { src: 'https://res.cloudinary.com/dhoymhers/image/upload/q_auto/f_auto/v1782100474/d19a26a5-b8b3-43e6-a607-c6a8074b2307.png', label: 'Power Gym' },
            { src: 'https://res.cloudinary.com/dhoymhers/image/upload/q_auto/f_auto/v1782100701/26912a3f-f196-4b67-962f-3c87bc6b3568.png', label: 'Power Gym' },
            { src: 'https://res.cloudinary.com/dhoymhers/image/upload/q_auto/f_auto/v1782100640/bf4f6c0f-d68a-48a3-a760-a54494bfbcca.png', label: 'Power Gym' }
        ],
        problems: [
            { icon: '⚠️', title: 'No 24/7 Support', points: ['Members got no answers after hours', 'Front desk overwhelmed at peak times'] },
            { icon: '📅', title: 'Missed Bookings', points: ['Class slots went unfilled', 'Staff unavailable to confirm spots'] },
            { icon: '📉', title: 'Low Engagement', points: ['Generic mass messages only', 'No personalised follow-up'] }
        ],
        solutions: [
            { icon: '🤖', title: 'AI Agent Deployment', points: ['Handles inquiries 24/7', 'Cuts staff workload significantly'] },
            { icon: '⚡', title: 'Instant Responses', points: ['FAQ automated in real time', 'Class & pricing info on demand'] },
            { icon: '🎯', title: 'Personalised Plans', points: ['Goal-based program matching', 'Nutrition tips per member'] },
            { icon: '📈', title: 'Automated Follow-Ups', points: ['Re-engages inactive members', 'Boosts repeat bookings'] }
        ],
        metrics: [
            { value: 41, suffix: '%', label: 'More Bookings', detail: 'Class bookings rose after launch' },
            { value: 65, suffix: '%', label: 'Less Front-Desk Load', detail: 'Routine questions auto-handled' },
            { value: 3.2, suffix: 'x', label: 'Member Growth', detail: 'New sign-ups via the chat widget' },
            { value: 4.8, suffix: '/5', label: 'Member Rating', detail: 'Average satisfaction score' }
        ],
        beforeAfter: { before: 'Manual booking calls, slow replies, missed leads after hours.', after: 'Instant 24/7 booking, FAQ & nutrition guidance, zero missed leads.' },
        testimonial: { quote: 'Members get answers instantly now, even late at night. No-shows dropped fast.', name: 'Gym Operations Lead' },
        stack: ['Conversational AI', 'Booking API', 'Webhook Automation', 'GitHub Pages'],
        timeline: [{ label: 'Discovery', day: 'Day 1' }, { label: 'Design', day: 'Day 2-3' }, { label: 'Build', day: 'Day 4-5' }, { label: 'Deploy', day: 'Day 6' }],
        progress: 100,
        url: 'https://selammengistu0005-ai.github.io/Power_fitness/'
    },

    dawitpt: {
        theme: 'red',
        icon: '🏋️',
        title: 'Dawit Personal Trainer',
        category: 'FITNESS • PERSONAL TRAINING',
        gallery: [
            { src: 'https://res.cloudinary.com/dhoymhers/image/upload/q_auto/f_auto/v1782101347/770d8294-5c24-411d-a12e-c63b04540b69.png', label: 'Dawit PT' },
            { src: 'https://res.cloudinary.com/dhoymhers/image/upload/q_auto/f_auto/v1782101426/67ea8bdc-fbd4-4187-a0af-56821b62a68d.png', label: 'Dawit PT' }
        ],
        problems: [
            { icon: '⏰', title: 'Hours Lost Daily', points: ['Repetitive scheduling questions', 'No time left for actual coaching'] },
            { icon: '📵', title: 'Missed Messages', points: ['Client texts piled up overnight', 'Slow replies hurt trust'] },
            { icon: '📝', title: 'Manual Intake', points: ['New clients filled paper forms', 'Onboarding felt outdated'] }
        ],
        solutions: [
            { icon: '🤖', title: 'Automated Intake', points: ['New clients self-onboard instantly', 'Goals captured automatically'] },
            { icon: '💬', title: '24/7 Q&A', points: ['Scheduling questions answered live', 'No more backlog of messages'] },
            { icon: '🏋️', title: 'Workout Guidance', points: ['Personalised plans delivered automatically', 'Trainer time freed for real coaching'] }
        ],
        metrics: [
            { value: 12, suffix: 'hrs/wk', label: 'Time Saved', detail: 'Admin hours reclaimed weekly' },
            { value: 58, suffix: '%', label: 'Faster Replies', detail: 'Average response time cut' },
            { value: 2.1, suffix: 'x', label: 'New Clients', detail: 'Onboarding rate increase' },
            { value: 4.9, suffix: '/5', label: 'Client Rating', detail: 'Average satisfaction score' }
        ],
        beforeAfter: { before: 'Paper intake forms, late-night texts, scheduling chaos.', after: 'Instant digital intake, 24/7 Q&A, organised scheduling.' },
        testimonial: { quote: 'I got my evenings back. Clients get answered even when I am training someone else.', name: 'Personal Trainer' },
        stack: ['Conversational AI', 'Calendar Sync', 'Form Automation', 'GitHub Pages'],
        timeline: [{ label: 'Discovery', day: 'Day 1' }, { label: 'Design', day: 'Day 2' }, { label: 'Build', day: 'Day 3-4' }, { label: 'Deploy', day: 'Day 5' }],
        progress: 100,
        url: 'https://selammengistu0005-ai.github.io/dawitGYM/'
    },

    smiledental: {
        theme: 'medical',
        icon: '🦷',
        title: 'Smile Dental',
        category: 'HEALTH • DENTAL',
        gallery: [
            { src: 'https://res.cloudinary.com/dhoymhers/image/upload/q_auto/f_auto/v1782101727/a4cf740e-e0cb-45ed-9087-ef3b5fe3ff0d.png', label: 'Smile Dental' },
            { src: 'https://res.cloudinary.com/dhoymhers/image/upload/q_auto/f_auto/v1782101796/a3c7d5c4-4443-4ff8-a944-8d26c8ab5930.png', label: 'Smile Dental' },
            { src: 'https://res.cloudinary.com/dhoymhers/image/upload/q_auto/f_auto/v1782101876/967f5906-8e0d-4e0b-9a85-4a171c391f00.png', label: 'Smile Dental' },
            { src: 'https://res.cloudinary.com/dhoymhers/image/upload/q_auto/f_auto/v1782101942/894d7228-2644-4c87-9332-0f5462dcb204.png', label: 'Smile Dental' }
        ],
        problems: [
            { icon: '📞', title: 'Phone Overload', points: ['Reception flooded with availability calls', 'Hold times frustrated patients'] },
            { icon: '💸', title: 'Cost Confusion', points: ['Patients unsure of treatment pricing', 'Repeated calls just to ask cost'] },
            { icon: '🩹', title: 'Aftercare Gaps', points: ['Patients forgot post-treatment instructions', 'Avoidable follow-up calls'] }
        ],
        solutions: [
            { icon: '🤖', title: 'AI Front Desk', points: ['Pre-screens appointment requests', 'Frees staff for in-chair care'] },
            { icon: '💬', title: 'Instant Cost Answers', points: ['Treatment pricing on demand', 'Fewer interrupting phone calls'] },
            { icon: '📋', title: 'Aftercare Automation', points: ['Sends care instructions automatically', 'Cuts avoidable follow-ups'] }
        ],
        metrics: [
            { value: 47, suffix: '%', label: 'Fewer Calls', detail: 'Routine calls deflected to chat' },
            { value: 33, suffix: '%', label: 'Faster Booking', detail: 'Average time-to-book reduced' },
            { value: 2.4, suffix: 'x', label: 'Lead Capture', detail: 'After-hours enquiries converted' },
            { value: 4.7, suffix: '/5', label: 'Patient Rating', detail: 'Average satisfaction score' }
        ],
        beforeAfter: { before: 'Busy phone lines, pricing confusion, missed aftercare follow-through.', after: 'Automated pre-screening, instant pricing answers, guided aftercare.' },
        testimonial: { quote: 'Our front desk finally has breathing room. Patients get answers without waiting on hold.', name: 'Clinic Manager' },
        stack: ['Conversational AI', 'Appointment API', 'Cost Calculator Logic', 'GitHub Pages'],
        timeline: [{ label: 'Discovery', day: 'Day 1' }, { label: 'Design', day: 'Day 2' }, { label: 'Build', day: 'Day 3' }, { label: 'Deploy', day: 'Day 4' }],
        progress: 100,
        url: 'https://selammengistu0005-ai.github.io/smile_dental/'
    },

    torispecialty: {
        theme: 'teal',
        icon: '🏥',
        title: 'Tori Speciality',
        category: 'HEALTH • SPECIALITY CLINIC',
        gallery: [
            { src: 'https://res.cloudinary.com/dhoymhers/image/upload/q_auto/f_auto/v1782102202/97a0cca3-370b-4ecc-a8c9-05ea357351c3.png', label: 'Tori Speciality' },
            { src: 'https://res.cloudinary.com/dhoymhers/image/upload/q_auto/f_auto/v1782102338/1c4b05c0-e86f-4d01-8fe0-304d3592133b.png', label: 'Tori Speciality' },
            { src: 'https://res.cloudinary.com/dhoymhers/image/upload/q_auto/f_auto/v1782102344/9460ae0c-e1a5-4b2d-96f8-c4ead4d0d407.png', label: 'Tori Speciality' },
            { src: 'https://res.cloudinary.com/dhoymhers/image/upload/q_auto/f_auto/v1782102435/29e27b5f-c1fc-408f-b0b2-7e3a827e2a39.png', label: 'Tori Speciality' },
            { src: 'https://res.cloudinary.com/dhoymhers/image/upload/q_auto/f_auto/v1782102491/1c9ebd46-f444-4297-9ab9-e89f7a20c303.png', label: 'Tori Speciality' }
        ],
        problems: [
            { icon: '📝', title: 'Manual Triage', points: ['Staff manually sorted intake forms', 'Slowed time-to-appointment'] },
            { icon: '🩺', title: 'Incomplete Symptom Data', points: ['Patients under-reported symptoms', 'Specialists lacked context upfront'] },
            { icon: '🔀', title: 'Routing Errors', points: ['Patients sent to the wrong specialist', 'Wasted first-visit time'] }
        ],
        solutions: [
            { icon: '🤖', title: 'Automated Pre-Screening', points: ['Captures symptoms before the visit', 'Speeds up appointment readiness'] },
            { icon: '🩺', title: 'Structured Symptom Intake', points: ['Consistent data for every patient', 'Specialists arrive better informed'] },
            { icon: '🎯', title: 'Smart Routing', points: ['Matches patients to the right specialist', 'Cuts mis-routed first visits'] }
        ],
        metrics: [
            { value: 39, suffix: '%', label: 'Faster Intake', detail: 'Time-to-appointment reduced' },
            { value: 52, suffix: '%', label: 'Fewer Mis-Routes', detail: 'Patients reaching correct specialist first try' },
            { value: 1.8, suffix: 'x', label: 'Staff Capacity', detail: 'Effective intake throughput' },
            { value: 4.6, suffix: '/5', label: 'Patient Rating', detail: 'Average satisfaction score' }
        ],
        beforeAfter: { before: 'Manual triage, inconsistent symptom data, frequent mis-routing.', after: 'Automated pre-screening, structured intake, accurate specialist routing.' },
        testimonial: { quote: 'Specialists now see patients with the right information already in hand.', name: 'Clinic Administrator' },
        stack: ['Conversational AI', 'Triage Logic', 'Specialist Routing Engine', 'GitHub Pages'],
        timeline: [{ label: 'Discovery', day: 'Day 1' }, { label: 'Design', day: 'Day 2' }, { label: 'Build', day: 'Day 3-4' }, { label: 'Deploy', day: 'Day 5' }],
        progress: 100,
        url: 'https://selammengistu0005-ai.github.io/Tori_speciality/'
    },

    caredent: {
        theme: 'blue',
        icon: '🦷',
        title: 'CareDent',
        category: 'DENTAL CLINIC',
        gallery: [
            { src: 'https://res.cloudinary.com/dhoymhers/image/upload/q_auto/f_auto/v1782102822/19361518-f9cc-41e0-9615-5d903ed205e7.png', label: 'CareDent' },
            { src: 'https://res.cloudinary.com/dhoymhers/image/upload/q_auto/f_auto/v1782102905/47485a74-b32e-4c12-8077-a36a10be3317.png', label: 'CareDent' },
            { src: 'https://res.cloudinary.com/dhoymhers/image/upload/q_auto/f_auto/v1782102963/43e3e7b6-da3a-4307-9ec1-e0d932ff7671.png', label: 'CareDent' },
            { src: 'https://res.cloudinary.com/dhoymhers/image/upload/q_auto/f_auto/v1782102994/288b0dea-8b80-42a5-9cdc-1f2b8def0251.png', label: 'CareDent' },
            { src: 'https://res.cloudinary.com/dhoymhers/image/upload/q_auto/f_auto/v1782103031/f72bb760-d3b5-4b14-9422-6e5c3f6268a0.png', label: 'CareDent' },
            { src: 'https://res.cloudinary.com/dhoymhers/image/upload/q_auto/f_auto/v1782103082/f54d19e8-9b89-4f09-bb59-c7e70a5e2b2b.png', label: 'CareDent' }
        ],
        problems: [
            { icon: '🌙', title: 'After-Hours Leads Lost', points: ['Enquiries arrived outside business hours', 'No one to respond in time'] },
            { icon: '⏳', title: 'Slow Follow-Up', points: ['Leads waited days for a reply', 'Many never converted'] },
            { icon: '📭', title: 'No Confirmations', points: ['Bookings lacked automatic confirmation', 'Patients unsure if it went through'] }
        ],
        solutions: [
            { icon: '🤖', title: '24/7 Lead Capture', points: ['Engages enquiries the moment they arrive', 'Nothing falls through overnight'] },
            { icon: '⚡', title: 'Instant Qualification', points: ['Qualifies leads in real time', 'Routes serious enquiries to staff'] },
            { icon: '✉️', title: 'Automated Confirmations', points: ['Sends booking confirmations instantly', 'Reduces no-shows and confusion'] }
        ],
        metrics: [
            { value: 44, suffix: '%', label: 'More Leads Converted', detail: 'After-hours enquiries captured' },
            { value: 71, suffix: '%', label: 'Faster Response', detail: 'Time-to-first-reply reduced' },
            { value: 2.6, suffix: 'x', label: 'Consultations Booked', detail: 'Increase in booked consults' },
            { value: 4.8, suffix: '/5', label: 'Patient Rating', detail: 'Average satisfaction score' }
        ],
        beforeAfter: { before: 'After-hours leads went cold, slow follow-up, no booking confirmations.', after: '24/7 lead capture, instant qualification, automatic confirmations.' },
        testimonial: { quote: 'We stopped losing leads overnight. Every enquiry gets an instant, helpful response.', name: 'Clinic Owner' },
        stack: ['Conversational AI', 'Lead Qualification Logic', 'Booking & Email Automation', 'GitHub Pages'],
        timeline: [{ label: 'Discovery', day: 'Day 1' }, { label: 'Design', day: 'Day 2' }, { label: 'Build', day: 'Day 3-4' }, { label: 'Deploy', day: 'Day 5' }],
        progress: 100,
        url: 'https://selammengistu0005-ai.github.io/care_dental_clinic/'
    }
};

let activeCaseCard = null;

// ---- 4b. HTML builder helpers — Premium Redesign ----

function ccGalleryTile(item, isMain) {
    const inner = item.src
        ? `<img src="${item.src}" alt="${item.label}">`
        : `<span class="cc-gallery-icon">${item.icon}</span><span class="cc-gallery-label">${item.label}</span>`;
    return `<div class="cc-gallery-tile${isMain ? ' cc-gallery-main' : ''}">${inner}</div>`;
}

function buildGalleryHTML(gallery) {
    const [main, ...rest] = gallery;
    return `
        <div class="cc-gallery">
            ${ccGalleryTile(main, true)}
            <div class="cc-gallery-thumbs">
                ${rest.map(item => ccGalleryTile(item, false)).join('')}
            </div>
        </div>`;
}

function buildCardGrid(items, variant) {
    return `
        <div class="cc-card-grid cc-card-grid--${variant}">
            ${items.map(item => `
                <div class="cc-mini-card cc-mini-card--${variant}">
                    <span class="cc-mini-icon">${item.icon}</span>
                    <h5>${item.title}</h5>
                    <ul>${item.points.map(p => `<li>${p}</li>`).join('')}</ul>
                </div>
            `).join('')}
        </div>`;
}

function buildMetricsHTML(metrics) {
    return `
        <div class="cc-metrics">
            ${metrics.map(m => `
                <div class="cc-metric" data-value="${m.value}" data-suffix="${m.suffix}">
                    <span class="cc-metric-value">0</span>
                    <span class="cc-metric-label">${m.label}</span>
                    <p class="cc-metric-detail">${m.detail}</p>
                </div>
            `).join('')}
        </div>`;
}

function buildBeforeAfterHTML(ba) {
    return `
        <div class="cc-before-after">
            <div class="cc-ba-block cc-ba-before"><span class="cc-ba-tag">Before</span><p>${ba.before}</p></div>
            <div class="cc-ba-arrow">→</div>
            <div class="cc-ba-block cc-ba-after"><span class="cc-ba-tag">After</span><p>${ba.after}</p></div>
        </div>`;
}

function buildTestimonialHTML(t) {
    return `
        <div class="cc-testimonial">
            <span class="cc-quote-mark">"</span>
            <p class="cc-quote-text">${t.quote}</p>
            <span class="cc-quote-name">— ${t.name}</span>
        </div>`;
}

function buildStackHTML(stack) {
    return `
        <div class="cc-stack">
            ${stack.map(s => `<span class="cc-badge">${s}</span>`).join('')}
        </div>`;
}

function buildTimelineHTML(timeline) {
    return `
        <div class="cc-timeline">
            ${timeline.map(t => `
                <div class="cc-timeline-step">
                    <span class="cc-timeline-dot"></span>
                    <span class="cc-timeline-label">${t.label}</span>
                    <span class="cc-timeline-day">${t.day}</span>
                </div>
            `).join('')}
        </div>`;
}

function buildViewButtonHTML(url) {
    return `
        <div class="cc-view-btn-wrap">
            <a href="${url}" target="_blank" rel="noopener noreferrer" class="cc-view-btn">
                View Website <span class="cc-view-arrow">→</span>
            </a>
        </div>`;
}

function buildCanvas(project) {
    const wrapper = document.createElement('div');
    wrapper.className = `case-canvas cc-theme-${project.theme}`;

    // Background layers appended to body directly so CSS animation
    // on .case-canvas doesn't break position:fixed on children
    const bgLayer = document.createElement('div');
    bgLayer.className = `cc-bg-layer cc-theme-${project.theme}`;
    bgLayer.innerHTML = `
        <div class="cc-bg-mesh"></div>
        <div class="cc-aurora-a"></div>
        <div class="cc-aurora-b"></div>
        <div class="cc-aurora-c"></div>
        <div class="cc-bg-dots"></div>
    `;
    document.body.appendChild(bgLayer);

    wrapper.innerHTML = `
        <button class="cc-close" aria-label="Close case study">✕</button>
        <div class="cc-inner">
            <div class="cc-progress"><div class="cc-progress-fill" data-target="${project.progress}"></div></div>
            <div class="cc-header">
                <span class="cc-header-icon">${project.icon}</span>
                <div class="cc-heading">
                    <h3 class="cc-title">${project.title}</h3>
                    <span class="cc-category">${project.category}</span>
                </div>
            </div>
            ${buildGalleryHTML(project.gallery)}
            <div class="cc-problem-solution">
                <div class="cc-ps-col">
                    <h4 class="cc-ps-heading cc-ps-heading--problem">The Problem</h4>
                    ${buildCardGrid(project.problems, 'problem')}
                </div>
                <div class="cc-ps-col">
                    <h4 class="cc-ps-heading cc-ps-heading--solution">The Solution</h4>
                    ${buildCardGrid(project.solutions, 'solution')}
                </div>
            </div>
            <span class="cc-section-heading">Impact</span>
            ${buildMetricsHTML(project.metrics)}
            ${buildBeforeAfterHTML(project.beforeAfter)}
            ${buildTestimonialHTML(project.testimonial)}
            ${buildStackHTML(project.stack)}
            ${buildTimelineHTML(project.timeline)}
            ${project.url ? buildViewButtonHTML(project.url) : ''}
            </div>
        </div>
    `;
    return wrapper;
}

// ---- 4c. Count-up animation for KPI numbers ----
function animateCountUp(el, target, suffix, duration) {
    const isDecimal = target % 1 !== 0;
    const start = performance.now();

    function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;
        el.textContent = (isDecimal ? current.toFixed(1) : Math.round(current)) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

// ---- 4d. Gallery interactivity: click a thumb to swap it into the main spot, plus subtle parallax ----
function initGalleryInteractions(canvas) {
    const gallery = canvas.querySelector('.cc-gallery');
    if (!gallery) return;

    gallery.querySelectorAll('.cc-gallery-thumbs .cc-gallery-tile').forEach(thumb => {
        thumb.addEventListener('click', () => {
            const mainTile = gallery.querySelector('.cc-gallery-main');
            const swap = mainTile.innerHTML;
            mainTile.innerHTML = thumb.innerHTML;
            thumb.innerHTML = swap;
        });
    });

    gallery.addEventListener('mousemove', (e) => {
        const rect = gallery.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gallery.querySelectorAll('.cc-gallery-tile').forEach((tile, i) => {
            const depth = (i + 1) * 4;
            tile.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
        });
    });

    gallery.addEventListener('mouseleave', () => {
        gallery.querySelectorAll('.cc-gallery-tile').forEach(tile => {
            tile.style.transform = '';
        });
    });
}

// ---- 4e. Open / close ----
function openCaseStudy(card) {
    if (activeCaseCard === card) return;
    if (activeCaseCard) closeCaseStudy(activeCaseCard);

    const project = PROJECT_DATA[card.dataset.project];
    if (!project) return;

    const canvas = buildCanvas(project);
    document.body.appendChild(canvas);
    document.body.classList.add('case-open');
    
    if (project.gallery) {
        project.gallery.forEach(item => {
            if (item.src) {
                const img = new Image();
                img.src = item.src;
            }
        });
    }
    activeCaseCard = card;

    canvas.querySelector('.cc-close').addEventListener('click', (e) => {
        e.stopPropagation();
        closeCaseStudy(card);
    });

    canvas.querySelectorAll('.cc-metric').forEach(metric => {
        metric.addEventListener('click', () => metric.classList.toggle('is-expanded'));
    });

    initGalleryInteractions(canvas);

    // Count-up + progress bar fire once the entrance animation has mostly settled
    setTimeout(() => {
        canvas.querySelectorAll('.cc-metric').forEach(metric => {
            const valueEl = metric.querySelector('.cc-metric-value');
            animateCountUp(valueEl, parseFloat(metric.dataset.value), metric.dataset.suffix, 1100);
        });
        const fill = canvas.querySelector('.cc-progress-fill');
        if (fill) fill.style.width = fill.dataset.target + '%';
    }, 350);
}

function closeCaseStudy(card) {
    const canvas = document.querySelector('.case-canvas');
    if (canvas) canvas.remove();
    const bgLayer = document.querySelector('.cc-bg-layer');
    if (bgLayer) bgLayer.remove();
    document.body.classList.remove('case-open');
    if (activeCaseCard === card) activeCaseCard = null;
}

// ---- 4f. Init: whole card is clickable ----
function initCaseStudyCanvas() {
    document.querySelectorAll('.project-frame[data-project]').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.frame-btn')) return;   // let the external "View" link work normally
            if (e.target.closest('.case-canvas')) return; // ignore clicks already inside an open canvas
            openCaseStudy(card);
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && activeCaseCard) closeCaseStudy(activeCaseCard);
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
    initCaseStudyCanvas();
    initCardAnimations();
    initChips();

    // Start typing after a short load delay
    setTimeout(typeEffect, 600);
});
