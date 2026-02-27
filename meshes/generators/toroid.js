import { DynamicMesh } from "../DynamicMesh.js";
import {Mesh} from "../Mesh.js";

/**
 * 
 * @param {string} name 
 * @param {number} majorRadius 
 * @param {number} minorRadius 
 * @param {number} majorSegments 
 * @param {number} minorSegments 
 * @param {boolean} [dynamic=false]
 * @returns 
 */
function toroid(name,majorRadius, minorRadius, majorSegments, minorSegments, dynamic = false) {
    var vertices = [];
    var normals = [];
    var uvs = [];
    var indices = [];
    var colors = [];
    const TWO_PI = Math.PI * 2;
    const majorStep = TWO_PI / majorSegments; //step size for u
    const minorStep = TWO_PI / minorSegments; //step size for v

    for (var i = 0; i <= majorSegments; i++) {
        var u = i * majorStep;
        var cosU = Math.cos(u);
        var sinU = Math.sin(u);
        for (var j = 0; j <= minorSegments; j++) {
            var v = j * minorStep;
            var cosV = Math.cos(v);
            var sinV = Math.sin(v);
            var x = (majorRadius + minorRadius * cosV) * cosU;
            var y = (majorRadius + minorRadius * cosV) * sinU;
            var z = minorRadius * sinV;
            vertices.push(x, y, z);
            var nx = cosV * cosU;
            var ny = cosV * sinU;
            var nz = sinV;
            normals.push(nx, ny, nz);
            uvs.push(i / majorSegments, j / minorSegments);
            colors.push(1.0, 1.0, 1.0, 1.0); // default color (white)
        }
    }

    for (var i = 0; i < majorSegments; i++) {
        for (var j = 0; j < minorSegments; j++) {
            var first = i * (minorSegments + 1) + j;
            var second = first + minorSegments + 1;
            indices.push(first, second, first + 1);
            indices.push(second, second + 1, first + 1);
        }
    }
    if (dynamic) {
        return new DynamicMesh(
            name,
            new Float32Array(vertices),
            new Uint32Array(indices),
            new Float32Array(uvs),
            new Float32Array(normals),
            new Float32Array(colors)
        );
    }
    return new Mesh(
        name, 
        new Float32Array(vertices), 
        new Uint32Array(indices), 
        new Float32Array(uvs), 
        new Float32Array(normals), 
        new Float32Array(colors)
    );
}
export {toroid};