(() => {
  const families = {
    Hall: {
      id: 'hallFamily', title: 'The Hall Family', residence: "Southside, Hollow's Creek",
      overview: "The Hall family consists of Ella Hall and her daughter Morgan. Ella is a single mother who works at L. Beaumont Preparatory as a Science Teacher and one of the school's Year Managers. They live on the Southside of Hollow's Creek.",
      members: ['Ella Hall','Morgan Hall']
    },
    Hartley: {
      id: 'hartleyFamily', title: 'The Hartley Family', residence: "Southside, Hollow's Creek",
      overview: "Very little is currently known about the Hartley family. Tia Hartley is the only known member at present, and the family resides on the Southside of Hollow's Creek.",
      members: ['Tia Hartley']
    }
  };

  const people = {
    'Ella Hall': {
      id:'ellaHallProfile', family:'Hall', img:'Ella-Hall-profile.png',
      facts:[['Residence',"Southside, Hollow's Creek"],['Species','Human'],['Job','Science Teacher / Year Manager'],['Workplace','L. Beaumont Preparatory']],
      sections:[['Children',['Morgan Hall']],['Family',['Ella is a single mother.']]]
    },
    'Morgan Hall': {
      id:'morganHallProfile', family:'Hall', img:'morgan-hall-profile.png',
      facts:[['Born','1980'],['Residence',"Southside, Hollow's Creek"],['Species','Human']],
      sections:[['Parent',['Ella Hall — mother']],['Relationship',['Corey Johnson — boyfriend']],['Enemies',['Rebecca Rose Beaumont — enemy']]]
    },
    'Tia Hartley': {
      id:'tiaHartleyProfile', family:'Hartley', img:'tia-hartley-profile.png',
      facts:[['Born','1978'],['Residence',"Southside, Hollow's Creek"],['Species','Human']],
      sections:[['Relationship',['Courtney Rivera — girlfriend']]]
    }
  };

  const aliases = {'Rebecca Beaumont':'Rebecca Rose Beaumont'};
  const knownHere = new Set(Object.keys(people));
  const linkedExisting = new Set(['Rebecca Rose Beaumont','Corey Johnson']);
  const esc = s => s.replace(/'/g,"\\'");
  const resolve = item => {
    const raw = item.split(' — ')[0].trim();
    const name = aliases[raw] || raw;
    return knownHere.has(name) || linkedExisting.has(name) ? name : null;
  };
  const chips = items => items.map(item => {
    const target = resolve(item);
    return target ? `<span class="chip person-link" onclick="showResident('${esc(target)}')">${item}</span>` : `<span class="chip">${item}</span>`;
  }).join('');

  const install = () => {
    if (typeof window.showFamily !== 'function' || typeof window.showResident !== 'function' || typeof window.showPage !== 'function' || !document.getElementById('beaumontFamily')) {
      setTimeout(install, 50); return;
    }

    if (!window.__hallHartleyRoutingInstalled) {
      const oldFamily = window.showFamily;
      window.showFamily = name => families[name] ? window.showPage(families[name].id) : oldFamily(name);
      const oldResident = window.showResident;
      window.showResident = name => {
        const resolved = aliases[name] || name;
        return people[resolved] ? window.showPage(people[resolved].id) : oldResident(name);
      };
      window.__hallHartleyRoutingInstalled = true;
    }

    const ensureFamilyLetter = letter => {
      const familiesPage = document.getElementById('families');
      if (!familiesPage) return null;
      let group = document.getElementById('letter-' + letter);
      if (!group) {
        const groups = Array.from(familiesPage.querySelectorAll('.letter-group'));
        group = document.createElement('section');
        group.className = 'letter-group';
        group.id = 'letter-' + letter;
        group.innerHTML = `<div class="letter">${letter}</div><div class="family-list"></div>`;
        const next = groups.find(g => (g.querySelector('.letter')?.textContent.trim() || 'Z') > letter);
        if (next) next.before(group); else familiesPage.querySelector('.families-wrap')?.appendChild(group);
      }
      const az = familiesPage.querySelector('.az');
      if (az && !az.querySelector(`a[href="#letter-${letter}"]`)) {
        const a = document.createElement('a'); a.href = `#letter-${letter}`; a.textContent = letter;
        const links = Array.from(az.querySelectorAll('a'));
        const next = links.find(x => x.textContent.trim() > letter);
        if (next) az.insertBefore(a,next); else az.appendChild(a);
      }
      return group.querySelector('.family-list');
    };

    const hList = ensureFamilyLetter('H');
    if (hList) {
      Object.keys(families).forEach(key => {
        if (!Array.from(hList.querySelectorAll('.family-row')).some(b => b.textContent.includes(`${key} Family`))) {
          const b = document.createElement('button'); b.className='family-row'; b.onclick=()=>window.showFamily(key); b.innerHTML=`<span>The ${key} Family</span><span>→</span>`; hList.appendChild(b);
        }
      });
      Array.from(hList.children).sort((a,b)=>a.textContent.localeCompare(b.textContent)).forEach(el=>hList.appendChild(el));
    }

    Object.entries(families).forEach(([key,f]) => {
      if (!document.getElementById(f.id)) {
        const page = document.createElement('section'); page.id=f.id; page.className='page';
        const cards = f.members.map(n=>`<button class="member-card" onclick="showResident('${esc(n)}')"><span>${n}</span><small>View profile →</small></button>`).join('');
        page.innerHTML = `<div class="family-title"><div class="crumb">Hollow's Creek → Families → ${key}</div><div class="subtitle">Family Profile</div><h2>${f.title}</h2></div><main class="beaumont-shell"><div class="overview-grid"><article class="panel"><h3>Family Overview</h3><p>${f.overview}</p></article><aside class="panel"><div class="fact"><small>Family</small><strong>${key}</strong></div><div class="fact"><small>Residence</small><strong>${f.residence}</strong></div><div class="fact"><small>Known members</small><strong>${f.members.length}</strong></div></aside></div><section class="members"><h3>Family Members</h3><div class="member-grid">${cards}</div></section><button class="back" onclick="showPage('families')">← Back to Families</button></main>`;
        document.getElementById('beaumontFamily').before(page);
      }
      const btn = Array.from(document.querySelectorAll('.family-row')).find(b=>b.textContent.includes(`${key} Family`));
      if (btn) btn.onclick=()=>window.showPage(f.id);
    });

    Object.entries(people).forEach(([name,p]) => {
      if (document.getElementById(p.id)) return;
      const page = document.createElement('section'); page.id=p.id; page.className='page';
      page.innerHTML = `<div class="profile-head"><div class="crumb">Hollow's Creek → Residents → ${name}</div><div class="aka">Resident Profile</div><h2>${name}</h2></div><main class="becca-profile"><div class="profile-grid"><div><img class="profile-photo" src="${p.img}" alt="${name}"></div><article class="bio-panel"><h3>Profile</h3>${p.facts.map(([k,v])=>`<div class="bio-fact"><small>${k}</small><strong>${v}</strong></div>`).join('')}</article></div>${p.sections.map(([title,items])=>`<section class="profile-section"><h3>${title}</h3><div class="chips">${chips(items)}</div></section>`).join('')}<button class="back" onclick="showPage('${families[p.family].id}')">← Back to ${families[p.family].title}</button></main>`;
      document.getElementById('beaumontFamily').before(page);
    });

    const wrap = document.querySelector('#residents .residents-wrap');
    if (wrap) {
      let group = document.getElementById('res-h');
      if (!group) {
        group=document.createElement('section'); group.className='letter-group'; group.id='res-h'; group.innerHTML='<div class="letter">H</div><div class="resident-list"></div>';
        const groups=Array.from(wrap.querySelectorAll('.letter-group'));
        const next=groups.find(g => (g.querySelector('.letter')?.textContent.trim() || 'Z') > 'H');
        if(next) wrap.insertBefore(group,next); else wrap.appendChild(group);
      }
      const az=wrap.querySelector('.az');
      if(az && !az.querySelector('a[href="#res-h"]')) {
        const a=document.createElement('a'); a.href='#res-h'; a.textContent='H';
        const links=Array.from(az.querySelectorAll('a')); const next=links.find(x=>x.textContent.trim()>'H'); if(next) az.insertBefore(a,next); else az.appendChild(a);
      }
      const list=group.querySelector('.resident-list');
      ['Ella Hall','Morgan Hall','Tia Hartley'].forEach(name=>{
        wrap.querySelectorAll('.resident-row').forEach(btn=>{if(btn.querySelector('span')?.textContent.trim()===name) btn.remove();});
        const b=document.createElement('button'); b.className='resident-row'; b.onclick=()=>window.showResident(name); b.innerHTML=`<span>${name}</span><small>Profile available →</small>`; list.appendChild(b);
      });
      Array.from(list.children).sort((a,b)=>a.querySelector('span')?.textContent.localeCompare(b.querySelector('span')?.textContent||'')||0).forEach(el=>list.appendChild(el));
    }
  };

  install();
})();