# Content Management System

A simple internal content management system built with Spring Boot and PostgreSQL.

## Features

* Add new content
* View all existing content
* View a single content item
* Edit existing content
* Delete content
* RESTful API
* PostgreSQL database integration
* Simple admin interface

## Technologies

* Java
* Spring Boot
* Spring Web
* Spring Data JPA
* PostgreSQL
* HTML
* CSS
* JavaScript
* Maven

## Project Structure

```text
src/main/java/com/voltix/contentmanagement
├── controller
│   └── ContentController.java
├── entity
│   └── Content.java
├── repository
│   └── ContentRepository.java
├── service
│   └── ContentService.java
└── ContentManagementApplication.java

src/main/resources
├── static
│   ├── index.html
│   ├── style.css
│   └── script.js
└── application.properties
```

## API Endpoints

| Method | Endpoint            | Description        |
| ------ | ------------------- | ------------------ |
| GET    | `/api/content`      | Get all content    |
| GET    | `/api/content/{id}` | Get content by ID  |
| POST   | `/api/content`      | Create new content |
| PUT    | `/api/content/{id}` | Update content     |
| DELETE | `/api/content/{id}` | Delete content     |

## Example Request

### Create Content

```http
POST /api/content
Content-Type: application/json
```

```json
{
  "title": "Welcome to Voltix",
  "description": "This is our first content item."
}
```

## Database

The application uses PostgreSQL with Spring Data JPA.

Create a database named:

```text
content_management
```

Database credentials should be provided through environment variables.

Example:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/content_management
spring.datasource.username=postgres
spring.datasource.password=${DB_PASSWORD}
```

## Running the Application

1. Create the PostgreSQL database:

```text
content_management
```

2. Set the `DB_PASSWORD` environment variable.

3. Run the application using IntelliJ IDEA or Maven.

4. Open:

```text
http://localhost:8080
```

The content management interface will be available from the browser.

## CRUD Flow

```text
Frontend
   ↓
REST API
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
PostgreSQL
```

## Author

Ibrahim Alaa
