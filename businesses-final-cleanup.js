(()=>{
function ensureTheatre(biz){
  biz.querySelectorAll('.melbiz-filmography,.mel-hard-posters').forEach(x=>x.remove());
  [...biz.querySelectorAll('section,div')].forEach(x=>{if(x!==biz&&/Released Filmography/i.test(x.textContent||'')&&/MELISSA BEAUMONT/i.test(x.textContent||'')){const target=x.classList.contains('melbiz-filmography')?x:(x.closest('.melbiz-filmography')||x);if(target&&target!==biz)target.remove()}});
  let grid=biz.querySelector('.biz-grid')||biz.querySelector('.business-grid')||biz.querySelector('.directory-grid')||biz.querySelector('.bw-grid')||biz.querySelector('.directory')||biz.querySelector('.grid');
  if(!grid){let section=document.getElementById('beaumont-theatre-directory-section');if(!section){section=document.createElement('section');section.id='beaumont-theatre-directory-section';section.className='bw-section';section.innerHTML='<div class="bw-kicker">ENTERTAINMENT</div><h2>Beaumont Theatre</h2><div class="biz-grid"></div>';biz.appendChild(section)}grid=section.querySelector('.biz-grid')}
  let card=document.getElementById('beaumont-theatre-business-card');
  if(!card){card=document.createElement('button');card.id='beaumont-theatre-business-card';card.className='biz-card';grid.appendChild(card)}else if(card.parentElement!==grid)grid.appendChild(card);
  card.onclick=()=>showPage('beaumontTheatre');
  card.innerHTML=`<small>Melissa & Becca Beaumont • Entertainment</small><strong>Beaumont Theatre</strong><p>Jointly owned by Melissa and Becca Beaumont — professional plays, musicals, premieres, galas and live performance in Hollow's Creek.</p>`;
}
function ensureStoryhouse(biz){
  const cards=[...biz.querySelectorAll('.biz-card,.business-card,.directory-card,button')].filter(x=>/The Storyhouse/i.test(x.textContent||''));
  if(cards.length){const keep=cards[0];keep.onclick=()=>showPage('storyhouseBusiness');cards.slice(1).forEach(x=>x.remove())}
  const h=document.getElementById('harperProfile');
  if(h){const links=[...h.querySelectorAll('button')].filter(x=>/Storyhouse/i.test(x.textContent||''));links.forEach(b=>b.onclick=()=>showPage('storyhouseBusiness'))}
}
function fix(){const biz=document.getElementById('businesses');if(!biz)return;ensureTheatre(biz);ensureStoryhouse(biz)}
[800,1800,3200,3800,5000,7500,10000,14000,18000].forEach(t=>setTimeout(fix,t));
})();