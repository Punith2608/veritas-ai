function RevisionHistory({ history }) {
  return (
    <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

      <h2 className="text-xl font-bold">
        Revision History
      </h2>

      <p className="text-sm text-slate-400 mt-1 mb-6">
        Verification attempts and detected issues
      </p>

      <div className="space-y-5">

        {history.map((item, index) => {

          const passed = item.status === "PASS";

          return (
            <div
              key={item.attempt}
              className="flex gap-4"
            >

              <div className="flex flex-col items-center">

                <div
                  className={
                    passed
                      ? "w-9 h-9 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center font-bold"
                      : "w-9 h-9 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center font-bold"
                  }
                >
                  {item.attempt}
                </div>

                {index !== history.length - 1 && (
                  <div className="w-px h-8 bg-slate-800 mt-2" />
                )}

              </div>

              <div className="pt-1">

                <p className="font-semibold">
                  Attempt {item.attempt}
                </p>

                <p
                  className={
                    passed
                      ? "text-green-400 text-sm mt-1"
                      : "text-red-400 text-sm mt-1"
                  }
                >
                  {passed ? "✓" : "✕"} {item.message}
                </p>

              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
}

export default RevisionHistory;