package com.taskboard.service;

import com.taskboard.model.dto.ActivityLogDTO;
import com.taskboard.model.entity.ActivityLog;
import com.taskboard.model.entity.ActivityType;
import com.taskboard.model.entity.Board;
import com.taskboard.model.entity.User;
import com.taskboard.repository.ActivityLogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Service for activity logging operations.
 * Tracks all significant actions performed on boards and cards.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ActivityLogService {

    private final ActivityLogRepository activityLogRepository;

    /**
     * Log an activity.
     */
    @Transactional
    public void logActivity(Board board, User user, ActivityType type, String description, Map<String, Object> metadata) {
        log.debug("Logging activity: {} - {}", type, description);

        ActivityLog activityLog = ActivityLog.builder()
                .board(board)
                .user(user)
                .activityType(type)
                .description(description)
                .metadata(metadata)
                .build();

        activityLogRepository.save(activityLog);
        log.debug("Activity logged with id: {}", activityLog.getId());
    }

    /**
     * Get recent activity for a board.
     */
    @Transactional(readOnly = true)
    public List<ActivityLogDTO> getRecentActivity(Long boardId, int limit) {
        log.debug("Fetching recent activity for board: {} (limit: {})", boardId, limit);

        Pageable pageable = PageRequest.of(0, limit);
        return activityLogRepository.findRecentByBoardId(boardId, pageable).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get paginated activity for a board.
     */
    @Transactional(readOnly = true)
    public List<ActivityLogDTO> getActivityByBoardId(Long boardId, int page, int size) {
        log.debug("Fetching activity for board: {} (page: {}, size: {})", boardId, page, size);

        Pageable pageable = PageRequest.of(page, size);
        return activityLogRepository.findByBoardIdOrderByCreatedAtDesc(boardId, pageable)
                .getContent().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get activity count for a board.
     */
    @Transactional(readOnly = true)
    public long getActivityCount(Long boardId) {
        return activityLogRepository.countByBoardId(boardId);
    }

    /**
     * Convert ActivityLog entity to DTO.
     */
    private ActivityLogDTO convertToDTO(ActivityLog log) {
        return ActivityLogDTO.builder()
                .id(log.getId())
                .boardId(log.getBoard().getId())
                .boardName(log.getBoard().getName())
                .userId(log.getUser() != null ? log.getUser().getId() : null)
                .username(log.getUser() != null ? log.getUser().getUsername() : null)
                .activityType(log.getActivityType())
                .description(log.getDescription())
                .metadata(log.getMetadata())
                .createdAt(log.getCreatedAt())
                .build();
    }
}

