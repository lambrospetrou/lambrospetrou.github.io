export const SteakCheatsheets = [
  {
    type: "image",
    title: "Doneness temperatures",
    url: "/s/images/cooking/steak-rare-to-well-done-temps.jpg",
  },
  {
    type: "image",
    title: "Steak cooking times 1",
    url: "/s/images/cooking/steak-cooking-times-halal.jpg",
  },
  {
    type: "image",
    title: "Steak cooking times 2",
    url: "/s/images/cooking/steak-indoor-cooking-times-chart.jpg",
  },
  // {
  //   type: "image",
  //   title: "Animal Cuts - CraftedMeats.co.uk",
  //   url: "/s/images/cooking/craftedmeats-animal-cuts.png",
  // },
  {
    type: "image",
    title: "Beef Cuts",
    url: "/s/images/cooking/Cuts-of-Beef-Infographic.png",
  },
  {
    type: "image",
    title: "Cow Map: Beef Cuts",
    url: "/s/images/cooking/diagram-of-cuts-of-beef-on-cow.png",
  },
];

export const SteakReferences = [
  {
    type: "article",
    url: "https://www.seriouseats.com/the-food-lab-complete-guide-to-pan-seared-steaks",
    title: "The Food Lab's Complete Guide to Pan-Seared Steaks",
  },
  {
    type: "article",
    url: "https://www.seriouseats.com/old-wives-tales-about-cooking-steak",
    title: "7 Myths About Cooking Steak That Need to Go Away",
  },
  {
    type: "article",
    url: "https://www.leanandtenderbeef.com/Blog/Steak-Seasoning/",
    title: "Spice Things Up a Little: A List Of The Best Handmade Rubs and Steak Seasonings",
  },
  {
    type: "article",
    url: "https://www.seriouseats.com/how-to-reverse-sear-best-way-to-cook-steak",
    title: "The Food Lab: The Reverse Sear Is the Best Way to Cook a Steak, Period",
    notes: "Good for thick steaks, i.e. 2+ inches (5cm+)."
  },
  {
    type: "article",
    url: "https://www.bbcgoodfood.com/howto/guide/how-cook-perfect-steak",
    title: "How to cook the perfect steak",
  },
  {
    type: "article",
    url: "https://blog.thermoworks.com/beef/steak-temps-getting-it-right/",
    title: "Steak Temps: Getting It Right",
  },
  {
    type: "video",
    url: "https://www.youtube.com/watch?v=l1tsOOtgmFA",
    title: "Τα 9 μυστικά για την τέλεια μοσχαρίσια μπριζόλα - 9 secrets for the perfect steak (subtitled)",
  },
];

export const SteakUKOnline = [
  {
    url: "https://www.craftedmeats.co.uk/",
  },
  {
    url: "https://www.hgwalter.com/"
  },
  {
    url: "https://gridironmeat.co.uk/"
  },
];

export function getHostname(urlStr) {
  try {
    return new URL(urlStr).hostname;
  } catch (e) {
    // IE,
    return "";
  }
}
