import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isUserRegistered, saveUser } from "../utils/userStorage";

export function UsernameEntryPage() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Redirect jika user sudah terdaftar
  useEffect(() => {
    if (isUserRegistered()) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError("Username tidak boleh kosong");
      return;
    }

    // Simpan username dan generate userId
    saveUser(username.trim());
    
    // Redirect ke home page
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <div className="h-10 w-10 rounded-full bg-emerald-400/20 flex items-center justify-center">
              <span className="h-4 w-4 rounded-full bg-emerald-400" />
            </div>
            <span className="text-xl font-semibold tracking-tight text-slate-50">
              CalmLogs
            </span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-50 mb-2">
            Masukkan Username Anda
          </h1>
          <p className="text-sm text-slate-300">
            Silakan masukkan username untuk melanjutkan
          </p>
        </div>

        <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-6 shadow-xl shadow-black/40">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-slate-200 mb-2"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                }}
                placeholder="Masukkan username Anda"
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none ring-emerald-400/40 focus:border-emerald-300/60 focus:ring-2 placeholder:text-slate-500"
                autoFocus
              />
              {error && (
                <p className="mt-2 text-xs text-red-400">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-emerald-400/90 px-4 py-3 text-sm font-medium text-slate-950 shadow-sm hover:bg-emerald-300 transition-colors"
            >
              Lanjutkan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
