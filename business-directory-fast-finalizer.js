(()=>{
const FINAL=[
['BB Fine Jewellery','Fine Jewellery • Bethany Beaumont','Luxury jewellery, bridal pieces and bespoke commissions.','bbJewellery'],
['RIOT','Boxing Club • Reece Beaumont','Boxing, conditioning, youth development and competitive training.','riotBoxing'],
['BB10','Football • Bradley Beaumont','Bradley Beaumont’s football performance brand and player essentials.','bb10'],
['Training Ground','Football Development • Bradley Beaumont','Coaching, player development, camps and private sessions.','trainingGround'],
['ALMA Beauty','Beauty • Celia Beaumont','Luxury, PRO, artistry, bridal and limited-edition beauty collections.','almaBeauty'],
['Panadería 23','Bakery & Café • Henry Beaumont','Fresh bread, pastries, coffee, cakes and catering.','panaderia23'],
['The Storyhouse','Books • Harper Beaumont','Harper Beaumont’s author home: books, series, collectors editions and upcoming releases.','harperBooks'],
['Melissa Beaumont','Actor • Official Site','Filmography, upcoming projects and behind-the-scenes archive.','melissaOfficial'],
['LEON','Menswear • Leon Beaumont','Leon Beaumont’s menswear fashion house: ready-to-wear, tailoring, eveningwear and private atelier.','leonOfficial'],
['ÉLAN','Dance Studio • Libby & Riley Beaumont','Dance training, performance and creative development in Hollow’s Creek.','elanStudio'],
['RILEY','Balletwear • Riley Beaumont','Balletwear, rehearsal layers, performance pieces and dancer essentials.','rileyByRiley']
];
const OLD=['Harper Beaumont Books','Leon Beaumont','Leon Beaumont Official'];
let normalising=false;
function strongText(card){return (card.querySelector('strong')?.textContent||'').trim()}
function exactCards(name){const biz=document.getElementById('businesses');if(!biz)return[];return [...biz.querySelectorAll('.biz-card,.business-card,button')].filter(x=>strongText(x).toLowerCase()===name.toLowerCase())}
function ensure(){
 if(normalising)return; normalising=true;
 const biz=document.getElementById('businesses');const grid=biz?.querySelector('.biz-grid');
 if(!biz||!grid){normalising=false;return}
 OLD.forEach(name=>exactCards(name).forEach(x=>x.remove()));
 FINAL.forEach(([name,small,desc,target])=>{
   let cards=exactCards(name);let card=cards.shift();cards.forEach(x=>x.remove());
   if(!card){card=document.createElement('button');card.className='biz-card';grid.appendChild(card)}
   const html=`<small>${small}</small><strong>${name}</strong><p>${desc}</p>`;
   if(card.innerHTML!==html)card.innerHTML=html;
   card.onclick=()=>showPage(target);
   card.dataset.businessFinal='1';
 });
 normalising=false;
}
ensure();
const grid=document.querySelector('#businesses .biz-grid');
if(grid){
 let queued=false;
 const observer=new MutationObserver(()=>{if(queued||normalising)return;queued=true;queueMicrotask(()=>{queued=false;ensure()})});
 observer.observe(grid,{childList:true,subtree:true,characterData:true});
 setTimeout(()=>observer.disconnect(),5500);
}
})();