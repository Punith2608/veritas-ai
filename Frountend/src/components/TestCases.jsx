import {
  CheckCircle2,
  AlertTriangle,
  Calculator,
  GitCompare,
  SearchX
} from "lucide-react";

function TestCases({ selectedCase, onSelect }) {

  const cases = [
    {
      id: "normal",
      name: "Normal Question",
      icon: CheckCircle2
    },
    {
      id: "hallucination",
      name: "Hallucination",
      icon: AlertTriangle
    },
    {
      id: "wrongCalculation",
      name: "Wrong Calculation",
      icon: Calculator
    },
    {
      id: "conflictingEvidence",
      name: "Conflicting Evidence",
      icon: GitCompare
    },
    {
      id: "insufficientEvidence",
      name: "Insufficient Evidence",
      icon: SearchX
    }
  ];

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

      <h2 className="text-xl font-bold">
        Demo Test Cases
      </h2>

      <p className="text-sm text-slate-400 mt-1 mb-5">
        Simulate different AI verification scenarios
      </p>

      <div className="flex flex-wrap gap-3">

        {cases.map((item) => {

          const Icon = item.icon;

          const selected = selectedCase === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={
                selected
                  ? "flex items-center gap-2 px-4 py-3 rounded-xl bg-blue-600 text-white border border-blue-400 transition"
                  : "flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-950 text-slate-300 border border-slate-700 hover:border-blue-500 hover:text-white transition"
              }
            >

              <Icon size={17} />

              {item.name}

            </button>
          );
        })}

      </div>

    </section>
  );
}

export default TestCases;