/* ============================================================
   SELAM MENGISTU — Portfolio Widget v1.0
   my_widget.js  — Button-based FAQ + Contact chat widget
   Self-contained: injects its own styles + DOM on load.
   ============================================================ */

(function () {
    'use strict';

    /* ── KNOWLEDGE BASE ──────────────────────────────────────── */
    const FAQ = [
        {
            id: 'who',
            label: '👤 Who is Selam?',
            answer: `I'm <strong>Selam Mengistu</strong> — an AI Agent Designer & Developer based in Ethiopia. I specialise in building custom conversational AI agents that businesses can deploy on their websites to handle bookings, FAQs, lead capture, and more — 24 / 7.`
        },
        {
            id: 'what',
            label: '🤖 What do you build?',
            answer: `I design and deploy <strong>button-based & conversational AI agents</strong> tailored to specific industries — fitness studios, dental clinics, specialty healthcare, and more. Each agent is trained on your business's data and handles real customer interactions automatically.`
        },
        {
            id: 'projects',
            label: '📁 What projects have you done?',
            answer: `Here are my current deployments & samples:<br><br>
💪 <strong>Power Gym</strong> — 24/7 booking & nutrition AI<br>
🏋️ <strong>Dawit Personal Trainer</strong> — client intake & scheduling AI<br>
🦷 <strong>Smile Dental</strong> *(sample)* — appointment & cost query AI<br>
🏥 <strong>Tori Speciality</strong> *(sample)* — patient intake automation<br>
🦷 <strong>CareDent</strong> — lead capture & consultation booking AI`
        },
        {
            id: 'hire',
            label: '💼 How do I hire you?',
            answer: `Easy! Just reach out via Telegram or email (see the <em>Contact</em> option below). Tell me about your business, what problems you want solved, and I'll come back with a plan. Typical turnaround is <strong>3–7 days</strong> from brief to live agent.`
        },
        {
            id: 'price',
            label: '💰 What are your rates?',
            answer: `Pricing depends on the complexity of the website ( static or dynamic ) and the number of integrations needed. I work with <strong>small businesses & solo professionals</strong> and keep pricing fair. Send me a message and I'll give you a transparent quote — no surprises.`
        },
        {
            id: 'contact',
            label: '📬 Contact Selam',
            isContact: true
        }
    ];

    const CONTACT = {
        telegram: 'NO telegram account',
        github:   'https://github.com/selammengistu0005-ai',
        email:    'mailto:selammengistu0005@gmail.com'
    };

    /* ── STYLES ───────────────────────────────────────────────── */
    const CSS = `
        /* ── Widget Launcher ── */
        #sm-widget-launcher {
            position: fixed;
            bottom: 1.75rem;
            right: 1.75rem;
            z-index: 9999;
            width: 3.25rem;
            height: 3.25rem;
            border-radius: 50%;
            background: #00d2d3;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 0 0 rgba(0,210,211,0.5), 0 0.5rem 1.5rem rgba(0,0,0,0.5);
            animation: sm-pulse 2.8s ease-in-out infinite;
            transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), background 0.2s;
        }
        #sm-widget-launcher:hover {
            transform: scale(1.1);
            background: #00b8b9;
        }
        #sm-widget-launcher svg { pointer-events: none; }
        @keyframes sm-pulse {
            0%,100% { box-shadow: 0 0 0 0 rgba(0,210,211,0.45), 0 0.5rem 1.5rem rgba(0,0,0,0.5); }
            60%      { box-shadow: 0 0 0 0.875rem rgba(0,210,211,0), 0 0.5rem 1.5rem rgba(0,0,0,0.5); }
        }

        /* ── Panel ── */
        #sm-widget-panel {
            position: fixed;
            bottom: 5.75rem;
            right: 1.75rem;
            z-index: 9998;
            width: 22rem;
            max-height: 75vh;
            display: flex;
            flex-direction: column;
            border-radius: 1.25rem;
            background: rgba(5, 13, 26, 0.92);
            border: 1px solid rgba(0,210,211,0.22);
            backdrop-filter: blur(1.25rem);
            -webkit-backdrop-filter: blur(1.25rem);
            box-shadow: 0 1.5rem 4rem rgba(0,0,0,0.7), 0 0 2rem rgba(0,210,211,0.12);
            overflow: hidden;
            transform-origin: bottom right;
            transform: scale(0.85) translateY(1rem);
            opacity: 0;
            pointer-events: none;
            transition: transform 0.28s cubic-bezier(0.34,1.3,0.64,1), opacity 0.22s ease;
        }
        #sm-widget-panel.sm-open {
            transform: scale(1) translateY(0);
            opacity: 1;
            pointer-events: all;
        }

        /* Light mode support */
        body.light-mode #sm-widget-panel {
            background: rgba(240,244,248,0.95);
            border-color: rgba(0,210,211,0.3);
            box-shadow: 0 1.5rem 4rem rgba(0,0,0,0.18), 0 0 2rem rgba(0,210,211,0.1);
        }

        /* ── Header ── */
        #sm-widget-header {
            padding: 1rem 1.25rem 0.875rem;
            background: linear-gradient(135deg, rgba(0,210,211,0.14) 0%, rgba(0,210,211,0.04) 100%);
            border-bottom: 1px solid rgba(0,210,211,0.15);
            display: flex;
            align-items: center;
            gap: 0.75rem;
            flex-shrink: 0;
        }
        .sm-avatar {
            width: 2.375rem;
            height: 2.375rem;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid #00d2d3;
            flex-shrink: 0;
        }
        .sm-header-text { flex: 1; min-width: 0; }
        .sm-header-name {
            font-size: 0.875rem;
            font-weight: 700;
            color: #e8edf5;
            letter-spacing: -0.01em;
            line-height: 1.2;
        }
        body.light-mode .sm-header-name { color: #0d1b2a; }
        .sm-header-status {
            font-size: 0.7rem;
            color: #2ecc71;
            display: flex;
            align-items: center;
            gap: 0.3rem;
            margin-top: 0.15rem;
        }
        .sm-status-dot {
            width: 0.45rem;
            height: 0.45rem;
            border-radius: 50%;
            background: #2ecc71;
            animation: sm-pulse-dot 2.5s ease-in-out infinite;
        }
        @keyframes sm-pulse-dot {
            0%,100% { opacity: 1; }
            50% { opacity: 0.4; }
        }
        #sm-widget-close {
            background: none;
            border: none;
            cursor: pointer;
            color: rgba(232,237,245,0.45);
            font-size: 1.25rem;
            line-height: 1;
            padding: 0.25rem;
            border-radius: 0.375rem;
            transition: color 0.2s, background 0.2s;
            flex-shrink: 0;
        }
        #sm-widget-close:hover { color: #e8edf5; background: rgba(255,255,255,0.07); }
        body.light-mode #sm-widget-close { color: rgba(13,27,42,0.4); }
        body.light-mode #sm-widget-close:hover { color: #0d1b2a; background: rgba(0,0,0,0.05); }

        /* ── Message Feed ── */
        #sm-widget-feed {
            flex: 1;
            overflow-y: auto;
            padding: 1rem 1rem 0.5rem;
            display: flex;
            flex-direction: column;
            gap: 0.625rem;
            scroll-behavior: smooth;
        }
        #sm-widget-feed::-webkit-scrollbar { width: 0.25rem; }
        #sm-widget-feed::-webkit-scrollbar-track { background: transparent; }
        #sm-widget-feed::-webkit-scrollbar-thumb { background: rgba(0,210,211,0.25); border-radius: 1rem; }

        /* Bubbles */
        .sm-bubble {
            max-width: 88%;
            padding: 0.625rem 0.875rem;
            border-radius: 1rem;
            font-size: 0.8rem;
            line-height: 1.55;
            animation: sm-pop 0.22s cubic-bezier(0.34,1.4,0.64,1) both;
        }
        @keyframes sm-pop {
            from { opacity:0; transform: scale(0.88) translateY(6px); }
            to   { opacity:1; transform: scale(1)    translateY(0);   }
        }
        .sm-bubble-bot {
            background: rgba(0,210,211,0.1);
            border: 1px solid rgba(0,210,211,0.18);
            color: #e8edf5;
            border-bottom-left-radius: 0.25rem;
            align-self: flex-start;
        }
        body.light-mode .sm-bubble-bot {
            background: rgba(0,210,211,0.1);
            color: #0d1b2a;
            border-color: rgba(0,210,211,0.25);
        }
        .sm-bubble-bot strong { color: #00d2d3; }
        .sm-bubble-bot em { color: rgba(232,237,245,0.6); font-style: normal; }
        body.light-mode .sm-bubble-bot em { color: rgba(13,27,42,0.55); }

        .sm-bubble-user {
            background: #00d2d3;
            color: #050d1a;
            border-bottom-right-radius: 0.25rem;
            align-self: flex-end;
            font-weight: 600;
        }

        /* ── Button Grid ── */
        #sm-widget-buttons {
            padding: 0.625rem 1rem 1rem;
            display: flex;
            flex-direction: column;
            gap: 0.45rem;
            flex-shrink: 0;
            border-top: 1px solid rgba(0,210,211,0.1);
        }
        .sm-btn {
            width: 100%;
            text-align: left;
            padding: 0.6rem 0.875rem;
            border-radius: 0.625rem;
            border: 1px solid rgba(0,210,211,0.18);
            background: rgba(255,255,255,0.04);
            color: rgba(232,237,245,0.85);
            font-size: 0.78rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.18s ease;
            letter-spacing: 0.01em;
            font-family: 'Segoe UI', system-ui, sans-serif;
        }
        .sm-btn:hover {
            background: rgba(0,210,211,0.12);
            border-color: rgba(0,210,211,0.4);
            color: #e8edf5;
            transform: translateX(2px);
        }
        body.light-mode .sm-btn {
            background: rgba(0,0,0,0.04);
            color: rgba(13,27,42,0.8);
            border-color: rgba(0,210,211,0.22);
        }
        body.light-mode .sm-btn:hover {
            background: rgba(0,210,211,0.1);
            color: #0d1b2a;
        }
        .sm-btn-back {
            background: transparent;
            border-color: rgba(255,255,255,0.1);
            color: rgba(232,237,245,0.45);
            font-size: 0.72rem;
            font-weight: 500;
        }
        .sm-btn-back:hover {
            background: rgba(255,255,255,0.05);
            border-color: rgba(255,255,255,0.2);
            color: rgba(232,237,245,0.75);
            transform: none;
        }
        body.light-mode .sm-btn-back { color: rgba(13,27,42,0.4); }
        body.light-mode .sm-btn-back:hover { color: rgba(13,27,42,0.7); }

        /* Contact links */
        .sm-contact-links {
            display: flex;
            flex-direction: column;
            gap: 0.45rem;
        }
        .sm-contact-link {
            display: flex;
            align-items: center;
            gap: 0.625rem;
            padding: 0.625rem 0.875rem;
            border-radius: 0.625rem;
            border: 1px solid rgba(0,210,211,0.2);
            background: rgba(0,210,211,0.06);
            color: #00d2d3;
            font-size: 0.8rem;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.18s ease;
            font-family: 'Segoe UI', system-ui, sans-serif;
        }
        .sm-contact-link:hover {
            background: rgba(0,210,211,0.15);
            border-color: rgba(0,210,211,0.45);
            transform: translateX(2px);
        }
        .sm-contact-icon { font-size: 1rem; flex-shrink: 0; }

        /* Mobile */
        @media (max-width: 26rem) {
            #sm-widget-panel { width: calc(100vw - 2rem); right: 1rem; }
            #sm-widget-launcher { right: 1rem; bottom: 1.125rem; }
        }
    `;

    /* ── DOM BUILDER ─────────────────────────────────────────── */
    function buildWidget() {
        // Inject styles
        const style = document.createElement('style');
        style.textContent = CSS;
        document.head.appendChild(style);

        // Launcher button
        const launcher = document.createElement('button');
        launcher.id = 'sm-widget-launcher';
        launcher.setAttribute('aria-label', 'Chat with Selam');
        launcher.innerHTML = `
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#050d1a" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>`;

        // Panel
        const panel = document.createElement('div');
        panel.id = 'sm-widget-panel';
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-label', 'Chat with Selam Mengistu');

        panel.innerHTML = `
            <!-- Header -->
            <div id="sm-widget-header">
                <img
                    class="sm-avatar"
                    src="https://raw.githubusercontent.com/selammengistu0005-ai/my_photo/main/photo_2026-02-11_15-41-50.jpg"
                    alt="Selam Mengistu"
                >
                <div class="sm-header-text">
                    <div class="sm-header-name">Selam Mengistu</div>
                    <div class="sm-header-status">
                        <span class="sm-status-dot"></span>
                        Available — usually replies fast
                    </div>
                </div>
                <button id="sm-widget-close" aria-label="Close chat">✕</button>
            </div>

            <!-- Feed -->
            <div id="sm-widget-feed"></div>

            <!-- Buttons -->
            <div id="sm-widget-buttons"></div>
        `;

        document.body.appendChild(launcher);
        document.body.appendChild(panel);

        return {
            launcher,
            panel,
            feed:    panel.querySelector('#sm-widget-feed'),
            buttons: panel.querySelector('#sm-widget-buttons'),
            close:   panel.querySelector('#sm-widget-close')
        };
    }

    /* ── CORE LOGIC ──────────────────────────────────────────── */
    function init() {
        const el = buildWidget();
        let isOpen = false;

        // Toggle open / close
        function openPanel() {
            isOpen = true;
            el.panel.classList.add('sm-open');
            el.launcher.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#050d1a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>`;
            if (el.feed.childElementCount === 0) showGreeting();
        }

        function closePanel() {
            isOpen = false;
            el.panel.classList.remove('sm-open');
            el.launcher.innerHTML = `
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#050d1a" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>`;
        }

        el.launcher.addEventListener('click', () => isOpen ? closePanel() : openPanel());
        el.close.addEventListener('click', closePanel);

        // Add a message bubble
        function addBubble(html, type = 'bot', delay = 0) {
            return new Promise(resolve => {
                setTimeout(() => {
                    const bubble = document.createElement('div');
                    bubble.className = `sm-bubble sm-bubble-${type}`;
                    bubble.innerHTML = html;
                    el.feed.appendChild(bubble);
                    el.feed.scrollTop = el.feed.scrollHeight;
                    resolve();
                }, delay);
            });
        }

        // Render button list
        function renderButtons(items) {
            el.buttons.innerHTML = '';
            items.forEach(item => {
                const btn = document.createElement('button');
                btn.className = 'sm-btn' + (item.back ? ' sm-btn-back' : '');
                btn.textContent = item.label;
                btn.addEventListener('click', item.action);
                el.buttons.appendChild(btn);
            });
        }

        // Greeting + FAQ menu
        function showGreeting() {
            addBubble(`👋 Hey! I'm <strong>Selam's portfolio assistant</strong>.<br>What would you like to know?`, 'bot', 120);
            renderMainMenu();
        }

        function renderMainMenu() {
            renderButtons(
                FAQ.map(faq => ({
                    label: faq.label,
                    action: () => handleFAQ(faq)
                }))
            );
        }

        function handleFAQ(faq) {
            // User bubble
            addBubble(faq.label.replace(/^[\S]+\s/, ''), 'user');

            if (faq.isContact) {
                showContactCard();
                return;
            }

            // Bot typing delay, then answer
            setTimeout(() => {
                addBubble(faq.answer, 'bot', 320);
                setTimeout(() => {
                    renderButtons([
                        ...FAQ.filter(f => f.id !== faq.id).map(f => ({
                            label: f.label,
                            action: () => handleFAQ(f)
                        }))
                    ]);
                }, 400);
            }, 150);
        }

        function showContactCard() {
            setTimeout(() => {
                addBubble(`Here's how to reach me directly. I'd love to hear about your project! 🚀`, 'bot', 300);
            }, 150);

            setTimeout(() => {
                el.buttons.innerHTML = `
                    <div class="sm-contact-links">
                        <a href="${CONTACT.telegram}" target="_blank" class="sm-contact-link">
                            <span class="sm-contact-icon">✈️</span> Telegram — @selam_ai
                        </a>
                        <a href="${CONTACT.email}" class="sm-contact-link">
                            <span class="sm-contact-icon">📧</span> selammengistu0005@gmail.com
                        </a>
                        <a href="${CONTACT.github}" target="_blank" class="sm-contact-link">
                            <span class="sm-contact-icon">🐙</span> GitHub — selammengistu0005-ai
                        </a>
                    </div>
                    <button class="sm-btn sm-btn-back" id="sm-back-btn">← Back to questions</button>
                `;
                document.getElementById('sm-back-btn').addEventListener('click', () => {
                    renderMainMenu();
                });
                el.feed.scrollTop = el.feed.scrollHeight;
            }, 550);
        }
    }

    /* ── BOOT ─────────────────────────────────────────────────── */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();