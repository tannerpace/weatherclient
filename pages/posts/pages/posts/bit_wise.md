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

# Storage Bottle Necks in a privacy focused app.

During the development of my app, windysession.com, I encountered a critical issue: local storage was filling up quickly due to inefficient storage of user-selected activities. Initially, each activity was stored as a string, but as more activities were added, the storage footprint expanded rapidly. This post explores the technical details of how I solved the issue using bitwise operations in a TypeScript enum and the trade-offs involved.

The Initial Problem: Local Storage Limitations

Local storage provides around 5MB of space in most browsers, which sounds sufficient for small apps but quickly becomes inadequate when storing data inefficiently. In my case, each user-selected activity was being stored as a string, meaning that every activity took up more space than necessary. For instance, a user selecting "Kitesurfing," "Hiking," and "Fishing" would result in multiple string entries, which compounded as more activities were added.

Additionally, my app had a filter feature that allowed users to filter locations based on the activity type, and as the app grew, the number of available filters also expanded rapidly. This further increased the data stored in local storage.

[https://windysession.com](www.windysession.com)

#
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
}
```

In this approach, each activity is assigned a unique bit by shifting 1 left by the desired number of positions. This allows multiple activities to be represented in a single integer by using bitwise OR (|) operations.

Combining Activities with Bitwise Operations
For example, if a user selects both "Kitesurfing" and "Fishing", their selected activities can be represented as: 

### Trade offs

Trade-offs

This approach is effective for managing a predefined set of activities and offers scalability to a certain extent. However, as the number of activities grows, the storage strategy may need to be re-evaluated. While bitwise operations provide significant performance improvements and minimize the storage footprint, long-term scalability could present challenges as the system continues to expand. For a more scalable local storage, I'm considering using IndexedDB or, Service Workers with Cache Storage for offline-first capabilities, if Web SQL wasn't deprecated it would be nice for its relational database functionality.

Conclusion

By implementing bitwise operations with the ActivityEnum, I successfully addressed the local storage limitations, significantly reducing the space required for storing user-selected activities. This solution meets my current needs, but future scaling will require careful consideration of evolving storage strategies.

