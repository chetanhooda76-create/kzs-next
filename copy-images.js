const fs = require('fs');
const path = require('path');

const brainDir = '/Users/chetanhooda/.gemini/antigravity/brain/cf00c9f5-3da8-475f-949b-712912ef7a12';
const publicDir = path.join(__dirname, 'public');
const testimonialsDir = path.join(publicDir, 'testimonials');

if (!fs.existsSync(testimonialsDir)) {
  fs.mkdirSync(testimonialsDir, { recursive: true });
}

try {
  fs.renameSync(path.join(publicDir, 'recycle1.jpg.jpeg'), path.join(publicDir, 'recycle1.jpg'));
} catch(e) {}

fs.copyFileSync(path.join(brainDir, 'recycle2_jpg_1781267062104.png'), path.join(publicDir, 'recycle2.jpg'));
fs.copyFileSync(path.join(brainDir, 'rahul_png_1781267073990.png'), path.join(testimonialsDir, 'rahul.png'));
fs.copyFileSync(path.join(brainDir, 'megha_png_1781267087078.png'), path.join(testimonialsDir, 'megha.png'));
fs.copyFileSync(path.join(brainDir, 'amit_png_1781267098728.png'), path.join(testimonialsDir, 'amit.png'));

console.log('Images copied successfully.');
