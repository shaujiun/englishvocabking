import childProcess from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const html = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");
const inlineScripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)]
    .map(match => match[1])
    .filter(source => source.trim());
const tempDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "englishvocabking-inline-"));

try {
    inlineScripts.forEach((source, index) => {
        const scriptPath = path.join(tempDirectory, `inline-${index}.js`);
        fs.writeFileSync(scriptPath, source, "utf8");
        childProcess.execFileSync(process.execPath, ["--check", scriptPath], { stdio: "inherit" });
    });
    console.log(JSON.stringify({ inlineScripts: inlineScripts.length, checked: true }));
} finally {
    fs.rmSync(tempDirectory, { recursive: true, force: true });
}
