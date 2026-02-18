package com.taskboard;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
class TaskBoardApplicationTests {

    @Test
    void contextLoads() {
        // Smoke test to verify application context loads successfully
    }
}

