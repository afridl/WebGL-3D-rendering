import { Mesh } from "./Mesh.js";

class MeshManager{
    constructor(){
        this.meshCache = new Map();
        this.generators = new Map();
    }
    /**
     * 
     * @param {string} name 
     * @returns {Mesh}
     */
    getMesh(name) {
        return this.meshCache.get(name);
    }
    /**
     * @param {string} name 
     * @param {Mesh} mesh 
     */
    addMesh(name, mesh) {
        this.meshCache.set(name, mesh);
    }
    /**
     * 
     * @param {string} name 
     * @returns {boolean}
     */
    hasMesh(name) {
        return this.meshCache.has(name);
    }
    /**
     * 
     * @param {string} name 
     * @return {boolean}
     */
    removeMesh(name) {
        return this.meshCache.delete(name);
    }
}
export { MeshManager };