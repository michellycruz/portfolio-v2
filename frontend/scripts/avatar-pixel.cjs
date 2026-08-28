// Avatar 8-bit desenhado, no estilo dos avatares de perfil: contorno escuro em
// tudo, olho com esclera e iris, sobrancelha, nariz sugerido, cabelo em tres
// tons. O circulo coral vem da imagem que ja estava no site -- a foto e varrida
// e tudo que nao e fundo vira fundo, entao sobra o disco intacto.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { decode, encode } = require('./png.cjs');

const IMAGES = path.join(__dirname, '..', 'public', 'images');
const SRC = path.join(IMAGES, 'foto-pessoal.png');  // so o circulo sai daqui
const GRID = 48;
const SIZE = 528;
const CELL = SIZE / GRID; // 11px

const C = {
  ink:      [ 32,  23,  26],
  hair:     [ 58,  42,  43],
  hairMid:  [ 92,  67,  66],
  hairHi:   [136, 104,  99],
  skin:     [246, 205, 173],
  skinMid:  [230, 178, 139],
  skinLow:  [200, 142, 105],
  sclera:   [255, 252, 248],
  iris:     [ 92,  58,  48],
  brow:     [ 58,  42,  43],
  mouth:    [178, 100,  94],
  lip:      [206, 128, 120],
  shirt:    [ 27,  28,  35],
  shirtMid: [ 44,  46,  57],
  collar:   [ 66,  70,  84],
};

const src = decode(fs.readFileSync(SRC));
const at = (x, y) => { const i = (y * src.width + x) * 4; return [src.px[i], src.px[i+1], src.px[i+2], src.px[i+3]]; };
const CORAL = at(30, 181);

const canvas = Buffer.alloc(SIZE * SIZE * 4);
for (let y = 0; y < SIZE; y++) {
  for (let x = 0; x < SIZE; x++) {
    const a = at(
      Math.min(src.width - 1, Math.floor((x * src.width) / SIZE)),
      Math.min(src.height - 1, Math.floor((y * src.height) / SIZE))
    )[3];
    const i = (y * SIZE + x) * 4;
    canvas[i] = CORAL[0]; canvas[i+1] = CORAL[1]; canvas[i+2] = CORAL[2]; canvas[i+3] = a;
  }
}

const cells = new Map();
const k = (x, y) => y * GRID + x;
const put = (x, y, c) => { if (x >= 0 && y >= 0 && x < GRID && y < GRID) cells.set(k(x, y), c); };
const get = (x, y) => cells.get(k(x, y));
const rect = (x0, y0, w, h, c) => { for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) put(x, y, c); };
const ellipse = (cx, cy, rx, ry, c, test = () => true) => {
  for (let y = 0; y < GRID; y++) for (let x = 0; x < GRID; x++) {
    const dx = (x + 0.5 - cx) / rx, dy = (y + 0.5 - cy) / ry;
    if (dx * dx + dy * dy <= 1 && test(x, y)) put(x, y, c);
  }
};
const mirror = (fn) => { fn(1); fn(-1); };
const CX = 24;

// ---------------- corpo ----------------
ellipse(CX, 52, 22, 14, C.shirt);
rect(1, 43, 46, 5, C.shirt);
// ombro com uma faixa mais clara, para nao ser um bloco chapado
ellipse(CX, 54, 19, 12, C.shirtMid);
rect(3, 46, 42, 2, C.shirtMid);

// gola aberta: duas abas descendo em V
mirror((s) => {
  for (let i = 0; i < 7; i++) {
    put(CX + s * (1 + i), 40 + i, C.ink);
    put(CX + s * (2 + i), 40 + i, C.collar);
    put(CX + s * (3 + i), 40 + i, C.collar);
    put(CX + s * (4 + i), 40 + i, C.ink);
  }
});

// pescoco
rect(CX - 4, 33, 8, 8, C.skinMid);
rect(CX - 4, 33, 8, 2, C.skinLow); // sombra do queixo no pescoco

// ---------------- cabelo, volume ----------------
ellipse(CX, 20, 14, 15, C.hair);
rect(10, 20, 5, 12, C.hair);
rect(33, 20, 5, 12, C.hair);
// tufos: quebram a cupula lisa, que era o que mais destoava da referencia
[[15, 8, 3, 3], [19, 6, 4, 4], [24, 5, 5, 4], [30, 7, 4, 3], [34, 10, 3, 3], [12, 11, 3, 3]]
  .forEach(([x, y, w, h]) => rect(x, y, w, h, C.hair));

// ---------------- rosto ----------------
ellipse(CX, 24, 10, 12, C.skin, (x, y) => y >= 14);
// lado esquerdo na sombra: a luz vem de cima e da direita
ellipse(CX, 24, 10, 12, C.skinMid, (x, y) => y >= 15 && x <= CX - 6);

// franja: cobre a testa com uma curva, e cai em bico no meio
for (let x = 12; x <= 36; x++) {
  const edge = 16 + Math.round(2.2 * Math.sin(((x - 12) / 24) * Math.PI));
  for (let y = 10; y <= edge; y++) put(x, y, C.hair);
}
rect(CX - 1, 18, 2, 2, C.hair); // biquinho da franja

// mechas: tons medios em faixas verticais, como sprite antigo sombreava
// fios: cada um desce uma coluna e termina em degrau, como sprite antigo fazia
[[14, 13, 6], [18, 9, 9], [22, 7, 6], [27, 8, 9], [31, 10, 7], [35, 13, 5]]
  .forEach(([x, y, len]) => {
    for (let i = 0; i < len; i++) put(x + (i > len - 3 ? 1 : 0), y + i, C.hairMid);
  });
