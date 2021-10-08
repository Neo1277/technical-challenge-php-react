# PHP + ReactJS blog #

La aplicación fue desarrollada con el lenguaje de programación PHP, la libreria ReactJS, JWT token y una base de datos MySQL.

## Instalación ##
*   Primero clonar este repositorio en la carpeta del servidor que esten usando, en mi caso este repositorio esta clonado en la carpeta htdocs de xampp (servidor apache) 
*   Segundo iniciar la base de datos MySQL y el servidor apache. Como mencione anteiormente para esta aplicación se utilizo xampp que contiene apache y MySQL los cuales fueron iniciados en este programa.
*   Ahora se debe importar el script para crear la base de datos MySQL, la base de datos se encuentra en el directorio: 
```
technical-challenge-php-react\backend_php\Database\challenge_konecta_group.sql
``` 
*   Para conectar la aplicación a la base de datos se deben modificar las credenciales (usuario, clave, host y base de datos) que se encuentran en el archivo config.php que esta ubicado en el siguiente directorio: 
```
technical-challenge-php-react\backend_php\config.php
``` 
*   Con esto la parte del lado del servidor ya esta instalada.
*   Para instalar la parte del lado del cliente se debe ir al siguiente directorio:
```
technical-challenge-php-react\frontend_reactjs
``` 
*   En este directorio se debe ejecutar el siguiente comando en la consola para instalar las dependencias de ractjs con yarn:
```
yarn install
``` 
*   Para iniciar la aplicación se debe ejecutar el siguiente comando:
```
yarn start
``` 
*   El servidor del lado del cliente se ejecutara en la siguiente url:
```
http://localhost:3000/index
``` 

## Instrucciones de uso ##

*   En el menu de la barra superior se encuentra el boton en la parte superior derecha para iniciar sesión y también para registrarse
*   Al cargar la base de datos se crea también un usuario administrador cuyas credenciales son:
```
email: carla3@gmail.com
password: 12345
``` 
*   Con el anterior usuario puede iniciar sesión como administrador para utilizar los CRUD y asi crear usuarios, ariculos del blog y categorias
*   Para ver el listado de los articulos del blog, se debe ingresar al siguiente enlace o en el boton home en la parte superior izquierda:
```
http://localhost:3000/home
``` 
*   Una vez se haya iniciado sesión como administrador en el dropdown menu que esta en la parte superior derecha estan los botones que llevaran a las paginas que contienen los CRUD.

