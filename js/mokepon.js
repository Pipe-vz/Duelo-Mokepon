//lo primero es trae todas las variables donde extraemos informacion del HTML al inicio, para no repetir variables en as diferentes funciones
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
const contenedorAtaques = document.getElementById("contenedorAtaques")

let mokepones = []
let ataqueJugador
let ataqueEnemigo
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotaJugador
let ataquesMokepon
let botonFuego
let botonAgua
let botonTierra
let botones = []
let vidasJugador = 3
let vidasEnemigo = 3

//creamos la clase mokepon, la cual nos servirá como template para crear cada uno de los objetos mokepon.
class Mokepon {
    constructor(nombre, foto, vida) {   //con constructor, creamos las propiedades que tendra cada mokeopon por defecto
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
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
    //muestro la seccion ataque una vez presiono el boton seleccionar y a su vez oculto la seccion de mostrar mokepones
    seccionAtaque.style.display = 'flex'  // seccionAtaque.hidden = false
    seccionMascota.style.display = 'none'

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
    botones = document.querySelectorAll('BAtaque') //selecciono todos los elementos que contengan BAtaque, esta se encentra en la clase de cada boton de ataque y los agrego al arreglo de la variable botones

    botonFuego.addEventListener('click', ataqueFuego)
    botonAgua.addEventListener('click', ataqueAgua)
    botonTierra.addEventListener('click', ataqueTierra) //le agrego una funcion a los botones cada vez que presione click en cada ataque.
}

function secuenciaAtaque(){
    
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