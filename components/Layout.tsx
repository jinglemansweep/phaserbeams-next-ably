import Ably from "ably";
import {
  configureAbly,
  useChannel,
  usePresence,
  assertConfiguration,
} from "@ably-labs/react-hooks";
import React, { useCallback, useState, useEffect } from "react";
import DebugView from "./DebugView";
import ParticipantList from "./ParticipantList";
import Toolbar from "./Toolbar";

configureAbly({
  authUrl: `${process.env.NEXT_PUBLIC_HOSTNAME}/api/createTokenRequest`,
});

const KEY_LEFT = "o";
const KEY_RIGHT = "p";

type Coordinates = Record<string, { x: number; y: number }>;

export default function GameScene() {
  const ably = assertConfiguration();
  const [presenceData] = usePresence("presence");
  const [coords, setCoords] = useState<Record<string, unknown>>({});

  const [channel] = useChannel("game", (message) => {
    console.log("message", message);
    if (message.name === "move") {
      const newCoords = {
        ...coords,
        ...{ [message.clientId]: { x: message.data.x, y: message.data.y } },
      };
      console.log(newCoords);
      setCoords(newCoords);
    }
  });

  const moveCoords = useCallback(
    (x: number, y: number) => {
      const current = coords[ably.auth.clientId] || { x: 0, y: 0 };
      let newX = current.x + x;
      let newY = current.y + y;
      if (newX > 0 && newX < 300) {
        channel.publish("move", {
          x: newX,
          y: newY,
        });
      }
    },
    [coords, ably.auth.clientId, channel]
  );

  useEffect(() => {
    const handleKeypress = (e: KeyboardEvent) => {
      // console.log("key", e.key);
      if (e.key === KEY_LEFT) {
        moveCoords(-1, 0);
      }
      if (e.key === KEY_RIGHT) {
        moveCoords(1, 0);
      }
    };
    window.addEventListener("keypress", handleKeypress);
    return () => window.removeEventListener("keypress", handleKeypress);
  }, [coords, moveCoords]);

  return (
    <>
      <header className="w3-container w3-purple">
        <h1>PhaserBeams</h1>
      </header>
      <main>
        <div className="w3-cell-row">
          <div
            className="w3-container w3-light-grey w3-cell"
            style={{ width: "20%" }}
          >
            <nav>
              <h4>Navigation</h4>
              <ul>
                <li>Home</li>
              </ul>
              <h4>Participants</h4>
              <ParticipantList />
            </nav>
          </div>
          <div className="w3-container w3-cell">
            <h2>Dashboard</h2>
            <Toolbar moveCoords={moveCoords} />
            <DebugView coords={coords} />
          </div>
        </div>
      </main>

      <div></div>

      <footer className="w3-container w3-blue">
        <p>By JingleManSweep</p>
      </footer>
    </>
  );
}
