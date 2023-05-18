# Instructions

1.cd auth

2.Run command docker compose up

3.open another terminal & run docker ps

The above command will list out all the running docker

4.  copy the name which has been created at your end for backend, most likely this it will be auth-backend-1

5.  run command docker exec -it <copied-name> sh

you will be in terminal of backend

6. run php artisan migrate

7. now you can start using front-end from localhost:3000

## note the api response may take some time as docker is running a development server, please bear with it.
