/**
 * UCEST One — Nagios Health Check Probe Simulator
 * Emulates Nagios check_http and check_tcp plugin probes against active services.
 */

import http from 'http';
import net from 'net';

const CHECKS = [
  {
    name: 'Frontend Web UI Availability',
    type: 'http',
    host: 'localhost',
    port: process.env.FRONTEND_PORT || 5173,
    path: '/',
    expectedCode: 200,
  },
  {
    name: 'Backend Actuator Core Health',
    type: 'http',
    host: 'localhost',
    port: process.env.BACKEND_PORT || 8080,
    path: '/actuator/health',
    expectedCode: 200,
    expectedString: 'UP',
  },
  {
    name: 'MySQL Database Port Listener',
    type: 'tcp',
    host: 'localhost',
    port: process.env.DB_PORT || 3306,
  },
  {
    name: 'Public Notices API Latency',
    type: 'http',
    host: 'localhost',
    port: process.env.BACKEND_PORT || 8080,
    path: '/api/public/notices',
    expectedCode: 200,
  }
];

function checkHttp(item) {
  return new Promise((resolve) => {
    const start = Date.now();
    const req = http.get(`http://${item.host}:${item.port}${item.path}`, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        const latency = Date.now() - start;
        const statusOk = res.statusCode === item.expectedCode;
        const stringOk = item.expectedString ? data.includes(item.expectedString) : true;
        if (statusOk && stringOk) {
          resolve({ status: 'OK', message: `HTTP ${res.statusCode} (${latency}ms)` });
        } else {
          resolve({ status: 'CRITICAL', message: `Unexpected response: HTTP ${res.statusCode}` });
        }
      });
    });

    req.on('error', (err) => {
      resolve({ status: 'CRITICAL', message: `Connection Refused: ${err.message}` });
    });

    req.setTimeout(5000, () => {
      req.destroy();
      resolve({ status: 'CRITICAL', message: 'Connection Timed Out (>5000ms)' });
    });
  });
}

function checkTcp(item) {
  return new Promise((resolve) => {
    const start = Date.now();
    const socket = new net.Socket();

    socket.setTimeout(4000);
    socket.connect(item.port, item.host, () => {
      const latency = Date.now() - start;
      socket.destroy();
      resolve({ status: 'OK', message: `Port ${item.port} open (${latency}ms)` });
    });

    socket.on('error', (err) => {
      socket.destroy();
      resolve({ status: 'CRITICAL', message: `Port ${item.port} unreachable (${err.message})` });
    });

    socket.on('timeout', () => {
      socket.destroy();
      resolve({ status: 'CRITICAL', message: `Port ${item.port} connection timed out` });
    });
  });
}

async function run() {
  console.log('======================================================================');
  console.log('Nagios Core Active Service Monitor — UCEST One Infrastructure Probe');
  console.log(`Execution Timestamp: ${new Date().toISOString()}`);
  console.log('======================================================================\n');

  for (const check of CHECKS) {
    const result = check.type === 'http' ? await checkHttp(check) : await checkTcp(check);
    const color = result.status === 'OK' ? '\x1b[32m' : '\x1b[31m';
    const reset = '\x1b[0m';
    console.log(`${color}[${result.status.padEnd(8)}]${reset} ${check.name.padEnd(35)} -> ${result.message}`);
  }

  console.log('\n======================================================================');
}

run();
