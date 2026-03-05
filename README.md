# Microservices Blog - DevOps Project

This project demonstrates a **microservices architecture** deployed using **Docker and Kubernetes**.  
It simulates a simple blog platform where different services communicate through an **Ingress gateway**.

The goal of this project is to practice **DevOps workflows, containerization, and Kubernetes deployment**.

---

# Architecture


User (Browser)
↓
Frontend (Nginx)
↓
Kubernetes Ingress
↓
Auth Service | Post Service | Comment Service
↓
Kubernetes Pods
↓
Docker Containers


---

# Tech Stack

- Docker
- Kubernetes
- Minikube
- Nginx
- Node.js
- Git
- GitHub

---

# Project Structure


micro-services-blog
│
├── auth-service
│ ├── Dockerfile
│ └── server.js
│
├── post-service
│ ├── Dockerfile
│ └── server.js
│
├── comment-service
│ ├── Dockerfile
│ └── server.js
│
├── frontend
│ ├── Dockerfile
│ └── index.html
│
├── k8s
│ ├── deployments
│ ├── services
│ └── ingress.yaml
│
└── docker-compose.yml


---

# Services

### Auth Service
Handles authentication status.

Endpoint:

/auth


---

### Post Service
Returns blog posts.

Endpoint:

/posts


---

### Comment Service
Returns comments related to posts.

Endpoint:

/comments


---

# Running the Project Locally

## 1. Start Minikube

```bash
minikube start
2. Build Docker Images
docker build -t auth-service ./auth-service
docker build -t post-service ./post-service
docker build -t comment-service ./comment-service
docker build -t frontend ./frontend
3. Deploy to Kubernetes
kubectl apply -f k8s/deployments
kubectl apply -f k8s/services
kubectl apply -f k8s/ingress.yaml
4. Start Tunnel
minikube tunnel
5. Access the Application

Find Minikube IP:

minikube ip

Then open in browser:

http://<MINIKUBE-IP>

Routes available:

/auth
/posts
/comments
Example Response

Auth Service

{
 "service": "Auth Service",
 "message": "User authentication working"
}
