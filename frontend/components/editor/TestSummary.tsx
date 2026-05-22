type TestCase = {
  id: string;
  name: string;
  status: "passed" | "failed" | "pending";
  hidden?: boolean;
};

type TestSummaryProps = {
  testCases: TestCase[];
};

export default function TestSummary({ testCases }: TestSummaryProps) {
  const total = testCases.length;
  const passed = testCases.filter((testCase) => testCase.status === "passed").length;
  const score = total === 0 ? 0 : Math.round((passed / total) * 100);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <h3 className="font-bold text-slate-900">Execution Summary</h3>

      <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-slate-500">Passed</p>
          <p className="text-xl font-bold text-slate-900">
            {passed} / {total}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-slate-500">Score</p>
          <p className="text-xl font-bold text-slate-900">{score}%</p>
        </div>
      </div>
    </div>
  );
}