pipeline {
    agent any

    environment {
        NODE_VERSION = "18"
        DOCKER_IMAGE = "mern-app:2"
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Clone the repository
                git branch: 'main', url: 'https://github.com/PrashantLalwani8289/tripsee-user-panel.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Use Node.js to install dependencies
                    bat 'npm install'
                }
            }
        }


        stage('Build Application') {
            steps {
                script {
                    // Build the MERN app
                    bat 'npm run build'
                }
            }
        }

        stage('Dockerize') {
            steps {
                script {
                    // Build a Docker image for deployment
                    bat """
                    docker build -t ${DOCKER_IMAGE} .
                    docker tag ${DOCKER_IMAGE} prashantlalwani/${DOCKER_IMAGE}
                    """
                }
            }
        }

        stage('Push to Docker Registry') {
            steps {
                script {
                    // Push Docker image to the registry
                    bat "docker push prashantlalwani/${DOCKER_IMAGE}"
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Deploy the Docker container (e.g., to Kubernetes or a server)
                    bat """
                    docker run -d -p 5174:5174 ${DOCKER_IMAGE}
                    """
                }
            }
        }
    }

    post {
        always {
            // Clean up workspace
            cleanWs()
        }
        success {
            echo 'Build and Deployment successful!'
        }
        failure {
            echo 'Build or Deployment failed!'
        }
    }
}
