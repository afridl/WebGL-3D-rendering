import { Mesh } from "../Mesh.js";

/**
 *
 * @param {string} name
 * @param {number} width
 * @param {number} depth
 * @param {number} widthSegments
 * @param {number} depthSegments
 * @return {Mesh}
 */
function plane(name, width, depth, widthSegments, depthSegments) {
    const vertices = [];
    const normals = [];
    const uvs = [];
    const indices = [];
    const colors = [];

    const halfWidth = width * 0.5;
    const halfDepth = depth * 0.5;
    const gridX = Math.max(1, widthSegments);
    const gridZ = Math.max(1, depthSegments);

    for (let z = 0; z <= gridZ; z++) {
        const v = z / gridZ;
        const posZ = v * depth - halfDepth;

        for (let x = 0; x <= gridX; x++) {
            const u = x / gridX;
            const posX = u * width - halfWidth;

            vertices.push(posX, 0, posZ);
            normals.push(0, 1, 0);
            uvs.push(u, v);
            colors.push(1, 1, 1, 1);
        }
    }

    for (let z = 0; z < gridZ; z++) {
        for (let x = 0; x < gridX; x++) {
            const a = z * (gridX + 1) + x;
            const b = a + 1;
            const c = (z + 1) * (gridX + 1) + x;
            const d = c + 1;

            indices.push(a, c, b);
            indices.push(b, c, d);
        }
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

export { plane };
