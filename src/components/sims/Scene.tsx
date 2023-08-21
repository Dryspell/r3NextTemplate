import {
  ContactShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { CasualWoman } from "../models/CasualWoman";
import { Vector3 } from "three";

export const Scene = ({ ...props }) => {
  const cameraPosition = new Vector3(0, 0, 6);
  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />
      <ContactShadows blur={2} />
      <OrbitControls />
      <CasualWoman />
      <CasualWoman hairColor="red" topColor="blue" position={[2, 0, 0]} />
    </>
  );
};
