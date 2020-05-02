# Rocket.Chat.App-foaas

Utilizes FOASS (http://foaas.com/) to generate an appropriate response.

## Docker
A Dockerfile and docker-compose are provided.

Build the docker image and run it to deploy to your server:
`docker build -t rocketchatapp_foaas . && docker run -it --rm -e URL=YOUR_SERVER -e USERNAME=YOUR_USERNAME -e PASSWORD=YOUR_PASSWORD rocketchatapp_foaas`

Build the docker image and run docker-compose to deploy to your server:
`docker build -t rocketchatapp_foaas . && docker-compose run --rm -e URL=YOUR_SERVER -e USERNAME=YOUR_USERNAME -e PASSWORD=YOUR_PASSWORD rocketchatapp_foaas`