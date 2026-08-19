(() => {
  const fixResidentsAlphabet = () => {
    const page = document.getElementById('residents');
    const wrap = page && page.querySelector('.residents-wrap');
    if (!page || !wrap || typeof window.showResident !== 'function') {
      setTimeout(fixResidentsAlphabet, 100);
      return;
    }

    const groups = {
      C: ['Poppy Carter', 'Georgia Carter'],
      J: ['Elizabeth Jones', 'David Jones', 'Milly Jackson', 'William Johnson', 'Corey Johnson', 'Willow Johnson']
    };

    const getName = button => {
      const span = button.querySelector('span');
      return (span ? span.textContent : button.textContent).trim().replace(/Profile available.*$/,'').replace(/View profile.*$/,'').trim();
    };

    // Remove misplaced copies of C/J residents from anywhere on the Residents page.
    const targetNames = new Set([...groups.C, ...groups.J]);
    page.querySelectorAll('button').forEach(button => {
      if (targetNames.has(getName(button))) button.remove();
    });

    // Remove malformed dynamically-created C/J sections outside the real residents wrapper.
    [...page.children].forEach(child => {
      if (child === wrap) return;
      const heading = child.querySelector && child.querySelector('h2,h3,h4,.letter');
      if (heading && ['C','J'].includes(heading.textContent.trim())) child.remove();
    });

    const ensureGroup = letter => {
      let group = document.getElementById('res-' + letter.toLowerCase());
      if (group && group.parentElement !== wrap) {
        group.remove();
        group = null;
      }
      if (!group) {
        group = document.createElement('section');
        group.className = 'letter-group';
        group.id = 'res-' + letter.toLowerCase();
        group.innerHTML = `<div class="letter">${letter}</div><div class="resident-list"></div>`;
        wrap.appendChild(group);
      }
      return group;
    };

    Object.entries(groups).forEach(([letter, names]) => {
      const group = ensureGroup(letter);
      const list = group.querySelector('.resident-list');
      names.forEach(name => {
        const button = document.createElement('button');
        button.className = 'resident-row';
        button.onclick = () => window.showResident(name);
        button.innerHTML = `<span>${name}</span><small>Profile available →</small>`;
        list.appendChild(button);
      });
    });

    // Put every real letter group in strict alphabetical order.
    const letterGroups = [...wrap.querySelectorAll(':scope > .letter-group')];
    letterGroups.sort((a,b) => {
      const aLetter = (a.querySelector('.letter')?.textContent || '').trim();
      const bLetter = (b.querySelector('.letter')?.textContent || '').trim();
      return aLetter.localeCompare(bLetter);
    }).forEach(group => wrap.appendChild(group));

    // Keep the A-Z navigation alphabetic too.
    const az = wrap.querySelector('.az');
    if (az) {
      ['C','J'].forEach(letter => {
        const href = '#res-' + letter.toLowerCase();
        if (!az.querySelector(`a[href="${href}"]`)) {
          const a = document.createElement('a');
          a.href = href;
          a.textContent = letter;
          az.appendChild(a);
        }
      });
      [...az.querySelectorAll('a')]
        .sort((a,b) => a.textContent.trim().localeCompare(b.textContent.trim()))
        .forEach(a => az.appendChild(a));
    }
  };

  // Run after all family/profile patches have finished mutating the directory.
  setTimeout(fixResidentsAlphabet, 900);
})();
