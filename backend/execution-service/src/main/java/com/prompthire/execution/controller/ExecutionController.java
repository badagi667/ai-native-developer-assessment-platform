package com.prompthire.execution.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.prompthire.execution.dto.RunCodeRequest;
import com.prompthire.execution.dto.SubmitAssessmentRequest;
import com.prompthire.execution.entity.Submission;
import com.prompthire.execution.repository.SubmissionRepository;
import com.prompthire.execution.service.ExecutionEngineService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/execution")
@CrossOrigin("*")
public class ExecutionController {

    private final ExecutionEngineService executionEngineService;
    private final SubmissionRepository submissionRepository;
    private final ObjectMapper objectMapper;

    public ExecutionController(
            ExecutionEngineService executionEngineService,
            SubmissionRepository submissionRepository
    ) {
        this.executionEngineService = executionEngineService;
        this.submissionRepository = submissionRepository;
        this.objectMapper = new ObjectMapper();
    }

    @PostMapping("/run")
    public Map<String, Object> runCode(@RequestBody RunCodeRequest request) {
        Map<String, Object> executionResult =
                executionEngineService.executeJavaScript(request.getFiles());

        Map<String, Object> response = new HashMap<>();

        response.put("status", "completed");
        response.put("terminalOutput", executionResult.get("terminalOutput"));
        response.put("testCases", executionResult.get("testCases"));

        return response;
    }

    @PostMapping("/submit")
    public Map<String, Object> submitAssessment(
            @RequestBody SubmitAssessmentRequest request
    ) throws Exception {

        Submission submission = new Submission();

        submission.setAssessmentId(request.getAssessmentId());
        submission.setCandidateId(request.getCandidateId());
        submission.setScore(request.getScore());

        submission.setFilesJson(
                objectMapper.writeValueAsString(request.getFiles())
        );

        submission.setTestCasesJson(
                objectMapper.writeValueAsString(request.getTestCases())
        );

        Submission savedSubmission = submissionRepository.save(submission);

        Map<String, Object> response = new HashMap<>();

        response.put("submissionId", savedSubmission.getId());
        response.put("status", "submitted");
        response.put("score", savedSubmission.getScore());

        return response;
    }
    @GetMapping("/reports/{assessmentId}")
        public Map<String, Object> getAssessmentReports(
                @PathVariable String assessmentId
        ) {
            var submissions = submissionRepository.findByAssessmentId(assessmentId);

            Map<String, Object> response = new HashMap<>();

            response.put("assessmentId", assessmentId);
            response.put("totalSubmissions", submissions.size());
            response.put("submissions", submissions);

            return response;  
        }
}