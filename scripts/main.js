import { toroid } from "../meshes/generators/toroid.js";

import { ShaderManager } from "../graphics/shaders/ShaderManager.js";
import { Scene } from "../graphics/scene/Scene.js";
import { MeshManager } from "../meshes/MeshManager.js";
import { SceneObject } from "../graphics/scene/SceneObject.js";



main();

async function main(){
    let deltaTime = 0;
    let then = 0;
    const canvas = document.getElementById("glCanvas");
    if(!(canvas instanceof HTMLCanvasElement)){
        alert("no canvas :(");
        return;
    }
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const gl = canvas.getContext("webgl");

    if(!(gl instanceof WebGLRenderingContext)){
        alert("no webGL :(");
        return;
    }

    const meshManager = new MeshManager();
    const toroidMesh = toroid("toroid", 1, 0.3, 32, 16);
    meshManager.addMesh(toroidMesh.name, toroidMesh);
    const currentScene = new Scene(gl, meshManager);
    const toroidObject = new SceneObject("toroid", [0,0,-6], [0,0,0,1], [1,1,1], "basic");
    currentScene.addObject(toroidObject);
    const shaderManager = new ShaderManager();
    await shaderManager.addShader(gl, "basic", "./vshader.glsl", "./fshader.glsl");
    console.log("initialized shaders and scene, starting render loop");

    
    function render(now){
        now *= 0.001;
        deltaTime = now - then;
        then = now;
        
        currentScene.updateObjects(deltaTime);
        currentScene.drawScene(shaderManager);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}