package com.taskboard.model.dto;

import com.taskboard.model.entity.Priority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Request object for creating a new card.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateCardRequest {

    @NotBlank(message = "Card title is required")
    @Size(min = 1, max = 255, message = "Card title must be between 1 and 255 characters")
    private String title;

    @Size(max = 5000, message = "Description cannot exceed 5000 characters")
    private String description;

    @NotNull(message = "List ID is required")
    private Long listId;

    private Integer position;

    @Builder.Default
    private Priority priority = Priority.MEDIUM;

    private LocalDateTime dueDate;

    private Long assignedToId;
}

