import * as THREE from 'three';

import PlaygroundObject from "../PlaygroundObject";

const _VS = `
#include <noise>

varying vec3 v_pos;

void main() {
    v_pos = position;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const _FS = `
varying vec3 v_pos;

uniform float u_time;
uniform vec3 u_size;
uniform float u_thickness;
uniform float u_smoothness;

void main() {
    float a = smoothstep(u_thickness, u_thickness + u_smoothness, length(abs(v_pos.xy) - u_size.xy * sin(u_time)));
    a *= smoothstep(u_thickness, u_thickness + u_smoothness, length(abs(v_pos.yz) - u_size.yz * sin(u_time)));
    a *= smoothstep(u_thickness, u_thickness + u_smoothness, length(abs(v_pos.xz) - u_size.xz * sin(u_time)));

    vec3 c = mix(vec3(1.0, 0.0, 0.0), vec3(0.2), a);

    gl_FragColor = vec4(c, 1.0);
}
`;

class Droid extends PlaygroundObject {
    constructor(position) {
        super(position);

        this.mesh = new THREE.Mesh(
            new THREE.SphereGeometry(1, 24, 24),
            new THREE.ShaderMaterial({
                vertexShader: _VS,
                fragmentShader: _FS,
                uniforms: {
                    u_time: { value: 0.0 },
                    u_size: { value: new THREE.Vector3(1.5) },
                    u_thickness: { value: 0.05 },
                    u_smoothness: { value: 0.01 }
                }
            })
        );
        
        this._Initialize();
    }

    Update(t, e) {
        this.mesh.material.uniforms.u_time.value = e;
        // this.mesh.position.y = Math.sin(e) * 0.25 + this.position.y;
    }
}

export default Droid;