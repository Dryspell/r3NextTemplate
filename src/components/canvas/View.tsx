"use client";

import {
  forwardRef,
  Suspense,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import {
  OrbitControls,
  PerspectiveCamera,
  View as ViewImpl,
} from "@react-three/drei";
import { Three } from "src/helpers/components/Three";
import { Vector3 } from "@react-three/fiber";

export const CameraEnvironment = ({
  color,
  cameraPosition,
}: {
  color?: string;
  cameraPosition?: Vector3;
}) => {
  // useEffect(() => {
  //   console.log(cameraPosition)
  // }, [cameraPosition])

  return (
    <Suspense fallback={null}>
      {color && <color attach='background' args={[color]} />}
      <ambientLight intensity={0.5} />
      <pointLight position={[20, 30, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color='blue' />
      <PerspectiveCamera
        makeDefault
        fov={30}
        position={cameraPosition || [0, 0, 6]}
      />
    </Suspense>
  );
};

const View = forwardRef(({ children, orbit, ...props }: any, ref) => {
  const localRef = useRef(null);
  useImperativeHandle(ref, () => localRef.current);

  return (
    <>
      <div ref={localRef} {...props} />
      <Three>
        <ViewImpl track={localRef}>
          {children}
          {orbit && <OrbitControls />}
        </ViewImpl>
      </Three>
    </>
  );
});
View.displayName = "View";

export { View };
