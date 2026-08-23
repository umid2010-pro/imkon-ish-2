/**
 * "Imkoniyatlar Kengligi" — Central Reactive State Store
 * Persistent localStorage state manager with event dispatching and reactive subscribers
 */

class AppStore {
  constructor() {
    this.storageKey = 'imkoniyatlar_app_state_v2';
    this.listeners = {};
    this.state = this.loadState();
  }

  getDefaultState() {
    return {
      isDemoMode: true,
      currentUser: {
        id: 'usr-candidate-1',
        fullName: 'Azizbek Saidov',
        email: 'aziz.saidov@example.com',
        role: 'candidate', // candidate | employer | mentor
        title: 'Frontend & Accessibility Dasturchi',
        avatar: 'AS',
        condition: 'Harakatlanishda imkoniyati cheklangan (Masofaviy ish)',
        accommodations: ['remote', 'flexible_hours', 'screen_reader'],
        matchScore: 96,
        resumeText: `Azizbek Saidov — Frontend Dasturchi.
Ko'nikmalar: JavaScript, TypeScript, React.js, Next.js, HTML5, CSS3, TailwindCSS, WCAG 2.1 AA Accessibility, Git.
Tajriba: 3 yil Frontend dasturlash bo'yicha masofaviy loyihalar, to'siqsiz veb-saytlar va foydalanuvchi interfeyslari yaratish.`
      },
      savedJobs: [1, 3],
      candidates: (window.APP_DATA && window.APP_DATA.candidates) ? JSON.parse(JSON.stringify(window.APP_DATA.candidates)) : [],
      mentorRequests: (window.APP_DATA && window.APP_DATA.mentorRequests) ? JSON.parse(JSON.stringify(window.APP_DATA.mentorRequests)) : [],
      applications: [
        {
          id: 'app-101',
          jobId: 1,
          jobTitle: 'Frontend Dasturchi (React / TS)',
          company: 'Uzum Technologies',
          appliedDate: '2026-08-14',
          status: 'interview', // applied | reviewing | interview | offer
          matchScore: 96,
          coverLetter: 'Hurmatli Uzum Technologies jamoasi, ushbu vakansiya bo\'yicha 100% masofaviy ishlash imkoniyati va to\'siqsiz muhit sabab ariza topshirmoqdaman.'
        },
        {
          id: 'app-102',
          jobId: 3,
          jobTitle: 'Junior QA Tester (Accessibility QA)',
          company: 'EPAM Systems',
          appliedDate: '2026-08-10',
          status: 'reviewing',
          matchScore: 94,
          coverLetter: 'EPAM jamoasiga WCAG 2.1 AA testlash ko\'nikmalarim bilan hissa qo\'shishga tayyorman.'
        }
      ],
      activeChatChannel: 'yandex-hr',
      chatChannels: [
        {
          id: 'yandex-hr',
          name: 'Yekaterina Volkova',
          company: 'Yandex Tech (Rossiya / Moskva)',
          role: 'Bosh Texnik Recruiter',
          partnerLang: 'ru',
          avatar: 'YV',
          online: true,
          unread: 0,
          messages: [
            {
              id: 'm1',
              sender: 'employer',
              originalText: 'Здравствуйте, Азизбек! Мы рассмотрели ваше резюме на позицию Frontend-разработчика. Нам очень понравился ваш опыт с React и стандартами доступности WCAG.',
              translatedText: 'Assalomu alaykum, Azizbek! Biz sizning Frontend dasturchi lavozimiga yuborgan rezyumengizni ko\'rib chiqdik. React va WCAG veb-qulaylik standartlari bo\'yicha tajribangiz bizga juda ma\'qul keldi.',
              sourceLang: 'ru',
              targetLang: 'uz',
              time: '10:15'
            },
            {
              id: 'm2',
              sender: 'candidate',
              originalText: 'Assalomu alaykum Yekaterina! Katta rahmat. Men masofaviy formatda jamoangiz bilan ishlashga va onlayn suhbatdan o\'tishga to\'liq tayyorman.',
              translatedText: 'Здравствуйте, Екатерина! Большое спасибо. Я полностью готов работать с вашей командой в удаленном формате и пройти онлайн-собеседование.',
              sourceLang: 'uz',
              targetLang: 'ru',
              time: '10:20'
            }
          ]
        },
        {
          id: 'epam-recruiter',
          name: 'Sarah Jenkins',
          company: 'EPAM Global (AQSh / London)',
          role: 'Lead Accessibility Recruiter',
          partnerLang: 'en',
          avatar: 'SJ',
          online: true,
          unread: 1,
          messages: [
            {
              id: 'm3',
              sender: 'employer',
              originalText: 'Hi Azizbek, we were impressed by your deep understanding of WCAG 2.1 AA standards and screen reader optimizations for web apps.',
              translatedText: 'Salom Azizbek, biz sizning WCAG 2.1 AA standartlari va veb-ilovalar uchun ekran o\'quvchi optimizatsiyalari bo\'yicha chuqur bilimlaringizdan juda ta\'sirlandik.',
              sourceLang: 'en',
              targetLang: 'uz',
              time: '09:40'
            }
          ]
        },
        {
          id: 'uzum-hr',
          name: 'Aziza Karimova',
          company: 'Uzum Technologies (O\'zbekiston)',
          role: 'HR Boshqaruvchi',
          partnerLang: 'uz',
          avatar: 'AK',
          online: true,
          unread: 0,
          messages: [
            {
              id: 'm4',
              sender: 'employer',
              originalText: 'Assalomu alaykum Azizbek! Masofaviy ish joyingiz uchun barcha maxsus texnik jihozlar kompaniya tomonidan to\'liq yetkazib beriladi.',
              translatedText: 'Assalomu alaykum Azizbek! Masofaviy ish joyingiz uchun barcha maxsus texnik jihozlar kompaniya tomonidan to\'liq yetkazib beriladi.',
              sourceLang: 'uz',
              targetLang: 'uz',
              time: 'Kecha'
            }
          ]
        },
        {
          id: 'ai-career-mentor',
          name: 'AI Karyera Maslahatchisi',
          company: 'Imkon Ish AI',
          role: 'Sun\'iy Intellekt Hamrohi',
          partnerLang: 'uz',
          avatar: 'AI',
          online: true,
          unread: 0,
          messages: [
            {
              id: 'm5',
              sender: 'ai',
              originalText: 'Salom Azizbek! Profilingizga 3 ta yangi 100% masofaviy vakansiya mos keldi. Lazerli CV skanerni ishga tushirishni xohlaysizmi?',
              translatedText: 'Salom Azizbek! Profilingizga 3 ta yangi 100% masofaviy vakansiya mos keldi. Lazerli CV skanerni ishga tushirishni xohlaysizmi?',
              sourceLang: 'uz',
              targetLang: 'uz',
              time: '09:00'
            }
          ]
        }
      ],
      a11y: {
        theme: 'light', // light | dark | high-contrast | monochrome
        fontScale: 'md', // sm | md | lg | xl
        dyslexiaFont: false,
        largeCursor: false,
        reducedMotion: false,
        ttsEnabled: false
      }
    };
  }

