---
title: Typing Context in React
date: 2023/6/12
description: How to type context in React
tags:
  [
    web development,
    react,
    typescript,
    javascript,
    mobiledevelopment,
    mobile development,
    react native,
    react-native,
    reactnative,
    context,
    typing,
    typescript,
    javascript
  ]
author: Tanner Bleakley
---

# Typing Context in React - Kitesurf.ninja

## Problem: Context is not typed

I was using context and TypeScript was throwing an error because the context was not typed.

```ts
import React, { createContext, useContext } from 'react'

const AppContext = createContext({})
const useAppContext = () => useContext(AppContext)

export { AppContext, useAppContext }
```

## Before I reveal the solution, let's look at the problem

The context is not typed. This is a problem because TypeScript is not able to infer the type of the context.

```ts
import React, { createContext, useContext } from 'react'

const AppContext = createContext({})
const useAppContext = () => useContext(AppContext)

export { AppContext, useAppContext }
```

## Solution: First create a symbol so we can use it as a key

```ts
const symbol = Symbol()
```

## Next Define the type that you will be passing to the context consumers

```ts

interface MyContextInterface = {
  name: string
  hobies: hobie[]
}

```

## Next create the context

```ts
const MyContext = createContext<MyContextInterface>(
  sym as unknown as MyContextInterface
)
```

## Next create the provider

```ts
const MyContextProvider = ({ children }) => {
  const [name, setName] = useState('')
  const [hobie, setHobie] = useState<hobie[]>([])

  return (
    <MyContext.Provider
      value={{
        name,
        hobies
      }}
    >
      {children}
    </MyContext.Provider>
  )
}
```

## Next create the hook

```ts
const useMyContext = () => useContext(MyContext)
```

## Next export the context, provider, and hook

```ts
export { MyContext, MyContextProvider, useMyContext }
```

## Next wrap the app in the provider

```tsx
import { MyContextProvider } from './MyContext'

const App = () => {
  return (
    <MyContextProvider>
      <AppLayout />
    </MyContextProvider>
  )
}
```

## Next use the hook

```tsx
import { useMyContext } from './MyContext'

const AppLayout = () => {
  const { name, hobies } = useMyContext()

  return (
    <div>
      <h1>{name}</h1>
      <ul>
        {hobies.map((hobie) => (
          <li>{hobie}</li> // programming, kiteboarding, surfing, running
        ))}
      </ul>
    </div>
  )
}
```

TypeScript is now able to infer the type of the context! 😀
