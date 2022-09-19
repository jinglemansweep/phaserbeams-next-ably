import React, { useRef, useState } from "react";
import { useFrame, Vector3 } from "@react-three/fiber";

type Props = {
  position: Vector3;
  color: number;
};

export default function Sphere(props: Props) {
  return (
    <mesh {...props}>
      <sphereBufferGeometry args={[0.5, 100, 100]} />
      <meshLambertMaterial color={props.color} />
    </mesh>
  );
}
