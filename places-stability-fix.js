(()=>{
  function wirePlaces(){
    document.querySelectorAll('button.card').forEach(btn=>{
      const title=btn.querySelector('strong');
      if(title && title.textContent.trim()==='Places'){
        btn.setAttribute('onclick',"showPage('places')");
        btn.style.cursor='pointer';
      }
    });
  }

  function fixNoir(){
    const page=document.getElementById('beaumontNoir');
    if(!page) return;
    const hero=page.querySelector('.bn-hero img');
    if(hero){
      hero.src='beaumont-noir-outdoor.png';
      hero.removeAttribute('onerror');
      hero.alt='Beaumont Noir exterior';
    }
    if(!page.querySelector('.bn-photo-gallery')){
      const info=page.querySelector('.bn-info');
      if(info){
        const gallery=document.createElement('div');
        gallery.className='bn-photo-gallery';
        gallery.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:18px;margin:30px 0 10px';
        gallery.innerHTML='<img src="beaumont-noir-outdoor.png" alt="Beaumont Noir exterior" style="width:100%;height:330px;object-fit:cover"><img src="beaumont-noir-indoor.png" alt="Beaumont Noir interior" style="width:100%;height:330px;object-fit:cover">';
        info.insertAdjacentElement('afterend',gallery);
      }
    }
  }

  function run(){wirePlaces();fixNoir();}
  run();
  setTimeout(run,700);
  setTimeout(run,1600);
})();