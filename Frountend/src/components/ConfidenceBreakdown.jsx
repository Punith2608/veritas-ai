function ConfidenceBreakdown({ confidence }) {

  const values = [
    ["Evidence", confidence.evidence],
    ["Logic", confidence.logic],
    ["Calculation", confidence.calculation],
    ["Source Quality", confidence.sourceQuality],
    ["Risk", confidence.risk]
  ];

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

      <h2 className="text-xl font-bold">
        Confidence Breakdown
      </h2>

      <p className="text-sm text-slate-400 mt-1 mb-6">
        Confidence calculated from independent checks
      </p>

      <div className="space-y-5">

        {values.map(([name, value]) => (

          <div key={name}>

            <div className="flex justify-between text-sm mb-2">

              <span>{name}</span>

              <span className="font-semibold">
                {value}%
              </span>

            </div>

            <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">

              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-700"
                style={{
                  width: `${value}%`
                }}
              />

            </div>

          </div>

        ))}

      </div>

      <div className="mt-7 pt-6 border-t border-slate-800 text-center">

        <p className="text-sm text-slate-400">
          Overall Confidence
        </p>

        <p className="text-5xl font-bold text-blue-400 mt-2">
          {confidence.overall}%
        </p>

      </div>

    </section>
  );
}

export default ConfidenceBreakdown;