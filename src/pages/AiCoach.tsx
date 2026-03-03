import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  "Jak wygląda mój sen w tym tygodniu?",
  "Czy powinienem dziś trenować?",
  "Zaproponuj posiłek po treningu",
  "Jak poprawić mój VO2 Max?",
];

const AiCoach = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Cześć! 👋 Jestem Twoim AI coachem. Znam Twoje dane z Garmin — sen, tętno, body battery, aktywności i więcej. Zapytaj mnie o cokolwiek dotyczącego Twojego treningu i zdrowia.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMsg: Message = { id: Date.now(), role: "user", content: messageText };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      const aiMsg: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: getMockResponse(messageText),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100dvh-7.5rem)]">
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i === messages.length - 1 ? 0.1 : 0 }}
            className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`shrink-0 h-7 w-7 rounded-full flex items-center justify-center ${
                msg.role === "assistant" ? "bg-primary/10" : "bg-secondary"
              }`}
            >
              {msg.role === "assistant" ? (
                <Bot className="h-3.5 w-3.5 text-primary" />
              ) : (
                <User className="h-3.5 w-3.5 text-muted-foreground" />
              )}
            </div>
            <div
              className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                msg.role === "assistant"
                  ? "glass-card border-border"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              {msg.content}
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-2.5"
          >
            <div className="shrink-0 h-7 w-7 rounded-full flex items-center justify-center bg-primary/10">
              <Bot className="h-3.5 w-3.5 text-primary" />
            </div>
            <div className="glass-card px-4 py-3 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0ms]" />
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:150ms]" />
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:300ms]" />
            </div>
          </motion.div>
        )}

        {/* Suggestions — only if 1 message */}
        {messages.length === 1 && (
          <div className="space-y-2 pt-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Sparkles className="h-3 w-3" />
              <span>Sugestie</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  className="text-xs px-3 py-1.5 rounded-full border border-border bg-secondary/50 text-secondary-foreground hover:border-primary/40 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-border bg-background/80 backdrop-blur-xl px-4 py-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Zapytaj AI Coacha..."
            className="flex-1 bg-secondary rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-2.5 rounded-xl bg-primary text-primary-foreground disabled:opacity-30 transition-opacity"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

function getMockResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("sen") || lower.includes("spać"))
    return "Twój sen w tym tygodniu wynosi średnio 7h 15min, co jest o 12% lepsze niż w zeszłym tygodniu. Faza głębokiego snu stanowi 22% — dobry wynik. Spróbuj utrzymać regularną porę zasypiania — Twoje dane pokazują, że najlepiej śpisz gdy kładziesz się przed 23:00.";
  if (lower.includes("trenować") || lower.includes("trening"))
    return "Na podstawie Twojej gotowości treningowej (wysoka) i body battery (78%) — tak, dziś możesz trenować. Sugeruję trening o umiarkowanej do wysokiej intensywności. Twój VO2 Max rośnie, więc interwały lub bieg tempo będą idealne. Unikaj treningu siłowego upper body — robiłeś go wczoraj.";
  if (lower.includes("posiłek") || lower.includes("jedzenie"))
    return "Po dzisiejszym biegu tempo (520 kcal) proponuję:\n\n🥗 **Posiłek regeneracyjny:**\n- Ryż z kurczakiem i warzywami (ok. 550 kcal)\n- Białko: 35-40g\n- Węglowodany: 60-70g\n\n💧 Pamiętaj o nawodnieniu — minimum 500ml w ciągu godziny po treningu.";
  if (lower.includes("vo2") || lower.includes("pułap"))
    return "Twój VO2 Max wynosi 52 ml/kg/min — to wynik powyżej średniej dla Twojego wieku. W ostatnim miesiącu wzrósł o 1 punkt. Aby dalej go poprawiać:\n\n1. 🏃 Interwały 4-6x (3-5 min w strefie 4-5)\n2. 🫁 Długie biegi w strefie 2 (80% treningów)\n3. 😴 Priorytet snu >7h\n4. 🏔️ Rozważ trening na wyższych wysokościach";
  return "Analizuję Twoje dane z Garmin... Na podstawie ostatnich trendów widzę, że Twoje parametry idą w dobrym kierunku. Body Battery stabilne, sen się poprawia. Czy chcesz żebym pogłębił jakiś konkretny temat?";
}

export default AiCoach;
