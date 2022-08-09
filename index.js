const express = require("express")  //funcion especial de node JS que nos permite usar las librerias que instalamos con npm. {importamos express js para usarlo en nuestro proyecto}.

const cors = require("cors")// cargo la libreria cors

const app = express()// comienzo a crear una aplicacion almacenada en una variable y se crea una copia del servidor que estoy utilizando.{creamos una app con express js}

app.use(cors()) // ejecuto la libreria corse para que no sigan apareciendo errores de corse
app.use(express.json())    // habiito capacidad de recibir peticiones tipo post, con contenido en formato jason.

const jugadores = []
class Jugador {
    constructor(id) {
        this.id = id
    }
    asignarMokepon(mokepon) {
        this.mokepon = mokepon
    }
    actualizarPosicion(x, y) {
        this.x = x
        this.y = y
    }
}

class Mokepon {
    constructor(nombre) {
        this.nombre = nombre
    }
}

app.get("/unirse", (req, res) => {
    const id = `${Math.random()}`
    const jugador = new Jugador(id)
    jugadores.push(jugador)

    //res.setHeader('Access-Control-Allow-Origin', '*') // decirle desde que origen vamos a permitir que se haan peticiones hacia nuestro servidor, en este caso todos los origenes que normalmente es inseguro

    res.send(id)
}) // cada vez que un cliente solicte un recurso (get) haz algo. primero tengo que indicarle en que url va a solicitar ese recurso y segundo como procesamos la solicitud y como respondemos.(res) objeto que permite manejar las respuestas hacia el usuario.(req) es la peticion.{le decimos a express js que cuando en la url raiz reciba una peticion responda 'Hola'}

app.post("/mokepon/:jugadorId", (req, res) => { // coloco una variable en la url que se realiza por medio de ":"
    const jugadorId = req.params.jugadorId || "" //se extrae el valor de la solicitud, trae el valor del id que se envio en la url, y si no, un valor vacio por defecto.
    const nombre = req.body.mokepon || ""
    const mokepon = new Mokepon(nombre) //Mokepon que le voy a asignar al usuario
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id) // busco al jugador con el id en la lista de jugadores
    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarMokepon(mokepon)
    }
    console.log(jugadores)
    console.log(jugadorId)
    res.end()   //siempre debemos responder con algo, en este caso respondemos con un dato vacio 
})

app.post("/mokepon/:jugadorId/posicion", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarPosicion(x, y)
    }
    const enemigos = jugadores.filter((jugador)=> jugadorId !== jugador.id)

    res.send({ // con espress no puedo enviar una lista, debo enviar un json, entonces lo envío como json
        enemigos
    })
})

app.listen(8080, () => {
    console.log('servidor funcionando')
}) // permite iniciar el servidor para que escuche al usuario . {decimos que escuche continuamente en el puerto 8080 las peticiones de los clientes para que todo el tiempo pueda respondarle.}