import { Bot, Sparkles } from "lucide-react";

function AnswerCard({ question, answer }) {
  return (
    <section className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

      <div className="p-6">

        <div className="flex items-center gap-2 text-slate-400 text-sm mb-3">
          <Bot size={18} />
          AI GENERATED ANSWER
        </div>

        <p className="text-sm text-slate-500 mb-2">
          Question
        </p>

        <p className="text-slate-300 mb-6">
          {question}
        </p>

        <div className="border border-blue-500/30 bg-blue-500/5 rounded-xl p-5">

          <div className="flex items-center gap-2 text-blue-400 text-sm mb-3">
            <Sparkles size={17} />
            Generated Response
          </div>

          <p className="text-xl leading-relaxed">
            {answer}
          </p>

        </div>

      </div>

      <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 text-center text-xs text-slate-500">
        ↓ Independent verification starts below
      </div>

    </section>
  );
}

export default AnswerCard;