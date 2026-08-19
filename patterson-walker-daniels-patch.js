(() => {
  const families = {
    Patterson: {
      id: 'pattersonFamily',
      title: 'The Patterson Family',
      residence: "Northside, Hollow's Creek",
      overview: "The Patterson family live on the Northside of Hollow's Creek and are better off than most families in town. Their children attended L. Beaumont Preparatory. The family history is complicated by affairs between the Patterson and Walker parents, meaning several of their children are half-siblings across both families.",
      members: ['Edmund Patterson','Annabella Patterson','Peter Patterson','Penelope Patterson','Nathaniel Walker','Nora Walker','Pansy Hannah Walker']
    },
    Walker: {
      id: 'walkerFamily',
      title: 'The Walker Family',
      residence: "Southside, Hollow's Creek",
      overview: "The Walker family live on the Southside of Hollow's Creek. Steven Walker works as a police detective. Steven and Wendy have not been in love for many years, and both have had affairs that connect the Walker and Patterson families.",
      members: ['Steven Walker','Wendy Walker','Keira Mor Walker','Nathaniel Walker','Nora Walker','Pansy Hannah Walker']
    },
    Daniels: {
      id: 'danielsFamily',
      title: 'The Daniels Family',
      residence: "Hollow's Creek",
      overview: "The Daniels family are led by fireman Martin Daniels and his wife Aurora. The family struggled deeply after their daughter Lizzie went missing and initially blamed their son Dylan. It was later discovered that Lizzie had been kidnapped and Dylan had nothing to do with her disappearance. Lizzie eventually returned home safely after many years.",
      members: ['Martin Daniels','Aurora Daniels','Dylan Logan Daniels','Logan Daniels','Lizzie Daniels']
    }
  };

  const people = {
    'Edmund Patterson': {id:'edmundPattersonProfile',family:'Patterson',img:'edmund-patterson-profile.png',facts:[['Residence',"Northside, Hollow's Creek"]],sections:[['Relationships',['Annabella Patterson — wife','Wendy Walker — affair']],['Children',['Nathaniel Walker','Nora Walker','Peter Patterson','Penelope Patterson']]]},
    'Annabella Patterson': {id:'annabellaPattersonProfile',family:'Patterson',img:null,facts:[['Maiden name','Annabella Khan'],['Birthplace','Newcastle'],['Residence',"Hollow's Creek"]],sections:[['Family',['Jace Khan — sibling','Noel Khan — nephew']],['Relationships',['Edmund Patterson — husband','Steven Walker — affair']],['Children',['Peter Patterson','Penelope Patterson','Pansy Hannah Walker']]]},
    'Steven Walker': {id:'stevenWalkerProfile',family:'Walker',img:null,facts:[['Residence',"Hollow's Creek"],['Job','Police detective']],sections:[['Family',['Aurora Daniels — sister','Martin Daniels — brother-in-law','Dylan Logan Daniels — nephew','Logan Daniels — nephew','Lizzie Daniels — niece']],['Relationships',['Wendy Walker — wife','Annabella Patterson — affair']],['Children',['Keira Mor Walker','Pansy Hannah Walker']]]},
    'Wendy Walker': {id:'wendyWalkerProfile',family:'Walker',img:'wendy-walker-profile.png',facts:[['Residence',"Hollow's Creek"]],sections:[['Relationships',['Steven Walker — husband','Edmund Patterson — affair']],['Children',['Nathaniel Walker','Nora Walker','Keira Mor Walker']]]},
    'Martin Daniels': {id:'martinDanielsProfile',family:'Daniels',img:'martin-daniels-profile.png',facts:[['Residence',"Hollow's Creek"],['Job','Fireman']],sections:[['Relationship',['Aurora Daniels — wife']],['Children',['Dylan Logan Daniels','Logan Daniels','Lizzie Daniels']]]},
    'Aurora Daniels': {id:'auroraDanielsProfile',family:'Daniels',img:'aurora-daniels-profile.png',facts:[['Maiden name','Aurora Walker'],['Residence',"Hollow's Creek"]],sections:[['Relationship',['Martin Daniels — husband']],['Family',['Steven Walker — brother','Wendy Walker — sister-in-law','Keira Mor Walker — niece','Pansy Hannah Walker — niece']]]},
    'Keira Mor Walker': {id:'keiraWalkerProfile',family:'Walker',img:'keira-walker-profile.png',facts:[['Born','26 March 1977'],['Species','Human'],['Education','L. Beaumont Preparatory']],sections:[['Parents',['Steven Walker','Wendy Walker']],['Siblings',['Pansy Hannah Walker — half-sister','Nathaniel Walker — half-brother','Nora Walker — half-sister']],['Extended family',['Martin Daniels — uncle','Aurora Daniels — aunt','Dylan Logan Daniels — cousin','Logan Daniels — cousin','Lizzie Daniels — cousin']],['Relationships',['Jessica Stone — girlfriend','Louis Graves — ex']]]},
    'Nathaniel Walker': {id:'nathanielWalkerProfile',family:'Walker',img:'nathaniel-walker-profile.png',facts:[['Born','30 July 1979'],['Species','Human'],['Education','L. Beaumont Preparatory']],sections:[['Parents',['Edmund Patterson','Wendy Walker']],['Siblings',['Nora Walker — twin sister','Peter Patterson — half-brother','Penelope Patterson — half-sister','Keira Mor Walker — half-sister']]]},
    'Nora Walker': {id:'noraWalkerProfile',family:'Walker',img:'nora-walker-profile.png',facts:[['Born name','Noel Walker'],['Chosen name','Nora Walker'],['Gender','Transgender woman'],['Species','Human']],sections:[['Parents',['Edmund Patterson','Wendy Walker']],['Siblings',['Nathaniel Walker — twin brother','Peter Patterson — half-brother','Penelope Patterson — half-sister','Keira Mor Walker — half-sister']],['Relationship',['Weston Hanslet — boyfriend']],['Friends',['Bethany Alana Beaumont — best friend']]]},
    'Peter Patterson': {id:'peterPattersonProfile',family:'Patterson',img:'peter-patterson-profile.png',facts:[['Born','24 March 1978'],['Species','Human'],['Education','L. Beaumont Preparatory']],sections:[['Parents',['Edmund Patterson','Annabella Patterson']],['Siblings',['Nathaniel Walker — half-brother','Nora Walker — half-sister','Penelope Patterson — twin sister','Pansy Hannah Walker — half-sister']],['Relationship',['Thomas Marvolo Montague III — boyfriend']],['Friends',['Jamie Holt — best friend']]]},
    'Penelope Patterson': {id:'penelopePattersonProfile',family:'Patterson',img:'penelope-patterson-profile.png',facts:[['Born','24 March 1978'],['Species','Human'],['Education','L. Beaumont Preparatory']],sections:[['Parents',['Edmund Patterson','Annabella Patterson']],['Siblings',['Nathaniel Walker — half-brother','Nora Walker — half-sister','Peter Patterson — twin brother','Pansy Hannah Walker — half-sister']],['Relationship',['Claribel Montague — girlfriend']]]},
    'Pansy Hannah Walker': {id:'pansyWalkerProfile',family:'Walker',img:'pansy-walker-profile.png',facts:[['Born','6 August 1980'],['Species','Human'],['Education','L. Beaumont Preparatory']],sections:[['Parents',['Annabella Patterson','Steven Walker']],['Siblings',['Peter Patterson — half-brother','Penelope Patterson — half-sister','Keira Mor Walker — half-sister']],['Extended family',['Martin Daniels — uncle','Aurora Daniels — aunt','Dylan Logan Daniels — cousin','Logan Daniels — cousin','Lizzie Daniels — cousin']],['Relationships',['Lorenzo Whitmore — boyfriend','James Williams — ex']],['Friends',['Rebecca Rose Beaumont — best friend','Alexandria Jade Montague','Marley Dickson','Jasper Williams','James Williams','Corey Johnson']]]},
    'Dylan Logan Daniels': {id:'dylanDanielsProfile',family:'Daniels',img:'Dylan-Daniels-Profile.png',facts:[['Born','14 December 1978'],['Job','Police detective']],sections:[['Parents',['Martin Daniels','Aurora Daniels']],['Siblings',['Logan Daniels','Lizzie Daniels']],['Extended family',['Steven Walker — uncle','Wendy Walker — aunt','Keira Mor Walker — cousin','Pansy Hannah Walker — cousin']],['Relationships',['Alexandria Jade Montague — girlfriend','Bethany Alana Beaumont — ex']],['Friends',['Mattheo Thomas Marvolo Montague','Rebecca Rose Beaumont','Theodore Alexander Holt IV','Christian Dunn','Christie Dunn','Jacob Foster','Parker Grant','Dennis Kennedy','Amy Graves','Keira Mor Walker','Ruby Bardot','Blake Hardly','Isabella Richardson','Charlie Steven Beaumont','Louis Graves']]]},
    'Logan Daniels': {id:'loganDanielsProfile',family:'Daniels',img:'logan-daniels-profile.png',facts:[['Born','6 October 1979']],sections:[['Parents',['Martin Daniels','Aurora Daniels']],['Siblings',['Dylan Logan Daniels','Lizzie Daniels']],['Extended family',['Steven Walker — uncle','Wendy Walker — aunt','Keira Mor Walker — cousin','Pansy Hannah Walker — cousin']]]},
    'Lizzie Daniels': {id:'lizzieDanielsProfile',family:'Daniels',img:'lizzie-daniels-profile.png',facts:[['Born','1981']],sections:[['Parents',['Martin Daniels','Aurora Daniels']],['Siblings',['Logan Daniels','Dylan Logan Daniels']],['Extended family',['Steven Walker — uncle','Wendy Walker — aunt','Keira Mor Walker — cousin','Pansy Hannah Walker — cousin']],['Relationship',['Willow Johnson — girlfriend']],['Family history',['Lizzie was kidnapped after going missing. Dylan was blamed at first, but was later proven to have had nothing to do with it. Lizzie eventually returned home safely after many years.']]]}
  };

  const aliases = {
    'Annabella Patterson (nee Khan)':'Annabella Patterson',
    'Aurora Daniels (nee Walker)':'Aurora Daniels',
    'Keira Walker':'Keira Mor Walker',
    'Pansy Walker':'Pansy Hannah Walker',
    'Noel Walker':'Nora Walker',
    'Noel/Nora Walker':'Nora Walker',
    'Dylan Daniels':'Dylan Logan Daniels'
  };

  const targetName = text => {
    const clean = text.split(' — ')[0].trim();
    const name = aliases[clean] || clean;
    return people[name] ? name : null;
  };
  const chips = items => items.map(item => {
    const target = targetName(item);
    return target ? `<span class="chip person-link" onclick="showResident('${target.replace(/'/g,"\\'")}')">${item}</span>` : `<span class="chip">${item}</span>`;
  }).join('');

  const install = () => {
    if (typeof window.showFamily !== 'function' || typeof window.showResident !== 'function' || typeof window.showPage !== 'function' || !document.getElementById('beaumontFamily')) { setTimeout(install,50); return; }

    if (!window.__pwdRoutingInstalled) {
      const oldFamily = window.showFamily;
      window.showFamily = name => families[name] ? window.showPage(families[name].id) : oldFamily(name);
      const oldResident = window.showResident;
      window.showResident = name => {
        const resolved = aliases[name] || name;
        return people[resolved] ? window.showPage(people[resolved].id) : oldResident(name);
      };
      window.__pwdRoutingInstalled = true;
    }

    Object.entries(families).forEach(([key,f]) => {
      if (document.getElementById(f.id)) return;
      const page = document.createElement('section'); page.id=f.id; page.className='page';
      page.innerHTML = `<div class="family-title"><div class="crumb">Hollow's Creek → Families → ${key}</div><div class="subtitle">Family Profile</div><h2>${f.title}</h2></div><main class="beaumont-shell"><div class="overview-grid"><article class="panel"><h3>Family Overview</h3><p>${f.overview}</p></article><aside class="panel"><div class="fact"><small>Family</small><strong>${key}</strong></div><div class="fact"><small>Residence</small><strong>${f.residence}</strong></div><div class="fact"><small>Known members</small><strong>${f.members.length}</strong></div></aside></div><section class="members"><h3>Family Members</h3><div class="member-grid">${f.members.map(n=>`<button class="member-card" onclick="showResident('${n.replace(/'/g,"\\'")}')"><span>${n}</span><small>View profile →</small></button>`).join('')}</div></section><button class="back" onclick="showPage('families')">← Back to Families</button></main>`;
      document.getElementById('beaumontFamily').before(page);
    });

    Object.entries(people).forEach(([name,p]) => {
      if (document.getElementById(p.id)) return;
      const page=document.createElement('section'); page.id=p.id; page.className='page';
      const photo=p.img ? `<img class="profile-photo" src="${p.img}" alt="${name}">` : `<div class="bio-panel" style="min-height:260px;display:grid;place-items:center;color:#716a62;font:14px Arial">Photo not uploaded yet</div>`;
      page.innerHTML=`<div class="profile-head"><div class="crumb">Hollow's Creek → Residents → ${name}</div><div class="aka">Resident Profile</div><h2>${name}</h2></div><main class="becca-profile"><div class="profile-grid"><div>${photo}</div><article class="bio-panel"><h3>Profile</h3>${p.facts.map(([k,v])=>`<div class="bio-fact"><small>${k}</small><strong>${v}</strong></div>`).join('')}</article></div>${p.sections.map(([title,items])=>`<section class="profile-section"><h3>${title}</h3><div class="chips">${chips(items)}</div></section>`).join('')}<button class="back" onclick="showPage('${families[p.family].id}')">← Back to ${families[p.family].title}</button></main>`;
      document.getElementById('beaumontFamily').before(page);
    });

    const wrap=document.querySelector('#residents .residents-wrap');
    if (wrap) {
      const addSection = letter => {
        let group=document.getElementById('res-'+letter.toLowerCase());
        if (!group) {
          group=document.createElement('section'); group.className='letter-group'; group.id='res-'+letter.toLowerCase(); group.innerHTML=`<div class="letter">${letter}</div><div class="resident-list"></div>`;
          const groups=Array.from(wrap.querySelectorAll('.letter-group'));
          const next=groups.find(g => (g.querySelector('.letter')?.textContent.trim()||'Z') > letter);
          if (next) wrap.insertBefore(group,next); else wrap.appendChild(group);
        }
        const az=wrap.querySelector('.az');
        if (az && !az.querySelector(`a[href="#res-${letter.toLowerCase()}"]`)) {
          const a=document.createElement('a'); a.href=`#res-${letter.toLowerCase()}`; a.textContent=letter;
          const links=Array.from(az.querySelectorAll('a')); const next=links.find(x=>x.textContent.trim()>letter); if(next) az.insertBefore(a,next); else az.appendChild(a);
        }
        return group.querySelector('.resident-list');
      };
      const groups={D:['Martin Daniels','Aurora Daniels','Dylan Logan Daniels','Logan Daniels','Lizzie Daniels'],P:['Edmund Patterson','Annabella Patterson','Peter Patterson','Penelope Patterson'],W:['Steven Walker','Wendy Walker','Keira Mor Walker','Nathaniel Walker','Nora Walker','Pansy Hannah Walker']};
      Object.entries(groups).forEach(([letter,names])=>{const list=addSection(letter); names.forEach(name=>{wrap.querySelectorAll('.resident-row').forEach(btn=>{if(btn.querySelector('span')?.textContent.trim()===name) btn.remove();}); const b=document.createElement('button'); b.className='resident-row'; b.onclick=()=>window.showResident(name); b.innerHTML=`<span>${name}</span><small>Profile available →</small>`; list.appendChild(b);});});
    }
  };
  install();
})();