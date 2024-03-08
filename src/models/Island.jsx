/* eslint-disable react/no-unknown-property */
import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { a } from "@react-spring/three";

import islandScene from "../assets/3d/island.glb";
const Island = ({ isRotating, setIsRotating, setCurrentStage, ...props }) => {
  const islandRef = useRef();

  const { gl, viewport } = useThree();

  const { nodes, materials } = useGLTF(islandScene);

  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.95;

  const handlePointerDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;

    lastX.current = clientX;
  };

  const handlePointerUp = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;

    const delta = (clientX - lastX.current) / viewport.width;

    islandRef.current.rotation.y += delta * 0.01 * Math.PI;

    lastX.current = clientX;

    rotationSpeed.current = delta * 0.01 * Math.PI;
  };

  const handlePointerMove = (e) => {
    e.stopPropagation();
    e.preventDefault();

    // if (isRotating) handlePointerUp(e);
    if (isRotating) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;

      const delta = (clientX - lastX.current) / viewport.width;
      islandRef.current.rotation.y += delta * 0.01 * Math.PI;
      lastX.current = clientX;

      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  const handlekeyDown = (e) => {
    console.log("first");
    if (e.key === "ArrowLeft") {
      if (!isRotating) setIsRotating(true);
      islandRef.current.rotation.y += 0.01 * Math.PI;

      rotationSpeed.current = 0.0125;
    } else if (e.key === "ArrowRight") {
      if (!isRotating) setIsRotating(true);
      islandRef.current.rotation.y -= 0.01 * Math.PI;

      rotationSpeed.current = -0.0125;
    }
  };

  const handlekeyUp = (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      setIsRotating(false);
    }
  };

  useFrame(() => {
    if (!isRotating) {
      rotationSpeed.current *= dampingFactor;
      if (Math.abs(rotationSpeed.current) < 0.01) {
        rotationSpeed.current = 0;
      }

      islandRef.current.rotation.y += rotationSpeed.current;
    } else {
      const rotation = islandRef.current.rotation.y;

      /**
       * Normalize the rotation to the range [0, 2pi]
       * and then map it to the range [0, 4]
       * to get the current stage
       * 0 = first stage
       * 1 = second stage
       * 2 = third stage
       * 3 = fourth stage
       * 4 = fifth stage
       *
       * 0 = 0.25
       * 1 = 0.5
       * 2 = 0.75
       * 3 = 1
       * 4 = 1.25
       *
       */
      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      // //set the current stage based on the island orientation
      switch (true) {
        case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
          setCurrentStage(4);
          break;
        case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
          setCurrentStage(3);
          break;
        case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
          setCurrentStage(2);
          break;
        case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(null);
          break;
      }
    }
  });

  useEffect(() => {
    const canvas = gl.domElement;

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);

    canvas.addEventListener("keydown", handlekeyDown);
    canvas.addEventListener("keyup", handlekeyUp);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);

      canvas.removeEventListener("keydown", handlekeyDown);
      canvas.removeEventListener("keyup", handlekeyUp);
    };
  }, [gl, handlePointerDown, handlePointerMove]);

  return (
    <a.group {...props} ref={islandRef}>
      <mesh
        geometry={nodes.polySurface944_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        // castShadow
        // receiveShadow
        geometry={nodes.polySurface945_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        // castShadow
        // receiveShadow
        geometry={nodes.polySurface946_tree2_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        // castShadow
        // receiveShadow
        geometry={nodes.polySurface947_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        // castShadow
        // receiveShadow
        geometry={nodes.polySurface948_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        // castShadow
        // receiveShadow
        geometry={nodes.polySurface949_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        // castShadow
        // receiveShadow
        geometry={nodes.pCube11_rocks1_0.geometry}
        material={materials.PaletteMaterial001}
      />
    </a.group>
  );
};

export default Island;
