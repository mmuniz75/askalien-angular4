node {
   stage('Checkout') { 
       git(url: 'https://github.com/mmuniz75/askalien-angular4')
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
   */    
   stage('Compile Typescript') {
   sh 'ng build --prod --build-optimizer'
   }    
   stage('Set AWS Credetials') {
	 sh "export AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} && export AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} && export AWS_DEFAULT_REGION=${AWS_DEFAULT_REGION}"
   }    
   stage('Sync with AWS') {
	 sh "aws s3 sync dist s3://askalien.men/ --delete"
   }    
}
