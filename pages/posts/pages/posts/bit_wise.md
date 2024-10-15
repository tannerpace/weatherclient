---
title: Optimizing Local Storage with Bitwise Operations in ActivityEnum
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

# Optimizing Local Storage with Bitwise Operations in ActivityEnum

During the development of my app, I encountered a critical issue: local storage was filling up quickly due to inefficient storage of user-selected activities. Initially, each activity was stored as a string, but with more users and activities, the storage footprint expanded rapidly. This post explores the technical details of how I solved the issue using bitwise operations in a TypeScript `enum` and the trade-offs involved.

## The Initial Problem: Local Storage Limitations

Local storage provides around 5MB of space in most browsers, which sounds sufficient for small apps but quickly becomes inadequate when storing data inefficiently. In my case, each user-selected activity was being stored as a string, meaning that every activity took up more space than necessary. For instance, a user selecting "Kitesurfing", "Hiking", and "Fishing" would result in multiple string entries, which compounded as more activities were added.

Over time, this string-based storage approach led to warnings and errors about exceeding local storage limits, making it clear that this strategy wasn't scalable. The problem needed to be solved at the structural level, not just with data compression.

## Recognizing the Bottleneck

The string-based approach quickly ran into limitations as local storage filled up. Storing an array of strings for user activities consumed unnecessary space due to the overhead of UTF-16 encoding and the lack of a compact data representation. A solution was needed to reduce the space usage while still allowing for multiple activities to be stored efficiently.

## The Solution: Bitwise Operations with `ActivityEnum`

To reduce the storage footprint, I switched from string-based storage to bitwise operations. By defining activities as an `enum` in TypeScript, I could use bitwise operators to store multiple activity selections in a single integer.

```typescript
enum ActivityEnum {
  Kitesurfing = 1 << 0,  // 1
  Hiking = 1 << 1,       // 2
  Cycling = 1 << 2,      // 4
  Fishing = 1 << 3,      // 8
  HuntingDuck = 1 << 4,  // 16
  HuntingDeer = 1 << 5,  // 32
  Running = 1 << 7,      // 128
  Surfing = 1 << 8,      // 256
  // see all activitiys,  be sure to check the live page @ [https://windysession.com](www.windysession.com)
}
In this approach, each activity is assigned a unique bit by shifting 1 left by the desired number of positions. This allows multiple activities to be represented in a single integer by using bitwise OR (|) operations.

Combining Activities with Bitwise Operations
For example, if a user selects both "Kitesurfing" and "Fishing", their selected activities can be represented as:

let selectedActivities = ActivityEnum.Kitesurfing | ActivityEnum.Fishing; // 1 | 8 = 9
The resulting value 9 represents both activities and is much more compact than storing individual string values. This reduces the space used in local storage considerably, as you can store up to 32 activities using a 32-bit integer, or 64 activities with a 64-bit integer.

### Storing and Retrieving from Local Storage
Once activities are combined into a single integer, they can be stored and retrieved from local storage like this:

```

localStorage.setItem('userActivities', selectedActivities.toString());

```

const storedActivities = parseInt(localStorage.getItem('userActivities') || '0', 10);

```

You can use bitwise AND (&) operations to check which activities have been selected:

```

const hasKitesurfing = (storedActivities & ActivityEnum.Kitesurfing) !== 0);

```

This allows for quick checks on user activity selections without the need for string comparisons or large arrays.

### Performance and Scalability Considerations

While this approach drastically reduces the amount of storage required, it's important to note that it has limitations. Bitwise operations are extremely efficient, but the approach relies on the number of activities being relatively small—around 32 activities for a 32-bit integer or 64 for a 64-bit integer. If the number of activities grows beyond this, a more complex solution would be required.

### Trade off of Less Maintainability

Another consideration is maintainability. While the bitwise approach is compact and fast, it can become harder to debug or extend, especially if other developers are unfamiliar with bitwise operations. Careful documentation and adherence to coding standards are necessary to ensure the code remains readable and maintainable.

### Conclusion

Switching to bitwise operations with ActivityEnum allowed me to solve the local storage problem by reducing the space required to store user-selected activities. However, this solution is not without trade-offs. The approach works well for a fixed set of activities and can scale to a point, but further growth in the number of activities might require revisiting the storage strategy. The performance gains and reduced storage footprint make it a suitable solution for the current needs, but long-term scalability remains a consideration.

```

```
