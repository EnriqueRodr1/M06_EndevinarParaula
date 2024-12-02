// Variables globals
let paraulaSecreta = "";
let intents = 10;
let punts = 0;
let puntuacioMaxima = 0;
let paraulaMostrada = [];
let partidesGuanyades = 0;
let totalPartides = 0;

// Funció per començar la partida
document.getElementById("comencar-partida").addEventListener("click", function() {
    const input = document.getElementById("paraula-secreta").value;
    const errorMessage = validarParaula(input);

    if (errorMessage) {
        alert(errorMessage);
    } else {
        paraulaSecreta = input.toLowerCase();
        paraulaMostrada = Array(paraulaSecreta.length).fill("_");
        document.getElementById("paraula-mostrada").innerText = paraulaMostrada.join(" ");
        deshabilitarEntrada();
        crearBotonsLletres();
    }
});

// Funció per validar la paraula introduïda
function validarParaula(paraula) {
    if (!paraula) return "Has d’afegir una paraula per començar a jugar";
    if (paraula.length < 4) return "La paraula ha de contenir més de 3 caràcters";
    if (/\d/.test(paraula)) return "La paraula no pot contenir números";
    return null;
}

// Funció per deshabilitar l’entrada
function deshabilitarEntrada() {
    document.getElementById("paraula-secreta").disabled = true;
    document.getElementById("comencar-partida").disabled = true;
}

// Funció per crear els botons de lletres
function crearBotonsLletres() {
    const botonsContainer = document.getElementById("botons-lletres");
    botonsContainer.innerHTML = ""; // Neteja qualsevol lletra anterior

    for (let i = 65; i <= 90; i++) {
        let lletra = String.fromCharCode(i);
        let boto = document.createElement("button");
        boto.innerText = lletra;
        boto.addEventListener("click", () => seleccionarLletra(lletra));
        botonsContainer.appendChild(boto);
    }
}

// Funció quan es selecciona una lletra
function seleccionarLletra(lletra) {
    let encertat = false;

    paraulaSecreta.split("").forEach((caracter, index) => {
        if (caracter === lletra.toLowerCase()) {
            paraulaMostrada[index] = lletra;
            encertat = true;
        }
    });

    document.getElementById("paraula-mostrada").innerText = paraulaMostrada.join(" ");
    
    if (encertat) {
        punts++;
        // Sumar punts extra en cas d’encerts successius i múltiples
    } else {
        intents--;
        canviarImatgePenjat();
    }

    verificarEstatPartida();
}

// Funció per verificar si s’ha guanyat o perdut
function verificarEstatPartida() {
    if (!paraulaMostrada.includes("_")) {
        partidesGuanyades++;
        punts += 10; // Exemple de puntació guanyadora
        totalPartides++;
        guardarPuntuacioMaxima();
        reiniciarPartida("Has ganado!");
    } else if (intents === 0) {
        totalPartides++;
        reiniciarPartida("Has perdido! La palabra era: " + paraulaSecreta);
    }
}

// Funció per reiniciar la partida
function reiniciarPartida(missatge) {
    alert(missatge);
    document.getElementById("paraula-secreta").disabled = false;
    document.getElementById("comencar-partida").disabled = false;
    document.getElementById("botons-lletres").innerHTML = "";
    punts = 0;
    intents = 10;
}

// Guardar la puntuació màxima en el localStorage
function guardarPuntuacioMaxima() {
    if (punts > puntuacioMaxima) {
        puntuacioMaxima = punts;
        localStorage.setItem("puntuacioMaxima", JSON.stringify({
            punts: puntuacioMaxima,
            data: new Date().toLocaleString()
        }));
    }
}

// Funció per mostrar o ocultar la paraula secreta
document.getElementById("toggle-password").addEventListener("click", function() {
    const passwordField = document.getElementById("paraula-secreta");
    if (passwordField.type === "password") {
        passwordField.type = "text"; // Mostrar la paraula
    } else {
        passwordField.type = "password"; // Tornar a ocultar la paraula
    }
});
