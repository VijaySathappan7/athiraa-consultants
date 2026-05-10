const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'components');
const files = fs.readdirSync(srcDir);

files.forEach(file => {
  if (file.endsWith('.js') || file.endsWith('.jsx')) {
    const filePath = path.join(srcDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace .png, .jpg, .jpeg in image imports with .webp
    const updatedContent = content.replace(/from\s+['"](.*?\.(png|jpe?g))['"]/g, (match, p1) => {
      const newPath = p1.replace(/\.(png|jpe?g)$/, '.webp');
      return `from '${newPath}'`;
    });

    if (content !== updatedContent) {
      fs.writeFileSync(filePath, updatedContent);
      console.log(`Updated ${file}`);
    }
  }
});

// Update App.jsx if any imports exist there
const appPath = path.join(__dirname, 'App.jsx');
if (fs.existsSync(appPath)) {
  let content = fs.readFileSync(appPath, 'utf8');
  const updatedContent = content.replace(/from\s+['"](.*?\.(png|jpe?g))['"]/g, (match, p1) => {
    const newPath = p1.replace(/\.(png|jpe?g)$/, '.webp');
    return `from '${newPath}'`;
  });
  if (content !== updatedContent) {
    fs.writeFileSync(appPath, updatedContent);
    console.log(`Updated App.jsx`);
  }
}
