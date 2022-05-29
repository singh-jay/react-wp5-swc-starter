pipeline{

	agent any

	environment {
		DOCKERHUB_CREDENTIALS=credentials('singhjay_dockerhub')
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

	post {
		always {
			sh 'docker logout'
		}
	}

}