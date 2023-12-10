# Virtualization - devops part 3
- Two versions created
	+ Vagrantfile (only angular Frontend)
	+ cloud-init (FE + flask backend)
- Presentation link: hkck here](ttps://docs.google.com/presentation/d/e/2PACX-1vSVqaP8XMVtBUUquelsYGh8MnFeUUnvyHG6O2XV3KsDRO9CRaNrU34ADdFt8cq0kXRBPIa8PqCZQAwY/pub?start=false&loop=false&delayms=60000)

## Project: Razor Notes on Vagrant
In the scope of the ESSA DevOps Akademija (European Software skills alliance), I created a frontend in Angular for an existing project, Razornotes, which is an app for note taking.

### Scope
The end goal for this project was to run our apps with cloud-init. For the virtualization I used VirtualBox and for the configuration I used Vagrant.

I included two versions of the setup:

- Deployment with Vagrantfile provisioning (only the frontend)
- Deployment with cloud-init

None of the versions use environmental variables by design. The default configuration is used, or hardcoded in the cloud-init.yml file.

- The frontend is accessible on localhost:8083
- The backend is accessible on localhost:5000

In this project, the backend works also as a frontend (written in jinja), since the Angular frontend lacks all the functionalities (due to time constraints). The frontend connects to the api side of the backend.


#### Vagrantfile
Due to the need for some packages to be installed locally per user, Vagrantfile provisioning had troubles executing the commands successfully under the root user. To fix this, I run the provisioning under the `vagrant` user.

This could be achieved by wrapping the lines in a block and running it as the user vagrant, or by setting `privileged: false` in the provisioning definition.

- `./Vagrants/FE_only`

#### Cloud-init
Cloud-init executed the commands with no problems, but the result is all run under the root user, which is not desirable.

- `./Cloud_init/BE_only`
- `./Cloud_init/FE_only`
- `./Cloud_init/Both`

### Usage of authentication
SSH authentication for github is implemented trough private/pubic key. The reporistory is set to public, but git clone is set to use ssh.  
