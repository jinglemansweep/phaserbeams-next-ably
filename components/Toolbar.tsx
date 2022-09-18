import React, { useState, useEffect } from "react";

type Props = {
  moveCoords: Function;
};

export default function Toolbar({ moveCoords }: Props) {
  return (
    <div className="w3-container w3-card  w3-padding-16">
      <button
        className="w3-button w3-green"
        onClick={() => {
          moveCoords(-1, 0);
        }}
      >
        -
      </button>
      <button
        className="w3-button w3-green"
        onClick={() => {
          moveCoords(1, 0);
        }}
      >
        +
      </button>
    </div>
  );
}
