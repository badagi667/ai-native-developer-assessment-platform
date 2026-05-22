import { Terminal } from "lucide-react";

type TerminalPanelProps = {
  output: string[];
};

export default function TerminalPanel({ output }: TerminalPanelProps) {
  return (
    <div className="h-48 bg-black text-slate-100 border-t border-white/10 flex flex-col">
      <div className="px-4 py-2 bg-slate-900 border-b border-white/10 flex items-center gap-2 text-sm">
        <Terminal size={15} />
        <span className="font-semibold">Terminal</span>
      </div>

      <div className="flex-1 p-4 font-mono text-xs overflow-auto space-y-1">
        {output.length === 0 ? (
          <p className="text-slate-500">$ Run code to see output...</p>
        ) : (
          output.map((line, index) => <p key={index}>{line}</p>)
        )}
      </div>
    </div>
  );
}