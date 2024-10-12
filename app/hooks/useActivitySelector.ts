import { useState, useEffect } from 'react';

// activities and their  bitmask values
enum Activity {
  Kitesurfing = 1 << 0,  // 00000001
  Surfing = 1 << 1,       // 00000010
  Fishing = 1 << 2,       // 00000100
  DuckHunting = 1 << 3,   // 00001000
  DeerHunting = 1 << 4,   // 00010000
  TurkeyHunting = 1 << 5, // 00100000
  Shrimping = 1 << 6,     // 01000000
  RedfishFishing = 1 << 7 // 10000000
}

//  function to convert an activity bitmask to an array of activity names
const decodeActivities = (bitmask: number): Activity[] => {
  return Object.values(Activity).filter(
    (activity) => typeof activity === 'number' && (bitmask & (activity as number))
  ) as Activity[];
};

//  function to convert an array of activities to a bitmask
const encodeActivities = (activities: Activity[]): number => {
  return activities.reduce((bitmask, activity) => bitmask | activity, 0);
};

const useOutdoorActivities = () => {
  const [selectedActivities, setSelectedActivities] = useState<Activity[]>([]);

  // Load the bitmask from localStorage when the hook is initialized
  useEffect(() => {
    const storedBitmask = localStorage.getItem('outdoorActivitiesBitmask');
    if (storedBitmask) {
      const bitmask = parseInt(storedBitmask, 10);
      setSelectedActivities(decodeActivities(bitmask));
    }
  }, []);

  // Save  bitmask to localStorage whenever the selected activities change
  useEffect(() => {
    if (selectedActivities.length) {
      const bitmask = encodeActivities(selectedActivities);
      localStorage.setItem('outdoorActivitiesBitmask', bitmask.toString());
    }
  }, [selectedActivities]);

  //  set new activities
  const setActivities = (activities: Activity[]) => {
    setSelectedActivities(activities);
  };

  // get current activities
  const getActivities = (): Activity[] => {
    return selectedActivities;
  };

  return {
    selectedActivities,
    setActivities,
    getActivities,
  };
};

export default useOutdoorActivities;
