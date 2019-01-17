node {
   stage('Checkout') { // for display purposes
      git 'https://github.com/mmuniz75/askalien-angular4'
   }
   stage('Install Modules') {
      env.NODEJS_HOME = "${tool 'nodejs'}"
      env.PATH="${env.NODEJS_HOME}/bin:node_modules/@angular/cli/bin:${env.PATH}"
      sh 'npm install'
   }
   stage('Set Server') {
     sh "sed -i -e 's|<ASKALIEN_SERVER>|'${ASKALIEN_SERVER}'|g' src/environments/environment.prod.ts"
    }    
    stage('Compile Typescript') {
	  sh 'ng build --prod --build-optimizer'
    }    
   stage('Sync with AWS') {
	 sh "export PATH=/var/jenkins_home/.local/bin:$PATH && aws s3 sync dist s3://askalien.men/ --delete"
    }    
}
