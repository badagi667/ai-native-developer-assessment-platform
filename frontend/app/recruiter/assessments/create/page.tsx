import DashboardLayout from "@/components/layout/DashboardLayout";

export default function CreateAssessmentPage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Create Assessment
          </h1>
          <p className="text-slate-500">
            Configure an AI-native developer assessment.
          </p>
        </div>

        <form className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700">
              Assessment Title
            </label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900"
              placeholder="AI Pair Programming: Order Management API"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">
              Role
            </label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900"
              placeholder="Backend Developer"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700">
                Duration Minutes
              </label>
              <input
                type="number"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900"
                placeholder="90"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700">
                Difficulty
              </label>
              <select className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900">
                <option>Easy</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">
              Description
            </label>
            <textarea
              rows={5}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900"
              placeholder="Describe what the candidate needs to build..."
            />
          </div>

          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5">
            <h2 className="font-bold text-slate-900">AI Evaluation Options</h2>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Prompt tracking",
                "AI code review",
                "Bug injection",
                "Follow-up interviewer",
                "Security analysis",
                "Architecture scoring",
              ].map((item) => (
                <label key={item} className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="h-4 w-4" />
                  <span className="text-sm text-slate-700">{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="px-5 py-3 rounded-xl border border-slate-300 font-semibold"
            >
              Save Draft
            </button>

            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-slate-900 text-white font-semibold"
            >
              Create Assessment
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}