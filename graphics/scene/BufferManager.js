import { MeshManager } from "../../meshes/MeshManager.js";
import { DynamicMesh } from "../../meshes/DynamicMesh.js";

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
    updateBuffer(meshKey, meshManager, gl){
        const bufferBundle = this.buffers.get(meshKey);
        if(!bufferBundle){
            return;
        }

        const mesh = meshManager.getMesh(meshKey);
        if(!mesh){
            throw new Error(`Mesh not found for key: ${meshKey}`);
        }
        if (!mesh.dirty) {
            return;
        }
        if(!(mesh instanceof DynamicMesh)){
            return;
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, bufferBundle.vertexBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, mesh.vertices);

        gl.bindBuffer(gl.ARRAY_BUFFER, bufferBundle.colorBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, mesh.colors);

        gl.bindBuffer(gl.ARRAY_BUFFER, bufferBundle.normalBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, mesh.normals);

        // For now, we assume indices don't change. If they do, we would need to update the index buffer as well and use gl.bufferData instead.

        //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufferBundle.indexBuffer);
        //gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, 0, mesh.indices);

        //bufferBundle.indexCount = mesh.indices.length;
        mesh.markClean();
    }
}

export { BufferManager };