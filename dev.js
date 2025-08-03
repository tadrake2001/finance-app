const { spawn } = require('child_process');
require('dotenv').config({ path: '.env' });

const port = process.env.NEXT_PUBLIC_FRONTEND_PORT || 3000;

console.log(`Starting development server on port ${port}...`);

const child = spawn('npx', ['next', 'dev', '-p', port], {
  stdio: 'inherit',
  shell: true
});

child.on('error', (error) => {
  console.error('Error starting development server:', error);
  process.exit(1);
});

child.on('close', (code) => {
  console.log(`Development server exited with code ${code}`);
  process.exit(code);
}); 