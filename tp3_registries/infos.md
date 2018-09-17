# TP3 - Docker Hub & Registry

Manipulation de DockerHub et Registry

## Docker Hub

- Si vous n’en avez pas déjà un, créez un compte sur le [Docker Hub](https://hub.docker.com/)

> Un compte sur le Docker Hub vous donne droit à un *repository* privé. Si vous en créez d'autres, ils seront publics

- Utilisez la commande `tag` pour taguer l’image créée précedemment (*node_dockerfile*) dans le format suivant

```bash
<docker_hub_username>/node_dockerfile
```

- Authentifier vous sur le hub avec le CLI grâce à la commande `docker login`
- Avec la commande `push`, poussez votre image sur le hub
- Connectez-vous sur l’interface Web du Docker Hub pour vérifier que votre image image est bien visible
- En local, supprimez les images `node_dockerfile` et `<docker_hub_username>/node_dockerfile` avec la commande `docker rmi`
- Vérifier qu’elles n’existent plus en listant les images.
- Avec la commande `pull`, récupérez de nouveau l’image depuis le Docker Hub

## Registry privé

- Comme indiqué sur la [documentation Docker](https://docs.docker.com/registry/deploying/#running-on-localhost), installez un registry privé en local avec la commande suivante

```bash
docker run -d -p 5000:5000 --restart=always --name registry registry:2
```

- En suivant les instructions précédentes et vous aidant des slides de la partie théorique, poussez votre image sur votre registry privé

> Il faudra ajouter votre nouvelle registry en tant que service non sécurisé au niveau du démon Docker

* Sous Windows : éditer le fichier `~/.docker/machine/machines/<machine_name>/config.json`
    * Ajouter l'URI de la registry locale dans le champ `InsecureRegistry`
* Sous Linux : éditer le fichier `/etc/docker/daemon.json`
    * Ajouter le JSON suivant :

```json
{
  "insecure-registries" : ["myregistrydomain.com:5000"]
}
```