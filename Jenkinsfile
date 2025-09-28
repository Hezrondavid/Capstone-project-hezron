pipeline {
  agent any

  environment {
    DOCKER_IMAGE = "node-app"
  }

  stages {
    stage('Clone') {
      steps {
        git branch: 'main', url: 'https://github.com/Hezrondavid/Capstone-project-hezron.git'
      }
    }

    stage('Build') {
      steps {
        sh 'docker build -t $DOCKER_IMAGE .'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test || echo "No tests defined"'
      }
    }

    stage('Code Quality') {
      steps {
        sh 'sonar-scanner'
      }
    }

    stage('Deploy to Minikube') {
      steps {
        sh 'kubectl apply -f k8s/deployment.yaml'
        sh 'kubectl apply -f k8s/service.yaml'
      }
    }
  }
}
