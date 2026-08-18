(() => {
  const installBardotFamily = () => {
    if (typeof window.showFamily !== 'function' || typeof window.showPage !== 'function' || !document.getElementById('beaumontFamily')) {
      setTimeout(installBardotFamily, 50);
      return;
    }

    if (!window.__bardotFamilyRoutingInstalled) {
      const originalShowFamily = window.showFamily;
      window.showFamily = function(name) {
        if (name === 'Bardot') return window.showPage('bardotFamily');
        return originalShowFamily(name);
      };
      window.__bardotFamilyRoutingInstalled = true;
    }

    if (!document.getElementById('bardotFamily')) {
      const page = document.createElement('section');
      page.id = 'bardotFamily';
      page.className = 'page';
      page.innerHTML = `
        <div class="family-title">
          <div class="crumb">Hollow's Creek → Families → Bardot</div>
          <div class="subtitle">Family Profile</div>
          <h2>The Bardot Family</h2>
        </div>
        <main class="beaumont-shell">
          <div class="overview-grid">
            <article class="panel">
              <h3>Family Overview</h3>
              <p>The Bardot family are originally from France and now live on the Southside of Hollow's Creek.</p>
              <p>Ella Monroe is the mother of Ruby Bardot and Kayla Monroe. Ruby and Kayla have different fathers, both of whom are currently unnamed. Ruby carries her father's surname, Bardot, while Kayla carries her mother's surname, Monroe.</p>
            </article>
            <aside class="panel">
              <div class="fact"><small>Family</small><strong>Bardot</strong></div>
              <div class="fact"><small>Current residence</small><strong>Southside, Hollow's Creek</strong></div>
              <div class="fact"><small>Originally from</small><strong>France</strong></div>
              <div class="fact"><small>Mother</small><strong>Ella Monroe</strong></div>
            </aside>
          </div>
          <section class="members">
            <h3>Family Members</h3>
            <div class="member-grid">
              <button class="member-card" onclick="showResident('Ella Monroe')"><span>Ella Monroe</span><small>Mother • profile to be built →</small></button>
              <button class="member-card" onclick="showResident('Ruby Bardot')"><span>Ruby Bardot</span><small>Daughter • profile to be built →</small></button>
              <button class="member-card" onclick="showResident('Kayla Monroe')"><span>Kayla Monroe</span><small>Daughter • profile to be built →</small></button>
            </div>
          </section>
          <button class="back" onclick="showPage('families')">← Back to Families</button>
        </main>`;
      document.getElementById('beaumontFamily').before(page);
    }

    const familyButton = Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.includes('Bardot Family'));
    if (familyButton) familyButton.onclick = () => window.showPage('bardotFamily');
  };

  installBardotFamily();
})();
