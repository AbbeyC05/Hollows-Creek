(() => {
  const fixCarterResidents = () => {
    if (typeof window.showResident !== 'function') {
      setTimeout(fixCarterResidents, 75);
      return;
    }

    const groups = Array.from(document.querySelectorAll('.letter-group'));
    if (!groups.length) {
      setTimeout(fixCarterResidents, 75);
      return;
    }

    let cGroup = groups.find(group => {
      const letter = group.querySelector('.letter');
      return letter && letter.textContent.trim().toUpperCase() === 'C';
    });

    if (!cGroup) {
      const hGroup = groups.find(group => {
        const letter = group.querySelector('.letter');
        return letter && letter.textContent.trim().toUpperCase() === 'H';
      });
      const bGroup = groups.find(group => {
        const letter = group.querySelector('.letter');
        return letter && letter.textContent.trim().toUpperCase() === 'B';
      });
      const parent = (hGroup || bGroup || groups[0]).parentElement;
      if (!parent) return;

      cGroup = document.createElement('div');
      cGroup.className = 'letter-group';
      cGroup.innerHTML = '<div class="letter">C</div><div class="resident-list"></div>';

      if (hGroup) parent.insertBefore(cGroup, hGroup);
      else if (bGroup && bGroup.nextSibling) parent.insertBefore(cGroup, bGroup.nextSibling);
      else parent.appendChild(cGroup);
    }

    let cResidents = cGroup.querySelector('.resident-list');
    if (!cResidents) {
      cResidents = document.createElement('div');
      cResidents.className = 'resident-list';
      cGroup.appendChild(cResidents);
    }

    const names = ['Poppy Carter', 'Georgia Carter'];

    names.forEach(name => {
      Array.from(document.querySelectorAll('.resident-row')).forEach(btn => {
        const span = btn.querySelector('span');
        const buttonName = span ? span.textContent.trim() : '';
        if (buttonName === name) btn.remove();
      });

      const btn = document.createElement('button');
      btn.className = 'resident-row';
      btn.onclick = () => window.showResident(name);
      btn.innerHTML = `<span>${name}</span><small>View profile →</small>`;
      cResidents.appendChild(btn);
    });
  };

  setTimeout(fixCarterResidents, 250);
})();
