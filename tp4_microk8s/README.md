# TP4 - Installer un cluster Kubernetes en local

Installation de Microk8s

Laissez-vous guider dans les étapes

## Installer les packages avec snap

```bash
# Intall snap core
sudo snap install core

# Install microk8s --classic
sudo snap install microk8s --classic --channel=1.18/stable
```

## Vérifier son installation

```bash
# Display Microk8s status : error, your current user is not allowed
microk8s status

# Add current user into group and give access to ~/.kube folder
sudo usermod -a -G microk8s <your_username>
sudo chown -f -R <your_username> ~/.kube

# Exit session and reconnect to apply modifications on your user
<CTRL+D> or exit
```

## Activer les plugins requis

Les plugins suivants seront activés :

* storage -> Active la classe de stockage par défaut
* ingress -> active la possibilité d'atteindre votre cluster de l'extérieur
* dns -> active la fonctionnalité de dns (avec CoreDNS), et offre de la résolution à votre cluster
* rbac -> active l'accès par role
* dashboard -> installe et configure le dashboard kubernetes

```bash
# Enable useful plugins
microk8s enable storage ingress dns rbac dashboard
```

## Tester son installation

Vérifier que votre cluster répond avec la commande `microk8s.kubectl`

```bash
# display resources on all namespaces
microk8s.kubectl get all -A
```

Bravo, vous venez d'installer votre cluster Kubernetes local !

