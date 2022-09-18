import React from "react";
import { usePresence, assertConfiguration } from "@ably-labs/react-hooks";

export default function Participants() {
  const ably = assertConfiguration();
  const [presenceData] = usePresence("headlines");

  const presenceList = presenceData.map((member, index) => {
    const isItMe = member.clientId === ably.auth.clientId ? "(ME)" : "";

    return (
      <li key={index}>
        <span>{member.clientId}</span>
        <span> {isItMe}</span>
      </li>
    );
  });

  return <ul>{presenceList}</ul>;
}
