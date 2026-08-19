#!/bin/bash

success=0
error=1

OUT_COLOR_RED='\033[0;31m'
OUT_COLOR_GREEN='\033[0;32m'
OUT_COLOR_BLUE='\033[0;34m'
OUT_NO_COLOR='\033[0m'

# вывод цветного сообщения
function output() {
  case $2 in
    success)
      echo -e "$OUT_COLOR_GREEN$1$OUT_NO_COLOR"
      ;;
    error)
      echo -e "$OUT_COLOR_RED$1$OUT_NO_COLOR"
      ;;
    * | info)
      echo -e "$OUT_COLOR_BLUE$1$OUT_NO_COLOR"
    ;;
  esac
}

function yesno() {
  default=''
  if [[ ! (-z $2)  ]]; then
   default=" [$2]"
  fi
  question="$1 (y/n)${default}:"
  while true; do
    read -p "${question}" answer
    if [[ ${answer} = "" ]]; then
        answer=$2
    fi
    case ${answer} in
      Y | y | yes ) return ${success};;
      N | n | no ) return ${error};;
      * ) echo "Please answer yes or no.";;
    esac
  done
}


# запуск docker-compose
function makeDocker() {

  if ! (docker info); then
    output "docker is not running. Can not continue" error
    return ${error}
  fi

  cp .env.example .env

  cd .docker

  mkdir mysql/data
  sudo chmod 777 mysql/data
  cp .env.example .env
  mkdir mysql/data && chown -R 1001:1001 mysql/data
  make build
  make up

  cd ..

  output "updating composer packages" info
    docker exec wfrepentance_php-fpm bash -c "composer update"
  output "updated composer packages" success

  output "running laravel preparation commands" info
    docker exec wfrepentance_php-fpm bash -c "php artisan storage:link"
    docker exec wfrepentance_php-fpm bash -c "php artisan key:generate"
  output "laravel prepared" success

  output "running laravel migrations" info
    docker exec wfrepentance_php-fpm bash -c "php artisan migrate"
  output "laravel migrations successful" success

  output "updating node packages" info
    docker exec wfrepentance_php-fpm bash -c "npm ci"
  output "updated node packages" success

  sudo chmod -R 777 storage/logs
  sudo chmod -R 777 storage/framework

  frontBuild

  checkHosts

  return ${success}
}

function checkHosts() {
    HOSTS='127.0.0.1 wfrepentance.loc.com'
    if grep "${HOSTS}" /etc/hosts | grep -v '^#'; then
      echo "${HOSTS} уже присутствуют в /etc/hosts"
    else
      sudo /bin/bash -c "echo -e '\n${HOSTS}' >> /etc/hosts";
      output "${HOSTS} have been added successfully to /etc/hosts." success
    fi
    output "The sites are available at \n " info
    output "wfrepentance.loc.com:8000 " info
    output "Use install.sh with 3. Run dev server for frontend to enable hot server"
}

function start() {
    docker-compose up -d
}

function frontDev() {
    docker exec wfrepentance_php-fpm bash -c "npm run dev"
}

function backendDev() {
    docker exec wfrepentance_php-fpm bash -c "php artisan serve --host=0.0.0.0 --port=8000"
}

function frontBuild() {
    docker exec wfrepentance_php-fpm bash -c "npm run build"
}

function showInstallMenu() {
  INSTALL='Full project installation'
  START='Start the containers'
  FRONTEND_DEV='Run dev server for frontend'
  FRONTEND_BUILD='Build frontend'
#  RUN_UNITS='Run codeception unit tests'

  options=(
      "${INSTALL}"
      "${START}"
      "${FRONTEND_DEV}"
      "${FRONTEND_BUILD}"
#      "${RUN_UNITS}"
  )

    select opt in "${options[@]}"; do
      case ${opt} in
      ${INSTALL})
        output "Full project installation" success
        makeDocker
        return
        ;;
      ${START})
        start
        return
        ;;
      ${FRONTEND_DEV})
        frontDev
        return
        ;;
      ${FRONTEND_BUILD})
        frontBuild
        return
        ;;
#      ${RUN_UNITS})
#        runUnits
#        return
#        ;;
      *)
    output 'Choose one of the shown options:' error
    showInstallMenu
    return
      ;;
    esac
  done
}

showInstallMenu

