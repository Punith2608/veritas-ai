import {
  CheckCircle2,
  AlertTriangle,
  XCircle
} from "lucide-react";

function DecisionPanel({ decision, reason }) {

  const config = {
    VERIFIED: {
      icon: CheckCircle2,
      color: "text-green-400",
      border: "border-green-500/40",
      background: "bg-green-500/5"
    },

    "NEEDS CORRECTION": {
      icon: AlertTriangle,
      color: "text-yellow-400",
      border: "border-yellow-500/40",
      background: "bg-yellow-500/5"
    },

    REJECTED: {
      icon: XCircle,
      color: "text-red-400",
      border: "border-red-500/40",
      background: "bg-red-500/5"
    }
  };

  const current = config[decision];
  const Icon = current.icon;

  return (
    <section
      className={`${current.background} ${current.border} border rounded-2xl p-6 flex flex-col items-center justify-center text-center min-h-[300px]`}
    >

      <Icon
        size={60}
        className={current.color}
      />

      <p className="text-sm text-slate-400 mt-5">
        FINAL VERIFICATION DECISION
      </p>

      <h2
        className={`text-4xl font-black mt-2 ${current.color}`}
      >
        {decision}
      </h2>

      <p className="text-slate-300 mt-4 max-w-md">
        {reason}
      </p>

    </section>
  );
}

export default DecisionPanel;