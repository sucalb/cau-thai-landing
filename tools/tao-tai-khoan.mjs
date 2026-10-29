// Tạo (hoặc đổi) tài khoản đăng nhập trang quản trị.
// Cách dùng:  node tools/tao-tai-khoan.mjs <tài khoản> <mật khẩu>
// Script hỏi token GitHub (fine-grained, chỉ repo này, quyền Contents: Read and write),
// kiểm tra token, rồi mã hoá token bằng mật khẩu vào admin-auth.json.
// Token chỉ nằm trong file dưới dạng đã mã hoá; ai biết mật khẩu mới giải mã được.
import { writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { webcrypto as crypto } from 'node:crypto';

const ITER = 600000;
const [user, password, repoArg] = process.argv.slice(2);
if (!user || !password) {
  console.error('Cách dùng: node tools/tao-tai-khoan.mjs <tài khoản> <mật khẩu> [chủ-repo/tên-repo]');
  process.exit(1);
}
if (password.length < 12) {
  console.error('Mật khẩu cần ít nhất 12 ký tự (file mã hoá nằm công khai trong repo).');
  process.exit(1);
}

let repo = repoArg;
if (!repo) {
  const url = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
  repo = url.replace(/^.*github\.com[:/]/, '').replace(/\.git$/, '');
}

function askHidden(question) {
  return new Promise(resolve => {
    process.stdout.write(question);
    const stdin = process.stdin;
    let value = '';
    if (stdin.isTTY) stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');
    const onData = ch => {
      if (ch === '\r' || ch === '\n' || ch === '\u0004') {
        if (stdin.isTTY) stdin.setRawMode(false);
        stdin.pause(); stdin.off('data', onData);
        process.stdout.write('\n');
        resolve(value.trim());
      } else if (ch === '\u0003') {
        process.exit(1);
      } else if (ch === '\u007f') {
        value = value.slice(0, -1);
      } else {
        value += ch;
      }
    };
    stdin.on('data', onData);
  });
}

const token = await askHidden(`Dán token GitHub cho repo ${repo} (sẽ không hiện ra): `);
const res = await fetch(`https://api.github.com/repos/${repo}`, { headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' } });
if (!res.ok) { console.error(`Token không dùng được với ${repo} (HTTP ${res.status}).`); process.exit(1); }
const info = await res.json();
if (!info.permissions?.push) { console.error('Token chưa có quyền ghi (Contents: Read and write).'); process.exit(1); }

const enc = new TextEncoder();
const salt = crypto.getRandomValues(new Uint8Array(16));
const iv = crypto.getRandomValues(new Uint8Array(12));
const base = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
const key = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: ITER, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['encrypt']);
const data = await crypto.subtle.encrypt({ name: 'AES-GCM', iv, additionalData: enc.encode(user) }, key, enc.encode(token));
const b64 = u => Buffer.from(u).toString('base64');

writeFileSync('admin-auth.json', JSON.stringify({ v: 1, repo, user, iter: ITER, salt: b64(salt), iv: b64(iv), data: b64(new Uint8Array(data)) }, null, 2) + '\n');
console.log(`Đã tạo admin-auth.json cho tài khoản "${user}". Commit và push file này để trang quản trị dùng được:`);
console.log('  git add admin-auth.json && git commit -m "Cập nhật tài khoản quản trị" && git push');
