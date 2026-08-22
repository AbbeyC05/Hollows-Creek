(()=>{
const POSTERS=[
['The Hollow Pines','The hollow pines.jpg','Mystery'],['Starlight','Starlight.jpg','Romance'],['Falling For You','Falling For You.jpg','Romance'],['The Boy Next Door','The boy next door.jpg','Romance'],['Wildflower Hearts','Wildflower hearts.jpg','Drama'],['Glass House','Glass House.jpg','Thriller'],['Before We Fall','Before we fall.jpg','Drama'],["Queen's Gambit","Queen's Gambit.jpg",'Drama'],['Kingdom Come','Kingdom come.jpg','Fantasy'],['The Actress','The actress.jpg','Drama'],['The Last Broadcast','The last broadcast.jpg','Thriller'],['The Silence Below','The silence below.jpg','Horror']
];
function theatrePage(){
 let p=document.getElementById('beaumontTheatre');
 if(!p){p=document.createElement('section');p.id='beaumontTheatre';p.className='page bw bw-cinema';document.body.appendChild(p)}
 p.innerHTML=`<div class="bw-nav"><div class="bw-logo">BEAUMONT THEATRE<small>LIVE PERFORMANCE • HOLLOW'S CREEK</small></div><button class="back" onclick="showPage('businesses')">Businesses ↗</button></div><div class="bw-hero"><div class="bw-copy"><div class="bw-kicker">BEAUMONT THEATRE • MELISSA & REBECCA BEAUMONT</div><h1>Where Hollow's Creek takes the stage.</h1><p>A prestigious Beaumont performance venue created and owned together by sisters Melissa and Rebecca Beaumont, presenting plays, musicals, premieres, gala nights and special events.</p><button class="bw-btn" onclick="showPage('businesses')">BACK TO BUSINESSES</button></div><div class="bw-photo" style="background-image:linear-gradient(90deg,#101014 0,transparent 42%),url('Beaumont Theatre.jpg')"></div></div><section class="bw-section"><div class="bw-kicker">THE VENUE</div><h2>Beaumont Theatre</h2><div class="bw-grid"><div class="bw-card"><small>CO-OWNERS</small><h3>Melissa & Rebecca Beaumont</h3><p>The sisters created and own Beaumont Theatre together, combining Melissa's performance and film-industry experience with Rebecca's business and entertainment ventures.</p></div><div class="bw-card"><small>LIVE PERFORMANCE</small><h3>Main Auditorium</h3><p>Professional theatre for plays, musicals, touring productions and headline performances.</p></div><div class="bw-card"><small>FILM & INDUSTRY</small><h3>Premieres & Galas</h3><p>Red-carpet premieres, press nights, charity galas and special Beaumont events.</p></div><div class="bw-card"><small>BACKSTAGE</small><h3>Production Facilities</h3><p>Dressing rooms, rehearsal rooms, stage management, wardrobe, technical spaces and performer facilities.</p></div></div></section><div class="bw-footer"><span>© 1995 BEAUMONT THEATRE</span><span>HOLLOW'S CREEK • BOX OFFICE • EVENTS</span></div>`;
}
function theatreBusinessCard(){
 const page=document.getElementById('businesses'); if(!page)return;
 const grid=page.querySelector('.biz-grid')||page.querySelector('.bw-grid')||page.querySelector('.directory'); if(!grid)return;
 let card=document.getElementById('beaumont-theatre-business-card');
 if(!card){card=document.createElement('button');card.id='beaumont-theatre-business-card';card.className='biz-card';grid.appendChild(card)}
 card.onclick=()=>showPage('beaumontTheatre');
 card.innerHTML=`<small>Melissa & Rebecca Beaumont • Entertainment</small><strong>Beaumont Theatre</strong><p>Jointly owned by Melissa and Rebecca Beaumont — professional plays, musicals, premieres, galas and live performance in Hollow's Creek.</p>`;
}
function melissaPosters(){
 const p=document.getElementById('melFilmography'); if(!p)return;
 let old=p.querySelector('.mel-hard-posters'); if(old)old.remove();
 const base=p.querySelector('.bw-section'); if(!base)return;
 const sec=document.createElement('section');sec.className='mel-hard-posters';sec.style.cssText='max-width:1280px;margin:auto;padding:10px 5vw 70px';
 sec.innerHTML=`<div class="bw-kicker">RELEASED FILMS</div><h2 style="font:42px Georgia;margin:8px 0 12px">Movie Posters</h2><p style="max-width:760px;line-height:1.7;color:#c3bbc0">Melissa Beaumont's released screen work.</p><div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:28px">${POSTERS.map(([t,img,g])=>`<article style="background:#17161b;border:1px solid #48323b;overflow:hidden"><img src="${img}" alt="${t} poster" style="width:100%;aspect-ratio:2/3;object-fit:cover;display:block"><div style="padding:17px"><small style="color:#d1879e;font:700 9px Arial;letter-spacing:.15em;text-transform:uppercase">${g} • Released</small><h3 style="font:23px Georgia;margin:8px 0">${t}</h3></div></article>`).join('')}</div>`;
 base.insertAdjacentElement('afterend',sec);
}
function melissaTheatreLink(){
 const p=document.getElementById('melissaOfficial'); if(!p||p.querySelector('[data-mel-theatre]'))return;
 const host=p.querySelector('.bw-section'); if(!host)return;
 const b=document.createElement('button');b.className='bw-btn';b.dataset.melTheatre='1';b.textContent='BEAUMONT THEATRE';b.onclick=()=>showPage('beaumontTheatre');host.appendChild(b);
}
function run(){theatrePage();theatreBusinessCard();melissaPosters();melissaTheatreLink()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(run,6500));else setTimeout(run,6500);
setTimeout(run,9000);
})();