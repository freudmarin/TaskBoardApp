package com.taskboard.repository;

import com.taskboard.model.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository for Role entity.
 * Provides database operations for roles.
 */
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    /**
     * Find role by name.
     *
     * @param name the role name
     * @return Optional containing the role if found
     */
    Optional<Role> findByName(Role.RoleName name);
}

