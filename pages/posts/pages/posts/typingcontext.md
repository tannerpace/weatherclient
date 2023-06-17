---
title: Typing Context in React
date: 2023/6/12
description: How to type context in React
tag: mobile development
tags: [react, typescript]
author: Tanner Bleakley
---

# Typing Context in React - Kitesurf.ninja

## Problem: Context is not typed

I was using context and TypeScript was yelling at me.

```ts
import React, { createContext, useContext } from 'react'
const AppContext = createContext({})
const useAppContext = () => useContext(AppContext)
export { AppContext, useAppContext }
```

## Before I reveal the solution, let's look at the problem

The context is not typed. This is a problem because TypeScript is not able to infer the type of the context.

## This is how I got TypeScript to infer the type of the context

```ts
interface MyContextInterface {
  name: string
  hobbies: Hobby[]
}
```

````

## create a default value for the context

```ts
const defaultContextValue: MyContextInterface = {
  name: "",
  hobbies: [],
};
````

## Finally, pass the default value to

```ts
const MyContext = createContext<MyContextInterface>(defaultContextValue)
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

## define a hook to use the context

```ts
const useMyContext = () => useContext(MyContext)
```

## export the context, provider, and hook as named exports

```ts
export { MyContext, MyContextProvider, useMyContext }
```

## wrap your App component with the a your context provider

```tsx
const App = () => {
  return (
    <MyContextProvider>
      <AppLayout />
    </MyContextProvider>
  )
}
```

## this is how to useMyContext hook without having to pass props

```tsx
import { useMyContext } from './MyContext'

const DeepChild = () => {
  const { name, hobies } = useMyContext()
  return (
    <div>
      <h1>{name}</h1>
      <ul>
        {hobies.map((hobie) => (
          <li>{hobie}</li> // programming,  kiteboarding, surfing, running
        ))}
      </ul>
    </div>
  )
}
```

Celebrate, typeScript is now able to infer the type of the context! 😀

learn more about [React Context](https://reactjs.org/docs/context.html)

learn more about [TypeScript](https://www.typescriptlang.org/docs/handbook/intro.html)

learn more about [React](https://reactjs.org/docs/getting-started.html)

learn more about [React Hooks](https://reactjs.org/docs/hooks-intro.html)
