# TaskBoard Application

A full-stack Kanban-style task management application with real-time updates.

## Project Structure

```
TaskBoardApp/
├── backend/          # Spring Boot REST API
├── frontend/         # React + Vite SPA
└── README.md         # This file
```

## Technology Stack

### Backend
- **Spring Boot 3.x** - Java framework
- **PostgreSQL** - Database
- **Redis** - Caching
- **RabbitMQ** - Message queue
- **Spring Security + JWT** - Authentication
- **Flyway** - Database migrations
- **WebSocket** - Real-time updates

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Zustand** - State management
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Axios** - HTTP client
- **@dnd-kit** - Drag and drop

## Getting Started

### Prerequisites
- Java 17 or higher
- Node.js 18 or higher
- PostgreSQL 14 or higher
- Redis 7 or higher
- RabbitMQ 3.x
- Maven 3.8 or higher

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Start required services (PostgreSQL, Redis, RabbitMQ) using Docker:
   ```bash
   docker-compose up -d
   ```

3. Configure application properties in `src/main/resources/application.yml`

4. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```

The backend API will be available at `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:3000`

## Default Credentials

The application comes with sample data (see `backend/src/main/resources/db/migration/V3__add_sample_data.sql`):

- **Username:** admin
- **Password:** password
- **Email:** admin@taskboard.com

Other test users:
- john.doe / password
- jane.smith / password

## API Documentation

Once the backend is running, API documentation is available at:
- Swagger UI: `http://localhost:8080/swagger-ui.html`

## Features

- ✅ User authentication and authorization
- ✅ Multiple boards with customizable colors
- ✅ Lists (columns) within boards
- ✅ Drag-and-drop cards between lists
- ✅ Card priorities (Low, Medium, High, Critical)
- ✅ Due dates for cards
- ✅ Card assignments to users
- ✅ Real-time updates via WebSocket
- ✅ Activity logging
- ✅ Redis caching for performance
- ✅ Message queue integration

## Development

### Backend Development
- Tests: `./mvnw test`
- Build: `./mvnw clean package`
- Format: Follow standard Java conventions

### Frontend Development
- Type check: `npm run build` (includes TypeScript compilation)
- Lint: `npm run lint`
- Preview production build: `npm run preview`

## Project Architecture

### Backend Architecture
- **Controllers**: REST API endpoints
- **Services**: Business logic
- **Repositories**: Data access layer
- **Security**: JWT authentication & authorization
- **Messaging**: RabbitMQ producers/consumers
- **Caching**: Redis for performance optimization
- **WebSocket**: Real-time board updates

### Frontend Architecture
- **Pages**: Route-level components
- **Components**: Reusable UI components
- **Store**: Zustand state management
- **API**: Axios HTTP client with interceptors
- **Types**: TypeScript type definitions

## License

This project is for educational purposes.

