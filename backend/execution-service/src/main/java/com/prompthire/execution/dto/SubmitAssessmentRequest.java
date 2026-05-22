package com.prompthire.execution.dto;

import java.util.List;
import java.util.Map;

public class SubmitAssessmentRequest {

    private String assessmentId;
    private String candidateId;
    private List<WorkspaceFileDto> files;
    private List<Map<String, Object>> testCases;
    private Integer score;

    public String getAssessmentId() {
        return assessmentId;
    }

    public void setAssessmentId(String assessmentId) {
        this.assessmentId = assessmentId;
    }

    public String getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(String candidateId) {
        this.candidateId = candidateId;
    }

    public List<WorkspaceFileDto> getFiles() {
        return files;
    }

    public void setFiles(List<WorkspaceFileDto> files) {
        this.files = files;
    }

    public List<Map<String, Object>> getTestCases() {
        return testCases;
    }

    public void setTestCases(List<Map<String, Object>> testCases) {
        this.testCases = testCases;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }
}