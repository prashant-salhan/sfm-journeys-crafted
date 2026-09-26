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
const jsFile = files.find((f) => f.startsWith("index-") && f.endsWith(".js"));
const cssFile = files.find((f) => f.startsWith("styles-") && f.endsWith(".css"));

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
