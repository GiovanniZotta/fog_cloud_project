# Deployment - OpenStack and Kubernetes automation with Ansible

Here we setup our multi-node Kubernetes cluster. In this case, instead of having the master node in a network different from the worker nodes, we have a unique network for everything. Basically, we run all our nodes, both master and workers on OpenStack instances running Ubuntu.

In order to setup our environment, we have several Ansible playbooks that help us automating the process.

## Inventory
The Ansible master node should have the following variables in its environment:
* `LOGIN` : the user that is used on the iaas and paas machines. For example, giovanni.zotta
* `FCC_PRIVATE_KEY` : the file where the private key to access the iaas and paas machines is stored.
* `FCC_PUBLIC_KEY` : the file where the public key related to the private key is stored. This file can contain multiple public keys

## Openstack configuration
First of all, we need to setup the Openstack environment in which we will spin up several instances that will work as worker nodes of the cluster, and we also need to spinup a master node.
With the `openstack-setup.yml` playbook, we setup the iaas machine with some basic packages (apt update, python, pip, git) and Openstack with an user (apollo-manager - password apollo), a project (apollo-instances) which has a network, a subnetwork, a router and a security group.

`ansible-playbook openstack-setup.yml -i inventory`

Now that we have a blank sheet where we can spin up as many instances as we want, we have an Ansible playbook that allows us to spin up an Openstack instance running Ubuntu 18.04 LTS with 2GB of RAM. This playbook creates an instance and assigns it a Floating IP. The created instance also allows to connect to it via SSH proxy jump on the iaas machine. Execute the playbook as many times as the number of instances you want. 

Specifically, we have a playbook to spinup a master node: 
`ansible-playbook openstack-spinup-master.yml -i inventory`

And a playbook to spinup a worker node:
`ansible-playbook openstack-spinup-worker.yml -i inventory`

Important note: this is only tested with 1 master and an arbitrary number of workers, it is not tested with multiple master nodes.

Now we are ready to setup our cluster!

## Kubernetes configuration
On the Master node and on all worker nodes, we need some basic packages. Therefore, we use the roles **common** and **install-worker-node** to install all the necessary tools on all our nodes.  
After doing that, on the Master node we play the role **master-init**, which initializes the Kubernetes cluster. We also apply the flannel network plugin and the NGINX Ingress controller. Then, we retrieve the join command which will be ran on every worker node, and execute it on every instance after having installed the needed packages.  
Finally, on the worker nodes we need to join the cluster.
Everything is done with two Ansible playbook, which separate the installation of the needed packages and the actual initialization and joining of the cluster.

First:
`ansible-playbook cluster-prepare.yml -i inventory`

Then.
`ansible-playbook cluster-init.yml -i inventory`

## Erase everything to start from scratch
It is possible to erase the whole architecture by running the `cluster-erase.yml` playbook.

`ansible-playbook openstack-erase.yml -i inventory`
