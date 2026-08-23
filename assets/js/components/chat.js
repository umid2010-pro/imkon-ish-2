/**
 * "Imkon Ish" — Senior Real-Time Multilingual AI Messenger Component
 * Clean Human-Centered AI Career Assistant with conversation list, quick assistance chips, translation & voice playback
 */

window.ChatComponent = {
  selectedTargetLang: 'uz',
  isTranslating: false,
  isLangDropdownOpen: false,

  getSelectedLangLabel() {
    const found = this.languages.find(l => l.value === this.selectedTargetLang);
    return found ? `${found.label} (${found.code})` : 'O‘zbekcha (UZ)';
  },

  languages: [
    { value: 'uz', label: 'O‘zbekcha', code: 'UZ' },
    { value: 'ru', label: 'Русский', code: 'RU' },
    { value: 'en', label: 'English', code: 'EN' },
    { value: 'de', label: 'Deutsch', code: 'DE' },
    { value: 'tr', label: 'Türkçe', code: 'TR' }
  ],

  quickPrompts: [
    { label: 'Mos ish topish', text: 'Mening profilimga mos eng yaxshi masofaviy vakansiyalarni tavsiya qiling.' },
    { label: 'CV haqida maslahat', text: 'Mening rezyumemni qanday qilib yanada kuchliroq va inklyuziv qilish mumkin?' },
    { label: 'Vakansiyani tushuntirish', text: 'Uzum Technologies kompaniyasining Frontend Developer vakansiyasi talablarini tushuntirib bering.' },
    { label: 'Ish beruvchiga xabar yozish', text: 'Ish beruvchiga birinchi marta xat yozish uchun rasmiy va xushmuomala namuna tayyorlab bering.' },
    { label: 'Tarjima', text: 'Ushbu xabarni ingliz tiliga professional tarjima qiling.' }
  ],

  messages: [
    {
      id: 1,
      sender: 'ai',
      senderName: 'Imkon AI Yordamchi',
      avatar: 'AI',
      text: 'Assalomu alaykum! Men Imkon Ish platformasining AI yordamchisiman. Sizga qanday yordam bera olaman? Masalan, mos ish topish, CV tayyorlash yoki ish beruvchiga xat yozishda ko‘maklashishim mumkin.',
      time: '10:00'
    }
  ],

  init() {
    this.scrollToBottom();
  },

  render() {
    const I = window.Icons;
    const curLang = this.languages.find(l => l.value === this.selectedTargetLang) || this.languages[0];

    return `
      <section class="section-spacing container" aria-labelledby="chat-title" style="padding-top:2rem; padding-bottom:3rem;">
        
        <!-- Header -->
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:1.5rem;">
          <div>
            <div style="display:inline-flex; align-items:center; gap:0.5rem; margin-bottom:0.35rem;">
              <span class="badge badge-green">
                ${I.get('bot', 14, 'var(--primary)')}
                <span>AI Karyera Yordamchisi</span>
              </span>
            </div>
            <h1 id="chat-title" style="font-size:2.2rem; margin:0 0 0.25rem 0;">AI Yordamchi & Muloqot</h1>
            <p style="font-size:1rem; color:var(--text-secondary); margin:0;">
              Mos vakansiyalarni tanlash, rezyumeni yaxshilash va ish beruvchilar bilan muloqot qilishda AI ko'magi.
            </p>
          </div>

          <!-- Language Selector (Custom Dropdown) -->
          <div style="display:flex; align-items:center; gap:0.5rem; position:relative;">
            <span style="font-size:0.85rem; font-weight:700; color:var(--text-secondary); white-space:nowrap;">Til:</span>
            <div class="custom-select-container" style="min-width:170px;">
              <button type="button" class="custom-dropdown-btn" onclick="window.ChatComponent.toggleLangDropdown(event)" style="padding:0.45rem 0.85rem; background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-md); font-weight:600; font-size:0.875rem;">
                <span>${this.getSelectedLangLabel()}</span>
                ${I.get('chevronDown', 13, 'var(--text-secondary)')}
              </button>
              <div class="custom-select-dropdown ${this.isLangDropdownOpen ? 'open' : ''}" style="min-width:170px; top:calc(100% + 0.35rem);" onclick="event.stopPropagation()">
                <div class="custom-select-list">
                  ${this.languages.map(l => `
                    <button type="button" 
                            class="custom-select-option ${this.selectedTargetLang === l.value ? 'selected' : ''}" 
                            onclick="window.ChatComponent.selectLang('${l.value}')">
                      <span>${l.label} (${l.code})</span>
                      ${this.selectedTargetLang === l.value ? I.get('check', 13, 'var(--primary)') : ''}
                    </button>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Chat Main Grid (Left: Conversations, Right: AI Chat) -->
        <div class="chat-wrapper">
          
          <!-- Left: Conversation Channels -->
          <aside class="chat-sidebar" aria-label="Suhbatlar ro'yxati">
            <div style="padding:1.25rem; border-bottom:1px solid var(--border-color); font-weight:800; color:var(--text-main); display:flex; align-items:center; gap:0.5rem;">
              ${I.get('messageSquare', 18, 'var(--primary)')}
              <span>Suhbatlar</span>
            </div>

            <div style="display:flex; flex-direction:column; padding:0.5rem;">
              
              <!-- AI Bot Channel (Active) -->
              <div style="display:flex; align-items:center; gap:0.75rem; padding:0.85rem; background:var(--primary-light); border-radius:var(--radius-md); cursor:pointer; margin-bottom:0.35rem;">
                <div style="width:40px; height:40px; border-radius:50%; background:var(--primary); color:#ffffff; font-weight:800; display:flex; align-items:center; justify-content:center;">
                  AI
                </div>
                <div style="flex:1; min-width:0;">
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-weight:800; font-size:0.92rem; color:var(--text-main);">AI Yordamchi</span>
                    <span style="font-size:0.7rem; color:var(--primary); font-weight:700;">Online</span>
                  </div>
                  <div style="font-size:0.8rem; color:var(--text-secondary); text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">Karyera maslahatchisi</div>
                </div>
              </div>

              <!-- UzAuto HR Channel -->
              <div style="display:flex; align-items:center; gap:0.75rem; padding:0.85rem; border-radius:var(--radius-md); cursor:pointer; margin-bottom:0.35rem;" onclick="window.App.showToast('UzAuto HR muloqot xonasi ochildi', 'info')">
                <div style="width:40px; height:40px; border-radius:50%; background:var(--secondary-light); color:var(--secondary); font-weight:800; display:flex; align-items:center; justify-content:center;">
                  UA
                </div>
                <div style="flex:1; min-width:0;">
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-weight:700; font-size:0.92rem; color:var(--text-main);">UzAuto HR</span>
                  </div>
                  <div style="font-size:0.8rem; color:var(--text-secondary); text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">Frontend vakansiyasi bo‘yicha</div>
                </div>
              </div>

              <!-- Mentor / Surdotarjimon Channel -->
              <div style="display:flex; align-items:center; gap:0.75rem; padding:0.85rem; border-radius:var(--radius-md); cursor:pointer;" onclick="window.App.showToast('Surdotarjimon muloqot xonasi ochildi', 'info')">
                <div style="width:40px; height:40px; border-radius:50%; background:var(--accent-light); color:#B45309; font-weight:800; display:flex; align-items:center; justify-content:center;">
                  DA
                </div>
                <div style="flex:1; min-width:0;">
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-weight:700; font-size:0.92rem; color:var(--text-main);">Dilshod Aliyev</span>
                  </div>
                  <div style="font-size:0.8rem; color:var(--text-secondary); text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">Surdotarjimon & Mentor</div>
                </div>
              </div>

            </div>
          </aside>

          <!-- Right: AI Chat Main Area -->
          <main class="chat-main">
            
            <!-- Chat Active Header -->
            <div style="padding:1rem 1.5rem; border-bottom:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center; background:var(--bg-card);">
              <div style="display:flex; align-items:center; gap:0.75rem;">
                <div style="width:36px; height:36px; border-radius:50%; background:var(--primary); color:#ffffff; font-weight:800; display:flex; align-items:center; justify-content:center;">
                  AI
                </div>
                <div>
                  <div style="font-weight:800; font-size:1rem; color:var(--text-main);">Imkon AI Yordamchi</div>
                  <div style="font-size:0.75rem; color:var(--primary); font-weight:700;">● Har doim faol (24/7)</div>
                </div>
              </div>

              <button type="button" class="btn btn-ghost btn-sm" onclick="window.a11y.speakText('Imkon AI Yordamchi xizmatidasiz.')" title="Ovozli eshitish">
                ${I.get('volume2', 16)}
              </button>
            </div>

            <!-- Messages Stream -->
            <div class="chat-messages" id="chat-messages-container">
              ${this.messages.map(msg => `
                <div class="chat-message-bubble ${msg.sender === 'ai' ? 'incoming' : 'outgoing'}">
                  <div style="font-size:0.75rem; font-weight:700; color:${msg.sender === 'ai' ? 'var(--primary)' : 'rgba(255,255,255,0.85)'}; margin-bottom:0.25rem;">
                    ${msg.senderName} • ${msg.time}
                  </div>
                  <div style="color:${msg.sender === 'ai' ? 'var(--text-main)' : 'var(--text-white)'};">
                    ${msg.text}
                  </div>
                  ${msg.sender === 'ai' ? `
                    <button type="button" class="btn btn-ghost btn-sm" style="padding:0.15rem 0.35rem; margin-top:0.4rem; font-size:0.75rem; color:var(--text-secondary);" onclick="window.a11y.speakText('${msg.text.replace(/'/g, "\\'")}')">
                      ${I.get('volume2', 12)} <span>O'qib berish</span>
                    </button>
                  ` : ''}
                </div>
              `).join('')}
            </div>

            <!-- Quick Assistance Chips (As per prompt: Mos ish topish, CV haqida maslahat, Vakansiyani tushuntirish, Ish beruvchiga xabar, Tarjima) -->
            <div class="chat-quick-actions">
              ${this.quickPrompts.map(qp => `
                <button type="button" class="chat-quick-chip" onclick="window.ChatComponent.sendQuickPrompt('${qp.text.replace(/'/g, "\\'")}')">
                  ${qp.label}
                </button>
              `).join('')}
            </div>

            <!-- Chat Input Bar -->
            <div class="chat-input-bar">
              <input type="text" 
                     id="chat-input-text" 
                     placeholder="Savolingizni yoki xabaringizni yozing..." 
                     style="flex:1; padding:0.75rem 1rem; border:1px solid var(--border-color); border-radius:var(--radius-md); outline:none; background:var(--bg-subtle); color:var(--text-main);"
                     onkeydown="if(event.key==='Enter') window.ChatComponent.sendMessage();" />
              
              <button type="button" class="btn btn-ghost btn-icon" onclick="window.App.showToast('Ovozli kiritish faollashdi', 'info')" title="Ovoz bilan yozish">
                ${I.get('mic', 18)}
              </button>

              <button type="button" class="btn btn-primary" onclick="window.ChatComponent.sendMessage()">
                ${I.get('send', 16, '#ffffff')}
                <span>Yuborish</span>
              </button>
            </div>

          </main>

        </div>

      </section>
    `;
  },

  sendMessage() {
    const input = document.getElementById('chat-input-text');
    if (!input || !input.value.trim()) return;

    const userText = input.value.trim();
    input.value = '';

    const timeStr = `${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2, '0')}`;

    this.messages.push({
      id: Date.now(),
      sender: 'user',
      senderName: 'Siz',
      avatar: 'U',
      text: userText,
      time: timeStr
    });

    this.refreshView();

    // AI Simulated Response
    setTimeout(() => {
      let replyText = "Rahmat! Sizning so'rovingiz bo'yicha tahlil o'tkazilmoqda. Platformamizdagi barcha vakansiyalar sizning qulaylik talablaringizga to'liq mos kelishini ta'minlaymiz.";
      
      const lower = userText.toLowerCase();
      if (lower.includes('ish') || lower.includes('vakansiya') || lower.includes('topish')) {
        replyText = "Sizning sohangiz bo'yicha UzAuto (Frontend Developer — 8–12 mln so'm) va Uzum Technologies (React Developer — 14–22 mln so'm) vakansiyalari 96% mos keladi. Ikkala lavozim ham 100% masofaviy va ekran o'quvchi mos dasturlar bilan ta'minlanadi.";
      } else if (lower.includes('cv') || lower.includes('rezyume')) {
        replyText = "CVingizga sizga zarur bo'lgan ish qulayligi (masalan: 100% masofaviy, ekran o'quvchi mos yoki faqat matnli chat) bandini aniq ko'rsatishni tavsiya qilaman. Bu ish beruvchiga sizga eng ergonomik sharoitni tayyorlashga yordam beradi.";
      } else if (lower.includes('tarjima') || lower.includes('ingliz')) {
        replyText = "Xabaringiz ingliz tiliga tarjima qilindi: 'Hello! I am applying for the remote position and my skills are fully aligned with the requirements.'";
      }

      this.messages.push({
        id: Date.now() + 1,
        sender: 'ai',
        senderName: 'Imkon AI Yordamchi',
        avatar: 'AI',
        text: replyText,
        time: `${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2, '0')}`
      });

      this.refreshView();
    }, 450);
  },

  sendQuickPrompt(promptText) {
    const input = document.getElementById('chat-input-text');
    if (input) {
      input.value = promptText;
      this.sendMessage();
    }
  },

  toggleLangDropdown(e) {
    if (e) e.stopPropagation();
    this.isLangDropdownOpen = !this.isLangDropdownOpen;
    this.refreshView();
  },

  selectLang(langVal) {
    this.setLang(langVal);
    this.isLangDropdownOpen = false;
    this.refreshView();
  },

  setLang(lang) {
    this.selectedTargetLang = lang;
    if (window.App) {
      window.App.showToast(`Tarjima tili o'zgartirildi: ${lang.toUpperCase()}`, 'info');
    }
  },

  scrollToBottom() {
    setTimeout(() => {
      const el = document.getElementById('chat-messages-container');
      if (el) el.scrollTop = el.scrollHeight;
    }, 50);
  },

  refreshView() {
    const mount = document.getElementById('chat-mount');
    if (mount) {
      mount.innerHTML = this.render();
      this.scrollToBottom();
    }
  }
};
