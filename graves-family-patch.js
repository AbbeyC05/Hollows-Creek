(() => {
  const family = {
    id: 'gravesFamily',
    title: 'The Graves Family',
    residence: "Northside, Hollow's Creek",
    overview: "The Graves family are originally from Edinburgh, Scotland. Johnathan Graves works in business and travelled frequently for work. The family moved to Hollow's Creek when the children were small, but they still visit Scotland often. They live on the Northside of town, and Johnathan has done business with Lukas Beaumont.",
    members: ['Johnathan Graves','Evelyn Graves','Archie Graves','Louis Jay Graves','Harrison Graves','Amy Lexie Graves','Lacy Graves','Holly Graves']
  };

  const people = {
    'Johnathan Graves': {id:'johnathanGravesProfile',img:'johnathan-graves-profile.png',facts:[['Born','Edinburgh, Scotland'],['Residence',"Northside, Hollow's Creek"],['Species','Human'],['Job','Business']],sections:[['Relationship',['Evelyn Graves — wife']],['Children',['Archie Graves','Louis Jay Graves','Harrison Graves','Amy Lexie Graves','Lacy Graves','Holly Graves']],['Business connections',['Lukas Beaumont']]]},
    'Evelyn Graves': {id:'evelynGravesProfile',img:'evelyn-graves-profile.png',facts:[['Born','Edinburgh, Scotland'],['Residence',"Northside, Hollow's Creek"]],sections:[['Relationship',['Johnathan Graves — husband']],['Children',['Archie Graves','Louis Jay Graves','Harrison Graves','Amy Lexie Graves','Lacy Graves','Holly Graves']],['Friends',['Joanne Rose Reid — best friend']]]},
    'Archie Graves': {id:'archieGravesProfile',img:'archie-graves-profile.png',facts:[['Born','14 December 1974'],['Birthplace','Edinburgh, Scotland'],['Residence',"Northside, Hollow's Creek"],['Job','English Teacher at L. Beaumont Preparatory']],sections:[['Parents',['Johnathan Graves','Evelyn Graves']],['Siblings',['Louis Jay Graves','Harrison Graves','Amy Lexie Graves','Lacy Graves','Holly Graves']],['Friends',['Lukas Beaumont Jr — best friend']]]},
    'Louis Jay Graves': {id:'louisGravesProfile',img:'louis-graves-profile.png',facts:[['Born','7 January 1978'],['Birthplace','Edinburgh, Scotland'],['Residence',"Northside, Hollow's Creek"],['Species','Human']],sections:[['Parents',['Johnathan Graves','Evelyn Graves']],['Siblings',['Archie Graves','Harrison Graves','Amy Lexie Graves','Lacy Graves','Holly Graves']],['Relationship',['Lisa Webb — girlfriend']],['Exes',['Keira Mor Walker','Emma Ryder']],['Friends',['Charlie Steven Beaumont — best friend']]]},
    'Harrison Graves': {id:'harrisonGravesProfile',img:'harrison-graves-profile.png',facts:[['Born','1979'],['Birthplace','Edinburgh, Scotland'],['Residence',"Northside, Hollow's Creek"],['Species','Human']],sections:[['Parents',['Johnathan Graves','Evelyn Graves']],['Siblings',['Archie Graves','Louis Jay Graves','Amy Lexie Graves','Lacy Graves','Holly Graves']],['Personality',['Funny','Loveable','Flirty','Compassionate']]]},
    'Amy Lexie Graves': {id:'amyGravesProfile',img:'amy-graves-profile.png.webp',facts:[['Born','1 September 1979'],['Birthplace','Edinburgh, Scotland'],['Residence',"Northside, Hollow's Creek"]],sections:[['Parents',['Johnathan Graves','Evelyn Graves']],['Siblings',['Archie Graves','Louis Jay Graves','Harrison Graves','Lacy Graves','Holly Graves']],['Relationship',['Sophie Rodriguez — girlfriend']],['Exes',['Mason']],['Best friends',['Ruby Bardot','Christie Dunn','Christian Dunn','Charlie Steven Beaumont','Rebecca Rose Beaumont','Mattheo Thomas Marvolo Montague','Jacob Foster','Dylan Logan Daniels']]]},
    'Lacy Graves': {id:'lacyGravesProfile',img:'lacy-graves-profile.png',facts:[['Born','1981'],['Birthplace','Edinburgh, Scotland'],['Residence',"Northside, Hollow's Creek"]],sections:[['Parents',['Johnathan Graves','Evelyn Graves']],['Siblings',['Archie Graves','Louis Jay Graves','Harrison Graves','Amy Lexie Graves','Holly Graves — twin']]]},
    'Holly Graves': {id:'hollyGravesProfile',img:'holly-graves-profile.png',facts:[['Born','1981'],['Birthplace','Edinburgh, Scotland'],['Residence',"Northside, Hollow's Creek"]],sections:[['Parents',['Johnathan Graves','Evelyn Graves']],['Siblings',['Archie Graves','Louis Jay Graves','Harrison Graves','Amy Lexie Graves','Lacy Graves — twin']]]}
  };

  const aliases = {
    'Lukas Beaumont':'Lukas Henry Beaumont',
    'Lukas Beaumont Jr':'Lukas Henry Beaumont Jr',
    'Charlie Beaumont':'Charlie Steven Beaumont',
    'Rebecca Beaumont':'Rebecca Rose Beaumont',
    'Mattheo Montague':'Mattheo Thomas Marvolo Montague',
    'Dylan Daniels':'Dylan Logan Daniels',
    'Keira Walker':'Keira Mor Walker',
    'Joanne Reid':'Joanne Rose Reid'
  };

  const linkable = new Set([
    ...Object.keys(people), 'Lukas Henry Beaumont','Lukas Henry Beaumont Jr','Charlie Steven Beaumont','Rebecca Rose Beaumont',
    'Mattheo Thomas Marvolo Montague','Dylan Logan Daniels','Keira Mor Walker','Joanne Rose Reid','Emma Ryder','Ruby Bardot','Christie Dunn','Christian Dunn','Jacob Foster'
  ]);
  const esc = s => s.replace(/'/g,"\\'");
  const resolve = item => {
    const raw = item.split(' — ')[0].trim();
    const target = aliases[raw] || raw;
    return linkable.has(target) ? target : null;
  };
  const chips = items => items.map(item => {
    const target = resolve(item);
    return target ? `<span class="chip person-link" onclick="showResident('${esc(target)}')">${item}</span>` : `<span class="chip">${item}</span>`;
  }).join('');

  const install = () => {
    if (typeof window.showFamily !== 'function' || typeof window.showResident !== 'function' || typeof window.showPage !== 'function' || !document.getElementById('beaumontFamily')) {
      setTimeout(install, 50); return;
    }

    if (!window.__gravesRoutingInstalled) {
      const oldFamily = window.showFamily;
      window.showFamily = name => name === 'Graves' ? window.showPage(family.id) : oldFamily(name);
      const oldResident = window.showResident;
      window.showResident = name => {
        const resolved = aliases[name] || name;
        return people[resolved] ? window.showPage(people[resolved].id) : oldResident(name);
      };
      window.__gravesRoutingInstalled = true;
    }

    // Add Graves to Families under G.
    const familiesWrap = document.querySelector('#families .families-wrap');
    if (familiesWrap) {
      let gGroup = document.getElementById('letter-G');
      if (!gGroup) {
        gGroup = document.createElement('section');
        gGroup.className = 'letter-group';
        gGroup.id = 'letter-G';
        gGroup.innerHTML = '<div class="letter">G</div><div class="family-list"></div>';
        const groups = Array.from(familiesWrap.querySelectorAll('.letter-group'));
        const next = groups.find(g => (g.querySelector('.letter')?.textContent.trim() || 'Z') > 'G');
        if (next) familiesWrap.insertBefore(gGroup,next); else familiesWrap.appendChild(gGroup);
      }
      const list = gGroup.querySelector('.family-list');
      if (list && !Array.from(list.querySelectorAll('.family-row')).some(b => b.textContent.includes('Graves Family'))) {
        const b = document.createElement('button'); b.className='family-row'; b.onclick=()=>window.showFamily('Graves'); b.innerHTML='<span>The Graves Family</span><span>→</span>'; list.appendChild(b);
      }
      const az = familiesWrap.querySelector('.az');
      if (az && !az.querySelector('a[href="#letter-G"]')) {
        const a=document.createElement('a'); a.href='#letter-G'; a.textContent='G'; const links=Array.from(az.querySelectorAll('a')); const next=links.find(x=>x.textContent.trim()>'G'); if(next) az.insertBefore(a,next); else az.appendChild(a);
      }
    }

    if (!document.getElementById(family.id)) {
      const page = document.createElement('section'); page.id=family.id; page.className='page';
      page.innerHTML = `<div class="family-title"><div class="crumb">Hollow's Creek → Families → Graves</div><div class="subtitle">Family Profile</div><h2>${family.title}</h2></div><main class="beaumont-shell"><div class="overview-grid"><article class="panel"><h3>Family Overview</h3><p>${family.overview}</p></article><aside class="panel"><div class="fact"><small>Originally from</small><strong>Edinburgh, Scotland</strong></div><div class="fact"><small>Current residence</small><strong>${family.residence}</strong></div><div class="fact"><small>Known members</small><strong>8</strong></div><div class="fact"><small>Business connection</small><strong>Lukas Beaumont</strong></div></aside></div><section class="members"><h3>Family Members</h3><div class="member-grid">${family.members.map(n=>`<button class="member-card" onclick="showResident('${esc(n)}')"><span>${n}</span><small>View profile →</small></button>`).join('')}</div></section><button class="back" onclick="showPage('families')">← Back to Families</button></main>`;
      document.getElementById('beaumontFamily').before(page);
    }

    Object.entries(people).forEach(([name,p]) => {
      if (document.getElementById(p.id)) return;
      const page=document.createElement('section'); page.id=p.id; page.className='page';
      page.innerHTML=`<div class="profile-head"><div class="crumb">Hollow's Creek → Residents → ${name}</div><div class="aka">Resident Profile</div><h2>${name}</h2></div><main class="becca-profile"><div class="profile-grid"><div><img class="profile-photo" src="${p.img}" alt="${name}"></div><article class="bio-panel"><h3>Profile</h3>${p.facts.map(([k,v])=>`<div class="bio-fact"><small>${k}</small><strong>${v}</strong></div>`).join('')}</article></div>${p.sections.map(([title,items])=>`<section class="profile-section"><h3>${title}</h3><div class="chips">${chips(items)}</div></section>`).join('')}<button class="back" onclick="showPage('${family.id}')">← Back to ${family.title}</button></main>`;
      document.getElementById('beaumontFamily').before(page);
    });

    // Add all Graves residents under G.
    const residentsWrap=document.querySelector('#residents .residents-wrap');
    if (residentsWrap) {
      let group=document.getElementById('res-g');
      if (!group) {
        group=document.createElement('section'); group.className='letter-group'; group.id='res-g'; group.innerHTML='<div class="letter">G</div><div class="resident-list"></div>';
        const groups=Array.from(residentsWrap.querySelectorAll('.letter-group')); const next=groups.find(g => (g.querySelector('.letter')?.textContent.trim() || 'Z') > 'G'); if(next) residentsWrap.insertBefore(group,next); else residentsWrap.appendChild(group);
      }
      const list=group.querySelector('.resident-list');
      family.members.forEach(name => {
        residentsWrap.querySelectorAll('.resident-row').forEach(btn => { if (btn.querySelector('span')?.textContent.trim() === name) btn.remove(); });
        const b=document.createElement('button'); b.className='resident-row'; b.onclick=()=>window.showResident(name); b.innerHTML=`<span>${name}</span><small>Profile available →</small>`; list.appendChild(b);
      });
      Array.from(list.children).sort((a,b)=>a.querySelector('span').textContent.localeCompare(b.querySelector('span').textContent)).forEach(el=>list.appendChild(el));
      const az=residentsWrap.querySelector('.az'); if(az && !az.querySelector('a[href="#res-g"]')) { const a=document.createElement('a'); a.href='#res-g'; a.textContent='G'; const links=Array.from(az.querySelectorAll('a')); const next=links.find(x=>x.textContent.trim()>'G'); if(next) az.insertBefore(a,next); else az.appendChild(a); }
    }
  };

  install();
})();