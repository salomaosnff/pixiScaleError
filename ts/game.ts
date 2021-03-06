import * as PIXI from "pixi.js";
import { W, H, stoneInfo } from "./config";
import { Stone, StoneExtra, StoneInfo, Color } from "./interface";

export default class Game extends PIXI.Application {
  private scale: number = 1;
  constructor(scale) {
    super({
      transparent: true,
      width: document.body.clientWidth,
      height: document.body.clientHeight,
      autoDensity: true,
      antialias: true,
      resizeTo: document.body,
    });

    this.scale = scale;

    document.body.appendChild(this.view);

    this.stage.scale.set(this.scale);

    this.startGame();
  }
  private returnColor(c: Color) {
    const colors = {
      b: 0x5777dc,
      r: 0xf3261f,
      bk: 0x2e2e2c,
      y: 0xeeba44,
      w: 0xffffff,
    };
    if (c == Color.Black) return colors.bk;
    if (c == Color.Blue) return colors.b;
    if (c == Color.Red) return colors.r;
    if (c == Color.Yellow) return colors.y;
    if ((c = Color.White)) return colors.w;
  }

  addStone(
    { x, y }: { x: number; y: number },
    { c, n, id, o, fo }: StoneInfo,
    scale: number
  ) {
    const stoneCon = new PIXI.Container() as Stone;
    const stoneBG = PIXI.Sprite.from("images/tas.png");
    const stoneShape = PIXI.Sprite.from("images/shape2.png");
    const stoneCircle = PIXI.Sprite.from("images/circle.png");
    const stoneNum = new PIXI.Text(n + "", { fontSize: 28 });

    stoneNum.y = -14;
    stoneNum.anchor.set(0.5);

    stoneBG.width = stoneInfo.width;
    stoneBG.height = stoneInfo.height;
    stoneBG.anchor.set(0.5);

    stoneShape.width = stoneInfo.width;
    stoneShape.height = (stoneInfo.height / 5) * 2;
    stoneShape.anchor.set(0.5, 1);
    stoneShape.y = stoneInfo.height / 2;
    stoneShape.tint = this.returnColor(c);

    stoneCircle.width = 22;
    stoneCircle.height = 22;
    stoneCircle.anchor.set(0.5);
    stoneCircle.y = 17;

    stoneCon.extra = { stoneInfo: { c, n, id } } as StoneExtra;
    stoneCon.width = stoneInfo.width;
    stoneCon.height = stoneInfo.height;
    stoneCon.x = x;
    stoneCon.y = y;
    stoneCon.pivot.x = stoneCon.width / 2;
    stoneCon.pivot.y = stoneCon.height / 2;

    stoneCon.addChild(stoneBG, stoneShape, stoneCircle, stoneNum);

    this.stage.addChild(stoneCon);

    stoneCon.scale.set(scale);

    return stoneCon;
  }

  private startGame() {
    this.addStone({ x: 100, y: 100 }, { c: Color.Red, n: 10, id: 5 }, 1);
    this.addStone({ x: 200, y: 100 }, { c: Color.Red, n: 10, id: 5 }, 0.7);
    this.addStone({ x: 300, y: 100 }, { c: Color.Red, n: 10, id: 5 }, 0.4);
    this.addStone({ x: 350, y: 100 }, { c: Color.Red, n: 10, id: 5 }, 0.2);
  }
}
function calculateScale() {
  // const sW = screen.width / W;
  // const sH = screen.height / H;
  // const s = sW > sH ? sH : sW;
  (window as any).context = new Game(1);
}
calculateScale();
