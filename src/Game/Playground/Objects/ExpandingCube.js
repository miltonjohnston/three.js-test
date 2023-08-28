import * as THREE from 'three';

import PlaygroundObject from "../PlaygroundObject";

const _VS = `
varying vec3 v_normal;

uniform float u_time;

void main() {
    vec3 new_position = sin(position + normal * abs(sin(u_time)));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(new_position, 1.0);
    v_normal = (modelMatrix * vec4(normal, 0.0)).xyz;
}
`;

const _FS = `
varying vec3 v_normal;

uniform float u_time;

void main() {
    gl_FragColor = vec4(vec3(0.5, 0.2, 0.8), 1.0);
}
`;

class ExpandingCube extends PlaygroundObject {
    constructor(position) {
        super(position);

        this.mesh = new THREE.Mesh(
            new THREE.BoxGeometry(2, 2, 2),
            new THREE.ShaderMaterial({
                vertexShader: _VS,
                fragmentShader: _FS,
                uniforms: {
                    u_time: { value: 0.0 }
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

export default ExpandingCube;