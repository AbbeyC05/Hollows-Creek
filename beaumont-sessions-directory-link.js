(()=>{
function addSessionsEntry(){
 const businesses=document.getElementById('businesses');
 if(!businesses || !window.openBeaumontSessions) return false;
 const grid=businesses.querySelector('.biz-grid');
 if(!grid) return false;
 if(grid.querySelector('[data-beaumont-sessions]')) return true;
 const card=document.createElement('button');
 card.className='biz-card';
 card.dataset.beaumontSessions='1';
 card.innerHTML=`<small>Television • Complete Archive</small><strong>The Beaumont Sessions</strong><p>Watch all four seasons and browse every archived episode of Charlie Beaumont's music series.</p>`;
 card.onclick=()=>window.openBeaumontSessions();
 grid.appendChild(card);
 return true;
}
let tries=0;const timer=setInterval(()=>{tries++;if(addSessionsEntry()||tries>30)clearInterval(timer)},200);
})();