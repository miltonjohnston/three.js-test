import * as THREE from 'three';

import PlaygroundObject from "../PlaygroundObject";

import Assets from '../../utils/Assets';

const _VS = `
varying vec2 v_uv;

void main() {
    v_uv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const _FS = `
#include <noise>

varying vec2 v_uv;

uniform float u_time;
uniform sampler2D noise_texture;

void main() {
    vec4 noise_texture = texture(noise_texture, v_uv);
    vec4 main_color = vec4(vec3(1.0), 1.0);

    main_color.a *= floor(sin(u_time + 1.0 - 1.0) + noise_texture.x);

    gl_FragColor = main_color;
}
`;

class Pawn extends PlaygroundObject {
    constructor(position) {
        position.y -= 1;
        super(position);

        this.material = new THREE.ShaderMaterial({
            vertexShader: _VS,
            fragmentShader: _FS,
            uniforms: {
                u_time: { value: 0.0 },
                noise_texture: { value: Assets['perlin_noise_texture'].data }
            },
            transparent: true
        })

        this.mesh = Assets['pawn_fbx'].data.clone();
        this.mesh.scale.multiplyScalar(0.05);
        this.mesh.traverse(c => {
            c.material = this.material; 
        });

        this._Initialize();
    }

    Update(t, e) {
        this.material.uniforms.u_time.value = e;
    }
}

export default Pawn;