/**
 * "Imkon-Ish" — Application Orchestrator
 * Coordinates UI Modals (with accessible Focus Trap & Escape handling), Toast Engine,
 * Hotkey Dialogs, Demo Mode Indicators, and Multi-Page Lifecycle.
 */

class Application {
  constructor() {
    this.activeModal = null;
    this.lastFocusedElement = null;
    this.modalKeydownHandler = null;
  }

  init() {
    // Initialize Core Engines
    if (window.Accessibility) {
      window.Accessibility.init();
    }
    if (window.AuthComponent) {
      window.AuthComponent.init();
    }
    if (window.JobsComponent) {
      window.JobsComponent.init();
    }

    // Auto-create containers if missing
    this.ensureContainersExist();

    // Render Demo Mode badge if in demo mode
    this.renderDemoModeBadge();
  }

  ensureContainersExist() {
    if (!document.getElementById('modal-container')) {
      const mc = document.createElement('div');
      mc.id = 'modal-container';
      document.body.appendChild(mc);
    }
    if (!document.getElementById('toast-container')) {
      const tc = document.createElement('div');
      tc.id = 'toast-container';
      tc.className = 'toast-container';
      tc.setAttribute('aria-live', 'assertive');
      document.body.appendChild(tc);
    }
  }

  renderDemoModeBadge() {
    const isDemo = window.APP_CONFIG?.DEMO_MODE !== false;
    if (!isDemo || document.getElementById('demo-mode-indicator')) return;

    const badge = document.createElement('div');
    badge.id = 'demo-mode-indicator';
    badge.className = 'demo-mode-indicator';
    badge.innerHTML = `
      <div class="demo-mode-pill" title="Ushbu platforma hozirda MVP Prototype bosqichida. Barcha ko'rsatkichlar va AI funksiyalari test namoyishi rejimida ishlamoqda.">
        <span class="badge badge-amber" style="display:flex; align-items:center; gap:0.4rem; font-size:0.75rem; font-weight:800; padding:0.35rem 0.75rem; border:1px solid rgba(245,158,11,0.35); box-shadow:var(--shadow-sm); cursor:help;">
          <span style="display:inline-block; width:7px; height:7px; border-radius:50%; background:var(--accent-amber-400); animation:pulse 2s infinite;"></span>
          <span>MVP Demo Rejimi</span>
        </span>
      </div>
    `;
    document.body.appendChild(badge);
  }

  /**
   * Accessible Modal Opener with strict Focus Trap & Escape listener
   */
  openModal(contentHtml) {
    this.ensureContainersExist();
    const container = document.getElementById('modal-container');
    if (!container) return;

    // Remember currently focused element to restore upon modal close
    this.lastFocusedElement = document.activeElement;

    // Remove any leftover listener
    if (this.modalKeydownHandler) {
      document.removeEventListener('keydown', this.modalKeydownHandler);
    }

    container.innerHTML = `
      <div class="modal-backdrop" id="active-modal-backdrop" onclick="if(event.target.id==='active-modal-backdrop') window.App.closeAllModals();">
        <div class="modal-box" id="active-modal-box" role="dialog" aria-modal="true" tabindex="-1">
          ${contentHtml}
        </div>
      </div>
    `;

    const modalBox = document.getElementById('active-modal-box');
    if (!modalBox) return;

    // Setup Focus Trap & Escape key handler
    const focusableSelectors = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    this.modalKeydownHandler = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        this.closeAllModals();
        return;
      }

      if (e.key === 'Tab') {
        const focusableEls = modalBox.querySelectorAll(focusableSelectors);
        if (focusableEls.length === 0) {
          e.preventDefault();
          return;
        }

        const firstEl = focusableEls[0];
        const lastEl = focusableEls[focusableEls.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstEl || document.activeElement === modalBox) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', this.modalKeydownHandler);

    // Initial focus on the first actionable element or the modal box
    setTimeout(() => {
      const firstFocusable = modalBox.querySelector(focusableSelectors);
      if (firstFocusable) {
        firstFocusable.focus();
      } else {
        modalBox.focus();
      }
    }, 50);
  }

  /**
   * Closes open modal and restores keyboard focus
   */
  closeAllModals() {
    if (this.modalKeydownHandler) {
      document.removeEventListener('keydown', this.modalKeydownHandler);
      this.modalKeydownHandler = null;
    }

    const container = document.getElementById('modal-container');
    if (container) {
      container.innerHTML = '';
    }

    // Restore keyboard focus to triggering element
    if (this.lastFocusedElement && typeof this.lastFocusedElement.focus === 'function') {
      this.lastFocusedElement.focus();
      this.lastFocusedElement = null;
    }
  }

