import { Engine } from '../engine/Engine'
import * as THREE from 'three'
import { Box } from './Box'
import { Experience } from '../engine/Experience'
import { Resource } from '../engine/Resources'
import { World } from '../logic/World'
import { Dictionary } from '../logic/Core'
import { IWorldObject } from '../logic/IWorldObject'

export class WorldDrawer implements Experience {
  resources: Resource[] = []
  private world: World
  private sceneObjects: Dictionary<number, THREE.Object3D>

  constructor(
    private engine: Engine,
    world: World
    ) {
      this.world = world
      this.sceneObjects = new Dictionary<number, THREE.Object3D>()
    }

  init() {
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.MeshStandardMaterial({ color: 0xffffff })
    )

    plane.rotation.x = -Math.PI / 2
    plane.receiveShadow = true

    this.engine.scene.add(plane)
    this.engine.scene.add(new THREE.AmbientLight(0xffffff, 0.5))

    let directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.castShadow = true
    directionalLight.position.set(2, 2, 2)

    this.engine.scene.add(directionalLight)
  }

  resize() {}

  update() {
    var iter = this.world.getIterWorldObjects()
    for(let obj of iter) {
      if (!this.sceneObjects.has(obj.getId())) {
        this.addToScene(obj)
        console.log('Added object to scene')
        continue
      }
      // Update object position
      const object3d = this.sceneObjects.get(obj.getId())
      const position = obj.getPosition()
      object3d!.position.set(position.x, position.y, position.z)
    }
  }

  private addToScene(object: IWorldObject) {
    const object3d = new Box(object.getSize());
    object3d.castShadow = true

    this.sceneObjects.add(object.getId(), object3d)
    this.engine.scene.add(object3d)
  }
}
