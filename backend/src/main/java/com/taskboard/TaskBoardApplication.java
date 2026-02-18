package com.taskboard;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

/**
 * Main entry point for the TaskBoard application.
 * A real-time task board system with WebSocket support, Redis caching, and RabbitMQ messaging.
 */
@Slf4j
@SpringBootApplication
@EnableCaching
public class TaskBoardApplication {

    public static void main(String[] args) {
        SpringApplication.run(TaskBoardApplication.class, args);
        log.info("==============================================");
        log.info("  TaskBoard Application Started Successfully  ");
        log.info("  Server running at: http://localhost:8080    ");
        log.info("  RabbitMQ UI: http://localhost:15672         ");
        log.info("==============================================");
    }
}

