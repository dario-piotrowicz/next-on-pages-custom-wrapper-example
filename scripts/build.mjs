import { execSync } from "child_process";
import { writeFileSync, renameSync, readFileSync } from "fs";
import { join } from 'path';

const outDir = "dist";

execSync(`npx @cloudflare/next-on-pages --outdir ${outDir}`, { stdio: 'inherit' });

const workerJsOutDir = join(outDir, '_worker.js');
const indexFile = join(workerJsOutDir, 'index.js');
const nextOnPagesHandlerFileName = 'next-on-pages-handler.js';
const nextOnPagesHandler = join(workerJsOutDir, nextOnPagesHandlerFileName);

renameSync(indexFile, nextOnPagesHandler);

const customWorkerContent = readFileSync('worker.js', { encoding: 'utf-8'});

writeFileSync(indexFile,
`const nextOnPagesFetch = await import('./${nextOnPagesHandlerFileName}').then(m => m.default.fetch);

${customWorkerContent}
`);