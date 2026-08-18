(() => {
  const installCarterFamily = () => {
    if (typeof window.showFamily !== 'function' || typeof window.showPage !== 'function' || typeof window.showResident !== 'function' || !document.getElementById('beaumontFamily')) {
      setTimeout(installCarterFamily, 50);
      return;
    }

    if (!window.__carterFamilyRoutingInstalled) {
      const originalShowFamily = window.showFamily;
      window.showFamily = function(name) {
        if (name === 'Carter') return window.showPage('carterFamily');
        return originalShowFamily(name);
      };

      const originalShowResident = window.showResident;
      window.showResident = function(name) {
        if (name === 'Poppy Carter') return window.showPage('poppyCarterProfile');
        if (name === 'Georgia Carter') return window.showPage('georgiaCarterProfile');
        return originalShowResident(name);
      };
      window.__carterFamilyRoutingInstalled = true;
    }

    if (!document.getElementById('carterFamily')) {
      const page = document.createElement('section');
      page.id = 'carterFamily';
      page.className = 'page';
      page.innerHTML = `
        <div class="family-title">
          <div class="crumb">Hollow's Creek → Families → Carter</div>
          <div class="subtitle">Family Profile</div>
          <h2>The Carter Family</h2>
        </div>
        <main class="beaumont-shell">
          <div class="overview-grid">
            <article class="panel">
              <h3>Family Overview</h3>
              <p>Not much is currently known about the Carter family, though they are known to be a larger family living on the Southside of Hollow's Creek.</p>
              <p>The currently known members are cousins Poppy Carter and Georgia Carter. Both attend Creekside High.</p>
            </article>
            <aside class="panel">
              <div class="fact"><small>Family</small><strong>Carter</strong></div>
              <div class="fact"><small>Current residence</small><strong>Southside, Hollow's Creek</strong></div>
              <div class="fact"><small>Known members</small><strong>Poppy Carter &amp; Georgia Carter</strong></div>
              <div class="fact"><small>School</small><strong>Creekside High</strong></div>
            </aside>
          </div>
          <section class="members">
            <h3>Known Family Members</h3>
            <div class="member-grid">
              <button class="member-card" onclick="showResident('Poppy Carter')"><span>Poppy Carter</span><small>Cousin • view profile →</small></button>
              <button class="member-card" onclick="showResident('Georgia Carter')"><span>Georgia Carter</span><small>Cousin • view profile →</small></button>
            </div>
          </section>
          <button class="back" onclick="showPage('families')">← Back to Families</button>
        </main>`;
      document.getElementById('beaumontFamily').before(page);
    }

    const makeProfile = (id, name, image, facts, relationship, friends) => {
      if (document.getElementById(id)) return;
      const page = document.createElement('section');
      page.id = id;
      page.className = 'page';
      page.innerHTML = `
        <div class="profile-head">
          <div class="crumb">Hollow's Creek → Residents → ${name}</div>
          <div class="aka">Resident Profile</div>
          <h2>${name}</h2>
        </div>
        <main class="becca-profile">
          <div class="profile-grid">
            <div><img class="profile-photo" src="${image}" alt="${name}"></div>
            <article class="bio-panel"><h3>Profile</h3>${facts}</article>
          </div>
          <section class="profile-section"><h3>Relationship</h3><div class="chips"><span class="chip">${relationship}</span></div></section>
          <section class="profile-section"><h3>Friends &amp; Family</h3><div class="chips">${friends}</div></section>
          <button class="back" onclick="showPage('carterFamily')">← Back to Carter Family</button>
        </main>`;
      document.getElementById('beaumontFamily').before(page);
    };

    makeProfile('poppyCarterProfile','Poppy Carter','poppy-carter-profile.png','<div class="bio-fact"><small>Born</small><strong>1980</strong></div><div class="bio-fact"><small>Birthplace</small><strong>Hollow\'s Creek</strong></div><div class="bio-fact"><small>Residence</small><strong>Southside, Hollow\'s Creek</strong></div><div class="bio-fact"><small>Education</small><strong>Creekside High</strong></div>','Felix Brown — boyfriend','<span class="chip person-link" onclick="showResident(\'Georgia Carter\')">Georgia Carter — cousin &amp; friend</span><span class="chip">Piper Elswood — friend</span><span class="chip">Kasey Ford — friend</span>');
    makeProfile('georgiaCarterProfile','Georgia Carter','georgia-carter-profile.png','<div class="bio-fact"><small>Born</small><strong>1980</strong></div><div class="bio-fact"><small>Birthplace</small><strong>Hollow\'s Creek</strong></div><div class="bio-fact"><small>Residence</small><strong>Southside, Hollow\'s Creek</strong></div><div class="bio-fact"><small>Education</small><strong>Creekside High</strong></div>','Harry Porter — boyfriend','<span class="chip person-link" onclick="showResident(\'Poppy Carter\')">Poppy Carter — cousin &amp; friend</span><span class="chip">Piper Elswood — friend</span><span class="chip">Kasey Ford — friend</span>');

    const familyButton = Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.includes('Carter Family'));
    if (familyButton) familyButton.onclick = () => window.showPage('carterFamily');

    const residentsPage = document.getElementById('residents');
    const residentsWrap = residentsPage ? residentsPage.querySelector('.residents-wrap') : null;
    const bGroup = document.getElementById('res-b');
    const lGroup = document.getElementById('res-l');
    if (residentsWrap && bGroup) {
      let cGroup = document.getElementById('res-c');
      if (!cGroup) {
        cGroup = document.createElement('section');
        cGroup.className = 'letter-group';
        cGroup.id = 'res-c';
        cGroup.innerHTML = '<div class="letter">C</div><div class="resident-list"></div>';
        residentsWrap.insertBefore(cGroup, lGroup || bGroup.nextSibling);
      }

      const az = residentsWrap.querySelector('.az');
      if (az && !az.querySelector('a[href="#res-c"]')) {
        const link = document.createElement('a');
        link.href = '#res-c';
        link.textContent = 'C';
        const lLink = az.querySelector('a[href="#res-l"]');
        az.insertBefore(link, lLink || null);
      }

      const cResidents = cGroup.querySelector('.resident-list');
      ['Poppy Carter','Georgia Carter'].forEach(name => {
        document.querySelectorAll('.resident-row').forEach(btn => {
          const label = btn.querySelector('span');
          if (label && label.textContent.trim() === name) btn.remove();
        });
        const btn = document.createElement('button');
        btn.className = 'resident-row';
        btn.onclick = () => window.showResident(name);
        btn.innerHTML = `<span>${name}</span><small>Profile available →</small>`;
        cResidents.appendChild(btn);
      });
    }
  };

  installCarterFamily();
})();
