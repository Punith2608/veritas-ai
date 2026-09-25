import {
  CheckCircle2,
  XCircle,
  ShieldCheck
} from "lucide-react";

function VerificationPanel({ checks }) {
  return (
    <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

      <div className="flex items-center gap-3 mb-6">

        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
          <ShieldCheck className="text-blue-400" />
        </div>

        <div>
          <h2 className="text-xl font-bold">
            Verification Checks
          </h2>

          <p className="text-sm text-slate-400">
            Independent analysis of the AI response
          </p>
        </div>

      </div>

      <div className="space-y-3">

        {checks.map((check) => {

          const passed = check.status === "PASS";

          return (
            <div
              key={check.name}
              className="border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition"
            >

              <div className="flex items-center justify-between gap-4">

                <div className="flex items-center gap-3">

                  {passed ? (
                    <CheckCircle2 className="text-green-400" />
                  ) : (
                    <XCircle className="text-red-400" />
                  )}

                  <div>

                    <h3 className="font-semibold">
                      {check.name}
                    </h3>

                    <p className="text-sm text-slate-400 mt-1">
                      {check.explanation}
                    </p>

                  </div>

                </div>

                <div className="text-right shrink-0">

                  <p
                    className={
                      passed
                        ? "text-green-400 font-semibold"
                        : "text-red-400 font-semibold"
                    }
                  >
                    {passed ? "✓ PASS" : "✕ FAIL"}
                  </p>

                  <p className="text-sm text-slate-400">
                    {check.score}%
                  </p>

                </div>

              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
}

export default VerificationPanel;