# Deployment - OpenStack and Kubernetes automation with Ansible

Here we setup our multi-node Kubernetes cluster.
Our architecture is the following: we have a Kubernetes Master node running on the **paas** machine, and multiple Kubernetes worker nodes running inside Openstack instances on the **iaas** machine.

In order to setup our environment, we have several Ansible playbooks that help us automating the process.

## Inventory
The Ansible master node should have the following variables in its environment:
* `LOGIN` : the user that is used on the iaas and paas machines. For example, giovanni.zotta
* `FCC_PRIVATE_KEY` : the file where the private key to access the iaas and paas machines is stored.
* `FCC_PUBLIC_KEY` : the file where the public key related to the private key is stored.

## Openstack configuration
First of all, we need to setup the Openstack environment in which we will spin up several instances that will work as worker nodes of the cluster.  
With the `openstack-setup.yml` playbook, we setup the iaas machine with some basic packages (apt update, python, pip, git) and Openstack with an user (apollo-manager - password apollo), a project (apollo-instances) which has a network, a subnetwork, a router and a security group.

`ansible-playbook openstack-setup.yml -i inventory`

Now that we have a blank sheet where we can spin up as many instances as we want, we have an Ansible playbook that allows us to spin up an Openstack instance running Ubuntu 18.04 LTS with 2GB of RAM. This playbook creates an instance and assigns it a Floating IP. The created instance also allows to connect to it via SSH proxy jump on the iaas machine. Execute the playbook as many times as the number of instances you want. 

`ansible-playbook openstack-spinup.yml -i inventory`

Now we are ready to setup our cluster!

## Kubernetes nodes configuration
On the Master node and on all worker nodes, we need some basic packages. Therefore, we use the roles **common** and **install-worker-nodes** to install all the necessary tools on all our nodes.  
After doing that, on the Master node we play the role **master-init**, which initializes the Kubernetes cluster. We also apply the flannel network plugin. Then, we retrieve the join command which will be run on every worker node, and execute it on every instance after having installed the needed packages.  
Finally, on the worker nodes we need to advertise to the Master node with the floating IP of the corresponding instance in order to be able to receive communications, so we use the role **install-worker-ip** on every node.

Everything is done with a single Ansible playbook.

`ansible-playbook cluster-init.yml -i inventory`

## Erase everything to start from scratch
It is possible to erase the whole architecture by running the `cluster-erase.yml` playbook.

`ansible-playbook cluster-erase.yml -i inventory`
