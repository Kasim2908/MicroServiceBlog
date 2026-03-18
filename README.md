# MicroServicesBlog

This project demonstrates a microservices architecture deployed with Docker and Kubernetes.
It simulates a simple blog platform where services communicate through Kubernetes Ingress.

The main goal is to practice DevOps workflows, containerization, and Kubernetes deployment.

## Architecture

Request flow:

User Browser -> Frontend (Nginx) -> Kubernetes Ingress -> Auth Service / Post Service / Comment Service -> Kubernetes Pods -> Docker Containers

## Tech Stack

- Docker
- Kubernetes
- Minikube
- Nginx
- Node.js
- Express.js
- Git
- GitHub

## Project Structure

```text
micro-services-blog/
├── auth-service/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
├── post-service/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
├── comment-service/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── Dockerfile
│   └── index.html
├── k8s/
│   ├── deployments/
│   ├── services/
│   └── ingress.yaml
└── docker-compose.yml
```

## Services

### Auth Service
- Purpose: Authentication status and auth-related APIs
- Base path: /auth

### Post Service
- Purpose: Blog post APIs
- Base path: /posts

### Comment Service
- Purpose: Comment APIs
- Base path: /comments

## Running the Project Locally (Kubernetes + Minikube)

### 1. Start Minikube

```bash
minikube start
```

### 2. Build images inside Minikube Docker environment

Use one of the following based on your terminal.

For PowerShell:

```powershell
minikube -p minikube docker-env --shell powershell | Invoke-Expression
```

For CMD:

```cmd
@FOR /f "tokens=*" %i IN ('minikube -p minikube docker-env --shell cmd') DO @%i
```

Then build images:

```bash
docker build -t auth-service ./auth-service
docker build -t post-service ./post-service
docker build -t comment-service ./comment-service
docker build -t frontend ./frontend
```

### 3. Deploy to Kubernetes

```bash
kubectl apply -f k8s/deployments/
kubectl apply -f k8s/services/
kubectl apply -f k8s/ingress.yaml
```

### 4. Start Minikube tunnel

Run in a separate terminal and keep it open:

```bash
minikube tunnel
```

### 5. Access the application

Get Minikube IP:

```bash
minikube ip
```

Access endpoints:

- Frontend: http://<MINIKUBE-IP>/
- Auth: http://<MINIKUBE-IP>/auth
- Posts: http://<MINIKUBE-IP>/posts
- Comments: http://<MINIKUBE-IP>/comments

If Ingress is not available, use NodePort services:

- Frontend: http://<MINIKUBE-IP>:30000
- Auth: http://<MINIKUBE-IP>:30001/auth
- Posts: http://<MINIKUBE-IP>:30002/posts
- Comments: http://<MINIKUBE-IP>:30003/comments

## Health Checks

- Auth health: /auth
- Post health: /posts/health
- Comment health: /comments/health

Example response from Auth service:

```json
{
	"service": "Auth Service",
	"message": "User authentication working",
	"status": "online"
}
```

## Running with Docker Compose Only (No Kubernetes)

Use this mode for quick local development without Minikube.

### 1. Start all services

```bash
docker compose up --build -d
```

### 2. Verify containers

```bash
docker compose ps
```

### 3. Access endpoints

- Frontend: http://localhost:3000
- Auth: http://localhost:3001/auth
- Posts: http://localhost:3002/posts
- Comments: http://localhost:3003/comments

### 4. Health checks

- Auth: http://localhost:3001/auth
- Posts: http://localhost:3002/posts/health
- Comments: http://localhost:3003/comments/health

### 5. Stop Docker Compose stack

```bash
docker compose down
```

## Stop and Cleanup

Delete Kubernetes resources:

```bash
kubectl delete -f k8s/ingress.yaml
kubectl delete -f k8s/services/
kubectl delete -f k8s/deployments/
```

Stop Minikube:

```bash
minikube stop
```
