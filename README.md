# Hierarchical Data Visualization Demo

This project is a demo application for visualizing hierarchical data stored in a graph database. It uses Neo4j as the database, Node.js with the Express framework for the backend, Vue.js for the frontend, and D3.js for visualizing the tree structure.

## Technologies Used:
- **Database:** Neo4j
- **Backend:** Node.js + Express
- **Frontend:** Vue.js
- **Visualization:** D3.js
- **Metrics:** Prometheus

## Setup Instructions

### Development Environment
To set up and run the entire application in a development environment, you can use Docker. The following steps will launch the app using Docker Compose.

1. Clone the repository:
   ```bash
   git clone https://github.com/erdogdubeyazit/data_visualisation.git
   cd data_visualisation
   ```
2. Start the services with Docker Compose:
    ```bash
   docker-compose build --no-cache
   docker-compose up
   ```
3. The application will be available on http://localhost:8080 for the frontend and http://localhost:3000 for the backend API.

## Test Data
To create test data, use the test-data.cypher file. This file is also used by the Docker Compose setup to initialize the database with sample data.

## Backend Setup

1. Install dependencies:
    ```bash
   npm install
   ```
2. To run tests, use the following command:
    ```bash
   npm run test
   ```
3. Start the backend:
    ```bash
   npm start
   ```
4. You can access the `SWAGGER` API documentation at `/api-docs`

5. Environment variables are managed through .env files.

## Frontend Setup

1. Install dependencies:
    ```bash
   npm install
   ```
2. Lint project:
    ```bash
   npm run lint
   ```

3. To run unit tests:
    ```bash
   npm run test:unit
   ```
4. To run end-to-end tests:
    ```bash
   npm run test:e2e
   ```
5. To run end-to-end tests interactively:
    ```bash
   npm run test:e2e:run
   ```
6. To run all end-to-end tests:
    ```bash
   npm run test:e2e:all
   ```
7. To build the frontend:
    ```bash
   npm run build
   ```
8. For frontend development, start the development server:
    ```bash
    npm run serve
    ```
9. Environment variables are managed through .env files.

## Metrics (Prometheus)
The backend integrates with Prometheus to monitor the application's performance. The application collects various metrics related to incoming HTTP requests and exposes them for Prometheus.

### Exposed Metrics
The following metrics are collected and exposed by the application:

1. http_server_requests_seconds_count:
   - Description: Tracks the total number of HTTP requests.
   - Type: Counter
   - Labels: method, route, status


2. http_server_requests_seconds:
   - Description: Measures the duration of HTTP requests and exposes them in histogram format.
   - Type: Histogram
   - Labels: method, route, status
   - Buckets: [0.001, 0.01, 0.1, 0.3, 1.5, 5, 10]

### Accessing Metrics
The Prometheus metrics can be accessed at the following endpoint:

- URL: `/metrics`
- Method: `GET`

Metrics will be returned in Prometheus format when this endpoint is accessed.


## Project Structure
* `/backend`: Contains the backend application (Node.js + Express).
* `/frontend`: Contains the frontend application (Vue.js).
* `/docker-compose.yml`: Docker Compose configuration to spin up the entire app.
* `/test-data.cypher`: Cypher queries to generate test data for Neo4j.
* `/backend/.env`: Environment variables for the backend.
* `/frontend/.env`: Environment variables for the frontend.