  loadState() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        const defaults = this.getDefaultState();
        // Ensure candidates and mentorRequests are populated if empty in saved
        if (!parsed.candidates || parsed.candidates.length === 0) {
          parsed.candidates = defaults.candidates;
        }
        if (!parsed.mentorRequests || parsed.mentorRequests.length === 0) {
          parsed.mentorRequests = defaults.mentorRequests;
        }
        return { ...defaults, ...parsed };
      }
    } catch (e) {
      console.warn('Store load error:', e);
    }
    return this.getDefaultState();
  }

  saveState() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Store save error:', e);
    }
  }

  getState() {
    return this.state;
  }

  subscribe(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
    return () => {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    };
  }

  dispatch(event, payload) {
    this.reduce(event, payload);
    this.saveState();
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => cb(this.state, payload));
    }
    if (this.listeners['*']) {
      this.listeners['*'].forEach(cb => cb(this.state, { event, payload }));
    }
  }

  reduce(event, payload) {
    switch (event) {
      case 'AUTH_SET_USER':
        this.state.currentUser = payload;
        break;

      case 'AUTH_LOGOUT':
        this.state.currentUser = null;
        break;

      case 'TOGGLE_SAVE_JOB':
        const jobId = payload;
        if (this.state.savedJobs.includes(jobId)) {
          this.state.savedJobs = this.state.savedJobs.filter(id => id !== jobId);
        } else {
          this.state.savedJobs.push(jobId);
        }
        break;

      case 'APPLY_JOB':
        const existingApp = this.state.applications.find(a => a.jobId === payload.jobId);
        if (!existingApp) {
          this.state.applications.unshift({
            id: 'app-' + Date.now(),
            jobId: payload.jobId,
            jobTitle: payload.jobTitle,
            company: payload.company,
            appliedDate: new Date().toISOString().split('T')[0],
            status: 'applied',
            matchScore: payload.matchScore || 95,
            coverLetter: payload.coverLetter || ''
          });
        }
        break;

      case 'UPDATE_CANDIDATE_SHOWCASE': {
        const { candidateId, data } = payload;
        if (!this.state.candidates) this.state.candidates = [];
        const idx = this.state.candidates.findIndex(c => c.id === candidateId);
        if (idx !== -1) {
          this.state.candidates[idx] = { ...this.state.candidates[idx], ...data };
        } else {
          this.state.candidates.unshift({ id: candidateId, ...data });
        }

        // Update currentUser if it corresponds to this candidate
        if (this.state.currentUser) {
          this.state.currentUser = { ...this.state.currentUser, ...data };
        }
        break;
      }

      case 'TOGGLE_CANDIDATE_STATUS': {
        const candId = payload;
        const cand = (this.state.candidates || []).find(c => c.id === candId);
        if (cand) {
          cand.isOpenToWork = !cand.isOpenToWork;
          cand.status = cand.isOpenToWork ? 'Faol izlanmoqda' : 'Band (Hozirda ishlamoqda)';
        }
        break;
      }

      case 'START_CHAT_WITH_CANDIDATE': {
        const candidate = payload;
        if (!this.state.chatChannels) this.state.chatChannels = [];
        const channelId = 'chat-cand-' + candidate.id;
        let existing = this.state.chatChannels.find(c => c.id === channelId);

        if (!existing) {
          const now = new Date();
          const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
          
          existing = {
            id: channelId,
            name: candidate.name,
            company: candidate.title + ' (' + (candidate.location || 'Masofaviy') + ')',
            role: 'Nomzod',
            partnerLang: 'uz',
            avatar: candidate.avatar || candidate.name.split(' ').map(n=>n[0]).join('') || 'N',
            online: true,
            unread: 0,
            candidateData: candidate,
            messages: [
              {
                id: 'm-init-' + Date.now(),
                sender: 'candidate',
                originalText: `Assalomu alaykum! Men ${candidate.name}, ${candidate.title}. Profilim va portfoliom bilan tanishib chiqqaningizdan xursandman. Masofaviy ish taklifingizni eshitishga tayyorman!`,
                translatedText: `Assalomu alaykum! Men ${candidate.name}, ${candidate.title}. Profilim va portfoliom bilan tanishib chiqqaningizdan xursandman. Masofaviy ish taklifingizni eshitishga tayyorman!`,
                sourceLang: 'uz',
                targetLang: 'uz',
                time: timeStr
              }
            ]
          };
          this.state.chatChannels.unshift(existing);
        }

        this.state.activeChatChannel = channelId;
        break;
      }

      case 'UPDATE_MENTOR_REQUEST_STATUS': {
        const { requestId, status } = payload;
        if (this.state.mentorRequests) {
          const req = this.state.mentorRequests.find(r => r.id === requestId);
          if (req) req.status = status;
        }
        break;
      }

      case 'SEND_CHAT_MESSAGE':
        const { channelId, message } = payload;
        const channel = this.state.chatChannels.find(c => c.id === channelId);
        if (channel) {
          channel.messages.push(message);
        }
        break;

      case 'SET_ACTIVE_CHAT_CHANNEL':
        this.state.activeChatChannel = payload;
        break;

      case 'UPDATE_A11Y_CONFIG':
        this.state.a11y = { ...this.state.a11y, ...payload };
        break;

      default:
        break;
    }
  }
}

window.Store = new AppStore();
