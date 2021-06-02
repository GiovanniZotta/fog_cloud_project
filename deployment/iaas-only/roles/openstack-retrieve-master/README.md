openstack-retrieve-instances
=========

This role is used to gather information about the instances that Openstack has created.
It puts every floating IP in the current inventory in a group called "instances".

Requirements
------------

To run this role, it is necessary to have some Openstack instances running, which means that openstack-setup and openstack-spinup have to be already done.
Also, it is necessary to have this lines of code in your ~/.ssh/config file in order for the ssh proxy to work:

```
Host iaas
    User giovanni.zotta (the user that will be used on the proxy machine)
    Hostname iaas-07.fcc21.fogx.me (the "proxy" server that is used)
    IdentityFile /home/ubuntu/.ssh/fog/giovanni.zotta@studenti.unitn.it.key (the ssh private key)
```