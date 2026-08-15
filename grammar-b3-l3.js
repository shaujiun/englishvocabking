(() => {
    "use strict";

    const choice = (stem, optionsB, optionsA, answer, hintB, hintA, clue, rule, steps, extra = {}) => ({
        type: "choice",
        instruction: extra.instruction || "請選出正確答案。",
        context: extra.context || "",
        stem,
        options: { B: optionsB, A: optionsA },
        answer,
        hint: { B: hintB, A: hintA },
        clue,
        rule,
        steps
    });

    const reorder = (stem, tokens, answer, hintB, hintA, clue, rule, steps, extra = {}) => ({
        type: "reorder",
        instruction: extra.instruction || "請依序排列成正確句子。",
        context: extra.context || "",
        stem,
        tokens,
        answer,
        hint: { B: hintB, A: hintA },
        clue,
        rule,
        steps
    });

    window.B3_L3_GRAMMAR = {
        code: "L3",
        label: "第 3 課",
        kicker: "B3・LESSON 3",
        title: "時間交會文法冒險",
        description: "練習過去進行式、What was／were ... doing、when／while、before／after 與時間讀法。每回合 10 題，從時間線索判斷動作先後。",
        stageDescriptions: {
            classification: "辨認過去進行式、短動作與長動作，以及事件的先後關係。",
            doctor: "修正 was／were、V-ing、when／while 與 before／after 的常見錯誤。",
            transform: "重組過去進行式問答，並改寫時間子句與時間說法。",
            dialogue: "從生活對話判斷某時正在進行的動作及插入事件。"
        },
        summarySteps: ["先找過去時間線索", "判斷持續動作或短動作", "檢查 was／were＋V-ing", "確認 when／while 與先後順序"],
        questionBank: {
            classification: [
                choice(
                    "Mia was doing her homework at eight last night.",
                    ["過去進行式肯定句", "一般過去式肯定句", "現在進行式肯定句"],
                    ["過去進行式肯定句", "一般過去式肯定句", "現在完成式肯定句", "過去進行式疑問句"],
                    "過去進行式肯定句",
                    "找 was doing 與 last night。", "判斷 was 在此是否協助 V-ing 表達當時持續的動作。",
                    "was doing 表示過去某時正在進行。", "過去進行式為 was／were＋V-ing。",
                    ["找到 last night", "找到 was doing", "確認主詞 Mia 為單數", "判斷為過去進行式"]
                ),
                choice(
                    "What were they doing at that time?",
                    ["詢問過去某時正在做什麼", "詢問每天的習慣", "詢問已完成的結果"],
                    ["詢問過去某時正在做什麼", "詢問現在正在做什麼", "詢問過去做完了什麼", "詢問未來要做什麼"],
                    "詢問過去某時正在做什麼",
                    "were doing 是重要線索。", "同時觀察 What、were doing 與 at that time。",
                    "at that time 指過去的特定時點。", "What＋was／were＋主詞＋V-ing？用來詢問過去正在進行的動作。",
                    ["找到 What", "辨認 were doing", "找到 at that time", "判斷問句功能"]
                ),
                choice(
                    "I was taking a shower when the phone rang.",
                    ["洗澡是持續動作，電話響是短動作", "電話響是持續動作", "兩件事都是未來動作"],
                    ["洗澡是持續動作，電話響是短動作", "洗澡是短動作，電話響是持續動作", "兩件事同時持續且都用進行式", "電話先響完才開始洗澡"],
                    "洗澡是持續動作，電話響是短動作",
                    "was taking 表示持續，rang 表示插入。", "比較 was taking 與 rang 的動詞形式。",
                    "洗澡進行到一半時，電話突然響起。", "持續中的動作用過去進行式；插入的短動作用一般過去式。",
                    ["找到 was taking", "找到 rang", "判斷長短動作", "畫出插入關係"]
                ),
                choice(
                    "While Dad was cooking, Mom was setting the table.",
                    ["兩個動作在過去同時進行", "一件事完成後才發生另一件", "兩件事都是現在習慣"],
                    ["兩個動作在過去同時進行", "Dad 的動作先完成", "Mom 的動作先完成", "兩個動作都只是瞬間發生"],
                    "兩個動作在過去同時進行",
                    "兩邊都有 was＋V-ing。", "while 常連接兩個同時延續的過去動作。",
                    "做飯與擺餐具在同一段時間進行。", "兩個過去同時持續的動作可用 while 連接，兩邊皆用過去進行式。",
                    ["找到 While", "檢查 was cooking", "檢查 was setting", "判斷同時進行"]
                ),
                choice(
                    "When Ben arrived home, his sister was watching TV.",
                    ["Ben 到家時，妹妹正在看電視", "妹妹看完電視後 Ben 才到家", "Ben 與妹妹都正在到家"],
                    ["Ben 到家時，妹妹正在看電視", "Ben 到家是持續動作", "妹妹看電視是瞬間動作", "兩個動作都在抵達前完成"],
                    "Ben 到家時，妹妹正在看電視",
                    "arrived 是短動作，was watching 是持續動作。", "利用一般過去式與過去進行式定位時間點。",
                    "Ben 抵達的時間點落在妹妹看電視的期間。", "when 可引導插入持續動作的短事件。",
                    ["找到 arrived", "找到 was watching", "判斷抵達是時間點", "解讀為當時正在看"]
                ),
                choice(
                    "Amy washed her face before she went to bed.",
                    ["先洗臉，再上床睡覺", "先睡覺，再洗臉", "兩件事同時發生"],
                    ["先洗臉，再上床睡覺", "先上床，再洗臉", "洗臉期間一直睡覺", "無法判斷先後"],
                    "先洗臉，再上床睡覺",
                    "before 前面的事較早發生。", "把 before 兩側的事件放上時間線。",
                    "washed her face 發生在 went to bed 之前。", "A before B 表示 A 先發生，B 後發生。",
                    ["找出事件 A：洗臉", "找到 before", "找出事件 B：睡覺", "判斷 A 在 B 前"]
                ),
                choice(
                    "After Leo finished his homework, he played basketball.",
                    ["先完成作業，再打籃球", "先打籃球，再完成作業", "一邊寫作業一邊打球"],
                    ["先完成作業，再打籃球", "先打籃球，再完成作業", "兩件事同時持續", "只知道打球，無法判斷作業"],
                    "先完成作業，再打籃球",
                    "After 引導先完成的事件。", "句首 After 子句提供較早的事件。",
                    "finished homework 是打球前完成的事。", "After A, B 表示 A 先發生，B 後發生。",
                    ["找到 After 子句", "讀出 finished homework", "讀出 played basketball", "排列先後"]
                ),
                choice(
                    "It is a quarter past five.",
                    ["5:15", "5:45", "4:45"],
                    ["5:15", "5:45", "4:15", "6:15"],
                    "5:15",
                    "a quarter 是 15 分鐘，past 表示超過。", "以五點為基準，往後增加十五分鐘。",
                    "a quarter past five 是五點過十五分。", "1 到 30 分可用分鐘＋past＋小時。",
                    ["quarter 換成 15", "past 判斷為加", "從 five 開始", "得到 5:15"]
                ),
                choice(
                    "It is twenty to seven.",
                    ["6:40", "7:20", "7:40"],
                    ["6:40", "7:20", "7:40", "6:20"],
                    "6:40",
                    "to seven 表示距離七點還有多久。", "從 7:00 往前推 twenty minutes。",
                    "七點前二十分鐘是六點四十分。", "31 到 59 分可用距離下一個整點的分鐘＋to＋下一小時。",
                    ["找到下一整點 seven", "twenty 是 20 分", "從 7:00 往前推", "得到 6:40"]
                ),
                choice(
                    "The students were studying at nine yesterday morning.",
                    ["九點當下正在讀書", "九點前已經讀完", "每天九點都讀書"],
                    ["九點當下正在讀書", "九點時剛完成讀書", "九點以後才開始讀書", "描述現在的讀書習慣"],
                    "九點當下正在讀書",
                    "were studying 指某時正在進行。", "at nine 是明確時點，不等於完成時間。",
                    "動作跨越九點這個時間點。", "過去進行式著重過去某時正在進行，不強調完成。",
                    ["找到 yesterday morning", "找到 at nine", "辨認 were studying", "判斷為當下進行"]
                )
            ],
            doctor: [
                choice("Mia were reading at eight last night.", ["Mia was reading at eight last night.", "Mia did reading at eight last night.", "Mia was read at eight last night."], ["Mia was reading at eight last night.", "Mia were reading at eight last night.", "Mia was read at eight last night.", "Mia did reading at eight last night."], "Mia was reading at eight last night.", "Mia 是單數，使用 was。", "先配對主詞與 be 動詞，再檢查 V-ing。", "Mia 搭配 was。", "過去進行式：單數主詞＋was＋V-ing。", ["找到主詞 Mia", "選擇 was", "保留 reading", "檢查時間詞"]),
                choice("What was your parents doing then?", ["What were your parents doing then?", "What did your parents doing then?", "What were your parents do then?"], ["What were your parents doing then?", "What was your parents doing then?", "What did your parents doing then?", "What were your parents do then?"], "What were your parents doing then?", "parents 是複數。", "複數主詞需搭配 were，後接 doing。", "your parents 搭配 were。", "What＋were＋複數主詞＋V-ing？", ["找到 parents", "判斷為複數", "was 改為 were", "保留 doing"]),
                choice("I was study English at that time.", ["I was studying English at that time.", "I studied English at that time now.", "I was studied English at that time."], ["I was studying English at that time.", "I was study English at that time.", "I did studying English at that time.", "I were studying English at that time."], "I was studying English at that time.", "was 後面接 V-ing。", "study 需去 y 嗎？請套用一般加 ing 的規則。", "study 直接加 ing 成 studying。", "過去進行式不可使用 was＋原形或 was＋過去式。", ["保留主詞 I", "使用 was", "study 改為 studying", "保留過去時間"]),
                choice("When Mom came home, I did my homework.", ["When Mom came home, I was doing my homework.", "When Mom was coming home, I was did my homework.", "When Mom came home, I am doing my homework."], ["When Mom came home, I was doing my homework.", "When Mom came home, I did my homework at that exact moment.", "When Mom was come home, I was doing my homework.", "When Mom came home, I were doing my homework."], "When Mom came home, I was doing my homework.", "題意是媽媽到家時，作業正在進行。", "短動作 came 插入持續動作 was doing。", "到家是時間點，寫作業跨越該時間點。", "when＋一般過去式，主句常用過去進行式表示當時正在進行。", ["找短動作 came", "找持續動作 do homework", "改成 was doing", "檢查主詞 I"]),
                choice("While Dad cooked, I was washing the dishes.", ["While Dad was cooking, I was washing the dishes.", "While Dad was cook, I washed the dishes.", "While Dad did cooking, I was washing the dishes."], ["While Dad was cooking, I was washing the dishes.", "While Dad cooked, I was washing the dishes.", "While Dad was cooking, I washed the dishes after he finished.", "While Dad were cooking, I was washing the dishes."], "While Dad was cooking, I was washing the dishes.", "while 連接兩個同時持續動作。", "兩側都應使用 was／were＋V-ing。", "做飯與洗碗在同一段時間進行。", "while 常搭配兩個過去進行式。", ["找到 While", "確認兩動作同時持續", "cooked 改 was cooking", "保留 was washing"]),
                choice("Because the bell rang while we were taking a test.", ["The bell rang while we were taking a test.", "While the bell rang, we took a test.", "The bell was rang when we taking a test."], ["The bell rang while we were taking a test.", "The bell was ringing while we took a test for one second.", "Because the bell rang while we were taking a test.", "The bell did rang while we were taking a test."], "The bell rang while we were taking a test.", "原句只有 because 子句，缺少主要句。", "若只是描述插入事件，不需要 because。", "鈴響發生在考試進行期間。", "短動作＋while＋過去進行式可構成完整句。", ["檢查原句是否完整", "移除多餘 Because", "保留 rang", "保留 were taking"]),
                choice("After Amy ate breakfast, she brushes her teeth.", ["After Amy ate breakfast, she brushed her teeth.", "After Amy eating breakfast, she brushed her teeth.", "After Amy ate breakfast, she brush her teeth yesterday."], ["After Amy ate breakfast, she brushed her teeth.", "After Amy ate breakfast, she brushes her teeth.", "After Amy had breakfast, she is brushing her teeth yesterday.", "After Amy did ate breakfast, she brushed her teeth."], "After Amy ate breakfast, she brushed her teeth.", "兩件事都發生在過去。", "after 兩側的動詞時態需符合相同過去情境。", "吃早餐與刷牙均為已發生的動作。", "敘述過去先後事件時，兩側可使用一般過去式。", ["找到 ate", "判斷整句為過去", "brushes 改 brushed", "確認先後順序"]),
                choice("Before Leo went to bed, he finished his homework after.", ["Leo finished his homework before he went to bed.", "Leo went to bed before he finished his homework first.", "Before Leo went to bed after he finished homework."], ["Leo finished his homework before he went to bed.", "Before Leo finished his homework, he went to bed before.", "Leo finished his homework after he went to bed before.", "Leo did finished his homework before he went to bed."], "Leo finished his homework before he went to bed.", "before 已表達先後，不需再加 after。", "保留一個時間連接詞並確認作業先完成。", "完成作業在上床前。", "A before B 已足以表達 A 先、B 後。", ["找較早事件 finished", "找較晚事件 went", "只保留 before", "刪除多餘 after"]),
                choice("It is a quarter to six, so it is 6:15.", ["It is a quarter to six, so it is 5:45.", "It is a quarter past six, so it is 5:45.", "It is fifteen to five, so it is 6:15."], ["It is a quarter to six, so it is 5:45.", "It is a quarter to six, so it is 6:15.", "It is a quarter past six, so it is 5:45.", "It is forty-five to six, so it is 5:15."], "It is a quarter to six, so it is 5:45.", "to six 是六點以前。", "從 6:00 往前推 15 分鐘。", "a quarter to six＝5:45。", "quarter 是 15 分鐘；to 表示距離下一整點。", ["quarter 換成 15", "找到 six", "向前推 15 分", "得到 5:45"]),
                choice("What did you doing at nine yesterday?", ["What were you doing at nine yesterday?", "What did you do at nine yesterday doing?", "What was you doing at nine yesterday?"], ["What were you doing at nine yesterday?", "What did you doing at nine yesterday?", "What were you do at nine yesterday?", "What was you doing at nine yesterday?"], "What were you doing at nine yesterday?", "詢問當時正在做什麼，要用 were doing。", "不要混用 did 與 V-ing。", "you 搭配 were。", "What＋were＋you＋doing＋過去時間？", ["確認詢問進行中動作", "移除 did", "改用 were", "保留 doing"])
            ],
            transform: [
                reorder("你昨晚八點正在做什麼？", ["What", "were", "you", "doing", "at eight", "last night", "?"], "What were you doing at eight last night?", "先排 What were you doing。", "疑問詞後接 were、主詞與 V-ing。", "you 搭配 were。", "What＋were＋主詞＋V-ing＋時間？", ["放 What", "接 were you", "加入 doing", "最後放時間與問號"]),
                reorder("當時我正在房間讀書。", ["I", "was", "reading", "in my room", "then", "."], "I was reading in my room then.", "I 後用 was reading。", "地點通常放在時間 then 前。", "was reading 表達當時正在讀。", "主詞＋was／were＋V-ing＋地點＋時間。", ["先放主詞 I", "接 was reading", "加入地點", "最後放 then"]),
                reorder("媽媽到家時，我正在洗澡。", ["I", "was taking", "a shower", "when", "Mom", "came home", "."], "I was taking a shower when Mom came home.", "先排正在進行的洗澡，再接 when。", "持續動作用過去進行式，短動作用一般過去式。", "媽媽到家插入洗澡的期間。", "過去進行式＋when＋一般過去式。", ["排 I was taking", "補 a shower", "加入 when", "排 Mom came home"]),
                reorder("爸爸做飯時，我正在寫作業。", ["While", "Dad", "was cooking", ",", "I", "was doing", "my homework", "."], "While Dad was cooking, I was doing my homework.", "While 後先放爸爸正在做的事。", "兩個同時持續動作都用過去進行式。", "兩件事在同一段過去時間進行。", "While＋過去進行式，過去進行式。", ["放 While Dad", "接 was cooking", "加入逗號", "排 I was doing homework"]),
                reorder("我上床睡覺前先刷牙。", ["I", "brushed", "my teeth", "before", "I", "went to bed", "."], "I brushed my teeth before I went to bed.", "先排刷牙，再接 before。", "before 前為較早事件，後為較晚事件。", "刷牙先發生，上床後發生。", "A before B 表示 A 先於 B。", ["排 I brushed", "加入 my teeth", "放 before", "排 I went to bed"]),
                choice("When the teacher came in, the students were talking.", ["The students were talking when the teacher came in.", "The students talked after the teacher came in every day.", "The teacher was coming in when students talk."], ["The students were talking when the teacher came in.", "The students talked when the teacher was come in.", "The teacher came in because the students were talking after it.", "The students did talking when the teacher came in."], "The students were talking when the teacher came in.", "交換子句位置，意思不變。", "保留 talking 為持續動作、came 為短動作。", "when 子句可放句首或句中。", "When＋短動作，持續動作＝持續動作＋when＋短動作。", ["找持續動作", "移到句首", "加入 when", "保留短動作 came"]),
                choice("After Nina finished lunch, she went back to class.", ["Nina went back to class after she finished lunch.", "Nina finished lunch after she went back to class.", "Nina was going back while she finishes lunch."], ["Nina went back to class after she finished lunch.", "Nina finished lunch after she went back to class.", "After Nina went back to class, she finished lunch before that.", "Nina did went back after she finished lunch."], "Nina went back to class after she finished lunch.", "把結果放前面，after 子句放後面。", "改寫後仍要維持先吃完、再回教室。", "after 子句可放句中。", "After A, B＝B after A。", ["找先發生的 finished", "找後發生的 went", "先放 went 子句", "用 after 接 finished 子句"]),
                choice("It is six forty-five.", ["It is a quarter to seven.", "It is a quarter past seven.", "It is fifteen past six."], ["It is a quarter to seven.", "It is a quarter past seven.", "It is fifteen to six.", "It is forty-five past seven."], "It is a quarter to seven.", "6:45 距離 7:00 還有 15 分鐘。", "找下一個整點，再用 quarter to。", "6:45＝七點前十五分。", "45 分可說 a quarter to 下一個小時。", ["確認分鐘是 45", "找下一整點 seven", "換算差 15 分", "使用 quarter to"]),
                choice("It is nine fifteen.", ["It is a quarter past nine.", "It is a quarter to nine.", "It is fifteen to ten."], ["It is a quarter past nine.", "It is a quarter to nine.", "It is forty-five past nine.", "It is a quarter past ten."], "It is a quarter past nine.", "9:15 是九點過十五分。", "15 分使用 quarter，超過整點使用 past。", "nine fifteen＝a quarter past nine。", "15 分可說 a quarter past 該小時。", ["確認分鐘 15", "換成 quarter", "使用 past", "保留 nine"]),
                reorder("吃完晚餐後，我們看了電影。", ["After", "we", "finished dinner", ",", "we", "watched", "a movie", "."], "After we finished dinner, we watched a movie.", "After 後放先發生的事。", "兩側都是已完成的過去事件，使用一般過去式。", "先吃完晚餐，後看電影。", "After A, B 表示 A 先、B 後。", ["放 After we", "接 finished dinner", "加入逗號", "排 watched a movie"])
            ],
            dialogue: [
                choice("A: What were you doing at seven last night?\nB: _____", ["I was having dinner with my family.", "I have dinner tomorrow.", "Yes, I was doing."], ["I was having dinner with my family.", "I did having dinner with my family.", "I was have dinner with my family.", "I had dinner every night at seven now."], "I was having dinner with my family.", "回答七點當時正在做的事。", "使用 was＋V-ing，避免混入 did。", "was having 對應 were doing。", "過去進行式問句以過去進行式回答。", ["確認問句時間", "以 I 回答", "使用 was", "have 改 having"]),
                choice("A: What was Tina doing when you called her?\nB: _____", ["She was taking a shower.", "She takes a shower tomorrow.", "She did took a shower."], ["She was taking a shower.", "She was take a shower.", "She took a shower while you were call her.", "She did taking a shower."], "She was taking a shower.", "問的是打電話當時正在做什麼。", "called 是短動作，回答用 was taking。", "洗澡跨越打電話的時間點。", "回答過去某時進行中的動作：was／were＋V-ing。", ["找到 when you called", "選持續動作", "使用 was", "take 改 taking"]),
                choice("A: The lights went out while we were studying.\nB: _____", ["That must have been scary.", "We study after tomorrow.", "The lights were go out."], ["That must have been scary.", "The lights did went out while you studied now.", "You were study because the lights went out later.", "That is scary yesterday while."], "That must have been scary.", "選擇能自然回應停電情境的句子。", "除了文法正確，也要符合對話語意。", "對突然停電表達感受最自然。", "情境對話需同時符合時態與語意。", ["讀懂停電事件", "辨認對方在分享經驗", "排除時態錯誤", "選自然回應"]),
                choice("A: Did you see the accident?\nB: _____", ["Yes. I was waiting for the bus when it happened.", "Yes. I waited for the bus tomorrow.", "Yes. I was wait when it happen."], ["Yes. I was waiting for the bus when it happened.", "Yes. I did waiting when it happened.", "Yes. I was waiting for the bus while it was happen.", "Yes. I waited for the bus when it was happening for one second."], "Yes. I was waiting for the bus when it happened.", "等待是持續動作，事故發生是短事件。", "使用 was waiting＋when＋happened。", "事故發生時，說話者正在等車。", "持續動作＋when＋一般過去式。", ["先用 Yes 回答", "使用 was waiting", "加入 when", "happen 改 happened"]),
                choice("A: When did Kevin call you?\nB: _____", ["He called me while I was cooking dinner.", "He was calling me before I cook tomorrow.", "He call me while I cooked now."], ["He called me while I was cooking dinner.", "He did called me while I was cooking dinner.", "He called me while I cooking dinner.", "He was called me while I cooked dinner."], "He called me while I was cooking dinner.", "來電是短動作，做飯是持續動作。", "檢查 called 與 was cooking 的搭配。", "電話在做飯期間打來。", "一般過去式＋while＋過去進行式。", ["找到短動作 called", "加入 while", "使用 I was", "cook 改 cooking"]),
                choice("A: Which happened first, homework or basketball?\nB: _____", ["I finished my homework before I played basketball.", "I played basketball before after homework.", "I was finish homework while basketball."], ["I finished my homework before I played basketball.", "I did finished my homework before I played basketball.", "After I played basketball, I finished homework before it first.", "I finished homework while I was played basketball."], "I finished my homework before I played basketball.", "before 能清楚回答先後。", "兩件完成的動作都用一般過去式。", "作業先完成，籃球後進行。", "A before B 直接說明 A 較早。", ["確認要回答先後", "把 homework 放前面", "使用 before", "兩個動詞用過去式"]),
                choice("A: Why were your clothes wet?\nB: _____", ["I was walking home when it started to rain.", "I walk home when it starts tomorrow.", "I was walked home when rain."], ["I was walking home when it started to rain.", "I did walking home when it started raining.", "I was walking home while it did started to rain.", "I walked home when it was start to rain."], "I was walking home when it started to rain.", "走路持續進行時，雨開始下。", "started 是插入持續動作的短事件。", "淋雨能合理說明衣服濕。", "過去進行式＋when＋一般過去式。", ["找原因情境", "使用 was walking", "加入 when", "使用 started"]),
                choice("A: What time is the meeting?\nB: It starts at a quarter to ten.", ["9:45", "10:15", "9:15"], ["9:45", "10:15", "9:15", "10:45"], "9:45", "to ten 表示十點以前。", "從 10:00 往前推 quarter。", "a quarter to ten＝9:45。", "quarter 是 15 分；to 表示距離下一整點。", ["找到 ten", "quarter 換 15", "往前推", "得到 9:45"]),
                choice("A: Why didn't you answer the door?\nB: _____", ["I was taking a shower when you rang the bell.", "I take a shower when you ring tomorrow.", "I was took a shower when you rang."], ["I was taking a shower when you rang the bell.", "I did taking a shower when you rang the bell.", "I was taking a shower while you did rang the bell.", "I took a shower when you were rang the bell."], "I was taking a shower when you rang the bell.", "按門鈴時，洗澡正在進行。", "使用 was taking；rang 為 ring 的過去式。", "洗澡合理說明沒有應門。", "持續動作＋when＋短動作。", ["先說明持續動作", "使用 was taking", "加入 when", "使用 rang"]),
                choice("A: What did you do after the movie ended?\nB: _____", ["We went home after it ended.", "We were go home after it ends.", "We go home before it ended after."], ["We went home after it ended.", "We did went home after it ended.", "We went home after it was end.", "We were going home after it ends tomorrow."], "We went home after it ended.", "電影結束先發生，回家後發生。", "兩件完成的過去事件使用 went 與 ended。", "after 清楚表示先後。", "B after A 表示 A 先發生、B 後發生。", ["找先發生的 ended", "找後發生的 went", "使用 after", "檢查兩個過去式"])
            ]
        }
    };
})();
