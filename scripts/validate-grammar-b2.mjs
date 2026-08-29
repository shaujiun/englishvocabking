import fs from "node:fs";
import vm from "node:vm";

const source = fs.readFileSync(new URL("../grammar-b2.js", import.meta.url), "utf8");
const context = { window: {} };
vm.createContext(context);
vm.runInContext(source, context);

const book = context.window.B2_GRAMMAR;
const errors = [];
const normalize = (value) => String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+([?.!,])/g, "$1")
    .replace(/\s+/g, " ");

if (!book || book.code !== "B2") errors.push("B2 book export is missing.");
if (Object.keys(book?.lessons || {}).join(",") !== "L1,L2,L3,L4,L5,L6") {
    errors.push("B2 must contain lessons L1 through L6 in order.");
}

for (const [lessonCode, lesson] of Object.entries(book?.lessons || {})) {
    const stageCodes = Object.keys(lesson.questionBank || {});
    if (stageCodes.join(",") !== "classification,doctor,transform,dialogue") {
        errors.push(`${lessonCode}: missing or misordered grammar stages.`);
    }

    for (const [stageCode, questions] of Object.entries(lesson.questionBank || {})) {
        if (questions.length !== 10) {
            errors.push(`${lessonCode}/${stageCode}: expected 10 questions, got ${questions.length}.`);
        }

        questions.forEach((question, index) => {
            const location = `${lessonCode}/${stageCode}/${index + 1}`;
            if (!question.answer || !question.rule || !question.clue) {
                errors.push(`${location}: missing answer, rule, or clue.`);
            }

            if (question.type === "choice") {
                for (const group of ["A", "B"]) {
                    const options = question.options?.[group] || [];
                    const expectedCount = group === "A" ? 4 : 3;
                    if (options.length !== expectedCount) {
                        errors.push(`${location}/${group}: expected ${expectedCount} options, got ${options.length}.`);
                    }
                    if (options.filter(option => option === question.answer).length !== 1) {
                        errors.push(`${location}/${group}: the correct answer must appear exactly once.`);
                    }
                    if (new Set(options).size !== options.length) {
                        errors.push(`${location}/${group}: options must be unique.`);
                    }
                }
            } else if (question.type === "reorder") {
                if (normalize(question.tokens.join(" ")) !== normalize(question.answer)) {
                    errors.push(`${location}: reorder tokens cannot form the answer.`);
                }
            } else {
                errors.push(`${location}: unsupported question type ${question.type}.`);
            }
        });
    }
}

const questionCount = Object.values(book?.lessons || {}).reduce(
    (bookTotal, lesson) => bookTotal + Object.values(lesson.questionBank || {})
        .reduce((lessonTotal, questions) => lessonTotal + questions.length, 0),
    0
);

console.log(JSON.stringify({
    book: book?.code,
    lessons: Object.keys(book?.lessons || {}),
    questionCount,
    errors
}, null, 2));

if (errors.length > 0) process.exit(1);
