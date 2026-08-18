(() => {
  const families = {
    Dickson: {
      id: 'dicksonFamily', title: 'The Dickson Family', residence: "Southside, Hollow's Creek",
      overview: "The Dickson family live on the Southside of Hollow's Creek. Their parents are currently unnamed, but both are still around and live with their two daughters, Marley and Leah.",
      members: ['Marley Dickson','Leah Dickson']
    },
    Davis: {
      id: 'davisFamily', title: 'The Davis Family', residence: "Hollow's Creek",
      overview: "Not much is currently known about the Davis family. The household consists of two mothers and their son Benjamin. One of Benjamin's mothers strongly pushes him to train in swimming.",
      members: ['Benjamin Davis']
    },
    Dunn: {
      id: 'dunnFamily', title: 'The Dunn Family', residence: "Hollow's Creek",
      overview: "The Dunn family originally consisted of Chief Police Detective Tom Dunn, his wife Marie and their children Christian and Christie. Marie tragically died. Many years later Tom remarried lawyer Fiona Dunn, and they went on to have two more children, Eric and Elizabeth.",
      members: ['Tom Dunn','Fiona Dunn','Christian Dunn','Christie Dunn','Eric Dunn','Elizabeth Dunn']
    },
    Ryder: {
      id: 'ryderFamily', title: 'The Ryder Family', residence: "Hollow's Creek",
      overview: "The Ryder family originally consisted of Gary Ryder, headmaster of L. Beaumont Preparatory, lawyer Fiona and their daughter Emma. Gary is an alcoholic, and Fiona eventually left him. Fiona later remarried Tom Dunn.",
      members: ['Gary Ryder','Fiona Dunn','Emma Ryder']
    }
  };

  const people = {
    'Marley Dickson': {id:'marleyDicksonProfile',family:'Dickson',img:'marley-dickson-profile.png',facts:[['Born','1980'],['Residence',"Southside, Hollow's Creek"]],sections:[['Family',['Leah Dickson — sister']],['Relationships',['Jasper Williams — boyfriend','Theodore Alexander Holt IV — ex']],['Friends',['Rebecca Rose Beaumont','Pansy Hannah Walker','Corey Johnson','James Williams']]]},
    'Leah Dickson': {id:'leahDicksonProfile',family:'Dickson',img:'leah-dickson-profile.png',facts:[['Born','1981'],['Residence',"Southside, Hollow's Creek"]],sections:[['Family',['Marley Dickson — sister']]]},
    'Benjamin Davis': {id:'benjaminDavisProfile',family:'Davis',img:'Benjamin-davis-profile.png',facts:[['Born','7 June 1978'],['Residence',"Hollow's Creek"]],sections:[['Parents',['Two unnamed mothers']],['Relationship',['Natasha Stone — girlfriend']],['Friends',['Levi Lepton']],['Training',['One of his mothers strongly pushes him to train in swimming.']]]},
    'Tom Dunn': {id:'tomDunnProfile',family:'Dunn',img:'tom-dunn-profile.png',facts:[['Job','Chief Police Detective'],['Residence',"Hollow's Creek"]],sections:[['Relationships',['Fiona Dunn — wife','Marie Dunn — late wife']],['Children',['Christian Dunn','Christie Dunn','Eric Dunn','Elizabeth Dunn']],['Friends',['Steven Walker']]]},
    'Fiona Dunn': {id:'fionaDunnProfile',family:'Dunn',img:'fiona-dunn-profile.png',facts:[['Job','Lawyer'],['Residence',"Hollow's Creek"]],sections:[['Relationships',['Tom Dunn — husband','Gary Ryder — ex-husband']],['Children',['Emma Ryder','Eric Dunn','Elizabeth Dunn']]]},
    'Gary Ryder': {id:'garyRyderProfile',family:'Ryder',img:'gary-ryder-profile.png',facts:[['Job','Headmaster of L. Beaumont Preparatory'],['Residence',"Hollow's Creek"]],sections:[['Relationship',['Fiona Dunn — ex-wife']],['Children',['Emma Ryder']],['Family history',['Gary is an alcoholic. Fiona eventually left him.']]]},
    'Emma Ryder': {id:'emmaRyderProfile',family:'Ryder',img:'emma-ryder-profile.png',facts:[['Born','4 July 1980'],['Species','Human'],['Education','L. Beaumont Preparatory'],['Residence',"Hollow's Creek"]],sections:[['Parents',['Gary Ryder','Fiona Dunn']],['Relationships',['Levi Lepton — boyfriend','Charlie Steven Beaumont — ex','Louis Graves — ex']]]},
    'Christian Dunn': {id:'christianDunnProfile',family:'Dunn',img:'christian-dunn-profile.png',facts:[['Born','14 June 1980'],['Species','Human'],['Education','L. Beaumont Preparatory'],['Residence',"Hollow's Creek"]],sections:[['Parents',['Tom Dunn','Marie Dunn']],['Siblings',['Christie Dunn','Eric Dunn','Elizabeth Dunn']],['Relationships',['Leon Alex Beaumont — boyfriend','Charlie Steven Beaumont — ex']]]},
    'Christie Dunn': {id:'christieDunnProfile',family:'Dunn',img:'christie-dunn-profile.png',facts:[['Born','9 April 1981'],['Species','Human'],['Education','L. Beaumont Preparatory'],['Residence',"Hollow's Creek"]],sections:[['Parents',['Tom Dunn','Marie Dunn']],['Siblings',['Christian Dunn','Eric Dunn','Elizabeth Dunn']],['Relationship',['Jacob Foster — boyfriend']]]}
  };

  const aliases = {
    'Rebecca Beaumont':'Rebecca Rose Beaumont', 'Pansy Walker':'Pansy Hannah Walker', 'Theodore Holt IV':'Theodore Alexander Holt IV',
    'Leon Beaumont':'Leon Alex Beaumont', 'Charlie Beaumont':'Charlie Steven Beaumont'
  };
  const allKnown = new Set(Object.keys(people));
  const linkedExisting = new Set(['Rebecca Rose Beaumont','Pansy Hannah Walker','Theodore Alexander Holt IV','Leon Alex Beaumont','Charlie Steven Beaumont','Steven Walker']);
  const resolve = text => {
    const raw = text.split(' — ')[0].trim();
    const name = aliases[raw] || raw;
    return allKnown.has(name) || linkedExisting.has(name) ? name : null;
  };
  const esc = s => s.replace(/'/g,"\\'");
  const chips = items => items.map(item => {
    const target = resolve(item);
    return target ? `<span class="chip person-link" onclick="showResident('${esc(target)}')">${item}</span>` : `<span class="chip">${item}</span>`;
  }).join('');

  const install = () => {
    if (typeof window.showFamily !== 'function' || typeof window.showResident !== 'function' || typeof window.showPage !== 'function' || !document.getElementById('beaumontFamily')) {
      setTimeout(install,50); return;
    }

    if (!window.__dddRRoutingInstalled) {
      const oldFamily = window.showFamily;
      window.showFamily = name => families[name] ? window.showPage(families[name].id) : oldFamily(name);
      const oldResident = window.showResident;
      window.showResident = name => {
        const resolved = aliases[name] || name;
        return people[resolved] ? window.showPage(people[resolved].id) : oldResident(name);
      };
      window.__dddRRoutingInstalled = true;
    }

    // Add Ryder to the existing Families directory if it is not already there.
    const rFamilyGroup = document.getElementById('letter-R');
    if (rFamilyGroup) {
      const list = rFamilyGroup.querySelector('.family-list');
      if (list && !Array.from(list.querySelectorAll('.family-row')).some(b => b.textContent.includes('Ryder Family'))) {
        const btn = document.createElement('button'); btn.className='family-row'; btn.onclick=()=>window.showFamily('Ryder'); btn.innerHTML='<span>The Ryder Family</span><span>→</span>'; list.appendChild(btn);
        Array.from(list.children).sort((a,b)=>a.textContent.localeCompare(b.textContent)).forEach(el=>list.appendChild(el));
      }
    }

    Object.entries(families).forEach(([key,f]) => {
      if (!document.getElementById(f.id)) {
        const page=document.createElement('section'); page.id=f.id; page.className='page';
        const cards=f.members.map(n => people[n] ? `<button class="member-card" onclick="showResident('${esc(n)}')"><span>${n}</span><small>View profile →</small></button>` : `<div class="member-card"><span>${n}</span><small>Profile not yet built</small></div>`).join('');
        page.innerHTML=`<div class="family-title"><div class="crumb">Hollow's Creek → Families → ${key}</div><div class="subtitle">Family Profile</div><h2>${f.title}</h2></div><main class="beaumont-shell"><div class="overview-grid"><article class="panel"><h3>Family Overview</h3><p>${f.overview}</p></article><aside class="panel"><div class="fact"><small>Family</small><strong>${key}</strong></div><div class="fact"><small>Residence</small><strong>${f.residence}</strong></div><div class="fact"><small>Known members</small><strong>${f.members.length}</strong></div></aside></div><section class="members"><h3>Family Members</h3><div class="member-grid">${cards}</div></section><button class="back" onclick="showPage('families')">← Back to Families</button></main>`;
        document.getElementById('beaumontFamily').before(page);
      }
      const familyBtn=Array.from(document.querySelectorAll('.family-row')).find(b=>b.textContent.includes(`${key} Family`));
      if (familyBtn) familyBtn.onclick=()=>window.showPage(f.id);
    });

    Object.entries(people).forEach(([name,p]) => {
      if (document.getElementById(p.id)) return;
      const page=document.createElement('section'); page.id=p.id; page.className='page';
      page.innerHTML=`<div class="profile-head"><div class="crumb">Hollow's Creek → Residents → ${name}</div><div class="aka">Resident Profile</div><h2>${name}</h2></div><main class="becca-profile"><div class="profile-grid"><div><img class="profile-photo" src="${p.img}" alt="${name}"></div><article class="bio-panel"><h3>Profile</h3>${p.facts.map(([k,v])=>`<div class="bio-fact"><small>${k}</small><strong>${v}</strong></div>`).join('')}</article></div>${p.sections.map(([title,items])=>`<section class="profile-section"><h3>${title}</h3><div class="chips">${chips(items)}</div></section>`).join('')}<button class="back" onclick="showPage('${families[p.family].id}')">← Back to ${families[p.family].title}</button></main>`;
      document.getElementById('beaumontFamily').before(page);
    });

    const wrap=document.querySelector('#residents .residents-wrap');
    if (wrap) {
      const ensureSection = letter => {
        let group=document.getElementById('res-'+letter.toLowerCase());
        if (!group) {
          group=document.createElement('section'); group.className='letter-group'; group.id='res-'+letter.toLowerCase(); group.innerHTML=`<div class="letter">${letter}</div><div class="resident-list"></div>`;
          const groups=Array.from(wrap.querySelectorAll('.letter-group'));
          const next=groups.find(g => (g.querySelector('.letter')?.textContent.trim()||'Z') > letter);
          if(next) wrap.insertBefore(group,next); else wrap.appendChild(group);
        }
        const az=wrap.querySelector('.az');
        if(az && !az.querySelector(`a[href="#res-${letter.toLowerCase()}"]`)) {
          const a=document.createElement('a'); a.href=`#res-${letter.toLowerCase()}`; a.textContent=letter;
          const links=Array.from(az.querySelectorAll('a')); const next=links.find(x=>x.textContent.trim()>letter); if(next) az.insertBefore(a,next); else az.appendChild(a);
        }
        return group.querySelector('.resident-list');
      };
      const placements={D:['Marley Dickson','Leah Dickson','Benjamin Davis','Tom Dunn','Fiona Dunn','Christian Dunn','Christie Dunn'],R:['Gary Ryder','Emma Ryder']};
      Object.entries(placements).forEach(([letter,names])=>{
        const list=ensureSection(letter);
        names.forEach(name=>{
          wrap.querySelectorAll('.resident-row').forEach(btn=>{if(btn.querySelector('span')?.textContent.trim()===name) btn.remove();});
          const b=document.createElement('button'); b.className='resident-row'; b.onclick=()=>window.showResident(name); b.innerHTML=`<span>${name}</span><small>Profile available →</small>`; list.appendChild(b);
        });
        Array.from(list.children).sort((a,b)=>a.querySelector('span')?.textContent.localeCompare(b.querySelector('span')?.textContent||'')||0).forEach(el=>list.appendChild(el));
      });
    }
  };
  install();
})();