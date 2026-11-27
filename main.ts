// Black Friday Scout's hand-in program (Node 22, standard library only).
//
// The site itself is plain static files under app/: an index page, one
// stylesheet, and small ES modules for the deals, the filtering and the
// rendering. Nothing is built, bundled or fetched at run time.
//
// This program hands the site in: it copies app/ and screenshots/ from
// beside this file into the output directory and writes dossier.json there,
// using the vendored make.fun library to build the dossier. The library
// must stay exactly as shipped in the kit: the scorer rebuilds the dossier
// with its own copy and compares the two byte for byte.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for
// /output, so a local check looks like:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

// The caps below are the scorer's own: at most 4 screenshots, each at most
// 256 KiB; app/ at most 993 files and directories and 16 MiB in all; the
// dossier text at most 160 KiB. buildDossier refuses anything past them,
// so a failure here means the entry would fail the gate too.
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);
