import { FileCode2, FolderOpen } from "lucide-react";

export type WorkspaceFile = {
  id: string;
  name: string;
  language: string;
  content: string;
};

type FileExplorerProps = {
  files: WorkspaceFile[];
  activeFileId: string;
  onSelectFile: (fileId: string) => void;
};

export default function FileExplorer({
  files,
  activeFileId,
  onSelectFile,
}: FileExplorerProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-200 flex items-center gap-2">
        <FolderOpen size={16} />
        <h3 className="font-bold text-slate-900">Explorer</h3>
      </div>

      <div className="p-2">
        {files.map((file) => (
          <button
            key={file.id}
            onClick={() => onSelectFile(file.id)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-left ${
              activeFileId === file.id
                ? "bg-slate-900 text-white"
                : "hover:bg-slate-100 text-slate-700"
            }`}
          >
            <FileCode2 size={15} />
            {file.name}
          </button>
        ))}
      </div>
    </div>
  );
}