---
title: Optimizing Local Storage Efficiency with Bitwise Operations in TypeScript Enum
date: 2024-10-13
description: Using bitwise operations to solve local storage limitations by compactly storing user-selected activities in a TypeScript application.
tag: web development
tags:
  [
    TypeScript,
    bitwise operations,
    local storage,
    performance optimization,
    enum,
    JavaScript,
    development
  ]
author: [Tanner Bleakley]
---

# Problem

During the development of a side project, [https://windysession.com](windysession.com), I encountered an issue with local storage filling up quickly. Initially, I stored user-selected activities as strings, which worked fine at first, but as more activities were added, it became clear this approach wasn’t scalable. Local storage usage expanded rapidly, leading to warnings about exceeding storage limits. To fix this, I switched to using bitwise operations with a TypeScript enum, significantly reducing the storage footprint.

## Local Storage Limitations

Browsers typically provide around 5MB of local storage, which seems sufficient until inefficient data storage practices eat it up. In my case, each selected activity was stored as a string, so users choosing multiple activities resulted in several string entries. For example, if a user selected "Kitesurfing," "Hiking," and "Fishing," it led to multiple entries like:

```TS
["Kitesurfing", "Hiking", "Fishing"]
```

This quickly consumed space, and as more activities were added, the issue grew worse. The app also had a filtering feature, further increasing the amount of data stored. It was clear that a new, more efficient approach was needed to handle user selections.

### Recognizing the Bottleneck

The problem stemmed from storing activities as individual strings. Each activity took up more space than necessary due to the overhead of UTF-16 encoding and the absence of any compact data representation. I needed a way to store multiple activities in a more efficient manner.

## The Solution: Bitwise Operations in a TypeScript Enum

To optimize local storage usage, I switched from storing strings to using bitwise operations with a TypeScript enum. This allowed me to represent multiple activities in a single integer, minimizing storage space.

Here’s how I defined the ActivityEnum:

```TS
enum ActivityEnum {
  Kitesurfing = 1 << 0,  // 1
  Hiking = 1 << 1,       // 2
  Cycling = 1 << 2,      // 4
  Fishing = 1 << 3,      // 8
  HuntingDuck = 1 << 4,  // 16
  HuntingDeer = 1 << 5,  // 32
  Running = 1 << 6,      // 64
  Surfing = 1 << 7,      // 128
}
```

Each activity is represented as a unique bit. The bitwise shift operator (<<) assigns a unique power of two to each activity, ensuring they don’t overlap. Using this setup, multiple activities can be stored in a single integer by combining them with the bitwise OR (|) operator.

For example, if a user selects both "Kitesurfing" and "Fishing," I can store these selections as:

```TS
const selectedActivities = ActivityEnum.Kitesurfing | ActivityEnum.Fishing;
```

This results in the number 9 (1 for Kitesurfing and 8 for Fishing), which is a much more compact representation than storing an array of strings.

How Bitwise Operations Help
Storing Activities
To store selected activities, I combine them using the bitwise OR operator. This allows all selected activities to be compressed into a single integer. The code for storing these activities looks like this:

```TS
const handleActivityChange = (activities: ActivityEnum[]) => {
  setSelectedActivities(activities);
};
```

With the ActivityEnum in place, each activity selection is added to the selectedActivities state, which holds the bitwise value representing the combination of selected activities.

Retrieving Activities
To check whether a specific activity has been selected, I use the bitwise AND (&) operator. For example, to check if the user selected "Kitesurfing":

```TS
const isKitesurfingSelected = (selectedActivities & ActivityEnum.Kitesurfing) !== 0;
```

This checks whether the "Kitesurfing" bit is set in the selectedActivities integer.

### Efficiency Gains

This approach significantly reduces the amount of data stored. Instead of saving an array like:

```TS
["Kitesurfing", "Fishing", "Hiking"]
```

I store a single integer, such as 13, which represents all selected activities.

### Filtering with Bitwise Operations

This optimization also extends to filtering locations based on selected activities. For example, to filter kitesurf spots that allow both "Kitesurfing" and "Fishing," I can use the following logic:

```TS
const activitiesFilter = ActivityEnum.Kitesurfing | ActivityEnum.Fishing;
const isMatch = (spot.activity & activitiesFilter) === activitiesFilter;
```

This checks whether both "Kitesurfing" and "Fishing" are possible at a given location using a single comparison.

### Implementation in Context

The logic for handling filters and applying bitwise operations is integrated into my app’s FilterContext. Here’s an excerpt:

```TSX
export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedActivities, setSelectedActivities] = useState<ActivityEnum[]>([]);

  useEffect(() => {
    let filtered: ActivitySpot[] = kitesurfSpots;

    if (selectedActivities.length > 0) {
      filtered = filtered.filter((spot) =>
        selectedActivities.includes(spot.activity as ActivityEnum)
      );
    }

    setFilteredKitesurfSpots(filtered);
  }, [selectedActivities]);

  return (
    <FilterContext.Provider value={{ selectedActivities, handleActivityChange }}>
      {children}
    </FilterContext.Provider>
  );
};
```

In this implementation, the selected activities are filtered based on the bitwise representation, reducing the amount of data being processed and stored.

## Trade-offs

While this solution works efficiently for a predefined set of activities, it has limitations as the number of activities increases. Since the bitwise method relies on unique bits, adding too many activities may require switching to a different storage strategy, such as IndexedDB. For now, however, this solution provides a scalable, lightweight alternative to storing user selections as strings.

# Conclusion

By using bitwise operations and enums in TypeScript, I drastically reduced the local storage footprint in my app. This approach allowed me to store multiple activities in a single integer, making the app more efficient and scalable. Though this method is not without limitations, it serves my current needs and has improved performance significantly.
