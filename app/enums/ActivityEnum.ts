enum ActivityEnum {
  Kitesurfing = 1 << 0, // 1
  Hiking = 1 << 1,      // 2
  Cycling = 1 << 2,     // 4
  Fishing = 1 << 3,     // 8
  HuntingDuck = 1 << 4, // 16
  HuntingDeer = 1 << 5, // 32
  HuntingTurkey = 1 << 6, // 64
  Running = 1 << 7,     // 128
  Surfing = 1 << 8,     // 256
  FishingRedfish = 1 << 9, // 512
  ShrimpingWithPoles = 1 << 10, // 1024
  Kayaking = 1 << 11,   // 2048
  Paddleboarding = 1 << 12, // 4096
  Sailing = 1 << 13,    // 8192
  BirdWatching = 1 << 14,   // 16384
  JetSkiing = 1 << 15    // 32768
}

interface ActivityItem {
  label: string;
  value: string;
}

// Define the labels for each activity
const ActivityLabels: Record<ActivityEnum, string> = {
  [ActivityEnum.Kitesurfing]: "Kitesurfing",
  [ActivityEnum.Hiking]: "Hiking",
  [ActivityEnum.Cycling]: "Cycling",
  [ActivityEnum.Fishing]: "Fishing",
  [ActivityEnum.HuntingDuck]: "Hunting - Duck",
  [ActivityEnum.HuntingDeer]: "Hunting - Deer",
  [ActivityEnum.HuntingTurkey]: "Hunting - Turkey",
  [ActivityEnum.Running]: "Running",
  [ActivityEnum.Surfing]: "Surfing",
  [ActivityEnum.FishingRedfish]: "Fishing - Redfish",
  [ActivityEnum.ShrimpingWithPoles]: "Shrimping with Poles",
  [ActivityEnum.Kayaking]: "Kayaking",
  [ActivityEnum.Paddleboarding]: "Paddleboarding",
  [ActivityEnum.Sailing]: "Sailing",
  [ActivityEnum.BirdWatching]: "Bird Watching",
  [ActivityEnum.JetSkiing]: "Jet Skiing",
};

// map over the enum values and generate a list of activity items
const getActivities = (): ActivityItem[] => {
  return Object.values(ActivityEnum)
    .filter((value) => typeof value === "number") // Filter out non-numeric values
    .map((enumValue) => ({
      label: ActivityLabels[enumValue as ActivityEnum],
      value: enumValue.toString(),
    }));
};


const activities: ActivityItem[] = getActivities();

export { activities };
export default ActivityEnum;
