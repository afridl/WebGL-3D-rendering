import { MeshManager } from "../../meshes/MeshManager.js";

class BufferManager{
    constructor(){
        this.buffers = new Map();
    }
    /**
     * 
     * @param {string} meshKey 
     * @param {MeshManager} meshManager
     * @param {WebGLRenderingContext} gl
     */
    addBuffers(meshKey, meshManager, gl){
        if(this.buffers.has(meshKey)){
            return this.buffers.get(meshKey);
        }

        const mesh = meshManager.getMesh(meshKey);
        if(!mesh){
            throw new Error(`Mesh not found for key: ${meshKey}`);
        }

        const vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, mesh.vertices, gl.STATIC_DRAW);

        const indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, mesh.indices, gl.STATIC_DRAW);

        const colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, mesh.colors, gl.STATIC_DRAW);

        const normalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, mesh.normals, gl.STATIC_DRAW);

        const bufferBundle = {
            vertexBuffer,
            indexBuffer,
            colorBuffer,
            normalBuffer,
            indexCount: mesh.indices.length,
        };

        this.buffers.set(meshKey, bufferBundle);
        return bufferBundle;
    }

    getBuffer(meshKey){
        return this.buffers.get(meshKey);
    }
}

export { BufferManager };