# Dev Ops Project Repository

Hello. This is the repository for the DevOps project held by:

KUDINOV Sergei

# Project

## Authors

We're two members of ING 4 SI Inter at ECE Paris : 

MESSALATI Yann

COTTART Kellian

## Features

### 1. Web Application

We created a web application using NodeJS storing data inside of a Redis database. 
This web application uses tests that are located inside of the `test` folder.

This application is the same as in module 04, with all of the "TODO" sections implemented.

### 2. CI/CD Pipeline

//Yann TODO

### 3. Vagrant, IaC

//Yann TODO

### 4. Build a docker image of the web app

#### Create the Dockerfile

* Write a `Dockerfile` in the main folder of the repository defining the parent image, working dir and instructions to create the image

* Write a `.dockerignore` to be sure not to take unwanted data

* Build the image using `docker build -t yann-kellian-app .`

* Run the container using `docker run -p 3000:3000 -d yann-kellian-app`

* Check if it works going to `localhost:3000` or by running `docker ps`. Cool, it does.

#### Upload the image

* First, we created a repo on docker hub

* We tagged our newly created yann-kellian-app to our repo using the command `docker tag yann-kellian-app kellianoy/devops-project-app`

* We pushed our file using `docker push kellianoy/devops-project-app`

* We verified that the repo was created and full. 
Check out : https://hub.docker.com/repository/docker/kellianoy/devops-project-app

### 5. Docker-compose

* We need to create a `docker-compose.yaml` file to orchestrate our containers. Let's start by writing it with 2 images: 
	* `redis:alpine` (because it takes less place, and we don't need much of redis) 
	* The newly-created `devops-project-app` image.

* Run `docker-compose up`. Congratulations, it works !

### 6. Kubernetes

