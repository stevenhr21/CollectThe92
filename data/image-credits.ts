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
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  watford: {
    title: "Vicarage Road, Watford",
    authorName: "Jbb503",
    authorUrl: "https://commons.wikimedia.org/wiki/File:Vicarage_Road_2015.jpg",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Vicarage_Road_2015.jpg",
    licenseName: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  west_brom: {
    title: "The Hawthorns, West Bromwich",
    authorName: "Jameboy",
    authorUrl: "https://commons.wikimedia.org/wiki/User:Jameboy",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:The_Hawthorns_from_Halfords_Lane.jpg",
    licenseName: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  wrexham: {
    title: "Racecourse Ground, Wrexham",
    authorName: "John Lord",
    authorUrl: "https://www.flickr.com/people/57899800@N00",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Racecourse_Ground,_Wrexham_(49329447362).jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  // ─── League One ──────────────────────────────────────────────
  afc_wimbledon: {
    title: "Cherry Red Records Stadium, London",
    authorName: "Johnlp",
    authorUrl: "https://commons.wikimedia.org/wiki/User:Johnlp",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Plough_Lane,_18_May_2021.jpg",
    licenseName: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  barnsley: {
    title: "Oakwell, Barnsley",
    authorName: "Martin Thirkettle",
    authorUrl: "https://www.geograph.org.uk/profile/33368",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:East_Stand,_Oakwell_-_geograph.org.uk_-_1494052.jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  blackpool: {
    title: "Bloomfield Road, Blackpool",
    authorName: "Toby Sedgwick",
    authorUrl: "https://www.geograph.org.uk/photo/2039284",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Bloomfield_Road_PL_Kickoff-geograph-2039284.jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  bolton: {
    title: "Toughsheet Community Stadium, Bolton",
    authorName: "Arne Museler",
    authorUrl: "http://www.arne-mueseler.com/",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Bolton_macron_wanderers_stadium.jpg",
    licenseName: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/de/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  bradford: {
    title: "Valley Parade, Bradford",
    authorName: "David Ingham",
    authorUrl: "https://www.flickr.com/photos/15462727@N07",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Valley_Parade,_Bradford.jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  burton: {
    title: "Pirelli Stadium, Burton upon Trent",
    authorName: "Alan Slater",
    authorUrl: "https://www.geograph.org.uk/profile/6500",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Burton_Albion_FC,_Pirelli_Stadium,_Burton_upon_Trent,_Staffordshire_-_geograph.org.uk_-_190956.jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  cardiff: {
    title: "Cardiff City Stadium, Cardiff",
    authorName: "Jon Candy",
    authorUrl: "https://www.flickr.com/photos/37195744@N03",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Cardiff_City_Stadium_Pitch.jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  doncaster: {
    title: "Eco-Power Stadium, Doncaster",
    authorName: "Richard Humphrey",
    authorUrl: "https://www.geograph.org.uk/profile/39484",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Half_time_-_Inside_The_Keepmoat_Stadium,_Doncaster_-_geograph.org.uk_-_4388667.jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  exeter: {
    title: "St James Park, Exeter",
    authorName: "Ze Gooner",
    authorUrl: "https://commons.wikimedia.org/wiki/File:Adam_Stansfield_Stand.jpg",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Adam_Stansfield_Stand.jpg",
    licenseName: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  huddersfield: {
    title: "John Smith's Stadium, Huddersfield",
    authorName: "Peter Turner",
    authorUrl: "https://www.geograph.org.uk/profile/60940",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Almost_kick-off_time_at_the_Galpharm_Stadium_(geograph_2672658).jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  leyton_orient: {
    title: "Brisbane Road, London",
    authorName: "Martin Belam",
    authorUrl: "https://www.flickr.com/photos/51035804249@N01",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Brisbane_Road_East_Stand_-_1.jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  lincoln: {
    title: "LNER Stadium, Lincoln",
    authorName: "DSimmonite",
    authorUrl: "https://commons.wikimedia.org/wiki/File:LNER_Community_Stadium_(cropped).jpg",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:LNER_Community_Stadium_(cropped).jpg",
    licenseName: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  luton: {
    title: "Kenilworth Road, Luton",
    authorName: "LTFC Wellingborough",
    authorUrl: "https://en.wikipedia.org/wiki/User:LTFC_Wellingborough",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Kenilworth_Stand_at_Kenilworth_Road,_2006.jpg",
    licenseName: "Public Domain",
    licenseUrl: "Public Domain",
    modified: false,
    notes: "Cropped from original",
  },

  mansfield: {
    title: "One Call Stadium, Mansfield",
    authorName: "Rileyandco",
    authorUrl: "https://commons.wikimedia.org/wiki/File:One_Call_Stadium.jpg",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:One_Call_Stadium.jpg",
    licenseName: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  northampton: {
    title: "Sixfields Stadium, Northampton",
    authorName: "Bearas",
    authorUrl: "https://commons.wikimedia.org/wiki/User:Bearas",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:2023_m._Sixfields_stadionas_Nortamptonas.jpg",
    licenseName: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  peterborough: {
    title: "Weston Homes Stadium, Peterborough",
    authorName: "DBColUtd",
    authorUrl: "https://en.wikipedia.org/wiki/User:DBColUtd",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Weston_Homes_Community_Stadium.jpg",
    licenseName: "Public Domain",
    licenseUrl: "Public Domain",
    modified: false,
    notes: "Cropped from original",
  },

  plymouth: {
    title: "Home Park, Plymouth",
    authorName: "Lee Vilenski",
    authorUrl: "https://commons.wikimedia.org/wiki/User:Lee_Vilenski",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Home_Park_(23705).jpg",
    licenseName: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  port_vale: {
    title: "Vale Park, Stoke-on-Trent",
    authorName: "Steve Daniels",
    authorUrl: "https://www.geograph.org.uk/profile/35305",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Hamil_Road_Stand_in_Vale_Park_-_geograph.org.uk_-_7453732.jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  reading: {
    title: "Select Car Leasing Stadium, Reading",
    authorName: "Richard Croft",
    authorUrl: "https://www.geograph.org.uk/profile/1904",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Madejski_Stadium_-_geograph.org.uk_-_3023491.jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  rotherham: {
    title: "AESSEAL New York Stadium, Rotherham",
    authorName: "Richard Humphrey",
    authorUrl: "https://www.geograph.org.uk/profile/39484",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Inside_The_New_York_Stadium,_Rotherham_-_geograph.org.uk_-_5724957.jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  stevenage: {
    title: "Lamex Stadium, Stevenage",
    authorName: "Peter Garner",
    authorUrl: "https://www.geograph.org.uk/profile/39484",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:The_Lamex_Stadium,_Stevenage_-_geograph.org.uk_-_3866374.jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  stockport: {
    title: "Edgeley Park, Stockport",
    authorName: "Ceaton89",
    authorUrl: "https://commons.wikimedia.org/w/index.php?title=User:Ceaton89&action=edit&redlink=1",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:CheadleEnd2022.jpg",
    licenseName: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  wigan: {
    title: "Brick Community Stadium, Wigan",
    authorName: "Jordan Reay",
    authorUrl: "https://www.flickr.com/people/188084125@N08",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:DW_Stadium,_Wigan_(49788923253).jpg",
    licenseName: "Public Domain",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  wycombe: {
    title: "Adams Park, Wycombe",
    authorName: "DipsyDave",
    authorUrl: "https://commons.wikimedia.org/w/index.php?title=User:DipsyDave&action=edit&redlink=1",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:DW_Stadium,_Wigan_(49788923253).jpg",
    licenseName: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  // ─── League Two ──────────────────────────────────────────────
  accrington: {
    title: "Wham Stadium, Accrington",
    authorName: "COYB01",
    authorUrl: "https://en.wikipedia.org/wiki/User:COYB01",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Accrington_Stanley_Crown_Ground_2019.jpeg",
    licenseName: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  barnet: {
    title: "The Hive Stadium, Barnet",
    authorName: "Katie Chan",
    authorUrl: "https://commons.wikimedia.org/wiki/User:KTC",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:London_Bees%27s_The_Hive_Stadium_(01).jpg",
    licenseName: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  barrow: {
    title: "Holker Street, Barrow-in-Furness",
    authorName: "Barrovian",
    authorUrl: "https://commons.wikimedia.org/w/index.php?title=User:Barrovian&action=edit&redlink=1",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:HolkerStreet.png",
    licenseName: "CC BY 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by/3.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  bristol_rovers: {
    title: "Memorial Stadium, Bristol",
    authorName: "Lewis Clarke",
    authorUrl: "https://www.geograph.org.uk/profile/11775",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Bristol_,_The_Memorial_Stadium_-_geograph.org.uk_-_4399779.jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },
  
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

  cambridge: {
    title: "Abbey Stadium, Cambridge",
    authorName: "CU4ever",
    authorUrl: "https://commons.wikimedia.org/w/index.php?title=User:CU4ever&action=edit&redlink=1",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Habbin_Stand.JPG",
    licenseName: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  cheltenham: {
    title: "Completely-Suzuki Stadium, Cheltenham",
    authorName: "Steve Daniels",
    authorUrl: "https://www.geograph.org.uk/profile/35305",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Whaddon_Road_Stadium,_Cheltenham_-_geograph.org.uk_-_1248335.jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  chesterfield: {
    title: "SMH Group Stadium, Chesterfield",
    authorName: "Richard Croft",
    authorUrl: "https://www.geograph.org.uk/profile/1904",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:B2net_Stadium_1_-_geograph-1998863.jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  colchester: {
    title: "JobServe Community Stadium, Colchester",
    authorName: "Steve Daniels",
    authorUrl: "https://www.geograph.org.uk/profile/35305",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:The_Colchester_Community_Stadium_-_geograph.org.uk_-_5553022.jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  crewe: {
    title: "Gresty Road, Crewe",
    authorName: "Andrew Smith",
    authorUrl: "https://www.geograph.org.uk/profile/2562",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Gresty_Road,_Crewe.jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  fleetwood: {
    title: "Highbury Stadium, Fleetwood",
    authorName: "David Dixon",
    authorUrl: "https://www.geograph.org.uk/profile/43729",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Fleetwood_Town_FC_Stadium_-_geograph.org.uk_-_3043855.jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  gillingham: {
    title: "Priestfield Stadium, Gillingham",
    authorName: "David Dixon",
    authorUrl: "https://www.geograph.org.uk/profile/43729",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Fleetwood_Town_FC_Stadium_-_geograph.org.uk_-_3043855.jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  grimsby: {
    title: "Blundell Park, Grimsby",
    authorName: "Richard Croft",
    authorUrl: "https://www.geograph.org.uk/profile/1904",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Blundell_Park_-_geograph.org.uk_-_125740.jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  harrogate: {
    title: "EnviroVent Stadium, Harrogate",
    authorName: "Mark Anderson",
    authorUrl: "https://www.geograph.org.uk/profile/760",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Harrogate_Town_AFC_(geograph_6359795).jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },
  
  mk_dons: {
    title: "Stadium MK, Milton Keynes",
    authorName: "Steve Daniels",
    authorUrl: "https://www.geograph.org.uk/profile/35305",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Stadium_MK_in_Milton_Keynes_-_geograph.org.uk_-_6919020.jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  newport: {
    title: "Rodney Parade, Newport",
    authorName: "Roger Cornfoot",
    authorUrl: "https://www.geograph.org.uk/profile/8800",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:League_2_match_at_Rodney_Parade_-_geograph.org.uk_-_7889872.jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  notts_county: {
    title: "Meadow Lane, Nottingham",
    authorName: "Arne Museler",
    authorUrl: "http://www.arne-mueseler.com/",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Nottingham_county_fc_notts_stadium.jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/de/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  oldham: {
    title: "Boundary Park, Oldham",
    authorName: "Graham Hogg",
    authorUrl: "https://www.geograph.org.uk/profile/47667",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Boundary_Park_-_geograph.org.uk_-_2729825.jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  salford: {
    title: "Peninsula Stadium, Salford",
    authorName: "Salfordcityfc",
    authorUrl: "https://commons.wikimedia.org/w/index.php?title=User:Salfordcityfc&action=edit&redlink=1",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:The_Peninsula_Stadium_-_Salford_City.jpg",
    licenseName: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  shrewsbury: {
    title: "Croud Meadow, Shrewsbury",
    authorName: "Alice Humphreys",
    authorUrl: "https://commons.wikimedia.org/wiki/User:Transatracurium",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:STFC_-_New_Meadow_(Aerial).jpg",
    licenseName: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  swindon: {
    title: "County Ground, Swindon",
    authorName: "Bearas",
    authorUrl: "https://commons.wikimedia.org/wiki/User:Bearas",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:County_Ground_stadionas,_Svindonas_20230523_125024.jpg",
    licenseName: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  tranmere: {
    title: "Prenton Park, Birkenhead",
    authorName: "Samslipknot",
    authorUrl: "https://commons.wikimedia.org/w/index.php?title=User:Samslipknot&action=edit&redlink=1",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Prenton_Park_Panorama_1.jpg",
    licenseName: "Public Domain",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },

  walsall: {
    title: "Bescot Stadium, Walsall",
    authorName: "Steve Daniels",
    authorUrl: "https://www.geograph.org.uk/profile/35305",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:The_Homeserve_Stand_at_the_Banks%27s_Stadium_-_geograph.org.uk_-_6346690.jpg",
    licenseName: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/deed.en",
    modified: false,
    notes: "Cropped from original",
  },
};

export default imageCredits;
