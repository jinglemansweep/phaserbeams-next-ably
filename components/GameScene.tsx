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
import { stringify } from "querystring";

const KEY_LEFT = "o";
const KEY_RIGHT = "p";

export default function GameScene() {
  const ably = assertConfiguration();
  const [presenceData] = usePresence("presence");
  const [x, setX] = useState(0);
  const [state, setState] = useState({});

  const [channel] = useChannel("game", (message) => {
    // console.log("message", message);
    if (message.name === "state") {
      setState({
        ...state,
        [message.clientId]: { x: message.data.x },
      });
      if (ably.auth.clientId === message.clientId) {
        setX(message.data.x);
      }
    }
  });

  useEffect(() => {
    window.addEventListener("keypress", handleKeypress);
    return () => window.removeEventListener("keypress", handleKeypress);
  }, [state]);

  const handleKeypress = (e: KeyboardEvent) => {
    // console.log("key", e.key);
    if (e.key === KEY_LEFT) {
      moveX(-1);
    }
    if (e.key === KEY_RIGHT) {
      moveX(1);
    }
  };

  const moveX = (amount: number = 1) => {
    let newX = x + amount;
    if (newX > 0 && newX < 300) {
      setX(newX);
      channel.publish("state", { x: newX });
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Game</h1>
        <div className={styles.fieldrow}>
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
          <pre>X: {x}</pre>
          <pre>PRESENCE: {JSON.stringify(presenceData, null, 2)}</pre>
          <pre>COORDS: {JSON.stringify(state, null, 2)}</pre>
        </div>
        <Toolbar />
      </main>
    </div>
  );
}
