pipeline {
    agent any

    environment {
      AWS_ACCESS_KEY_ID = credentials('AWS_ACCESS_KEY_ID')
      AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')
      AWS_DEFAULT_REGION = 'us-east-1'
   }

    stages {
        stage('echo vars') {
            steps {
                echo "${branch}"
                echo "${env.AWS_DEFAULT_REGION}"
                echo "${env.AWS_ACCESS_KEY_ID}"
                echo "${env.AWS_AWS_SECRET_ACCESS_KEY}"
                echo "${env.AWS_DEFAULT_REGION}"
                echo "${AWS_ACCESS_KEY_ID}"
                echo "${AWS_AWS_SECRET_ACCESS_KEY}"
                echo "${AWS_DEFAULT_REGION}"
            }
        }
    }

   /*
   stage('Checkout') { 
       git(url: 'https://github.com/mmuniz75/askalien-angular4',
           branch: "${branch}")
   }
   stage('Install Modules') {
      //env.NODEJS_HOME = "${tool 'nodejs'}"
      //env.PATH="${env.NODEJS_HOME}/bin:node_modules/@angular/cli/bin:${env.PATH}"
      sh 'npm install'
   }
   /*
   stage('Set Server') {
     sh "sed -i -e 's|<ASKALIEN_SERVER>|'${ASKALIEN_SERVER}'|g' src/environments/environment.prod.ts"
    }
       
   stage('Compile Typescript') {
   sh 'ng build --prod --build-optimizer'
   }    
   stage('Sync with AWS') {
	 sh "aws s3 sync dist s3://askalien.men/ --delete"
   }    
   */
}
