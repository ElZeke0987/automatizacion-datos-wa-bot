# Front-End

Las paginas de gestion del bot, estan hechas en Next.js.

## Gestor de webhooks
(Solo compatible con 360dialog)

Este sirve para gestionar API-key, URL para el webhook y si estas en entorno sandbox o no.

Es una forma de trabajar mas sutil con el setup de webhooks. Igual, debido a que se usa el propio Meta For Devs para hacer eso desde su web enviando peticiones get para definir el webhook que recibira mensajes. En ese caso, por defecto, es /webhook-meta

Sin embargo, se debe tener en cuenta, que en produccion, esto se hace una vez o las veces que sea necesario volver a usar o cambiar el webhook.

## Gestor de mensajes (idea)

Por mensaje entrante, se debera guardar por el lapso de 24hs o menos, y luego mostrar en forma de lista, en una pagina.

Esto para gestionar mensajes a ignorar, nombres, localidades, entidades y cosas a tener en cuenta para el bot NLP y estadisticas.

Se podra seleccionar palabras y relacionarlas con entidades e intenciones para agregar en el corpus.json 

### Posible guardado de datos

De ser que se use este sistema, temporalmente se deberan guardar unicamente los mensajes mas propensos a ser revisados (quejas, textos que hagan falla con el bot o el mismo no reconozca algo, que requieran nuevas respuestas, etc.). Seran eliminados una vez revisados.