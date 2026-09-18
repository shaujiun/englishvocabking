import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import "../learning-entry.js";

assert.equal(globalThis.resolveLearningEntry("?entry=grammar", false), "grammar-map");
assert.equal(globalThis.resolveLearningEntry("?entry=grammar&school=806", false), "grammar-map");
assert.equal(globalThis.resolveLearningEntry("?entry=grammar", true), "dashboard");
assert.equal(globalThis.resolveLearningEntry("?entry=unknown", false), "dashboard");
assert.equal(globalThis.resolveLearningEntry("", false), "dashboard");

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
assert.ok(html.indexOf('<script src="learning-entry.js"></script>') < html.indexOf("const SUPABASE_URL"));
assert.ok(html.includes("window.resolveLearningEntry(window.location.search, learningContext.launchedFromTask)"));

console.log("English learning entry routes checked.");
