import assert from "node:assert/strict";
import fs from "node:fs";

const html = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");
const grammar = fs.readFileSync(new URL("../grammar-games.js", import.meta.url), "utf8");

const vocabularyActivities = ["listening", "spelling", "sentence", "matching", "pronunciation"];

for (const activity of vocabularyActivities) {
    assert.match(
        html,
        new RegExp(`beginGameAttempt\\(\\"${activity}\\"\\)`),
        `${activity} 必須在開始時建立單次作答識別`,
    );
    assert.match(
        html,
        new RegExp(`${activity}: \\"英語`),
        `${activity} 必須有統一進度顯示名稱`,
    );
}

assert.match(html, /attemptKey: `english_vocab_\$\{gameType\}:\$\{createLearningAttemptId\(\)\}`/);
assert.match(html, /if \(attempt\.reported\) return;/);
assert.match(html, /p_attempt_key: String\(resolvedAttemptKey\)\.slice\(0, 160\)/);
assert.match(html, /p_duration_seconds: durationSeconds/);
assert.match(html, /modeCode: scope\.modeCode/);
assert.match(html, /scopeLabel: scope\.label/);
assert.match(html, /clickCount: matchingGameData\.clicks/);

assert.match(grammar, /attemptKey: `english_grammar:/);
assert.match(grammar, /if \(!grammarSession \|\| grammarSession\.finished\) return;/);
assert.match(grammar, /durationSeconds: Math\.max/);
assert.match(grammar, /stage: grammarSession\.stage\.id/);

console.log(JSON.stringify({
    checked: true,
    vocabularyActivities: vocabularyActivities.length,
    grammarTracked: true,
    duplicateGuard: true,
    scopeAndDurationTracked: true,
}));
