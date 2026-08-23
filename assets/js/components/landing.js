/**
 * "Imkon Ish" — Senior Home Landing Component
 * Hero with Authentic Storyset Illustration (Inclusive Professional on Wheelchair with Laptop), Search Box & 4 Advantage Cards
 */

window.LandingComponent = {
  simulatorMode: 'candidate',
  simulatorCandidateAcc: 'screen_reader',
  simulatorEmployerTier: 'tier1',
  selectedLocation: '',
  isLocationDropdownOpen: false,

  workTypes: [
    { value: '', label: 'Barcha ish turlari' },
    { value: 'remote', label: '100% Masofaviy' },
    { value: 'screen_reader', label: 'Ekran o‘quvchi mos' },
    { value: 'hearing', label: 'Faqat matnli chat' },
    { value: 'flexible_hours', label: 'Moslashuvchan grafik' }
  ],
  selectedWorkType: '',
  isWorkTypeDropdownOpen: false,

  getSelectedLocationLabel() {
    if (!this.selectedLocation) return 'Barcha hududlar';
    const regions = (window.APP_DATA && window.APP_DATA.regions) ? window.APP_DATA.regions : [];
    const found = regions.find(r => r.value === this.selectedLocation);
    return found ? found.label : this.selectedLocation;
  },

  getSelectedWorkTypeLabel() {
    const found = this.workTypes.find(w => w.value === this.selectedWorkType);
    return found ? found.label : 'Barcha ish turlari';
  },

  render() {
    const data = window.APP_DATA;
    const I = window.Icons;

    return `
      <!-- Hero Section -->
      <section class="hero-section" aria-labelledby="hero-title">
        <div class="container">
          <div class="hero-grid">
            
            <!-- Left Hero Content -->
            <div>
              <div style="display:inline-flex; align-items:center; gap:0.5rem; margin-bottom:1.25rem;">
                <span class="badge badge-green">
                  ${I.get('shieldCheck', 14, 'var(--primary)')}
                  <span>Inklyuziv Ish Platformasi</span>
                </span>
                <span class="badge badge-blue">
                  ${I.get('sparkles', 14, 'var(--secondary)')}
                  <span>AI Hamrohligida</span>
                </span>
              </div>

              <h1 id="hero-title" class="hero-title">
                Siz uchun <span class="highlight-green">mos ishni</span> toping
              </h1>

              <p class="hero-desc">
                Imkoniyati cheklangan insonlar uchun qulay, moslashtirilgan va zamonaviy ish platformasi.
              </p>

              <!-- Hero Buttons -->
              <div class="hero-buttons">
                <a href="jobs.html" class="btn btn-primary btn-lg" aria-label="Ish qidirish">
                  ${I.get('search', 18, '#ffffff')}
                  <span>Ish qidirish</span>
                </a>
                <a href="chat.html" class="btn btn-outline btn-lg" aria-label="AI yordamchi bilan chat">
                  ${I.get('messageSquare', 18, 'var(--primary)')}
                  <span>AI yordamchi bilan chat</span>
                </a>
              </div>

              <!-- Trust Points (Clean Vector Icons) -->
              <div style="display:flex; align-items:center; gap:1.5rem; flex-wrap:wrap; font-size:0.875rem; font-weight:600; color:var(--text-secondary);">
                <div style="display:flex; align-items:center; gap:0.45rem;">
                  ${I.get('checkCircle2', 16, 'var(--primary)')}
                  <span>100% Masofaviy ishlar</span>
                </div>
                <div style="display:flex; align-items:center; gap:0.45rem;">
                  ${I.get('checkCircle2', 16, 'var(--primary)')}
                  <span>Ekran o'quvchi (NVDA) mos</span>
                </div>
                <div style="display:flex; align-items:center; gap:0.45rem;">
                  ${I.get('checkCircle2', 16, 'var(--primary)')}
                  <span>Tasdiqlangan kompaniyalar</span>
                </div>
              </div>

            </div>

            <!-- Right Hero Showcase: Authentic Storyset Illustration -->
            <div class="hero-illustration-wrapper" style="display:flex; align-items:center; justify-content:center; position:relative;">
              <div style="width:100%; max-width:540px; margin:0 auto; display:flex; align-items:center; justify-content:center;">
                <img src="assets/images/hero-storyset.png" 
                     alt="Imkon Ish — nogironlar aravachasidagi mutaxassis noutbukda muvaffaqiyatli ishlamoqda" 
                     style="width:100%; height:auto; max-height:480px; object-fit:contain; display:block; filter:drop-shadow(0 15px 25px rgba(22, 160, 133, 0.12));" />
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- Large Search Box Section -->
      <section class="container search-section" aria-label="Vakansiyalarni qidirish paneli">
        <div class="search-box-card">
          
          <!-- Keyword -->
          <div class="search-input-group">
            ${I.get('search', 18, 'var(--primary)')}
            <input type="text" 
                   id="hero-job-keyword" 
                   class="search-input" 
                   placeholder="Ish nomi yoki kalit so‘z..." 
                   onkeydown="if(event.key==='Enter') window.LandingComponent.submitSearch();" />
          </div>

          <!-- Region / Location (Custom Searchable Dropdown) -->
          <div class="custom-select-container" id="hero-location-custom-dropdown">
            <input type="hidden" id="hero-job-location" value="${this.selectedLocation || ''}" />
            <div class="search-input-group" style="cursor:pointer;" onclick="window.LandingComponent.toggleLocationDropdown(event)">
              ${I.get('mapPin', 18, 'var(--primary)')}
              <div class="custom-select-trigger-content">
                <span class="custom-select-trigger-text" id="hero-location-selected-text">
                  ${this.getSelectedLocationLabel()}
                </span>
              </div>
              ${I.get('chevronDown', 14, 'var(--text-secondary)')}
            </div>

            <div class="custom-select-dropdown" id="hero-location-dropdown-menu" onclick="event.stopPropagation()">
              <div class="custom-select-search-box">
                ${I.get('search', 14, 'var(--text-muted)')}
                <input type="text" 
                       id="hero-location-search-input" 
                       placeholder="Hudud qidirish..." 
                       class="custom-select-search-input" 
                       oninput="window.LandingComponent.filterLocationList(this.value)" />
              </div>
              <div class="custom-select-list" id="hero-location-options-list">
                ${(window.APP_DATA.regions || []).map(loc => `
                  <button type="button" 
                          class="custom-select-option ${(!this.selectedLocation && loc.value === 'all') || this.selectedLocation === loc.value ? 'selected' : ''}" 
                          onclick="window.LandingComponent.selectLocation('${loc.value === 'all' ? '' : loc.value}', '${loc.label}')">
                    <span>${loc.label}</span>
                    ${((!this.selectedLocation && loc.value === 'all') || this.selectedLocation === loc.value) ? I.get('check', 14, 'var(--primary)') : ''}
                  </button>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Accommodation / Work Type (Custom Dropdown) -->
          <div class="custom-select-container" id="hero-type-custom-dropdown">
            <input type="hidden" id="hero-job-type" value="${this.selectedWorkType || ''}" />
            <div class="search-input-group" style="cursor:pointer;" onclick="window.LandingComponent.toggleWorkTypeDropdown(event)">
              ${I.get('briefcase', 18, 'var(--text-secondary)')}
              <div class="custom-select-trigger-content">
                <span class="custom-select-trigger-text" id="hero-type-selected-text">
                  ${this.getSelectedWorkTypeLabel()}
                </span>
              </div>
              ${I.get('chevronDown', 14, 'var(--text-secondary)')}
            </div>

            <div class="custom-select-dropdown" id="hero-type-dropdown-menu" onclick="event.stopPropagation()">
              <div class="custom-select-list">
                ${this.workTypes.map(typ => `
                  <button type="button" 
                          class="custom-select-option ${this.selectedWorkType === typ.value ? 'selected' : ''}" 
                          onclick="window.LandingComponent.selectWorkType('${typ.value}', '${typ.label}')">
                    <span>${typ.label}</span>
                    ${this.selectedWorkType === typ.value ? I.get('check', 14, 'var(--primary)') : ''}
                  </button>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <button type="button" class="btn btn-primary btn-lg" onclick="window.LandingComponent.submitSearch()">
            ${I.get('search', 18, '#ffffff')}
            <span>Qidirish</span>
          </button>

        </div>
      </section>

      <!-- Platform Advantages (4 Cards with Vector Icons) -->
      <section class="section-spacing container" aria-labelledby="advantages-title" style="padding-top:1rem;">
        <div style="text-align:center; max-width:680px; margin:0 auto 3rem;">
          <h2 id="advantages-title" style="font-size:2.1rem; margin-bottom:0.75rem;">Nima uchun Imkon Ish?</h2>
          <p style="color:var(--text-secondary); font-size:1.05rem;">
            Imkoniyati cheklangan mutaxassislarning salohiyatini ro'yobga chiqarish uchun yaratilgan inklyuziv ekotizim.
          </p>
        </div>

        <div class="grid-4">
          
          <!-- Card 1: Moslashtirilgan ishlar -->
          <div class="advantage-card">
            <div class="advantage-icon-box">
              ${I.get('accessibility', 24, 'currentColor')}
            </div>
            <h3 class="advantage-title">Moslashtirilgan ishlar</h3>
            <p class="advantage-desc">
              Nogironligi bo‘lgan insonlar uchun moslashtirilgan ishlar va sharoitlar.
            </p>
          </div>

          <!-- Card 2: Masofaviy ishlar -->
          <div class="advantage-card">
            <div class="advantage-icon-box">
              ${I.get('home', 24, 'currentColor')}
            </div>
            <h3 class="advantage-title">Masofaviy ishlar</h3>
            <p class="advantage-desc">
              Uyda ishlash imkoniyatiga ega 100% masofaviy vakansiyalar.
            </p>
          </div>

          <!-- Card 3: AI yordam -->
          <div class="advantage-card">
            <div class="advantage-icon-box">
              ${I.get('bot', 24, 'currentColor')}
            </div>
            <h3 class="advantage-title">AI yordam</h3>
            <p class="advantage-desc">
              AI sizga mos vakansiyalarni topishga va CVni tayyorlashga yordam beradi.
            </p>
          </div>

          <!-- Card 4: Ko‘p tilli -->
          <div class="advantage-card">
            <div class="advantage-icon-box">
              ${I.get('globe', 24, 'currentColor')}
            </div>
            <h3 class="advantage-title">Ko‘p tilli</h3>
            <p class="advantage-desc">
              Turli tillarda ish beruvchilar bilan muloqot qilish imkoniyati.
            </p>
          </div>

        </div>
      </section>

      <!-- Interactive Opportunity Simulator & UN Impact Section -->
      <section style="background:var(--bg-card); border-top:1px solid var(--border-color); border-bottom:1px solid var(--border-color); padding:4.5rem 0;" aria-label="Imkoniyat kalkulyatori">
        <div class="container">
          
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:3rem; align-items:center; margin-bottom:3.5rem;">
            
            <div>
              <span class="badge badge-green" style="margin-bottom:0.75rem;">Inklyuziv Ekotizim</span>
              <h2 style="font-size:2.2rem; margin-bottom:1rem;">O'zingizga mos imkoniyatni tanlang</h2>
              <p style="color:var(--text-secondary); font-size:1.05rem; line-height:1.7; margin-bottom:1.5rem;">
                Platformamiz orqali nomzodlar o'zlariga mos sharoitlarni belgilab ish topadilar, ish beruvchilar esa 1% ijtimoiy soliq imtiyozi va iqtidorli jamoaga ega bo'ladilar.
              </p>
              
              <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem; font-weight:700; font-size:0.95rem;">
                <div style="display:flex; align-items:center; gap:0.5rem; color:var(--primary);">
                  ${I.get('checkCircle2', 18, 'var(--primary)')}
                  <span>14 ta hudud qamrovi</span>
                </div>
                <div style="display:flex; align-items:center; gap:0.5rem; color:var(--secondary);">
                  ${I.get('checkCircle2', 18, 'var(--secondary)')}
                  <span>100% Masofaviy ishlar</span>
                </div>
                <div style="display:flex; align-items:center; gap:0.5rem; color:var(--primary);">
                  ${I.get('checkCircle2', 18, 'var(--primary)')}
                  <span>1% Soliq imtiyozi</span>
                </div>
                <div style="display:flex; align-items:center; gap:0.5rem; color:var(--accent);">
                  ${I.get('checkCircle2', 18, 'var(--accent)')}
                  <span>94% AI moslik aniqligi</span>
                </div>
              </div>
            </div>

            <!-- Dynamic Opportunity Simulator Box -->
            <div id="opportunity-simulator-container">
              ${this.renderSimulatorWidget()}
            </div>

          </div>

          <!-- 4 Impact Metric Cards -->
          <div class="grid-4">
            <div class="card" style="text-align:center;">
              <div style="font-size:2.4rem; font-weight:900; color:var(--primary); margin-bottom:0.25rem;">1,420+</div>
              <div style="font-size:0.95rem; font-weight:700; color:var(--text-main); margin-bottom:0.25rem;">Band bo'lgan nomzodlar</div>
              <div style="font-size:0.8rem; color:var(--text-secondary);">Rasmiy shartnoma asosida</div>
            </div>

            <div class="card" style="text-align:center;">
              <div style="font-size:2.4rem; font-weight:900; color:var(--secondary); margin-bottom:0.25rem;">86+</div>
              <div style="font-size:0.95rem; font-weight:700; color:var(--text-main); margin-bottom:0.25rem;">Hamkor kompaniyalar</div>
              <div style="font-size:0.8rem; color:var(--text-secondary);">Sertifikatlangan tashkilotlar</div>
            </div>

            <div class="card" style="text-align:center;">
              <div style="font-size:2.4rem; font-weight:900; color:var(--primary); margin-bottom:0.25rem;">48.5 mlrd</div>
              <div style="font-size:0.95rem; font-weight:700; color:var(--text-main); margin-bottom:0.25rem;">Yalpi qiymat (UZS)</div>
              <div style="font-size:0.8rem; color:var(--text-secondary);">Nomzodlar umumiy daromadi</div>
            </div>

            <div class="card" style="text-align:center;">
              <div style="font-size:2.4rem; font-weight:900; color:var(--accent); margin-bottom:0.25rem;">94%</div>
              <div style="font-size:0.95rem; font-weight:700; color:var(--text-main); margin-bottom:0.25rem;">AI moslik darajasi</div>
              <div style="font-size:0.8rem; color:var(--text-secondary);">Ehtiyoj va tajriba asosida</div>
            </div>
          </div>

        </div>
      </section>

      <!-- Verified Partners Section -->
      <section class="section-spacing container" aria-label="Hamkor tashkilotlar">
        <div style="text-align:center; font-size:0.85rem; font-weight:800; text-transform:uppercase; color:var(--text-secondary); margin-bottom:2rem; letter-spacing:0.06em;">
          O'zbekistonning Yetakchi Inklyuziv Hamkorlari
        </div>
        <div class="grid-4">
          ${data.partners.slice(0, 4).map(p => `
            <div class="card" style="padding:1.5rem; text-align:center; display:flex; flex-direction:column; align-items:center; gap:0.5rem;">
              <div style="width:48px; height:48px; border-radius:var(--radius-md); background:var(--primary-light); color:var(--primary); font-weight:900; font-size:1.15rem; display:flex; align-items:center; justify-content:center;">
                ${p.logoText || 'UA'}
              </div>
              <div style="font-weight:800; font-size:1.05rem; color:var(--text-main);">${p.name}</div>
              <span class="badge badge-green" style="font-size:0.75rem;">${p.badge}</span>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Call to Action Banner -->
      <section class="container" style="margin-bottom:4.5rem;">
        <div class="card" style="background:linear-gradient(135deg, var(--primary-light) 0%, var(--secondary-light) 100%); border:1.5px solid rgba(22, 160, 133, 0.25); padding:3.5rem 2rem; text-align:center; border-radius:var(--radius-xl);">
          <h2 style="font-size:2.4rem; margin-bottom:1rem; color:var(--text-main);">To'siqsiz karyerangizni bugun boshlang</h2>
          <p style="color:var(--text-secondary); font-size:1.15rem; max-width:620px; margin:0 auto 2rem;">
            O'zingizga moslashtirilgan profilni yarating va 100% qulay masofaviy vakansiyalarga ega bo'ling.
          </p>
          <div style="display:flex; justify-content:center; gap:1rem; flex-wrap:wrap;">
            <a href="onboarding.html" class="btn btn-primary btn-lg">
              ${I.get('userPlus', 18, '#ffffff')}
              <span>Bepul profil yaratish</span>
            </a>
            <a href="jobs.html" class="btn btn-outline btn-lg">
              ${I.get('briefcase', 18, 'currentColor')}
              <span>Vakansiyalarni ko'rish</span>
            </a>
          </div>
        </div>
      </section>
    `;
  },

  renderSimulatorWidget() {
    const I = window.Icons;
    const data = window.APP_DATA;
    const vacancies = data ? data.vacancies : [];

    if (this.simulatorMode === 'candidate') {
      const acc = this.simulatorCandidateAcc;
      const matched = vacancies.filter(v => v.accommodationTypes && v.accommodationTypes.includes(acc));
      const count = Math.max(matched.length, 1);

      let avgSalaryText = "8–12 mln so‘m";
      let perksText = "Ekran o'quvchi (NVDA/JAWS) mos dasturlar, bepul jihozlash";

      if (acc === 'screen_reader') {
        avgSalaryText = "10–18 mln so‘m";
        perksText = "Ekran o'quvchi mos dasturlar, bepul noutbuk va jihozlash";
      } else if (acc === 'hearing') {
        avgSalaryText = "6–10 mln so‘m";
        perksText = "100% matnli onlayn chat, ovozli qo'ng'iroqlarsiz, surdo ko'mak";
      } else if (acc === 'remote') {
        avgSalaryText = "8–15 mln so‘m";
        perksText = "To'liq uydan ishlash, ish joyini ergonomik jihozlash granti";
      } else if (acc === 'flexible_hours') {
        avgSalaryText = "7–12 mln so‘m";
        perksText = "Moslashuvchan grafik, erkin ish soatlari";
      }

      return `
        <div class="card" style="padding:1.75rem; border:1px solid var(--border-color); box-shadow:var(--shadow-md);">
          
          <!-- Mode Tabs -->
          <div style="display:flex; background:var(--bg-subtle); border-radius:var(--radius-md); padding:0.3rem; margin-bottom:1.25rem;">
            <button type="button" class="btn btn-sm ${this.simulatorMode === 'candidate' ? 'btn-primary' : 'btn-ghost'}" style="flex:1;" onclick="window.LandingComponent.setSimulatorMode('candidate')">
              ${I.get('user', 14)}
              <span>Nomzodlar uchun</span>
            </button>
            <button type="button" class="btn btn-sm ${this.simulatorMode === 'employer' ? 'btn-primary' : 'btn-ghost'}" style="flex:1;" onclick="window.LandingComponent.setSimulatorMode('employer')">
              ${I.get('building', 14)}
              <span>Ish beruvchilar uchun</span>
            </button>
          </div>

          <!-- Accommodations Buttons -->
          <div style="margin-bottom:1.25rem;">
            <div style="font-size:0.8rem; font-weight:700; color:var(--text-secondary); margin-bottom:0.6rem; text-transform:uppercase; letter-spacing:0.04em;">
              Qulaylik ehtiyojingizni tanlang:
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem;">
              <button type="button" class="btn btn-sm ${acc === 'screen_reader' ? 'btn-primary' : 'btn-outline'}" style="font-size:0.8rem; justify-content:flex-start; padding:0.5rem 0.65rem;" onclick="window.LandingComponent.setSimulatorCandidateAcc('screen_reader')">
                ${I.get('eye', 14)}
                <span>Ekran O'quvchi</span>
              </button>
              <button type="button" class="btn btn-sm ${acc === 'hearing' ? 'btn-primary' : 'btn-outline'}" style="font-size:0.8rem; justify-content:flex-start; padding:0.5rem 0.65rem;" onclick="window.LandingComponent.setSimulatorCandidateAcc('hearing')">
                ${I.get('volumeX', 14)}
                <span>Matnli Chat</span>
              </button>
              <button type="button" class="btn btn-sm ${acc === 'remote' ? 'btn-primary' : 'btn-outline'}" style="font-size:0.8rem; justify-content:flex-start; padding:0.5rem 0.65rem;" onclick="window.LandingComponent.setSimulatorCandidateAcc('remote')">
                ${I.get('home', 14)}
                <span>100% Masofaviy</span>
              </button>
              <button type="button" class="btn btn-sm ${acc === 'flexible_hours' ? 'btn-primary' : 'btn-outline'}" style="font-size:0.8rem; justify-content:flex-start; padding:0.5rem 0.65rem;" onclick="window.LandingComponent.setSimulatorCandidateAcc('flexible_hours')">
                ${I.get('clock', 14)}
                <span>Erkin Grafik</span>
              </button>
            </div>
          </div>

          <!-- Result Details -->
          <div style="background:var(--bg-subtle); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1rem; margin-bottom:1.25rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
              <span style="font-size:0.85rem; color:var(--text-secondary);">Mos vakansiyalar:</span>
              <span style="font-size:1.15rem; font-weight:900; color:var(--primary);">${count} ta ochiq ish o'rni</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
              <span style="font-size:0.85rem; color:var(--text-secondary);">O'rtacha maosh:</span>
              <span style="font-size:1rem; font-weight:800; color:var(--text-main);">${avgSalaryText}</span>
            </div>
            <div style="font-size:0.825rem; color:var(--text-secondary); line-height:1.4;">
              <span style="color:var(--primary); font-weight:700;">Kafolat:</span> ${perksText}
            </div>
          </div>

          <a href="jobs.html?accommodation=${acc}" class="btn btn-primary" style="width:100%; justify-content:center;">
            <span>Mos ${count} ta vakansiyani ko'rish</span>
            ${I.get('arrowRight', 16, '#ffffff')}
          </a>

        </div>
      `;
    } else {
      // Employer Mode
      const tier = this.simulatorEmployerTier;
      let taxSaving = "~35,000,000 UZS / yil";
      let grantAmount = "33,600,000 UZS gacha";

      if (tier === 'tier2') {
        taxSaving = "~110,000,000 UZS / yil";
        grantAmount = "112,000,000 UZS gacha";
      } else if (tier === 'tier3') {
        taxSaving = "~250,000,000+ UZS / yil";
        grantAmount = "To'liq grant moliyalashtiruvi";
      }

      return `
        <div class="card" style="padding:1.75rem; border:1px solid var(--border-color); box-shadow:var(--shadow-md);">
          
          <!-- Mode Tabs -->
          <div style="display:flex; background:var(--bg-subtle); border-radius:var(--radius-md); padding:0.3rem; margin-bottom:1.25rem;">
            <button type="button" class="btn btn-sm ${this.simulatorMode === 'candidate' ? 'btn-primary' : 'btn-ghost'}" style="flex:1;" onclick="window.LandingComponent.setSimulatorMode('candidate')">
              ${I.get('user', 14)}
              <span>Nomzodlar uchun</span>
            </button>
            <button type="button" class="btn btn-sm ${this.simulatorMode === 'employer' ? 'btn-primary' : 'btn-ghost'}" style="flex:1;" onclick="window.LandingComponent.setSimulatorMode('employer')">
              ${I.get('building', 14)}
              <span>Ish beruvchilar uchun</span>
            </button>
          </div>

          <!-- Tiers -->
          <div style="margin-bottom:1.25rem;">
            <div style="font-size:0.8rem; font-weight:700; color:var(--text-secondary); margin-bottom:0.6rem; text-transform:uppercase; letter-spacing:0.04em;">
              Ish o'rinlari soni:
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:0.5rem;">
              <button type="button" class="btn btn-sm ${tier === 'tier1' ? 'btn-primary' : 'btn-outline'}" onclick="window.LandingComponent.setSimulatorEmployerTier('tier1')">
                1–3 xodim
              </button>
              <button type="button" class="btn btn-sm ${tier === 'tier2' ? 'btn-primary' : 'btn-outline'}" onclick="window.LandingComponent.setSimulatorEmployerTier('tier2')">
                4–10 xodim
              </button>
              <button type="button" class="btn btn-sm ${tier === 'tier3' ? 'btn-primary' : 'btn-outline'}" onclick="window.LandingComponent.setSimulatorEmployerTier('tier3')">
                10+ xodim
              </button>
            </div>
          </div>

          <!-- Details -->
          <div style="background:var(--bg-subtle); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1rem; margin-bottom:1.25rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
              <span style="font-size:0.85rem; color:var(--text-secondary);">Ijtimoiy soliq (1% stavka):</span>
              <span style="font-size:1.05rem; font-weight:900; color:var(--primary);">${taxSaving}</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
              <span style="font-size:0.85rem; color:var(--text-secondary);">Davlat subsidiya granti:</span>
              <span style="font-size:0.95rem; font-weight:800; color:var(--text-main);">${grantAmount}</span>
            </div>
            <div style="font-size:0.825rem; color:var(--text-secondary);">
              <span style="color:var(--primary); font-weight:700;">Status:</span> A+ Milliy Inklyuziv Sertifikat
            </div>
          </div>

          <a href="employers.html" class="btn btn-primary" style="width:100%; justify-content:center;">
            ${I.get('shieldCheck', 16, '#ffffff')}
            <span>Kompaniya imtiyozlarini ulash</span>
          </a>

        </div>
      `;
    }
  },

  setSimulatorMode(mode) {
    this.simulatorMode = mode;
    this.updateSimulatorContainer();
  },

  setSimulatorCandidateAcc(acc) {
    this.simulatorCandidateAcc = acc;
    this.updateSimulatorContainer();
  },

  setSimulatorEmployerTier(tier) {
    this.simulatorEmployerTier = tier;
    this.updateSimulatorContainer();
  },

  updateSimulatorContainer() {
    const container = document.getElementById('opportunity-simulator-container');
    if (container) {
      container.innerHTML = this.renderSimulatorWidget();
    }
  },

  toggleLocationDropdown(e) {
    if (e) e.stopPropagation();
    const dropdown = document.getElementById('hero-location-dropdown-menu');
    if (!dropdown) return;
    this.isLocationDropdownOpen = !this.isLocationDropdownOpen;
    dropdown.classList.toggle('open', this.isLocationDropdownOpen);
    if (this.isLocationDropdownOpen) {
      setTimeout(() => {
        document.getElementById('hero-location-search-input')?.focus();
      }, 50);
    }
  },

  selectLocation(val, label) {
    this.selectedLocation = val;
    this.isLocationDropdownOpen = false;
    const labelEl = document.getElementById('hero-location-selected-text');
    if (labelEl) labelEl.textContent = label || 'Barcha hududlar';
    const inputEl = document.getElementById('hero-job-location');
    if (inputEl) inputEl.value = val;
    const dropdown = document.getElementById('hero-location-dropdown-menu');
    if (dropdown) dropdown.classList.remove('open');
    this.filterLocationList('');
  },

  filterLocationList(val) {
    const listEl = document.getElementById('hero-location-options-list');
    if (!listEl) return;
    const regions = (window.APP_DATA && window.APP_DATA.regions) ? window.APP_DATA.regions : [];
    const q = (val || '').toLowerCase().trim();
    const filtered = regions.filter(r => r.label.toLowerCase().includes(q));
    const I = window.Icons;
    listEl.innerHTML = filtered.length === 0 
      ? `<div style="padding:0.75rem; text-align:center; color:var(--text-muted); font-size:0.85rem;">Hudud topilmadi</div>`
      : filtered.map(loc => `
          <button type="button" 
                  class="custom-select-option ${(!this.selectedLocation && loc.value === 'all') || this.selectedLocation === loc.value ? 'selected' : ''}" 
                  onclick="window.LandingComponent.selectLocation('${loc.value === 'all' ? '' : loc.value}', '${loc.label}')">
            <span>${loc.label}</span>
            ${((!this.selectedLocation && loc.value === 'all') || this.selectedLocation === loc.value) ? I.get('check', 14, 'var(--primary)') : ''}
          </button>
        `).join('');
  },

  toggleWorkTypeDropdown(e) {
    if (e) e.stopPropagation();
    const dropdown = document.getElementById('hero-type-dropdown-menu');
    if (!dropdown) return;
    this.isWorkTypeDropdownOpen = !this.isWorkTypeDropdownOpen;
    dropdown.classList.toggle('open', this.isWorkTypeDropdownOpen);
  },

  selectWorkType(val, label) {
    this.selectedWorkType = val;
    this.isWorkTypeDropdownOpen = false;
    const labelEl = document.getElementById('hero-type-selected-text');
    if (labelEl) labelEl.textContent = label || 'Barcha ish turlari';
    const inputEl = document.getElementById('hero-job-type');
    if (inputEl) inputEl.value = val;
    const dropdown = document.getElementById('hero-type-dropdown-menu');
    if (dropdown) dropdown.classList.remove('open');
  },

  submitSearch() {
    const kw = document.getElementById('hero-job-keyword')?.value || '';
    const loc = document.getElementById('hero-job-location')?.value || '';
    const typ = document.getElementById('hero-job-type')?.value || '';

    const params = new URLSearchParams();
    if (kw) params.set('q', kw);
    if (loc) params.set('location', loc);
    if (typ) params.set('accommodation', typ);

    window.location.href = `jobs.html?${params.toString()}`;
  }
};
