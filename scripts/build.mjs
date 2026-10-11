// Plain Node rather than a shell script, so the build also runs on Windows.
import { execFileSync } from "node:child_process";
import { rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";

const tsc = createRequire(import.meta.url).resolve("typescript/bin/tsc");

rmSync("dist", { recursive: true, force: true });
for (const project of ["tsconfig.cjs.json", "tsconfig.esm.json"]) {
    execFileSync(process.execPath, [tsc, "-p", project], { stdio: "inherit" });
}
// The package root is CommonJS, so the ESM build needs its own module type.
writeFileSync("dist/esm/package.json", JSON.stringify({ type: "module" }) + "\n");
