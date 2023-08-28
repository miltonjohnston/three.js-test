import * as THREE from 'three';

import PlaygroundObject from "../PlaygroundObject";

const _VS = `
#include <noise>

varying vec2 v_uv;

uniform float u_time;

void main() {
    float displacement = 0.75 * cnoise(1.43 * position + u_time);
    vec3 newPosition = position + normal * displacement;

    v_uv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`;

const _FS = `
varying vec2 v_uv;

uniform float u_time;
uniform vec3 top_color;
uniform vec3 bottom_color;

void main() {
    gl_FragColor = vec4(mix(bottom_color, top_color, sin(u_time)), 1.0);
    // gl_FragColor = vec4(vec3(0.2), 1.0);
}
`;

class Bubble extends PlaygroundObject {
    constructor(position) {
        super(position);

        this.mesh = new THREE.Mesh(
            new THREE.SphereGeometry(1, 24, 24),
            new THREE.ShaderMaterial({
                vertexShader: _VS,
                fragmentShader: _FS,
                uniforms: {
                    u_time: { value: 0.0 },
                    top_color: { value: new THREE.Color(0x4568dc) },
                    bottom_color: { value: new THREE.Color(0xb06ab3) }
                },
                wireframe: true
            })
        );
        
        this._Initialize();
    }

    Update(t, e) {
        this.mesh.material.uniforms.u_time.value = e;
        // this.mesh.position.y = Math.sin(e) * 0.25 + this.position.y;
    }
}

export default Bubble;