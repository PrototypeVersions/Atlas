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
    ["Dallas Football","Dallas","Texas","Sports","Local","DFW"],
    ["Chicago Baseball","Chicago","Illinois","Sports","Heritage","CHI"],
    ["Miami Basketball","Miami","Florida","Sports","Modern","MIA"],
    ["Boston Hockey","Boston","Massachusetts","Sports","Collector","BOS"],
    ["Seattle Soccer","Seattle","Washington","Sports","Premium","SEA"],
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
    "Donald Trump Novelty|Mug":"Donald Trump Novelty Head Mug",
    "Donald Trump Novelty|Shirt":"Donald Trump Novelty Graphic Shirt",
    "Donald Trump Novelty|Poster":"Donald Trump Novelty Art Print",
    "Donald Trump Novelty|Collectible":"Donald Trump Novelty Desk Figure",
    "Presidential History|Mug":"Presidential Portrait Coffee Mug",
    "Election Archive|Collectible":"Election Button Archive Set"
  };

  const suffix = { Jersey:"Heritage Jersey", Hat:"Structured Hat", Mug:"Coffee Mug", Shirt:"Graphic Shirt", Poster:"Art Print", Collectible:"Desk Collectible", "Tote Bag":"Canvas Tote", Jacket:"Utility Jacket" };

  const retail = [];
  subjects.forEach((subject, si) => {
    productSets[subject.interest].forEach((type, ti) => {
      const name = specialNames[`${subject.name}|${type}`] || `${subject.name} ${suffix[type]}`;
      retail.push({
        id:`r-${si}-${ti}`, mode:"retail", name,
        price:Math.max(14, basePrice[type] + ((si * 7 + ti * 5) % 13) - 4),
        place:subject.place, state:subject.state, interest:subject.interest,
        product:type, vibe:subject.vibe, cue:subject.cue,
        description:`A fictional ATLAS demo item inspired by ${subject.name.toLowerCase()}.`,
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
      description:`A fictional wholesale demo lot containing ${units} units.` };
  });

  return { retail, wholesale };
})();
