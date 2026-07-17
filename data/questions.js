/**
 * 汉字榫卯工坊｜本地题库
 *
 * 如何新增题目：
 * 1. 复制一整道现有题目，包括最外层的 { 和 }。
 * 2. 修改各字段，并确保每道题的 id 不重复。
 * 3. left-right 使用 left、right 两个卡槽。
 * 4. top-bottom 使用 top、bottom 两个卡槽。
 * 5. top-middle-bottom 使用 top、middle、bottom 三个卡槽。
 * 6. parts 中每个部件的 target 必须对应 slots 中某个卡槽的 id。
 * 7. 保存文件后刷新网页即可，不需要修改 app.js 或 index.html。
 *
 * 字段说明：
 * id                题目唯一编号，例如 "q001"
 * character         完成后显示的完整汉字
 * pinyin            带声调的拼音
 * english           英文提示
 * structure         "left-right"、"top-bottom" 或 "top-middle-bottom"
 * parts             可拖动的部件；显示顺序会由游戏自动打乱
 * slots             卡槽；id 决定位置，label 是学生看到的中文名称
 * completionMessage 完成该题后显示的鼓励语
 */

window.HANZI_QUESTIONS = [
  {
    id: "q001",
    character: "好",
    pinyin: "hǎo",
    english: "good",
    structure: "left-right",
    parts: [
      { id: "q001-left-part", text: "女", target: "left" },
      { id: "q001-right-part", text: "子", target: "right" }
    ],
    slots: [
      { id: "left", label: "Left" },
      { id: "right", label: "Right" }
    ],
    completionMessage: "Great! 女 and 子 fit together to make 好."
  },
  {
    id: "q002",
    character: "休",
    pinyin: "xiū",
    english: "to rest",
    structure: "left-right",
    parts: [
      { id: "q002-left-part", text: "亻", target: "left" },
      { id: "q002-right-part", text: "木", target: "right" }
    ],
    slots: [
      { id: "left", label: "Left" },
      { id: "right", label: "Right" }
    ],
    completionMessage: "A person resting by a tree makes 休."
  },
  {
    id: "q003",
    character: "明",
    pinyin: "míng",
    english: "bright",
    structure: "left-right",
    parts: [
      { id: "q003-left-part", text: "日", target: "left" },
      { id: "q003-right-part", text: "月", target: "right" }
    ],
    slots: [
      { id: "left", label: "Left" },
      { id: "right", label: "Right" }
    ],
    completionMessage: "The sun and moon fit together to make 明."
  },
  {
    id: "q004",
    character: "妈",
    pinyin: "mā",
    english: "mother",
    structure: "left-right",
    parts: [
      { id: "q004-left-part", text: "女", target: "left" },
      { id: "q004-right-part", text: "马", target: "right" }
    ],
    slots: [
      { id: "left", label: "Left" },
      { id: "right", label: "Right" }
    ],
    completionMessage: "Click! 女 and 马 fit together to make 妈."
  },
  {
    id: "q006",
    character: "苗",
    pinyin: "miáo",
    english: "seedling",
    structure: "top-bottom",
    parts: [
      { id: "q006-top-part", text: "艹", target: "top" },
      { id: "q006-bottom-part", text: "田", target: "bottom" }
    ],
    slots: [
      { id: "top", label: "Top" },
      { id: "bottom", label: "Bottom" }
    ],
    completionMessage: "Grass growing over a field makes 苗."
  },
  {
    id: "q007",
    character: "男",
    pinyin: "nán",
    english: "man",
    structure: "top-bottom",
    parts: [
      { id: "q007-top-part", text: "田", target: "top" },
      { id: "q007-bottom-part", text: "力", target: "bottom" }
    ],
    slots: [
      { id: "top", label: "Top" },
      { id: "bottom", label: "Bottom" }
    ],
    completionMessage: "田 on top and 力 below make 男."
  },
  {
    id: "q008",
    character: "看",
    pinyin: "kàn",
    english: "to look",
    structure: "top-bottom",
    parts: [
      { id: "q008-top-part", text: "龵", target: "top" },
      { id: "q008-bottom-part", text: "目", target: "bottom" }
    ],
    slots: [
      { id: "top", label: "Top" },
      { id: "bottom", label: "Bottom" }
    ],
    completionMessage: "A hand over an eye helps you look: 看."
  },
  {
    id: "q009",
    character: "早",
    pinyin: "zǎo",
    english: "early",
    structure: "top-bottom",
    parts: [
      { id: "q009-top-part", text: "日", target: "top" },
      { id: "q009-bottom-part", text: "十", target: "bottom" }
    ],
    slots: [
      { id: "top", label: "Top" },
      { id: "bottom", label: "Bottom" }
    ],
    completionMessage: "The sun rises early: 早."
  },
  {
    id: "q010",
    character: "尖",
    pinyin: "jiān",
    english: "sharp",
    structure: "top-bottom",
    parts: [
      { id: "q010-top-part", text: "小", target: "top" },
      { id: "q010-bottom-part", text: "大", target: "bottom" }
    ],
    slots: [
      { id: "top", label: "Top" },
      { id: "bottom", label: "Bottom" }
    ],
    completionMessage: "Small on top and big below make 尖."
  },
  {
    id: "q011",
    character: "字",
    pinyin: "zì",
    english: "character; word",
    structure: "top-bottom",
    parts: [
      { id: "q011-top-part", text: "宀", target: "top" },
      { id: "q011-bottom-part", text: "子", target: "bottom" }
    ],
    slots: [
      { id: "top", label: "Top" },
      { id: "bottom", label: "Bottom" }
    ],
    completionMessage: "宀 on top and 子 below make 字."
  },
  {
    id: "q012",
    character: "吗",
    pinyin: "ma",
    english: "question particle",
    structure: "left-right",
    parts: [
      { id: "q012-left-part", text: "口", target: "left" },
      { id: "q012-right-part", text: "马", target: "right" }
    ],
    slots: [
      { id: "left", label: "Left" },
      { id: "right", label: "Right" }
    ],
    completionMessage: "口 and 马 fit together to make 吗."
  },
  {
    id: "q013",
    character: "姐",
    pinyin: "jiě",
    english: "older sister",
    structure: "left-right",
    parts: [
      { id: "q013-left-part", text: "女", target: "left" },
      { id: "q013-right-part", text: "且", target: "right" }
    ],
    slots: [
      { id: "left", label: "Left" },
      { id: "right", label: "Right" }
    ],
    completionMessage: "女 and 且 fit together to make 姐."
  },
  {
    id: "q014",
    character: "妹",
    pinyin: "mèi",
    english: "younger sister",
    structure: "left-right",
    parts: [
      { id: "q014-left-part", text: "女", target: "left" },
      { id: "q014-right-part", text: "未", target: "right" }
    ],
    slots: [
      { id: "left", label: "Left" },
      { id: "right", label: "Right" }
    ],
    completionMessage: "女 and 未 fit together to make 妹."
  },
  {
    id: "q015",
    character: "你",
    pinyin: "nǐ",
    english: "you",
    structure: "left-right",
    parts: [
      { id: "q015-left-part", text: "亻", target: "left" },
      { id: "q015-right-part", text: "尔", target: "right" }
    ],
    slots: [
      { id: "left", label: "Left" },
      { id: "right", label: "Right" }
    ],
    completionMessage: "亻 and 尔 fit together to make 你."
  },
  {
    id: "q016",
    character: "爸",
    pinyin: "bà",
    english: "dad",
    structure: "top-bottom",
    parts: [
      { id: "q016-top-part", text: "父", target: "top" },
      { id: "q016-bottom-part", text: "巴", target: "bottom" }
    ],
    slots: [
      { id: "top", label: "Top" },
      { id: "bottom", label: "Bottom" }
    ],
    completionMessage: "父 on top and 巴 below make 爸."
  },
  {
    id: "q017",
    character: "爷",
    pinyin: "yé",
    english: "grandfather",
    structure: "top-bottom",
    parts: [
      { id: "q017-top-part", text: "父", target: "top" },
      { id: "q017-bottom-part", text: "卩", target: "bottom" }
    ],
    slots: [
      { id: "top", label: "Top" },
      { id: "bottom", label: "Bottom" }
    ],
    completionMessage: "父 on top and 卩 below make 爷."
  },
  {
    id: "q018",
    character: "奶",
    pinyin: "nǎi",
    english: "milk; grandma",
    structure: "left-right",
    parts: [
      { id: "q018-left-part", text: "女", target: "left" },
      { id: "q018-right-part", text: "乃", target: "right" }
    ],
    slots: [
      { id: "left", label: "Left" },
      { id: "right", label: "Right" }
    ],
    completionMessage: "女 and 乃 fit together to make 奶."
  },
  {
    id: "q020",
    character: "是",
    pinyin: "shì",
    english: "to be; yes",
    structure: "top-bottom",
    parts: [
      { id: "q020-top-part", text: "日", target: "top" },
      { id: "q020-bottom-part", text: "𤴓", target: "bottom" }
    ],
    slots: [
      { id: "top", label: "Top" },
      { id: "bottom", label: "Bottom" }
    ],
    completionMessage: "日 on top and the lower component fit together to make 是."
  },
  {
    id: "q021",
    character: "喝",
    pinyin: "hē",
    english: "to drink",
    structure: "left-right",
    parts: [
      { id: "q021-left-part", text: "口", target: "left" },
      { id: "q021-right-part", text: "曷", target: "right" }
    ],
    slots: [
      { id: "left", label: "Left" },
      { id: "right", label: "Right" }
    ],
    completionMessage: "口 and 曷 fit together to make 喝."
  },
  {
    id: "q022",
    character: "叫",
    pinyin: "jiào",
    english: "to be called",
    structure: "left-right",
    parts: [
      { id: "q022-left-part", text: "口", target: "left" },
      { id: "q022-right-part", text: "丩", target: "right" }
    ],
    slots: [
      { id: "left", label: "Left" },
      { id: "right", label: "Right" }
    ],
    completionMessage: "口 and 丩 fit together to make 叫."
  },
  {
    id: "q023",
    character: "什",
    pinyin: "shén",
    english: "what (in 什么)",
    structure: "left-right",
    parts: [
      { id: "q023-left-part", text: "亻", target: "left" },
      { id: "q023-right-part", text: "十", target: "right" }
    ],
    slots: [
      { id: "left", label: "Left" },
      { id: "right", label: "Right" }
    ],
    completionMessage: "亻 and 十 fit together to make 什."
  },
  {
    id: "q024",
    character: "的",
    pinyin: "de",
    english: "possessive particle",
    structure: "left-right",
    parts: [
      { id: "q024-left-part", text: "白", target: "left" },
      { id: "q024-right-part", text: "勺", target: "right" }
    ],
    slots: [
      { id: "left", label: "Left" },
      { id: "right", label: "Right" }
    ],
    completionMessage: "白 and 勺 fit together to make 的."
  },
  {
    id: "q025",
    character: "岁",
    pinyin: "suì",
    english: "years old",
    structure: "top-bottom",
    parts: [
      { id: "q025-top-part", text: "山", target: "top" },
      { id: "q025-bottom-part", text: "夕", target: "bottom" }
    ],
    slots: [
      { id: "top", label: "Top" },
      { id: "bottom", label: "Bottom" }
    ],
    completionMessage: "山 on top and 夕 below make 岁."
  },
  {
    id: "q026",
    character: "学",
    pinyin: "xué",
    english: "to learn",
    structure: "top-middle-bottom",
    parts: [
      { id: "q026-top-part", text: "⺍", target: "top" },
      { id: "q026-middle-part", text: "冖", target: "middle" },
      { id: "q026-bottom-part", text: "子", target: "bottom" }
    ],
    slots: [
      { id: "top", label: "Top" },
      { id: "middle", label: "Middle" },
      { id: "bottom", label: "Bottom" }
    ],
    completionMessage: "⺍, 冖 and 子 fit vertically to make 学."
  },
  {
    id: "q027",
    character: "家",
    pinyin: "jiā",
    english: "home; family",
    structure: "top-bottom",
    parts: [
      { id: "q027-top-part", text: "宀", target: "top" },
      { id: "q027-bottom-part", text: "豕", target: "bottom" }
    ],
    slots: [
      { id: "top", label: "Top" },
      { id: "bottom", label: "Bottom" }
    ],
    completionMessage: "宀 on top and 豕 below make 家."
  },
  {
    id: "q028",
    character: "没",
    pinyin: "méi",
    english: "not have",
    structure: "left-right",
    parts: [
      { id: "q028-left-part", text: "氵", target: "left" },
      { id: "q028-right-part", text: "殳", target: "right" }
    ],
    slots: [
      { id: "left", label: "Left" },
      { id: "right", label: "Right" }
    ],
    completionMessage: "氵 and 殳 fit together to make 没."
  },
  {
    id: "q029",
    character: "只",
    pinyin: "zhǐ",
    english: "only",
    structure: "top-bottom",
    parts: [
      { id: "q029-top-part", text: "口", target: "top" },
      { id: "q029-bottom-part", text: "八", target: "bottom" }
    ],
    slots: [
      { id: "top", label: "Top" },
      { id: "bottom", label: "Bottom" }
    ],
    completionMessage: "口 on top and 八 below make 只."
  },
  {
    id: "q030",
    character: "宠",
    pinyin: "chǒng",
    english: "pet; to pamper",
    structure: "top-bottom",
    parts: [
      { id: "q030-top-part", text: "宀", target: "top" },
      { id: "q030-bottom-part", text: "龙", target: "bottom" }
    ],
    slots: [
      { id: "top", label: "Top" },
      { id: "bottom", label: "Bottom" }
    ],
    completionMessage: "宀 on top and 龙 below make 宠."
  },
  {
    id: "q031",
    character: "物",
    pinyin: "wù",
    english: "thing",
    structure: "left-right",
    parts: [
      { id: "q031-left-part", text: "牜", target: "left" },
      { id: "q031-right-part", text: "勿", target: "right" }
    ],
    slots: [
      { id: "left", label: "Left" },
      { id: "right", label: "Right" }
    ],
    completionMessage: "牜 and 勿 fit together to make 物."
  },
  {
    id: "q032",
    character: "喜",
    pinyin: "xǐ",
    english: "joy; to like",
    structure: "top-bottom",
    parts: [
      { id: "q032-top-part", text: "壴", target: "top" },
      { id: "q032-bottom-part", text: "口", target: "bottom" }
    ],
    slots: [
      { id: "top", label: "Top" },
      { id: "bottom", label: "Bottom" }
    ],
    completionMessage: "壴 on top and 口 below make 喜."
  },
  {
    id: "q033",
    character: "欢",
    pinyin: "huān",
    english: "joyful",
    structure: "left-right",
    parts: [
      { id: "q033-left-part", text: "又", target: "left" },
      { id: "q033-right-part", text: "欠", target: "right" }
    ],
    slots: [
      { id: "left", label: "Left" },
      { id: "right", label: "Right" }
    ],
    completionMessage: "又 and 欠 fit together to make 欢."
  },
  {
    id: "q034",
    character: "吃",
    pinyin: "chī",
    english: "to eat",
    structure: "left-right",
    parts: [
      { id: "q034-left-part", text: "口", target: "left" },
      { id: "q034-right-part", text: "乞", target: "right" }
    ],
    slots: [
      { id: "left", label: "Left" },
      { id: "right", label: "Right" }
    ],
    completionMessage: "口 and 乞 fit together to make 吃."
  },
  {
    id: "q035",
    character: "甜",
    pinyin: "tián",
    english: "sweet",
    structure: "left-right",
    parts: [
      { id: "q035-left-part", text: "舌", target: "left" },
      { id: "q035-right-part", text: "甘", target: "right" }
    ],
    slots: [
      { id: "left", label: "Left" },
      { id: "right", label: "Right" }
    ],
    completionMessage: "舌 and 甘 fit together to make 甜."
  },
  {
    id: "q036",
    character: "打",
    pinyin: "dǎ",
    english: "to hit; to play",
    structure: "left-right",
    parts: [
      { id: "q036-left-part", text: "扌", target: "left" },
      { id: "q036-right-part", text: "丁", target: "right" }
    ],
    slots: [
      { id: "left", label: "Left" },
      { id: "right", label: "Right" }
    ],
    completionMessage: "扌 and 丁 fit together to make 打."
  },
  {
    id: "q037",
    character: "踢",
    pinyin: "tī",
    english: "to kick",
    structure: "left-right",
    parts: [
      { id: "q037-left-part", text: "足", target: "left" },
      { id: "q037-right-part", text: "易", target: "right" }
    ],
    slots: [
      { id: "left", label: "Left" },
      { id: "right", label: "Right" }
    ],
    completionMessage: "足 and 易 fit together to make 踢."
  },
  {
    id: "q038",
    character: "觉",
    pinyin: "jiào",
    english: "sleep (in 睡觉)",
    structure: "top-middle-bottom",
    parts: [
      { id: "q038-top-part", text: "⺍", target: "top" },
      { id: "q038-middle-part", text: "冖", target: "middle" },
      { id: "q038-bottom-part", text: "见", target: "bottom" }
    ],
    slots: [
      { id: "top", label: "Top" },
      { id: "middle", label: "Middle" },
      { id: "bottom", label: "Bottom" }
    ],
    completionMessage: "⺍, 冖 and 见 fit vertically to make 觉."
  },
  {
    id: "q039",
    character: "笑",
    pinyin: "xiào",
    english: "to smile; to laugh",
    structure: "top-bottom",
    parts: [
      { id: "q039-top-part", text: "⺮", target: "top" },
      { id: "q039-bottom-part", text: "夭", target: "bottom" }
    ],
    slots: [
      { id: "top", label: "Top" },
      { id: "bottom", label: "Bottom" }
    ],
    completionMessage: "⺮ on top and 夭 below make 笑."
  }
];
