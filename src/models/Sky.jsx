import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import skyscene from "../assets/3d/sky.glb";

const Sky = ({ isRotating }) => {
  const sky = useGLTF(skyscene);

  const ref = useRef();

  useFrame((_, delta) => {
    if (isRotating) {
      ref.current.rotation.y += 0.25 * delta;
    }
  });

  return <mesh ref={ref}>
    <primitive object={sky.scene} />
  </mesh>;
};

export default Sky;
