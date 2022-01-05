# Troubleshooting challenges

Voici quelques défis à réaliser pour vous familiariser avec le troubleshooting de vos applications Kubernetes

## Configuration

Avant de commencer, vous aurez besoin d'activer un nouveau **plugin Microk8s**

```bash
microk8s enable metallb:10.0.10.1-10.0.10-10
```

Ce plugin simule un LoadBalancer et vous attribue une _External IP_ en **10.0.10.X** pour chaque nouveau Service Kubernetes créé

> Parfois l'activation de ce plugin reste bloqué sur la dernière instruction. Pour vérifier que tout est bien opérationnel, faire un `kubectl get all -n metallb-system` et vérifier la présence d'un deployment nommé `controller` ainsi que d'un daemonset nommé `speaker`. Si c'est le cas, vous pouvez forcer la commande microk8s lancée précédemment à quitter en effectuant un **CTRL+C**.

## Instructions communes

Pour chaque défi, vous devrez :
* **déployer** toutes les ressources du dossier correspondant
* **valider** le déploiement
* **interroger** votre application
* **identifier** le problème
* **corriger** les sources
* **redéployer**
* **tester** 

Vous avez trouvé ? Bravo !

N'oubliez pas de **nettoyer** les ressource entre chaque défi avec `kubectl delete -f resources/challengeXXX`

## Défi 1

Instructions :

* Déployez toutes les ressources du dossier `resources/challenge1`
* Interrogez votre application avec la commande `curl` (tip: Services to the rescue !)
* Aidez-vous des commandes `kubectl` vues en partie théorique

> hint : Ma version des choses n'est pas toujours vraie...

## Défi 2

Instructions :

* Déployez toutes les ressources du dossier `resources/challenge2`
* Interrogez votre application avec la commande `curl`
* Aidez-vous des commandes `kubectl` vues en partie théorique

> hint : Si la porte n'est pas ouverte, vous ne verrez pas à l'intérieur de la pièce...

## Défi 3

Instructions :

* Déployez toutes les ressources du dossier `resources/challenge3`
* Interrogez votre application avec la commande `curl`
* Aidez-vous des commandes `kubectl` vues en partie théorique

> hint : Ce n'est pas vous rendre Service que de vous donner la solution... La belle affaire

## Défi 4

Instructions :

* Déployez toutes les ressources du dossier `resources/challenge4`
* Interrogez votre application avec la commande `curl`
* Aidez-vous des commandes `kubectl` vues en partie théorique

> hint : Parcourez les petites annonces...

## Défi 5

Instructions :

* Déployez toutes les ressources du dossier `resources/challenge5`
* Interrogez votre application avec la commande `curl`
* Aidez-vous des commandes `kubectl` vues en partie théorique

> hint : Le temps est variable aujourd'hui...

## Défi 6

Instructions :

* Déployez toutes les ressources du dossier `resources/challenge6`
* Interrogez votre application avec la commande `curl`
* Aidez-vous des commandes `kubectl` vues en partie théorique

> hint : Pour demander un service à quelqu'un, vous l'appelez bien par son vrai nom...

## Pour finir

Explorez d'autres techniques de troubleshooting sur [la documentation officielle Kubernetes](https://kubernetes.io/docs/tasks/debug-application-cluster/)