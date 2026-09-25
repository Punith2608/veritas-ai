function ContradictionPanel({ contradiction }) {

  if (!contradiction) {
    return (
      <section className="bg-green-500/10 border border-green-500 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-green-400">
          ✓ No Contradiction Detected
        </h2>

        <p className="text-slate-300 mt-2">
          Available evidence is consistent with the generated claim.
        </p>
      </section>
    );
  }

  return (
    <section className="bg-red-500/10 border border-red-500 rounded-2xl p-6">

      <h2 className="text-2xl font-bold text-red-400 mb-6">
        ⚠️ CONTRADICTION DETECTED
      </h2>

      <div className="grid md:grid-cols-3 gap-4">

        <div className="bg-slate-950 rounded-xl p-5">
          <p className="text-sm text-slate-400">
            Generated Claim
          </p>

          <p className="mt-3">
            {contradiction.generated}
          </p>
        </div>

        <div className="bg-slate-950 rounded-xl p-5">
          <p className="text-sm text-slate-400">
            Evidence A
          </p>

          <p className="mt-3">
            {contradiction.evidenceA}
          </p>
        </div>

        <div className="bg-slate-950 rounded-xl p-5">
          <p className="text-sm text-slate-400">
            Evidence B
          </p>

          <p className="mt-3">
            {contradiction.evidenceB}
          </p>
        </div>

      </div>

    </section>
  );
}

export default ContradictionPanel;