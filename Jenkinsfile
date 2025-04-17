pipeline {
   agent any

   environment {
      AWS_ACCESS_KEY_ID = credentials('AWS_ACCESS_KEY_ID')
      AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')
      AWS_DEFAULT_REGION = 'us-east-1'
   }

   stages {
      stage('Checkout') {
         steps {
            git(url: 'https://github.com/mmuniz75/askalien-angular4',
                  branch: "${branch}")
         }
      }
      /*
      stage('Install Modules') {
         steps {
            //env.NODEJS_HOME = "${tool 'nodejs'}"
            //env.PATH="${env.NODEJS_HOME}/bin:node_modules/@angular/cli/bin:${env.PATH}"
            sh 'npm install'
         }
      }
      */
      /*
      stage('Set Server') {
         sh "sed -i -e 's|<ASKALIEN_SERVER>|'${ASKALIEN_SERVER}'|g' src/environments/environment.prod.ts"
      }
      */
      stage('Compile Typescript') {
         steps {
            sh 'npx ng build --prod --build-optimizer'
         }
      }
      stage('Sync with AWS') {
         steps {
            sh "aws s3 sync dist s3://askalien.men/ --delete"
         }
      }
   }
}
