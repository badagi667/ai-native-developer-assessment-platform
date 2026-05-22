// src/components/ai/PromptHistory.tsx

type PromptHistoryItem = {
  id: string;
  prompt: string;
  createdAt: string;
};

type PromptHistoryProps = {
  prompts: PromptHistoryItem[];
};

export default function PromptHistory({ prompts }: PromptHistoryProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <h3 className="font-bold text-slate-900">Prompt History</h3>

      {prompts.length === 0 ? (
        <p className="mt-3 text-sm text-slate-500">
          Candidate prompts will appear here.
        </p>
      ) : (
        <div className="mt-4 space-y-3">
          {prompts.map((item) => (
            <div
              key={item.id}
              className="rounded-xl bg-slate-50 border border-slate-200 p-3"
            >
              <p className="text-sm text-slate-800">{item.prompt}</p>
              <p className="mt-2 text-xs text-slate-400">{item.createdAt}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}