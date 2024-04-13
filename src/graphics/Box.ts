import * as THREE from 'three'
import vertexShader from './shader.vert'
import fragmentShader from './shader.frag'

export class Box extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.BoxGeometry(0.2, 1, 0.2)
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
    })

    // set pivot point to bottom center
    geometry.translate(0, 0.5, 0)

    super(geometry, material)
  }
}
