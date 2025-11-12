const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  const gitHash = execSync('git rev-parse --short HEAD')
    .toString()
    .trim();
  
  const filePath = path.join(__dirname, '../src/constants/gitInfo.ts');
  const content = `export const GIT_COMMIT_HASH = '${gitHash}';\n`;
  
  fs.writeFileSync(filePath, content);
  console.log(`✅ Git hash atualizado: ${gitHash}`);
} catch (error) {
  console.log('⚠️  Git não disponível, usando hash padrão');
  const filePath = path.join(__dirname, '../src/constants/gitInfo.ts');
  const content = `export const GIT_COMMIT_HASH = 'dev';\n`;
  fs.writeFileSync(filePath, content);
}
