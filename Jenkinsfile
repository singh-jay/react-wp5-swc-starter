def COLOR_MAP = [
    'SUCCESS': 'good', 
    'UNSTABLE': 'danger',
    'FAILURE': 'danger',
]
def getBuildUser() {
    return currentBuild.rawBuild.getCause(Cause.UserIdCause).getUserId()
}

pipeline{

	agent any
	
	// Set up local variables for your pipeline
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

		stage('Login') {

			steps {
				sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
			}
		}

		stage('Push') {

			steps {
				sh 'docker push singhjay/swc-wp5:latest'
			}
		}
	}
	// Post-build actions
    post {
        always {
			sh 'docker logout'
            // script {
            //     BUILD_USER = getBuildUser()
            // }
            echo 'I will always say hello in the console.'
            slackSend channel: '#automation',
                color: COLOR_MAP[currentBuild.currentResult],
                message: "*${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} by Admin\n More info at: ${env.BUILD_URL}"
        }
    }

}