/**
 * "Imkon Ish" — Enterprise Data Architecture
 * Comprehensive database for inclusive vacancies, verified inclusive employers, candidates, CV samples, and UN SDG impact metrics
 */

window.APP_DATA = {
  // Global UN SDG 8 & 10 Impact Telemetry
  stats: {
    globalDisabledEmploymentRate: 30, // % of disabled people in global workforce (UN SDG baseline)
    generalWorkforceRate: 78,
    platformHiredCandidates: 1420,
    inclusiveCompaniesCount: 86,
    averageTimeToHire: "14 kun",
    matchAccuracyRate: "94%",
    totalEconomicContribution: "48.5 mlrd UZS",
    trainingGraduatesCount: 3200,
    accommodatedWorkplacesCount: 940
  },

  // O'zbekistonning barcha 14 ta hududi + Masofaviy ro'yxati
  regions: [
    { value: "all", label: "Barcha hududlar" },
    { value: "Toshkent shahri", label: "Toshkent shahri" },
    { value: "Toshkent viloyati", label: "Toshkent viloyati" },
    { value: "Samarqand", label: "Samarqand" },
    { value: "Farg'ona", label: "Farg'ona" },
    { value: "Andijon", label: "Andijon" },
    { value: "Namangan", label: "Namangan" },
    { value: "Buxoro", label: "Buxoro" },
    { value: "Qashqadaryo", label: "Qashqadaryo" },
    { value: "Surxondaryo", label: "Surxondaryo" },
    { value: "Xorazm", label: "Xorazm" },
    { value: "Navoiy", label: "Navoiy" },
    { value: "Jizzax", label: "Jizzax" },
    { value: "Sirdaryo", label: "Sirdaryo" },
    { value: "Qoraqalpog'iston", label: "Qoraqalpog'iston Respublikasi" },
    { value: "Masofaviy", label: "100% Masofaviy" }
  ],

  // Inclusive Partner & Employer Companies
  partners: [
    { 
      id: "uzauto",
      name: "UzAuto", 
      type: "Avtomobilsozlik & Korporatsiya", 
      logoText: "UA",
      badge: "A+ Inklyuziv", 
      verified: true,
      inclusiveScore: 92,
      vacanciesCount: 12,
      features: ["Remote", "Accessibility friendly", "Flexible work"],
      description: "Nogironligi bor mutaxassislar uchun maxsus texnologik va masofaviy muhandislik dasturlari.",
      location: "Toshkent / Masofaviy",
      rating: "4.9"
    },
    { 
      id: "uzum",
      name: "Uzum Technologies", 
      type: "E-Commerce & FinTech", 
      logoText: "UZ",
      badge: "100% Masofaviy", 
      verified: true,
      inclusiveScore: 96,
      vacanciesCount: 18,
      features: ["Remote", "Accessibility friendly", "Flexible work"],
      description: "Raqamli xizmatlar va e-tijorat bo'yicha yetakchi ekotizim. Ekran o'quvchi va asinxron ish muhiti.",
      location: "Toshkent / 100% Masofaviy",
      rating: "4.9"
    },
    { 
      id: "epam",
      name: "EPAM Systems", 
      type: "Global IT & Consulting", 
      logoText: "EP",
      badge: "Global WCAG Standarti", 
      verified: true,
      inclusiveScore: 95,
      vacanciesCount: 9,
      features: ["Remote", "Accessibility friendly", "Flexible work"],
      description: "Xalqaro dasturiy ta'minot giganti. WCAG 2.1 AA va jahon miqyosidagi mentorlik dasturi.",
      location: "Gibrid / 100% Masofaviy",
      rating: "4.8"
    },
    { 
      id: "beeline",
      name: "Beeline Uzbekistan", 
      type: "Telekommunikatsiya", 
      logoText: "BL",
      badge: "Matnli Aloqa & Chat", 
      verified: true,
      inclusiveScore: 94,
      vacanciesCount: 14,
      features: ["Remote", "Accessibility friendly", "Flexible work"],
      description: "Eshitishida nuqsoni bor shaxslar uchun 100% matnli mijozlar bilan aloqa markazi.",
      location: "100% Masofaviy",
      rating: "4.7"
    },
    { 
      id: "payme",
      name: "Payme / TBC Bank", 
      type: "FinTech & Bank", 
      logoText: "PM",
      badge: "Surdo & Ergonomik", 
      verified: true,
      inclusiveScore: 91,
      vacanciesCount: 8,
      features: ["Remote", "Accessibility friendly", "Flexible work"],
      description: "To'lov xizmatlari va inklyuziv moliyaviy interfeyslar bo'yicha ilg'or jamoa.",
      location: "Toshkent (Pandusli) / Masofaviy",
      rating: "4.8"
    },
    { 
      id: "itpark",
      name: "IT Park Uzbekistan", 
      type: "Davlat IT Ekotizimi", 
      logoText: "IT",
      badge: "Milliy Hub", 
      verified: true,
      inclusiveScore: 97,
      vacanciesCount: 24,
      features: ["Remote", "Accessibility friendly", "Flexible work"],
      description: "O'zbekistonda IT sohasida nogironligi bor shaxslar uchun bepul ta'lim va ish o'rinlari kafolati.",
      location: "Barcha 14 ta hudud",
      rating: "5.0"
    },
    { 
      id: "undp",
      name: "BMT Taraqqiyot Dasturi (UNDP)", 
      type: "Xalqaro Tashkilot", 
      logoText: "UN",
      badge: "SDG 8 & 10 Hamkori", 
      verified: true,
      inclusiveScore: 99,
      vacanciesCount: 5,
      features: ["Remote", "Accessibility friendly", "Flexible work"],
      description: "BMT Barqaror Rivojlanish Maqsadlari bo'yicha teng imkoniyatlar yaratish milliy loyihasi.",
      location: "Toshkent / Masofaviy",
      rating: "5.0"
    },
    { 
      id: "mohirdev",
      name: "Mohirdev Platformasi", 
      type: "EdTech & IT Ta'lim", 
      logoText: "MD",
      badge: "Ta'lim & Karyera", 
      verified: true,
      inclusiveScore: 90,
      vacanciesCount: 6,
      features: ["Remote", "Accessibility friendly", "Flexible work"],
      description: "Inklyuziv IT kurslari, subtitrli darsliklar va ishga joylashtirish kafolati.",
      location: "Onlayn",
      rating: "4.8"
    }
  ],

  // Enterprise Inclusive Vacancies
  vacancies: [
    {
      id: 1,
      title: "Frontend Developer",
      company: "UzAuto",
      department: "engineering",
      location: "Toshkent",
      workType: "remote",
      salary: "8–12 mln so‘m",
      salaryNumeric: 10000000,
      experience: "1-3 yil",
      employmentType: "To‘liq stavka",
      aiMatch: 94,
      matchReasons: [
        "JavaScript",
        "React",
        "Remote",
        "Sizning tajribangizga mos"
      ],
      skills: ["JavaScript", "React", "Remote", "HTML/CSS"],
      featured: true,
      accommodations: [
        "100% Masofaviy ish (Remote)",
        "Ekran o'quvchi (NVDA/JAWS) mos dasturlar",
        "Moslashuvchan grafik"
      ],
      accommodationTypes: ["remote", "screen_reader", "flexible_hours"],
      description: "Inklyuziv korporativ tizimlar va portallarni ishlab chiqish uchun tajribali Frontend Developer qidirilmoqda. Ish 100% uydan amalga oshiriladi.",
      requirements: [
        "JavaScript, React.js va zamonaviy veb texnologiyalar",
        "Veb qulaylik (a11y) standartlari bilan ishlash",
        "Git va masofaviy jamoa bilan hamkorlik"
      ],
      benefits: [
        "Uyda ishlash uchun ergonomik noutbuk va jihozlar",
        "To'liq rasmiy mehnat shartnomasi va tibbiy sug'urta",
        "Doimiy malaka oshirish imkoniyatlari"
      ]
    },
    {
      id: 2,
      title: "React Developer",
      company: "Uzum Technologies",
      department: "engineering",
      location: "Toshkent",
      workType: "remote",
      salary: "14–22 mln so‘m",
      salaryNumeric: 18000000,
      experience: "2+ yil",
      employmentType: "To‘liq stavka",
      aiMatch: 96,
      matchReasons: [
        "TypeScript",
        "React",
        "Remote",
        "WCAG 2.1 AA tajribasi"
      ],
      skills: ["React", "TypeScript", "Remote", "Tailwind/CSS", "Redux"],
      featured: true,
      accommodations: [
        "100% Masofaviy ish (Full Remote)",
        "Ekran o'quvchi (Screen Reader) mos dasturlar",
        "Asinxron jamoa va moslashuvchan ish soatlari",
        "Ergonomik jihozlash granti"
      ],
      accommodationTypes: ["remote", "screen_reader", "flexible_hours"],
      description: "Uzum ekotizimi mahsulotlarini WCAG standartlariga to'liq mos keluvchi intuitiv interfeyslarini yaratish uchun React Developer taklif etiladi.",
      requirements: [
        "React.js, TypeScript va zamonaviy arxitektura",
        "Veb-accessibility tamoyillarini bilish",
        "Murakkab UI komponentlarini optimallashtirish"
      ],
      benefits: [
        "5,000,000 UZS gacha ish joyini ergonomik jihozlash granti",
        "To'liq tibbiy sug'urta va bepul ingliz tili darslari"
      ]
    },
    {
      id: 3,
      title: "Web Designer & UI/UX",
      company: "Payme FinTech",
      department: "design",
      location: "Toshkent",
      workType: "hybrid",
      salary: "10–18 mln so‘m",
      salaryNumeric: 14000000,
      experience: "1-2 yil",
      employmentType: "To‘liq stavka",
      aiMatch: 92,
      matchReasons: [
        "Figma",
        "Inklyuziv Dizayn",
        "Kontrast & Tipografiya"
      ],
      skills: ["Figma", "UI/UX", "Accessibility", "Design Systems"],
      featured: true,
      accommodations: [
        "Ofisda panduslar, avtomatik eshik va lift mavjud",
        "Maxsus rang ko'rligi monitorlari",
        "Haftada 3-4 kun uydan ishlash imkoniyati"
      ],
      accommodationTypes: ["physical_ramps", "remote", "flexible_hours"],
      description: "Moliya va to'lov ilovalarini nogironligi bor fuqarolar uchun qulay, chiroyli va qulay qilish ustida ishlovchi Web Designer kerak.",
      requirements: [
        "Figma vositasida prototiplash va dizayn tizimlari",
        "Yuqori kontrast va o'qiluvchanlik qoidalarini bilish",
        "Portfolio namunalari"
      ],
      benefits: [
        "Zamonaviy ergonomik ish stoli va texnika",
        "Xalqaro dizayn konferensiyalarida qatnashish imkoniyati"
      ]
    },
    {
      id: 4,
      title: "Mijozlarga Xizmat Ko'rsatish Mutaxassisi",
      company: "Beeline Uzbekistan",
      department: "support",
      location: "100% Masofaviy (Chat)",
      workType: "remote",
      salary: "6–10 mln so‘m",
      salaryNumeric: 8000000,
      experience: "Tajribasiz ham qabul qilinadi",
      employmentType: "Moslashuvchan grafik",
      aiMatch: 95,
      matchReasons: [
        "Faqat Matnli Chat",
        "Ovozli Qo'ng'iroqlarsiz",
        "Uydan Ishlash"
      ],
      skills: ["Online Chat", "O'zbek tili", "Rus tili", "Tezkor Matn"],
      featured: false,
      accommodations: [
        "Eshitishida imkoniyati cheklanganlar uchun 100% matnli aloqa",
        "Ovozli qo'ng'iroqlarsiz, faqat matnli chat tizimi",
        "4 soatlik yoki 8 soatlik qulay smenalar"
      ],
      accommodationTypes: ["hearing", "remote", "flexible_hours"],
      description: "Mijozlar savollariga onlayn chat orqali javob berish. Ovozli muloqot talab etilmaydi, eshitishida nuqsoni bor nomzodlar uchun juda qulay.",
      requirements: [
        "O'zbek va rus tillarida savodli yozma muloqot",
        "Kompyuterda tez matn terish qobiliyati",
        "Mijozlarga xushmuomala munosabat"
      ],
      benefits: [
        "Bepul noutbuk va tezyurar internet xarajati qoplab beriladi",
        "Rasmiy ish staji va barcha soliq imtiyozlari"
      ]
    },
    {
      id: 5,
      title: "QA Accessibility Tester",
      company: "EPAM Systems",
      department: "engineering",
      location: "Toshkent / Masofaviy",
      workType: "remote",
      salary: "11–17 mln so‘m",
      salaryNumeric: 14000000,
      experience: "6 oy - 1 yil",
      employmentType: "To‘liq stavka",
      aiMatch: 94,
      matchReasons: [
        "Screen Reader",
        "NVDA / JAWS",
        "WCAG 2.1 AA Audit"
      ],
      skills: ["QA Testing", "NVDA", "JAWS", "WCAG", "Bug Tracking"],
      featured: false,
      accommodations: [
        "Ekran o'quvchi dasturlari orqali to'liq testlash",
        "100% masofaviy xalqaro loyihalar",
        "Shaxsiy mentorlik ko'magi"
      ],
      accommodationTypes: ["screen_reader", "remote", "flexible_hours"],
      description: "Veb va mobil ilovalarni ekran o'quvchi vositalar orqali test qilish hamda accessibility kamchiliklarini qayd etish.",
      requirements: [
        "NVDA, JAWS yoki VoiceOver dan amaliy foydalanish tajribasi",
        "Dasturiy ta'minot testlash asoslari",
        "Boshlang'ich ingliz tili"
      ],
      benefits: [
        "EPAM xalqaro sertifikatlari",
        "Global jamoada ishlash tajribasi"
      ]
    },
    {
      id: 6,
      title: "Ma’lumotlar Kiritish & AI Operator",
      company: "IT Park Uzbekistan",
      department: "data",
      location: "100% Masofaviy",
      workType: "remote",
      salary: "5–8 mln so‘m",
      salaryNumeric: 6500000,
      experience: "Boshlang'ich",
      employmentType: "Moslashuvchan grafik",
      aiMatch: 93,
      matchReasons: [
        "Data Entry",
        "AI Annotation",
        "Masofaviy"
      ],
      skills: ["Excel", "Data Entry", "AI Labeling", "Diqqatlilik"],
      featured: false,
      accommodations: [
        "100% masofaviy ish",
        "Erkin grafik va kunlik vazifalar",
        "Oson o'rganiluvchi maxsus interfeys"
      ],
      accommodationTypes: ["remote", "hearing", "flexible_hours"],
      description: "Sun'iy intellekt modellarini o'rgatish uchun matnli va grafik ma'lumotlarni saralash hamda tizimga kiritish.",
      requirements: [
        "Boshlang'ich kompyuter savodxonligi",
        "Diqqatli va mas'uliyatli bo'lish",
        "O'zbek tilida savodli yozish"
      ],
      benefits: [
        "Bepul dastlabki o'qitish kursi",
        "Qulay kunlik grafik"
      ]
    },
    {
      id: 7,
      title: "Tarjimon & Kontent Kopirayter",
      company: "BMT Taraqqiyot Dasturi (UNDP)",
      department: "marketing",
      location: "Masofaviy",
      workType: "remote",
      salary: "9–15 mln so‘m",
      salaryNumeric: 12000000,
      experience: "1-2 yil",
      employmentType: "To‘liq stavka",
      aiMatch: 91,
      matchReasons: [
        "Ingliz tili",
        "O'zbek tili",
        "Kopirayting"
      ],
      skills: ["Translation", "Copywriting", "English", "Editing"],
      featured: false,
      accommodations: [
        "100% uydan ishlash",
        "Asinxron aloqa tizimi",
        "Ekran o'quvchi mos dasturlar"
      ],
      accommodationTypes: ["remote", "screen_reader", "hearing"],
      description: "Inklyuzivlik va ijtimoiy loyihalar bo'yicha maqolalar, hisobotlar va qo'llanmalarni o'zbek va ingliz tillariga professional tarjima qilish.",
      requirements: [
        "O'zbek va ingliz tillarini mukammal bilish (C1/B2)",
        "Matnlarni tahrirlash va moslashtirish ko'nikmasi"
      ],
      benefits: [
        "Xalqaro loyihalarda ishlash tajribasi",
        "Diplomatik va BMT sertifikatlari"
      ]
    },
    {
      id: 8,
      title: "Grafik Dizayner & Brending Mutaxassisi",
      company: "Uzum Technologies",
      department: "design",
      location: "Samarqand / Masofaviy",
      workType: "remote",
      salary: "9–14 mln so‘m",
      salaryNumeric: 11000000,
      experience: "1-2 yil",
      employmentType: "To‘liq stavka",
      aiMatch: 95,
      matchReasons: [
        "Figma",
        "Photoshop",
        "Masofaviy",
        "Inklyuziv Dizayn"
      ],
      skills: ["Figma", "Photoshop", "Illustrator", "Branding"],
      featured: false,
      accommodations: [
        "100% Masofaviy ish",
        "Moslashuvchan grafik",
        "Maxsus rang kalibrli uskunalar"
      ],
      accommodationTypes: ["remote", "flexible_hours"],
      description: "Samarqand va butun respublika bo'ylab masofadan brend dizayn elementlarini tayyorlash.",
      requirements: [
        "Figma, Adobe Illustrator dasturlarini mukammal bilish",
        "Zamonaviy ijtimoiy tarmoqlar vizuallarini yaratish",
        "Portfolio namunalari"
      ],
      benefits: [
        "Masofaviy ergonomik texnika granti",
        "Uzum xodimlari uchun korporativ chegirmalar"
      ]
    },
    {
      id: 9,
      title: "Onlayn Mijozlar Menejeri (Chat)",
      company: "Mohirdev Platformasi",
      department: "support",
      location: "Farg'ona",
      workType: "remote",
      salary: "6–9 mln so‘m",
      salaryNumeric: 7500000,
      experience: "Boshlang'ich",
      employmentType: "Moslashuvchan grafik",
      aiMatch: 93,
      matchReasons: [
        "Faqat Matnli Chat",
        "CRM",
        "Masofaviy"
      ],
      skills: ["CRM", "Online Chat", "O'zbek tili", "Yozma Aloqa"],
      featured: false,
      accommodations: [
        "Eshitish imkoniyati cheklanganlar uchun faqat chat",
        "100% masofaviy ishlash",
        "Moslashuvchan smena"
      ],
      accommodationTypes: ["hearing", "remote", "flexible_hours"],
      description: "Platforma foydalanuvchilariga matnli chat orqali texnik va o'quv yordami ko'rsatish.",
      requirements: [
        "O'zbek tilida bexato yozma nutq",
        "Tezkor yozish ko'nikmasi",
        "Do'stona muomala"
      ],
      benefits: [
        "Mohirdev barcha IT kurslariga bepul obuna",
        "Rasmiy ish staji va rag'batlantiruvchi bonuslar"
      ]
    },
    {
      id: 10,
      title: "Python & Data Operator",
      company: "IT Park Uzbekistan",
      department: "engineering",
      location: "Buxoro",
      workType: "remote",
      salary: "10–16 mln so‘m",
      salaryNumeric: 13000000,
      experience: "1-2 yil",
      employmentType: "To‘liq stavka",
      aiMatch: 92,
      matchReasons: [
        "Python",
        "SQL",
        "Masofaviy"
      ],
      skills: ["Python", "SQL", "Pandas", "Data Cleaning"],
      featured: false,
      accommodations: [
        "Ekran o'quvchi mos vositalar",
        "100% uydan ishlash",
        "Asinxron vazifalar"
      ],
      accommodationTypes: ["screen_reader", "remote", "flexible_hours"],
      description: "Hududiy IT loyihalari uchun ma'lumotlarni tahlil qilish va Python skriptlari orqali avtomatlashtirish.",
      requirements: [
        "Python dasturlash tili va SQL asoslari",
        "Ma'lumotlar bilan ishlash ko'nikmasi"
      ],
      benefits: [
        "IT Park rezidenti imtiyozlari",
        "Xalqaro IT sertifikatsiyalar xarajatlarini qoplash"
      ]
    },
    {
      id: 11,
      title: "SMM & Ijtimoiy Tarmoqlar Mutaxassisi",
      company: "Payme FinTech",
      department: "marketing",
      location: "Andijon",
      workType: "remote",
      salary: "8–13 mln so‘m",
      salaryNumeric: 10500000,
      experience: "1 yil",
      employmentType: "To‘liq stavka",
      aiMatch: 94,
      matchReasons: [
        "SMM",
        "Kopirayting",
        "Uydan Ishlash"
      ],
      skills: ["SMM", "Copywriting", "Telegram", "Instagram"],
      featured: false,
      accommodations: [
        "100% masofaviy ish",
        "Faqat matnli va asinxron aloqa",
        "Moslashuvchan ish soatlari"
      ],
      accommodationTypes: ["remote", "hearing", "flexible_hours"],
      description: "Payme inklyuziv moliyaviy xizmatlari haqida qiziqarli va sodda tilda kontent yaratish.",
      requirements: [
        "SMM va ijtimoiy tarmoqlar qonuniyatlarini tushunish",
        "O'zbek tilida kreativ matnlar yoza olish"
      ],
      benefits: [
        "Mobil aloqa va internet xarajatlari qoplanadi",
        "Erkin grafik"
      ]
    },
    {
      id: 12,
      title: "AI Kontent Tahlilchisi & Moderator",
      company: "IT Park Uzbekistan",
      department: "data",
      location: "Qoraqalpog'iston Respublikasi",
      workType: "remote",
      salary: "6–10 mln so‘m",
      salaryNumeric: 8000000,
      experience: "Boshlang'ich",
      employmentType: "Moslashuvchan grafik",
      aiMatch: 93,
      matchReasons: [
        "Data Moderation",
        "Masofaviy",
        "Qoraqalpoq & O'zbek tili"
      ],
      skills: ["Data Review", "O'zbek tili", "Qoraqalpoq tili", "Excel"],
      featured: false,
      accommodations: [
        "100% Masofaviy ish",
        "Erkin grafik",
        "Matnli instruksiyalar"
      ],
      accommodationTypes: ["remote", "hearing", "flexible_hours"],
      description: "Nukus va Qoraqalpog'iston hududidagi mutaxassislar uchun AI modellarining matn va media kontentlarini tekshirish.",
      requirements: [
        "Kompyuter savodxonligi",
        "O'zbek yoki qoraqalpoq tilida savodlilik"
      ],
      benefits: [
        "Bepul onlayn tayyorgarlik kursi",
        "Ish joyini jihozlash ko'magi"
      ]
    }
  ],

  // Candidates Showcase Database
  candidates: [
    {
      id: "cand-1",
      name: "Azizbek Saidov",
      title: "Senior Frontend & WCAG 2.1 AA Dasturchi",
      avatar: "AS",
      location: "Toshkent",
      expectedSalary: "16–22 mln so‘m",
      category: "engineering",
      aiScore: 98,
      bio: "4 yillik tajribaga ega Frontend dasturchi. React, TypeScript va WCAG qulaylik standartlari bo'yicha mutaxassis.",
      skills: ["JavaScript", "React", "TypeScript", "WCAG 2.1 AA", "Tailwind CSS", "Redux"],
      accommodations: ["100% Masofaviy ish", "Ekran o'quvchi mos vositalar", "Moslashuvchan grafik"],
      accommodationTypes: ["remote", "screen_reader", "flexible_hours"]
    },
    {
      id: "cand-2",
      name: "Gulnora Karimova",
      title: "UI/UX Dizayner & Inklyuzivlik Mutaxassisi",
      avatar: "GK",
      location: "Samarqand",
      expectedSalary: "12–16 mln so‘m",
      category: "design",
      aiScore: 96,
      bio: "Figma va dizayn tizimlari orqali yuqori kontrastli va qulay interfeyslar loyihalovchi dizayner.",
      skills: ["Figma", "UI/UX", "Accessibility", "Design Systems", "Prototyping"],
      accommodations: ["100% Masofaviy ish", "Moslashuvchan ish soatlari"],
      accommodationTypes: ["remote", "flexible_hours"]
    },
    {
      id: "cand-3",
      name: "Jasur Rahimov",
      title: "Mijozlarga Xizmat Ko'rsatish Operator (Matnli Chat)",
      avatar: "JR",
      location: "Farg'ona",
      expectedSalary: "7–10 mln so‘m",
      category: "support",
      aiScore: 94,
      bio: "Eshitishida nuqsoni bor, kompyuterda juda tez matn teradi (350+ belgi/daqiqada). Matnli chatda 2 yillik tajriba.",
      skills: ["Online Chat Support", "Tezkor Yozuv", "O'zbek tili", "Rus tili", "CRM"],
      accommodations: ["100% Matnli muloqot", "Ovozli qo'ng'iroqlarsiz", "Masofaviy ish"],
      accommodationTypes: ["hearing", "remote", "flexible_hours"]
    },
    {
      id: "cand-4",
      name: "Madina Umarova",
      title: "QA Accessibility Tester & Bug Hunter",
      avatar: "MU",
      location: "Buxoro",
      expectedSalary: "10–15 mln so‘m",
      category: "engineering",
      aiScore: 95,
      bio: "NVDA va JAWS ekran o'quvchilarida 3 yildan ortiq tajriba. Veb-saytlar va ilovalar qulayligini tekshirish bo'yicha ekspert.",
      skills: ["Screen Readers", "NVDA", "JAWS", "WCAG 2.1 AA", "Jira", "Manual QA"],
      accommodations: ["Ekran o'quvchi mos dasturlar", "100% Masofaviy ish"],
      accommodationTypes: ["screen_reader", "remote"]
    }
  ]
};
