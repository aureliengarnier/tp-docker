# TP3 - Docker Hub & Registry

Manipulation d'une registry

## Registry privée

- Comme indiqué sur la [documentation Docker](https://docs.docker.com/registry/deploying/#running-on-localhost), installez un registry privé en local avec la commande suivante

```bash
docker run -d -p 5000:5000 --restart=always --name registry registry:2
```

- En suivant les instructions précédentes et vous aidant des slides de la partie théorique, poussez l'unde de vos images locales sur votre registry privée

