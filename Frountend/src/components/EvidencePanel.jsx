import {
  ExternalLink,
  FileText,
  CheckCircle2,
  XCircle
} from "lucide-react";

function EvidencePanel({ evidence }) {
  return (
    <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-xl font-bold">
            Evidence Sources
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Sources independently checked against the claim
          </p>
        </div>

        <span className="text-sm text-blue-400">
          {evidence.length} sources
        </span>

      </div>

      <div className="grid md:grid-cols-2 gap-4">

        {evidence.map((item) => (

          <div
            key={item.id}
            className="group border border-slate-800 rounded-xl p-5 hover:border-blue-500/50 hover:bg-blue-500/5 transition cursor-pointer"
          >

            <div className="flex justify-between">

              <div className="flex gap-3">

                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
                  <FileText size={19} />
                </div>

                <div>

                  <p className="text-xs text-slate-500">
                    Evidence #{item.id}
                  </p>

                  <h3 className="font-semibold mt-1">
                    {item.source}
                  </h3>

                </div>

              </div>

              <ExternalLink
                size={17}
                className="text-slate-500 group-hover:text-blue-400"
              />

            </div>

            <p className="text-sm text-slate-500 mt-4">
              {item.type}
            </p>

            <div className="flex justify-between items-center mt-5 pt-4 border-t border-slate-800">

              <span className="flex items-center gap-2 text-sm">

                {item.supported ? (
                  <>
                    <CheckCircle2 size={16} className="text-green-400" />
                    <span className="text-green-400">
                      Claim Supported
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle size={16} className="text-red-400" />
                    <span className="text-red-400">
                      Claim Not Supported
                    </span>
                  </>
                )}

              </span>

              <span className="text-sm font-semibold">
                {item.relevance}% relevance
              </span>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default EvidencePanel; 