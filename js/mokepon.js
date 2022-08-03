//lo primero es trae todas las variables donde extraemos informacion del HTML al inicio, para no repetir variables en as diferentes funciones
const botonReiniciar = document.getElementById('boton-reiniciar')
const seccionAtaque = document.getElementById("seleccionar-ataque")
const seccionReiniciar = document.getElementById("reiniciar")

const botonMascotaJugador = document.getElementById('boton-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')
const seccionMascota = document.getElementById("selecciona-mascota")
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById("resultado")
const ataquesDelJugador = document.getElementById("ataquesDelJugador")
const ataquesDelEnemigo = document.getElementById("ataquesDelEnemigo")
const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")

const sectionVerMapa = document.getElementById("verMapa")
const mapa = document.getElementById('mapa')


let mokepones = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotaJugador
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego
let botonAgua
let botonTierra
let botones = []
let indexAtaqueJugador = []
let indexAtaqueenemigo = []
let victoriasJugador = 0
let victoriasEnemigo = 0
let lienzo = mapa.getContext('2d')
let intervalo

//creamos la clase mokepon, la cual nos servirá como template para crear cada uno de los objetos mokepon.
class Mokepon {
    constructor(nombre, foto, vida) {   //con constructor, creamos las propiedades que tendra cada mokeopon por defecto
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.x = 20
        this.y = 30
        this.ancho = 80
        this.alto = 80
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto
        this.velocidadX = 0
        this.velocidadY = 0
    }
}

//a continuación creamos cada mokepon a partir de la clase con new.
let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5)
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5)
let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5)

//por medio de push agregamos los ataques que tendra cada mokepon.
hipodoge.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' },
)
capipepo.ataques.push(
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
)
ratigueya.ataques.push(
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' },
)
mokepones.push(hipodoge, capipepo, ratigueya)


/*function botonesOn(boton) {

    let selector = document.getElementById(boton.prop, boton[prop])
    selector.addEventListener('click', seleccionarMascotaJugador)

}*/

function iniciarJuego() {
    /*
        const botones = { 'boton- mascota': seleccionarMascotaJugador, 'boton-fuego': ataqueFuego, 'boton-agua': ataqueAgua, 'boton-tierra': ataqueTierra, 'boton-reiniciar': reiniciarJuego }
    
        for (const prop in botones) {
            botones(botones)
    */
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    botonReiniciar.addEventListener('click', reiniciarJuego)

    //oculto inicialmente la seccion de ataque para que aparezca solo despues de seleccionar el mokepon
    seccionAtaque.style.display = 'none'  //seccionAtaque.hidden = true   
    sectionVerMapa.style.display = 'none'
    seccionReiniciar.style.display = 'none' //seccionReiniciar.hidden = true 

    mokepones.forEach((mokepon) => {    //por cada uno de los elementos en el arreglo mokepones, haga esto. 
        opcionDeMokepones = `<input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>`
        // creo la tarjeta de cada mokepon con su boton de seleccion, nombre e imagen

        contenedorTarjetas.innerHTML += opcionDeMokepones //creo cada uno de las tarjetas y las imprimo una despues de la otra, de lo contrario solo me queda la última
    })
    inputHipodoge = document.getElementById('Hipodoge')
    inputCapipepo = document.getElementById('Capipepo')
    inputRatigueya = document.getElementById('Ratigueya')
    //una vez creadas las tarjetas como elementos HTML, traigo el elemnto HTML de cada mokepon por el id
}

/*function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
*/
const aleatorio = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

function seleccionarMascotaJugador() {
    //muestro la seccion ataque una vez presiono el boton seleccionar y a su vez oculto la seccion de mostrar mokepones
    seccionMascota.style.display = 'none'

    //seccionAtaque.style.display = 'flex'  // seccionAtaque.hidden = false

    sectionVerMapa.style.display = 'flex'

    iniciarMapa()

    if (inputHipodoge.checked) {//me verifica si Hipodogee esta seleccionado
        spanMascotaJugador.innerHTML = inputHipodoge.id // Le cambio el atributo del lugar donde esta identificado en HTML con el id por medio de innerHTML
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else {
        console.log(`No has seleccionado nada!`)
    }
    extraerAtaques(mascotaJugador) //agreo los ataques una vez seleccione Mokepon
    seleccionarMascotaEnemigo()//corro la funcion aleatoria para seleccionar segundo Mokepon. 
}
function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) { //recorro la matriz de mokepones
        if (mascotaJugador === mokepones[i].nombre) { //cuando encuentre el valor en la matriz del mokepon seleccionado
            ataques = mokepones[i].ataques //asigno a la variable ataques los ataques del mokepon seleccionado
        }
    }
    mostrarAtaques(ataques) //Muestro los ataques(en botones) del mokepon seleccionado
}

