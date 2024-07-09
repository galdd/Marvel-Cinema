---

# Marvel Cinema

## Monorepo with Nx + Microservices Architecture, React, Node.js, Typescript, GraphQL
## Microservice - Client UI, Admin UI, API Gateway, Services Auth, Tickets, Orders 

### Table of Contents
- [Marvel Cinema](#marvel-cinema)
  - [Monorepo with Nx + Microservices Architecture](#monorepo-with-nx--microservices-architecture)
    - [Table of Contents](#table-of-contents)
    - [Links](#links)
    - [About the Project](#about-the-project)
    - [Project Description](#project-description)
      - [API Gateway](#api-gateway)
      - [Services](#services)
      - [Database Models](#database-models)
      - [Authentication and Authorization](#authentication-and-authorization)
    - [Installation and Setup](#installation-and-setup)
    - [Running the Project](#running-the-project)
    - [Key Features](#key-features)
    - [Technologies Used](#technologies-used)
    - [Future Implementation](#future-implementation)
    - [Project Status](#project-status)
    - [License](#license)

### Links
- [Repository](https://github.com/galdd/Marvel-Cinema)

### About the Project
Marvel Cinema is a comprehensive application designed using a monorepo structure facilitated by Nx. It employs a microservices architecture with an API Gateway and uses GraphQL and REST API for service communication. The project provides a robust platform for managing movie showtimes, bookings, and user information.

### Project Description
Marvel Cinema is designed for scalability and efficiency, ensuring a seamless user experience for managing movie-related data and bookings.

#### API Gateway
- **Centralized Routing and Management**: The API Gateway manages all requests, routing them to appropriate microservices and handling communication between services using GraphQL and REST API.

#### Services
- **Movies Service**: Handles CRUD operations for movie data.
- **Shows Service**: Manages showtimes and related operations.
- **Orders Service**: Processes booking orders, integrating ticket management.

#### Authentication and Authorization
- **JWT Tokens**: Secure access to endpoints using JSON Web Tokens (JWT), ensuring that only authenticated users can perform certain actions.

### Installation and Setup
To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/galdd/Marvel-Cinema.git