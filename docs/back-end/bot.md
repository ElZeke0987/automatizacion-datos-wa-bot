

# Bot y NLP

El bot lo que hace principalmente, es tomar un mensaje entrante, y buscar lo que pueda procesar como Nombre de cliente y Localidad alcanzable. Hace uso de la libreria NLP.js por ahora, considerada la mas util y personalizable, ya que se necesitan nombres de personas mas locales, asi mismo con nombres de localidades pequeñas.

## Archivos base

### nlpMods

[nlpMods.js](../../src/mods/nlpConfs/nlpMods.js) contiene todo lo relacionado con el funcionamiento del NLP en el bot.

#### Setup NLP

Al iniciar el servidor se inicia setupNlp en la funcion [expressServer](../../src/mods/expressServer.js).

Esto prepara al NLP digamos, con el corpus.json y todo lo que debe saber, lo aprende en ese momento.

#### Proccess Step

Ejecutada en [dialogEnds.js](../../src/endpoints/dialogEnds.js) cada que se recibe un mensaje. Engloba todo lo siguiente en este orden:

##### 1: Load NLP

Para empezar a procesar mediante el sistema NLP, se carga el NLP en si.

Esto devuelve un managerNLP o el gestor del NLP en si, que se instalo en el momento del setup.

##### 2: Procesar texto 

En la funcion proccessText() pasas el managerNLP a usar y el texto a procesar, despues de esto, se encarga el paquete de NLP.js para procesarlo.

##### 3: Enviar mensaje

En esta funcion, ya se envia el mensaje de respuesta en la funcion sendMessageD360

### Corpus.json

El [corpus.json](../../src/mods/nlpConfs/corpus.json) es el contenedor de todos los nombres, localidades y sus posibles respuestas a cada intencion del bot. Es el cerebro o donde se define la naturaleza del mismo. Su memoria digamos o su saber.

#### Campos

- Data Objects:

    - Utterances: Son variaciones de un texto que se pueden agregar a un objeto, para que se pueda relacionar con la intencion. Un patron digamos

        - @entities / %entities%: las palabras que pones con esos simbolos al empezar o alrededor, seran formas de ubicar en el patron, palabras que sean parte de alguna lista de palabras o de la lista de Entities. Si pones %nombres%, buscara en la lista de Entities.nombres, una palabra que se relacione con la puesta en el texto original y detectara bien el patron.

    - Intent: El bot reconocera intenciones del mensaje o texto basandose en sus utterances o patrones.

    - Answers: Las respuestas pueden ser unicas por cada objeto o poner mas y que la respuesta a elegir sea random.

        - Autocompletado: al poner {{}} puedes escribir codigo adentro. El entorno de variables puede variar. Pero  hasta ahora, puedes usar el objeto entities que cuenta con las listas de la misma y la entidad detectada en el texto original o patron. Es decir:
            {{entities.nombres.option}}
        Nos dara el nombre detectado en el texto original, ya que detecto el patron del mensaje, lo relaciono, busco la palabra y lo autocompleto en esas corcheas.

- Entities.*: En esta propiedad estan todas las palabras que se puedan relacionar como *. Por ejemplo, si tienes un objeto-lista llamado nombres, adentro habra una propiedad options, donde en forma de propiedad, pondras todas las variaciones del texto para que se pueda reconocer como "nombres". Adentro de la propiedad de cada nombre, habran correcciones o variaciones.Algo asi:
    entities:{
        nombres:{
            options:{
                ["Carolina"]: ["caro","caroina","caroulin"],
                ["Elias"]: ["eli", "eias"]
            }
        }
    }
Esto se puede escalar infinitamente teniendo en cuenta el limite de poder de procesamiento del servidor. El bot naturalmente ya detecta variaciones o cercania a ciertas palabras, como letras cambiadas de lugar y asi. Hay que tener en cuenta que puede detectar dos cosas o mas a la vez sin querer y devolvera una igualmente.
