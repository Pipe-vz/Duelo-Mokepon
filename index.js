const express = require("express")  //funcion especial de node JS que nos permite usar las librerias que instalamos con npm. {importamos express js para usarlo en nuestro proyecto}.

const app = express()// comienzo a crear una aplicacion almacenada en una variable y se crea una copia del servidor que estoy utilizando.{creamos una app con express js}

app.get("/", (req, res) => {
    res.send('hola')
}) // cada vez que un cliente solicte un recurso (get) haz algo. primero tengo que indicarle en que url va a solicitar ese recurso y segundo como procesamos la solicitud y como respondemos.(res) objeto que permite manejar las respuestas hacia el usuario.(req) es la peticion.{le decimos a express js que cuando en la url raiz reciba una peticion responda 'Hola'}

app.listen(8080, () => {
    console.log('servidor funcionando') 
}) // permite iniciar el servidor para que escuche al usuario . {decimos que escuche continuamente en el puerto 8080 las peticiones de los clientes para que todo el tiempo pueda respondarle.}