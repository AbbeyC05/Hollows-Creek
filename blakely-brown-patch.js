(() => {
  const install = () => {
    if (typeof window.showFamily !== 'function' || typeof window.showResident !== 'function' || typeof window.showPage !== 'function' || !document.getElementById('beaumontFamily') || !document.getElementById('residentPlaceholder')) {
      setTimeout(install, 50);
      return;
    }

    if (!window.__blakelyBrownRoutingInstalled) {
      const originalShowFamily = window.showFamily;
      window.showFamily = function(name) {
        if (name === 'Blakely') return window.showPage('blakelyFamily');
        if (name === 'Brown') return window.showPage('brownFamily');
        return originalShowFamily(name);
      };

      const originalShowResident = window.showResident;
      window.showResident = function(name) {
        if (name === 'Daisy-Mae Blakely') return window.showPage('daisyMaeBlakelyProfile');
        if (name === 'Felix Brown') return window.showPage('felixBrownProfile');
        return originalShowResident(name);
      };
      window.__blakelyBrownRoutingInstalled = true;
    }

    if (!document.getElementById('blakelyFamily')) {
      const page = document.createElement('section');
      page.id = 'blakelyFamily';
      page.className = 'page';
      page.innerHTML = `
        <div class="family-title"><div class="crumb">Hollow's Creek → Families → Blakely</div><div class="subtitle">Family Profile</div><h2>The Blakely Family</h2></div>
        <main class="beaumont-shell">
          <div class="overview-grid">
            <article class="panel"><h3>Family Overview</h3><p>Very little is currently known about the Blakely family. They live on the Southside of Hollow's Creek. Their known daughter, Daisy-Mae Blakely, attends L. Beaumont Preparatory.</p></article>
            <aside class="panel"><div class="fact"><small>Family</small><strong>Blakely</strong></div><div class="fact"><small>Residence</small><strong>Southside, Hollow's Creek</strong></div><div class="fact"><small>Known member</small><strong>Daisy-Mae Blakely</strong></div></aside>
          </div>
          <section class="members"><h3>Known Family Members</h3><div class="member-grid"><button class="member-card" onclick="showResident('Daisy-Mae Blakely')"><span>Daisy-Mae Blakely</span><small>Daughter • profile available →</small></button></div></section>
          <button class="back" onclick="showPage('families')">← Back to Families</button>
        </main>`;
      document.getElementById('beaumontFamily').before(page);
    }

    if (!document.getElementById('brownFamily')) {
      const page = document.createElement('section');
      page.id = 'brownFamily';
      page.className = 'page';
      page.innerHTML = `
        <div class="family-title"><div class="crumb">Hollow's Creek → Families → Brown</div><div class="subtitle">Family Profile</div><h2>The Brown Family</h2></div>
        <main class="beaumont-shell">
          <div class="overview-grid">
            <article class="panel"><h3>Family Overview</h3><p>Most information about the Brown family is currently unknown. They live on the Southside of Hollow's Creek. Felix Brown is the only documented family member so far.</p></article>
            <aside class="panel"><div class="fact"><small>Family</small><strong>Brown</strong></div><div class="fact"><small>Residence</small><strong>Southside, Hollow's Creek</strong></div><div class="fact"><small>Known member</small><strong>Felix Brown</strong></div></aside>
          </div>
          <section class="members"><h3>Known Family Members</h3><div class="member-grid"><button class="member-card" onclick="showResident('Felix Brown')"><span>Felix Brown</span><small>Profile available →</small></button></div></section>
          <button class="back" onclick="showPage('families')">← Back to Families</button>
        </main>`;
      document.getElementById('beaumontFamily').before(page);
    }

    if (!document.getElementById('daisyMaeBlakelyProfile')) {
      const section = document.createElement('section');
      section.id = 'daisyMaeBlakelyProfile';
      section.className = 'page';
      section.innerHTML = `
        <div class="profile-head"><div class="crumb">Hollow's Creek → Residents → Blakely → Daisy-Mae</div><div class="aka">Blakely Family</div><h2>Daisy-Mae Blakely</h2></div>
        <main class="becca-profile">
          <div class="profile-grid">
            <aside class="bio-panel"><img class="profile-photo" src="daisy-mae-blakely-profile.png" alt="Daisy-Mae Blakely"><h3>Profile</h3><div class="bio-fact"><small>Born</small><strong>1980</strong></div><div class="bio-fact"><small>Birthplace</small><strong>Hollow's Creek</strong></div><div class="bio-fact"><small>Residence</small><strong>Southside, Hollow's Creek</strong></div><div class="bio-fact"><small>Species</small><strong>Human</strong></div><div class="bio-fact"><small>Boyfriend</small><strong class="person-link" onclick="showResident('Bradley Marcus Beaumont')">Bradley Beaumont</strong></div></aside>
            <article class="bio-panel"><h3>Education & Relationships</h3><div class="links-grid"><div class="linkbox"><small>School</small><div>L. Beaumont Preparatory</div></div><div class="linkbox person-link" onclick="showResident('Bradley Marcus Beaumont')"><small>Boyfriend</small><div>Bradley Beaumont</div></div></div></article>
          </div>
          <button class="back" onclick="showPage('blakelyFamily')">← Back to the Blakely Family</button>
        </main>`;
      document.getElementById('residentPlaceholder').before(section);
    }

    if (!document.getElementById('felixBrownProfile')) {
      const section = document.createElement('section');
      section.id = 'felixBrownProfile';
      section.className = 'page';
      section.innerHTML = `
        <div class="profile-head"><div class="crumb">Hollow's Creek → Residents → Brown → Felix</div><div class="aka">Brown Family</div><h2>Felix Brown</h2></div>
        <main class="becca-profile">
          <div class="profile-grid">
            <aside class="bio-panel"><img class="profile-photo" src="felix-brown-profile.png" alt="Felix Brown"><h3>Profile</h3><div class="bio-fact"><small>Born</small><strong>1980</strong></div><div class="bio-fact"><small>Birthplace</small><strong>Hollow's Creek</strong></div><div class="bio-fact"><small>Residence</small><strong>Southside, Hollow's Creek</strong></div><div class="bio-fact"><small>School</small><strong>Creekside High</strong></div><div class="bio-fact"><small>Girlfriend</small><strong>Poppy Carter</strong></div></aside>
            <article class="bio-panel"><h3>Friends</h3><div class="chips"><span class="chip">Samuel Sinclair</span><span class="chip">Harry Porter</span><span class="chip">David Jones</span><span class="chip">Joseph Miller</span><span class="chip">John Wilson</span><span class="chip">Clarke Hudson</span><span class="chip">Max Ford</span><span class="chip">Kasey Ford</span></div></article>
          </div>
          <button class="back" onclick="showPage('brownFamily')">← Back to the Brown Family</button>
        </main>`;
      document.getElementById('residentPlaceholder').before(section);
    }

    const blakelyButton = Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.includes('Blakely Family'));
    if (blakelyButton) blakelyButton.onclick = () => window.showPage('blakelyFamily');
    const brownButton = Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.includes('Brown Family'));
    if (brownButton) brownButton.onclick = () => window.showPage('brownFamily');

    const addResident = (sectionId, name) => {
      const section = document.getElementById(sectionId);
      if (!section) return;
      const list = section.querySelector('.resident-list');
      if (!list || list.querySelector(`[data-extra-resident="${name}"]`)) return;
      const btn = document.createElement('button');
      btn.className = 'resident-row';
      btn.dataset.extraResident = name;
      btn.onclick = () => window.showResident(name);
      btn.innerHTML = `<span>${name}</span><small>Profile available →</small>`;
      list.prepend(btn);
    };
    addResident('res-b', 'Daisy-Mae Blakely');
    addResident('res-b', 'Felix Brown');

    document.querySelectorAll('.chip, .linkbox, .bio-fact strong').forEach(el => {
      const t = el.textContent.trim();
      if (t.includes('Daisy-Mae Blakely')) { el.classList.add('person-link'); el.onclick = () => window.showResident('Daisy-Mae Blakely'); }
      if (t === 'Felix Brown') { el.classList.add('person-link'); el.onclick = () => window.showResident('Felix Brown'); }
    });
  };

  install();
})();
