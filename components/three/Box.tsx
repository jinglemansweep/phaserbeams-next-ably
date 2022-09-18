import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

type Props = {
  position?: number[];
  geometry?: number[];
};

export default function Box(props: Props) {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // useFrame((state, delta) => (mesh.current.rotation.x += 0.01));
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[0.8, 0.8, 0.8]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}
