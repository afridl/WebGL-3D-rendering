import { ShaderProgram } from "./ShaderProgram.js";

class ShaderManager {
    constructor() {
        this.shaders = new Map();
    }
    /**
     * Adds a shader program to the manager.
     * @param {WebGLRenderingContext} gl
     * @param {string} name
     * @param {string} vertexSource
     * @param {string} fragmentSource
     */
    async addShader(gl, name, vertexSource, fragmentSource) {
        const shaderProgram = new ShaderProgram(gl, name, vertexSource, fragmentSource);
        console.log(`Adding shader ${name} to manager...`);
        await shaderProgram.initShaderProgram(gl, vertexSource, fragmentSource);
        this.shaders.set(shaderProgram.name, shaderProgram);
    }
    /**
     * 
     * @param {string} name 
     * @returns {ShaderProgram}
     */
    getShader(name) {
        return this.shaders.get(name);
    }
}
export { ShaderManager };