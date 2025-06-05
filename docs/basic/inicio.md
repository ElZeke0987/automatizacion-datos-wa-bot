# Requisitos externos al programa o software



## API Key en el Meta Business Suite

1. Vamos a https://developers.facebook.com/
2. Elegimos la app propia del bot de WhatsApp (O la creamos)
3. En el menu lateral izquierdo, en la seccion "Productos", vamos a WhatsApp (o añadimos el mismo producto si no esta)
4. Elegimos el portafolio comercial al que estara enlazado (importante ver a cual enlazaras y tener los permisos, es necesario para el numero de WhatsApp del bot) o seguimos directamente a "Configuracion de la API" si ya hay uno enlazado"
5. Hacemos lo que requiera generar una token de acceso y la copiamos
6. La pegamos en el archivo .env del proyecto, en la variable "GRAPH_API_TOKEN"

La API Key se tendra en cuenta mas que nada al momento de responder

### API Key permanente y temporal

La primera API Key que se puede ver o que mas facil se puede conseguir, es la temporal, usada mas para entornos de desarrollo.

La que servira para produccion es la permanente.

Tener muy en cuenta esto.

## Token de verificacion

Esto se configura en la pagina de la App en la parte del producto de WhatsApp, en la pestaña de "Configuracion" (diferente a "Configuracion de la API" evitar confusion, son dos pestañas diferentes). Este token se encontrara al momento de settear el webhook, y es por cuestiones de seguridad.

Tiene que ser el mismo Token en la pagina de tu App en meta for developers y en el archivo .env (o el software en general, aunque se cambia desde ahi para facilitar configuracion).

La variable en el archivo .env para esta es: WEBHOOK_VERIFY_TOKEN

El token de verificacion se tendra en cuenta mas que nada al momento de verificar e inicializar el webhook

## Numero de WhatsApp vinculado a la API

Siguiendo los pasos puestos en el word de presentacion, este numero ya esta vinculado a la API Key naturalmente (porque al generarla esta el campo para elegir un numero para usarlo)

## Verificacion de seguridad del computador

Puede parecer simple, pero recuerda tener acceso a internet y por sobre todo, espacio de almacenamiento en el computador. 

# Pruebas y construccion

## Pruebas y construccion del frontend

Esto es necesario para visualizar todo lo referente al bot, se debera hacer antes de inicializar el backend o ejecutar "npm run server"

Simplemente se cambia a la carpeta "frontend" con el comando "cd frontend" desde la raiz del proyecto y hay dos opciones de comandos:
    - npm run dev: para desarrollar el backend con los cambios aplicados en vivo o al momento de guardar un archivo.
    - npm run build: para construir la version estatica de la pagina y dejarla lista para ser servida por el servidor.

## Inicializar y enlazar webhook con la API de WhatsApp y nuestro back-end

Con el token de verificacion y un tunel creado en el localhost:3030, vamos a Meta for developers > App del presente bot > Productos > WhatsApp > Configuracion (diferenciar de Configuracion de API) y luego ponemos esos datos en sus correspondientes campos que apareceran ahi (URL del tunel + /webhook-meta y token de verificacion, en ese orden). 

Mandara una peticion que sera gestionada por el endpoint para setup de webhooks en [webhookSetups.js](../../src/mods/D360/webhookSetups.js).


### Suscripcion a servicios

Hay varios servicios a los cuales suscribirse, pero iremos directo al de messages. La opcion de probar no funcionara correctamente para este bot, asi que pruebelo manualmente mandandole mensaje al numero del bot.

## Para pruebas y entornos de desarrollo (generales)

Sigue estos pasos para poder empezar a desarrollar sobre el bot y probarlo correctamente

    1. Vamos a la terminal, y en la raiz del proyecto, ejecutamos "npm run server", esto activara el sistema esencial o parte backend del bot
    2. Necesitamos despues un tunel entre nuestro servidor y el internet, que nos lleva despues a la API, para eso, ejecutamos:
        "ssh -R 80:localhost:3030 serveo.net"
    3. Inicializamos el webhook y lo enlazamos con la API como muestro mas arriba. (Usamos token de acceso a la API temporal)
    4. Pon el numero destinatario correcto y usa el numero de prueba proporcionado por facebook o el que hayas puesto tu (recomendable el proporcionado por facebook asi no se cobran recargos)
    5. Ya esta todo listo para desarrollar y hacer pruebas

## Para produccion

    1. Repetimos los pasos del anterior hasta el 3 con esta leve diferencia en el mismo
    3. Le damos a un usuario del sistema los permisos de la app cuestion, de la/s cuenta/s de WhatsApp Business a utilizar
    4. Generamos la API Key Permanente y le damos  los permisos de "whatsapp_business_messaging" y "read_insights" al momento de crear la nueva Token para ese usuario del sistema. (Manten la API Key guardada apenas te la brinde Facebook)
    5. Cambiamos la variable de entorno en .env "GRAPH_API_TOKEN" por la API Key Permanente nueva
    6. Ya esta todo listo para produccion
