(() => {
  const fixResidentsAlphabet = () => {
    const page = document.getElementById('residents');
    const wrap = page && page.querySelector('.residents-wrap');
    if (!page || !wrap || typeof window.showResident !== 'function') {
      setTimeout(fixResidentsAlphabet, 100);
      return;
    }

    const getName = button => {
      const span = button.querySelector('span');
      return (span ? span.textContent : button.textContent)
        .trim()
        .replace(/Profile available.*$/i,'')
        .replace(/View profile.*$/i,'')
        .trim();
    };

    const surnameLetter = name => {
      let clean = name.replace(/\([^)]*\)/g, '').trim();
      let parts = clean.split(/\s+/).filter(Boolean);
      const suffixes = new Set(['jr','sr','ii','iii','iv','v']);
      while (parts.length > 1 && suffixes.has(parts[parts.length - 1].toLowerCase().replace(/\./g,''))) parts.pop();
      const surname = parts[parts.length - 1] || clean;
      return surname.charAt(0).toUpperCase();
    };

    // Gather every resident row, including any rows accidentally placed outside the real directory wrapper.
    const rows = [...page.querySelectorAll('.resident-row')];
    const unique = new Map();
    rows.forEach(row => {
      const name = getName(row);
      if (name && !unique.has(name)) unique.set(name, row);
    });

    // Remove EVERY letter group on the Residents page. This clears malformed groups such as J appearing above the header.
    [...page.querySelectorAll('.letter-group')].forEach(group => group.remove());

    // Make sure the directory wrapper itself is below the Residents hero and above the footer.
    const hero = page.querySelector('.section-hero');
    const footer = page.querySelector('footer');
    if (hero && wrap.previousElementSibling !== hero) hero.insertAdjacentElement('afterend', wrap);
    if (footer && footer.previousElementSibling !== wrap) wrap.insertAdjacentElement('afterend', footer);

    const grouped = new Map();
    unique.forEach((row, name) => {
      const letter = surnameLetter(name);
      if (!grouped.has(letter)) grouped.set(letter, []);
      grouped.get(letter).push({ name, row });
    });

    [...grouped.keys()].sort().forEach(letter => {
      const group = document.createElement('section');
      group.className = 'letter-group';
      group.id = 'res-' + letter.toLowerCase();
      group.innerHTML = `<div class="letter">${letter}</div><div class="resident-list"></div>`;
      const list = group.querySelector('.resident-list');
      grouped.get(letter)
        .sort((a,b) => a.name.localeCompare(b.name))
        .forEach(item => list.appendChild(item.row));
      wrap.appendChild(group);
    });

    // Rebuild the A-Z navigation from the surname groups that actually exist.
    const az = wrap.querySelector('.az');
    if (az) {
      az.innerHTML = '';
      [...grouped.keys()].sort().forEach(letter => {
        const a = document.createElement('a');
        a.href = '#res-' + letter.toLowerCase();
        a.textContent = letter;
        az.appendChild(a);
      });
      wrap.insertBefore(az, wrap.firstChild);
    }
  };

  setTimeout(fixResidentsAlphabet, 1400);
})();
