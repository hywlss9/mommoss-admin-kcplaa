def COLOR_MAP = [
    'SUCCESS': 'good', 
    'FAILURE': 'danger',
    'UNSTABLE': 'danger',
    'ABORTED': 'danger'
]
pipeline {
  agent { node 'Stage' }
  tools {
    nodejs "node16"
  }
  options { disableConcurrentBuilds() }
  environment {
    DATE = get_date()
    BUILD_TYPE = get_trigger_type()
    COMMIT_MSG = get_commit_msg()
    COMMIT_AUTHOR = get_commit_author()
    GIT_REPO = get_repo_name()
    MAIN_DIR = get_main_dir()
  }
  stages {
    stage('Prepare') {
      steps {
        script {
          println "###############################################################################"
          println "Date: ${DATE}"
          println "Repo: ${GIT_REPO}"
          println "Build type: ${BUILD_TYPE}"
          println "Branch: ${GIT_BRANCH}"
          println "Commit author: ${COMMIT_AUTHOR}"
          println "Commit message: ${COMMIT_MSG}"
          println "###############################################################################"
        }
      }
    }
    stage('Build') {
      steps {
        script {
          println "Build"
          sh 'yarn install'
          sh 'yarn run build'
        }
      }
    }
    stage('Deploy') {
      parallel {
        stage('Stage deploy') {
          when { branch 'develop' }
          steps {
            script {
              println "Deploy stage server"
              sh 'sudo rm -rf /var/www/html/kcplaa-stg.mommoss.com/*'
              sh 'sudo cp -r build/* /var/www/html/kcplaa-stg.mommoss.com'
            }
          }
        }
        stage('Live deploy') {
          when { branch 'main' }
          steps {
            script {
              println "Deploy live server"
            }
          }
        }
      }
    }
  }
  post {
    always {
      script {
        slackSend channel: "#${GIT_REPO}",
            color: COLOR_MAP[currentBuild.currentResult],
            message: "*${currentBuild.currentResult}:* *Repo:* ${GIT_REPO} *Branch:* ${GIT_BRANCH} *Commit:* ${GIT_COMMIT} *Date:* ${DATE}"
            // message: "*${currentBuild.currentResult}:*
            // *Repo:* ${GIT_REPO} *Branch:* ${GIT_BRANCH}
            // *Commit:* ${GIT_COMMIT}
            // *Commit message:* ${COMMIT_MSG}
            // *Commit author:* ${COMMIT_AUTHOR}
            // *Build type:* ${BUILD_TYPE}
            // *Date:* ${DATE}"
      }
    }
  }
}

def get_date() {
  return sh(script: "date +%y%m%d+%H%M%S", returnStdout: true).trim()
}

def get_commit_msg(){
  script {
    return sh(script: "git show -s --format=%B", returnStdout: true).trim()
  }
}

def get_commit_author(){
  script {
    return sh(script: "git show -s --format=%an\\(%ae\\)", returnStdout: true).trim()
  }
}

def get_repo_name(){
  script {
    return env.GIT_URL.replaceFirst(/^.*\/([^\/]+?).git$/, '$1')
  }
}

def get_main_dir(){
  script {
    return sh(script: 'echo ${WORKSPACE#*workspace/}', returnStdout: true).trim()
  }
}

def get_trigger_type(){
  def isTriggeredByTimer = currentBuild.getBuildCauses('hudson.triggers.TimerTrigger$TimerTriggerCause').size()
  def isTriggeredByUser = currentBuild.getBuildCauses('hudson.model.Cause$UserIdCause').size()

  if (isTriggeredByTimer) {
    if(GIT_BRANCH == 'develop') {
      return 'Nightly'
    }
    return 'Skip'
  } else if (isTriggeredByUser) {
    return 'Manual'
  } else {
    return 'General'
  }
}