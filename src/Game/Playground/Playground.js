import * as THREE from 'three';

import * as PlaygroundObject from './Objects';

class Playground {
    constructor(scene) {
        this._scene = scene;
        this.objects = [];

        this.layout = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];

        this.layout = [
            [1, 1, 0, 1, 1],
            [1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [1, 1, 0, 1, 1],
        ];

        this.CreatePlayground();
    }
    
    CreatePlayground() {
        const objects = Object.keys(PlaygroundObject).map(o => PlaygroundObject[o]);

        let i = 0;

        for (let x = 0; x < this.layout.length; x++) {
            for (let y = 0; y < this.layout[x].length; y++) {
                if (this.layout[x][y] === 1) {
                    if (!objects[i]) i = 0;

                    const instance = new objects[i](new THREE.Vector3(
                        (x * 7.5) - (this.layout.length * 7.5) * 0.5 + 3.75,
                        2.0,
                        (y * 7.5) - (this.layout[0].length * 7.5) * 0.5 + 3.75
                    ));
                    this._scene.add(instance.group);
                    this.objects.push(instance);

                    i++;
                }
            }
        }
    }

    Update(t, e) {
        this.objects.forEach(object => object.Update(t, e));
    }
}

export default Playground;