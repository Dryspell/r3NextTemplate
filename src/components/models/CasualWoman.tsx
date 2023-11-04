/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.11 apps/r3NextTemplate/public/models/casual.gltf -o apps/r3NextTemplate/src/components/models/CasualWoman.jsx -r public 
*/

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import { useFrame, useGraph } from "@react-three/fiber";
import { SkinnedMesh } from "three";

const MOVEMENT_SPEED = 0.032;

export function CasualWoman({
  hairColor = "green",
  topColor = "pink",
  bottomColor = "brown",
  ...props
}) {
  const position = useMemo(() => props.position, []);

  const group = useRef<any>();
  // @ts-expect-error
  const { scene, materials, animations } = useGLTF("/models/casual.gltf");

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  const { actions } = useAnimations(animations, group);

  const actionOptions = [
    "Death",
    "Gun_Shoot",
    "HitRecieve",
    "HitRecieve_2",
    "Idle",
    "Idle_Gun",
    "Idle_Gun_Pointing",
    "Idle_Gun_Shoot",
    "Idle_Neutral",
    "Idle_Sword",
    "Interact",
    "Kick_Left",
    "Kick_Right",
    "Punch_Left",
    "Punch_Right",
    "Roll",
    "Run",
    "Run_Back",
    "Run_Left",
    "Run_Right",
    "Run_Shoot",
    "Sword_Slash",
    "Walk",
    "Wave",
  ] as const;

  const [animation, setAnimation] = useState("Idle");

  //@ts-expect-error Bad Destructor assignment
  useEffect(() => {
    actions[animation].reset().fadeIn(0.032).play();
    return () => actions[animation]?.fadeOut(0.5);
  }, [animation]);

  useFrame(() => {
    if (
      group.current &&
      group.current.position &&
      group.current.position.distanceTo(props.position) > 0.1
    ) {
      const direction = group.current.position
        .clone()
        .sub(props.position)
        .normalize()
        .multiplyScalar(MOVEMENT_SPEED);
      group.current.position.sub(direction);
      group.current.lookAt(props.position);
      setAnimation("Run");
    } else {
      setAnimation("Idle");
    }
  });

  return (
    <group ref={group} {...props} position={position} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <group name="Casual_Body">
            <skinnedMesh
              name="Cube037"
              geometry={(nodes.Cube037 as SkinnedMesh).geometry}
              material={materials.Skin}
              skeleton={(nodes.Cube037 as SkinnedMesh).skeleton}
            />
            <skinnedMesh
              name="Cube037_1"
              geometry={(nodes.Cube037_1 as SkinnedMesh).geometry}
              material={materials.White}
              skeleton={(nodes.Cube037_1 as SkinnedMesh).skeleton}
            >
              <meshStandardMaterial color={topColor} />
            </skinnedMesh>
          </group>
          <group name="Casual_Feet">
            <skinnedMesh
              name="Cube070"
              geometry={(nodes.Cube070 as SkinnedMesh).geometry}
              material={materials.Skin}
              skeleton={(nodes.Cube070 as SkinnedMesh).skeleton}
            />
            <skinnedMesh
              name="Cube070_1"
              geometry={(nodes.Cube070_1 as SkinnedMesh).geometry}
              material={materials.Grey}
              skeleton={(nodes.Cube070_1 as SkinnedMesh).skeleton}
            />
          </group>
          <group name="Casual_Head">
            <skinnedMesh
              name="Cube001"
              geometry={(nodes.Cube001 as SkinnedMesh).geometry}
              material={materials.Skin}
              skeleton={(nodes.Cube001 as SkinnedMesh).skeleton}
            />
            <skinnedMesh
              name="Cube001_1"
              geometry={(nodes.Cube001_1 as SkinnedMesh).geometry}
              material={materials.Hair_Brown}
              skeleton={(nodes.Cube001_1 as SkinnedMesh).skeleton}
            />
            <skinnedMesh
              name="Cube001_2"
              geometry={(nodes.Cube001_2 as SkinnedMesh).geometry}
              material={materials.Brown}
              skeleton={(nodes.Cube001_2 as SkinnedMesh).skeleton}
            />
            <skinnedMesh
              name="Cube001_3"
              geometry={(nodes.Cube001_3 as SkinnedMesh).geometry}
              material={materials.Hair_Blond}
              skeleton={(nodes.Cube001_3 as SkinnedMesh).skeleton}
            >
              <meshStandardMaterial color={hairColor} />
            </skinnedMesh>
          </group>
          <skinnedMesh
            name="Casual_Legs"
            geometry={(nodes.Casual_Legs as SkinnedMesh).geometry}
            material={materials.Orange}
            skeleton={(nodes.Casual_Legs as SkinnedMesh).skeleton}
          >
            <meshStandardMaterial color={bottomColor} />
          </skinnedMesh>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/../apps/r3NextTemplate/public/models/casual.gltf");