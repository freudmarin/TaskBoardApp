package com.taskboard.model.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * Event published when a card is moved between lists or positions.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CardMovedEvent implements Serializable {

    private Long cardId;
    private String cardTitle;
    private Long boardId;
    private String boardName;
    private Long fromListId;
    private String fromListName;
    private Integer fromPosition;
    private Long toListId;
    private String toListName;
    private Integer toPosition;
    private Long movedByUserId;
    private String movedByUsername;
    private LocalDateTime timestamp;
}

