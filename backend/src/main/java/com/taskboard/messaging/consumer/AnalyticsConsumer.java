package com.taskboard.messaging.consumer;

import com.taskboard.model.event.BoardCreatedEvent;
import com.taskboard.model.event.CardCreatedEvent;
import com.taskboard.model.event.CardMovedEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

/**
 * Consumer for analytics events from RabbitMQ.
 * Collects metrics and statistics about card and board activities.
 * In production, this would store metrics in a time-series database or analytics service.
 */
@Slf4j
@Component
public class AnalyticsConsumer {

    // Simple in-memory metrics (would be a real analytics service in production)
    private final ConcurrentHashMap<String, AtomicLong> metrics = new ConcurrentHashMap<>();

    /**
     * Handle card moved events for analytics.
     */
    @RabbitListener(queues = "${taskboard.rabbitmq.queue.analytics:taskboard.analytics}")
    public void handleCardMovedForAnalytics(CardMovedEvent event) {
        log.debug("=== ANALYTICS: Processing Card Moved Event ===");

        // Track metrics
        incrementMetric("cards_moved_total");
        incrementMetric("cards_moved_board_" + event.getBoardId());
        incrementMetric("cards_moved_from_list_" + event.getFromListId());
        incrementMetric("cards_moved_to_list_" + event.getToListId());

        if (event.getMovedByUserId() != null) {
            incrementMetric("cards_moved_by_user_" + event.getMovedByUserId());
        }

        log.info("Analytics recorded: Card move - {} -> {} (Total moves: {})",
                event.getFromListName(),
                event.getToListName(),
                getMetric("cards_moved_total"));
    }

    /**
     * Handle card created events for analytics.
     */
    @RabbitListener(queues = "${taskboard.rabbitmq.queue.analytics:taskboard.analytics}")
    public void handleCardCreatedForAnalytics(CardCreatedEvent event) {
        log.debug("=== ANALYTICS: Processing Card Created Event ===");

        // Track metrics
        incrementMetric("cards_created_total");
        incrementMetric("cards_created_board_" + event.getBoardId());
        incrementMetric("cards_created_list_" + event.getListId());
        incrementMetric("cards_created_priority_" + event.getPriority().name().toLowerCase());

        if (event.getCreatedByUserId() != null) {
            incrementMetric("cards_created_by_user_" + event.getCreatedByUserId());
        }

        log.info("Analytics recorded: Card created - {} in {} (Total cards created: {})",
                event.getCardTitle(),
                event.getListName(),
                getMetric("cards_created_total"));
    }

    /**
     * Handle board created events for analytics.
     */
    @RabbitListener(queues = "${taskboard.rabbitmq.queue.analytics:taskboard.analytics}")
    public void handleBoardCreatedForAnalytics(BoardCreatedEvent event) {
        log.debug("=== ANALYTICS: Processing Board Created Event ===");

        // Track metrics
        incrementMetric("boards_created_total");

        if (event.getCreatedByUserId() != null) {
            incrementMetric("boards_created_by_user_" + event.getCreatedByUserId());
        }

        log.info("Analytics recorded: Board created - {} (Total boards: {})",
                event.getBoardName(),
                getMetric("boards_created_total"));
    }

    /**
     * Increment a metric counter.
     */
    private void incrementMetric(String metricName) {
        metrics.computeIfAbsent(metricName, k -> new AtomicLong(0)).incrementAndGet();
    }

    /**
     * Get a metric value.
     */
    public long getMetric(String metricName) {
        AtomicLong metric = metrics.get(metricName);
        return metric != null ? metric.get() : 0;
    }

    /**
     * Get all metrics (for monitoring/debugging).
     */
    public ConcurrentHashMap<String, AtomicLong> getAllMetrics() {
        return new ConcurrentHashMap<>(metrics);
    }
}

