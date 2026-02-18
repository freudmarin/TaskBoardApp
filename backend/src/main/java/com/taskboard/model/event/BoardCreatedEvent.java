package com.taskboard.model.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * Event published when a new board is created.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BoardCreatedEvent implements Serializable {

    private Long boardId;
    private String boardName;
    private String description;
    private String color;
    private Long createdByUserId;
    private String createdByUsername;
    private LocalDateTime timestamp;
}

