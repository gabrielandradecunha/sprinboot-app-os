# Gerenciamento de Ordens de Serviço com Spring
<img src="imgs/Captura%20de%20tela%20de%202026-01-07%2002-00-28.png">
App web para gerenciamento de Ordens de Serviço, desenvolvido com Spring Boot no backend e React com TypeScript no frontend. A aplicação utiliza uma API REST documentada com Swagger, autenticação e autorização com Spring Security e JWT, persistência de dados com Hibernate (JPA) e PostgreSQL. A infraestrutura é automatizada com Docker, e permite o cadastro e gerenciamento de usuários, clientes, empresas e ordens de serviço de forma segura e organizada.

## Stack

### Backend
- Java 21
- Spring Boot
- Spring Web (API REST)
- Spring Security + JWT
- Spring Boot Test (JUnit 5)
- Spring Data JPA (Hibernate)
- PostgreSQL
- Swagger / OpenAPI
- Maven

### Frontend
- React
- TypeScript
- Vite
- Axios

### Infraestrutura
- Docker
- Docker Compose

## Easy Setup
Suba o banco de dados com docker-compose
Execute o .jar
```bash
sudo docker-compose up -d
```
Execute a api em .jar
```bash
java -jar api_os_app.jar --server.port=8081
```
Rode o frontend
```bash
cd os_app/
npm install
npm run dev
```

