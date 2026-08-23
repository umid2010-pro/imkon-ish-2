/**
 * "Imkon Ish" — Senior About, Governance & WCAG 2.1 AA Compliance Component
 */

window.AboutComponent = {
  render() {
    const data = window.APP_DATA;
    const I = window.Icons;

    return `
      <section class="section-spacing container" aria-labelledby="about-title" style="padding-top:2rem;">
        
        <!-- Header -->
        <div style="text-align:center; max-width:760px; margin:0 auto 3.5rem;">
          <span class="badge badge-green" style="margin-bottom:0.75rem;">
            ${I.get('shieldCheck', 14, 'var(--primary)')}
            <span>WCAG 2.1 Level AA Standartlari</span>
          </span>
          <h1 id="about-title" style="font-size:2.6rem; margin-bottom:1rem;">
            To'siqsiz Raqamli Dunyo va Inklyuziv Kelajak
          </h1>
          <p style="color:var(--text-secondary); font-size:1.15rem; line-height:1.65;">
            "Imkon Ish" — O'zbekiston Respublikasida imkoniyati cheklangan insonlarning mehnat huquqlarini ta'minlash va sun'iy intellekt orqali to'siqsiz ish o'rinlarini yaratuvchi milliy inklyuziv ish platformasidir.
          </p>
        </div>

        <!-- WCAG 2.1 AA Compliance Matrix Cards -->
        <div class="card" style="padding:2.5rem; margin-bottom:4rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2rem; flex-wrap:wrap; gap:1rem;">
            <div>
              <h2 style="font-size:1.6rem; margin:0 0 0.25rem 0;">WCAG 2.1 Level AA Raqamli Qulaylik Prinsiplari</h2>
              <div style="font-size:0.875rem; color:var(--primary); font-weight:700;">✓ Xalqaro W3C Web Accessibility Initiative Yo'riqnomasi Asosida</div>
            </div>
            <span class="badge badge-green">100% WCAG 2.1 AA</span>
          </div>

          <div class="grid-2" style="gap:1.5rem;">
            
            <div style="background:var(--bg-subtle); border:1px solid var(--border-color); border-radius:var(--radius-lg); padding:1.5rem;">
              <div style="display:flex; align-items:center; gap:0.5rem; font-weight:800; font-size:1.1rem; color:var(--text-main); margin-bottom:0.5rem;">
                ${I.get('checkCircle2', 18, 'var(--primary)')}
                <span>1. Idrok Etiluvchanlik (Perceivable)</span>
              </div>
              <p style="font-size:0.9rem; color:var(--text-secondary); line-height:1.55; margin:0;">
                Barcha rasmlar va elementlar uchun matnli alternativlar, 16:1 yuqori kontrast sariq-qora rejimi va Web Speech TTS ovozli o'quvchi.
              </p>
            </div>

            <div style="background:var(--bg-subtle); border:1px solid var(--border-color); border-radius:var(--radius-lg); padding:1.5rem;">
              <div style="display:flex; align-items:center; gap:0.5rem; font-weight:800; font-size:1.1rem; color:var(--text-main); margin-bottom:0.5rem;">
                ${I.get('checkCircle2', 18, 'var(--primary)')}
                <span>2. Boshqariluvchanlik (Operable)</span>
              </div>
              <p style="font-size:0.9rem; color:var(--text-secondary); line-height:1.55; margin:0;">
                Barcha funksiyalarning klaviatura orqali (Tab, Shift+Tab, Esc, ?) boshqarilishi, 'Skip to content' va aniq fokus ramkasi.
              </p>
            </div>

            <div style="background:var(--bg-subtle); border:1px solid var(--border-color); border-radius:var(--radius-lg); padding:1.5rem;">
              <div style="display:flex; align-items:center; gap:0.5rem; font-weight:800; font-size:1.1rem; color:var(--text-main); margin-bottom:0.5rem;">
                ${I.get('checkCircle2', 18, 'var(--primary)')}
                <span>3. Tushunarlilik (Understandable)</span>
              </div>
              <p style="font-size:0.9rem; color:var(--text-secondary); line-height:1.55; margin:0;">
                Atkinson Hyperlegible disleksiya shrifti, qat'iy tipografiya ierarxiyasi va aniq interfeys xabarlari.
              </p>
            </div>

            <div style="background:var(--bg-subtle); border:1px solid var(--border-color); border-radius:var(--radius-lg); padding:1.5rem;">
              <div style="display:flex; align-items:center; gap:0.5rem; font-weight:800; font-size:1.1rem; color:var(--text-main); margin-bottom:0.5rem;">
                ${I.get('checkCircle2', 18, 'var(--primary)')}
                <span>4. Mustahkamlik (Robust)</span>
              </div>
              <p style="font-size:0.9rem; color:var(--text-secondary); line-height:1.55; margin:0;">
                Semantik HTML5 teglari, to'liq ARIA atributlari va NVDA, JAWS, VoiceOver ekran o'quvchilari bilan 100% moslik.
              </p>
            </div>

          </div>
        </div>

        <!-- Advisory Board -->
        <div style="text-align:center; max-width:700px; margin:0 auto 2.5rem;">
          <h2 style="font-size:2rem; margin-bottom:0.5rem;">Ekspert Maslahatchilar Kengashi</h2>
          <p style="color:var(--text-secondary);">Loyihamiz soha mutaxassislari va surdotarjimonlar bilan hamkorlikda ishlab chiqilgan.</p>
        </div>

        <div class="grid-3" style="margin-bottom:3.5rem;">
          <div class="card" style="text-align:center;">
            <div style="width:58px; height:58px; border-radius:50%; background:var(--primary-light); color:var(--primary); font-weight:900; font-size:1.2rem; display:flex; align-items:center; justify-content:center; margin:0 auto 1rem;">
              AS
            </div>
            <h3 style="font-size:1.15rem; margin-bottom:0.25rem;">Azizbek Saidov</h3>
            <div style="font-size:0.8rem; color:var(--primary); font-weight:700; margin-bottom:0.75rem;">Bosh Accessibility Eksperti</div>
            <p style="font-size:0.875rem; color:var(--text-secondary); line-height:1.5;">WCAG 2.1 AA standartlari va AI modellarini inklyuzivlikka moslashtirish bo'yicha mutaxassis.</p>
          </div>

          <div class="card" style="text-align:center;">
            <div style="width:58px; height:58px; border-radius:50%; background:var(--secondary-light); color:var(--secondary); font-weight:900; font-size:1.2rem; display:flex; align-items:center; justify-content:center; margin:0 auto 1rem;">
              DA
            </div>
            <h3 style="font-size:1.15rem; margin-bottom:0.25rem;">Dilshod Aliyev</h3>
            <div style="font-size:0.8rem; color:var(--secondary); font-weight:700; margin-bottom:0.75rem;">Oliy Toifali Surdotarjimon</div>
            <p style="font-size:0.875rem; color:var(--text-secondary); line-height:1.5;">Eshitishida nuqsoni bor shaxslar uchun muloqot va Imo-ishora tili bo'yicha yetakchi maslahatchi.</p>
          </div>

          <div class="card" style="text-align:center;">
            <div style="width:58px; height:58px; border-radius:50%; background:var(--accent-light); color:#B45309; font-weight:900; font-size:1.2rem; display:flex; align-items:center; justify-content:center; margin:0 auto 1rem;">
              NK
            </div>
            <h3 style="font-size:1.15rem; margin-bottom:0.25rem;">Nilufar Karimova</h3>
            <div style="font-size:0.8rem; color:#B45309; font-weight:700; margin-bottom:0.75rem;">HR & Inklyuzivlik Maslahatchisi</div>
            <p style="font-size:0.875rem; color:var(--text-secondary); line-height:1.5;">Yirik korxonalarda inklyuziv ish o'rinlarini tashkil etish va ergonomik audit eksperti.</p>
          </div>
        </div>

      </section>
    `;
  }
};
