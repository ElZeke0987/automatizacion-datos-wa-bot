# Back-End

Todo el sistema del bot se basa en la comunicacion con la API de WhatsApp Business para recibir mensajes


## API de WhatsApp (eventos, proveedores, webhooks, etc.)

Esta API es la que nos da la posibilidad de hacer que funcione el bot como tal


### Webhooks

Son los lugares a los cuales la API de WhatsApp enviara todos los eventos

#### Definir un webhook para eventos

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

### Eventos

Se envian a un solo webhook generalmente, por ahora hay un solo evento que se necesita para el bot:

#### Mensaje entrante

Al enviar

### Archivos base y proveedores

#### Proveedor base (360dialog)

Esta el archivo [dialogEnds.js](../../src/endpoints/dialogEnds.js) que contiene los endpoints para trabajar con el BSP (Business Solution Provider) que se encontro mas barato y funcional para desarrollo. Ese primeramente sera el proveedor que se usara.

Cobra lo que cobra Meta por el uso de la API y 49 euros mensualmente minimo (depende el plan).

#### Proveedor de Meta

Para poder proseguir desarrollando una forma (mas barata incluso, ya que no cobra suscripcion, solo uso), se necesita seguir los pasos señalados y enviar las peticiones POST para webhooks para ser verificados, en Meta Business Suite. 

El archivo [test.end](../../src/endpoints/testEnd.js) es una version en desarrollo hasta que se proporcione mas acceso al uso de numeros  y entornos de desarrollo.

#### Proveedores auxiliares

En el caso remoto, de que suceda algo con 360dialog, existe la posibilidad de mudarlo a Twilio. La version desarrollada en [twilioEnd](../../src/endpoints/twilioEnd.js) esta desactualizada, pero tecnicamente ahi se alojaria la nueva gestion de la WB API. 

En general, los proveedores comparten mismos procedimientos, asi que no hay mucha diferencia mas que el mismo proveedor.

#### Entornos de desarrollo proporcionados por proveedores

Inicialmente, se desarrolla todo con los sandbox que proporciona cada proveedor. Esto facilita la posterior produccion ya que no se necesita comprar ni suscribirse a nada. Sin embargo, al llegar el momento de comprar el servicio, hay que tener en cuenta que algunos proveedores tienen leves diferencias.

## Bot y NLP

El bot lo que hace principalmente, es tomar un mensaje entrante, y buscar lo que pueda procesar como Nombre de cliente y Localidad alcanzable. Hace uso de la libreria NLP.js por ahora, considerada la mas util y personalizable, ya que se necesitan nombres de personas mas locales, asi mismo con nombres de localidades pequeñas.

### Archivos base

#### nlpMods

[nlpMods.js](../../src/mods/nlpConfs/nlpMods.js) contiene todo lo relacionado con el funcionamiento del NLP en el bot.

##### Setup NLP

Al iniciar el servidor se inicia setupNlp en la funcion [expressServer](../../src/mods/expressServer.js).

Esto prepara al NLP digamos, con el corpus.json y todo lo que debe saber, lo aprende en ese momento.

##### Proccess Step

Ejecutada en [dialogEnds.js](../../src/endpoints/dialogEnds.js) cada que se recibe un mensaje. Engloba todo lo siguiente en este orden:

###### 1: Load NLP

Para empezar a procesar mediante el sistema NLP, se carga el NLP en si.

Esto devuelve un managerNLP o el gestor del NLP en si, que se instalo en el momento del setup.

###### 2: Procesar texto 

En la funcion proccessText() pasas el managerNLP a usar y el texto a procesar, despues de esto, se encarga el paquete de NLP.js para procesarlo.

###### 3: Enviar mensaje

En esta funcion, ya se envia el mensaje de respuesta en la funcion sendMessageD360

#### Corpus.json

El [corpus.json](../../src/mods/nlpConfs/corpus.json) es el contenedor de todos los nombres, localidades y sus posibles respuestas a cada intencion del bot. Es el cerebro o donde se define la naturaleza del mismo. Su memoria digamos o su saber.

