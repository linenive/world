import * as THREE from 'three'
import { IGizmo } from './IGizmo'
import { Vector3 } from '../logic/Vector3'
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils'

export class ConeOnSphereGizmo extends THREE.LineSegments implements IGizmo {
  private loacalPosition: Vector3

  /**
   * 원뿔의 모선 길이와, 모선과 y축 사이각을 받아서 원뿔을 생성
   * h=lcos(θ)
   * r=lsin(θ)
   * @param loacalPosition 기즈모의 로컬 위치
   * @param generatrix 모선 길이
   * @param thetaRadian 모선과 y축 사이각
   * @param direction 기즈모의 방향
   * @returns 원뿔 메쉬
   */
  constructor(
    localPosition: Vector3, generatrix: number, thetaRadian: number,
    direction: Vector3) {
    const height = generatrix * Math.cos(thetaRadian)
    const radius = generatrix * Math.sin(thetaRadian)

    const coneWireframe = new THREE.WireframeGeometry(
      new THREE.ConeGeometry(radius, height, 18)
    )

    coneWireframe.translate(0, -height / 2, 0)

    const sphereGeometry = new THREE.SphereGeometry(
      generatrix,
      18,
      18,
      0,
      Math.PI * 2,
      0,
      thetaRadian
    )
    sphereGeometry.rotateX(Math.PI)

    const shpereWiframe = new THREE.WireframeGeometry(sphereGeometry)

    const combinedGeometry = BufferGeometryUtils.mergeGeometries(
      [coneWireframe, shpereWiframe],
      false
    )

    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0x00ff00,
      depthTest: false,
      opacity: 0.25,
      transparent: true,
    })

    super(combinedGeometry, wireframeMaterial)

    this.loacalPosition = localPosition

    var euler = new THREE.Euler()
    euler.setFromVector3(new THREE.Vector3(direction.x, direction.y, direction.z))
    this.setRotationFromEuler(euler)
  }

  public getLineSegmets(): THREE.LineSegments {
    return this
  }

  public setPosition(position: Vector3): void {
    const newPosition = this.loacalPosition.add(position)
    this.position.set(newPosition.x, newPosition.y, newPosition.z)
  }
}
