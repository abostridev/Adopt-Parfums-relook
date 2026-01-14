require('dotenv').config();
const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');

const connectDB = require('../src/config/db');
const Advice = require('../src/models/Advice');
const Product = require('../src/models/Product');

const checkUrl = (url) =>
  new Promise((resolve) => {
    try {
      const lib = url.startsWith('https') ? https : http;
      const req = lib.request(url, { method: 'HEAD' }, (res) => {
        resolve({ ok: res.statusCode >= 200 && res.statusCode < 400, status: res.statusCode });
      });
      req.on('error', () => resolve({ ok: false }));
      req.end();
    } catch (e) {
      resolve({ ok: false });
    }
  });

const run = async () => {
  await connectDB();

  console.log('Checking Advices...');
  const advices = await Advice.find().limit(50);
  console.log(`Found ${advices.length} advices`);

  for (const a of advices) {
    const v = a.video;
    if (!v) {
      console.log(`[Advice ${a._id}] no video`);
      continue;
    }

    if (v.startsWith('http://') || v.startsWith('https://')) {
      const res = await checkUrl(v);
      console.log(`[Advice ${a._id}] remote video: ${v} -> ${res.ok ? 'OK' : 'BAD'} (${res.status || 'err'})`);
    } else if (v.startsWith('/uploads')) {
      const p = path.join(process.cwd(), v);
      const exists = fs.existsSync(p);
      console.log(`[Advice ${a._id}] local video: ${v} -> ${exists ? 'exists' : 'missing'}`);
    } else {
      console.log(`[Advice ${a._1d}] unknown video value: ${v}`);
    }
  }

  console.log('\nChecking Products...');
  const products = await Product.find().limit(100);
  console.log(`Found ${products.length} products (sample ${Math.min(products.length,100)})`);

  for (const p of products) {
    const imgs = p.images || [];
    if (imgs.length === 0) {
      console.log(`[Product ${p._id}] no images`);
      continue;
    }
    const first = imgs[0];
    if (!first) { console.log(`[Product ${p._id}] first image empty`); continue; }

    if (first.startsWith('http://') || first.startsWith('https://')) {
      const res = await checkUrl(first);
      console.log(`[Product ${p._id}] image remote: ${first} -> ${res.ok ? 'OK' : 'BAD'} (${res.status || 'err'})`);
    } else if (first.startsWith('/uploads')) {
      const pth = path.join(process.cwd(), first);
      const exists = fs.existsSync(pth);
      console.log(`[Product ${p._id}] image local: ${first} -> ${exists ? 'exists' : 'missing'}`);
    } else {
      console.log(`[Product ${p._id}] image unknown: ${first}`);
    }
  }

  process.exit(0);
};

run().catch(err => { console.error(err); process.exit(1); });
