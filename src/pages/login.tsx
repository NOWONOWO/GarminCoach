import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [info, setInfo] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const signIn = async () => {
    setBusy(true);
    setInfo(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setInfo(error.message);
    setBusy(false);
  };

  const signUp = async () => {
    setBusy(true);
    setInfo(null);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setInfo(error.message);
    else setInfo("Konto utworzone. Teraz zaloguj się.");
    setBusy(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-3">
        <h1 className="text-2xl font-semibold">GarminCoach</h1>
        <p className="text-sm opacity-70">Zaloguj się, aby korzystać z aplikacji.</p>

        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Hasło" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <div className="flex gap-2">
          <Button className="w-full" onClick={signIn} disabled={busy}>
            Zaloguj
          </Button>
          <Button className="w-full" variant="secondary" onClick={signUp} disabled={busy}>
            Rejestracja
          </Button>
        </div>

        {info && <p className="text-sm opacity-80">{info}</p>}
      </div>
    </div>
  );
}
