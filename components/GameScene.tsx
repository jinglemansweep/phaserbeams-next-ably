import Ably from "ably";
import {
  configureAbly,
  useChannel,
  usePresence,
  assertConfiguration,
} from "@ably-labs/react-hooks";
import React, { useCallback, useState, useEffect } from "react";
import Toolbar from "./Toolbar";

configureAbly({
  authUrl: `${process.env.NEXT_PUBLIC_HOSTNAME}/api/createTokenRequest`,
});

import styles from "../styles/Home.module.css";

const KEY_LEFT = "o";
const KEY_RIGHT = "p";

export default function GameScene() {
  const ably = assertConfiguration();
  const [presenceData] = usePresence("presence");
  const [messages, updateMessages] = useState([]);
  const [posX, setPosX] = useState<number>(0);

  const [channel] = useChannel("messages", (message) => {
    updateMessages((prev) => [...prev, message]);
  });

  useEffect(() => {
    window.addEventListener("keypress", handleKeypress);
    return () => window.removeEventListener("keypress", handleKeypress);
  }, []);

  const handleKeypress = (e: KeyboardEvent) => {
    if (e.key === KEY_LEFT) {
      moveX(-1);
    }
    if (e.key === KEY_RIGHT) {
      moveX(1);
    }
  };

  const moveX = (amount: number = 1) => {
    let x = posX + amount;
    if (x > 0 && x < 300) {
      setPosX(x);
      // upsertProfileDebounced({ coord_x: x });
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Game</h1>
        <div className={styles.fieldrow}>
          <p>X: {posX}</p>
          <button
            onClick={() => {
              moveX(-1);
            }}
          >
            -
          </button>
          <button
            onClick={() => {
              moveX(1);
            }}
          >
            +
          </button>
        </div>
        <div>
          <pre>PRESENCE: {JSON.stringify(presenceData, null, 2)}</pre>
          <pre>MESSAGES: {JSON.stringify(messages, null, 2)}</pre>
        </div>
        <Toolbar />
      </main>
    </div>
  );
}
