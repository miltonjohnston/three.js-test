import * as THREE from 'three';
import { Reflector } from 'three/addons/objects/Reflector.js';

import Assets from './utils/Assets';
import Sizes from './utils/Sizes';

import RigidBody from './Rigidbody.js';

import Playground from './Playground/Playground';


class World {
    constructor(physics, scene, playerController) {
        this.sizes = new Sizes();

        if (!physics) {
            console.warn('No physics specified!'); return;
        }
        this._physics = physics;

        if (!scene) {
            console.warn('No scene specified!'); return;
        }
        this._scene = scene;

        if (!playerController) {
            console.warn('No player controller specified!'); return;
        }
        this._player_controller = playerController;
        

        this.CreatePlatforms();
        this.CreateGrid(new THREE.Vector2(120, 100), new THREE.Vector3(0.0, 0.05, 0.1));
        this.CreateGrid(new THREE.Vector2(120, 100), new THREE.Vector3(0.0, 4.90, 0.1));
        this.CreateLights();

        this.CreatePlayground();
    }

    CreateStaticBody(size, pos = new THREE.Vector3(), customization, quat = new THREE.Quaternion()) {
        if (!size) {
            console.warn('No size specified!'); return;
        }

        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(size.x, size.y, size.z),
            new THREE.MeshBasicMaterial(customization ?? { color: 0x000000 })
        );
        mesh.position.copy(pos);
        mesh.quaternion.copy(quat);
        this._scene.add(mesh);

        const rigid_body = new RigidBody()
        rigid_body.CreateBox(0, pos, quat, size);
        this._physics.world.addRigidBody(rigid_body.body, 1, -1);

        // const reflector = new Reflector(new THREE.PlaneGeometry(100, 100), {
        //     clipBias: 0.003,
        //     textureWidth: this.sizes.width * window.devicePixelRatio,
        //     textureHeight: this.sizes.height * window.devicePixelRatio,
        //     color: 0x777777
        // });
        // reflector.position.set(0.0, -0.04, 0.0);
        // reflector.rotation.x -= Math.PI / 2;

        // this._scene.add(reflector);

        return { mesh, rigid_body };
    }

    CreatePlatforms() {
        const main_ground = this.CreateStaticBody(new THREE.Vector3(120, 0.1, 120), new THREE.Vector3(0, -0.05, 0));
        // const ceiling = this.CreateStaticBody(new THREE.Vector3(120, 0.1, 120), new THREE.Vector3(0, 5, 0));

        // const platform_1 = this.CreateStaticBody(new THREE.Vector3(10, 0.5, 10), new THREE.Vector3(0, 1, 15), { color: 0x94bede });
    }

    CreateGrid(dimensions, position) {
        const diffuse = Assets['grid_texture'].data;
        diffuse.wrapS = THREE.RepeatWrapping;
        diffuse.wrapT = THREE.RepeatWrapping;
        diffuse.anisotropy = 4;
        diffuse.repeat.set(80, 80);
        diffuse.offset.set(0, 0);

        const grid = new THREE.Mesh(
            new THREE.PlaneGeometry(dimensions.x, dimensions.y),
            new THREE.MeshBasicMaterial({ color: 0xFFFFFF, opacity: 0.15, map: diffuse, alphaMap: diffuse, transparent: true, side: THREE.DoubleSide })
        );
        grid.position.copy(position);
        grid.rotation.x -= Math.PI / 2;

        this._scene.add(grid);

        return grid;
    }

    CreateLights() {
        const ambient_light = new THREE.AmbientLight(0xFFFFFF, 0.35);
    
        const spotlight = new THREE.SpotLight(0xffffff, 1.0, 100, Math.PI);
    
        this._scene.add(ambient_light);
        this._scene.add(spotlight);
    }

    CreatePlayground() {
        this._playground = new Playground(this._scene);
    }

    Update(t, e) {
        this._playground.Update(t, e);
    }
}

export default World