rect(21, 6, 5, 2, C.hairHi);
rect(19, 8, 2, 2, C.hairHi);
rect(27, 8, 3, 2, C.hairHi);
put(16, 12, C.hairHi);
put(33, 12, C.hairHi);
rect(10, 28, 4, 4, C.hairMid);
rect(34, 28, 4, 4, C.hairMid);

// ---------------- olhos ----------------
mirror((s) => {
  const x0 = s > 0 ? 26 : 17;    // olho de 5 celulas, 4 de folga entre eles
  rect(x0, 23, 5, 4, C.sclera);
  rect(x0 + 1, 23, 3, 4, C.iris);
  rect(x0 + 1, 24, 3, 2, C.ink);
  put(x0 + 1, 23, C.sclera);     // brilho no canto de cima, os dois do mesmo lado
  rect(x0, 22, 5, 1, C.ink);     // cilio
  put(x0 + (s > 0 ? 4 : 0), 26, C.ink);
  rect(x0, 20, 5, 1, C.brow);    // sobrancelha, agora abaixo da franja
  put(x0 + (s > 0 ? 4 : 0), 19, C.brow);
});

// ---------------- nariz e boca ----------------
rect(CX - 1, 28, 2, 2, C.skinMid);
rect(CX - 2, 30, 2, 1, C.skinLow);
rect(CX, 30, 2, 1, C.skinLow);
rect(CX - 3, 32, 6, 1, C.mouth);
rect(CX - 2, 33, 4, 1, C.lip);
put(CX - 4, 31, C.mouth);
put(CX + 3, 31, C.mouth);

// ---------------- contorno escuro ----------------
// silhueta: uma celula de tinta em volta de tudo que foi desenhado
const border = [];
for (let y = 0; y < GRID; y++) for (let x = 0; x < GRID; x++) {
  if (get(x, y)) continue;
  if ([[1,0],[-1,0],[0,1],[0,-1]].some(([dx, dy]) => get(x + dx, y + dy))) border.push([x, y]);
}
border.forEach(([x, y]) => put(x, y, C.ink));

// contorno interno: onde a pele encosta no cabelo, e onde o pescoco encosta na camisa
for (let y = 0; y < GRID; y++) for (let x = 0; x < GRID; x++) {
  const c = get(x, y);
  if (!c) continue;
  const isSkin = c === C.skin || c === C.skinMid || c === C.skinLow;
  if (!isSkin) continue;
  const touchesHair = [[1,0],[-1,0],[0,-1]].some(([dx, dy]) => {
    const n = get(x + dx, y + dy);
    return n === C.hair || n === C.hairMid || n === C.hairHi;
  });
  if (touchesHair) put(x, y, C.ink);
}

// ---------------- pinta ----------------
for (const [key, c] of cells) {
  const gx = key % GRID, gy = Math.floor(key / GRID);
  for (let y = gy * CELL; y < (gy + 1) * CELL; y++) {
    for (let x = gx * CELL; x < (gx + 1) * CELL; x++) {
      const i = (y * SIZE + x) * 4;
      if (canvas[i + 3] === 0) continue;
      canvas[i] = c[0]; canvas[i+1] = c[1]; canvas[i+2] = c[2]; canvas[i+3] = 255;
    }
  }
}

// O nome carrega o hash do conteudo. Sem isso a arte nova chega num caminho
// que a CDN ja tem em cache (max-age de 4h) e o site continua mostrando a
// anterior por horas -- foi o que aconteceu na primeira versao. Arte diferente,
// URL diferente, e nao ha cache velho para servir.
const png = encode({ width: SIZE, height: SIZE, px: canvas });
// O sal entra no hash so para poder abandonar uma URL sem mudar a arte. Subiu
// para 2 quando o Cloudflare guardou o index.html debaixo do caminho da imagem
// (o servidor respondia 200 com a pagina para arquivo inexistente, ja
// corrigido) e passou a servir HTML no lugar do PNG por horas: o unico jeito
// de sair na frente do cache, sem acesso ao painel, e mudar de caminho.
const NAME_SALT = '2';
const hash = crypto.createHash('sha1').update(NAME_SALT).update(png).digest('hex').slice(0, 8);
const name = `avatar-${hash}.png`;

for (const old of fs.readdirSync(IMAGES)) {
  if (/^avatar-[0-9a-f]{8}.png$/.test(old) && old !== name) fs.unlinkSync(path.join(IMAGES, old));
}
fs.writeFileSync(path.join(IMAGES, name), png);

// A URL vive no conteudo, servida pela API e espelhada no fallback. Trocar o
// nome sem trocar os dois deixaria o site apontando para um arquivo que nao
// existe mais, entao o gerador cuida disso.
const url = `/images/${name}`;
const patches = [
  ['../../backend/internal/content/data.go', /PhotoURL:( +)"[^"]*"/, (m, sp) => `PhotoURL:${sp}"${url}"`],
  ['../src/data/fallback-content.ts', /photoUrl: "[^"]*"/, () => `photoUrl: "${url}"`],
];
for (const [rel, re, replacement] of patches) {
  const file = path.join(__dirname, rel);
  const before = fs.readFileSync(file, 'utf8');
  if (!re.test(before)) throw new Error('nao achei a URL da foto em ' + rel);
  fs.writeFileSync(file, before.replace(re, replacement));
}

console.log(name + ':', cells.size, 'celulas, URL atualizada no backend e no fallback');
