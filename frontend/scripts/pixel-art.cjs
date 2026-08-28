// Pixel art a partir do retrato ja recortado.
//
// O fundo nao e reconhecido por cor: a boca e o nariz tem tons vizinhos do
// coral e viravam buracos no rosto. Ele e reconhecido por vizinhanca -- um
// preenchimento que entra pela borda do quadro e so anda por pixels quase
// identicos ao coral, entao nada dentro do rosto e alcancado.
const fs = require('fs');
const path = require('path');
const { decode, encode } = require('./png.cjs');

const IMAGES = path.join(__dirname, '..', 'public', 'images');
const SRC = path.join(IMAGES, 'foto-pessoal.png');
const OUT = path.join(IMAGES, 'foto-pixel.png');
const img = decode(fs.readFileSync(SRC));
const at = (x, y) => {
  const i = (y * img.width + x) * 4;
  return [img.px[i], img.px[i + 1], img.px[i + 2], img.px[i + 3]];
};
const BG = at(30, 181);
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

function downsample(grid) {
  const cell = img.width / grid;
  const out = [];
  for (let gy = 0; gy < grid; gy++) {
    for (let gx = 0; gx < grid; gx++) {
      let r = 0, g = 0, b = 0, opaque = 0, total = 0;
      for (let y = Math.floor(gy * cell); y < Math.min(img.height, Math.floor((gy + 1) * cell)); y++) {
        for (let x = Math.floor(gx * cell); x < Math.min(img.width, Math.floor((gx + 1) * cell)); x++) {
          const p = at(x, y);
          total++;
          if (p[3] > 128) { r += p[0]; g += p[1]; b += p[2]; opaque++; }
        }
      }
      out.push(opaque / total < 0.5
        ? [0, 0, 0, 0]
        : [Math.round(r / opaque), Math.round(g / opaque), Math.round(b / opaque), 255]);
    }
  }
  return out;
}

// pinta de fora para dentro: so e fundo o coral conectado a borda do quadro
function floodBackground(small, grid, tol) {
  const isBg = new Array(grid * grid).fill(false);
  const queue = [];
  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= grid || y >= grid) return;
    const i = y * grid + x;
    if (isBg[i]) return;
    const p = small[i];
    if (p[3] !== 0 && dist(p, BG) > tol) return;
    isBg[i] = true;
    queue.push([x, y]);
  };
  for (let i = 0; i < grid; i++) { push(i, 0); push(i, grid - 1); push(0, i); push(grid - 1, i); }
  while (queue.length) {
    const [x, y] = queue.pop();
    push(x + 1, y); push(x - 1, y); push(x, y + 1); push(x, y - 1);
  }
  return isBg;
}

// pixel art vive de cor decidida; a foto e de camera de celular, lavada
function punch(c, sat = 1.35, contrast = 1.12) {
  const lum = 0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2];
  return c.slice(0, 3).map((v) => {
    const s = lum + (v - lum) * sat;
    return Math.max(0, Math.min(255, Math.round((s - 128) * contrast + 128)));
  });
}

function medianCut(pixels, k) {
  let boxes = [pixels];
  while (boxes.length < k) {
    boxes.sort((A, B) => spread(B) - spread(A));
    const box = boxes.shift();
    if (!box || box.length < 2) { boxes.push(box); break; }
    const axis = longestAxis(box);
    box.sort((p, q) => p[axis] - q[axis]);
    const mid = box.length >> 1;
    boxes.push(box.slice(0, mid), box.slice(mid));
  }
  return boxes.filter((b) => b && b.length).map(average);
}
const range = (box, i) => { let lo = 255, hi = 0; for (const p of box) { if (p[i] < lo) lo = p[i]; if (p[i] > hi) hi = p[i]; } return hi - lo; };
const spread = (box) => (box ? Math.max(range(box, 0), range(box, 1), range(box, 2)) : -1);
const longestAxis = (box) => [0, 1, 2].reduce((best, i) => (range(box, i) > range(box, best) ? i : best), 0);
const average = (box) => {
  const s = box.reduce((a, p) => [a[0] + p[0], a[1] + p[1], a[2] + p[2]], [0, 0, 0]);
  return s.map((v) => Math.round(v / box.length));
};

function build(grid, colors, scale) {
  const small = downsample(grid);
  const isBg = floodBackground(small, grid, 26);

  const subject = [];
  small.forEach((p, i) => { if (p[3] > 0 && !isBg[i]) subject.push(punch(p)); });
  const palette = medianCut(subject, colors);

  const mapped = small.map((p, i) => {
    if (p[3] === 0) return [0, 0, 0, 0];
    if (isBg[i]) return [BG[0], BG[1], BG[2], 255];
    const q = punch(p);
    let best = palette[0], bd = Infinity;
    for (const c of palette) { const d = dist(q, c); if (d < bd) { bd = d; best = c; } }
    return [best[0], best[1], best[2], 255];
  });

  const size = grid * scale;
  const px = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const c = mapped[Math.floor(y / scale) * grid + Math.floor(x / scale)];
      const o = (y * size + x) * 4;
      px[o] = c[0]; px[o + 1] = c[1]; px[o + 2] = c[2]; px[o + 3] = c[3];
    }
  }
  return { width: size, height: size, px, colors: palette.length };
}

// 88 de grade e 18 cores: abaixo disso o rosto deixa de ser reconhecivel,
// acima a arte comeca a parecer so uma foto pequena.
const out = build(88, 18, 6);
fs.writeFileSync(OUT, encode(out));
console.log(OUT + ': ' + out.width + 'px, ' + out.colors + ' cores');
