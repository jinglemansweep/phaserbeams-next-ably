import React from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Box from "./Box";
import Sphere from "./Sphere";

type Props = {
  pixels?: number;
};

export default function Scene({ pixels = 60 }: Props) {
  return (
    <div className="w3-container" style={{ width: "100%", height: "50vh" }}>
      <Canvas
        camera={{
          fov: 20,
          position: [+pixels * 0.8, -5, -30],
          rotation: [0, 0, 20],
        }}
      >
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        <pointLight position={[-50, 0, -40]} />
        <directionalLight position={[0, 0, -40]} />
        <group position={[-(pixels / 2), 0, 0]}>
          {[...Array(pixels)].map((x, i) => (
            <Sphere
              key={i}
              position={[i, 0, 0]}
              color={i % 5 == 0 ? 0xffff00 : 0x888888}
            />
          ))}
        </group>
      </Canvas>
    </div>
  );
}
