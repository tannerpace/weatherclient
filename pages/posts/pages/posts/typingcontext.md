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

## Then Define the type that you will be passing to the context consumers

```ts

interface MyContextInterface = {
  name: string
  hobies: hobie[]
}

```

## Now you can create the context with the symbol passing the interface as the type

```ts
const MyContext = createContext<MyContextInterface>(
  sym as unknown as MyContextInterface
)
```

## After that you can create the provider

```ts
const MyContextProvider = ({ children }) => {
  const [name, setName] = useState<string>('')
  const [hobies, setHobies] = useState<hobie[]>([])

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

## In order to use the context you need to create a hook

```ts
const useMyContext = () => useContext(MyContext)
```

## its convention to export the context, provider and hook

```ts
export { MyContext, MyContextProvider, useMyContext }
```

````ts


## Dont forget to wrap your app in the provider or the context will not be available and you will get an error when you try to use the hook

```tsx
import React from 'react'
import { MyContextProvider } from './MyContext'

export default function App() {
  return (
    <MyContextProvider>
      <div>My App</div>
    </MyContextProvider>
  )
}

````

#

## Full Example

```ts
import React, { createContext, useContext, useState } from 'react'

const symbol = Symbol()

interface MyContextInterface = {
  name: string
  hobies: hobie[]
}

const MyContext = createContext<MyContextInterface>(
  sym as unknown as MyContextInterface
)

const MyContextProvider = ({ children }) => {
  const [name, setName] = useState<string>('')
  const [hobies, setHobies] = useState<hobie[]>([])

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

const useMyContext = () => useContext(MyContext)

export { MyContext, MyContextProvider, useMyContext }
```

## Now you can use the context in any component

```tsx
import React from 'react'

import { useMyContext } from './MyContext'

export default function MyComponent() {
  const { name, hobies } = useMyContext()

  return (
    <div>
      <div>{name}</div>
      <div>
        {hobies.map((hobie) => (
          <div>{hobie}</div>
        ))}
      </div> // this will throw an error if hobie is not a string
    </div>
  )
}
```

Congratulations! You have typed your context! 🎉

````

```
````

```

```

```

```
