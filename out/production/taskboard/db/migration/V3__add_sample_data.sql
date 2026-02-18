-- V3__add_sample_data.sql
-- Sample data for TaskBoard application

-- Insert default user
INSERT INTO users (username, email, password, full_name, active)
VALUES
    ('admin', 'admin@taskboard.com', '$2a$10$N9qo8uLOickgx2ZMRZoMy.IpKu2LDgKmGxX8Pv4z1z6qPDfDhvz4K', 'Admin User', true),
    ('john.doe', 'john@taskboard.com', '$2a$10$N9qo8uLOickgx2ZMRZoMy.IpKu2LDgKmGxX8Pv4z1z6qPDfDhvz4K', 'John Doe', true),
    ('jane.smith', 'jane@taskboard.com', '$2a$10$N9qo8uLOickgx2ZMRZoMy.IpKu2LDgKmGxX8Pv4z1z6qPDfDhvz4K', 'Jane Smith', true);

-- Insert sample boards
INSERT INTO boards (name, description, color, owner_id, archived)
VALUES
    ('Project Alpha', 'Main development board for Project Alpha', '#3498db', 1, false),
    ('Marketing Campaign', 'Q1 Marketing initiatives and tasks', '#e74c3c', 2, false);

-- Insert lists for Board 1 (Project Alpha)
INSERT INTO board_lists (name, board_id, position)
VALUES
    ('Backlog', 1, 0),
    ('Todo', 1, 1),
    ('In Progress', 1, 2),
    ('Review', 1, 3),
    ('Done', 1, 4);

-- Insert lists for Board 2 (Marketing Campaign)
INSERT INTO board_lists (name, board_id, position)
VALUES
    ('Ideas', 2, 0),
    ('Planning', 2, 1),
    ('In Progress', 2, 2),
    ('Done', 2, 3);

-- Insert sample cards for Board 1
INSERT INTO cards (title, description, list_id, position, assigned_to_id, priority, due_date)
VALUES
    -- Backlog cards
    ('Research new technologies', 'Evaluate latest frameworks and tools for potential adoption', 1, 0, NULL, 'LOW', NULL),
    ('Technical debt cleanup', 'Address accumulated technical debt in core modules', 1, 1, NULL, 'MEDIUM', NULL),

    -- Todo cards
    ('Implement user authentication', 'Add JWT-based authentication system with refresh tokens', 2, 0, 2, 'HIGH', CURRENT_TIMESTAMP + INTERVAL '7 days'),
    ('Setup CI/CD pipeline', 'Configure GitHub Actions for automated testing and deployment', 2, 1, 3, 'HIGH', CURRENT_TIMESTAMP + INTERVAL '5 days'),
    ('Write API documentation', 'Create comprehensive API docs using Swagger/OpenAPI', 2, 2, 2, 'MEDIUM', CURRENT_TIMESTAMP + INTERVAL '10 days'),

    -- In Progress cards
    ('Database schema design', 'Design and implement the core database schema', 3, 0, 2, 'CRITICAL', CURRENT_TIMESTAMP + INTERVAL '2 days'),
    ('REST API development', 'Implement core REST endpoints for task management', 3, 1, 3, 'HIGH', CURRENT_TIMESTAMP + INTERVAL '3 days'),

    -- Review cards
    ('Code review for auth module', 'Review and approve authentication implementation', 4, 0, 1, 'HIGH', CURRENT_TIMESTAMP + INTERVAL '1 day'),

    -- Done cards
    ('Project setup', 'Initialize Spring Boot project with required dependencies', 5, 0, 2, 'HIGH', CURRENT_TIMESTAMP - INTERVAL '3 days'),
    ('Environment configuration', 'Setup development, staging, and production environments', 5, 1, 3, 'MEDIUM', CURRENT_TIMESTAMP - INTERVAL '2 days');

-- Insert sample cards for Board 2
INSERT INTO cards (title, description, list_id, position, assigned_to_id, priority, due_date)
VALUES
    -- Ideas cards
    ('Social media campaign', 'Launch targeted social media advertising campaign', 6, 0, NULL, 'MEDIUM', NULL),
    ('Influencer partnership', 'Reach out to tech influencers for product reviews', 6, 1, NULL, 'LOW', NULL),

    -- Planning cards
    ('Email newsletter design', 'Design new email template for product announcements', 7, 0, 3, 'MEDIUM', CURRENT_TIMESTAMP + INTERVAL '14 days'),
    ('Blog content calendar', 'Plan blog posts for the next quarter', 7, 1, 2, 'LOW', CURRENT_TIMESTAMP + INTERVAL '21 days'),

    -- In Progress cards
    ('Landing page redesign', 'Update landing page with new branding', 8, 0, 3, 'HIGH', CURRENT_TIMESTAMP + INTERVAL '5 days'),

    -- Done cards
    ('Brand guidelines update', 'Refresh brand guidelines document', 9, 0, 2, 'MEDIUM', CURRENT_TIMESTAMP - INTERVAL '5 days');

-- Insert sample activity logs
INSERT INTO activity_logs (board_id, user_id, activity_type, description, metadata)
VALUES
    (1, 1, 'BOARD_CREATED', 'Board "Project Alpha" was created', '{"board_name": "Project Alpha"}'),
    (1, 2, 'CARD_CREATED', 'Card "Database schema design" was created', '{"card_title": "Database schema design", "list_name": "In Progress"}'),
    (1, 2, 'CARD_MOVED', 'Card "Project setup" was moved from "In Progress" to "Done"', '{"card_title": "Project setup", "from_list": "In Progress", "to_list": "Done"}'),
    (2, 1, 'BOARD_CREATED', 'Board "Marketing Campaign" was created', '{"board_name": "Marketing Campaign"}'),
    (2, 3, 'CARD_CREATED', 'Card "Landing page redesign" was created', '{"card_title": "Landing page redesign", "list_name": "In Progress"}');

