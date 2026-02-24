attribute vec4 aVertexPosition;
attribute vec4 aVertexColor;
attribute vec3 aVertexNormal;

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat3 uNormalMatrix;
uniform vec3 uLightDirection;
uniform vec3 uLightColor;

varying lowp vec4 vColor;

void main() {
    vec3 normal = normalize((uModelMatrix * vec4(aVertexNormal, 0.0)).xyz);
    vec3 lightDir = normalize(uLightDirection);
    
    
    float diff = max(dot(normal, lightDir), 0.0);
    vColor = vec4(aVertexColor.rgb * uLightColor * diff, aVertexColor.a);

    gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * aVertexPosition;
}
