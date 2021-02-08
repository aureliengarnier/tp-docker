# TP6 - Déployer des ressources dans Kubernetes

Votre cluster est installé, votre commande kubectl est configurée, il est temps d'installer vos premières ressources !

## Configuration

Avant tout, exportez une variable qui vous servira pour les commandes impératives, en remplaçant les variables par votre utilisateur

```bash
# In tp6_resources/ folder
export USER=$(whoami)
# Replace n every YAML file
sed -i -re 's|\$\{USER\}|'${USER}'|g' *.yaml
```

## Créer un namespace

### Avec le mode impératif 

Avec la commande `kubectl create`, créez votre premier namespace

```bash
kubectl create namespace test-${USER} -o yaml
```

La commande vous affiche le Namespace créé, au format YAML

> Vous pouvez maintenant le supprimer avec `kubectl delete`

### Avec le mode déclaratif

Utilisez le fichier `0_ns.yaml` et la commande `kubectl create` pour créer votre 2nd namespace

```bash
kubectl create -f 0_ns.yaml
```

> Conservez ce namespace qui nous servira pour la suite

## Changer de namespace

Nous allons utiliser et persister le namespace créé précédemment :

```bash
kubectl config set-context --current --namespace training-${USER}
```

---

## Créer un Deployment

### Avec le mode impératif 

Avec la commande `kubectl create`, créez votre premier deployment

```bash
kubectl create deployment test-${USER} --image=nginx
```

Cherchez l'IP du Pod créé par votre Deployment avec `kubectl describe pod` puis effectuez un `curl` sur cette IP

```bash
kubectl describe pod
curl http://<ip>
```

Vous devriez voir la page d'accueil NGinx !

> Vous pouvez maintenant le supprimer avec `kubectl delete`

### Avec le mode déclaratif

Utilisez le fichier `1_deployment.yaml` et la commande `kubectl create` pour créer votre 2nd deployment

```bash
kubectl create -f 1_deployment.yaml
```

> Conservez ce Deployment qui nous servira pour la suite

## Créer un Service

### Avec le mode impératif 

Avec la commande `kubectl expose`, créez votre premier service

```bash
kubectl expose deployment training-${USER}-deploy --port=80 --target-port=8080
```

Cherchez l'IP de ce service `kubectl get service` ou `kubectl describe service` puis effectuez un `curl` sur cette IP

```bash
kubectl describe service
curl http://<ip>
```

Vous devriez voir Hello World affiché, avec d'autres informations provenant du backend déployé !

> Vous pouvez maintenant le supprimer avec `kubectl delete`

### Avec le mode déclaratif

Nous allons maintenant créer un service de type NodePort, de façon déclarative

Utilisez le fichier `2_service-np.yaml` et la commande `kubectl create` pour créer votre service de type NodePort

```bash
kubectl create -f 2_service-np.yaml
```

Interrogez maintenant votre service avec l'url 127.0.0.1 et le port indiqué par la commande `kubectl get svc`

```bash
kubectl get svc
curl http://127.0.0.1:<port>
```

> Le port à cibler est un port aléatoire, libre sur votre instance, par exemple `31445/TCP` dans la colonne Port(s) contenant `80:31445/TCP`

Créez maintenant un Service de type ClusterIP, de façon déclarative

Utilisez le fichier `2_service-cp.yaml` et la commande `kubectl create` pour créer votre service de type ClusterIP

```bash
kubectl create -f 2_service-cp.yaml
```

Interrogez maintenant votre service grâce à son IP, récupérée grâce à la commande `kubectl get svc`

```bash
kubectl get svc
curl http://<IP>
``

---

## Créer un Ingress

### Avec le mode déclaratif

Nous allons maintenant créer un Ingress pour exposer votre service à l'extérieur de votre cluster

Utilisez le fichier `3_ingress.yaml` et la commande `kubectl create` pour créer votre Ingress

```bash
kubectl create -f 3_ingress.yaml
```

Interrogez maintenant votre service avec le DNS de votre instance, sur votre navigateur

Bravo, vous venez d'exposer votre application sur Internet !
