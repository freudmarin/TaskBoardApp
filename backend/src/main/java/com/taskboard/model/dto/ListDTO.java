package com.taskboard.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Data Transfer Object for BoardList entity.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ListDTO implements Serializable {

    private Long id;
    private String name;
    private Long boardId;
    private Integer position;

    @Builder.Default
    private List<CardDTO> cards = new ArrayList<>();

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

