(() => {
  const people = {
    'Thomas Marvolo Montague II': 'thomasMontagueIIProfile',
    'Isabella Montague': 'isabellaMontagueProfile',
    'Thomas Marvolo Montague III': 'thomasMontagueIIIProfile',
    'Claribel Montague': 'claribelMontagueProfile',
    'Mattheo Thomas Marvolo Montague': 'mattheoMontagueProfile'
  };

  const extendedFamily = `
    <span class="chip">Caleb Whitmore</span><span class="chip">Hannah Whitmore</span><span class="chip">Tony Whitmore</span><span class="chip">Lorenzo Whitmore</span><span class="chip">Tate Whitmore</span><span class="chip">Lexie Whitmore</span><span class="chip">Regulus White</span><span class="chip">Evan Rowan</span><span class="chip">Evan Rowan Jr</span>`;

  const install = () => {
    if (typeof window.showFamily !== 'function' || typeof window.showResident !== 'function' || typeof window.showPage !== 'function' || !document.getElementById('beaumontFamily')) {
      setTimeout(install, 25);
      return;
    }

    if (!window.__montagueRoutingInstalled) {
      const originalShowFamily = window.showFamily;
      window.showFamily = function(name) {
        if (name === 'Montague') return window.showPage('montagueFamily');
        return originalShowFamily(name);
      };

      const originalShowResident = window.showResident;
      window.showResident = function(name) {
        if (people[name]) return window.showPage(people[name]);
        return originalShowResident(name);
      };
      window.__montagueRoutingInstalled = true;
    }

    if (!document.getElementById('montagueFamily')) {
      const page = document.createElement('section');
      page.id = 'montagueFamily';
      page.className = 'page';
      page.innerHTML = `
        <div class="family-title"><div class="crumb">Hollow's Creek → Families → Montague</div><div class="subtitle">Family Profile</div><h2>The Montague Family</h2></div>
        <main class="beaumont-shell">
          <div class="overview-grid">
            <article class="panel"><h3>Family Overview</h3><p>The Montague family live on the Northside of Hollow's Creek. Much of their wider family history is still being documented in the town archive.</p></article>
            <aside class="panel"><div class="fact"><small>Family</small><strong>Montague</strong></div><div class="fact"><small>Residence</small><strong>Hollow's Creek</strong></div><div class="fact"><small>Area</small><strong>Northside</strong></div><div class="fact"><small>Parents</small><strong>Thomas Marvolo Montague II &amp; Isabella Montague</strong></div></aside>
          </div>
          <section class="members"><h3>Family Members</h3><div class="member-grid">
            <button class="member-card" onclick="showResident('Thomas Marvolo Montague II')"><span>Thomas Marvolo Montague II</span><small>Father • profile available →</small></button>
            <button class="member-card" onclick="showResident('Isabella Montague')"><span>Isabella Montague</span><small>Mother • profile available →</small></button>
            <button class="member-card" onclick="showResident('Thomas Marvolo Montague III')"><span>Thomas Marvolo Montague III</span><small>Profile available →</small></button>
            <button class="member-card" onclick="showResident('Claribel Montague')"><span>Claribel Montague</span><small>Profile available →</small></button>
            <button class="member-card" onclick="showResident('Mattheo Thomas Marvolo Montague')"><span>Mattheo Thomas Marvolo Montague</span><small>Profile available →</small></button>
            <button class="member-card" onclick="showResident('Alexandria Jade Montague')"><span>Alexandria Jade Montague</span><small>Profile to be built →</small></button>
            <button class="member-card" onclick="showResident('Delphini Violet Montague')"><span>Delphini Violet Montague</span><small>Profile to be built →</small></button>
          </div></section>
          <button class="back" onclick="showPage('families')">← Back to Families</button>
        </main>`;
      document.getElementById('beaumontFamily').before(page);
    }

    const profiles = [
      ['thomasMontagueIIProfile', `
        <div class="profile-head"><div class="crumb">Hollow's Creek → Residents → Montague → Thomas II</div><div class="aka">Montague Family</div><h2>Thomas Marvolo Montague II</h2></div>
        <main class="becca-profile"><div class="profile-grid">
          <aside class="bio-panel"><img class="profile-photo" src="thomas-montague-ii-profile.png" alt="Thomas Marvolo Montague II"><h3>Profile</h3><div class="bio-fact"><small>Birthplace</small><strong>England</strong></div><div class="bio-fact"><small>Residence</small><strong>Northside, Hollow's Creek</strong></div><div class="bio-fact"><small>Species</small><strong>Human</strong></div><div class="bio-fact"><small>Wife</small><strong class="person-link" onclick="showResident('Isabella Montague')">Isabella Montague</strong></div></aside>
          <article class="bio-panel"><h3>Family</h3><div class="links-grid"><div class="linkbox"><small>Father</small><div>Thomas Montague</div></div><div class="linkbox"><small>Mother</small><div>Merope Gaunt</div></div><div class="linkbox person-link" onclick="showResident('Isabella Montague')"><small>Wife</small><div>Isabella Montague</div></div></div></article>
        </div><section class="profile-section"><h3>Children</h3><div class="chips"><span class="chip person-link" onclick="showResident('Thomas Marvolo Montague III')">Thomas Marvolo Montague III — son</span><span class="chip person-link" onclick="showResident('Claribel Montague')">Claribel Montague — daughter</span><span class="chip person-link" onclick="showResident('Mattheo Thomas Marvolo Montague')">Mattheo Thomas Marvolo Montague — son</span><span class="chip">Alexandria Jade Montague — daughter</span><span class="chip">Delphini Violet Montague — daughter</span></div></section><section class="profile-section"><h3>Extended Family</h3><div class="chips">${extendedFamily}</div></section><button class="back" onclick="showPage('montagueFamily')">← Back to the Montague Family</button></main>`],
      ['isabellaMontagueProfile', `
        <div class="profile-head"><div class="crumb">Hollow's Creek → Residents → Montague → Isabella</div><div class="aka">Montague Family</div><h2>Isabella Montague</h2></div>
        <main class="becca-profile"><div class="profile-grid">
          <aside class="bio-panel"><img class="profile-photo" src="isabella-montague-profile.png" alt="Isabella Montague"><h3>Profile</h3><div class="bio-fact"><small>Maiden name</small><strong>Isabella White</strong></div><div class="bio-fact"><small>Birthplace</small><strong>France</strong></div><div class="bio-fact"><small>Residence</small><strong>Hollow's Creek</strong></div><div class="bio-fact"><small>Species</small><strong>Human</strong></div><div class="bio-fact"><small>Husband</small><strong class="person-link" onclick="showResident('Thomas Marvolo Montague II')">Thomas Montague II</strong></div></aside>
          <article class="bio-panel"><h3>Family</h3><div class="links-grid"><div class="linkbox person-link" onclick="showResident('Thomas Marvolo Montague II')"><small>Husband</small><div>Thomas Marvolo Montague II</div></div></div></article>
        </div><section class="profile-section"><h3>Children</h3><div class="chips"><span class="chip person-link" onclick="showResident('Thomas Marvolo Montague III')">Thomas Marvolo Montague III — son</span><span class="chip person-link" onclick="showResident('Claribel Montague')">Claribel Montague — daughter</span><span class="chip person-link" onclick="showResident('Mattheo Thomas Marvolo Montague')">Mattheo Thomas Marvolo Montague — son</span><span class="chip">Alexandria Jade Montague — daughter</span><span class="chip">Delphini Violet Montague — daughter</span></div></section><section class="profile-section"><h3>Extended Family</h3><div class="chips">${extendedFamily}</div></section><button class="back" onclick="showPage('montagueFamily')">← Back to the Montague Family</button></main>`],
      ['thomasMontagueIIIProfile', `
        <div class="profile-head"><div class="crumb">Hollow's Creek → Residents → Montague → Thomas III</div><div class="aka">Montague Family</div><h2>Thomas Marvolo Montague III</h2></div>
        <main class="becca-profile"><div class="profile-grid">
          <aside class="bio-panel"><img class="profile-photo" src="thomas-montague-iii-profile.png" alt="Thomas Marvolo Montague III"><h3>Profile</h3><div class="bio-fact"><small>Born</small><strong>31 December 1978</strong></div><div class="bio-fact"><small>Birthplace</small><strong>Hollow's Creek</strong></div><div class="bio-fact"><small>Residence</small><strong>Hollow's Creek</strong></div><div class="bio-fact"><small>Species</small><strong>Human</strong></div><div class="bio-fact"><small>Boyfriend</small><strong>Peter Patterson</strong></div></aside>
          <article class="bio-panel"><h3>Family</h3><div class="links-grid"><div class="linkbox person-link" onclick="showResident('Thomas Marvolo Montague II')"><small>Father</small><div>Thomas Marvolo Montague II</div></div><div class="linkbox person-link" onclick="showResident('Isabella Montague')"><small>Mother</small><div>Isabella Montague</div></div><div class="linkbox"><small>Boyfriend</small><div>Peter Patterson</div></div></div></article>
        </div><section class="profile-section"><h3>Siblings</h3><div class="chips"><span class="chip person-link" onclick="showResident('Claribel Montague')">Claribel Montague — twin sister</span><span class="chip person-link" onclick="showResident('Mattheo Thomas Marvolo Montague')">Mattheo Thomas Marvolo Montague — brother</span><span class="chip">Alexandria Jade Montague — sister</span><span class="chip">Delphini Violet Montague — sister</span></div></section><section class="profile-section"><h3>Extended Family</h3><div class="chips">${extendedFamily}</div></section><button class="back" onclick="showPage('montagueFamily')">← Back to the Montague Family</button></main>`],
      ['claribelMontagueProfile', `
        <div class="profile-head"><div class="crumb">Hollow's Creek → Residents → Montague → Claribel</div><div class="aka">Montague Family</div><h2>Claribel Montague</h2></div>
        <main class="becca-profile"><div class="profile-grid">
          <aside class="bio-panel"><img class="profile-photo" src="claribel-montague-profile.png" alt="Claribel Montague"><h3>Profile</h3><div class="bio-fact"><small>Born</small><strong>31 December 1978</strong></div><div class="bio-fact"><small>Birthplace</small><strong>Hollow's Creek</strong></div><div class="bio-fact"><small>Residence</small><strong>Hollow's Creek</strong></div><div class="bio-fact"><small>Species</small><strong>Human</strong></div><div class="bio-fact"><small>Girlfriend</small><strong>Penelope Patterson</strong></div></aside>
          <article class="bio-panel"><h3>Family</h3><div class="links-grid"><div class="linkbox person-link" onclick="showResident('Thomas Marvolo Montague II')"><small>Father</small><div>Thomas Marvolo Montague II</div></div><div class="linkbox person-link" onclick="showResident('Isabella Montague')"><small>Mother</small><div>Isabella Montague</div></div><div class="linkbox"><small>Girlfriend</small><div>Penelope Patterson</div></div></div></article>
        </div><section class="profile-section"><h3>Siblings</h3><div class="chips"><span class="chip person-link" onclick="showResident('Thomas Marvolo Montague III')">Thomas Marvolo Montague III — twin brother</span><span class="chip person-link" onclick="showResident('Mattheo Thomas Marvolo Montague')">Mattheo Thomas Marvolo Montague — brother</span><span class="chip">Alexandria Jade Montague — sister</span><span class="chip">Delphini Violet Montague — sister</span></div></section><section class="profile-section"><h3>Extended Family</h3><div class="chips">${extendedFamily}</div></section><button class="back" onclick="showPage('montagueFamily')">← Back to the Montague Family</button></main>`],
      ['mattheoMontagueProfile', `
        <div class="profile-head"><div class="crumb">Hollow's Creek → Residents → Montague → Mattheo</div><div class="aka">Montague Family</div><h2>Mattheo Thomas Marvolo Montague</h2></div>
        <main class="becca-profile"><div class="profile-grid">
          <aside class="bio-panel"><img class="profile-photo" src="mattheo-montague-profile.png" alt="Mattheo Thomas Marvolo Montague"><h3>Profile</h3><div class="bio-fact"><small>Born</small><strong>29 December 1979</strong></div><div class="bio-fact"><small>Birthplace</small><strong>Hollow's Creek</strong></div><div class="bio-fact"><small>Residence</small><strong>Hollow's Creek</strong></div><div class="bio-fact"><small>Species</small><strong>Hellhound</strong></div><div class="bio-fact"><small>Girlfriend</small><strong class="person-link" onclick="showResident('Rebecca Rose Beaumont')">Rebecca Beaumont</strong></div></aside>
          <article class="bio-panel"><h3>Family & Relationships</h3><div class="links-grid"><div class="linkbox person-link" onclick="showResident('Thomas Marvolo Montague II')"><small>Father</small><div>Thomas Marvolo Montague II</div></div><div class="linkbox person-link" onclick="showResident('Isabella Montague')"><small>Mother</small><div>Isabella Montague</div></div><div class="linkbox person-link" onclick="showResident('Rebecca Rose Beaumont')"><small>Girlfriend</small><div>Rebecca Beaumont</div></div><div class="linkbox"><small>Pet</small><div>Atlas — dog</div></div></div></article>
        </div>
        <section class="profile-section"><h3>Relationship History</h3><div class="chips"><span class="chip">Jasmine Kane — ex</span><span class="chip">Raven Parker — ex</span><span class="chip person-link" onclick="showResident('Rebecca Rose Beaumont')">Rebecca Beaumont — girlfriend</span></div></section>
        <section class="profile-section"><h3>Siblings</h3><div class="chips"><span class="chip person-link" onclick="showResident('Thomas Marvolo Montague III')">Thomas Marvolo Montague III — brother</span><span class="chip person-link" onclick="showResident('Claribel Montague')">Claribel Montague — sister</span><span class="chip">Alexandria Jade Montague — twin sister</span><span class="chip">Delphini Violet Montague — sister</span></div></section>
        <section class="profile-section"><h3>Friends</h3><div class="chips"><span class="chip">Theodore Holt IV — best friend</span><span class="chip">Dylan Daniels</span><span class="chip">Lorenzo Whitmore</span><span class="chip">Jacob Foster</span></div></section>
        <section class="profile-section"><h3>Pets</h3><div class="chips"><span class="chip">Atlas — dog</span></div></section>
        <section class="profile-section"><h3>Extended Family</h3><div class="chips">${extendedFamily}</div></section><button class="back" onclick="showPage('montagueFamily')">← Back to the Montague Family</button></main>`]
    ];

    const placeholder = document.getElementById('residentPlaceholder');
    for (const [id, innerHTML] of profiles) {
      if (!document.getElementById(id)) {
        const section = document.createElement('section');
        section.id = id;
        section.className = 'page';
        section.innerHTML = innerHTML;
        placeholder.before(section);
      }
    }

    const residentsWrap = document.querySelector('#residents .residents-wrap') || document.querySelector('.residents-wrap');
    if (residentsWrap) {
      let mSection = document.getElementById('res-m');
      if (!mSection) {
        mSection = document.createElement('section');
        mSection.className = 'letter-group';
        mSection.id = 'res-m';
        mSection.innerHTML = '<div class="letter">M</div><div class="resident-list"></div>';
        const rSection = document.getElementById('res-r');
        if (rSection) rSection.before(mSection); else residentsWrap.appendChild(mSection);
      }
      const list = mSection.querySelector('.resident-list');
      for (const name of ['Claribel Montague','Isabella Montague','Mattheo Thomas Marvolo Montague','Thomas Marvolo Montague II','Thomas Marvolo Montague III']) {
        if (!list.querySelector(`[data-montague-resident="${name}"]`)) {
          const btn = document.createElement('button');
          btn.className = 'resident-row';
          btn.dataset.montagueResident = name;
          btn.onclick = () => window.showResident(name);
          btn.innerHTML = `<span>${name}</span><small>Profile available →</small>`;
          list.appendChild(btn);
        }
      }
      const az = residentsWrap.querySelector('.az');
      if (az && !az.querySelector('a[href="#res-m"]')) {
        const link = document.createElement('a');
        link.href = '#res-m';
        link.textContent = 'M';
        const rLink = az.querySelector('a[href="#res-r"]');
        if (rLink) rLink.before(link); else az.appendChild(link);
      }
    }
  };

  install();
})();
