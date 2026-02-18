package com.taskboard.model.dto;

import com.taskboard.model.entity.ActivityType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Map;

/**
 * Data Transfer Object for ActivityLog entity.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ActivityLogDTO implements Serializable {

    private Long id;
    private Long boardId;
    private String boardName;
    private Long userId;
    private String username;
    private ActivityType activityType;
    private String description;
    private Map<String, Object> metadata;
    private LocalDateTime createdAt;
}

