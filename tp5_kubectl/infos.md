# TP5 - Configurer et utiliser kubectl

Une fois votre cluster local installé, `kubectl` vous servira à interagir avec lui

## Configuration de kubectl

Par défaut la commande `kubectl` n'est pas installée sur votre système, essayez la commande suivante :

```bash
# Use kubectl to display pods.. command not found ?!
kubectl get pods
```

Utilisons plutôt celle de Microk8s !

```bash
# Use kubectl from microk8s installation
microk8s.kubectl get pods

# Create kubectl alias
sudo snap alias microk8s.kubectl kubectl

# Check alias
kubectl
```

## Configuration de l'auto-complétion

Une commande c'est bien, mais l'auto-complétion, c'est mieux !

```bash
# Add completion to kubectl command
echo "source <(kubectl completion bash)" >> ~/.bashrc

# Source .basrhc file
source ~/.bashrc

# Check auto-completion is enabled
kubectl ge<TAB><TAB><TAB>
kubectl get p<TAB><TAB><TAB>
```

Vous pouvez allez encore plus loin et tapper la commande `k` au lieu de `kubectl`, pour cela créer un nouvel alias

```bash
# Create alias on kubectl
echo "alias k=kubectl" >> ~/.bashrc
# Add completion to k alias
echo "source <(kubectl completion bash | sed 's|__start_kubectl kubectl|__start_kubectl k|g')" >> ~/.bashrc

# Source .basrhc file
source ~/.bashrc

# Get all resources in current namespaces
k get all
```

## Explorer les ressources

Utiliser votre nouvelle commande `k` pour explorer les ressources Kubernetes

```bash
# Get all namaspaces
k get namespace

# Get all resources in specific namespace
k get all -n ingress

# Get all resources in all namespaces
k get all -A
```

## Utiliser le dashboard

Par défaut, le dashboard n'est pas accessible depuis l'extérieur de votre cluster

Il vous faudra réaliser du `port-forwarding` ou bien utiliser la commande suivante :

```bash
# Enable dashboard-proxy forwarding, on 10443 port
microk8s dashboard-proxy
```

> Note : Cette commande vous affiche votre token d'accès

Il ne vous reste plus qu'à naviguer sur `<your_public_dns>:10443` et utiliser la méthode d'authentification par token, en fournissant celui affiché dans votre console

### Troubleshooting

1. Port 10443 bloqué par votre firewall

Il est possible que votre firewall ou proxy bloque le port `10443` pour des raisons de sécurité

Pour pallier ce problème, on peut utiliser le _port forwarding_ du protocole ssh : 

Dans un autre terminal connectez-vous à votre instance ec2 en ajoutant l'option `-L` : 

```bash
ssh -L 443:localhost:10443 <username>@<your_public_dns>
```

Accédez maintenant à votre dashboard depuis le navigateur avec : `https://localhost`

> 443 étant le port que vous utiliserez sur votre machine locale (qui doit être libre), 10443 étant le port distant correspondant au port exposé par le Dashboard

2. Erreur de sécurité HSTS sur le navigateur

Il est possible que votre Firefox vous empêche d'afficher le dashboard à cause d'une erreur HSTS, pour résoudre cela :

* ouvrir un onglet et taper `about:config`, rechercher la clé `security.mixed_content.block_display_content` et passer sa valeur à `true`
* vider le cache de votre navigateur
* naviguer de nouveau sur l'url du dashboard et ajouter une exception

## Configuration du rôle admin

Par défaut, votre dashboard ne vous permet pas d'explorer toutes les ressources de tous les namespaces

Vous allez devoir créer un nouvel objet appelé `ClusterRoleBinding` qui va simplement associer le ServiceAccount `default` au ClusterRole `cluster-admin`

Pour cela, copier l'intégralité des lignes suivantes et collez-là dans votre terminal :

```bash
cat <<EOF | kubectl apply -f -
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: default
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: default
  namespace: kube-system
EOF
```
