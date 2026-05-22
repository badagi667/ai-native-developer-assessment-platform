import { WorkspaceFile } from "./FileExplorer";

type EditorTabsProps = {
  files: WorkspaceFile[];
  activeFileId: string;
  onSelectFile: (fileId: string) => void;
};

export default function EditorTabs({
  files,
  activeFileId,
  onSelectFile,
}: EditorTabsProps) {
  return (
    <div className="flex bg-slate-900 border-b border-white/10 overflow-x-auto">
      {files.map((file) => (
        <button
          key={file.id}
          onClick={() => onSelectFile(file.id)}
          className={`px-4 py-2 text-sm border-r border-white/10 ${
            activeFileId === file.id
              ? "bg-slate-950 text-white"
              : "bg-slate-900 text-slate-400 hover:text-white"
          }`}
        >
          {file.name}
        </button>
      ))}
    </div>
  );
}