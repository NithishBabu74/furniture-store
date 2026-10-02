// Generates crisp, furniture-themed SVG artwork into public/images (run: node scripts-gen-art.mjs)
import fs from "fs";
const out = "public/images/";
let uid = 0;
const R = (x, y, w, h, fill, rx = 0, extra = "") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" ${extra}/>`;
const E = (cx, cy, rx, ry, fill, extra = "") => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" ${extra}/>`;
const P = (d, fill, extra = "") => `<path d="${d}" fill="${fill}" ${extra}/>`;
const G = (t, inner) => `<g transform="${t}">${inner}</g>`;

const PALS = {
  warm:  { wall: "#f1e4d3", wall2: "#e6d3bc", floor: "#c8a47c", floor2: "#b88e63", wood: "#a9774b", dark: "#6b4528", gold: "#b88e2f", a: "#8f9f82", a2: "#7a8a6e", b: "#e0b36a", leaf: "#5c8a5a", leaf2: "#3f6e44", cream: "#fff6e8" },
  sage:  { wall: "#e4ebe0", wall2: "#d3ddcd", floor: "#d2b48c", floor2: "#bf9d73", wood: "#9c6b42", dark: "#5f3e25", gold: "#b88e2f", a: "#c9805a", a2: "#b46d49", b: "#e8c27a", leaf: "#4f8657", leaf2: "#356a3f", cream: "#fffaf0" },
  blush: { wall: "#f4e1dc", wall2: "#ead0c9", floor: "#cfa982", floor2: "#bd946a", wood: "#a4724a", dark: "#68432a", gold: "#b88e2f", a: "#b5736a", a2: "#9e5d55", b: "#e6bf7a", leaf: "#5b8c5c", leaf2: "#3d6b45", cream: "#fff5ee" },
  navy:  { wall: "#e8e6e0", wall2: "#d8d5cc", floor: "#c7a47d", floor2: "#b48d63", wood: "#a2724a", dark: "#5e3d25", gold: "#b88e2f", a: "#3f5a7a", a2: "#324a66", b: "#e3b866", leaf: "#58895a", leaf2: "#3b6b45", cream: "#fffaf2" },
};

