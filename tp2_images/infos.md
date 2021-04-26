# TP2 - Création d'images Docker

Comme nous l’avons vu dans la présentation théorique, une image est ensemble de layers *Read-Only*. Un conteneur ajoute une layer *Read-Write*. Pour créer une image à partir d’un conteneur, il suffit de transformer la couche *Read-Write* en *Read-Only* avec la commande *commit*

## Créer une image avec `docker commit`

- Démarrez un conteneur à partir de l’image `nginx`, en interactif, avec la commande `bash`

```bash
docker run --name nginx -ti nginx bash
```

- Dans le conteneur, installez *vim* puis éditez le fichier */usr/share/nginx/html/index.html*

```bash
apt-get update
apt-get install -y vim
vim /usr/share/nginx/html/index.html
```

Personnalisez la page HTML selon vos envies puis sortez du conteneur

- Transformez le conteneur en image

```bash
docker commit nginx new_image_nginx
```

- Vérifiez que l'image est bien disponible avec `docker images`

- Lancez un conteneur à partir de la nouvelle image

```bash
docker run -d -p 80:80 new_image_nginx nginx -g "daemon off;"
```

- Connectez-vous sur le conteneur avec votre navigateur, et vérifiez que la page web affichée est bien personnalisée

## Image nginx depuis un `Dockerfile`

L’objectif de cette partie est de recréer l’image de l’exercice précédent, mais cette fois ci de manière automatisée avec un Dockerfile.

- Dans un dossier de travail, créez un fichier nommé `Dockerfile`
- Dans ce même dossier, créez le fichier `index.html` (que vous personnalisez selon vos envies)

```html
<!DOCTYPE html>
<html>
<head>
<title>Welcome to the Docker masterclass</title>
<style>
    body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }
</style>
</head>
<body>
<h1>Welcome to the Docker masterclass !</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```

En vous aidant des instructions vues en présentation théorique ainsi que de la [documentation Docker](https://docs.docker.com/engine/reference/builder/), ajoutez les instructions dans le Dockerfile pour :

- Utiliser `nginx` comme image de base
- Ajouter le fichier `index.html` dans l'image, en écrasant `/usr/share/nginx/html/index.html`

Ensuite, utilisez la commande `docker build` pour créer votre image à partir du `Dockerfile`, nommez-la `nginx_dockerfile`

```bash
docker build -t nginx_dockerfile .
```

Vérifiez que l’image est bien disponible avec la commande `docker images`

Démarrez un conteneur à partir de cette image, puis connectez-vous à la page depuis votre navigateur pour vérifier le bon fonctionnement

```bash
docker run -d -p 80:80 nginx_dockerfile nginx -g "daemon off;"
```

Supprimez le conteneur


## Image NodeJS

Nous allons désormais explorer un peu plus les possibilités des Dockerfiles en ajoutant des fonctionnalités à notre image.

Nous allons utiliser créer une nouvelle image qui contiendra un serveur NodeJS qui fera tourner votre application

Dans votre dossier de travail, créez un fichier `server.js` avec le contenu suivant

```js
'use strict';

const express = require('express');
const os = require("os");

const app = express();
app.get('/', function (req, res) {
  res.send('Hello from ' + os.hostname());
});


app.listen(8080);
```

Créez également un fichier package.json avec le contenu suivant

```json
{
  "name": "masterclass_docker",
  "version": "1.0.0",
  "description": "Node.js app",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.13.3"
  }
}
```

Ajoutez les instructions dans le `Dockerfile` pour :

- Utiliser `node:alpine` comme image de base
- Définir les Labels suivants :

```
Formation=Docker
TP=3
```

- Ajouter les fichiers `package.json` et `server.js` dans l’image, dans le dossier */usr/src/app/*
- Configurer le Working Directory de votre image sur */usr/src/app/*
- Exécuter la commande `npm install` lors de la création de l'image
- Déclarer le port 8080 avec l'instruction `EXPOSE`
- Définir la commande de démarrage `npm start`


Construisez votre image avec la commande build comme précédemment

```bash
docker build -t node_dockerfile .
```

Lancez un conteneur à partir de l’image (avec l’option `-p 8080:8080`) puis vérifiez le contenu de la page [http://localhost:8080](http://localhost:8080)

```bash
docker run -d -p 8080:8080 node_dockerfile
```

> Vous pouvez modifier le hostname (valeur qui sera affiché dans la page web), avec le paramètre `--hostname nouveau_hostname` lors du docker run

> Le cache de la commande `docker build` peut parfois poser des problèmes. Pour construire vos images en omettant le cache, ajoutez l’option `--no-cache`
