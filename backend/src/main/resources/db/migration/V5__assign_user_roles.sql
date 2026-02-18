-- V5__assign_user_roles.sql
-- Assign roles to existing users

-- Assign ROLE_ADMIN to admin user (user_id = 1)
INSERT INTO user_roles (user_id, role_id)
SELECT 1, id FROM roles WHERE name = 'ROLE_ADMIN';

-- Assign ROLE_USER to admin user as well
INSERT INTO user_roles (user_id, role_id)
SELECT 1, id FROM roles WHERE name = 'ROLE_USER';

-- Assign ROLE_USER to john.doe (user_id = 2)
INSERT INTO user_roles (user_id, role_id)
SELECT 2, id FROM roles WHERE name = 'ROLE_USER';

-- Assign ROLE_USER to jane.smith (user_id = 3)
INSERT INTO user_roles (user_id, role_id)
SELECT 3, id FROM roles WHERE name = 'ROLE_USER';

