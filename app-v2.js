"use strict";

(() => {
  const DATA = window.ATLAS_DATA || { retail: [], wholesale: [] };
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const money = new Intl.NumberFormat("en-US", { style:"currency", currency:"USD", maximumFractionDigits:2 });

  const PHOTOS = {
    Jersey:"https://images.pexels.com/photos/5184688/pexels-photo-5184688.jpeg?auto=compress&dpr=1&h=900&w=900",
    Hat:"https://images.pexels.com/photos/8550900/pexels-photo-8550900.jpeg?auto=compress&dpr=1&h=900&w=900",
    Mug:"https://images.pexels.com/photos/29063086/pexels-photo-29063086/free-photo-of-minimalist-overhead-view-of-white-coffee-mug.jpeg?auto=compress&dpr=1&h=900&w=900",
    Shirt:"https://images.pexels.com/photos/6046231/pexels-photo-6046231.jpeg?auto=compress&dpr=1&h=900&w=900",
    "Tote Bag":"https://images.pexels.com/photos/9869067/pexels-photo-9869067.jpeg?auto=compress&dpr=1&h=900&w=900",
    Jacket:"https://images.pexels.com/photos/16430970/pexels-photo-16430970.jpeg?auto=compress&dpr=1&h=900&w=900",
    Poster:"https://images.pexels.com/photos/6373487/pexels-photo-6373487.jpeg?auto=compress&dpr=1&h=900&w=900",
    Collectible:"https://images.pexels.com/photos/15569394/pexels-photo-15569394/free-photo-of-figurine-of-a-cat-on-white-background.jpeg?auto=compress&dpr=1&h=900&w=900",
    wholesale:"https://images.pexels.com/photos/29653988/pexels-photo-29653988/free-photo-of-stack-of-cardboard-boxes-in-warehouse.jpeg?auto=compress&dpr=1&h=900&w=900"
  };

  function photoFor(item){ return item.photo || (item.mode === "wholesale" ? PHOTOS.wholesale : (PHOTOS[item.product] || PHOTOS.Shirt)); }
  function esc(v){ return String(v ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
  function placeText(item){ return (!item.state || ["National","Regional"].includes(item.state) || item.place === item.state) ? item.place : `${item.place}, ${item.state}`; }
  function inventory(mode){ return mode === "wholesale" ? DATA.wholesale : DATA.retail; }
  function allItems(){ return [...DATA.retail, ...DATA.wholesale]; }
  function getItem(id){ return allItems().find(x => x.id === id); }

  let cart = [];
  try { cart = JSON.parse(localStorage.getItem("atlasCart") || "[]"); if(!Array.isArray(cart)) cart=[]; } catch { cart=[]; }
  function saveCart(){ localStorage.setItem("atlasCart", JSON.stringify(cart)); updateCartCount(); }
  function updateCartCount(){ $$("#cart-count").forEach(el => el.textContent = cart.length); }

  function wireCart(){
    const open = $("#cart-button"), dialog = $("#cart-dialog"), close = $("#cart-close");
    if(!open || !dialog) return;
    open.addEventListener("click", () => { renderCart(); dialog.showModal(); });
    close?.addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", e => { if(e.target === dialog) dialog.close(); });
    $("#cart-items")?.addEventListener("click", e => {
      const btn = e.target.closest("[data-remove-cart]"); if(!btn) return;
      const i = cart.indexOf(btn.dataset.removeCart); if(i >= 0) cart.splice(i,1); saveCart(); renderCart();
    });
    $("#checkout-button")?.addEventListener("click", () => alert("Prototype only — no real payment or checkout is connected."));
  }

  function renderCart(){
    const wrap = $("#cart-items"), totalEl = $("#cart-total"); if(!wrap || !totalEl) return;
    if(!cart.length){ wrap.innerHTML = `<p style="color:var(--muted);line-height:1.6">Your demo cart is empty.</p>`; totalEl.textContent=money.format(0); return; }
    const counts = new Map(); cart.forEach(id => counts.set(id,(counts.get(id)||0)+1));
    let total=0;
    wrap.innerHTML=[...counts.entries()].map(([id,qty])=>{
      const item=getItem(id); if(!item) return ""; total += item.price*qty;
      return `<div class="cart-line"><div><strong>${esc(item.name)}</strong><small>${qty} × ${money.format(item.price)}</small><button type="button" data-remove-cart="${esc(id)}">Remove one</button></div><strong>${money.format(item.price*qty)}</strong></div>`;
    }).join("");
    totalEl.textContent=money.format(total);
  }

  function productCard(item){
    const sub = item.mode === "wholesale" ? `<small>${item.units} units · ${money.format(item.unitCost)}/unit</small>` : "";
    return `<article class="product-card">
      <a class="product-photo" href="product.html?id=${encodeURIComponent(item.id)}"><img src="${photoFor(item)}" alt="Photograph representing ${esc(item.name)}" loading="lazy"></a>
      <div class="product-info"><div class="product-meta">${esc(item.interest)} · ${esc(placeText(item))}</div><a class="product-name" href="product.html?id=${encodeURIComponent(item.id)}">${esc(item.name)}</a><div class="product-price">${money.format(item.price)}${sub}</div></div>
    </article>`;
  }

  function uniqueValues(items, kind){
    const set=new Set();
    items.forEach(item=>{
      if(kind === "place"){ set.add(item.place); if(!["National","Regional"].includes(item.state)) set.add(item.state); }
      else set.add(item[kind]);
    });
    return [...set].filter(Boolean).sort((a,b)=>a.localeCompare(b));
  }

  function initHome(){
    const form=$("#home-search-form");
    form?.addEventListener("submit", e=>{
      e.preventDefault(); const q=$("#home-search")?.value.trim() || "";
      location.href = q ? `results.html?q=${encodeURIComponent(q)}` : "browse.html";
    });
  }

  function initResults(){
    const params=new URLSearchParams(location.search);
    const mode=params.get("mode") === "wholesale" ? "wholesale" : "retail";
    const browse=params.get("browse");
    const value=params.get("value");
    const q=params.get("q") || "";
    const items=inventory(mode);
    const title=$("#results-title"), summary=$("#results-summary"), grid=$("#results-grid"), selection=$("#selection-screen"), load=$("#show-more");
    const search=$("#results-search-input"); if(search) search.value=q;
    if(mode === "wholesale") $("#results-wholesale-label")?.removeAttribute("hidden");

    if(browse && !value && !q){
      title.textContent = `Browse by ${browse === "vibe" ? "style" : browse}`;
      summary.textContent = "Choose one starting point.";
      grid.hidden=true; load?.setAttribute("hidden",""); selection.hidden=false;
      const values=uniqueValues(items,browse);
      selection.innerHTML=`<h2>${browse === "interest" ? "Interests" : browse === "place" ? "Places" : browse === "product" ? "Product types" : "Styles"}</h2><div class="selection-options">${values.map(v=>`<a class="selection-option" href="results.html?${mode === "wholesale" ? "mode=wholesale&" : ""}browse=${encodeURIComponent(browse)}&value=${encodeURIComponent(v)}"><span>${esc(v)}</span><span>→</span></a>`).join("")}</div>`;
      return;
    }

    const filters={ interest:params.get("interest"), place:params.get("place"), product:params.get("product"), vibe:params.get("vibe") };
    if(browse && value) filters[browse]=value;
    const terms=q.toLowerCase().split(/\s+/).filter(Boolean);
    let filtered=items.filter(item=>{
      if(terms.length){ const hay=[item.name,item.place,item.state,item.interest,item.product,item.vibe,item.cue].join(" ").toLowerCase(); if(!terms.every(t=>hay.includes(t))) return false; }
      return Object.entries(filters).every(([kind,val])=>{
        if(!val) return true; if(kind === "place") return item.place===val || item.state===val; return item[kind]===val;
      });
    });
    filtered.sort((a,b)=>a.featured-b.featured || a.name.localeCompare(b.name));
    title.textContent = q ? `Results for “${q}”` : value ? value : mode === "wholesale" ? "Wholesale inventory" : "Merchandise";
    summary.textContent = `${filtered.length} ${filtered.length === 1 ? "item" : "items"}`;
    selection.hidden=true; grid.hidden=false;
    let shown=12;
    const draw=()=>{ grid.innerHTML=filtered.slice(0,shown).map(productCard).join(""); if(load) load.hidden=shown>=filtered.length; };
    draw();
    load?.addEventListener("click",()=>{shown+=12;draw();});

    $("#results-search-form")?.addEventListener("submit",e=>{
      e.preventDefault(); const query=search.value.trim(); const p=new URLSearchParams(); if(mode==="wholesale") p.set("mode","wholesale"); if(query)p.set("q",query); location.href=`results.html?${p.toString()}`;
    });

    const filterDialog=$("#filter-dialog");
    $("#refine-button")?.addEventListener("click",()=>filterDialog.showModal());
    $("#filter-close")?.addEventListener("click",()=>filterDialog.close());
    const selectMap={interest:"#filter-interest",place:"#filter-place",product:"#filter-product",vibe:"#filter-vibe"};
    Object.entries(selectMap).forEach(([kind,sel])=>{
      const el=$(sel); if(!el)return; const vals=uniqueValues(items,kind); el.innerHTML=`<option value="">Any</option>${vals.map(v=>`<option value="${esc(v)}">${esc(v)}</option>`).join("")}`; const current=filters[kind]; if(current)el.value=current;
    });
    $("#apply-filters")?.addEventListener("click",()=>{
      const p=new URLSearchParams(); if(mode==="wholesale")p.set("mode","wholesale"); if(q)p.set("q",q);
      Object.entries(selectMap).forEach(([kind,sel])=>{const v=$(sel)?.value;if(v)p.set(kind,v);}); location.href=`results.html?${p.toString()}`;
    });
    $("#clear-refine")?.addEventListener("click",()=>location.href=mode==="wholesale"?"results.html?mode=wholesale":"results.html");
  }

  function initWholesale(){
    const grid=$("#wholesale-grid"); if(grid) grid.innerHTML=DATA.wholesale.slice(0,8).map(productCard).join("");
    $("#wholesale-search-form")?.addEventListener("submit",e=>{
      e.preventDefault(); const q=$("#wholesale-search")?.value.trim()||""; location.href=`results.html?mode=wholesale${q?`&q=${encodeURIComponent(q)}`:""}`;
    });
  }

  function initProduct(){
    const id=new URLSearchParams(location.search).get("id"), item=getItem(id), wrap=$("#product-content");
    if(!wrap) return;
    if(!item){wrap.innerHTML=`<div class="empty-state"><h1>Product not found</h1><p>Return to <a href="browse.html">Browse</a>.</p></div>`;return;}
    document.title=`${item.name} — ATLAS`;
    wrap.innerHTML=`<div class="product-main-photo"><img src="${photoFor(item)}" alt="Photograph representing ${esc(item.name)}"></div><div class="product-copy"><p class="eyebrow">${item.mode === "wholesale" ? "Wholesale inventory" : esc(item.interest)}</p><h1>${esc(item.name)}</h1><div class="price">${money.format(item.price)}</div><p class="description">${esc(item.description)} This is demo inventory for testing the ATLAS prototype.</p><div class="product-details"><div class="detail-row"><span>Product</span><span>${esc(item.product)}</span></div><div class="detail-row"><span>Place</span><span>${esc(placeText(item))}</span></div><div class="detail-row"><span>Style</span><span>${esc(item.vibe)}</span></div>${item.mode==="wholesale"?`<div class="detail-row"><span>Quantity</span><span>${item.units} units</span></div><div class="detail-row"><span>Approx. unit cost</span><span>${money.format(item.unitCost)}</span></div><div class="detail-row"><span>Est. demo retail value</span><span>${money.format(item.retailValue)}</span></div>`:""}</div><button class="button dark wide" id="add-to-cart" type="button">Add to demo cart</button><p style="font-size:.7rem;color:var(--muted);margin-top:12px">Prototype only. No real purchase will be made.</p></div>`;
    $("#add-to-cart")?.addEventListener("click",e=>{cart.push(item.id);saveCart();e.currentTarget.textContent="Added to demo cart";setTimeout(()=>e.currentTarget.textContent="Add to demo cart",1000);});
  }

  updateCartCount(); wireCart();
  const page=document.body.dataset.page;
  if(page==="home")initHome();
  if(page==="results")initResults();
  if(page==="wholesale")initWholesale();
  if(page==="product")initProduct();
})();
