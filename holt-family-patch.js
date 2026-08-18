(() => {
  const installHoltFamily = () => {
    if (typeof window.showFamily !== 'function' || typeof window.showPage !== 'function' || !document.getElementById('beaumontFamily')) {
      setTimeout(installHoltFamily, 50);
      return;
    }

    if (!window.__holtFamilyRoutingInstalled) {
      const originalShowFamily = window.showFamily;
      window.showFamily = function(name) {
        if (name === 'Holt') return window.showPage('holtFamily');
        return originalShowFamily(name);
      };
      window.__holtFamilyRoutingInstalled = true;
    }

    if (!document.getElementById('holtFamily')) {
      const page = document.createElement('section');
      page.id = 'holtFamily';
      page.className = 'page';
      page.innerHTML = `
        <div class="family-title">
          <div class="crumb">Hollow's Creek → Families → Holt</div>
          <div class="subtitle">Family Profile</div>
          <h2>The Holt Family</h2>
        </div>
        <main class="beaumont-shell">
          <div class="overview-grid">
            <article class="panel">
              <h3>Family Overview</h3>
              <p>The Holt family originally lived in Rome, Italy, and now live on the Northside of Hollow's Creek.</p>
              <p>Christina Holt died in childbirth with Phoebe, but was resurrected in 1995.</p>
            </article>
            <aside class="panel">
              <div class="fact"><small>Family</small><strong>Holt</strong></div>
              <div class="fact"><small>Current residence</small><strong>Northside, Hollow's Creek</strong></div>
              <div class="fact"><small>Originally lived</small><strong>Rome, Italy</strong></div>
              <div class="fact"><small>Parents</small><strong>Theodore Alexander Holt III &amp; Christina Holt (née Reid)</strong></div>
            </aside>
          </div>
          <section class="members">
            <h3>Family Members</h3>
            <div class="member-grid">
              <button class="member-card" onclick="showResident('Theodore Alexander Holt III')"><span>Theodore Alexander Holt III</span><small>Father • profile to be built →</small></button>
              <button class="member-card" onclick="showResident('Christina Holt')"><span>Christina Holt (née Reid)</span><small>Mother • profile to be built →</small></button>
              <button class="member-card" onclick="showResident('Jamie Holt')"><span>Jamie Holt</span><small>Profile to be built →</small></button>
              <button class="member-card" onclick="showResident('Theodore Alexander Holt IV')"><span>Theodore Alexander Holt IV</span><small>Profile to be built →</small></button>
              <button class="member-card" onclick="showResident('Phoebe Holt')"><span>Phoebe Holt</span><small>Profile to be built →</small></button>
            </div>
          </section>
          <button class="back" onclick="showPage('families')">← Back to Families</button>
        </main>`;
      document.getElementById('beaumontFamily').before(page);
    }

    const familyButton = Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.includes('Holt Family'));
    if (familyButton) familyButton.onclick = () => window.showPage('holtFamily');
  };

  installHoltFamily();
})();
