(() => {
    "use strict";

    const STAGE_INSTRUCTIONS = {
        classification: "請判斷句型或選出符合規則的答案。",
        doctor: "句子有一個文法問題，請選出正確修正版。",
        transform: "請依提示完成句型變化或重組。",
        dialogue: "請依對話情境選出自然且正確的回答。"
    };

    const choice = (stage, row, rule) => {
        const [stem, answer, wrongB1, wrongB2, wrongA, hint, context = ""] = row;
        return {
            type: "choice",
            instruction: STAGE_INSTRUCTIONS[stage],
            context,
            stem,
            options: {
                B: [answer, wrongB1, wrongB2],
                A: [answer, wrongB1, wrongB2, wrongA]
            },
            answer,
            hint: {
                B: hint,
                A: `${hint} 再逐一排除看似相近、實際上形式不合的選項。`
            },
            clue: hint,
            rule,
            steps: ["先找題目的時間、數量或問句線索", hint, rule, `正確答案是：${answer}`]
        };
    };

    const reorder = (row, rule) => {
        const [stem, tokens, answer, hint, context = ""] = row;
        return {
            type: "reorder",
            instruction: "請依提示，把字詞排成完整且正確的句子。",
            context,
            stem,
            tokens,
            answer,
            hint: {
                B: hint,
                A: `${hint} 同時留意主詞、助動詞與標點的位置。`
            },
            clue: hint,
            rule,
            steps: ["先找句首或疑問詞", hint, rule, `完整句子是：${answer}`]
        };
    };

    const makeLesson = ({ code, title, description, summarySteps, stageDescriptions, rules, classification, doctor, transformChoice, transformReorder, dialogue }) => ({
        code,
        label: `第 ${Number(code.slice(1))} 課`,
        kicker: `B2・LESSON ${Number(code.slice(1))}`,
        title,
        description,
        summarySteps,
        stageDescriptions,
        questionBank: {
            classification: classification.map(row => choice("classification", row, rules.classification)),
            doctor: doctor.map(row => choice("doctor", row, rules.doctor)),
            transform: [
                ...transformChoice.map(row => choice("transform", row, rules.transform)),
                ...transformReorder.map(row => reorder(row, rules.transform))
            ],
            dialogue: dialogue.map(row => choice("dialogue", row, rules.dialogue))
        }
    });

    const L1 = makeLesson({
        code: "L1",
        title: "日常習慣與星期冒險",
        description: "練習現在簡單式的問句與簡答、星期與頻率時間語。每回合 10 題，答錯先看提示，再用解析釐清規則。",
        summarySteps: ["找 every、on weekends 等習慣線索", "一般動詞問句使用 do", "星期前用 on", "What day 詢問星期幾"],
        stageDescriptions: {
            classification: "辨認現在簡單式、星期與日常習慣的問法。",
            doctor: "修正 do、don't、星期介系詞與動詞形式。",
            transform: "把日常活動改成問句、否定句或正確語序。",
            dialogue: "在課表、社團與生活情境中使用本課句型。"
        },
        rules: {
            classification: "描述固定習慣時用現在簡單式；一般動詞問句以 do 開頭，星期前通常使用 on。",
            doctor: "主詞為 I／you／we／they 時，一般動詞問句與否定句使用 do／don't，後接原形動詞。",
            transform: "Do + 主詞 + 原形動詞...?；否定句為主詞 + don't + 原形動詞。",
            dialogue: "先判斷問的是是否、活動內容或星期，再選相對應的簡答或資訊。"
        },
        classification: [
            ["Do you feed your dog every morning?", "現在簡單式一般問句", "現在進行式問句", "be 動詞問句", "過去式一般問句", "every morning 表示固定習慣，且句首是 Do。"],
            ["We practice basketball on Tuesdays.", "固定習慣的肯定句", "正在進行的動作", "過去發生的事件", "未來計畫", "on Tuesdays 表示每週固定進行。"],
            ["I don't watch TV before school.", "現在簡單式否定句", "現在簡單式問句", "命令句", "過去式否定句", "don't 後接原形 watch。"],
            ["What day is it today?", "詢問星期幾", "詢問日期", "詢問時間", "詢問天氣", "What day 對應 Monday、Tuesday 等星期。"],
            ["We have art class every Friday.", "every Friday", "on Friday now", "at Friday", "in Friday", "every 後可直接接星期，不加 on。"],
            ["The club meets on Saturdays.", "on Saturdays", "in Saturdays", "at Saturdays", "for Saturdays", "星期名稱前用 on。"],
            ["What do you do after dinner?", "詢問固定活動", "詢問正在做什麼", "詢問地點", "詢問能力", "do you do 是現在簡單式，問平常做什麼。"],
            ["Don't you clean your desk every day?", "否定疑問句", "肯定直述句", "祈使句", "過去式問句", "Don't 放在句首，後接主詞 you。"],
            ["Yes, we do.", "一般動詞問句的肯定簡答", "be 動詞問句的簡答", "現在進行式簡答", "過去式簡答", "簡答保留問句中的助動詞 do。"],
            ["It's Wednesday.", "回答 What day", "回答 What time", "回答 What's the date", "回答 How often", "Wednesday 是星期名稱。"]
        ],
        doctor: [
            ["Do you likes cats?", "Do you like cats?", "Are you like cats?", "Do you liking cats?", "Does you like cats?", "Do 後面的動詞要用原形。"],
            ["We doesn't study on Sundays.", "We don't study on Sundays.", "We aren't study on Sundays.", "We don't studies on Sundays.", "We doesn't studies on Sundays.", "主詞 We 搭配 don't。"],
            ["I play tennis in Fridays.", "I play tennis on Fridays.", "I play tennis at Fridays.", "I play tennis every on Friday.", "I play tennis for Fridays.", "星期前使用 on。"],
            ["What day do it today?", "What day is it today?", "What day are it today?", "What date is it today?", "What day does it today?", "詢問星期要用 What day is it...?"],
            ["Don't you brushes your teeth every day?", "Don't you brush your teeth every day?", "Do you brushes your teeth every day?", "Aren't you brush your teeth every day?", "Don't you brushing your teeth every day?", "Don't 後接原形 brush。"],
            ["Do Amy and Ben read after school? Yes, they are.", "Do Amy and Ben read after school? Yes, they do.", "Do Amy and Ben read after school? Yes, they read.", "Are Amy and Ben read after school? Yes, they are.", "Does Amy and Ben read after school? Yes, they does.", "Do 問句的簡答也用 do。"],
            ["We have music class every on Monday.", "We have music class every Monday.", "We have music class on every Monday.", "We have music class in every Monday.", "We have music class at every Monday.", "every Monday 前不再加 on。"],
            ["What are you do on weekends?", "What do you do on weekends?", "What are you doing on weekends every week?", "What does you do on weekends?", "What do you doing on weekends?", "固定習慣用 do you do。"],
            ["My parents don't watches the show.", "My parents don't watch the show.", "My parents aren't watch the show.", "My parents doesn't watch the show.", "My parents don't watching the show.", "don't 後接原形 watch。"],
            ["It is on Monday today.", "It is Monday today.", "It is in Monday today.", "It on Monday is today.", "It does Monday today.", "回答今天星期幾時，Monday 前不加 on。"]
        ],
        transformChoice: [
            ["把 We clean the room every Friday. 改成問句。", "Do you clean the room every Friday?", "Are you clean the room every Friday?", "Do you cleans the room every Friday?", "Does you clean the room every Friday?", "一般動詞問句在句首加入 Do。"],
            ["把 I play games after dinner. 改成否定句。", "I don't play games after dinner.", "I am not play games after dinner.", "I don't plays games after dinner.", "I doesn't play games after dinner.", "I 的現在簡單式否定使用 don't。"],
            ["問朋友『你週末做什麼？』", "What do you do on weekends?", "What are you do on weekends?", "What day do you on weekends?", "What does you do on weekends?", "問固定活動用 What do you do...?"],
            ["問今天星期幾。", "What day is it today?", "What date is it today?", "What time is it today?", "How day is it today?", "星期用 What day 詢問。"],
            ["將 on Saturdays 改成意思相近的時間語。", "every Saturday", "in Saturday", "at every Saturday", "every on Saturday", "every Saturday 前不加介系詞。"]
        ],
        transformReorder: [
            ["排出『你每天讀英文嗎？』", ["Do", "you", "read", "English", "every day", "?"], "Do you read English every day?", "Do 放句首，read 保持原形。"],
            ["排出『我們星期三不上體育課。』", ["We", "don't", "have", "PE class", "on Wednesday", "."], "We don't have PE class on Wednesday.", "don't 後接 have，星期前用 on。"],
            ["排出『你們週末做什麼？』", ["What", "do", "you", "do", "on weekends", "?"], "What do you do on weekends?", "第一個 do 是助動詞，第二個 do 是主要動詞。"],
            ["排出『今天是星期四。』", ["It", "is", "Thursday", "today", "."], "It is Thursday today.", "星期名稱直接放在 is 後。"],
            ["排出『他們每個星期五打掃教室。』", ["They", "clean", "the classroom", "every Friday", "."], "They clean the classroom every Friday.", "主詞 They 後用原形 clean。"]
        ],
        dialogue: [
            ["B 應該怎麼回答？", "Yes, I do.", "Yes, I am.", "Yes, I does.", "Yes, I can do.", "Do you...? 的肯定簡答是 Yes, I do.", "A: Do you like animals?"],
            ["B 應該怎麼回答？", "No, we don't.", "No, we aren't.", "No, we doesn't.", "No, we not.", "Do you and Mia...? 的否定簡答用 we don't。", "A: Do you and Mia study together?"],
            ["B 應該怎麼回答？", "I read in the library.", "It's Friday.", "Yes, I do.", "At seven o'clock every day.", "What do you do? 要回答活動內容。", "A: What do you do after school?"],
            ["B 應該怎麼回答？", "It's Tuesday.", "It's August 8.", "It's seven thirty.", "It's sunny.", "What day 問星期幾。", "A: What day is it today?"],
            ["B 應該怎麼回答？", "We have it on Thursdays.", "We have two classes.", "It's my favorite class.", "In the music room every day.", "What day 問哪一天。", "A: What day do you have music class?"],
            ["同學問 Don't you exercise every day?，你每天都有運動。", "Yes, I do.", "No, I don't.", "Yes, I am.", "No, I do.", "事實為肯定時仍回答 Yes, I do。"],
            ["B 應該怎麼回答？", "I help my parents.", "On Sunday.", "No, I don't.", "It's Sunday.", "What do you do? 回答做的事情。", "A: What do you do on Sundays?"],
            ["B 應該怎麼回答？", "Yes, they do.", "Yes, they are.", "Yes, they does.", "Yes, them do.", "主詞 your parents 以 they 代替。", "A: Do your parents cook on weekends?"],
            ["朋友問你哪天上美術課。", "On Wednesday.", "At the art room.", "For two hours.", "Every art class.", "哪一天用 On + 星期回答。"],
            ["B 應該怎麼回答？", "No, I don't. I read books.", "No, I'm not reading.", "No, I doesn't.", "No, I don't watch yesterday.", "固定習慣的否定簡答用 don't，並可補充真正活動。", "A: Do you watch TV after dinner?" ]
        ]
    });

    const L2 = makeLesson({
        code: "L2",
        title: "第三人稱與天氣冒險",
        description: "練習第三人稱單數的 does／doesn't、動詞變化與天氣問答。每題都有判斷線索與修正解析。",
        summarySteps: ["先看主詞是否為 he／she／單一人物", "問句與否定句使用 does／doesn't", "does 後動詞回原形", "天氣可用 What's...like? 或 How's...?"],
        stageDescriptions: {
            classification: "辨認第三人稱句型及兩種天氣問法。",
            doctor: "修正 does、doesn't、has 與天氣句型。",
            transform: "進行第三人稱問句、否定句與天氣問句變化。",
            dialogue: "用正確簡答描述家人習慣與各地天氣。"
        },
        rules: {
            classification: "第三人稱單數肯定句的動詞要變化；問句與否定句改用 does／doesn't，主要動詞回原形。",
            doctor: "does／doesn't 已標示第三人稱，後面的主要動詞不可再加 s；have 的第三人稱肯定形是 has。",
            transform: "Does + 主詞 + 原形動詞...?；天氣問法為 What's the weather like...? 或 How's the weather...?。",
            dialogue: "先確認主詞與問句形式，再用 does／doesn't 或天氣形容詞完整回答。"
        },
        classification: [
            ["Does Leo walk to school?", "第三人稱一般問句", "第三人稱肯定句", "be 動詞問句", "過去式問句", "主詞 Leo 為第三人稱單數，句首用 Does。"],
            ["Mia doesn't carry an umbrella.", "第三人稱否定句", "第一人稱否定句", "現在進行式", "命令句", "doesn't 後接原形 carry。"],
            ["My brother has a raincoat.", "第三人稱肯定句", "第三人稱問句", "複數主詞肯定句", "過去式肯定句", "My brother 是單數，have 變 has。"],
            ["What's the weather like in Tainan?", "詢問天氣狀況", "詢問地點", "詢問日期", "詢問喜好", "the weather like 是判斷線索。"],
            ["How's the weather today?", "詢問今天天氣", "詢問今天星期", "詢問身體狀況", "詢問活動方式", "How's the weather 與 What's the weather like 意思相同。"],
            ["It rains a lot in summer.", "描述氣候或常態", "描述此刻正在下雨", "描述過去天氣", "描述明天天氣", "in summer 是經常性的時間範圍。"],
            ["She visits the museum every weekend.", "第三人稱現在式肯定句", "複數主詞現在式", "第三人稱過去式", "現在進行式", "She 搭配 visits，every weekend 表示習慣。"],
            ["No, he doesn't.", "Does 問句的否定簡答", "Do 問句的否定簡答", "Is 問句的否定簡答", "Did 問句的否定簡答", "簡答保留助動詞 does。"],
            ["Nina studies on rainy days, but her brothers don't.", "對比單數與複數習慣", "比較過去事件", "描述正在進行", "表達未來計畫", "Nina 用 studies；brothers 用 don't。"],
            ["It's windy and cool.", "回答天氣問句", "回答星期問句", "回答地點問句", "回答日期問句", "windy、cool 都是天氣形容詞。"]
        ],
        doctor: [
            ["Does Tina likes rainy days?", "Does Tina like rainy days?", "Do Tina like rainy days?", "Does Tina liking rainy days?", "Is Tina like rainy days?", "Does 後用原形 like。"],
            ["My dad don't drive to work.", "My dad doesn't drive to work.", "My dad isn't drive to work.", "My dad doesn't drives to work.", "My dad don't drives to work.", "My dad 是第三人稱單數，否定用 doesn't。"],
            ["Her sister have two jackets.", "Her sister has two jackets.", "Her sister haves two jackets.", "Her sister does has two jackets.", "Her sister having two jackets.", "第三人稱肯定句中 have 變 has。"],
            ["What the weather like today?", "What's the weather like today?", "How the weather is today?", "What does the weather like today?", "What's weather likes today?", "句中需要 be 動詞 is。"],
            ["How's weather in Chiayi?", "How's the weather in Chiayi?", "How does the weather in Chiayi?", "What's weather in Chiayi?", "How the weather like in Chiayi?", "weather 前要有 the。"],
            ["It is rain now.", "It is raining now.", "It rains now every minute.", "It does raining now.", "It rain is now.", "now 表示此刻，可用 is raining。"],
            ["Bella doesn't has her umbrella.", "Bella doesn't have her umbrella.", "Bella don't have her umbrella.", "Bella isn't have her umbrella.", "Bella doesn't having her umbrella.", "doesn't 後的 has 要還原為 have。"],
            ["Do your brother play soccer?", "Does your brother play soccer?", "Does your brother plays soccer?", "Is your brother play soccer?", "Do your brother plays soccer?", "your brother 是單數，問句用 Does。"],
            ["He study English every night.", "He studies English every night.", "He studys English every night.", "He does studies English every night.", "He is study English every night.", "子音字母 + y 結尾，第三人稱改 y 為 ies。"],
            ["She doesn't goes out on rainy days.", "She doesn't go out on rainy days.", "She don't go out on rainy days.", "She isn't go out on rainy days.", "She doesn't going out on rainy days.", "doesn't 後接原形 go。"]
        ],
        transformChoice: [
            ["把 Ben plays games after school. 改成問句。", "Does Ben play games after school?", "Do Ben plays games after school?", "Does Ben plays games after school?", "Is Ben play games after school?", "Does 放句首後，plays 還原為 play。"],
            ["把 Amy has a blue umbrella. 改成否定句。", "Amy doesn't have a blue umbrella.", "Amy doesn't has a blue umbrella.", "Amy don't have a blue umbrella.", "Amy isn't have a blue umbrella.", "doesn't 後使用 have。"],
            ["用另一種方式改寫 How's the weather today?", "What's the weather like today?", "What does the weather like today?", "How does the weather today?", "What weather is like today?", "兩種常用問法可以互換。"],
            ["回答 Does Mia visit the library on Sundays?（肯定）", "Yes, she does.", "Yes, she do.", "Yes, she is.", "Yes, Mia does visit yes.", "Mia 用 she 代替，並保留 does。"],
            ["把 My brothers don't like hot days. 改成單數主詞 My brother。", "My brother doesn't like hot days.", "My brother don't like hot days.", "My brother doesn't likes hot days.", "My brother isn't like hot days.", "單數主詞的否定改用 doesn't。"]
        ],
        transformReorder: [
            ["排出『她每天帶雨傘嗎？』", ["Does", "she", "bring", "an umbrella", "every day", "?"], "Does she bring an umbrella every day?", "Does 後用 bring 原形。"],
            ["排出『我弟弟沒有外套。』", ["My brother", "doesn't", "have", "a jacket", "."], "My brother doesn't have a jacket.", "doesn't 後接 have。"],
            ["排出『高雄夏天天氣如何？』", ["What's", "the weather", "like", "in Kaohsiung", "in summer", "?"], "What's the weather like in Kaohsiung in summer?", "What's the weather like 是固定問法。"],
            ["排出『今天又冷又有風。』", ["It", "is", "cold", "and", "windy", "today", "."], "It is cold and windy today.", "天氣形容詞放在 is 後。"],
            ["排出『Leo 每週末去夜市。』", ["Leo", "goes", "to the night market", "every weekend", "."], "Leo goes to the night market every weekend.", "Leo 為第三人稱單數，go 變 goes。"]
        ],
        dialogue: [
            ["B 應該怎麼回答？", "Yes, she does.", "Yes, she do.", "Yes, she is.", "Yes, her does.", "Does your sister...? 用 she does 簡答。", "A: Does your sister like sunny days?"],
            ["B 應該怎麼回答？", "No, he doesn't.", "No, he don't.", "No, he isn't.", "No, him doesn't.", "Does Kevin...? 的否定簡答使用 he doesn't。", "A: Does Kevin walk to school?"],
            ["B 應該怎麼回答？", "It's hot and sunny.", "It's Friday.", "It's in Tainan.", "It likes summer.", "問天氣時回答天氣狀況。", "A: What's the weather like today?"],
            ["B 應該怎麼回答？", "It rains a lot.", "It is summer.", "Yes, it does a lot.", "The weather likes rain.", "問某地某季常態天氣，可用現在簡單式回答。", "A: How's the weather in Taiwan in summer?"],
            ["B 應該怎麼回答？", "She has a raincoat.", "She have a raincoat.", "She does has a raincoat.", "She is have a raincoat.", "What does she have? 的回答用 she has。", "A: What does Amy have in her bag?"],
            ["同學問 Does your dad cook dinner?，爸爸不下廚。", "No, he doesn't.", "No, he don't.", "No, he isn't.", "No, my dad doesn't cooks.", "單數男性用 he doesn't。"],
            ["B 應該怎麼回答？", "He plays basketball.", "He play basketball.", "He does basketball.", "He is play basketball.", "What does Leo do? 的回答要用第三人稱肯定形式。", "A: What does Leo do after school?"],
            ["B 應該怎麼回答？", "No, she doesn't have it.", "No, she doesn't has it.", "No, she don't have it.", "No, she isn't have it.", "doesn't 後接 have 原形。", "A: Does Mia have her jacket?"],
            ["朋友問今天適不適合野餐，你看到外面下大雨。", "No. It's raining hard now.", "Yes. It rains every summer.", "No. It is Friday today.", "Yes. The weather does sunny.", "描述眼前天氣用 is raining。"],
            ["B 應該怎麼回答？", "She studies in the library.", "She study in the library.", "She does studies there.", "She is study every day.", "固定習慣的第三人稱肯定句用 studies。", "A: What does Nina do on rainy days?" ]
        ]
    });

    const L3 = makeLesson({
        code: "L3",
        title: "日期與節慶冒險",
        description: "練習月份、序數、日期介系詞與 When 問句，在生日、節慶及活動情境中讀懂日期。",
        summarySteps: ["What day 問星期；What's the date 問日期", "日期使用序數概念", "特定日期前使用 on", "When 可詢問活動時間"],
        stageDescriptions: {
            classification: "區分星期、日期與 When 問句。",
            doctor: "修正序數、日期介系詞與問句結構。",
            transform: "把日期資訊組成問句、答句與完整句子。",
            dialogue: "在生日、節日及班級活動中正確交換日期。"
        },
        rules: {
            classification: "What's the date? 問月日；When 問事件時間；特定日期前通常使用 on。",
            doctor: "日期的日要用序數概念，如 first、second、third、twentieth；月日前使用 on。",
            transform: "日期問句可用 What's the date...? 或 When is...?，答句以 It's on + 月日 表示。",
            dialogue: "先判斷問題需要星期、月日或活動，再提供對應的時間資訊。"
        },
        classification: [
            ["What's the date today?", "詢問今天的月日", "詢問今天星期幾", "詢問現在時間", "詢問今年年份", "date 指日期，不是 day。"],
            ["When is the school fair?", "詢問活動時間", "詢問活動地點", "詢問活動內容", "詢問參加人物", "When 用來問何時。"],
            ["It's on May fifth.", "回答特定日期", "回答星期", "回答時刻", "回答頻率", "on 後接月日。"],
            ["July twentieth", "正確日期讀法", "星期讀法", "時間讀法", "年份讀法", "日期中的 20 使用 twentieth。"],
            ["Father's Day is on August eighth.", "節日日期敘述", "天氣敘述", "頻率敘述", "地點敘述", "on August eighth 是明確日期。"],
            ["What day is it today?", "詢問星期幾", "詢問幾月幾日", "詢問月份", "詢問節日", "What day 對應星期名稱。"],
            ["The party is in May.", "只指出月份", "指出特定月日", "指出星期", "指出時刻", "只有月份時使用 in。"],
            ["The party is on May 6.", "指出特定日期", "指出一整個月份", "指出頻率", "指出時間長度", "有明確月日，使用 on。"],
            ["What do you do during the Moon Festival?", "詢問節慶活動", "詢問節慶日期", "詢問節慶地點", "詢問節慶天氣", "What do you do? 問做什麼。"],
            ["On April 13.", "回答 When 問句", "回答 What 問句", "回答 Who 問句", "回答 How often 問句", "日期資訊可回答 When。"]
        ],
        doctor: [
            ["Today is July twenty.", "Today is July twentieth.", "Today is July twentyth.", "Today is July twenties.", "Today is twentieth July the.", "日期中的 20 要用 twentieth。"],
            ["The test is in March third.", "The test is on March third.", "The test is at March third.", "The test is every March third on.", "The test on is March third.", "特定月日前使用 on。"],
            ["What day is your birthday?", "What's the date of your birthday?", "What's the time of your birthday?", "How date is your birthday?", "What does your birthday date?", "要問月日應使用 date。"],
            ["When Teacher's Day?", "When is Teacher's Day?", "When does Teacher's Day?", "What is Teacher's Day when?", "When are Teacher's Day?", "When 後仍需要 be 動詞 is。"],
            ["It's on December thirty-one.", "It's on December thirty-first.", "It's in December thirty-first.", "It's on December thirtieth-one.", "It's at December thirty-first.", "31 的序數是 thirty-first。"],
            ["The festival is at September 28.", "The festival is on September 28.", "The festival is in September 28.", "The festival is for September 28.", "The festival on September 28 is.", "特定日期前用 on。"],
            ["What is the date in the party?", "What is the date of the party?", "What is the day in the party?", "What does the date of the party?", "When date is the party of?", "表示『活動的日期』可用 the date of the party。"],
            ["My birthday is on June two.", "My birthday is on June second.", "My birthday is in June second.", "My birthday is at June second.", "My birthday is June twoth.", "日期中的 2 使用 second。"],
            ["When is the picnic? It on April 9.", "When is the picnic? It's on April 9.", "When does the picnic? It's in April 9.", "What day the picnic? It on April 9.", "When is picnic? It does April 9.", "答句需要 It's，日期前用 on。"],
            ["We eat moon cakes on the Moon Festival.", "We eat moon cakes during the Moon Festival.", "We eat moon cakes at Moon Festival date.", "We eat moon cakes in the Moon Festival day on.", "We do eat moon cakes when Moon Festival?", "表示節慶期間可用 during。"]
        ],
        transformChoice: [
            ["問『今天幾月幾日？』", "What's the date today?", "What day is it today?", "What time is it today?", "When day is today?", "問月日使用 date。"],
            ["問『運動會何時舉行？』", "When is the sports day?", "What day does the sports day?", "Where is the sports day when?", "When does sports day is?", "When 後接 is 與活動名稱。"],
            ["把 The party is in May. 加入明確日期 May 8。", "The party is on May 8.", "The party is in May 8.", "The party is at May 8.", "The party is every May 8 on.", "明確月日前使用 on。"],
            ["將 April 1 寫成英文日期讀法。", "April first", "April one", "April oneth", "the one April", "日期中的 1 使用 first。"],
            ["回答 When is the English contest?（October 12）", "It's on October twelfth.", "It's in October twelve.", "It's at October twelfth.", "It does on October twelfth.", "特定日期以 It's on... 回答。"]
        ],
        transformReorder: [
            ["排出『你的生日是幾月幾日？』", ["What's", "the date", "of", "your birthday", "?"], "What's the date of your birthday?", "What's the date 放在句首。"],
            ["排出『教師節是九月二十八日。』", ["Teacher's Day", "is", "on", "September twenty-eighth", "."], "Teacher's Day is on September twenty-eighth.", "特定日期前用 on。"],
            ["排出『班級派對何時舉行？』", ["When", "is", "the class party", "?"], "When is the class party?", "When 後接 is。"],
            ["排出『我們在端午節划龍舟。』", ["We", "race dragon boats", "during", "the Dragon Boat Festival", "."], "We race dragon boats during the Dragon Boat Festival.", "during 表示在節慶期間。"],
            ["排出『野餐在四月十三日。』", ["The picnic", "is", "on", "April thirteenth", "."], "The picnic is on April thirteenth.", "13 的序數是 thirteenth。"]
        ],
        dialogue: [
            ["B 應該怎麼回答？", "It's August fifteenth.", "It's Monday.", "It's three o'clock.", "It's summer every year.", "What's the date? 要回答月日。", "A: What's the date today?"],
            ["B 應該怎麼回答？", "It's on November 6.", "It's in the gym.", "We sing and dance.", "It's Friday every week.", "When 問活動時間。", "A: When is the talent show?"],
            ["B 應該怎麼回答？", "It's Friday.", "It's March third.", "It's at noon.", "It's sunny.", "What day 問星期。", "A: What day is it today?"],
            ["B 應該怎麼回答？", "We eat moon cakes.", "It's on September 21.", "At my grandparents' home.", "It's once a year.", "What do you do? 要回答活動。", "A: What do you do during the Moon Festival?"],
            ["朋友問生日日期，你的生日是 5 月 2 日。", "It's on May second.", "It's in May two.", "It's at May second.", "It does May second.", "回答特定日期用 on + 月 + 序數。"],
            ["B 應該怎麼回答？", "On April 13.", "We have water fights.", "In Thailand.", "Every April often.", "When 問時間。", "A: When do people have water fights?"],
            ["B 應該怎麼回答？", "It's in February.", "It's on February every.", "It's February second week on.", "At February.", "只回答月份時使用 in。", "A: What month is Chinese New Year in 2027?"],
            ["同學問派對是不是 3 月 1 日，實際是 3 月 3 日。", "No. It's on March third.", "No. It is in March three.", "Yes. It's March first not.", "No. It on March third.", "先否定，再用正確日期回答。"],
            ["B 應該怎麼回答？", "It's on September twenty-eighth.", "It's September twenty-eight in.", "It's on September twenty-eight day.", "It does September twenty-eighth.", "Teacher's Day 是特定日期。", "A: When is Teacher's Day?"],
            ["朋友只回答 Sunday，但你問的是幾月幾日，最合適的追問是？", "What's the date?", "What day is it?", "What time is it?", "How often is it?", "Sunday 是星期，尚未回答 date。"]
        ]
    });

    const L4 = makeLesson({
        code: "L4",
        title: "數量與餐點冒險",
        description: "練習可數與不可數名詞、How many／How much、some／any、量詞及 Which 選擇問句。",
        summarySteps: ["先判斷名詞可數或不可數", "How many 接複數可數名詞", "How much 接不可數名詞", "Which 用於有限選項"],
        stageDescriptions: {
            classification: "辨認數量問句、量詞與選擇問句。",
            doctor: "修正名詞單複數、some／any 與問句形式。",
            transform: "將餐點與數量資訊改寫成正確問答。",
            dialogue: "在點餐、購物與廚房情境中正確詢問數量與選擇。"
        },
        rules: {
            classification: "How many 後接複數可數名詞；How much 後接不可數名詞；Which 用在已提供選項時。",
            doctor: "不可數名詞需搭配容器或單位計數；肯定句常用 some，一般疑問句與否定句常用 any。",
            transform: "依名詞性質選 How many／How much，並讓量詞、名詞單複數與回答互相一致。",
            dialogue: "先看對方問數量、金額或二選一，再提供有單位且合乎語意的回答。"
        },
        classification: [
            ["How many apples do we need?", "詢問可數名詞數量", "詢問不可數名詞數量", "詢問價格", "詢問頻率", "apples 是複數可數名詞。"],
            ["How much milk is there?", "詢問不可數名詞數量", "詢問可數名詞數量", "詢問牛奶種類", "詢問容器數", "milk 通常視為不可數名詞。"],
            ["two cups of tea", "用容器計量不可數名詞", "兩個可數茶", "詢問數量", "表示頻率", "cups of 是計量單位。"],
            ["There is some bread on the table.", "肯定句中的不定量", "否定句中的任何數量", "精確數量", "選擇問句", "some 常用於肯定句。"],
            ["We don't need any sugar.", "否定句中的 any", "肯定句中的 some", "可數名詞複數", "日期介系詞", "否定句常使用 any。"],
            ["Which do you want, rice or noodles?", "有限選項的選擇問句", "開放式內容問句", "數量問句", "原因問句", "句中提供 rice 或 noodles 兩個選項。"],
            ["a slice of bread", "一片麵包", "一碗麵包", "一杯麵包", "一盒麵包", "slice 是薄片量詞。"],
            ["How much time do we have?", "詢問時間量", "詢問幾點", "詢問幾次", "詢問哪一天", "time 在此表示時間量，視為不可數。"],
            ["three bowls of rice", "三碗飯", "三片飯", "三杯飯", "三個不可數飯", "bowls of 可使 rice 具體計數。"],
            ["Which one do you like?", "從已知選項中選一個", "詢問數量", "詢問價格", "詢問日期", "Which one 表示有限選擇。"]
        ],
        doctor: [
            ["How many milk do you need?", "How much milk do you need?", "How many milks do you need?", "How much cups milk do you need?", "What many milk do you need?", "milk 是不可數名詞。"],
            ["How much apples are there?", "How many apples are there?", "How much apple are there?", "How many apple is there?", "How often apples are there?", "apples 是複數可數名詞。"],
            ["I need two bread.", "I need two slices of bread.", "I need two breads of slice.", "I need much breads.", "I need two bread slices of.", "bread 要用 slices of 等單位計數。"],
            ["There are some water in the bottle.", "There is some water in the bottle.", "There are any water in the bottle.", "There is some waters in the bottle.", "There have some water in the bottle.", "water 不可數，搭配 is。"],
            ["We don't have some eggs.", "We don't have any eggs.", "We doesn't have any eggs.", "We don't have an eggs.", "We aren't have any eggs.", "一般否定句使用 any。"],
            ["Which you want, tea or juice?", "Which do you want, tea or juice?", "What do you want which tea or juice?", "Which are you want, tea or juice?", "How many do you want, tea or juice?", "一般動詞選擇問句需要 do。"],
            ["One cups of coffee is enough.", "One cup of coffee is enough.", "One cup of coffees are enough.", "One coffee of cup is enough.", "One cup coffee are enough.", "one 後的 cup 使用單數。"],
            ["How many time do you have?", "How much time do you have?", "How often time do you have?", "How much times do you have?", "How many hours time do you have much?", "time 表示時間量時不可數。"],
            ["Let's get any bananas.", "Let's get some bananas.", "Let's gets some bananas.", "Let's get much bananas.", "Let's getting any bananas.", "肯定建議句通常使用 some。"],
            ["Which do you like to drink, milk and tea?", "Which do you like to drink, milk or tea?", "What do you like which, milk and tea?", "Which are you like, milk or tea?", "How much do you like, milk or tea?", "二選一使用 or 連接選項。"]
        ],
        transformChoice: [
            ["對 five oranges 的數量提問。", "How many oranges do you have?", "How much oranges do you have?", "How many orange do you have?", "What much oranges do you have?", "複數可數名詞 oranges 搭配 How many。"],
            ["對 two bottles of water 的數量提問。", "How many bottles of water do you need?", "How much bottles of water do you need?", "How many water do you need?", "How often bottles of water do you need?", "可計數的是 bottles。"],
            ["把 I have some juice. 改成否定句。", "I don't have any juice.", "I don't have some juice.", "I haven't any juices.", "I doesn't have any juice.", "否定句將 some 改為 any。"],
            ["詢問朋友想要牛肉麵或南瓜派。", "Which do you want, beef noodles or pumpkin pie?", "How many do you want, beef noodles and pumpkin pie?", "What much do you want, beef noodles or pumpkin pie?", "Which are you want beef noodles and pumpkin pie?", "有兩個選項時使用 Which...or...?"],
            ["回答 How much bread do you need?（一片）", "I need one slice.", "I need one bread.", "I need one bowl breads.", "I need a slice of breads are.", "bread 以 slice 計量。"]
        ],
        transformReorder: [
            ["排出『你需要多少顆蛋？』", ["How many", "eggs", "do", "you", "need", "?"], "How many eggs do you need?", "How many 後接複數 eggs。"],
            ["排出『我們不需要糖。』", ["We", "don't", "need", "any", "sugar", "."], "We don't need any sugar.", "否定句使用 any。"],
            ["排出『桌上有一些麵包。』", ["There", "is", "some", "bread", "on the table", "."], "There is some bread on the table.", "bread 不可數，使用 is。"],
            ["排出『你喜歡哪一種，蘋果汁還是紅茶？』", ["Which", "do", "you", "like", ",", "apple juice", "or", "black tea", "?"], "Which do you like, apple juice or black tea?", "兩個選項用 or 連接。"],
            ["排出『兩杯牛奶就夠了。』", ["Two cups", "of milk", "are", "enough", "."], "Two cups of milk are enough.", "主詞是複數 cups，使用 are。"]
        ],
        dialogue: [
            ["B 應該怎麼回答？", "Three apples.", "Some milk.", "Fifty dollars.", "Every three days.", "How many apples 要回答顆數。", "A: How many apples do we need?"],
            ["B 應該怎麼回答？", "Two cups.", "Two waters.", "There are milk.", "On Tuesday.", "How much milk 可用容器量詞回答。", "A: How much milk do you want?"],
            ["B 應該怎麼回答？", "No, we don't need any.", "No, we don't need some.", "No, we aren't any.", "No, we doesn't need any.", "否定回答使用 any。", "A: Do we need any sugar?"],
            ["B 應該怎麼回答？", "I want the beef noodles.", "I want three many.", "Yes, I want.", "At the restaurant.", "Which 問句要從提供的選項中選擇。", "A: Which do you want, beef noodles or rice?"],
            ["B 應該怎麼回答？", "One slice is enough.", "One bread is enough.", "One breads are enough.", "Much slice enough.", "bread 用 slice 計量。", "A: How much bread do you need?"],
            ["店員問要多少杯果汁，你要四杯。", "Four cups, please.", "Four juice, please.", "Much four, please.", "Any cups is please.", "用 cups 表示可數容器。"],
            ["B 應該怎麼回答？", "I like apple juice.", "I like five cups.", "I like much.", "Yes, I do apple juice.", "Which 問句要選出一個選項。", "A: Which do you like, apple juice or tea?"],
            ["B 應該怎麼回答？", "We have two hours.", "We have two time.", "We have much hours is.", "At two o'clock often.", "How much time 可用 hours 表示時間量。", "A: How much time do we have?"],
            ["冰箱裡沒有蛋，朋友問 Can we make egg sandwiches?", "No. We don't have any eggs.", "No. We don't have some egg.", "Yes. There is any eggs.", "No. We aren't eggs.", "否定句用 any eggs。"],
            ["B 應該怎麼回答？", "Let's get some.", "Let's get any.", "Let's gets some.", "We do some getting.", "肯定建議中用 some。", "A: We need bananas for the salad." ]
        ]
    });

    const L5 = makeLesson({
        code: "L5",
        title: "頻率與生活習慣冒險",
        description: "練習 always、usually、often、sometimes、seldom、never 的位置，以及 How often 與頻率回答。",
        summarySteps: ["先找頻率詞", "頻率副詞通常放一般動詞前", "be 動詞後放頻率副詞", "How often 詢問多久一次"],
        stageDescriptions: {
            classification: "辨認頻率副詞與 How often 的功能。",
            doctor: "修正頻率副詞位置、動詞形式與頻率回答。",
            transform: "把習慣改寫成頻率問句、否定概念及正確語序。",
            dialogue: "在運動、家事與家庭生活中詢問並回答頻率。"
        },
        rules: {
            classification: "頻率副詞通常置於一般動詞之前、be 動詞之後；How often 用來問多久一次。",
            doctor: "never 本身已有否定意義，不再搭配 don't；第三人稱動詞形式仍須正確。",
            transform: "How often + do／does + 主詞 + 原形動詞...?；回答可用 once／twice／every + 時間。",
            dialogue: "先辨認頻率問句，再選可量化或自然的頻率回答，而不是時刻或時間長度。"
        },
        classification: [
            ["Mia always gets up early.", "頻率副詞修飾一般動詞", "be 動詞後的形容詞", "過去式", "命令句", "always 放在一般動詞 gets 前。"],
            ["My parents are usually busy on Mondays.", "頻率副詞放在 be 動詞後", "頻率副詞放在 be 動詞前", "進行式", "過去式", "usually 放在 are 後。"],
            ["How often do you exercise?", "詢問運動頻率", "詢問運動多久", "詢問運動地點", "詢問運動方式", "How often 表示多久一次。"],
            ["Twice a week.", "每週兩次", "每兩週一次", "兩週", "星期二", "twice 表示兩次。"],
            ["I seldom drink soda.", "很少喝汽水", "從不喝汽水", "常常喝汽水", "正在喝汽水", "seldom 表示很少。"],
            ["Leo never walks to school.", "從不走路上學", "偶爾走路上學", "總是走路上學", "今天沒走路上學", "never 表示 0% 的頻率。"],
            ["We visit Grandma every two weeks.", "每兩週一次的頻率", "拜訪兩週", "每天兩次", "兩週後一次性事件", "every two weeks 是規律頻率。"],
            ["She sometimes cooks dinner.", "有時候下廚", "總是下廚", "從不下廚", "此刻正在下廚", "sometimes 表示有時。"],
            ["Once a month.", "每月一次", "一個月", "每週一次", "一月一日", "once 表示一次。"],
            ["almost every day", "幾乎每天", "從不", "一天兩次", "每隔一天", "almost every day 表示非常頻繁但非絕對每天。"]
        ],
        doctor: [
            ["I go always to bed before ten.", "I always go to bed before ten.", "I go to always bed before ten.", "I am always go to bed before ten.", "I always goes to bed before ten.", "頻率副詞放在一般動詞 go 前。"],
            ["My parents usually are busy.", "My parents are usually busy.", "My parents are busy usually always.", "My parents do usually busy.", "My parents is usually busy.", "be 動詞後放 usually。"],
            ["How often does Amy visits her grandma?", "How often does Amy visit her grandma?", "How often do Amy visits her grandma?", "How much does Amy visit her grandma?", "How often is Amy visit her grandma?", "does 後使用 visit 原形。"],
            ["I don't never eat breakfast.", "I never eat breakfast.", "I don't ever never eat breakfast.", "I never don't eat breakfast.", "I am never eat breakfast.", "never 已有否定意義。"],
            ["Leo seldom play basketball.", "Leo seldom plays basketball.", "Leo plays seldom basketball.", "Leo does seldom plays basketball.", "Leo is seldom play basketball.", "第三人稱肯定句的 play 變 plays。"],
            ["We go hiking two a month.", "We go hiking twice a month.", "We go hiking second a month.", "We go hiking two times month a.", "We go hiking twice month.", "兩次用 twice。"],
            ["She is often late never.", "She is never late.", "She never is late often.", "She doesn't never late.", "She never late is.", "be 動詞後放 never。"],
            ["How often do he clean his room?", "How often does he clean his room?", "How often does he cleans his room?", "How often is he clean his room?", "How many often does he clean?", "主詞 he 的問句用 does。"],
            ["Every two week, we visit Grandpa.", "Every two weeks, we visit Grandpa.", "Every twice weeks, we visit Grandpa.", "Every two weekes, we visit Grandpa.", "Two every weeks, we visit Grandpa.", "two 後的 week 要用複數 weeks。"],
            ["Hank is sometimes eats out.", "Hank sometimes eats out.", "Hank is sometimes eat out.", "Hank sometimes eat out.", "Hank does sometimes eats out.", "一般動詞句不加 is，第三人稱用 eats。"]
        ],
        transformChoice: [
            ["對 She visits the zoo once a month. 的頻率提問。", "How often does she visit the zoo?", "How long does she visit the zoo?", "How many does she visit the zoo?", "How often does she visits the zoo?", "問多久一次用 How often，does 後用 visit。"],
            ["把 I sometimes cook dinner. 改成『從不』。", "I never cook dinner.", "I don't never cook dinner.", "I never cooks dinner.", "I am never cook dinner.", "never 直接放在 cook 前。"],
            ["把 Leo is late. 加入 usually。", "Leo is usually late.", "Leo usually is late.", "Leo is late usually is.", "Leo does usually late.", "頻率副詞放在 be 動詞後。"],
            ["回答 How often do you read?（每兩天一次）", "Every two days.", "For two days.", "Two days long.", "At two days.", "every two days 表示規律頻率。"],
            ["回答 How often does Mia exercise?（每週兩次）", "Twice a week.", "Two weeks.", "Second a week.", "For twice week.", "每週兩次用 twice a week。"]
        ],
        transformReorder: [
            ["排出『我通常走路上學。』", ["I", "usually", "walk", "to school", "."], "I usually walk to school.", "usually 放在一般動詞 walk 前。"],
            ["排出『她多久打掃一次房間？』", ["How often", "does", "she", "clean", "her room", "?"], "How often does she clean her room?", "does 後接 clean 原形。"],
            ["排出『我們每月拜訪奶奶一次。』", ["We", "visit", "Grandma", "once a month", "."], "We visit Grandma once a month.", "once a month 放句尾。"],
            ["排出『他上學從不遲到。』", ["He", "is", "never", "late", "for school", "."], "He is never late for school.", "never 放在 is 後。"],
            ["排出『他們有時候在外面吃飯。』", ["They", "sometimes", "eat out", "."], "They sometimes eat out.", "sometimes 放在一般動詞前。"]
        ],
        dialogue: [
            ["B 應該怎麼回答？", "Twice a week.", "For two weeks.", "On Tuesday at six.", "Two hours.", "How often 問頻率。", "A: How often do you play basketball?"],
            ["B 應該怎麼回答？", "Every two days.", "For two days.", "Two days ago.", "At two o'clock.", "every two days 是頻率。", "A: How often do you water the plants?"],
            ["B 應該怎麼回答？", "She seldom does.", "She seldom is.", "She does seldom plays.", "For seldom.", "可用頻率副詞 + does 簡答。", "A: How often does Amy play tennis?"],
            ["B 應該怎麼回答？", "About once a month.", "About one month long.", "Next month.", "At the library.", "How often 要回答多久一次。", "A: How often do you go to the library?"],
            ["朋友說他每天熬夜，你想勸他不要如此。", "You should never stay up that late.", "You never should stays up.", "You don't never stay up.", "You are never stay up late.", "never 不需再加 don't。"],
            ["B 應該怎麼回答？", "I usually go with my family.", "I am usually go with my family.", "I go usually with family is.", "I usually goes with my family.", "I 主詞後用 go，usually 放在 go 前。", "A: How often do you visit the night market?"],
            ["B 應該怎麼回答？", "He never does.", "He never is.", "He doesn't never.", "He never do.", "第三人稱簡答可用 He never does。", "A: How often does Leo eat breakfast at school?"],
            ["B 應該怎麼回答？", "Every weekend.", "For the weekend.", "At this weekend often.", "Two weekend.", "Every weekend 是固定頻率。", "A: How often do your parents cook together?"],
            ["同學問你多久整理一次書包，你每晚整理。", "Every night.", "For one night.", "At night yesterday.", "One time night long.", "規律時間可用 every night。"],
            ["B 應該怎麼回答？", "She's usually busy on Mondays.", "She usually is busy Mondays on.", "She does usually busy.", "She's busy usually is.", "usually 放在 be 動詞後。", "A: Is your mom busy on Mondays?" ]
        ]
    });

    const L6 = makeLesson({
        code: "L6",
        title: "問路與交通冒險",
        description: "練習方向指示、街道路口介系詞、by + 交通工具，以及 take／ride／walk 等交通動詞。",
        summarySteps: ["先辨認方向或交通問句", "祈使句以原形動詞開頭", "by 後直接接交通工具", "take／ride 後需接合適名詞"],
        stageDescriptions: {
            classification: "辨認問路、方向指示與交通方式句型。",
            doctor: "修正介系詞、交通工具搭配與祈使句。",
            transform: "把路線和交通資訊組成正確問答與指示。",
            dialogue: "在街道、車站與通勤情境中詢問並說明路線。"
        },
        rules: {
            classification: "How can I get to...? 詢問路線；How do you go...? 詢問交通方式；祈使句以原形動詞開頭。",
            doctor: "by + 交通工具不加冠詞；take + a／the + 交通工具；ride a bike，walk on foot。",
            transform: "方向指示用 Walk／Go／Turn + 方位資訊；交通回答依 by、take、ride 或 walk 的搭配完成。",
            dialogue: "先確認目的地與起點，再依順序提供方向、路口及左右位置。"
        },
        classification: [
            ["How can I get to the library?", "詢問如何到達某地", "詢問喜好", "詢問頻率", "詢問價格", "get to + 地點表示到達。"],
            ["Walk down this street.", "方向指示的祈使句", "現在進行式", "一般問句", "過去式", "句首 Walk 是原形動詞。"],
            ["Turn left at the corner.", "在轉角左轉", "沿街直走", "穿越馬路", "搭車左轉", "turn left 是左轉，at the corner 指轉角。"],
            ["The bank is on your right.", "銀行在你的右手邊", "銀行在右轉", "銀行在右邊街角內", "銀行在三個街區後", "on your right 表示在右手邊。"],
            ["I go to school by bus.", "以 by 表示交通方式", "搭乘某一班公車的動作", "步行", "騎腳踏車", "by bus 前不加 a／the。"],
            ["She takes the metro to work.", "搭乘捷運", "騎捷運", "步行到捷運", "在捷運旁工作", "take 可搭配 the metro。"],
            ["Leo rides a bike to the park.", "騎腳踏車", "搭公車", "步行", "開車", "ride a bike 是固定搭配。"],
            ["Go straight for two blocks.", "直走兩個街區", "在兩個街區左轉", "穿過兩個街區", "搭車兩站", "for two blocks 表示持續距離。"],
            ["The hotel is on the corner of Pine Street and Lake Road.", "位於兩條路的轉角", "在街道裡面", "在街道上方", "離街角兩條路", "on the corner of A and B 表示兩路交會處。"],
            ["How does Mia go to work?", "詢問 Mia 的交通方式", "詢問 Mia 的工作內容", "詢問 Mia 的工作地點", "詢問 Mia 的上班頻率", "How + does + go 詢問怎麼去。"]
        ],
        doctor: [
            ["Walks down this street and turn right.", "Walk down this street and turn right.", "Walking down this street and turn right.", "Walk down this street and turns right.", "Do walk down and right turns.", "祈使句用原形 Walk。"],
            ["Turn left in the corner.", "Turn left at the corner.", "Turn left on corner of.", "Turn left for the corner.", "Turn at left the corner.", "轉彎點使用 at the corner。"],
            ["Go straight at three blocks.", "Go straight for three blocks.", "Go straight in three blocks.", "Go straight on three block.", "Go straight by three blocks.", "表示持續距離用 for。"],
            ["I go to school by a bus.", "I go to school by bus.", "I go to school on bus by.", "I go to school by the bus every.", "I by bus go to school a.", "by + 交通工具不加冠詞。"],
            ["She goes to work take the metro.", "She takes the metro to work.", "She takes metro by to work.", "She rides the metro to work by.", "She take the metro to work.", "第三人稱肯定句用 takes。"],
            ["Can you by the bus home?", "Can you take the bus home?", "Can you take bus by home?", "Can you rides the bus home?", "Can you taking the bus home?", "can 後接原形 take。"],
            ["Leo walks a bike to school.", "Leo rides a bike to school.", "Leo takes a bike by school.", "Leo by bike rides to school a.", "Leo ride a bike to school.", "腳踏車搭配 ride。"],
            ["The store is in your left.", "The store is on your left.", "The store is at your left side on.", "The store does your left.", "The store by your left is.", "左右位置使用 on your left／right。"],
            ["How do Amy go to the station?", "How does Amy go to the station?", "How does Amy goes to the station?", "How is Amy go to the station?", "How do Amy goes station?", "Amy 為第三人稱單數，問句用 does。"],
            ["The bank is on the corner in Oak Street and Hill Road.", "The bank is on the corner of Oak Street and Hill Road.", "The bank is at corner by Oak Street or Hill Road.", "The bank on corner is Oak Street with Hill Road.", "The bank does the corner of two streets.", "兩條路的轉角使用 on the corner of A and B。"]
        ],
        transformChoice: [
            ["告訴對方『沿這條街走，在書店右轉。』", "Walk down this street and turn right at the bookstore.", "Walks down this street and turns right in the bookstore.", "Walking this street and right turn by bookstore.", "Walk down at street or turn right bookstore.", "方向指示使用原形 Walk、turn，轉彎點用 at。"],
            ["用 by 改寫 I take a bus to school.", "I go to school by bus.", "I go to school by a bus.", "I by bus take to school.", "I go by the bus to school take.", "by bus 不加冠詞。"],
            ["回答 How does Leo go to school?（騎腳踏車）", "He rides a bike to school.", "He takes a bike by school.", "He ride a bike to school.", "He walks a bike to school.", "第三人稱的 ride 變 rides。"],
            ["把 The museum is on your left. 改成右手邊。", "The museum is on your right.", "The museum is at your right.", "The museum turns right.", "The museum is in right you.", "右手邊使用 on your right。"],
            ["問『我如何到達車站？』", "How can I get to the station?", "How do I getting the station?", "Where can I get the station how?", "How often can I station?", "詢問路線用 How can I get to...?" ]
        ],
        transformReorder: [
            ["排出『直走兩個街區。』", ["Go", "straight", "for", "two blocks", "."], "Go straight for two blocks.", "祈使句用 Go 開頭，距離前用 for。"],
            ["排出『在下一個路口左轉。』", ["Turn", "left", "at", "the next corner", "."], "Turn left at the next corner.", "轉彎點前用 at。"],
            ["排出『圖書館在你的右手邊。』", ["The library", "is", "on", "your right", "."], "The library is on your right.", "位置使用 on your right。"],
            ["排出『她搭捷運上班。』", ["She", "takes", "the metro", "to work", "."], "She takes the metro to work.", "She 的肯定句使用 takes。"],
            ["排出『你每天怎麼去上學？』", ["How", "do", "you", "go", "to school", "every day", "?"], "How do you go to school every day?", "How do you go...? 詢問交通方式。"]
        ],
        dialogue: [
            ["B 應該怎麼回答？", "Walk straight and turn left at the bank.", "By bus every day.", "It's on Monday.", "For ten minutes often.", "問路時要提供方向。", "A: How can I get to the museum?"],
            ["B 應該怎麼回答？", "I go there by metro.", "I go there in metro by.", "I take by the metro there.", "I am metro to work.", "交通方式可用 by metro。", "A: How do you go to work?"],
            ["B 應該怎麼回答？", "It's on your right.", "Turn right is it.", "It's by bus.", "It's three blocks often.", "詢問地點時回答左右位置。", "A: Where is the post office?"],
            ["B 應該怎麼回答？", "Take bus number 12.", "By a number 12 bus take.", "Ride the metro number 12.", "Walk a bus number 12.", "建議搭某班公車使用 Take bus number...。", "A: Which bus can I take?"],
            ["朋友問是否能步行到公園，公園就在兩個街區外。", "Yes. Go straight for two blocks.", "Yes. Take by two blocks.", "No. Walks straight on two blocks.", "Yes. It is two blocks often.", "以清楚方向回答，使用 for two blocks。"],
            ["B 應該怎麼回答？", "She rides a bike.", "She ride a bike.", "She walks a bike.", "She by a bike.", "第三人稱肯定句使用 rides。", "A: How does Mia get to school?"],
            ["B 應該怎麼回答？", "Turn right at the second corner.", "Turn right in two corner.", "Turns right at second corners.", "By right corner twice.", "第幾個轉角仍使用 at。", "A: Where should I turn right?"],
            ["B 應該怎麼回答？", "It's on the corner of King Street and Park Road.", "It's in corner King Street with Park Road.", "It's by two streets corner on.", "It takes the corner of roads.", "兩路交會處用 on the corner of A and B。", "A: Where is Lion Hotel?"],
            ["同學說 I go to school by a bus.，你要怎麼提醒？", "Remove “a”: say “by bus.”", "Add “the”: say “by the bus.”", "Change by to at.", "Use walks a bus.", "by + 交通工具不加冠詞。"],
            ["B 應該怎麼回答？", "Yes. You can take the metro.", "Yes. You can by the metro.", "Yes. You takes metro.", "Yes. You can taking metro.", "can 後接 take 原形。", "A: Can I take the metro to the zoo?" ]
        ]
    });

    window.B2_GRAMMAR = {
        code: "B2",
        label: "第 2 冊（七年級下）",
        shortLabel: "B2",
        defaultLesson: "L1",
        lessons: { L1, L2, L3, L4, L5, L6 }
    };
})();
