/**
 * "Imkon Ish" — Senior Accessibility & WCAG 2.1 AA Engine
 * Real-Time Dynamic Root HTML Font Scaling, Web Speech TTS, Contrast Switchers, Dyslexia Font, Keyboard Traps
 */

class AccessibilityEngine {
  constructor() {
    this.synth = window.speechSynthesis || null;
    this.currentUtterance = null;
    this.isSpeaking = false;
    this.liveRegion = null;
  }

  init() {
    this.createLiveRegion();
    this.applyInitialSettings();
    this.bindKeyboardShortcuts();
  }

  createLiveRegion() {
    if (!document.getElementById('a11y-live-region')) {
      const region = document.createElement('div');
      region.id = 'a11y-live-region';
      region.setAttribute('aria-live', 'polite');
      region.setAttribute('aria-atomic', 'true');
      region.style.position = 'absolute';
      region.style.width = '1px';
      region.style.height = '1px';
      region.style.padding = '0';
      region.style.overflow = 'hidden';
      region.style.clip = 'rect(0, 0, 0, 0)';
      region.style.whiteSpace = 'nowrap';
      region.style.border = '0';
      document.body.appendChild(region);
      this.liveRegion = region;
    } else {
      this.liveRegion = document.getElementById('a11y-live-region');
    }
  }

  applyInitialSettings() {
    const config = window.Store ? window.Store.getState().a11y : {};
    
    if (config.theme) {
      this.setTheme(config.theme, false);
    } else {
      this.setTheme('light', false);
    }
    if (config.fontScale) {
      this.setFontScale(config.fontScale, false);
    }
    if (config.dyslexiaFont) {
      document.documentElement.classList.add('dyslexia-font');
      document.body.classList.add('dyslexia-font');
      const btn = document.getElementById('btn-dyslexia');
      if (btn) btn.classList.add('active');
    }
    if (config.largeCursor) {
      document.documentElement.classList.add('large-cursor');
      document.body.classList.add('large-cursor');
      const btn = document.getElementById('btn-large-cursor');
      if (btn) btn.classList.add('active');
    }
    if (config.reducedMotion) {
      document.documentElement.classList.add('reduced-motion');
      document.body.classList.add('reduced-motion');
      const btn = document.getElementById('btn-reduced-motion');
      if (btn) btn.classList.add('active');
    }
  }

  announce(message, priority = 'polite') {
    if (!this.liveRegion) this.createLiveRegion();
    if (this.liveRegion) {
      this.liveRegion.setAttribute('aria-live', priority);
      this.liveRegion.textContent = '';
      setTimeout(() => {
        this.liveRegion.textContent = message;
      }, 50);
    }
  }

