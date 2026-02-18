# Frontend Components

This directory contains all React components organized by feature/domain.

## Structure

### `/auth`
Authentication-related components:
- **Login**: User login form with validation
- **Register**: User registration form with validation
- **AuthGuard**: Protected route wrapper that redirects unauthenticated users

### `/boards`
Board management components:
- **BoardList**: Displays all user boards in a grid
- **BoardCard**: Individual board card with quick actions
- **BoardView**: Detailed board view with lists and cards
- **CreateBoardModal**: Modal for creating new boards

### `/lists`
List management components:
- **ListView**: Displays a single list with its cards
- **CreateListForm**: Inline form for creating new lists

### `/cards`
Card management components:
- **CardItem**: Individual card display in list
- **CreateCardModal**: Modal for creating new cards
- **CardDetailsModal**: Modal for viewing/editing card details

### `/layout`
Layout and navigation components:
- **Navbar**: Top navigation bar with user info and logout
- **Layout**: Main layout wrapper with navbar

### `/common`
Reusable UI components:
- **Button**: Customizable button with variants and states
- **Input**: Form input with label and error handling
- **Modal**: Reusable modal dialog component

## Zustand Integration

All components are connected to Zustand stores:

### `authStore`
- Manages authentication state
- Handles login/logout
- Persists auth tokens

### `boardStore`
- Manages boards, lists, and cards
- Handles all CRUD operations
- Maintains current board state
- Provides optimistic updates

## Usage Example

```tsx
import { BoardList } from './components/boards';
import { useBoardStore } from './store';

function MyComponent() {
  const { boards, fetchBoards } = useBoardStore();
  
  useEffect(() => {
    fetchBoards();
  }, []);
  
  return <BoardList />;
}
```

## Features

- ✅ Full CRUD operations for boards, lists, and cards
- ✅ Authentication with JWT tokens
- ✅ Protected routes with AuthGuard
- ✅ Responsive design with Tailwind CSS
- ✅ Loading and error states
- ✅ Form validation
- ✅ Modal dialogs for create/edit operations
- ✅ Optimistic UI updates
- ✅ Priority and due date management
- ✅ User assignment to cards

