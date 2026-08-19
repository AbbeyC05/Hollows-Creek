(() => {
  const families = {
    Sinclair: {
      title: 'The Sinclair Family',
      subtitle: 'Southside • Hollow\'s Creek',
      description: 'A hardworking Southside family led by Laura Sinclair, who works at a bank and has worked tirelessly to support her four children. Laura had difficult luck with relationships: Samuel\'s father, her first husband, died; April\'s father later left the family; and she eventually found a new partner with whom she shares twins Sadie and Austin.',
      members: ['Laura Sinclair', 'Samuel Sinclair', 'April Sinclair', 'Sadie Sinclair', 'Austin Sinclair']
    },
    Whitmore: {
      title: 'The Whitmore Family',
      subtitle: 'Northside • Hollow\'s Creek',
      description: 'A comfortable Northside family connected to the Rowan, Montague and White families. The parents had four children, but father Caleb Whitmore eventually left. To protect his much younger siblings from knowing their father had abandoned them, eldest son Tony took on Caleb\'s identity and lived as though he were their father.',
      members: ['Caleb Whitmore', 'Tony Whitmore', 'Whitmore sibling', 'Whitmore sibling', 'Whitmore sibling'],
      connections: ['Rowan Family', 'Montague Family', 'White Family']
    }
  };

  function esc(s){ return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

  function ensureFamilyDirectoryEntry(name) {
    const page = document.getElementById('families');
    if (!page) return;
    const letter = name[0].toUpperCase();
    let group = page.querySelector('#letter-' + letter);
    if (!group) {
      const allGroups = [...page.querySelectorAll('.letter-group')];
      group = document.createElement('div');
      group.className = 'letter-group';
      group.id = 'letter-' + letter;
      group.innerHTML = `<h2>${letter}</h2><div class="family-list"></div>`;
      const after = allGroups.find(g => (g.id.replace('letter-','') || 'Z') > letter);
      if (after) after.before(group); else page.appendChild(group);
    }
    const list = group.querySelector('.family-list') || group;
    if (![...list.querySelectorAll('.family-row')].some(x => x.textContent.includes(name))) {
      const btn = document.createElement('button');
      btn.className = 'family-row';
      btn.type = 'button';
      btn.setAttribute('onclick', `showFamily('${name}')`);
      btn.innerHTML = `<span>The ${esc(name)} Family</span><span>›</span>`;
      list.appendChild(btn);
    }
  }

  const oldShowFamily = window.showFamily;
  window.showFamily = function(name) {
    if (!families[name]) return oldShowFamily ? oldShowFamily(name) : undefined;
    const f = families[name];
    let page = document.getElementById('family-profile-dynamic');
    if (!page) {
      page = document.createElement('section');
      page.id = 'family-profile-dynamic';
      page.className = 'page';
      document.body.appendChild(page);
    }
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    page.innerHTML = `<div class="wrap"><button class="back" onclick="showPage('families')">← Back to Families</button><div class="profile-card"><div class="profile-main"><div><div class="eyebrow">Family Archive</div><h1>${esc(f.title)}</h1><p class="muted">${esc(f.subtitle)}</p><p>${esc(f.description)}</p></div></div><div class="profile-section"><h2>Known Members</h2><div class="chips">${f.members.map(m => `<span class="chip">${esc(m)}</span>`).join('')}</div></div>${f.connections ? `<div class="profile-section"><h2>Family Connections</h2><div class="chips">${f.connections.map(m => `<span class="chip">${esc(m)}</span>`).join('')}</div></div>` : ''}</div></div>`;
    page.classList.add('active');
    window.scrollTo(0,0);
  };

  function init(){
    const page = document.getElementById('families');
    if (!page) return setTimeout(init,100);
    ensureFamilyDirectoryEntry('Sinclair');
    ensureFamilyDirectoryEntry('Whitmore');
  }
  init();
})();
