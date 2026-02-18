# TaskBoard Application

A full-stack Kanban-style task management application with real-time updates, analytics, and event-driven architecture.

## Project Structure

```
TaskBoardApp/
├── backend/          # Spring Boot REST API
├── frontend/         # React + Vite SPA
└── README.md         # This file
```

## Technology Stack

### Backend
- **Spring Boot 4.0.0** - Java framework
- **Java 21** - Programming language
- **PostgreSQL 15** - Relational database
- **Redis 7** - Caching layer (Spring Cache abstraction)
- **RabbitMQ 3** - Message broker for event-driven architecture
- **Spring Security + JWT** - Authentication & authorization (Role-based access control)
- **Flyway** - Database migrations and versioning
- **WebSocket (STOMP)** - Real-time bidirectional communication
- **Spring Data JPA + Hibernate** - ORM and database access
- **Lombok** - Code generation and boilerplate reduction
- **MapStruct** - DTO mapping
- **Jackson** - JSON serialization/deserialization
- **Maven** - Build and dependency management

### Frontend
- **React 19** - UI library
- **TypeScript 5.7** - Type safety
- **Vite 6** - Build tool and dev server
- **Zustand 5** - Lightweight state management
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **React Router 7** - Client-side routing
- **Axios** - HTTP client with interceptors
- **@dnd-kit** - Drag and drop functionality
- **STOMP.js + SockJS** - WebSocket client for real-time updates

## Getting Started

### Prerequisites
- **Java 21** or higher
- **Node.js 18** or higher
- **PostgreSQL 15** or higher
- **Redis 7** or higher
- **RabbitMQ 3.x** (with management plugin)
- **Maven 3.8** or higher (or use included Maven wrapper)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Start required services (PostgreSQL, Redis, RabbitMQ) using Docker:
   ```bash
   docker-compose up -d
   ```
   
   This will start:
   - PostgreSQL on port 5432
   - Redis on port 6379
   - RabbitMQ on port 5672 (Management UI on 15672)

3. Configure application properties in `src/main/resources/application.yml` if needed
   - Default database: `taskboard` 
   - Default user: `taskboard`
   - JWT secret and expiration settings

4. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```
   Or on Windows:
   ```bash
   mvnw.cmd spring-boot:run
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

The frontend will be available at `http://localhost:5173` (Vite's default port)


## Features

### Authentication & Authorization
- ✅ User registration and login with JWT tokens
- ✅ Role-based access control (USER, ADMIN)
- ✅ Secure endpoints with Spring Security
- ✅ Token refresh mechanism

### Board Management
- ✅ Create, read, update, and delete boards
- ✅ Customizable board colors
- ✅ Board ownership and permissions
- ✅ Archive/unarchive boards
- ✅ Activity logging for boards

### Lists & Cards
- ✅ Create lists (columns) within boards
- ✅ Position-based list ordering
- ✅ Create, update, and delete cards
- ✅ Drag-and-drop cards between lists with @dnd-kit
- ✅ Card priorities (Low, Medium, High, Critical)
- ✅ Due dates for cards
- ✅ Card assignments to users
- ✅ Position-based card ordering within lists

### Real-time Features
- ✅ WebSocket integration with STOMP protocol
- ✅ Real-time board updates across clients
- ✅ Live card movements and changes
- ✅ Instant notifications for board activities

### Analytics & Reporting
- ✅ Analytics dashboard with metrics
- ✅ Card metrics (total, completed, overdue)
- ✅ Board statistics
- ✅ Overview analytics
- ✅ Auto-refreshing analytics (configurable)

### Performance & Scalability
- ✅ Redis caching for boards, cards, and lists
- ✅ Configurable cache TTL per entity type
- ✅ RabbitMQ message queue for event-driven architecture
- ✅ Event-based notifications and analytics processing
- ✅ Optimized database queries with indexing
- ✅ Database connection pooling with HikariCP

### Developer Experience
- ✅ Database migrations with Flyway
- ✅ Automatic schema versioning
- ✅ DTO mapping with MapStruct
- ✅ Hot reload with Spring DevTools and Vite HMR
- ✅ Type-safe frontend with TypeScript
- ✅ Responsive UI with Tailwind CSS

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
- **Controllers**: REST API endpoints for boards, cards, lists, users, analytics, and authentication
- **Services**: Business logic layer with caching annotations
- **Repositories**: Spring Data JPA repositories for data access
- **Security**: JWT-based authentication with role-based authorization
- **Messaging**: RabbitMQ producers/consumers for card and board events
- **Caching**: Redis for application-level caching (NOT Hibernate second-level cache)
  - Boards cache: 30 minutes TTL
  - Cards cache: 15 minutes TTL
  - Lists cache: 20 minutes TTL
- **WebSocket**: STOMP over WebSocket for real-time board updates
- **Configuration**: Externalized configuration with profiles (dev, test, prod)

### Frontend Architecture
- **Components**: Organized by feature (auth, boards, cards, lists, analytics, layout)
- **Store**: Zustand stores for authentication and board state
- **API Layer**: Axios-based API client with JWT interceptors
- **Real-time**: STOMP.js client for WebSocket connections
- **Routing**: React Router for protected and public routes
- **Types**: Centralized TypeScript type definitions
- **Styling**: Utility-first CSS with Tailwind CSS

## License

This project is for educational purposes.

