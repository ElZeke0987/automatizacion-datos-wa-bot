# Front-End

Las paginas de gestion del bot, estan hechas en Next.js.

## Gestor de webhooks

Este sirve para gestionar API-key, URL para el webhook y si estas en entorno sandbox o no.

Es una forma de trabajar mas sutil con el setup de webhooks.

Sin embargo, ten en cuenta que en produccion, esto se hace una vez o las veces que sea necesario volver a usar el webhook.

## Gestor de mensajes (idea)

Por mensaje entrante, se debera guardar por el lapso de 24hs o menos, y luego mostrar en forma de lista, en una pagina.

Esto para gestionar mensajes a ignorar, nombres, localidades, entidades y cosas a tener en cuenta para el bot NLP y estadisticas.

Se podra seleccionar palabras y relacionarlas con entidades e intenciones para agregar en el corpus.json