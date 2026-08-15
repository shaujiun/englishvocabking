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

    window.B3_L6_GRAMMAR = {
        code: "L6",
        label: "第 6 課",
        kicker: "B3・LESSON 6",
        title: "未來計畫文法冒險",
        description: "練習 will、be going to、未來式問答與反身代名詞。每回合 10 題，分清楚預測、臨時決定、既定計畫與動作回到主詞本身。",
        stageDescriptions: {
            classification: "辨認 will、be going to、未來時間詞及反身代名詞。",
            doctor: "修正 will 後動詞、be going to 結構與反身代名詞一致。",
            transform: "重組未來式問答，並在 will 與 be going to 句型間改寫。",
            dialogue: "在計畫、預測、提議及自行完成事情的情境中正確作答。"
        },
        summarySteps: ["先找未來時間詞", "判斷 will 或 be going to", "檢查後接原形動詞", "確認反身代名詞與主詞一致"],
        questionBank: {
            classification: [
                choice("It will rain tomorrow.", "will＋原形動詞表示未來", ["一般現在式", "過去進行式"], ["be going to 未來式", "現在完成式", "被動語態"], "will 後接原形 rain，tomorrow 表示未來。", "will＋原形動詞可表預測或未來事件。", ["找到 tomorrow", "找到 will", "確認 rain 是原形", "判斷為未來式"]),
                choice("We won't visit the museum next week.", "will not 的未來否定句", ["一般過去式否定句", "現在式否定句"], ["be going to 否定句", "過去完成式否定句", "未來式疑問句"], "won't 是 will not 的縮寫。", "未來否定：will not／won't＋原形動詞。", ["找到 next week", "辨認 won't", "確認 visit 原形", "判斷未來否定"]),
                choice("Will Amy join us tonight?", "will 未來式 Yes／No 問句", ["現在式問句", "過去式問句"], ["be going to 問句", "未來式 Wh-問句", "現在完成式問句"], "Will 位於句首，tonight 是未來時間。", "Will＋主詞＋原形動詞？", ["找到句首 Will", "找到 Amy", "確認 join 原形", "判斷 Yes／No 問句"]),
                choice("What will you do after school?", "will 未來式 What 問句", ["一般過去式 What 問句", "現在進行式問句"], ["be going to Yes／No 問句", "過去式 Why 問句", "反身代名詞句"] , "What 後接 will you do。", "What＋will＋主詞＋原形動詞？", ["找到 What", "找到 will", "確認 do 原形", "判斷詢問未來行動"]),
                choice("Dad is going to cook dinner tonight.", "be going to 表示既定計畫", ["現在進行式正在前往", "一般過去式"], ["will 的臨時決定", "現在完成式", "被動語態"], "is going to 後接 cook，表示已安排的計畫。", "主詞＋be going to＋原形動詞表示未來計畫。", ["找到 tonight", "辨認 is going to", "確認 cook 原形", "判斷既定計畫"]),
                choice("Are they going to play basketball later?", "be going to 未來式問句", ["現在進行式地點問句", "一般現在式問句"], ["will 未來式問句", "過去進行式問句", "現在完成式問句"], "Are 移到主詞 they 前，going to 後接 play。", "Be＋主詞＋going to＋原形動詞？", ["找到 later", "找到句首 Are", "辨認 going to", "確認 play 原形"]),
                choice("I cut myself while cooking.", "反身代名詞作受詞", ["主格代名詞", "所有格代名詞"], ["強調未來動作", "複數反身代名詞", "受格代名詞 me"], "I 與 myself 指同一人。", "主詞對自己做動作時，可用反身代名詞作受詞。", ["找到主詞 I", "找到動詞 cut", "受詞也是 I", "使用 myself"]),
                choice("The children made the cards by themselves.", "by＋反身代名詞表示獨自完成", ["表示和別人一起", "表示被動語態"], ["表示未來計畫", "表示動作互相進行", "表示所有權"], "by themselves 表示孩子們自己完成。", "by oneself＝獨自、靠自己。", ["找到 by", "找到 themselves", "對應 children 複數", "判斷自行完成"]),
                choice("Which reflexive pronoun matches she?", "herself", ["himself", "itself"], ["themselves", "yourself", "ourselves"], "she 對應 herself。", "he→himself；she→herself；it→itself。", ["確認主詞 she", "判斷第三人稱單數女性", "選 her 系列", "完成 herself"]),
                choice("Which future form best shows a plan already decided?", "be going to＋原形動詞", ["did＋原形動詞", "was＋V-ing"], ["will not＋原形動詞", "一般過去式", "反身代名詞"], "be going to 常表事先決定的計畫。", "will 常用於預測、承諾或當下決定；be going to 偏向已有計畫或跡象。", ["找關鍵字 plan", "排除過去式", "比較兩種未來式", "選 be going to"])
            ],
            doctor: [
                choice("Will Leo goes to school tomorrow?", "Will Leo go to school tomorrow?", ["Will Leo going to school tomorrow?", "Does Leo will go to school tomorrow?"], ["Will Leo went to school tomorrow?", "Is Leo will go to school tomorrow?", "Will goes Leo to school tomorrow?"], "will 後接原形 go。", "Will＋主詞＋原形動詞？", ["保留句首 Will", "保留主詞 Leo", "goes 改 go", "檢查 tomorrow"]),
                choice("Mia won't to join the party.", "Mia won't join the party.", ["Mia won't joining the party.", "Mia doesn't will join the party."], ["Mia won't joined the party.", "Mia isn't will join the party.", "Mia will not to join the party."], "won't 後不加 to。", "will／won't＋原形動詞。", ["找到 won't", "刪除 to", "保留原形 join", "檢查受詞"]),
                choice("What will you doing tonight?", "What will you do tonight?", ["What do you will tonight?", "What are you will do tonight?"], ["What will you did tonight?", "What will doing you tonight?", "What you will do tonight?"], "will 後使用 do。", "What＋will＋主詞＋原形動詞？", ["保留 What", "接 will you", "doing 改 do", "最後放 tonight"]),
                choice("She going to buy a new bag tomorrow.", "She is going to buy a new bag tomorrow.", ["She does going to buy a new bag tomorrow.", "She is go to buy a new bag tomorrow."], ["She is going buy a new bag tomorrow.", "She going to buys a new bag tomorrow.", "She will going to buy a new bag tomorrow."], "be going to 不能缺少 is。", "主詞＋be＋going to＋原形動詞。", ["找到主詞 She", "補上 is", "保留 going to", "確認 buy 原形"]),
                choice("Are Tom going to study tonight?", "Is Tom going to study tonight?", ["Does Tom going to study tonight?", "Is Tom going to studying tonight?"], ["Are Tom going study tonight?", "Will Tom going to study tonight?", "Is going Tom to study tonight?"], "Tom 是單數，使用 Is。", "Be going to 問句的 be 動詞需與主詞一致。", ["找到 Tom", "判斷單數", "Are 改 Is", "保留 to study"]),
                choice("They are going to played soccer later.", "They are going to play soccer later.", ["They are going play soccer later.", "They going to play soccer later."], ["They are going to playing soccer later.", "They will going to play soccer later.", "They are go to play soccer later."], "to 後接原形 play。", "be going to＋原形動詞。", ["保留 They are", "保留 going to", "played 改 play", "檢查 later"]),
                choice("Henry fell down and hurt hisself.", "Henry fell down and hurt himself.", ["Henry fell down and hurt herself.", "Henry fell down and hurt itself."], ["Henry fell down and hurt myself.", "Henry fell down and hurt themselves.", "Henry fell down and hurt himselves."], "Henry／he 對應 himself。", "男性第三人稱單數反身代名詞為 himself。", ["找到 Henry", "換成 he", "選 him 系列", "使用 himself"]),
                choice("We enjoyed ourself at the party.", "We enjoyed ourselves at the party.", ["We enjoyed themselves at the party.", "We enjoyed myself at the party."], ["We enjoyed yourselves at the party.", "We enjoyed usself at the party.", "We enjoyed itself at the party."], "we 是複數，對應 ourselves。", "we→ourselves。", ["找到主詞 We", "判斷第一人稱複數", "ourself 改 ourselves", "檢查 enjoy oneself"]),
                choice("Amy cooked dinner by himself.", "Amy cooked dinner by herself.", ["Amy cooked dinner by myself.", "Amy cooked dinner by itself."], ["Amy cooked dinner by themselves.", "Amy cooked dinner by yourself.", "Amy cooked dinner by herselves."], "Amy／she 對應 herself。", "by＋與主詞一致的反身代名詞。", ["找到 Amy", "換成 she", "選 herself", "保留 by"]),
                choice("The cat cleaned themselves after eating.", "The cat cleaned itself after eating.", ["The cat cleaned himself after eating.", "The cat cleaned ourselves after eating."], ["The cat cleaned herself after eating.", "The cat cleaned it after itself eating.", "The cat cleaned itselfs after eating."], "單數動物以 it 指稱，對應 itself。", "it→itself；they→themselves。", ["找到單數 cat", "以 it 代替", "選 itself", "檢查動作回到主詞"])
            ],
            transform: [
                reorder("明天會下雨嗎？", ["Will", "it", "rain", "tomorrow", "?"], "Will it rain tomorrow?", "Will 放句首。", "Will＋主詞＋原形動詞＋未來時間？", ["放 Will", "接主詞 it", "加入原形 rain", "最後放 tomorrow 與問號"]),
                reorder("我們下週不會參觀博物館。", ["We", "won't", "visit", "the museum", "next week", "."], "We won't visit the museum next week.", "won't 後接 visit。", "主詞＋won't＋原形動詞。", ["放主詞 We", "接 won't", "加入 visit museum", "最後放 next week"]),
                reorder("你今晚打算做什麼？", ["What", "are", "you", "going to", "do", "tonight", "?"], "What are you going to do tonight?", "先排 What are you。", "What＋be＋主詞＋going to＋原形動詞？", ["放 What", "接 are you", "加入 going to do", "最後放 tonight"]),
                reorder("她明天要拜訪祖母。", ["She", "is going to", "visit", "her grandmother", "tomorrow", "."], "She is going to visit her grandmother tomorrow.", "She 後使用 is going to。", "主詞＋be going to＋原形動詞。", ["放 She", "接 is going to", "加入 visit 與受詞", "最後放 tomorrow"]),
                reorder("孩子們自己做了早餐。", ["The children", "made", "breakfast", "by", "themselves", "."], "The children made breakfast by themselves.", "children 對應 themselves。", "by oneself 表示自行完成。", ["放主詞 children", "接 made breakfast", "加入 by", "選 themselves"]),
                choice("They are going to celebrate the New Year.", "They will celebrate the New Year.", ["They will celebrating the New Year.", "They are will celebrate the New Year."], ["They will to celebrate the New Year.", "They do will celebrate the New Year.", "They will celebrated the New Year."], "改用 will 時，celebrate 保持原形。", "be going to＋V 可改為 will＋V，基本未來語意相近。", ["保留主詞 They", "is going to 改 will", "使用原形 celebrate", "保留受詞"]),
                choice("Mia will visit her aunt next Sunday.", "Mia is going to visit her aunt next Sunday.", ["Mia going to visit her aunt next Sunday.", "Mia is going visit her aunt next Sunday."], ["Mia is going to visits her aunt next Sunday.", "Mia will going to visit her aunt next Sunday.", "Mia does going to visit her aunt next Sunday."], "改用 be going to 時，Mia 搭配 is。", "單數主詞＋is going to＋原形動詞。", ["保留 Mia", "will 改 is going to", "保留原形 visit", "保留未來時間"]),
                choice("Leo fixed the bike without anyone's help.", "Leo fixed the bike by himself.", ["Leo fixed the bike by herself.", "Leo fixed himself by the bike."], ["Leo fixed the bike by themselves.", "Leo fixed the bike by hisself.", "Leo himself was by fixed the bike."], "without help 可改為 by himself。", "by oneself 表示獨自、沒有他人協助。", ["找到 Leo", "對應 he", "加入 by", "選 himself"]),
                choice("Nina looked at Nina in the mirror.", "Nina looked at herself in the mirror.", ["Nina looked at himself in the mirror.", "Nina looked at themselves in the mirror."], ["Nina looked at her in herself mirror.", "Nina looked herself at in the mirror.", "Nina looked at itself in the mirror."], "主詞與受詞是同一人，使用 herself。", "she→herself。", ["找到主詞 Nina", "確認鏡中仍是 Nina", "以 she 對應", "改為 herself"]),
                reorder("我們會自己完成這項工作。", ["We", "will", "finish", "the work", "by", "ourselves", "."], "We will finish the work by ourselves.", "will 後接 finish。", "will＋原形動詞；we→ourselves。", ["放 We will", "接原形 finish", "加入 the work", "最後放 by ourselves"])
            ],
            dialogue: [
                choice("A: Will you come to the party tomorrow?\nB: _____", "Yes, I will.", ["Yes, I do.", "Yes, I am."], ["Yes, I will come do.", "Yes, I won't.", "Yes, I going to."], "Will 問句以 will 簡答。", "Will＋主詞問句：Yes, 主詞＋will.／No, 主詞＋won't.", ["確認句首 Will", "以 I 回答", "使用 will", "完成肯定簡答"]),
                choice("A: Will it rain this afternoon?\nB: Look at those dark clouds! _____", "Yes, it will.", ["Yes, it does.", "Yes, it is rain."], ["Yes, it is going rain.", "Yes, it will rains.", "Yes, it did."], "Will 問句使用 it will。", "will 簡答不重複主要動詞。", ["確認主詞 it", "判斷肯定", "使用 will", "不再加 rain"]),
                choice("A: What are you going to do this weekend?\nB: _____", "I am going to visit my cousins.", ["I going to visit my cousins.", "I am going visit my cousins."], ["I will going to visit my cousins.", "I am going to visiting my cousins.", "I do going to visit my cousins."], "I 搭配 am going to。", "主詞＋be going to＋原形動詞。", ["以 I 回答", "使用 am going to", "接原形 visit", "完成受詞"]),
                choice("A: The phone is ringing.\nB: _____", "I'll answer it.", ["I'm answer it yesterday.", "I going to answered it."], ["I will answering it.", "I do will answer it.", "I am going answer it now decided."], "當下決定去接電話可用 will。", "will 常用於說話當下做出的決定。", ["讀懂突發情境", "判斷是當下決定", "使用 I'll", "接原形 answer"]),
                choice("A: We bought the tickets yesterday.\nB: What are you going to do tomorrow?\nA: _____", "We are going to see a movie.", ["We will seeing a movie.", "We going to see a movie."], ["We are going see a movie.", "We will going to see a movie.", "We are going to seeing a movie."], "已買票表示已有計畫，使用 be going to。", "事先安排的計畫常用 be going to。", ["找到 bought tickets", "判斷已有計畫", "使用 We are going to", "接原形 see"]),
                choice("A: Did Jack repair the computer alone?\nB: _____", "Yes. He fixed it by himself.", ["Yes. He fixed it by herself.", "Yes. He fixed himself by it."], ["Yes. He did fixed it by himself.", "Yes. He fixed it by themselves.", "Yes. He by himself fixed it was."], "Jack／he 對應 himself。", "by himself 表示他獨自完成。", ["先用 Yes 回答", "使用過去式 fixed", "加入 by", "選 himself"]),
                choice("A: Be careful with the knife.\nB: Don't worry. _____", "I won't hurt myself.", ["I won't hurt yourself.", "I don't will hurt myself."], ["I won't hurt me myself.", "I will not to hurt myself.", "I won't hurt themselves."], "I 對應 myself，won't 後接 hurt。", "will not＋原形動詞；I→myself。", ["以 I 作主詞", "使用 won't", "接原形 hurt", "選 myself"]),
                choice("A: Who made these cookies for you?\nB: _____", "I made them myself.", ["I made them themselves.", "I did made them myself."], ["I made myself them.", "I was made them by myself did.", "I made them yourself."], "myself 可強調是我本人做的。", "反身代名詞也可放句尾強調主詞本人。", ["以 I 回答", "使用 made", "受詞用 them", "句尾加 myself"]),
                choice("A: Are Tina and May going to join us?\nB: _____", "No, they aren't.", ["No, they don't.", "No, they won't going."], ["No, they isn't.", "No, they aren't going to do join.", "No, themselves aren't."], "Are 問句以 aren't 簡答。", "Be going to 問句以相同 be 動詞回答。", ["確認句首 Are", "主詞改 they", "判斷否定", "使用 aren't"]),
                choice("A: What will your class do for Earth Day?\nB: _____", "We will clean the park by ourselves.", ["We will cleaning the park by ourselves.", "We are will clean the park ourselves."], ["We will clean the park by ourself.", "We will to clean the park by ourselves.", "We do will clean the park by themselves."], "will 後接 clean，we 對應 ourselves。", "will＋原形動詞；by ourselves 表示全班自己完成。", ["以 We 回答", "使用 will clean", "加入 the park", "選 by ourselves"])
            ]
        }
    };
})();
