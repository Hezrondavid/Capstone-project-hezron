pipeline {
  agent any
  triggers { githubPush() }
  options { timestamps(); disableConcurrentBuilds() }

  environment {
    DOCKER_IMAGE = 'hezrondevops/nodejs-app:latest' // Replace with your Docker Hub image name
    SONARQUBE_SERVER = 'sonar-local' // Must match your SonarQube server name in Jenkins
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('SonarQube Analysis') {
      steps {
        withSonarQubeEnv("${SONARQUBE_SERVER}") {
          script {
            def scannerHome = tool 'SonarScanner'
            sh """
              "${scannerHome}/bin/sonar-scanner" \
                -Dsonar.projectKey=myweb \
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

    stage('Build Docker Image') {
      steps {
        sh """
          docker build -t ${DOCKER_IMAGE} .
        """
      }
    }

    stage('Push Docker Image') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
          sh """
            echo $PASSWORD | docker login -u $USERNAME --password-stdin
            docker push ${DOCKER_IMAGE}
          """
        }
      }
    }

    stage('Deploy to Minikube') {
      steps {
        sh """
          kubectl apply -f deployment.yaml
          kubectl apply -f service.yaml
        """
      }
    }
  }

  post {
    success {
      echo "Deployment successful! Visit your app via Minikube service."
    }
    failure {
      echo "Build or deployment failed. Check logs for details."
    }
  }
}

