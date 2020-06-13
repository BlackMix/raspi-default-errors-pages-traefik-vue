# Raspi Errors Pages in Vue

### Configuration Examples
* traefik config
```yaml
api:
    dashboard: true

#accesslog:
#  format: "json"
#  filePath: "/configs/traefik-access.log"
#  bufferingSize: 100

log:
    level: INFO
    format: json
    filePath: "/configs/traefik.log"

entrypoints:
    web:
        address: :80
    websecure:
        address: :443
    ws:
        address: :6800
    
providers:
    kubernetesCRD: {}
    kubernetesIngress: {}
    file:
        directory: "/configs/config"
        watch: true

certificatesResolvers:
    default:
      acme:
        email: "youremail@gmail.com"
        storage: "/configs/acme.json"
        httpChallenge:
            entryPoint: web
```
##########################################


### Kubernetes Deploy
* Normal setup deploy Kubernetes
* 00-deploy-errors.yaml
```yaml
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: errors-html
  labels:
    directory: html
  
spec:
  capacity:
    storage: 250Mi
  accessModes:
  - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  storageClassName: local-errors-web
  local:
    path: /srv/dev-disk-by-label-files/volumes/www/html/errors/
  nodeAffinity:
    required:
      nodeSelectorTerms:
      - matchExpressions:
        - key: kubernetes.io/hostname
          operator: In
          values:
          - inori
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: errors-html-claim
  
spec:
  storageClassName: local-errors-web
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 250Mi
  selector:
    matchLabels:
      directory: html
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: errors-web
  labels:
    app: errors-web
  
spec:
  replicas: 1
  selector:
    matchLabels:
      app: errors-web
  template:
    metadata:
      labels:
        app: errors-web
    spec:
      containers:
      - name: errors-web
        image: nginx:alpine
        imagePullPolicy: IfNotPresent
        env:
        - name: NGINX_PORT
          value: "80"
        - name: NGINX_SERVER_ROOT
          value: "/usr/share/nginx/html/"
        ports:
          - name: errors-web-tcp
            containerPort: 80
        volumeMounts:
        - name: errors-html
          mountPath: "/usr/share/nginx/html/"
      volumes:
      - name: errors-html
        persistentVolumeClaim:
          claimName: errors-html-claim
---
apiVersion: v1
kind: Service
metadata:
  name: errors-web
  
spec:
  selector:
    app: errors-web
  ports:
  - port: 80
    protocol: TCP
    name: errors-web-tcp
############################################
## traefik router proxy
---
apiVersion: traefik.containo.us/v1alpha1
kind: Middleware
metadata:
  name: errorpage-status
spec:
  errors:
    status:
      - 400-599
    query: /#/error/{status}
    service:
      name: errors-web
      port: 80
---
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: errors-web-show
spec:
  
  entryPoints:
    - web
  routes:
  - match: HostRegexp(`{catchall:.*}`)
    kind: Rule
    priority: 1
    services:
    - kind: TraefikService
      name: errorpage-status-errorpage-service
    middlewares:              
    - name: errorpage-status
---
############################################
```

## Project Build Vue js
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
