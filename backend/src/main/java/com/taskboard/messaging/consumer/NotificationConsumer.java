package com.taskboard.messaging.consumer;

import com.taskboard.model.event.BoardCreatedEvent;
import com.taskboard.model.event.CardCreatedEvent;
import com.taskboard.model.event.CardMovedEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

/**
 * Consumer for notification events from RabbitMQ.
 * Handles card and board events to send notifications.
 * In a production environment, this would integrate with email, SMS, or push notification services.
 */
@Slf4j
@Component
public class NotificationConsumer {

    /**
     * Handle card moved events for notifications.
     */
    @RabbitListener(queues = "${taskboard.rabbitmq.queue.notifications:taskboard.notifications}")
    public void handleCardMovedEvent(CardMovedEvent event) {
        log.info("=== NOTIFICATION: Card Moved ===");
        log.info("Card '{}' was moved from '{}' to '{}' in board '{}'",
                event.getCardTitle(),
                event.getFromListName(),
                event.getToListName(),
                event.getBoardName());
        log.info("Moved by: {}", event.getMovedByUsername());
        log.info("Timestamp: {}", event.getTimestamp());

        // In production, this would:
        // - Send email notifications to board members
        // - Send push notifications to mobile apps
        // - Update notification center in the UI
        simulateNotificationDelivery("card_moved", event.getCardTitle());
    }

    /**
     * Handle card created events for notifications.
     */
    @RabbitListener(queues = "${taskboard.rabbitmq.queue.notifications:taskboard.notifications}")
    public void handleCardCreatedEvent(CardCreatedEvent event) {
        log.info("=== NOTIFICATION: Card Created ===");
        log.info("New card '{}' created in list '{}' on board '{}'",
                event.getCardTitle(),
                event.getListName(),
                event.getBoardName());
        log.info("Priority: {}", event.getPriority());
        log.info("Created by: {}", event.getCreatedByUsername());
        log.info("Timestamp: {}", event.getTimestamp());

        simulateNotificationDelivery("card_created", event.getCardTitle());
    }

    /**
     * Handle board created events for notifications.
     */
    @RabbitListener(queues = "${taskboard.rabbitmq.queue.notifications:taskboard.notifications}")
    public void handleBoardCreatedEvent(BoardCreatedEvent event) {
        log.info("=== NOTIFICATION: Board Created ===");
        log.info("New board '{}' created", event.getBoardName());
        log.info("Description: {}", event.getDescription());
        log.info("Created by: {}", event.getCreatedByUsername());
        log.info("Timestamp: {}", event.getTimestamp());

        simulateNotificationDelivery("board_created", event.getBoardName());
    }

    /**
     * Simulate notification delivery (would be real implementation in production).
     */
    private void simulateNotificationDelivery(String type, String subject) {
        log.debug("Simulating {} notification delivery for: {}", type, subject);
        // Simulate async processing
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        log.debug("Notification delivered successfully for: {}", subject);
    }
}

