/**
 * Image credits for stadium photos.
 *
 * Add an entry keyed by the stadium ID (e.g. "arsenal", "man-utd").
 * Only fill in the fields you have — everything else defaults to null / false.
 *
 * Fields:
 *   title        – image title (e.g. "Emirates Stadium, London")
 *   authorName   – photographer / creator name
 *   authorUrl    – link to the author's profile
 *   sourceName   – where the image is hosted (defaults to "Wikimedia Commons" in display)
 *   sourceUrl    – direct link to the image page
 *   licenseName  – short licence name (e.g. "CC BY-SA 4.0")
 *   licenseUrl   – link to the licence text
 *   modified     – true if the image was cropped / edited (default: false)
 *   notes        – any extra info (e.g. "Cropped from original")
 */

export interface ImageCreditEntry {
  title?: string;
  authorName?: string;
  authorUrl?: string;
  sourceName?: string;
  sourceUrl?: string;
  licenseName?: string;
  licenseUrl?: string;
  modified?: boolean;
  notes?: string;
}

const imageCredits: Record<string, ImageCreditEntry> = {
  // ─── Premier League ──────────────────────────────────────────
  arsenal: {
    title: "Emirates Stadium, London",
    authorName: "Arne Museler",
    authorUrl: "http://www.arne-mueseler.com/",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:London_Emirates_Stadium_arsenal.jpg",
    licenseName: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/de/deed.de",
    modified: false,
    notes: "Cropped from original",
  },

  aston_villa: {
    title: "Villa Park, Birmingham",
    authorName: "Arne Museler",
    authorUrl: "http://www.arne-mueseler.com/",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Birmingham_aston_villa_park_stadium.jpg",
    licenseName: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/de/deed.de",
    modified: false,
    notes: "Cropped from original",
  },

  bournemouth: {
    title: "Vitality Stadium, Bournemouth",
    authorName: "Mr Ignavy",
    authorUrl: "https://www.geograph.org.uk/profile/18677",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:East_Stand_-_Vitality_Stadium_-_geograph.org.uk_-_7604192.jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  brentford: {
    title: "Gtech Community Stadium, London",
    authorName: "AndyScott",
    authorUrl: "https://commons.wikimedia.org/w/index.php?title=User:AndyScott&action=edit&redlink=1",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Brentford_Community_Stadium_2020.jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  brighton: {
    title: "Amex Stadium, Brighton",
    authorName: "Hassocks5489",
    authorUrl: "https://commons.wikimedia.org/wiki/User:Hassocks5489",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:American_Express_Community_Stadium_on_09-08-2011_(BHAFC_v_Gillingham,_League_Cup_First_Round)_(10).JPG",
    licenseName: "CC0 1.0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  burnley: {
    title: "Turf Moor, Burnley",
    authorName: "Colin Smith",
    authorUrl: "https://www.geograph.org.uk/profile/3972",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Burnley_F.C._-_Turf_Moor_-_geograph.org.uk_-_7284628.jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  chelsea: {
    title: "Stamford Bridge, London",
    authorName: "Arne Museler",
    authorUrl: "http://www.arne-mueseler.com/",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:London_Stamford_Bridge.jpg",
    licenseName: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/de/deed.de",
    modified: false,
    notes: "Cropped from original",
  },

  crystal_palace: {
    title: "Selhurst Park, London",
    authorName: "Arne Museler",
    authorUrl: "http://www.arne-mueseler.com/",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:London_Selhurst_Park_crystal_palace_stadium_aerialview.JPG",
    licenseName: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/de/deed.de",
    modified: false,
    notes: "Cropped from original",
  },

  everton: {
    title: "Hill Dickinson Stadium, Liverpool",
    authorName: "Austinobobbino",
    authorUrl: "https://commons.wikimedia.org/w/index.php?title=User:Austi%C3%B1obobbi%C3%B1o&action=edit&redlink=1",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Interior_of_Hill_Dickinson_Stadium.jpg",
    licenseName: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  fulham: {
    title: "Craven Cottage, London",
    authorName: "Kenneth Yarham",
    authorUrl: "https://www.geograph.org.uk/profile/25226",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Craven_Cottage_Football_Ground_-_geograph.org.uk_-_778731.jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  leeds: {
    title: "Elland Road, Leeds",
    authorName: "Stephen Armstrong",
    authorUrl: "https://www.geograph.org.uk/profile/1810",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Elland_Road_East_Stand_(geograph_5923678).jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  liverpool: {
    title: "Anfield, Liverpool",
    authorName: "Arne Museler",
    authorUrl: "http://www.arne-mueseler.com/",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Liverpool_anfield_road_stadium.jpg",
    licenseName: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/de/deed.de",
    modified: false,
    notes: "Cropped from original",
  },

  man_city: {
    title: "Etihad Stadium, Manchester",
    authorName: "Arne Museler",
    authorUrl: "http://www.arne-mueseler.com/",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://upload.wikimedia.org/wikipedia/commons/2/27/City_of_Manchester_Stadium_2023_cropped.jpg",
    licenseName: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/de/deed.de",
    modified: false,
    notes: "Cropped from original",
  },

  man_utd: {
    title: "Old Trafford, Manchester",
    authorName: "Arne Museler",
    authorUrl: "http://www.arne-mueseler.com/",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:2023_07_31_arne_mueseler_00060-Verbessert-RR_(53106651455).jpg",
    licenseName: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/de/deed.de",
    modified: false,
    notes: "Cropped from original",
  },

  newcastle: {
    title: "St James' Park, Newcastle",
    authorName: "Ian Paterson",
    authorUrl: "https://www.geograph.org.uk/profile/13639",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:St_James%27_Park_from_the_Sandman_Signature_hotel,_18_April_2012.jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/de/deed.de",
    modified: false,
    notes: "Cropped from original",
  },

  nottm_forest: {
    title: "City Ground, Nottingham",
    authorName: "Arne Museler",
    authorUrl: "http://www.arne-mueseler.com/",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/Category:City_Ground,_Nottingham#/media/File:Nottingham_the_city_ground_stadium_forest.jpg",
    licenseName: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/de/deed.de",
    modified: false,
    notes: "Cropped from original",
  },

  sunderland: {
    title: "Stadium of Light, Sunderland",
    authorName: "Arne Museler",
    authorUrl: "http://www.arne-mueseler.com/",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Sunderland_Stadium_of_Light_aerial.jpg",
    licenseName: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  tottenham: {
    title: "Tottenham Hotspur Stadium, London",
    authorName: "Arne Museler",
    authorUrl: "http://www.arne-mueseler.com/",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/Category:Tottenham_Hotspur_Stadium#/media/File:London_Tottenham_Hotspur_Stadium.jpg",
    licenseName: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/de/deed.de",
    modified: false,
    notes: "Cropped from original",
  },

  west_ham: {
    title: "London Stadium London",
    authorName: "Arne Museler",
    authorUrl: "http://www.arne-mueseler.com/",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:London_Olympic_Stadium_West_Ham.jpg",
    licenseName: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/de/deed.de",
    modified: false,
    notes: "Cropped from original",
  },

  wolves: {
    title: "Molineux Stadium, Wolverhampton",
    authorName: "Bex Walton",
    authorUrl: "https://www.flickr.com/photos/7831824@N04/54726219571/",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Back_in_position_in_the_Billy_Wright_stand_-_54726219571.jpg",
    licenseName: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  // ─── Championship ────────────────────────────────────────────
  birmingham: {
    title: "St Andrew's, Birmingham",
    authorName: "Bruker:TuborgLight",
    authorUrl: "https://no.wikipedia.org/wiki/Bruker:TuborgLight",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:TiltonRoadEnd01.JPG",
    licenseName: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  blackburn: {
    title: "Ewood Park, Blackburn",
    authorName: "Ronnie Macdonald",
    authorUrl: "https://www.flickr.com/people/7332125@N04",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Ewood_Park_2011.jpg",
    licenseName: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  bristol_city: {
    title: "Ashton Gate, Bristol",
    authorName: "SGGH",
    authorUrl: "https://en.wikipedia.org/wiki/User:SGGH",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Ashton_Gate_Stadium_(daytime).jpg",
    licenseName: "CC BY 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  coventry: {
    title: "Coventry Building Society Arena, Coventry",
    authorName: "Amakuru",
    authorUrl: "https://commons.wikimedia.org/wiki/User:Amakuru",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Coventry_Derby_October_2021_-_2.jpg",
    licenseName: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  derby: {
    title: "Pride Park Stadium, Derby",
    authorName: "Arne Museler",
    authorUrl: "http://www.arne-mueseler.com/",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Pride_Park_Stadium_from_the_north_west.jpg",
    licenseName: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  hull: {
    title: "MKM Stadium, Hull",
    authorName: "Paul",
    authorUrl: "https://commons.wikimedia.org/wiki/File:KC_North_Stand.JPG",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:KC_North_Stand.JPG",
    licenseName: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  ipswich: {
    title: "Portman Road, Ipswich",
    authorName: "Andrew Dunn",
    authorUrl: "http://www.andrewdunnphoto.com/",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Cobbold_Stand,_Ipswich_Town_Football_Club_8418.jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  leicester: {
    title: "King Power Stadium, Leicester",
    authorName: "Arne Museler",
    authorUrl: "http://www.arne-mueseler.com/",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:King_Power_Stadium_2023_cropped.jpg",
    licenseName: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  middlesbrough: {
    title: "Riverside Stadium, Middlesbrough",
    authorName: "Arne Museler",
    authorUrl: "http://www.arne-mueseler.com/",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:King_Power_Stadium_2023_cropped.jpg",
    licenseName: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  millwall: {
    title: "The Den, London",
    authorName: "Doyle of London",
    authorUrl: "https://commons.wikimedia.org/wiki/User:Doyle_of_London",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:West_Entrance_to_the_Den.jpg",
    licenseName: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  norwich: {
    title: "Carrow Road, Norwich",
    authorName: "Evelyn Simak",
    authorUrl: "https://www.geograph.org.uk/profile/14840",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:-2018-05-18_Aviva_Community_Stand,_Carrow_Road_football_stadium,_Norwich_(1).jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  oxford: {
    title: "Kassam Stadium, Oxford",
    authorName: "Nigel Cox",
    authorUrl: "https://www.geograph.org.uk/profile/2798",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Kassam_Stadium,_Oxford.jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  portsmouth: {
    title: "Fratton Park, Portsmouth",
    authorName: "Tim Sheerman-Chase",
    authorUrl: "https://www.flickr.com/photos/68932647@N00/54375452875/",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Fratton_Park,_aerial.jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  preston: {
    title: "Deepdale, Preston",
    authorName: "David Dixon",
    authorUrl: "https://www.geograph.org.uk/profile/43729",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Preston_North_End_FC_Deepdale_Stadium_-_geograph.org.uk_-_6181831.jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  qpr: {
    title: "Loftus Road, London",
    authorName: "Zakarie Faibis",
    authorUrl: "https://commons.wikimedia.org/wiki/User:Randy110912",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Loftus_Road_22.jpg",
    licenseName: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  sheff_utd: {
    title: "Bramall Lane, Sheffield",
    authorName: "Arne Museler",
    authorUrl: "http://www.arne-mueseler.com/",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Sheffield_united_bramall_lane_stadium.jpg",
    licenseName: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/de/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  sheff_wed: {
    title: "Hillsborough, Sheffield",
    authorName: "Arne Museler",
    authorUrl: "http://www.arne-mueseler.com/",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Sheffield_wednesday_hillsborough_stadium.jpg",
    licenseName: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/de/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  southampton: {
    title: "St Mary's Stadium, Southampton",
    authorName: "David Ingham",
    authorUrl: "https://www.flickr.com/photos/15462727@N07",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Northam_Stand.jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  stoke: {
    title: "bet365 Stadium, Stoke-on-Trent",
    authorName: "Gkbediako",
    authorUrl: "https://commons.wikimedia.org/w/index.php?title=User:Gkbediako&action=edit&redlink=1",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Aerial_view_of_Bet_365_Stadium.jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  swansea: {
    title: "Swansea.com Stadium, Swansea",
    authorName: "Jaggery",
    authorUrl: "https://www.geograph.org.uk/profile/39302",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:West_side_of_the_Liberty_Stadium,_Swansea_-_geograph.org.uk_-_6000416.jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  // ─── League One ──────────────────────────────────────────────

  // ─── League Two ──────────────────────────────────────────────
  bromley: {
    title: "Hayes Lane, Bromley",
    authorName: "Martin Addison",
    authorUrl: "https://www.geograph.org.uk/profile/4942",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Hayes_Lane_Stadium_(geograph_3359000).jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },
};

export default imageCredits;
