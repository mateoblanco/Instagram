# Instagram
Angular + Flask + Redis

Manual de Instalación

Requerimientos: 
Redis 4.0.10 
Python 2.7.15rc1 
Flask
Angular 5.2.11 
Angular CLI 1.6.7

1) Iniciar Redis

    a) Ejecutar:
  
    cd redis-4.0.10 src/redis-server
    
    Redis quedará funcionando en el puerto 6379


2) Iniciar app.py

    a) Moverse a la carpeta BD que contiene el proyecto
    
    b) Ejecutar:
    
    python app.py
    
    El archivo quedará funcionando en el puerto 5002


3) Iniciar el proyecto de angular

    a) Moverse a la carpeta BD que contiene el proyecto
  
    b) Ejecutar:
  
      cd Instagram
    
      npm install


    c) Iniciar la aplicacion

    Ejecutar: ng serve
  
    La aplicación quedará funcionando en el puerto 4002
    

4) Para acceder a la aplicación ingresar a:

    http://localhost:4200/

5) Recomendamos utilizar el Usuario 1 y el Usuario 2 en diferentes pestañas para ver como se actualiza el feed y las historias

6) La aplicación ya está lista para usarse

Por defecto las historias se borran a los 15 segundos de haberlas agregado.
Recomendamos que la base de datos está vacía para que no haya inconvenientes.
