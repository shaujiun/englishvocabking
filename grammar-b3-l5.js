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

    window.B3_L5_GRAMMAR = {
        code: "L5",
        label: "第 5 課",
        kicker: "B3・LESSON 5",
        title: "時間金錢文法冒險",
        description: "練習 spend、take、cost、pay 的時間與金錢句型。每回合 10 題，先找花費者與被花費的事物，再選正確動詞。",
        stageDescriptions: {
            classification: "分辨 spend、take、cost、pay 的主詞與後接形式。",
            doctor: "修正時間、金錢、V-ing、to V、on 與 for 的常見錯誤。",
            transform: "在 spend、take、cost、pay 句型間改寫並重組問答。",
            dialogue: "在旅遊、購物與日常活動中詢問花多少時間或金錢。"
        },
        summarySteps: ["先判斷問時間或金錢", "找出主詞是人或物", "選 spend、take、cost 或 pay", "檢查 V-ing、to V、on 或 for"],
        questionBank: {
            classification: [
                choice("I spent two hours doing my homework.", "人＋spend＋時間＋V-ing", ["It takes＋時間＋to V", "物＋cost＋金錢"], ["人＋spend＋金錢＋on", "人＋pay＋金錢＋for", "It takes＋人＋時間＋to V"], "主詞 I 花兩小時做事，後接 doing。", "人花時間做事：人＋spend＋時間＋V-ing。", ["找主詞 I", "找到 spent", "辨認 two hours", "確認 doing 為 V-ing"]),
                choice("Mia spent five hundred dollars on the bag.", "人＋spend＋金錢＋on＋物", ["物＋cost＋人＋金錢", "人＋spend＋時間＋V-ing"], ["人＋pay＋金錢＋for＋物", "It takes＋人＋時間＋to V", "物＋cost＋金錢"], "Mia 是花錢的人，on 後接 bag。", "人花錢買物：人＋spend＋金錢＋on＋物。", ["找主詞 Mia", "辨認金額", "找到 on", "確認 on 後是物品"]),
                choice("It takes Leo thirty minutes to walk to school.", "It takes＋人＋時間＋to V", ["人＋spend＋時間＋V-ing", "物＋cost＋金錢"], ["It takes＋物＋金錢＋to V", "人＋pay＋時間＋for", "人＋spend＋金錢＋on"], "It 是虛主詞，Leo 是實際花時間的人。", "It takes＋人＋時間＋to V 表示做某事花某人多少時間。", ["找到 It takes", "找出 Leo", "找到 thirty minutes", "確認 to walk"]),
                choice("The bicycle cost me three thousand dollars.", "物＋cost＋人＋金錢", ["人＋pay＋金錢＋for＋物", "人＋spend＋時間＋V-ing"], ["物＋cost＋金錢＋for＋人", "It takes＋人＋時間＋to V", "人＋spend＋金錢＋on＋物"], "bicycle 是物品主詞，me 是付費者。", "物品花某人多少錢：物＋cost＋人＋金錢。", ["找物品主詞 bicycle", "找到 cost", "辨認 me", "最後找到金額"]),
                choice("Dad paid two thousand dollars for the phone.", "人＋pay＋金錢＋for＋物", ["人＋spend＋金錢＋on＋物", "物＋cost＋人＋金錢"], ["人＋pay＋物＋for＋金錢", "It takes＋人＋時間＋to V", "人＋spend＋時間＋V-ing"], "Dad 付款，for 後接 phone。", "人付款買物：人＋pay＋金錢＋for＋物。", ["找付款者 Dad", "找到 paid", "辨認金額", "確認 for 後接物品"]),
                choice("How long did you spend cleaning the room?", "詢問某人做事花多少時間", ["詢問物品多少錢", "詢問某人付多少錢"], ["詢問交通工具花多少錢", "詢問物品成本", "詢問某人買了什麼"], "How long 問時間，spend 後接 cleaning。", "How long＋did＋人＋spend＋V-ing？", ["找到 How long", "找到主詞 you", "辨認 spend", "確認 cleaning"]),
                choice("How much did Ben spend on the jacket?", "詢問某人在物品上花多少錢", ["詢問花多少時間", "詢問物品花誰的錢"], ["詢問做事多久", "詢問交通時間", "詢問物品重量"], "How much 問金額，on 後接 jacket。", "How much＋did＋人＋spend＋on＋物？", ["找到 How much", "找到 Ben", "找到 spend on", "判斷問金額"]),
                choice("How long does it take to get there by bus?", "詢問完成行程需要多久", ["詢問車票多少錢", "詢問誰搭公車"], ["詢問某人花多少錢", "詢問公車價值", "詢問行程距離"], "How long 與 take to get 表示所需時間。", "How long does it take＋to V？", ["找到 How long", "辨認 does it take", "找到 to get", "判斷問所需時間"]),
                choice("How much does this laptop cost?", "物品作主詞詢問價格", ["人作主詞詢問付款", "詢問使用時間"], ["人作主詞詢問 spend", "詢問維修時間", "詢問物品使用者"], "this laptop 是物品主詞。", "How much＋does＋物＋cost？", ["找到 How much", "確認主詞是 laptop", "選擇 cost", "判斷問價格"]),
                choice("How much did you pay for the ticket?", "人作主詞詢問付款金額", ["物品作主詞詢問 cost", "詢問花多少時間"], ["人作主詞詢問 spend time", "物品作主詞詢問價值", "詢問票券張數"], "you 是付款者，for 後接 ticket。", "How much＋did＋人＋pay＋for＋物？", ["找到 How much", "確認主詞 you", "找到 pay for", "判斷問付款金額"])
            ],
            doctor: [
                choice("I spent three hours to finish my homework.", "I spent three hours finishing my homework.", ["I spent three hours finish my homework.", "I spent to finish three hours."], ["I spent three hours to finishing my homework.", "I did spent three hours finishing my homework.", "I spent three hours finished my homework."], "spend＋時間後接 V-ing。", "人＋spend＋時間＋V-ing。", ["找到 spent", "找到時間", "to finish 改 finishing", "檢查受詞"]),
                choice("Mom spent five hundred dollars for the shoes.", "Mom spent five hundred dollars on the shoes.", ["Mom spent on five hundred dollars the shoes.", "Mom spent five hundred dollars to the shoes."], ["Mom did spent five hundred dollars on the shoes.", "Mom spent five hundred dollars for buying on the shoes.", "Mom spent the shoes on five hundred dollars."], "spend money 搭配 on。", "人＋spend＋金錢＋on＋物。", ["找到 spent", "確認後接金額", "for 改 on", "保留 shoes"]),
                choice("It took me an hour fixing the bike.", "It took me an hour to fix the bike.", ["It took me to fix an hour the bike.", "It spent me an hour fixing the bike."], ["It did took me an hour to fix the bike.", "It took I an hour to fix the bike.", "It took me an hour to fixing the bike."], "take 句型後接 to fix。", "It takes／took＋人＋時間＋to V。", ["保留 It took", "me 放在人位置", "接 an hour", "fixing 改 to fix"]),
                choice("The new computer paid me thirty thousand dollars.", "The new computer cost me thirty thousand dollars.", ["The new computer spent me thirty thousand dollars.", "The new computer took me thirty thousand dollars."], ["The new computer did costed me thirty thousand dollars.", "The new computer cost to me thirty thousand dollars.", "The new computer was paid me thirty thousand dollars."], "物品作主詞使用 cost。", "物＋cost＋人＋金錢；cost 的過去式仍是 cost。", ["找到物品主詞", "判斷問價格", "paid 改 cost", "保留 me 與金額"]),
                choice("Leo paid two thousand dollars on the watch.", "Leo paid two thousand dollars for the watch.", ["Leo paid for two thousand dollars the watch.", "Leo paid the watch two thousand dollars."], ["Leo did paid two thousand dollars for the watch.", "Leo paid two thousand dollars to the watch.", "Leo was pay two thousand dollars for the watch."], "pay money 搭配 for。", "人＋pay＋金錢＋for＋物。", ["找到付款者 Leo", "找到 paid", "on 改 for", "保留 watch"]),
                choice("How long did Mia spent cooking dinner?", "How long did Mia spend cooking dinner?", ["How long Mia did spend cooking dinner?", "How long did Mia spend to cook dinner?"], ["How long did Mia spent to cook dinner?", "How long was Mia spend cooking dinner?", "How long did Mia spending dinner?"], "did 後使用原形 spend。", "How long did＋主詞＋spend＋V-ing？", ["保留 How long", "找到 did", "spent 改 spend", "保留 cooking"]),
                choice("How much did the bike cost you for?", "How much did the bike cost you?", ["How much did you cost for the bike?", "How much the bike did cost you?"], ["How much did the bike cost for you?", "How much was the bike cost you?", "How much did the bike costed you?"], "cost 句型不加 for。", "How much did＋物＋cost＋人？", ["找到物品 bike", "保留 did cost", "保留 you", "刪除多餘 for"]),
                choice("How much did you paid for the meal?", "How much did you pay for the meal?", ["How much you did pay for the meal?", "How much did you pay on the meal?"], ["How much were you pay for the meal?", "How much did you paying for the meal?", "How much did you paid on the meal?"], "did 後使用 pay。", "How much did＋人＋pay＋for＋物？", ["保留 How much", "找到 did", "paid 改 pay", "保留 for the meal"]),
                choice("It spends us two hours to clean the room.", "It takes us two hours to clean the room.", ["It costs us two hours to clean the room.", "It takes we two hours cleaning the room."], ["It does take us two hours cleaning the room.", "It takes us two hours clean the room.", "It is take us two hours to clean the room."], "It 作虛主詞時使用 takes。", "It takes＋人＋時間＋to V。", ["找到 It", "spends 改 takes", "保留 us 與時間", "接 to clean"]),
                choice("I took two hours doing the report.", "I spent two hours doing the report.", ["I cost two hours doing the report.", "I paid two hours doing the report."], ["I did spent two hours doing the report.", "I spent two hours to doing the report.", "I was spent two hours doing the report."], "人作主詞並直接接時間時使用 spend。", "人＋spend＋時間＋V-ing；take 句型通常以 It 作主詞。", ["確認主詞 I", "辨認 two hours", "took 改 spent", "保留 doing"])
            ],
            transform: [
                reorder("我昨天花兩小時讀英文。", ["I", "spent", "two hours", "studying English", "yesterday", "."], "I spent two hours studying English yesterday.", "先排 I spent two hours。", "人＋spend＋時間＋V-ing。", ["放主詞 I", "接 spent 與時間", "加入 studying English", "最後放 yesterday"]),
                reorder("爸爸在這台電腦上花了三萬元。", ["Dad", "spent", "thirty thousand dollars", "on", "this computer", "."], "Dad spent thirty thousand dollars on this computer.", "金額後使用 on。", "人＋spend＋金錢＋on＋物。", ["放 Dad spent", "接金額", "加入 on", "最後放物品"]),
                reorder("搭火車到花蓮需要兩小時。", ["It", "takes", "two hours", "to get to Hualien", "by train", "."], "It takes two hours to get to Hualien by train.", "先排 It takes two hours。", "It takes＋時間＋to V。", ["放 It takes", "接時間", "加入 to get", "最後放交通方式"]),
                reorder("這件外套花了我一千五百元。", ["The jacket", "cost", "me", "fifteen hundred dollars", "."], "The jacket cost me fifteen hundred dollars.", "物品 jacket 放句首。", "物＋cost＋人＋金錢。", ["放物品主詞", "接 cost", "加入 me", "最後放金額"]),
                reorder("她花八百元買這些書。", ["She", "paid", "eight hundred dollars", "for", "these books", "."], "She paid eight hundred dollars for these books.", "paid 後先放金額，再放 for。", "人＋pay＋金錢＋for＋物。", ["放 She paid", "接金額", "加入 for", "最後放 books"]),
                choice("It took Ben forty minutes to wash the car.", "Ben spent forty minutes washing the car.", ["Ben spent forty minutes to wash the car.", "Ben cost forty minutes washing the car."], ["Ben did spent forty minutes washing the car.", "Ben spent forty minutes wash the car.", "Ben paid forty minutes washing the car."], "改以 Ben 作主詞時使用 spent＋時間＋washing。", "It took＋人＋時間＋to V＝人 spent＋時間＋V-ing。", ["把 Ben 移到主詞", "took 改 spent", "保留時間", "to wash 改 washing"]),
                choice("Amy spent one hour practicing the piano.", "It took Amy one hour to practice the piano.", ["It spent Amy one hour practicing the piano.", "It took Amy one hour practicing the piano."], ["It did took Amy one hour to practice the piano.", "It took Amy one hour to practicing the piano.", "It cost Amy one hour to practice the piano."], "改用 It 作主詞時使用 took＋Amy＋時間＋to practice。", "人 spent＋時間＋V-ing＝It took＋人＋時間＋to V。", ["以 It 作主詞", "使用 took", "接 Amy 與時間", "practicing 改 to practice"]),
                choice("The shoes cost Leo two thousand dollars.", "Leo paid two thousand dollars for the shoes.", ["Leo paid the shoes for two thousand dollars.", "Leo spent two thousand dollars for the shoes."], ["Leo did paid two thousand dollars for the shoes.", "Leo paid two thousand dollars on the shoes.", "Leo cost two thousand dollars for the shoes."], "改以 Leo 作主詞時使用 paid＋金額＋for。", "物 cost 人金錢＝人 paid 金錢 for 物。", ["把 Leo 移到主詞", "cost 改 paid", "接金額", "用 for 接 shoes"]),
                choice("Nina paid five hundred dollars for the bag.", "The bag cost Nina five hundred dollars.", ["The bag paid Nina five hundred dollars.", "The bag cost five hundred dollars for Nina."], ["The bag did costed Nina five hundred dollars.", "The bag was cost Nina five hundred dollars.", "The bag spent Nina five hundred dollars."], "改以 bag 作主詞時使用 cost。", "人 paid 金錢 for 物＝物 cost 人金錢。", ["把 bag 移到主詞", "使用 cost", "接 Nina", "最後放金額"]),
                reorder("你花多少錢買這支手機？", ["How much", "did", "you", "pay", "for", "this phone", "?"], "How much did you pay for this phone?", "先排 How much did you。", "How much did＋人＋pay＋for＋物？", ["放 How much", "接 did you", "加入 pay for", "最後放物品與問號"])
            ],
            dialogue: [
                choice("A: How long did you spend preparing for the test?\nB: _____", "I spent three hours preparing for it.", ["I spent three hours to prepare for it.", "It spent me three hours preparing."], ["I did spent three hours preparing for it.", "I spent preparing three hours for it.", "I paid three hours preparing for it."], "spend time 後接 preparing。", "人＋spend＋時間＋V-ing。", ["以 I 回答", "使用 spent", "接 three hours", "加入 preparing"]),
                choice("A: How much did you spend on this backpack?\nB: _____", "I spent twelve hundred dollars on it.", ["I spent twelve hundred dollars for it.", "It spent me twelve hundred dollars."], ["I did spent twelve hundred dollars on it.", "I paid on it twelve hundred dollars.", "I spent it on twelve hundred dollars."], "回答 spend on 問句仍用 spent＋金額＋on。", "人＋spent＋金錢＋on＋物。", ["以 I 回答", "使用 spent", "接金額", "用 on it"]),
                choice("A: How long does it take to get to school?\nB: _____", "It takes about twenty minutes.", ["I spend about twenty minutes to school.", "It costs twenty minutes."], ["It does takes about twenty minutes.", "It takes about twenty minutes getting.", "It is take about twenty minutes."], "How long does it take 以 It takes 回答。", "問句 does 後用 take；答句第三人稱使用 takes。", ["以 It 回答", "使用 takes", "加入 about", "說明時間"]),
                choice("A: How much does the tablet cost?\nB: _____", "It costs eight thousand dollars.", ["I pay eight thousand dollars on it.", "It spends eight thousand dollars."], ["It does cost eight thousand dollars.", "It costed eight thousand dollars.", "It is cost eight thousand dollars."], "物品價格以 It costs 回答。", "現在式物品單數主詞＋costs＋金額。", ["以 It 代替 tablet", "使用 costs", "接金額", "檢查現在式"]),
                choice("A: How much did you pay for the ticket?\nB: _____", "I paid six hundred dollars for it.", ["I paid six hundred dollars on it.", "It paid me six hundred dollars."], ["I did paid six hundred dollars for it.", "I payed six hundred dollars for it.", "I spent for it six hundred dollars."], "pay for 問句以 paid＋金額＋for 回答。", "pay 的過去式是 paid；pay money for something。", ["以 I 回答", "使用 paid", "接金額", "用 for it"]),
                choice("A: Why are you so tired?\nB: _____", "I spent all morning cleaning the house.", ["I spent all morning to clean the house.", "It took all morning cleaning me."], ["I did spent all morning cleaning the house.", "I spent cleaning all morning the house.", "I paid all morning cleaning the house."], "花時間做事使用 spent＋時間＋cleaning。", "人＋spend＋時間＋V-ing。", ["找合理原因", "使用 spent", "接 all morning", "加入 cleaning"]),
                choice("A: Was the new bike expensive?\nB: _____", "Yes. It cost me ten thousand dollars.", ["Yes. It paid me ten thousand dollars.", "Yes. I cost ten thousand dollars for it."], ["Yes. It did costed me ten thousand dollars.", "Yes. It was cost me ten thousand dollars.", "Yes. It spent me ten thousand dollars."], "bike 是物品主詞，使用 cost。", "物＋cost＋人＋金錢；cost 的過去式同形。", ["以 It 代替 bike", "使用 cost", "接 me", "最後放金額"]),
                choice("A: The train ride was long.\nB: How long did it take?\nA: _____", "It took about four hours.", ["I spent about four hours to train.", "It cost about four hours."], ["It did took about four hours.", "It was take about four hours.", "It took about four hours riding by I."], "過去問句以 It took 回答。", "How long did it take？答句用 It took＋時間。", ["確認過去情境", "以 It 回答", "take 改 took", "補充時間"]),
                choice("A: I bought this book for two hundred dollars.\nB: _____", "So you paid two hundred dollars for it.", ["So it paid you two hundred dollars.", "So you spent two hundred dollars for it."], ["So you did paid two hundred dollars for it.", "So you paid it for two hundred dollars.", "So it cost two hundred dollars for you paid."], "人付款使用 paid＋金額＋for。", "人＋pay＋金錢＋for＋物。", ["以 you 作主詞", "使用 paid", "接金額", "用 for it"]),
                choice("A: How long did Emma spend learning to swim?\nB: _____", "She spent six months learning it.", ["She spent six months to learn it.", "It spent her six months learning it."], ["She did spent six months learning it.", "She spent learning it six months to.", "She paid six months learning it."], "回答 spend 問句使用 spent＋時間＋learning。", "人＋spent＋時間＋V-ing。", ["以 She 回答", "使用 spent", "接 six months", "加入 learning it"])
            ]
        }
    };
})();
