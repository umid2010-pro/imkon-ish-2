/**
 * "Imkon Ish" — Senior Inclusive Jobs Portal Component
 * Modern Job-Board Architecture with Category Sidebar, Faceted Filters, and Horizontal Job Cards
 */

window.JobsComponent = {
  searchQuery: '',
  selectedCategory: 'all',
  selectedAccommodation: 'all',
  selectedLocation: 'all',
  sortBy: 'match', // match | salary | newest
  isLocationDropdownOpen: false,
  locationFilterSearch: '',
  isSortDropdownOpen: false,

  getSelectedLocationLabel() {
    const found = this.locations.find(l => l.value === this.selectedLocation);
    return found ? found.label : 'Barcha hududlar';
  },

  getSelectedSortLabel() {
    const found = this.sortOptions.find(s => s.value === this.sortBy);
    return found ? found.label : 'Eng yuqori AI moslik';
  },

  getFilteredLocations() {
    if (!this.locationFilterSearch.trim()) return this.locations;
    const q = this.locationFilterSearch.toLowerCase().trim();
    return this.locations.filter(l => l.label.toLowerCase().includes(q));
  },

  locations: [
    { value: 'all', label: 'Barcha hududlar' },
    { value: 'Toshkent shahri', label: 'Toshkent shahri' },
    { value: 'Toshkent viloyati', label: 'Toshkent viloyati' },
    { value: 'Samarqand', label: 'Samarqand' },
    { value: 'Farg\'ona', label: 'Farg\'ona' },
    { value: 'Andijon', label: 'Andijon' },
    { value: 'Namangan', label: 'Namangan' },
    { value: 'Buxoro', label: 'Buxoro' },
    { value: 'Qashqadaryo', label: 'Qashqadaryo' },
    { value: 'Surxondaryo', label: 'Surxondaryo' },
    { value: 'Xorazm', label: 'Xorazm' },
    { value: 'Navoiy', label: 'Navoiy' },
    { value: 'Jizzax', label: 'Jizzax' },
    { value: 'Sirdaryo', label: 'Sirdaryo' },
    { value: 'Qoraqalpog\'iston', label: 'Qoraqalpog\'iston Respublikasi' },
    { value: 'Masofaviy', label: '100% Masofaviy' }
  ],

  categories: [
    { value: 'all', label: 'Barcha ishlar', count: 7 },
    { value: 'engineering', label: 'Dasturlash', count: 3 },
    { value: 'design', label: 'Dizayn & UI/UX', count: 1 },
    { value: 'marketing', label: 'Marketing & Kontent', count: 1 },
    { value: 'data', label: 'Ma’lumot kiritish', count: 1 },
    { value: 'support', label: 'Mijozlarga xizmat', count: 1 },
    { value: 'translation', label: 'Tarjima', count: 1 },
    { value: 'other', label: 'Boshqa', count: 0 }
  ],

  accommodations: [
    { value: 'all', label: 'Barcha qulayliklar' },
    { value: 'remote', label: '100% Masofaviy ish' },
    { value: 'screen_reader', label: 'Ekran o‘quvchi mos' },
    { value: 'hearing', label: 'Faqat matnli chat' },
    { value: 'flexible_hours', label: 'Moslashuvchan grafik' }
  ],

  sortOptions: [
    { value: 'match', label: 'Eng yuqori AI moslik' },
    { value: 'salary', label: 'Maosh (Kattadan-kichikka)' },
    { value: 'newest', label: 'Eng yangi vakansiyalar' }
  ],

  init() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('q')) {
      this.searchQuery = urlParams.get('q');
    }
    if (urlParams.has('category')) {
      this.selectedCategory = urlParams.get('category');
    }
    if (urlParams.has('accommodation')) {
      this.selectedAccommodation = urlParams.get('accommodation');
    }
    if (urlParams.has('location')) {
      this.selectedLocation = urlParams.get('location');
    }
  },

  render() {
    const data = window.APP_DATA;
    const I = window.Icons;
    const storeState = window.Store ? window.Store.getState() : {};
    const savedJobs = storeState.savedJobs || [];
    const applications = storeState.applications || [];

    const filteredJobs = this.getFilteredVacancies(data.vacancies);

    return `
      <section class="section-spacing container" aria-labelledby="jobs-page-title" style="padding-top:2rem;">
        
        <!-- Header -->
        <div style="margin-bottom:2.25rem;">
          <div style="display:inline-flex; align-items:center; gap:0.5rem; margin-bottom:0.5rem;">
            <span class="badge badge-green">
              ${I.get('shieldCheck', 14, 'var(--primary)')}
              <span>Tasdiqlangan Inklyuziv Vakansiyalar</span>
            </span>
          </div>
          <h1 id="jobs-page-title" style="font-size:2.4rem; margin:0 0 0.5rem 0;">Vakansiyalar Katalogi</h1>
          <p style="font-size:1.05rem; color:var(--text-secondary); margin:0;">
            Imkoniyati cheklangan mutaxassislar uchun maxsus moslashtirilgan bo'sh ish o'rinlari.
          </p>
        </div>

        <!-- Modern Job-Board Layout: Sidebar + Main List -->
        <div class="jobs-layout">
          
          <!-- Left Sidebar: Kategoriyalar & Qulayliklar -->
          <aside class="jobs-sidebar" aria-label="Kategoriyalar va Filtrlar">
            
            <!-- Categories List -->
            <div style="margin-bottom:1.75rem;">
              <h3 style="font-size:1.05rem; font-weight:800; margin-bottom:0.85rem; color:var(--text-main);">Kategoriyalar</h3>
              <div style="display:flex; flex-direction:column; gap:0.25rem;">
                ${this.categories.map(cat => `
                  <button type="button" 
                          class="sidebar-category-btn ${this.selectedCategory === cat.value ? 'active' : ''}" 
                          onclick="window.JobsComponent.setCategory('${cat.value}')">
                    <span>${cat.label}</span>
                    <span style="font-size:0.75rem; color:var(--text-muted); font-weight:700;">${this.getCategoryCount(cat.value, data.vacancies)}</span>
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Accommodation Filter List -->
            <div>
              <h3 style="font-size:1.05rem; font-weight:800; margin-bottom:0.85rem; color:var(--text-main);">Qulayliklar</h3>
              <div style="display:flex; flex-direction:column; gap:0.25rem;">
                ${this.accommodations.map(acc => `
                  <button type="button" 
                          class="sidebar-category-btn ${this.selectedAccommodation === acc.value ? 'active' : ''}" 
                          onclick="window.JobsComponent.setAccommodation('${acc.value}')">
                    <span>${acc.label}</span>
                    ${this.selectedAccommodation === acc.value ? I.get('check', 14, 'var(--primary)') : ''}
                  </button>
                `).join('')}
              </div>
            </div>

          </aside>

          <!-- Right / Main Area: Search, Sort & Horizontal Job Cards -->
          <main>
            
            <!-- Top Control Bar (Search + Sort) -->
            <div class="card" style="padding:1.25rem; margin-bottom:1.75rem;">
              <div style="display:grid; grid-template-columns: 1.5fr 1fr 1fr; gap:0.85rem; align-items:center;">
                
                <!-- Keyword Search -->
                <div class="search-input-group" style="background:var(--bg-subtle);">
                  ${I.get('search', 16, 'var(--primary)')}
                  <input type="text" 
                         id="job-filter-search" 
                         value="${this.searchQuery}" 
                         placeholder="Lavozim yoki kompaniya..." 
                         class="search-input" 
                         oninput="window.JobsComponent.setSearch(this.value)" />
                </div>

                <!-- Location Selector (Modern Searchable Custom Dropdown) -->
                <div class="custom-select-container" id="job-location-custom-dropdown">
                  <div class="search-input-group" style="cursor:pointer; background:var(--bg-subtle);" onclick="window.JobsComponent.toggleLocationDropdown(event)">
                    ${I.get('mapPin', 16, 'var(--primary)')}
                    <div class="custom-select-trigger-content">
                      <span class="custom-select-trigger-text">
                        ${this.getSelectedLocationLabel()}
                      </span>
                    </div>
                    ${I.get('chevronDown', 14, 'var(--text-secondary)')}
                  </div>

                  <div class="custom-select-dropdown ${this.isLocationDropdownOpen ? 'open' : ''}" onclick="event.stopPropagation()">
                    <div class="custom-select-search-box">
                      ${I.get('search', 14, 'var(--text-muted)')}
                      <input type="text" 
                             id="job-location-search-input" 
                             placeholder="Hudud qidirish..." 
                             value="${this.locationFilterSearch}" 
                             class="custom-select-search-input" 
                             oninput="window.JobsComponent.filterLocationList(this.value)" />
                    </div>
                    <div class="custom-select-list" id="job-location-options-list">
                      ${this.getFilteredLocations().map(loc => `
                        <button type="button" 
                                class="custom-select-option ${this.selectedLocation === loc.value ? 'selected' : ''}" 
                                onclick="window.JobsComponent.selectLocation('${loc.value}')">
                          <span>${loc.label}</span>
                          ${this.selectedLocation === loc.value ? I.get('check', 14, 'var(--primary)') : ''}
                        </button>
                      `).join('')}
                    </div>
                  </div>
                </div>

                <!-- Sort Selector (Custom Dropdown) -->
                <div class="custom-select-container" id="job-sort-custom-dropdown">
                  <div class="search-input-group" style="cursor:pointer; background:var(--bg-subtle);" onclick="window.JobsComponent.toggleSortDropdown(event)">
                    ${I.get('sliders', 16, 'var(--text-secondary)')}
                    <div class="custom-select-trigger-content">
                      <span class="custom-select-trigger-text">
                        ${this.getSelectedSortLabel()}
                      </span>
                    </div>
                    ${I.get('chevronDown', 14, 'var(--text-secondary)')}
                  </div>

                  <div class="custom-select-dropdown ${this.isSortDropdownOpen ? 'open' : ''}" onclick="event.stopPropagation()">
                    <div class="custom-select-list">
                      ${this.sortOptions.map(s => `
                        <button type="button" 
                                class="custom-select-option ${this.sortBy === s.value ? 'selected' : ''}" 
                                onclick="window.JobsComponent.selectSort('${s.value}')">
                          <span>${s.label}</span>
                          ${this.sortBy === s.value ? I.get('check', 14, 'var(--primary)') : ''}
                        </button>
                      `).join('')}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <!-- Results Meta Row -->
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem; font-size:0.925rem; font-weight:700; color:var(--text-secondary);">
              <div>
                Topildi: <span style="color:var(--text-main); font-weight:900;">${filteredJobs.length} ta vakansiya</span>
              </div>
              ${(this.searchQuery || this.selectedCategory !== 'all' || this.selectedAccommodation !== 'all' || this.selectedLocation !== 'all') ? `
                <button type="button" class="btn btn-ghost btn-sm" onclick="window.JobsComponent.resetFilters()">
                  ${I.get('rotateCcw', 13)}
                  <span>Filtrlarni tozalash</span>
                </button>
              ` : ''}
            </div>

            <!-- Job Cards List -->
            <div>
              ${filteredJobs.length === 0 ? `
                <div class="card" style="text-align:center; padding:3.5rem 2rem;">
                  <div style="width:60px; height:60px; border-radius:50%; background:var(--primary-light); color:var(--primary); display:flex; align-items:center; justify-content:center; margin:0 auto 1.25rem;">
                    ${I.get('search', 26)}
                  </div>
                  <h3 style="font-size:1.35rem; margin-bottom:0.5rem;">Mos vakansiyalar topilmadi</h3>
                  <p style="color:var(--text-secondary); max-width:440px; margin:0 auto 1.5rem; font-size:0.95rem;">
                    Qidiruv so'zini o'zgartirib ko'ring yoki boshqa yo'nalish va moslashuv qulayliklarini tanlang.
                  </p>
                  <button type="button" class="btn btn-primary" onclick="window.JobsComponent.resetFilters()">
                    ${I.get('rotateCcw', 15, '#ffffff')}
                    <span>Barcha filtrlarni qayta o'rnatish</span>
                  </button>
                </div>
              ` : filteredJobs.map(job => {
                const isSaved = savedJobs.includes(job.id);
                const isApplied = applications.some(a => a.jobId === job.id);
                const matchScore = job.aiMatch || 94;
                const matchReasons = job.matchReasons || ['JavaScript', 'Remote', 'Tajribangizga mos'];

                return `
                  <article class="job-card" aria-labelledby="job-title-${job.id}">
                    
                    <!-- Job Card Header -->
                    <div class="job-card-header">
                      
                      <!-- Company Logo & Titles -->
                      <div class="job-company-box">
                        <div class="job-company-logo">
                          ${(job.company || 'UA').substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h2 id="job-title-${job.id}" class="job-title">${job.title}</h2>
                          <div class="job-company-name">
                            <span>${job.company}</span>
                            ${I.get('shieldCheck', 14, 'var(--primary)')}
                          </div>
                        </div>
                      </div>

                      <!-- AI Match Score Green Badge -->
                      <div class="ai-match-badge" title="AI ko'nikmalar tahlili">
                        <div class="ai-match-score">${matchScore}% moslik</div>
                        <div class="ai-match-label">AI Match</div>
                      </div>

                    </div>

                    <!-- Meta Tags: Location, Remote, Employment, Salary -->
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

                    <!-- AI Match Reasons / Checkmarks -->
                    <div class="ai-reasons-list">
                      ${matchReasons.map(r => `
                        <div style="display:flex; align-items:center; gap:0.35rem;">
                          ${I.get('check', 13, 'var(--primary)')}
                          <span>${r}</span>
                        </div>
                      `).join('')}
                    </div>

                    <!-- Description & Skills -->
                    <p style="font-size:0.925rem; color:var(--text-secondary); line-height:1.55; margin:0;">
                      ${job.description}
                    </p>

                    <!-- Skill Tags Row & Card Actions -->
                    <div class="job-card-footer">
                      <div class="job-tags-row">
                        ${(job.skills || ['JavaScript', 'React', 'Remote']).map(s => `
                          <span class="job-tag">${s}</span>
                        `).join('')}
                      </div>

                      <div style="display:flex; align-items:center; gap:0.65rem;">
                        <button type="button" 
                                class="btn btn-ghost btn-icon" 
                                style="color:${isSaved ? 'var(--accent)' : 'var(--text-secondary)'};" 
                                onclick="window.JobsComponent.toggleSave(${job.id})" 
                                title="${isSaved ? 'Saqlanganlardan olib tashlash' : 'Saqlash'}" 
                                aria-label="Saqlash">
                          ${I.get('bookmark', 18, isSaved ? 'var(--accent)' : 'currentColor')}
                        </button>
                        
                        <button type="button" class="btn btn-outline btn-sm" onclick="window.JobsComponent.openJobDetails(${job.id})">
                          <span>Batafsil</span>
                        </button>

                        ${isApplied ? `
                          <span class="badge badge-green" style="padding:0.45rem 0.85rem;">
                            ${I.get('check', 13)}
                            <span>Topshirilgan</span>
                          </span>
                        ` : `
                          <button type="button" class="btn btn-primary btn-sm" onclick="window.JobsComponent.openApplyModal(${job.id})">
                            ${I.get('sparkles', 14, '#ffffff')}
                            <span>AI Tezkor Ariza</span>
                          </button>
                        `}
                      </div>
                    </div>

                  </article>
                `;
              }).join('')}
            </div>

          </main>

        </div>

      </section>
    `;
  },

  getCategoryCount(catVal, vacancies) {
    if (catVal === 'all') return vacancies.length;
    if (catVal === 'translation') return vacancies.filter(v => v.department === 'marketing').length;
    return vacancies.filter(v => v.department === catVal).length;
  },

  getFilteredVacancies(vacancies) {
    let result = [...vacancies];

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(v => 
        v.title.toLowerCase().includes(q) || 
        v.company.toLowerCase().includes(q) || 
        (v.description || '').toLowerCase().includes(q)
      );
    }

    if (this.selectedCategory !== 'all') {
      if (this.selectedCategory === 'translation') {
        result = result.filter(v => v.department === 'marketing');
      } else {
        result = result.filter(v => v.department === this.selectedCategory);
      }
    }

    if (this.selectedAccommodation !== 'all') {
      result = result.filter(v => v.accommodationTypes && v.accommodationTypes.includes(this.selectedAccommodation));
    }

    if (this.selectedLocation && this.selectedLocation !== 'all' && this.selectedLocation !== '') {
      const targetLoc = this.selectedLocation.toLowerCase().trim();
      result = result.filter(v => {
        const vLoc = (v.location || '').toLowerCase();
        if (targetLoc.includes('masofaviy') || targetLoc === 'remote') {
          return vLoc.includes('masofaviy') || v.workType === 'remote' || vLoc.includes('onlayn');
        }
        const cleanTarget = targetLoc
          .replace(' shahri', '')
          .replace(' viloyati', '')
          .replace(' respublikasi', '')
          .replace("'", "")
          .replace("‘", "")
          .replace("’", "");
        const cleanVLoc = vLoc.replace("'", "").replace("‘", "").replace("’", "");
        return cleanVLoc.includes(cleanTarget) || 
               cleanTarget.includes(cleanVLoc) || 
               cleanVLoc.includes('barcha') || 
               cleanVLoc.includes('masofaviy') || 
               v.workType === 'remote';
      });
    }

    if (this.sortBy === 'match') {
      result.sort((a, b) => (b.aiMatch || 90) - (a.aiMatch || 90));
    } else if (this.sortBy === 'salary') {
      result.sort((a, b) => (b.salaryNumeric || 0) - (a.salaryNumeric || 0));
    } else if (this.sortBy === 'newest') {
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  },

  setSearch(val) {
    this.searchQuery = val;
    this.refreshView();
  },

  setCategory(cat) {
    this.selectedCategory = cat;
    this.refreshView();
  },

  setAccommodation(acc) {
    this.selectedAccommodation = acc;
    this.refreshView();
  },

  setLocation(loc) {
    this.selectedLocation = loc;
    this.refreshView();
  },

  toggleLocationDropdown(e) {
    if (e) e.stopPropagation();
    this.isLocationDropdownOpen = !this.isLocationDropdownOpen;
    this.refreshView();
    if (this.isLocationDropdownOpen) {
      setTimeout(() => {
        document.getElementById('job-location-search-input')?.focus();
      }, 50);
    }
  },

  closeLocationDropdown() {
    if (this.isLocationDropdownOpen) {
      this.isLocationDropdownOpen = false;
      this.locationFilterSearch = '';
      this.refreshView();
    }
  },

  selectLocation(locVal) {
    this.selectedLocation = locVal;
    this.isLocationDropdownOpen = false;
    this.locationFilterSearch = '';
    this.refreshView();
  },

  filterLocationList(val) {
    this.locationFilterSearch = val;
    const listEl = document.getElementById('job-location-options-list');
    if (!listEl) return;
    const I = window.Icons;
    const q = (val || '').toLowerCase().trim();
    const filtered = this.locations.filter(l => l.label.toLowerCase().includes(q));
    listEl.innerHTML = filtered.length === 0 
      ? `<div style="padding:0.75rem; text-align:center; color:var(--text-muted); font-size:0.85rem;">Hudud topilmadi</div>`
      : filtered.map(loc => `
          <button type="button" 
                  class="custom-select-option ${this.selectedLocation === loc.value ? 'selected' : ''}" 
                  onclick="window.JobsComponent.selectLocation('${loc.value}')">
            <span>${loc.label}</span>
            ${this.selectedLocation === loc.value ? I.get('check', 14, 'var(--primary)') : ''}
          </button>
        `).join('');
  },

  setSort(sort) {
    this.sortBy = sort;
    this.refreshView();
  },

  toggleSortDropdown(e) {
    if (e) e.stopPropagation();
    this.isSortDropdownOpen = !this.isSortDropdownOpen;
    this.isLocationDropdownOpen = false;
    this.refreshView();
  },

  closeSortDropdown() {
    if (this.isSortDropdownOpen) {
      this.isSortDropdownOpen = false;
      this.refreshView();
    }
  },

  selectSort(sortVal) {
    this.sortBy = sortVal;
    this.isSortDropdownOpen = false;
    this.refreshView();
  },

  resetFilters() {
    this.searchQuery = '';
    this.selectedCategory = 'all';
    this.selectedAccommodation = 'all';
    this.selectedLocation = 'all';
    this.sortBy = 'match';
    this.refreshView();
  },

  toggleSave(jobId) {
    if (window.Store) {
      window.Store.dispatch('TOGGLE_SAVE_JOB', jobId);
      const isSaved = (window.Store.getState().savedJobs || []).includes(jobId);
      if (window.App) {
        window.App.showToast(isSaved ? "Vakansiya saqlandi!" : "Saqlanganlardan olindi", 'info');
      }
      this.refreshView();
    }
  },

  openJobDetails(jobId) {
    const data = window.APP_DATA;
    const job = data.vacancies.find(v => v.id === jobId);
    if (!job) return;

    const I = window.Icons;
    const content = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1.5rem;">
        <div>
          <span class="badge badge-green" style="margin-bottom:0.4rem;">${job.company}</span>
          <h2 style="font-size:1.6rem; margin:0 0 0.25rem 0;">${job.title}</h2>
          <div style="font-size:0.875rem; color:var(--text-secondary);">${job.location} • ${job.employmentType}</div>
        </div>
        <button type="button" class="btn btn-ghost btn-sm" onclick="window.App.closeAllModals()" aria-label="Yopish">✕</button>
      </div>

      <div style="background:var(--bg-subtle); padding:1rem; border-radius:var(--radius-md); margin-bottom:1.25rem; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <div style="font-size:0.8rem; color:var(--text-secondary);">Oylik maosh:</div>
          <div style="font-size:1.2rem; font-weight:900; color:var(--primary);">${job.salary}</div>
        </div>
        <span class="badge badge-green">AI Moslik: ${job.aiMatch}%</span>
      </div>

      <div style="margin-bottom:1.25rem;">
        <h4 style="font-size:1rem; margin-bottom:0.5rem;">Qulayliklar va Sharoitlar:</h4>
        <ul style="display:flex; flex-direction:column; gap:0.4rem; font-size:0.9rem; color:var(--text-secondary);">
          ${(job.accommodations || []).map(a => `<li style="display:flex; align-items:center; gap:0.45rem;">${I.get('check', 14, 'var(--primary)')} <span>${a}</span></li>`).join('')}
        </ul>
      </div>

      <div style="margin-bottom:1.5rem;">
        <h4 style="font-size:1rem; margin-bottom:0.5rem;">Talablar:</h4>
        <ul style="display:flex; flex-direction:column; gap:0.4rem; font-size:0.9rem; color:var(--text-secondary);">
          ${(job.requirements || []).map(r => `<li>• ${r}</li>`).join('')}
        </ul>
      </div>

      <div style="display:flex; justify-content:flex-end; gap:0.75rem;">
        <button type="button" class="btn btn-outline" onclick="window.App.closeAllModals()">Yopish</button>
        <button type="button" class="btn btn-primary" onclick="window.App.closeAllModals(); window.JobsComponent.openApplyModal(${job.id});">
          ${I.get('sparkles', 16, '#ffffff')}
          <span>Ariza topshirish</span>
        </button>
      </div>
    `;

    if (window.App && window.App.openModal) {
      window.App.openModal(content);
    }
  },

  openApplyModal(jobId) {
    const data = window.APP_DATA;
    const job = data.vacancies.find(v => v.id === jobId);
    if (!job) return;

    const I = window.Icons;
    const storeState = window.Store ? window.Store.getState() : {};
    const candidate = storeState.currentUser || { fullName: 'Umid Nomzod', email: 'umid@example.com' };

    const content = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
        <div>
          <span class="badge badge-green" style="margin-bottom:0.35rem;">Tezkor Ariza</span>
          <h3 style="margin:0; font-size:1.4rem;">${job.title} — ${job.company}</h3>
        </div>
        <button type="button" class="btn btn-ghost btn-sm" onclick="window.App.closeAllModals()" aria-label="Yopish">✕</button>
      </div>

      <p style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:1.25rem;">
        AI sizning profilingiz va ko'nikmalaringiz asosida ish beruvchiga qulay xat tayyorlaydi.
      </p>

      <form onsubmit="event.preventDefault(); window.JobsComponent.submitApplication(${job.id});" style="display:flex; flex-direction:column; gap:1rem;">
        <div>
          <label style="display:block; font-size:0.85rem; font-weight:700; color:var(--text-main); margin-bottom:0.35rem;">Nomzod:</label>
          <input type="text" readonly value="${candidate.fullName}" style="width:100%; padding:0.65rem 0.85rem; background:var(--bg-subtle); border:1px solid var(--border-color); border-radius:var(--radius-md); color:var(--text-main);" />
        </div>

        <div>
          <label style="display:block; font-size:0.85rem; font-weight:700; color:var(--text-main); margin-bottom:0.35rem;">AI Hamrohlik Xati (Cover Letter):</label>
          <textarea id="apply-cover-letter" rows="4" style="width:100%; padding:0.65rem 0.85rem; background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-md); color:var(--text-main); font-family:inherit; font-size:0.9rem;">Hurmatli ${job.company} jamoasi! Men ${job.title} vakansiyangizga katta qiziqish bilan ariza topshirmoqdaman. Mening ko'nikmalarim va qulaylik ehtiyojlarim ushbu lavozimga 100% mos keladi.</textarea>
        </div>

        <button type="submit" class="btn btn-primary" style="width:100%;">
          ${I.get('send', 16, '#ffffff')}
          <span>Arizani Yuborish</span>
        </button>
      </form>
    `;

    if (window.App && window.App.openModal) {
      window.App.openModal(content);
    }
  },

  submitApplication(jobId) {
    if (window.Store) {
      window.Store.dispatch('APPLY_FOR_JOB', {
        jobId: jobId,
        appliedAt: new Date().toISOString()
      });
      if (window.App) {
        window.App.closeAllModals();
        window.App.showToast("Arizangiz muvaffaqiyatli topshirildi!", 'success');
      }
      this.refreshView();
    }
  },

  refreshView() {
    const mount = document.getElementById('jobs-mount');
    if (mount) {
      mount.innerHTML = this.render();
    }
  }
};
