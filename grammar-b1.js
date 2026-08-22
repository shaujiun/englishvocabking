(() => {
    "use strict";

    const choice = (stage, stem, answer, wrongB1, wrongB2, wrongA, rule, hint, extra = {}) => ({
        type: "choice",
        instruction: extra.instruction || ({
            classification: "請判斷句中的文法重點。",
            doctor: "找出唯一正確的句子。",
            transform: "依提示選出正確的句型變化。",
            dialogue: "閱讀情境，選出最自然且正確的回答。"
        }[stage]),
        context: extra.context || "",
        stem,
        options: {
            B: [answer, wrongB1, wrongB2],
            A: [answer, wrongB1, wrongB2, wrongA]
        },
        answer,
        hint: {
            B: hint,
            A: extra.hintA || `${hint} 再檢查主詞、動詞形式與語序，排除看起來相近的選項。`
        },
        clue: extra.clue || hint,
        rule,
        steps: extra.steps || [
            "先找出主詞、be 動詞、助動詞或疑問詞",
            hint,
            `套用規則：${rule}`,
            `確認答案：${answer}`
        ]
    });

    const reorder = (stem, tokens, answer, rule, hint, extra = {}) => ({
        type: "reorder",
        instruction: extra.instruction || "依序排列成正確的英文句子。",
        context: extra.context || "",
        stem,
        tokens,
        answer,
        hint: {
            B: hint,
            A: extra.hintA || `${hint} 再確認疑問詞、主詞與動詞的位置。`
        },
        clue: extra.clue || hint,
        rule,
        steps: extra.steps || [
            "先找句首的主詞、疑問詞或祈使動詞",
            hint,
            `套用規則：${rule}`,
            "最後檢查大小寫與標點"
        ]
    });

    const makeLesson = (config) => ({
        ...config,
        stageDescriptions: {
            classification: config.stageDescriptions.classification,
            doctor: config.stageDescriptions.doctor,
            transform: config.stageDescriptions.transform,
            dialogue: config.stageDescriptions.dialogue
        }
    });

    const STARTER = makeLesson({
        code: "S",
        label: "Starter",
        kicker: "B1・STARTER",
        title: "代名詞與自我介紹冒險",
        description: "從人稱代名詞、所有格、受格開始，練習姓名、電話號碼與基本社交用語。每回合 10 題，答錯後會提供判斷提示。",
        stageDescriptions: {
            classification: "辨認主格、所有格、受格，以及姓名與電話號碼問句。",
            doctor: "修正代名詞、be 動詞、大小寫與基本問句錯誤。",
            transform: "重組自我介紹、姓名、電話與人稱代名詞句型。",
            dialogue: "在初次見面、問候與交換基本資料時選出自然回應。"
        },
        summarySteps: ["先找代名詞在句中的位置", "名詞前用所有格", "動詞或介系詞後用受格", "最後檢查 be 動詞與大小寫"],
        questionBank: {
            classification: [
                choice("classification", "I am Kevin.", "I 是主格", "I 是所有格", "I 是受格", "I 是 be 動詞", "代名詞作句子主詞時使用主格。", "I 放在 am 前面，是句子的主詞。"),
                choice("classification", "Her name is Mia.", "Her 是所有格", "Her 是主格", "Her 是受格", "Her 是 be 動詞", "所有格放在名詞前，表示所有關係。", "Her 後面接名詞 name。"),
                choice("classification", "This gift is for him.", "him 是受格", "him 是主格", "him 是所有格", "him 是複數代名詞", "介系詞後的人稱代名詞使用受格。", "for 是介系詞，所以後面用 him。"),
                choice("classification", "What is your name?", "詢問姓名", "詢問年齡", "詢問地點", "詢問電話號碼", "What is＋所有格＋name？用來詢問姓名。", "句尾的 name 是判斷線索。"),
                choice("classification", "What is his phone number?", "詢問電話號碼", "詢問姓名", "詢問身分", "詢問年齡", "What is＋所有格＋phone number？用來詢問電話號碼。", "phone number 直接指出問題內容。"),
                choice("classification", "John and Amy are my friends. They are nice.", "They 代替 John and Amy", "They 代替 my friends 的所有格", "They 只代替 John", "They 表示單數人物", "兩個以上的人可用複數主格 they 代替。", "John and Amy 是兩個人。"),
                choice("classification", "Ms. Lin is our teacher.", "our 表示『我們的』", "our 表示『我們』", "our 表示『我們』的受格", "our 是 be 動詞", "our 是 we 的所有格，後面要接名詞。", "our 後面接 teacher。"),
                choice("classification", "The apples are good. I like them.", "them 代替 the apples", "them 代替 I", "them 表示所有格", "them 是單數代名詞", "複數事物在動詞後可用受格 them 代替。", "like 後面需要受格，apples 是複數。"),
                choice("classification", "Nice to meet you.", "初次見面的招呼語", "睡前道別語", "詢問電話的問句", "詢問年齡的問句", "Nice to meet you. 用於初次見面。", "meet 是『見面』的重要線索。"),
                choice("classification", "My name is Leo.", "My 是 I 的所有格", "My 是 I 的主格", "My 是 I 的受格", "My 是第三人稱", "I 的所有格是 my，必須放在名詞前。", "My 後面接 name。")
            ],
            doctor: [
                choice("doctor", "Me am Amy.", "I am Amy.", "My am Amy.", "Me is Amy.", "I is Amy.", "第一人稱主格 I 搭配 am。", "自我介紹時要用 I am。"),
                choice("doctor", "She name is Tina.", "Her name is Tina.", "Hers name is Tina.", "Him name is Tina.", "She name are Tina.", "名詞 name 前使用 she 的所有格 her。", "name 前面要放所有格。"),
                choice("doctor", "This book is for he.", "This book is for him.", "This book is for his.", "This book is for she.", "This book for him is.", "介系詞 for 後使用受格 him。", "for 後不能用主格 he。"),
                choice("doctor", "What your name?", "What is your name?", "What are your name?", "What your name is?", "What does your name?", "姓名問句需要 be 動詞 is。", "What 後要有 is，再接 your name。"),
                choice("doctor", "What is you phone number?", "What is your phone number?", "What are your phone number?", "What is yours phone number?", "What your phone number is?", "名詞 phone number 前使用所有格 your。", "you 的所有格是 your。"),
                choice("doctor", "john is my classmate.", "John is my classmate.", "john Is my classmate.", "John is My classmate.", "JOHN is My Classmate.", "人名開頭字母必須大寫。", "John 是專有名詞。"),
                choice("doctor", "Ms. Lee is we teacher.", "Ms. Lee is our teacher.", "Ms. Lee is us teacher.", "Ms. Lee are our teacher.", "Ms. Lee is ours teacher.", "名詞 teacher 前使用 we 的所有格 our。", "we 的所有格是 our。"),
                choice("doctor", "His is my brother.", "He is my brother.", "Him is my brother.", "Her is my brother.", "He are my brother.", "句子主詞使用主格 he。", "be 動詞前需要主格，不用所有格 his。"),
                choice("doctor", "Them are my friends.", "They are my friends.", "Their are my friends.", "They is my friends.", "Them is my friend.", "句子主詞使用複數主格 they。", "are 前的主詞應使用 They。"),
                choice("doctor", "nice to meet you too.", "Nice to meet you, too.", "Nice too meet you, too.", "nice to meet you too?", "Nice to meeting you, too.", "句首要大寫，too 前通常加逗號。", "固定回應是 Nice to meet you, too.")
            ],
            transform: [
                reorder("我是七年級學生。", ["I", "am", "a seventh grader", "."], "I am a seventh grader.", "I＋am＋名詞。", "先排 I am。"),
                reorder("她的名字是 Emma。", ["Her", "name", "is", "Emma", "."], "Her name is Emma.", "所有格＋name＋is＋姓名。", "Her 必須放在 name 前面。"),
                reorder("這份禮物是給我們的。", ["This gift", "is", "for", "us", "."], "This gift is for us.", "介系詞 for 後接受格 us。", "先排 This gift is，再接 for us。"),
                reorder("你的電話號碼是多少？", ["What", "is", "your", "phone number", "?"], "What is your phone number?", "What is＋所有格＋phone number？", "先排 What is your。"),
                reorder("我們的老師很親切。", ["Our", "teacher", "is", "kind", "."], "Our teacher is kind.", "所有格＋名詞＋be 動詞＋形容詞。", "Our 要放在 teacher 前。"),
                choice("transform", "I like the dogs. 將 the dogs 改成代名詞。", "I like them.", "I like they.", "I like their.", "Me like them.", "動詞 like 後使用複數受格 them。", "the dogs 是複數，而且位在動詞後。"),
                choice("transform", "Tom and I are classmates. 將 Tom and I 改成代名詞。", "We are classmates.", "They are classmates.", "Us are classmates.", "Our are classmates.", "說話者 I 與另一人合併時使用 we。", "Tom and I 包含說話者。"),
                choice("transform", "Mary is my sister. 將 Mary 改成代名詞。", "She is my sister.", "Her is my sister.", "He is my sister.", "It is my sister.", "女性單數人物作主詞使用 she。", "Mary 是女性名字，且在句中作主詞。"),
                reorder("很高興認識你。", ["Nice", "to meet", "you", "."], "Nice to meet you.", "Nice to meet you. 是固定招呼語。", "依序排 Nice to meet you。"),
                reorder("我的名字是 Ryan。", ["My", "name", "is", "Ryan", "."], "My name is Ryan.", "My name is＋姓名。", "My 要放在 name 前面。")
            ],
            dialogue: [
                choice("dialogue", "B 應該怎麼回答？", "My name is Amy.", "I am fine.", "I am twelve.", "It is 2356-7712.", "What is your name? 要用姓名回答。", "問題問 name，不是年齡或電話。", { context: "A: What is your name?" }),
                choice("dialogue", "B 應該怎麼回答？", "It is 2387-9012.", "My name is Ben.", "I am thirteen.", "She is my sister.", "電話號碼問句要回答一串號碼。", "phone number 是關鍵。", { context: "A: What is your phone number?" }),
                choice("dialogue", "B 應該怎麼回答？", "Nice to meet you, too.", "I am fine, thank you.", "Good night.", "What is your name?", "初次見面的固定回應是 Nice to meet you, too.", "回應要包含 too。", { context: "A: Nice to meet you." }),
                choice("dialogue", "B 應該怎麼回答？", "I am fine, thank you.", "My name is Ian.", "Good night.", "It is nine.", "How are you? 詢問近況。", "應回答自己的狀況。", { context: "A: How are you?" }),
                choice("dialogue", "B 應該怎麼介紹那位女孩？", "She is my sister.", "Her is my sister.", "He is my sister.", "She are my sister.", "女性單數作主詞使用 she。", "girl 對應 she。", { context: "A: Who is that girl?" }),
                choice("dialogue", "B 應該怎麼回答？", "His name is Leo.", "He name is Leo.", "Him name is Leo.", "Her name is Leo.", "詢問男生姓名時使用 his name。", "問句中的 his 會引導同樣的所有格回答。", { context: "A: What is his name?" }),
                choice("dialogue", "B 應該怎麼回答？", "Our teacher is Ms. Wang.", "We teacher is Ms. Wang.", "Us teacher is Ms. Wang.", "Ours teacher is Ms. Wang.", "名詞 teacher 前使用 our。", "we 的所有格是 our。", { context: "A: Who is your English teacher?" }),
                choice("dialogue", "B 應該怎麼回答？", "Yes, they are my classmates.", "Yes, them are my classmates.", "Yes, their is my classmates.", "Yes, they is my classmates.", "複數人物作主詞使用 they，搭配 are。", "boys 是複數。", { context: "A: Are those boys your classmates?" }),
                choice("dialogue", "B 應該怎麼回答？", "Good night, Mom.", "Good morning, Mom.", "Nice to meet you, Mom.", "What is your name, Mom?", "睡前道別使用 Good night。", "情境是上床睡覺前。", { context: "A: Good night, Mia." }),
                choice("dialogue", "B 應該怎麼回答？", "Yes, it is my dog.", "Yes, he is my dog.", "Yes, its is my dog.", "Yes, them are my dog.", "動物性別不明時可用 it 代替。", "dog 在此用 it，搭配 is。", { context: "A: Is Lucky your dog?" })
            ]
        }
    });

    const L1 = makeLesson({
        code: "L1",
        label: "第 1 課",
        kicker: "B1・LESSON 1",
        title: "名詞、be 動詞與指示詞冒險",
        description: "練習名詞單複數、a／an／the、be 動詞、形容詞、this／that／these／those 與 but。",
        stageDescriptions: {
            classification: "辨認名詞數量、冠詞、be 動詞、形容詞與遠近指示詞。",
            doctor: "修正冠詞、名詞複數、主詞與 be 動詞，以及 this／these 等錯誤。",
            transform: "重組 What 問句、指示詞句型與 be 動詞肯定、否定、問句。",
            dialogue: "在辨認物品、描述特徵與比較差異時選出正確說法。"
        },
        summarySteps: ["先判斷單數或複數", "再判斷近處或遠處", "選擇 is 或 are", "最後檢查冠詞與名詞字尾"],
        questionBank: {
            classification: [
                choice("classification", "an orange", "an 用在母音發音前", "an 只用在複數名詞前", "an 表示特定物品", "an 依字母外形決定", "a／an 依下一個字的開頭發音判斷。", "orange 以母音音素開頭。"),
                choice("classification", "The dog is cute.", "The dog 指已知或特定的狗", "The 表示任意一隻狗", "The 只能放複數名詞前", "The 是形容詞", "the 用來指前文提過或雙方已知的特定人事物。", "The dog 是特定的狗。"),
                choice("classification", "These are my books.", "these 表示近處複數", "these 表示遠處複數", "these 表示近處單數", "these 表示遠處單數", "these 指近處的複數人事物。", "are 與 books 也都是複數線索。"),
                choice("classification", "That is a tall tree.", "that 表示遠處單數", "that 表示近處單數", "that 表示遠處複數", "that 是人稱代名詞", "that 指遠處的單數人事物。", "is 與 a tree 表示單數。"),
                choice("classification", "The boxes are heavy.", "boxes 是 box 的複數", "boxes 是不可數名詞", "boxes 是所有格", "boxes 是動詞第三人稱單數", "以 x 結尾的可數名詞通常加 es。", "box 變複數要加 es。"),
                choice("classification", "Mia is happy.", "happy 是主詞補語形容詞", "happy 是名詞", "happy 是 be 動詞", "happy 是冠詞", "形容詞可放在 be 動詞後描述主詞。", "happy 描述 Mia 的狀態。"),
                choice("classification", "It is a small bag.", "small 放在名詞前修飾 bag", "small 是主詞", "small 是冠詞", "small 是複數名詞", "形容詞可以放在名詞前修飾名詞。", "small 直接放在 bag 前。"),
                choice("classification", "This is a rabbit, but that is a cat.", "but 連接相反或對比內容", "but 表示原因", "but 表示選擇", "but 表示時間", "but 是對等連接詞，用來表達轉折或對比。", "前後分別是 rabbit 與 cat，形成對比。"),
                choice("classification", "What are those?", "詢問遠處複數物品", "詢問近處單數物品", "詢問人物身分", "詢問地點", "What are those？用來詢問遠處複數物品。", "those 與 are 都是遠處複數線索。"),
                choice("classification", "The sheep are cute.", "sheep 單複數同形", "sheep 的複數是 sheeps", "sheep 是不可數名詞", "sheep 的複數是 sheepes", "部分名詞單複數同形，例如 sheep、fish。", "are 表示此處 sheep 是複數。")
            ],
            doctor: [
                choice("doctor", "It is an book.", "It is a book.", "It is an books.", "It are a book.", "It is the an book.", "book 以子音音素開頭，使用 a。", "不能只看中文的『一本』，要看發音。"),
                choice("doctor", "These is my pencils.", "These are my pencils.", "This are my pencils.", "These is my pencil.", "Those is my pencils.", "複數主詞 these 搭配 are。", "pencils 與 these 都是複數。"),
                choice("doctor", "That are a dog.", "That is a dog.", "Those is a dog.", "That are dogs.", "This are a dog.", "單數指示詞 that 搭配 is。", "a dog 是單數。"),
                choice("doctor", "two baby", "two babies", "two babys", "two babyes", "two babyeses", "子音＋y 結尾的名詞變複數時去 y 加 ies。", "baby 前有 two，必須變複數。"),
                choice("doctor", "The girls is young.", "The girls are young.", "The girl are young.", "The girls am young.", "The girls be young.", "複數主詞 girls 搭配 are。", "girls 字尾 s 表示複數。"),
                choice("doctor", "She is a happily girl.", "She is a happy girl.", "She is happy girl.", "She are a happy girl.", "She is an happy girl.", "名詞 girl 前使用形容詞 happy。", "happily 是副詞，不直接修飾 girl。"),
                choice("doctor", "What is these?", "What are these?", "What is this?", "What are this?", "What these are?", "these 是複數，問句使用 are。", "be 動詞要移到複數主詞 these 前。"),
                choice("doctor", "This are a goose.", "This is a goose.", "These is a goose.", "This is geese.", "These are a goose.", "this 與 a goose 都是單數，搭配 is。", "this 表示近處單數。"),
                choice("doctor", "It is small but heavy box.", "It is a small but heavy box.", "It is an small but heavy box.", "It are a small but heavy box.", "It is a small box but heavy a.", "單數可數名詞 box 前需要冠詞。", "a 要放在整組形容詞與名詞之前。"),
                choice("doctor", "Those are two womans.", "Those are two women.", "Those is two women.", "That are two women.", "Those are two woman.", "woman 的複數是不規則變化 women。", "two 後需要複數 women。")
            ],
            transform: [
                reorder("這是一顆蘋果。", ["This", "is", "an", "apple", "."], "This is an apple.", "This＋is＋an＋母音音素開頭的單數名詞。", "先排 This is，再判斷 apple 前用 an。"),
                reorder("那些是我的盒子。", ["Those", "are", "my", "boxes", "."], "Those are my boxes.", "Those＋are＋複數名詞。", "遠處複數用 Those are。"),
                reorder("這些是什麼？", ["What", "are", "these", "?"], "What are these?", "What＋are＋these？", "複數問句使用 are。"),
                reorder("那不是一隻鴨子。", ["That", "isn't", "a", "duck", "."], "That isn't a duck.", "That＋isn't＋a＋單數名詞。", "that 是單數，所以用 isn't。"),
                reorder("它很小，但是很重。", ["It", "is", "small", ",", "but", "heavy", "."], "It is small, but heavy.", "but 連接兩個對比的形容詞。", "small 與 heavy 形成對比。"),
                choice("transform", "This is a box. 改為複數。", "These are boxes.", "These is boxes.", "This are boxes.", "Those are box.", "this→these、is→are、box→boxes。", "單複數變化要同時調整三個部分。"),
                choice("transform", "Those are geese. 改為單數。", "That is a goose.", "That are a goose.", "Those is a goose.", "This is geese.", "those→that、are→is、geese→goose。", "geese 的單數是 goose。"),
                choice("transform", "The bag is not big. 使用縮寫。", "The bag isn't big.", "The bag aren't big.", "The bag is'nt big.", "The bag doesn't big.", "is not 可縮寫為 isn't。", "bag 是單數，所以使用 isn't。"),
                reorder("這些花很漂亮。", ["These", "flowers", "are", "beautiful", "."], "These flowers are beautiful.", "These＋複數名詞＋are＋形容詞。", "flowers 是複數，搭配 are。"),
                reorder("那是一隻鵝，不是鴨子。", ["That", "is", "a goose", ",", "not", "a duck", "."], "That is a goose, not a duck.", "not 可用來對比並更正物品名稱。", "先說正確物品，再用 not 排除。")
            ],
            dialogue: [
                choice("dialogue", "B 應該怎麼回答？", "It is an eraser.", "They are erasers.", "It are an eraser.", "This an eraser.", "What is this？以 It is＋單數名詞回答。", "eraser 以母音音素開頭，使用 an。", { context: "A: What is this?" }),
                choice("dialogue", "B 應該怎麼回答？", "They are rabbits.", "It is a rabbit.", "They is rabbits.", "Those are rabbit.", "What are those？以 They are＋複數名詞回答。", "those 是遠處複數。", { context: "A: What are those?" }),
                choice("dialogue", "B 想否定，應該怎麼回答？", "No, it isn't. It is a key.", "No, it aren't. It is a key.", "No, they aren't. They are keys.", "No, it doesn't. It key.", "Is this 問句使用 it 與 isn't 回答。", "this 是單數，簡答用 it。", { context: "A: Is this a pen?" }),
                choice("dialogue", "B 想肯定，應該怎麼回答？", "Yes, they are.", "Yes, it is.", "Yes, those are.", "Yes, they is.", "Are those 問句以 they are 簡答。", "those 是複數，用 they 代替。", { context: "A: Are those your books?" }),
                choice("dialogue", "B 應該怎麼回答？", "It is small but useful.", "It small but useful.", "It are small but useful.", "It is a small but useful.", "形容詞放在 be 動詞後描述主詞。", "small 與 useful 都描述 the tool。", { context: "A: Is the tool big?" }),
                choice("dialogue", "B 應該怎麼回答？", "They are my new classmates.", "They is my new classmates.", "It is my new classmates.", "Those my classmates are.", "複數人物用 they，搭配 are。", "students 是複數。", { context: "A: Who are those students?" }),
                choice("dialogue", "B 應該怎麼更正？", "No, that is a tiger, not a lion.", "No, those are a tiger.", "No, that are tiger.", "No, that isn't tiger but lion.", "遠處單數使用 that is，並可用 not 更正。", "圖中只有一隻動物。", { context: "A: Is that a lion?" }),
                choice("dialogue", "B 應該怎麼回答？", "They are heavy boxes.", "They are heavies boxes.", "They is heavy box.", "Those heavy are boxes.", "形容詞 heavy 不因複數而變化，名詞 boxes 要變複數。", "What are these 問的是複數物品。", { context: "A: What are these?" }),
                choice("dialogue", "B 應該怎麼回答？", "No, she isn't. She is sad.", "No, she doesn't. She sad.", "No, her isn't. Her is sad.", "No, she aren't. She is sad.", "Is she 問句使用 she isn't 簡答。", "形容詞 sad 前要有 is。", { context: "A: Is Amy happy?" }),
                choice("dialogue", "B 應該怎麼回答？", "It is an old umbrella.", "It is a old umbrella.", "It are an old umbrellas.", "It is old an umbrella.", "old 以母音音素開頭，單數名詞前用 an。", "冠詞放在形容詞 old 前。", { context: "A: What is that?" })
            ]
        }
    });

    const C = (stage, rows) => rows.map((row) => choice(stage, ...row));

    const L2 = makeLesson({
        code: "L2",
        label: "Lesson 2",
        kicker: "B1・LESSON 2",
        title: "人物資料調查局",
        description: "練習用 Who、Where、How old 詢問身分、來自哪裡、年齡與職業。",
        stageDescriptions: {
            classification: "辨認身分、國家、年齡與職業問句。",
            doctor: "修正疑問詞、be 動詞、冠詞與單複數錯誤。",
            transform: "把人物資料改寫成正確問答。",
            dialogue: "在人物介紹情境中完成自然對話。"
        },
        questionBank: {
            classification: C("classification", [
                ["Who is the boy?", "詢問男孩的身分", "詢問男孩的年齡", "詢問男孩來自哪裡", "詢問男孩的職業地點", "Who 用來詢問人物身分。", "看到 Who，先找回答中的人物或關係。"],
                ["Where is Amy from?", "詢問 Amy 來自哪裡", "詢問 Amy 在哪裡", "詢問 Amy 幾歲", "詢問 Amy 是誰", "Where ... from 用來詢問來源地或國家。", "from 是判斷這類問句的重要線索。"],
                ["How old is your sister?", "詢問妹妹的年齡", "詢問妹妹的名字", "詢問妹妹的身高", "詢問妹妹的國籍", "How old 用來詢問年齡。", "回答通常會出現數字與 year(s) old。"],
                ["What is Mr. Lin?", "詢問林先生的職業", "詢問林先生的姓名", "詢問林先生的位置", "詢問林先生的年齡", "What + be + 人可用來詢問職業。", "若回答是 teacher、doctor 等，問的是職業。"],
                ["They are from Japan.", "表示他們來自日本", "表示他們要去日本", "表示他們住在日本教室", "表示他們是日本這個職業", "be from + 地方表示來自某地。", "注意 from 後接國家或地名。"],
                ["My aunt is a nurse.", "介紹阿姨的職業", "介紹阿姨的年齡", "介紹阿姨的國籍", "介紹阿姨的位置", "a nurse 是單數職業名詞。", "看到 a 加職業名稱，可判斷是在介紹職業。"],
                ["Leo is thirteen years old.", "Leo 十三歲", "Leo 排名第十三", "Leo 有十三年工作經驗", "Leo 有十三位朋友", "數字 + years old 表示年齡。", "years old 是年齡的固定說法。"],
                ["She is my cousin.", "介紹她與我的親屬關係", "介紹她的工作", "介紹她的國籍", "介紹她的年齡", "my cousin 表示人物關係。", "所有格 my 後面的親屬名詞是身分線索。"],
                ["Are you from Taiwan?", "確認對方是否來自臺灣", "確認對方是否在臺灣", "詢問對方幾歲", "詢問對方是否喜歡臺灣", "Be + 主詞 + from ...? 是來源地的 Yes／No 問句。", "from 後面的 Taiwan 是來源地。"],
                ["Is your father a cook?", "確認父親是否為廚師", "詢問父親在哪裡煮飯", "詢問父親幾歲", "確認父親是否來自 Cook", "be + a/an + 職業可確認工作身分。", "cook 在此是職業名詞。"]
            ]),
            doctor: C("doctor", [
                ["選出正確句子。", "Who is she?", "Who she is?", "Who are she?", "Whom is she?", "Who 問句使用 Who + be + 主詞。", "be 動詞要放在主詞 she 前。"],
                ["選出正確句子。", "Where are they from?", "Where they are from?", "Where is they from?", "Where from are they?", "複數主詞 they 搭配 are。", "問句語序是 Where + are + they + from。"],
                ["選出正確句子。", "How old is your brother?", "How old are your brother?", "How is old your brother?", "How many old is your brother?", "單數主詞 your brother 搭配 is。", "How old 必須連在一起放句首。"],
                ["選出正確句子。", "He is an actor.", "He is a actor.", "He are an actor.", "He is actor an.", "actor 以母音音素開頭，使用 an。", "先聽 actor 的開頭音，再選冠詞。"],
                ["選出正確句子。", "They are students.", "They is students.", "They are a students.", "They am student.", "複數主詞與複數職業使用 are，不加 a。", "students 已是複數，前面不能加 a。"],
                ["選出正確句子。", "I am from Taiwan.", "I am from Taiwanese.", "I is from Taiwan.", "I from am Taiwan.", "from 後接地方 Taiwan，不接形容詞 Taiwanese。", "問自己來自哪裡時，要回答國家名稱。"],
                ["選出正確句子。", "My mother is forty years old.", "My mother are forty years old.", "My mother is forty year old.", "My mother forty is years old.", "大於一歲通常使用 years old。", "mother 是單數，使用 is；forty 後用 years。"],
                ["選出正確句子。", "What is your uncle?", "What are your uncle?", "What your uncle is?", "What does your uncle be?", "詢問單數人物職業時用 What is ...?", "your uncle 是單數。"],
                ["選出正確句子。", "Is she your aunt?", "Are she your aunt?", "She is your aunt?", "Does she your aunt?", "be 動詞問句把 is 移到主詞前。", "she 的 be 動詞是 is。"],
                ["選出正確句子。", "No, we aren't. We're from Korea.", "No, we isn't. We're from Korea.", "No, we don't. We from Korea.", "No, we aren't. We're Korea from.", "Are you ...? 複數回答可用 we aren't。", "否定簡答後，用 be from 補充來源地。"]
            ]),
            transform: C("transform", [
                ["She is my sister. 改成詢問身分。", "Who is she?", "Who she is?", "What old is she?", "Where is she from?", "身分問句使用 Who + be + 主詞。", "答案是人物關係，所以疑問詞用 Who。"],
                ["They are from India. 改成問句。", "Where are they from?", "Where is they from?", "Who are they from?", "Where they from are?", "來源地問句是 Where + be + 主詞 + from。", "they 搭配 are。"],
                ["Ben is twelve years old. 改成問句。", "How old is Ben?", "How many is Ben old?", "What old is Ben?", "How old Ben is?", "年齡問句使用 How old。", "Ben 是單數，be 動詞用 is。"],
                ["Ms. Wang is a teacher. 改成詢問職業。", "What is Ms. Wang?", "Who is Ms. Wang?", "Where is Ms. Wang?", "What does Ms. Wang?", "What + be + 人可詢問職業。", "回答是 a teacher，不是姓名或關係。"],
                ["I am from Taiwan. 主詞改成 he。", "He is from Taiwan.", "He am from Taiwan.", "He are from Taiwan.", "Him is from Taiwan.", "he 搭配 is。", "只替換主詞時，也要調整 be 動詞。"],
                ["He is a doctor. 改成否定句。", "He isn't a doctor.", "He doesn't a doctor.", "He aren't a doctor.", "He not is a doctor.", "be 動詞否定在 is 後加 not。", "is not 可縮寫成 isn't。"],
                ["You are from Canada. 改成一般問句。", "Are you from Canada?", "Do you from Canada?", "Is you from Canada?", "You are from Canada?", "be 動詞問句把 are 移到主詞前。", "句首應是 Are。"],
                ["Amy is an office worker. 主詞改成 Amy and May。", "Amy and May are office workers.", "Amy and May is office workers.", "Amy and May are an office worker.", "Amy and May am office workers.", "複數主詞使用 are，職業名詞也改複數。", "兩個人不能共用 a/an 單數職業。"],
                ["He is a fifteen-year-old student. 選出同義句。", "He is fifteen years old.", "He is fifteen year old.", "He has fifteen years old.", "He is a fifteen years old.", "名詞前可用 fifteen-year-old；敘述年齡用 fifteen years old。", "注意 year-old 與 years old 的形式不同。"],
                ["Are they from Japan? 肯定簡答。", "Yes, they are.", "Yes, they do.", "Yes, they is.", "Yes, they from.", "be 動詞問句用相同 be 動詞簡答。", "主詞 they 搭配 are。"]
            ]),
            dialogue: C("dialogue", [
                ["B 應該怎麼回答？", "She is my cousin.", "She is fourteen.", "She is from Canada.", "She is a singer at school.", "Who 詢問人物身分或關係。", "回答要說明 she 是誰。", { context: "A: Who is the girl?" }],
                ["B 應該怎麼回答？", "I'm from Taiwan.", "I'm Taiwanese years old.", "I'm a Taiwan.", "I'm at Taiwan from.", "Where ... from 要回答來源地。", "使用 be from + 地方。", { context: "A: Where are you from?" }],
                ["B 應該怎麼回答？", "He is thirteen years old.", "He is my brother.", "He is from the USA.", "He is a student old.", "How old 問年齡。", "回答要有數字與 years old。", { context: "A: How old is Kevin?" }],
                ["B 應該怎麼回答？", "She is a nurse.", "She is my mother.", "She is forty.", "She is from Korea.", "What is she? 在此詢問職業。", "選擇含職業名稱的回答。", { context: "A: What is your mother?" }],
                ["B 應該怎麼回答？", "Yes, I am.", "Yes, I do.", "Yes, I'm from.", "Yes, I is.", "Are you ...? 用 am 回答自己的狀態。", "簡答主詞由 you 改為 I。", { context: "A: Are you from Japan?" }],
                ["B 應該怎麼回答？", "No, he isn't. He's a cook.", "No, he doesn't. He's cook.", "No, he aren't. He's a cook.", "No, he isn't. He a cook.", "Is he ...? 否定簡答用 he isn't。", "補充職業時保留 a cook。", { context: "A: Is your father a teacher?" }],
                ["B 應該怎麼回答？", "They are my grandparents.", "They are sixty years old.", "They are from Yunlin.", "They are farmers old.", "Who are they? 要回答身分關係。", "grandparents 是關係名稱。", { context: "A: Who are they?" }],
                ["B 應該怎麼回答？", "We're from the USA.", "We're American years old.", "We're the USA people from.", "We from are the USA.", "Where are you from? 對多人可用 we 回答。", "we 搭配 are，縮寫為 we're。", { context: "A: Where are you and Tom from?" }],
                ["B 應該怎麼回答？", "I'm twelve years old.", "I'm a twelve years old.", "I have twelve years old.", "I am twelve year-old.", "敘述年齡用數字 + years old。", "不要在 years old 前加 a。", { context: "A: How old are you?" }],
                ["B 應該怎麼回答？", "She's an actress.", "She's actress an.", "She an actress is.", "She's a actress.", "actress 前使用 an。", "職業回答需要冠詞，並注意開頭音。", { context: "A: What is Judy?" }]
            ])
        }
    });

    const L3 = makeLesson({
        code: "L3",
        label: "Lesson 3",
        kicker: "B1・LESSON 3",
        title: "祈使句行動基地",
        description: "練習肯定與否定祈使句、please 的位置，以及 Let's／Let's not 的邀請句。",
        stageDescriptions: {
            classification: "辨認命令、禁止、禮貌請求與共同提議。",
            doctor: "修正祈使動詞、Don't 與 Let's 的形式。",
            transform: "依語意改寫肯定、否定與邀請句。",
            dialogue: "在教室與生活情境中選出合適指令。"
        },
        questionBank: {
            classification: C("classification", [
                ["Open your book.", "肯定祈使句", "否定祈使句", "現在進行式", "一般疑問句", "祈使句以原形動詞開頭。", "句首 Open 是原形動詞。"],
                ["Don't run in the classroom.", "否定祈使句", "肯定祈使句", "邀請句", "能力問句", "Don't + 原形動詞表示禁止。", "看到 Don't，判斷為否定命令。"],
                ["Please sit down.", "禮貌請求", "詢問位置", "描述正在坐下", "詢問能力", "please 可使祈使句較有禮貌。", "Please 後接原形動詞 sit。"],
                ["Be quiet, please.", "禮貌要求保持安靜", "描述某人很安靜", "詢問是否安靜", "邀請一起安靜", "be 動詞的祈使句使用原形 Be。", "please 也可放句尾，前面常加逗號。"],
                ["Let's play basketball.", "提議大家一起打籃球", "命令對方打籃球", "表示正在打籃球", "表示不會打籃球", "Let's + 原形動詞表示一起做某事。", "Let's 包含說話者與聽話者。"],
                ["Let's not be late.", "提議大家不要遲到", "命令某一人不要遲到", "描述大家沒有遲到", "詢問是否會遲到", "Let's not + 原形動詞表示一起不要做某事。", "not 放在 Let's 後、原形動詞前。"],
                ["Amy, close the door.", "叫 Amy 關門", "描述 Amy 正在關門", "詢問 Amy 是否關門", "邀請大家關門", "稱呼語可放祈使句前並以逗號隔開。", "Amy 是稱呼，真正動詞是 close。"],
                ["Don't be afraid.", "勸對方不要害怕", "描述對方不害怕", "詢問對方害不害怕", "提議一起害怕", "be 的否定祈使句是 Don't be。", "Don't 後仍接原形 be。"],
                ["Look at the picture.", "要求對方看圖片", "描述圖片正在看人", "詢問圖片位置", "表示有能力看圖片", "祈使句省略主詞 you。", "句首 Look 是給對方的指令。"],
                ["Please don't touch it.", "禮貌地請對方不要碰它", "請對方碰它", "描述沒碰到它", "詢問能否碰它", "please 可放在 Don't 前形成禮貌禁止。", "核心結構仍是 Don't + touch。"]
            ]),
            doctor: C("doctor", [
                ["選出正確句子。", "Close the window.", "Closes the window.", "To close the window.", "Closing the window.", "肯定祈使句以原形動詞開始。", "不要加 -s、to 或 -ing。"],
                ["選出正確句子。", "Don't talk.", "Not talk.", "Doesn't talk.", "Don't talking.", "否定祈使句使用 Don't + 原形動詞。", "Don't 後面用 talk 原形。"],
                ["選出正確句子。", "Please be careful.", "Please is careful.", "Please are careful.", "Please being careful.", "be 動詞祈使句用原形 be。", "Please 後不依主詞變化。"],
                ["選出正確句子。", "Let's go home.", "Let's goes home.", "Let's going home.", "Let's to go home.", "Let's 後接原形動詞。", "go 不加 -s、-ing 或 to。"],
                ["選出正確句子。", "Let's not open the box.", "Let's don't open the box.", "Not let's open the box.", "Let's not opens the box.", "Let's 的否定式為 Let's not + 原形動詞。", "not 要緊接在 Let's 後。"],
                ["選出正確句子。", "Tom, please stand up.", "Tom please, stands up.", "Tom, please standing up.", "Tom is please stand up.", "稱呼語 Tom 後加逗號，祈使動詞用原形。", "stand 不加 -s 或 -ing。"],
                ["選出正確句子。", "Don't be noisy.", "Don't is noisy.", "Not be noisy.", "Doesn't be noisy.", "Don't 後接原形 be。", "noisy 是形容詞，需要 be。"],
                ["選出正確句子。", "Wait for me, please.", "Waits for me, please.", "Please waiting for me.", "Do wait for me please?", "祈使句使用 Wait 原形；句尾 please 前可加逗號。", "這是請求，不是疑問句。"],
                ["選出正確句子。", "Let's have lunch.", "Let's has lunch.", "Let we have lunch.", "Let's having lunch.", "Let's 後使用 have 原形。", "不要把 Let's 拆成 Let we。"],
                ["選出正確句子。", "Please don't use my phone.", "Please not use my phone.", "Please doesn't use my phone.", "Please don't uses my phone.", "禮貌禁止可用 Please don't + 原形動詞。", "don't 後使用 use。"]
            ]),
            transform: C("transform", [
                ["You open the door. 改成祈使句。", "Open the door.", "Opens the door.", "Opening the door.", "You to open the door.", "祈使句省略主詞 you，動詞用原形。", "刪除 You，保留 Open。"],
                ["Stand up. 改成否定句。", "Don't stand up.", "Not stand up.", "Doesn't stand up.", "Don't standing up.", "否定祈使句使用 Don't + 原形動詞。", "stand 保持原形。"],
                ["Be late. 改成否定句。", "Don't be late.", "Not is late.", "Doesn't be late.", "Don't late.", "be 的否定祈使句是 Don't be。", "late 是形容詞，不能省略 be。"],
                ["We can watch TV. 改成一起做的提議。", "Let's watch TV.", "Let's watches TV.", "Let we watch TV.", "Let's watching TV.", "Let's + 原形動詞用來提議一起行動。", "watch 保持原形。"],
                ["Let's eat here. 改成否定提議。", "Let's not eat here.", "Let's don't eat here.", "Not let's eat here.", "Let's not eats here.", "否定提議使用 Let's not。", "not 放在 eat 前。"],
                ["Sit down. 加入禮貌語並放句首。", "Please sit down.", "Sit please down.", "Please sits down.", "Please sitting down.", "Please 可放祈使句句首。", "Please 後仍接原形 sit。"],
                ["Open the door. 加入稱呼 Ken。", "Ken, open the door.", "Ken open, the door.", "Ken, opens the door.", "Open Ken the door.", "句首稱呼語後以逗號隔開。", "命令內容仍是 open the door。"],
                ["Please don't shout. 改成肯定祈使句。", "Please speak quietly.", "Please don't speak quietly.", "Please speaking quietly.", "Please speaks quiet.", "依語意可用正向行為替代禁止。", "quietly 修飾動詞 speak。"],
                ["Let's go to the park. 改成問對方是否同意。", "Let's go to the park, OK?", "Let's goes to the park, OK?", "Do let's go to the park?", "Let's going to the park, OK?", "Let's 提議後可加 OK? 徵求同意。", "Let's 後仍接 go 原形。"],
                ["You must not touch the painting. 改成簡短指令。", "Don't touch the painting.", "Not touch the painting.", "Doesn't touch the painting.", "Don't touching the painting.", "禁止指令使用 Don't + 原形動詞。", "保留動詞 touch 的原形。"]
            ]),
            dialogue: C("dialogue", [
                ["老師看到學生在走廊奔跑，最合適的話是？", "Don't run in the hallway.", "Let's run in the hallway.", "Running in the hallway.", "Don't running in the hallway.", "禁止行為使用 Don't + 原形動詞。", "老師要學生停止跑步。"],
                ["同學提議一起去圖書館，最合適的話是？", "Let's go to the library.", "Go to the library alone.", "Let's goes to the library.", "Don't go to the library.", "共同提議使用 Let's + 原形動詞。", "題目關鍵是「一起」。"],
                ["你想禮貌請同學關門，應該說？", "Please close the door.", "Please closes the door.", "Closing the door, please.", "Does close the door, please.", "Please + 原形動詞構成禮貌請求。", "close 保持原形。"],
                ["朋友很緊張，你可以對他說？", "Don't be nervous.", "Don't nervous.", "Not is nervous.", "Let's nervous.", "形容詞 nervous 前要有 be。", "否定祈使句為 Don't be。"],
                ["B 應該怎麼回答？", "Great! Let's do it.", "Great! Let's does it.", "No, let's not to.", "Great! We doing it.", "接受提議可用 Great，再用 Let's + 原形動詞。", "do 在 Let's 後不變化。", { context: "A: Let's make a card for Mom." }],
                ["你不想大家現在開禮物，應該說？", "Let's not open it now.", "Let's don't open it now.", "Don't let's open it now.", "Let's not opens it now.", "團體否定提議用 Let's not。", "not 放在 open 前。"],
                ["教室很吵，老師最可能說？", "Be quiet, please.", "Is quiet, please.", "Let's noisy, please.", "Quietly be you.", "要求保持某種狀態用 Be + 形容詞。", "quiet 是形容詞。"],
                ["你要提醒 Kevin 小心，應該說？", "Kevin, be careful.", "Kevin is careful.", "Kevin, being careful.", "Be Kevin careful.", "稱呼語與指令用逗號隔開。", "Be careful 是完整指令。"],
                ["B 應該怎麼回答？", "OK. Let's not be late.", "OK. Let's don't be late.", "OK. We not late.", "OK. Let's not late.", "Let's not be + 形容詞是正確否定提議。", "late 前需要 be。", { context: "A: The movie starts at seven." }],
                ["圖書館員提醒不能飲食，最合適的話是？", "Please don't eat or drink here.", "Please not eating here.", "Let's eat and drink here.", "Please doesn't eat here.", "禮貌禁止使用 Please don't + 原形動詞。", "eat 與 drink 都保持原形。"]
            ])
        }
    });

    const L4 = makeLesson({
        code: "L4",
        label: "Lesson 4",
        kicker: "B1・LESSON 4",
        title: "空間偵探事務所",
        description: "練習位置介系詞、Where 問句，以及 There is／There are 的存在句。",
        stageDescriptions: {
            classification: "辨認位置介系詞與存在句的單複數。",
            doctor: "修正 Where、There is／are、some／any 的錯誤。",
            transform: "在位置句與存在句之間正確改寫。",
            dialogue: "依房間、教室與社區情境回答位置問題。"
        },
        questionBank: {
            classification: C("classification", [
                ["The cat is under the table.", "貓在桌子下方", "貓在桌子上方", "貓在桌子裡面", "貓在桌子旁邊", "under 表示在某物下方。", "想像桌面遮住貓的位置。"],
                ["The ball is between the boxes.", "球在兩個箱子之間", "球在箱子後面", "球在箱子前面", "球在箱子裡面", "between 表示在兩者之間。", "between 通常需要兩個參照物。"],
                ["The bike is in front of the house.", "腳踏車在房子前方", "腳踏車在房子後方", "腳踏車在房子裡", "腳踏車在房子上", "in front of 表示在前方。", "不要與 behind 混淆。"],
                ["There is a book on the desk.", "桌上有一本書", "書正在桌上閱讀", "桌子擁有一本書", "桌上沒有書", "There is + 單數名詞表示某處有某物。", "a book 是單數，所以用 is。"],
                ["There are three chairs in the room.", "房間裡有三張椅子", "房間就是三張椅子", "三張椅子不在房間", "房間裡只有一張椅子", "There are + 複數名詞表示存在。", "three chairs 是複數。"],
                ["Is there a park near here?", "詢問附近是否有公園", "詢問公園是誰的", "詢問公園幾歲", "詢問誰在公園跑步", "Is there + 單數名詞是存在句問句。", "a park 決定句首用 Is。"],
                ["Are there any students outside?", "詢問外面是否有學生", "詢問學生從哪裡來", "詢問學生會不會出去", "描述外面沒有學生", "Are there + any + 複數名詞用於問句。", "students 是複數，使用 Are there。"],
                ["There isn't any water in the bottle.", "瓶子裡沒有水", "瓶子裡有一些水", "水在瓶子旁邊", "瓶子不是水做的", "不可數名詞否定句可用 isn't any。", "water 是不可數名詞。"],
                ["The bank is next to the post office.", "銀行在郵局旁邊", "銀行在郵局對面", "銀行在郵局裡面", "銀行在郵局後方", "next to 表示緊鄰、在旁邊。", "兩個地點相鄰時可用 next to。"],
                ["Where are my keys?", "詢問多把鑰匙的位置", "詢問鑰匙的主人", "詢問鑰匙數量", "詢問鑰匙是否能開門", "Where + be 用來詢問位置。", "keys 是複數，所以搭配 are。"]
            ]),
            doctor: C("doctor", [
                ["選出正確句子。", "The dog is behind the door.", "The dog is behind of the door.", "The dog behind the door is.", "The dog is in behind the door.", "behind 直接接名詞，不加 of。", "位置介系詞放在 be 動詞後。"],
                ["選出正確句子。", "Where is the library?", "Where are the library?", "Where the library is?", "What is the library where?", "單數主詞 library 搭配 is。", "問句語序是 Where + is + 主詞。"],
                ["選出正確句子。", "There is a computer on the desk.", "There are a computer on the desk.", "There is computer on desk.", "There have a computer on the desk.", "單數 a computer 搭配 There is。", "英文存在句不用 There have。"],
                ["選出正確句子。", "There are two pictures on the wall.", "There is two pictures on the wall.", "There are two picture on the wall.", "There have two pictures on the wall.", "複數 two pictures 搭配 There are。", "數字 two 後的名詞要複數。"],
                ["選出正確句子。", "Is there a restroom here?", "Are there a restroom here?", "Does there a restroom here?", "There is a restroom here?", "單數存在句問句使用 Is there。", "a restroom 是單數。"],
                ["選出正確句子。", "Are there any books in the bag?", "Is there any books in the bag?", "Are there some book in the bag?", "Do there any books in the bag?", "複數問句使用 Are there any + 複數名詞。", "問句通常用 any。"],
                ["選出正確句子。", "There isn't any milk.", "There isn't some milk.", "There aren't any milk.", "There doesn't have milk.", "不可數 milk 搭配 is，否定句用 any。", "milk 不能用複數 are。"],
                ["選出正確句子。", "The school is across from the park.", "The school is across the park from.", "The school across from is the park.", "The school is across of the park.", "across from 表示在對面。", "這兩個字要連用。"],
                ["選出正確句子。", "My shoes are under the bed.", "My shoes is under the bed.", "My shoes are under of the bed.", "My shoes under the bed are.", "複數 shoes 搭配 are；under 不加 of。", "先檢查主詞單複數。"],
                ["選出正確句子。", "There are some cookies on the plate.", "There is some cookies on the plate.", "There are any cookies on the plate.", "There have some cookie on the plate.", "肯定句複數可用 There are some。", "cookies 是複數，肯定句選 some。"]
            ]),
            transform: C("transform", [
                ["The map is on the wall. 改成詢問位置。", "Where is the map?", "Where are the map?", "What is the map on?", "Where the map is?", "位置問句使用 Where + is + 單數主詞。", "map 是單數。"],
                ["There is a dog in the yard. 改成問句。", "Is there a dog in the yard?", "Are there a dog in the yard?", "Does there a dog in the yard?", "Is a dog there in the yard?", "There is 的問句把 is 移到 there 前。", "保留 a dog 單數。"],
                ["There are some apples. 改成否定句。", "There aren't any apples.", "There isn't any apples.", "There aren't some apples.", "There don't have apples.", "複數否定句用 aren't any。", "some 通常改成 any。"],
                ["There is some juice. 改成問句。", "Is there any juice?", "Are there any juice?", "Is there some juices?", "Does there have juice?", "不可數存在句問句用 Is there any。", "juice 不加 -s。"],
                ["Two cats are under the chair. 改成存在句。", "There are two cats under the chair.", "There is two cats under the chair.", "There are two cat under the chair.", "There have two cats under the chair.", "複數存在句使用 There are。", "two cats 保持複數。"],
                ["A bus stop is near the school. 改成存在句。", "There is a bus stop near the school.", "There are a bus stop near the school.", "There is bus stops near the school.", "There has a bus stop near the school.", "單數存在句使用 There is。", "a bus stop 是單數。"],
                ["The cat is in front of the sofa. 選出相反位置。", "The cat is behind the sofa.", "The cat is between the sofa.", "The cat is next the sofa.", "The cat is under of the sofa.", "in front of 的相反位置是 behind。", "想像從沙發的前方移到後方。"],
                ["The store is next to the bank. 改成位置問句。", "Where is the store?", "Where are the store?", "What is next the store?", "Where the store next to?", "詢問地點使用 Where is。", "store 是單數。"],
                ["No, there aren't. 改成完整回答。", "No, there aren't any students.", "No, there isn't any students.", "No, they aren't there students.", "No, there aren't some student.", "複數否定存在句使用 aren't any + 複數名詞。", "students 決定使用 aren't。"],
                ["Yes, there is. 加入 a library。", "Yes, there is a library.", "Yes, there are a library.", "Yes, it is there a library.", "Yes, there is library a.", "單數補充句使用 there is a + 名詞。", "冠詞 a 放在 library 前。"]
            ]),
            dialogue: C("dialogue", [
                ["B 應該怎麼回答？", "It's next to the bank.", "There are next to the bank.", "It next the bank.", "It's a post office from.", "Where 問位置，可用 It is + 位置回答。", "next to 後接參照地點。", { context: "A: Where is the post office?" }],
                ["B 應該怎麼回答？", "Yes, there is.", "Yes, there are.", "Yes, it does.", "Yes, is there.", "Is there ...? 用 Yes, there is 回答。", "簡答沿用 there 與 is。", { context: "A: Is there a park near your home?" }],
                ["B 應該怎麼回答？", "No, there aren't.", "No, there isn't.", "No, they don't.", "No, aren't there.", "Are there ...? 用 there aren't 否定簡答。", "shops 是複數。", { context: "A: Are there any shops here?" }],
                ["你找不到書包，最合適的問法是？", "Where is my schoolbag?", "Where are my schoolbag?", "What is my schoolbag from?", "Is there my schoolbag?", "詢問單數物品位置用 Where is。", "schoolbag 是單數。"],
                ["B 應該怎麼回答？", "There are three.", "There is three.", "They have three there.", "There are any three.", "How many 後可用 There are + 數量回答。", "desks 是複數。", { context: "A: How many desks are there?" }],
                ["圖片中鳥在樹上，應該說？", "The bird is in the tree.", "The bird is on the tree desk.", "There are a bird in the tree.", "The bird in tree are.", "鳥停留在樹枝間通常用 in the tree。", "不是物品放在樹的表面。"],
                ["B 應該怎麼回答？", "It's under the chair.", "There is under the chair.", "They are under the chair.", "It under is chair.", "單數物品可用 It is + 位置。", "the ball 以 it 代替。", { context: "A: Where is the ball?" }],
                ["冰箱裡沒有蛋，應該說？", "There aren't any eggs in the fridge.", "There isn't any eggs in the fridge.", "There aren't some egg in the fridge.", "There don't have eggs in the fridge.", "複數否定存在句用 aren't any。", "eggs 是複數。"],
                ["桌上有一些水，應該說？", "There is some water on the table.", "There are some waters on the table.", "There is any water on the table.", "There have water on the table.", "不可數 water 搭配 is，肯定句用 some。", "water 通常不加 -s。"],
                ["B 應該怎麼回答？", "It's between the library and the park.", "It's between the library.", "There are between two places.", "It's behind of the library and park.", "between A and B 表示在兩者之間。", "回答中要出現兩個參照地點。", { context: "A: Where is the school?" }]
            ])
        }
    });

    const L5 = makeLesson({
        code: "L5",
        label: "Lesson 5",
        kicker: "B1・LESSON 5",
        title: "現在進行式直播站",
        description: "練習 be + V-ing、動詞變化、現在進行式問答，以及時間的問法。",
        stageDescriptions: {
            classification: "辨認正在發生的動作與時間表達。",
            doctor: "修正 be 動詞、V-ing 與問句語序。",
            transform: "把敘述句改成否定、問句或 Wh 問句。",
            dialogue: "依當下情境與時刻完成對話。"
        },
        questionBank: {
            classification: C("classification", [
                ["Amy is reading now.", "Amy 現在正在閱讀", "Amy 每天都閱讀", "Amy 已經讀完", "Amy 明天要閱讀", "be + V-ing 表示正在進行的動作。", "now 是現在進行式的線索。"],
                ["Look! The dog is running.", "狗正在跑", "狗會跑", "狗每天跑", "狗不能跑", "Look! 常提示動作正在發生。", "is running 是現在進行式。"],
                ["They are making dinner.", "他們正在做晚餐", "他們每天做晚餐", "他們做完晚餐了", "他們不會做晚餐", "複數主詞搭配 are + V-ing。", "They 與 are 配對。"],
                ["What is Ben doing?", "詢問 Ben 正在做什麼", "詢問 Ben 的職業", "詢問 Ben 能做什麼", "詢問 Ben 幾歲", "What + be + 主詞 + doing? 詢問當下動作。", "doing 是重要線索。"],
                ["Is your sister sleeping?", "確認妹妹是否正在睡覺", "詢問妹妹在哪裡睡", "詢問妹妹會不會睡", "表示妹妹每天睡覺", "be 動詞置前形成現在進行式問句。", "sleeping 表示當下動作。"],
                ["It is seven thirty.", "現在七點半", "現在七點十三分", "現在差七分三十點", "活動持續七小時半", "seven thirty 表示 7:30。", "英語時間可先說小時再說分鐘。"],
                ["The class starts at eight.", "課程八點開始", "課程持續八小時", "現在是八點", "教室有八堂課", "at + 時刻表示在某個時間點。", "starts at 是開始時間。"],
                ["Mom isn't cooking now.", "媽媽現在沒有在煮飯", "媽媽不會煮飯", "媽媽從不煮飯", "媽媽已經煮完", "be not + V-ing 是否定進行式。", "isn't cooking 只否定當下動作。"],
                ["Listen! Someone is singing.", "有人正在唱歌", "有人每天唱歌", "有人會唱歌", "有人唱完了", "Listen! 提醒聽正在發生的聲音。", "is singing 是正在進行。"],
                ["What time is it?", "詢問現在幾點", "詢問活動在哪裡", "詢問花多少時間", "詢問誰有時間", "What time is it? 是詢問時刻的固定句型。", "回答通常是 It is + 時刻。"]
            ]),
            doctor: C("doctor", [
                ["選出正確句子。", "I am doing my homework.", "I is doing my homework.", "I am do my homework.", "I doing am my homework.", "I 搭配 am，進行式使用 doing。", "需要 be + V-ing。"],
                ["選出正確句子。", "She is dancing now.", "She dancing now.", "She are dancing now.", "She is dance now.", "she 搭配 is，dance 去 e 加 -ing。", "兩個部分都要檢查。"],
                ["選出正確句子。", "They are swimming.", "They is swimming.", "They are swiming.", "They swimming are.", "swim 重複字尾 m 再加 -ing。", "they 搭配 are。"],
                ["選出正確句子。", "Is he watching TV?", "Does he watching TV?", "He is watching TV?", "Is he watch TV?", "進行式問句把 is 移到主詞前，保留 V-ing。", "watch 應為 watching。"],
                ["選出正確句子。", "What are you doing?", "What you are doing?", "What is you doing?", "What do you doing?", "Wh 問句語序是 What + are + you + doing。", "you 搭配 are。"],
                ["選出正確句子。", "We aren't eating lunch.", "We isn't eating lunch.", "We don't eating lunch.", "We aren't eat lunch.", "進行式否定使用 aren't + V-ing。", "we 搭配 are。"],
                ["選出正確句子。", "The baby is lying on the bed.", "The baby is lieing on the bed.", "The baby are lying on the bed.", "The baby lying on the bed.", "lie 變 V-ing 時為 lying。", "注意不是 lieing。"],
                ["選出正確句子。", "What time is it?", "What time it is?", "What is time it?", "How time is it?", "詢問時刻的固定句型是 What time is it?", "is 放在 it 前。"],
                ["選出正確句子。", "It's a quarter past nine.", "It's a quarter nine past.", "It's quarter past nine.", "It's a quarter to after nine.", "a quarter past nine 表示 9:15。", "quarter 前保留 a。"],
                ["選出正確句子。", "The game starts at six thirty.", "The game starts in six thirty.", "The game start at six thirty.", "The game is start at six thirty.", "時刻前用 at；單數主詞現在式用 starts。", "這句說行程時間，不是正在開始。"]
            ]),
            transform: C("transform", [
                ["Tom plays basketball. 加入 now 改為進行式。", "Tom is playing basketball now.", "Tom plays basketball now.", "Tom is play basketball now.", "Tom are playing basketball now.", "現在進行式為 is + playing。", "Tom 是單數。"],
                ["They are studying. 改成否定句。", "They aren't studying.", "They don't studying.", "They isn't studying.", "They aren't study.", "are not 可縮寫為 aren't，V-ing 保留。", "否定的是正在進行的動作。"],
                ["Amy is writing a letter. 改成一般問句。", "Is Amy writing a letter?", "Does Amy writing a letter?", "Amy is writing a letter?", "Is Amy write a letter?", "把 is 移到主詞 Amy 前。", "writing 不改回原形。"],
                ["The boys are running. 對 running 提問。", "What are the boys doing?", "What do the boys running?", "What is the boys doing?", "What the boys are doing?", "詢問動作用 What + be + 主詞 + doing。", "boys 是複數，使用 are。"],
                ["She is making a cake. 主詞改成 we。", "We are making a cake.", "We is making a cake.", "We are make a cake.", "Us are making a cake.", "we 搭配 are，making 保留。", "先替換主詞，再調整 be 動詞。"],
                ["run 改成 V-ing。", "running", "runing", "runs", "runinng", "短母音加單一子音結尾常重複字尾再加 -ing。", "run 要寫成雙 n。"],
                ["write 改成 V-ing。", "writing", "writeing", "writting", "writes", "字尾不發音 e 通常去 e 加 -ing。", "先去掉 write 的 e。"],
                ["現在 8:45。選出正確說法。", "It's a quarter to nine.", "It's a quarter past nine.", "It's forty-five to eight.", "It's a quarter at nine.", "8:45 是距離九點還有十五分鐘。", "to 後接下一個小時。"],
                ["The movie is at 7:00. 改成問句。", "What time is the movie?", "What time the movie is?", "Where time is the movie?", "What is the movie time at?", "詢問活動時間可用 What time is + 活動。", "movie 是單數，使用 is。"],
                ["Are you listening? 肯定簡答。", "Yes, I am.", "Yes, I do.", "Yes, you are.", "Yes, I listening.", "Are you ...? 回答自己時用 I am。", "簡答不需重複 listening。"]
            ]),
            dialogue: C("dialogue", [
                ["B 應該怎麼回答？", "I'm reading a comic book.", "I read every day.", "I can read.", "I'm a reader.", "What are you doing? 問當下動作。", "回答使用 am + V-ing。", { context: "A: What are you doing?" }],
                ["B 應該怎麼回答？", "Yes, she is.", "Yes, she does.", "Yes, she can.", "Yes, she sleeping.", "Is she ...? 用 she is 簡答。", "沿用問句中的 be 動詞。", { context: "A: Is Mia sleeping?" }],
                ["B 應該怎麼回答？", "No, they aren't.", "No, they don't.", "No, they isn't.", "No, they not playing.", "Are they ...? 否定簡答用 they aren't。", "複數主詞搭配 are。", { context: "A: Are they playing soccer?" }],
                ["B 應該怎麼回答？", "It's ten twenty.", "At ten twenty is.", "It's twenty ten hours.", "It has ten twenty.", "What time is it? 用 It is + 時刻回答。", "先說小時 ten，再說分鐘 twenty。", { context: "A: What time is it?" }],
                ["你看到同學正在畫畫，應該說？", "Leo is drawing a picture.", "Leo drawing a picture.", "Leo is draw a picture.", "Leo are drawing pictures now.", "當下動作用 is + drawing。", "Leo 是單數。"],
                ["電話中想問對方在做什麼，應該說？", "What are you doing now?", "What do you doing now?", "What you are doing now?", "What is you do now?", "現在進行式 Wh 問句要有 are 與 doing。", "you 搭配 are。"],
                ["B 應該怎麼回答？", "He's taking a shower.", "He takes at seven.", "He can shower.", "He taking a shower is.", "What's Dad doing? 詢問當下動作。", "he 搭配 is，縮寫為 he's。", { context: "A: What's Dad doing?" }],
                ["你要告訴朋友電影七點半開始，應該說？", "The movie starts at seven thirty.", "The movie is starting every day.", "The movie start in seven thirty.", "The movie at seven thirty starts is.", "時刻前用 at；行程可用一般現在式。", "movie 是單數，動詞加 -s。"],
                ["B 應該怎麼回答？", "No, I'm not. I'm doing homework.", "No, I don't. I doing homework.", "No, I isn't. I do homework now.", "No, I'm not study.", "Are you studying? 否定用 I'm not。", "補充當下動作用 am doing。", { context: "A: Are you watching TV?" }],
                ["Listen! 有人在彈鋼琴，應該說？", "Someone is playing the piano.", "Someone plays piano listen.", "Someone are playing the piano.", "Someone can playing piano.", "Listen! 提示使用現在進行式。", "someone 視為單數，搭配 is。"]
            ])
        }
    });

    const L6 = makeLesson({
        code: "L6",
        label: "Lesson 6",
        kicker: "B1・LESSON 6",
        title: "Can 能力挑戰館",
        description: "練習 can／can't 的能力與許可用法、一般問句與 Wh 問句。",
        stageDescriptions: {
            classification: "辨認能力、許可與請求。",
            doctor: "修正 can 後動詞與問答形式。",
            transform: "在肯定、否定、問句與 Wh 問句間改寫。",
            dialogue: "依能力表現與生活請求完成對話。"
        },
        questionBank: {
            classification: C("classification", [
                ["I can swim.", "表示我會游泳", "表示我正在游泳", "表示我每天游泳", "命令我去游泳", "can + 原形動詞表示能力。", "can 後的 swim 不變化。"],
                ["She can't drive.", "表示她不會開車", "表示她現在沒開車", "表示她不喜歡車", "表示她沒有車", "can't 表示沒有能力或不被允許。", "根據 drive 判斷是能力。"],
                ["Can I use your pen?", "請求允許使用筆", "詢問筆的位置", "描述正在使用筆", "命令對方使用筆", "Can I ...? 常用來請求允許。", "主詞 I 表示說話者想做某事。"],
                ["Can you help me?", "請求對方幫忙", "詢問對方的職業", "描述對方正在幫忙", "禁止對方幫忙", "Can you ...? 可用來提出請求。", "help 使用原形。"],
                ["What can Ben do?", "詢問 Ben 會做什麼", "詢問 Ben 正在做什麼", "詢問 Ben 的工作", "詢問 Ben 幾歲", "What can + 主詞 + do? 詢問能力內容。", "can 與 do 都是線索。"],
                ["Where can we play basketball?", "詢問可以在哪裡打籃球", "詢問誰會打籃球", "詢問何時打籃球", "詢問籃球在哪裡", "Where can ...? 詢問可進行活動的地點。", "疑問詞 Where 指向地點。"],
                ["Who can speak French?", "詢問誰會說法語", "詢問法語是什麼", "詢問誰正在說話", "詢問法國在哪裡", "Who can ...? 詢問具備能力的人。", "Who 是問人物。"],
                ["We can meet at five.", "表示我們可以五點見面", "表示現在是五點", "表示我們見面五次", "表示我們五點正在見面", "can 可表示可行性，at five 是時間。", "at 後接時刻。"],
                ["Can birds fly?", "詢問鳥是否會飛", "詢問鳥正在飛嗎", "命令鳥飛", "詢問鳥在哪裡", "Can + 主詞 + 原形動詞是能力問句。", "fly 保持原形。"],
                ["You cannot eat here.", "表示這裡不允許吃東西", "表示你現在沒吃", "表示你不喜歡吃", "邀請你在這裡吃", "cannot 也可表示禁止。", "情境地點 here 可幫助判斷規定。"]
            ]),
            doctor: C("doctor", [
                ["選出正確句子。", "He can dance.", "He can dances.", "He cans dance.", "He can dancing.", "can 後一律接原形動詞。", "主詞是 he，can 也不加 -s。"],
                ["選出正確句子。", "They can't cook.", "They don't can cook.", "They can't cooking.", "They can not to cook.", "can't 後接 cook 原形。", "不需要再加 do 或 to。"],
                ["選出正確句子。", "Can Amy sing?", "Does Amy can sing?", "Can Amy sings?", "Amy can sing?", "can 問句把 can 放主詞前，動詞用原形。", "sing 不加 -s。"],
                ["選出正確句子。", "Yes, I can.", "Yes, I do.", "Yes, I am.", "Yes, I can swim can.", "Can 問句用 can 簡答。", "簡答不需重複主要動詞。"],
                ["選出正確句子。", "No, she can't.", "No, she doesn't can.", "No, she isn't.", "No, she cann't.", "can not 的縮寫是 can't。", "拼字不是 cann't。"],
                ["選出正確句子。", "What can you do?", "What you can do?", "What do you can?", "What can you doing?", "Wh 問句語序是 What + can + 主詞 + 原形動詞。", "can 放在 you 前。"],
                ["選出正確句子。", "Where can we practice?", "Where we can practice?", "Where can we practicing?", "Where do can we practice?", "can 放在主詞前，practice 用原形。", "Where 置於句首。"],
                ["選出正確句子。", "Can I sit here?", "Can I sitting here?", "Do I can sit here?", "Can sit I here?", "請求允許使用 Can I + 原形動詞。", "sit 放在主詞 I 後。"],
                ["選出正確句子。", "My sister can play the guitar.", "My sister can plays guitar.", "My sister cans play the guitar.", "My sister can playing the guitar.", "can 後用 play 原形；樂器前通常用 the。", "同時檢查動詞與冠詞。"],
                ["選出正確句子。", "Who can answer the question?", "Who can answers the question?", "Who does can answer the question?", "Who can answering the question?", "Who 作主詞時仍是 can + 原形動詞。", "answer 不加 -s。"]
            ]),
            transform: C("transform", [
                ["She sings well. 加入 can 表示能力。", "She can sing well.", "She can sings well.", "She cans sing well.", "She can singing well.", "can 後把 sings 改回原形 sing。", "情態助動詞後不保留第三人稱 -s。"],
                ["Tom can skate. 改成否定句。", "Tom can't skate.", "Tom doesn't can skate.", "Tom can't skates.", "Tom not can skate.", "can 的否定是 cannot 或 can't。", "skate 保持原形。"],
                ["They can speak English. 改成問句。", "Can they speak English?", "Do they can speak English?", "Can they speaks English?", "They can speak English?", "把 can 移到主詞前。", "主要動詞 speak 不變。"],
                ["Ben can draw pictures. 對 draw pictures 提問。", "What can Ben do?", "What does Ben can do?", "What Ben can do?", "What can Ben doing?", "詢問能力內容使用 What can ... do。", "句尾用 do 代替原動作。"],
                ["Amy can sing. 對 Amy 提問。", "Who can sing?", "Who does can sing?", "Who can sings?", "Who Amy can sing?", "詢問人物時 Who 可直接作主詞。", "不需要再放 Amy。"],
                ["We can play in the gym. 對 in the gym 提問。", "Where can we play?", "What can we play where?", "Where we can play?", "Where can we playing?", "詢問地點使用 Where can + 主詞 + 原形動詞。", "play 保持原形。"],
                ["Can you ride a bike? 肯定簡答。", "Yes, I can.", "Yes, you can.", "Yes, I do.", "Yes, I am.", "回答對方問 you 時，自己改用 I。", "助動詞仍使用 can。"],
                ["Can Lisa cook? 否定簡答。", "No, she can't.", "No, Lisa doesn't.", "No, she isn't.", "No, she can not cook can't.", "Lisa 以 she 代替，使用 can't。", "簡答不重複 cook。"],
                ["You may use my phone. 改成請求問句。", "Can I use your phone?", "Can you use my phone?", "Do I can use your phone?", "Can I using your phone?", "請求允許使用 Can I + 原形動詞。", "人稱所有格要隨說話角度改變。"],
                ["He cannot swim. 改成縮寫。", "He can't swim.", "He cann't swim.", "He doesn't swim can.", "He isn't can swim.", "cannot 的常見縮寫是 can't。", "注意只有一個 n。"]
            ]),
            dialogue: C("dialogue", [
                ["B 應該怎麼回答？", "Yes, I can.", "Yes, I do.", "Yes, I am.", "Yes, I can swim can.", "Can you ...? 用 I can 回答自己。", "簡答沿用 can。", { context: "A: Can you swim?" }],
                ["B 應該怎麼回答？", "No, he can't.", "No, he doesn't.", "No, he isn't.", "No, he cann't.", "Can Leo ...? 否定用 he can't。", "Leo 可用 he 代替。", { context: "A: Can Leo play tennis?" }],
                ["B 應該怎麼回答？", "I can play the guitar.", "I'm playing the guitar now.", "I play at six.", "I can the guitar playing.", "What can you do? 要回答能力。", "使用 can + 原形動詞。", { context: "A: What can you do?" }],
                ["B 應該怎麼回答？", "We can practice in the music room.", "We can practicing in the music room.", "We practice can in the room.", "We are can practice there.", "Where can ...? 回答可行地點。", "can 後用 practice 原形。", { context: "A: Where can we practice?" }],
                ["想借同學的尺，最合適的說法是？", "Can I use your ruler?", "Can you use my ruler?", "Do I can use your ruler?", "Am I use your ruler?", "Can I ...? 用來請求允許。", "從自己的角度使用 I 與 your。"],
                ["同學請你幫忙，你願意時可以說？", "Sure. I can help you.", "Sure. I can helping you.", "Sure. I am can help.", "Sure. I helps you can.", "can 後接 help 原形。", "Sure 表示願意。"],
                ["B 應該怎麼回答？", "Amy can.", "Amy does.", "Amy is.", "Amy can sings.", "Who can sing? 可用人物 + can 簡答。", "不必重複 sing。", { context: "A: Who can sing this song?" }],
                ["公園告示禁止餵動物，最合適的句子是？", "You can't feed the animals here.", "You aren't feed the animals here.", "You can't feeding the animals.", "You don't can feed animals.", "can't 可表示規定不允許。", "feed 保持原形。"],
                ["B 應該怎麼回答？", "At four thirty.", "In the library.", "My classmates can.", "We can meeting.", "What time 問時刻。", "回答需是具體時間。", { context: "A: What time can we meet?" }],
                ["朋友不會騎腳踏車，你最合適的鼓勵是？", "That's OK. We can practice together.", "You can't ride forever.", "You are practice together.", "Let's can riding now.", "鼓勵可提出一起練習，can 後用原形。", "選擇正向且文法正確的回應。"]
            ])
        }
    });

    window.B1_GRAMMAR = {
        code: "B1",
        label: "第 1 冊（七年級上）",
        shortLabel: "B1",
        defaultLesson: "S",
        lessons: {
            S: STARTER,
            L1,
            L2,
            L3,
            L4,
            L5,
            L6
        }
    };
})();
