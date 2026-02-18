package com.taskboard.repository;

import com.taskboard.model.entity.ActivityLog;
import com.taskboard.model.entity.ActivityType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Repository for ActivityLog entity operations.
 */
@Repository
public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {

    /**
     * Find activity logs for a board ordered by creation time.
     */
    Page<ActivityLog> findByBoardIdOrderByCreatedAtDesc(Long boardId, Pageable pageable);

    /**
     * Find activity logs by user.
     */
    List<ActivityLog> findByUserIdOrderByCreatedAtDesc(Long userId);

    /**
     * Find activity logs by type.
     */
    List<ActivityLog> findByActivityTypeOrderByCreatedAtDesc(ActivityType activityType);

    /**
     * Find recent activity logs for a board.
     */
    @Query("SELECT a FROM ActivityLog a " +
           "LEFT JOIN FETCH a.user " +
           "WHERE a.board.id = :boardId " +
           "ORDER BY a.createdAt DESC")
    List<ActivityLog> findRecentByBoardId(@Param("boardId") Long boardId, Pageable pageable);

    /**
     * Find activity logs within a time range.
     */
    @Query("SELECT a FROM ActivityLog a WHERE a.board.id = :boardId " +
           "AND a.createdAt BETWEEN :start AND :end ORDER BY a.createdAt DESC")
    List<ActivityLog> findByBoardIdAndTimeRange(
            @Param("boardId") Long boardId,
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end);

    /**
     * Count activity logs for a board.
     */
    long countByBoardId(Long boardId);
}

