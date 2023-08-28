import * as THREE from 'three'

import Camera from './Camera.js'
import Physics from './Physics.js'
import PlayerController from './PlayerController.js'
import Renderer from './Renderer.js'
import Sizes from './utils/Sizes.js'
import World from './World.js'

class Game {
    constructor() {
        this.sizes = new Sizes(document.body.querySelector('#game-canvas'));

        this._InitializeScene();
        this._InitializeCamera();
        this._InitializeRenderer();
        
        this._clock = new THREE.Clock();
        this._physics = new Physics();

        this.InitializePlayerControls();
        
        this._world = new World(this._physics, this._scene, this._player_controller);

        window.addEventListener('resize', () => this.Resize());
        window.requestAnimationFrame(() => this.Update());
    }

    InitializePlayerControls() {
        this._player_controller = new PlayerController(this._camera.instance, this._physics);
        this._scene.add(this._player_controller.player_mesh);
    }

    _InitializeScene() {
        this._scene = new THREE.Scene();
    }

    _InitializeCamera() {
        this._camera = new Camera();
    }

    _InitializeRenderer() {
        this._renderer = new Renderer(this._scene, this._camera.instance);
        // this._renderer.InitializePostFX();
    }

    Resize() {
        this.sizes.Resize();
        this._camera.Resize();
        this._renderer.Resize();
    }

    Update() {
        window.requestAnimationFrame(() => this.Update());

        this._renderer.Update();

        const deltaT = this._clock.getDelta();
        const elapsedT = this._clock.getElapsedTime();

        this._physics.Update(deltaT);

        this._player_controller.Update(deltaT);
        this._world.Update(deltaT, elapsedT);
    }
}

export default Game;