function mostrarAtaques(atak) {
    atak.forEach((i) => { // para cada elemento i de la matriz atak(seria la matriz ataques)
        ataquesMokepon = `<button id=${i.id} class="boton-de-ataque BAtaque">${i.nombre}</button>` //inserto cada boton de ataque
        contenedorAtaques.innerHTML += ataquesMokepon //para que aparezcan todos los botones a medida que recorro la matriz y no solo el último
    })
    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')
    botones = document.querySelectorAll('.BAtaque') //selecciono todos los elementos que contengan BAtaque, esta se encentra en la clase de cada boton de ataque y los agrego al arreglo de la variable botones importante el "." para buscar la clase odnde se encuentra BAtaque

    /*botonFuego.addEventListener('click', ataqueFuego) // ya no la necesitamos
    botonAgua.addEventListener('click', ataqueAgua)
    botonTierra.addEventListener('click', ataqueTierra)*/ //le agrego una funcion a los botones cada vez que presione click en cada ataque.
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        //para averiguar que informacion me trae el boton y poder saber a que direccion apunto el evento
        /*boton.addEventListener('click', (e) => {
        console.log(e)
        })*/
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            } else if (e.target.textContent === '💧') {
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            } else {
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }
            ataqueAleatorio()
        })

    })
}

function seleccionarMascotaEnemigo() {
    let enemigo = aleatorio(0, mokepones.length - 1)
    spanMascotaEnemigo.innerHTML = mokepones[enemigo].nombre
    ataquesMokeponEnemigo = mokepones[enemigo].ataques
    secuenciaAtaque()
}


function ataqueAleatorio() {
    let ataqueMalo = aleatorio(0, ataquesMokeponEnemigo.length - 1)

    if (ataqueMalo == 0 || ataqueMalo == 1) {
        ataqueEnemigo.push('FUEGO')
    } else if (ataqueMalo == 3 || ataqueMalo == 4) {
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate()
    }
}

/*function reiniciarJuego() {
    location.reload()
}*/
const reiniciarJuego = () => location.reload()

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueenemigo = ataqueEnemigo[enemigo]
}

function combate() {

    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index)
            crearMensaje('EMPATEE ⚔')
        } else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA' || ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'FUEGO' || ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA') {
            indexAmbosOponentes(index, index)
            crearMensaje('GANASTEEE🥳')
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponentes(index, index)
            crearMensaje('PERDISTE 🤣')
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }
    revisarVida()
}
function crearMensaje(resultado) {

    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueenemigo

    //let parrafo = document.createElement('p')
    //parrafo.innerHTML = `Tu mascota ataco con ${ataqueJugador}, la mascota del enemigo ataco con ${ataqueEnemigo} - ${resultado}`

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}
function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal
    seccionReiniciar.style.display = 'block'  //seccionReiniciar.hidden = false

}
/*
function ataqueFuego() {
    ataqueJugador = 'FUEGO'
    ataqueAleatorio()
}
function ataqueAgua() {
    ataqueJugador = 'AGUA'
    ataqueAleatorio()

}
function ataqueTierra() {
    ataqueJugador = 'TIERRA'
    ataqueAleatorio()

}*/
function revisarVida() {
    if (victoriasJugador == victoriasEnemigo) {
        crearMensajeFinal(`Esto fue un empate ⚔`)
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal(`Felicitaciones, GANASTE 🥳`)
    } else {
        crearMensajeFinal(`Lo siento, Perdiste 🤕`)
    }
}

function pintarPersonaje() {
    capipepo.x += capipepo.velocidadX
    capipepo.y += capipepo.velocidadY

    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    //funcion de insertar imagen en unas cordenadas con unas dimensiones.
    lienzo.drawImage(
        capipepo.mapaFoto,
        capipepo.x,
        capipepo.y,
        capipepo.ancho,
        capipepo.alto
    )
    //lienzo.fillrect(5,15,20,40) // pruebo que pueda dibijar en el canvas credo un rectangulo.
    //et imagenCapipepo = new Image() // por medio de la clase Image creamos una mueva imgen
    //imagenCapipepo.src = capipepo.foto //ponemos la ruta de la ubicacion de capipepo
}

function moverDer() {
    capipepo.velocidadX = 5
    //capipepo.x += 5
    // pintarPersonaje()
}
function moverIzq() {
    capipepo.velocidadX = -5
    //  capipepo.x -= 5
    // pintarPersonaje()

} function moverAba() {
    capipepo.velocidadY = 5
    //   capipepo.y += 5
    // pintarPersonaje()

} function moverArr() {
    capipepo.velocidadY = -5
    //  capipepo.y -= 5
    // pintarPersonaje()
}

function detenerMovimiento() {
    capipepo.velocidadX = 0
    capipepo.velocidadY = 0
}

function presionoTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArr()
            break
        case 'ArrowDown':
            moverAba()
            break
        case 'ArrowLeft':
            moverIzq()
            break
        case 'ArrowRight':
            moverDer()
            break
        default:
            break
    }
}

function iniciarMapa(){

intervalo = setInterval(pintarPersonaje, 50) // ejecuto una fncion cada 50ms
window.addEventListener('keydown', presionoTecla)
window.addEventListener('keyup', detenerMovimiento)
}

window.addEventListener('load', iniciarJuego)   // Me dice que cargue el script cuando cargue toda la pagina 