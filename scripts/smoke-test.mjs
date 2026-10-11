import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const builds = { cjs: require("@usepylon/sdk"), esm: await import("@usepylon/sdk") };

for (const [format, sdk] of Object.entries(builds)) {
    const client = new sdk.PylonClient({ token: "test", environment: sdk.PylonEnvironment.Eu });
    assert.equal(typeof client.issues.list, "function", `${format}: client.issues.list`);
    assert.equal(typeof client.knowledgeBases.articles.get, "function", `${format}: nested resources`);
}
console.log("CommonJS and ESM builds load");
