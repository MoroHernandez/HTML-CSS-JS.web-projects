
const miModulo = (() => {
    'use strict'

        let deck = [];

        let puntosJugadores = [];

        const tipos = ['C','D','H','S'],
              especiales = ['A','J','Q','K'];

        // HTML refs
        const divCartasJugadores = document.querySelectorAll('.divCartas'),
              puntosHTML = document.querySelectorAll('small');

        const btnDetener = document.querySelector('#btnDetener'),
              btnPedir = document.querySelector('#btnPedir'),
              btnNuevo = document.querySelector('#btnNuevo');

        const inicializarDeck = (numJugadores = 2) => {
            deck = crearDeck();

            puntosJugadores = [];
            for (let i = 0; i < numJugadores; i++) {
                puntosJugadores.push(0);
            }

            puntosHTML.forEach( elem => elem.innerText = 0);
            divCartasJugadores.forEach( elem => elem.innerHTML = '');

            btnPedir.disabled = false;
            btnDetener.disabled = false;

        }

        const crearDeck = () => {

            deck = [];
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
            return deck.sort(() => Math.random() - 0.5); 
        };
        
        const pedirCarta = () => {

            if (deck.length === 0 ) {
                alert('Start a new game please');
            }  
            return deck.pop();
        }

        const valorCarta = (carta) => {

            const valor = carta.substring(0, carta.length - 1);
            return (isNaN(valor)) ?
                ( valor === 'A') ? 11 : 10
                : valor * 1;
        }

        const acumularPuntos = ( carta, turno ) => {

            puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
            puntosHTML[turno].innerText = puntosJugadores[turno];
            return puntosJugadores[turno];
        }

        const crearCarta = (carta, turno) => {

            const imgCarta = document.createElement('img');
            imgCarta.src = `./assets/cards/${carta}.png`;
            imgCarta.alt = 'carta blackjack';
            imgCarta.classList = 'carta';
            divCartasJugadores[turno].append(imgCarta); 
        }

        const determinarGanador = () => {

            const [puntosMinimos, puntosComputadora] = puntosJugadores;

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

        const turnoComputadora = (puntosMinimos) => {

            let puntosComputadora = 0;
            do {
                const carta = pedirCarta();
                puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
                crearCarta(carta, puntosJugadores.length - 1); 

            } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

            determinarGanador();
        }

        btnPedir.addEventListener('click', () => {

            const carta = pedirCarta();
            const puntosJugador = acumularPuntos(carta, 0);

            crearCarta(carta, 0);

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

            turnoComputadora(puntosJugadores[0]);
        });
        
        btnNuevo.addEventListener('click', () => {

            inicializarDeck();
        });

        return {
            nuevoJuego: inicializarDeck
        };
        
})();

