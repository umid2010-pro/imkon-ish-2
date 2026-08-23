/**
 * "Imkon Ish" — Senior Personal Job Assistant Dashboard Component
 * Clean Human-Centered Dashboard with Personal Assistant greeting, stats, recommendations, and sidebar
 */

window.DashboardComponent = {
  activeTab: 'recommendations', // recommendations | applications | saved | profile | cv-scanner | interview-coach
  selectedCvSample: 'frontend',
  isScanning: false,
  scanProgress: 0,
  scanResults: null,
  selectedQuestionId: 1,
  userInterviewAnswer: '',
  aiInterviewFeedback: null,

  render() {
    const data = window.APP_DATA;
    const I = window.Icons;
    const storeState = window.Store ? window.Store.getState() : {};
    const currentUser = storeState.currentUser || {
      fullName: 'Umid',
      role: 'candidate',
      title: 'Frontend & Accessibility Dasturchi'
    };

    const savedJobs = storeState.savedJobs || [];
    const applications = storeState.applications || [];

    // Extract first name for friendly greeting
    const firstName = (currentUser.fullName || 'Umid').split(' ')[0];

    return `
      <section class="section-spacing container" aria-labelledby="dashboard-title" style="padding-top:2rem;">
        
        <div class="dashboard-layout">
          
          <!-- Left Sidebar (Clean & Minimal) -->
          <aside class="dashboard-sidebar" aria-label="Foydalanuvchi boshqaruv menyusi">
            
            <!-- User Profile Summary Pill -->
            <div style="display:flex; align-items:center; gap:0.75rem; padding-bottom:1.25rem; margin-bottom:1rem; border-bottom:1px solid var(--border-color);">
              <div style="width:42px; height:42px; border-radius:50%; background:var(--primary); color:#ffffff; font-weight:800; font-size:1rem; display:flex; align-items:center; justify-content:center;">
                ${currentUser.avatar || firstName[0] || 'U'}
              </div>
              <div style="flex:1; min-width:0;">
                <div style="font-weight:800; font-size:0.95rem; color:var(--text-main); text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">
                  ${currentUser.fullName || 'Umid'}
                </div>
                <div style="font-size:0.75rem; color:var(--primary); font-weight:700;">
                  Personal Assistant
                </div>
              </div>
            </div>

            <!-- Navigation Links -->
            <nav style="display:flex; flex-direction:column; gap:0.25rem;">
              
              <button type="button" 
                      class="dashboard-nav-item ${this.activeTab === 'recommendations' ? 'active' : ''}" 
                      onclick="window.DashboardComponent.switchTab('recommendations')">
                ${I.get('home', 18, this.activeTab === 'recommendations' ? 'var(--primary)' : 'var(--text-secondary)')}
                <span>Bosh sahifa</span>
              </button>

              <button type="button" 
                      class="dashboard-nav-item ${this.activeTab === 'applications' ? 'active' : ''}" 
                      onclick="window.DashboardComponent.switchTab('applications')">
                ${I.get('fileText', 18, this.activeTab === 'applications' ? 'var(--primary)' : 'var(--text-secondary)')}
                <span>Mening arizalarim</span>
                <span class="badge badge-green" style="margin-left:auto; font-size:0.7rem; padding:1px 6px;">${applications.length || 5}</span>
              </button>

              <button type="button" 
                      class="dashboard-nav-item ${this.activeTab === 'saved' ? 'active' : ''}" 
                      onclick="window.DashboardComponent.switchTab('saved')">
                ${I.get('heart', 18, this.activeTab === 'saved' ? 'var(--primary)' : 'var(--text-secondary)')}
                <span>Saqlangan ishlar</span>
                <span class="badge badge-amber" style="margin-left:auto; font-size:0.7rem; padding:1px 6px;">${savedJobs.length || 12}</span>
              </button>

              <a href="chat.html" class="dashboard-nav-item">
                ${I.get('messageSquare', 18, 'var(--text-secondary)')}
                <span>Xabarlar</span>
              </a>

              <button type="button" 
                      class="dashboard-nav-item ${this.activeTab === 'profile' ? 'active' : ''}" 
                      onclick="window.DashboardComponent.switchTab('profile')">
                ${I.get('user', 18, this.activeTab === 'profile' ? 'var(--primary)' : 'var(--text-secondary)')}
                <span>Profilim</span>
              </button>

              <button type="button" 
                      class="dashboard-nav-item ${this.activeTab === 'cv-scanner' ? 'active' : ''}" 
                      onclick="window.DashboardComponent.switchTab('cv-scanner')">
                ${I.get('sparkles', 18, this.activeTab === 'cv-scanner' ? 'var(--primary)' : 'var(--text-secondary)')}
                <span>AI CV Skaner</span>
              </button>

              <button type="button" 
                      class="dashboard-nav-item ${this.activeTab === 'interview-coach' ? 'active' : ''}" 
                      onclick="window.DashboardComponent.switchTab('interview-coach')">
                ${I.get('mic', 18, this.activeTab === 'interview-coach' ? 'var(--primary)' : 'var(--text-secondary)')}
                <span>Intervyu Trenajyor</span>
              </button>

              <button type="button" 
                      class="dashboard-nav-item" 
                      style="margin-top:1.5rem; color:var(--danger); border-top:1px solid var(--border-color); padding-top:1rem; border-radius:0;" 
                      onclick="window.AuthComponent.logout()">
                ${I.get('logOut', 18, 'var(--danger)')}
                <span>Chiqish</span>
              </button>

            </nav>

          </aside>

          <!-- Main Dashboard Content -->
          <main>
            
            ${this.renderMainContent(firstName, data, storeState, savedJobs, applications)}

          </main>

        </div>

      </section>
    `;
  },

  renderMainContent(firstName, data, storeState, savedJobs, applications) {
    const I = window.Icons;

    if (this.activeTab === 'applications') {
      return this.renderApplicationsTab(applications, data);
    } else if (this.activeTab === 'saved') {
      return this.renderSavedJobsTab(savedJobs, data);
    } else if (this.activeTab === 'profile') {
      return this.renderProfileTab(storeState);
    } else if (this.activeTab === 'cv-scanner') {
      return this.renderCvScannerTab();
    } else if (this.activeTab === 'interview-coach') {
      return this.renderInterviewCoachTab();
    }

    // Default: Personal Job Assistant Recommendations Tab
    const recommendedJobs = (data.vacancies || []).slice(0, 3);

    return `
      <!-- Greeting Header -->
      <div style="margin-bottom:2rem;">
        <h1 id="dashboard-title" style="font-size:2.2rem; margin:0 0 0.35rem 0;">
          Salom, ${firstName}
        </h1>
        <p style="font-size:1.15rem; color:var(--text-secondary); margin:0;">
          Bugun siz uchun <strong style="color:var(--primary);">6 ta yangi mos ish</strong> topildi.
        </p>
      </div>

      <!-- 4 Stats Cards -->
      <div class="grid-4" style="margin-bottom:2.5rem;">
        
        <!-- Stat 1: 12 Saqlangan ish -->
        <div class="stats-card">
          <div class="stats-icon-box" style="background:var(--accent-light); color:#B45309;">
            ${I.get('bookmark', 24, '#B45309')}
          </div>
          <div>
            <div class="stats-number">${savedJobs.length ? savedJobs.length : '12'}</div>
            <div class="stats-label">Saqlangan ish</div>
          </div>
        </div>

        <!-- Stat 2: 5 Yuborilgan ariza -->
        <div class="stats-card">
          <div class="stats-icon-box" style="background:var(--primary-light); color:var(--primary);">
            ${I.get('fileText', 24, 'var(--primary)')}
          </div>
          <div>
            <div class="stats-number">${applications.length ? applications.length : '5'}</div>
            <div class="stats-label">Yuborilgan ariza</div>
          </div>
        </div>

        <!-- Stat 3: 2 Suhbat -->
        <div class="stats-card">
          <div class="stats-icon-box" style="background:var(--secondary-light); color:var(--secondary);">
            ${I.get('messageSquare', 24, 'var(--secondary)')}
          </div>
          <div>
            <div class="stats-number">2</div>
            <div class="stats-label">Suhbat</div>
          </div>
        </div>

        <!-- Stat 4: 82% Profil to‘ldirilgan -->
        <div class="stats-card">
          <div class="stats-icon-box" style="background:var(--primary-light); color:var(--primary);">
            ${I.get('user', 24, 'var(--primary)')}
          </div>
          <div>
            <div class="stats-number">82%</div>
            <div class="stats-label">Profil to‘ldirilgan</div>
          </div>
        </div>

      </div>

      <!-- Recommendations Section -->
      <div style="margin-bottom:3rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
          <div>
            <h2 style="font-size:1.5rem; margin:0 0 0.25rem 0;">Siz uchun tavsiya</h2>
            <p style="font-size:0.95rem; color:var(--text-secondary); margin:0;">
              Profilingiz, qulaylik ehtiyojlaringiz va ko'nikmalaringizga asosan tanlangan eng yaxshi 3 ta vakansiya.
            </p>
          </div>
          <a href="jobs.html" class="btn btn-outline btn-sm">
            <span>Barchasini ko'rish</span>
            ${I.get('arrowRight', 14)}
          </a>
        </div>

        <!-- 3 Big Job Cards -->
        <div style="display:flex; flex-direction:column; gap:1rem;">
          ${recommendedJobs.map(job => `
            <div class="job-card" style="margin-bottom:0;">
              <div class="job-card-header">
                <div class="job-company-box">
                  <div class="job-company-logo">
                    ${(job.company || 'UA').substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 style="font-size:1.35rem; font-weight:800; margin:0 0 0.25rem 0;">${job.title}</h3>
                    <div class="job-company-name">
                      <span>${job.company}</span>
                      ${I.get('shieldCheck', 14, 'var(--primary)')}
                    </div>
                  </div>
                </div>

                <div class="ai-match-badge">
                  <div class="ai-match-score">${job.aiMatch}% moslik</div>
                  <div class="ai-match-label">AI Tavsiya</div>
                </div>
              </div>

              <div class="job-meta-row">
                <div class="job-meta-item">
                  ${I.get('mapPin', 15, 'var(--primary)')}
                  <span>${job.location}</span>
                </div>
                <div class="job-meta-item">
                  ${I.get('home', 15, 'var(--primary)')}
                  <span>Masofaviy</span>
                </div>
                <div class="job-meta-item">
                  ${I.get('briefcase', 15, 'var(--secondary)')}
                  <span>${job.employmentType || 'To‘liq stavka'}</span>
                </div>
                <div class="job-salary" style="margin-left:auto;">
                  ${job.salary}
                </div>
              </div>

              <!-- Checkmarks -->
              <div class="ai-reasons-list">
                ${(job.matchReasons || ['JavaScript', 'Remote', 'Tajribangizga mos']).map(r => `
                  <div style="display:flex; align-items:center; gap:0.35rem;">
                    ${I.get('check', 13, 'var(--primary)')}
                    <span>${r}</span>
                  </div>
                `).join('')}
              </div>

              <div class="job-card-footer">
                <div class="job-tags-row">
                  ${(job.skills || ['React', 'JavaScript', 'Remote']).map(s => `
                    <span class="job-tag">${s}</span>
                  `).join('')}
                </div>

                <div style="display:flex; gap:0.5rem;">
                  <button type="button" class="btn btn-outline btn-sm" onclick="window.JobsComponent.openJobDetails(${job.id})">
                    <span>Batafsil</span>
                  </button>
                  <button type="button" class="btn btn-primary btn-sm" onclick="window.JobsComponent.openApplyModal(${job.id})">
                    ${I.get('sparkles', 14, '#ffffff')}
                    <span>AI Tezkor Ariza</span>
                  </button>
                </div>
              </div>

            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderApplicationsTab(applications, data) {
    const I = window.Icons;
    return `
      <div style="margin-bottom:2rem;">
        <h2 style="font-size:1.8rem; margin-bottom:0.35rem;">Mening Arizalarim</h2>
        <p style="color:var(--text-secondary);">Topshirilgan barcha arizalaringiz va ularning joriy holati.</p>
      </div>

      <div style="display:flex; flex-direction:column; gap:1rem;">
        ${(data.vacancies || []).slice(0, 3).map((job, idx) => `
          <div class="card" style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem;">
            <div style="display:flex; align-items:center; gap:1rem;">
              <div class="job-company-logo">${(job.company || 'UA').substring(0, 2).toUpperCase()}</div>
              <div>
                <h3 style="font-size:1.15rem; margin-bottom:0.25rem;">${job.title}</h3>
                <div style="font-size:0.85rem; color:var(--text-secondary);">${job.company} • ${job.salary}</div>
              </div>
            </div>
            <div style="display:flex; align-items:center; gap:1rem;">
              <span class="badge ${idx === 0 ? 'badge-green' : (idx === 1 ? 'badge-blue' : 'badge-amber')}">
                ${idx === 0 ? '✓ Suhbatga taklif' : (idx === 1 ? '● Ko\'rib chiqilmoqda' : '● Ariza yuborildi')}
              </span>
              <a href="chat.html" class="btn btn-outline btn-sm">
                ${I.get('messageSquare', 14)}
                <span>Muloqot</span>
              </a>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderSavedJobsTab(savedJobs, data) {
    const I = window.Icons;
    return `
      <div style="margin-bottom:2rem;">
        <h2 style="font-size:1.8rem; margin-bottom:0.35rem;">Saqlangan Ishlar</h2>
        <p style="color:var(--text-secondary);">Siz belgilab qo'ygan qulay vakansiyalar ro'yxati.</p>
      </div>

      <div style="display:flex; flex-direction:column; gap:1rem;">
        ${(data.vacancies || []).slice(0, 4).map(job => `
          <div class="card" style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem;">
            <div style="display:flex; align-items:center; gap:1rem;">
              <div class="job-company-logo">${(job.company || 'UA').substring(0, 2).toUpperCase()}</div>
              <div>
                <h3 style="font-size:1.15rem; margin-bottom:0.25rem;">${job.title}</h3>
                <div style="font-size:0.85rem; color:var(--text-secondary);">${job.company} • ${job.location}</div>
              </div>
            </div>
            <div style="display:flex; align-items:center; gap:0.75rem;">
              <span class="badge badge-green">${job.aiMatch}% moslik</span>
              <button type="button" class="btn btn-primary btn-sm" onclick="window.JobsComponent.openApplyModal(${job.id})">
                Ariza topshirish
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderProfileTab(storeState) {
    const I = window.Icons;
    const user = storeState.currentUser || { fullName: 'Umid Nomzod', email: 'umid@example.com', title: 'Frontend Developer' };
    return `
      <div style="margin-bottom:2rem;">
        <h2 style="font-size:1.8rem; margin-bottom:0.35rem;">Mening Profilim</h2>
        <p style="color:var(--text-secondary);">Inklyuziv ma'lumotlaringiz va qulaylik parametrlari.</p>
      </div>

      <div class="card" style="padding:2rem;">
        <div style="display:flex; align-items:center; gap:1.25rem; margin-bottom:2rem;">
          <div style="width:64px; height:64px; border-radius:50%; background:var(--primary); color:#ffffff; font-size:1.5rem; font-weight:900; display:flex; align-items:center; justify-content:center;">
            ${user.avatar || 'U'}
          </div>
          <div>
            <h3 style="font-size:1.35rem; margin-bottom:0.25rem;">${user.fullName}</h3>
            <div style="color:var(--primary); font-weight:700;">${user.title}</div>
          </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; margin-bottom:1.5rem;">
          <div>
            <label style="display:block; font-size:0.85rem; font-weight:700; color:var(--text-main); margin-bottom:0.35rem;">Elektron pochta</label>
            <input type="text" readonly value="${user.email || 'umid@example.com'}" style="width:100%; padding:0.65rem 0.85rem; background:var(--bg-subtle); border:1px solid var(--border-color); border-radius:var(--radius-md);" />
          </div>
          <div>
            <label style="display:block; font-size:0.85rem; font-weight:700; color:var(--text-main); margin-bottom:0.35rem;">Talab etiladigan qulaylik</label>
            <input type="text" readonly value="100% Masofaviy ish, Ekran o'quvchi mos" style="width:100%; padding:0.65rem 0.85rem; background:var(--bg-subtle); border:1px solid var(--border-color); border-radius:var(--radius-md);" />
          </div>
        </div>

        <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
          <span class="badge badge-green">React.js</span>
          <span class="badge badge-green">JavaScript</span>
          <span class="badge badge-green">WCAG 2.1 AA</span>
          <span class="badge badge-green">Remote-First</span>
        </div>
      </div>
    `;
  },

  renderCvScannerTab() {
    const I = window.Icons;
    return `
      <div style="margin-bottom:2rem;">
        <h2 style="font-size:1.8rem; margin-bottom:0.35rem;">AI Lazerli CV Skaner</h2>
        <p style="color:var(--text-secondary);">Rezyumengizni tahlil qiling va uning inklyuziv ish bozoriga mosligini oshiring.</p>
      </div>

      <div class="card" style="padding:2.5rem; text-align:center;">
        <div style="width:60px; height:60px; border-radius:50%; background:var(--primary-light); color:var(--primary); display:flex; align-items:center; justify-content:center; margin:0 auto 1.25rem;">
          ${I.get('fileText', 28)}
        </div>
        <h3 style="font-size:1.35rem; margin-bottom:0.5rem;">Rezyumeni yuklang yoki namunani tanlang</h3>
        <p style="color:var(--text-secondary); max-width:440px; margin:0 auto 1.5rem; font-size:0.95rem;">
          AI rezyumengizdagi asosiy kuchli jihatlar va WCAG standartlariga moslikni 96% aniqlikda tahlil qiladi.
        </p>
        <button type="button" class="btn btn-primary btn-lg" onclick="window.App.showToast('Rezyume muvaffaqiyatli tahlil qilindi: 96% moslik!', 'success')">
          ${I.get('sparkles', 18, '#ffffff')}
          <span>Namuna CVni Skanerlash</span>
        </button>
      </div>
    `;
  },

  renderInterviewCoachTab() {
    const I = window.Icons;
    return `
      <div style="margin-bottom:2rem;">
        <h2 style="font-size:1.8rem; margin-bottom:0.35rem;">Intervyu Trenajyori</h2>
        <p style="color:var(--text-secondary);">Ish beruvchilar bilan suhbatdan oldin AI murabbiy yordamida mashq qiling.</p>
      </div>

      <div class="card" style="padding:2rem;">
        <div style="background:var(--primary-light); padding:1rem; border-radius:var(--radius-md); margin-bottom:1.5rem; display:flex; align-items:center; gap:0.75rem;">
          ${I.get('bot', 24, 'var(--primary)')}
          <div>
            <div style="font-weight:800; color:var(--primary-hover);">AI Suhbat Savoli:</div>
            <div style="font-size:0.95rem; color:var(--text-main);">"O'zingizning masofaviy ishlash tajribangiz va jamoa bilan asinxron muloqot qilish ko'nikmalaringiz haqida so'zlab bering."</div>
          </div>
        </div>

        <textarea rows="4" placeholder="Javobingizni bu yerga yozing yoki ovozli yozuvni yoqing..." style="width:100%; padding:0.85rem; border:1px solid var(--border-color); border-radius:var(--radius-md); font-family:inherit; margin-bottom:1.25rem;"></textarea>

        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem;">
          <button type="button" class="btn btn-outline" onclick="window.App.showToast('Mikrofon sinovi faollashdi', 'info')">
            ${I.get('mic', 16)}
            <span>Ovozli yozish</span>
          </button>
          <button type="button" class="btn btn-primary" onclick="window.App.showToast('AI javobingizni 95 ball bilan baholadi!', 'success')">
            ${I.get('send', 16, '#ffffff')}
            <span>Tahlil qilish</span>
          </button>
        </div>
      </div>
    `;
  },

  switchTab(tab) {
    this.activeTab = tab;
    this.refreshView();
  },

  refreshView() {
    const mount = document.getElementById('dashboard-mount');
    if (mount) {
      mount.innerHTML = this.render();
    }
  }
};
