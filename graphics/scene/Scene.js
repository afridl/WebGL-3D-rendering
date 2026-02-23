

import { ShaderManager } from "../shaders/ShaderManager.js";
import { BufferManager } from "./BufferManager.js";
import { SceneObject } from "./SceneObject.js";
import { MeshManager } from "../../meshes/MeshManager.js";
import { mat4 } from "../../libs/wrapper.js";

class Scene{
    
    /**
     * 
     * @param {WebGLRenderingContext} gl 
     */
    constructor(gl, meshManager){
        this.gl = gl;
        this.objects = [];
        this.bufferManager = new BufferManager();
        this.meshManager = meshManager;
        this.projectionMatrix = mat4.create();
        if(gl.canvas instanceof HTMLCanvasElement){
            mat4.perspective(this.projectionMatrix, 45 * Math.PI / 180, gl.canvas.width / gl.canvas.height, 0.1, 100.0);
        }        
    }
    //update all objects in the scene
    updateObjects(deltaTime){
        for(let i = 0; i < this.objects.length; i++){
            this.objects[i].update(deltaTime);
        }
    }

    drawScene(shaderManager){
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clearDepth(1.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        for(let i = 0; i < this.objects.length; i++){
            drawObject(this.gl, this.objects[i], shaderManager, this.bufferManager, this.meshManager, this.projectionMatrix);
        }
    }
    /**
     * @param {SceneObject} object 
     */
    addObject(object){
        this.objects.push(object);
    }
    /**
     * 
     * @param {SceneObject} object 
     */
    removeObject(object){
        const index = this.objects.indexOf(object);
        if(index !== -1){
            this.objects.splice(index, 1);
        }
    }
}
/**
 * @param {WebGLRenderingContext} gl
 * @param {SceneObject} object 
 * @param {ShaderManager} shaderManager
 * @param {BufferManager} bufferManager
 * @param {MeshManager} meshManager
 * @param {mat4} projectionMatrix
 * @returns {void}
 */
function drawObject(gl, object, shaderManager, bufferManager, meshManager, projectionMatrix){
    //bind the object's mesh buffers and draw it
    const shader = shaderManager.getShader(object.shaderKey);
    if(!shader || !shader.program){
        console.log(`Shader ${object.shaderKey} not found or not initialized.`);
        return;
    }

    
    let bufferBundle = bufferManager.getBuffer(object.meshKey);
    if(!bufferBundle){
        bufferBundle = bufferManager.addBuffers(object.meshKey, meshManager, gl);
    }
    
    const attributeBindings = {
        aVertexPosition: { buffer: bufferBundle.vertexBuffer, size: 3 },
        aVertexColor: { buffer: bufferBundle.colorBuffer, size: 4 },
    };

    for(let i = 0; i < shader.attributes.length; i++){
        const attributeName = shader.attributes[i];
        const binding = attributeBindings[attributeName];

        if(!binding){
            continue;
        }

        const location = gl.getAttribLocation(shader.program, attributeName);
        if(location === -1){
            continue;
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, binding.buffer);
        gl.vertexAttribPointer(location, binding.size, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(location);
    }
    gl.useProgram(shader.program);

    for(let i = 0; i < shader.uniforms.length; i++){
        const uniformName = shader.uniforms[i];
        const location = gl.getUniformLocation(shader.program, uniformName);

        if(!location){
            continue;
        }

        if(uniformName === "uModelMatrix" || uniformName === "uModelViewMatrix"){
            gl.uniformMatrix4fv(location, false, object.modelMatrix);
        }
        if (uniformName === "uProjectionMatrix"){
            gl.uniformMatrix4fv(location, false, projectionMatrix);
        }
    }

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufferBundle.indexBuffer);
    
    gl.drawElements(gl.TRIANGLES, bufferBundle.indexCount, gl.UNSIGNED_SHORT, 0);

    
}


export { Scene };


