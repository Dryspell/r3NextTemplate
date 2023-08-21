/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.11 apps/r3NextTemplate/public/models/casual.gltf -o apps/r3NextTemplate/src/components/models/CasualWoman.jsx -r public 
*/

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import { useGraph } from "@react-three/fiber";

export function CasualWoman({
  hairColor = "green",
  topColor = "pink",
  bottomColor = "brown",
  ...props
}) {
  const group = useRef();
  // @ts-expect-error
  const { scene, materials, animations } = useGLTF("/models/casual.gltf");

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  const { actions } = useAnimations(animations, group);

  const [animation, setAnimation] = useState("Idle");

  //@ts-expect-error Bad Destructor assignment
  useEffect(() => {
    actions[animation].reset().fadeIn(0.5).play();
    return () => actions[animation].fadeOut(0.5);
  }, [animation]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <group name="Casual_Body">
            <skinnedMesh
              name="Cube037"
              geometry={nodes.Cube037.geometry}
              material={materials.Skin}
              skeleton={nodes.Cube037.skeleton}
            />
            <skinnedMesh
              name="Cube037_1"
              geometry={nodes.Cube037_1.geometry}
              material={materials.White}
              skeleton={nodes.Cube037_1.skeleton}
            >
              <meshStandardMaterial color={topColor} />
            </skinnedMesh>
          </group>
          <group name="Casual_Feet">
            <skinnedMesh
              name="Cube070"
              geometry={nodes.Cube070.geometry}
              material={materials.Skin}
              skeleton={nodes.Cube070.skeleton}
            />
            <skinnedMesh
              name="Cube070_1"
              geometry={nodes.Cube070_1.geometry}
              material={materials.Grey}
              skeleton={nodes.Cube070_1.skeleton}
            />
          </group>
          <group name="Casual_Head">
            <skinnedMesh
              name="Cube001"
              geometry={nodes.Cube001.geometry}
              material={materials.Skin}
              skeleton={nodes.Cube001.skeleton}
            />
            <skinnedMesh
              name="Cube001_1"
              geometry={nodes.Cube001_1.geometry}
              material={materials.Hair_Brown}
              skeleton={nodes.Cube001_1.skeleton}
            />
            <skinnedMesh
              name="Cube001_2"
              geometry={nodes.Cube001_2.geometry}
              material={materials.Brown}
              skeleton={nodes.Cube001_2.skeleton}
            />
            <skinnedMesh
              name="Cube001_3"
              geometry={nodes.Cube001_3.geometry}
              material={materials.Hair_Blond}
              skeleton={nodes.Cube001_3.skeleton}
            >
              <meshStandardMaterial color={hairColor} />
            </skinnedMesh>
          </group>
          <skinnedMesh
            name="Casual_Legs"
            geometry={nodes.Casual_Legs.geometry}
            material={materials.Orange}
            skeleton={nodes.Casual_Legs.skeleton}
          >
            <meshStandardMaterial color={bottomColor} />
          </skinnedMesh>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/../apps/r3NextTemplate/public/models/casual.gltf");
