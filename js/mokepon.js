let ataqueJugador
let ataqueEnemigo
let resultado
let vidasJugador = 3
let vidasEnemigo = 3

function iniciarJuego() {

    let botonMascotaJugador = document.getElementById('boton-mascota')
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    let botonFuego = document.getElementById('boton-fuego')
    botonFuego.addEventListener('click', ataqueFuego)
    let botonAgua = document.getElementById('boton-agua')
    botonAgua.addEventListener('click', ataqueAgua)
    let botonTierra = document.getElementById('boton-tierra')
    botonTierra.addEventListener('click', ataqueTierra)
    let botonReiniciar = document.getElementById('boton-reiniciar')
    botonReiniciar.addEventListener('click', reiniciarJuego)
    let seccionAtaque = document.getElementById("seleccionar-ataque")
    seccionAtaque.style.display = 'none'  //seccionAtaque.hidden = true   
    let seccionReiniciar = document.getElementById("reiniciar")
    seccionReiniciar.style.display = 'none' //seccionReiniciar.hidden = true 
}

/*function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
*/
const aleatorio = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

function seleccionarMascotaJugador() {
    mascotaJugador = ""
    let inputHipodogue = document.getElementById('Hipodogue').checked
    let inputCapipepo = document.getElementById('Capipepo').checked
    let inputRatigueya = document.getElementById('Ratigueya').checked
    let spanMascotaJugador = document.getElementById('mascota-jugador')
    let seccionAtaque = document.getElementById("seleccionar-ataque")
    seccionAtaque.style.display = 'flex'  // seccionAtaque.hidden = false
    let seccionMascota = document.getElementById("selecciona-mascota")
    seccionMascota.style.display = 'none'

    if (inputHipodogue) {//me verifica si Hipodogue esta seleccionado
        spanMascotaJugador.innerHTML = 'Hipodoge' // Le cambio el atributo del lugar donde esta identificado con el id por medio de innerHTM
    } else if (inputCapipepo) {
        spanMascotaJugador.innerHTML = 'Capipepo'
    } else if (inputRatigueya) {
        spanMascotaJugador.innerHTML = 'Ratigueya'
    } else {
        console.log(`No has seleccionado nada!`)
    }
    seleccionarMascotaEnemigo()


}
function seleccionarMascotaEnemigo() {
    mascotaEnemigo = ""
    let spanMascotaEnemigo = document.getElementById('mascota-enemigo')
    let enemigo = 0

    enemigo = aleatorio(1, 3)

    if (enemigo == 1) {//me verifica si Hipodogue esta seleccionado
        spanMascotaEnemigo.innerHTML = 'Hipodoge'
        // Le cambio el atributo del lugar donde esta identificado con el id por medio de innerHTML
    } else if (enemigo == 2) {
        spanMascotaEnemigo.innerHTML = 'Capipepo'
    } else if (enemigo == 3) {
        spanMascotaEnemigo.innerHTML = 'Ratigueya'
    } else {
        console.log(`Error de selección!`)
    }
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

    let inputVidasJugador = document.getElementById('vidas-jugador')
    let inputVidasEnemigo = document.getElementById('vidas-enemigo')


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
    let sectionMensajes = document.getElementById("resultado")
    let ataquesDelJugador = document.getElementById("ataquesDelJugador")
    let ataquesDelEnemigo = document.getElementById("ataquesDelEnemigo")

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
    let sectionMensajes = document.getElementById("resultado")
    sectionMensajes.innerHTML = resultadoFinal

    let botonFuego = document.getElementById('boton-fuego')
    botonFuego.disabled = true
    let botonAgua = document.getElementById('boton-agua')
    botonAgua.disabled = true
    let botonTierra = document.getElementById('boton-tierra')
    botonTierra.disabled = true
    let seccionReiniciar = document.getElementById("reiniciar")
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