FROM nginx:1.19.10-alpine

ENV HOME /home/app-service

LABEL DISTRIB=alpine \
	MAINTAINER=soat \
	APP_VERSION=1.0.0

RUN adduser -h /home/app-service -D app-service

COPY index.html /usr/share/nginx/html/

WORKDIR ${HOME}

USER app-service
