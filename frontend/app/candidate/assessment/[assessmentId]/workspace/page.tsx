"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Bot, Code2, Play, Send } from "lucide-react";

import PromptHistory from "@/components/ai/PromptHistory";
import TestCasePanel from "@/components/editor/TestCasePanel";
import FileExplorer, {
  WorkspaceFile,
} from "@/components/editor/FileExplorer";
import EditorTabs from "@/components/editor/EditorTabs";
import TerminalPanel from "@/components/editor/TerminalPanel";
import { runCodeExecution } from "@/services/executionService";
import TestSummary from "@/components/editor/TestSummary";
import { submitAssessment } from "@/services/submissionService";

type TestCaseStatus = "passed" | "failed" | "pending";

type TestCase = {
  id: string;
  name: string;
  status: TestCaseStatus;
  hidden?: boolean;
  input: string;
  expectedOutput: string;
  actualOutput?: string;
};

const initialFiles: WorkspaceFile[] = [
  {
    id: "1",
    name: "orderService.js",
    language: "javascript",
    content: `function createOrder(orderRequest) {

  if (!orderRequest.productId) {
    return {
      error: "Product is required"
    };
  }

  if (orderRequest.quantity <= 0) {
    return {
      error: "Invalid quantity"
    };
  }

  return {
    status: "created",
    orderId: "ORD-1001"
  };
}

console.log(
  "Valid order:",
  createOrder({
    productId: "P100",
    quantity: 2
  })
);

console.log(
  "Invalid quantity:",
  createOrder({
    productId: "P100",
    quantity: 0
  })
);

console.log(
  "Missing product:",
  createOrder({
    quantity: 1
  })
);
module.exports = {
  createOrder
};`,
  },
  {
    id: "2",
    name: "orderValidator.js",
    language: "javascript",
    content: `export function validateOrder(orderRequest) {
  if (!orderRequest.productId) {
    return { valid: false, error: "Product is required" };
  }

  if (orderRequest.quantity <= 0) {
    return { valid: false, error: "Invalid quantity" };
  }

  return { valid: true };
}`,
  },
  {
    id: "3",
    name: "README.md",
    language: "markdown",
    content: `# Order Management API

Build a scalable REST API for creating and managing customer orders.

Focus on:
- validation
- concurrency
- security
- scalability
- production readiness`,
  },
];

const initialTestCases: TestCase[] = [
  {
    id: "1",
    name: "Valid order request",
    status: "pending",
    input: `{ productId: "P100", quantity: 2 }`,
    expectedOutput: `{ status: "created" }`,
  },
  {
    id: "2",
    name: "Invalid quantity",
    status: "pending",
    input: `{ productId: "P100", quantity: 0 }`,
    expectedOutput: `{ error: "Invalid quantity" }`,
  },
];

export default function CandidateWorkspacePage() {
  const [files, setFiles] = useState<WorkspaceFile[]>(initialFiles);
  const [activeFileId, setActiveFileId] = useState(initialFiles[0].id);
  const [prompt, setPrompt] = useState("");
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [testCases, setTestCases] = useState<TestCase[]>(initialTestCases);

  const [promptHistory, setPromptHistory] = useState<
    { id: string; prompt: string; createdAt: string }[]
  >([]);

  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "I can help you reason through the project. Start by reviewing the file structure and validation flow.",
    },
  ]);

  const activeFile = files.find((file) => file.id === activeFileId);

  const updateActiveFileContent = (value: string) => {
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.id === activeFileId ? { ...file, content: value } : file
      )
    );
  };

  const sendPrompt = () => {
    if (!prompt.trim()) return;

    const newPrompt = {
      id: crypto.randomUUID(),
      prompt,
      createdAt: new Date().toLocaleTimeString(),
    };

    setPromptHistory((prev) => [newPrompt, ...prev]);

    setMessages((prev) => [
      ...prev,
      { role: "candidate", text: prompt },
      {
        role: "ai",
        text: "Good prompt. Check validation, error handling, concurrency risk, and whether the implementation is production-ready.",
      },
    ]);

    setPrompt("");
  };

  const runCode = async () => {
  try {
    setTerminalOutput([
      "$ npm test",
      "Connecting to execution engine...",
    ]);

    const pendingCases = testCases.map((testCase) => ({
      ...testCase,
      status: "pending" as const,
      actualOutput: undefined,
    }));

    setTestCases(pendingCases);

    const response = await runCodeExecution({
      assessmentId: "1",
      language: "javascript",
      files,
    });

    setTerminalOutput(response.terminalOutput);

    setTestCases(response.testCases);
  } catch (error) {
    console.error(error);

    setTerminalOutput([
      "$ npm test",
      "Execution service unavailable.",
    ]);
  }
};

