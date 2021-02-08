# TP8 - Créer et déployer un Chart Helm

Vous savez maintenant créer des ressources avec `kubectl`, nous allons maintenant voir comment packager ces ressources à un plus haut niveau avec `Helm`

## Configuration

Il est possible d'installer Helm en téléchargeant le binaire sur les dépôts officiels

Mais heureusement, `Microk8s` est là pour nous faciliter la vie

Activons le Helm embarqué dans Microk8s

```bash
# Enable Helm3
microk8s enable helm3
# Create snap alias
sudo snap alias microk8s.helm3 helm
```

Vérifier la version :

```bash
helm version
```

## Créer un Chart

Dans un répertoire de travail, initialisez votre premier Chart avec `helm create`

```bash
helm create hello-app
cd hello-app
```

Helm créé pour vous une structure par défaut, avec la possibilité de déployer un Nginx

## Observation

Ouvrez les différents fichiers dans votre nouvelle arborescence

* Chart.yaml
* values.yaml
* templates/*

## Installation

Vous allez installer maintenant votre nouveau chart

```bash
helm install my-nginx .
```

Helm vous donne les instructions pour accéder à votre application : 

```bash
NAME: my-nginx
LAST DEPLOYED: Mon Feb  8 12:10:44 2021
NAMESPACE: training-agarnier
STATUS: deployed
REVISION: 1
NOTES:
1. Get the application URL by running these commands:
  export POD_NAME=$(kubectl get pods --namespace training-agarnier -l "app.kubernetes.io/name=hello-app,app.kubernetes.io/instance=my-nginx" -o jsonpath="{.items[0].metadata.name}")
  echo "Visit http://127.0.0.1:8080 to use your application"
  kubectl --namespace training-agarnier port-forward $POD_NAME 8080:80
```

Exécutez les commandes qu'il vous donne pour réaliser du port-forwarding et ouvrir l'accès à votre Pod :

```bash
export POD_NAME=$(kubectl get pods --namespace training-agarnier -l "app.kubernetes.io/name=hello-app,app.kubernetes.io/instance=my-nginx" -o jsonpath="{.items[0].metadata.name}")
echo "Visit http://127.0.0.1:8080 to use your application"
kubectl --namespace training-agarnier port-forward $POD_NAME 8080:80
```

Validez que vous accédez bien à votre pod avec curl

```bash
curl http://127.0.0.1:8080
```

## Mise à jour de votre Chart

### Grâce au flag --set

Modifiez maintenant votre deploiement avec la commande `helm upgrade`, en remplaçant XXX par votre numéro d'instance

Puis, tester votre endpoint avec curl en ciblant le DNS public de votre instance

```bash
export DNS=decision-network-docker-training-XXX.aws.soat.fr
helm upgrade my-nginx . --set ingress.enabled=true --set ingress.hosts[0].host=${DNS},ingress.hosts[0].paths[0]=/
curl http://${DNS}/
```

### En fournissant un fichier de values custom

Vous allez maintenant fournir des valeurs custom à votre Chart, de manière déclarative

Créez un dossier `values`, puis un fichier `ec2.yaml` dans ce dossier

```bash
mkdir values
cd values
vim ec2.yaml
```

Insérez le contenu suivant dans ce fichier puis sauvegardez-le

```yaml
replicaCount: 2
ingress:
  enabled: true
  hosts:
    - host: decision-network-docker-training-0.aws.soat.fr
      paths: [ "/" ]
```

Déployez maintenant votre nouveau chart avec l'option `-f` pour spécifier un fichier de values personnalisé

```bash
helm upgrade my-nginx . -f values/ec2.yaml
```

Vérifier votre déploiement avec `helm list`

Vous venez de déployer un Chart custom !
