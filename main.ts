// Nippon Stat Atlas — the hand-in program (Node 22, standard library only).
//
// The site lives in app/ beside this file: plain static files, no build
// step, nothing loaded over the network. This program copies app/ and
// screenshots/ into the output directory and writes dossier.json there, the
// summary the judge reads, using the vendored make.fun library. The library
// file vendor/makefun-frontend.ts is the kit's copy and must stay unchanged:
// the scorer rebuilds the dossier with its own copy and compares bytes.
//
// Run outside the grader with MAKEFUN_OUTPUT_DIR standing in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outputDir, { recursive: true });
cpSync(join(repoRoot, 'app'), join(outputDir, 'app'), { recursive: true });
mkdirSync(join(outputDir, 'screenshots'), { recursive: true });
if (existsSync(join(repoRoot, 'screenshots'))) {
  cpSync(join(repoRoot, 'screenshots'), join(outputDir, 'screenshots'), { recursive: true });
}

// Caps mirror the gate's limits so a run that succeeds here is one the
// scorer accepts: at most 4 screenshots of 256 KiB each, app/ under 993
// files and 16 MiB, and the dossier text capped at 160 KiB.
writeFileSync(
  join(outputDir, 'dossier.json'),
  buildDossier(outputDir, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);
