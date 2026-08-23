/**
 * "Imkon Ish" — Senior Auth & Role Management Component
 */

window.AuthComponent = {
  currentUser: null,

  init() {
    if (window.Store) {
      this.currentUser = window.Store.getState().currentUser;
      window.Store.subscribe('AUTH_SET_USER', (state) => {
        this.currentUser = state.currentUser;
      });
      window.Store.subscribe('AUTH_LOGOUT', () => {
        this.currentUser = null;
      });
    }
  },

  openAuthModal(mode = 'login') {
    const I = window.Icons;
    const isLogin = mode === 'login';

    const content = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
        <div style="display:flex; align-items:center; gap:0.65rem;">
          <div class="brand-logo-icon" style="width:38px; height:38px;">
            ${I.get(isLogin ? 'user' : 'userPlus', 20, '#ffffff')}
          </div>
          <div>
            <h3 style="margin:0; font-size:1.35rem;">${isLogin ? 'Tizimga Kirish' : 'Ro‘yxatdan O‘tish'}</h3>
            <span style="font-size:0.8rem; color:var(--text-secondary);">Imkon Ish platformasiga xush kelibsiz</span>
          </div>
        </div>
        <button type="button" class="btn btn-ghost btn-sm" onclick="window.App.closeAllModals()" aria-label="Yopish">✕</button>
      </div>

      <!-- Quick Demo Role Switcher -->
      <div style="background:var(--bg-subtle); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:0.85rem; margin-bottom:1.5rem;">
        <div style="font-size:0.75rem; font-weight:800; text-transform:uppercase; color:var(--text-secondary); margin-bottom:0.5rem; letter-spacing:0.04em;">
          Tezkor Demo Rollari:
        </div>
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:0.5rem;">
          <button type="button" class="btn btn-sm btn-outline" style="font-size:0.8rem;" onclick="window.AuthComponent.loginAs('candidate')">
            ${I.get('user', 14, 'var(--primary)')}
            <span>Nomzod</span>
          </button>
          <button type="button" class="btn btn-sm btn-outline" style="font-size:0.8rem;" onclick="window.AuthComponent.loginAs('employer')">
            ${I.get('building', 14, 'var(--primary)')}
            <span>Ish Beruvchi</span>
          </button>
          <button type="button" class="btn btn-sm btn-outline" style="font-size:0.8rem;" onclick="window.AuthComponent.loginAs('mentor')">
            ${I.get('heartHandshake', 14, 'var(--primary)')}
            <span>Mentor</span>
          </button>
        </div>
      </div>

      <form onsubmit="event.preventDefault(); window.AuthComponent.handleAuthSubmit('${mode}');" style="display:flex; flex-direction:column; gap:1rem;">
        ${!isLogin ? `
          <div>
            <label style="display:block; font-size:0.85rem; font-weight:700; color:var(--text-main); margin-bottom:0.35rem;">To'liq Ism-Familiya</label>
            <input type="text" id="auth-name" required placeholder="Masalan: Umid Saidov" style="width:100%; padding:0.65rem 0.85rem; background:var(--bg-subtle); border:1px solid var(--border-color); border-radius:var(--radius-md); color:var(--text-main);" />
          </div>
        ` : ''}

        <div>
          <label style="display:block; font-size:0.85rem; font-weight:700; color:var(--text-main); margin-bottom:0.35rem;">Elektron Pochta</label>
          <input type="email" id="auth-email" required value="umid@example.com" placeholder="nomingiz@domen.uz" style="width:100%; padding:0.65rem 0.85rem; background:var(--bg-subtle); border:1px solid var(--border-color); border-radius:var(--radius-md); color:var(--text-main);" />
        </div>

        <div>
          <label style="display:block; font-size:0.85rem; font-weight:700; color:var(--text-main); margin-bottom:0.35rem;">Parol</label>
          <input type="password" id="auth-pass" required value="••••••••" style="width:100%; padding:0.65rem 0.85rem; background:var(--bg-subtle); border:1px solid var(--border-color); border-radius:var(--radius-md); color:var(--text-main);" />
        </div>

        <button type="submit" class="btn btn-primary" style="width:100%; margin-top:0.5rem;">
          <span>${isLogin ? 'Hisobga Kirish' : 'Profilni Yaratish'}</span>
          ${I.get('arrowRight', 16, '#ffffff')}
        </button>
      </form>
    `;

    if (window.App && window.App.openModal) {
      window.App.openModal(content);
    }
  },

  loginAs(role) {
    const users = {
      candidate: {
        id: 'usr-cand-1',
        fullName: 'Umid Saidov',
        email: 'umid@example.com',
        role: 'candidate',
        title: 'Frontend & Accessibility Dasturchi',
        avatar: 'US',
        accommodations: ['remote', 'screen_reader']
      },
      employer: {
        id: 'usr-emp-1',
        fullName: 'Aziza Karimova',
        email: 'hr@uzauto.uz',
        role: 'employer',
        title: 'HR Boshqaruvi — UzAuto',
        avatar: 'AK',
        accommodations: []
      },
      mentor: {
        id: 'usr-mnt-1',
        fullName: 'Dilshod Aliyev',
        email: 'dilshod@surdo.uz',
        role: 'mentor',
        title: 'Oliy toifali Surdotarjimon',
        avatar: 'DA',
        accommodations: []
      }
    };

    const user = users[role] || users.candidate;
    if (window.Store) {
      window.Store.dispatch('AUTH_SET_USER', user);
    }

    if (window.App) {
      window.App.closeAllModals();
      window.App.showToast(`Xush kelibsiz, ${user.fullName}!`, 'success');
      window.location.reload();
    }
  },

  handleAuthSubmit(mode) {
    const emailEl = document.getElementById('auth-email');
    const nameEl = document.getElementById('auth-name');

    const email = emailEl ? emailEl.value.trim() : 'umid@example.com';
    const name = mode === 'signup' && nameEl ? nameEl.value.trim() : 'Umid Saidov';

    const user = {
      id: 'usr-' + Date.now(),
      fullName: name,
      email: email,
      role: 'candidate',
      title: 'Mutaxassis (Nomzod)',
      avatar: name.split(' ').map(n => n[0]).join('').toUpperCase() || 'U',
      accommodations: ['remote', 'screen_reader']
    };

    if (window.Store) {
      window.Store.dispatch('AUTH_SET_USER', user);
    }

    if (window.App) {
      window.App.closeAllModals();
      window.App.showToast(`Muvaffaqiyatli ${mode === 'login' ? 'tizimga kirildi' : 'ro‘yxatdan o‘tildi'}!`, 'success');
      window.location.reload();
    }
  },

  logout() {
    if (window.Store) {
      window.Store.dispatch('AUTH_LOGOUT');
    }
    if (window.App) {
      window.App.showToast('Tizimdan chiqildi', 'info');
      window.location.reload();
    }
  }
};
