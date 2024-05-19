import * as THREE from "three";
import { Vector3 } from "three";

export interface IGizmo {
    getLineSegmets(): THREE.LineSegments;
    setPosition(position: Vector3): void;
}