(()=>{
  const OUTDOOR='beaumont-noir-outdoor.png';
  const INDOOR='beaumont-noir-indoor.png';

  function makePlacesIfMissing(){
    let p=document.getElementById('places');
    if(p) return p;
    p=document.createElement('section');
    p.id='places';
    p.className='page places-page-mb';
    p.innerHTML=`<div class="plm-hero"><div class="mb-kicker">HOLLOW'S CREEK DIRECTORY</div><h1>Places</h1><p>Restaurants, bars, landmarks and destinations across Northside and Southside.</p></div><main class="plm-wrap"></main>`;
    document.body.appendChild(p);
    return p;
  }

  function ensureMaisonCard(wrap){
    const has=[...wrap.querySelectorAll('h2')].some(h=>h.textContent.trim()==='Maison Beaumont');
    if(has) return;
    const card=document.createElement('article');
    card.className='plm-card';
    card.innerHTML=`<img src="maison-beaumont-outdoor.png" alt="Maison Beaumont exterior"><div class="plm-copy"><div class="mb-kicker">NORTHSIDE • RESTAURANT</div><h2>Maison Beaumont</h2><p>Five-star Beaumont fine dining with formal French-led service.</p><p><b>★★★★★ • ££££ • Fine Dining</b></p><button type="button" onclick="showPage('maisonBeaumont')">Visit Maison Beaumont →</button></div>`;
    wrap.appendChild(card);
  }

  function ensureNoirCard(wrap){
    let card=document.getElementById('bn-place-card');
    if(!card){
      card=document.createElement('article');
      card.id='bn-place-card';
      card.className='plm-card';
      card.style.marginTop='28px';
      wrap.appendChild(card);
    }
    card.innerHTML=`<img src="${OUTDOOR}" alt="Beaumont Noir exterior"><div class="plm-copy"><div class="mb-kicker">NORTHSIDE • LUXURY BAR</div><h2>Beaumont Noir</h2><p>An exclusive high-class Beaumont cocktail and spirits bar serving prestige Champagne, rare bottles, luxury cocktails and late-night plates.</p><p><b>££££ • Smart Dress • Premium Table Service • Private Noir Room</b></p><button type="button" onclick="showPage('beaumontNoir')">Enter Beaumont Noir →</button></div>`;
  }

  function ensurePlaces(){
    const p=makePlacesIfMissing();
    let wrap=p.querySelector('.plm-wrap');
    if(!wrap){
      wrap=document.createElement('main');
      wrap.className='plm-wrap';
      p.appendChild(wrap);
    }
    ensureMaisonCard(wrap);
    ensureNoirCard(wrap);
    return p;
  }

  function fixNoirImages(){
    document.querySelectorAll('img').forEach(img=>{
      const src=(img.getAttribute('src')||'').toLowerCase();
      if(src==='beaumont-noir.png'||src==='beaumont-noir.jpg') img.setAttribute('src',OUTDOOR);
    });
    const page=document.getElementById('beaumontNoir');
    if(!page) return;
    const hero=page.querySelector('.bn-hero img');
    if(hero){hero.src=OUTDOOR;hero.alt='Beaumont Noir exterior';}
    if(!document.getElementById('bn-photo-gallery')){
      const info=page.querySelector('.bn-info');
      if(info){
        const gallery=document.createElement('div');
        gallery.id='bn-photo-gallery';
        gallery.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:18px;margin:30px 0 10px';
        gallery.innerHTML=`<img src="${OUTDOOR}" alt="Beaumont Noir exterior" style="width:100%;height:330px;object-fit:cover"><img src="${INDOOR}" alt="Beaumont Noir interior" style="width:100%;height:330px;object-fit:cover">`;
        info.insertAdjacentElement('afterend',gallery);
      }
    }
  }

  function wirePlacesButtons(){
    document.querySelectorAll('button.card').forEach(btn=>{
      const strong=btn.querySelector('strong');
      if(strong&&strong.textContent.trim()==='Places'){
        btn.setAttribute('onclick',"showPage('places')");
        btn.style.cursor='pointer';
      }
    });
    document.querySelectorAll('[onclick]').forEach(el=>{
      const oc=el.getAttribute('onclick')||'';
      if(oc.includes("showPage('placesPlaceholder')")||oc.includes('showPage("placesPlaceholder")')) el.setAttribute('onclick',"showPage('places')");
    });
  }

  const previous=window.showPage;
  window.showPage=function(id){
    if(id==='placesPlaceholder') id='places';
    if(id==='places') ensurePlaces();
    fixNoirImages();
    if(typeof previous==='function') return previous(id);
  };

  function repair(){wirePlacesButtons();ensurePlaces();fixNoirImages();}
  repair();
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',repair,{once:true});
  const observer=new MutationObserver(()=>{wirePlacesButtons();fixNoirImages();const p=document.getElementById('places');if(p){const w=p.querySelector('.plm-wrap');if(w){ensureMaisonCard(w);ensureNoirCard(w);}}});
  observer.observe(document.documentElement,{childList:true,subtree:true});
})();