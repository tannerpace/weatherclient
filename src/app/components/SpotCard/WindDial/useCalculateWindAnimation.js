import useWindDirectionToNumber from "./useWindDirectionToNumber"

const useCalculateWindAnimation = (windSpeed, windDirection) => {
  const rotation = useWindDirectionToNumber(windDirection).result
  // create animation object
  const animation = {
    transform: `rotate(${rotation}deg)`,
    animation: `shake 3s ease-in-out infinite`,
  }
  return animation
}

export default useCalculateWindAnimation
