package com.prompthire.execution.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "submissions")
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String assessmentId;
    private String candidateId;
    private Integer score;

    @Column(columnDefinition = "TEXT")
    private String filesJson;

    @Column(columnDefinition = "TEXT")
    private String testCasesJson;

    private LocalDateTime submittedAt;

    @PrePersist
    public void prePersist() {
        submittedAt = LocalDateTime.now();
    }

    public String getId() { return id; }

    public String getAssessmentId() { return assessmentId; }
    public void setAssessmentId(String assessmentId) { this.assessmentId = assessmentId; }

    public String getCandidateId() { return candidateId; }
    public void setCandidateId(String candidateId) { this.candidateId = candidateId; }

    public Integer getScore() { return score; }
    public void setScore(Integer score) { this.score = score; }

    public String getFilesJson() { return filesJson; }
    public void setFilesJson(String filesJson) { this.filesJson = filesJson; }

    public String getTestCasesJson() { return testCasesJson; }
    public void setTestCasesJson(String testCasesJson) { this.testCasesJson = testCasesJson; }

    public LocalDateTime getSubmittedAt() { return submittedAt; }
}