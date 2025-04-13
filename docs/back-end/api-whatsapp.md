# API de WhatsApp (eventos, proveedores, webhooks, etc.)

Esta API es la que nos da la posibilidad de hacer que funcione el bot como tal


## Webhooks

Son los lugares a los cuales la API de WhatsApp enviara todos los eventos

### Definir un webhook para eventos

El endpoint "/api/set-webhook-d360" es el encargado de gestionar webooks para 360dialog, ya que usa un link especial. Es una llamada a la API de 360dialog que procesa tu webhook y lo "engancha" con la API de WhatsApp Business.

Necesita datos como:

- API_KEY
- URL del Webhook escuchador de eventos

Hay que tener en cuenta, que es diferente el link al que se hace la peticion para hacer POST del webhook:

- Puede ser para 360dialog
    - Puede ser para uso de produccion o el link cuando ya estas suscrito a 360dialog
    - Puede ser para uso del sandbox u entorno de desarrollo
- Puede ser para la aplicacion oficial de Meta
    - Sigue en desarrollo e investigacion

### Links para POST de Webhooks

Para hacer que el webhook sea usado en entorno de desarrollo, pides una API-key al numero de 360dialog sandbox. La cual usaras para hacer fetch a este link, con tu URL.

peticion:
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "D360-API-KEY": body.API_KEY,
        },
        body:  JSON.stringify({
            "url":  body.newUrl,
        })
    }
Link al cual Postear si quieres usar el sandbox:
    https://waba-sandbox.360dialog.io/v1/configs/webhook

Tienes que devolver 200 OK despues de enviar esa peticion, y luego podras recibir eventos por ese webhook. Eventos ejecutados desde el numero de 360dialog sandbox.

Para poder usar un numero real, te daran una API-key cuando compres el servicio de 360dialog y esa usaras en vez de la API-key del sandbox.

Lo que puedes cambiar del cuerpo, es que puedes poner seguridad: 
    body:  JSON.stringify({
        "url":  newUrlObject.href,
        "headers": {
            "Authorization": "Basic fj76HjfjF88HjuY7",
        }
    })
Link al cual Postear si quieres usar ya en entornos de produccion:
    https://waba.360dialog.io/v1/configs/webhook

## Eventos

Se envian a un solo webhook generalmente, por ahora hay un solo evento que se necesita para el bot, que es el mensaje entrante.

Al enviar un mensaje al bot, se ejecuta este evento, que envia informacion vital del mensaje, como numero y texto del mensaje.

## Archivos base y proveedores

### Proveedor base (360dialog)

Esta el archivo [dialogEnds.js](../../src/endpoints/dialogEnds.js) que contiene los endpoints para trabajar con el BSP (Business Solution Provider) que se encontro mas barato y funcional para desarrollo. Ese primeramente sera el proveedor que se usara.

Cobra lo que cobra Meta por el uso de la API y 49 euros mensualmente minimo (depende el plan).

### Proveedor de Meta

Para poder proseguir desarrollando una forma (mas barata incluso, ya que no cobra suscripcion, solo uso), se necesita seguir los pasos señalados y enviar las peticiones POST para webhooks para ser verificados, en Meta Business Suite. 

El archivo [test.end](../../src/endpoints/testEnd.js) es una version en desarrollo hasta que se proporcione mas acceso al uso de numeros  y entornos de desarrollo.

### Proveedores auxiliares

En el caso remoto, de que suceda algo con 360dialog, existe la posibilidad de mudarlo a Twilio. La version desarrollada en [twilioEnd](../../src/endpoints/twilioEnd.js) esta desactualizada, pero tecnicamente ahi se alojaria la nueva gestion de la WB API. 

En general, los proveedores comparten mismos procedimientos, asi que no hay mucha diferencia mas que el mismo proveedor.

### Entornos de desarrollo proporcionados por proveedores

Inicialmente, se desarrolla todo con los sandbox que proporciona cada proveedor. Esto facilita la posterior produccion ya que no se necesita comprar ni suscribirse a nada. Sin embargo, al llegar el momento de comprar el servicio, hay que tener en cuenta que algunos proveedores tienen leves diferencias.

## Envio de mensajes

En [dialogEnds](../../src/endpoints/dialogEnds.js), la funcion sendMessageD360, es la que hace uso de otro link para postear tu mensaje de respuesta.

    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "D360-API-KEY": getSandboxKey(),//Se obtiene la API-key guardada
        },
        body: JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": numberTo,
            "type": "text",
            "text": {
                "body": msg
            }
        })
    }

Al link: https://waba-sandbox.360dialog.io/v1/messages