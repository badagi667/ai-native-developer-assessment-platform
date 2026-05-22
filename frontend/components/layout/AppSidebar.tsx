import Link from "next/link";
import { Bot, LayoutDashboard, FileText, BarChart3 } from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    href: "/recruiter/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Assessments",
    href: "/recruiter/assessments",
    icon: FileText,
  },
  {
    label: "Reports",
    href: "/recruiter/reports",
    icon: BarChart3,
  },
];

export default function AppSidebar() {
  return (
    <aside className="hidden md:flex w-72 min-h-screen bg-slate-950 text-white p-5 flex-col">
      <div className="mb-10 flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center">
          <Bot size={24} />
        </div>

        <div>
          <h1 className="font-bold text-lg">PromptHire AI</h1>
          <p className="text-xs text-slate-400">AI-native assessment</p>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-300 hover:bg-white/10 hover:text-white transition"
            >
              <Icon size={18} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}