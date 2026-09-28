import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const html = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");

function extractFunction(name) {
    const start = html.indexOf(`function ${name}(`);
    assert.notEqual(start, -1, `找不到函式：${name}`);
    const bodyStart = html.indexOf("{", start);
    let depth = 0;
    for (let index = bodyStart; index < html.length; index += 1) {
        if (html[index] === "{") depth += 1;
        if (html[index] === "}") depth -= 1;
        if (depth === 0) return html.slice(start, index + 1);
    }
    throw new Error(`函式未結束：${name}`);
}

const context = {};
vm.runInNewContext([
    extractFunction("getMatchingWordKey"),
    extractFunction("isMatchingCardPair"),
].join("\n"), context);

function matches(first, second) {
    context.first = first;
    context.second = second;
    return vm.runInNewContext("isMatchingCardPair(first, second)", context);
}

const cryEnglish = {
    pairId: 0,
    lang: "en",
    item: { word: "Cry", translation: "叫喊" },
};
const duplicateCryChinese = {
    pairId: 1,
    lang: "zh",
    item: { word: " cry ", translation: " 叫喊 " },
};

assert.equal(
    matches(cryEnglish, duplicateCryChinese),
    true,
    "內容相同的重複字卡應可跨原始編號配對",
);
assert.equal(
    matches(cryEnglish, { ...duplicateCryChinese, lang: "en" }),
    false,
    "兩張英文卡不可互相配對",
);
assert.equal(
    matches(
        {
            pairId: 0,
            lang: "en",
            item: { word: "spring", translation: "春天" },
        },
        {
            pairId: 1,
            lang: "zh",
            item: { word: "spring", translation: "溫泉" },
        },
    ),
    true,
    "同一英文單字的不同中文義應可自由配對",
);
assert.equal(
    matches(cryEnglish, {
        pairId: 1,
        lang: "zh",
        item: { word: "shout", translation: "叫喊" },
    }),
    false,
    "中文相同但來源英文不同時不可誤配",
);
assert.equal(matches(cryEnglish, null), false, "缺少卡片資料時不可配對");

console.log(JSON.stringify({
    checked: true,
    duplicateContentCanMatch: true,
    multipleMeaningsCanMatch: true,
}));
