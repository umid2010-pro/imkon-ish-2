/**
 * "Imkon Ish" — Senior Enterprise Footer Component
 */

window.FooterComponent = {
  render() {
    const I = window.Icons;

    return `
      <footer class="site-footer" role="contentinfo">
        <div class="container">
          
          <div class="footer-grid">
            
            <!-- Brand Column -->
            <div>
              <div style="display:flex; align-items:center; gap:0.6rem; margin-bottom:1rem;">
                <div class="brand-logo-icon" style="width:36px; height:36px;">
                  ${I.get('accessibility', 20, '#ffffff', 2.5)}
                </div>
                <div style="font-size:1.25rem; font-weight:900; color:var(--primary);">Imkon Ish</div>
              </div>
              <p style="font-size:0.9rem; color:var(--text-secondary); line-height:1.6; margin-bottom:1.5rem;">
                Imkoniyati cheklangan insonlar uchun qulay, moslashtirilgan va zamonaviy ish platformasi.
              </p>
              <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                <span class="badge badge-green">
                  ${I.get('shieldCheck', 12, 'var(--primary)')}
                  <span>WCAG 2.1 Level AA</span>
                </span>
                <span class="badge badge-blue">
                  ${I.get('sparkles', 12, 'var(--secondary)')}
                  <span>BMT SDG 8 & 10</span>
                </span>
              </div>
            </div>

            <!-- Nomzodlarga -->
            <div>
              <h4 class="footer-heading">Nomzodlarga</h4>
              <ul class="footer-links">
                <li><a href="jobs.html" class="footer-link">Ishlar katalogi</a></li>
                <li><a href="dashboard.html" class="footer-link">AI CV Skaner</a></li>
                <li><a href="dashboard.html" class="footer-link">Intervyu trenajyori</a></li>
                <li><a href="chat.html" class="footer-link">AI Yordamchi chat</a></li>
                <li><a href="onboarding.html" class="footer-link">Profil yaratish</a></li>
              </ul>
            </div>

            <!-- Ish Beruvchilarga -->
            <div>
              <h4 class="footer-heading">Ish Beruvchilarga</h4>
              <ul class="footer-links">
                <li><a href="employers.html" class="footer-link">Hamkor kompaniyalar</a></li>
                <li><a href="employers.html" class="footer-link">1% Soliq imtiyozi ROI</a></li>
                <li><a href="employers.html" class="footer-link">Nomzodlar vitrinasi</a></li>
                <li><a href="about.html" class="footer-link">Inklyuzivlik auditi</a></li>
              </ul>
            </div>

            <!-- Standartlar & Qulaylik -->
            <div>
              <h4 class="footer-heading">Qulaylik & Tizim</h4>
              <ul class="footer-links">
                <li><a href="analytics.html" class="footer-link">Ijtimoiy ta'sir telemetriyasi</a></li>
                <li><a href="about.html" class="footer-link">WCAG 2.1 AA deklaratsiyasi</a></li>
                <li><a href="about.html" class="footer-link">Ekspertlar kengashi</a></li>
                <li><button type="button" class="footer-link" style="text-align:left; background:none; border:none; cursor:pointer;" onclick="window.App.openKeyboardShortcutsModal()">Klaviatura tugmalari (?)</button></li>
                <li><button type="button" class="footer-link" style="text-align:left; background:none; border:none; cursor:pointer;" onclick="window.a11y.toggleTTS()">Ovozli o‘qish</button></li>
              </ul>
            </div>

          </div>

          <!-- Bottom Copyright Bar -->
          <div style="border-top:1px solid var(--border-color); padding-top:2rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; font-size:0.85rem; color:var(--text-secondary);">
            <div>
              © 2026 Imkon Ish. Barcha huquqlar himoyalangan. O'zbekiston inklyuziv bandlik ekotizimi.
            </div>
            <div style="display:flex; align-items:center; gap:1rem;">
              <span class="badge badge-green" style="font-size:0.75rem;">
                ● Tizim holati: 100% Faol
              </span>
              <span>Clean Inclusive UI v2.5</span>
            </div>
          </div>

        </div>
      </footer>
    `;
  }
};
