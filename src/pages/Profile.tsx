import { motion } from "framer-motion";
import { User, Settings, RefreshCw, Database, Shield, ChevronRight } from "lucide-react";

const Profile = () => {
  return (
    <div className="container py-6 space-y-6">
      <div className="space-y-1">
        <h2 className="font-heading text-2xl font-bold tracking-tight">Profil</h2>
        <p className="text-sm text-muted-foreground">Ustawienia i konto Garmin</p>
      </div>

      {/* User card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-5 flex items-center gap-4"
      >
        <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
          <User className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="font-heading font-semibold">Użytkownik</h3>
          <p className="text-xs text-muted-foreground">Garmin Connect • Połączono</p>
        </div>
        <div className="ml-auto">
          <div className="h-2.5 w-2.5 rounded-full bg-primary" />
        </div>
      </motion.div>

      {/* Settings list */}
      <div className="space-y-1">
        {[
          { icon: RefreshCw, label: "Synchronizacja Garmin", desc: "Ostatnia: 5 min temu" },
          { icon: Database, label: "Dane lokalne", desc: "32 aktywności • 45 dni danych" },
          { icon: Settings, label: "Ustawienia AI", desc: "Model, język, styl porad" },
          { icon: Shield, label: "Prywatność", desc: "Dane przechowywane lokalnie" },
        ].map((item, i) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
            className="w-full flex items-center gap-3 p-3.5 rounded-xl hover:bg-secondary/50 transition-colors text-left"
          >
            <div className="p-2 rounded-lg bg-secondary">
              <item.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium">{item.label}</h4>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default Profile;
