import { motion } from "framer-motion";
import { Clock, Flame, Heart, MapPin, ChevronRight } from "lucide-react";

const mockActivities = [
  {
    id: 1,
    type: "Bieg",
    name: "Poranny bieg — tempo",
    date: "Dziś, 07:15",
    duration: "42 min",
    distance: "7.2 km",
    calories: 520,
    avgHr: 156,
    emoji: "🏃",
  },
  {
    id: 2,
    type: "Siłownia",
    name: "Upper body — push",
    date: "Wczoraj, 18:00",
    duration: "55 min",
    distance: null,
    calories: 380,
    avgHr: 132,
    emoji: "🏋️",
  },
  {
    id: 3,
    type: "Rower",
    name: "Rower — aktywna regeneracja",
    date: "2 dni temu",
    duration: "35 min",
    distance: "14.8 km",
    calories: 290,
    avgHr: 118,
    emoji: "🚴",
  },
  {
    id: 4,
    type: "Bieg",
    name: "Interwały 6x800m",
    date: "3 dni temu",
    duration: "48 min",
    distance: "9.1 km",
    calories: 640,
    avgHr: 168,
    emoji: "🏃",
  },
];

const Activities = () => {
  return (
    <div className="container py-6 space-y-6">
      <div className="space-y-1">
        <h2 className="font-heading text-2xl font-bold tracking-tight">Aktywności</h2>
        <p className="text-sm text-muted-foreground">
          Ostatnie treningi i AI podsumowania
        </p>
      </div>

      <div className="space-y-3">
        {mockActivities.map((activity, i) => (
          <motion.button
            key={activity.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
            className="glass-card p-4 w-full text-left flex items-center gap-4 hover:border-primary/30 transition-colors"
          >
            <div className="text-2xl">{activity.emoji}</div>
            <div className="flex-1 min-w-0 space-y-1.5">
              <div>
                <h3 className="text-sm font-heading font-semibold truncate">
                  {activity.name}
                </h3>
                <p className="text-xs text-muted-foreground">{activity.date}</p>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {activity.duration}
                </span>
                {activity.distance && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {activity.distance}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Flame className="h-3 w-3" />
                  {activity.calories}
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  {activity.avgHr}
                </span>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default Activities;
