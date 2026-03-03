import { ReactNode } from "react";
import { motion } from "framer-motion";

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon: ReactNode;
  trend?: { value: number; label: string };
  color?: "primary" | "warning" | "info" | "danger";
}

const colorMap = {
  primary: "text-primary",
  warning: "text-warning",
  info: "text-info",
  danger: "text-danger",
};

const bgMap = {
  primary: "bg-primary/10",
  warning: "bg-warning/10",
  info: "bg-info/10",
  danger: "bg-danger/10",
};

const MetricCard = ({ label, value, unit, icon, trend, color = "primary" }: MetricCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4 flex flex-col gap-3"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
          {label}
        </span>
        <div className={`p-1.5 rounded-lg ${bgMap[color]}`}>
          <div className={colorMap[color]}>{icon}</div>
        </div>
      </div>
      <div className="flex items-baseline gap-1">
        <span className={`metric-value ${colorMap[color]}`}>{value}</span>
        {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
      </div>
      {trend && (
        <div className="flex items-center gap-1">
          <span
            className={`text-xs font-medium ${
              trend.value >= 0 ? "text-primary" : "text-danger"
            }`}
          >
            {trend.value >= 0 ? "↑" : "↓"} {Math.abs(trend.value)}%
          </span>
          <span className="text-xs text-muted-foreground">{trend.label}</span>
        </div>
      )}
    </motion.div>
  );
};

export default MetricCard;
