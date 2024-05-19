import { ExtendedVector3 } from './VectorExtensions';
import { Game } from './Game';

export function BindKey(game: Game) {
    window.addEventListener('keydown', (event) => {
        if (event.key === 'w') {
            game.getPlayer().setForce(ExtendedVector3.Forward.multiplyScalar(0.05))
        }
        if (event.key === 's') {
            game.getPlayer().setForce(ExtendedVector3.Backward.multiplyScalar(0.05))
        }
        if (event.key === 'a') {
            game.getPlayer().rotateLeft()
        }
        if (event.key === 'd') {
            game.getPlayer().rotateRight()
        }
    })
}