## Prerequisitos
 - npm
 ## Run
```javascript
npm start
```
 ### Overview
 La aplicación de cliente provee los endpoints para la búsqueda de articulos utilizando el middleware, así como también la navegación al detalle de productos: 

  - Home: /items?search=:query
  - Item: /items/:id
  
  Es posible configurar las propiedades de ambiente utilizando el archivo .env en la raiz de la aplicación, para utilizar otros ambientes es necesario manejar el contenido del archivo mendiante scripts de deployment, obteniendo las claves y escribiendo el archivo previo deploy. 