const submitCode = async () => {
  const confirmSubmit = window.confirm(
    "Are you sure you want to submit this assessment?"
  );

  if (!confirmSubmit) return;

  const total = testCases.length;
  const passed = testCases.filter(
    (testCase) => testCase.status === "passed"
  ).length;

  const score = total === 0 ? 0 : Math.round((passed / total) * 100);

  const response = await submitAssessment({
    assessmentId: "1",
    candidateId: "candidate-1",
    files,
    testCases,
    score,
  });

  alert(`Assessment submitted successfully. Score: ${response.score}%`);
};
  return (
    <main className="min-h-screen bg-slate-950 p-4">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 h-[calc(100vh-32px)]">
        <section className="xl:col-span-3 bg-slate-100 rounded-2xl border border-slate-800 shadow-sm p-4 overflow-auto space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <h1 className="font-bold text-xl text-slate-900">
              Order Management API
            </h1>

            <p className="text-sm text-slate-500 mt-2">
              Build a scalable REST API for creating and managing customer
              orders.
            </p>

            <div className="mt-5 space-y-5 text-sm text-slate-700">
              <div>
                <h2 className="font-semibold text-slate-900">Requirements</h2>
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  <li>Create order endpoint</li>
                  <li>Validate product and quantity</li>
                  <li>Handle concurrent requests</li>
                  <li>Explain scaling decisions</li>
                  <li>Identify security concerns</li>
                </ul>
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">Evaluation</h2>
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  <li>Code correctness</li>
                  <li>Prompt quality</li>
                  <li>AI collaboration</li>
                  <li>Debugging ability</li>
                  <li>Production thinking</li>
                </ul>
              </div>
            </div>
          </div>

          <FileExplorer
            files={files}
            activeFileId={activeFileId}
            onSelectFile={setActiveFileId}
          />

          <PromptHistory prompts={promptHistory} />
          <TestSummary testCases={testCases} />

          <TestCasePanel testCases={testCases} />
        </section>

        <section className="xl:col-span-6 bg-slate-950 rounded-2xl border border-slate-800 shadow-sm overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between text-white bg-slate-900">
            <div className="flex items-center gap-2">
              <Code2 size={18} />
              <span className="font-semibold">VS Code Workspace</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={runCode}
                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 flex items-center gap-2 text-sm"
              >
                <Play size={14} />
                Run
              </button>

              <button 
                onClick={submitCode}
                 className="px-3 py-2 rounded-xl bg-white text-slate-950 font-semibold text-sm">
                Submit
              </button>
            </div>
          </div>

          <EditorTabs
            files={files}
            activeFileId={activeFileId}
            onSelectFile={setActiveFileId}
          />

          <div className="flex-1 min-h-0">
            <Editor
              height="100%"
              language={activeFile?.language || "javascript"}
              theme="vs-dark"
              value={activeFile?.content || ""}
              onChange={(value) => updateActiveFileContent(value || "")}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                wordWrap: "on",
                automaticLayout: true,
              }}
            />
          </div>

          <TerminalPanel output={terminalOutput} />
        </section>

        <section className="xl:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center gap-2">
            <Bot size={18} />
            <h2 className="font-bold text-slate-900">AI Assistant</h2>
          </div>

          <div className="flex-1 p-4 space-y-3 overflow-auto bg-slate-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-3 rounded-2xl text-sm ${
                  message.role === "ai"
                    ? "bg-white border border-slate-200 text-slate-700"
                    : "bg-slate-900 text-white ml-6"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-slate-200 flex gap-2">
            <input
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") sendPrompt();
              }}
              placeholder="Ask AI for guidance..."
              className="flex-1 px-3 py-2 rounded-xl border border-slate-300 outline-none text-sm"
            />

            <button
              onClick={sendPrompt}
              className="w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center"
            >
              <Send size={16} />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}