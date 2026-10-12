/**
 * UCEST One — Automated E2E Verification Runner
 * Runs automated validation against the running application instance.
 */

import http from 'http';

const BASE_URL = process.env.BASE_URL || 'http://localhost:5173';

const endpoints = [
  { name: 'Public Homepage', path: '/', expectStatus: 200, keywords: ['UCEST', 'root'] },
  { name: 'About Institution', path: '/about', expectStatus: 200, keywords: ['UCEST'] },
  { name: 'Academics & Regulations', path: '/academics', expectStatus: 200, keywords: ['UCEST'] },
  { name: 'Admissions Intake Matrix', path: '/admissions', expectStatus: 200, keywords: ['UCEST'] },
  { name: 'CSE Featured Department', path: '/departments/cse', expectStatus: 200, keywords: ['UCEST'] },
  { name: 'Examinations Notice Board', path: '/examinations', expectStatus: 200, keywords: ['UCEST'] },
  { name: 'Research Centers', path: '/research', expectStatus: 200, keywords: ['UCEST'] },
  { name: 'Campus Life & Events', path: '/campus-life', expectStatus: 200, keywords: ['UCEST'] },
  { name: 'Contact & Campus Directory', path: '/contact', expectStatus: 200, keywords: ['UCEST'] },
  { name: 'Unified Portal Sign In', path: '/login', expectStatus: 200, keywords: ['UCEST'] },
  { name: 'Student Command Desk Route', path: '/portal/student', expectStatus: 200, keywords: ['root'] },
  { name: 'Faculty Instruction Desk Route', path: '/portal/faculty', expectStatus: 200, keywords: ['root'] },
  { name: 'Admin Governance Console Route', path: '/portal/admin', expectStatus: 200, keywords: ['root'] },
];

function fetchEndpoint(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', (err) => reject(err));
  });
}

async function run() {
  console.log('======================================================================');
  console.log(`UCEST One — Automated Functional Verification Runner`);
  console.log(`Target URL: ${BASE_URL}`);
  console.log('======================================================================\n');

  let passed = 0;
  let failed = 0;

  for (const ep of endpoints) {
    const fullUrl = `${BASE_URL}${ep.path}`;
    try {
      const res = await fetchEndpoint(fullUrl);
      if (res.status === ep.expectStatus) {
        console.log(`[PASS] ${ep.name.padEnd(35)} -> HTTP ${res.status} OK (${fullUrl})`);
        passed++;
      } else {
        console.error(`[FAIL] ${ep.name.padEnd(35)} -> Expected ${ep.expectStatus}, got ${res.status}`);
        failed++;
      }
    } catch (err) {
      console.error(`[FAIL] ${ep.name.padEnd(35)} -> Connection Error: ${err.message}`);
      failed++;
    }
  }

  console.log('\n----------------------------------------------------------------------');
  console.log(`Test Execution Summary: ${passed} Passed, ${failed} Failed out of ${endpoints.length} routes.`);
  console.log('----------------------------------------------------------------------\n');

  if (failed > 0) {
    process.exit(1);
  }
}

run();
