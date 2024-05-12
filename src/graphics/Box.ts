import * as THREE from 'three'
import vertexShader from './shader.vert'
import fragmentShader from './shader.frag'
import { Vector3 } from '../logic/Vector3'

export class Box extends THREE.Mesh {
  constructor(size: Vector3, color: THREE.Color | null) {
    const geometry = new THREE.BoxGeometry(
      size.x, size.y, size.z)

    // 색상을 통해 사용자 정의 컬러를 입력받음
    const uniforms = {
      customColor: { value: color || new THREE.Color(0xffffff) } // 기본값은 흰색
    }

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms, // uniform 변수를 ShaderMaterial에 전달
      vertexShader,
      fragmentShader,
    })

    // set pivot point to left bottom corner
    geometry.translate(size.x / 2, size.y / 2, size.z / 2)

    super(geometry, material)
  }
}
