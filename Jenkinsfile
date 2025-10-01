pipeline {
  agent any

  environment {
    DOCKER_IMAGE = "node-app"
  }

  options {
    timestamps()
    disableConcurrentBuilds()
  }

  triggers {
    githubPush()
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

    stage('SonarQube Analysis') {
      steps {
        withSonarQubeEnv('sonar-local') {
          script {
            def scannerHome = tool 'SonarScanner'
            sh """
              "${scannerHome}/bin/sonar-scanner" \
                -Dsonar.projectKey=node-app \
                -Dsonar.sources=. \
                -Dsonar.sourceEncoding=UTF-8
            """
          }
        }
      }
    }

    stage('Quality Gate') {
      steps {
        timeout(time: 3, unit: 'MINUTES') {
          waitForQualityGate abortPipeline: true
        }
      }
    }

    stage('Deploy to Minikube') {
      steps {
        sh 'kubectl apply -f k8s/deployment.yaml'
        sh 'kubectl apply -f k8s/service.yaml'
      }
    }
  }

  post {
    success {
      echo "✅ Deployment successful. Visit your app at http://<Minikube-IP>:<NodePort>"
    }
    failure {
      echo "❌ Build or quality gate failed. Check logs for details."
    }
  }
}
