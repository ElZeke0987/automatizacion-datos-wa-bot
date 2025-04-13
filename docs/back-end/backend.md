[Go back](../index.md)

[Bot Docs](./bot.md)
[API WhatsApp Docs](./api-whatsapp.md)

# Back-End

Todo el sistema del bot se basa en la comunicacion con la API de WhatsApp Business para recibir mensajes

## Iniciar servidor

Simplemente, desde "D:\@ARCHIVOS_USUARIO@\Desktop\Automatizaciones\Automatizacion-Datos>" en la terminal, ponemos: npm run server.

Tardara unos segundo y se iniciara.

## Devolver front-end

El back-end tiene end-points para devolver paginas front-end estaticas. No se vera necesario por el momento el uso de Next.js dinamico.

### Construir front-end

Desde "D:\@ARCHIVOS_USUARIO@\Desktop\Automatizaciones\Automatizacion-Datos\frontend>" ejecutamos: "npm run build:static" eso devolvera en la carpeta .next, una carpeta out, con la pagina estatica.

## Inicio de sesion 

Es vital para mantener la seguridad del CRM y los datos de los clientes.

## Envio de datos a otro CRM

Al terminar de procesar el mensaje y obtener los datos necesarios de la conversacion(nombre y localidad), se enviaran mediante un fetch a otro CRM. 
