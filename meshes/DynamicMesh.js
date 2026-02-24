import { Mesh } from "./Mesh.js";

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
}
export { DynamicMesh };