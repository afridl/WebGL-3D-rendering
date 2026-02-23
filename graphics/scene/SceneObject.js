import { mat4, quat } from "../../libs/wrapper.js";


class SceneObject {
    /**
     * 
     * @param {string} meshKey 
     * @param {vec3} position 
     * @param {quat} rotation 
     * @param {vec3} scale 
     * @param {string} shaderKey
     */
    constructor(meshKey, position, rotation, scale, shaderKey) {
        this.meshKey = meshKey;
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
        
        this.shaderKey = shaderKey; //shader to use when drawing this object


        this.modelMatrix = mat4.create();
        mat4.fromRotationTranslationScale(this.modelMatrix, this.rotation, this.position, this.scale);
    }

    update(deltaTime){
        const rotationSpeed = 1.0; // radians per second
        quat.rotateY(this.rotation, this.rotation, rotationSpeed * deltaTime);
        quat.rotateX(this.rotation, this.rotation, rotationSpeed * deltaTime * 0.5);
        quat.rotateZ(this.rotation, this.rotation, rotationSpeed * deltaTime * 0.25);
        mat4.fromRotationTranslationScale(this.modelMatrix, this.rotation, this.position, this.scale);
    }
}

export { SceneObject };