function room(W, H, fy, p) {
  const id = "g" + uid++;
  let planks = "";
  for (let y = fy + 28; y < H; y += 34) planks += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${p.floor2}" stroke-opacity=".35" stroke-width="2"/>`;
  return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.wall}"/><stop offset="1" stop-color="${p.wall2}"/></linearGradient></defs>`
    + R(0, 0, W, fy, `url(#${id})`) + R(0, fy, W, H - fy, p.floor) + planks
    + R(0, fy - 16, W, 16, p.cream) + R(0, fy - 2, W, 3, p.wall2);
}
function windowFrame(x, y, w, h, p, curtain) {
  const id = "s" + uid++;
  const cl = E(x + w * .3, y + h * .3, w * .14, h * .06, "#fff", 'opacity=".9"') + E(x + w * .4, y + h * .27, w * .1, h * .06, "#fff", 'opacity=".9"') + E(x + w * .72, y + h * .5, w * .13, h * .05, "#fff", 'opacity=".8"');
  return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fd0ec"/><stop offset="1" stop-color="#e2f2fa"/></linearGradient></defs>`
    + R(x - 12, y - 12, w + 24, h + 24, "#fff", 6) + R(x, y, w, h, `url(#${id})`) + cl
    + P(`M${x} ${y + h} L${x + w * .35} ${y + h * .62} L${x + w * .6} ${y + h} Z`, "#bcd9b4", 'opacity=".7"')
    + R(x + w / 2 - 4, y, 8, h, "#fff") + R(x, y + h / 2 - 4, w, 8, "#fff") + R(x - 20, y + h + 10, w + 40, 12, "#fff", 4)
    + (curtain ? R(x - 46, y - 24, 40, h + 70, curtain, 10) + R(x + w + 6, y - 24, 40, h + 70, curtain, 10) + R(x - 60, y - 30, w + 120, 10, p.dark, 5) : "");
}
function sofa(x, fy, w, c, c2, p, pillows = true) {
  const t = fy - 10;
  return R(x + 14, fy - 14, 16, 14, p.dark, 3) + R(x + w - 30, fy - 14, 16, 14, p.dark, 3)
    + R(x + 18, fy - 150, w - 36, 100, c2, 26) + R(x - 14, fy - 112, 46, 86, c, 22) + R(x + w - 32, fy - 112, 46, 86, c, 22)
    + R(x + 14, fy - 86, w - 28, 62, c, 14)
    + R(x + 22, fy - 100, (w - 52) / 2, 38, c2, 14, 'opacity=".55"') + R(x + 30 + (w - 52) / 2, fy - 100, (w - 52) / 2, 38, c2, 14, 'opacity=".55"')
    + (pillows ? G(`rotate(-8 ${x + 70} ${fy - 100})`, R(x + 40, fy - 134, 62, 58, p.b, 12) + R(x + 48, fy - 126, 46, 42, p.cream, 8, 'opacity=".35"')) + G(`rotate(8 ${x + w - 70} ${fy - 100})`, R(x + w - 100, fy - 130, 58, 54, p.cream, 12) + R(x + w - 92, fy - 122, 42, 38, p.gold, 8, 'opacity=".35"')) : "");
}
function armchair(x, fy, w, c, c2, p) {
  return R(x + 10, fy - 12, 12, 12, p.dark, 3) + R(x + w - 22, fy - 12, 12, 12, p.dark, 3)
    + R(x + 8, fy - 170, w - 16, 130, c2, 40) + R(x - 12, fy - 100, 40, 78, c, 18) + R(x + w - 28, fy - 100, 40, 78, c, 18) + R(x + 10, fy - 78, w - 20, 54, c, 14);
}
function floorLamp(x, fy, h, p) {
  const top = fy - h;
  return E(x, fy - 4, 26, 6, p.dark, 'opacity=".25"') + R(x - 3, top + 40, 6, h - 44, p.dark, 3) + E(x, fy - 6, 22, 6, p.dark)
    + E(x, top + 30, 70, 70, p.b, 'opacity=".16"') + P(`M${x - 34} ${top + 50} L${x - 20} ${top} L${x + 20} ${top} L${x + 34} ${top + 50} Z`, p.cream) + P(`M${x - 34} ${top + 50} L${x - 20} ${top} L${x + 20} ${top} L${x + 34} ${top + 50} Z`, p.b, 'opacity=".35"');
}
function plant(x, fy, s, p) {
  const leaf = (rot, len, c) => G(`translate(${x} ${fy - 60 * s}) rotate(${rot})`, P(`M0 0 C${-16 * s} ${-len * .4 * s} ${-12 * s} ${-len * .85 * s} 0 ${-len * s} C${12 * s} ${-len * .85 * s} ${16 * s} ${-len * .4 * s} 0 0 Z`, c));
  return leaf(-48, 120, p.leaf2) + leaf(48, 120, p.leaf2) + leaf(-24, 150, p.leaf) + leaf(24, 150, p.leaf) + leaf(0, 175, p.leaf2) + leaf(-70, 90, p.leaf) + leaf(70, 90, p.leaf)
    + P(`M${x - 34 * s} ${fy - 66 * s} L${x + 34 * s} ${fy - 66 * s} L${x + 26 * s} ${fy} L${x - 26 * s} ${fy} Z`, p.cream) + R(x - 36 * s, fy - 72 * s, 72 * s, 12 * s, p.wall2, 3);
}
function rug(cx, fy, w, p, col) {
  return E(cx, fy + 52, w / 2, 40, col, 'opacity=".9"') + E(cx, fy + 52, w / 2 - 22, 28, "none", `stroke="${p.cream}" stroke-width="3" stroke-opacity=".7"`);
}
function coffeeTable(x, fy, w, p) {
  return R(x + 14, fy - 40, 8, 40, p.dark, 3) + R(x + w - 22, fy - 40, 8, 40, p.dark, 3) + R(x, fy - 52, w, 14, p.wood, 6)
    + R(x + 20, fy - 64, 50, 12, p.a, 2) + R(x + 24, fy - 74, 42, 10, p.b, 2) + E(x + w - 46, fy - 62, 14, 4, p.cream) + R(x + w - 58, fy - 78, 24, 18, p.cream, 4) + R(x + w - 34, fy - 74, 8, 10, "none", 4, `stroke="${p.cream}" stroke-width="3"`);
}
function art(x, y, w, h, p, kind = 0) {
  const inner = kind === 0 ? E(x + w / 2, y + h * .6, w * .26, w * .26, p.b) + P(`M${x + 10} ${y + h - 10} Q${x + w / 2} ${y + h * .35} ${x + w - 10} ${y + h - 10} Z`, p.a)
    : kind === 1 ? E(x + w * .35, y + h * .38, w * .16, w * .16, p.gold) + R(x + w * .42, y + h * .5, w * .38, h * .36, p.a2, 4) + R(x + w * .18, y + h * .62, w * .2, h * .24, p.b, 4)
    : P(`M${x + 10} ${y + h * .7} Q${x + w * .3} ${y + h * .2} ${x + w * .5} ${y + h * .6} T${x + w - 10} ${y + h * .4} L${x + w - 10} ${y + h - 10} L${x + 10} ${y + h - 10} Z`, p.leaf) + E(x + w * .7, y + h * .28, w * .1, w * .1, p.b);
  return R(x, y, w, h, p.dark, 4) + R(x + 8, y + 8, w - 16, h - 16, p.cream, 2) + `<clipPath id="c${uid}"><rect x="${x + 8}" y="${y + 8}" width="${w - 16}" height="${h - 16}"/></clipPath><g clip-path="url(#c${uid++})">${inner}</g>`;
}
function shelf(x, y, w, p) {
  const colors = [p.a, p.b, p.dark, p.a2, p.gold, p.leaf, p.wood]; let books = ""; let bx = x + 14;
  for (let i = 0; i < 7; i++) { const bh = 44 + (i * 13) % 26, bw = 14 + (i * 5) % 8; books += R(bx, y - bh, bw, bh, colors[i], 2); bx += bw + 3; }
  return R(x, y, w, 12, p.wood, 3) + books + R(bx + 10, y - 50, 34, 50, p.cream, 8) + P(`M${bx + 20} ${y - 50} q-4 -18 4 -26 q8 8 4 26 Z`, p.leaf) + R(x + w - 70, y - 20, 50, 20, p.a2, 3) + R(x + w - 62, y - 32, 36, 12, p.b, 3);
}
function chair(x, fy, s, c, p) {
  return R(x + 4 * s, fy - 70 * s, 8 * s, 70 * s, p.dark, 3) + R(x + 52 * s, fy - 70 * s, 8 * s, 70 * s, p.dark, 3) + R(x + 2 * s, fy - 150 * s, 60 * s, 82 * s, c, 12 * s) + R(x - 2 * s, fy - 80 * s, 68 * s, 16 * s, p.wood, 6 * s) + R(x + 12 * s, fy - 130 * s, 40 * s, 40 * s, p.cream, 8 * s, 'opacity=".25"');
}
function pendant(x, y, len, p) {
  return R(x - 1.5, y, 3, len, p.dark) + P(`M${x - 46} ${y + len + 34} Q${x - 40} ${y + len - 4} ${x} ${y + len - 6} Q${x + 40} ${y + len - 4} ${x + 46} ${y + len + 34} Z`, p.gold) + E(x, y + len + 34, 46, 7, p.b) + E(x, y + len + 56, 70, 28, p.b, 'opacity=".18"');
}
function diningTable(x, fy, w, p) {
  return R(x + 18, fy - 90, 12, 90, p.dark, 3) + R(x + w - 30, fy - 90, 12, 90, p.dark, 3) + R(x - 6, fy - 108, w + 12, 20, p.wood, 8)
    + E(x + w * .3, fy - 112, 40, 8, p.cream) + E(x + w * .7, fy - 112, 40, 8, p.cream) + E(x + w / 2, fy - 122, 24, 12, p.cream) + P(`M${x + w / 2 - 14} ${fy - 134} q-4 -22 4 -34 q10 10 4 34 Z`, p.leaf) + P(`M${x + w / 2 + 2} ${fy - 134} q8 -18 16 -26 q2 14 -8 26 Z`, p.leaf2) + R(x + w / 2 - 12, fy - 134, 24, 18, p.a, 5);
}
function bed(x, fy, w, p, c) {
  return R(x - 10, fy - 230, w + 20, 200, p.wood, 18) + R(x + 6, fy - 214, w - 12, 164, p.dark, 12, 'opacity=".18"')
    + R(x - 6, fy - 40, w + 12, 26, p.dark, 6) + R(x + 6, fy - 16, 14, 16, p.dark, 3) + R(x + w - 20, fy - 16, 14, 16, p.dark, 3)
    + R(x, fy - 118, w, 84, p.cream, 14) + R(x + 16, fy - 168, w * .4, 62, "#fff", 16) + R(x + w * .52, fy - 168, w * .4, 62, "#fff", 16)
    + R(x + 16, fy - 168, w * .4, 62, p.wall2, 16, 'opacity=".4"') + R(x - 4, fy - 84, w + 8, 56, c, 12) + R(x - 4, fy - 84, w + 8, 18, p.cream, 10, 'opacity=".4"')
    + R(x + w * .1, fy - 60, w * .8, 10, p.b, 5, 'opacity=".8"');
}
function nightstand(x, fy, p) {
  return R(x, fy - 78, 78, 78, p.wood, 6) + R(x + 8, fy - 68, 62, 28, p.dark, 4, 'opacity=".25"') + R(x + 8, fy - 36, 62, 28, p.dark, 4, 'opacity=".25"') + E(x + 39, fy - 54, 4, 4, p.b) + E(x + 39, fy - 22, 4, 4, p.b)
    + R(x + 36, fy - 110, 6, 32, p.dark) + P(`M${x + 14} ${fy - 108} L${x + 24} ${fy - 150} L${x + 54} ${fy - 150} L${x + 64} ${fy - 108} Z`, p.cream) + E(x + 39, fy - 130, 60, 60, p.b, 'opacity=".14"');
}
function desk(x, fy, w, p) {
  return R(x - 8, fy - 100, w + 16, 16, p.wood, 6) + R(x, fy - 84, 10, 84, p.dark, 3) + R(x + w - 10, fy - 84, 10, 84, p.dark, 3) + R(x + w - 120, fy - 84, 110, 70, p.wood, 4) + R(x + w - 112, fy - 76, 94, 26, p.dark, 3, 'opacity=".22"') + R(x + w - 112, fy - 46, 94, 26, p.dark, 3, 'opacity=".22"')
    + R(x + 40, fy - 190, 120, 82, p.dark, 6) + R(x + 46, fy - 184, 108, 66, "#cfe6f2", 3) + P(`M${x + 46} ${fy - 118} L${x + 80} ${fy - 150} L${x + 104} ${fy - 128} L${x + 124} ${fy - 146} L${x + 154} ${fy - 118} Z`, p.leaf, 'opacity=".7"') + R(x + 96, fy - 112, 8, 14, p.dark) + R(x + 80, fy - 106, 40, 6, p.dark, 3)
    + R(x + 190, fy - 128, 30, 28, p.cream, 5) + R(x + 218, fy - 122, 8, 14, "none", 4, `stroke="${p.cream}" stroke-width="3"`) + R(x + w - 150, fy - 112, 60, 12, p.a, 2) + R(x + w - 146, fy - 122, 52, 10, p.b, 2)
    + R(x + w - 60, fy - 118, 4, 18, p.dark) + P(`M${x + w - 82} ${fy - 150} L${x + w - 40} ${fy - 150} L${x + w - 56} ${fy - 118} Z`, p.gold);
}
function deskChair(x, fy, c, p) {
  return R(x + 28, fy - 50, 8, 50, p.dark, 3) + R(x + 6, fy - 8, 52, 8, p.dark, 4) + R(x, fy - 74, 64, 22, c, 9) + R(x + 6, fy - 150, 52, 80, c, 16);
}
function bigShelf(x, fy, w, h, p) {
  let s = R(x, fy - h, w, h, p.wood, 6) + R(x + 8, fy - h + 8, w - 16, h - 16, p.dark, 3, 'opacity=".28"');
  const rows = 4, rh = (h - 16) / rows, cols = [p.a, p.b, p.a2, p.gold, p.cream, p.leaf, p.dark];
  for (let r = 0; r < rows; r++) {
    const y = fy - h + 8 + (r + 1) * rh; s += R(x + 8, y - 5, w - 16, 7, p.wood);
    let bx = x + 14; for (let i = 0; i < 6; i++) { if ((r + i) % 4 === 3) { bx += 16; continue; } const bh = rh * (.5 + ((r * 7 + i * 5) % 4) / 10), bw = 12 + ((i * 3 + r) % 3) * 4; s += R(bx, y - 5 - bh, bw, bh, cols[(r + i * 2) % cols.length], 2); bx += bw + 3; }
  }
  return s;
}
const wrap = (W, H, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">${body}</svg>`;

// ---------- scenes (1000 x 700 base) ----------
const W = 1000, H = 700, FY = 520;
const scenes = {
  living: (p) => room(W, H, FY, p) + windowFrame(560, 120, 280, 230, p, p.a2) + art(150, 140, 160, 200, p, 0) + rug(430, FY, 640, p, p.wall2)
    + shelf(690, 468 - 4, 200, p).replace(/<g/g, "<g") + floorLamp(120, FY + 20, 360, p) + sofa(190, FY + 30, 520, p.a, p.a2, p) + coffeeTable(330, FY + 100, 240, p) + plant(880, FY + 40, 1.15, p) + armchair(760, FY + 52, 150, p.b, p.gold, p),
  dining: (p) => room(W, H, FY, p) + windowFrame(110, 130, 250, 230, p, null) + art(640, 130, 150, 190, p, 1) + art(820, 160, 110, 150, p, 2) + pendant(500, 0, 190, p) + rug(500, FY, 700, p, p.wall2)
    + chair(260, FY + 90, 1.25, p.a, p) + chair(620, FY + 90, 1.25, p.a, p) + diningTable(270, FY + 70, 460, p) + chair(380, FY + 120, 1.45, p.a2, p) + chair(530, FY + 120, 1.45, p.a2, p) + plant(900, FY + 40, 1.1, p),
  bedroom: (p) => room(W, H, FY, p) + windowFrame(70, 130, 210, 220, p, p.a) + art(700, 120, 140, 170, p, 0) + art(860, 150, 100, 130, p, 2) + rug(500, FY, 760, p, p.wall2)
    + bed(310, FY + 70, 400, p, p.a) + nightstand(190, FY + 70, p) + nightstand(730, FY + 70, p) + plant(890, FY + 50, 1.0, p),
  study: (p) => room(W, H, FY, p) + bigShelf(60, FY, 250, 420, p) + windowFrame(560, 120, 300, 220, p, null) + art(380, 140, 130, 170, p, 1) + rug(560, FY, 520, p.wall2 ? p : p, p.wall2)
    + desk(360, FY + 50, 480, p) + deskChair(540, FY + 70, p.a, p) + floorLamp(930, FY + 30, 330, p) + plant(330, FY + 40, .9, p),
};
const heroScene = (p) => {
  const w = 1600, h = 900, fy = 640;
  return room(w, h, fy, p) + windowFrame(430, 150, 340, 290, p, p.a2) + art(150, 200, 160, 220, p, 0)
    + rug(480, fy, 880, p, p.wall2) + floorLamp(70, fy + 20, 430, p) + shelf(1000, fy - 150, 300, p)
    + sofa(120, fy + 40, 640, p.a, p.a2, p) + coffeeTable(300, fy + 120, 290, p) + plant(1520, fy + 50, 1.3, p);
};
const bannerScene = (p) => {
  const w = 1600, h = 400, fy = 330;
  return room(w, h, fy, p) + windowFrame(780, 60, 280, 170, p, null) + art(1110, 70, 100, 130, p, 0) + art(1240, 90, 80, 100, p, 2)
    + floorLamp(70, fy + 15, 250, p) + sofa(190, fy + 25, 400, p.a, p.a2, p) + plant(660, fy + 30, .9, p) + chair(1000, fy + 60, 1.0, p.b, p) + diningTable(1090, fy + 50, 300, p).replace(/fy/g, "fy") + plant(1500, fy + 30, 1.0, p)
    + R(0, 0, w, h, "#fff", 0, 'opacity=".28"');
};
const PW = 800, PH = 1000, PF = 700;
const portrait = {
  living: (p) => room(PW, PH, PF, p) + windowFrame(250, 150, 300, 260, p, p.a2) + art(60, 220, 120, 160, p, 0) + art(620, 230, 110, 140, p, 2) + rug(400, PF + 40, 600, p, p.wall2)
    + floorLamp(70, PF + 60, 380, p) + sofa(120, PF + 90, 540, p.a, p.a2, p) + coffeeTable(280, PF + 190, 240, p) + plant(730, PF + 90, 1.1, p),
  dining: (p) => room(PW, PH, PF, p) + art(90, 190, 160, 200, p, 1) + art(560, 220, 120, 150, p, 2) + pendant(400, 0, 230, p) + rug(400, PF + 40, 620, p, p.wall2)
    + chair(170, PF + 110, 1.3, p.a, p) + chair(520, PF + 110, 1.3, p.a, p) + diningTable(160, PF + 90, 480, p) + chair(260, PF + 150, 1.5, p.a2, p) + chair(430, PF + 150, 1.5, p.a2, p) + plant(740, PF + 90, 1.0, p),
  bedroom: (p) => room(PW, PH, PF, p) + windowFrame(60, 190, 210, 230, p, p.a) + art(520, 170, 150, 190, p, 0) + rug(400, PF + 40, 640, p, p.wall2)
    + bed(180, PF + 120, 420, p, p.a) + nightstand(70, PF + 120, p) + nightstand(630, PF + 120, p),
};
const wrapV = (vb, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" preserveAspectRatio="xMidYMid slice">${body}</svg>`;
const w = (name, svg) => fs.writeFileSync(out + name, svg);
w("hero.svg", wrap(1600, 900, heroScene(PALS.warm)));
w("banner.svg", wrap(1600, 400, bannerScene(PALS.warm)));
w("range-dining.svg", wrap(PW, PH, portrait.dining(PALS.sage)));
w("range-living.svg", wrap(PW, PH, portrait.living(PALS.warm)));
w("range-bedroom.svg", wrap(PW, PH, portrait.bedroom(PALS.blush)));
w("room-bedroom.svg", wrapV("100 0 800 700", scenes.bedroom(PALS.sage)));
w("room-dining.svg", wrapV("100 0 800 700", scenes.dining(PALS.warm)));
w("room-living.svg", wrapV("100 0 800 700", scenes.living(PALS.navy)));
w("room-study.svg", wrapV("100 0 800 700", scenes.study(PALS.warm)));
const blog = [["living", "warm"], ["dining", "blush"], ["study", "sage"], ["living", "sage"], ["study", "navy"], ["dining", "warm"], ["bedroom", "warm"]];
blog.forEach(([s, pl], i) => w(`blog-${i + 1}.svg`, wrap(W, H, scenes[s](PALS[pl]))));
fs.writeFileSync(out + "../favicon.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 28"><path d="M2 26 L14 3 L26 26" fill="none" stroke="#b88e2f" stroke-width="3.2" stroke-linejoin="round"/><path d="M14 26 L26 8 L38 26" fill="none" stroke="#b88e2f" stroke-width="3.2" stroke-linejoin="round"/></svg>`);
console.log("done");