  setTheme(themeName, announce = true) {
    const root = document.documentElement;
    root.classList.remove('theme-light', 'theme-dark', 'theme-high-contrast', 'theme-monochrome');
    document.body.classList.remove('theme-light', 'theme-dark', 'theme-high-contrast', 'theme-monochrome');
    
    if (themeName === 'light') {
      root.classList.add('theme-light');
      document.body.classList.add('theme-light');
    } else if (themeName === 'dark') {
      root.classList.add('theme-dark');
      document.body.classList.add('theme-dark');
    } else if (themeName === 'high-contrast') {
      root.classList.add('theme-high-contrast');
      document.body.classList.add('theme-high-contrast');
    } else if (themeName === 'monochrome') {
      root.classList.add('theme-monochrome');
      document.body.classList.add('theme-monochrome');
    }

    if (window.Store) {
      window.Store.dispatch('UPDATE_A11Y_CONFIG', { theme: themeName });
    }

    document.querySelectorAll('[data-theme-btn]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-theme-btn') === themeName);
    });

    if (announce) {
      const names = {
        default: 'Yorug\' rejim',
        light: 'Yorug\' rejim',
        dark: 'Tungi (Dark) rejim',
        'high-contrast': 'Yuqori kontrastli rejim',
        monochrome: 'Monoxrom oq-qora rejim'
      };
      this.announce(`${names[themeName] || themeName} faollashtirildi.`);
      if (window.App && window.App.showToast) {
        window.App.showToast(`${names[themeName] || themeName} yoqildi`, 'info');
      }
    }
  }

  /**
   * Real-time HTML Root Font Scaling (Instantly adjusts rem & px sizes)
   */
  setFontScale(scale, announce = true) {
    const root = document.documentElement;
    const fontSizes = {
      sm: '13px',
      md: '16px',
      lg: '19.5px',
      xl: '23px'
    };

    const targetSize = fontSizes[scale] || '16px';

    // Apply directly to root HTML so all rem-based typography scales immediately
    root.style.fontSize = targetSize;
    root.style.setProperty('--base-font-size', targetSize);
    document.body.style.setProperty('--base-font-size', targetSize);

    // Toggle classes on both html and body
    root.classList.remove('font-scale-sm', 'font-scale-md', 'font-scale-lg', 'font-scale-xl');
    document.body.classList.remove('font-scale-sm', 'font-scale-md', 'font-scale-lg', 'font-scale-xl');
    
    root.classList.add(`font-scale-${scale}`);
    document.body.classList.add(`font-scale-${scale}`);

    if (window.Store) {
      window.Store.dispatch('UPDATE_A11Y_CONFIG', { fontScale: scale });
    }

    document.querySelectorAll('[data-font-scale]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-font-scale') === scale);
    });

    if (announce) {
      const scaleNames = { sm: 'Kichik (13px)', md: 'O\'rtacha (16px)', lg: 'Katta (19.5px)', xl: 'Juda katta (23px)' };
      this.announce(`Shrift o'lchami: ${scaleNames[scale] || scale}`);
      if (window.App && window.App.showToast) {
        window.App.showToast(`Shrift: ${scaleNames[scale] || scale}`, 'info');
      }
    }
  }

  toggleDyslexiaFont() {
    const root = document.documentElement;
    const isEnabled = root.classList.toggle('dyslexia-font');
    document.body.classList.toggle('dyslexia-font', isEnabled);
    
    if (window.Store) {
      window.Store.dispatch('UPDATE_A11Y_CONFIG', { dyslexiaFont: isEnabled });
    }
    const btn = document.getElementById('btn-dyslexia');
    if (btn) btn.classList.toggle('active', isEnabled);
    this.announce(isEnabled ? 'Disleksiya ochiq shrifti yoqildi' : 'Standart shriftga qaytildi');
    if (window.App && window.App.showToast) {
      window.App.showToast(isEnabled ? 'Disleksiya shrifti faollashdi' : 'Standart shrift tiklandi', 'info');
    }
  }

  toggleLargeCursor() {
    const root = document.documentElement;
    const isEnabled = root.classList.toggle('large-cursor');
    document.body.classList.toggle('large-cursor', isEnabled);

    if (window.Store) {
      window.Store.dispatch('UPDATE_A11Y_CONFIG', { largeCursor: isEnabled });
    }
    const btn = document.getElementById('btn-large-cursor');
    if (btn) btn.classList.toggle('active', isEnabled);
    this.announce(isEnabled ? 'Kattalashtirilgan kursor yoqildi' : 'Standart kursorga qaytildi');
  }

  toggleReducedMotion() {
    const root = document.documentElement;
    const isEnabled = root.classList.toggle('reduced-motion');
    document.body.classList.toggle('reduced-motion', isEnabled);

    if (window.Store) {
      window.Store.dispatch('UPDATE_A11Y_CONFIG', { reducedMotion: isEnabled });
    }
    const btn = document.getElementById('btn-reduced-motion');
    if (btn) btn.classList.toggle('active', isEnabled);
    this.announce(isEnabled ? 'Barcha animatsiyalar to\'xtatildi' : 'Animatsiyalar yoqildi');
  }

  toggleTTS() {
    if (this.isSpeaking) {
      this.stopSpeaking();
    } else {
      const activeText = document.querySelector('main') ? document.querySelector('main').innerText : document.body.innerText;
      const cleanSnippet = activeText.substring(0, 400).replace(/\s+/g, ' ');
      this.speakText(cleanSnippet || 'Assalomu alaykum! Imkon Ish milliy inklyuziv bandlik platformasi.');
    }
  }

  speakText(text, onEndCallback = null) {
    if (!('speechSynthesis' in window)) {
      if (window.App && window.App.showToast) {
        window.App.showToast('Brauzeringiz ovozli o\'qishni qo\'llab-quvvatlamaydi', 'warning');
      }
      return;
    }

    this.stopSpeaking();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'uz-UZ';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    const btn = document.getElementById('btn-tts-toggle');
    if (btn) btn.classList.add('active');
    this.isSpeaking = true;

    utterance.onend = () => {
      this.isSpeaking = false;
      if (btn) btn.classList.remove('active');
      if (onEndCallback) onEndCallback();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      if (btn) btn.classList.remove('active');
    };

    this.currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
    this.announce('Ovozli matn o\'qilmoqda');
  }

  stopSpeaking() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
    const btn = document.getElementById('btn-tts-toggle');
    if (btn) btn.classList.remove('active');
  }

  bindKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Don't trigger when user is typing in form inputs
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        return;
      }

      if (e.altKey) {
        switch (e.key.toLowerCase()) {
          case '1':
            e.preventDefault();
            this.setTheme('default');
            break;
          case '2':
            e.preventDefault();
            this.setTheme('light');
            break;
          case '3':
            e.preventDefault();
            this.setTheme('high-contrast');
            break;
          case 's':
            e.preventDefault();
            this.toggleTTS();
            break;
          case 'd':
            e.preventDefault();
            this.toggleDyslexiaFont();
            break;
          case 'h':
            e.preventDefault();
            window.location.href = 'index.html';
            break;
          case 'j':
            e.preventDefault();
            window.location.href = 'jobs.html';
            break;
        }
      }
    });
  }
}

// Instantiate singleton
window.a11y = new AccessibilityEngine();
document.addEventListener('DOMContentLoaded', () => {
  window.a11y.init();
});
