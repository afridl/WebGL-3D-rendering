/**
 * @param {WebGLRenderingContext} gl
 * @returns {{ position: WebGLBuffer, color: WebGLBuffer, index: WebGLBuffer }}
 */
function initBuffers(gl){
    const positionBuffer = initPositionBuffer(gl);
    const colorBuffer = initColorBuffer(gl);
    const indexBuffer = initIndexBuffer(gl);

    return{
        position: positionBuffer,
        index: indexBuffer,
        color: colorBuffer,
    };

}

/**
 * @param {WebGLRenderingContext} gl
 * @returns {WebGLBuffer}
 */
function initPositionBuffer(gl){

    const positionBuffer = gl.createBuffer();
    const positions = [
        -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, //front face
       -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, //back face
        -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, //top face
        -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0, //bottom face
        1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, //right face
        -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, //left face
    ];
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);    
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    return positionBuffer;

}
function initColorBuffer(gl){
    let colors = [];
    const colorBuffer = gl.createBuffer();
    const facecolors = [
        [1.0, 1.0, 1.0, 1.0], //front white
        [1.0, 0.0, 0.0, 1.0], //back red
        [0.0, 1.0, 0.0, 1.0], //top green
        [0.0, 0.0, 1.0, 1.0], //bottom blue
        [1.0, 1.0, 0.0, 1.0], //right yellow
        [1.0, 0.0, 1.0, 1.0], //left purple
    ];
    for(const c of facecolors){
        colors = colors.concat(c, c, c, c);
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    return colorBuffer;
}
function initIndexBuffer(gl){
    const indexBuffer = gl.createBuffer();
    const indices = [
        0, 1, 2, 0, 2, 3, //front face
        4, 5, 6, 4, 6, 7, //back face
        8, 9, 10, 8, 10, 11, //top face
        12, 13, 14, 12, 14, 15, //bottom face
        16, 17, 18, 16, 18, 19, //right face
        20, 21, 22, 20, 22, 23 //left face
    ];
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    return indexBuffer;
}
export {initBuffers};