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

    stage('Extract Coverage') {
      steps {
        sh 'docker cp $(docker create $DOCKER_IMAGE):/usr/src/app/coverage/lcov.info coverage/lcov.info'
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
                -Dsonar.sourceEncoding=UTF-8 \
                -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
                -Dsonar.javascript.coveragePlugin=lcov
            """
          }
        }
      }
    }

    stage('Quality Gate') {
      steps {
        echo "Waiting for SonarQube analysis to complete..."
        sleep 15
        waitForQualityGate abortPipeline: true
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
