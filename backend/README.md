# TaskBoard - Real-time Task Management Application

A fully functional, enterprise-grade task board application (similar to Trello/Jira) built with Spring Boot 3.4.x and Java 21. Features real-time updates via WebSocket, Redis caching, RabbitMQ event-driven architecture, and PostgreSQL database.

## 🚀 Features

- **RESTful APIs** - Complete CRUD operations for boards, lists, and cards
- **Real-time Updates** - WebSocket with STOMP protocol for live collaboration
- **Event-Driven Architecture** - RabbitMQ for async event processing
- **Caching** - Redis caching for improved performance
- **Database** - PostgreSQL with proper indexing and Flyway migrations
- **Clean Architecture** - Layered architecture with separation of concerns

## 🛠 Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Java | 25      | Programming Language |
| Spring Boot | 4.0.0   | Framework |
| PostgreSQL | 15      | Primary Database |
| Redis | 7       | Caching |
| RabbitMQ | 3       | Message Broker |
| Flyway | -       | Database Migrations |
| Lombok | -       | Boilerplate Reduction |
| Docker | -       | Containerization |

## 📋 Prerequisites

- **Java 21** or higher
- **Docker** and Docker Compose
- **Maven 3.8+**

## 🏃 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd TaskBoard
```

### 2. Start Infrastructure Services

```bash
docker-compose up -d
```

This starts:
- PostgreSQL on port `5432`
- Redis on port `6379`
- RabbitMQ on ports `5672` (AMQP) and `15672` (Management UI)

### 3. Verify Services

```bash
docker ps
```

### 4. Run the Application

Using Maven:
```bash
mvn spring-boot:run
```

Or from IntelliJ IDEA:
- Open the project
- Run `TaskBoardApplication.java`

### 5. Access the Application

- **API Base URL**: http://localhost:8080/api/v1
- **RabbitMQ Management**: http://localhost:15672 (user: `taskboard`, pass: `taskboard123`)

## 📚 API Documentation

### Boards

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/boards` | Get all boards |
| GET | `/api/v1/boards/{id}` | Get board with lists and cards |
| POST | `/api/v1/boards` | Create a new board |
| PUT | `/api/v1/boards/{id}` | Update a board |
| DELETE | `/api/v1/boards/{id}` | Archive a board |
| GET | `/api/v1/boards/{id}/activity` | Get board activity log |

### Lists

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/lists/board/{boardId}` | Get all lists for a board |
| GET | `/api/v1/lists/{id}` | Get a list with cards |
| POST | `/api/v1/lists` | Create a new list |
| PUT | `/api/v1/lists/{id}` | Update a list |
| DELETE | `/api/v1/lists/{id}` | Delete a list |

### Cards

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/cards/list/{listId}` | Get all cards in a list |
| GET | `/api/v1/cards/{id}` | Get a card |
| POST | `/api/v1/cards` | Create a new card |
| PUT | `/api/v1/cards/{id}` | Update a card |
| POST | `/api/v1/cards/{id}/move` | Move a card |
| DELETE | `/api/v1/cards/{id}` | Delete a card |

## 🧪 Testing with cURL

### Create a Board

```bash
curl -X POST http://localhost:8080/api/v1/boards \
  -H "Content-Type: application/json" \
  -d '{"name":"My Project","description":"Project tasks","color":"#3498db"}'
```

### Get All Boards

```bash
curl http://localhost:8080/api/v1/boards
```

### Create a List

```bash
curl -X POST http://localhost:8080/api/v1/lists \
  -H "Content-Type: application/json" \
  -d '{"name":"To Do","boardId":1,"position":0}'
```

### Create a Card

```bash
curl -X POST http://localhost:8080/api/v1/cards \
  -H "Content-Type: application/json" \
  -d '{"title":"Implement feature X","description":"Details here","listId":1,"priority":"HIGH"}'
```

### Move a Card

```bash
curl -X POST http://localhost:8080/api/v1/cards/1/move \
  -H "Content-Type: application/json" \
  -d '{"newListId":2,"newPosition":0}'
```

## 🔌 WebSocket Connection

Connect to the WebSocket endpoint for real-time updates:

