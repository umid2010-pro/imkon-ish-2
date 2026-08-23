/**
 * "Imkon Ish" — Senior Employers & B2B Partner Suite Component
 * Company Cards Grid with Inclusive Scores, Candidate Talent Showcase & 1% Social Tax ROI Calculator
 */

window.EmployersComponent = {
  employeeCount: 5,
  averageSalary: 8000000,
  searchQuery: '',
  selectedCategory: 'all',

  render() {
    const data = window.APP_DATA;
    const I = window.Icons;
    const calc = this.calculateRoi();
    const partners = data.partners || [];
    const candidates = data.candidates || [];

    // Filter candidates
    const filteredCandidates = candidates.filter(c => {
      const q = (this.searchQuery || '').toLowerCase();
      const matchesQuery = !q || c.name.toLowerCase().includes(q) || c.title.toLowerCase().includes(q) || (c.skills || []).some(s => s.toLowerCase().includes(q));
      const matchesCategory = this.selectedCategory === 'all' || c.category === this.selectedCategory;
      return matchesQuery && matchesCategory;
    });

    return `
      <section class="section-spacing container" aria-labelledby="employers-title" style="padding-top:2rem;">
        
        <!-- Header -->
        <div style="text-align:center; max-width:760px; margin:0 auto 3.5rem;">
          <span class="badge badge-green" style="margin-bottom:0.75rem;">
            ${I.get('building', 14, 'var(--primary)')}
            <span>Inklyuziv Ish Beruvchilar</span>
          </span>
          <h1 id="employers-title" style="font-size:2.6rem; margin-bottom:1rem;">
            Yetakchi Inklyuziv Kompaniyalar
          </h1>
          <p style="color:var(--text-secondary); font-size:1.15rem; line-height:1.65;">
            Nogironligi bor mutaxassislar uchun qulay sharoitlar yaratgan va 1% ijtimoiy soliq imtiyozidan foydalanayotgan tasdiqlangan tashkilotlar.
          </p>
        </div>

        <!-- Section 1: Company Cards Grid (Clean Cards) -->
        <div style="margin-bottom:4.5rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
            <h2 style="font-size:1.6rem; margin:0;">Hamkor Tashkilotlar</h2>
            <span class="badge badge-neutral">${partners.length} ta sertifikatlangan kompaniya</span>
          </div>

          <div class="grid-3">
            ${partners.map(comp => `
              <div class="company-card">
                <div>
                  <div class="company-header">
                    <div class="company-logo">${comp.logoText || 'UA'}</div>
                    <div class="inclusive-score-badge">
                      Inclusive score: ${comp.inclusiveScore || 92}/100
                    </div>
                  </div>

                  <h3 style="font-size:1.35rem; margin-bottom:0.25rem;">${comp.name}</h3>
                  <div style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:1rem;">${comp.type}</div>

                  <!-- Inclusive Checkmarks -->
                  <div style="display:flex; flex-direction:column; gap:0.4rem; font-size:0.875rem; color:var(--primary-hover); font-weight:600; margin-bottom:1.25rem;">
                    ${(comp.features || ['Remote', 'Accessibility friendly', 'Flexible work']).map(f => `
                      <div style="display:flex; align-items:center; gap:0.45rem;">
                        ${I.get('check', 13, 'var(--primary)')}
                        <span>${f}</span>
                      </div>
                    `).join('')}
                  </div>

                  <p style="font-size:0.9rem; color:var(--text-secondary); line-height:1.5; margin-bottom:1.5rem;">
                    ${comp.description}
                  </p>
                </div>

                <div style="display:flex; align-items:center; justify-content:space-between; border-top:1px solid var(--border-color); padding-top:1rem;">
                  <div style="font-weight:800; color:var(--primary); font-size:0.95rem;">
                    ${comp.vacanciesCount || 12} ta vakansiya
                  </div>
                  <a href="jobs.html?q=${encodeURIComponent(comp.name)}" class="btn btn-outline btn-sm">
                    <span>Vakansiyalarni ko'rish</span>
                    ${I.get('arrowRight', 14)}
                  </a>
                </div>

              </div>
            `).join('')}
          </div>
        </div>

        <!-- Section 2: Candidate Talent Showcase Directory -->
        <div style="margin-bottom:4.5rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:1.5rem;">
            <div>
              <h2 style="font-size:1.6rem; margin:0 0 0.25rem 0;">Iqtidorli Nomzodlar Vitrinasi</h2>
              <p style="color:var(--text-secondary); margin:0;">Kompaniyangiz uchun moslashtirilgan mutaxassislarni to'g'ridan-to'g'ri toping.</p>
            </div>
            <span class="badge badge-green">${filteredCandidates.length} nafar faol mutaxassis</span>
          </div>

          <div class="grid-2">
            ${filteredCandidates.map(cand => `
              <div class="card" style="display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                  <div style="display:flex; align-items:center; gap:0.85rem; margin-bottom:1rem;">
                    <div style="width:48px; height:48px; border-radius:50%; background:var(--primary); color:#ffffff; font-weight:800; font-size:1.1rem; display:flex; align-items:center; justify-content:center;">
                      ${cand.avatar || 'U'}
                    </div>
                    <div>
                      <div style="display:flex; align-items:center; gap:0.5rem;">
                        <h3 style="font-size:1.2rem; margin:0;">${cand.name}</h3>
                        <span class="badge badge-green" style="font-size:0.7rem;">${cand.aiScore}% Mos</span>
                      </div>
                      <div style="font-size:0.85rem; color:var(--primary); font-weight:700;">${cand.title}</div>
                    </div>
                  </div>

                  <p style="font-size:0.9rem; color:var(--text-secondary); line-height:1.55; margin-bottom:1rem;">
                    "${cand.bio}"
                  </p>

                  <div style="display:flex; gap:0.4rem; flex-wrap:wrap; margin-bottom:1.25rem;">
                    ${(cand.skills || []).map(s => `<span class="job-tag">${s}</span>`).join('')}
                  </div>
                </div>

                <div style="display:flex; align-items:center; justify-content:space-between; border-top:1px solid var(--border-color); padding-top:1rem;">
                  <div style="font-size:0.9rem; font-weight:800; color:var(--text-main);">
                    ${cand.expectedSalary}
                  </div>
                  <a href="chat.html" class="btn btn-primary btn-sm">
                    ${I.get('messageSquare', 14, '#ffffff')}
                    <span>Muloqot boshlash</span>
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Section 3: 1% Social Tax ROI Calculator -->
        <div class="card" style="background:var(--bg-subtle); padding:2.5rem; border-radius:var(--radius-xl);">
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:2.5rem; align-items:center;">
            <div>
              <span class="badge badge-green" style="margin-bottom:0.75rem;">Qonuniy Imtiyozlar</span>
              <h2 style="font-size:2rem; margin-bottom:0.75rem;">1% Ijtimoiy Soliq ROI Kalkulyatori</h2>
              <p style="color:var(--text-secondary); font-size:1rem; line-height:1.6; margin-bottom:1.5rem;">
                O'zbekiston Respublikasi qonunchiligiga binoan, nogironligi bor shaxslarni ishga olgan korxonalar uchun ijtimoiy soliq stavkasi 12% dan 1% ga tushiriladi.
              </p>
              
              <div style="display:flex; flex-direction:column; gap:1rem;">
                <div>
                  <label style="display:block; font-size:0.85rem; font-weight:700; color:var(--text-main); margin-bottom:0.35rem;">
                    Rejalashtirilgan xodimlar soni: <strong>${this.employeeCount} nafar</strong>
                  </label>
                  <input type="range" min="1" max="25" value="${this.employeeCount}" oninput="window.EmployersComponent.setCount(this.value)" style="width:100%; accent-color:var(--primary);" />
                </div>
              </div>
            </div>

            <!-- Calculation Output Box -->
            <div style="background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-lg); padding:1.75rem; box-shadow:var(--shadow-sm);">
              <div style="font-size:0.85rem; font-weight:700; color:var(--text-secondary); margin-bottom:0.5rem;">Yillik iqtisod qilinadigan mablag':</div>
              <div style="font-size:2.2rem; font-weight:900; color:var(--primary); margin-bottom:1rem;">${calc.annualSavingText}</div>
              
              <div style="display:flex; flex-direction:column; gap:0.5rem; font-size:0.875rem; color:var(--text-secondary); border-top:1px solid var(--border-color); padding-top:1rem;">
                <div style="display:flex; justify-content:space-between;">
                  <span>Oddiy soliq (12%):</span>
                  <strong>${calc.regularTaxText}</strong>
                </div>
                <div style="display:flex; justify-content:space-between;">
                  <span>Imtiyozli soliq (1%):</span>
                  <strong style="color:var(--primary);">${calc.discountedTaxText}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
    `;
  },

  calculateRoi() {
    const monthlySalaryPool = this.employeeCount * this.averageSalary;
    const regularTax = monthlySalaryPool * 0.12 * 12;
    const discountedTax = monthlySalaryPool * 0.01 * 12;
    const saving = regularTax - discountedTax;

    return {
      annualSavingText: `${(saving / 1000000).toFixed(1)} mln so‘m / yil`,
      regularTaxText: `${(regularTax / 1000000).toFixed(1)} mln so‘m`,
      discountedTaxText: `${(discountedTax / 1000000).toFixed(1)} mln so‘m`
    };
  },

  setCount(val) {
    this.employeeCount = parseInt(val, 10);
    this.refreshView();
  },

  refreshView() {
    const mount = document.getElementById('employers-mount');
    if (mount) {
      mount.innerHTML = this.render();
    }
  }
};
