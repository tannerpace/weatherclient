import ActivityEnum from "../enums/ActivityEnum";
import { WindDirection } from "../context/FilterContext";
const capersIslandImageUrl = '/party.jpg'
const birdKeyLat = "32.62833267361373"
const birdKeyLong = "-79.98719329863708"

export interface ActivitySpot {
  meta_description?: string;
  seo_title?: string;
  image_alt_text?: string;
  wildlife?: string;
  trail_length?: string;
  best_times?: string;
  activity: ActivityEnum;
  location_img_url: string;
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  island: string;
  winddirections: string;
  waves: string;
  depth: string;
  description: string;
  experience: string;
  references: string;
  viable_directions?: ViableDirections | null;
  minWindspeed?: number | undefined | null
}

export type ViableDirections = {
  [key in WindDirection]: number;
};

type ActivitySpotWithSringCoordinates = Omit<ActivitySpot, 'latitude' | 'longitude'> & { latitude: string; longitude: string };

const locations: ActivitySpotWithSringCoordinates[] = [
  {
    activity: ActivityEnum.Kitesurfing,
    id: 1,
    latitude: "32.76562356586255",
    longitude: "-79.82115738187443",
    name: "Sullivan's Island 28.5",
    island: "Sullivans",
    winddirections: "S,SW,SE,E,ENE",
    waves: "3",
    depth: "shallow inside",
    description: "Sullivan's Island is located along the Atlantic Ocean near the center of Charleston County. The town is bordered to the west by the entrance to Charleston Harbor, to the north by Cove Inlet and the west by the Intercostal waterway.",
    experience: "beginner",
    references: "https://en.wikipedia.org/wiki/Sullivan%27s_Island,_South_Carolina",
    location_img_url: "/photo1.jpg",
    image_alt_text: "View of Sullivan's Island Beach for kitesurfing", // SEO alt text
    seo_title: "Sullivan's Island Kitesurfing Spot - Charleston",      // SEO title
    meta_description: "Discover kitesurfing at Sullivan's Island, Charleston, a beginner-friendly spot with shallow waters and great wind conditions.", // SEO meta description
    viable_directions: {
      "N": 0,
      "S": 1,
      "E": 1,
      "W": 0,
      "NE": 1,
      "NW": 0,
      "SE": 1,
      "SW": 1
    },
  },
  {
    activity: ActivityEnum.Kitesurfing,
    id: 2,
    latitude: "32.640900462604456",
    longitude: "-79.96962012816843",
    name: "Folly Beach County Park",
    island: "Folly",
    winddirections: "S,SW,W,NNE",
    waves: "2",
    depth: "deep",
    description: "Folly Beach County Park is a large park on the south end of Folly Beach, a popular spot for kitesurfing with excellent wind conditions for beginners.",
    experience: "beginner",
    references: "https://en.wikipedia.org/wiki/Folly_Beach_County_Park",
    location_img_url: "/PANO0001-Pano.jpg",
    image_alt_text: "Kitesurfing at Folly Beach County Park, South Carolina", // SEO alt text
    seo_title: "Kitesurfing at Folly Beach County Park - Charleston",         // SEO title
    meta_description: "Explore kitesurfing at Folly Beach County Park in Charleston. A perfect location for beginners with strong winds and a picturesque beach.", // SEO meta description
    viable_directions: {
      "N": 0,
      "S": 1,
      "E": 1,
      "W": 1,
      "NE": 0,
      "NW": 0,
      "SE": 1,
      "SW": 1
    },
  },
  {
    activity: ActivityEnum.Kitesurfing,
    id: 3,
    latitude: "32.681369379215994",
    longitude: "-79.89118925044373",
    name: "Folly North End",
    island: "Folly Island",
    winddirections: "N,NE,NNE",
    waves: "4",
    depth: "various",
    description: "Folly Beach is a barrier island with Morris Island Lighthouse as a stunning backdrop for kitesurfers. It offers a range of water conditions from flat to choppy.",
    experience: "intermediate",
    references: "https://en.wikipedia.org/wiki/Folly_Beach",
    location_img_url: "/photo2.jpg",
    image_alt_text: "Kitesurfing at Folly North End with Morris Island Lighthouse", // SEO alt text
    seo_title: "Folly North End Kitesurfing Spot - Charleston",                  // SEO title
    meta_description: "Kitesurf at Folly North End with Morris Island Lighthouse as a backdrop. Perfect for intermediate kitesurfers looking for challenging conditions.", // SEO meta description
    viable_directions: {
      "N": 1,
      "S": 0,
      "E": 1,
      "W": 0,
      "NE": 1,
      "NW": 0,
      "SE": 0,
      "SW": 0
    },
  },
  {
    activity: ActivityEnum.Kitesurfing,
    id: 5,
    latitude: "32.751914138739735",
    longitude: "-79.88115077805551",
    name: "Fort Sumter",
    island: "Morris Island",
    winddirections: "N,NNE,NE",
    waves: "2",
    depth: "deep",
    description: "Fort Sumter is a sea fort built on an artificial island protecting Charleston, with strong currents and deep waters, making it suitable for advanced kitesurfers.",
    experience: "advanced",
    references: "https://en.wikipedia.org/wiki/Fort_Sumter",
    location_img_url: "/photograph-Charleston-South-Carolina-shots-Fort-Sumter.webp",
    image_alt_text: "Kitesurfing near Fort Sumter, Charleston", // SEO alt text
    seo_title: "Kitesurfing near Fort Sumter - Advanced Spot",  // SEO title
    meta_description: "Kitesurf near the historic Fort Sumter in Charleston. Strong currents and deep waters make this an advanced kitesurfing spot.", // SEO meta description
    viable_directions: {
      "N": 0,
      "S": 1,
      "E": 1,
      "W": 0,
      "NE": 1,
      "NW": 1,
      "SE": 1,
      "SW": 1
    },
  },
  {
    activity: ActivityEnum.Kayaking,
    id: 8,
    latitude: "32.8682",
    longitude: "-79.6790",
    name: "Capers Island",
    island: "Capers Island",
    winddirections: "NE,E,SE",
    waves: "2",
    depth: "shallow to deep",
    description: "Capers Island is an undeveloped island accessible only by boat. It offers pristine kayaking opportunities, with abundant wildlife and calm waters.",
    experience: "intermediate",
    references: "https://en.wikipedia.org/wiki/Capers_Island",
    location_img_url: capersIslandImageUrl,
    image_alt_text: "Kayaking at Capers Island, Charleston", // SEO alt text
    seo_title: "Kayaking at Capers Island - Charleston",     // SEO title
    meta_description: "Experience kayaking at Capers Island in Charleston. Explore an undeveloped island with abundant wildlife and calm, scenic waters.", // SEO meta description
    viable_directions: {
      "N": 0,
      "S": 0,
      "E": 1,
      "W": 0,
      "NE": 1,
      "NW": 0,
      "SE": 1,
      "SW": 0
    },
  },
  {
    activity: ActivityEnum.Surfing,
    id: 9,
    latitude: "32.6553",
    longitude: "-79.9422",
    name: "Folly Beach Pier",
    island: "Folly Island",
    winddirections: "S,SW",
    waves: "4",
    depth: "medium",
    description: "Folly Beach Pier is one of South Carolina's most iconic surf spots, offering consistent swells and beautiful surroundings for surfers of all levels.",
    experience: "all levels",
    references: "https://www.charlestoncountyparks.com/94/Folly-Beach-Pier",
    location_img_url: "/follypier.jpg",
    image_alt_text: "Surfing at Folly Beach Pier, South Carolina", // SEO alt text
    seo_title: "Surfing at Folly Beach Pier - Iconic South Carolina Spot",  // SEO title
    meta_description: "Surf at the iconic Folly Beach Pier in South Carolina. Great for all levels of surfers, with consistent swells and a long beach.", // SEO meta description
    viable_directions: {
      "N": 0,
      "S": 1,
      "E": 0,
      "W": 0,
      "NE": 0,
      "NW": 0,
      "SE": 1,
      "SW": 1
    },
  },
  {

    activity: ActivityEnum.FishingRedfish,
    id: 11,
    latitude: "32.9080",
    longitude: "-79.6090",
    name: "Bull Island",
    island: "Bull Island",
    winddirections: "SW,W,NW",
    waves: "calm",
    depth: "shallow",
    description: "Bull Island is a pristine nature preserve, ideal for redfish fishing in shallow waters with serene surroundings. Best times to fish are early morning and late evening.",
    experience: "intermediate",
    references: "https://www.dnr.sc.gov/fishing.html",
    location_img_url: "/bullisland.jpg",
    image_alt_text: "Fishing at Bull Island, South Carolina", // SEO alt text
    seo_title: "Redfish Fishing at Bull Island - South Carolina",   // SEO title
    meta_description: "Fish for redfish at Bull Island in South Carolina. Enjoy serene, calm waters and beautiful nature. Best times are early morning and late evening.", // SEO meta description
    viable_directions: {
      "N": 0,
      "S": 0,
      "E": 0,
      "W": 1,
      "NE": 0,
      "NW": 1,
      "SE": 0,
      "SW": 1
    },
  },
  {
    activity: ActivityEnum.Hiking,
    id: 12,
    latitude: "33.030781",
    longitude: "-79.721074",
    name: "Palmetto Trail",
    island: "Mount Pleasant",
    winddirections: "N,S",
    waves: "none",
    depth: "land",
    description: "The Palmetto Trail offers miles of well-marked hiking trails through woods, marshes, and wetlands, suitable for all skill levels.",
    experience: "beginner",
    trail_length: "10 miles",
    wildlife: "Deer, birds",
    references: "https://palmettoconservation.org/palmetto-trail/",
    location_img_url: "/palmettotrail.jpg",
    image_alt_text: "Hiking on the Palmetto Trail, Charleston", // SEO alt text
    seo_title: "Hiking the Palmetto Trail - Charleston, South Carolina",   // SEO title
    meta_description: "Hike the scenic Palmetto Trail in Charleston, South Carolina. Explore 10 miles of woods, marshes, and wetlands. Suitable for all skill levels.", // SEO meta description
    viable_directions: null,
  },
  {
    activity: ActivityEnum.HuntingDeer,
    id: 13,
    latitude: "33.07445696020566",
    longitude: "-79.76219466876957",
    name: "Francis Marion National Forest",
    island: "Mainland",
    winddirections: "all",
    waves: "none",
    depth: "land",
    description: "Francis Marion National Forest is a prime spot for deer hunting, located just north of Charleston, offering vast areas for exploration.",
    experience: "intermediate",
    best_times: "Dawn and dusk",
    wildlife: "Deer, wild turkey",
    references: "https://www.fs.usda.gov/francis_marion",
    location_img_url: "/francismarion.jpg",
    image_alt_text: "Deer hunting at Francis Marion National Forest", // SEO alt text
    seo_title: "Deer Hunting at Francis Marion National Forest - Charleston",  // SEO title
    meta_description: "Experience deer hunting at Francis Marion National Forest in Charleston. Explore vast land and wildlife, including deer and wild turkey. Best times: dawn and dusk.", // SEO meta description
    viable_directions: null,
  },
  {
    activity: ActivityEnum.FishingRedfish,
    id: 14,
    latitude: "32.913733",
    longitude: "-79.592918",
    name: "Bull Island",
    island: "Bull Island",
    winddirections: "SW,W,NW",
    waves: "calm",
    depth: "shallow",
    description: "Bull Island is a pristine spot for redfish fishing in South Carolina, offering calm, shallow waters and beautiful scenery.",
    experience: "intermediate",
    references: "https://www.dnr.sc.gov/fishing.html",
    location_img_url: "/bullisland.jpg",
    image_alt_text: "Fishing at Bull Island, redfish hotspot", // SEO alt text
    seo_title: "Redfish Fishing at Bull Island - Pristine Fishing Spot",  // SEO title
    meta_description: "Enjoy serene redfish fishing at Bull Island in South Carolina. A nature preserve offering calm, shallow waters perfect for fishing enthusiasts.", // SEO meta description
    viable_directions: {
      "N": 0,
      "S": 0,
      "E": 0,
      "W": 1,
      "NE": 0,
      "NW": 1,
      "SE": 0,
      "SW": 1
    },
  },
  {
    activity: ActivityEnum.Kayaking,
    id: 15,
    latitude: "32.793105",
    longitude: " -79.877131",
    name: "Shem Creek Boat Landing",
    island: "Mount Pleasant",
    winddirections: "N,S,E,W",
    waves: "calm",
    depth: "shallow",
    description: "Shem Creek is a popular kayaking destination known for its calm waters and scenic views of marshlands and wildlife.",
    experience: "beginner",
    references: "https://www.shemcreek.com/",
    location_img_url: "/shemcreek.jpg",
    image_alt_text: "Kayaking at Shem Creek, scenic marsh views", // SEO alt text
    seo_title: "Kayaking at Shem Creek - Scenic Waters of Mount Pleasant", // SEO title
    meta_description: "Discover the calm waters and scenic marshlands of Shem Creek, Mount Pleasant. A perfect spot for beginner kayakers to enjoy wildlife and nature.", // SEO meta description
    viable_directions: {
      "N": 1,
      "S": 1,
      "E": 1,
      "W": 1,
      "NE": 1,
      "NW": 1,
      "SE": 1,
      "SW": 1
    },
  },
  {
    activity: ActivityEnum.Hiking,
    id: 16,
    latitude: "32.9022",
    longitude: "-79.7812",
    name: "Palmetto Trail",
    island: "Mount Pleasant",
    winddirections: "N,S",
    waves: "none",
    depth: "land",
    description: "The Palmetto Trail is a must-visit hiking destination offering miles of trails through woods and wetlands, suitable for hikers of all levels.",
    experience: "beginner",
    references: "https://palmettoconservation.org/palmetto-trail/",
    location_img_url: "/palmettotrail.jpg",
    image_alt_text: "Hiking the Palmetto Trail through woods and wetlands", // SEO alt text
    seo_title: "Hiking the Palmetto Trail - Explore Charleston's Nature",  // SEO title
    meta_description: "Hike the Palmetto Trail in Charleston's Mount Pleasant, a trail that runs through beautiful woods and wetlands. Ideal for hikers of all skill levels.", // SEO meta description
    viable_directions: null,
  },
  {
    activity: ActivityEnum.HuntingDeer,
    id: 17,
    latitude: "33.1202",
    longitude: "-80.5232",
    name: "Francis Marion National Forest",
    island: "Mainland",
    winddirections: "all",
    waves: "none",
    depth: "land",
    description: "Francis Marion National Forest is a prime destination for deer hunting, offering vast expanses of land for experienced hunters to explore.",
    experience: "intermediate",
    references: "https://www.fs.usda.gov/francis_marion",
    location_img_url: "/francismarion.jpg",
    image_alt_text: "Deer hunting at Francis Marion National Forest",  // SEO alt text
    seo_title: "Deer Hunting at Francis Marion National Forest",      // SEO title
    meta_description: "Experience deer hunting at the Francis Marion National Forest, a vast area north of Charleston, known for its diverse wildlife and prime hunting grounds.", // SEO meta description
    viable_directions: null,
  },
  {
    activity: ActivityEnum.FishingRedfish,
    id: 18,
    latitude: "32.7638",
    longitude: "-79.8741",
    name: "Bull Island",
    island: "Bull Island",
    winddirections: "SW,W,NW",
    waves: "calm",
    depth: "shallow",
    description: "Bull Island is a premier location for redfish fishing, with calm waters and access only by boat, making it a serene fishing destination.",
    experience: "intermediate",
    references: "https://www.dnr.sc.gov/fishing.html",
    location_img_url: "/bullisland.jpg",
    image_alt_text: "Redfish fishing at Bull Island, calm waters",  // SEO alt text
    seo_title: "Redfish Fishing at Bull Island - Premier Location",  // SEO title
    meta_description: "Discover redfish fishing at Bull Island, a premier destination in South Carolina. With calm waters and serene surroundings, it's perfect for intermediate anglers.", // SEO meta description
    viable_directions: null,
  },
  {
    activity: ActivityEnum.Kayaking,
    id: 19,
    latitude: "32.8470",
    longitude: "-79.8136",
    name: "Shem Creek",
    island: "Mount Pleasant",
    winddirections: "N,S,E,W",
    waves: "calm",
    depth: "shallow",
    description: "Shem Creek is known for its calm waters and beautiful marshlands, offering a scenic kayaking experience for beginners and nature lovers.",
    experience: "beginner",
    references: "https://www.shemcreek.com/",
    location_img_url: "/shemcreek.jpg",
    image_alt_text: "Kayaking at Shem Creek, calm marsh waters",  // SEO alt text
    seo_title: "Kayaking at Shem Creek - Charleston's Scenic Waters",  // SEO title
    meta_description: "Kayak through the calm marsh waters of Shem Creek in Charleston. Enjoy the beauty of the natural surroundings and peaceful kayaking experience.", // SEO meta description
    viable_directions: null,
  },
  {
    activity: ActivityEnum.Hiking,
    id: 20,
    latitude: "32.9022",
    longitude: "-79.7812",
    name: "Palmetto Trail",
    island: "Mount Pleasant",
    winddirections: "N,S",
    waves: "none",
    depth: "land",
    description: "The Palmetto Trail offers a scenic hiking experience through Charleston's marshlands and wetlands, with trails suitable for all skill levels.",
    experience: "beginner",
    references: "https://palmettoconservation.org/palmetto-trail/",
    location_img_url: "/palmettotrail.jpg",
    image_alt_text: "Scenic hike on Palmetto Trail through marshlands",  // SEO alt text
    seo_title: "Hiking the Palmetto Trail - Charleston Marshlands",  // SEO title
    meta_description: "Hike through the scenic marshlands and wetlands of Charleston on the Palmetto Trail. A perfect outdoor adventure for hikers of all levels.", // SEO meta description
    viable_directions: null,
  },
  {
    activity: ActivityEnum.HuntingDeer,
    id: 21,
    latitude: "33.1202",
    longitude: "-80.5232",
    name: "Francis Marion National Forest",
    island: "Mainland",
    winddirections: "all",
    waves: "none",
    depth: "land",
    description: "Francis Marion National Forest provides vast lands perfect for deer hunting, offering experienced hunters a chance to explore diverse terrain and wildlife.",
    experience: "intermediate",
    references: "https://www.fs.usda.gov/francis_marion",
    location_img_url: "/francismarion.jpg",
    image_alt_text: "Hunting in Francis Marion National Forest, vast hunting grounds",  // SEO alt text
    seo_title: "Deer Hunting at Francis Marion National Forest",      // SEO title
    meta_description: "Hunt for deer at the expansive Francis Marion National Forest in South Carolina. A top destination for experienced hunters, rich with wildlife.", // SEO meta description
    viable_directions: null,
  }
];


export default locations;
