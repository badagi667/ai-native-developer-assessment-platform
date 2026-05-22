import axios from "axios";
import { WorkspaceFile } from "@/components/editor/FileExplorer";
import { TestCaseResult } from "./executionService";

export type SubmitAssessmentRequest = {
  assessmentId: string;
  candidateId: string;
  files: WorkspaceFile[];
  testCases: TestCaseResult[];
  score: number;
};

export type SubmitAssessmentResponse = {
  submissionId: string;
  status: "submitted";
  score: number;
};

export async function submitAssessment(
  payload: SubmitAssessmentRequest
): Promise<SubmitAssessmentResponse> {
  const response = await axios.post<SubmitAssessmentResponse>(
    "http://localhost:8083/api/execution/submit",
    payload
  );

  return response.data;
}