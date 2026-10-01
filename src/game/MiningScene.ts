import Phaser from "phaser";

export class MiningScene extends Phaser.Scene {
  private playerShip: Phaser.GameObjects.Graphics | null = null;
  private asteroids: Phaser.GameObjects.Group | null = null;
  private laserLines: Phaser.GameObjects.Graphics | null = null;
  private particleEmitter: Phaser.GameObjects.Particles.ParticleEmitter | null =
    null;
  private currentStatus: string = "IDLE";
  private asteroidGraphicsList: Phaser.GameObjects.Graphics[] = [];

  constructor() {
    super({ key: "MiningScene" });
  }

  preload(): void {}

  create(): void {
    const { width, height } = this.scale;

    for (let i = 0; i < 80; i++) {
      const starX = Phaser.Math.Between(0, width);
      const starY = Phaser.Math.Between(0, height);
      const starAlpha = Phaser.Math.FloatBetween(0.2, 0.8);
      const starRadius = Phaser.Math.FloatBetween(0.5, 1.5);

      const star = this.add.circle(starX, starY, starRadius, 0xffffff);
      star.setAlpha(starAlpha);
    }

    this.laserLines = this.add.graphics();

    const sparkGraphics = this.make.graphics({ x: 0, y: 0 });
    sparkGraphics.fillStyle(0x06b6d4, 1);
    sparkGraphics.fillRect(0, 0, 3, 3);
    const sparkKey = "spark-particle";
    sparkGraphics.generateTexture(sparkKey, 3, 3);

    this.particleEmitter = this.add.particles(0, 0, sparkKey, {
      speed: { min: 50, max: 150 },
      scale: { start: 1, end: 0 },
      blendMode: "ADD",
      lifespan: 600,
      emitting: false,
    });

    this.asteroids = this.physics.add.group();
    this.createAsteroids();

    this.playerShip = this.add.graphics({ x: width * 0.75, y: height * 0.5 });
    this.drawRocket();

    this.scale.on("resize", this.handleResize, this);
  }

  private drawRocket(): void {
    if (!this.playerShip) return;
    this.playerShip.clear();

    this.playerShip.fillStyle(0x0c0b18, 1);
    this.playerShip.lineStyle(2, 0x6366f1, 1);

    this.playerShip.beginPath();
    this.playerShip.moveTo(-2, -10);
    this.playerShip.lineTo(20, -22);
    this.playerShip.lineTo(14, -10);
    this.playerShip.closePath();
    this.playerShip.strokePath();
    this.playerShip.fillPath();

    this.playerShip.beginPath();
    this.playerShip.moveTo(-2, 10);
    this.playerShip.lineTo(20, 22);
    this.playerShip.lineTo(14, 10);
    this.playerShip.closePath();
    this.playerShip.strokePath();
    this.playerShip.fillPath();

    this.playerShip.beginPath();
    this.playerShip.moveTo(-35, 0);
    this.playerShip.lineTo(-12, -11);
    this.playerShip.lineTo(18, -10);
    this.playerShip.lineTo(18, 10);
    this.playerShip.lineTo(-12, 11);
    this.playerShip.closePath();
    this.playerShip.strokePath();
    this.playerShip.fillPath();

    this.playerShip.lineStyle(1.5, 0x06b6d4, 1);
    this.playerShip.fillStyle(0x141226, 1);
    this.playerShip.beginPath();
    this.playerShip.moveTo(18, -6);
    this.playerShip.lineTo(24, -8);
    this.playerShip.lineTo(24, 8);
    this.playerShip.lineTo(18, 6);
    this.playerShip.closePath();
    this.playerShip.strokePath();
    this.playerShip.fillPath();

    this.playerShip.lineStyle(1.5, 0x06b6d4, 1);
    this.playerShip.fillStyle(0x06b6d4, 0.25);
    this.playerShip.beginPath();
    this.playerShip.moveTo(-22, 0);
    this.playerShip.lineTo(-10, -5);
    this.playerShip.lineTo(-4, 0);
    this.playerShip.lineTo(-10, 5);
    this.playerShip.closePath();
    this.playerShip.strokePath();
    this.playerShip.fillPath();

    this.playerShip.lineStyle(1, 0x6366f1, 0.6);
    this.playerShip.lineBetween(-10, -11, -10, 11);
    this.playerShip.lineBetween(6, -10, 6, 10);
  }

