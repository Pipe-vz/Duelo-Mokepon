const botonFuego = document.getElementById('boton-fuego')
const botonAgua = document.getElementById('boton-agua')
const botonTierra = document.getElementById('boton-tierra')
const botonReiniciar = document.getElementById('boton-reiniciar')
const seccionAtaque = document.getElementById("seleccionar-ataque")
const seccionReiniciar = document.getElementById("reiniciar")

const botonMascotaJugador = document.getElementById('boton-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')
const seccionMascota = document.getElementById("selecciona-mascota")
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const inputVidasJugador = document.getElementById('vidas-jugador')
const inputVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById("resultado")
const ataquesDelJugador = document.getElementById("ataquesDelJugador")
const ataquesDelEnemigo = document.getElementById("ataquesDelEnemigo")
const contenedorTarjetas = document.getElementById("contenedorTarjetas")

let mokepones = []
let ataqueJugador
let ataqueEnemigo
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let resultado
let vidasJugador = 3
let vidasEnemigo = 3


class Mokepon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5)
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5)
let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5)

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

    /*mokepones.forEach(mokepon) => {
        console.log(mokepon)
    }*/

    botonFuego.addEventListener('click', ataqueFuego)
    botonAgua.addEventListener('click', ataqueAgua)
    botonTierra.addEventListener('click', ataqueTierra)
    botonReiniciar.addEventListener('click', reiniciarJuego)

    seccionAtaque.style.display = 'none'  //seccionAtaque.hidden = true   
    seccionReiniciar.style.display = 'none' //seccionReiniciar.hidden = true 

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `<input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>`

        contenedorTarjetas.innerHTML += opcionDeMokepones

        inputHipodoge = document.getElementById('Hipodoge')
        inputCapipepo = document.getElementById('Capipepo')
        inputRatigueya = document.getElementById('Ratigueya')
    }) //por cada uno de los elementos en el arreglo mokepones, haga esto. 
}

/*function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
*/
const aleatorio = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

function seleccionarMascotaJugador() {
    mascotaJugador = ""
    seccionAtaque.style.display = 'flex'  // seccionAtaque.hidden = false
    seccionMascota.style.display = 'none'

    if (inputHipodoge.checked) {//me verifica si Hipodogee esta seleccionado
        spanMascotaJugador.innerHTML = inputHipodoge.id // Le cambio el atributo del lugar donde esta identificado con el id por medio de innerHTM
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
    } else {
        console.log(`No has seleccionado nada!`)
    }
    seleccionarMascotaEnemigo()
}

function seleccionarMascotaEnemigo() {
    let enemigo = aleatorio(0, mokepones.length - 1)
    spanMascotaEnemigo.innerHTML = mokepones[enemigo].nombre
}
function ataqueAleatorio() {
    let ataqueMalo = aleatorio(1, 3)

    if (ataqueMalo == 1) {
        ataqueEnemigo = 'FUEGO'
    } else if (ataqueMalo == 2) {
        ataqueEnemigo = 'AGUA'
    } else if (ataqueMalo == 3) {
        ataqueEnemigo = 'TIERRA'
    } else {
        console.log(`Error de selección!`)
    }
    combate()
}
/*function reiniciarJuego() {
    location.reload()
}*/
const reiniciarJuego = () => location.reload()

function combate() {

    if (ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA' || ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO' || ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA') {
        crearMensaje('GANASTEEE🥳')
        vidasEnemigo--
        inputVidasEnemigo.innerHTML = vidasEnemigo
    } else if (ataqueJugador == ataqueEnemigo) {
        crearMensaje('EMPATEE ⚔')
    } else {
        crearMensaje('PERDISTE 🤣')
        vidasJugador--
        inputVidasJugador.innerHTML = vidasJugador
    }
    revisarVida()
}
function crearMensaje(resultado) {

    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo

    //let parrafo = document.createElement('p')
    //parrafo.innerHTML = `Tu mascota ataco con ${ataqueJugador}, la mascota del enemigo ataco con ${ataqueEnemigo} - ${resultado}`

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}
function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal

    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true
    seccionReiniciar.style.display = 'block'  //seccionReiniciar.hidden = false

}
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

}
function revisarVida() {
    if (vidasJugador == 0) {
        crearMensajeFinal(`lo siento, Perdiste`)
    } else if (vidasEnemigo == 0) {
        crearMensajeFinal(`Felicitaciones, GANASTEEEE`)
    }
}

window.addEventListener('load', iniciarJuego)   // Me dice que cargue el script cuando cargue toda la pagina 