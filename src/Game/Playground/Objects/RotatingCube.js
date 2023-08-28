import * as THREE from 'three';
import PlaygroundObject from "../PlaygroundObject";

class RotatingCube extends PlaygroundObject {
    constructor(position) {
        super(position);

        this.mesh = new THREE.Mesh(
            new THREE.BoxGeometry(2, 2, 2),
            new THREE.MeshStandardMaterial({ color: 0x00ff00 })
        );

        this._Initialize();
    }

    Update(t, e) {
        this.mesh.rotation.x += 0.02;
        this.mesh.rotation.y += 0.02;
    }
}

export default RotatingCube;