openstack-erase
=========

This role erases everything that was done through openstack-setup and openstack-instance. It destroys every openstack instance and network, security group, rule, project and users that were created previously in order to leave a blank environment.

Requirements
------------

To run this role it is necessary to have Openstack installed and to have used the role openstack-setup