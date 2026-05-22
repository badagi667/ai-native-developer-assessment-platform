import DashboardLayout from "@/components/layout/DashboardLayout";
import { Clock, ShieldCheck, User } from "lucide-react";

const assessments = [
  {
    id: "1",
    title: "AI Pair Programming: Order Management API",
    role: "Backend Developer",
    duration: "90 min",
    difficulty: "Intermediate",
    candidates: 18,
    status: "Active",
  },
  {
    id: "2",
    title: "AI Code Review: Security & Scalability",
    role: "Senior Engineer",
    duration: "60 min",
    difficulty: "Advanced",
    candidates: 9,
    status: "Draft",
  },
];

export default function AssessmentListPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Assessments</h1>
            <p className="text-slate-500">
              Create and manage AI-native developer assessments.
            </p>
          </div>

          <button className="px-5 py-3 rounded-2xl bg-slate-900 text-white font-semibold">
            + New Assessment
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {assessments.map((assessment) => (
            <div
              key={assessment.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-bold text-lg text-slate-900">
                    {assessment.title}
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    {assessment.role}
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold">
                  {assessment.difficulty}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-5 text-sm">
                <div className="p-3 rounded-xl bg-slate-50">
                  <Clock size={16} />
                  <p className="mt-1">{assessment.duration}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50">
                  <User size={16} />
                  <p className="mt-1">{assessment.candidates} candidates</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50">
                  <ShieldCheck size={16} />
                  <p className="mt-1">AI Review</p>
                </div>
              </div>

              <button className="mt-5 w-full py-3 rounded-xl border border-slate-300 font-semibold hover:bg-slate-50">
                Manage
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}