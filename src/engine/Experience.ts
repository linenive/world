import { GameEntity } from './GameEntity'
import { Engine } from './Engine'
import { Resource } from './Resources'
import { World } from '../logic/World'

export type ExperienceConstructor = new (
  engine: Engine, world: World) => Experience
export interface Experience extends GameEntity {
  init(): void
  resources: Resource[]
}
