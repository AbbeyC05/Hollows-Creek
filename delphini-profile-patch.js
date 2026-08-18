(() => {
  const installDelphini = () => {
    if (typeof window.showResident !== 'function' || typeof window.showPage !== 'function' || !document.getElementById('residentPlaceholder') || !document.getElementById('montagueFamily')) {
      setTimeout(installDelphini, 50);
      return;
    }

    if (!window.__delphiniMontagueRoutingInstalled) {
      const originalShowResident = window.showResident;
      window.showResident = function(name) {
        if (name === 'Delphini Violet Montague') return window.showPage('delphiniMontagueProfile');
        return originalShowResident(name);
      };
      window.__delphiniMontagueRoutingInstalled = true;
    }

    if (!document.getElementById('delphiniMontagueProfile')) {
      const section = document.createElement('section');
      section.id = 'delphiniMontagueProfile';
      section.className = 'page';
      section.innerHTML = `
        <div class="profile-head">
          <div class="crumb">Hollow's Creek → Residents → Montague → Delphini</div>
          <div class="aka">Montague Family</div>
          <h2>Delphini Violet Montague</h2>
        </div>
        <main class="becca-profile">
          <div class="profile-grid">
            <aside class="bio-panel">
              <img class="profile-photo" src="delphini-montague-profile.png" alt="Delphini Violet Montague">
              <h3>Profile</h3>
              <div class="bio-fact"><small>Born</small><strong>16 May 1981</strong></div>
              <div class="bio-fact"><small>Birthplace</small><strong>Hollow's Creek</strong></div>
              <div class="bio-fact"><small>Residence</small><strong>Hollow's Creek</strong></div>
              <div class="bio-fact"><small>Species</small><strong>Human</strong></div>
              <div class="bio-fact"><small>Boyfriend</small><strong>Jayden Kane</strong></div>
            </aside>
            <article class="bio-panel">
              <h3>Family</h3>
              <div class="links-grid">
                <div class="linkbox person-link" onclick="showResident('Thomas Marvolo Montague II')"><small>Father</small><div>Thomas Marvolo Montague II</div></div>
                <div class="linkbox person-link" onclick="showResident('Isabella Montague')"><small>Mother</small><div>Isabella Montague</div></div>
                <div class="linkbox"><small>Boyfriend</small><div>Jayden Kane</div></div>
                <div class="linkbox"><small>Family</small><div>Montague</div></div>
              </div>
            </article>
          </div>
          <section class="profile-section"><h3>Siblings</h3><div class="chips">
            <span class="chip person-link" onclick="showResident('Thomas Marvolo Montague III')">Thomas Marvolo Montague III — brother</span>
            <span class="chip person-link" onclick="showResident('Claribel Montague')">Claribel Montague — sister</span>
            <span class="chip person-link" onclick="showResident('Mattheo Thomas Marvolo Montague')">Mattheo Thomas Marvolo Montague — brother</span>
            <span class="chip person-link" onclick="showResident('Alexandria Jade Montague')">Alexandria Jade Montague — sister</span>
          </div></section>
          <section class="profile-section"><h3>Friends</h3><div class="chips">
            <span class="chip person-link" onclick="showResident('Riley Faith Beaumont')">Riley Beaumont</span>
          </div></section>
          <section class="profile-section"><h3>Extended Family</h3><div class="chips">
            <span class="chip">Caleb Whitmore</span><span class="chip">Hannah Whitmore</span><span class="chip">Tony Whitmore</span><span class="chip">Lorenzo Whitmore</span><span class="chip">Tate Whitmore</span><span class="chip">Lexie Whitmore</span><span class="chip">Regulus White</span><span class="chip">Evan Rowan</span><span class="chip">Evan Rowan Jr</span>
          </div></section>
          <button class="back" onclick="showPage('montagueFamily')">← Back to the Montague Family</button>
        </main>`;
      document.getElementById('residentPlaceholder').before(section);
    }

    const familyCard = document.querySelector(`#montagueFamily button[onclick="showResident('Delphini Violet Montague')"]`);
    if (familyCard) {
      const small = familyCard.querySelector('small');
      if (small) small.textContent = 'Profile available →';
    }

    const mSection = document.getElementById('res-m');
    if (mSection) {
      const list = mSection.querySelector('.resident-list');
      if (list && !list.querySelector('[data-montague-resident="Delphini Violet Montague"]')) {
        const btn = document.createElement('button');
        btn.className = 'resident-row';
        btn.dataset.montagueResident = 'Delphini Violet Montague';
        btn.onclick = () => window.showResident('Delphini Violet Montague');
        btn.innerHTML = '<span>Delphini Violet Montague</span><small>Profile available →</small>';
        list.prepend(btn);
      }
    }

    document.querySelectorAll('.chip').forEach(chip => {
      if (chip.textContent.trim().startsWith('Delphini Violet Montague')) {
        chip.classList.add('person-link');
        chip.onclick = () => window.showResident('Delphini Violet Montague');
      }
    });
  };

  installDelphini();
})();
