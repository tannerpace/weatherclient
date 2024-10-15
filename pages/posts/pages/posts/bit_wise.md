---
title: Optimizing Local Storage Efficiency with Bitwise Operations in TypeScript Enum
Date: 2024-10-13
Description: Using bitwise operations to solve local storage limitations by compactly storing user-selected activities in a TypeScript application.
Tag: web development
Tags:
  [
    TypeScript,
    bitwise operations,
    local storage,
    performance optimization,
    enum,
    JavaScript,
    development
  ]
Author: [Tanner Bleakley]
---

# Problem

During the development of my app, [https://windysession.com](windysession.com), I encountered a critical issue: local storage was filling up quickly due to inefficient storage usage. Initially, each activity was stored as a string, but as more activities were added, the storage footprint expanded rapidly. This post explores the details, and solution implementing bitwise operations in a TypeScript enum and the trade-offs involved.

# Local Storage Limitations

Local storage provides around 5MB of space in most browsers, which sounds sufficient for small apps but quickly becomes inadequate when storing data inefficiently. In my case, each user-selected activity was being stored as a string, meaning that every activity took up more space than necessary. For instance, a user selecting "Kitesurfing," "Hiking," and "Fishing" would result in multiple string entries, which compounded as more activities were added.

Additionally, my app had a filter feature that allowed users to filter locations based on the activity type, as the app grew, so did the available filters I wanted to implement. This further increased the data stored in local storage. Warnings and errors about exceeding local storage limits, made it clear that this strategy wasn't scalable. So the problem needed to be solved at the structural level, not just with data compression.

## Recognizing the Bottleneck

The string-based approach quickly ran into limitations as local storage filled up. Storing an array of strings for user activities consumed unnecessary space due to the overhead of UTF-16 encoding and the lack of a compact data representation. A solution was needed to reduce the space usage while still allowing for multiple activities to be stored efficiently.

### The Solution: Bitwise Operations in an Enum

To reduce the storage footprint, I switched from string-based storage to bitwise operations.

By defining activities as an enum in TypeScript, I could use bitwise operators to store multiple activity selections in a single integer.

```TS
enum ActivityEnum {
  Kitesurfing = 1 << 0,  // 1
  Hiking = 1 << 1,       // 2
  Cycling = 1 << 2,      // 4
  Fishing = 1 << 3,      // 8
  HuntingDuck = 1 << 4,  // 16
  HuntingDeer = 1 << 5,  // 32
  Running = 1 << 7,      // 128
  Surfing = 1 << 8,      // 256
}
```

With this approach, each activity is assigned a unique bit by shifting 1 left by the desired number of positions.

This allows multiple activities to be represented in a single integer by using bitwise OR (|) operations.

For example, if a user selects both "Kitesurfing" and "Fishing", their selected activities can be represented as:

```TS
const selectedActivities = ActivityEnum.Kitesurfing | ActivityEnum.Fishing;
```

This results in the number 9, which is derived from adding the bitwise values of Kitesurfing (1) and Fishing (8). Using this method, multiple activities can be combined into a single integer, drastically reducing the storage footprint.

## How it Works:

1. Storing Activities: Each activity is represented as a unique bit in the integer. When a user selects multiple activities, these bits are combined using the bitwise OR (|) operator, allowing all selected activities to be stored in a single integer.

2. Retrieving Activities: To check if a specific activity has been selected, the app uses the bitwise AND (&) operator:

```
const isKitesurfingSelected = (selectedActivities & ActivityEnum.Kitesurfing) !== 0;
```

If the result is not zero, it means the "Kitesurfing" bit is set in the integer, indicating that the user selected this activity.

3. Efficiency: This approach significantly reduces the amount of data stored in local storage. Instead of storing an array of strings like ["Kitesurfing", "Fishing", "Hiking"], which could take up several bytes, a single integer is stored, such as 13 (representing Kitesurfing, Hiking, and Fishing).

## Filtering with Bitwise Operations:

Filtering locations based on selected activities also becomes easier and more efficient. For example, if you want to filter locations where both "Kitesurfing" and "Fishing" are possible, you can check for the combined value using bitwise operations:

```
const activitiesFilter = ActivityEnum.Kitesurfing | ActivityEnum.Fishing;
const isMatch = (locationActivities & activitiesFilter) === activitiesFilter;
```

## Trade-offs

This approach is effective for managing a predefined set of activities and offers scalability to a certain extent. However, as the number of activities grows, the storage strategy may need to be re-evaluated. While bitwise operations provide significant performance improvements and minimize the storage footprint, long-term scalability could present challenges as the system continues to expand.

For future scalability, I'm considering using more robust storage options like IndexedDB or leveraging Service Workers with Cache Storage for offline-first capabilities. If Web SQL were not deprecated, its relational database functionality would also be ideal for this purpose.

## Conclusion

By implementing bitwise operations with the ActivityEnum, I successfully addressed the local storage limitations, significantly reducing the space required for storing user-selected activities. This solution meets my current needs, but future scaling will require careful consideration of evolving storage strategies.
