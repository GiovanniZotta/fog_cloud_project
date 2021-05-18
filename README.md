# Fog and Cloud Computing

Project for the course on Fog and Cloud Computing

## Members

##### Group 07

|   Name   |  Surname  |     Username     |    MAT     |
| :------: | :-------: | :--------------: | :--------: |
|  Carlo   | Corradini | `carlocorradini` | **223811** |
| Giovanni |   Zotta   | `GiovanniZotta`  | **223898** |

## Kind with a local registry

> Based on <https://github.com/tilt-dev/kind-local>

When developing locally, you want to push images to the cluster as fast as possible.

Pushing to an in-cluster image registry skips a lot of overhead:

- Unlike with a remote registry, the image stays local to your machine, with no network traffic

- Unlike with `kind load`, docker will skip pushing any layers that already exist in the registry

This makes it a great solution for iterative local development. But setting it up is awkward and fiddly.

### How to

> [Kind](https://github.com/kubernetes-sigs/kind) must be installed

1. **Create** a cluster with `kind-with-registry.sh`

   > It creates the registry at port **5000**

   ```bash
   $ k8s/kind-with-registry.sh
   ```

   - **Teardown** the cluster with `teardown-kind-with-registry.sh`

     ```bash
     $ k8s/teardown-kind-with-registry.sh
     ```

2. Push an image

   ```bash
   # Build image
   $ docker build -f ./docker/Dockerfile.gateway -t gateway .
   # Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE
   $ docker tag gateway localhost:5000/gateway
   # Push the image to the local registry
   $ docker push localhost:5000/gateway
   ```

3. Use the image

   You can now use the image name `localhost:5000/gateway` in any resources you deploy to the Kind cluster.

## Docker

Build Docker images

```bash
$ ./docker/docker.sh
```

### Arguments

- --push=<true|false>

  Default: **false**

  Push the images to the local registry.

- --push-prefix=<value>

  Default: **localhost:5000/**

  Prefix for local registry images.

## Kubernetes

### Ingress

#### Kind

> Based on <https://kind.sigs.k8s.io/docs/user/ingress/#ingress-nginx>

```bash
$ kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/kind/deploy.yaml
```

### Deploy
```bash
$ kubectl apply -f ./k8s/graphmarket.yml
```