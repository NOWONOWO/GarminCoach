import {
  Heart,
  Moon,
  Battery,
  Brain,
  Flame,
  Wind,
  Zap,
  TrendingUp,
} from "lucide-react";
import MetricCard from "@/components/MetricCard";
import { motion } from "framer-motion";

const mockMetrics = [
  { label: "Tętno", value: 62, unit: "bpm", icon: <Heart className="h-4 w-4" />, color: "danger" as const, trend: { value: -3, label: "vs wczoraj" } },
  { label: "Body Battery", value: 78, unit: "%", icon: <Battery className="h-4 w-4" />, color: "primary" as const, trend: { value: 5, label: "vs wczoraj" } },
  { label: "Sen", value: "7h 23m", icon: <Moon className="h-4 w-4" />, color: "info" as const, trend: { value: 8, label: "vs średnia" } },
  { label: "Stres", value: 28, unit: "avg", icon: <Brain className="h-4 w-4" />, color: "warning" as const, trend: { value: -12, label: "vs wczoraj" } },
  { label: "Kalorie", value: 2340, unit: "kcal", icon: <Flame className="h-4 w-4" />, color: "warning" as const, trend: { value: 4, label: "vs cel" } },
  { label: "VO2 Max", value: 52, unit: "ml/kg", icon: <Wind className="h-4 w-4" />, color: "info" as const, trend: { value: 1, label: "vs miesiąc" } },
  { label: "Gotowość", value: "Wysoka", icon: <Zap className="h-4 w-4" />, color: "primary" as const },
  { label: "Wytrenowanie", value: "Produktywne", icon: <TrendingUp className="h-4 w-4" />, color: "primary" as const },
];

const Dashboard = () => {
  return (
    <div className="container py-6 space-y-6">
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-1"
      >
        <h2 className="font-heading text-2xl font-bold tracking-tight">
          Dzień dobry 👋
        </h2>
        <p className="text-sm text-muted-foreground">
          Twoja gotowość treningowa jest <span className="text-primary font-semibold">wysoka</span> — świetny dzień na trening.
        </p>
      </motion.div>

      {/* Quick insight card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-4 border-primary/20 glow"
      >
        <div className="flex items-start gap-3">
          <div className="mt-0.5 p-2 rounded-lg bg-primary/10">
            <Zap className="h-4 w-4 text-primary" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-heading font-semibold">AI Insight</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Twój sen poprawił się o 8% w porównaniu ze średnią. Body Battery na wysokim poziomie. 
              Rozważ trening interwałowy lub bieg tempo — Twoje ciało jest gotowe na intensywny wysiłek.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 gap-3">
        {mockMetrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
          >
            <MetricCard {...metric} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
