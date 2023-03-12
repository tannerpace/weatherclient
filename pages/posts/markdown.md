---
title: Markdown Examples
date: 2021/3/19
description: View examples of all possible Markdown options.
tag: web development
author: You
---

# Markdown Examples

## h2 Heading

### h3 Heading

#### h4 Heading

##### h5 Heading

###### h6 Heading

## Emphasis

**This is bold text**

_This is italic text_

~~Strikethrough~~

## Blockquotes

> Develop. Preview. Ship. – Vercel

## Lists

Unordered

- Lorem ipsum dolor sit amet
- Consectetur adipiscing elit
- Integer molestie lorem at massa

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa

## Code

Inline `code`

```
import useTextStyles from "@/hooks/useTextStyles"
import useWindDirectionToNumber from "./useWindDirectionToNumber"
import useCalculateWindAnimation from "./useCalculateWindAnimation"
import { WiWindDeg } from "react-icons/wi"
const WindDial = ({ viableDirections, item }) => {
  // we need to convert the wind direction to a number
  const windAnimation = useCalculateWindAnimation(
    item.windSpeed,
    item.windDirection
  )
  const { result } = useWindDirectionToNumber(item.windDirection)
  const viable = viableDirections.includes(item.windDirection)
  return (
    <WiWindDeg
      fontWeight={900}
      size={63}
      style={{
        width: "100%",
        margin: "auto",
        backgroundColor: "transparent",
        color: viable ? "#59d95d" : "red",
        transform: `rotate(${result}deg)`,
        ...windAnimation,
      }}
    />
  )
}

export default WindDial
```

## Tables

| **Option** | **Description**                                                                                                             |
| ---------- | --------------------------------------------------------------------------------------------------------------------------- |
| First      | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. |
| Second     | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. |
| Third      | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. |

## Links

- [Next.js](https://nextjs.org)
- [Nextra](https://nextra.vercel.app/)
- [Vercel](http://vercel.com)

### Footnotes

- Footnote [^1].
- Footnote [^2].

[^1]: Footnote **can have markup**

    and multiple paragraphs.

[^2]: Footnote text.
