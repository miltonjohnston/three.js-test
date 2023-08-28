import * as THREE from 'three';

import PlaygroundObject from "../PlaygroundObject";

const _VS = `
varying vec3 v_normal;
varying vec3 v_position;
varying vec3 v_colour;

uniform float u_time;

float inverseLerp(float v, float minValue, float maxValue) {
    return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
    float t = inverseLerp(v, inMin, inMax);
    return mix(outMin, outMax, t);
}

void main() {
    vec3 localSpacePosition = position;

    float t = sin(localSpacePosition.y * 20.0 + u_time * 10.0);
    t = remap(t, -1.0, 1.0, 0.0, 0.2);
    localSpacePosition += normal * t;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(localSpacePosition, 1.0);
    v_normal = (modelMatrix * vec4(normal, 0.0)).xyz;
    v_position = (modelMatrix * vec4(localSpacePosition, 1.0)).xyz;
    v_colour = mix(vec3(0.0, 0.0, 0.5), vec3(0.1, 0.5, 0.8), smoothstep(0.0, 0.2, t));
}
`;

const _FS = `
varying vec3 v_normal;
varying vec3 v_position;
varying vec3 v_colour;

float inverseLerp(float v, float minValue, float maxValue) {
    return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
    float t = inverseLerp(v, inMin, inMax);
    return mix(outMin, outMax, t);
}

void main() {
    vec3 modelColour = v_colour.xyz;
  vec3 lighting = vec3(0.0);

  // vec3 normal = normalize(v_normal);
  vec3 normal = normalize(
      cross(
          dFdx(v_position.xyz),
          dFdy(v_position.xyz)));
  vec3 viewDir = normalize(cameraPosition - v_position);

  // Ambient
  vec3 ambient = vec3(1.0);

  // Hemi
  vec3 skyColour = vec3(0.0, 0.3, 0.6);
  vec3 groundColour = vec3(0.6, 0.3, 0.1);

  vec3 hemi = mix(groundColour, skyColour, remap(normal.y, -1.0, 1.0, 0.0, 1.0));

  // Diffuse lighting
  vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
  vec3 lightColour = vec3(1.0, 1.0, 0.9);
  float dp = max(0.0, dot(lightDir, normal));

  vec3 diffuse = dp * lightColour;

  // Combine lighting
  lighting = hemi * 0.1 + diffuse;

  vec3 colour = modelColour * lighting;

  gl_FragColor = vec4(pow(colour, vec3(1.0 / 2.2)), 1.0);
}
`;

class WarpedSphere extends PlaygroundObject {
    constructor(position) {
        super(position);

        this.mesh = new THREE.Mesh(
            new THREE.IcosahedronGeometry(1.25, 52),
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

export default WarpedSphere;