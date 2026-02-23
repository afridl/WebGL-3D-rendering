
class Mesh{
    /**
     * 
     * @param {string} name
     * @param {Float32Array} vertices 
     * @param {Uint32Array} indices 
     * @param {Float32Array} uvs 
     * @param {Float32Array} normals 
     * @param {Float32Array} colors
     */
    constructor(name, vertices, indices, uvs, normals, colors){
        this.name = name
        this.vertices = vertices;
        this.indices = indices;
        this.uvs = uvs;
        this.normals = normals;
        this.colors = colors;
    }
}
export {Mesh};