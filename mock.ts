
import { WindDirection } from "@/app/context/FilterContext"

export interface KitesurfSpot {
  location_img_url: string | undefined
  id: number
  latitude: string | number
  longitude: string | number
  name: string
  island: string
  winddirections: string
  title: string
  waves: string
  depth: string
  description: string
  experience: string
  references: string
}

export type viable_directions = {
  [key in WindDirection]: number
}
const locations: KitesurfSpot[] = [
  {
    id: 1,
    latitude: "32.76562356586255",
    longitude: "-79.82115738187443",
    name: "Sullivan's Island 28.5",
    island: "Sullivans",
    winddirections: "S,SW,SE,E,ENE",
    title: "Sullivan's Island 28.5",
    waves: "3",
    depth: "shallow inside",
    description: "Sullivan's Island is located along the Atlantic Ocean near the center of Charleston County. The town is bordered to the west by the entrance to Charleston Harbor, to the north by Cove Inlet and the west by the Intercostal waterway.The writer Edgar Allan Poe was stationed at Fort Moultrie from November 1827 to December 1828.[20] The island is a setting for much of his short story \"The Gold- Bug\" (1843). In Poe's short story \"The Balloon - Hoax\", a gas balloon (forerunner of the dirigible) is piloted by eight men, six of them making independent diary entries, and describes a trip from Northern Wales to Fort Moultrie, Sullivan's Island over the course 75 hours  published as fact in a New York City newspaper in 1844 and retracted three days later.",
    experience: "beginner",
    references: "https://en.wikipedia.org/wiki/Sullivan%27s_Island,_South_Carolina",
    location_img_url: ''
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
    description: "Folly Beach County Park is a large park on the south end of Folly Beach, South Carolina. It is a great place to start your kiteboarding session, and is a great place to kite on almost any wind direction. It is also a Swimming beach with seasonal lifeguards & pelican rookery featured in preserve with limited parking.",
    experience: "beginner",
    title: "Folly Beach County Park",
    references: "https://en.wikipedia.org/wiki/Folly_Beach_County_Park",
    location_img_url: ''
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
      "Folly Beach is a barrier island, six miles long and the closest beach to downtown Charleston, Its only a 15 minute drive,  Morris Island Lighthouse is on the north end and makes a fantastic backdrop for your kiteboarding session, afterward you can enjoy gourmet food, endangered species of birds; and southern hospitality. In this spot, be cautious of the rocks on the beach, beach users, and submerged jetties in the water. The water here can range from semi flat to choppy depending on the tides. On windy days, you’re almost certain to encounter kiters on this beach!",
    experience: "intermediate",
    title: "Folly Beach North End",
    references: "https://en.wikipedia.org/wiki/Folly_Beach",
    location_img_url: ''
  },
  {
    id: 4,
    latitude: "32.688061417805606",
    longitude: "-79.88721424510517",
    name: "Morris Light House",
    island: "Folly",
    winddirections: "N,NNE,NE,ENE",
    waves: "1",
    depth: "deep",
    // it is a good idea to use a description that is less than 200 characters
    // its a long walk , lots of hazards
    description: "Morris Island Lighthouse is on the north end  you can access it by parking in the parking lot on the north end of the island. The lighthouse is a great place to start your kiteboarding session, and is a great place to see endangered species of birds. In this spot, be cautious of the rocks on the beach, you will often see hikers and fishers on this beach. The water here can range from semi flat to choppy depending on the tides.Although the lighthouse now stands several hundred feet offshore, it was originally inside a much larger island. When constructed in 1876, the light was approximately 1,200 feet (370 m) from the water's edge. However, the construction in 1889 of the jetties which protect the shipping lanes leading to Charleston Harbor altered ocean currents, resulting in the rapid erosion of Morris Island and the destruction of many structures and historical sites (such as Fort Wagner). By 1938 the shoreline had reached the lighthouse, forcing its automation as it was no longer safe or practical to keep it staffed. In 1962 the Morris Island Light was decommissioned and replaced by the new Charleston Light, located on Sullivan's Island at the north end of the harbor.",
    experience: "advanced",
    title: "Morris Light House",
    references: "https://en.wikipedia.org/wiki/Morris_Island_Lighthouse",
    location_img_url: ''
  },
  {
    id: 5,
    latitude: "32.751914138739735",
    longitude: "-79.88115077805551",
    name: "Fort Sumpter",
    island: "Morris Island",
    winddirections: "N,NNE,NE",
    waves: "2",
    depth: "deep",
    description:
      "Fort Sumter is a sea fort built on an artificial island protecting Charleston, South Carolina from naval invasion. Its origin dates to the War of 1812 when the British invaded Washington by sea. It was still incomplete in 1861 when the Battle of Fort Sumter began the American Civil War. It was severely damaged during the war, left in ruins, and although there was some rebuilding, the fort as conceived was never completed. The fort was abandoned in the late 19th century and was rebuilt in the early 20th century. The fort is now a museum and a tourist attraction. The fort is a great place to start your kiteboarding session, and is a great place to see dolphins . In this spot, be cautious of the rocks on the beach, you will often see hikers and fishers on this beach. The water here has very strong currents.This makes it suitable for experienced kiteboarders, but not for beginners.",
    experience: "advanced",
    title: "Fort Sumpter",
    references: "https://en.wikipedia.org/wiki/Fort_Sumter",
    location_img_url: ''
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
    description: "Beware coyotes, shipping traffic, and strong currents. This is an ok spot for intermediate kiteboarders.Fort Moultrie is a series of fortifications on Sullivan's Island, South Carolina, built to protect the city of Charleston, South Carolina. The first fort, formerly named Fort Sullivan, built of palmetto logs, inspired the flag and nickname of South Carolina, as \"The Palmetto State\". The fort was renamed for the U.S. patriot commander in the Battle of Sullivan's Island, General William Moultrie. During British occupation, in 1780–1782, the fort was known as Fort Arbuthnot.",
    experience: "advanced",
    title: "Fort Moultrie",
    references: "https://en.wikipedia.org/wiki/Fort_Moultrie",
    location_img_url: ''
  },
]

export default locations