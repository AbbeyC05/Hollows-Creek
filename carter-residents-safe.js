(() => {
  const placeCarters = () => {
    const residentsPage = document.getElementById('residents');
    const wrap = residentsPage && residentsPage.querySelector('.residents-wrap');
    const bGroup = document.getElementById('res-b');

    if (!wrap || !bGroup || typeof window.showResident !== 'function') {
      setTimeout(placeCarters, 100);
      return;
    }

    const names = ['Poppy Carter', 'Georgia Carter'];

    // Remove only duplicate/wrongly placed Carter resident rows.
    wrap.querySelectorAll('.resident-row').forEach(row => {
      const span = row.querySelector('span');
      if (span && names.includes(span.textContent.trim())) row.remove();
    });

    // Ensure the residents A-Z navigation includes C.
    const az = wrap.querySelector('.az');
    if (az && !az.querySelector('a[href="#res-c"]')) {
      const cLink = document.createElement('a');
      cLink.href = '#res-c';
      cLink.textContent = 'C';
      const lLink = az.querySelector('a[href="#res-l"]');
      if (lLink) az.insertBefore(cLink, lLink);
      else az.appendChild(cLink);
    }

    // Create a real C section directly inside the existing residents directory.
    let cGroup = document.getElementById('res-c');
    if (!cGroup) {
      cGroup = document.createElement('section');
      cGroup.className = 'letter-group';
      cGroup.id = 'res-c';
      cGroup.innerHTML = '<div class="letter">C</div><div class="resident-list"></div>';
      bGroup.insertAdjacentElement('afterend', cGroup);
    }

    const list = cGroup.querySelector('.resident-list');
    if (!list) return;

    names.forEach(name => {
      const btn = document.createElement('button');
      btn.className = 'resident-row';
      btn.onclick = () => window.showResident(name);
      btn.innerHTML = `<span>${name}</span><small>Profile available →</small>`;
      list.appendChild(btn);
    });
  };

  // Allow all profile patches to initialise first, then place the entries once.
  setTimeout(placeCarters, 500);
})();
