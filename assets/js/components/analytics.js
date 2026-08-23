/**
 * "Imkon Ish" — Senior UN SDG Impact Telemetry & Economic Analytics Component
 */

window.AnalyticsComponent = {
  render() {
    const data = window.APP_DATA;
    const I = window.Icons;

    return `
      <section class="section-spacing container" aria-labelledby="analytics-title" style="padding-top:2rem;">
        
        <!-- Header -->
        <div style="text-align:center; max-width:760px; margin:0 auto 3.5rem;">
          <div style="display:inline-flex; align-items:center; gap:0.5rem; margin-bottom:0.75rem;">
            <span class="badge badge-green">
              ${I.get('trendingUp', 14, 'var(--primary)')}
              <span>BMT SDG 8 & 10 Standartlari</span>
            </span>
          </div>
          <h1 id="analytics-title" style="font-size:2.6rem; margin-bottom:1rem;">
            Ijtimoiy-Iqtisodiy Ta'sir Telemetriyasi
          </h1>
          <p style="color:var(--text-secondary); font-size:1.15rem; line-height:1.65;">
            Har bir inklyuziv ish o'rni — bu inson qadr-qimmati, iqtisodiy mustaqillik va jamiyatdagi teng imkoniyatlar sari qadamdir.
          </p>
        </div>

        <!-- 4 Top Impact KPI Cards -->
        <div class="grid-4" style="margin-bottom:3.5rem;">
          
          <div class="card" style="text-align:center;">
            <div style="width:46px; height:46px; border-radius:var(--radius-md); background:var(--primary-light); color:var(--primary); display:flex; align-items:center; justify-content:center; margin:0 auto 1rem;">
              ${I.get('users', 22)}
            </div>
            <div style="font-size:2.4rem; font-weight:900; color:var(--primary); line-height:1; margin-bottom:0.35rem;">1,420+</div>
            <div style="font-weight:700; font-size:0.95rem; color:var(--text-main); margin-bottom:0.25rem;">Band bo'lgan nomzodlar</div>
            <div style="font-size:0.8rem; color:var(--text-secondary);">Rasmiy shartnoma bilan ta'minlangan</div>
          </div>

          <div class="card" style="text-align:center;">
            <div style="width:46px; height:46px; border-radius:var(--radius-md); background:var(--secondary-light); color:var(--secondary); display:flex; align-items:center; justify-content:center; margin:0 auto 1rem;">
              ${I.get('dollarSign', 22)}
            </div>
            <div style="font-size:2.4rem; font-weight:900; color:var(--secondary); line-height:1; margin-bottom:0.35rem;">48.5 mlrd</div>
            <div style="font-weight:700; font-size:0.95rem; color:var(--text-main); margin-bottom:0.25rem;">Yaratilgan yalpi qiymat</div>
            <div style="font-size:0.8rem; color:var(--text-secondary);">Nomzodlar umumiy daromadi (UZS)</div>
          </div>

          <div class="card" style="text-align:center;">
            <div style="width:46px; height:46px; border-radius:var(--radius-md); background:var(--primary-light); color:var(--primary); display:flex; align-items:center; justify-content:center; margin:0 auto 1rem;">
              ${I.get('building', 22)}
            </div>
            <div style="font-size:2.4rem; font-weight:900; color:var(--primary); line-height:1; margin-bottom:0.35rem;">86+</div>
            <div style="font-weight:700; font-size:0.95rem; color:var(--text-main); margin-bottom:0.25rem;">Hamkor kompaniyalar</div>
            <div style="font-size:0.8rem; color:var(--text-secondary);">Sertifikatlangan ish beruvchilar</div>
          </div>

          <div class="card" style="text-align:center;">
            <div style="width:46px; height:46px; border-radius:var(--radius-md); background:var(--accent-light); color:#B45309; display:flex; align-items:center; justify-content:center; margin:0 auto 1rem;">
              ${I.get('award', 22)}
            </div>
            <div style="font-size:2.4rem; font-weight:900; color:var(--accent); line-height:1; margin-bottom:0.35rem;">940+</div>
            <div style="font-weight:700; font-size:0.95rem; color:var(--text-main); margin-bottom:0.25rem;">Moslashtirilgan ish joyi</div>
            <div style="font-size:0.8rem; color:var(--text-secondary);">Ergonomik jihozlar bilan</div>
          </div>

        </div>

        <!-- UN SDG 8 & 10 Progress Grid -->
        <div class="grid-2" style="margin-bottom:3.5rem;">
          
          <!-- SDG 8 -->
          <div class="card">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
              <div>
                <span class="badge badge-green" style="margin-bottom:0.35rem;">SDG 8: Munosib Mehnat</span>
                <h3 style="font-size:1.25rem; margin:0;">Iqtisodiy Faollik va Bandlik O'sishi</h3>
              </div>
              <div style="font-size:1.85rem; font-weight:900; color:var(--primary);">+42%</div>
            </div>
            <p style="font-size:0.9rem; color:var(--text-secondary); line-height:1.55; margin-bottom:1.5rem;">
              Ishga joylashgan fuqarolarning 88% i uzoq muddatli (1 yildan ortiq) barqaror mehnat shartnomasiga ega bo'ldi.
            </p>
            <div style="display:flex; flex-direction:column; gap:0.85rem;">
              <div>
                <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:700; margin-bottom:0.3rem;">
                  <span>Masofaviy IT va Dasturlash</span>
                  <span style="color:var(--primary);">58%</span>
                </div>
                <div style="background:var(--bg-subtle); height:8px; border-radius:4px; overflow:hidden;">
                  <div style="background:var(--primary); width:58%; height:100%;"></div>
                </div>
              </div>
              <div>
                <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:700; margin-bottom:0.3rem;">
                  <span>Mijozlar bilan Aloqa & Chat</span>
                  <span style="color:var(--secondary);">24%</span>
                </div>
                <div style="background:var(--bg-subtle); height:8px; border-radius:4px; overflow:hidden;">
                  <div style="background:var(--secondary); width:24%; height:100%;"></div>
                </div>
              </div>
              <div>
                <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:700; margin-bottom:0.3rem;">
                  <span>Dizayn & Kontent Menejment</span>
                  <span style="color:var(--accent);">18%</span>
                </div>
                <div style="background:var(--bg-subtle); height:8px; border-radius:4px; overflow:hidden;">
                  <div style="background:var(--accent); width:18%; height:100%;"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- SDG 10 -->
          <div class="card">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
              <div>
                <span class="badge badge-blue" style="margin-bottom:0.35rem;">SDG 10: Tengsizlikni Kamaytirish</span>
                <h3 style="font-size:1.25rem; margin:0;">Hududlar Bo'yicha Qamrov</h3>
              </div>
              <div style="font-size:1.85rem; font-weight:900; color:var(--secondary);">14/14</div>
            </div>
            <p style="font-size:0.9rem; color:var(--text-secondary); line-height:1.55; margin-bottom:1.5rem;">
              O'zbekistonning barcha 14 ta hududi va Qoraqalpog'iston Respublikasidan mutaxassislar 100% masofaviy ishlash imkoniyatiga ega.
            </p>
            <div style="display:flex; flex-direction:column; gap:0.85rem;">
              <div>
                <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:700; margin-bottom:0.3rem;">
                  <span>Toshkent shahri & viloyati</span>
                  <span style="color:var(--secondary);">34%</span>
                </div>
                <div style="background:var(--bg-subtle); height:8px; border-radius:4px; overflow:hidden;">
                  <div style="background:var(--secondary); width:34%; height:100%;"></div>
                </div>
              </div>
              <div>
                <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:700; margin-bottom:0.3rem;">
                  <span>Farg'ona vodiysi viloyatlari</span>
                  <span style="color:var(--primary);">28%</span>
                </div>
                <div style="background:var(--bg-subtle); height:8px; border-radius:4px; overflow:hidden;">
                  <div style="background:var(--primary); width:28%; height:100%;"></div>
                </div>
              </div>
              <div>
                <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:700; margin-bottom:0.3rem;">
                  <span>Samarqand, Buxoro & boshqa viloyatlar</span>
                  <span style="color:var(--accent);">38%</span>
                </div>
                <div style="background:var(--bg-subtle); height:8px; border-radius:4px; overflow:hidden;">
                  <div style="background:var(--accent); width:38%; height:100%;"></div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </section>
    `;
  }
};
