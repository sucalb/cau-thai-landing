// Mô hình 3D cây cau dựng bằng Three.js (không cần file mô hình).
// mountCau3D(khung, { fruit: màu quả chín }) → trả về false nếu trình duyệt không chạy được WebGL.
// Thân xanh có đốt, bẹ lá, ~14 tàu lá rủ, 5 buồng quả treo quanh thân. Tự xoay chậm, kéo ngang để xoay.
(function () {
  const THREE_URL = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';

  function loadThree() {
    if (window.THREE) return Promise.resolve(window.THREE);
    return new Promise((ok, fail) => {
      const s = document.createElement('script');
      s.src = THREE_URL; s.onload = () => ok(window.THREE); s.onerror = fail;
      document.head.appendChild(s);
    });
  }

  // Số ngẫu nhiên cố định để cây lần nào cũng giống nhau
  function rng(seed) { return () => (seed = (seed * 16807) % 2147483647) / 2147483647; }

  function build(T, fruitHex) {
    const rand = rng(42);
    const g = new T.Group();
    const up = new T.Vector3(0, 1, 0), Y = new T.Vector3(0, 1, 0);
    const TRUNK_H = 4.3, CROWN_Y = 5.1;

    // ---- Thân: hơi thuôn, có đốt màu be, gốc loe ----
    const trunkMat = new T.MeshStandardMaterial({ color: 0x7fa64e, roughness: .75 });
    const trunk = new T.Mesh(new T.CylinderGeometry(.15, .2, TRUNK_H, 20, 1), trunkMat);
    trunk.position.y = TRUNK_H / 2; g.add(trunk);
    const ringMat = new T.MeshStandardMaterial({ color: 0xc8b88c, roughness: .9 });
    for (let y = .35; y < TRUNK_H; y += .32) {
      const r = .2 - (.05 * y / TRUNK_H) + .008;
      const ring = new T.Mesh(new T.CylinderGeometry(r, r, .035, 18, 1, true), ringMat);
      ring.position.y = y; g.add(ring);
    }
    const base = new T.Mesh(new T.CylinderGeometry(.2, .34, .3, 18), new T.MeshStandardMaterial({ color: 0x6b5232, roughness: 1 }));
    base.position.y = .14; g.add(base);

    // ---- Bẹ lá (crownshaft) xanh sáng ----
    const shaft = new T.Mesh(new T.CylinderGeometry(.14, .17, CROWN_Y - TRUNK_H + .1, 18), new T.MeshStandardMaterial({ color: 0x95c062, roughness: .6 }));
    shaft.position.y = (TRUNK_H + CROWN_Y) / 2; g.add(shaft);

    // ---- Tàu lá: cuống cong + lá chét rủ (InstancedMesh cho nhẹ) ----
    const FRONDS = 18, PER_SIDE = 42;
    const leafGeo = new T.PlaneGeometry(.04, 1); leafGeo.translate(0, .5, 0);
    const leafMat = new T.MeshStandardMaterial({ color: 0xffffff, roughness: .7, side: T.DoubleSide });
    const leaves = new T.InstancedMesh(leafGeo, leafMat, FRONDS * PER_SIDE * 2);
    const rachisMat = new T.MeshStandardMaterial({ color: 0x7aa64a, roughness: .7 });
    const m = new T.Matrix4(), q = new T.Quaternion(), sc = new T.Vector3(), col = new T.Color();
    let li = 0;
    for (let f = 0; f < FRONDS; f++) {
      const a = f / FRONDS * Math.PI * 2 + rand() * .3;
      const tier = f % 3;                       // 0: tàu cao, 2: tàu rủ thấp
      const dir = new T.Vector3(Math.cos(a), 0, Math.sin(a));
      const len = 2.5 + rand() * .5 - tier * .1;
      const rise = [1.55, 1.05, .6][tier], droop = [-.2, -.75, -1.3][tier];
      const o = new T.Vector3(0, CROWN_Y, 0);
      const curve = new T.CatmullRomCurve3([
        o.clone(),
        o.clone().addScaledVector(dir, len * .3).add(new T.Vector3(0, rise, 0)),
        o.clone().addScaledVector(dir, len * .7).add(new T.Vector3(0, rise * .85, 0)),
        o.clone().addScaledVector(dir, len).add(new T.Vector3(0, droop + rise * .2, 0))
      ]);
      g.add(new T.Mesh(new T.TubeGeometry(curve, 24, .022, 5), rachisMat));
      for (let k = 0; k < PER_SIDE; k++) {
        const t = .1 + .9 * k / (PER_SIDE - 1);
        const p = curve.getPoint(t), tan = curve.getTangent(t);
        const side0 = new T.Vector3().crossVectors(tan, up).normalize();
        const L = .85 * Math.sin(Math.PI * (.1 + .85 * t)) + .2;
        for (const s of [-1, 1]) {
          // lá chét dài, chĩa ra hai bên rồi rủ hẳn xuống như lá cau thật
          const d = side0.clone().multiplyScalar(s * (.55 + rand() * .2)).addScaledVector(tan, .3).add(new T.Vector3(0, -1.0 - t * .4 - rand() * .2, 0)).normalize();
          q.setFromUnitVectors(Y, d);
          sc.set(1 + rand() * .5, L * (.8 + rand() * .35), 1);
          m.compose(p, q, sc);
          leaves.setMatrixAt(li, m);
          col.setHSL(.27 + rand() * .05, .55 + rand() * .15, .2 + rand() * .13);
          leaves.setColorAt(li++, col);
        }
      }
    }
    g.add(leaves);

    // ---- Buồng quả: cuống phân nhánh + quả bầu dục ----
    const fruitGeo = new T.SphereGeometry(.06, 8, 6); fruitGeo.scale(1, 1.6, 1);
    const fruitMat = new T.MeshStandardMaterial({ color: 0xffffff, roughness: .45 });
    const BUNCHES = [[0, 4.6, .7], [1.25, 4.1, .8], [2.5, 4.7, .68], [3.75, 4.0, .82], [5.0, 4.45, .74]];
    const PER_BUNCH = 240;
    const fruits = new T.InstancedMesh(fruitGeo, fruitMat, BUNCHES.length * PER_BUNCH);
    const stalkMat = new T.MeshStandardMaterial({ color: 0xb9a76a, roughness: .8 });
    const ripe = new T.Color(fruitHex || '#e9862f');
    let fi = 0;
    for (const [ang, y, out] of BUNCHES) {
      const dir = new T.Vector3(Math.cos(ang), 0, Math.sin(ang));
      const top = new T.Vector3(0, y, 0).addScaledVector(dir, .14);
      const c = new T.Vector3(0, y - .55, 0).addScaledVector(dir, out);
      // cuống chính + các nhánh
      g.add(new T.Mesh(new T.TubeGeometry(new T.QuadraticBezierCurve3(top, top.clone().addScaledVector(dir, out * .7).add(new T.Vector3(0, .15, 0)), c.clone().add(new T.Vector3(0, .35, 0))), 10, .018, 4), stalkMat));
      for (let k = 0; k < PER_BUNCH; k++) {
        // điểm trong khối hình giọt nước treo ngược
        const h = rand(), r = (.5 - h * .3) * Math.sqrt(rand()), th = rand() * Math.PI * 2;
        const p = c.clone().add(new T.Vector3(Math.cos(th) * r, .35 - h * 1.15, Math.sin(th) * r));
        q.setFromEuler(new T.Euler((rand() - .5) * .6, rand() * 3, (rand() - .5) * .6));
        sc.setScalar(.85 + rand() * .3);
        m.compose(p, q, sc);
        fruits.setMatrixAt(fi, m);
        if (rand() < .12) col.copy(ripe).offsetHSL(0, 0, (rand() - .5) * .1);
        else col.setHSL(.25 + rand() * .05, .6, .17 + rand() * .12);
        fruits.setColorAt(fi++, col);
      }
      for (let b = 0; b < 8; b++) {
        const tip = c.clone().add(new T.Vector3((rand() - .5) * .7, -rand() * .7, (rand() - .5) * .7));
        g.add(new T.Mesh(new T.TubeGeometry(new T.QuadraticBezierCurve3(c.clone().add(new T.Vector3(0, .35, 0)), c, tip), 6, .008, 3), stalkMat));
      }
    }
    g.add(fruits);
    return g;
  }

  function groundShadow(T) {
    const cv = document.createElement('canvas'); cv.width = cv.height = 128;
    const x = cv.getContext('2d'), gr = x.createRadialGradient(64, 64, 0, 64, 64, 64);
    gr.addColorStop(0, 'rgba(1,48,31,.45)'); gr.addColorStop(1, 'rgba(1,48,31,0)');
    x.fillStyle = gr; x.fillRect(0, 0, 128, 128);
    const mesh = new T.Mesh(new T.PlaneGeometry(2.6, 2.6), new T.MeshBasicMaterial({ map: new T.CanvasTexture(cv), transparent: true, depthWrite: false }));
    mesh.rotation.x = -Math.PI / 2; mesh.position.y = .01;
    return mesh;
  }

  window.mountCau3D = async function (box, opts = {}) {
    const probe = document.createElement('canvas');
    if (!(probe.getContext('webgl2') || probe.getContext('webgl'))) return false;
    let T;
    try { T = await loadThree(); } catch (e) { return false; }

    const renderer = new T.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    const cv = renderer.domElement;
    cv.className = 'plant3d'; cv.setAttribute('aria-label', 'Mô hình 3D cây cau, kéo ngang để xoay');
    // phủ kín khung, không để canvas đẩy khung to ra (vòng lặp ResizeObserver)
    cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;cursor:grab';
    box.appendChild(cv);

    const scene = new T.Scene();
    const cam = new T.PerspectiveCamera(30, 1, .1, 100);
    cam.position.set(0, 4.2, 16.5); cam.lookAt(0, 3.45, 0);
    scene.add(new T.HemisphereLight(0xf4f6e4, 0x3a4a2e, .75));
    const sun = new T.DirectionalLight(0xfff6df, .9); sun.position.set(4, 8, 6); scene.add(sun);
    const rim = new T.DirectionalLight(0xd9ef78, .35); rim.position.set(-5, 4, -4); scene.add(rim);

    const tree = build(T, opts.fruit);
    scene.add(tree, groundShadow(T));

    function size() {
      const w = box.clientWidth, h = box.clientHeight;
      renderer.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix();
    }
    size(); new ResizeObserver(size).observe(box);

    // Kéo ngang để xoay; khi thả tay thì tiếp tục tự xoay chậm
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let dragging = false, lastX = 0, vel = still ? 0 : .25;
    cv.style.touchAction = 'pan-y';
    cv.addEventListener('pointerdown', e => { dragging = true; lastX = e.clientX; cv.setPointerCapture(e.pointerId); });
    cv.addEventListener('pointermove', e => { if (!dragging) return; tree.rotation.y += (e.clientX - lastX) * .01; lastX = e.clientX; });
    const end = () => { dragging = false; };
    cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end);

    // Chỉ vẽ khi khung đang hiện trên màn hình
    let visible = true, last = performance.now();
    new IntersectionObserver(es => { visible = es[0].isIntersecting; }).observe(box);
    (function loop(now) {
      requestAnimationFrame(loop);
      const dt = Math.min(.05, (now - last) / 1000); last = now;
      if (!visible) return;
      if (!dragging) tree.rotation.y += vel * dt;
      renderer.render(scene, cam);
    })(last);
    return true;
  };
})();
