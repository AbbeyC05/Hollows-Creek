(() => {
  const installMontaguePage = () => {
    if (typeof window.showFamily !== 'function' || typeof window.showPage !== 'function') {
      setTimeout(installMontaguePage, 25);
      return;
    }

    if (!window.__montagueFamilyRoutingInstalled) {
      const originalShowFamily = window.showFamily;
      window.showFamily = function(name) {
        if (name === 'Montague') {
          window.showPage('montagueFamily');
          return;
        }
        return originalShowFamily(name);
      };
      window.__montagueFamilyRoutingInstalled = true;
    }

    if (!document.getElementById('montagueFamily')) {
      const beaumont = document.getElementById('beaumontFamily');
      const page = document.createElement('section');
      page.id = 'montagueFamily';
      page.className = 'page';
      page.innerHTML = `
        <div class="family-title">
          <div class="crumb">Hollow's Creek → Families → Montague</div>
          <div class="subtitle">Family Profile</div>
          <h2>The Montague Family</h2>
        </div>
        <main class="beaumont-shell">
          <div class="overview-grid">
            <article class="panel">
              <h3>Family Overview</h3>
              <p>The Montague family live on the Northside of Hollow's Creek. Much of their wider family history is still being documented in the town archive.</p>
            </article>
            <aside class="panel">
              <div class="fact"><small>Family</small><strong>Montague</strong></div>
              <div class="fact"><small>Residence</small><strong>Hollow's Creek</strong></div>
              <div class="fact"><small>Area</small><strong>Northside</strong></div>
              <div class="fact"><small>Parents</small><strong>Thomas Marvolo Montague II &amp; Isabella Montague</strong></div>
            </aside>
          </div>
          <section class="members">
            <h3>Family Members</h3>
            <div class="member-grid">
              <button class="member-card" onclick="showResident('Thomas Marvolo Montague II')"><span>Thomas Marvolo Montague II</span><small>Father • profile to be built →</small></button>
              <button class="member-card" onclick="showResident('Isabella Montague')"><span>Isabella Montague</span><small>Mother • profile to be built →</small></button>
              <button class="member-card" onclick="showResident('Thomas Marvolo Montague III')"><span>Thomas Marvolo Montague III</span><small>Profile to be built →</small></button>
              <button class="member-card" onclick="showResident('Claribel Montague')"><span>Claribel Montague</span><small>Profile to be built →</small></button>
              <button class="member-card" onclick="showResident('Mattheo Thomas Marvolo Montague')"><span>Mattheo Thomas Marvolo Montague</span><small>Profile to be built →</small></button>
              <button class="member-card" onclick="showResident('Alexandria Jade Montague')"><span>Alexandria Jade Montague</span><small>Profile to be built →</small></button>
              <button class="member-card" onclick="showResident('Delphini Violet Montague')"><span>Delphini Violet Montague</span><small>Profile to be built →</small></button>
            </div>
          </section>
          <button class="back" onclick="showPage('families')">← Back to Families</button>
        </main>`;
      if (beaumont) beaumont.before(page);
      else document.body.appendChild(page);
    }
  };

  installMontaguePage();
})();
