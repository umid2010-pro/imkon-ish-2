/**
 * "Imkon Ish" — Senior 4-Step Interactive Onboarding Wizard Component
 */

window.OnboardingComponent = {
  currentStep: 1,
  selectedRole: 'candidate',
  selectedAccommodations: ['remote', 'screen_reader'],
  selectedSkills: ['React.js', 'TypeScript', 'WCAG 2.1 AA'],

  accommodationCatalog: [
    {
      id: 'remote',
      title: '100% Masofaviy ish (Remote)',
      description: 'Uydan turib, erkin va asinxron aloqa orqali ishlash'
    },
    {
      id: 'screen_reader',
      title: "Ekran o'quvchi mos dasturlar (NVDA/JAWS)",
      description: "Screen Reader bilan to'liq moslashgan ish muhiti"
    },
    {
      id: 'hearing',
      title: 'Faqat matnli muloqot (Eshitish qulayligi)',
      description: 'Ovozli qo\'ng\'iroqlarsiz, faqat chat va yozma topshiriqlar'
    },
    {
      id: 'flexible_hours',
      title: 'Moslashuvchan ish soatlari',
      description: "Erkin va sog'liqqa mos ish grafigi"
    }
  ],

  roleCatalog: [
    {
      id: 'candidate',
      title: 'Ish Izlovchi (Nomzod)',
      description: 'To\'siqsiz, masofaviy yoki moslashtirilgan qulay ish topishni xohlayman.',
      icon: 'user'
    },
    {
      id: 'employer',
      title: 'Ish Beruvchi (HR)',
      description: 'Iqtidorli mutaxassislarni jalb qilish va soliq imtiyozlaridan foydalanish.',
      icon: 'building'
    }
  ],

  skillCatalog: ['React.js', 'JavaScript', 'TypeScript', 'WCAG 2.1 AA', 'Figma', 'Python', 'QA Testing', 'Online Chat', 'Data Entry', 'Tarjima'],

  render() {
    const I = window.Icons;

    return `
      <section class="section-spacing container" aria-labelledby="onboarding-title" style="padding-top:2.5rem; max-width:860px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:3rem; position:relative;">
          <div style="position:absolute; top:50%; left:0; right:0; height:2px; background:var(--border-color); z-index:1; transform:translateY(-50%);"></div>

          ${[1, 2, 3, 4].map(step => {
            const isCompleted = step < this.currentStep;
            const isActive = step === this.currentStep;
            return `
              <div style="position:relative; z-index:2; display:flex; flex-direction:column; align-items:center; gap:0.4rem;">
                <div style="width:42px; height:42px; border-radius:50%; background:${isActive ? 'var(--primary)' : (isCompleted ? 'var(--primary-hover)' : 'var(--bg-card)')}; border:2px solid ${isActive ? 'var(--primary)' : (isCompleted ? 'var(--primary)' : 'var(--border-color)')}; color:${isActive || isCompleted ? '#ffffff' : 'var(--text-secondary)'}; font-weight:800; display:flex; align-items:center; justify-content:center; box-shadow:var(--shadow-sm);">
                  ${isCompleted ? I.get('check', 18, '#ffffff') : step}
                </div>
                <span style="font-size:0.8rem; font-weight:700; color:${isActive ? 'var(--primary)' : 'var(--text-secondary)'};">
                  ${step === 1 ? 'Rol' : (step === 2 ? 'Ehtiyojlar' : (step === 3 ? 'Ko‘nikmalar' : 'Tayyor'))}
                </span>
              </div>
            `;
          }).join('')}
        </div>

        <div class="card" style="padding:2.5rem; border:1px solid rgba(22, 160, 133, 0.12); box-shadow:0 20px 40px -18px rgba(15,23,42,0.12);">
          ${this.renderStepContent()}
        </div>
      </section>
    `;
  },

  renderStepContent() {
    const I = window.Icons;

    if (this.currentStep === 1) {
      return `
        <h2 style="font-size:1.9rem; margin-bottom:0.5rem;">Siz platformadan qanday maqsadda foydalanasiz?</h2>
        <p style="color:var(--text-secondary); margin-bottom:2rem;">O'zingizga mos rolni tanlang, tizim siz uchun mos interfeysni taqdim etadi.</p>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; margin-bottom:2.5rem;">
          ${this.roleCatalog.map(role => {
            const active = this.selectedRole === role.id;
            return `
              <button type="button" class="card card-interactive" style="width:100%; border-color:${active ? 'var(--primary)' : 'var(--border-color)'}; background:${active ? 'var(--primary-light)' : 'var(--bg-card)'}; text-align:left; padding:1.4rem; cursor:pointer;" onclick="window.OnboardingComponent.setRole('${role.id}')">
                <div style="width:46px; height:46px; border-radius:var(--radius-md); background:${active ? 'var(--primary)' : 'var(--bg-subtle)'}; color:${active ? '#ffffff' : 'var(--primary)'}; display:flex; align-items:center; justify-content:center; margin-bottom:1rem;">
                  ${I.get(role.icon, 22, 'currentColor')}
                </div>
                <h3 style="font-size:1.2rem; margin-bottom:0.4rem;">${role.title}</h3>
                <p style="font-size:0.875rem; color:var(--text-secondary); margin:0;">${role.description}</p>
              </button>
            `;
          }).join('')}
        </div>

        <div style="display:flex; justify-content:flex-end;">
          <button type="button" class="btn btn-primary btn-lg" onclick="window.OnboardingComponent.nextStep()">
            <span>Davom etish</span>
            ${I.get('arrowRight', 16, '#ffffff')}
          </button>
        </div>
      `;
    }

    if (this.currentStep === 2) {
      return `
        <h2 style="font-size:1.9rem; margin-bottom:0.5rem;">Siz uchun qanday sharoitlar muhim?</h2>
        <p style="color:var(--text-secondary); margin-bottom:2rem;">AI faqat siz tanlagan qulayliklarga 100% mos keluvchi vakansiyalarni tavsiya qiladi.</p>

        <div style="display:flex; flex-direction:column; gap:0.85rem; margin-bottom:2.5rem;">
          ${this.accommodationCatalog.map(item => {
            const checked = this.selectedAccommodations.includes(item.id);
            return `
              <label style="display:flex; align-items:flex-start; gap:0.85rem; background:${checked ? 'var(--primary-light)' : 'var(--bg-subtle)'}; border:1px solid ${checked ? 'rgba(22,160,133,0.28)' : 'var(--border-color)'}; border-radius:var(--radius-md); padding:1rem 1.25rem; cursor:pointer; transition:var(--transition);">
                <input type="checkbox" ${checked ? 'checked' : ''} onchange="window.OnboardingComponent.toggleAcc('${item.id}')" style="width:18px; height:18px; accent-color:var(--primary); margin-top:0.2rem;" />
                <div>
                  <div style="font-weight:700; color:var(--text-main);">${item.title}</div>
                  <div style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.15rem;">${item.description}</div>
                </div>
              </label>
            `;
          }).join('')}
        </div>

        <div style="display:flex; justify-content:space-between;">
          <button type="button" class="btn btn-outline" onclick="window.OnboardingComponent.prevStep()">Orqaga</button>
          <button type="button" class="btn btn-primary btn-lg" onclick="window.OnboardingComponent.nextStep()">
            <span>Davom etish</span>
            ${I.get('arrowRight', 16, '#ffffff')}
          </button>
        </div>
      `;
    }

    if (this.currentStep === 3) {
      return `
        <h2 style="font-size:1.9rem; margin-bottom:0.5rem;">Asosiy ko‘nikmalaringiz</h2>
        <p style="color:var(--text-secondary); margin-bottom:2rem;">O'zingizga ma'qul texnologiyalar yoki kasbiy sohalarni belgilang.</p>

        <div style="display:flex; gap:0.6rem; flex-wrap:wrap; margin-bottom:2.5rem;">
          ${this.skillCatalog.map(skill => {
            const active = this.selectedSkills.includes(skill);
            return `
              <button type="button" class="btn btn-sm ${active ? 'btn-primary' : 'btn-outline'}" onclick="window.OnboardingComponent.toggleSkill('${skill}')" style="padding:0.7rem 1rem;">
                ${skill}
              </button>
            `;
          }).join('')}
        </div>

        <div style="display:flex; justify-content:space-between;">
          <button type="button" class="btn btn-outline" onclick="window.OnboardingComponent.prevStep()">Orqaga</button>
          <button type="button" class="btn btn-primary btn-lg" onclick="window.OnboardingComponent.nextStep()">
            <span>AI Profilni yaratish</span>
            ${I.get('sparkles', 16, '#ffffff')}
          </button>
        </div>
      `;
    }

    if (this.currentStep === 4) {
      return `
        <div style="text-align:center; padding:1.5rem 0;">
          <div style="width:74px; height:74px; border-radius:50%; background:linear-gradient(135deg, var(--primary-light), rgba(22,160,133,0.14)); color:var(--primary); display:flex; align-items:center; justify-content:center; margin:0 auto 1.5rem; box-shadow:0 10px 24px -16px rgba(22,160,133,0.6);">
            ${I.get('checkCircle2', 34, 'var(--primary)')}
          </div>
          <h2 style="font-size:2.1rem; margin-bottom:0.75rem;">Profilingiz muvaffaqiyatli yaratildi!</h2>
          <p style="color:var(--text-secondary); font-size:1.05rem; max-width:540px; margin:0 auto 2rem; line-height:1.7;">
            Sun'iy intellekt sizning talablaringizga 100% mos keluvchi <strong>6 ta eng yaxshi vakansiya</strong>ni topdi.
          </p>

          <div style="display:inline-flex; gap:1rem; flex-wrap:wrap; justify-content:center;">
            <a href="dashboard.html" class="btn btn-primary btn-lg">
              ${I.get('user', 18, '#ffffff')}
              <span>Mening sahifamga o'tish</span>
            </a>
            <a href="jobs.html" class="btn btn-outline btn-lg">
              ${I.get('briefcase', 18, 'currentColor')}
              <span>Vakansiyalarni ko'rish</span>
            </a>
          </div>
        </div>
      `;
    }
  },

  setRole(r) {
    this.selectedRole = r;
    this.refreshView();
  },

  toggleAcc(acc) {
    if (this.selectedAccommodations.includes(acc)) {
      this.selectedAccommodations = this.selectedAccommodations.filter(a => a !== acc);
    } else {
      this.selectedAccommodations.push(acc);
    }
    this.refreshView();
  },

  toggleSkill(sk) {
    if (this.selectedSkills.includes(sk)) {
      this.selectedSkills = this.selectedSkills.filter(s => s !== sk);
    } else {
      this.selectedSkills.push(sk);
    }
    this.refreshView();
  },

  persistProfile() {
    const store = window.Store;
    if (!store) return;

    const currentUser = store.getState().currentUser || {
      id: 'usr-' + Date.now(),
      fullName: 'Yangi foydalanuvchi',
      email: 'user@example.com',
      role: 'candidate'
    };

    const updatedProfile = {
      ...currentUser,
      role: this.selectedRole,
      accommodations: this.selectedAccommodations,
      skills: this.selectedSkills,
      onboardingCompleted: true,
      title: this.selectedRole === 'employer' ? 'HR & Talent Strategist' : 'Inclusive Career Profile'
    };

    store.dispatch('UPDATE_CANDIDATE_SHOWCASE', {
      candidateId: currentUser.id,
      data: {
        role: updatedProfile.role,
        accommodations: updatedProfile.accommodations,
        skills: updatedProfile.skills,
        onboardingCompleted: true,
        title: updatedProfile.title
      }
    });

    store.dispatch('AUTH_SET_USER', updatedProfile);
  },

  nextStep() {
    if (this.currentStep === 3) {
      this.persistProfile();
    }

    if (this.currentStep < 4) {
      this.currentStep += 1;
      this.refreshView();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep -= 1;
      this.refreshView();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },

  refreshView() {
    const mainEl = document.getElementById('onboarding-mount');
    if (mainEl) {
      mainEl.innerHTML = this.render();
    }
  }
};
