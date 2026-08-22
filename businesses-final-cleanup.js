(()=>{
let theatreSelected=false;
function primaryGrid(biz){
  return biz.querySelector('.wrap > .biz-grid')||biz.querySelector('.biz-grid')||biz.querySelector('.business-grid')||biz.querySelector('.directory-grid')||biz.querySelector('.directory')||biz.querySelector('.grid');
}
function ensureTheatre(biz){
  biz.querySelectorAll('.melbiz-filmography,.mel-hard-posters').forEach(x=>x.remove());
  [...biz.querySelectorAll('section,div')].forEach(x=>{if(x!==biz&&/Released Filmography/i.test(x.textContent||'')&&/MELISSA BEAUMONT/i.test(x.textContent||'')){const target=x.classList.contains('melbiz-filmography')?x:(x.closest('.melbiz-filmography')||x);if(target&&target!==biz)target.remove()}});
  let grid=primaryGrid(biz);
  if(!grid)return;
  let matches=[...biz.querySelectorAll('button')].filter(x=>/Beaumont Theatre/i.test(x.textContent||''));
  let card=document.getElementById('beaumont-theatre-business-card')||matches[0];
  matches.filter(x=>x!==card).forEach(x=>x.remove());
  if(!card){card=document.createElement('button');grid.appendChild(card)}
  if(card.parentElement!==grid)grid.appendChild(card);
  card.id='beaumont-theatre-business-card';
  card.className='biz-card';
  card.removeAttribute('style');
  card.onclick=()=>showPage('beaumontTheatre');
  card.innerHTML=`<small>Entertainment • Melissa & Becca Beaumont</small><strong>Beaumont Theatre</strong><p>Professional plays, musicals, premieres, galas and live performance, jointly owned by Melissa and Becca Beaumont.</p>`;
}
function ensureStoryhouse(biz){
  const cards=[...biz.querySelectorAll('.biz-card,.business-card,.directory-card,button')].filter(x=>/The Storyhouse/i.test(x.textContent||''));
  if(cards.length){const keep=cards[0];keep.onclick=()=>showPage('storyhouseBusiness');cards.slice(1).forEach(x=>x.remove())}
  const h=document.getElementById('harperProfile');
  if(h){const links=[...h.querySelectorAll('button')].filter(x=>/Storyhouse/i.test(x.textContent||''));links.forEach(b=>b.onclick=()=>showPage('storyhouseBusiness'))}
}
function installTheatreGuard(){
  if(window.__theatreGuardInstalled)return;
  window.__theatreGuardInstalled=true;
  const originalShowPage=window.showPage;
  window.showPage=function(id){
    theatreSelected=id==='beaumontTheatre';
    const result=originalShowPage(id);
    if(theatreSelected){
      const p=document.getElementById('beaumontTheatre');
      if(p)p.classList.add('active');
    }
    return result;
  };
  const observer=new MutationObserver(()=>{
    if(!theatreSelected)return;
    const p=document.getElementById('beaumontTheatre');
    if(p&&!p.classList.contains('active'))p.classList.add('active');
  });
  observer.observe(document.body,{subtree:true,attributes:true,attributeFilter:['class']});
}
function fix(){const biz=document.getElementById('businesses');if(!biz)return;ensureTheatre(biz);ensureStoryhouse(biz)}
installTheatreGuard();
[800,1800,3200,3800,5000,7500,10000,14000,18000].forEach(t=>setTimeout(fix,t));
})();