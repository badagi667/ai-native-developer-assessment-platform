package com.prompthire.execution.dto;

import java.util.List;

public class RunCodeRequest {

    private String assessmentId;
    private String language;
    private List<WorkspaceFileDto> files;

    public RunCodeRequest() {
    }

    public String getAssessmentId() {
        return assessmentId;
    }

    public void setAssessmentId(String assessmentId) {
        this.assessmentId = assessmentId;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public List<WorkspaceFileDto> getFiles() {
        return files;
    }

    public void setFiles(List<WorkspaceFileDto> files) {
        this.files = files;
    }
}