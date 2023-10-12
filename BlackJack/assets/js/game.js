/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

let puntosJugador = 0,
    puntosComputadora = 0;

// HTML refs
const btnPedir = document.querySelector('#btnPedir');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

const puntosHTML = document.querySelectorAll('small');
 
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const crearDeck = () => {

    for (let i = 2; i <= 10; i++) {
        for( let tipo of tipos ) {
            deck.push( i + tipo)
        };  
    };
    
    for ( let tipo of tipos) {
        for ( let esp of especiales) {
            deck.push(esp + tipo)
        }
    }

    deck = deck.sort(() => Math.random() - 0.5);

    return deck;
};

crearDeck();

const pedirCarta = () => {

    if (deck.length === 0 ) {
        throw 'There are no cards at desk';
    }
    const carta = deck.pop()
    
    return carta
}


const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
        ( valor === 'A') ? 11 : 10
        : valor * 1;
}

const valor = valorCarta(pedirCarta());

const turnoComputadora = (puntosMinimos) => {

    do {
        const carta = pedirCarta();
    
        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHTML[1].innerText = puntosComputadora;
    
        const imgCarta = document.createElement('img');
        imgCarta.src = `./assets/cards/${carta}.png`;
        imgCarta.alt = 'carta blackjack';
        imgCarta.classList = 'carta';
        divCartasComputadora.append(imgCarta); 

        if ( puntosMinimos > 21) {
            break;
        }

    } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

    setTimeout(() => {
        if (puntosComputadora === puntosMinimos) {
            alert('Draw!');
        } else if (puntosMinimos > 21) {
            alert('The Computer won!');
        } else if (puntosComputadora > 21) {
            alert('The Player won!');
        } else {
            alert('The Computer won!');
        };
    }, 1000);
}

btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();
    
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `./assets/cards/${carta}.png`;
    imgCarta.alt = 'carta blackjack';
    imgCarta.classList = 'carta';
    divCartasJugador.append(imgCarta); 

    if ( puntosJugador > 21 ) {
        console.warn('You Lose!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);

    } else if (puntosJugador === 21) {
        console.warn('21, Great!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador); 
    }
    
});

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener('click', () => {
    
    console.clear();
    deck = [];
    deck = crearDeck();

    puntosJugador = 0;
    puntosComputadora = 0;

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';
    
    btnPedir.disabled = false;
    btnDetener.disabled = false;
});
