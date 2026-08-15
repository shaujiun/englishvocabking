(() => {
    "use strict";

    const choice = (stem, answer, distractorsB, distractorsA, clue, rule, steps, extra = {}) => ({
        type: "choice",
        instruction: extra.instruction || "請選出正確答案。",
        context: extra.context || "",
        stem,
        options: { B: [answer, ...distractorsB], A: [answer, ...distractorsA] },
        answer,
        hint: { B: extra.hintB || clue, A: extra.hintA || rule },
        clue,
        rule,
        steps
    });

    const reorder = (stem, tokens, answer, clue, rule, steps, extra = {}) => ({
        type: "reorder",
        instruction: extra.instruction || "請依序排列成正確句子。",
        context: extra.context || "",
        stem,
        tokens,
        answer,
        hint: { B: extra.hintB || steps[0], A: extra.hintA || rule },
        clue,
        rule,
        steps
    });

    window.B3_L4_GRAMMAR = {
        code: "L4",
        label: "第 4 課",
        kicker: "B3・LESSON 4",
        title: "動詞搭配文法冒險",
        description: "練習 to V、V-ing、動名詞主詞與 It is＋形容詞＋to V。每回合 10 題，從第一個動詞判斷下一個動詞形式。",
        stageDescriptions: {
            classification: "辨認哪些動詞接 to V、哪些接 V-ing，以及動名詞主詞。",
            doctor: "修正不定詞、動名詞、主詞動詞一致與常見混用錯誤。",
            transform: "重組動詞搭配句，並改寫動名詞主詞與虛主詞句型。",
            dialogue: "在旅遊、興趣與日常計畫中正確使用 to V 或 V-ing。"
        },
        summarySteps: ["先找第一個動詞", "判斷後接 to V 或 V-ing", "檢查動名詞主詞視為單數", "最後確認語意與時態"],
        questionBank: {
            classification: [
                choice("I want to take a selfie.", "want＋to V", ["want＋V-ing", "want＋原形動詞"], ["want＋V-ing", "want＋原形動詞", "want＋過去式動詞"], "want 後接 to take。", "want、need、plan 後接 to＋原形動詞。", ["找到 want", "觀察 to take", "確認 take 為原形", "判斷為 to V"]),
                choice("My sister enjoys reading comics.", "enjoy＋V-ing", ["enjoy＋to V", "enjoy＋原形動詞"], ["enjoy＋to V", "enjoy＋原形動詞", "enjoy＋過去式動詞"], "enjoy 後接 reading。", "enjoy、keep、practice、finish、give up 後接 V-ing。", ["找到 enjoys", "找到 reading", "確認 read 加 ing", "判斷為 V-ing 搭配"]),
                choice("They plan to visit Tainan this weekend.", "plan＋to V", ["plan＋V-ing", "plan＋過去式"], ["plan＋V-ing", "plan＋原形動詞不加 to", "plan＋過去式動詞"], "plan 後使用 to visit。", "plan to do 表示計畫做某事。", ["找到 plan", "看到 to", "確認 visit 是原形", "判斷為 to V"]),
                choice("Leo keeps asking the same question.", "keep＋V-ing", ["keep＋to V", "keep＋原形動詞"], ["keep＋to V", "keep＋原形動詞", "keep＋過去式動詞"], "keeps 後接 asking。", "keep doing 表示持續或反覆做某事。", ["找到 keeps", "觀察 asking", "理解反覆語意", "判斷為 V-ing"]),
                choice("Amy started to learn French last month.", "start 可接 to V", ["start 只能接 V-ing", "start 後不能接動詞"], ["start 可接 to V", "start 只能接原形動詞", "start 後只能接過去式"], "started to learn 是正確搭配。", "begin、start、like、love 後可接 to V 或 V-ing。", ["找到 started", "看到 to learn", "確認 learn 是原形", "判斷搭配正確"]),
                choice("Ben loves playing basketball.", "love 可接 V-ing", ["love 只能接 to V", "love 不能接另一個動詞"], ["love 可接 V-ing", "love 只能接原形動詞", "love 後必須接過去式"], "loves playing 是正確搭配。", "love 後可接 to V 或 V-ing，基本語意相近。", ["找到 loves", "看到 playing", "確認 play 加 ing", "判斷搭配正確"]),
                choice("Traveling by train is convenient.", "動名詞片語當主詞", ["現在進行式", "一般過去式"], ["動名詞片語當主詞", "現在進行式省略主詞", "分詞形容詞句", "祈使句"], "Traveling by train 位於句首並作為一件事。", "V-ing 片語可當名詞使用，作主詞時通常視為單數。", ["找到句首 Traveling", "確認沒有進行式主詞", "把整段視為一件事", "判斷為動名詞主詞"]),
                choice("It is safe to travel in Taiwan.", "It is＋形容詞＋to V", ["現在進行式", "被動語態"], ["It is＋形容詞＋to V", "It is＋名詞＋V-ing", "現在完成式", "過去進行式"], "It 是虛主詞，to travel 是真正主詞。", "It is＋形容詞＋to V 用來描述做某事的特性。", ["找到 It is", "找到形容詞 safe", "看到 to travel", "判斷虛主詞句型"]),
                choice("Practicing English every day is helpful.", "動名詞主詞搭配單數動詞 is", ["複數主詞搭配 are", "現在進行式"], ["動名詞主詞搭配單數動詞 is", "動名詞主詞搭配複數動詞 are", "過去進行式 was practicing", "祈使句 practice"], "整個 Practicing 片語視為一件事。", "單一動名詞片語作主詞時，be 動詞使用單數 is／was。", ["圈出完整主詞片語", "視為一件活動", "選單數 is", "檢查 helpful"]),
                choice("Which verb must be followed by V-ing?", "finish", ["need", "plan"], ["finish", "want", "need", "plan"], "finish doing 是固定搭配。", "finish、enjoy、keep、practice、give up 後接 V-ing。", ["逐一回想搭配", "排除 want to V", "排除 need／plan to V", "選 finish"])
            ],
            doctor: [
                choice("Dad wants buying a new car.", "Dad wants to buy a new car.", ["Dad wants buy a new car.", "Dad wants bought a new car."], ["Dad wants buying a new car.", "Dad wants buy a new car.", "Dad wants to buying a new car."], "want 後應使用 to buy。", "want＋to＋原形動詞。", ["找到 wants", "判斷接 to V", "buying 改 to buy", "保留第三人稱 wants"]),
                choice("We enjoy to watch movies together.", "We enjoy watching movies together.", ["We enjoy watch movies together.", "We enjoy watched movies together."], ["We enjoy to watch movies together.", "We enjoy watch movies together.", "We are enjoy watching movies together."], "enjoy 後使用 watching。", "enjoy＋V-ing，不接 to V。", ["找到 enjoy", "判斷接 V-ing", "to watch 改 watching", "檢查受詞 movies"]),
                choice("Mia practices to speak English every day.", "Mia practices speaking English every day.", ["Mia practice speaking English every day.", "Mia practices speak English every day."], ["Mia practices to speaking English every day.", "Mia is practice speaking English every day.", "Mia practices spoke English every day."], "practice 後接 speaking。", "practice doing 表示練習做某事；主詞 Mia 使 practice 加 s。", ["找到 Mia", "保留 practices", "to speak 改 speaking", "檢查 every day"]),
                choice("They plan visiting the museum tomorrow.", "They plan to visit the museum tomorrow.", ["They plan visit the museum tomorrow.", "They plan visited the museum tomorrow."], ["They plan to visiting the museum tomorrow.", "They are plan to visit the museum tomorrow.", "They plan visits the museum tomorrow."], "plan 後接 to visit。", "plan＋to V 表示計畫做某事。", ["找到 plan", "加入 to", "visit 保持原形", "保留 tomorrow"]),
                choice("Leo kept to talk during class.", "Leo kept talking during class.", ["Leo kept talk during class.", "Leo keeps talked during class."], ["Leo kept to talking during class.", "Leo was kept talk during class.", "Leo kept talked during class."], "keep 後接 talking。", "keep＋V-ing 表示持續做某事。", ["找到 kept", "判斷固定搭配", "to talk 改 talking", "保留過去式 kept"]),
                choice("Reading books are good for you.", "Reading books is good for you.", ["Read books is good for you.", "Reading books be good for you."], ["Reading books are good for you.", "To reading books is good for you.", "Reading books were good for you every day."], "Reading books 是單一活動。", "動名詞片語作主詞時通常視為單數，使用 is。", ["找出主詞片語", "視為一件事", "are 改 is", "檢查形容詞 good"]),
                choice("It is difficult finding a parking space.", "It is difficult to find a parking space.", ["It difficult to find a parking space.", "It is difficult find a parking space."], ["It is difficult to finding a parking space.", "It is difficulty to find a parking space.", "It does difficult to find a parking space."], "形容詞 difficult 後接 to find。", "It is＋形容詞＋to V。", ["保留 It is", "找到 difficult", "finding 改 to find", "確認 find 為原形"]),
                choice("My brother finished to do his homework.", "My brother finished doing his homework.", ["My brother finished do his homework.", "My brother finish doing his homework."], ["My brother finished to doing his homework.", "My brother did finished doing his homework.", "My brother finished did his homework."], "finish 後接 doing。", "finish＋V-ing；過去情境使用 finished。", ["找到 finished", "判斷接 V-ing", "to do 改 doing", "保留過去式"]),
                choice("Going to bed early are healthy.", "Going to bed early is healthy.", ["Go to bed early is healthy.", "Going to bed early be healthy."], ["Going to bed early are health.", "Going to bed early is healthily.", "To going to bed early is healthy."], "Going to bed early 是單一活動。", "動名詞片語作主詞搭配單數動詞，be 後接形容詞 healthy。", ["找完整主詞", "選單數 is", "保留形容詞 healthy", "檢查句意"]),
                choice("Nina needs finishing the report today.", "Nina needs to finish the report today.", ["Nina need to finish the report today.", "Nina needs finish the report today."], ["Nina needs to finishing the report today.", "Nina is need to finish the report today.", "Nina needs finished the report today."], "need 後使用 to finish。", "need＋to V；第三人稱 Nina 使用 needs。", ["找到 Nina", "保留 needs", "接 to finish", "確認 today 語意"])
            ],
            transform: [
                reorder("我想在海邊拍照。", ["I", "want", "to take", "pictures", "at the beach", "."], "I want to take pictures at the beach.", "先排 I want，再接 to take。", "want＋to V。", ["排 I want", "加入 to take", "接 pictures", "最後放地點"]),
                reorder("她每天練習說英語。", ["She", "practices", "speaking", "English", "every day", "."], "She practices speaking English every day.", "She 後使用 practices。", "practice＋V-ing。", ["放主詞 She", "使用 practices", "接 speaking English", "最後放 every day"]),
                reorder("我們計畫這個週末參觀博物館。", ["We", "plan", "to visit", "the museum", "this weekend", "."], "We plan to visit the museum this weekend.", "plan 後接 to visit。", "plan＋to V。", ["排 We plan", "接 to visit", "加入受詞 museum", "最後放時間"]),
                reorder("每天運動對健康有益。", ["Exercising", "every day", "is", "good", "for your health", "."], "Exercising every day is good for your health.", "Exercising every day 是主詞。", "動名詞片語作主詞使用單數 is。", ["組成主詞片語", "接單數 is", "加入 good", "完成 for your health"]),
                reorder("在雨天騎車很危險。", ["It", "is", "dangerous", "to ride a bike", "on rainy days", "."], "It is dangerous to ride a bike on rainy days.", "先排 It is dangerous。", "It is＋形容詞＋to V。", ["放 It is", "加入 dangerous", "接 to ride", "最後放時間情境"]),
                choice("Traveling alone is exciting.", "It is exciting to travel alone.", ["It exciting traveling alone.", "It is excited to traveling alone."], ["It is exciting traveling to alone.", "It does exciting to travel alone.", "It is excitement to travel alone."], "動名詞主詞可改成 It is＋形容詞＋to V。", "V-ing＋be＋形容詞＝It＋be＋形容詞＋to V。", ["找到活動 traveling", "把形容詞 exciting 保留", "使用虛主詞 It", "travel 改 to travel"]),
                choice("It is convenient to take the MRT.", "Taking the MRT is convenient.", ["Take the MRT is convenient.", "Taking the MRT are convenient."], ["To taking the MRT is convenient.", "Taking the MRT is convenience.", "The MRT taking is conveniently."], "to take the MRT 可改成 Taking the MRT 當主詞。", "It is＋形容詞＋to V 可改為 V-ing＋is＋形容詞。", ["找到真正活動 take", "改成 Taking", "把片語放句首", "搭配單數 is"]),
                choice("Leo likes to cook for his family.", "Leo likes cooking for his family.", ["Leo likes cook for his family.", "Leo liking to cook for his family."], ["Leo likes to cooking for his family.", "Leo is like cooking for his family.", "Leo likes cooked for his family."], "like 可接 to V，也可接 V-ing。", "like、love、start、begin 後接 to V 或 V-ing，基本語意相近。", ["保留主詞 Leo", "保留 likes", "to cook 改 cooking", "檢查其餘語意"]),
                choice("They started studying at seven.", "They started to study at seven.", ["They started study at seven.", "They start to studied at seven."], ["They started to studying at seven.", "They did started to study at seven.", "They were started study at seven."], "start 可接 studying 或 to study。", "start＋V-ing＝start＋to V。", ["保留 started", "把 studying 改 to study", "study 使用原形", "保留時間"]),
                reorder("他放棄在下雨天騎車。", ["He", "gave up", "riding a bike", "on rainy days", "."], "He gave up riding a bike on rainy days.", "gave up 後接 riding。", "give up＋V-ing；過去式為 gave up。", ["放主詞 He", "使用 gave up", "接 riding a bike", "最後放時間情境"])
            ],
            dialogue: [
                choice("A: What do you want to do this weekend?\nB: _____", "I want to visit my grandparents.", ["I want visiting my grandparents.", "I enjoy to visit my grandparents."], ["I want visit my grandparents.", "I am want to visit my grandparents.", "I want to visiting my grandparents."], "want to do 問句以 want to V 回答。", "want＋to＋原形動詞。", ["確認問的是計畫", "以 I want 回答", "加入 to visit", "補上受詞"]),
                choice("A: What does Mia enjoy doing?\nB: _____", "She enjoys drawing pictures.", ["She enjoys to draw pictures.", "She enjoy drawing pictures."], ["She enjoys draw pictures.", "She is enjoy drawing pictures.", "She enjoys to drawing pictures."], "enjoy doing 問句以 enjoys＋V-ing 回答。", "enjoy＋V-ing；Mia 對應 She enjoys。", ["以 She 回答", "使用 enjoys", "draw 改 drawing", "加入 pictures"]),
                choice("A: Why are you tired?\nB: _____", "I kept studying until midnight.", ["I kept to study until midnight.", "I keep studied until midnight."], ["I did kept studying until midnight.", "I kept study until midnight.", "I was keep studying until midnight."], "keep studying 表示持續讀書。", "keep＋V-ing；過去式使用 kept。", ["使用過去式 kept", "接 studying", "補充 until midnight", "檢查因果"]),
                choice("A: Do you have plans for winter vacation?\nB: _____", "Yes. We plan to travel around Taiwan.", ["Yes. We plan traveling around Taiwan.", "Yes. We planning to travel around Taiwan."], ["Yes. We plan travel around Taiwan.", "Yes. We do plan to traveling around Taiwan.", "Yes. We are plan to travel around Taiwan."], "plan 後接 to travel。", "plan＋to V 表示計畫。", ["先用 Yes 回答", "使用 We plan", "加入 to travel", "完成地點片語"]),
                choice("A: How can I get better at basketball?\nB: _____", "Keep practicing every day.", ["Keep to practice every day.", "Keep practice every day."], ["Keeping practice every day.", "Keep practiced every day.", "Keep to practicing every day."], "keep practicing 表示持續練習。", "keep＋V-ing，也可用祈使句提出建議。", ["使用動詞 Keep 開頭", "接 practicing", "加入 every day", "確認建議語氣"]),
                choice("A: Is it safe to swim here?\nB: _____", "No. It is dangerous to swim near the rocks.", ["No. Swimming near the rocks are dangerous.", "No. It dangerous swim near rocks."], ["No. It is danger to swimming near the rocks.", "No. It does dangerous to swim near the rocks.", "No. It is dangerously to swim near the rocks."], "dangerous 是形容詞，後接 to swim。", "It is＋形容詞＋to V。", ["先用 No 回答", "使用 It is dangerous", "接 to swim", "加入地點"]),
                choice("A: What hobby does Ben have?\nB: _____", "He loves taking photos.", ["He loves take photos.", "He love taking photos."], ["He is love taking photos.", "He loves to taking photos.", "He loves took photos."], "love 可接 taking。", "love＋V-ing 或 love＋to V；He 搭配 loves。", ["以 He 回答", "使用 loves", "接 taking", "完成 photos"]),
                choice("A: Did Lily finish her report?\nB: _____", "Yes. She finished writing it last night.", ["Yes. She finished to write it last night.", "Yes. She finish writing it last night."], ["Yes. She did finished writing it.", "Yes. She finished write it last night.", "Yes. She was finished to write it."], "finish 後接 writing。", "finish＋V-ing；過去式為 finished。", ["先用 Yes 回答", "使用 finished", "接 writing", "補上時間"]),
                choice("A: The beach is full of trash. What should we do?\nB: _____", "We need to clean it up.", ["We need cleaning it up.", "We need clean it up."], ["We are need to clean it up.", "We need to cleaning it up.", "We needed clean it up now."], "need 後接 to clean。", "need＋to V 表示需要做某事。", ["以 We 回答", "使用 need", "加入 to clean", "完成 it up"]),
                choice("A: Why does Nora speak English so well?\nB: _____", "She practices speaking it every day.", ["She practices to speak it every day.", "She practice speaking it every day."], ["She is practice speaking it every day.", "She practices speak it every day.", "She did practices speaking it every day."], "practice speaking 表示練習口說。", "practice＋V-ing；She 搭配 practices。", ["以 She 回答", "使用 practices", "接 speaking", "加入 every day"])
            ]
        }
    };
})();
