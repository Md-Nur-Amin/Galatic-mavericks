import React, { useEffect, useRef } from "react";
import kaboom from "kaboom";

const KaboomGame = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    const k = kaboom({
      global: false,
      width: 640,
      height: 480,
      canvas: gameRef.current,
      background: [0, 0, 0], // Background color
    });

    // Load sprite
    k.loadSprite("player", "https://i.imgur.com/Wb1qfhK.png");

    // Add a player
    k.add([
      k.sprite("player"),
      k.pos(120, 80),
      k.area(),
      k.body(),
    ]);

    // Set gravity
    k.setGravity(2400);

    // Add controls
    k.onKeyDown("left", () => {
      k.get("player")[0].move(-120, 0);
    });

    k.onKeyDown("right", () => {
      k.get("player")[0].move(120, 0);
    });

    k.onKeyPress("space", () => {
      if (k.get("player")[0].isGrounded()) {
        k.get("player")[0].jump();
      }
    });

  }, []);

  return <canvas ref={gameRef}></canvas>;
};

export default KaboomGame;
