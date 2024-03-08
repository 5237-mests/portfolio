import { Suspense, useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";

import Loader from "../components/Loader.jsx";

import Island from "../models/Island.jsx";
import Sky from "../models/Sky.jsx";
import Bird from "../models/Bird.jsx";
import Plane from "../models/Plane.jsx";
import HomeInfo from "../components/HomeInfo";

import sakura from "../assets/sakura.mp3";
import soundon from "../assets/icons/soundon.png";
import soundoff from "../assets/icons/soundoff.png";

const Home = () => {
  const audioRef = useRef(new Audio(sakura));
  audioRef.current.loop = true;
  audioRef.current.volume = 0.5;

  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43];
    let rotation = [0.1, 4.7, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }

    return [screenScale, screenPosition, rotation];
  };

  const adjustPlaneForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition];
  };

  const [islandScale, islandPosition, islandRotation] =
    adjustIslandForScreenSize();
  const [planeScale, planePosition] = adjustPlaneForScreenSize();

  useEffect(() => {
    if (isPlayingMusic) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlayingMusic]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    };
  }, []);

  return (
    <section className="w-full h-screen relative">
      <div
       className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center"
      >
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>

      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{
          // fov: 45,
          near: 0.1,
          far: 1000,
          // position: [0, 0, 40],
        }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <hemisphereLight
            skyColor="#b1e1ff"
            groundColor="#000000"
            intensity={1}
          />

          <Sky isRotating={isRotating} />
          <Bird />
          <Plane
            isRotating={isRotating}
            scale={planeScale}
            position={planePosition}
            rotation={[0, 20, 0]}
          />
          <Island
            scale={islandScale}
            position={islandPosition}
            rotation={islandRotation}
            setIsRotating={setIsRotating}
            isRotating={isRotating}
            setCurrentStage={setCurrentStage}
          />
        </Suspense>
      </Canvas>

      <div className="absolute bottom-2 left-2">
        <img
          src={!isPlayingMusic ? soundoff : soundon}
          alt="sound"
          className="w-10 h-10 cursor-pointer object-contain"
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
        />
      </div>
    </section>
  );
};

export default Home;
