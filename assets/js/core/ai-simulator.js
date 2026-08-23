/**
 * "Imkon-Ish" — AI Simulation Engine (MVP Prototype)
 * Provides rule-based and algorithmic prototypes for CV scanning, mock interview evaluation,
 * cover letter generation, and multi-language translation.
 */

window.AiEngine = {
  // Phrase dictionary for multi-language chat simulation
  phraseBook: {
    uz: {
      greeting: "Assalomu alaykum! Inklyuziv muloqot tizimiga xush kelibsiz.",
      remote_ok: "Masofaviy ish joyi uchun barcha maxsus jihozlar yetkazib beriladi.",
      interview_invite: "Sizni juma kuni soat 15:00 da onlayn texnik suhbatga taklif qilamiz.",
      accessibility_confirm: "Bizning ofisimiz 100% panduslar, lift va surdotarjimon bilan jihozlangan."
    },
    en: {
      greeting: "Hello! Welcome to the inclusive communication network.",
      remote_ok: "All specialized equipment for your remote workspace will be delivered.",
      interview_invite: "We would like to invite you to an online technical interview this Friday at 15:00.",
      accessibility_confirm: "Our office is 100% equipped with wheelchair ramps, elevators, and sign language interpreters."
    },
    ru: {
      greeting: "Здравствуйте! Добро пожаловать в инклюзивную систему общения.",
      remote_ok: "Всё необходимое оборудование для удаленной работы будет предоставлено компанией.",
      interview_invite: "Приглашаем вас на онлайн техническое собеседование в эту пятницу в 15:00.",
      accessibility_confirm: "Наш офис на 100% оборудован пандусами, лифтами и услугами сурдоперевода."
    },
    de: {
      greeting: "Hallo! Willkommen im barrierefreien Kommunikationsnetzwerk.",
      remote_ok: "Die gesamte Ausrüstung für Ihren Telearbeitsplatz wird bereitgestellt.",
      interview_invite: "Wir laden Sie zu einem technischen Online-Interview am Freitag um 15:00 Uhr ein.",
      accessibility_confirm: "Unser Büro ist zu 100% barrierefrei mit Rampen und Aufzügen ausgestattet."
    },
    tr: {
      greeting: "Merhaba! Kapsayıcı iletişim ağına hoş geldiniz.",
      remote_ok: "Uzaktan çalışma alanınız için gerekli tüm ekipmanlar sağlanacaktır.",
      interview_invite: "Sizi Cuma günü saat 15:00'te çevrimiçi teknik mülakata davet etmek istiyoruz.",
      accessibility_confirm: "Ofisimiz %100 tekerlekli sandalye rampaları ve asansörlerle donatılmıştır."
    }
  },

  /**
   * Scan and analyze a candidate resume against inclusive job market benchmarks
   */
  async scanResume(cvText, category = 'frontend') {
    if (window.AiService) {
      const result = await window.AiService.analyzeResumeText(cvText);
      return {
        atsScore: result.atsScore,
        matchQuality: result.atsScore >= 90 ? "A'lo (Top 5%)" : "Yaxshi (Top 15%)",
        skillsExtracted: result.extractedSkills,
        accommodationsDetected: result.accommodationsDetected,
        strengths: result.strengths,
        recommendations: result.improvements,
        matchedVacanciesCount: 6,
        isPrototype: true
      };
    }

    // Fallback simulation
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      atsScore: 92,
      matchQuality: "A'lo (Top 5%)",
      skillsExtracted: ['REACT.JS', 'TYPESCRIPT', 'WCAG 2.1 AA', 'GIT'],
      accommodationsDetected: ['100% Masofaviy ish (Remote-First)'],
      strengths: ['WCAG 2.1 AA veb-qulaylik standartlari bo\'yicha amaliy tajriba mavjud'],
      recommendations: ['GitHub profilingizdagi ochiq manbali inklyuziv loyihalarga havolalarni qo\'shing'],
      matchedVacanciesCount: 6,
      isPrototype: true
    };
  },

  /**
   * Evaluate user's spoken or typed answer in mock interview
   */
  evaluateInterviewAnswer(questionText, answerText) {
    if (window.AiService) {
      return window.AiService.evaluateInterviewAnswer(questionText, answerText);
    }

    const textLen = (answerText || '').trim().length;
    let clarityScore = textLen > 80 ? 9.5 : (textLen > 30 ? 8.2 : 6.5);
    let techScore = 9.0;
    let starScore = 9.2;
    let overall = ((clarityScore + techScore + starScore) / 3).toFixed(1);

    return {
      isPrototype: true,
      overallScore: overall,
      clarityScore: clarityScore.toFixed(1),
      techScore: techScore.toFixed(1),
      starScore: starScore.toFixed(1),
      feedback: "Javobingiz professional tuzilgan.",
      tip: "STAR metodikasidan foydalanib, natijani aniq raqamlar bilan boyiting."
    };
  },

  /**
   * One-Click AI Cover Letter Generator tailored to disability accommodations
   */
  generateCoverLetter(vacancy, candidate) {
    const comp = vacancy.company || 'Kompaniya';
    const title = vacancy.title || 'Mutaxassis';
    const name = candidate ? candidate.fullName : 'Azizbek Saidov';
    
    return `Hurmatli ${comp} jamoasi va kadrlar bo'limi,

Men "${title}" lavozimi bo'yicha vakansiyangizni katta qiziqish bilan o'rganib chiqdim. Ushbu yo'nalishdagi ko'nikmalarim, ayniqsa masofaviy ishlash tajribam va zamonaviy texnologiyalar bilan ishlash qobiliyatim jamoangizga katta qiymat qo'sha olishiga ishonaman.

Sizning kompaniyangizda inklyuzivlik va teng imkoniyatlar muhiti yaratilganligi meni juda ruhlantirdi. Men o'z ishimda yuqori mas'uliyat, sifatli natija va asinxron aloqa madaniyatini birinchi o'ringa qo'yaman.

Rezyumem va portfoliomni ilova qilgan holda, o'zaro hamkorlik imkoniyatlarini onlayn suhbatda muhokama qilishdan mamnun bo'laman.

Ehtirom bilan,
${name}
Bog'lanish: ${candidate ? candidate.email : 'aziz.saidov@example.com'}`;
  },

  /**
   * Instant bilingual & multilingual neural translation simulation
   * Translates between Uzbek, Russian, English, German, and Turkish seamlessly
   */
  translateText(text, targetLang = 'ru', sourceLang = 'auto') {
    if (!text || !text.trim()) return '';
    const clean = text.trim();
    const lower = clean.toLowerCase();

    // Auto-detect source language
    if (sourceLang === 'auto') {
      if (/[а-яё]/i.test(clean)) {
        sourceLang = 'ru';
      } else if (
        lower.includes('hello') || lower.includes('hi ') || lower.includes('thank') ||
        lower.includes('interview') || lower.includes('resume') || lower.includes('position') ||
        lower.includes('schedule')
      ) {
        sourceLang = 'en';
      } else if (
        lower.includes('hallo') || lower.includes('guten') || lower.includes('danke') ||
        lower.includes('willkommen')
      ) {
        sourceLang = 'de';
      } else {
        sourceLang = 'uz'; // default source for user input
      }
    }

    // If source and target language are the same, return as is
    if (sourceLang === targetLang) {
      return clean;
    }

    // 1. Uzbek -> Russian (UZ -> RU)
    if (sourceLang === 'uz' && targetLang === 'ru') {
      if (lower.includes('suhbatga') && (lower.includes('tayyor') || lower.includes('roziman'))) {
        return 'Большое спасибо, я полностью готов к онлайн-собеседованию.';
      }
      if (lower.includes('rezyume') && (lower.includes('yubor') || lower.includes('ilova') || lower.includes('portfoliom'))) {
        return 'Я прикрепил свое резюме и портфолио к сообщению для вашего ознакомления.';
      }
      if (lower.includes('nvda') || lower.includes('ekran o\'quvchi') || lower.includes('qulaylik')) {
        return 'Подтверждаю: на моем рабочем месте установлена и настроена программа экранного доступа NVDA.';
      }
      if (lower.includes('assalomu alaykum') || lower.includes('salom')) {
        return 'Здравствуйте! Рад нашему общению и возможности сотрудничества.';
      }
      if (lower.includes('rahmat') || lower.includes('tashakkur')) {
        return 'Большое спасибо за ваш подробный ответ и предоставленные условия.';
      }
      if (lower.includes('masofaviy') || lower.includes('remote') || lower.includes('uydan')) {
        return 'Я полностью готов работать в удаленном формате с гибким или асинхронным графиком.';
      }
      if (lower.includes('grafik') || lower.includes('vaqt') || lower.includes('soat')) {
        return 'Предложенное время и график работы мне отлично подходят.';
      }
      if (lower.includes('ha') || lower.includes('albatta')) {
        return 'Да, конечно. Буду рад обсудить все детали на встрече.';
      }
      if (lower.includes('savol')) {
        return 'У меня есть несколько вопросов по поводу условий и задач проекта.';
      }
      return `${clean} (Demo Tarjima: RU)`;
    }

    // 2. Russian -> Uzbek (RU -> UZ)
    if (sourceLang === 'ru' && targetLang === 'uz') {
      if (lower.includes('здравствуйте') || lower.includes('привет') || lower.includes('добрый день')) {
        if (lower.includes('резюме') || lower.includes('рассмотрели')) {
          return "Assalomu alaykum! Biz sizning rezyumengizni ko'rib chiqdik va qulay sharoitlar bilan hamkorlik qilishdan mamnunmiz.";
        }
        return "Assalomu alaykum! Inklyuziv platformaga xush kelibsiz.";
      }
      if (lower.includes('собеседовани') || lower.includes('встреч')) {
        return "Sizni onlayn suhbatga taklif qilamiz. Siz uchun qulay vaqtni belgilaylik.";
      }
      if (lower.includes('оборудовани') || lower.includes('техник') || lower.includes('ноутбук')) {
        return "Masofaviy ish joyingiz uchun barcha maxsus texnik jihozlar kompaniya tomonidan to'liq yetkazib beriladi.";
      }
      if (lower.includes('спасибо') || lower.includes('благодар')) {
        return "Javobingiz va qiziqishingiz uchun katta rahmat.";
      }
      if (lower.includes('график') || lower.includes('время') || lower.includes('удаленн')) {
        return "Masofaviy ish formati va moslashuvchan ish soatlari tasdiqlandi.";
      }
      return `${clean} (Demo Tarjima: UZ)`;
    }

    // 3. Uzbek -> English (UZ -> EN)
    if (sourceLang === 'uz' && targetLang === 'en') {
      if (lower.includes('assalomu alaykum') || lower.includes('salom')) {
        return 'Hello! Pleased to connect with your team on this platform.';
      }
      if (lower.includes('suhbatga') || lower.includes('tayyor')) {
        return 'Thank you, I am fully prepared for the online interview.';
      }
      if (lower.includes('rezyume') || lower.includes('portfolio')) {
        return 'I have attached my CV and portfolio for your review.';
      }
      if (lower.includes('masofaviy') || lower.includes('remote')) {
        return 'I am looking for a full remote position with flexible schedule.';
      }
      return `${clean} (Demo Translation: EN)`;
    }

    // 4. English -> Uzbek (EN -> UZ)
    if (sourceLang === 'en' && targetLang === 'uz') {
      if (lower.includes('hello') || lower.includes('hi')) {
        return "Salom! Jamoamiz nomidan siz bilan muloqot qilayotganimizdan xursandmiz.";
      }
      if (lower.includes('interview') || lower.includes('invite')) {
        return "Sizni onlayn texnik suhbatga taklif qilishdan mamnunmiz.";
      }
      if (lower.includes('equipment') || lower.includes('deliver') || lower.includes('laptop')) {
        return "Barcha kerakli texnik jihozlar masofaviy ish joyingizga yetkaziladi.";
      }
      return `${clean} (Demo Tarjima: UZ)`;
    }

    // Generic Fallback
    return `${clean} (Demo Tarjima: ${targetLang.toUpperCase()})`;
  }
};
