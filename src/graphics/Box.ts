import * as THREE from 'three'
import vertexShader from './shader.vert'
import fragmentShader from './shader.frag'
import { Vector3 } from '../logic/Vector3'

export class Box extends THREE.Mesh {
  constructor(size: Vector3) {
    const geometry = new THREE.BoxGeometry(
      size.x, size.y, size.z)
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
    })

    // set pivot point to bottom center
    geometry.translate(0, 0.5, 0)

    super(geometry, material)
  }
}
