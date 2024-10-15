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

Optimizing Local Storage Efficiency with Bitwise Operations in TypeScript Enum
During the development of my hobby project, https://windysession.com, I encountered a critical issue: local storage was filling up quickly due to inefficient data storage. Initially, each activity was stored as a string, but as more activities were added, the storage footprint expanded rapidly. This post explores the details of the problem, the solution using bitwise operations in a TypeScript enum, and the trade-offs involved.

# Local Storage Limitations:

Local storage provides around 5MB of space in most browsers, which seems sufficient for small apps but quickly becomes inadequate when storing data inefficiently. In my case, each user-selected activity was stored as a string, leading to substantial space consumption. For example, a user selecting "Kitesurfing," "Hiking," and "Fishing" would result in multiple string entries, which compounded as more activities were added.

Additionally, my app had a feature that allowed users to filter locations based on activity types. As the app grew, so did the number of available filters, further increasing the data stored in local storage. Eventually, I began to encounter warnings and errors about exceeding local storage limits. It was clear that this strategy wasn’t scalable, so a more efficient approach was needed.

## Bottleneck:

Storing an array of strings for user activities led to unnecessary overhead due to UTF-16 encoding and inefficient data representation. The solution required a structural change to reduce space usage while still allowing for multiple activities to be stored compactly.

## Solution:

Bitwise Operations in an Enum
To reduce the storage footprint, I switched from string-based storage to bitwise operations. By defining activities as an enum in TypeScript, I could use bitwise values to store multiple activity selections in a more compact form.

```TS
enum ActivityEnum {
Kitesurfing = 1 << 0, // 1
Hiking = 1 << 1, // 2
Cycling = 1 << 2, // 4
Fishing = 1 << 3, // 8
HuntingDuck = 1 << 4, // 16
HuntingDeer = 1 << 5, // 32
Running = 1 << 7, // 128
Surfing = 1 << 8, // 256
}
```

Using bit shifts (1 << n) instead of regular numbers in the ActivityEnum offers some specific advantages, particularly in terms of efficiently managing multiple selections using bitwise operations.

### Unique Bit Representation:

By using bit shifts like 1 << n, each activity is assigned a value that corresponds to a single bit in a binary number. For example:

```
1 << 0 results in 1 (0001 in binary).
1 << 1 results in 2 (0010 in binary).
1 << 2 results in 4 (0100 in binary).
```

Each bit in a binary number represents a specific activity, ensuring no two activities share the same bit. This makes it possible to store all selected activities in a single integer using bitwise operations.

### Efficiently Combine Multiple Selections:

When users select multiple activities, their choices can be combined using the bitwise OR (|) operation. For example:
If a user selects "Kitesurfing" (1) and "Fishing" (8), their combined selection is

```
1 | 8 = 9
```

In binary, 1 is 0001 and 8 is 1000. When combined, the result is 1001, representing that both activities are selected.
This approach allows you to store multiple selections compactly in a single integer.

### How It Works:

Storing Activities: When users select activities, their selections are stored as an array of integers. For example, if "Kitesurfing" has a value of 1 and "Fishing" has a value of 8, the selected activities can be stored as an array of these integers.

Retrieving and Checking Activities: To check if a specific activity is selected, the app compares the selected activity values against the stored array. This can be done using an inclusion check, such as:

```TS
<Switch
  checked={selectedActivities.includes(parseInt(activity.value))}
/>
```

Here, selectedActivities is an array of integers representing the activities selected by the user, and activity.value corresponds to the enum value. By using includes, the app quickly determines if a particular activity is selected.

## Efficiency:

This approach significantly reduces the amount of data stored in local storage. Instead of storing an array of strings like ["Kitesurfing", "Fishing", "Hiking"], the app stores an array of integers, such as [1, 8, 2], which is much more compact.

## Filtering with Activity Values:

Filtering locations based on selected activities also becomes more efficient. For example, if you want to filter locations where both "Kitesurfing" and "Fishing" are possible, you can check against the stored values:

```TS
const activitiesFilter = [ActivityEnum.Kitesurfing, ActivityEnum.Fishing];
const isMatch = activitiesFilter.every(activity => selectedActivities.includes(activity));
```

This approach ensures that a location supports all selected activities without needing complex data structures.

## Trade-offs

While this approach is effective for managing a predefined set of activities and offers scalability to a certain extent, it does have limitations. Using an array of integers is simpler than combining values with bitwise operations, but it may still require re-evaluation if the number of activities increases substantially.

Another consideration is maintainability. Although the concept of checking values using includes is easier for other developers to understand than bitwise operations, it’s still essential to maintain clear documentation of the values and their usage.

For future scalability, I am considering options like using IndexedDB or leveraging Service Workers with Cache Storage for offline-first capabilities. If Web SQL were not deprecated, its relational database functionality would also be ideal for this purpose.

## Conclusion

This solution meets my current needs, providing a balance of simplicity and efficiency. However, as the project evolves, it may require re-evaluation to accommodate new challenges. While this approach is effective for now, maintaining a focus on thoughtful storage and data strategies will be crucial to my continued growth as a developer.
