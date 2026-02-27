import { mat4, quat } from "../../libs/wrapper.js";
import { MeshManager } from "../../meshes/MeshManager.js";
import { Mesh } from "../../meshes/Mesh.js";
import { DynamicMesh } from "../../meshes/DynamicMesh.js";

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
        const mesh = meshManager.getMesh(this.meshKey);
        if(!mesh){
            console.warn(`Mesh ${this.meshKey} not found.`);
            return;
        }
        if(!(mesh instanceof DynamicMesh)){
            console.warn(`Mesh ${this.meshKey} is not a DynamicMesh.`);
            return;
        }
        mesh.meshUpdate((vertices)=>{
                for(let i = 1; i < vertices.length; i+=3){
                    vertices[i] = vertices[i] + Math.sin(performance.now() / 1000 + vertices[i-1]) * 0.1;
                }
                mesh.recomputeNormals(); //recompute normals after changing vertices

        })

                
        ;
    }
}

export { DynamicObject };