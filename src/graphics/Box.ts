import * as THREE from 'three'
import vertexShader from './shader.vert'
import fragmentShader from './shader.frag'
import { Vector3 } from 'three'

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

    // set pivot point to bottom center
    geometry.translate(0, size.y / 2, 0)


    super(geometry, material)
  }
}
