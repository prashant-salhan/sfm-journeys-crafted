import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const outputPublicDir = path.join(rootDir, ".output", "public");
const assetsDir = path.join(outputPublicDir, "assets");

if (!fs.existsSync(assetsDir)) {
  console.warn("Assets directory not found, skipping copy-index script.");
  process.exit(0);
}

const files = fs.readdirSync(assetsDir);

// Sort index-*.js files by modification time (newest first)
const jsFiles = files
  .filter((f) => f.startsWith("index-") && f.endsWith(".js"))
  .map((f) => ({
    name: f,
    mtime: fs.statSync(path.join(assetsDir, f)).mtimeMs,
  }))
  .sort((a, b) => b.mtime - a.mtime);

// Sort styles-*.css files by modification time (newest first)
const cssFiles = files
  .filter((f) => f.startsWith("styles-") && f.endsWith(".css"))
  .map((f) => ({
    name: f,
    mtime: fs.statSync(path.join(assetsDir, f)).mtimeMs,
  }))
  .sort((a, b) => b.mtime - a.mtime);

const jsFile = jsFiles.length > 0 ? jsFiles[0].name : null;
const cssFile = cssFiles.length > 0 ? cssFiles[0].name : null;

// Clean up stale older index-*.js files so Vercel doesn't serve cached old assets
if (jsFiles.length > 1) {
  for (let i = 1; i < jsFiles.length; i++) {
    try {
      fs.unlinkSync(path.join(assetsDir, jsFiles[i].name));
      console.log(`Removed stale asset: ${jsFiles[i].name}`);
    } catch (_) {}
  }
}

let html = fs.readFileSync(path.join(rootDir, "index.html"), "utf-8");

if (cssFile) {
  html = html.replace(
    "</head>",
    `  <link rel="stylesheet" href="/assets/${cssFile}">\n  </head>`
  );
}

if (jsFile) {
  html = html.replace(
    '<script type="module" src="/src/client.tsx"></script>',
    `<script type="module" src="/assets/${jsFile}"></script>`
  );
}

fs.writeFileSync(path.join(outputPublicDir, "index.html"), html, "utf-8");
console.log(`Successfully generated .output/public/index.html -> JS: ${jsFile}, CSS: ${cssFile}`);
