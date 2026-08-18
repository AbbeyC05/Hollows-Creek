(() => {
  const routes = {
    'Theodore Alexander Holt III': 'theodoreHoltIIIProfile',
    'Christina Holt': 'christinaHoltProfile',
    'Christina Holt (née Reid)': 'christinaHoltProfile',
    'Christina Holt (nee Reid)': 'christinaHoltProfile',
    'Jamie Holt': 'jamieHoltProfile',
    'Theodore Alexander Holt IV': 'theodoreHoltIVProfile',
    'Phoebe Holt': 'phoebeHoltProfile'
  };

  const reidExtended = `
    <span class="chip person-link" onclick="showResident('Joanne Rose Reid')">Joanne Rose Reid</span>
    <span class="chip">Ethan Reid</span><span class="chip">Marcus Reid</span>
    <span class="chip">Liam Reid</span><span class="chip">Ava Reid</span>
    <span class="chip person-link" onclick="showResident('Libby Christine Beaumont')">Libby Beaumont</span>
    <span class="chip person-link" onclick="showResident('Bethany Alana Beaumont')">Bethany Beaumont</span>
    <span class="chip person-link" onclick="showResident('Reece Ethan Beaumont')">Reece Beaumont</span>
    <span class="chip person-link" onclick="showResident('Leon Alex Beaumont')">Leon Beaumont</span>
    <span class="chip person-link" onclick="showResident('Bradley Marcus Beaumont')">Bradley Beaumont</span>
    <span class="chip person-link" onclick="showResident('Rebecca Rose Beaumont')">Rebecca Beaumont</span>`;

  const install = () => {
    if (typeof window.showResident !== 'function' || typeof window.showPage !== 'function' || !document.getElementById('residentPlaceholder') || !document.getElementById('holtFamily')) {
      setTimeout(install, 50);
      return;
    }

    if (!window.__holtProfilesRoutingInstalled) {
      const originalShowResident = window.showResident;
      window.showResident = function(name) {
        if (routes[name]) return window.showPage(routes[name]);
        return originalShowResident(name);
      };
      window.__holtProfilesRoutingInstalled = true;
    }

    const profiles = [
      ['theodoreHoltIIIProfile', `
        <div class="profile-head"><div class="crumb">Hollow's Creek → Residents → Holt → Theodore III</div><div class="aka">Holt Family</div><h2>Theodore Alexander Holt III</h2></div>
        <main class="becca-profile">
          <div class="profile-grid">
            <aside class="bio-panel"><img class="profile-photo" src="theodore-holt-III-profile.png" alt="Theodore Alexander Holt III"><h3>Profile</h3><div class="bio-fact"><small>Birthplace</small><strong>Rome, Italy</strong></div><div class="bio-fact"><small>Residence</small><strong>Hollow's Creek</strong></div><div class="bio-fact"><small>Species</small><strong>Human</strong></div><div class="bio-fact"><small>Wife</small><strong class="person-link" onclick="showResident('Christina Holt')">Christina Holt (née Reid)</strong></div></aside>
            <article class="bio-panel"><h3>Family</h3><div class="links-grid"><div class="linkbox person-link" onclick="showResident('Christina Holt')"><small>Wife</small><div>Christina Holt (née Reid)</div></div><div class="linkbox"><small>Family</small><div>Holt</div></div></div></article>
          </div>
          <section class="profile-section"><h3>Children</h3><div class="chips"><span class="chip person-link" onclick="showResident('Jamie Holt')">Jamie Holt</span><span class="chip person-link" onclick="showResident('Theodore Alexander Holt IV')">Theodore Alexander Holt IV</span><span class="chip person-link" onclick="showResident('Phoebe Holt')">Phoebe Holt</span></div></section>
          <section class="profile-section"><h3>Friends</h3><div class="chips"><span class="chip person-link" onclick="showResident('Lukas Henry Beaumont')">Lukas Beaumont</span></div></section>
          <section class="profile-section"><h3>Extended Family</h3><p>Reid family through Christina.</p><div class="chips">${reidExtended}</div></section>
          <button class="back" onclick="showPage('holtFamily')">← Back to the Holt Family</button>
        </main>`],

      ['christinaHoltProfile', `
        <div class="profile-head"><div class="crumb">Hollow's Creek → Residents → Holt → Christina</div><div class="aka">Born Christina Reid</div><h2>Christina Holt</h2></div>
        <main class="becca-profile">
          <div class="profile-grid">
            <aside class="bio-panel"><img class="profile-photo" src="christina-holt-profile.png" alt="Christina Holt"><h3>Profile</h3><div class="bio-fact"><small>Born</small><strong>1958</strong></div><div class="bio-fact"><small>Birthplace</small><strong>France</strong></div><div class="bio-fact"><small>Residence</small><strong>Hollow's Creek</strong></div><div class="bio-fact"><small>Species</small><strong>Siren</strong></div><div class="bio-fact"><small>Husband</small><strong class="person-link" onclick="showResident('Theodore Alexander Holt III')">Theodore Alexander Holt III</strong></div></aside>
            <article class="bio-panel"><h3>Family</h3><div class="links-grid"><div class="linkbox"><small>Father</small><div>Michael Reid</div></div><div class="linkbox"><small>Mother</small><div>Emily Reid (née Thompson)</div></div><div class="linkbox person-link" onclick="showResident('Joanne Rose Reid')"><small>Twin sister</small><div>Joanne Rose Reid</div></div><div class="linkbox person-link" onclick="showResident('Theodore Alexander Holt III')"><small>Husband</small><div>Theodore Alexander Holt III</div></div></div></article>
          </div>
          <section class="profile-section"><h3>Siblings</h3><div class="chips"><span class="chip">Ethan Reid — brother</span><span class="chip">Marcus Reid — brother</span><span class="chip person-link" onclick="showResident('Joanne Rose Reid')">Joanne Rose Reid — twin sister</span></div></section>
          <section class="profile-section"><h3>Children</h3><div class="chips"><span class="chip person-link" onclick="showResident('Jamie Holt')">Jamie Holt</span><span class="chip person-link" onclick="showResident('Theodore Alexander Holt IV')">Theodore Alexander Holt IV</span><span class="chip person-link" onclick="showResident('Phoebe Holt')">Phoebe Holt</span></div></section>
          <section class="profile-section"><h3>Life Event</h3><p>Christina died in childbirth with Phoebe and was resurrected in 1995.</p></section>
          <section class="profile-section"><h3>Friends</h3><div class="chips"><span class="chip person-link" onclick="showResident('Isabella Montague')">Isabella Montague</span></div></section>
          <section class="profile-section"><h3>Extended Family</h3><div class="chips">${reidExtended}</div></section>
          <button class="back" onclick="showPage('holtFamily')">← Back to the Holt Family</button>
        </main>`],

      ['jamieHoltProfile', `
        <div class="profile-head"><div class="crumb">Hollow's Creek → Residents → Holt → Jamie</div><div class="aka">Holt Family</div><h2>Jamie Holt</h2></div>
        <main class="becca-profile">
          <div class="profile-grid">
            <aside class="bio-panel"><img class="profile-photo" src="jamie-holt-profile.png" alt="Jamie Holt"><h3>Profile</h3><div class="bio-fact"><small>Born</small><strong>28 November 1978</strong></div><div class="bio-fact"><small>Birthplace</small><strong>Rome, Italy</strong></div><div class="bio-fact"><small>Residence</small><strong>Hollow's Creek</strong></div><div class="bio-fact"><small>Species</small><strong>Siren</strong></div><div class="bio-fact"><small>Girlfriend</small><strong>Zara Barker</strong></div></aside>
            <article class="bio-panel"><h3>Family</h3><div class="links-grid"><div class="linkbox person-link" onclick="showResident('Theodore Alexander Holt III')"><small>Father</small><div>Theodore Alexander Holt III</div></div><div class="linkbox person-link" onclick="showResident('Christina Holt')"><small>Mother</small><div>Christina Holt</div></div><div class="linkbox"><small>Girlfriend</small><div>Zara Barker</div></div></div></article>
          </div>
          <section class="profile-section"><h3>Siblings</h3><div class="chips"><span class="chip person-link" onclick="showResident('Theodore Alexander Holt IV')">Theodore Alexander Holt IV</span><span class="chip person-link" onclick="showResident('Phoebe Holt')">Phoebe Holt</span></div></section>
          <section class="profile-section"><h3>Friends</h3><div class="chips"><span class="chip person-link" onclick="showResident('Thomas Marvolo Montague III')">Thomas Marvolo Montague III</span><span class="chip">Peter Patterson</span></div></section>
          <section class="profile-section"><h3>Extended Family</h3><div class="chips">${reidExtended}</div></section>
          <button class="back" onclick="showPage('holtFamily')">← Back to the Holt Family</button>
        </main>`],

      ['theodoreHoltIVProfile', `
        <div class="profile-head"><div class="crumb">Hollow's Creek → Residents → Holt → Theodore IV</div><div class="aka">Holt Family</div><h2>Theodore Alexander Holt IV</h2></div>
        <main class="becca-profile">
          <div class="profile-grid">
            <aside class="bio-panel"><img class="profile-photo" src="theodore-holt-IV-profile.png" alt="Theodore Alexander Holt IV"><h3>Profile</h3><div class="bio-fact"><small>Born</small><strong>1 September 1979</strong></div><div class="bio-fact"><small>Birthplace</small><strong>Rome, Italy</strong></div><div class="bio-fact"><small>Residence</small><strong>Hollow's Creek</strong></div><div class="bio-fact"><small>Species</small><strong>Siren</strong></div><div class="bio-fact"><small>Girlfriend</small><strong class="person-link" onclick="showResident('Harper Victoria Beaumont')">Harper Beaumont</strong></div></aside>
            <article class="bio-panel"><h3>Family</h3><div class="links-grid"><div class="linkbox person-link" onclick="showResident('Theodore Alexander Holt III')"><small>Father</small><div>Theodore Alexander Holt III</div></div><div class="linkbox person-link" onclick="showResident('Christina Holt')"><small>Mother</small><div>Christina Holt</div></div></div></article>
          </div>
          <section class="profile-section"><h3>Relationship History</h3><div class="chips"><span class="chip">Marley Dickson — ex</span><span class="chip">Jessica Kane — ex</span><span class="chip person-link" onclick="showResident('Harper Victoria Beaumont')">Harper Beaumont — girlfriend</span></div></section>
          <section class="profile-section"><h3>Siblings</h3><div class="chips"><span class="chip person-link" onclick="showResident('Jamie Holt')">Jamie Holt</span><span class="chip person-link" onclick="showResident('Phoebe Holt')">Phoebe Holt</span></div></section>
          <section class="profile-section"><h3>Extended Family</h3><div class="chips">${reidExtended}</div></section>
          <button class="back" onclick="showPage('holtFamily')">← Back to the Holt Family</button>
        </main>`],

      ['phoebeHoltProfile', `
        <div class="profile-head"><div class="crumb">Hollow's Creek → Residents → Holt → Phoebe</div><div class="aka">Holt Family</div><h2>Phoebe Holt</h2></div>
        <main class="becca-profile">
          <div class="profile-grid">
            <aside class="bio-panel"><img class="profile-photo" src="phoebe-holt-profile.png" alt="Phoebe Holt"><h3>Profile</h3><div class="bio-fact"><small>Born</small><strong>4 September 1980</strong></div><div class="bio-fact"><small>Birthplace</small><strong>Hollow's Creek</strong></div><div class="bio-fact"><small>Residence</small><strong>Hollow's Creek</strong></div><div class="bio-fact"><small>Species</small><strong>Siren</strong></div><div class="bio-fact"><small>Boyfriend</small><strong>Joseph Villin</strong></div></aside>
            <article class="bio-panel"><h3>Family</h3><div class="links-grid"><div class="linkbox person-link" onclick="showResident('Theodore Alexander Holt III')"><small>Father</small><div>Theodore Alexander Holt III</div></div><div class="linkbox person-link" onclick="showResident('Christina Holt')"><small>Mother</small><div>Christina Holt</div></div><div class="linkbox"><small>Boyfriend</small><div>Joseph Villin</div></div></div></article>
          </div>
          <section class="profile-section"><h3>Siblings</h3><div class="chips"><span class="chip person-link" onclick="showResident('Jamie Holt')">Jamie Holt</span><span class="chip person-link" onclick="showResident('Theodore Alexander Holt IV')">Theodore Alexander Holt IV</span></div></section>
          <section class="profile-section"><h3>Extended Family</h3><div class="chips">${reidExtended}</div></section>
          <button class="back" onclick="showPage('holtFamily')">← Back to the Holt Family</button>
        </main>`]
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

    document.querySelectorAll('#holtFamily .member-card').forEach(card => {
      const small = card.querySelector('small');
      if (small) small.textContent = small.textContent.replace('profile to be built', 'profile available').replace('Profile to be built', 'Profile available');
    });

    let hSection = document.getElementById('res-h');
    const residentsWrap = document.querySelector('#residents .residents-wrap') || document.querySelector('.residents-wrap');
    if (residentsWrap && !hSection) {
      hSection = document.createElement('section');
      hSection.className = 'letter-group';
      hSection.id = 'res-h';
      hSection.innerHTML = '<div class="letter">H</div><div class="resident-list"></div>';
      const lSection = document.getElementById('res-l');
      if (lSection) lSection.before(hSection); else residentsWrap.appendChild(hSection);
    }
    if (hSection) {
      const list = hSection.querySelector('.resident-list');
      for (const name of ['Christina Holt','Jamie Holt','Phoebe Holt','Theodore Alexander Holt III','Theodore Alexander Holt IV']) {
        if (!list.querySelector(`[data-holt-resident="${name}"]`)) {
          const btn = document.createElement('button');
          btn.className = 'resident-row';
          btn.dataset.holtResident = name;
          btn.onclick = () => window.showResident(name);
          btn.innerHTML = `<span>${name}</span><small>Profile available →</small>`;
          list.appendChild(btn);
        }
      }
    }

    const az = residentsWrap && residentsWrap.querySelector('.az');
    if (az && !az.querySelector('a[href="#res-h"]')) {
      const a = document.createElement('a');
      a.href = '#res-h';
      a.textContent = 'H';
      const l = az.querySelector('a[href="#res-l"]');
      if (l) l.before(a); else az.appendChild(a);
    }

    document.querySelectorAll('.chip').forEach(chip => {
      const txt = chip.textContent.trim();
      for (const name of Object.keys(routes)) {
        if (txt.startsWith(name)) {
          chip.classList.add('person-link');
          chip.onclick = () => window.showResident(name);
          break;
        }
      }
    });
  };

  install();
})();