// ═══════════════════════════════════════
//  SEOARI ✦ — script.js
// ═══════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

    // ── PRELOADER ──────────────────────────
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('loaded');
        }, 900);
    });
    // Fallback si load tarda demasiado
    setTimeout(() => preloader.classList.add('loaded'), 2800);


    // ── PARTÍCULAS ─────────────────────────
    const particlesContainer = document.getElementById('particles');
    const PARTICLE_COUNT = 18;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');

        const size   = Math.random() * 4 + 2;
        const left   = Math.random() * 100;
        const delay  = Math.random() * 12;
        const dur    = Math.random() * 10 + 8;
        const colors = ['#f48fb1', '#f9c74f', '#d8b4fe', '#fce4ec', '#e91e8c'];
        const color  = colors[Math.floor(Math.random() * colors.length)];

        p.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            background: ${color};
            --dur: ${dur}s;
            animation-delay: ${delay}s;
        `;
        particlesContainer.appendChild(p);
    }


    // ── PANELES (abrir / cerrar) ────────────
    const navBtns    = document.querySelectorAll('.nav-btn');
    const panels     = document.querySelectorAll('.panel');
    const closeBtns  = document.querySelectorAll('.panel-close');

    function openPanel(panelId) {
        // Cierra todos primero
        panels.forEach(p => p.classList.remove('active'));
        navBtns.forEach(b => b.classList.remove('active'));

        const panel = document.getElementById(panelId);
        if (panel) {
            panel.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        // Marca el botón activo
        const activeBtn = document.querySelector(`.nav-btn[data-panel="${panelId}"]`);
        if (activeBtn) activeBtn.classList.add('active');

        // Animación de entrada de las cards de bots
        if (panelId === 'bots-panel') {
            animateBotCards();
        }
    }

    function closeAllPanels() {
        panels.forEach(p => p.classList.remove('active'));
        navBtns.forEach(b => b.classList.remove('active'));
        document.body.style.overflow = '';
    }

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const panelId = btn.dataset.panel;
            const panel   = document.getElementById(panelId);
            if (panel && panel.classList.contains('active')) {
                closeAllPanels();
            } else {
                openPanel(panelId);
            }
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', closeAllPanels);
    });

    // Clic en backdrop cierra el panel
    panels.forEach(panel => {
        panel.addEventListener('click', (e) => {
            if (e.target === panel) closeAllPanels();
        });
    });

    // Tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAllPanels();
    });


    // ── TYPEWRITER ─────────────────────────
    const typewriterEls = document.querySelectorAll('.typewriter');

    typewriterEls.forEach((el, index) => {
        const originalHTML = el.innerHTML;
        el.innerHTML = '';
        el.classList.add('typed');

        setTimeout(() => {
            let i = 0;
            const interval = setInterval(() => {
                if (i < originalHTML.length) {
                    el.innerHTML = originalHTML.substring(0, i + 1);
                    i++;
                } else {
                    clearInterval(interval);
                }
            }, 28);
        }, 1200 + index * 350);
    });


    // ── FLIP DE BOT CARDS (toque en móvil) ──
    const botCards = document.querySelectorAll('.bot-card');

    botCards.forEach(card => {
        // Touch: toggle flip
        card.addEventListener('click', () => {
            if (window.matchMedia('(hover: none)').matches) {
                card.classList.toggle('flipped');
            }
        });
    });


    // ── ANIMACIÓN ENTRADA BOT CARDS ─────────
    function animateBotCards() {
        const cards = document.querySelectorAll('.bot-card');
        cards.forEach((card, i) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'none';

            setTimeout(() => {
                card.style.transition = `opacity 0.4s ease, transform 0.4s ease`;
                card.style.opacity    = '1';
                card.style.transform  = 'translateY(0)';
            }, 80 + i * 60);
        });
    }


    // ── BOTÓN COPIAR LINK ───────────────────
    const copyBtn = document.getElementById('copy-link-btn');
    if (copyBtn) {
        const originalDesc = copyBtn.querySelector('.lk-desc');
        const originalText = originalDesc ? originalDesc.textContent : '';

        copyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            navigator.clipboard.writeText(window.location.href).then(() => {
                copyBtn.classList.add('copied');
                if (originalDesc) originalDesc.textContent = '¡Enlace copiado! ✦';

                setTimeout(() => {
                    copyBtn.classList.remove('copied');
                    if (originalDesc) originalDesc.textContent = originalText;
                }, 2200);
            }).catch(() => {
                // Fallback para navegadores que bloquean clipboard
                if (originalDesc) {
                    originalDesc.textContent = '¡Copia la URL manualmente!';
                    setTimeout(() => {
                        originalDesc.textContent = originalText;
                    }, 2200);
                }
            });
        });
    }


    // ── EFECTO PARALLAX SUAVE ───────────────
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            const xOff = ((clientX / innerWidth)  - 0.5) * 6;
            const yOff = ((clientY / innerHeight) - 0.5) * 6;

            document.body.style.backgroundPosition =
                `calc(50% + ${xOff}px) calc(50% + ${yOff}px)`;
        });
    }


    // ── HOVER SONIDO SUTIL (visual feedback) ─
    // Efecto de ripple en botones al clic
    function addRipple(e) {
        const btn    = e.currentTarget;
        const circle = document.createElement('span');
        const rect   = btn.getBoundingClientRect();
        const size   = Math.max(rect.width, rect.height);
        const x      = e.clientX - rect.left - size / 2;
        const y      = e.clientY - rect.top  - size / 2;

        circle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(244, 143, 177, 0.25);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-anim 0.55s ease-out forwards;
            pointer-events: none;
        `;
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(circle);

        setTimeout(() => circle.remove(), 600);
    }

    // Inyectar animación ripple en el head si no existe
    if (!document.getElementById('ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple-anim {
                to { transform: scale(2.5); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    document.querySelectorAll('.nav-btn, .link-item').forEach(btn => {
        btn.addEventListener('click', addRipple);
    });


    // ── TILT SUTIL EN STAT BUBBLES ──────────
    const bubbles = document.querySelectorAll('.stat-bubble');
    bubbles.forEach(bubble => {
        bubble.addEventListener('mousemove', (e) => {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            const rect = bubble.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width  / 2;
            const y = e.clientY - rect.top  - rect.height / 2;
            const tiltX =  (y / rect.height) * 12;
            const tiltY = -(x / rect.width)  * 12;
            bubble.style.transform = `translateY(-3px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        });
        bubble.addEventListener('mouseleave', () => {
            bubble.style.transform = '';
        });
    });


    // ── GLITCH SUTIL AL TÍTULO ──────────────
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        heroName.addEventListener('mouseenter', () => {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            heroName.style.transition = 'filter 0.1s';
            const seq = [
                { filter: 'hue-rotate(20deg) brightness(1.1)' },
                { filter: 'hue-rotate(0deg)  brightness(1)' },
                { filter: 'hue-rotate(40deg) brightness(1.2)' },
                { filter: 'hue-rotate(0deg)  brightness(1)' },
            ];
            let i = 0;
            const tick = setInterval(() => {
                if (i < seq.length) {
                    Object.assign(heroName.style, seq[i]);
                    i++;
                } else {
                    clearInterval(tick);
                    heroName.style.filter = '';
                }
            }, 80);
        });
    }

}); // end DOMContentLoaded
