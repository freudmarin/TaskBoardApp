package com.taskboard.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Request object for creating a new list within a board.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateListRequest {

    @NotBlank(message = "List name is required")
    @Size(min = 1, max = 100, message = "List name must be between 1 and 100 characters")
    private String name;

    @NotNull(message = "Board ID is required")
    private Long boardId;

    private Integer position;
}

