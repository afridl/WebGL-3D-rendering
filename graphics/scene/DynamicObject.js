import { mat4, quat } from "../../libs/wrapper.js";
import { MeshManager } from "../../meshes/MeshManager.js";
import { Mesh } from "../../meshes/Mesh.js";

class DynamicObject {
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
    /**
     * 
     * @param {number} deltaTime 
     * @param {MeshManager} meshManager 
     */
    update(deltaTime, meshManager){
        
    }
}

export { DynamicObject };