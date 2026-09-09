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
    ["Phoenix Baseball","Phoenix","Arizona","Sports","Modern","PHX"],
    ["Atlanta Football","Atlanta","Georgia","Sports","Local","ATL"],
    ["Philadelphia Basketball","Philadelphia","Pennsylvania","Sports","Heritage","PHL"],
    ["Texas State Pride","Texas","Texas","Travel","Americana","TX"],
    ["California Coast","California","California","Travel","Minimal","CA"],
    ["New York City","New York City","New York","Travel","Local","NYC"],
    ["Los Angeles Sunset","Los Angeles","California","Travel","Heritage","LA"],
    ["Nashville Nights","Nashville","Tennessee","Music","Nostalgic","NSH"],
    ["Austin Live Music","Austin","Texas","Music","Modern","ATX"],
    ["Memphis Soul","Memphis","Tennessee","Music","Heritage","MEM"],
    ["Seattle Sound","Seattle","Washington","Music","Collector","SND"],
    ["Donald Trump Novelty","United States","National","Politics & History","Novelty","DT"],
    ["Presidential History","United States","National","Politics & History","Collector","USA"],
    ["Capitol History","Washington, D.C.","District of Columbia","Politics & History","Americana","DC"],
    ["Election Archive","United States","National","Politics & History","Heritage","VOTE"],
    ["Rocky Mountain","Denver","Colorado","Outdoors","Premium","MTN"],
    ["Pacific Northwest","Seattle","Washington","Outdoors","Minimal","PNW"],
    ["Desert Trail","Phoenix","Arizona","Outdoors","Modern","DST"],
    ["Appalachian Trail","Appalachia","Regional","Outdoors","Nostalgic","AT"],
    ["Retro Arcade","Anywhere","National","Gaming","Heritage","8BIT"],
    ["Pixel Quest","Anywhere","National","Gaming","Novelty","PX"],
    ["Classic Motor Club","Detroit","Michigan","Automotive","Nostalgic","V8"],
    ["Road Trip Garage","United States","National","Automotive","Americana","66"],
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
    "Donald Trump Novelty|Mug":"Donald Trump Novelty Head Mug",
    "Donald Trump Novelty|Shirt":"Donald Trump Novelty Graphic Shirt",
    "Donald Trump Novelty|Poster":"Donald Trump Novelty Art Print",
    "Donald Trump Novelty|Collectible":"Donald Trump Novelty Desk Figure",
    "Presidential History|Mug":"Presidential Portrait Coffee Mug",
    "Election Archive|Collectible":"Election Button Archive Set",
    "Texas State Pride|Hat":"Texas State Embroidered Hat",
    "Texas State Pride|Tote Bag":"Texas Map Canvas Tote",
    "California Coast|Mug":"California Icons Souvenir Mug",
    "New York City|Tote Bag":"New York City Skyline Canvas Tote",
    "Los Angeles Sunset|Mug":"Los Angeles Landmark Coffee Mug",
    "Nashville Nights|Shirt":"Nashville Music City Guitar T-Shirt",
    "Capitol History|Mug":"Washington D.C. Landmark Mug",
    "Capitol History|Poster":"Washington D.C. Vintage Travel Print"
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
    "Texas State Pride|Hat":"https://i5.walmartimages.com/seo/Mens-Texas-Hat-Texas-State-Outline-Embroidered-Trucker-Hat-Royal-White_75b32232-c511-4981-96f2-b82abbcf9c9d.45f5157af0f8a72e0b074544720d377b.jpeg?odnBg=FFFFFF&odnHeight=768&odnWidth=768",
    "Texas State Pride|Tote Bag":"https://www.moradodesigns.com/cdn/shop/products/texas_tote_medium.jpg?v=1551198919",
    "California Coast|Mug":"https://cdn11.bigcommerce.com/s-36f60/images/stencil/1280x1280/products/9431/21466/61765-ca-icons-mug__25806.1688073773.jpg?c=2%3Fimbypass%3Don",
    "New York City|Tote Bag":"https://i.etsystatic.com/12992565/c/1648/1648/690/915/il/8625e5/4591139310/il_600x600.4591139310_ab42.jpg",
    "Los Angeles Sunset|Mug":"https://i.etsystatic.com/5693974/r/il/0a72ad/7375606589/il_fullxfull.7375606589_fhml.jpg",
    "Nashville Nights|Shirt":"https://i5.walmartimages.com/asr/b87462c2-916a-471d-b8c1-914412ea519b.88c04ff5ef0b475e0f6b52784e43cdb8.jpeg?odnBg=FFFFFF&odnHeight=612&odnWidth=612",
    "Donald Trump Novelty|Mug":"https://images.jewelers.services/qgrepo/GM22428.jpg?h=566&w=566",
    "Donald Trump Novelty|Shirt":"https://2024election.com/cdn/shop/files/17914372490992976581_2048_1200x1200.jpg?v=1704390314",
    "Capitol History|Mug":"https://i.etsystatic.com/5917868/r/il/980787/6486268527/il_fullxfull.6486268527_1o24.jpg",
    "Capitol History|Poster":"https://i.pinimg.com/originals/0b/b3/13/0bb31397387c99393e91047ab68c1761.jpg"
  };

  const suffix = { Jersey:"Heritage Jersey", Hat:"Structured Hat", Mug:"Coffee Mug", Shirt:"Graphic Shirt", Poster:"Art Print", Collectible:"Desk Collectible", "Tote Bag":"Canvas Tote", Jacket:"Utility Jacket" };

  const retail = [];
  subjects.forEach((subject, si) => {
    productSets[subject.interest].forEach((type, ti) => {
      const key = `${subject.name}|${type}`;
      const name = specialNames[key] || `${subject.name} ${suffix[type]}`;
      retail.push({
        id:`r-${si}-${ti}`, mode:"retail", name,
        price:Math.max(14, basePrice[type] + ((si * 7 + ti * 5) % 13) - 4),
        place:subject.place, state:subject.state, interest:subject.interest,
        product:type, vibe:subject.vibe, cue:subject.cue,
        photo:photoBySubjectType[key] || null,
        description:`ATLAS merchandise inspired by ${subject.name.toLowerCase()}, presented as prototype inventory for browsing and search testing.`,
        featured:(si * 4 + ti) % 19
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
      description:`A prototype wholesale ATLAS lot containing ${units} units.` };
  });

  return { retail, wholesale };
})();
