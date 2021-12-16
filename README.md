# Dev Ops Project Repository

Hello. This is the repository for the DevOps project held by:

KUDINOV Sergei

# Authors

We're two members of ING 4 SI Inter at ECE Paris : 

MESSALATI Yann

COTTART Kellian

# Features

## 1. Web Application

We created a web application using NodeJS storing data inside of a Redis database. 
This web application uses tests that are located inside of the `test` folder.

This application is the same as in module 04, with all of the "TODO" sections implemented.

We also added the capacity to see if the connection with the database was succesfully executed by showing a "**connected**" or "**disconnected**" message on the front page.

## 2. CI/CD Pipeline

### CI

First, we created some unit-tests inside of our app, allowing for a test suite to be created.

To implement Continuous Integration, we used GithubActions. We created the `.github/worflows/redis-docker-tests-CI.yml` file.

Using a Redis image and the repository, we set up the file to be able to run a Ubuntu using Redis, as well as a NodeJS basic system to host our file. This allows our unit-tests to run in the background on every push on the main branch.

We're checking if our app works on node 14 and 16 using a matrix strategy.

We could have implemented it on every push of all branches, however GithubActions is limited in its duration of use (only up to 3000 minutes) and we're almost over the limit, so we restrained it.

If it fails, it sends us an email, warning us about the failing of these tests.

### CD

## 3. Vagrant, IaC

//Yann TODO

## 4. Build a docker image of the web app

### Create the Dockerfile

* Write a `Dockerfile` in the main folder of the repository defining the parent image, working dir and instructions to create the image

* Write a `.dockerignore` to be sure not to take in unwanted data

* Check if the redis connection is set to `"host": "redis"` and `"port": 6379` in `userapi\conf\default.json`. This is only for the container part because local tests need to be run with `"host": "127.0.0.1"`.

* Build the image using `docker build -t yann-kellian-app .`

* Run the container using `docker run -p 3000:3000 -d yann-kellian-app`

* Check if it works going to `localhost:3000` or by running `docker ps`. Cool, it does.

### Upload the image

* First, we created a repo on docker hub

* We tagged our newly created yann-kellian-app to our repo using the command `docker tag yann-kellian-app kellianoy/devops-project-app`

* We pushed our file using `docker push kellianoy/devops-project-app`

* We verified that the repo was created and full. 
Check out : https://hub.docker.com/repository/docker/kellianoy/devops-project-app

## 5. Docker-compose

* We need to create a `docker-compose.yaml` file to orchestrate our containers. Let's start by writing it with 2 images: 
	* `redis:alpine` (because it takes less place, and we don't need much of redis) 
	* The newly-created `devops-project-app` image.
	* We add a volume named `redis-storage` to store our users.
	
* Run `docker-compose up`. Congratulations, it works !

* We have to check whether or not the data volume is correct, by sending post requests to create users and getting them. To do so, we used curl :

	* To create a user, you can type this command:  ```curl -i -X POST -H 'Content-Type: application/json' -d '{"username": "kellianoy", "firstname": "kellian", "lastname":"cottart"}' http://localhost:3000/user/``` 
	* To get one, type this command in the url: ```http://localhost:3000/user/kellianoy``` 

* Now, we can see that the data has been persisted, even when we close the docker-compose.

## 6. Kubernetes

* We started by using `Kompose` to convert our `docker-compose.yaml` to Kubernetes deployment / service files. By using the command `kompose up .` and then `kompose convert`, we generated new files allowing to do the same deployment actions that were referred in the docker-compose.

* This wasn't satisfactory, but it gave us a good idea of what to have to generate a working cluster. This result didn't allow us to make a persistent data claim, so we had to rework it into a proper deployment. This includes a total of 5 files:
	* `k8s/web-app-deployment.yaml`, that allows the deployment of one pod of our image
	* `k8s/web-app-service.yaml`, that allows the service of our app using a loadBalancer
	* `k8s/redis-deployment.yaml`, that allows the deployment of one pod of Redis
	* `k8s/redis-service.yaml`, that allows the service of Redis
	* `k8s/redis-claim.yaml`, that allows the creation of a persistentVolumeClaim to make the link between database and app, and store it.

* To apply our files, we used the command `kubectl apply -f k8s/`.

* Once it was lauched, we can use `minikube tunnel` to know the status of our machine

* We can access the app by using `minikube service devops-app-service`

* We can add a user using, as for 5., but with a modified ip ```curl -i -X POST -H 'Content-Type: application/json' -d '{"username": "kellianoy", "firstname": "kellian", "lastname":"cottart"}' http://192.168.49.2:30150/user/```

* Let's stop the service: `minikube stop`, and open it again: `minikube start`. Now, we go to `http://192.168.49.2:30150/user/kellianoy` and we confirm that we have still our user in the database, meaning that it has been properly setup !

## 7. Istios