  showToast(message, type = 'info') {
    this.ensureContainersExist();
    const container = document.getElementById('toast-container');
    if (!container) return;

    // Sanitize message string
    const cleanMsg = window.ApiService ? window.ApiService.sanitize(message) : message;

    const toastId = 'toast-' + Date.now();
    const toast = document.createElement('div');
    toast.id = toastId;
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
      <div style="flex:1; font-weight:700; font-size:0.925rem;">${cleanMsg}</div>
      <button type="button" style="color:var(--text-subtle); padding:2px; font-weight:900; font-size:1.1rem; background:transparent; border:none; cursor:pointer;" onclick="document.getElementById('${toastId}').remove()" aria-label="Xabarni yopish">✕</button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      if (document.getElementById(toastId)) {
        document.getElementById(toastId).remove();
      }
    }, 4500);
  }

  openKeyboardShortcutsModal() {
    const shortcuts = [
      { key: 'Alt + 1', desc: 'Bosh sahifa' },
      { key: 'Alt + 2', desc: 'Inklyuziv vakansiyalar portali' },
      { key: 'Alt + 3', desc: 'AI Nomzod markazi (Dashboard)' },
      { key: 'Alt + 4', desc: 'AI Muloqot & Tarjimon' },
      { key: 'Alt + 5', desc: 'Ish beruvchilarga & ROI kalkulyator' },
      { key: 'Alt + 6', desc: 'Statistika & BMT SDG telemetriyasi' },
      { key: 'Alt + 7', desc: 'Biz haqimizda & WCAG muvofiqlik' },
      { key: 'Alt + A', desc: 'Accessibility paneliga fokus o\'tish' },
      { key: 'Alt + S', desc: 'Ovozli o\'quvchi (TTS) yoqish/to\'xtatish' },
      { key: '?', desc: 'Ushbu klaviatura yo\'riqnomasini ochish' },
      { key: 'Esc', desc: 'Modal oynalarni yopish' }
    ];

    const content = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
        <h3 style="margin:0; font-size:1.35rem;">Klaviatura Tezkor Tugmalari</h3>
        <button type="button" class="btn btn-sm btn-outline" onclick="window.App.closeAllModals()" aria-label="Yopish">✕</button>
      </div>

      <div style="display:flex; flex-direction:column; gap:0.65rem; margin-bottom:1.5rem;">
        ${shortcuts.map(s => `
          <div style="display:flex; justify-content:space-between; align-items:center; background:var(--surface-subtle); padding:0.6rem 1rem; border-radius:var(--radius-md); border:1px solid var(--surface-border);">
            <span style="font-size:0.9rem; color:var(--text-main); font-weight:700;">${s.desc}</span>
            <kbd style="background:var(--surface-card); border:1px solid var(--surface-border); border-radius:var(--radius-sm); padding:0.25rem 0.65rem; font-family:var(--font-mono); font-size:0.85rem; font-weight:800; color:var(--accent-teal-400);">${s.key}</kbd>
          </div>
        `).join('')}
      </div>

      <div style="display:flex; justify-content:flex-end;">
        <button type="button" class="btn btn-primary" onclick="window.App.closeAllModals()">Tushunarli</button>
      </div>
    `;

    this.openModal(content);
  }
}

window.App = new Application();

document.addEventListener('DOMContentLoaded', () => {
  window.App.init();
});

// Global click listener to automatically close any open custom dropdown when clicked outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.custom-dropdown') && !e.target.closest('.custom-select-container') && !e.target.closest('.a11y-dropdown')) {
    document.querySelectorAll('.custom-dropdown.open, .custom-select-dropdown.open').forEach(d => d.classList.remove('open'));
    document.querySelectorAll('.a11y-menu-panel.show').forEach(p => p.classList.remove('show'));
    if (window.JobsComponent) {
      window.JobsComponent.closeLocationDropdown();
      window.JobsComponent.closeSortDropdown();
    }
    if (window.LandingComponent) {
      window.LandingComponent.isLocationDropdownOpen = false;
      window.LandingComponent.isWorkTypeDropdownOpen = false;
    }
    if (window.ChatComponent) {
      window.ChatComponent.isLangDropdownOpen = false;
    }
    if (window.NavbarComponent) {
      window.NavbarComponent.isA11yOpen = false;
    }
  }
});
