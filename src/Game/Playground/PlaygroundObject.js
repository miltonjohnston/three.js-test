import * as THREE from 'three';

class PlaygroundObject {
    constructor(position) {
        this.position = position;
        this.mesh;
        this.platform;
        this.group = null;
    }

    _Initialize() {
        this.platform = new THREE.Mesh(
            new THREE.CylinderGeometry(3, 3, 0.25),
            new THREE.MeshStandardMaterial({ color: 0x111111 })
        );

        // this.spotlight = new THREE.SpotLight(0xffffff, 1.0, 25, Math.PI);
        // const helper = new THREE.SpotLightHelper(this.spotlight);

        this.platform.position.set(this.position.x, 0.0, this.position.z);
        this.mesh.position.copy(this.position);
        // this.spotlight.position.set(this.position.x, this.position.y + 10, this.position.z);

        this.group = new THREE.Group();
        this.group.add(this.mesh);
        this.group.add(this.platform);
        // this.group.add(this.spotlight);
        // this.group.add(helper);
    }

    Update(t, e) {}
}

export default PlaygroundObject;