-- V2__add_indexes.sql
-- Performance indexes for TaskBoard

-- Cards indexes
CREATE INDEX IF NOT EXISTS idx_cards_list_position ON cards(list_id, position);
CREATE INDEX IF NOT EXISTS idx_cards_assigned_to ON cards(assigned_to_id);
CREATE INDEX IF NOT EXISTS idx_cards_due_date ON cards(due_date) WHERE due_date IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_cards_priority ON cards(priority);

-- Board Lists indexes
CREATE INDEX IF NOT EXISTS idx_board_lists_board_position ON board_lists(board_id, position);

-- Activity Logs indexes
CREATE INDEX IF NOT EXISTS idx_activity_logs_board_created ON activity_logs(board_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_type ON activity_logs(activity_type);

-- Boards indexes
CREATE INDEX IF NOT EXISTS idx_boards_owner ON boards(owner_id);
CREATE INDEX IF NOT EXISTS idx_boards_archived ON boards(archived);

-- Users indexes
CREATE INDEX IF NOT EXISTS idx_users_active ON users(active);

