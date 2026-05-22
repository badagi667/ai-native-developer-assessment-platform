import { User } from "lucide-react";

export default function AppHeader() {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold text-slate-900">
          Recruiter Dashboard
        </h2>
        <p className="text-sm text-slate-500">
          Manage AI-native developer assessments.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:block text-right">
          <p className="text-sm font-semibold">Recruiter Admin</p>
          <p className="text-xs text-slate-500">admin@company.com</p>
        </div>

        <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center">
          <User size={18} />
        </div>
      </div>
    </header>
  );
}