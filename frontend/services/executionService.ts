import axios from "axios";

export type WorkspaceFile = {
  id: string;
  name: string;
  language: string;
  content: string;
};

export type TestCaseStatus = "passed" | "failed" | "pending";

export type TestCaseResult = {
  id: string;
  name: string;
  status: TestCaseStatus;
  hidden?: boolean;
  input: string;
  expectedOutput: string;
  actualOutput?: string;
};

export type RunCodeRequest = {
  assessmentId: string;
  language: string;
  files: WorkspaceFile[];
};

export type RunCodeResponse = {
  status: "completed" | "failed";
  terminalOutput: string[];
  testCases: TestCaseResult[];
};

export async function runCodeExecution(
  payload: RunCodeRequest
): Promise<RunCodeResponse> {
  const response = await axios.post<RunCodeResponse>(
    "http://localhost:8083/api/execution/run",
    payload
  );

  return response.data;
}