  private createAsteroids(): void {
    if (!this.asteroids) return;
    const { width, height } = this.scale;

    this.asteroidGraphicsList = [];

    const asteroidPositions = [
      {
        xRatio: 0.2,
        yRatio: 0.25,
        radius: 26,
        craters: [
          { x: -6, y: -5, r: 5 },
          { x: 8, y: 6, r: 4 },
        ],
        veins: [
          [
            { x: -18, y: -8 },
            { x: -8, y: 0 },
            { x: 4, y: -6 },
          ],
          [
            { x: 2, y: 8 },
            { x: 14, y: 2 },
          ],
        ],
      },
      {
        xRatio: 0.12,
        yRatio: 0.65,
        radius: 16,
        craters: [{ x: 2, y: -2, r: 3 }],
        veins: [
          [
            { x: -10, y: 4 },
            { x: 0, y: -4 },
            { x: 8, y: 2 },
          ],
        ],
      },
      {
        xRatio: 0.35,
        yRatio: 0.5,
        radius: 36,
        craters: [
          { x: -10, y: 10, r: 8 },
          { x: 12, y: -8, r: 6 },
          { x: -5, y: -12, r: 4 },
        ],
        veins: [
          [
            { x: -24, y: -12 },
            { x: -10, y: -4 },
            { x: 8, y: -16 },
          ],
          [
            { x: -8, y: 18 },
            { x: 6, y: 12 },
            { x: 20, y: 20 },
          ],
          [
            { x: 10, y: -2 },
            { x: 24, y: 6 },
          ],
        ],
      },
      {
        xRatio: 0.28,
        yRatio: 0.82,
        radius: 22,
        craters: [
          { x: -5, y: 4, r: 4 },
          { x: 6, y: -5, r: 3 },
        ],
        veins: [
          [
            { x: -14, y: -6 },
            { x: -2, y: -10 },
            { x: 10, y: -4 },
          ],
          [
            { x: -12, y: 8 },
            { x: 4, y: 12 },
          ],
        ],
      },
      {
        xRatio: 0.42,
        yRatio: 0.22,
        radius: 14,
        craters: [{ x: 1, y: 1, r: 3 }],
        veins: [
          [
            { x: -8, y: -4 },
            { x: 2, y: 6 },
          ],
        ],
      },
    ];

    asteroidPositions.forEach((pos) => {
      const targetAsteroid = this.add.graphics({
        x: width * pos.xRatio,
        y: height * pos.yRatio,
      });

      targetAsteroid.lineStyle(2, 0x4b5563, 1);
      targetAsteroid.fillStyle(0x141226, 1);
      targetAsteroid.beginPath();

      const points = 8;
      for (let j = 0; j < points; j++) {
        const angle = (j / points) * Math.PI * 2;
        const variance = Phaser.Math.FloatBetween(0.8, 1.2);
        const r = pos.radius * variance;
        const pX = Math.cos(angle) * r;
        const pY = Math.sin(angle) * r;

        if (j === 0) targetAsteroid.moveTo(pX, pY);
        else targetAsteroid.lineTo(pX, pY);
      }

      targetAsteroid.closePath();
      targetAsteroid.strokePath();
      targetAsteroid.fillPath();

      pos.veins.forEach((vein) => {
        targetAsteroid.lineStyle(1, 0x374151, 0.75);
        targetAsteroid.beginPath();
        targetAsteroid.moveTo(vein[0].x, vein[0].y);
        for (let k = 1; k < vein.length; k++) {
          targetAsteroid.lineTo(vein[k].x, vein[k].y);
        }
        targetAsteroid.strokePath();
      });

      pos.craters.forEach((crater) => {
        targetAsteroid.lineStyle(1, 0x374151, 0.9);
        targetAsteroid.fillStyle(0x0c0b18, 0.85);
        targetAsteroid.fillCircle(crater.x, crater.y, crater.r);
        targetAsteroid.strokeCircle(crater.x, crater.y, crater.r);
      });

      this.asteroids?.add(targetAsteroid);
      const body = targetAsteroid.body as Phaser.Physics.Arcade.Body;
      body.setCircle(pos.radius, -pos.radius, -pos.radius);
      body.setAngularVelocity(Phaser.Math.FloatBetween(-12, 12));

      this.asteroidGraphicsList.push(targetAsteroid);
    });
  }

  private handleResize(gameSize: Phaser.Structs.Size): void {
    const { width, height } = gameSize;

    if (this.playerShip) {
      this.playerShip.x = width * 0.75;
    }

    if (this.asteroidGraphicsList.length === 5) {
      this.asteroidGraphicsList[0].setPosition(width * 0.2, height * 0.25);
      this.asteroidGraphicsList[1].setPosition(width * 0.12, height * 0.65);
      this.asteroidGraphicsList[2].setPosition(width * 0.35, height * 0.5);
      this.asteroidGraphicsList[3].setPosition(width * 0.28, height * 0.82);
      this.asteroidGraphicsList[4].setPosition(width * 0.42, height * 0.22);
    }
  }

  public updateMiningStatus(status: string): void {
    this.currentStatus = status;
  }

  override update(): void {
    if (!this.playerShip || !this.laserLines || !this.particleEmitter) return;

    this.playerShip.y =
      this.scale.height * 0.5 + Math.sin(this.time.now / 400) * 4;

    this.drawRocket();

    const flameLength = 8 + Math.sin(this.time.now / 50) * 4;
    this.playerShip.fillStyle(0xf59e0b, 0.9);
    this.playerShip.beginPath();
    this.playerShip.moveTo(24, -5);
    this.playerShip.lineTo(24 + flameLength, 0);
    this.playerShip.lineTo(24, 5);
    this.playerShip.closePath();
    this.playerShip.fillPath();

    this.playerShip.fillStyle(0x06b6d4, 1);
    this.playerShip.beginPath();
    this.playerShip.moveTo(24, -2.5);
    this.playerShip.lineTo(24 + flameLength * 0.5, 0);
    this.playerShip.lineTo(24, 2.5);
    this.playerShip.closePath();
    this.playerShip.fillPath();

    this.laserLines.clear();

    if (this.currentStatus === "MINING") {
      const noseX = this.playerShip.x - 35;
      const noseY = this.playerShip.y;
      const beamTargetX = this.scale.width * 0.35;
      const beamTargetY =
        this.scale.height * 0.5 + Math.sin(this.time.now / 200) * 10;

      this.laserLines.lineStyle(3, 0x06b6d4, 0.8);
      this.laserLines.lineBetween(noseX, noseY - 2, beamTargetX, beamTargetY);
      this.laserLines.lineBetween(noseX, noseY + 2, beamTargetX, beamTargetY);

      this.laserLines.lineStyle(1, 0xffffff, 1);
      this.laserLines.lineBetween(noseX, noseY, beamTargetX, beamTargetY);

      this.particleEmitter.setPosition(beamTargetX, beamTargetY);
      if (!this.particleEmitter.emitting) {
        this.particleEmitter.start();
      }
    } else {
      if (this.particleEmitter.emitting) {
        this.particleEmitter.stop();
      }
    }
  }
}
