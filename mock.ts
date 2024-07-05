import { WindDirection } from "@/app/context/FilterContext";
const capersIslandImageUrl = '/public/party.jpg'
const birdKeyLat = "32.62833267361373"
const birdKeyLong = "-79.98719329863708"
export interface KitesurfSpot {
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
  viable_directions: ViableDirections;
}

export type ViableDirections = {
  [key in WindDirection]: number;
};

type KitesurfSpotWithStringCoordinates = Omit<KitesurfSpot, 'latitude' | 'longitude'> & { latitude: string; longitude: string };

const locations: KitesurfSpotWithStringCoordinates[] = [
  {
    id: 1,
    latitude: "32.76562356586255",
    longitude: "-79.82115738187443",
    name: "Sullivan's Island 28.5",
    island: "Sullivans",
    winddirections: "S,SW,SE,E,ENE",
    waves: "3",
    depth: "shallow inside",
    description: "Sullivan's Island is located along the Atlantic Ocean near the center of Charleston County. The town is bordered to the west by the entrance to Charleston Harbor, to the north by Cove Inlet and the west by the Intercostal waterway. The writer Edgar Allan Poe was stationed at Fort Moultrie from November 1827 to December 1828. The island is a setting for much of his short story 'The Gold-Bug' (1843). In Poe's short story 'The Balloon-Hoax', a gas balloon (forerunner of the dirigible) is piloted by eight men, six of them making independent diary entries, and describes a trip from Northern Wales to Fort Moultrie, Sullivan's Island over the course of 75 hours, published as fact in a New York City newspaper in 1844 and retracted three days later.",
    experience: "beginner",
    references: "https://en.wikipedia.org/wiki/Sullivan%27s_Island,_South_Carolina",
    location_img_url: "/photo1.jpg",
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
    id: 2,
    latitude: "32.640900462604456",
    longitude: "-79.96962012816843",
    name: "Folly Beach County Park",
    island: "Folly",
    winddirections: "S,SW,W,NNE",
    waves: "2",
    depth: "deep",
    description: "Folly Beach County Park is a large park on the south end of Folly Beach, South Carolina. It is a great place to start your kiteboarding session, and is a great place to kite on almost any wind direction. It is also a swimming beach with seasonal lifeguards & pelican rookery featured in the preserve with limited parking.",
    experience: "beginner",
    references: "https://en.wikipedia.org/wiki/Folly_Beach_County_Park",
    location_img_url: '/PANO0001-Pano.jpg',
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
    id: 3,
    latitude: "32.681369379215994",
    longitude: "-79.89118925044373",
    name: "Folly North End",
    island: "Folly Island",
    winddirections: "N,NE,NNE",
    waves: "4",
    depth: "various",
    description:
      "Folly Beach is a barrier island, six miles long and the closest beach to downtown Charleston. It's only a 15-minute drive. Morris Island Lighthouse is on the north end and makes a fantastic backdrop for your kiteboarding session. Afterward, you can enjoy gourmet food, endangered species of birds, and southern hospitality. In this spot, be cautious of the rocks on the beach, beach users, and submerged jetties in the water. The water here can range from semi-flat to choppy depending on the tides. On windy days, you’re almost certain to encounter kiters on this beach!",
    experience: "intermediate",

    references: "https://en.wikipedia.org/wiki/Folly_Beach",
    location_img_url: "/photo2.jpg",
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
    id: 5,
    latitude: "32.751914138739735",
    longitude: "-79.88115077805551",
    name: "Fort Sumter",
    island: "Morris Island",
    winddirections: "N,NNE,NE",
    waves: "2",
    depth: "deep",
    description:
      "Fort Sumter is a sea fort built on an artificial island protecting Charleston, South Carolina from naval invasion. Its origin dates to the War of 1812 when the British invaded Washington by sea. It was still incomplete in 1861 when the Battle of Fort Sumter began the American Civil War. It was severely damaged during the war, left in ruins, and although there was some rebuilding, the fort as conceived was never completed. The fort was abandoned in the late 19th century and was rebuilt in the early 20th century. The fort is now a museum and a tourist attraction. The fort is a great place to start your kiteboarding session, and is a great place to see dolphins. In this spot, be cautious of the rocks on the beach, you will often see hikers and fishers on this beach. The water here has very strong currents. This makes it suitable for experienced kiteboarders, but not for beginners.",
    experience: "advanced",
    references: "https://en.wikipedia.org/wiki/Fort_Sumter",
    location_img_url: '/photograph-Charleston-South-Carolina-shots-Fort-Sumter.webp',
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
    id: 6,
    latitude: "32.757628",
    longitude: "-79.857808",
    name: "Fort Moultrie",
    island: "Sullivan's Island",
    winddirections: "S,SSW,W,NW",
    waves: "1",
    depth: "deep",
    description: "Beware of coyotes, shipping traffic, and strong currents. This is an ok spot for intermediate kiteboarders. Fort Moultrie is a series of fortifications on Sullivan's Island, South Carolina, built to protect the city of Charleston. The first fort, formerly named Fort Sullivan, built of palmetto logs, inspired the flag and nickname of South Carolina, as 'The Palmetto State.' The fort was renamed for the U.S. patriot commander in the Battle of Sullivan's Island, General William Moultrie. During British occupation, in 1780–1782, the fort was known as Fort Arbuthnot.",
    experience: "advanced",
    references: "https://en.wikipedia.org/wiki/Fort_Moultrie",
    location_img_url: '/moultry.jpg',
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
    id: 7,
    latitude: "32.814271180990076",
    longitude: "-79.71980425914779",
    name: "North IOP",
    description: "Wild Dunes is a private, gated community located on the Isle of Palms, just outside of Charleston, South Carolina. Known for its picturesque beaches and lush landscapes, Wild Dunes is a popular destination for kiteboarders from around the world. The community boasts miles of pristine beaches, perfect for launching and landing kites, as well as a variety of challenging waves and winds for experienced riders. The private nature of the community means that kiteboarding spots are less crowded, allowing for more open space and greater freedom to ride. In addition to the natural beauty and kiteboarding opportunities, Wild Dunes also offers a variety of amenities, including tennis courts, swimming pools, and bike rentals, as well as restaurants and shops. For those looking for a secluded kiteboarding paradise, Wild Dunes is the perfect destination.",
    location_img_url: "public/WD-Links-17-18-7-1140x600-1-1140x605.jpg",
    waves: "1",
    island: "Sullivan's Island",
    references: "https://en.wikipedia.org/wiki/Fort_Moultrie",
    depth: "deep",
    winddirections: "",
    experience: "",
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
    id: 8,
    latitude: "32.810150",
    longitude: "-79.714939",
    name: "Capers Island",
    island: "Capers Island",
    winddirections: "NE,E,SE",
    waves: "2",
    depth: "shallow to deep",
    description: "Capers Island is a barrier island located about 15 miles north of Charleston, South Carolina. It is an undeveloped island, accessible only by boat, making it a pristine location for kiteboarding. The island offers a mix of shallow and deep waters, and the best winds come from the NE, E, and SE directions. It is a great spot for intermediate to advanced kiteboarders looking for a more secluded and natural setting. Wildlife is abundant, and it's common to see dolphins and various bird species.",
    experience: "intermediate",
    references: "https://en.wikipedia.org/wiki/Capers_Island",
    location_img_url: capersIslandImageUrl,
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
    id: 9,
    latitude: birdKeyLat,
    longitude: birdKeyLong,
    name: "Bird Key",
    island: "Bird Key",
    winddirections: "NE,E,SE",
    waves: "2",
    depth: "various",
    description: "Bird Key is a small island located near the entrance to Charleston Harbor. It's known for its strong winds from the NE, E, and SE, making it a great spot for kitesurfing. The island is accessible only by boat and offers a mix of shallow and deep waters. The wildlife on Bird Key is diverse, and it's common to see various bird species and occasional dolphins. It's a great spot for intermediate to advanced kiteboarders looking for a less crowded and natural setting.",
    experience: "intermediate",
    references: "https://www.dnr.sc.gov/birdsanctuaries/birdkeystono.html",
    location_img_url: '/birdkey.jpg',
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
  }
];

export default locations;