### JavaScript Example

```javascript
const socket = new SockJS('http://localhost:8080/ws');
const stompClient = Stomp.over(socket);

stompClient.connect({}, function(frame) {
    console.log('Connected: ' + frame);
    
    // Subscribe to board updates
    stompClient.subscribe('/topic/board/1', function(message) {
        const update = JSON.parse(message.body);
        console.log('Board update:', update);
    });
});

// Send a message
stompClient.send('/app/board/1/card-move', {}, JSON.stringify({
    newListId: 2,
    newPosition: 0
}));
```

### HTML Test Page

```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://cdn.jsdelivr.net/npm/sockjs-client@1/dist/sockjs.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/stompjs@2.3.3/lib/stomp.min.js"></script>
</head>
<body>
    <div id="messages"></div>
    <script>
        const socket = new SockJS('http://localhost:8080/ws');
        const stompClient = Stomp.over(socket);
        
        stompClient.connect({}, function(frame) {
            document.getElementById('messages').innerHTML += '<p>Connected!</p>';
            
            stompClient.subscribe('/topic/board/1', function(message) {
                const data = JSON.parse(message.body);
                document.getElementById('messages').innerHTML += 
                    '<p>Update: ' + JSON.stringify(data) + '</p>';
            });
        });
    </script>
</body>
</html>
```

## 📊 Project Structure

```
TaskBoard/
├── pom.xml
├── docker-compose.yml
├── README.md
└── src/
    ├── main/
    │   ├── java/com/taskboard/
    │   │   ├── TaskBoardApplication.java
    │   │   ├── config/
    │   │   │   ├── WebSocketConfig.java
    │   │   │   ├── RedisConfig.java
    │   │   │   ├── RabbitMQConfig.java
    │   │   │   └── SecurityConfig.java
    │   │   ├── controller/
    │   │   │   ├── BoardController.java
    │   │   │   ├── CardController.java
    │   │   │   ├── ListController.java
    │   │   │   └── WebSocketController.java
    │   │   ├── service/
    │   │   │   ├── BoardService.java
    │   │   │   ├── CardService.java
    │   │   │   ├── ListService.java
    │   │   │   └── ActivityLogService.java
    │   │   ├── repository/
    │   │   ├── model/
    │   │   │   ├── entity/
    │   │   │   ├── dto/
    │   │   │   └── event/
    │   │   ├── messaging/
    │   │   │   ├── producer/
    │   │   │   └── consumer/
    │   │   └── exception/
    │   └── resources/
    │       ├── application.yml
    │       └── db/migration/
    └── test/
```

## ⚙️ Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `SERVER_PORT` | 8080 | Application port |
| `SPRING_DATASOURCE_URL` | jdbc:postgresql://localhost:5432/taskboard | Database URL |
| `SPRING_REDIS_HOST` | localhost | Redis host |
| `SPRING_RABBITMQ_HOST` | localhost | RabbitMQ host |

### Custom Properties

```yaml
taskboard:
  cache:
    default-ttl: 60      # Default cache TTL in minutes
    boards-ttl: 30       # Board cache TTL in minutes
  websocket:
    allowed-origins: "*" # WebSocket CORS origins
```

## 🔒 Security

Currently configured for local development with all endpoints open. For production:

1. Enable CSRF protection
2. Configure proper CORS origins
3. Add JWT authentication
4. Set up HTTPS

## 🧪 Running Tests

```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=BoardServiceTest

# Run with coverage
mvn test jacoco:report
```

## 🐳 Docker Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Rebuild containers
docker-compose up -d --build
```

## 📈 Monitoring

### Check RabbitMQ Queues

1. Open http://localhost:15672
2. Login with `taskboard` / `taskboard123`
3. Navigate to Queues tab

### Verify Redis Cache

```bash
docker exec -it taskboard-redis redis-cli
> KEYS *
> GET boards::all
```

### Check PostgreSQL

```bash
docker exec -it taskboard-postgres psql -U taskboard -d taskboard
\dt  -- List tables
SELECT * FROM boards;
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Spring Boot Team
- Docker Community
- Open Source Contributors



