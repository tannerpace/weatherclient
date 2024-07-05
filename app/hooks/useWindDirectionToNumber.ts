type WindDirection = "N" | "S" | "E" | "W" | "NE" | "NW" | "SE" | "SW";

const useWindDirectionToNumber = (windDirection: WindDirection) => {
  const directionMap: { [key in WindDirection]: number } = {
    N: 0,
    S: 180,
    E: 90,
    W: 270,
    NE: 45,
    NW: 315,
    SE: 135,
    SW: 225,
  };
  return { result: directionMap[windDirection] };
};

export default useWindDirectionToNumber