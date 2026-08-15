(() => {
    "use strict";

    const choice = (config) => ({ type: "choice", ...config });
    const reorder = (config) => ({ type: "reorder", ...config });

    window.B3_L2_GRAMMAR = {
        code: "L2",
        label: "第 2 課",
        kicker: "B3・LESSON 2",
        title: "原因與結果文法冒險",
        description: "練習不規則動詞過去式、Why did／didn't 問答，以及 because／so 的原因與結果句。每回合 10 題，答錯後會提示判斷方法。",
        stageDescriptions: {
            classification: "辨認 Why 過去式問句、原因句、結果句與不規則動詞。",
            doctor: "修正 did 後的動詞、because／so 重複使用及過去式錯誤。",
            transform: "重組 Why 問答，並在 because 與 so 之間正確改寫。",
            dialogue: "在生活情境中回答原因，選出自然且正確的過去式句子。"
        },
        summarySteps: [
            "先找 Why、because 或 so",
            "確認事件發生在過去",
            "檢查 did 後接原形動詞",
            "分清楚原因與結果"
        ],
        questionBank: {
            classification: [
                choice({
                    instruction: "請判斷這個句子的文法功能。",
                    stem: "Why did Mia walk to school yesterday?",
                    options: {
                        B: ["詢問過去事件的原因", "詢問過去事件的地點", "敘述現在的習慣"],
                        A: ["詢問過去事件的原因", "詢問過去事件的地點", "詢問現在事件的原因", "詢問過去事件的方式"]
                    },
                    answer: "詢問過去事件的原因",
                    hint: { B: "Why 是詢問原因的重要線索。", A: "同時判斷 Why、did 與 yesterday 的功能。" },
                    clue: "Why 詢問原因；did 與 yesterday 表示事情發生在過去。",
                    rule: "過去式原因問句使用 Why＋did＋主詞＋原形動詞？",
                    steps: ["找到 Why", "確認助動詞 did", "確認 walk 是原形", "判斷為詢問過去原因"]
                }),
                choice({
                    instruction: "請找出句中的原因。",
                    stem: "Leo went to the doctor because he was sick.",
                    options: {
                        B: ["he was sick", "Leo went to the doctor", "the doctor"],
                        A: ["he was sick", "Leo went to the doctor", "because", "Leo"]
                    },
                    answer: "he was sick",
                    hint: { B: "because 後面通常接原因。", A: "不要只選連接詞，要選出完整的原因事件。" },
                    clue: "生病是去看醫生的原因。",
                    rule: "because 引導原因句，後面需要接主詞與動詞構成完整子句。",
                    steps: ["找到 because", "閱讀 because 後方", "確認 he was sick 是完整子句", "判斷它是原因"]
                }),
                choice({
                    instruction: "請找出句中的結果。",
                    stem: "Nora missed the bus, so she was late for school.",
                    options: {
                        B: ["she was late for school", "Nora missed the bus", "the bus"],
                        A: ["she was late for school", "Nora missed the bus", "so", "for school"]
                    },
                    answer: "she was late for school",
                    hint: { B: "so 後面通常接結果。", A: "辨認前因後果，不要只選連接詞。" },
                    clue: "沒搭上公車造成上學遲到。",
                    rule: "so 引導結果句，前面通常加逗號。",
                    steps: ["找到 so", "閱讀 so 後方", "確認 she was late 是完整事件", "判斷它是結果"]
                }),
                choice({
                    instruction: "請判斷畫線概念的動詞形式。",
                    stem: "Dad bought some fruit after work.",
                    options: {
                        B: ["buy 的不規則過去式", "buy 的現在式", "be 動詞過去式"],
                        A: ["buy 的不規則過去式", "buy 的規則過去式", "bring 的不規則過去式", "buy 的過去分詞用法"]
                    },
                    answer: "buy 的不規則過去式",
                    hint: { B: "buy 的過去式不是加 ed。", A: "確認原形與過去式的配對。" },
                    clue: "bought 是 buy 的不規則過去式。",
                    rule: "不規則動詞的過去式沒有固定加 ed 的形式，需要分組記憶。",
                    steps: ["找到動詞 bought", "回想原形 buy", "確認不是規則變化", "判斷為不規則過去式"]
                }),
                choice({
                    instruction: "請判斷句型。",
                    stem: "Why didn't Eric eat breakfast this morning?",
                    options: {
                        B: ["過去式 Why 否定問句", "現在式 Why 問句", "過去式 Yes／No 問句"],
                        A: ["過去式 Why 否定問句", "現在式 Why 否定問句", "過去式 What 否定問句", "be 動詞過去式問句"]
                    },
                    answer: "過去式 Why 否定問句",
                    hint: { B: "注意 Why didn't。", A: "同時辨認疑問詞、否定助動詞與 eat 的形式。" },
                    clue: "Why 詢問原因，didn't 表示過去否定，eat 保持原形。",
                    rule: "過去式否定原因問句使用 Why＋didn't＋主詞＋原形動詞？",
                    steps: ["找到 Why", "看到 didn't", "確認 eat 是原形", "判斷為過去式否定問句"]
                }),
                choice({
                    instruction: "請選出表示原因的句子。",
                    stem: "哪一句說明『沒有參加聚會』的原因？",
                    options: {
                        B: ["I didn't join the party because I was sick.", "I was sick, so I didn't join the party.", "Why didn't you join the party?"],
                        A: ["I didn't join the party because I was sick.", "I didn't join the party, so I was sick.", "Because I didn't join the party, so I was sick.", "Why did I join the party because I was sick?"]
                    },
                    answer: "I didn't join the party because I was sick.",
                    hint: { B: "題目要找 because 引導原因的寫法。", A: "確認邏輯方向與連接詞只能使用一個。" },
                    clue: "because I was sick 直接說明沒有參加聚會的原因。",
                    rule: "結果＋because＋原因；because 與 so 不可同時連接同一組原因結果。",
                    steps: ["找出結果：沒參加", "找出原因：生病", "選擇 because", "檢查前後順序"]
                }),
                choice({
                    instruction: "請選出表示結果的句子。",
                    stem: "哪一句正確表達『很累，所以很早睡』？",
                    options: {
                        B: ["I was tired, so I went to bed early.", "I went to bed early because I was tired.", "I was tired because I went to bed early."],
                        A: ["I was tired, so I went to bed early.", "Because I was tired, so I went to bed early.", "I went to bed early, so I was tired.", "I was tired so because I went to bed early."]
                    },
                    answer: "I was tired, so I went to bed early.",
                    hint: { B: "題目指定使用『所以』的表達。", A: "找出原因在前、結果在後，且只使用 so 的句子。" },
                    clue: "疲累是原因，早睡是結果。",
                    rule: "原因＋逗號＋so＋結果。",
                    steps: ["找出原因：很累", "找出結果：早睡", "使用 so 連接", "在 so 前加逗號"]
                }),
                choice({
                    instruction: "請判斷動詞的變化。",
                    stem: "The boy threw the ball very far.",
                    options: {
                        B: ["throw → threw", "throw → throwed", "throw → thrown"],
                        A: ["throw → threw，屬不規則過去式", "throw → throwed，屬規則過去式", "throw → thrown，為本句主要動詞", "threw → throw，屬現在式變化"]
                    },
                    answer: { B: "throw → threw", A: "throw → threw，屬不規則過去式" },
                    hint: { B: "本句的 threw 表示過去動作。", A: "不要把過去式 threw 與過去分詞 thrown 混淆。" },
                    clue: "threw 是 throw 的不規則過去式。",
                    rule: "throw 的三態是 throw－threw－thrown。",
                    steps: ["找到 threw", "判斷句中沒有助動詞", "回想原形 throw", "確認過去式為 threw"]
                }),
                choice({
                    instruction: "請選出 did 後正確的動詞形式。",
                    stem: "Why did Jenny _____ the window?",
                    options: {
                        B: ["break", "broke", "broken"],
                        A: ["break", "broke", "broken", "breaks"]
                    },
                    answer: "break",
                    hint: { B: "did 已經表示過去。", A: "一個動詞片語不需要重複標記過去式。" },
                    clue: "句中已有助動詞 did，主要動詞需使用原形 break。",
                    rule: "did／didn't 後面一律接原形動詞。",
                    steps: ["找到 did", "確認句子已表達過去", "把主要動詞還原", "選擇 break"]
                }),
                choice({
                    instruction: "請判斷兩個子句的關係。",
                    stem: "Because the road was wet, Dad drove slowly.",
                    options: {
                        B: ["原因在前，結果在後", "結果在前，原因在後", "兩件事沒有關係"],
                        A: ["原因在前，結果在後", "結果在前，原因在後", "前後都是原因", "前後都是結果"]
                    },
                    answer: "原因在前，結果在後",
                    hint: { B: "Because 放在句首。", A: "逗號前後分別扮演不同功能。" },
                    clue: "路面濕是原因，爸爸慢慢開車是結果。",
                    rule: "Because＋原因，結果。because 子句置於句首時，後面使用逗號。",
                    steps: ["找到 Because", "讀出原因：路面濕", "讀出結果：慢慢開", "確認原因在前"]
                })
            ],
            doctor: [
                choice({
                    instruction: { B: "找出正確句子。", A: "診斷 did 後的動詞形式，選出唯一正確句。" },
                    stem: "Why did Kevin went home early?",
                    options: {
                        B: ["Why did Kevin go home early?", "Why Kevin did go home early?", "Why did Kevin went home early?"],
                        A: ["Why did Kevin go home early?", "Why did Kevin went home early?", "Why Kevin did went home early?", "Why was Kevin go home early?"]
                    },
                    answer: "Why did Kevin go home early?",
                    hint: { B: "did 後面要接原形。", A: "did 已經負責標記過去式，主要動詞不能再變化。" },
                    clue: "went 必須改回原形 go。",
                    rule: "Why＋did＋主詞＋原形動詞？",
                    steps: ["保留 Why", "保留 did", "went 改成 go", "檢查主詞位置"]
                }),
                choice({
                    instruction: "找出正確的原因結果句。",
                    stem: "Because Amy was hungry, so she ate a sandwich.",
                    options: {
                        B: ["Because Amy was hungry, she ate a sandwich.", "Because Amy hungry, so she ate a sandwich.", "Amy was hungry because so she ate a sandwich."],
                        A: ["Because Amy was hungry, she ate a sandwich.", "Because Amy was hungry, so she ate a sandwich.", "Amy was hungry, because she ate a sandwich.", "Because was Amy hungry, she ate a sandwich."]
                    },
                    answer: "Because Amy was hungry, she ate a sandwich.",
                    hint: { B: "because 和 so 不可一起使用。", A: "刪除多餘連接詞後，再檢查原因與結果的方向。" },
                    clue: "句首已有 Because，因此結果句前不再加 so。",
                    rule: "中文的『因為……所以……』翻成英文時，只使用 because 或 so 其中一個。",
                    steps: ["找到 Because", "辨認 hungry 是原因", "刪除 so", "保留完整結果句"]
                }),
                choice({
                    instruction: "請修正動詞過去式。",
                    stem: "Dad buyed a new bike last week.",
                    options: {
                        B: ["Dad bought a new bike last week.", "Dad buy a new bike last week.", "Dad did bought a new bike last week."],
                        A: ["Dad bought a new bike last week.", "Dad buyed a new bike last week.", "Dad did bought a new bike last week.", "Dad was buy a new bike last week."]
                    },
                    answer: "Dad bought a new bike last week.",
                    hint: { B: "buy 是不規則動詞。", A: "肯定句直接使用 buy 的不規則過去式。" },
                    clue: "buy 的過去式是 bought，不是 buyed。",
                    rule: "一般動詞過去式肯定句使用動詞過去式；buy → bought。",
                    steps: ["找到 last week", "確認需要過去式", "回想 buy 的變化", "改成 bought"]
                }),
                choice({
                    instruction: "找出正確句子。",
                    stem: "Why didn't Tina ate lunch?",
                    options: {
                        B: ["Why didn't Tina eat lunch?", "Why doesn't Tina ate lunch?", "Why Tina didn't eat lunch?"],
                        A: ["Why didn't Tina eat lunch?", "Why didn't Tina ate lunch?", "Why did Tina not ate lunch?", "Why wasn't Tina eat lunch?"]
                    },
                    answer: "Why didn't Tina eat lunch?",
                    hint: { B: "didn't 後使用 eat。", A: "否定助動詞已經帶有過去式，主要動詞回到原形。" },
                    clue: "ate 必須改回原形 eat。",
                    rule: "didn't＋原形動詞。",
                    steps: ["找到 didn't", "確認 ate 重複標記過去", "改回 eat", "保留 Why 問句順序"]
                }),
                choice({
                    instruction: "請修正 because 的位置與標點。",
                    stem: "Because Leo was sick he went to the doctor.",
                    options: {
                        B: ["Because Leo was sick, he went to the doctor.", "Because, Leo was sick he went to the doctor.", "Leo because was sick, he went to the doctor."],
                        A: ["Because Leo was sick, he went to the doctor.", "Because Leo was sick he went, to the doctor.", "Because, Leo was sick, he went to the doctor.", "Leo was sick because, he went to the doctor."]
                    },
                    answer: "Because Leo was sick, he went to the doctor.",
                    hint: { B: "句首 because 子句結束後要加逗號。", A: "逗號應放在完整原因子句與結果子句之間。" },
                    clue: "Because Leo was sick 是完整原因子句。",
                    rule: "Because＋原因，結果。",
                    steps: ["找出原因子句", "找出結果子句", "在兩個子句間加逗號", "檢查句首大寫"]
                }),
                choice({
                    instruction: "找出原因與結果合理的句子。",
                    stem: "Mia missed the bus because she arrived at school late.",
                    options: {
                        B: ["Mia missed the bus, so she arrived at school late.", "Mia arrived at school late, so she missed the bus.", "Because Mia arrived late, so she missed the bus."],
                        A: ["Mia missed the bus, so she arrived at school late.", "Mia arrived at school late because she missed the bus after that.", "Because Mia missed the bus, so she arrived at school late.", "Mia missed the bus because she arrived at school late."]
                    },
                    answer: "Mia missed the bus, so she arrived at school late.",
                    hint: { B: "先發生沒搭上公車，後來才遲到。", A: "除了文法，也要檢查事件的先後與因果。" },
                    clue: "沒搭上公車是原因，到校遲到是結果。",
                    rule: "原因＋so＋結果；連接詞正確仍需符合事件邏輯。",
                    steps: ["判斷先發生的事", "找出造成的結果", "使用 so", "檢查前後邏輯"]
                }),
                choice({
                    instruction: "請修正不規則動詞。",
                    stem: "The girl catched the ball yesterday.",
                    options: {
                        B: ["The girl caught the ball yesterday.", "The girl catch the ball yesterday.", "The girl did caught the ball yesterday."],
                        A: ["The girl caught the ball yesterday.", "The girl catched the ball yesterday.", "The girl did caught the ball yesterday.", "The girl was caught the ball yesterday."]
                    },
                    answer: "The girl caught the ball yesterday.",
                    hint: { B: "catch 的過去式是 caught。", A: "本句是主動肯定句，直接使用不規則過去式。" },
                    clue: "catch → caught。",
                    rule: "catch 是不規則動詞，過去式不能直接加 ed。",
                    steps: ["找到 yesterday", "確認肯定句", "回想 catch 的過去式", "改成 caught"]
                }),
                choice({
                    instruction: "找出正確問答。",
                    context: "A: Why did Sam sell his old computer?",
                    stem: "B 的回答哪一句正確？",
                    options: {
                        B: ["He sold it because he needed money.", "He sold it because he need money.", "Because he needed money, so he sold it."],
                        A: ["He sold it because he needed money.", "He did sold it because he needed money.", "Because he needed money, so he sold it.", "He sold it, so he needed money."]
                    },
                    answer: "He sold it because he needed money.",
                    hint: { B: "原因句中的 need 也發生在過去。", A: "檢查兩個動詞的時態與因果方向。" },
                    clue: "賣電腦與需要錢都是過去情境。",
                    rule: "回答 Why 時可使用結果＋because＋原因，過去事件的動詞要使用過去式。",
                    steps: ["用 because 回答原因", "保留 sold", "need 改成 needed", "檢查只用一個連接詞"]
                }),
                choice({
                    instruction: "找出正確的 so 句型。",
                    stem: "It rained heavily so we stayed home.",
                    options: {
                        B: ["It rained heavily, so we stayed home.", "It rained heavily because, we stayed home.", "Because it rained heavily, so we stayed home."],
                        A: ["It rained heavily, so we stayed home.", "It rained heavily so, we stayed home.", "Because it rained heavily, so we stayed home.", "It rained heavily, because we stayed home."]
                    },
                    answer: "It rained heavily, so we stayed home.",
                    hint: { B: "so 前通常加逗號。", A: "逗號放在原因子句結束、so 開始的位置。" },
                    clue: "下大雨是原因，待在家是結果。",
                    rule: "原因＋逗號＋so＋結果。",
                    steps: ["找出原因子句", "找出 so", "在 so 前加逗號", "保留結果句"]
                }),
                choice({
                    instruction: "請修正 Why 問句。",
                    stem: "Why you did leave the party early?",
                    options: {
                        B: ["Why did you leave the party early?", "Why you left the party early?", "Why were you leave the party early?"],
                        A: ["Why did you leave the party early?", "Why did you left the party early?", "Why you did leave the party early?", "Why were you left the party early?"]
                    },
                    answer: "Why did you leave the party early?",
                    hint: { B: "did 要放在主詞 you 前面。", A: "檢查疑問詞、助動詞、主詞與原形動詞的完整順序。" },
                    clue: "正確順序是 Why＋did＋主詞＋原形動詞。",
                    rule: "疑問詞問句仍須使用問句倒裝。",
                    steps: ["Why 放句首", "did 放主詞前", "接主詞 you", "leave 使用原形"]
                })
            ],
            transform: [
                reorder({
                    instruction: "依序排列成正確的 Why 過去式問句。",
                    stem: "你昨天為什麼走路上學？",
                    tokens: ["Why", "did", "you", "walk", "to school", "yesterday", "?"],
                    answer: "Why did you walk to school yesterday?",
                    hint: { B: "先排 Why did you。", A: "疑問詞後依序放助動詞、主詞、原形動詞與時間。" },
                    clue: "did 後面使用原形 walk。",
                    rule: "Why＋did＋主詞＋原形動詞＋其他？",
                    steps: ["Why 放最前面", "接 did 與主詞", "放原形動詞 walk", "最後放時間與問號"]
                }),
                reorder({
                    instruction: "排列成使用 because 的完整回答。",
                    stem: "我走路上學，因為我的腳踏車壞了。",
                    tokens: ["I", "walked", "to school", "because", "my bike", "was broken", "."],
                    answer: "I walked to school because my bike was broken.",
                    hint: { B: "先排結果，再用 because 接原因。", A: "兩個子句都要有主詞與動詞。" },
                    clue: "走路上學是結果，腳踏車壞掉是原因。",
                    rule: "結果＋because＋原因。",
                    steps: ["先排 I walked to school", "加入 because", "排出 my bike was broken", "句尾加句點"]
                }),
                reorder({
                    instruction: "排列成使用 so 的原因結果句。",
                    stem: "我起床晚了，所以錯過公車。",
                    tokens: ["I", "got up late", ",", "so", "I", "missed", "the bus", "."],
                    answer: "I got up late, so I missed the bus.",
                    hint: { B: "原因放前面，so 後放結果。", A: "注意 so 前的逗號，以及 missed 的過去式。" },
                    clue: "晚起是原因，錯過公車是結果。",
                    rule: "原因＋逗號＋so＋結果。",
                    steps: ["排出原因子句", "放逗號與 so", "排出結果子句", "檢查過去式"]
                }),
                reorder({
                    instruction: "用 Because 開頭重新排列。",
                    stem: "因為天氣很冷，我們待在家。",
                    tokens: ["Because", "the weather", "was cold", ",", "we", "stayed", "home", "."],
                    answer: "Because the weather was cold, we stayed home.",
                    hint: { B: "Because 後先放原因。", A: "原因子句結束後加逗號，再接結果。" },
                    clue: "the weather was cold 是原因子句。",
                    rule: "Because＋原因，結果。",
                    steps: ["Because 放句首", "完成原因子句", "加入逗號", "完成結果子句"]
                }),
                reorder({
                    instruction: "排列成正確的否定原因問句。",
                    stem: "她昨天為什麼沒有來上學？",
                    tokens: ["Why", "didn't", "she", "come", "to school", "yesterday", "?"],
                    answer: "Why didn't she come to school yesterday?",
                    hint: { B: "didn't 後面使用 come。", A: "注意 come 不可改成 came。" },
                    clue: "didn't 已經表示過去與否定。",
                    rule: "Why＋didn't＋主詞＋原形動詞？",
                    steps: ["放 Why didn't", "接主詞 she", "使用原形 come", "加入地點、時間與問號"]
                }),
                choice({
                    instruction: "把 because 句改寫成 so 句。",
                    stem: "Nina stayed home because she was sick.",
                    options: {
                        B: ["Nina was sick, so she stayed home.", "Nina stayed home, so she was sick.", "Because Nina was sick, so she stayed home."],
                        A: ["Nina was sick, so she stayed home.", "Nina stayed home, so she was sick.", "Nina was sick because she stayed home.", "Because Nina was sick, so she stayed home."]
                    },
                    answer: "Nina was sick, so she stayed home.",
                    hint: { B: "改用 so 時，原因要放前面。", A: "改寫後語意必須維持不變。" },
                    clue: "生病仍是原因，待在家仍是結果。",
                    rule: "結果＋because＋原因，可改為原因＋so＋結果。",
                    steps: ["找出原因 sick", "把原因移到前面", "加入 so", "把結果放後面"]
                }),
                choice({
                    instruction: "把 so 句改寫成 because 句。",
                    stem: "Tom had no money, so he couldn't buy lunch.",
                    options: {
                        B: ["Tom couldn't buy lunch because he had no money.", "Tom had no money because he couldn't buy lunch.", "Because Tom had no money, so he couldn't buy lunch."],
                        A: ["Tom couldn't buy lunch because he had no money.", "Tom had no money because he couldn't buy lunch.", "Tom couldn't buy lunch, because so he had no money.", "Because Tom couldn't buy lunch, he had no money."]
                    },
                    answer: "Tom couldn't buy lunch because he had no money.",
                    hint: { B: "使用 because 時，結果可以放前面。", A: "確認沒錢是原因，而不是買不到午餐造成沒錢。" },
                    clue: "沒錢造成無法買午餐。",
                    rule: "原因＋so＋結果，可改為結果＋because＋原因。",
                    steps: ["找出結果 couldn't buy", "把結果放前面", "加入 because", "把原因放後面"]
                }),
                reorder({
                    instruction: "排列成過去式的原因問答。",
                    context: "A: Why did Ben run home?",
                    stem: "B：因為他忘了帶作業。",
                    tokens: ["He", "ran home", "because", "he", "forgot", "his homework", "."],
                    answer: "He ran home because he forgot his homework.",
                    hint: { B: "run 與 forget 都要使用過去式。", A: "結果與原因都是過去發生的事件。" },
                    clue: "ran 是 run 的過去式，forgot 是 forget 的過去式。",
                    rule: "回答過去的 Why 問句時，相關動作通常都使用過去式。",
                    steps: ["先排結果 He ran home", "加入 because", "排出原因子句", "檢查兩個不規則動詞"]
                }),
                choice({
                    instruction: "選出與原句意思相同的句子。",
                    stem: "Because Dad was busy, he didn't cook dinner.",
                    options: {
                        B: ["Dad didn't cook dinner because he was busy.", "Dad was busy because he didn't cook dinner.", "Dad didn't cook dinner, so he was busy."],
                        A: ["Dad didn't cook dinner because he was busy.", "Dad was busy because he didn't cook dinner.", "Dad didn't cook dinner, so he was busy.", "Because Dad didn't cook dinner, he was busy."]
                    },
                    answer: "Dad didn't cook dinner because he was busy.",
                    hint: { B: "只交換兩個子句的位置，不改變因果。", A: "忙碌是原因，沒有煮晚餐是結果。" },
                    clue: "because 可放句首或句中。",
                    rule: "Because＋原因，結果＝結果＋because＋原因。",
                    steps: ["找出原因 busy", "找出結果 didn't cook", "把結果移到前面", "用 because 接原因"]
                }),
                reorder({
                    instruction: "排列成正確的 Why 問句。",
                    stem: "你今天早上為什麼沒吃早餐？",
                    tokens: ["Why", "didn't", "you", "eat", "breakfast", "this morning", "?"],
                    answer: "Why didn't you eat breakfast this morning?",
                    hint: { B: "先排 Why didn't you。", A: "時間放在句尾，eat 維持原形。" },
                    clue: "didn't 後接原形 eat。",
                    rule: "Why＋didn't＋主詞＋原形動詞＋受詞＋時間？",
                    steps: ["排出 Why didn't", "接主詞 you", "放 eat breakfast", "最後放時間與問號"]
                })
            ],
            dialogue: [
                choice({
                    instruction: "依照問句選出最合理的回答。",
                    context: "A: Why did you walk to school yesterday?",
                    stem: "B 應該怎麼回答？",
                    options: {
                        B: ["Because my bike was broken.", "Yes, I walked.", "At seven thirty."],
                        A: ["Because my bike was broken.", "Because did my bike break.", "My bike was broken, because I walked.", "Yes, I did because."]
                    },
                    answer: "Because my bike was broken.",
                    hint: { B: "Why 要回答原因。", A: "選出包含完整原因子句且語序正確的回答。" },
                    clue: "腳踏車壞了能合理說明為何走路上學。",
                    rule: "Why 問句可用 Because＋完整子句回答。",
                    steps: ["確認問的是原因", "找合理原因", "使用 because", "檢查主詞與動詞"]
                }),
                choice({
                    instruction: "依照情境選出正確回答。",
                    context: "A: Why didn't May join us for lunch?",
                    stem: "B 應該怎麼回答？",
                    options: {
                        B: ["She didn't join you because she was busy.", "She doesn't join you yesterday.", "Yes, she didn't."],
                        A: ["She didn't join you because she was busy.", "She didn't joined you because she was busy.", "Because she was busy, so she didn't join you.", "She was busy because she didn't join you."]
                    },
                    answer: "She didn't join you because she was busy.",
                    hint: { B: "用 because 說明她很忙。", A: "檢查 didn't 後的動詞、連接詞及因果方向。" },
                    clue: "忙碌是沒有一起吃午餐的原因。",
                    rule: "didn't＋原形動詞；結果＋because＋原因。",
                    steps: ["以 she 回答", "使用 didn't join", "加入 because", "補上原因 she was busy"]
                }),
                choice({
                    instruction: "選出最自然的對話。",
                    context: "A: Why was Ken late for class?",
                    stem: "B 應該怎麼回答？",
                    options: {
                        B: ["He missed the bus, so he was late.", "He was late because he arrived early.", "He misses the bus tomorrow."],
                        A: ["He missed the bus, so he was late.", "Because he missed the bus, so he was late.", "He was late, so he missed the bus before that.", "He did missed the bus, so he was late."]
                    },
                    answer: "He missed the bus, so he was late.",
                    hint: { B: "先發生錯過公車，後來才遲到。", A: "檢查因果順序、連接詞數量與過去式。" },
                    clue: "錯過公車合理造成遲到。",
                    rule: "原因＋so＋結果。",
                    steps: ["找出原因 missed the bus", "找出結果 was late", "用 so 連接", "確認過去式"]
                }),
                choice({
                    instruction: "選出符合前後文的回答。",
                    context: "A: Why did Lily go to the doctor?",
                    stem: "B 應該怎麼回答？",
                    options: {
                        B: ["She went there because her leg hurt.", "She goes there every day.", "At the hospital."],
                        A: ["She went there because her leg hurt.", "She did went there because her leg hurted.", "Her leg hurt, because she went there.", "Because her leg hurt, so she went there."]
                    },
                    answer: "She went there because her leg hurt.",
                    hint: { B: "hurt 的原形與過去式相同。", A: "注意 went 與 hurt 的不規則變化，並檢查因果方向。" },
                    clue: "腿痛是去看醫生的原因。",
                    rule: "hurt 的原形與過去式同形；because 後接原因。",
                    steps: ["以 she 回答", "使用 went", "加入 because", "使用過去式 hurt"]
                }),
                choice({
                    instruction: "選出正確且合理的句子。",
                    context: "昨天停電，Jack 沒有完成作業。",
                    stem: "哪一句最適合？",
                    options: {
                        B: ["The power went out, so Jack didn't finish his homework.", "Jack didn't finish his homework, so the power went out.", "The power goes out tomorrow."],
                        A: ["The power went out, so Jack didn't finish his homework.", "Because the power went out, so Jack didn't finish his homework.", "Jack didn't finished his homework because the power went out.", "The power did went out, so Jack didn't finish his homework."]
                    },
                    answer: "The power went out, so Jack didn't finish his homework.",
                    hint: { B: "停電是原因，沒完成作業是結果。", A: "同時檢查 go、didn't 後的動詞及連接詞。" },
                    clue: "went out 與 didn't finish 都正確表達過去。",
                    rule: "原因＋so＋結果；didn't 後接原形 finish。",
                    steps: ["找出原因 power went out", "加入 so", "使用 didn't finish", "確認事件順序"]
                }),
                choice({
                    instruction: "依照回答選出原問句。",
                    context: "B: I sold my old phone because I needed money.",
                    stem: "A 最可能問什麼？",
                    options: {
                        B: ["Why did you sell your old phone?", "What did you buy?", "Did you need a phone?"],
                        A: ["Why did you sell your old phone?", "Why did you sold your old phone?", "Why were you sell your old phone?", "How did your old phone sell you?"]
                    },
                    answer: "Why did you sell your old phone?",
                    hint: { B: "回答中使用 because 說明原因。", A: "需要 Why 問句，且 did 後使用 sell。" },
                    clue: "because I needed money 回答了賣手機的原因。",
                    rule: "問過去事件原因：Why＋did＋主詞＋原形動詞？",
                    steps: ["看到 because 回答", "選 Why", "加入 did you", "使用原形 sell"]
                }),
                choice({
                    instruction: "選出最合理的回應。",
                    context: "A: I couldn't sleep last night.",
                    stem: "B 應該怎麼回應？",
                    options: {
                        B: ["Why couldn't you sleep?", "Why don't you slept?", "Because you slept well."],
                        A: ["Why couldn't you sleep?", "Why didn't you could sleep?", "Why couldn't you slept?", "Why you couldn't sleep?"]
                    },
                    answer: "Why couldn't you sleep?",
                    hint: { B: "couldn't 後接原形 sleep。", A: "含 be 或情態助動詞的問句，不再加入 did。" },
                    clue: "couldn't 已經是過去式情態助動詞。",
                    rule: "Why＋couldn't＋主詞＋原形動詞？",
                    steps: ["使用 Why 詢問原因", "把 couldn't 放主詞前", "接主詞 you", "使用原形 sleep"]
                }),
                choice({
                    instruction: "選出能完成對話的句子。",
                    context: "A: Did Emma come to school yesterday?",
                    stem: "B 應該怎麼回答？",
                    options: {
                        B: ["No, she didn't. She was sick, so she stayed home.", "No, she doesn't. She stayed home tomorrow.", "Yes, she was because."],
                        A: ["No, she didn't. She was sick, so she stayed home.", "No, she didn't came because she was sick.", "No, she wasn't. Because she was sick, so she stayed home.", "No, she didn't. She stayed home, so she was sick."]
                    },
                    answer: "No, she didn't. She was sick, so she stayed home.",
                    hint: { B: "Did 問句用 didn't 簡答，再說明因果。", A: "檢查簡答、時間一致性與因果方向。" },
                    clue: "生病造成待在家，因此沒有來上學。",
                    rule: "Did 問句用 did／didn't 回答；原因＋so＋結果。",
                    steps: ["先用 didn't 簡答", "說出原因 was sick", "使用 so", "補上結果 stayed home"]
                }),
                choice({
                    instruction: "選出正確的生活情境句。",
                    context: "Ryan 忘了帶雨傘，因此淋濕了。",
                    stem: "哪一句最適合？",
                    options: {
                        B: ["Ryan forgot his umbrella, so he got wet.", "Ryan got wet because he brought an umbrella.", "Ryan forgets his umbrella yesterday."],
                        A: ["Ryan forgot his umbrella, so he got wet.", "Ryan forgot his umbrella because he got wet before that.", "Because Ryan forgot his umbrella, so he got wet.", "Ryan did forgot his umbrella, so he get wet."]
                    },
                    answer: "Ryan forgot his umbrella, so he got wet.",
                    hint: { B: "forgot 是 forget 的過去式。", A: "確認 forgot、got 的形式及事件先後。" },
                    clue: "忘記雨傘是原因，淋濕是結果。",
                    rule: "forget → forgot；get → got；原因＋so＋結果。",
                    steps: ["使用 forgot 表達原因", "加入 so", "使用 got wet 表達結果", "檢查不規則動詞"]
                }),
                choice({
                    instruction: "選出最自然的回答。",
                    context: "A: Why did your team win the game?",
                    stem: "B 應該怎麼回答？",
                    options: {
                        B: ["Because we practiced hard.", "So we practiced hard.", "Yes, we did win why."],
                        A: ["Because we practiced hard.", "Because we practice hard yesterday.", "We won, so we practiced hard before it.", "Because we practiced hard, so we won."]
                    },
                    answer: "Because we practiced hard.",
                    hint: { B: "Why 問原因，可用 Because 回答。", A: "選擇時態正確、只用一個連接詞且邏輯合理的答案。" },
                    clue: "努力練習是贏得比賽的原因。",
                    rule: "Because＋主詞＋過去式動詞，可直接回答過去的 Why 問句。",
                    steps: ["確認問的是原因", "找出合理原因", "使用 Because", "practice 改為 practiced"]
                })
            ]
        }
    };
})();
