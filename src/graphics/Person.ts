import * as THREE from 'three'
import vertexShader from './shader.vert'
import fragmentShader from './shader.frag'

export class PersonLook extends THREE.Mesh {
    constructor() {
        const geometry = new THREE.CapsuleGeometry(1, 1, 1, 1)
        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
        })

        super(geometry, material)
    }
}