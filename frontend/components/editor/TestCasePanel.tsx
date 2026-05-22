type TestCase = {
  id: string;
  name: string;
  status: "passed" | "failed" | "pending";
  hidden?: boolean;
  input: string;
  expectedOutput: string;
  actualOutput?: string;
};

type TestCasePanelProps = {
  testCases: TestCase[];
};

export default function TestCasePanel({ testCases }: TestCasePanelProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-200">
        <h3 className="font-bold text-slate-900">Test Cases</h3>
        <p className="text-xs text-slate-500">
          Visible and hidden test execution results.
        </p>
      </div>

      <div className="p-4 space-y-3">
        {testCases.map((testCase) => (
          <div
            key={testCase.id}
            className="rounded-xl border border-slate-200 bg-slate-50 p-3"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold text-sm text-slate-900">
                {testCase.hidden ? "Hidden test case" : testCase.name}
              </p>

              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  testCase.status === "passed"
                    ? "bg-emerald-100 text-emerald-700"
                    : testCase.status === "failed"
                    ? "bg-red-100 text-red-700"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {testCase.status}
              </span>
            </div>

            {!testCase.hidden && (
              <div className="mt-3 grid grid-cols-1 gap-2 text-xs">
                <div>
                  <p className="font-semibold text-slate-500">Input</p>
                  <pre className="mt-1 rounded-lg bg-white border border-slate-200 p-2 overflow-auto">
                    {testCase.input}
                  </pre>
                </div>

                <div>
                  <p className="font-semibold text-slate-500">
                    Expected Output
                  </p>
                  <pre className="mt-1 rounded-lg bg-white border border-slate-200 p-2 overflow-auto">
                    {testCase.expectedOutput}
                  </pre>
                </div>

                {testCase.actualOutput && (
                  <div>
                    <p className="font-semibold text-slate-500">
                      Actual Output
                    </p>
                    <pre className="mt-1 rounded-lg bg-white border border-slate-200 p-2 overflow-auto">
                      {testCase.actualOutput}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}