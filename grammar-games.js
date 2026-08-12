(() => {
    "use strict";

    const GRAMMAR_BOOK = "B3";
    const GRAMMAR_LESSON = "L1";
    const PASS_SCORE = 80;

    const STAGES = [
        {
            id: "classification",
            title: "文法分類挑戰",
            subtitle: "先看懂句型，再開始變化",
            description: "辨認過去式、be 動詞、一般動詞及各種問句。",
            icon: "fa-layer-group",
            color: "sky"
        },
        {
            id: "doctor",
            title: "文法小醫生",
            subtitle: "找出錯誤，對症修正",
            description: "診斷助動詞、動詞形式、主詞與 be 動詞的錯誤。",
            icon: "fa-user-doctor",
            color: "emerald"
        },
        {
            id: "transform",
            title: "句型變身工廠",
            subtitle: "同一句話，變出不同句型",
            description: "練習肯定、否定、問句、詳答與句子重組。",
            icon: "fa-wand-magic-sparkles",
            color: "amber"
        },
        {
            id: "dialogue",
            title: "情境對話王",
            subtitle: "把文法用進生活對話",
            description: "依時間、語意與問句形式，選出自然且正確的回答。",
            icon: "fa-comments",
            color: "violet"
        }
    ];

    const THEMES = {
        sky: {
            icon: "bg-sky-100 text-sky-600",
            border: "border-sky-100",
            button: "bg-sky-600 hover:bg-sky-700",
            badge: "bg-sky-50 text-sky-700 border-sky-100"
        },
        emerald: {
            icon: "bg-emerald-100 text-emerald-600",
            border: "border-emerald-100",
            button: "bg-emerald-600 hover:bg-emerald-700",
            badge: "bg-emerald-50 text-emerald-700 border-emerald-100"
        },
        amber: {
            icon: "bg-amber-100 text-amber-600",
            border: "border-amber-100",
            button: "bg-amber-500 hover:bg-amber-600",
            badge: "bg-amber-50 text-amber-800 border-amber-100"
        },
        violet: {
            icon: "bg-violet-100 text-violet-600",
            border: "border-violet-100",
            button: "bg-violet-600 hover:bg-violet-700",
            badge: "bg-violet-50 text-violet-700 border-violet-100"
        }
    };

    const asGroupValue = (value, group) => {
        if (value && typeof value === "object" && !Array.isArray(value)) {
            return value[group] ?? value.B ?? value.A ?? "";
        }
        return value;
    };

    const choiceQuestion = (config) => ({ type: "choice", ...config });
    const reorderQuestion = (config) => ({ type: "reorder", ...config });

    const QUESTION_BANK = {
        classification: [
            choiceQuestion({
                instruction: "請判斷這個句子的文法類型。",
                stem: "We were at the gym yesterday.",
                options: {
                    B: ["be 動詞過去式肯定句", "一般動詞過去式肯定句", "現在式肯定句"],
                    A: ["be 動詞過去式肯定句", "一般動詞過去式肯定句", "be 動詞過去式疑問句", "現在進行式肯定句"]
                },
                answer: "be 動詞過去式肯定句",
                hint: { B: "先找句中的 were，再看 yesterday。", A: "判斷 were 在句中是主要動詞，還是協助另一個動詞。" },
                clue: "were 與 yesterday 都指出過去的狀態。",
                rule: "主詞為複數時，be 動詞過去式使用 were。",
                steps: ["找時間詞 yesterday", "找到主要動詞 were", "確認主詞 We 是複數", "判斷為過去式肯定句"]
            }),
            choiceQuestion({
                instruction: "請判斷這個句子的文法類型。",
                stem: "Nina didn't join the party last night.",
                options: {
                    B: ["一般動詞過去式否定句", "be 動詞過去式否定句", "一般動詞現在式否定句"],
                    A: ["一般動詞過去式否定句", "be 動詞過去式否定句", "一般動詞過去式疑問句", "現在完成式否定句"]
                },
                answer: "一般動詞過去式否定句",
                hint: { B: "didn't 是過去式的否定助動詞。", A: "觀察 didn't 後面的動詞形式及句尾時間。" },
                clue: "didn't 與 last night 表示過去未發生的動作。",
                rule: "一般動詞過去式否定句使用 didn't＋原形動詞。",
                steps: ["找到 last night", "辨認 didn't", "確認 join 是原形", "判斷為過去式否定句"]
            }),
            choiceQuestion({
                instruction: "請判斷這個句子的文法類型。",
                stem: "Did Leo call you this morning?",
                options: {
                    B: ["一般動詞過去式疑問句", "be 動詞過去式疑問句", "一般動詞現在式疑問句"],
                    A: ["一般動詞過去式疑問句", "be 動詞過去式疑問句", "過去進行式疑問句", "一般動詞過去式肯定句"]
                },
                answer: "一般動詞過去式疑問句",
                hint: { B: "句首的 Did 是重要線索。", A: "注意句首助動詞與 call 的形式。" },
                clue: "Did 放在句首，後面接原形動詞 call。",
                rule: "一般動詞的過去式 Yes／No 問句使用 Did＋主詞＋原形動詞。",
                steps: ["看到問號", "找到句首 Did", "確認 call 為原形", "判斷問句類型"]
            }),
            choiceQuestion({
                instruction: "請判斷這個句子的文法類型。",
                stem: "Was the classroom quiet an hour ago?",
                options: {
                    B: ["be 動詞過去式疑問句", "一般動詞過去式疑問句", "be 動詞現在式疑問句"],
                    A: ["be 動詞過去式疑問句", "一般動詞過去式疑問句", "be 動詞過去式否定句", "過去進行式疑問句"]
                },
                answer: "be 動詞過去式疑問句",
                hint: { B: "Was 已經移到句首。", A: "quiet 是形容詞，句中沒有另一個動作動詞。" },
                clue: "Was 位於句首，an hour ago 表示過去時間。",
                rule: "be 動詞問句只需把 was／were 移到主詞前面。",
                steps: ["找過去時間詞", "找到句首 Was", "確認主詞 classroom 為單數", "判斷為 be 動詞問句"]
            }),
            choiceQuestion({
                instruction: "請判斷這個句子的文法類型。",
                stem: "What did Amy cook for dinner?",
                options: {
                    B: ["過去式疑問詞問句", "過去式 Yes／No 問句", "現在式疑問詞問句"],
                    A: ["過去式疑問詞問句", "過去式 Yes／No 問句", "be 動詞疑問詞問句", "現在完成式疑問詞問句"]
                },
                answer: "過去式疑問詞問句",
                hint: { B: "句首先用 What 詢問事情。", A: "同時辨認 What、did 與 cook 三個線索。" },
                clue: "What 用來問事情，did 表示過去，cook 保持原形。",
                rule: "過去式疑問詞問句常用疑問詞＋did＋主詞＋原形動詞。",
                steps: ["找到疑問詞 What", "確認助動詞 did", "確認 cook 為原形", "判斷為過去式疑問詞問句"]
            }),
            choiceQuestion({
                instruction: "請判斷這個句子的文法類型。",
                stem: "My brothers weren't at home then.",
                options: {
                    B: ["be 動詞過去式否定句", "一般動詞過去式否定句", "be 動詞現在式否定句"],
                    A: ["be 動詞過去式否定句", "一般動詞過去式否定句", "be 動詞過去式疑問句", "現在進行式否定句"]
                },
                answer: "be 動詞過去式否定句",
                hint: { B: "weren't 就是 were not。", A: "at home 是狀態／地點，不是動作。" },
                clue: "weren't 是 were not 的縮寫，then 指過去當時。",
                rule: "複數主詞的 be 動詞過去式否定使用 weren't。",
                steps: ["找到 then", "展開 weren't 為 were not", "確認主詞 brothers 為複數", "判斷為過去式否定句"]
            }),
            choiceQuestion({
                instruction: "請判斷這個句子的文法類型。",
                stem: "Dad fixed my bike two days ago.",
                options: {
                    B: ["一般動詞過去式肯定句", "be 動詞過去式肯定句", "一般動詞現在式肯定句"],
                    A: ["一般動詞過去式肯定句", "be 動詞過去式肯定句", "現在完成式肯定句", "一般動詞過去式否定句"]
                },
                answer: "一般動詞過去式肯定句",
                hint: { B: "fixed 是 fix 的過去式。", A: "two days ago 會決定主要動詞的時態。" },
                clue: "two days ago 是過去時間，fixed 是規則動詞過去式。",
                rule: "一般動詞過去式肯定句直接使用動詞過去式。",
                steps: ["找 two days ago", "辨認 fixed", "確認句中沒有否定或問號", "判斷為過去式肯定句"]
            }),
            choiceQuestion({
                instruction: "請判斷這個句子的文法類型。",
                stem: "Where were you after school?",
                options: {
                    B: ["be 動詞過去式疑問詞問句", "一般動詞過去式疑問詞問句", "be 動詞現在式問句"],
                    A: ["be 動詞過去式疑問詞問句", "一般動詞過去式疑問詞問句", "過去進行式疑問詞問句", "一般動詞現在式問句"]
                },
                answer: "be 動詞過去式疑問詞問句",
                hint: { B: "Where 問地點，were 是 be 動詞過去式。", A: "句中沒有 did，也沒有動作動詞。" },
                clue: "Where 問地點，were 直接放在主詞 you 前面。",
                rule: "be 動詞疑問詞問句使用疑問詞＋was／were＋主詞。",
                steps: ["辨認 Where", "找到 were", "確認問題在詢問地點", "判斷 be 動詞問句"]
            }),
            choiceQuestion({
                instruction: "哪一項最能說明這個句子？",
                stem: "They practice English every day.",
                options: {
                    B: ["現在的習慣", "昨天完成的動作", "過去的狀態"],
                    A: ["現在的習慣", "過去反覆發生的習慣", "現在正在進行的動作", "已經結束的單次動作"]
                },
                answer: "現在的習慣",
                hint: { B: "every day 表示每天固定做。", A: "不要只看 practice 的外形，時間詞會決定意義。" },
                clue: "every day 表示規律、反覆的現在習慣。",
                rule: "現在簡單式常用來描述習慣，過去簡單式則描述已結束的過去事件。",
                steps: ["找時間詞 every day", "判斷是規律行為", "確認 practice 是現在式", "排除過去式類型"]
            }),
            choiceQuestion({
                instruction: "句中的哪一部分最直接提示要使用過去式？",
                stem: "Two months ago, our class visited the science museum.",
                options: {
                    B: ["Two months ago", "our class", "science museum"],
                    A: ["Two months ago", "our class", "visited", "the science museum"]
                },
                answer: "Two months ago",
                hint: { B: "找表示時間的片語。", A: "題目問的是提示時態的訊號，不是已經變化完成的動詞。" },
                clue: "ago 表示從現在往前推的一段時間。",
                rule: "一段時間＋ago 通常與過去簡單式搭配。",
                steps: ["先掃描時間片語", "找到 ago", "確認事件已經結束", "選出時態訊號"]
            })
        ],

        doctor: [
            choiceQuestion({
                instruction: { B: "動詞用錯了，請幫忙選出正確句子。", A: "請找出唯一完全正確的句子。" },
                stem: "Did Kevin watched the game last night?",
                options: {
                    B: ["Did Kevin watch the game last night?", "Did Kevin watches the game last night?", "Was Kevin watch the game last night?"],
                    A: ["Did Kevin watch the game last night?", "Did Kevin watched the game last night?", "Was Kevin watch the game last night?", "Does Kevin watched the game last night?"]
                },
                answer: "Did Kevin watch the game last night?",
                hint: { B: "Did 後面的動詞要回到原形。", A: "過去時間已經由哪一個字承擔？" },
                clue: "句首已有 Did 表示過去。",
                rule: "Did 後接原形動詞，因此 watched 要改為 watch。",
                steps: ["找到句首 Did", "確認為過去式問句", "把動詞還原成 watch", "保留 last night"]
            }),
            choiceQuestion({
                instruction: { B: "be 動詞用錯了，請選出正確句子。", A: "請找出唯一完全正確的句子。" },
                stem: "My cousins was tired yesterday.",
                options: {
                    B: ["My cousins were tired yesterday.", "My cousins did tired yesterday.", "My cousins are tired yesterday."],
                    A: ["My cousins were tired yesterday.", "My cousins was tired yesterday.", "My cousins did be tired yesterday.", "My cousins have tired yesterday."]
                },
                answer: "My cousins were tired yesterday.",
                hint: { B: "cousins 是複數。", A: "先判斷主詞數量，再配合 yesterday。" },
                clue: "cousins 是複數主詞，yesterday 表示過去。",
                rule: "複數主詞的 be 動詞過去式使用 were。",
                steps: ["圈出主詞 cousins", "判斷為複數", "找到 yesterday", "選 were"]
            }),
            choiceQuestion({
                instruction: { B: "否定句的動詞形式錯了，請修正。", A: "請找出唯一完全正確的句子。" },
                stem: "Amy didn't cooked dinner yesterday.",
                options: {
                    B: ["Amy didn't cook dinner yesterday.", "Amy wasn't cook dinner yesterday.", "Amy doesn't cooked dinner yesterday."],
                    A: ["Amy didn't cook dinner yesterday.", "Amy didn't cooked dinner yesterday.", "Amy wasn't cooking dinner yesterday.", "Amy doesn't cook dinner yesterday."]
                },
                answer: "Amy didn't cook dinner yesterday.",
                hint: { B: "didn't 後面要使用 cook。", A: "否定助動詞已經標示過去，不要讓動詞再標一次。" },
                clue: "didn't 已經負責表示過去與否定。",
                rule: "didn't 後面的主要動詞必須使用原形。",
                steps: ["找到 didn't", "確認是一般動詞否定句", "把 cooked 還原為 cook", "檢查 yesterday"]
            }),
            choiceQuestion({
                instruction: { B: "主詞與 be 動詞不合，請修正。", A: "請找出唯一完全正確的句子。" },
                stem: "Were your sister at home an hour ago?",
                options: {
                    B: ["Was your sister at home an hour ago?", "Did your sister at home an hour ago?", "Is your sister at home an hour ago?"],
                    A: ["Was your sister at home an hour ago?", "Were your sister at home an hour ago?", "Did your sister be at home an hour ago?", "Has your sister at home an hour ago?"]
                },
                answer: "Was your sister at home an hour ago?",
                hint: { B: "sister 是單數。", A: "at home 描述狀態，先決定要使用哪一類動詞。" },
                clue: "your sister 是單數，an hour ago 表示過去。",
                rule: "單數第三人稱的 be 動詞過去式問句使用 Was。",
                steps: ["確認 sister 是單數", "確認是 be 動詞句", "找到過去時間", "把 Were 改為 Was"]
            }),
            choiceQuestion({
                instruction: { B: "疑問句的動詞形式錯了，請修正。", A: "請找出唯一完全正確的句子。" },
                stem: "What did they ate after school?",
                options: {
                    B: ["What did they eat after school?", "What were they eat after school?", "What did they eating after school?"],
                    A: ["What did they eat after school?", "What did they ate after school?", "What were they eat after school?", "What have they ate after school?"]
                },
                answer: "What did they eat after school?",
                hint: { B: "did 後面用 eat，不用 ate。", A: "疑問詞不影響 did 後接原形的規則。" },
                clue: "did 已經表示過去，eat 要保持原形。",
                rule: "疑問詞＋did＋主詞之後仍接原形動詞。",
                steps: ["找到 What", "確認助動詞 did", "把 ate 還原為 eat", "檢查語序"]
            }),
            choiceQuestion({
                instruction: { B: "規則動詞的拼法錯了，請修正。", A: "請找出唯一完全正確的句子。" },
                stem: "Lisa studyed English last Saturday.",
                options: {
                    B: ["Lisa studied English last Saturday.", "Lisa study English last Saturday.", "Lisa studyd English last Saturday."],
                    A: ["Lisa studied English last Saturday.", "Lisa studyed English last Saturday.", "Lisa was studied English last Saturday.", "Lisa did studied English last Saturday."]
                },
                answer: "Lisa studied English last Saturday.",
                hint: { B: "study 是子音＋y 結尾。", A: "檢查 y 結尾規則及句中是否需要助動詞。" },
                clue: "study 的 y 前面是子音 d。",
                rule: "子音＋y 結尾的規則動詞，過去式去 y 加 ied。",
                steps: ["找到動詞 study", "確認 y 前是子音", "去 y 加 ied", "得到 studied"]
            }),
            choiceQuestion({
                instruction: { B: "句中多用了 be 動詞，請修正。", A: "請找出唯一完全正確的句子。" },
                stem: "We were played basketball yesterday.",
                options: {
                    B: ["We played basketball yesterday.", "We were play basketball yesterday.", "We did played basketball yesterday."],
                    A: ["We played basketball yesterday.", "We were played basketball yesterday.", "We did played basketball yesterday.", "We have played basketball yesterday."]
                },
                answer: "We played basketball yesterday.",
                hint: { B: "played 已經是主要動詞的過去式。", A: "這句是在說動作，不是在說狀態。" },
                clue: "play basketball 是動作，played 已經表示過去。",
                rule: "一般動詞過去式肯定句不需再加 was／were 或 did。",
                steps: ["找主要意思 play basketball", "判斷為動作", "使用 played", "刪除多餘的 were"]
            }),
            choiceQuestion({
                instruction: { B: "主詞與 be 動詞不合，請修正。", A: "請找出唯一完全正確的句子。" },
                stem: "Was Tom and Ken busy this morning?",
                options: {
                    B: ["Were Tom and Ken busy this morning?", "Did Tom and Ken busy this morning?", "Are Tom and Ken busy this morning?"],
                    A: ["Were Tom and Ken busy this morning?", "Was Tom and Ken busy this morning?", "Did Tom and Ken be busy this morning?", "Were Tom and Ken be busy this morning?"]
                },
                answer: "Were Tom and Ken busy this morning?",
                hint: { B: "Tom and Ken 是兩個人。", A: "and 連接兩個單數名字後，整個主詞視為複數。" },
                clue: "Tom and Ken 是複數主詞。",
                rule: "複數主詞的 be 動詞過去式問句使用 Were。",
                steps: ["找到 and", "判斷主詞為複數", "確認 busy 是狀態", "把 Was 改為 Were"]
            }),
            choiceQuestion({
                instruction: { B: "否定方式錯了，請修正。", A: "請找出唯一完全正確的句子。" },
                stem: "I didn't was busy last night.",
                options: {
                    B: ["I wasn't busy last night.", "I didn't be busy last night.", "I weren't busy last night."],
                    A: ["I wasn't busy last night.", "I didn't was busy last night.", "I weren't busy last night.", "I haven't busy last night."]
                },
                answer: "I wasn't busy last night.",
                hint: { B: "be 動詞有自己的否定形式。", A: "busy 是形容詞，前面需要 be 動詞，不使用 didn't。" },
                clue: "busy 是形容詞，句子的主要動詞是 be。",
                rule: "be 動詞過去式否定直接使用 wasn't／weren't，不加 didn't。",
                steps: ["確認 busy 是形容詞", "選擇 be 動詞句", "I 的過去式用 was", "加 not 成 wasn't"]
            }),
            choiceQuestion({
                instruction: { B: "疑問句的動詞形式錯了，請修正。", A: "請找出唯一完全正確的句子。" },
                stem: "Did Mia went to the library yesterday?",
                options: {
                    B: ["Did Mia go to the library yesterday?", "Was Mia go to the library yesterday?", "Did Mia goes to the library yesterday?"],
                    A: ["Did Mia go to the library yesterday?", "Did Mia went to the library yesterday?", "Was Mia went to the library yesterday?", "Does Mia go to the library yesterday?"]
                },
                answer: "Did Mia go to the library yesterday?",
                hint: { B: "went 要改回原形 go。", A: "不規則動詞也必須遵守 did 後接原形。" },
                clue: "Did 已經承擔過去時態。",
                rule: "不論規則或不規則動詞，Did 後一律使用原形。",
                steps: ["找到 Did", "辨認 went 的原形是 go", "改成 go", "保留 yesterday"]
            })
        ],

        transform: [
            reorderQuestion({
                instruction: "把提示字詞組成正確的過去式肯定句。",
                context: "昨天他們很忙。",
                stem: "請依序點選字詞。",
                answer: "They were busy yesterday.",
                tokens: ["They", "were", "busy", "yesterday."],
                hint: { B: "主詞 They 後面要接 were。", A: "先排主詞與 be 動詞，再放補語和時間。" },
                clue: "They 是複數，yesterday 表示過去。",
                rule: "be 動詞過去式肯定句：主詞＋was／were＋補語＋時間。",
                steps: ["先放主詞 They", "複數主詞搭配 were", "接形容詞 busy", "時間 yesterday 放句尾"]
            }),
            choiceQuestion({
                instruction: "把肯定句改成過去式否定句。",
                context: "Ben cleaned his room yesterday.",
                stem: "下列哪一句改寫正確？",
                options: {
                    B: ["Ben didn't clean his room yesterday.", "Ben wasn't clean his room yesterday.", "Ben didn't cleaned his room yesterday."],
                    A: ["Ben didn't clean his room yesterday.", "Ben didn't cleaned his room yesterday.", "Ben wasn't cleaning his room yesterday.", "Ben doesn't clean his room yesterday."]
                },
                answer: "Ben didn't clean his room yesterday.",
                hint: { B: "didn't 後面使用 clean。", A: "改寫後語意仍應是昨天沒有打掃，而不是沒有正在打掃。" },
                clue: "原句是一般動詞過去式，否定要使用 didn't。",
                rule: "主詞＋didn't＋原形動詞＋其他部分。",
                steps: ["找到主要動詞 cleaned", "加入 didn't", "把 cleaned 還原為 clean", "保留其餘資訊"]
            }),
            reorderQuestion({
                instruction: "把提示字詞組成正確的過去式疑問句。",
                context: "Mia 上星期日有拜訪她的阿姨嗎？",
                stem: "請依序點選字詞。",
                answer: "Did Mia visit her aunt last Sunday?",
                tokens: ["Did", "Mia", "visit", "her aunt", "last Sunday?"],
                hint: { B: "Did 放句首，visit 使用原形。", A: "助動詞先行，主詞在後，主要動詞不再變化。" },
                clue: "last Sunday 表示過去，問動作要使用 Did。",
                rule: "Did＋主詞＋原形動詞＋其他部分？",
                steps: ["句首放 Did", "接主詞 Mia", "使用原形 visit", "補上受詞與時間"]
            }),
            choiceQuestion({
                instruction: "把肯定句改成 be 動詞過去式否定句。",
                context: "The girls were hungry then.",
                stem: "下列哪一句改寫正確？",
                options: {
                    B: ["The girls weren't hungry then.", "The girls didn't hungry then.", "The girls wasn't hungry then."],
                    A: ["The girls weren't hungry then.", "The girls didn't be hungry then.", "The girls wasn't hungry then.", "The girls haven't hungry then."]
                },
                answer: "The girls weren't hungry then.",
                hint: { B: "were not 可以縮寫成 weren't。", A: "不要把 be 動詞句改成一般動詞句。" },
                clue: "原句主要動詞是 were。",
                rule: "be 動詞否定直接在 was／were 後加 not。",
                steps: ["找到原句 were", "在 were 後加 not", "縮寫為 weren't", "其餘句子不變"]
            }),
            reorderQuestion({
                instruction: "依回答內容組成正確問句。",
                context: "回答：Leo cooked noodles last night.",
                stem: "想詢問 Leo 做了什麼，請依序點選字詞。",
                answer: "What did Leo cook last night?",
                tokens: ["What", "did", "Leo", "cook", "last night?"],
                hint: { B: "What 放最前面，did 後用 cook。", A: "先確定疑問詞，再安排助動詞、主詞與原形動詞。" },
                clue: "要問做了什麼，使用 What；last night 表示過去。",
                rule: "What＋did＋主詞＋原形動詞＋時間？",
                steps: ["用 What 問事情", "加入過去助動詞 did", "接主詞 Leo", "動詞使用 cook"]
            }),
            choiceQuestion({
                instruction: "把現在的習慣改成上星期五發生的事情。",
                context: "Sam plays basketball every Friday.",
                stem: "下列哪一句改寫正確？",
                options: {
                    B: ["Sam played basketball last Friday.", "Sam plays basketball last Friday.", "Sam did played basketball last Friday."],
                    A: ["Sam played basketball last Friday.", "Sam had played basketball last Friday.", "Sam did played basketball last Friday.", "Sam was play basketball last Friday."]
                },
                answer: "Sam played basketball last Friday.",
                hint: { B: "last Friday 要搭配 played。", A: "題目只描述一次已結束的過去事件。" },
                clue: "時間從 every Friday 改為 last Friday。",
                rule: "肯定句改成過去簡單式時，主要動詞改為過去式。",
                steps: ["找新的時間 last Friday", "判斷為過去式", "把 plays 改為 played", "刪除 every"]
            }),
            choiceQuestion({
                instruction: "請選出先簡答、再詳答的正確回答。",
                context: "Did Nora wash her bike this morning?",
                stem: "肯定回答應該怎麼說？",
                options: {
                    B: ["Yes, she did. She washed her bike this morning.", "Yes, she was. She washed her bike this morning.", "Yes, she did. She wash her bike this morning."],
                    A: ["Yes, she did. She washed her bike this morning.", "Yes, she did. She did washed her bike this morning.", "Yes, she was. She washed her bike this morning.", "Yes, she has. She washed her bike this morning."]
                },
                answer: "Yes, she did. She washed her bike this morning.",
                hint: { B: "簡答用 did，詳答中的動詞用 washed。", A: "簡答承接助動詞；詳答回到過去式肯定句。" },
                clue: "原問句以 Did 開頭。",
                rule: "Did 問句的肯定簡答用 Yes, 主詞＋did；詳答使用動詞過去式。",
                steps: ["用 she 代替 Nora", "簡答使用 did", "詳答使用 washed", "補回時間"]
            }),
            choiceQuestion({
                instruction: "請選出正確的否定簡答與詳答。",
                context: "Was Ryan at school yesterday?",
                stem: "否定回答應該怎麼說？",
                options: {
                    B: ["No, he wasn't. He wasn't at school yesterday.", "No, he didn't. He didn't at school yesterday.", "No, he weren't. He weren't at school yesterday."],
                    A: ["No, he wasn't. He wasn't at school yesterday.", "No, he didn't. He wasn't at school yesterday.", "No, he weren't. He wasn't at school yesterday.", "No, he hasn't. He wasn't at school yesterday."]
                },
                answer: "No, he wasn't. He wasn't at school yesterday.",
                hint: { B: "Was 問句要用 wasn't 回答。", A: "簡答必須沿用問句的 be 動詞種類。" },
                clue: "原問句使用 Was，而且 Ryan 是男性單數。",
                rule: "Was 問句的否定簡答為 No, 主詞＋wasn't。",
                steps: ["用 he 代替 Ryan", "沿用 was", "加 not 成 wasn't", "詳答補回地點與時間"]
            }),
            reorderQuestion({
                instruction: "把提示字詞組成正確的地點問句。",
                context: "你兩小時前在哪裡？",
                stem: "請依序點選字詞。",
                answer: "Where were you two hours ago?",
                tokens: ["Where", "were", "you", "two hours ago?"],
                hint: { B: "Where 放句首，you 搭配 were。", A: "這是在詢問狀態地點，沒有動作動詞。" },
                clue: "Where 問地點，two hours ago 表示過去。",
                rule: "Where＋was／were＋主詞＋過去時間？",
                steps: ["先放 Where", "you 搭配 were", "接主詞 you", "最後放時間"]
            }),
            choiceQuestion({
                instruction: "依畫線意思造問句：想知道 Nora 做了什麼。",
                context: "Nora washed her bike after lunch.",
                stem: "下列哪一句問法正確？",
                options: {
                    B: ["What did Nora do after lunch?", "What was Nora do after lunch?", "What did Nora did after lunch?"],
                    A: ["What did Nora do after lunch?", "What did Nora wash after lunch?", "What was Nora doing after lunch?", "What Nora did after lunch?"]
                },
                answer: "What did Nora do after lunch?",
                hint: { B: "詢問做了什麼，要用 What did Nora do。", A: "題目問整個動作，不只是被清洗的物品。" },
                clue: "要詢問整個動作 washed her bike。",
                rule: "詢問某人過去做了什麼：What did＋主詞＋do？",
                steps: ["判斷畫線內容是動作", "用 What 詢問", "加入 did 與主詞", "主要動詞以 do 代替"]
            })
        ],

        dialogue: [
            choiceQuestion({
                instruction: "閱讀對話，選出自然且文法正確的回答。",
                context: "A: What did you do last night?",
                stem: "B 應該怎麼回答？",
                options: {
                    B: ["I studied for the science test.", "Yes, I did.", "I study every night."],
                    A: ["I studied for the science test.", "Yes, I studied.", "I was study for the science test.", "I have studied last night."]
                },
                answer: "I studied for the science test.",
                hint: { B: "What 問做了什麼，要回答一個動作。", A: "回答必須同時符合問句種類與 last night 的時態。" },
                clue: "What did you do 要求說明過去做的事情。",
                rule: "疑問詞問句不能只用 Yes／No 回答；回答的主要動詞使用過去式。",
                steps: ["先看疑問詞 What", "確認時間 last night", "選擇具體動作", "使用 studied"]
            }),
            choiceQuestion({
                instruction: "閱讀對話，選出自然且文法正確的回答。",
                context: "A: Was your mother busy yesterday?",
                stem: "B 應該怎麼肯定回答？",
                options: {
                    B: ["Yes, she was.", "Yes, she did.", "Yes, she is."],
                    A: ["Yes, she was.", "Yes, she did.", "Yes, she has.", "Yes, she were."]
                },
                answer: "Yes, she was.",
                hint: { B: "Was 問句要用 was 回答。", A: "簡答必須沿用問句中的動詞種類。" },
                clue: "問句以 Was 開頭。",
                rule: "Was 問句的肯定簡答為 Yes, 主詞＋was。",
                steps: ["辨認 Was 問句", "mother 用 she 代替", "肯定回答使用 was", "不使用 did"]
            }),
            choiceQuestion({
                instruction: "閱讀對話，選出最完整的回答。",
                context: "A: Did Tim join the picnic yesterday?\nB: No. He was sick.",
                stem: "B 的第一句應補成哪一句？",
                options: {
                    B: ["No, he didn't.", "No, he wasn't.", "No, he doesn't."],
                    A: ["No, he didn't.", "No, he wasn't.", "No, he hasn't.", "No, he hadn't."]
                },
                answer: "No, he didn't.",
                hint: { B: "Did 問句用 didn't 否定回答。", A: "雖然下一句有 was，簡答仍需承接原問句的 Did。" },
                clue: "原問句詢問 join 這個動作，使用 Did。",
                rule: "Did 問句的否定簡答為 No, 主詞＋didn't。",
                steps: ["先看原問句 Did", "Tim 用 he 代替", "使用 didn't", "下一句再補充原因"]
            }),
            choiceQuestion({
                instruction: "閱讀對話，選出符合問題的回答。",
                context: "A: Where were you after school?",
                stem: "B 應該怎麼回答？",
                options: {
                    B: ["I was in the library.", "I read a book.", "Yes, I was."],
                    A: ["I was in the library.", "I went there after school.", "Yes, I was at school.", "I did in the library."]
                },
                answer: "I was in the library.",
                hint: { B: "Where 問地點。", A: "選擇能直接交代地點，而且延續 be 動詞過去式的回答。" },
                clue: "Where 要求回答地點。",
                rule: "Where were you...? 可用 I was＋地方 回答。",
                steps: ["辨認 Where", "找地點內容", "you 改為 I", "were 改為 was"]
            }),
            choiceQuestion({
                instruction: "閱讀對話，選出自然且文法正確的回答。",
                context: "A: What did the twins cook for dinner?",
                stem: "B 應該怎麼回答？",
                options: {
                    B: ["They cooked noodles.", "They cook noodles.", "Yes, they did."],
                    A: ["They cooked noodles.", "They did cooked noodles.", "They were cooking noodles every day.", "Yes, they cooked."]
                },
                answer: "They cooked noodles.",
                hint: { B: "What 問內容，回答要說出 noodles。", A: "詳答中不需要 did，主要動詞直接使用過去式。" },
                clue: "What 問煮了什麼，問句時間是過去。",
                rule: "詳答使用主詞＋過去式動詞＋受詞。",
                steps: ["確認 What 問受詞", "twins 用 they", "cook 改為 cooked", "補出 noodles"]
            }),
            choiceQuestion({
                instruction: "閱讀對話，選出正確的肯定詳答。",
                context: "A: Did your sister clean the kitchen this morning?",
                stem: "B 應該怎麼回答？",
                options: {
                    B: ["Yes, she did. She cleaned it this morning.", "Yes, she was. She cleaned it this morning.", "Yes, she did. She clean it this morning."],
                    A: ["Yes, she did. She cleaned it this morning.", "Yes, she did. She did cleaned it this morning.", "Yes, she was. She has cleaned it this morning.", "Yes, she has. She cleaned it this morning."]
                },
                answer: "Yes, she did. She cleaned it this morning.",
                hint: { B: "簡答用 did，詳答用 cleaned。", A: "簡答與詳答的動詞形式不同，不能把 did 留在詳答中。" },
                clue: "問句以 Did 開頭，時間是 this morning。",
                rule: "肯定簡答用 did；過去式詳答的主要動詞用過去式。",
                steps: ["sister 用 she", "簡答使用 did", "詳答使用 cleaned", "it 代替 kitchen"]
            }),
            choiceQuestion({
                instruction: "根據前後文，選出最合理的回答。",
                context: "A: Why are you so tired today?",
                stem: "B 應該怎麼回答？",
                options: {
                    B: ["I played basketball for two hours yesterday.", "I play basketball every day.", "I was basketball yesterday."],
                    A: ["I played basketball for two hours yesterday.", "I had played basketball tomorrow.", "I did played basketball yesterday.", "I was playing basketball every day."]
                },
                answer: "I played basketball for two hours yesterday.",
                hint: { B: "回答要說明今天累的過去原因。", A: "選出時間與因果都一致的過去事件。" },
                clue: "today 的疲累是 yesterday 的動作造成。",
                rule: "描述已經結束、造成現在結果的過去事件，可使用過去簡單式。",
                steps: ["找出問題在問原因", "確認原因發生在昨天", "使用 played", "檢查語意是否完整"]
            }),
            choiceQuestion({
                instruction: "閱讀對話，選出正確的回答。",
                context: "A: Was the weather cold last weekend?",
                stem: "B 想回答『不，天氣很溫暖』，應該怎麼說？",
                options: {
                    B: ["No, it wasn't. It was warm.", "No, it didn't. It was warm.", "No, it isn't. It is warm."],
                    A: ["No, it wasn't. It was warm.", "No, it didn't. It was warm.", "No, it weren't. It had warm weather.", "No, it hasn't. It was warm."]
                },
                answer: "No, it wasn't. It was warm.",
                hint: { B: "Was 問句要用 wasn't 回答。", A: "weather 用 it 代替，前後兩句都描述過去狀態。" },
                clue: "問句使用 Was，last weekend 表示過去。",
                rule: "be 動詞過去式否定簡答使用 wasn't；詳答也使用 was。",
                steps: ["weather 用 it", "否定簡答用 wasn't", "詳答改說 warm", "詳答使用 was"]
            }),
            choiceQuestion({
                instruction: "閱讀對話，選出自然且完整的回答。",
                context: "A: Did you visit Grandpa last weekend?",
                stem: "B 應該怎麼肯定回答？",
                options: {
                    B: ["Yes, I did. We had lunch together.", "Yes, I was. We have lunch together.", "Yes, I do. We had lunch together."],
                    A: ["Yes, I did. We had lunch together.", "Yes, I have. We had lunch last weekend.", "Yes, I did. We did had lunch together.", "Yes, I was. We were lunch together."]
                },
                answer: "Yes, I did. We had lunch together.",
                hint: { B: "Did 問句用 did 回答，have 的過去式是 had。", A: "第二句補充同一個週末發生的事情，也要使用過去式。" },
                clue: "Did 與 last weekend 都指出過去事件。",
                rule: "Did 問句用 did 簡答；補充的過去動作也使用動詞過去式。",
                steps: ["用 did 完成簡答", "判斷補充事件也在過去", "have 改為 had", "檢查對話連貫"]
            }),
            choiceQuestion({
                instruction: "根據前後文，選出最合理的回答。",
                context: "A: What happened to your laptop?",
                stem: "B 應該怎麼回答？",
                options: {
                    B: ["It stopped working this morning.", "Yes, it did.", "It stop working every morning."],
                    A: ["It stopped working this morning.", "It did stopped working this morning.", "It was stop working this morning.", "It has stopped working yesterday morning."]
                },
                answer: "It stopped working this morning.",
                hint: { B: "What happened 要回答發生的事情。", A: "選出能直接描述已發生事件，且沒有重複標記過去式的句子。" },
                clue: "What happened 詢問已經發生的事件。",
                rule: "回答過去發生的事情時，肯定句直接使用主要動詞過去式。",
                steps: ["確認問題不是 Yes／No 問句", "找具體事件", "stop 改為 stopped", "保留 this morning"]
            })
        ]
    };

    let grammarProgress = {};
    let grammarPreviewGroup = null;
    let grammarSession = null;

    const shuffle = (items) => {
        const result = [...items];
        for (let index = result.length - 1; index > 0; index -= 1) {
            const swapIndex = Math.floor(Math.random() * (index + 1));
            [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
        }
        return result;
    };

    const normalizeSentence = (text) => String(text || "")
        .trim()
        .toLowerCase()
        .replace(/\s+([?.!,])/g, "$1")
        .replace(/\s+/g, " ");

    const getGrammarGroup = () => {
        if (currentUser?.role === "admin") return grammarPreviewGroup || "B";
        return String(learningContext?.englishGroup || "B").toUpperCase() === "A" ? "A" : "B";
    };

    const getProgressStorageKey = () => `grammar-progress:${currentUser?.id || currentUser?.username || "guest"}`;

    const getStageProgress = (stageId) => grammarProgress[stageId] || {
        bestScore: 0,
        attempts: 0,
        passed: false
    };

    const isStageUnlocked = (stageIndex) => {
        if (currentUser?.role === "admin" || stageIndex === 0) return true;
        return Boolean(getStageProgress(STAGES[stageIndex - 1].id).passed);
    };

    function saveLocalGrammarProgress() {
        try {
            localStorage.setItem(getProgressStorageKey(), JSON.stringify(grammarProgress));
        } catch (error) {
            console.warn("Unable to save local grammar progress.", error);
        }
    }

    async function loadGrammarProgress() {
        grammarProgress = {};
        try {
            const saved = JSON.parse(localStorage.getItem(getProgressStorageKey()) || "{}");
            if (saved && typeof saved === "object") grammarProgress = saved;
        } catch (error) {
            console.warn("Unable to read local grammar progress.", error);
        }

        if (!currentUser || currentUser.role !== "student" || !db) return;

        const { data, error } = await db
            .from("grammar_progress")
            .select("game_code,best_score,attempt_count,passed")
            .eq("user_id", currentUser.id)
            .eq("book", GRAMMAR_BOOK)
            .eq("lesson", GRAMMAR_LESSON);

        if (error) {
            console.warn("Grammar progress table is not available yet; using this device only.", error);
            return;
        }

        (data || []).forEach((row) => {
            const local = getStageProgress(row.game_code);
            grammarProgress[row.game_code] = {
                bestScore: Math.max(local.bestScore || 0, Number(row.best_score) || 0),
                attempts: Math.max(local.attempts || 0, Number(row.attempt_count) || 0),
                passed: Boolean(local.passed || row.passed)
            };
        });
        saveLocalGrammarProgress();
    }

    async function saveGrammarStageProgress(stageId, score) {
        const previous = getStageProgress(stageId);
        const next = {
            bestScore: Math.max(previous.bestScore || 0, score),
            attempts: (previous.attempts || 0) + 1,
            passed: Boolean(previous.passed || score >= PASS_SCORE)
        };
        grammarProgress[stageId] = next;
        saveLocalGrammarProgress();

        if (!currentUser || currentUser.role !== "student" || !db) return next;

        const { error } = await db.from("grammar_progress").upsert({
            user_id: currentUser.id,
            book: GRAMMAR_BOOK,
            lesson: GRAMMAR_LESSON,
            game_code: stageId,
            best_score: next.bestScore,
            attempt_count: next.attempts,
            passed: next.passed,
            updated_at: new Date().toISOString()
        }, { onConflict: "user_id,book,lesson,game_code" });

        if (error) console.warn("Unable to sync grammar progress; local result is kept.", error);
        return next;
    }

    function updateGrammarGroupDisplay() {
        const group = getGrammarGroup();
        const badge = document.getElementById("grammar-group-badge");
        const questionBadge = document.getElementById("grammar-question-group");
        if (badge) badge.textContent = `英語 ${group} 組`;
        if (questionBadge) questionBadge.textContent = `英語 ${group} 組`;

        const adminWrap = document.getElementById("grammar-admin-group-wrap");
        const adminSelect = document.getElementById("grammar-admin-group");
        if (adminWrap) adminWrap.classList.toggle("hidden", currentUser?.role !== "admin");
        if (adminSelect && currentUser?.role === "admin") adminSelect.value = group;
    }

    function renderGrammarMap() {
        updateGrammarGroupDisplay();
        const grid = document.getElementById("grammar-stage-grid");
        const status = document.getElementById("grammar-map-status");
        if (!grid || !status) return;

        const passedCount = STAGES.filter(stage => getStageProgress(stage.id).passed).length;
        status.innerHTML = passedCount === STAGES.length
            ? '<i class="fa-solid fa-trophy mr-2 text-amber-500" aria-hidden="true"></i>第 1 課的四個文法關卡都已通過，可以自由重複練習。'
            : `<i class="fa-solid fa-route mr-2 text-violet-500" aria-hidden="true"></i>已通過 ${passedCount}／${STAGES.length} 關；每關以首次作答計算，達 ${PASS_SCORE}% 即可解鎖下一關。`;

        grid.innerHTML = STAGES.map((stage, index) => {
            const theme = THEMES[stage.color];
            const progress = getStageProgress(stage.id);
            const unlocked = isStageUnlocked(index);
            const stateLabel = progress.passed
                ? `已通過・最佳 ${progress.bestScore}%`
                : unlocked && progress.attempts > 0
                    ? `最佳 ${progress.bestScore}%・再試一次`
                    : unlocked ? "可以開始" : "完成上一關後解鎖";
            const icon = unlocked ? stage.icon : "fa-lock";
            const buttonLabel = progress.passed ? "再次練習" : unlocked ? "開始挑戰" : "尚未解鎖";

            return `
                <article class="rounded-3xl border ${theme.border} bg-white p-5 shadow-sm transition ${unlocked ? "hover:-translate-y-1 hover:shadow-lg" : "opacity-65"}">
                    <div class="flex items-start gap-4">
                        <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${unlocked ? theme.icon : "bg-slate-100 text-slate-400"}">
                            <i class="fa-solid ${icon} text-xl" aria-hidden="true"></i>
                        </div>
                        <div class="min-w-0 flex-1">
                            <span class="text-[11px] font-black tracking-widest text-slate-400">STAGE ${index + 1}</span>
                            <h3 class="mt-1 text-xl font-black text-slate-800">${stage.title}</h3>
                            <p class="mt-1 text-xs font-black text-slate-500">${stage.subtitle}</p>
                        </div>
                    </div>
                    <p class="mt-4 min-h-10 text-sm font-medium leading-relaxed text-slate-500">${stage.description}</p>
                    <div class="mt-4 flex items-center justify-between gap-3">
                        <span class="rounded-full border px-3 py-1 text-[11px] font-black ${theme.badge}">${stateLabel}</span>
                        <button type="button" ${unlocked ? `onclick="startGrammarStage('${stage.id}')"` : "disabled"} class="rounded-xl px-4 py-2 text-sm font-black text-white transition ${unlocked ? theme.button : "cursor-not-allowed bg-slate-300"}">${buttonLabel}</button>
                    </div>
                </article>
            `;
        }).join("");
    }

    function openGrammarMap() {
        switchTab("grammar-map");
        renderGrammarMap();
    }

    function setGrammarPreviewGroup(group) {
        if (currentUser?.role !== "admin") return;
        grammarPreviewGroup = String(group).toUpperCase() === "A" ? "A" : "B";
        renderGrammarMap();
    }

    function startGrammarStage(stageId) {
        const stageIndex = STAGES.findIndex(stage => stage.id === stageId);
        if (stageIndex < 0) return;
        if (!isStageUnlocked(stageIndex)) {
            showToast("請先完成上一個文法關卡。", "info");
            return;
        }

        const stage = STAGES[stageIndex];
        const group = getGrammarGroup();
        grammarSession = {
            stage,
            group,
            questions: shuffle(QUESTION_BANK[stageId]).slice(0, 10),
            currentIndex: 0,
            firstTryCorrect: 0,
            attemptsOnQuestion: 0,
            lastResponse: "",
            selectedTokens: [],
            finished: false
        };

        document.getElementById("grammar-game-title").textContent = stage.title;
        document.getElementById("grammar-question-group").textContent = `英語 ${group} 組`;
        switchTab("game-grammar");
        renderGrammarQuestion();
    }

    function getCurrentQuestion() {
        return grammarSession?.questions?.[grammarSession.currentIndex] || null;
    }

    function renderGrammarQuestion() {
        const question = getCurrentQuestion();
        if (!grammarSession || !question) return;

        grammarSession.attemptsOnQuestion = 0;
        grammarSession.lastResponse = "";
        grammarSession.selectedTokens = [];

        const currentNumber = grammarSession.currentIndex + 1;
        const total = grammarSession.questions.length;
        document.getElementById("grammar-question-progress").textContent = `${currentNumber}／${total}`;
        document.getElementById("grammar-first-try-score").textContent = grammarSession.firstTryCorrect;
        document.getElementById("grammar-progress-bar").style.width = `${Math.round((currentNumber / total) * 100)}%`;
        document.getElementById("grammar-question-type").textContent = grammarSession.stage.title;
        document.getElementById("grammar-question-instruction").textContent = asGroupValue(question.instruction, grammarSession.group);
        document.getElementById("grammar-question-stem").textContent = asGroupValue(question.stem, grammarSession.group);

        const context = asGroupValue(question.context, grammarSession.group);
        const contextBox = document.getElementById("grammar-question-context");
        contextBox.textContent = context || "";
        contextBox.classList.toggle("hidden", !context);

        document.getElementById("grammar-hint-box").classList.add("hidden");
        document.getElementById("grammar-explanation-box").classList.add("hidden");
        document.getElementById("grammar-retry-badge").classList.add("hidden");

        const choiceBox = document.getElementById("grammar-choice-options");
        const reorderBox = document.getElementById("grammar-reorder-area");
        choiceBox.innerHTML = "";

        if (question.type === "reorder") {
            choiceBox.classList.add("hidden");
            reorderBox.classList.remove("hidden");
            renderGrammarReorderTokens(shuffle(question.tokens));
        } else {
            reorderBox.classList.add("hidden");
            choiceBox.classList.remove("hidden");
            renderGrammarChoices(shuffle(asGroupValue(question.options, grammarSession.group)));
        }
    }

    function renderGrammarChoices(options) {
        const choiceBox = document.getElementById("grammar-choice-options");
        choiceBox.innerHTML = options.map((option, index) => `
            <button type="button" data-grammar-option="${index}" class="grammar-option rounded-2xl border-2 border-slate-100 bg-white px-4 py-3 text-left text-sm font-black leading-relaxed text-slate-700 transition hover:border-violet-300 hover:bg-violet-50">
                <span class="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-xs text-slate-500">${String.fromCharCode(65 + index)}</span>${option}
            </button>
        `).join("");
        choiceBox.querySelectorAll(".grammar-option").forEach((button, index) => {
            button.addEventListener("click", () => submitGrammarAnswer(options[index], button));
        });
    }

    function renderGrammarReorderTokens(tokens) {
        grammarSession.reorderTokens = tokens.map((text, index) => ({ id: `${index}-${text}`, text }));
        grammarSession.selectedTokens = [];
        updateGrammarReorderDisplay();
    }

    function updateGrammarReorderDisplay() {
        const tokenBox = document.getElementById("grammar-reorder-tokens");
        const answerBox = document.getElementById("grammar-reorder-answer");
        if (!grammarSession) return;

        answerBox.innerHTML = grammarSession.selectedTokens.length
            ? grammarSession.selectedTokens.map((token, index) => `<button type="button" data-selected-token="${index}" class="mr-2 mb-2 rounded-xl bg-violet-600 px-3 py-2 text-sm font-black text-white shadow-sm">${token.text}</button>`).join("")
            : '<span class="text-sm font-bold text-slate-300">依序點選下方字詞……</span>';

        const selectedIds = new Set(grammarSession.selectedTokens.map(token => token.id));
        tokenBox.innerHTML = grammarSession.reorderTokens.map((token, index) => `
            <button type="button" data-reorder-token="${index}" ${selectedIds.has(token.id) ? "disabled" : ""} class="rounded-xl border-2 px-3 py-2 text-sm font-black transition ${selectedIds.has(token.id) ? "border-slate-100 bg-slate-100 text-slate-300" : "border-violet-100 bg-white text-violet-700 hover:border-violet-300 hover:bg-violet-50"}">${token.text}</button>
        `).join("");

        tokenBox.querySelectorAll("[data-reorder-token]").forEach(button => {
            button.addEventListener("click", () => {
                const token = grammarSession.reorderTokens[Number(button.dataset.reorderToken)];
                if (!token || selectedIds.has(token.id)) return;
                grammarSession.selectedTokens.push(token);
                updateGrammarReorderDisplay();
            });
        });
        answerBox.querySelectorAll("[data-selected-token]").forEach(button => {
            button.addEventListener("click", () => {
                grammarSession.selectedTokens.splice(Number(button.dataset.selectedToken), 1);
                updateGrammarReorderDisplay();
            });
        });
    }

    function clearGrammarReorder() {
        if (!grammarSession || grammarSession.finished) return;
        grammarSession.selectedTokens = [];
        updateGrammarReorderDisplay();
    }

    function submitGrammarReorder() {
        const question = getCurrentQuestion();
        if (!grammarSession || !question || grammarSession.selectedTokens.length === 0) {
            showToast("請先依序點選字詞。", "info");
            return;
        }
        const response = grammarSession.selectedTokens.map(token => token.text).join(" ");
        submitGrammarAnswer(response, null);
    }

    function submitGrammarAnswer(response, button) {
        const question = getCurrentQuestion();
        if (!grammarSession || !question || grammarSession.finished) return;

        grammarSession.attemptsOnQuestion += 1;
        grammarSession.lastResponse = response;
        const isCorrect = normalizeSentence(response) === normalizeSentence(question.answer);

        if (isCorrect) {
            if (grammarSession.attemptsOnQuestion === 1) grammarSession.firstTryCorrect += 1;
            showGrammarExplanation(true);
            return;
        }

        if (grammarSession.attemptsOnQuestion === 1) {
            if (button) {
                button.disabled = true;
                button.classList.remove("border-slate-100", "hover:border-violet-300", "hover:bg-violet-50");
                button.classList.add("border-rose-200", "bg-rose-50", "text-rose-700", "opacity-75");
            }
            document.getElementById("grammar-hint-text").textContent = asGroupValue(question.hint, grammarSession.group);
            document.getElementById("grammar-hint-box").classList.remove("hidden");
            document.getElementById("grammar-retry-badge").classList.remove("hidden");
            if (question.type === "reorder") clearGrammarReorder();
            return;
        }

        showGrammarExplanation(false);
    }

    function setGrammarInputsDisabled() {
        document.querySelectorAll(".grammar-option, [data-reorder-token], [data-selected-token]").forEach(button => {
            button.disabled = true;
            button.classList.add("cursor-not-allowed", "opacity-70");
        });
    }

    function showGrammarExplanation(isCorrect) {
        const question = getCurrentQuestion();
        if (!grammarSession || !question) return;
        setGrammarInputsDisabled();
        document.getElementById("grammar-hint-box").classList.add("hidden");
        document.getElementById("grammar-retry-badge").classList.add("hidden");

        const firstTry = isCorrect && grammarSession.attemptsOnQuestion === 1;
        const heading = document.getElementById("grammar-result-heading");
        heading.className = firstTry
            ? "bg-emerald-50 px-4 py-3 font-black text-emerald-800"
            : isCorrect
                ? "bg-sky-50 px-4 py-3 font-black text-sky-800"
                : "bg-rose-50 px-4 py-3 font-black text-rose-800";
        heading.textContent = firstTry
            ? "首次答對！一起看懂判斷方法。"
            : isCorrect
                ? "修正成功！本題不列入首次答對率。"
                : "先記住這個判斷方法，下題再試一次。";

        document.getElementById("grammar-first-try-score").textContent = grammarSession.firstTryCorrect;
        document.getElementById("grammar-clue-text").textContent = question.clue;
        document.getElementById("grammar-rule-text").textContent = question.rule;
        document.getElementById("grammar-answer-compare").innerHTML = `
            <span class="block text-xs font-black text-slate-400">答案比較</span>
            ${grammarSession.lastResponse ? `<span class="mt-1 block"><strong>你的答案：</strong>${grammarSession.lastResponse}</span>` : ""}
            <span class="mt-1 block text-emerald-700"><strong>正確答案：</strong>${question.answer}</span>
        `;
        document.getElementById("grammar-thinking-steps").innerHTML = question.steps.map((step, index) => `
            <li class="flex items-start gap-2 rounded-xl bg-slate-50 px-3 py-2">
                <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs text-violet-700">${index + 1}</span>
                <span>${step}</span>
            </li>
        `).join("");
        document.getElementById("grammar-explanation-box").classList.remove("hidden");
    }

    function nextGrammarQuestion() {
        if (!grammarSession) return;
        if (grammarSession.finished) {
            leaveGrammarGame();
            return;
        }

        grammarSession.currentIndex += 1;
        if (grammarSession.currentIndex < grammarSession.questions.length) {
            renderGrammarQuestion();
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }
        finishGrammarRound();
    }

    async function finishGrammarRound() {
        if (!grammarSession) return;
        grammarSession.finished = true;
        const total = grammarSession.questions.length;
        const score = Math.round((grammarSession.firstTryCorrect / total) * 100);
        const passed = score >= PASS_SCORE;
        await saveGrammarStageProgress(grammarSession.stage.id, score);

        document.getElementById("grammar-question-progress").textContent = `${total}／${total}`;
        document.getElementById("grammar-progress-bar").style.width = "100%";
        document.getElementById("grammar-question-instruction").textContent = "本回合完成";
        document.getElementById("grammar-question-stem").textContent = `首次答對率 ${score}%`;
        const context = document.getElementById("grammar-question-context");
        context.textContent = passed
            ? "已達到 80%，下一個文法關卡已解鎖。"
            : `尚差 ${PASS_SCORE - score}%，讀完解析後再挑戰一次就會更穩。`;
        context.classList.remove("hidden");
        document.getElementById("grammar-choice-options").classList.add("hidden");
        document.getElementById("grammar-reorder-area").classList.add("hidden");
        document.getElementById("grammar-hint-box").classList.add("hidden");

        const heading = document.getElementById("grammar-result-heading");
        heading.className = passed
            ? "bg-emerald-50 px-4 py-3 font-black text-emerald-800"
            : "bg-amber-50 px-4 py-3 font-black text-amber-900";
        heading.textContent = passed ? "闖關成功！" : "這次先整理觀念，再挑戰一次。";
        document.getElementById("grammar-clue-text").textContent = `本回合首次答對 ${grammarSession.firstTryCorrect}／${total} 題。`;
        document.getElementById("grammar-rule-text").textContent = passed
            ? "達成解鎖標準，下一關已可進入。"
            : "提示後修正能幫助學會，但解鎖仍以第一次作答為準。";
        document.getElementById("grammar-answer-compare").innerHTML = passed
            ? '<strong class="text-emerald-700">完成：</strong>進度已保存，可回到地圖選擇下一關。'
            : '<strong class="text-amber-800">建議：</strong>先回想時間線索、句型種類與動詞形式，再重做本關。';
        document.getElementById("grammar-thinking-steps").innerHTML = [
            "先找時間詞",
            "判斷 be 動詞或一般動詞",
            "確認肯定、否定或問句",
            "最後檢查動詞形式"
        ].map((step, index) => `<li class="flex items-start gap-2 rounded-xl bg-slate-50 px-3 py-2"><span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs text-violet-700">${index + 1}</span><span>${step}</span></li>`).join("");
        const nextButton = document.querySelector("#grammar-explanation-box button");
        if (nextButton) nextButton.innerHTML = '返回闖關地圖 <i class="fa-solid fa-map ml-1" aria-hidden="true"></i>';
        document.getElementById("grammar-explanation-box").classList.remove("hidden");
    }

    function leaveGrammarGame() {
        grammarSession = null;
        const nextButton = document.querySelector("#grammar-explanation-box button");
        if (nextButton) nextButton.innerHTML = '下一題 <i class="fa-solid fa-arrow-right ml-1" aria-hidden="true"></i>';
        openGrammarMap();
    }

    window.loadGrammarProgress = loadGrammarProgress;
    window.updateGrammarGroupDisplay = updateGrammarGroupDisplay;
    window.renderGrammarMap = renderGrammarMap;
    window.openGrammarMap = openGrammarMap;
    window.setGrammarPreviewGroup = setGrammarPreviewGroup;
    window.startGrammarStage = startGrammarStage;
    window.clearGrammarReorder = clearGrammarReorder;
    window.submitGrammarReorder = submitGrammarReorder;
    window.nextGrammarQuestion = nextGrammarQuestion;
    window.leaveGrammarGame = leaveGrammarGame;
})();
