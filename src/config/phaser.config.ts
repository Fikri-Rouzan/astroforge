import Phaser from "phaser";

export const PHASER_CONFIG: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "astroforge-canvas-container",
  backgroundColor: "#05050a",
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: "100%",
    height: "100%",
  },
  audio: {
    noAudio: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },
};
