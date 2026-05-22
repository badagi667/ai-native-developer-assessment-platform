package com.prompthire.execution.controller;

import com.prompthire.execution.dto.RunCodeRequest;
import com.prompthire.execution.service.ExecutionEngineService;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.Map;
import com.prompthire.execution.dto.SubmitAssessmentRequest;
import java.util.UUID;

@RestController
@RequestMapping("/api/execution")
@CrossOrigin("*")
public class ExecutionController {

    private final ExecutionEngineService executionEngineService;

    public ExecutionController(ExecutionEngineService executionEngineService) {
        this.executionEngineService = executionEngineService;
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
        ) {
            Map<String, Object> response = new HashMap<>();

            response.put("submissionId", UUID.randomUUID().toString());
            response.put("status", "submitted");
            response.put("score", request.getScore());

            return response;
        }
}