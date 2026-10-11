/* ═══════════════════════════════════════════════════════════════
   TORN POSTCARD PORTFOLIO — 3D Editorial Exhibition
   Interactive 3D Physics, Paper Mechanics, Procedural Sound FX
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── DOM References ──────────────────────────────────────────
  const htmlEl = document.documentElement;
  const nav = document.getElementById('nav');
  const navMenuBtn = document.getElementById('nav-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const navLinks = document.querySelectorAll('.nav__link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav__link');
  const themeToggle = document.getElementById('theme-toggle');
  const themeText = document.getElementById('theme-text');
  const sunIcon = document.querySelector('.theme-icon-sun');
  const moonIcon = document.querySelector('.theme-icon-moon');
  const soundToggle = document.getElementById('sound-toggle');
  const soundIconOn = document.querySelector('.sound-icon-on');
  const soundIconOff = document.querySelector('.sound-icon-off');
  const ambientSpotlight = document.getElementById('ambient-spotlight');

  // Hero elements
  const heroStage = document.getElementById('hero-stage');
  const heroCards = document.querySelectorAll('.hero-card');
  const heroFlipToggle = document.getElementById('hero-flip-toggle');
  const flipAllBtn = document.getElementById('flip-all-btn');

  // Gallery elements
  const filterBtns = document.querySelectorAll('.filter-btn');
  const postcardWraps = document.querySelectorAll('.postcard-3d-wrap');

  // Desk workshop elements
  const deskAuthor = document.getElementById('desk-author');
  const deskEmail = document.getElementById('desk-email');
  const deskRecipient = document.getElementById('desk-recipient');
  const deskMessage = document.getElementById('desk-message');
  const liveHandwriting = document.getElementById('live-handwriting');
  const liveSignature = document.getElementById('live-signature');
  const liveRecipientLine = document.getElementById('live-recipient-line');
  const stampChoices = document.querySelectorAll('.stamp-choice');
  const liveStamp = document.getElementById('live-stamp');
  const liveStampVal = document.getElementById('live-stamp-val');
  const liveStampTitle = document.getElementById('live-stamp-title');
  const liveWaxSeal = document.getElementById('live-wax-seal');
  const livePostcard = document.getElementById('live-postcard');
  const stampAndMailBtn = document.getElementById('stamp-and-mail-btn');
  const resetDeskBtn = document.getElementById('reset-desk-btn');
  const desk3dScene = document.getElementById('desk-3d-scene');
  const airmailEnvelope = document.getElementById('airmail-envelope');
  const envelopeFlap = document.getElementById('envelope-flap');
  const envelopeWaxSeal = document.getElementById('envelope-wax-seal');
  const paperPlane = document.getElementById('paper-plane');
  const dispatchSuccessCard = document.getElementById('dispatch-success-card');
  const successSender = document.getElementById('success-sender');
  const successEmail = document.getElementById('success-email');
  const successScope = document.getElementById('success-scope');
  const successResetBtn = document.getElementById('success-reset-btn');
  const deskHint = document.getElementById('desk-hint');

  // Inspect Modal elements
  const inspectModal = document.getElementById('inspect-modal');
  const inspectBackdrop = document.getElementById('inspect-backdrop');
  const inspectClose = document.getElementById('inspect-close');
  const inspect3dCard = document.getElementById('inspect-3d-card');
  const inspectImg = document.getElementById('inspect-img');
  const inspectBackNote = document.getElementById('inspect-back-note');
  const inspectFlipBtn = document.getElementById('inspect-flip-btn');
  const inspectResetBtn = document.getElementById('inspect-reset-btn');
  const inspectViewport = document.getElementById('inspect-viewport');
  const inspectTitle = document.getElementById('inspect-title');

  // General
  const contactForm = document.getElementById('contact-form');
  const reveals = document.querySelectorAll('.reveal');
  const statNumbers = document.querySelectorAll('.stat__number');

  // ── Procedural Web Audio API (Synthesized Paper & Stamp FX) ─
  let audioCtx = null;
  let isSoundEnabled = true;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Realistic paper flutter / rustle sound
  function playPaperRustle() {
    if (!isSoundEnabled) return;
    initAudio();
    if (!audioCtx) return;

    try {
      const bufferSize = audioCtx.sampleRate * 0.18;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);

      // Filtered pink noise
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        data[i] = (b0 + b1 + b2) * 0.08;
      }

      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, audioCtx.currentTime);
      filter.Q.setValueAtTime(2.2, audioCtx.currentTime);

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.17);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      noise.start();
    } catch (e) {
      // Audio fallback
    }
  }

  // Heavy mechanical wax stamp "thump"
  function playStampImpact() {
    if (!isSoundEnabled) return;
    initAudio();
    if (!audioCtx) return;

    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(35, audioCtx.currentTime + 0.22);

      gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.26);

      // Add small high click on impact
      playPaperRustle();
    } catch (e) {}
  }

  // Aerodynamic Paper Airplane Flight Whoosh (Bandpass swept noise)
  function playPlaneWhoosh() {
    if (!isSoundEnabled) return;
    initAudio();
    if (!audioCtx) return;

    try {
      const duration = 1.25;
      const bufferSize = Math.floor(audioCtx.sampleRate * duration);
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);

      let last = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        last = (last + (0.02 * white)) / 1.02;
        data[i] = last * 3.8;
      }

      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(320, audioCtx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(1850, audioCtx.currentTime + 0.45);
      filter.frequency.exponentialRampToValueAtTime(420, audioCtx.currentTime + 1.15);
      filter.Q.setValueAtTime(3.2, audioCtx.currentTime);

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.35, audioCtx.currentTime + 0.35);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      noise.start();
    } catch (e) {}
  }

  // Celebratory Dispatch Chime
  function playSuccessChime() {
    if (!isSoundEnabled) return;
    initAudio();
    if (!audioCtx) return;

    try {
      const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      freqs.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.001, audioCtx.currentTime + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + idx * 0.08 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + idx * 0.08 + 0.65);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(audioCtx.currentTime + idx * 0.08);
        osc.stop(audioCtx.currentTime + idx * 0.08 + 0.7);
      });
    } catch (e) {}
  }

  // Sound Toggle Handler
  if (soundToggle) {
    soundToggle.addEventListener('click', () => {
      isSoundEnabled = !isSoundEnabled;
      if (isSoundEnabled) {
        initAudio();
        soundIconOn.style.display = 'block';
        soundIconOff.style.display = 'none';
        soundToggle.style.color = 'var(--color-accent)';
        playPaperRustle();
      } else {
        soundIconOn.style.display = 'none';
        soundIconOff.style.display = 'block';
        soundToggle.style.color = '';
      }
    });
  }

  // ── Theme Switcher: Warm Parchment vs Studio Noir ───────────
  function updateThemeUI(theme) {
    if (theme === 'dark') {
      htmlEl.setAttribute('data-theme', 'dark');
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
      if (themeText) themeText.textContent = 'Noir';
    } else {
      htmlEl.setAttribute('data-theme', 'light');
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
      if (themeText) themeText.textContent = 'Parchment';
    }
  }

  const savedTheme = localStorage.getItem('tornfolio-theme') || 'light';
  updateThemeUI(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = htmlEl.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      updateThemeUI(next);
      localStorage.setItem('tornfolio-theme', next);
      playPaperRustle();
    });
  }

  // ── Ambient Cursor Spotlight ────────────────────────────────
  if (ambientSpotlight && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let spotX = mouseX;
    let spotY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function renderSpotlight() {
      spotX += (mouseX - spotX) * 0.1;
      spotY += (mouseY - spotY) * 0.1;
      ambientSpotlight.style.left = spotX + 'px';
      ambientSpotlight.style.top = spotY + 'px';
      requestAnimationFrame(renderSpotlight);
    }
    renderSpotlight();
  }

  // ── Navigation Scroll ───────────────────────────────────────
  let lastScrollY = 0;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Active link highlighting
    const sections = ['work', 'experience', 'desk', 'about', 'services', 'contact'];
    const probe = scrollY + 220;
    let currentId = '';

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (probe >= top && probe < top + height) {
          currentId = id;
        }
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('nav__link--active');
      if (link.getAttribute('href') === '#' + currentId) {
        link.classList.add('nav__link--active');
      }
    });

    lastScrollY = scrollY;
  }, { passive: true });

  // Mobile Nav Toggle
  function toggleMobileNav() {
    const isOpen = mobileNav.classList.contains('open');
    if (isOpen) {
      mobileNav.classList.remove('open');
      navMenuBtn.classList.remove('active');
      navMenuBtn.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    } else {
      mobileNav.classList.add('open');
      navMenuBtn.classList.add('active');
      navMenuBtn.setAttribute('aria-expanded', 'true');
      mobileNav.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  if (navMenuBtn) navMenuBtn.addEventListener('click', toggleMobileNav);
  mobileNavLinks.forEach((l) => l.addEventListener('click', toggleMobileNav));

  // ── Smooth Scroll for Anchor Links ──────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        playPaperRustle();
        const navHeight = nav ? nav.offsetHeight : 76;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth',
        });
      }
    });
  });

  // ── Hero 3D Interactive Floating Stage Parallax ─────────────
  if (heroStage && window.matchMedia('(pointer: fine)').matches) {
    heroStage.addEventListener('mousemove', (e) => {
      const rect = heroStage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      heroCards.forEach((card) => {
        const depth = parseFloat(card.dataset.depth) || 0.1;
        const moveX = x * depth * 140;
        const moveY = y * depth * 100;
        const rotateX = -y * depth * 40;
        const rotateY = x * depth * 50;

        if (card.classList.contains('hero-card--center')) {
          card.style.transform = `translate3d(${moveX}px, ${moveY}px, 80px) rotateX(${rotateX}deg) rotateY(${rotateY - 2}deg)`;
        } else if (card.classList.contains('hero-card--left')) {
          card.style.transform = `translate3d(${moveX}px, ${moveY}px, -60px) rotate(-14deg) rotateX(${rotateX}deg)`;
        } else if (card.classList.contains('hero-card--right')) {
          card.style.transform = `translate3d(${moveX}px, ${moveY}px, -40px) rotate(12deg) rotateX(${rotateX}deg)`;
        }
      });
    });

    heroStage.addEventListener('mouseleave', () => {
      heroCards.forEach((card) => {
        card.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        if (card.classList.contains('hero-card--center')) {
          card.style.transform = 'translateZ(80px) rotate(-2deg)';
        } else if (card.classList.contains('hero-card--left')) {
          card.style.transform = 'rotate(-14deg) translateZ(-60px)';
        } else if (card.classList.contains('hero-card--right')) {
          card.style.transform = 'rotate(12deg) translateZ(-40px)';
        }
        setTimeout(() => { card.style.transition = ''; }, 800);
      });
    });
  }

  // ── 3D Card Interactive Tilt & Glare ────────────────────────
  postcardWraps.forEach((wrap) => {
    const card = wrap.querySelector('.postcard-card');
    const glare = wrap.querySelector('.postcard__glare');
    if (!card) return;

    if (window.matchMedia('(pointer: fine)').matches) {
      wrap.addEventListener('mousemove', (e) => {
        // If flipped, don't apply front glare
        const isFlipped = card.classList.contains('is-flipped');
        const rect = wrap.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xNorm = (mouseX / rect.width) - 0.5;
        const yNorm = (mouseY / rect.height) - 0.5;

        const rotX = -yNorm * 18;
        const rotY = (isFlipped ? 180 : 0) + (xNorm * 18);

        card.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(15px)`;

        if (glare && !isFlipped) {
          const glareX = (mouseX / rect.width) * 100;
          const glareY = (mouseY / rect.height) * 100;
          glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.45) 0%, transparent 65%)`;
          glare.style.opacity = '1';
        }
      });

      wrap.addEventListener('mouseleave', () => {
        const isFlipped = card.classList.contains('is-flipped');
        card.style.transition = 'transform 0.6s var(--motion-spring)';
        card.style.transform = isFlipped ? 'rotateY(180deg)' : 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
        if (glare) glare.style.opacity = '0.6';
        setTimeout(() => { card.style.transition = ''; }, 600);
      });
    }

    // Flip button inside card
    const flipFrontBtn = wrap.querySelector('.card-btn--flip');
    const flipBackBtn = wrap.querySelector('.card-btn--flip-back');

    function toggleCardFlip() {
      card.classList.toggle('is-flipped');
      playPaperRustle();
    }

    if (flipFrontBtn) flipFrontBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleCardFlip();
    });

    if (flipBackBtn) flipBackBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleCardFlip();
    });

    // Inspect 3D buttons
    const inspectBtns = wrap.querySelectorAll('.card-btn--inspect');
    inspectBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openInspectModal(wrap);
      });
    });

    // Direct link buttons
    const linkBtns = wrap.querySelectorAll('a.card-btn, .postcard-spec-link');
    linkBtns.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    });
  });

  // Global Flip All Postcards
  let allFlipped = false;
  function toggleFlipAll() {
    allFlipped = !allFlipped;
    playPaperRustle();
    postcardWraps.forEach((wrap, i) => {
      const card = wrap.querySelector('.postcard-card');
      if (card) {
        setTimeout(() => {
          if (allFlipped) {
            card.classList.add('is-flipped');
          } else {
            card.classList.remove('is-flipped');
          }
        }, i * 60);
      }
    });
  }

  if (heroFlipToggle) heroFlipToggle.addEventListener('click', toggleFlipAll);
  if (flipAllBtn) flipAllBtn.addEventListener('click', toggleFlipAll);

  // ── Filter Gallery ──────────────────────────────────────────
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.dataset.filter;
      playPaperRustle();

      postcardWraps.forEach((wrap, index) => {
        const cat = wrap.dataset.category;
        const show = filter === 'all' || cat === filter;
        if (show) {
          wrap.style.display = '';
          wrap.style.opacity = '0';
          wrap.style.transform = 'translateY(25px)';
          setTimeout(() => {
            wrap.style.transition = 'all 0.5s var(--motion-ease-out)';
            wrap.style.opacity = '1';
            wrap.style.transform = 'translateY(0)';
          }, index * 40);
        } else {
          wrap.style.display = 'none';
        }
      });
    });
  });

  // ── 3D Desk & Live Postcard Creator ─────────────────────────
  if (deskMessage && liveHandwriting) {
    deskMessage.addEventListener('input', () => {
      liveHandwriting.textContent = deskMessage.value || 'Write your handwritten message here...';
    });
  }

  if (deskAuthor && liveSignature) {
    deskAuthor.addEventListener('input', () => {
      liveSignature.textContent = deskAuthor.value ? `— ${deskAuthor.value}` : '— The Author';
    });
  }

  if (deskRecipient && liveRecipientLine) {
    deskRecipient.addEventListener('input', () => {
      liveRecipientLine.textContent = deskRecipient.value || 'Worldwide Destination';
    });
  }

  // Stamp Picker
  stampChoices.forEach((btn) => {
    btn.addEventListener('click', () => {
      stampChoices.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-checked', 'true');
      playPaperRustle();

      const style = btn.dataset.stamp;
      if (style === 'gold') {
        liveStamp.style.background = '#fef3c7';
        liveStamp.style.borderColor = '#b45309';
        liveStamp.style.color = '#b45309';
        liveStampVal.textContent = '$2.50';
        liveStampTitle.textContent = 'AIR MAIL';
      } else if (style === 'terracotta') {
        liveStamp.style.background = '#ffedd5';
        liveStamp.style.borderColor = '#c2410c';
        liveStamp.style.color = '#c2410c';
        liveStampVal.textContent = '$1.80';
        liveStampTitle.textContent = 'TERRA';
      } else if (style === 'cobalt') {
        liveStamp.style.background = '#e0f2fe';
        liveStamp.style.borderColor = '#0369a1';
        liveStamp.style.color = '#0369a1';
        liveStampVal.textContent = '$3.00';
        liveStampTitle.textContent = 'NORDIC';
      }
    });
  });

  // Live Postcard Tilt
  if (livePostcard && window.matchMedia('(pointer: fine)').matches) {
    livePostcard.addEventListener('mousemove', (e) => {
      if (desk3dScene && (desk3dScene.classList.contains('phase-insert') || desk3dScene.classList.contains('phase-plane'))) return;
      const rect = livePostcard.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      livePostcard.style.transform = `rotateX(${-y * 14}deg) rotateY(${x * 14}deg) translateZ(25px)`;
    });

    livePostcard.addEventListener('mouseleave', () => {
      if (desk3dScene && (desk3dScene.classList.contains('phase-insert') || desk3dScene.classList.contains('phase-plane'))) return;
      livePostcard.style.transition = 'transform 0.5s var(--motion-spring)';
      livePostcard.style.transform = 'rotate(-1.5deg)';
      setTimeout(() => { livePostcard.style.transition = ''; }, 500);
    });
  }

  // Animation Timers & State
  let dispatchTimeouts = [];

  function resetDispatchDesk() {
    dispatchTimeouts.forEach(clearTimeout);
    dispatchTimeouts = [];

    playPaperRustle();

    if (desk3dScene) {
      desk3dScene.classList.remove('phase-insert', 'phase-seal', 'phase-plane', 'phase-fly', 'phase-success');
    }
    if (livePostcard) {
      livePostcard.style.transform = 'rotate(-1.5deg)';
      livePostcard.style.transition = '';
    }
    if (liveWaxSeal) {
      liveWaxSeal.classList.remove('stamped');
    }
    if (stampAndMailBtn) {
      stampAndMailBtn.disabled = false;
      stampAndMailBtn.style.background = '';
      stampAndMailBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
        <span>Dispatch &amp; Launch Flight ✈️</span>
      `;
    }
    if (deskHint) {
      deskHint.innerHTML = `<strong>Interactive Flight:</strong> Type your note and click "Dispatch &amp; Launch Flight" to watch your postcard glide into the envelope and fly away as a paper plane!`;
    }
  }

  // Stamp, Seal & Airplane Flight Dispatch Action
  if (stampAndMailBtn) {
    stampAndMailBtn.addEventListener('click', () => {
      const senderVal = (deskAuthor && deskAuthor.value.trim()) || 'Engineering Talent Lead • Scale AI';
      const emailVal = (deskEmail && deskEmail.value.trim()) || 'sarah.jenkins@scale.com';
      const scopeVal = (deskRecipient && deskRecipient.value.trim()) || 'Software / AI-ML Engineer Opportunity';

      // Update success card receipt info
      if (successSender) successSender.textContent = senderVal;
      if (successEmail) successEmail.textContent = emailVal;
      if (successScope) successScope.textContent = scopeVal;

      stampAndMailBtn.disabled = true;
      stampAndMailBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
        <span>Sealing &amp; Launching...</span>
      `;

      if (deskHint) {
        deskHint.innerHTML = `<strong>Phase 1:</strong> Sliding personalized postcard into vintage airmail envelope...`;
      }

      // Phase 1: Card into Envelope (t = 0ms)
      playPaperRustle();
      if (desk3dScene) {
        desk3dScene.classList.add('phase-insert');
      }

      // Phase 2: Flap Folds Down & Wax Seal Impact (t = 850ms)
      const t1 = setTimeout(() => {
        if (deskHint) {
          deskHint.innerHTML = `<strong>Phase 2:</strong> Folding envelope flap and stamping official wax seal...`;
        }
        if (desk3dScene) {
          desk3dScene.classList.add('phase-seal');
        }

        // Wax seal strike audio
        setTimeout(() => {
          playStampImpact();
        }, 280);
      }, 850);
      dispatchTimeouts.push(t1);

      // Phase 3: Morph into 3D Origami Airplane (t = 1650ms)
      const t2 = setTimeout(() => {
        if (deskHint) {
          deskHint.innerHTML = `<strong>Phase 3:</strong> Folding into aerodynamic 3D paper airplane...`;
        }
        if (desk3dScene) {
          desk3dScene.classList.add('phase-plane');
        }
        playPaperRustle();
      }, 1650);
      dispatchTimeouts.push(t2);

      // Phase 3b: Airplane Takes Flight across Screen (t = 1950ms)
      const t3 = setTimeout(() => {
        if (deskHint) {
          deskHint.innerHTML = `<strong>Phase 4:</strong> Flight launched! Soaring across the skies directly to Aditya Singhal ✈️`;
        }
        if (desk3dScene) {
          desk3dScene.classList.add('phase-fly');
        }
        playPlaneWhoosh();
      }, 1950);
      dispatchTimeouts.push(t3);

      // Phase 4: Success Card Appears with Telemetry Receipt (t = 3100ms)
      const t4 = setTimeout(() => {
        if (desk3dScene) {
          desk3dScene.classList.add('phase-success');
        }
        playSuccessChime();

        if (deskHint) {
          deskHint.innerHTML = `<strong>✓ Telemetry Confirmed:</strong> Message dispatched successfully!`;
        }
        stampAndMailBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>Message Dispatched!</span>
        `;
        stampAndMailBtn.style.background = '#16a34a';
      }, 3100);
      dispatchTimeouts.push(t4);
    });
  }

  // Reset Desk Listeners
  if (resetDeskBtn) {
    resetDeskBtn.addEventListener('click', resetDispatchDesk);
  }
  if (successResetBtn) {
    successResetBtn.addEventListener('click', resetDispatchDesk);
  }

  // ── 3D Orbit Inspect Modal ──────────────────────────────────
  let orbitRotX = 10;
  let orbitRotY = -15;
  let isDragging = false;
  let lastMouseX = 0;
  let lastMouseY = 0;
  let inspectFlipped = false;

  function updateInspectTransform() {
    const flipDeg = inspectFlipped ? 180 : 0;
    inspect3dCard.style.transform = `rotateX(${orbitRotX}deg) rotateY(${orbitRotY + flipDeg}deg)`;
  }

  function openInspectModal(wrap) {
    const img = wrap.querySelector('.postcard__image');
    const title = wrap.querySelector('.postcard__title');
    const note = wrap.querySelector('.handwritten-text');

    if (img) inspectImg.src = img.src;
    if (title) inspectTitle.textContent = `Inspect 3D: ${title.textContent}`;
    if (note) inspectBackNote.textContent = note.textContent;

    inspectModal.classList.add('active');
    inspectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    orbitRotX = 8;
    orbitRotY = -12;
    inspectFlipped = false;
    updateInspectTransform();
    playPaperRustle();
  }

  function closeInspectModal() {
    inspectModal.classList.remove('active');
    inspectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    playPaperRustle();
  }

  if (inspectClose) inspectClose.addEventListener('click', closeInspectModal);
  if (inspectBackdrop) inspectBackdrop.addEventListener('click', closeInspectModal);

  if (inspectFlipBtn) {
    inspectFlipBtn.addEventListener('click', () => {
      inspectFlipped = !inspectFlipped;
      playPaperRustle();
      updateInspectTransform();
    });
  }

  if (inspectResetBtn) {
    inspectResetBtn.addEventListener('click', () => {
      orbitRotX = 0;
      orbitRotY = 0;
      inspectFlipped = false;
      updateInspectTransform();
    });
  }

  // Orbit dragging on viewport
  if (inspectViewport) {
    inspectViewport.addEventListener('mousedown', (e) => {
      isDragging = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - lastMouseX;
      const deltaY = e.clientY - lastMouseY;

      orbitRotY += deltaX * 0.45;
      orbitRotX -= deltaY * 0.45;

      // Clamp X rotation to avoid flipping upside down
      orbitRotX = Math.max(-60, Math.min(60, orbitRotX));

      lastMouseX = e.clientX;
      lastMouseY = e.clientY;

      updateInspectTransform();
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch support for mobile 3D orbit
    inspectViewport.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        lastMouseX = e.touches[0].clientX;
        lastMouseY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - lastMouseX;
      const deltaY = e.touches[0].clientY - lastMouseY;

      orbitRotY += deltaX * 0.45;
      orbitRotX -= deltaY * 0.45;
      orbitRotX = Math.max(-60, Math.min(60, orbitRotX));

      lastMouseX = e.touches[0].clientX;
      lastMouseY = e.touches[0].clientY;

      updateInspectTransform();
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });
  }



  // ── Keyboard Esc ────────────────────────────────────────────
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (inspectModal && inspectModal.classList.contains('active')) {
        closeInspectModal();
      }
      if (mobileNav && mobileNav.classList.contains('open')) {
        toggleMobileNav();
      }
    }
  });

  // ── Scroll Reveal Observer ──────────────────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach((el) => revealObserver.observe(el));

  // ── Stat Counter Animation ──────────────────────────────────
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.textContent, 10);
        let count = 0;
        const duration = 1400;
        const start = performance.now();

        function update(now) {
          const progress = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          entry.target.textContent = Math.round(ease * target);
          if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach((el) => statObserver.observe(el));

})();
