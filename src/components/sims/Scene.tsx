import {
  ContactShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  useCursor,
} from "@react-three/drei";
import { CasualWoman } from "../models/CasualWoman";
import { Vector3 } from "three";
import { SocketManager, socket } from "../SocketManager";
import React, { useEffect, useState } from "react";
import { generateCharacter } from "../../../../socketServer/index";
import * as THREE from "three";

export const Scene = ({ ...props }) => {
  const cameraPosition = new Vector3(0, 0, 6);
  const [characters, setCharacters] = useState<
    ReturnType<typeof generateCharacter>[]
  >([]);
  const [onFloor, setOnFloor] = useState(false);
  useCursor(onFloor);

  useEffect(() => {
    console.log("characters", characters);
  }, [characters]);

  return (
    <>
      <SocketManager setCharacters={setCharacters} />
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />
      <ContactShadows blur={2} />
      <OrbitControls />
      <mesh
        rotation-x={-Math.PI / 2}
        position-y={-0.001}
        onClick={e => {
          socket.emit("move", [e.point.x, 0, e.point.z]);
        }}
        onPointerEnter={() => {
          setOnFloor(true);
        }}
        onPointerLeave={() => {
          setOnFloor(false);
        }}
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      {characters.map((character, index) => {
        return (
          <CasualWoman
            key={index}
            hairColor={character.hairColor}
            topColor={character.topColor}
            bottomColor={character.bottomColor}
            skinColor={character.skinColor}
            position={
              new Vector3(
                character.position[0],
                character.position[1],
                character.position[2],
              )
            }
          />
        );
      })}
    </>
  );
};
