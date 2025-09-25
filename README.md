# Capstone Project - Node.js App

This is a simple Node.js application built with Express.  
It is containerized with Docker and can be deployed using Jenkins pipelines and Kubernetes.

---

## Features
- Node.js + Express web server
- Dockerized for container deployment
- Ready for CI/CD with Jenkins
- Kubernetes manifests for deployment
- SonarQube integration for code quality checks

---

## Project Structure
├── app.json # App metadata

├── package.json # Node.js dependencies & scripts

├── index.js (or app.js) # Main application entry point

├── public/ # Static files (HTML, CSS, JS)

├── Dockerfile # Docker build instructions

├── sonar-project.properties # SonarQube configuration

└── k8s/ # Kubernetes manifests

└── deployment.yaml

---

## ⚙️ How to Run Locally
```bash
# Install dependencies
npm install

# Start the app
npm start

# App runs at
http://localhost:5000

# Run with Docker
docker build -t nodejs-app .
docker run -p 5000:5000 nodejs-app

# Deploy to Kubernetes
kubectl apply -f k8s/deployment.yaml
kubectl get pods
kubectl get svc

# Code Quality with SonarQube
sonar-scanner
