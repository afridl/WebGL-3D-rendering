import { Mesh } from "./Mesh.js";

import { vec3 } from "../libs/wrapper.js";

class DynamicMesh extends Mesh {
	/**
	 *
	 * @param {string} name
	 * @param {Float32Array} vertices
	 * @param {Uint32Array} indices
	 * @param {Float32Array} uvs
	 * @param {Float32Array} normals
	 * @param {Float32Array} colors
	 */
	constructor(name, vertices, indices, uvs, normals, colors) {
		super(name, vertices, indices, uvs, normals, colors);
		this.dirty = false;
	}

	/**
	 * Applies a user-provided update callback to this mesh data.
	 *
	 * The callback can mutate vertices/normals in place.
	 * If callback returns false, mesh will not be marked dirty.
	 *
	 * @param {(vertices: Float32Array, normals: Float32Array, dt?: number, context?: any, mesh?: DynamicMesh) => boolean | void} updateFn
	 * @param {number} [dt]
	 * @param {any} [context]
	 */
	meshUpdate(updateFn, dt, context) {
		if (typeof updateFn !== "function") {
			throw new Error("meshUpdate(updateFn): updateFn must be a function");
		}

		const changed = updateFn(this.vertices, this.normals, dt, context, this);
		if (changed !== false) {
			this.dirty = true;
		}
	}

	markClean() {
		this.dirty = false;
	}

	/**
	 * Recomputes vertex normals from mesh geometry (vertices & indices).
	 * Assumes triangles, indexed mesh.
	 */
	recomputeNormals() {
		const v = this.vertices;
		const n = this.normals;
		const idx = this.indices;
		const numVerts = v.length / 3;
		// Reset normals
		for (let i = 0; i < n.length; i++) n[i] = 0;
		// For each triangle
		for (let i = 0; i < idx.length; i += 3) {
			const ia = idx[i], ib = idx[i+1], ic = idx[i+2];
			const a = [v[ia*3], v[ia*3+1], v[ia*3+2]];
			const b = [v[ib*3], v[ib*3+1], v[ib*3+2]];
			const c = [v[ic*3], v[ic*3+1], v[ic*3+2]];
			// Compute face normal
			const ab = vec3.subtract(vec3.create(), b, a);
			const ac = vec3.subtract(vec3.create(), c, a);
			const faceNormal = vec3.cross(vec3.create(), ab, ac);
			vec3.normalize(faceNormal, faceNormal);
			// Accumulate to each vertex normal
			for (const iVert of [ia, ib, ic]) {
				n[iVert*3]   += faceNormal[0];
				n[iVert*3+1] += faceNormal[1];
				n[iVert*3+2] += faceNormal[2];
			}
		}
		// Normalize all vertex normals
		for (let i = 0; i < numVerts; i++) {
			const normal = [n[i*3], n[i*3+1], n[i*3+2]];
			vec3.normalize(normal, normal);
			n[i*3]   = normal[0];
			n[i*3+1] = normal[1];
			n[i*3+2] = normal[2];
		}
		this.dirty = true;
	}
}
export { DynamicMesh };