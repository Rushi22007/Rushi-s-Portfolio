import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import { useInView } from "../../hooks/use-in-view";
import CanvasLoader from "../loader";

// Earth
const Earth = () => {
  // import earth scene
  const earth = useGLTF("./planet/scene.gltf");

  return (
    <primitive object={earth.scene} scale={2.5} position-y={0} rotation-y={0} />
  );
};

// Earth Canvas
const EarthCanvas = () => {
  // Trigger loading 400px before user reaches the contact section
  const { ref, isInView } = useInView({ rootMargin: "400px", initialVisible: true });

  return (
    <div ref={ref} className="h-full w-full">
      {isInView && (
        <Canvas
          shadows
          frameloop="demand"
          dpr={[1, 2]}
          gl={{ preserveDrawingBuffer: true, alpha: true }}
          camera={{ fov: 45, near: 0.1, far: 200, position: [-4, 3, 6] }}
        >
          <Suspense fallback={<CanvasLoader />}>
            <OrbitControls
              autoRotate
              enableZoom={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />

            <Earth />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
};

// Preload planet model immediately
useGLTF.preload("./planet/scene.gltf");

export default EarthCanvas;
