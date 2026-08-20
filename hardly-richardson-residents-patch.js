(() => {
  const people = {
    'Blake Hardly': {
      id:'blakeHardlyProfile', img:'blake-hardly-profile.png',
      facts:[['Born','1979'],['Residence',"Northside, Hollow's Creek"],['Education','L. Beaumont Preparatory'],['Species','Human']],
      sections:[['Relationship',['Isabella Richardson — girlfriend']],['Friends',['Dylan Daniels','Mattheo Montague','Theodore Holt IV','Rebecca Beaumont','Alex Montague','Lorenzo Whitmore','Pansy Walker']]]
    },
    'Isabella Richardson': {
      id:'isabellaRichardsonProfile', img:'Isabella-richardson-profile.png',
      facts:[['Born','1980'],['Residence',"Northside, Hollow's Creek"],['Education','L. Beaumont Preparatory'],['Species','Human']],
      sections:[['Relationship',['Blake Hardly — boyfriend']],['Friends',['Rebecca Beaumont','Pansy Walker','Alex Montague','Mattheo Montague','Theodore Holt IV','Dylan Daniels','Lorenzo Whitmore']]]
    }
  };
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const chips=items=>items.map(item=>`<span class="chip">${esc(item)}</span>`).join('');
  function makePage(name,p){
    if(document.getElementById(p.id))return;
    const page=document.createElement('section'); page.id=p.id; page.className='page';
    page.innerHTML=`<div class="profile-head"><div class="crumb">Hollow's Creek → Residents → ${esc(name)}</div><div class="aka">Resident Profile</div><h2>${esc(name)}</h2></div><main class="becca-profile"><div class="profile-grid"><div><img class="profile-photo" src="${p.img}" alt="${esc(name)}"></div><article class="bio-panel"><h3>Profile</h3>${p.facts.map(([k,v])=>`<div class="bio-fact"><small>${esc(k)}</small><strong>${esc(v)}</strong></div>`).join('')}</article></div>${p.sections.map(([title,items])=>`<section class="profile-section"><h3>${esc(title)}</h3><div class="chips">${chips(items)}</div></section>`).join('')}<button class="back" onclick="showPage('residents')">← Back to Residents</button></main>`;
    document.getElementById('beaumontFamily')?.before(page) || document.body.appendChild(page);
  }
  function install(){
    if(typeof window.showResident!=='function'||typeof window.showPage!=='function'||!document.getElementById('residents'))return setTimeout(install,80);
    Object.entries(people).forEach(([name,p])=>makePage(name,p));
    const old=window.showResident;
    if(!window.__hardlyRichardsonRouting){
      window.showResident=function(name){if(people[name])return window.showPage(people[name].id);return old(name);};
      window.__hardlyRichardsonRouting=true;
    }
    const wrap=document.querySelector('#residents .residents-wrap'); if(!wrap)return;
    let holding=wrap.querySelector('#hardly-richardson-residents');
    if(!holding){holding=document.createElement('section');holding.id='hardly-richardson-residents';holding.className='letter-group';holding.innerHTML='<div class="letter">?</div><div class="resident-list"></div>';wrap.appendChild(holding);}
    const list=holding.querySelector('.resident-list');
    Object.keys(people).forEach(name=>{
      [...wrap.querySelectorAll('.resident-row')].forEach(btn=>{if((btn.querySelector('span')?.textContent||'').trim()===name)btn.remove();});
      const b=document.createElement('button');b.className='resident-row';b.type='button';b.onclick=()=>window.showResident(name);b.innerHTML=`<span>${esc(name)}</span><small>Profile available →</small>`;list.appendChild(b);
    });
  }
  install();
})();