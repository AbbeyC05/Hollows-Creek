(() => {
  const profiles = {
    'Harry Porter': { born:'1980', species:'Human', residence:"Hollow's Creek, Southside", school:'Creekside High', girlfriend:'Georgia Carter', family:'Unnamed Younger Brother — brother', friends:['Samuel Sinclair','David Jones','John Wilson','Joseph Miller','Max Ford','Felix Brown','Clarke Hudson','Poppy Carter'] },
    'Max Ford': { born:'1980', species:'Human', residence:"Hollow's Creek, Southside", school:'Creekside High', girlfriend:'Piper Ellwood', family:'Kasey Ford — sister', friends:['Samuel Sinclair','David Jones','John Wilson','Joseph Miller','Harry Porter','Felix Brown','Clarke Hudson'] },
    'Clarke Hudson': { born:'1980', species:'Human', residence:"Hollow's Creek, Southside", school:'Creekside High', girlfriend:'Kasey Ford', friends:['Samuel Sinclair','David Jones','John Wilson','Joseph Miller','Max Ford','Felix Brown','Harry Porter'] },
    'Molly Winter': { born:'1980', species:'Human', residence:"Hollow's Creek, Southside", school:'Creekside High', ex:'Samuel Sinclair' },
    'Piper Ellwood': { born:'1980', species:'Human', residence:"Hollow's Creek, Southside", school:'Creekside High', boyfriend:'Max Ford', friends:['Poppy Carter','Georgia Carter','Kasey Ford'] },
    'Kasey Ford': { born:'1981', species:'Human', residence:"Hollow's Creek, Southside", school:'Creekside High', boyfriend:'Clarke Hudson', family:'Max Ford — brother', friends:['Poppy Carter','Georgia Carter','Piper Ellwood'] }
  };
  const slug = n => n.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const link = n => `<a href="#resident-${slug(n)}">${n}</a>`;
  const links = arr => (arr||[]).map(link).join(', ');
  const card = (label,val) => val ? `<div class="detail-card"><div class="detail-label">${label}</div><div class="detail-value">${val}</div></div>` : '';
  const render = (name,p) => `<section id="resident-${slug(name)}" class="resident-profile" style="display:none"><div class="profile-shell"><p class="eyebrow">HOLLOW'S CREEK → RESIDENT</p><h1>${name}</h1><div class="detail-grid">${card('Born',p.born)}${card('Species',p.species)}${card('Residence',p.residence)}${card('School',p.school)}${card('Family',p.family)}${card('Boyfriend',p.boyfriend&&link(p.boyfriend))}${card('Girlfriend',p.girlfriend&&link(p.girlfriend))}${card('Ex',p.ex&&link(p.ex))}${card('Friends',links(p.friends))}</div></div></section>`;
  function addProfiles(){
    const host=document.querySelector('main')||document.body;
    Object.entries(profiles).forEach(([n,p])=>{ if(!document.getElementById('resident-'+slug(n))) host.insertAdjacentHTML('beforeend',render(n,p)); });
  }
  function addDirectory(){
    const residents=[...document.querySelectorAll('a[href*="#resident-"]')];
    const directory=document.querySelector('#residents, [id="residents-directory"], .residents-directory') || residents[0]?.closest('section');
    if(!directory) return;
    Object.keys(profiles).forEach(name=>{
      if(directory.querySelector(`a[href="#resident-${slug(name)}"]`)) return;
      const box=document.createElement('div'); box.className='resident-card'; box.dataset.surname=name.trim().split(/\s+/).pop();
      box.innerHTML=`<a href="#resident-${slug(name)}"><strong>${name}</strong><span>VIEW PROFILE →</span></a>`;
      directory.appendChild(box);
    });
  }
  function showHash(){
    const id=location.hash.slice(1); if(!id.startsWith('resident-')) return;
    document.querySelectorAll('.resident-profile').forEach(x=>x.style.display='none');
    const el=document.getElementById(id); if(el){el.style.display='block'; el.scrollIntoView({block:'start'});}
  }
  function reciprocal(){
    const pairs={
      'Georgia Carter':['Harry Porter'], 'Samuel Sinclair':['Harry Porter','Max Ford','Clarke Hudson'], 'David Jones':['Harry Porter','Max Ford','Clarke Hudson'], 'John Wilson':['Harry Porter','Max Ford','Clarke Hudson'], 'Joseph Miller':['Harry Porter','Max Ford','Clarke Hudson'], 'Felix Brown':['Harry Porter','Max Ford','Clarke Hudson'], 'Poppy Carter':['Harry Porter','Piper Ellwood','Kasey Ford'], 'Max Ford':['Harry Porter','Clarke Hudson'], 'Clarke Hudson':['Harry Porter','Max Ford'], 'Piper Ellwood':['Max Ford','Kasey Ford'], 'Kasey Ford':['Clarke Hudson','Piper Ellwood'], 'Samuel Sinclair':['Molly Winter','Harry Porter','Max Ford','Clarke Hudson']
    };
    // Existing global reciprocal-profile-links.js handles most reverse rendering; this map is exposed for it/future patches.
    window.HollowsCreekReciprocalAdditions=Object.assign(window.HollowsCreekReciprocalAdditions||{},pairs);
  }
  function init(){addProfiles();addDirectory();reciprocal();showHash();}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
  addEventListener('hashchange',showHash);
})();