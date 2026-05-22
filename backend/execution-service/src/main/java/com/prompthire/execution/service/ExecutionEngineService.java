package com.prompthire.execution.service;

import com.prompthire.execution.dto.WorkspaceFileDto;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ExecutionEngineService {

    private final JavaScriptTestRunnerService javaScriptTestRunnerService;

    public ExecutionEngineService(
            JavaScriptTestRunnerService javaScriptTestRunnerService
    ) {
        this.javaScriptTestRunnerService = javaScriptTestRunnerService;
    }

    public Map<String, Object> executeJavaScript(
            List<WorkspaceFileDto> files
    ) {

        List<String> terminalOutput = new ArrayList<>();
        List<Map<String, Object>> testCases = new ArrayList<>();

        Path tempDir = null;

        try {
            tempDir = Files.createTempDirectory("candidate-workspace-");

            terminalOutput.add("$ node test-runner.js");
            terminalOutput.add("Workspace: " + tempDir);

            for (WorkspaceFileDto file : files) {
                Path filePath = tempDir.resolve(file.getName());

                Files.writeString(
                        filePath,
                        file.getContent(),
                        StandardOpenOption.CREATE,
                        StandardOpenOption.TRUNCATE_EXISTING
                );

                terminalOutput.add("Created file: " + file.getName());
            }

            Path testRunnerPath = tempDir.resolve("test-runner.js");

            Files.writeString(
                    testRunnerPath,
                    javaScriptTestRunnerService.buildTestRunner(),
                    StandardOpenOption.CREATE,
                    StandardOpenOption.TRUNCATE_EXISTING
            );

            terminalOutput.add("Created file: test-runner.js");

            ProcessBuilder processBuilder = new ProcessBuilder(
                    "node",
                    "test-runner.js"
            );

            processBuilder.directory(tempDir.toFile());
            processBuilder.redirectErrorStream(true);

            Process process = processBuilder.start();

            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream())
            );

            String line;

            while ((line = reader.readLine()) != null) {
                if (line.startsWith("{") && line.endsWith("}")) {
                    Map<String, Object> testCase = parseTestCaseLine(line);
                    testCases.add(testCase);

                    terminalOutput.add(
                            "✓ Test: " + testCase.get("name") + " - " + testCase.get("status")
                    );
                } else {
                    terminalOutput.add(line);
                }
            }

            int exitCode = process.waitFor();

            terminalOutput.add("Process exited with code: " + exitCode);

        } catch (Exception e) {
            terminalOutput.add("Execution failed:");
            terminalOutput.add(e.getMessage());
        } finally {
            if (tempDir != null) {
                try {
                    Files.walk(tempDir)
                            .sorted((a, b) -> b.compareTo(a))
                            .forEach(path -> {
                                try {
                                    Files.delete(path);
                                } catch (IOException ignored) {
                                }
                            });
                } catch (IOException ignored) {
                }
            }
        }

        Map<String, Object> result = new HashMap<>();
        result.put("terminalOutput", terminalOutput);
        result.put("testCases", testCases);

        return result;
    }

    private Map<String, Object> parseTestCaseLine(String line) {
        Map<String, Object> testCase = new HashMap<>();

        testCase.put("id", String.valueOf(System.nanoTime()));
        testCase.put("name", extractValue(line, "name"));
        testCase.put("status", extractValue(line, "status"));
        testCase.put("input", extractValue(line, "input"));
        testCase.put("expectedOutput", extractValue(line, "expectedOutput"));
        testCase.put("actualOutput", extractValue(line, "actualOutput"));
        testCase.put("hidden", extractValue(line, "hidden"));

        return testCase;
    }

    private String extractValue(String json, String key) {
        String pattern = "\"" + key + "\":\"";
        int start = json.indexOf(pattern);

        if (start == -1) {
            return "";
        }

        start = start + pattern.length();

        int end = json.indexOf("\",", start);

        if (end == -1) {
            end = json.indexOf("\"}", start);
        }

        if (end == -1) {
            return "";
        }

        return json.substring(start, end)
                .replace("\\\"", "\"");
    }
    private Boolean extractBooleanValue(String json, String key) {
    String truePattern = "\"" + key + "\":true";
    String falsePattern = "\"" + key + "\":false";

    if (json.contains(truePattern)) {
        return true;
    }

    if (json.contains(falsePattern)) {
        return false;
    }

    return false;
}
}