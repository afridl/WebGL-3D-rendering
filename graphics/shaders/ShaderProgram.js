

class ShaderProgram{
    constructor(gl, name, vertexSource, fragmentSource) {
        this.gl = gl;
        this.name = name;
        this.uniforms = [];
        this.attributes = [];
        this.vertexSource = vertexSource;
        this.fragmentSource = fragmentSource;
        this.program = null;

        
    }
    /**
    * @param {WebGLRenderingContext} gl
    * @returns {Promise<WebGLProgram>}
    */
    async initShaderProgram(gl, vertexSource, fragmentSource) {
        const [vshader, fshader] = await Promise.all([
            this.loadText(new URL(vertexSource, import.meta.url)),
            this.loadText(new URL(fragmentSource, import.meta.url))
        ]);
        const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vshader);
        const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fshader);
        const shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram); //provazani programu aby si shadery mohli povídat mezi sebou

        if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)){
            alert(`Unable to initialize the shader program: ${gl.getProgramInfoLog(shaderProgram)}`);
            return null;
        }

        this.program = shaderProgram;

        this.uniforms = [];
        this.attributes = [];

        for(let i = 0; i < gl.getProgramParameter(shaderProgram, gl.ACTIVE_UNIFORMS); i++){            
            const uniformInfo = gl.getActiveUniform(shaderProgram, i);
            if(uniformInfo){
                this.uniforms.push(uniformInfo.name);
            }
        }

        for(let i = 0; i < gl.getProgramParameter(shaderProgram, gl.ACTIVE_ATTRIBUTES); i++){
            const attributeInfo = gl.getActiveAttrib(shaderProgram, i);
            if(attributeInfo){
                this.attributes.push(attributeInfo.name);
            }
        }
        console.log(`Shader ${this.name} initialized with attributes: ${this.attributes.join(", ")} and uniforms: ${this.uniforms.join(", ")}`);


        return shaderProgram;
    }

    /**
    * @param {URL} url
    * @returns {Promise<string>}
    */
    async loadText(url){
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`Failed to load ${url.pathname}: HTTP ${response.status}`);
        }
        return response.text();
    }
    /**
    * @param {WebGLRenderingContext} gl
    * @param {number} type
    * @param {string} source
    * @returns {WebGLShader | null}
    */
    loadShader(gl, type, source){
        const shader = gl.createShader(type);   //vytvoreni prazdneho shaderu
        gl.shaderSource(shader, source);    //prirazeni kodu shaderu
        gl.compileShader(shader);   //kompilace shaderu

        if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){  //chybova hlaska a smazani shaderu pokud se nezkompiluje
            alert(`An error occured during compilation of shaders: ${gl.getShaderInfoLog(shader)}`);
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }
}
export { ShaderProgram };