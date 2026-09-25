import { ShieldCheck, Activity } from "lucide-react";

function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center">
            <ShieldCheck size={26} />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-wide">
              VERITAS AI
            </h1>

            <p className="text-xs text-slate-400">
              AI Answer Verification Engine
            </p>
          </div>

        </div>

        <div className="flex items-center gap-2 text-green-400 text-sm">

          <Activity size={17} />

          Verification Active

        </div>

      </div>

    </header>
  );
}

export default Header;