import './style.scss'
import { Engine } from './engine/Engine'
import { WorldDrawer } from './graphics/WorldDrawer'
import { Game } from './logic/Game'
import { BindKey } from './logic/KeyInput'

var game = new Game()

new Engine({
  canvas: document.querySelector('#canvas') as HTMLCanvasElement,
  experience: WorldDrawer,
  world: game.getWorld(),
  info: {
    github: 'https://github.com/linenive/world',
    description: 'Three.js 프로젝트에요',
    documentTitle: 'Three.js 프로젝트',
    title: 'Pathfinding',
  },
})

BindKey(game)
