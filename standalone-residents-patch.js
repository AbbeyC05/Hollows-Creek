(() => {
  const people = {
    'Caroline Lovell': {
      id:'carolineLovellProfile', img:'caroline-lovell-profile.png', facts:[['Born','1975'],['Birthplace','Marbella, Spain'],['Residence',"Northside, Hollow's Creek"],['Species','Human']], sections:[['Family',['Caity Lovell — sister']],['Relationship',['Lukas Beaumont Jr — boyfriend']]]
    },
    'Caity Lovell': {
      id:'caityLovellProfile', img:'caity-lovell-profile.png', facts:[['Born','1980'],['Birthplace','Marbella, Spain'],['Residence',"Northside, Hollow's Creek"],['Species','Human']], sections:[['Relationship',['Jaden Pritchard — boyfriend']],['Friends',['Rebecca Beaumont']]]
    },
    "Kimberly O'Donnell": {
      id:'kimberlyODonnellProfile', img:"Kimberly-O'Donnel-profile.png", facts:[['Born','1978'],['Residence',"Southside, Hollow's Creek"],['Species','Human'],['Education','L. Beaumont Preparatory'],['Parents','Deceased']], sections:[['Relationship',['Charlie Beaumont — boyfriend']],['Friends',['Tristan Lewis','Amber Pierce']]]
    },
    'Amber Pierce': {
      id:'amberPierceProfile', img:'amber-pierce-profile.png', facts:[['Born','1978'],['Residence',"Southside, Hollow's Creek"],['Species','Human'],['Education','L. Beaumont Preparatory']], sections:[['Relationship',['Libby Beaumont — girlfriend']],['Family',['Camilla Green — cousin']]]
    },
    'Finn Lancaster': {
      id:'finnLancasterProfile', img:'finn-lancaster-profile.png', facts:[['Born','1980'],['Residence',"Northside, Hollow's Creek"],['Species','Human'],['Education','L. Beaumont Preparatory']], sections:[['Relationship',['Melissa Beaumont — girlfriend']]]
    },
    'Parker Grant': {
      id:'parkerGrantProfile', img:'parker-grant-profile.png', facts:[['Born','1977'],['Residence',"Southside, Hollow's Creek"],['Species','Human'],['Job','Police Detective']], sections:[['Relationship',['Celia Beaumont — girlfriend']],['Family',['Madeleine Grant — sister']],['Friends',['Dennis Kennedy','Dylan Daniels','Jacob Foster']]]
    },
    'Madeleine Grant': {
      id:'madeleineGrantProfile', img:'Madeleine-Grant-Profile.png', facts:[['Residence',"Southside, Hollow's Creek"],['Species','Human'],['Job','Pediatric Surgeon']], sections:[['Relationship',['Dean Pratt — boyfriend']],['Family',['Parker Grant — brother']],['Friends',['Kyla Gillis','Joe Taylor']]]
    },
    'Dean Pratt': {
      id:'deanPrattProfile', img:'dean-pratt-profile.png', facts:[['Residence',"Southside, Hollow's Creek"],['Species','Human'],['Job','Trauma Surgeon']], sections:[['Relationship',['Madeleine Grant — girlfriend']],['Friends',['Joe Taylor','Chloe Kepner','Lily Bennett']]]
    }
  };

  const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const q = s => String(s).replace(/\\/g,'\\\\').replace(/'/g,"\\'");

  const chips = items => items.map(item => `<span class="chip">${esc(item)}</span>`).join('');

  function makePage(name,p){
    if(document.getElementById(p.id)) return;
    const page=document.createElement('section'); page.id=p.id; page.className='page';
    page.innerHTML=`<div class="profile-head"><div class="crumb">Hollow's Creek → Residents → ${esc(name)}</div><div class="aka">Resident Profile</div><h2>${esc(name)}</h2></div><main class="becca-profile"><div class="profile-grid"><div><img class="profile-photo" src="${p.img}" alt="${esc(name)}"></div><article class="bio-panel"><h3>Profile</h3>${p.facts.map(([k,v])=>`<div class="bio-fact"><small>${esc(k)}</small><strong>${esc(v)}</strong></div>`).join('')}</article></div>${p.sections.map(([title,items])=>`<section class="profile-section"><h3>${esc(title)}</h3><div class="chips">${chips(items)}</div></section>`).join('')}<button class="back" onclick="showPage('residents')">← Back to Residents</button></main>`;
    document.getElementById('beaumontFamily')?.before(page) || document.body.appendChild(page);
  }

  function install(){
    if(typeof window.showResident!=='function' || typeof window.showPage!=='function' || !document.getElementById('residents')) return setTimeout(install,80);

    Object.entries(people).forEach(([name,p])=>makePage(name,p));

    if(!window.__standaloneResidentRouting){
      const old=window.showResident;
      window.showResident=function(name){
        if(people[name]) return window.showPage(people[name].id);
        return old(name);
      };
      window.__standaloneResidentRouting=true;
    }

    const wrap=document.querySelector('#residents .residents-wrap');
    if(!wrap) return;
    let holding=wrap.querySelector('#new-standalone-residents');
    if(!holding){
      holding=document.createElement('section');
      holding.id='new-standalone-residents';
      holding.className='letter-group';
      holding.innerHTML='<div class="letter">?</div><div class="resident-list"></div>';
      wrap.appendChild(holding);
    }
    const list=holding.querySelector('.resident-list');
    Object.keys(people).forEach(name=>{
      [...wrap.querySelectorAll('.resident-row')].forEach(btn=>{if((btn.querySelector('span')?.textContent||'').trim()===name)btn.remove();});
      const b=document.createElement('button'); b.className='resident-row'; b.type='button'; b.onclick=()=>window.showResident(name); b.innerHTML=`<span>${esc(name)}</span><small>Profile available →</small>`; list.appendChild(b);
    });
  }

  install();
})();