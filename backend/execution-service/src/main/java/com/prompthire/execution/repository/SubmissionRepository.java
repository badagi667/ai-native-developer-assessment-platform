package com.prompthire.execution.repository;

import com.prompthire.execution.entity.Submission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubmissionRepository extends JpaRepository<Submission, String> {

    List<Submission> findByAssessmentId(String assessmentId);
}