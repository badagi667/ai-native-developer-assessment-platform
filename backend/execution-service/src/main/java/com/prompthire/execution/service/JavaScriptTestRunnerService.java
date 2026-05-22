package com.prompthire.execution.service;

import org.springframework.stereotype.Service;

@Service
public class JavaScriptTestRunnerService {

    public String buildTestRunner() {
        return """
                const originalLog = console.log;

                // Disable candidate console logs
                console.log = () => {};

                const { createOrder } = require("./orderService.js");

                // Restore logging for judge
                console.log = originalLog;

                function runTest(name, input, expected, hidden) {

                    const actual = createOrder(input);

                    const passed =
                        JSON.stringify(actual) === JSON.stringify(expected);

                    console.log(JSON.stringify({
                        type: "TEST_RESULT",
                        hidden,
                        name,
                        status: passed ? "passed" : "failed",
                        input: JSON.stringify(input),
                        expectedOutput: JSON.stringify(expected),
                        actualOutput: JSON.stringify(actual)
                    }));
                }

                // Visible tests
                runTest(
                "Valid order request",
                { productId: "P100", quantity: 2 },
                { status: "created", orderId: "ORD-1001" },
                false
                );

                runTest(
                "Invalid quantity",
                { productId: "P100", quantity: 0 },
                { error: "Invalid quantity" },
                false
                );

                // Hidden tests
                runTest(
                "Missing product id",
                { quantity: 1 },
                { error: "Product is required" },
                true
                );

                runTest(
                "Negative quantity",
                { productId: "P200", quantity: -5 },
                { error: "Invalid quantity" },
                true
                );
                """;
    }
}