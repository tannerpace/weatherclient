// convert a cardinal direction to a number

export default function useWindDirectionToNumber(direction) {
  let result = 0
  switch (direction) {
    case "N":
      result = 0
      break
    case "NNE":
      result = 22.5
      break
    case "NE":
      result = 45
      break
    case "ENE":
      result = 67.5
      break
    case "E":
      result = 90
      break
    case "ESE":
      result = 112.5
      break
    case "SE":
      result = 135
      break
    case "SSE":
      result = 157.5
      break
    case "S":
      result = 180
      break
    case "SSW":
      result = 202.5
      break
    case "SW":
      result = 225
      break
    case "WSW":
      result = 247.5
      break
    case "W":
      result = 270
      break
    case "WNW":
      result = 292.5
      break
    case "NW":
      result = 315
      break
    case "NNW":
      result = 337.5
      break
    default:
      result = 0
  }
  return { result }
}


