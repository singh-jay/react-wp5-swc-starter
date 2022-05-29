def COLOR_MAP = [
    'SUCCESS': 'good', 
    'FAILURE': 'danger',
]
def getBuildUser() {
    return currentBuild.rawBuild.getCause(Cause.UserIdCause).getUserId()
}

pipeline{

	agent any

	environment {
		DOCKERHUB_CREDENTIALS=credentials('singhjay_dockerhub')
		doError = '0'
        BUILD_USER = ''
	}

	stages {

		// stage('Build') {

		// 	steps {
		// 		sh 'docker build --target prod -t singhjay/swc-wp5:latest .'
		// 	}
		// }

		// stage('Login') {

		// 	steps {
		// 		sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
		// 	}
		// }

		// stage('Push') {

		// 	steps {
		// 		sh 'docker push singhjay/swc-wp5:latest'
		// 	}
		// }
		stage('Error') {
            // when doError is equal to 1, return an error
            when {
                expression { doError == '1' }
            }
            steps {
                echo "Failure :("
                error "Test failed on purpose, doError == str(1)"
            }
        }
        stage('Success') {
            // when doError is equal to 0, just print a simple message
            when {
                expression { doError == '0' }
            }
            steps {
                echo "Success :)"
            }
        }
	}
// Post-build actions
    post {
        always {
			// sh 'docker logout'
            script {
                BUILD_USER = getBuildUser()
            }
            echo 'I will always say hello in the console.'
            slackSend channel: '#automation',
                color: COLOR_MAP[currentBuild.currentResult],
                message: "*${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} by ${BUILD_USER}\n More info at: ${env.BUILD_URL}"
        }
    }
	post {
		always {
			sh 'docker logout'
		}
	}

}