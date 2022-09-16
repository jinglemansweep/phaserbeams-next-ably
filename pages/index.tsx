import React, { useState, useEffect } from "react";

import GameScene from "../components/GameScene";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="container" style={{ padding: 0 }}>
      <GameScene />
    </div>
  );
}
