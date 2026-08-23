/**
 * "Imkon Ish" — Senior Navbar Component
 * Clean white sticky header, accessible dropdown menu & responsive mobile drawer
 */

window.NavbarComponent = {
  isA11yOpen: false,

  render(activePage = '') {
    const I = window.Icons;
    const storeState = window.Store ? window.Store.getState() : {};
    const currentUser = storeState.currentUser;
    const a11y = storeState.a11y || {};

    // Auto-detect active page from URL pathname
    if (!activePage) {
      const path = window.location.pathname;
      if (path.includes('jobs.html')) activePage = 'jobs';
      else if (path.includes('employers.html')) activePage = 'employers';
      else if (path.includes('chat.html')) activePage = 'chat';
      else if (path.includes('dashboard.html')) activePage = 'dashboard';
      else if (path.includes('about.html')) activePage = 'about';
      else if (path.includes('analytics.html')) activePage = 'analytics';
      else if (path.includes('onboarding.html')) activePage = 'onboarding';
      else activePage = 'index';
    }

    return `
      <div class="header-wrapper">
        <header class="site-header" role="banner">
          <nav class="nav-container" aria-label="Asosiy menyu">
            
            <!-- Brand Logo: ♿ Imkon Ish (Primary Green) -->
            <a href="index.html" class="brand-logo" aria-label="Imkon Ish bosh sahifasi">
              <div class="brand-logo-icon" aria-hidden="true">
                ${I.get('accessibility', 22, '#ffffff', 2.5)}
              </div>
              <span style="font-weight:900; font-size:1.35rem; color:var(--primary); letter-spacing:-0.03em;">Imkon Ish</span>
            </a>

            <!-- Navigation Links -->
            <ul class="nav-menu" role="menubar">
              <li role="none">
                <a href="jobs.html" class="nav-link ${activePage === 'jobs' ? 'active' : ''}" role="menuitem">
                  ${I.get('briefcase', 16)}
                  <span>Ishlar</span>
                </a>
              </li>
              <li role="none">
                <a href="employers.html" class="nav-link ${activePage === 'employers' ? 'active' : ''}" role="menuitem">
                  ${I.get('building', 16)}
                  <span>Kompaniyalar</span>
                </a>
              </li>
              <li role="none">
                <a href="chat.html" class="nav-link ${activePage === 'chat' ? 'active' : ''}" role="menuitem">
                  ${I.get('bot', 16)}
                  <span>AI Yordamchi</span>
                </a>
              </li>
              <li role="none">
                <a href="dashboard.html" class="nav-link ${activePage === 'dashboard' ? 'active' : ''}" role="menuitem">
                  ${I.get('user', 16)}
                  <span>Mening sahifam</span>
                </a>
              </li>
              <li role="none">
                <a href="about.html" class="nav-link ${activePage === 'about' ? 'active' : ''}" role="menuitem">
                  ${I.get('info', 16)}
                  <span>Haqimizda</span>
                </a>
              </li>
            </ul>

            <!-- Right Actions: Accessibility & Auth -->
            <div class="nav-actions">
              
              <!-- Accessibility Control Center Dropdown -->
              <div class="a11y-dropdown" id="a11y-dropdown-container">
                <button type="button" 
                        id="a11y-toggle-btn"
                        class="btn btn-outline btn-sm" 
                        onclick="window.NavbarComponent.toggleA11yMenu(event)"
                        aria-expanded="false"
                        aria-haspopup="true"
                        title="WCAG 2.1 AA Qulaylik sozlamalari">
                  ${I.get('accessibility', 16, 'var(--primary)')}
                  <span>Qulaylik</span>
                  ${I.get('chevronDown', 12)}
                </button>

                <!-- Dropdown Menu Panel -->
                <div class="a11y-menu-panel" id="a11y-menu-panel" role="region" aria-label="Qulaylik sozlamalari">
                  <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:0.75rem; margin-bottom:0.75rem;">
                    <div style="font-weight:800; font-size:0.95rem; color:var(--text-main); display:flex; align-items:center; gap:0.45rem;">
                      ${I.get('shieldCheck', 16, 'var(--primary)')}
                      <span>Accessibility (WCAG 2.1 AA)</span>
                    </div>
                    <button type="button" class="btn btn-ghost btn-sm" style="padding:0.15rem 0.4rem;" onclick="window.NavbarComponent.toggleA11yMenu(event)" aria-label="Yopish">✕</button>
                  </div>

                  <!-- Font Size -->
                  <div class="a11y-panel-section" style="margin-top:0;">
                    <span class="a11y-panel-title">${I.get('type', 13)} Shrift O'lchami:</span>
                    <div class="a11y-grid-btn">
                      <button type="button" data-font-scale="sm" class="a11y-btn ${a11y.fontScale === 'sm' ? 'active' : ''}" onclick="window.a11y.setFontScale('sm')">A-</button>
                      <button type="button" data-font-scale="md" class="a11y-btn ${!a11y.fontScale || a11y.fontScale === 'md' ? 'active' : ''}" onclick="window.a11y.setFontScale('md')">A</button>
                      <button type="button" data-font-scale="lg" class="a11y-btn ${a11y.fontScale === 'lg' ? 'active' : ''}" onclick="window.a11y.setFontScale('lg')">A+</button>
                      <button type="button" data-font-scale="xl" class="a11y-btn ${a11y.fontScale === 'xl' ? 'active' : ''}" onclick="window.a11y.setFontScale('xl')">A++</button>
                    </div>
                  </div>

                  <!-- Contrast & Theme Modes -->
                  <div class="a11y-panel-section">
                    <span class="a11y-panel-title">${I.get('contrast', 13)} Mavzu & Tungi Rejim:</span>
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.4rem;">
                      <button type="button" data-theme-btn="light" class="a11y-btn ${!a11y.theme || a11y.theme === 'light' || a11y.theme === 'default' ? 'active' : ''}" onclick="window.a11y.setTheme('light')">
                        ${I.get('sun', 14)} Yorug'
                      </button>
                      <button type="button" data-theme-btn="dark" class="a11y-btn ${a11y.theme === 'dark' ? 'active' : ''}" onclick="window.a11y.setTheme('dark')">
                        ${I.get('moon', 14)} Tungi (Dark)
                      </button>
                      <button type="button" data-theme-btn="high-contrast" class="a11y-btn ${a11y.theme === 'high-contrast' ? 'active' : ''}" onclick="window.a11y.setTheme('high-contrast')">
                        ${I.get('zap', 14)} Yuqori Kontrast
                      </button>
                      <button type="button" data-theme-btn="monochrome" class="a11y-btn ${a11y.theme === 'monochrome' ? 'active' : ''}" onclick="window.a11y.setTheme('monochrome')">
                        ${I.get('eye', 14)} Monoxrom
                      </button>
                    </div>
                  </div>

                  <!-- Specialized Tools -->
                  <div class="a11y-panel-section">
                    <span class="a11y-panel-title">Maxsus Imkoniyatlar:</span>
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.4rem;">
                      <button type="button" id="btn-tts-toggle" class="a11y-btn" onclick="window.a11y.toggleTTS()" style="justify-content:flex-start;">
                        ${I.get('volume2', 14)}
                        <span>Ovozli O'qish</span>
                      </button>
                      <button type="button" id="btn-dyslexia" class="a11y-btn ${a11y.dyslexiaFont ? 'active' : ''}" onclick="window.a11y.toggleDyslexiaFont()" style="justify-content:flex-start;">
                        ${I.get('eye', 14)}
                        <span>Disleksiya</span>
                      </button>
                      <button type="button" id="btn-large-cursor" class="a11y-btn ${a11y.largeCursor ? 'active' : ''}" onclick="window.a11y.toggleLargeCursor()" style="justify-content:flex-start;">
                        ${I.get('mousePointer', 14)}
                        <span>Katta Kursor</span>
                      </button>
                      <button type="button" class="a11y-btn" onclick="window.App.openKeyboardShortcutsModal()" style="justify-content:flex-start;">
                        <kbd style="background:var(--bg-subtle); padding:1px 4px; border-radius:3px; font-size:10px;">?</kbd>
                        <span>Tugmalar</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              ${currentUser ? `
                <!-- Logged In User Pill -->
                <div style="display:flex; align-items:center; gap:0.5rem; background:var(--bg-subtle); border:1px solid var(--border-color); border-radius:var(--radius-full); padding:0.25rem 0.65rem 0.25rem 0.35rem;">
                  <div style="width:30px; height:30px; border-radius:50%; background:var(--primary); color:#ffffff; font-weight:800; font-size:0.8rem; display:flex; align-items:center; justify-content:center;">
                    ${currentUser.avatar || 'U'}
                  </div>
                  <div style="display:flex; flex-direction:column; line-height:1.1; text-align:left;">
                    <span style="font-size:0.85rem; font-weight:700; color:var(--text-main); max-width:110px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${currentUser.fullName}</span>
                    <span style="font-size:0.7rem; color:var(--primary); font-weight:700;">
                      ${currentUser.role === 'employer' ? 'Ish Beruvchi' : (currentUser.role === 'mentor' ? 'Mentor' : 'Nomzod')}
                    </span>
                  </div>
                  <button type="button" class="btn btn-sm btn-ghost" style="padding:0.15rem 0.35rem; font-size:0.75rem; border-radius:var(--radius-full); color:var(--text-muted);" onclick="window.AuthComponent.logout()" title="Tizimdan chiqish" aria-label="Chiqish">
                    ${I.get('logOut', 13)}
                  </button>
                </div>
              ` : `
                <button type="button" class="btn btn-outline btn-sm" onclick="window.AuthComponent.openAuthModal('login')" aria-label="Tizimga kirish">
                  ${I.get('user', 14)}
                  <span>Kirish</span>
                </button>
                <button type="button" class="btn btn-primary btn-sm" onclick="window.AuthComponent.openAuthModal('signup')" aria-label="Ro'yxatdan o'tish">
                  ${I.get('userPlus', 14, '#ffffff')}
                  <span>Ro'yxatdan o'tish</span>
                </button>
              `}

              <!-- Mobile Hamburger Toggle -->
              <button type="button" class="mobile-menu-btn" onclick="window.NavbarComponent.toggleMobileMenu()" aria-label="Mobil menyuni ochish">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              </button>

            </div>

          </nav>
        </header>
      </div>

      <!-- Mobile Drawer Overlay & Drawer -->
      <div id="mobile-drawer-overlay" class="mobile-drawer-overlay" onclick="window.NavbarComponent.toggleMobileMenu()"></div>
      <div id="mobile-nav-drawer" class="mobile-nav-drawer" role="dialog" aria-modal="true" aria-label="Mobil menyu">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.75rem; padding-bottom:0.75rem; border-bottom:1px solid var(--border-color);">
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <div class="brand-logo-icon" style="width:32px; height:32px;">
              ${I.get('accessibility', 18, '#ffffff')}
            </div>
            <span style="font-weight:900; font-size:1.2rem; color:var(--primary);">Imkon Ish</span>
          </div>
          <button type="button" class="btn btn-ghost btn-sm" onclick="window.NavbarComponent.toggleMobileMenu()" aria-label="Menyuni yopish">✕</button>
        </div>

        <div style="display:flex; flex-direction:column; gap:0.5rem;">
          <a href="index.html" class="nav-link ${activePage === 'index' ? 'active' : ''}">
            ${I.get('home', 16)} <span>Bosh sahifa</span>
          </a>
          <a href="jobs.html" class="nav-link ${activePage === 'jobs' ? 'active' : ''}">
            ${I.get('briefcase', 16)} <span>Ishlar</span>
          </a>
          <a href="employers.html" class="nav-link ${activePage === 'employers' ? 'active' : ''}">
            ${I.get('building', 16)} <span>Kompaniyalar</span>
          </a>
          <a href="chat.html" class="nav-link ${activePage === 'chat' ? 'active' : ''}">
            ${I.get('bot', 16)} <span>AI Yordamchi</span>
          </a>
          <a href="dashboard.html" class="nav-link ${activePage === 'dashboard' ? 'active' : ''}">
            ${I.get('user', 16)} <span>Mening sahifam</span>
          </a>
          <a href="about.html" class="nav-link ${activePage === 'about' ? 'active' : ''}">
            ${I.get('info', 16)} <span>Haqimizda</span>
          </a>
        </div>

        <div style="margin-top:2rem; padding-top:1.5rem; border-top:1px solid var(--border-color); display:flex; flex-direction:column; gap:0.75rem;">
          ${currentUser ? `
            <div style="display:flex; align-items:center; gap:0.75rem; background:var(--bg-subtle); padding:0.75rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
              <div style="width:36px; height:36px; border-radius:50%; background:var(--primary); color:#ffffff; font-weight:800; display:flex; align-items:center; justify-content:center;">
                ${currentUser.avatar || 'U'}
              </div>
              <div style="flex:1; min-width:0;">
                <div style="font-weight:800; color:var(--text-main); font-size:0.95rem; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">${currentUser.fullName}</div>
                <div style="font-size:0.75rem; color:var(--primary); font-weight:700;">
                  ${currentUser.role === 'employer' ? 'Ish Beruvchi' : (currentUser.role === 'mentor' ? 'Mentor' : 'Nomzod')}
                </div>
              </div>
              <button type="button" class="btn btn-sm btn-outline" onclick="window.AuthComponent.logout(); window.NavbarComponent.toggleMobileMenu();">Chiqish</button>
            </div>
          ` : `
            <button type="button" class="btn btn-outline" style="width:100%;" onclick="window.NavbarComponent.toggleMobileMenu(); window.AuthComponent.openAuthModal('login');">
              ${I.get('user', 16)} <span>Kirish</span>
            </button>
            <button type="button" class="btn btn-primary" style="width:100%;" onclick="window.NavbarComponent.toggleMobileMenu(); window.AuthComponent.openAuthModal('signup');">
              ${I.get('userPlus', 16, '#ffffff')} <span>Ro'yxatdan o'tish</span>
            </button>
          `}
        </div>
      </div>
    `;
  },

  toggleA11yMenu(event) {
    if (event) event.stopPropagation();
    const panel = document.getElementById('a11y-menu-panel');
    const btn = document.getElementById('a11y-toggle-btn');
    if (panel) {
      const isOpen = panel.classList.toggle('show');
      if (btn) btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }
  },

  toggleMobileMenu() {
    const drawer = document.getElementById('mobile-nav-drawer');
    const overlay = document.getElementById('mobile-drawer-overlay');
    if (drawer) drawer.classList.toggle('open');
    if (overlay) overlay.classList.toggle('open');
  }
};

// Global click listener to close a11y panel if clicked outside
document.addEventListener('click', (e) => {
  const container = document.getElementById('a11y-dropdown-container');
  const panel = document.getElementById('a11y-menu-panel');
  if (container && panel && panel.classList.contains('show') && !container.contains(e.target)) {
    panel.classList.remove('show');
    const btn = document.getElementById('a11y-toggle-btn');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }
});
