# TP2.1 - Testez vos images Docker

Une image Docker est un artéfact logiciel comme un autre. Il  est important de pouvoir le tester sur différents aspects, en prenant en compte les différentes caractéristiques qu'offre le modèle Docker.

## Container Structure Tests

### Installation

Sur votre instance, installer le binaire `container-structure-test` :

```bash
curl -LO https://storage.googleapis.com/container-structure-test/latest/container-structure-test-linux-amd64 && chmod +x container-structure-test-linux-amd64 && sudo mv container-structure-test-linux-amd64 /usr/local/bin/container-structure-test
```

### Ecriture de tests

A l'aide du [README](https://github.com/GoogleContainerTools/container-structure-test) sur la page Github du projet `container-structure-test` écrivez des cas de tests en prenant en compte les caractéristiques et la nature d'une image Docker, qui doit respecter les spécifications suivantes : 

* Base image `nginx:1.19.10-alpine` (tip : FROM)
* Dossier courant sur `/home/app-service/` (tip : WORKDIR)
* Utilisateur courant `app-service` (tip : USER) donné par la commande whoami
* Variables d'environnement : (tip : ENV)
  * HOME = /home/app-service
* Labels (tip : LABEL)
  * DISTRIB = alpine
  * APP_VERSION = 1.0.0
  * MAINTAINER = soat
* Existence du fichier `/usr/share/nginx/html/index.html` (tip COPY)
* Non existence du fichier `/home/app-service/report.log`

> Tip : Associez chaque point ci-dessus à un type de tests implémenté par `container-structure-test`

> Tip : Travaillez en TDD si vous êtes à l'aise avec cette pratique ;)

> Tip : Regroupez chaque type de test dans un fichier dédié

> Tip : Ajoutez `schemaVersion: "2.0.0"` au début de chaque fichier YAML

### Ecriture du Dockerfile

Ecrivez maintenant le Dockerfile (ou au fur et à mesure si vous avez choisi la méthode TDD)

Servez-vous du contexte de build dans le dossier `sources` pour construire votre image Docker

Rappel : 

```bash
docker build -t <image_tag> <context>
```

> Tip : Pour créer un nouvel utilisateur lors de la construction de votre image Docker, utiliser la commande `adduser <username>`

> Tip : Servez-vous du Makefile fourni en exécutant : **make build**

### Lancement des tests

Ouvrez le fichier Makefile et observez le détail de la cible `test`

Notez les paramètres donnés à la commande `container-structure-test` et adapter osoit le nom de vos fichiers, soit la commande de la cible

Une fois que tout est valide, lancez maintenant vos tests avec **make test**

Vérifiez que tout est conforme, célébrez ou itérez !
