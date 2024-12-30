# Coally Fullstack code challenge
## Por Samuel Flores 

### Sistema de registro de tareas. 
### Desarrollado siguiendo las mejores prácticas, se creó un servicio que registra, lista, modifica y elimina tareas. El código esta pensado aplicando ejemplos de herencia, polimorfismo y encapsulamiento. 

### Estructura del proyecto

```
coally_FullStack_Code_Test
├─ README.md
└─ backend
   ├─ .env
   ├─ .env.example
   ├─ REST client
   │  ├─ auth.rest
   │  └─ tasks.rest
   ├─ app.js
   ├─ cypress
   │  ├─ downloads
   │  ├─ e2e
   │  │  ├─ 00 auth.cy.js
   │  │  └─ constants
   │  │     └─ index.cy.js
   │  ├─ fixtures
   │  │  └─ example.json
   │  ├─ imports
   │  │  └─ user.js
   │  ├─ screenshots
   │  └─ support
   │     ├─ commands.js
   │     └─ e2e.js
   ├─ cypress.config.js
   ├─ package-lock.json
   ├─ package.json
   └─ src
      ├─ Middleware
      │  ├─ SessionMiddleware.js
      │  └─ validationErrorHandler.js
      ├─ Models
      │  ├─ Task.js
      │  └─ User.js
      ├─ Services
      │  ├─ task.js
      │  └─ user.js
      ├─ config
      │  ├─ constants.js
      │  ├─ database.js
      │  └─ swagger.js
      ├─ docs
      │  ├─ routes
      │  │  ├─ auth.yml
      │  │  └─ tasks.yml
      │  └─ swagger.yml
      ├─ libs
      │  ├─ Auth.js
      │  ├─ Encrypt.js
      │  ├─ Jwt.js
      │  └─ responses.js
      ├─ representations
      │  ├─ auth
      │  │  ├─ auth_controller.js
      │  │  ├─ auth_routes.js
      │  │  └─ auth_validator.js
      │  └─ tasks
      │     ├─ task_parser.js
      │     ├─ tasks_controller.js
      │     ├─ tasks_routes.js
      │     └─ tasks_validator.js
      └─ routes.js

```

## Backend 

### En la carpeta backend/src se encuentra la carpeta representations que incorpora todas las funcionalidades de la api, y las clases están en libs (Auth y responses, Encrypt...) desarrolladas para implementar la lógica del desafío.
### En la raiz de la carpeta backend se encuentra el archivo de configuración de express (app.js). 
### La conexión a la base de datos se realiza a través de mongodb, debe setear la url según el ejemplo de .env.example.
#### https://mongoosejs.com/

#### REST Client: Endpoints de la api listos para ejecutarse utlizando la extensión de vscode "REST CLIENT": https://marketplace.visualstudio.com/items?itemName=humao.rest-client.

#### Es importante tener node en su versión lts(v22).
#### Express (https://www.npmjs.com/package/express).

### Instalación Backend

1. Ingresar a la carpeta del backend
> $ cd backend

2. Instalar dependencias:
> $ npm install

3. Crear un archivo .env para las variables de entorno, copiar los ejemplos que se encuentran en el archivo .env.example. Y setear la url de su base de datos.
> $ cp .env.example .env

4. Ejecutar proyecto:
> $ npm start

### tests
#### Para las pruebas e2e se utiliza cypress, que integra mocha y chai. Para ejecutarlas es necesario que este corriendo la aplicación. Al ejecutarse se registra un usuario, para correr nuevamente las pruebas se debe eliminar el usuario creado desde la bd o modificar las constantes en el archivo ./cypress/imports/user.js.
#### https://docs.cypress.io/app/get-started/why-cypress

1. Ingresar a la carpeta del backend
> $ cd backend

2. Ejecutar tests:
> $ npm run test

### El usuaio registrado es:
#### username: test1
#### password: Test123*

### SWAGGER
#### Api Swagger: http://localhost:{port}/docs

