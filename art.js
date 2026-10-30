// Hình vẽ vector cho đầu trang. drawPlant('cau' | 'tree', màu quả) trả về chuỗi <svg>.
// Vẽ bằng code (lá, quả lặp theo vòng) để đổi màu quả theo từng giống trong admin.
(function () {
  const F = n => +n.toFixed(1);

  // Điểm trên đường cong bậc 2 và hướng tiếp tuyến
  const qpt = (p0, p1, p2, t) => [
    (1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t * t * p2[0],
    (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t * t * p2[1]
  ];
  const qtan = (p0, p1, p2, t) => {
    const x = 2 * (1 - t) * (p1[0] - p0[0]) + 2 * t * (p2[0] - p1[0]);
    const y = 2 * (1 - t) * (p1[1] - p0[1]) + 2 * t * (p2[1] - p1[1]);
    const l = Math.hypot(x, y) || 1;
    return [x / l, y / l];
  };

  // Một tàu lá cau: cuống cong + lá chét hai bên rủ về phía ngọn
  function frond(o, deg, len, droop, color, width, light) {
    const a = deg * Math.PI / 180;
    const end = [o[0] + Math.cos(a) * len, o[1] + Math.sin(a) * len + droop];
    const ctl = [o[0] + Math.cos(a) * len * .55, o[1] + Math.sin(a) * len * .55 - len * .18];
    let s = `<path d="M${F(o[0])} ${F(o[1])}Q${F(ctl[0])} ${F(ctl[1])} ${F(end[0])} ${F(end[1])}" stroke="${color}" stroke-width="${width}" fill="none" stroke-linecap="round"/>`;
    for (let t = .1; t <= 1.001; t += .075) {
      const p = qpt(o, ctl, end, t), d = qtan(o, ctl, end, t);
      const L = len * .3 * Math.sin(Math.PI * Math.min(1, .15 + t * .95)) + 10;
      for (const side of [-1, 1]) {
        // lá chét chếch về phía ngọn, rủ xuống theo trọng lực
        const nx = -d[1] * side, ny = d[0] * side;
        const tx = p[0] + (nx * .7 + d[0] * .6) * L, ty = p[1] + (ny * .7 + d[1] * .6) * L + L * .75;
        const cx = p[0] + (nx * .55 + d[0] * .2) * L, cy = p[1] + (ny * .55 + d[1] * .2) * L - 2;
        s += `<path d="M${F(p[0])} ${F(p[1])}Q${F(cx)} ${F(cy)} ${F(tx)} ${F(ty)}" stroke="${side < 0 ? (light || color) : color}" stroke-width="${width}" fill="none" stroke-linecap="round"/>`;
      }
    }
    return s;
  }

  // Quả cau dài: hình bầu dục thuôn, có bóng sáng
  const nut = (x, y, rot, c) =>
    `<g transform="translate(${F(x)} ${F(y)}) rotate(${F(rot)})"><ellipse rx="11" ry="24" fill="${c}"/><ellipse rx="3.5" ry="10" cx="-4" cy="-6" fill="#fff" opacity=".3"/><path d="M0 -24 v-6" stroke="#8a6a35" stroke-width="2.5"/></g>`;

  function cau(fruit) {
    const crown = [300, 210];
    let back = '', front = '';
    [[-178, 250, 150], [-2, 250, 150], [-158, 265, 75], [-22, 265, 75], [-118, 230, 10], [-62, 230, 10]].forEach(([d, l, dr]) => back += frond(crown, d, l, dr, '#24583a', 4.5, '#2f6b3f'));
    [[-140, 245, 40], [-40, 245, 40], [-168, 200, 160], [-12, 200, 160], [-100, 205, -4], [-80, 205, -4]].forEach(([d, l, dr]) => front += frond(crown, d, l, dr, '#3f8a4c', 4.5, '#5aa35c'));
    front += frond(crown, -90, 185, -6, '#5aa35c', 4.5, '#7cbc6a');

    // buồng quả hai bên dưới bẹ lá
    let nuts = '';
    const cols = [fruit, fruit, '#7fae45', fruit, '#a9c45a'];
    const bunch = (cx, cy, dir) => {
      let s = `<path d="M300 250 Q${cx - dir * 6} ${cy - 50} ${cx} ${cy - 18}" stroke="#b08a3e" stroke-width="6" fill="none"/>`;
      let k = dir > 0 ? 2 : 0;
      const rows = [4, 5, 5, 4, 3, 2];
      rows.forEach((n, r) => {
        for (let c = 0; c < n; c++) {
          const x = cx + (c - (n - 1) / 2) * 22 + dir * r * 3, y = cy + r * 32;
          s += nut(x, y, (c - (n - 1) / 2) * 7 + dir * 4, cols[k++ % cols.length]);
        }
      });
      return s;
    };
    nuts += bunch(238, 290, -1) + bunch(362, 290, 1);

    // thân cau thẳng, có đốt
    let rings = '';
    for (let y = 300; y < 640; y += 24) rings += `<path d="M287 ${y} Q300 ${y + 5} 313 ${y}" stroke="#6f6448" stroke-width="2" fill="none" opacity=".55"/>`;

    return `<svg viewBox="0 0 600 700" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Hình vẽ cây cau">
      <defs>
        <linearGradient id="trk" x1="0" x2="1"><stop offset="0" stop-color="#8a7d58"/><stop offset=".5" stop-color="#b9a97a"/><stop offset="1" stop-color="#7a6d4b"/></linearGradient>
        <linearGradient id="shaft" x1="0" x2="1"><stop offset="0" stop-color="#5f9a4e"/><stop offset=".5" stop-color="#9cc777"/><stop offset="1" stop-color="#4f8a43"/></linearGradient>
      </defs>
      <ellipse cx="300" cy="664" rx="190" ry="20" fill="#01301f" opacity=".18"/>
      <path d="M289 660 C291 520 289 400 292 250 L308 250 C311 400 309 520 311 660Z" fill="url(#trk)"/>
      ${rings}
      <g class="sway">${back}</g>
      <path d="M286 270 C283 240 290 208 300 192 C310 208 317 240 314 270Z" fill="url(#shaft)"/>
      ${nuts}
      <g class="sway sway-2">${front}</g>
      <path d="M232 662 h136 l-12 34 h-112z" fill="#c9a46a"/><path d="M226 652 h148 v14 h-148z" rx="4" fill="#b98f55"/>
    </svg>`;
  }

  // Cây ăn quả chung: tán tròn nhiều lớp + quả theo màu
  function tree(fruit) {
    const blobs = [[300, 250, 150, '#2f6b3f'], [200, 300, 105, '#3f8a4c'], [400, 300, 105, '#3f8a4c'], [250, 190, 100, '#4b9655'], [355, 195, 95, '#4b9655'], [300, 330, 110, '#3f8a4c'], [300, 160, 80, '#5aa35c']];
    let canopy = blobs.map(([x, y, r, c]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`).join('');
    const fr = [[220, 330], [265, 360], [340, 350], [390, 320], [300, 290], [235, 255], [365, 250], [300, 210], [190, 300], [410, 280]];
    const fruits = fr.map(([x, y]) => `<g><path d="M${x} ${y - 16} q2 -8 7 -10" stroke="#5b4a2a" stroke-width="2.5" fill="none"/><ellipse cx="${x}" cy="${y}" rx="15" ry="19" fill="${fruit}"/><ellipse cx="${x - 5}" cy="${y - 6}" rx="4" ry="6" fill="#fff" opacity=".3"/></g>`).join('');
    return `<svg viewBox="0 0 600 700" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Hình vẽ cây ăn quả">
      <ellipse cx="300" cy="664" rx="190" ry="20" fill="#01301f" opacity=".18"/>
      <path d="M284 660 C286 560 280 470 270 400 L330 400 C320 470 314 560 316 660Z" fill="#8a6a45"/>
      <path d="M300 430 C320 400 350 390 380 380 M292 460 C270 430 240 420 215 410" stroke="#8a6a45" stroke-width="14" fill="none" stroke-linecap="round"/>
      <g class="sway">${canopy}${fruits}</g>
      <path d="M232 662 h136 l-12 34 h-112z" fill="#c9a46a"/><path d="M226 652 h148 v14 h-148z" fill="#b98f55"/>
    </svg>`;
  }

  window.drawPlant = (kind, color) => (kind === 'tree' ? tree : cau)(color || '#e9862f');

  // ---- Cây cỏ trang trí ----
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const GREENS = ['#24583a', '#2f6b3f', '#3f8a4c', '#5aa35c', '#7cbc6a'];

  // Tàu lá cau nhìn ngang, mọc từ góc trái
  function decoFrond(dark) {
    const c1 = dark ? '#1d4a30' : '#2f6b3f', c2 = dark ? '#2f6b3f' : '#5aa35c';
    const body = frond([18, 40], 6, 400, 170, c1, 5, c2) + frond([18, 40], 30, 300, 120, c2, 4.5, '#7cbc6a');
    return `<svg viewBox="0 0 440 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g class="sway">${body}</g></svg>`;
  }

  // Bụi cỏ: nhiều lá cỏ cong mọc từ một gốc, vài lá rộng xen kẽ
  function decoTuft() {
    let s = '';
    for (let i = 0; i < 26; i++) {
      const x = 80 + (rnd() - .5) * 70, h = 45 + rnd() * 50, lean = (rnd() - .5) * 90;
      const tx = x + lean, ty = 100 - h, cx = x + lean * .2, cy = 100 - h * .6;
      s += `<path d="M${F(x)} 100 Q${F(cx)} ${F(cy)} ${F(tx)} ${F(ty)}" stroke="${GREENS[i % 5]}" stroke-width="${F(3 + rnd() * 3)}" fill="none" stroke-linecap="round"/>`;
    }
    for (let i = 0; i < 3; i++) {
      const x = 55 + i * 25 + rnd() * 10, rot = -40 + i * 40 + (rnd() - .5) * 20;
      s += `<ellipse cx="${F(x)}" cy="70" rx="9" ry="28" fill="${GREENS[1 + i]}" transform="rotate(${F(rot)} ${F(x)} 98)"/>`;
    }
    return `<svg viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${s}</svg>`;
  }

  // Nhánh lá nhỏ đặt cạnh tiêu đề
  const decoSprig = color => `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M5 21C9 15 13 9 20 4" stroke="${color}" stroke-width="1.8" fill="none" stroke-linecap="round"/><ellipse cx="9" cy="12" rx="2.4" ry="5" fill="${color}" transform="rotate(-50 9 12)"/><ellipse cx="14" cy="7.5" rx="2.2" ry="4.6" fill="${color}" transform="rotate(-60 14 7.5)"/><ellipse cx="14" cy="14" rx="2" ry="4.2" fill="${color}" transform="rotate(35 14 14)" opacity=".75"/></svg>`;

  window.drawDeco = (type, opt) => type === 'frond' ? decoFrond(opt) : type === 'tuft' ? decoTuft() : decoSprig(opt || '#3f8a4c');

})();
