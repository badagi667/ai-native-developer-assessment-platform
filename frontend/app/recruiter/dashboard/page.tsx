import DashboardLayout from "@/components/layout/DashboardLayout";
import { Bot, FileText, User, BarChart3 } from "lucide-react";

function StatCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
}) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">{value}</p>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700">
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
}

export default function RecruiterDashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="Active Assessments" value="12" icon={FileText} />
          <StatCard title="Candidates" value="248" icon={User} />
          <StatCard title="AI Reviews" value="1.2k" icon={Bot} />
          <StatCard title="Avg Score" value="74%" icon={BarChart3} />
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-900">
            Recent Assessments
          </h3>

          <p className="text-sm text-slate-500 mt-1">
            Your AI-native coding and engineering simulations will appear here.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}