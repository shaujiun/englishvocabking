import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8')

function extractFunction(name) {
    const start = html.indexOf(`function ${name}(`)
    assert.notEqual(start, -1, `找不到函式：${name}`)
    const bodyStart = html.indexOf('{', start)
    let depth = 0
    for (let index = bodyStart; index < html.length; index += 1) {
        if (html[index] === '{') depth += 1
        if (html[index] === '}') depth -= 1
        if (depth === 0) return html.slice(start, index + 1)
    }
    throw new Error(`函式未結束：${name}`)
}

const context = {
    vocabulary: [
        { word: 'one', book: 'B3', lesson: 'L1' },
        { word: 'two', book: 'B3', lesson: 'L2' },
        { word: 'three', book: 'B3', lesson: 'L3' },
        { word: 'four', book: 'B3', lesson: 'L4' },
        { word: 'five', book: 'B3', lesson: 'L5' },
        { word: 'old', book: 'B2', lesson: 'L1' },
    ],
}

vm.runInNewContext([
    'const FIRST_SEMESTER_FIRST_EXAM_ENDS_ON = "2026-09-18";',
    extractFunction('getEnglishFocusScopeForAssignedDate'),
    extractFunction('getGameScopeLabel'),
    extractFunction('getVocabularyForScope'),
].join('\n'), context)

const beforeExam = vm.runInNewContext('getEnglishFocusScopeForAssignedDate("2026-09-18")', context)
assert.deepEqual([...beforeExam.lessons], ['L1', 'L2'])
assert.equal(beforeExam.book, 'B3')
assert.equal(vm.runInNewContext('getGameScopeLabel({...getEnglishFocusScopeForAssignedDate("2026-09-18"), type: "focus-lessons"})', context), 'B3 第 1～2 課')
assert.deepEqual(
    [...vm.runInNewContext('getVocabularyForScope({...getEnglishFocusScopeForAssignedDate("2026-09-18"), type: "focus-lessons"}).map(item => item.word)', context)],
    ['one', 'two'],
)

const afterExam = vm.runInNewContext('getEnglishFocusScopeForAssignedDate("2026-09-19")', context)
assert.deepEqual([...afterExam.lessons], ['L1', 'L2', 'L3', 'L4'])
assert.deepEqual(
    [...vm.runInNewContext('getVocabularyForScope({...getEnglishFocusScopeForAssignedDate("2026-09-19"), type: "focus-lessons"}).map(item => item.word)', context)],
    ['one', 'two', 'three', 'four'],
)

console.log(JSON.stringify({ checked: true, beforeExam: [...beforeExam.lessons], afterExam: [...afterExam.lessons] }))
