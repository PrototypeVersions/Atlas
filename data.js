"use strict";

window.ATLAS_DATA = (() => {
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

  const basePrice = { Jersey:79, Hat:29, Mug:22, Shirt:32, Poster:24, Collectible:38, "Tote Bag":27, Jacket:68 };

  const subjects = [
    ["Dallas Cowboys","Dallas","Texas","Sports","Local","COWBOYS"],
    ["Chicago Cubs","Chicago","Illinois","Sports","Heritage","CUBS"],
    ["Miami Heat","Miami","Florida","Sports","Modern","HEAT"],
    ["Boston Bruins","Boston","Massachusetts","Sports","Collector","BRUINS"],
    ["Seattle Sounders FC","Seattle","Washington","Sports","Premium","SOUNDERS"],
    ["Arizona Diamondbacks","Phoenix","Arizona","Sports","Modern","DBACKS"],
    ["Atlanta Falcons","Atlanta","Georgia","Sports","Local","FALCONS"],
    ["Philadelphia 76ers","Philadelphia","Pennsylvania","Sports","Heritage","76ERS"],
    ["Texas State Pride","Texas","Texas","Travel","Americana","TX"],
    ["California Coast","California","California","Travel","Minimal","CA"],
    ["New York City","New York City","New York","Travel","Local","NYC"],
    ["Los Angeles","Los Angeles","California","Travel","Heritage","LA"],
    ["Nashville Music City","Nashville","Tennessee","Music","Nostalgic","NSH"],
    ["Austin Live Music","Austin","Texas","Music","Modern","ATX"],
    ["Memphis Soul","Memphis","Tennessee","Music","Heritage","MEM"],
    ["Seattle Music","Seattle","Washington","Music","Collector","SND"],
    ["Donald Trump Novelty","United States","National","Politics & History","Novelty","DT"],
    ["Presidential History","United States","National","Politics & History","Collector","USA"],
    ["Capitol History","Washington, D.C.","District of Columbia","Politics & History","Americana","DC"],
    ["Election Archive","United States","National","Politics & History","Heritage","VOTE"],
    ["Rocky Mountain National Park","Denver","Colorado","Outdoors","Premium","RMNP"],
    ["Pacific Northwest","Seattle","Washington","Outdoors","Minimal","PNW"],
    ["Desert Trail","Phoenix","Arizona","Outdoors","Modern","DST"],
    ["Appalachian Trail","Appalachia","Regional","Outdoors","Nostalgic","AT"],
    ["Retro Arcade","Anywhere","National","Gaming","Heritage","8BIT"],
    ["Pixel Quest","Anywhere","National","Gaming","Novelty","PX"],
    ["Classic Car Club","Detroit","Michigan","Automotive","Nostalgic","V8"],
    ["Route 66 Garage","United States","National","Automotive","Americana","66"],
    ["Campus Classics","College Town","National","College","Heritage","U"],
    ["Study Hall","College Town","National","College","Minimal","101"],
    ["Coffee Society","Anywhere","National","Food & Drink","Giftable","CAF"],
    ["Hot Sauce Club","Anywhere","National","Food & Drink","Modern","HOT"],
    ["Dog Person","Anywhere","National","Humor","Giftable","DOG"],
    ["Officially Weird","Anywhere","National","Humor","Novelty","?!"]
  ].map(([name,place,state,interest,vibe,cue]) => ({name,place,state,interest,vibe,cue}));

  const specialNames = {
    "Dallas Cowboys|Jersey":"Dallas Cowboys Navy Football Jersey",
    "Dallas Cowboys|Hat":"Dallas Cowboys New Era Navy 9FIFTY Hat",
    "Dallas Cowboys|Mug":"Dallas Cowboys 14oz Relief Mug",
    "Dallas Cowboys|Shirt":"Dallas Cowboys Navy Logo T-Shirt",
    "Chicago Cubs|Jersey":"Chicago Cubs Nike Home Jersey",
    "Chicago Cubs|Hat":"Chicago Cubs '47 Royal Blue Hat",
    "Chicago Cubs|Mug":"Chicago Cubs Sculpted Relief Mug",
    "Chicago Cubs|Shirt":"Chicago Cubs Royal Logo T-Shirt",
    "Miami Heat|Jersey":"Miami Heat Icon Edition Jersey",
    "Miami Heat|Hat":"Miami Heat '47 Black Team Hat",
    "Miami Heat|Mug":"Miami Heat 14oz Relief Mug",
    "Miami Heat|Shirt":"Miami Heat Primary Logo T-Shirt",
    "Boston Bruins|Jersey":"Boston Bruins Home Hockey Jersey",
    "Boston Bruins|Hat":"Boston Bruins '47 Black Team Hat",
    "Boston Bruins|Mug":"Boston Bruins 14oz Relief Mug",
    "Boston Bruins|Shirt":"Boston Bruins Black Logo T-Shirt",
    "Seattle Sounders FC|Jersey":"Seattle Sounders FC Home Jersey",
    "Seattle Sounders FC|Hat":"Seattle Sounders FC Two-Tone Snapback Hat",
    "Seattle Sounders FC|Mug":"Seattle Sounders FC 16oz Team Mug",
    "Seattle Sounders FC|Shirt":"Seattle Sounders FC Rave Green T-Shirt",
    "Arizona Diamondbacks|Jersey":"Arizona Diamondbacks White Replica Jersey",
    "Arizona Diamondbacks|Hat":"Arizona Diamondbacks Black New Era Snapback",
    "Arizona Diamondbacks|Mug":"Arizona Diamondbacks Current & Throwback Mug Set",
    "Arizona Diamondbacks|Shirt":"Arizona Diamondbacks Black Primary Logo T-Shirt",
    "Atlanta Falcons|Jersey":"Atlanta Falcons Black Football Jersey",
    "Atlanta Falcons|Hat":"Atlanta Falcons '47 Black Cleanup Hat",
    "Atlanta Falcons|Mug":"Atlanta Falcons Red Relief Mug",
    "Atlanta Falcons|Shirt":"Atlanta Falcons Black Primary Logo T-Shirt",
    "Philadelphia 76ers|Jersey":"Philadelphia 76ers Blue Throwback Jersey",
    "Philadelphia 76ers|Hat":"Philadelphia 76ers '47 Royal Hitch Hat",
    "Philadelphia 76ers|Mug":"Philadelphia 76ers 15oz Stripe Mug",
    "Philadelphia 76ers|Shirt":"Philadelphia 76ers Royal Fan T-Shirt",
    "Texas State Pride|Shirt":"Distressed Texas State Flag T-Shirt",
    "Texas State Pride|Hat":"Texas State Embroidered Hat",
    "Texas State Pride|Mug":"Texas Landmarks Souvenir Mug",
    "Texas State Pride|Tote Bag":"Texas Map Canvas Tote",
    "Texas State Pride|Poster":"Vintage Texas State Pride Poster",
    "California Coast|Mug":"California Icons Souvenir Mug",
    "California Coast|Tote Bag":"Vintage California Map Tote Bag",
    "New York City|Mug":"New York City Landmark Coffee Mug",
    "New York City|Tote Bag":"New York City Skyline Canvas Tote",
    "New York City|Poster":"New York City Skyline Poster",
    "Los Angeles|Mug":"Los Angeles Landmark Coffee Mug",
    "Los Angeles|Poster":"Los Angeles California Skyline Poster",
    "Nashville Music City|Shirt":"Nashville Music City Guitar T-Shirt",
    "Austin Live Music|Shirt":"Austin Live Music Capital T-Shirt",
    "Austin Live Music|Poster":"Austin Live Music Capital Poster",
    "Austin Live Music|Hat":"Austin Live Music Capital Trucker Hat",
    "Donald Trump Novelty|Mug":"Donald Trump Novelty Head Mug",
    "Donald Trump Novelty|Shirt":"Donald Trump Novelty Graphic Shirt",
    "Donald Trump Novelty|Poster":"Donald Trump Novelty Art Print",
    "Donald Trump Novelty|Collectible":"Donald Trump Novelty Desk Figure",
    "Presidential History|Mug":"Presidential Portrait Coffee Mug",
    "Capitol History|Mug":"Washington D.C. Landmark Mug",
    "Capitol History|Poster":"Washington D.C. Vintage Travel Print",
    "Election Archive|Collectible":"Election Button Archive Set",
    "Pacific Northwest|Hat":"Pacific Northwest Embroidered Trucker Hat",
    "Pacific Northwest|Mug":"Pacific Northwest Landscape Camp Mug",
    "Retro Arcade|Shirt":"Neon 80s Arcade T-Shirt",
    "Retro Arcade|Mug":"Classic Arcade Cabinet Mug",
    "Classic Car Club|Shirt":"Vintage Classic Car Club T-Shirt",
    "Campus Classics|Shirt":"Vintage College Crest T-Shirt",
    "Campus Classics|Mug":"Vintage University Ceramic Mug",
    "Coffee Society|Mug":"Coffee Lover Ceramic Mug"
  };

  const photoBySubjectType = {
    "Dallas Cowboys|Jersey":"https://cdn.shoplightspeed.com/shops/604906/files/22728458/1500x4000x3/nike-nfl-dallas-cowboys-m-nike-dez-bryant-88-limit.jpg",
    "Dallas Cowboys|Hat":"https://www.neweracap.com/cdn/shop/files/70354436_9FIFTY_NFLSTOCK_DALCOW_OTC_3QL.jpg?v=1724680044",
    "Dallas Cowboys|Mug":"https://logobrands.com/cdn/shop/files/609-C14RM.jpg?v=1781709885",
    "Dallas Cowboys|Shirt":"https://shop.dallascowboys.mx/cdn/shop/files/220210289_2772DCOPMU_NVY_FF1.jpg?v=1754609371&width=1600",
    "Chicago Cubs|Jersey":"https://fanatics.frgimages.com/chicago-cubs/mens-nike-white-chicago-cubs-home-authentic-team-jersey_pi3594000_altimages_ff_3594413-7dfe7c7a05cf58cafe4dalt2_full.jpg?_hv=2&w=600",
    "Chicago Cubs|Hat":"https://www.ivyshop.com/cdn/shop/files/ChicagoCubs47BrandCap_1_651724fc-5e4d-41c1-abb4-04d858c12ebb.png?v=1767734693",
    "Chicago Cubs|Mug":"https://clarkstreetsports.com/cdn/shop/products/506-C14RM.jpg?v=1679928018&width=1946",
    "Chicago Cubs|Shirt":"https://www.sportsoutletexpress.com/cdn/shop/files/shopping_2.webp?v=1711645939&width=1946",
    "Miami Heat|Jersey":"https://static.nbastore.in/resized/900X900/280/nike-miami-heat-jimmy-butler-dri-fit-nba-swingman-icon-edition-202223-jersey-black-black-65cb9e3aa0dab.jpg",
    "Miami Heat|Hat":"https://ss201.liverpool.com.mx/lg/1175238723.jpg",
    "Miami Heat|Mug":"https://cdnimages.opentip.com/full/CSD/CSD-629333823.jpg",
    "Miami Heat|Shirt":"https://fanatics.frgimages.com/miami-heat/mens-black-miami-heat-primary-logo-t-shirt_pi2592000_altimages_ff_2592774alt2_full.jpg?_hv=2&w=1018",
    "Boston Bruins|Jersey":"https://media.purehockey.com/images/q_auto%2Cf_auto%2Cfl_lossy%2Cc_lpad%2Cb_auto%2Cw_1000%2Ch_1000/products/63919/42/176484/fanatics-authentic-jersey-boston-bruins-home-adult-boston-bruins",
    "Boston Bruins|Hat":"https://www.rollernco.com/33649-large_default/47-cap-nhl-boston-bruins-mvp-black-bruins.jpg",
    "Boston Bruins|Mug":"https://cdn11.bigcommerce.com/s-oo0gdojvjo/images/stencil/2560w/products/86609/161018/boston-bruins-14oz-black-ceramic-relief-coffee-mug__13708.1763385365.jpg?c=2",
    "Boston Bruins|Shirt":"https://i.sportisimo.com/products/images/1177/1177559/700x700/47-nhl-boston-bruins-imprint-echo-tee_2.jpg",
    "Seattle Sounders FC|Jersey":"https://www.simplyseattle.com/cdn/shop/files/1ae35cad040fdb68e4724780207f5b42.jpg?v=1763185163",
    "Seattle Sounders FC|Hat":"https://fanatics.frgimages.com/FFImage/thumb.aspx?i=%2Fproductimages%2F_2675000%2Faltimages%2Fff_2675448alt1_full.jpg&w=900",
    "Seattle Sounders FC|Mug":"https://images.tervis.com/is/image/tervis/1466676?&bgc=250%2C250%2C250&$PDP-LG-WEBP$",
    "Seattle Sounders FC|Shirt":"https://images.footballfanatics.com/FFImage/thumb.aspx?i=%2Fproductimages%2F_3422000%2Faltimages%2Fff_3422611-322d9479404b0dccefafalt1_full.jpg&w=900",
    "Arizona Diamondbacks|Jersey":"https://feeds.frgimages.com/ss4/https%3A/feeds.frgimages.com/ss4/altimages/ss4/p-12009004_u-delz0kt3yxqljoixnn48_v-5bc112ef7a834866bbd2da6bd664716d.jpg?_hv=3",
    "Arizona Diamondbacks|Hat":"https://fanatics.frgimages.com/FFImage/thumb.aspx?i=%2Fproductimages%2F_4008000%2Faltimages%2Fff_4008095-8bc1619c7b81c4dd3742alt1_full.jpg&w=900",
    "Arizona Diamondbacks|Mug":"https://media.kohlsimg.com/is/image/kohls/8129375?hei=1000&op_sharpen=1&wid=1000",
    "Arizona Diamondbacks|Shirt":"https://feeds.frgimages.com/ss4/https%3A/feeds.frgimages.com/ss5/altimages/ss5/p-14414887_pv-1_u-qrpwolthe0dgud76hkbt_v-62ebswu3yefojkdaho4v.jpg?_hv=3",
    "Atlanta Falcons|Jersey":"https://http2.mlstatic.com/D_844681-MLM106291177833_012026-O.jpg",
    "Atlanta Falcons|Hat":"https://fanatics.frgimages.com/atlanta-falcons/mens-atlanta-falcons-47-brand-black-cleanup-adjustable-hat_pi1409000_altimages_ff_1409944alt2_full.jpg?_hv=2&w=600",
    "Atlanta Falcons|Mug":"https://logobrands.com/cdn/shop/files/602-C14RM_1080x.jpg?v=1751383555",
    "Atlanta Falcons|Shirt":"https://cdn.awsli.com.br/1000x1000/59/59657/produto/12093154/1a95c133b4.jpg",
    "Philadelphia 76ers|Jersey":"https://baseec-img-mng.akamaized.net/images/item/origin/eb4c3f590692bf4ec22d4152e78d9d23.jpg?im=Resize%2Cwidth%3D1280%2Ctype%3Dnormal&imformat=generic&q=90",
    "Philadelphia 76ers|Hat":"https://academy.scene7.com/is/image/academy/headwear/47-philadelphia-76ers-hitch-snapback-hat-k-fhtch16gwp-rya-/og-image/1d50dbd1-33bd-43a8-b941-dea86ed91cc9",
    "Philadelphia 76ers|Mug":"https://fantreasures.com/cdn/shop/files/LB15STMUG_media_Philadelphia76ers_1024x1024.jpg?v=1732640442",
    "Philadelphia 76ers|Shirt":"https://feeds.frgimages.com/ss4/https%3A/feeds.frgimages.com/ss4/altimages/ss4/p-12084967_pv-1_u-13ia437q6phhcporeo4t_v-3f97952ffe3f435cbd792b6cf683cbf9.jpg",
    "Texas State Pride|Shirt":"https://i4.cloudfable.net/styles/550x550/8.51/Black/distressed-texas-state-flag-map-t-shirt-20240226014726-0n445c1b-s2.jpg",
    "Texas State Pride|Hat":"https://i5.walmartimages.com/seo/Mens-Texas-Hat-Texas-State-Outline-Embroidered-Trucker-Hat-Royal-White_75b32232-c511-4981-96f2-b82abbcf9c9d.45f5157af0f8a72e0b074544720d377b.jpeg?odnBg=FFFFFF&odnHeight=768&odnWidth=768",
    "Texas State Pride|Mug":"https://cdn11.bigcommerce.com/s-3y1hjx24/images/stencil/1280x1280/products/38601/82728/IMG_5236__60169.1757448968.jpg?c=2",
    "Texas State Pride|Tote Bag":"https://www.moradodesigns.com/cdn/shop/products/texas_tote_medium.jpg?v=1551198919",
    "Texas State Pride|Poster":"https://s3.amazonaws.com/adg-bucket/texas-map-vintage/2496-var-14460074754097.jpg",
    "California Coast|Mug":"https://cdn11.bigcommerce.com/s-36f60/images/stencil/1280x1280/products/9431/21466/61765-ca-icons-mug__25806.1688073773.jpg?c=2%3Fimbypass%3Don",
    "California Coast|Tote Bag":"https://imagiknit.com/cdn/shop/files/cali_tote_600x600.jpg?v=1734555368",
    "New York City|Mug":"https://angelastaehling.com/cdn/shop/products/New-York-City-white-ceramic-mug-with-color-inside-orange-11oz-right_750x.png?v=1631378036",
    "New York City|Tote Bag":"https://i.etsystatic.com/12992565/c/1648/1648/690/915/il/8625e5/4591139310/il_600x600.4591139310_ab42.jpg",
    "New York City|Poster":"https://img.posterstore.com/zoom/ps50804_1-168.jpg?auto=compress%2Cformat&fit=max&w=1080",
    "Los Angeles|Mug":"https://i.etsystatic.com/5693974/r/il/0a72ad/7375606589/il_fullxfull.7375606589_fhml.jpg",
    "Los Angeles|Poster":"https://www.walleditions.com/9317-thickbox_default/art-poster-los-angeles-california-skyline-colored-version-michael-tompsett.jpg",
    "Nashville Music City|Shirt":"https://i5.walmartimages.com/asr/b87462c2-916a-471d-b8c1-914412ea519b.88c04ff5ef0b475e0f6b52784e43cdb8.jpeg?odnBg=FFFFFF&odnHeight=612&odnWidth=612",
    "Austin Live Music|Shirt":"https://outhousedesigns.com/cdn/shop/products/img_proxy_1975f6b9-13a4-4668-b8af-cfa8fcca9d75.jpg?v=1678313899&width=960",
    "Austin Live Music|Poster":"https://www.wallpics.com/cdn/shop/files/2560253146709261418_2048.jpg?v=1743244153&width=1946",
    "Austin Live Music|Hat":"https://www.exit82art.com/uploads/items/014e7790ddf59b3fa20d8a7d8aa7f025884064c9.jpg",
    "Donald Trump Novelty|Mug":"https://images.jewelers.services/qgrepo/GM22428.jpg?h=566&w=566",
    "Donald Trump Novelty|Shirt":"https://2024election.com/cdn/shop/files/17914372490992976581_2048_1200x1200.jpg?v=1704390314",
    "Capitol History|Mug":"https://i.etsystatic.com/5917868/r/il/980787/6486268527/il_fullxfull.6486268527_1o24.jpg",
    "Capitol History|Poster":"https://i.pinimg.com/originals/0b/b3/13/0bb31397387c99393e91047ab68c1761.jpg",
    "Pacific Northwest|Hat":"https://www.millstreambainbridge.com/cdn/shop/products/PacificNorthwestNavy_1200x1200.webp?v=1658347486",
    "Pacific Northwest|Mug":"https://tenderlovingempire.com/cdn/shop/files/CG_PacificNorthwest_CampMug_001.jpg?v=1695397585",
    "Retro Arcade|Shirt":"https://images.teepublic.com/derived/production/designs/62587523_0/1720432785/i_m%3Abi_production_blanks_eabj4jnnotiueowzmy6k_1462829019%2Cc_0_0_470x%2Cs_630%2Cq_90.jpg",
    "Retro Arcade|Mug":"https://img.cloud360.top/uploader/d473bf1df6a39d085e19682812607300a1f2963c.jpg",
    "Classic Car Club|Shirt":"https://ih1.redbubble.net/image.6067329491.5334/ssrco%2Cclassic_tee%2Cmens_02%2C4a4440%3Acc103efb7a%2Cfront%2Cproduct_square%2Cx600.jpg",
    "Campus Classics|Shirt":"https://baseec-img-mng.akamaized.net/images/item/origin/48969b7b3bc2aa7c6df9956c4293fa42.jpg?im=Resize%2Cwidth%3D1280%2Ctype%3Dnormal&imformat=generic&q=90",
    "Campus Classics|Mug":"https://fighousevintage.com/cdn/shop/files/D84B8A32-31DE-41E2-9465-5A117A99ACE6_grande.jpg?v=1701836515",
    "Coffee Society|Mug":"https://i.etsystatic.com/51079861/r/il/7764a7/7459829169/il_fullxfull.7459829169_cmd4.jpg"
  };

  const suffix = { Jersey:"Heritage Jersey", Hat:"Structured Hat", Mug:"Coffee Mug", Shirt:"Graphic Shirt", Poster:"Art Print", Collectible:"Desk Collectible", "Tote Bag":"Canvas Tote", Jacket:"Utility Jacket" };

  const retail = [];
  subjects.forEach((subject, si) => {
    productSets[subject.interest].forEach((type, ti) => {
      const key = `${subject.name}|${type}`;
      const name = specialNames[key] || `${subject.name} ${suffix[type]}`;
      const photo = photoBySubjectType[key] || null;
      retail.push({
        id:`r-${si}-${ti}`, mode:"retail", name,
        price:Math.max(14, basePrice[type] + ((si * 7 + ti * 5) % 13) - 4),
        place:subject.place, state:subject.state, interest:subject.interest,
        product:type, vibe:subject.vibe, cue:subject.cue,
        photo,
        description:`ATLAS merchandise inspired by ${subject.name.toLowerCase()}, presented as prototype inventory for browsing and search testing.`,
        featured:(photo ? 0 : 30) + ((si * 4 + ti) % 19)
      });
    });
  });

  const wholesaleSeeds = [
    ["Texas Sports Retail Starter Pallet",120,1480,"Texas","Sports","Pallet","Local","TX"],
    ["Mixed Pro-Style Jersey Pallet",96,2300,"United States","Sports","Pallet","Premium","JRSY"],
    ["Assorted Sports Hat Case",72,690,"United States","Sports","Case","Giftable","CAP"],
    ["Dallas Fan Shop Mixed Lot",80,940,"Dallas","Sports","Lot","Local","DFW"],
    ["Retro Baseball Merchandise Lot",90,1125,"Chicago","Sports","Lot","Heritage","BALL"],
    ["Novelty Political Mug Case",48,420,"United States","Politics & History","Case","Novelty","USA"],
    ["Presidential History Gift-Shop Lot",84,890,"Washington, D.C.","Politics & History","Lot","Collector","DC"],
    ["Americana Election Archive Box",60,760,"United States","Politics & History","Case","Americana","VOTE"],
    ["City Pride Mug Pallet",144,1240,"United States","Travel","Pallet","Local","CITY"],
    ["Coastal Travel Gift Lot",100,980,"California","Travel","Lot","Giftable","COAST"],
    ["Texas Road-Trip Store Bundle",75,810,"Texas","Travel","Bundle","Americana","66"],
    ["Live Music Shirt Case",60,720,"Nashville","Music","Case","Nostalgic","MUSIC"],
    ["Austin Music Festival Retail Lot",96,1180,"Austin","Music","Lot","Modern","ATX"],
    ["Outdoor Adventure Starter Pallet",110,1690,"United States","Outdoors","Pallet","Premium","TRAIL"],
    ["Mountain Shop Hat + Mug Case",64,740,"Denver","Outdoors","Case","Giftable","MTN"],
    ["Retro Arcade Counter Display Lot",72,850,"United States","Gaming","Lot","Heritage","8BIT"],
    ["Classic Auto Gift-Shop Pallet",100,1450,"Detroit","Automotive","Pallet","Nostalgic","V8"],
    ["College Town Essentials Case",80,820,"College Town","College","Case","Heritage","U"],
    ["Coffee Shop Novelty Mug Pallet",120,980,"United States","Food & Drink","Pallet","Giftable","CAF"],
    ["Unusual Gifts Counter Lot",90,790,"United States","Humor","Lot","Novelty","?!"],
    ["Mystery Merchandise Pallet",180,1350,"United States","Mixed","Pallet","Novelty","?"],
    ["Premium Boutique Mixed Pallet",90,2200,"United States","Mixed","Pallet","Premium","A+"],
    ["Small Store Opening Bundle",55,575,"United States","Mixed","Bundle","Giftable","OPEN"],
    ["High-Volume Reseller Pallet",240,1980,"United States","Mixed","Pallet","Value","240"]
  ];

  const stateFor = place => ({Dallas:"Texas",Austin:"Texas",Chicago:"Illinois",Denver:"Colorado",Detroit:"Michigan",Nashville:"Tennessee","Washington, D.C.":"District of Columbia",California:"California",Texas:"Texas"}[place] || "National");

  const wholesale = wholesaleSeeds.map((s,i) => {
    const [name,units,price,place,interest,product,vibe,cue] = s;
    return { id:`w-${i}`, mode:"wholesale", name,units,price,place,state:stateFor(place),interest,product,vibe,cue,
      unitCost:price/units, retailValue:Math.round(price*(1.82+(i%4)*.1)), featured:i%9,
      description:`A fictional wholesale demo lot containing ${units} units.` };
  });

  return { retail, wholesale };
})();
