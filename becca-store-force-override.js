(function(){
  function show(id){ if(window.showPage){ window.showPage(id); } }
  var albums=[
    ['London Boy','1992'],['Little Miss Beaumont','1992'],['No Adults Allowed','1992'],['Nostalgia','1993'],['Block & Delete','1994'],['Lost Without You','1995'],['Midnight in London','1995'],['So Long London','1995'],['After London','1995'],['Christmas Magic','1995'],['Christmas Mourning','1995']
  ];
  function slug(name){ return 'forcedEra_'+name.replace(/[^a-z0-9]+/gi,'_'); }
  function nav(){ return '<div class="viznav"><div class="logo">Rebecca Beaumont</div><div class="links"><button onclick="showPage(\'beccaStoreWebsite\')">Home</button><button onclick="showPage(\'storeMusic\')">Albums</button><button onclick="showPage(\'storeTour\')">Tour</button><button onclick="showPage(\'storeAccessories\')">Fan Merch</button></div><button onclick="showPage(\'businesses\')">Hollow\'s Creek Archive ↗</button></div>'; }
  function footer(){ return '<div class="vizfooter"><div><b>REBECCA BEAUMONT</b><br>Official Store</div><div>Albums • Era Merch • Tour</div><div>Hollow\'s Creek • UK</div></div>'; }
  function page(id,title,lead,body){ var p=document.getElementById(id); if(!p){ p=document.createElement('section'); p.id=id; document.body.appendChild(p); } p.className='page vizsite viz-store'; p.innerHTML=nav()+'<div class="vizhero"><div class="copy"><div class="vizeyebrow">Rebecca Beaumont • Official Store</div><h1>'+title+'</h1><p>'+lead+'</p></div></div>'+body+footer(); }
  function grid(){ var html='<div class="album-grid">'; albums.forEach(function(a){ html+='<button class="album-tile" onclick="showPage(\''+slug(a[0])+'\')"><div class="album-art"><span>'+a[0]+'</span></div><div class="album-meta"><small>'+a[1]+' • Album collection</small><strong>Shop the '+a[0]+' era →</strong></div></button>'; }); return html+'</div>'; }
  function product(name,price){ return '<div class="vizcard"><div class="productmock">'+name+'</div><h3>'+name+'</h3><div class="vizprice">'+price+'</div><button class="vizbtn">Add to Bag</button></div>'; }
  function install(){
    page('beccaStoreWebsite','The Rebecca Beaumont Store.','Every album has its own collection. Shop all eleven eras, tour merchandise and fan favourites.','<div class="vizsection"><h2>Shop by album era.</h2><p>Choose an album to open its full dedicated merchandise collection.</p>'+grid()+'</div>');
    page('storeMusic','Albums & Eras','The complete Rebecca Beaumont discography, with a dedicated merchandise shop for every era.','<div class="vizsection"><h2>Complete discography.</h2>'+grid()+'</div>');
    albums.forEach(function(a){ var items=product(a[0]+' — CD','£14.00')+product(a[0]+' Hoodie','£54.00')+product(a[0]+' Tee','£29.00')+product(a[0]+' Poster','£18.00')+product(a[0]+' Lyric Book','£16.00')+product(a[0]+' Photo Set','£14.00'); page(slug(a[0]),a[0],a[1]+' album collection','<div class="vizsection"><button class="vizbtn" onclick="showPage(\'storeMusic\')">← All Albums</button><h2>'+a[0]+' Collection</h2><div class="vizgrid">'+items+'</div></div>'); });
  }
  install();
  setTimeout(install,1000);
})();