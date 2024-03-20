import { execSync } from "node:child_process";
import { renameSync } from "node:fs";
import { join } from 'node:path';

import { build } from 'esbuild';

const outDir = "dist";

execSync(`npx @cloudflare/next-on-pages --outdir ${outDir}`, { stdio: 'inherit' });

const workerJsOutDir = join(outDir, '_worker.js');
const indexFile = join(workerJsOutDir, 'index.js');
const nextOnPagesHandlerFileName = 'next-on-pages-handler.js';
const nextOnPagesHandler = join(workerJsOutDir, nextOnPagesHandlerFileName);

renameSync(indexFile, nextOnPagesHandler);

await build({
    entryPoints: ['worker.ts'],
    banner: {
        js: `const nextOnPagesFetch = await import('./${nextOnPagesHandlerFileName}').then(m => m.default.fetch);`,
    },
    bundle: true,
    format: 'esm',
    platform: 'browser',
    outfile: indexFile,
    minify: true,
});