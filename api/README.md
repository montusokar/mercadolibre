
# Node.js Express middleware

## Prerequisitos
 - npm
 - nodeJS
 ## Run
```javascript
npm start
```
 ### Overview
 El servidor que actúa como middleware se encarga de la comunicación entre la aplicación del cliente y la API de mercadolibre, provee dos endpoints para la comunicación: 

  - Search: /api/items?q=query&limit=n
  - Item: /api/items/itemID
  
  Es posible configurar las propiedades de ambiente utilizando los archivos bajo el directorio config, para utilizar otros ambientes es necesario exportar el ambiente antes de iniciar la aplicacion, es importante mencionar que las propiedades de configuración no deberían contener secretos o información sensible, estos parametros deben ser vaulteados y resueltos a la hora de deployar la aplicación. 

```javascript
export NODE_ENV=development
```
