import React from "react";
import * as THREE from "three";
import TreeModel from "./Tree";
const trees = [
	{
		position: new THREE.Vector3(1600, 0, 0),
		scale: new THREE.Vector3(0.06, 0.06, 0.06)
	},
	{
		position: new THREE.Vector3(0, 0, 1500),
		scale: new THREE.Vector3(0.1, 0.1, 0.1)
	},
	{
		position: new THREE.Vector3(100, 0, 1500),
		scale: new THREE.Vector3(0.1, 0.1, 0.1)
	},
	{
		position: new THREE.Vector3(310, 0, 1500),
		scale: new THREE.Vector3(0.13, 0.13, 0.13)
	}
];

function TreeGroup() {
	return (
		<group>
			{trees.map((tree, index) => (
				<TreeModel key={index} position={tree.position} scale={tree.scale} />
			))}
		</group>
	);
}

export default TreeGroup;
