"use strict";

(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
  const palette = [
    ["#e63a2e", "#f4c430", "#1256b8"],
    ["#1256b8", "#f4f0e8", "#e63a2e"],
    ["#f4c430", "#111111", "#e63a2e"],
    ["#111111", "#f4c430", "#1256b8"],
    ["#d9e6ff", "#e63a2e", "#111111"],
    ["#f7d4cf", "#1256b8", "#111111"]
  ];

  const productSets = {
    Sports: ["Jersey", "Hat", "Mug", "Shirt"],
    "Politics & History": ["Mug", "Shirt", "Poster", "Collectible"],
    Music: ["Shirt", "Tote Bag", "Poster", "Hat"],
    Outdoors: ["Hat", "Mug", "Jacket", "Tote Bag"],
    Travel: ["Shirt", "Mug", "Tote Bag", "Poster"],
    Gaming: ["Shirt", "Mug", "Poster", "Collectible"],
    Automotive: ["Shirt", "Hat", "Poster", "Collectible"],
    College: ["Shirt", "Hat", "Mug", "Jacket"],
    Humor: ["Shirt", "Mug", "Tote Bag", "Collectible"],
    "Food & Drink": ["Mug", "Shirt", "Tote Bag", "Collectible"]
  };

  const basePrice = {
    Jersey: 79, Hat: 29, Mug: 22, Shirt: 32, Poster: 24,
    Collectible: 38, "Tote Bag": 27, Jacket: 68
  };

  const subjects = [
    { name: "Dallas Football", place: "Dallas", state: "Texas", interest: "Sports", vibe: "Local", cue: "DFW" },
    { name: "Chicago Baseball", place: "Chicago", state: "Illinois", interest: "Sports", vibe: "Retro", cue: "CHI" },
    { name: "Miami Basketball", place: "Miami", state: "Florida", interest: "Sports", vibe: "Bold", cue: "MIA" },
    { name: "Boston Hockey", place: "Boston", state: "Massachusetts", interest: "Sports", vibe: "Collector", cue: "BOS" },
    { name: "Seattle Soccer", place: "Seattle", state: "Washington", interest: "Sports", vibe: "Premium", cue: "SEA" },
    { name: "Phoenix Baseball", place: "Phoenix", state: "Arizona", interest: "Sports", vibe: "Bold", cue: "PHX" },
    { name: "Atlanta Football", place: "Atlanta", state: "Georgia", interest: "Sports", vibe: "Local", cue: "ATL" },
    { name: "Philadelphia Basketball", place: "Philadelphia", state: "Pennsylvania", interest: "Sports", vibe: "Retro", cue: "PHL" },
    { name: "Texas State Pride", place: "Texas", state: "Texas", interest: "Travel", vibe: "Americana", cue: "TX" },
    { name: "California Coast", place: "California", state: "California", interest: "Travel", vibe: "Minimal", cue: "CA" },
    { name: "New York City", place: "New York City", state: "New York", interest: "Travel", vibe: "Local", cue: "NYC" },
    { name: "Los Angeles Sunset", place: "Los Angeles", state: "California", interest: "Travel", vibe: "Retro", cue: "LA" },
    { name: "Nashville Nights", place: "Nashville", state: "Tennessee", interest: "Music", vibe: "Nostalgic", cue: "NSH" },
    { name: "Austin Live Music", place: "Austin", state: "Texas", interest: "Music", vibe: "Bold", cue: "ATX" },
    { name: "Memphis Soul", place: "Memphis", state: "Tennessee", interest: "Music", vibe: "Retro", cue: "MEM" },
    { name: "Seattle Sound", place: "Seattle", state: "Washington", interest: "Music", vibe: "Collector", cue: "SND" },
    { name: "Donald Trump Novelty", place: "United States", state: "National", interest: "Politics & History", vibe: "Novelty", cue: "DT" },
    { name: "Presidential History", place: "United States", state: "National", interest: "Politics & History", vibe: "Collector", cue: "USA" },
    { name: "Capitol History", place: "Washington, D.C.", state: "District of Columbia", interest: "Politics & History", vibe: "Americana", cue: "DC" },
    { name: "Election Archive", place: "United States", state: "National", interest: "Politics & History", vibe: "Retro", cue: "VOTE" },
    { name: "Rocky Mountain", place: "Denver", state: "Colorado", interest: "Outdoors", vibe: "Premium", cue: "MTN" },
    { name: "Pacific Northwest", place: "Seattle", state: "Washington", interest: "Outdoors", vibe: "Minimal", cue: "PNW" },
    { name: "Desert Trail", place: "Phoenix", state: "Arizona", interest: "Outdoors", vibe: "Bold", cue: "DST" },
    { name: "Appalachian Trail", place: "Appalachia", state: "Regional", interest: "Outdoors", vibe: "Nostalgic", cue: "AT" },
    { name: "Retro Arcade", place: "Anywhere", state: "National", interest: "Gaming", vibe: "Retro", cue: "8BIT" },
    { name: "Pixel Quest", place: "Anywhere", state: "National", interest: "Gaming", vibe: "Weird", cue: "PX" },
    { name: "Classic Motor Club", place: "Detroit", state: "Michigan", interest: "Automotive", vibe: "Nostalgic", cue: "V8" },
    { name: "Road Trip Garage", place: "United States", state: "National", interest: "Automotive", vibe: "Americana", cue: "66" },
    { name: "Campus Classics", place: "College Town", state: "National", interest: "College", vibe: "Retro", cue: "U" },
    { name: "Study Hall", place: "College Town", state: "National", interest: "College", vibe: "Minimal", cue: "101" },
    { name: "Coffee Society", place: "Anywhere", state: "National", interest: "Food & Drink", vibe: "Giftable", cue: "CAF" },
    { name: "Hot Sauce Club", place: "Anywhere", state: "National", interest: "Food & Drink", vibe: "Bold", cue: "HOT" },
    { name: "Dog Person", place: "Anywhere", state: "National", interest: "Humor", vibe: "Giftable", cue: "DOG" },
    { name: "Officially Weird", place: "Anywhere", state: "National", interest: "Humor", vibe: "Weird", cue: "?!" }
  ];

  function itemName(subject, type, index) {
    const special = {
      "Donald Trump Novelty|Mug": "Donald Trump Novelty Head Mug",
      "Donald Trump Novelty|Shirt": "Donald Trump Novelty Graphic Shirt",
      "Donald Trump Novelty|Poster": "Donald Trump Novelty Pop-Art Print",
      "Donald Trump Novelty|Collectible": "Donald Trump Novelty Desk Figure",
      "Presidential History|Mug": "Presidential Portrait Coffee Mug",
      "Election Archive|Collectible": "Election Button Archive Set"
    };
    if (special[subject.name + "|" + type]) return special[subject.name + "|" + type];
    const suffix = {
      Jersey: "Throwback Jersey", Hat: "Structured Hat", Mug: "Coffee Mug", Shirt: "Graphic Shirt",
      Poster: "Screenprint Poster", Collectible: "Desk Collectible", "Tote Bag": "Canvas Tote", Jacket: "Utility Jacket"
    }[type];
    return `${subject.name} ${suffix}`;
  }

  const retail = [];
  subjects.forEach((subject, sIndex) => {
    const types = productSets[subject.interest];
    types.forEach((type, tIndex) => {
      const price = basePrice[type] + ((sIndex * 7 + tIndex * 5) % 13) - 4;
      retail.push({
        id: `r-${sIndex}-${tIndex}`,
        mode: "retail",
        name: itemName(subject, type, tIndex),
        price: Math.max(12, price),
        place: subject.place,
        state: subject.state,
        interest: subject.interest,
        product: type,
        vibe: subject.vibe,
        cue: subject.cue,
        palette: palette[(sIndex + tIndex) % palette.length],
        description: `A fictional ATLAS demo item inspired by ${subject.name.toLowerCase()}. Use it to experiment with search, place, interest, product and vibe filters.`,
        featured: (sIndex * 4 + tIndex) % 17
      });
    });
  });

  const wholesaleSeeds = [
    ["Texas Sports Retail Starter Pallet", 120, 1480, "Texas", "Sports", "Pallet", "Local", "TX"],
    ["Mixed Pro-Style Jersey Pallet", 96, 2300, "United States", "Sports", "Pallet", "Premium", "JRSY"],
    ["Assorted Sports Hat Case", 72, 690, "United States", "Sports", "Case", "Giftable", "CAP"],
    ["Dallas Fan Shop Mixed Lot", 80, 940, "Dallas", "Sports", "Lot", "Local", "DFW"],
    ["Retro Baseball Merchandise Lot", 90, 1125, "Chicago", "Sports", "Lot", "Retro", "BALL"],
    ["Novelty Political Mug Case", 48, 420, "United States", "Politics & History", "Case", "Novelty", "USA"],
    ["Presidential History Gift-Shop Lot", 84, 890, "Washington, D.C.", "Politics & History", "Lot", "Collector", "DC"],
    ["Americana Election Archive Box", 60, 760, "United States", "Politics & History", "Case", "Americana", "VOTE"],
    ["City Pride Mug Pallet", 144, 1240, "United States", "Travel", "Pallet", "Local", "CITY"],
    ["Coastal Travel Gift Lot", 100, 980, "California", "Travel", "Lot", "Giftable", "COAST"],
    ["Texas Road-Trip Store Bundle", 75, 810, "Texas", "Travel", "Bundle", "Americana", "66"],
    ["Live Music Shirt Case", 60, 720, "Nashville", "Music", "Case", "Nostalgic", "MUSIC"],
    ["Austin Music Festival Retail Lot", 96, 1180, "Austin", "Music", "Lot", "Bold", "ATX"],
    ["Outdoor Adventure Starter Pallet", 110, 1690, "United States", "Outdoors", "Pallet", "Premium", "TRAIL"],
    ["Mountain Shop Hat + Mug Case", 64, 740, "Denver", "Outdoors", "Case", "Giftable", "MTN"],
    ["Retro Arcade Counter Display Lot", 72, 850, "United States", "Gaming", "Lot", "Retro", "8BIT"],
    ["Classic Auto Gift-Shop Pallet", 100, 1450, "Detroit", "Automotive", "Pallet", "Nostalgic", "V8"],
    ["College Town Essentials Case", 80, 820, "College Town", "College", "Case", "Retro", "U"],
    ["Coffee Shop Novelty Mug Pallet", 120, 980, "United States", "Food & Drink", "Pallet", "Giftable", "CAF"],
    ["Weird Gifts Counter Lot", 90, 790, "United States", "Humor", "Lot", "Weird", "?!"],
    ["Mystery Merchandise Pallet", 180, 1350, "United States", "Mixed", "Pallet", "Weird", "?"],
    ["Premium Boutique Mixed Pallet", 90, 2200, "United States", "Mixed", "Pallet", "Premium", "A+"],
    ["Small Store Opening Bundle", 55, 575, "United States", "Mixed", "Bundle", "Giftable", "OPEN"],
    ["High-Volume Reseller Pallet", 240, 1980, "United States", "Mixed", "Pallet", "Value", "240"]
  ];

  const wholesale = wholesaleSeeds.map((seed, index) => {
    const [name, units, price, place, interest, product, vibe, cue] = seed;
    const unitCost = price / units;
    return {
      id: `w-${index}`,
      mode: "wholesale",
      name, units, price, place,
      state: ["Texas", "California"].includes(place) ? place : place === "Dallas" || place === "Austin" ? "Texas" : place === "Chicago" ? "Illinois" : place === "Denver" ? "Colorado" : place === "Detroit" ? "Michigan" : place === "Nashville" ? "Tennessee" : place === "Washington, D.C." ? "District of Columbia" : "National",
      interest, product, vibe, cue,
      palette: palette[index % palette.length],
      unitCost,
      retailValue: Math.round(price * (1.8 + (index % 4) * .12)),
      description: `A fictional wholesale demo lot with ${units} units. ATLAS shows lot price, approximate unit cost and an estimated retail value so store buyers can compare inventory quickly.`,
      featured: index % 11
    };
  });

  const state = {
    mode: "retail",
    search: "",
    sort: "featured",
    filters: { place: [], interest: [], product: [], vibe: [], price: [] },
    filterMenu: null,
    cart: []
  };

  const els = {
    search: $("#search-input"), productGrid: $("#product-grid"), count: $("#result-count"),
    filters: $("#active-filters"), filterMenu: $("#filter-menu"), sort: $("#sort-select"),
    title: $("#catalog-title"), kicker: $("#catalog-kicker"), empty: $("#empty-state"),
    dialog: $("#product-dialog"), dialogContent: $("#dialog-content"), cartDialog: $("#cart-dialog"),
    cartItems: $("#cart-items"), cartCount: $("#cart-count"), cartTotal: $("#cart-total")
  };

  function escapeXML(value) {
    return String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" }[c]));
  }

  function productShape(type, ink = "#111111", fill = "#fffdf7") {
    const common = `stroke="${ink}" stroke-width="5" stroke-linejoin="round" fill="${fill}"`;
    if (type === "Mug" || type === "Case") return `<path d="M145 145h128v125c0 46-28 73-64 73s-64-27-64-73z" ${common}/><path d="M273 176h30c43 0 43 83 0 83h-30" ${common} fill="none"/>`;
    if (type === "Hat") return `<path d="M139 250c7-80 55-117 113-117s105 37 112 117z" ${common}/><path d="M217 251c77-3 132 11 163 33-52 8-115 3-177-12z" ${common}/>`;
    if (type === "Tote Bag" || type === "Bundle") return `<path d="M145 184h210l-20 170H165z" ${common}/><path d="M205 194c0-79 91-79 91 0" ${common} fill="none"/>`;
    if (type === "Poster") return `<rect x="150" y="118" width="200" height="264" ${common}/><circle cx="210" cy="184" r="34" fill="none" stroke="${ink}" stroke-width="5"/><path d="M180 305l58-62 40 38 44-52" fill="none" stroke="${ink}" stroke-width="5"/>`;
    if (type === "Collectible" || type === "Lot") return `<circle cx="250" cy="170" r="62" ${common}/><path d="M190 245h120l31 119H159z" ${common}/>`;
    if (type === "Jacket") return `<path d="M178 130l72 29 72-29 72 69-47 58-25-21v147H178V236l-25 21-47-58z" ${common}/><path d="M250 159v224" stroke="${ink}" stroke-width="5"/>`;
    if (type === "Pallet") return `<rect x="110" y="145" width="280" height="185" ${common}/><path d="M140 185h220M140 235h220M140 285h220" stroke="${ink}" stroke-width="5"/><path d="M100 340h300v35H100z" ${common}/>`;
    return `<path d="M167 137l83 32 83-32 71 75-52 55-32-29v149H180V238l-32 29-52-55z" ${common}/>`;
  }

  function artData(item) {
    const [a, b, c] = item.palette;
    const label = escapeXML(item.cue || "ATLAS");
    const type = escapeXML(item.product);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 500 500">
      <rect width="500" height="500" fill="${a}"/>
      <circle cx="62" cy="70" r="90" fill="${b}" stroke="#111" stroke-width="5"/>
      <rect x="365" y="42" width="112" height="112" fill="${c}" stroke="#111" stroke-width="5" transform="rotate(9 421 98)"/>
      <path d="M-20 424L520 360V520H-20Z" fill="${b}" stroke="#111" stroke-width="5"/>
      ${productShape(item.product)}
      <rect x="188" y="220" width="124" height="56" fill="${c}" stroke="#111" stroke-width="4"/>
      <text x="250" y="257" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="24" font-weight="900" fill="#111">${label}</text>
      <text x="22" y="475" font-family="Arial,Helvetica,sans-serif" font-size="18" font-weight="900" letter-spacing="2" fill="#111">${type.toUpperCase()}</text>
    </svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  function inventory() { return state.mode === "retail" ? retail : wholesale; }

  function placeText(item) {
    if (["National", "Regional"].includes(item.state) || item.place === item.state) return item.place;
    return `${item.place}, ${item.state}`;
  }

  function priceBucket(item) {
    if (state.mode === "retail") {
      if (item.price < 25) return "Under $25";
      if (item.price < 50) return "$25–$50";
      if (item.price < 100) return "$50–$100";
      return "$100+";
    }
    if (item.price < 500) return "Under $500";
    if (item.price < 1000) return "$500–$1,000";
    if (item.price < 1500) return "$1,000–$1,500";
    return "$1,500+";
  }

  function filterValues(kind) {
    if (kind === "price") return state.mode === "retail" ? ["Under $25", "$25–$50", "$50–$100", "$100+"] : ["Under $500", "$500–$1,000", "$1,000–$1,500", "$1,500+"];
    const values = new Set();
    inventory().forEach(item => {
      if (kind === "place") {
        values.add(item.place);
        if (!["National", "Regional"].includes(item.state)) values.add(item.state);
      } else values.add(item[kind]);
    });
    return [...values].sort((a, b) => a.localeCompare(b));
  }

  function matches(item) {
    const q = state.search.trim().toLowerCase();
    if (q) {
      const haystack = [item.name, item.place, item.state, item.interest, item.product, item.vibe, item.cue].join(" ").toLowerCase();
      const tokens = q.split(/\s+/).filter(Boolean);
      if (!tokens.every(token => haystack.includes(token))) return false;
    }
    return Object.entries(state.filters).every(([kind, selected]) => {
      if (!selected.length) return true;
      if (kind === "price") return selected.includes(priceBucket(item));
      if (kind === "place") return selected.some(value => value === item.place || value === item.state);
      return selected.includes(item[kind]);
    });
  }

  function filteredInventory() {
    const items = inventory().filter(matches);
    if (state.sort === "price-low") items.sort((a, b) => a.price - b.price);
    else if (state.sort === "price-high") items.sort((a, b) => b.price - a.price);
    else if (state.sort === "name") items.sort((a, b) => a.name.localeCompare(b.name));
    else items.sort((a, b) => a.featured - b.featured || a.name.localeCompare(b.name));
    return items;
  }

  function productCard(item) {
    const wholesaleLine = item.mode === "wholesale" ? `<span class="product-subprice">${item.units} units · ${money.format(item.unitCost)}/unit</span>` : "";
    return `<article class="product-card">
      <button class="product-image-button" type="button" data-open="${item.id}" aria-label="View ${escapeXML(item.name)}">
        <img class="product-art" src="${artData(item)}" alt="Stylized demo illustration of ${escapeXML(item.name)}">
        <span class="product-badge">${escapeXML(item.vibe)}</span>
      </button>
      <div class="product-body">
        <div class="product-meta">${escapeXML(item.interest)} · ${escapeXML(placeText(item))}</div>
        <div class="product-name">${escapeXML(item.name)}</div>
        <div class="product-bottom">
          <div class="product-price">${money.format(item.price)}${wholesaleLine}</div>
          <button class="quick-add" type="button" data-add="${item.id}" aria-label="Add ${escapeXML(item.name)} to demo cart">+</button>
        </div>
      </div>
    </article>`;
  }

  function render() {
    const items = filteredInventory();
    els.count.textContent = `${items.length} ${items.length === 1 ? "item" : "items"}`;
    els.productGrid.innerHTML = items.map(productCard).join("");
    els.empty.hidden = items.length !== 0;
    els.productGrid.hidden = items.length === 0;
    renderFilterChips();
    if (state.filterMenu) renderFilterMenu(state.filterMenu);
    els.title.textContent = state.mode === "retail" ? "All merchandise" : "Wholesale inventory";
    els.kicker.textContent = state.mode === "retail" ? "DISCOVER" : "FOR RETAILERS & RESELLERS";
  }

  function renderFilterChips() {
    const chips = [];
    Object.entries(state.filters).forEach(([kind, values]) => values.forEach(value => chips.push(`<span class="filter-chip">${escapeXML(value)}<button type="button" data-remove-filter="${kind}" data-value="${encodeURIComponent(value)}" aria-label="Remove ${escapeXML(value)}">×</button></span>`)));
    if (state.search.trim()) chips.unshift(`<span class="filter-chip">Search: ${escapeXML(state.search)}<button type="button" data-clear-search aria-label="Clear search">×</button></span>`);
    els.filters.innerHTML = chips.join("");
  }

  function renderFilterMenu(kind) {
    const values = filterValues(kind);
    const selected = state.filters[kind];
    els.filterMenu.hidden = false;
    els.filterMenu.innerHTML = values.map(value => `<button type="button" class="filter-option ${selected.includes(value) ? "selected" : ""}" data-filter-kind="${kind}" data-filter-value="${encodeURIComponent(value)}">${escapeXML(value)}</button>`).join("");
    $$(".filter-button").forEach(btn => btn.classList.toggle("open", btn.dataset.filterMenu === kind));
  }

  function closeFilterMenu() {
    state.filterMenu = null;
    els.filterMenu.hidden = true;
    els.filterMenu.innerHTML = "";
    $$(".filter-button").forEach(btn => btn.classList.remove("open"));
  }

  function clearFilters({ keepSearch = false } = {}) {
    Object.keys(state.filters).forEach(key => state.filters[key] = []);
    if (!keepSearch) {
      state.search = "";
      els.search.value = "";
    }
    closeFilterMenu();
    render();
  }

  function setMode(mode) {
    if (mode === state.mode) return;
    state.mode = mode;
    clearFilters();
    $$(".mode-card").forEach(btn => btn.classList.toggle("active", btn.dataset.mode === mode));
    $$(".nav-link").forEach(btn => btn.classList.toggle("active", (mode === "retail" && btn.dataset.view === "shop") || (mode === "wholesale" && btn.dataset.view === "wholesale")));
    els.search.placeholder = mode === "retail" ? "Try Dallas, baseball, retro, mugs, politics, gifts…" : "Try pallets, Texas, sports, mugs, under $1,000…";
    $("#catalog-section").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function itemById(id) { return [...retail, ...wholesale].find(item => item.id === id); }

  function showProduct(item) {
    const secondary = item.mode === "wholesale" ? `<p class="desc"><strong>${item.units} units</strong> · ${money.format(item.unitCost)} estimated cost per unit · ${money.format(item.retailValue)} estimated demo retail value.</p>` : "";
    els.dialogContent.innerHTML = `<div class="dialog-product">
      <div class="dialog-product-art"><img src="${artData(item)}" alt="Stylized demo illustration of ${escapeXML(item.name)}"></div>
      <div class="dialog-product-copy">
        <p class="kicker">${item.mode === "wholesale" ? "WHOLESALE DEMO LOT" : "ATLAS DEMO ITEM"}</p>
        <h2>${escapeXML(item.name)}</h2>
        <div class="price">${money.format(item.price)}</div>
        ${secondary}
        <p class="desc">${escapeXML(item.description)}</p>
        <div class="tag-list"><span class="tag">${escapeXML(placeText(item))}</span><span class="tag">${escapeXML(item.interest)}</span><span class="tag">${escapeXML(item.product)}</span><span class="tag">${escapeXML(item.vibe)}</span></div>
        <div class="dialog-actions"><button class="primary-button" type="button" data-dialog-add="${item.id}">Add to demo cart</button><button class="secondary-button" type="button" data-dialog-close>Keep browsing</button></div>
      </div>
    </div>`;
    els.dialog.showModal();
  }

  function addToCart(id) {
    const item = itemById(id);
    if (!item) return;
    state.cart.push(id);
    renderCartCount();
    const button = $(`[data-add="${CSS.escape(id)}"]`);
    if (button) {
      const old = button.textContent;
      button.textContent = "✓";
      setTimeout(() => button.textContent = old, 650);
    }
  }

  function renderCartCount() { els.cartCount.textContent = state.cart.length; }

  function renderCart() {
    if (!state.cart.length) {
      els.cartItems.innerHTML = `<p class="desc">Your demo cart is empty. Add a few items or wholesale lots to test the experience.</p>`;
      els.cartTotal.textContent = money.format(0);
      return;
    }
    const counts = new Map();
    state.cart.forEach(id => counts.set(id, (counts.get(id) || 0) + 1));
    let total = 0;
    els.cartItems.innerHTML = [...counts.entries()].map(([id, qty]) => {
      const item = itemById(id);
      total += item.price * qty;
      return `<div class="cart-line"><div><strong>${escapeXML(item.name)}</strong><small>${qty} × ${money.format(item.price)}</small><button type="button" data-cart-remove="${id}">Remove one</button></div><strong>${money.format(item.price * qty)}</strong></div>`;
    }).join("");
    els.cartTotal.textContent = money.format(total);
  }

  const starterPresets = [
    () => { state.filters.vibe = ["Weird"]; },
    () => { state.filters.interest = ["Sports"]; state.filters.vibe = ["Retro"]; },
    () => { state.filters.place = ["Texas"]; },
    () => { state.filters.vibe = ["Giftable"]; state.filters.price = state.mode === "retail" ? ["Under $25", "$25–$50"] : ["Under $500", "$500–$1,000"]; },
    () => { state.filters.interest = ["Politics & History"]; },
    () => { state.filters.product = state.mode === "retail" ? ["Mug"] : ["Pallet"]; }
  ];

  els.search.addEventListener("input", () => { state.search = els.search.value; render(); });
  els.sort.addEventListener("change", () => { state.sort = els.sort.value; render(); });
  $("#clear-filters").addEventListener("click", () => clearFilters());
  $("#empty-clear").addEventListener("click", () => clearFilters());
  $("#surprise-button").addEventListener("click", () => {
    clearFilters();
    starterPresets[Math.floor(Math.random() * starterPresets.length)]();
    render();
    $("#catalog-section").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  $$(".filter-button").forEach(button => button.addEventListener("click", () => {
    const kind = button.dataset.filterMenu;
    if (state.filterMenu === kind) closeFilterMenu();
    else { state.filterMenu = kind; renderFilterMenu(kind); }
  }));

  $$(".browse-card").forEach(card => card.addEventListener("click", event => {
    if (event.target.closest("button") || event.currentTarget === card) {
      state.filterMenu = card.dataset.browse;
      renderFilterMenu(state.filterMenu);
      $("#catalog-section").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }));

  $$(".mode-card").forEach(button => button.addEventListener("click", () => setMode(button.dataset.mode)));
  $$(".nav-link").forEach(button => button.addEventListener("click", () => setMode(button.dataset.view === "wholesale" ? "wholesale" : "retail")));

  els.filterMenu.addEventListener("click", event => {
    const button = event.target.closest("[data-filter-kind]");
    if (!button) return;
    const kind = button.dataset.filterKind;
    const value = decodeURIComponent(button.dataset.filterValue);
    const arr = state.filters[kind];
    const index = arr.indexOf(value);
    if (index >= 0) arr.splice(index, 1); else arr.push(value);
    render();
  });

  els.filters.addEventListener("click", event => {
    const remove = event.target.closest("[data-remove-filter]");
    if (remove) {
      const kind = remove.dataset.removeFilter;
      const value = decodeURIComponent(remove.dataset.value);
      state.filters[kind] = state.filters[kind].filter(v => v !== value);
      render();
    }
    if (event.target.closest("[data-clear-search]")) {
      state.search = "";
      els.search.value = "";
      render();
    }
  });

  els.productGrid.addEventListener("click", event => {
    const open = event.target.closest("[data-open]");
    const add = event.target.closest("[data-add]");
    if (open) showProduct(itemById(open.dataset.open));
    if (add) addToCart(add.dataset.add);
  });

  $("#dialog-close").addEventListener("click", () => els.dialog.close());
  els.dialogContent.addEventListener("click", event => {
    const add = event.target.closest("[data-dialog-add]");
    if (add) addToCart(add.dataset.dialogAdd);
    if (event.target.closest("[data-dialog-close]")) els.dialog.close();
  });

  $("#cart-button").addEventListener("click", () => { renderCart(); els.cartDialog.showModal(); });
  $("#cart-close").addEventListener("click", () => els.cartDialog.close());
  els.cartItems.addEventListener("click", event => {
    const remove = event.target.closest("[data-cart-remove]");
    if (!remove) return;
    const index = state.cart.indexOf(remove.dataset.cartRemove);
    if (index >= 0) state.cart.splice(index, 1);
    renderCartCount();
    renderCart();
  });
  $("#checkout-button").addEventListener("click", () => alert("Prototype only — no real checkout or payment is connected."));

  [els.dialog, els.cartDialog].forEach(dialog => dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  }));

  render();
  renderCartCount();
})();
