# TP1 - Premier conteneurs

L’objectif de ce TP est de se familiariser avec les principales commandes du CLI Docker

- Gérer le cycle de vie d’un conteneur
- Obtenir des informations sur les conteneurs et leur état

## docker create & docker start

- Utilisez la commande `docker create` pour créer un conteneur à partir de l’image `nginx`

```bash
docker create --name tp1 nginx
```

- Vérifiez l'état de votre conteneur, celui-ci devrait être `Created`

```bash
docker ps -a
```

> Par défaut, `docker ps` n'affiche que les conteneurs dans l'état `Running`.<br />
L'option `-a` ou `--all` permet d'afficher tous les conteneurs

- Démarrez votre conteneur avec la commande `docker start tp1`

- Vérifiez l'état de votre conteneur, celui-ci devrait être `Up`

- Mettre en pause le conteneur avec `docker pause`, vérifiez l'état, puis réveillez le avec `docker unpause`

- Arrêtez le conteneur avec `docker stop tp1`

- Vérifiez l'état de votre conteneur, celui-ci devrait être `Exited`

- Supprimez définitivement le conteneur `docker rm tp1`

- Listez les conteneurs pour vérifiez que le conteneur `tp1` n'existe plus

## docker run

- Lancez un conteneur à partir de l’image `nginx`...
  - avec la commande `docker run`...
  - en définissant la commande de démarrage du conteneur `echo Formation`.

```bash
docker run --name nginx nginx echo Formation
```

La sortie de la console doit être le résultat de la commande

- Relancez un conteneur avec la même commande, mais cette fois en mode détaché

```bash
docker run --name nginx2 -d nginx echo Formation
```

Que se passe-t-il ?

- Vérifiez les logs du conteneur

```bash
docker logs nginx
```

- Supprimez définitivement le conteneur avec `docker rm`

> L'option `-f` de la commande `rm` permet de forcer la suppression d'un conteneur, même si celui-ci est dans l'état `Running`

## docker run interactif

- Démarrez un conteneur en interactif (option `-ti`) en utilisant la commande de démarrage `sh`

```bash
docker run -ti nginx:alpine sh
```

- Dans le conteneur, lancez la commande `ps` pour lister les processus

```bash
root@c8067d6fd561:/# ps
PID TTY  TIME COMMAND
  1 ?    0:00 sh
  9 ?    0:00 ps
```

Le process `sh` a le pid `1`, qui est habituellement celui du programme `init`

- Quittez le conteneur en tapant `exit`, ou avec `Ctrl+D`

- Supprimez définitivement le conteneur

## Interagir avec un conteneur

Pour le moment nous n’avons lancé que des conteneurs éphémères. Dans cette partie nous allons démarrer des conteneurs persistants, en mode *détaché*, et interagir avec ces conteneurs depuis le `DOCKER_HOST`

- Lancez un conteneur à partir de l’image `nginx`, en mode *détaché*, en nommant le conteneur **nginx** <br />
(ajoutez l’option `-p 80:80`, que nous verrons plus en détail dans les chapitres suivants)


```bash
docker run -p 80:80 --name nginx -d nginx:alpine
```

### docker ps/logs/inspect

- Vérifiez que le conteneur est bien `Up`

- Depuis un navigateur, connectez vous sur le conteneur, sur le port 80, pour vérifier que le processus nginx est bien démarré.

> Sur la plupart des installations Docker, l’url est [localhost:80](http://localhost:80)

> Si vous êtes sur une instance ec2 fournie par votre instructeur, accédez à votre conteneur en spécifiant le DNS de votre instance

- Consultez les logs du conteneur nginx

```bash
docker logs nginx
```
>L’option `-f` de la commande `logs` permet d’afficher les logs d’un conteneur au fur et à mesure qu’ils arrivent (équivalent `tail -f`)


- Consultez les informations détaillées du conteneur et analysez les différentes informations disponibles

```bash
docker inspect nginx
```

### docker exec/top/stats

Il est souvent utile de se “connecter” sur un conteneur pour débuguer. Aucun démon SSH n’étant disponible sur le conteneur, la solution consiste à “entrer” dans le conteneur en lançant un processus.

- Avec la commande `exec` (et l’option `-ti`), lancer un processus bash dans le conteneur

```bash
docker exec -ti nginx sh
```

- Vérifier les processus en cours d'exécution `ps aux`

- Sortez du conteneur

- Avec la commande `docker top`, vérifiez que le résultat est identique à la commande `ps aux` précédente

- Utilisez `docker stats` pour consulter les statistiques d'usage de ressources de votre conteneur
