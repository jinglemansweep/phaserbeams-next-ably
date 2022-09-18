import React from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Box from "./Box";

type Props = {
  pixels?: number;
};

export default function Scene({ pixels = 60 }: Props) {
  return (
    <div className="w3-container" style={{ width: "100%", height: "50vh" }}>
      <Canvas camera={{ fov: 20, rotation: [200, 200, 200] }}>
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />

        <pointLight position={[10, 10, 10]} />
        {[...Array(pixels)].map((x, i) => (
          <Box key={i} position={[i, 0, 0]} />
        ))}
      </Canvas>
    </div>
  );
}
