import * as THREE from 'three';
import { IGizmo } from './IGizmo';
import { Vector3 } from '../logic/Vector3';

export class ConeGizmo extends THREE.LineSegments implements IGizmo {
    private loacalPosition: Vector3;

    /**
    * 원뿔의 모선 길이와, 모선과 y축 사이각을 받아서 원뿔을 생성
    * h=lcos(θ)
    * r=lsin(θ)
    * @param loacalPosition 기즈모의 로컬 위치
    * @param generatrix 모선 길이
    * @param theta 모선과 y축 사이각
    * @returns 원뿔 메쉬
    */
    constructor(
        localPosition: Vector3, generatrix: number, theta: number) {
        const height = generatrix * Math.cos(theta);
        const radius = generatrix * Math.sin(theta);

        const wireframe = new THREE.WireframeGeometry(
            new THREE.ConeGeometry(radius, height, 18))

        wireframe.translate(0, - height / 2, 0);

        const wireframeMaterial = new THREE.LineBasicMaterial({
            color: 0x00ff00,
            depthTest: false,
            opacity: 0.25,
            transparent: true
        });

        super(wireframe, wireframeMaterial);

        this.loacalPosition = localPosition;
        // 일단 앞을 바라보게
        this.setRotationFromEuler(new THREE.Euler(-1.5, 0, 0));
    }

    public getLineSegmets(): THREE.LineSegments {
        return this;
    }
    
    public setPosition(position: Vector3): void {
        const newPosition = this.loacalPosition.add(position);
        this.position.set(newPosition.x, newPosition.y, newPosition.z);    
    }
}