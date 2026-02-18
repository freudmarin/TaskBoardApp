package com.taskboard.model.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for moving a card to a different list or position.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CardMoveDTO {

    @NotNull(message = "New list ID is required")
    private Long newListId;

    @NotNull(message = "New position is required")
    private Integer newPosition;
}

