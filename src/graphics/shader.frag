#include "../shaders/lygia/color/palette/water.glsl"

uniform vec3 customColor;

varying vec2 vUv;

void main() {
    vec3 color = customColor;
    gl_FragColor = vec4(color, 1.0);
}
