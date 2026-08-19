(() => {
  const install = () => {
    if (typeof window.showFamily !== 'function' || typeof window.showPage !== 'function' || typeof window.showResident !== 'function' || !document.getElementById('beaumontFamily')) {
      setTimeout(install, 60);
      return;
    }

    const residentId = 'resident-levi-lepton';
    if (!document.getElementById(residentId)) {
      const section = document.createElement('section');
      section.id = residentId;
      section.className = 'page';
      section.innerHTML = `
        <div class="family-title"><div class="crumb">Hollow's Creek → Residents → Levi Lepton</div><div class="subtitle">Resident Profile</div><h2>Levi Lepton</h2></div>
        <main class="beaumont-shell">
          <div class="profile-layout">
            <aside class="profile-photo"><img src="levi-lepton-profile.png" alt="Levi Lepton"></aside>
            <article class="panel"><h3>Profile</h3>
              <div class="fact"><small>Birthday</small><strong>19/03/1978</strong></div>
              <div class="fact"><small>Birthplace</small><strong>Hollow's Creek</strong></div>
              <div class="fact"><small>Residence</small><strong>Southside, Hollow's Creek</strong></div>
              <div class="fact"><small>Species</small><strong>Human</strong></div>
              <div class="fact"><small>School</small><strong>L. Beaumont Preparatory</strong></div>
              <div class="fact"><small>Girlfriend</small><strong><button class="inline-link" onclick="showResident('Emma Ryder')">Emma Ryder</button></strong></div>
              <div class="fact"><small>Best friend</small><strong><button class="inline-link" onclick="showResident('Benjamin Davis')">Benjamin Davis</button></strong></div>
            </article>
          </div>
          <button class="back" onclick="showPage('residents')">← Back to Residents</button>
        </main>`;
      document.getElementById('beaumontFamily').before(section);
    }

    if (!window.__leptonResidentRouting) {
      const oldResident = window.showResident;
      window.showResident = function(name) {
        if (name === 'Levi Lepton') return window.showPage(residentId);
        return oldResident(name);
      };
      window.__leptonResidentRouting = true;
    }

    if (!document.getElementById('leptonFamily')) {
      const family = document.createElement('section');
      family.id = 'leptonFamily';
      family.className = 'page';
      family.innerHTML = `
        <div class="family-title"><div class="crumb">Hollow's Creek → Families → Lepton</div><div class="subtitle">Family Profile</div><h2>The Lepton Family</h2></div>
        <main class="beaumont-shell">
          <div class="overview-grid">
            <article class="panel"><h3>Family Overview</h3><p>The Lepton family are a largely unknown family from the Southside of Hollow's Creek. The only currently known member of the family is Levi Lepton.</p></article>
            <aside class="panel"><div class="fact"><small>Residence</small><strong>Southside, Hollow's Creek</strong></div><div class="fact"><small>Known members</small><strong>Levi Lepton</strong></div></aside>
          </div>
          <section class="members"><h3>Known Family Members</h3><div class="member-grid"><button class="member-card" onclick="showResident('Levi Lepton')"><span>Levi Lepton</span><small>View profile →</small></button></div></section>
          <button class="back" onclick="showPage('families')">← Back to Families</button>
        </main>`;
      document.getElementById('beaumontFamily').before(family);
    }

    if (!window.__leptonFamilyRouting) {
      const oldFamily = window.showFamily;
      window.showFamily = function(name) {
        if (name === 'Lepton') return window.showPage('leptonFamily');
        return oldFamily(name);
      };
      window.__leptonFamilyRouting = true;
    }

    const familyPage = document.getElementById('families');
    if (familyPage && ![...familyPage.querySelectorAll('button')].some(b => b.textContent.includes('Lepton Family'))) {
      const grid = [...familyPage.querySelectorAll('.family-grid,.member-grid,.resident-grid,.directory-grid')].pop() || familyPage.querySelector('main');
      if (grid) {
        const btn = document.createElement('button');
        btn.className = 'member-card';
        btn.onclick = () => showFamily('Lepton');
        btn.innerHTML = '<span>Lepton Family</span><small>View family →</small>';
        grid.appendChild(btn);
      }
    }

    const residents = document.getElementById('residents');
    const wrap = residents && residents.querySelector('.residents-wrap');
    if (wrap) {
      wrap.querySelectorAll('.resident-row').forEach(row => {
        const span = row.querySelector('span');
        if (span && span.textContent.trim() === 'Levi Lepton') row.remove();
      });
      let group = document.getElementById('res-l');
      if (!group) {
        group = document.createElement('section');
        group.className = 'letter-group';
        group.id = 'res-l';
        group.innerHTML = '<div class="letter">L</div><div class="resident-list"></div>';
        wrap.appendChild(group);
      }
      const list = group.querySelector('.resident-list');
      if (list) {
        const btn = document.createElement('button');
        btn.className = 'resident-row';
        btn.onclick = () => window.showResident('Levi Lepton');
        btn.innerHTML = '<span>Levi Lepton</span><small>Profile available →</small>';
        list.appendChild(btn);
      }
    }
  };

  install();
})();