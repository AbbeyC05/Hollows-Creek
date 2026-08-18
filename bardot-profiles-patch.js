(() => {
  const installBardotProfiles = () => {
    if (typeof window.showResident !== 'function' || typeof window.showPage !== 'function' || !document.getElementById('residentPlaceholder') || !document.getElementById('bardotFamily')) {
      setTimeout(installBardotProfiles, 50);
      return;
    }

    if (!window.__bardotProfileRoutingInstalled) {
      const originalShowResident = window.showResident;
      window.showResident = function(name) {
        if (name === 'Ella Monroe') return window.showPage('ellaMonroeProfile');
        if (name === 'Ruby Bardot') return window.showPage('rubyBardotProfile');
        if (name === 'Kayla Monroe') return window.showPage('kaylaMonroeProfile');
        return originalShowResident(name);
      };
      window.__bardotProfileRoutingInstalled = true;
    }

    const profiles = [
      ['ellaMonroeProfile', `
        <div class="profile-head"><div class="crumb">Hollow's Creek → Residents → Bardot → Ella</div><div class="aka">Bardot Family</div><h2>Ella Monroe</h2></div>
        <main class="becca-profile">
          <div class="profile-grid">
            <aside class="bio-panel">
              <img class="profile-photo" src="ella-monroe-profile.png" alt="Ella Monroe">
              <h3>Profile</h3>
              <div class="bio-fact"><small>Birthplace</small><strong>France</strong></div>
              <div class="bio-fact"><small>Residence</small><strong>Southside, Hollow's Creek</strong></div>
              <div class="bio-fact"><small>Husband</small><strong>Unnamed</strong></div>
            </aside>
            <article class="bio-panel">
              <h3>Family & Relationships</h3>
              <div class="links-grid">
                <div class="linkbox"><small>Husband</small><div>Unnamed husband</div></div>
                <div class="linkbox person-link" onclick="showResident('Ruby Bardot')"><small>Daughter</small><div>Ruby Bardot</div></div>
                <div class="linkbox person-link" onclick="showResident('Kayla Monroe')"><small>Daughter</small><div>Kayla Monroe</div></div>
                <div class="linkbox"><small>Relationships</small><div>Has multiple casual partners</div></div>
              </div>
            </article>
          </div>
          <section class="profile-section"><h3>Children</h3><div class="chips"><span class="chip person-link" onclick="showResident('Ruby Bardot')">Ruby Bardot — daughter</span><span class="chip person-link" onclick="showResident('Kayla Monroe')">Kayla Monroe — daughter</span></div></section>
          <button class="back" onclick="showPage('bardotFamily')">← Back to the Bardot Family</button>
        </main>`],
      ['rubyBardotProfile', `
        <div class="profile-head"><div class="crumb">Hollow's Creek → Residents → Bardot → Ruby</div><div class="aka">Bardot Family</div><h2>Ruby Bardot</h2></div>
        <main class="becca-profile">
          <div class="profile-grid">
            <aside class="bio-panel">
              <img class="profile-photo" src="ruby-bardot-profile.png" alt="Ruby Bardot">
              <h3>Profile</h3>
              <div class="bio-fact"><small>Born</small><strong>4 February 1979</strong></div>
              <div class="bio-fact"><small>Birthplace</small><strong>France</strong></div>
              <div class="bio-fact"><small>Residence</small><strong>Southside, Hollow's Creek</strong></div>
              <div class="bio-fact"><small>Species</small><strong>Human</strong></div>
              <div class="bio-fact"><small>Boyfriend</small><strong>Mark Hunter</strong></div>
            </aside>
            <article class="bio-panel">
              <h3>Family</h3>
              <div class="links-grid">
                <div class="linkbox person-link" onclick="showResident('Ella Monroe')"><small>Mother</small><div>Ella Monroe</div></div>
                <div class="linkbox"><small>Father</small><div>Unnamed</div></div>
                <div class="linkbox person-link" onclick="showResident('Kayla Monroe')"><small>Half-sister</small><div>Kayla Monroe</div></div>
                <div class="linkbox"><small>Boyfriend</small><div>Mark Hunter</div></div>
              </div>
            </article>
          </div>
          <section class="profile-section"><h3>Education</h3><div class="chips"><span class="chip">L. Beaumont Preparatory</span></div></section>
          <section class="profile-section"><h3>Best Friends</h3><div class="chips">
            <span class="chip">Amy Graves</span><span class="chip">Keira Walker</span><span class="chip">Christie Dunn</span><span class="chip">Christian Dunn</span><span class="chip">Jacob Foster</span><span class="chip">Louis Graves</span>
            <span class="chip person-link" onclick="showResident('Mattheo Thomas Marvolo Montague')">Mattheo Montague</span>
            <span class="chip person-link" onclick="showResident('Rebecca Rose Beaumont')">Rebecca Beaumont</span>
            <span class="chip person-link" onclick="showResident('Charlie Steven Beaumont')">Charlie Beaumont</span>
            <span class="chip">Dylan Daniels</span>
          </div></section>
          <button class="back" onclick="showPage('bardotFamily')">← Back to the Bardot Family</button>
        </main>`],
      ['kaylaMonroeProfile', `
        <div class="profile-head"><div class="crumb">Hollow's Creek → Residents → Bardot → Kayla</div><div class="aka">Bardot Family</div><h2>Kayla Monroe</h2></div>
        <main class="becca-profile">
          <div class="profile-grid">
            <aside class="bio-panel">
              <img class="profile-photo" src="kayla-monroe-profile.png" alt="Kayla Monroe">
              <h3>Profile</h3>
              <div class="bio-fact"><small>Birthplace</small><strong>Hollow's Creek</strong></div>
              <div class="bio-fact"><small>Residence</small><strong>Southside, Hollow's Creek</strong></div>
            </aside>
            <article class="bio-panel">
              <h3>Family</h3>
              <div class="links-grid">
                <div class="linkbox person-link" onclick="showResident('Ella Monroe')"><small>Mother</small><div>Ella Monroe</div></div>
                <div class="linkbox"><small>Father</small><div>Unnamed</div></div>
                <div class="linkbox person-link" onclick="showResident('Ruby Bardot')"><small>Half-sister</small><div>Ruby Bardot</div></div>
                <div class="linkbox"><small>Family</small><div>Bardot / Monroe</div></div>
              </div>
            </article>
          </div>
          <button class="back" onclick="showPage('bardotFamily')">← Back to the Bardot Family</button>
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

    const updateFamilyCard = (name) => {
      const card = document.querySelector(`#bardotFamily button[onclick="showResident('${name}')"]`);
      if (card) {
        const small = card.querySelector('small');
        if (small) small.textContent = 'Profile available →';
      }
    };
    ['Ella Monroe','Ruby Bardot','Kayla Monroe'].forEach(updateFamilyCard);

    const residentsWrap = document.querySelector('#residents .residents-wrap') || document.querySelector('.residents-wrap');
    const ensureLetter = (letter) => {
      let section = document.getElementById('res-' + letter.toLowerCase());
      if (!section && residentsWrap) {
        section = document.createElement('section');
        section.className = 'letter-group';
        section.id = 'res-' + letter.toLowerCase();
        section.innerHTML = `<div class="letter">${letter}</div><div class="resident-list"></div>`;
        residentsWrap.appendChild(section);
      }
      return section;
    };

    const addResident = (letter, name) => {
      const section = ensureLetter(letter);
      if (!section) return;
      const list = section.querySelector('.resident-list');
      if (!list || list.querySelector(`[data-bardot-resident="${name}"]`)) return;
      const btn = document.createElement('button');
      btn.className = 'resident-row';
      btn.dataset.bardotResident = name;
      btn.onclick = () => window.showResident(name);
      btn.innerHTML = `<span>${name}</span><small>Profile available →</small>`;
      list.appendChild(btn);
    };

    addResident('B', 'Ruby Bardot');
    addResident('M', 'Ella Monroe');
    addResident('M', 'Kayla Monroe');

    document.querySelectorAll('.chip').forEach(chip => {
      const text = chip.textContent.trim();
      if (text.startsWith('Ruby Bardot')) { chip.classList.add('person-link'); chip.onclick = () => window.showResident('Ruby Bardot'); }
      if (text.startsWith('Kayla Monroe')) { chip.classList.add('person-link'); chip.onclick = () => window.showResident('Kayla Monroe'); }
      if (text.startsWith('Ella Monroe')) { chip.classList.add('person-link'); chip.onclick = () => window.showResident('Ella Monroe'); }
    });
  };

  installBardotProfiles();
})();
