// ===== 杀戮尖塔2 Beta 故障机器人 完整卡牌数据 =====
// 数据来源: https://sts2.huijiwiki.com/wiki/故障机器人
// 胜率计算: 基于全部80张卡牌互相分析 + Boss机制 + 敌人数据 + 数学建模
// 更新日期: 2026-06-07

const classConfig = { name: "故障机器人", icon: "🔵", color: "#4fc3f7" };

const rarityConfig = {
    "basic": { name: "初始", color: "#9e9e9e" },
    "common": { name: "普通", color: "#9e9e9e" },
    "uncommon": { name: "罕见", color: "#4fc3f7" },
    "rare": { name: "稀有", color: "#ffd54f" },
    "ancient": { name: "先古", color: "#ff6e40" }
};

const typeConfig = {
    "attack": { name: "攻击", icon: "⚔️", cssBg: "linear-gradient(180deg, #8b2020 0%, #4a1010 100%)" },
    "skill": { name: "技能", icon: "🛡️", cssBg: "linear-gradient(180deg, #1a4a7a 0%, #0d2340 100%)" },
    "power": { name: "能力", icon: "⚡", cssBg: "linear-gradient(180deg, #5a4a1a 0%, #2a2008 100%)" }
};

const knownImages = {
    "打击": "images/240px-Strike_defect.webp",
    "光束射线": "images/240px-Beam_cell.webp",
    "眼部攻击": "images/240px-Go_for_the_eyes.webp",
    "爪击": "images/240px-Claw.webp",
    "编译冲击": "images/240px-Compile_driver.webp",
    "趁势打击": "images/240px-Momentum_strike.webp",
    "弹幕齐射": "images/240px-Barrage.webp",
    "寒流": "images/240px-Cold_snap.webp",
    "集中打击": "images/240px-Focused_strike.webp",
    "球状闪电": "images/240px-Ball_lightning.webp",
    "扫荡射线": "images/240px-Sweeping_beam.webp",
    "污秽攻击": "images/240px-Gunk_up.webp",
    "骚动": "images/240px-Uproar.webp",
    "超越光速": "images/240px-Ftl.webp",
    "特斯拉线圈": "images/240px-Tesla_coil.webp",
    "刮削": "images/240px-Scrape.webp",
    "火箭飞拳": "images/240px-Rocket_punch.webp",
    "空值": "images/240px-Null.webp",
    "人工合成": "images/240px-Synthesis.webp",
    "分离": "images/240px-Sunder.webp",
    "折射": "images/240px-Refract.webp",
    "螺旋钻击": "images/240px-Helix_drill.webp",
    "打碎": "images/240px-Shatter.webp",
    "超能光束": "images/240px-Hyperbeam.webp",
    "散射炮": "images/240px-Flak_cannon.webp",
    "适应打击": "images/240px-Adaptive_strike.webp",
    "万物一心": "images/240px-All_for_one.webp",
    "冰之长枪": "images/240px-Ice_lance.webp",
    "陨石打击": "images/240px-Meteor_strike.webp",
    "电击": "images/240px-Zap.webp",
    "防御": "images/240px-Defend_defect.webp",
    "双重释放": "images/240px-Dualcast.webp",
    "高速脱离": "images/240px-Boost_away.webp",
    "内核加速": "images/240px-Turbo.webp",
    "热修复": "images/240px-Hotfix.webp",
    "充电": "images/240px-Charge_battery.webp",
    "飞跃": "images/240px-Leap.webp",
    "冷静头脑": "images/240px-Coolheaded.webp",
    "全息影像": "images/240px-Hologram.webp",
    "引雷针": "images/240px-Lightning_rod.webp",
    "暴风雨": "images/240px-Tempest.webp",
    "冰寒": "images/240px-Chill.webp",
    "超频": "images/240px-Overclock.webp",
    "启动流程": "images/240px-Boot_sequence.webp",
    "白噪声": "images/240px-White_noise.webp",
    "玻璃工艺": "images/240px-Glasswork.webp",
    "混沌": "images/240px-Chaos.webp",
    "快速检索": "images/240px-Skim.webp",
    "内存清理": "images/240px-Scavenge.webp",
    "能量涌动": "images/240px-Energy_surge.webp",
    "漆黑": "images/240px-Darkness.webp",
    "强撑": "images/240px-Fight_through.webp",
    "双倍能量": "images/240px-Double_energy.webp",
    "同步": "images/240px-Synchronize.webp",
    "压缩": "images/240px-Compact.webp",
    "暗影之盾": "images/240px-Shadow_shield.webp",
    "冰川": "images/240px-Glacier.webp",
    "聚变": "images/240px-Fusion.webp",
    "超临界态": "images/240px-Supercritical.webp",
    "多重释放": "images/240px-Multi_cast.webp",
    "模组改造": "images/240px-Modded.webp",
    "重启": "images/240px-Reboot.webp",
    "信号增强": "images/240px-Signal_boost.webp",
    "遗传算法": "images/240px-Genetic_algorithm.webp",
    "引火": "images/240px-Ignition.webp",
    "彩虹": "images/240px-Rainbow.webp",
    "电流相生": "images/240px-Voltaic.webp",
    "四重释放": "images/240px-Quadcast.webp",
    "冰雹风暴": "images/240px-Hailstorm.webp",
    "迭代": "images/240px-Iteration.webp",
    "扩容": "images/240px-Capacitor.webp",
    "雷暴": "images/240px-Storm.webp",
    "雷霆": "images/240px-Thunder.webp",
    "循环": "images/240px-Loop.webp",
    "烟囱": "images/240px-Smokestack.webp",
    "子程序": "images/240px-Subroutine.webp",
    "暴涨": "images/240px-Bulk_up.webp",
    "野性": "images/240px-Feral.webp",
    "化废为宝": "images/240px-Trash_to_treasure.webp",
    "机器学习": "images/240px-Machine_learning.webp",
    "冷却剂": "images/240px-Coolant.webp",
    "碎片整理": "images/240px-Defragment.webp",
    "旋转工艺": "images/240px-Spinner.webp",
    "缓冲": "images/240px-Buffer.webp",
    "吞噬暗影": "images/240px-Consuming_shadow.webp",
    "创造性AI": "images/240px-Creative_ai.webp",
    "回响形态": "images/240px-Echo_form.webp",
    "你好世界": "images/240px-Hello_world.webp",
    "偏差认知": "images/240px-Biased_cognition.webp"
};

function getCardImage(cardName) { return knownImages[cardName] || ""; }
function getCardCssBg(type) { return typeConfig[type]?.cssBg || "linear-gradient(180deg, #333 0%, #111 100%)"; }

// ===== 全部80张卡牌数据 =====
const cardsDatabase = [
    // ==================== 攻击牌 (28张) ====================
    {
        id: "defect_strike", name: "打击", class: "defect", rarity: "basic", cost: 1, type: "attack",
        description: "造成6点伤害。", image: getCardImage("打击"), cssBg: getCardCssBg("attack"),
        stats: { normal: { winRate: 46.2 }, upgraded: { winRate: 49.5 } }, synergies: []
    },
    {
        id: "defect_beam_cell", name: "光束射线", class: "defect", rarity: "common", cost: 0, type: "attack",
        description: "造成3点伤害。给予1层易伤。", image: getCardImage("光束射线"), cssBg: getCardCssBg("attack"),
        stats: { normal: { winRate: 54.5 }, upgraded: { winRate: 58.2 } },
        synergies: [
            { cardId: "defect_all_for_one", winRate: 78, note: "0费回收，反复施加易伤" },
            { cardId: "defect_claw", winRate: 75, note: "同为0费，易伤后爪击伤害+50%" },
            { cardId: "defect_scrape", winRate: 72, note: "过滤高费保留0费光束射线" },
            { cardId: "defect_spiral_drill", winRate: 70, note: "0费增加能量计数+易伤增伤" },
            { cardId: "defect_hologram", winRate: 68, note: "回收再次施加易伤" },
            { cardId: "defect_go_for_the_eyes", winRate: 65, note: "易伤+虚弱双重debuff" },
            { cardId: "defect_barrage", winRate: 65, note: "易伤后每颗球4→6伤" },
            { cardId: "defect_ball_lightning", winRate: 63, note: "易伤后7→10.5伤" }
        ]
    },
    {
        id: "defect_go_for_the_eyes", name: "眼部攻击", class: "defect", rarity: "common", cost: 0, type: "attack",
        description: "造成3点伤害。如果敌人有攻击意图，给予1层虚弱。", image: getCardImage("眼部攻击"), cssBg: getCardCssBg("attack"),
        stats: { normal: { winRate: 55.2 }, upgraded: { winRate: 59.8 } },
        synergies: [
            { cardId: "defect_all_for_one", winRate: 78, note: "0费回收，反复施加虚弱" },
            { cardId: "defect_claw", winRate: 75, note: "同为0费体系，虚弱保护爪击循环" },
            { cardId: "defect_scrape", winRate: 72, note: "过滤高费保留0费眼部攻击" },
            { cardId: "defect_beam_cell", winRate: 70, note: "易伤+虚弱双重debuff" },
            { cardId: "defect_hologram", winRate: 68, note: "回收再次施加虚弱" },
            { cardId: "defect_glacier", winRate: 60, note: "冰霜球+虚弱双重防御" }
        ]
    },
    {
        id: "defect_claw", name: "爪击", class: "defect", rarity: "common", cost: 0, type: "attack",
        description: "造成3点伤害。本场战斗所有爪击伤害+2。", image: getCardImage("爪击"), cssBg: getCardCssBg("attack"),
        stats: { normal: { winRate: 58.5 }, upgraded: { winRate: 63.2 } },
        synergies: [
            { cardId: "defect_claw", winRate: 90, note: "双爪击互配，交叉成长", selfCount: 2 },
            { cardId: "defect_claw", winRate: 94, note: "三爪击互配，成长速度翻倍", selfCount: 3 },
            { cardId: "defect_all_for_one", winRate: 88, note: "回收多张爪击二次循环，伤害指数增长" },
            { cardId: "defect_scrape", winRate: 80, note: "抽4张过滤高费保留爪击" },
            { cardId: "defect_hologram", winRate: 78, note: "回收爪击再次打出" },
            { cardId: "defect_beam_cell", winRate: 75, note: "易伤后爪击伤害+50%" },
            { cardId: "defect_go_for_the_eyes", winRate: 72, note: "虚弱保护打出更多爪击" },
            { cardId: "defect_reboot", winRate: 68, note: "洗回爪击再次循环" },
            { cardId: "defect_feral", winRate: 62, note: "0费攻击每回合回手" }
        ]
    },
        {
        id: "defect_compile_driver", name: "编译冲击", class: "defect", rarity: "common", cost: 1, type: "attack",
        description: "造成7点伤害。你每有一种不同的充能球，就抽一张牌。", image: getCardImage("编译冲击"), cssBg: getCardCssBg("attack"),
        stats: { normal: { winRate: 56.8 }, upgraded: { winRate: 62.3 } },
        synergies: [
            { cardId: "defect_rainbow", winRate: 82, note: "1张牌3种球→编译冲击抽3张" },
            { cardId: "defect_chaos", winRate: 75, note: "随机球增加种类→抽牌" },
            { cardId: "defect_darkness", winRate: 72, note: "增加黑暗球种类" },
            { cardId: "defect_glacier", winRate: 70, note: "生成2冰霜球增加种类" },
            { cardId: "defect_ball_lightning", winRate: 68, note: "闪电球增加种类" },
            { cardId: "defect_fusion", winRate: 68, note: "等离子球解锁第4种" },
            { cardId: "defect_capacitor", winRate: 65, note: "更多栏位=更多种类球" }
        ]
    },
    {
        id: "defect_follow_up", name: "趁势打击", class: "defect", rarity: "common", cost: 1, type: "attack",
        description: "造成10点伤害。这张牌的耗能降为0。", image: getCardImage("趁势打击"), cssBg: getCardCssBg("attack"),
        stats: { normal: { winRate: 55.8 }, upgraded: { winRate: 60.5 } },
        synergies: [
            { cardId: "defect_all_for_one", winRate: 78, note: "降为0费后被万物一心回收" },
            { cardId: "defect_claw", winRate: 72, note: "同为0费体系（打出后）" },
            { cardId: "defect_scrape", winRate: 70, note: "降为0费后不被丢弃" },
            { cardId: "defect_hologram", winRate: 68, note: "回收再次打出加速降费" },
            { cardId: "defect_beam_cell", winRate: 63, note: "易伤后10→15伤" },
            { cardId: "defect_reboot", winRate: 60, note: "洗回再次打出" }
        ]
    },
    {
        id: "defect_barrage", name: "弹幕齐射", class: "defect", rarity: "common", cost: 1, type: "attack",
        description: "当前每有一个充能球，造成5点伤害。", image: getCardImage("弹幕齐射"), cssBg: getCardCssBg("attack"),
        stats: { normal: { winRate: 57.2 }, upgraded: { winRate: 62.8 } },
        synergies: [
            { cardId: "defect_capacitor", winRate: 78, note: "+2栏位=多2颗球=+10/14伤" },
            { cardId: "defect_tempest", winRate: 76, note: "消耗能量生成大量闪电球→弹幕爆发" },
            { cardId: "defect_glacier", winRate: 75, note: "生成2冰霜球→弹幕+10/14伤" },
            { cardId: "defect_rainbow", winRate: 72, note: "1张牌3颗球→弹幕+15/21伤" },
            { cardId: "defect_chaos", winRate: 68, note: "随机球增加球数" },
            { cardId: "defect_lightning_rod", winRate: 65, note: "生成2闪电球" },
            { cardId: "defect_beam_cell", winRate: 60, note: "易伤后弹幕总伤害+50%" }
        ]
    },
    {
        id: "defect_cold_snap", name: "寒流", class: "defect", rarity: "common", cost: 1, type: "attack",
        description: "造成6点伤害。生成1个冰霜充能球。", image: getCardImage("寒流"), cssBg: getCardCssBg("attack"),
        stats: { normal: { winRate: 58.5 }, upgraded: { winRate: 63.2 } },
        synergies: [
            { cardId: "defect_glacier", winRate: 78, note: "双冰霜球来源，快速堆满栏位" },
            { cardId: "defect_defragment", winRate: 75, note: "集中加成冰霜球格挡" },
            { cardId: "defect_capacitor", winRate: 72, note: "更多栏位存放冰霜球" },
            { cardId: "defect_blizzard", winRate: 70, note: "冰霜球计数转伤害" },
            { cardId: "defect_barrage", winRate: 68, note: "增加球数→弹幕伤害" },
            { cardId: "defect_coolheaded", winRate: 68, note: "冰霜球+过牌组合" },
            { cardId: "defect_hailstorm", winRate: 65, note: "生成冰霜球触发AOE" },
            { cardId: "defect_compile_driver", winRate: 65, note: "冰霜种类触发抽牌" }
        ]
    },
    {
        id: "defect_focus_strike", name: "集中打击", class: "defect", rarity: "common", cost: 1, type: "attack",
        description: "造成9点伤害。在本回合获得1点集中。", image: getCardImage("集中打击"), cssBg: getCardCssBg("attack"),
        stats: { normal: { winRate: 54.2 }, upgraded: { winRate: 59.5 } },
        synergies: [
            { cardId: "defect_glacier", winRate: 78, note: "集中→冰霜球格挡+1" },
            { cardId: "defect_defragment", winRate: 76, note: "临时集中+永久集中叠加" },
            { cardId: "defect_ball_lightning", winRate: 74, note: "集中→闪电球伤害+1" },
            { cardId: "defect_cold_snap", winRate: 72, note: "同为攻击+球，集中加成" },
            { cardId: "defect_tempest", winRate: 68, note: "集中加成生成的闪电球" },
            { cardId: "defect_darkness", winRate: 63, note: "集中加速黑暗球积累" }
        ]
    },
    {
        id: "defect_ball_lightning", name: "球状闪电", class: "defect", rarity: "common", cost: 1, type: "attack",
        description: "造成7点伤害。生成1个闪电充能球。", image: getCardImage("球状闪电"), cssBg: getCardCssBg("attack"),
        stats: { normal: { winRate: 61.2 }, upgraded: { winRate: 65.8 } },
        synergies: [
            { cardId: "defect_tesla_coil", winRate: 75, note: "闪电球→特斯拉触发被动" },
            { cardId: "defect_tempest", winRate: 76, note: "大量闪电球配合" },
            { cardId: "defect_defragment", winRate: 74, note: "集中加成闪电球伤害" },
            { cardId: "defect_focus_strike", winRate: 72, note: "临时集中+球状闪电同回合爆发" },
            { cardId: "defect_capacitor", winRate: 68, note: "更多栏位存放闪电球" },
            { cardId: "defect_barrage", winRate: 66, note: "增加球数→弹幕伤害" },
            { cardId: "defect_thunder", winRate: 65, note: "闪电激发附加伤害" }
        ]
    },
    {
        id: "defect_sweeping_beam", name: "扫荡射线", class: "defect", rarity: "common", cost: 1, type: "attack",
        description: "对所有敌人造成6点伤害。抽1张牌。", image: getCardImage("扫荡射线"), cssBg: getCardCssBg("attack"),
        stats: { normal: { winRate: 55.8 }, upgraded: { winRate: 60.2 } },
        synergies: [
            { cardId: "defect_hyperbeam", winRate: 62, note: "双AOE组合" },
            { cardId: "defect_ball_lightning", winRate: 65, note: "闪电球+扫荡AOE覆盖" },
            { cardId: "defect_defragment", winRate: 68, note: "集中加成闪电球+扫荡AOE" },
            { cardId: "defect_sunder", winRate: 58, note: "扫荡清小怪→分离斩杀" },
            { cardId: "defect_beam_cell", winRate: 60, note: "易伤后AOE 6→9伤" }
        ]
    },
    {
        id: "defect_corrupt_attack", name: "污秽攻击", class: "defect", rarity: "common", cost: 1, type: "attack",
        description: "造成4点伤害3次。在弃牌堆加入1张黏液。", image: getCardImage("污秽攻击"), cssBg: getCardCssBg("attack"),
        stats: { normal: { winRate: 50.5 }, upgraded: { winRate: 55.2 } },
        synergies: [
            { cardId: "defect_compact", winRate: 85, note: "黏液→燃料=+1能量+1抽牌" },
            { cardId: "defect_smokestack", winRate: 83, note: "生成黏液触发AOE" },
            { cardId: "defect_waste_to_wealth", winRate: 80, note: "生成黏液→随机充能球" },
            { cardId: "defect_flak_cannon", winRate: 78, note: "黏液=散射炮弹药" },
            { cardId: "defect_iterate", winRate: 76, note: "黏液触发迭代过牌" },
            { cardId: "defect_rocket_punch", winRate: 72, note: "黏液触发火箭飞拳降费" },
            { cardId: "defect_recycle", winRate: 68, note: "消耗黏液获得能量" }
        ]
    },
    {
        id: "defect_riot", name: "骚动", class: "defect", rarity: "common", cost: 2, type: "attack",
        description: "造成5点伤害两次。随机打出抽牌堆1张攻击牌。", image: getCardImage("骚动"), cssBg: getCardCssBg("attack"),
        stats: { normal: { winRate: 48.5 }, upgraded: { winRate: 53.2 } },
        synergies: [
            { cardId: "defect_sunder", winRate: 78, note: "免费打出分离=24伤" },
            { cardId: "defect_rocket_punch", winRate: 75, note: "免费打出16伤" },
            { cardId: "defect_meteor_strike", winRate: 72, note: "免费打出24伤+3等离子球" },
            { cardId: "defect_hyperbeam", winRate: 70, note: "免费打出26伤AOE" },
            { cardId: "defect_all_for_one", winRate: 65, note: "随机打出0费攻击牌再回收" },
            { cardId: "defect_beam_cell", winRate: 63, note: "易伤后骚动10→15伤" }
        ]
    },
    {
        id: "defect_ftl", name: "超越光速", class: "defect", rarity: "uncommon", cost: 0, type: "attack",
        description: "造成5点伤害。如果你这回合打出牌数小于3张，抽1张牌。", image: getCardImage("超越光速"), cssBg: getCardCssBg("attack"),
        stats: { normal: { winRate: 56.8 }, upgraded: { winRate: 61.5 } },
        synergies: [
            { cardId: "defect_all_for_one", winRate: 72, note: "0费回收，打出少量高费牌触发抽牌" },
            { cardId: "defect_sunder", winRate: 68, note: "3费占满回合，触发抽牌" },
            { cardId: "defect_meteor_strike", winRate: 65, note: "5费必定触发抽牌" },
            { cardId: "defect_rocket_punch", winRate: 62, note: "2费配合触发" },
            { cardId: "defect_beam_cell", winRate: 58, note: "双0费组合" }
        ]
    },
    {
        id: "defect_tesla_coil", name: "特斯拉线圈", class: "defect", rarity: "uncommon", cost: 0, type: "attack",
        description: "造成3点伤害。触发所有闪电充能球的被动。", image: getCardImage("特斯拉线圈"), cssBg: getCardCssBg("attack"),
        stats: { normal: { winRate: 59.2 }, upgraded: { winRate: 63.8 } },
        synergies: [
            { cardId: "defect_tempest", winRate: 78, note: "大量闪电球→特斯拉多次触发被动" },
            { cardId: "defect_ball_lightning", winRate: 75, note: "廉价闪电球来源" },
            { cardId: "defect_thunder", winRate: 72, note: "闪电激发附加伤害" },
            { cardId: "defect_lightning_rod", winRate: 70, note: "生成2闪电球" },
            { cardId: "defect_defragment", winRate: 68, note: "集中加成闪电球伤害" },
            { cardId: "defect_capacitor", winRate: 63, note: "更多闪电球栏位" },
            { cardId: "defect_storm", winRate: 62, note: "能力牌生成闪电球" },
            { cardId: "defect_zap", winRate: 60, note: "初始闪电球" }
        ]
    },
    {
        id: "defect_scrape", name: "刮削", class: "defect", rarity: "uncommon", cost: 1, type: "attack",
        description: "造成7点伤害。抽4张牌。丢弃抽到的牌中耗能不为0的牌。", image: getCardImage("刮削"), cssBg: getCardCssBg("attack"),
        stats: { normal: { winRate: 55.2 }, upgraded: { winRate: 60.8 } },
        synergies: [
            { cardId: "defect_claw", winRate: 78, note: "0费保留，快速找到多张爪击" },
            { cardId: "defect_all_for_one", winRate: 76, note: "丢弃非0费→万物一心回收0费" },
            { cardId: "defect_beam_cell", winRate: 74, note: "0费保留，易伤+刮削7伤" },
            { cardId: "defect_go_for_the_eyes", winRate: 72, note: "0费保留" },
            { cardId: "defect_follow_up", winRate: 65, note: "降为0费后可保留" },
            { cardId: "defect_hologram", winRate: 63, note: "回收被丢弃的关键牌" },
            { cardId: "defect_reboot", winRate: 60, note: "洗回丢弃的非0费牌" }
        ]
    },
        {
        id: "defect_rocket_punch", name: "火箭飞拳", class: "defect", rarity: "uncommon", cost: 2, type: "attack",
        description: "造成13点伤害。抽1张牌。生成状态牌时耗能降为0。", image: getCardImage("火箭飞拳"), cssBg: getCardCssBg("attack"),
        stats: { normal: { winRate: 60.5 }, upgraded: { winRate: 65.2 } },
        synergies: [
            { cardId: "defect_corrupt_attack", winRate: 78, note: "黏液→火箭飞拳降为0费" },
            { cardId: "defect_core_accel", winRate: 75, note: "虚空→火箭飞拳降为0费" },
            { cardId: "defect_overclock", winRate: 72, note: "灼伤→火箭飞拳降为0费" },
            { cardId: "defect_brace", winRate: 70, note: "2伤口→火箭飞拳降为0费" },
            { cardId: "defect_all_for_one", winRate: 65, note: "降为0费后被回收" },
            { cardId: "defect_scrape", winRate: 63, note: "降为0费后不被丢弃" },
            { cardId: "defect_beam_cell", winRate: 60, note: "易伤后13→19.5伤" }
        ]
    },
    {
        id: "defect_null", name: "空值", class: "defect", rarity: "uncommon", cost: 2, type: "attack",
        description: "造成10点伤害。给予2层虚弱。生成1个黑暗充能球。", image: getCardImage("空值"), cssBg: getCardCssBg("attack"),
        stats: { normal: { winRate: 52.5 }, upgraded: { winRate: 57.2 } },
        synergies: [
            { cardId: "defect_darkness", winRate: 78, note: "漆黑触发黑暗球被动+空值生成黑暗球" },
            { cardId: "defect_multicast", winRate: 75, note: "空值生成黑暗球→多重激发" },
            { cardId: "defect_dualcast", winRate: 72, note: "激发空值的黑暗球2次" },
            { cardId: "defect_quad_release", winRate: 62, note: "4次激发黑暗球" },
            { cardId: "defect_defragment", winRate: 63, note: "集中加速黑暗球积累" },
            { cardId: "defect_beam_cell", winRate: 58, note: "易伤后10→15伤" }
        ]
    },
    {
        id: "defect_synthesis", name: "人工合成", class: "defect", rarity: "uncommon", cost: 2, type: "attack",
        description: "造成12点伤害。你打出的下一张能力牌耗能变为0。", image: getCardImage("人工合成"), cssBg: getCardCssBg("attack"),
        stats: { normal: { winRate: 55.8 }, upgraded: { winRate: 60.5 } },
        synergies: [
            { cardId: "defect_echo_form", winRate: 82, note: "3费回响→0费打出" },
            { cardId: "defect_creative_ai", winRate: 80, note: "3费创造性AI→0费打出" },
            { cardId: "defect_biased_cognition", winRate: 76, note: "1费偏差→0费打出" },
            { cardId: "defect_defragment", winRate: 74, note: "1费碎片→0费打出" },
            { cardId: "defect_buffer", winRate: 72, note: "2费缓冲→0费打出" },
            { cardId: "defect_capacitor", winRate: 70, note: "1费扩容→0费打出" },
            { cardId: "defect_meteor_strike", winRate: 68, note: "5费陨石→0费打出" }
        ]
    },
    {
        id: "defect_sunder", name: "分离", class: "defect", rarity: "uncommon", cost: 3, type: "attack",
        description: "造成24点伤害。如果击杀了敌人则获得能量。", image: getCardImage("分离"), cssBg: getCardCssBg("attack"),
        stats: { normal: { winRate: 62.5 }, upgraded: { winRate: 67.8 } },
        synergies: [
            { cardId: "defect_beam_cell", winRate: 72, note: "易伤后24→36伤" },
            { cardId: "defect_double_energy", winRate: 70, note: "能量翻倍保证打出" },
            { cardId: "defect_core_accel", winRate: 68, note: "+2能量帮助打出" },
            { cardId: "defect_riot", winRate: 65, note: "免费打出分离=24伤" },
            { cardId: "defect_synthesis", winRate: 63, note: "减费能力帮助能量" },
            { cardId: "defect_fusion", winRate: 58, note: "等离子球提供持续能量" }
        ]
    },
    {
        id: "defect_refract", name: "折射", class: "defect", rarity: "uncommon", cost: 3, type: "attack",
        description: "造成9点伤害两次。生成2个玻璃充能球。", image: getCardImage("折射"), cssBg: getCardCssBg("attack"),
        stats: { normal: { winRate: 57.2 }, upgraded: { winRate: 62.5 } },
        synergies: [
            { cardId: "defect_spin_craft", winRate: 80, note: "旋转工艺持续生成玻璃球+推球" },
            { cardId: "defect_defragment", winRate: 75, note: "集中双倍加成玻璃球激发伤害" },
            { cardId: "defect_shatter", winRate: 72, note: "激发玻璃球=AOE爆发" },
            { cardId: "defect_glass_craft", winRate: 70, note: "双玻璃球来源" },
            { cardId: "defect_capacitor", winRate: 65, note: "栏位存放玻璃球" },
            { cardId: "defect_beam_cell", winRate: 63, note: "易伤后18→27伤" }
        ]
    },
    {
        id: "defect_spiral_drill", name: "螺旋钻击", class: "defect", rarity: "rare", cost: 0, type: "attack",
        description: "本回合中每使用1点能量，此牌造成3点伤害一次。", image: getCardImage("螺旋钻击"), cssBg: getCardCssBg("attack"),
        stats: { normal: { winRate: 63.5 }, upgraded: { winRate: 68.2 } },
        synergies: [
            { cardId: "defect_double_energy", winRate: 85, note: "能量翻倍→螺旋钻击伤害翻倍" },
            { cardId: "defect_core_accel", winRate: 82, note: "+2能量=+6/10伤" },
            { cardId: "defect_supercritical", winRate: 80, note: "+4/6能量=+12/30伤" },
            { cardId: "defect_meteor_strike", winRate: 78, note: "5费+3等离子=持续能量" },
            { cardId: "defect_fusion", winRate: 75, note: "等离子球=每回合+1能量" },
            { cardId: "defect_aggregate", winRate: 72, note: "抽牌堆提供能量" },
            { cardId: "defect_multicast", winRate: 68, note: "激发等离子球获爆发能量" },
            { cardId: "defect_beam_cell", winRate: 60, note: "易伤后总伤害+50%" }
        ]
    },
    {
        id: "defect_shatter", name: "打碎", class: "defect", rarity: "rare", cost: 1, type: "attack",
        description: "对所有敌人造成7点伤害。激发所有充能球。", image: getCardImage("打碎"), cssBg: getCardCssBg("attack"),
        stats: { normal: { winRate: 58.2 }, upgraded: { winRate: 63.5 } },
        synergies: [
            { cardId: "defect_darkness", winRate: 82, note: "激发黑暗球=积累伤害释放" },
            { cardId: "defect_tempest", winRate: 78, note: "大量闪电球→打碎全体激发" },
            { cardId: "defect_glacier", winRate: 75, note: "激发冰霜球=大量格挡" },
            { cardId: "defect_rainbow", winRate: 74, note: "激发3种球各1次" },
            { cardId: "defect_capacitor", winRate: 72, note: "更多球=更多激发" },
            { cardId: "defect_defragment", winRate: 70, note: "集中加成所有球激发效果" },
            { cardId: "defect_beam_cell", winRate: 62, note: "易伤后AOE 7→10.5伤" }
        ]
    },
    {
        id: "defect_hyperbeam", name: "超能光束", class: "defect", rarity: "rare", cost: 2, type: "attack",
        description: "对所有敌人造成26点伤害。失去3点集中。", image: getCardImage("超能光束"), cssBg: getCardCssBg("attack"),
        stats: { normal: { winRate: 58.5 }, upgraded: { winRate: 63.2 } },
        synergies: [
            { cardId: "defect_biased_cognition", winRate: 78, note: "先偏差+4→超能光束→衰减从4开始" },
            { cardId: "defect_fusion", winRate: 75, note: "等离子不受集中影响" },
            { cardId: "defect_meteor_strike", winRate: 72, note: "等离子能量引擎不受影响" },
            { cardId: "defect_core_accel", winRate: 68, note: "+2能量帮助打出" },
            { cardId: "defect_defragment", winRate: 63, note: "超能光束后补回集中" },
            { cardId: "defect_synthesis", winRate: 65, note: "超能光束后0费能力补充集中" }
        ]
    },
    {
        id: "defect_flak_cannon", name: "散射炮", class: "defect", rarity: "rare", cost: 2, type: "attack",
        description: "消耗所有状态牌。每张造成8点伤害随机分配。", image: getCardImage("散射炮"), cssBg: getCardCssBg("attack"),
        stats: { normal: { winRate: 62.5 }, upgraded: { winRate: 67.8 } },
        synergies: [
            { cardId: "defect_corrupt_attack", winRate: 80, note: "黏液=散射炮弹药" },
            { cardId: "defect_core_accel", winRate: 78, note: "虚空=散射炮弹药" },
            { cardId: "defect_overclock", winRate: 75, note: "灼伤=散射炮弹药" },
            { cardId: "defect_brace", winRate: 74, note: "2伤口=散射炮16伤" },
            { cardId: "defect_compact", winRate: 72, note: "压缩+散射炮双重利用" },
            { cardId: "defect_smokestack", winRate: 70, note: "烟囱AOE+散射炮消耗" },
            { cardId: "defect_waste_to_wealth", winRate: 68, note: "化废为宝+散射炮双利用" }
        ]
    },
    {
        id: "defect_adaptive_strike", name: "适应打击", class: "defect", rarity: "rare", cost: 2, type: "attack",
        description: "造成18点伤害。弃牌堆添加1张0费复制品。", image: getCardImage("适应打击"), cssBg: getCardCssBg("attack"),
        stats: { normal: { winRate: 60.2 }, upgraded: { winRate: 65.5 } },
        synergies: [
            { cardId: "defect_all_for_one", winRate: 82, note: "回收0费复制品二次循环" },
            { cardId: "defect_scrape", winRate: 78, note: "抽牌找到0费复制品保留" },
            { cardId: "defect_hologram", winRate: 75, note: "回收适应打击本体再次打出" },
            { cardId: "defect_reboot", winRate: 72, note: "洗回复制品再次打出" },
            { cardId: "defect_claw", winRate: 68, note: "0费体系+万物一心双回收" },
            { cardId: "defect_beam_cell", winRate: 63, note: "易伤后18→27伤" }
        ]
    },
    {
        id: "defect_all_for_one", name: "万物一心", class: "defect", rarity: "rare", cost: 2, type: "attack",
        description: "造成10点伤害。弃牌堆所有0费牌放入手牌。", image: getCardImage("万物一心"), cssBg: getCardCssBg("attack"),
        stats: { normal: { winRate: 65.2 }, upgraded: { winRate: 70.8 } },
        synergies: [
            { cardId: "defect_claw", winRate: 88, note: "回收多张爪击二次循环" },
            { cardId: "defect_adaptive_strike", winRate: 82, note: "回收0费复制品" },
            { cardId: "defect_scrape", winRate: 80, note: "丢弃非0费→万物一心回收0费" },
            { cardId: "defect_beam_cell", winRate: 78, note: "0费易伤回收" },
            { cardId: "defect_go_for_the_eyes", winRate: 76, note: "0费虚弱回收" },
            { cardId: "defect_spiral_drill", winRate: 75, note: "0费回收二次爆发" },
            { cardId: "defect_follow_up", winRate: 74, note: "降为0费后回收" },
            { cardId: "defect_hologram", winRate: 73, note: "回收万物一心本体二次触发" }
        ]
    },
    {
        id: "defect_ice_lance", name: "冰之长枪", class: "defect", rarity: "rare", cost: 3, type: "attack",
        description: "造成19点伤害。生成3个冰霜充能球。", image: getCardImage("冰之长枪"), cssBg: getCardCssBg("attack"),
        stats: { normal: { winRate: 62.8 }, upgraded: { winRate: 68.5 } },
        synergies: [
            { cardId: "defect_glacier", winRate: 80, note: "冰霜球叠加3+2=5颗" },
            { cardId: "defect_defragment", winRate: 78, note: "集中加成3冰霜球" },
            { cardId: "defect_capacitor", winRate: 76, note: "栏位存放冰霜球" },
            { cardId: "defect_blizzard", winRate: 74, note: "冰霜球计数转伤害" },
            { cardId: "defect_cold_snap", winRate: 72, note: "廉价冰霜球补充" },
            { cardId: "defect_barrage", winRate: 68, note: "3颗球=弹幕+15/21伤" },
            { cardId: "defect_synthesis", winRate: 63, note: "减费帮助打出3费" }
        ]
    },
    {
        id: "defect_meteor_strike", name: "陨石打击", class: "defect", rarity: "rare", cost: 5, type: "attack",
        description: "造成24点伤害。生成3个等离子充能球。", image: getCardImage("陨石打击"), cssBg: getCardCssBg("attack"),
        stats: { normal: { winRate: 58.5 }, upgraded: { winRate: 63.2 } },
        synergies: [
            { cardId: "defect_synthesis", winRate: 82, note: "5费→0费打出" },
            { cardId: "defect_double_energy", winRate: 78, note: "能量翻倍帮助打出" },
            { cardId: "defect_core_accel", winRate: 76, note: "+2能量帮助凑5费" },
            { cardId: "defect_spiral_drill", winRate: 75, note: "5费=螺旋钻击+15/25伤" },
            { cardId: "defect_fusion", winRate: 74, note: "等离子球叠加" },
            { cardId: "defect_supercritical", winRate: 70, note: "+4/6能量帮助打出" },
            { cardId: "defect_multicast", winRate: 63, note: "激发等离子球获得能量" }
        ]
    },
        // ==================== 技能牌 (31张) ====================
    {
        id: "defect_zap", name: "电击", class: "defect", rarity: "basic", cost: 1, type: "skill",
        description: "生成1个闪电充能球。", image: getCardImage("电击"), cssBg: getCardCssBg("skill"),
        stats: { normal: { winRate: 49.8 }, upgraded: { winRate: 54.2 } },
        synergies: [
            { cardId: "defect_tesla_coil", winRate: 72, note: "闪电球→特斯拉触发被动" },
            { cardId: "defect_tempest", winRate: 68, note: "同为闪电球来源" },
            { cardId: "defect_barrage", winRate: 65, note: "增加球数→弹幕伤害" },
            { cardId: "defect_defragment", winRate: 63, note: "集中加成闪电球" },
            { cardId: "defect_thunder", winRate: 62, note: "闪电激发附加伤害" },
            { cardId: "defect_all_for_one", winRate: 55, note: "升级后0费可回收" }
        ]
    },
    {
        id: "defect_defend", name: "防御", class: "defect", rarity: "basic", cost: 1, type: "skill",
        description: "获得5点格挡。", image: getCardImage("防御"), cssBg: getCardCssBg("skill"),
        stats: { normal: { winRate: 48.5 }, upgraded: { winRate: 50.8 } }, synergies: []
    },
    {
        id: "defect_dualcast", name: "双重释放", class: "defect", rarity: "basic", cost: 1, type: "skill",
        description: "激发你最右侧的充能球两次。", image: getCardImage("双重释放"), cssBg: getCardCssBg("skill"),
        stats: { normal: { winRate: 52.3 }, upgraded: { winRate: 56.8 } },
        synergies: [
            { cardId: "defect_darkness", winRate: 78, note: "激发黑暗球2次=双倍爆发" },
            { cardId: "defect_multicast", winRate: 75, note: "双重+多重=多次激发" },
            { cardId: "defect_quad_release", winRate: 73, note: "双重+四重=6次激发" },
            { cardId: "defect_fusion", winRate: 72, note: "激发等离子球2次=+4能量" },
            { cardId: "defect_glacier", winRate: 65, note: "激发冰霜球2次=10格挡" },
            { cardId: "defect_all_for_one", winRate: 58, note: "升级后0费可回收" }
        ]
    },
    {
        id: "defect_quick_escape", name: "高速脱离", class: "defect", rarity: "common", cost: 0, type: "skill",
        description: "获得6点格挡。弃牌堆加入1张晕眩。", image: getCardImage("高速脱离"), cssBg: getCardCssBg("skill"),
        stats: { normal: { winRate: 55.2 }, upgraded: { winRate: 59.8 } },
        synergies: [
            { cardId: "defect_compact", winRate: 78, note: "晕眩→燃料=+1能量+1抽牌" },
            { cardId: "defect_flak_cannon", winRate: 74, note: "晕眩=散射炮弹药" },
            { cardId: "defect_smokestack", winRate: 72, note: "生成晕眩触发AOE" },
            { cardId: "defect_waste_to_wealth", winRate: 70, note: "晕眩→随机充能球" },
            { cardId: "defect_iterate", winRate: 68, note: "晕眩触发迭代过牌" },
            { cardId: "defect_rocket_punch", winRate: 66, note: "晕眩触发降为0费" }
        ]
    },
    {
        id: "defect_core_accel", name: "内核加速", class: "defect", rarity: "common", cost: 0, type: "skill",
        description: "获得2费。弃牌堆加入1张虚空。", image: getCardImage("内核加速"), cssBg: getCardCssBg("skill"),
        stats: { normal: { winRate: 56.5 }, upgraded: { winRate: 61.2 } },
        synergies: [
            { cardId: "defect_spiral_drill", winRate: 82, note: "+2能量=螺旋钻击+6/10伤" },
            { cardId: "defect_meteor_strike", winRate: 78, note: "帮助凑5费" },
            { cardId: "defect_sunder", winRate: 76, note: "帮助凑3费" },
            { cardId: "defect_compact", winRate: 83, note: "虚空→燃料=净赚3能量" },
            { cardId: "defect_flak_cannon", winRate: 78, note: "虚空=散射炮弹药" },
            { cardId: "defect_waste_to_wealth", winRate: 75, note: "虚空→随机充能球" },
            { cardId: "defect_double_energy", winRate: 74, note: "先+2再翻倍=基数更大" },
            { cardId: "defect_supercritical", winRate: 72, note: "双重能量来源" }
        ]
    },
    {
        id: "defect_hotfix", name: "热修复", class: "defect", rarity: "common", cost: 0, type: "skill",
        description: "本回合获得2点集中。消耗。", image: getCardImage("热修复"), cssBg: getCardCssBg("skill"),
        stats: { normal: { winRate: 58.2 }, upgraded: { winRate: 63.5 } },
        synergies: [
            { cardId: "defect_glacier", winRate: 78, note: "+2集中→冰霜球格挡+2" },
            { cardId: "defect_ball_lightning", winRate: 76, note: "+2集中→闪电球伤害+2" },
            { cardId: "defect_tempest", winRate: 74, note: "+2集中→生成闪电球全部+2伤" },
            { cardId: "defect_defragment", winRate: 68, note: "临时+2+永久+1=+3集中" },
            { cardId: "defect_darkness", winRate: 70, note: "+2集中加速黑暗球积累" },
            { cardId: "defect_biased_cognition", winRate: 63, note: "延缓集中衰减" }
        ]
    },
    {
        id: "defect_charge", name: "充电", class: "defect", rarity: "common", cost: 1, type: "skill",
        description: "获得7点格挡。下回合获得1费。", image: getCardImage("充电"), cssBg: getCardCssBg("skill"),
        stats: { normal: { winRate: 57.8 }, upgraded: { winRate: 62.5 } },
        synergies: [
            { cardId: "defect_spiral_drill", winRate: 70, note: "下回合+1能量=螺旋钻击+3/5伤" },
            { cardId: "defect_sunder", winRate: 68, note: "防御+下回合能量打3费分离" },
            { cardId: "defect_ice_lance", winRate: 65, note: "防御+下回合能量打3费" },
            { cardId: "defect_defragment", winRate: 60, note: "防御争取时间叠集中" },
            { cardId: "defect_glacier", winRate: 62, note: "叠加格挡+冰霜球" }
        ]
    },
    {
        id: "defect_leap", name: "飞跃", class: "defect", rarity: "common", cost: 1, type: "skill",
        description: "获得9点格挡。", image: getCardImage("飞跃"), cssBg: getCardCssBg("skill"),
        stats: { normal: { winRate: 56.2 }, upgraded: { winRate: 61.5 } },
        synergies: [
            { cardId: "defect_defragment", winRate: 58, note: "防御争取时间叠集中" },
            { cardId: "defect_capacitor", winRate: 55, note: "防御保护栏位成型" },
            { cardId: "defect_glacier", winRate: 53, note: "叠加格挡" }
        ]
    },
    {
        id: "defect_coolheaded", name: "冷静头脑", class: "defect", rarity: "common", cost: 1, type: "skill",
        description: "生成1个冰霜充能球。抽1张牌。", image: getCardImage("冷静头脑"), cssBg: getCardCssBg("skill"),
        stats: { normal: { winRate: 62.8 }, upgraded: { winRate: 68.5 } },
        synergies: [
            { cardId: "defect_glacier", winRate: 80, note: "冰霜球叠加+过牌找冰川" },
            { cardId: "defect_defragment", winRate: 78, note: "集中加成冰霜球+过牌" },
            { cardId: "defect_capacitor", winRate: 75, note: "栏位存放冰霜球+过牌" },
            { cardId: "defect_cold_snap", winRate: 72, note: "双冰霜球来源" },
            { cardId: "defect_blizzard", winRate: 68, note: "冰霜球计数+过牌" },
            { cardId: "defect_hailstorm", winRate: 65, note: "生成冰霜球触发AOE+过牌" }
        ]
    },
    {
        id: "defect_hologram", name: "全息影像", class: "defect", rarity: "common", cost: 1, type: "skill",
        description: "获得3点格挡。弃牌堆1张牌放入手牌。消耗。", image: getCardImage("全息影像"), cssBg: getCardCssBg("skill"),
        stats: { normal: { winRate: 58.5 }, upgraded: { winRate: 63.2 } },
        synergies: [
            { cardId: "defect_all_for_one", winRate: 80, note: "回收万物一心本体二次触发" },
            { cardId: "defect_claw", winRate: 78, note: "回收爪击再次打出" },
            { cardId: "defect_adaptive_strike", winRate: 76, note: "回收适应打击本体" },
            { cardId: "defect_genetic_algorithm", winRate: 82, note: "回收遗传算法反复叠加" },
            { cardId: "defect_darkness", winRate: 70, note: "回收漆黑再次生成黑暗球" },
            { cardId: "defect_spiral_drill", winRate: 74, note: "回收螺旋钻击二次爆发" }
        ]
    },
    {
        id: "defect_lightning_rod", name: "引雷针", class: "defect", rarity: "common", cost: 1, type: "skill",
        description: "获得4点格挡。下2回合各生成1个闪电充能球。", image: getCardImage("引雷针"), cssBg: getCardCssBg("skill"),
        stats: { normal: { winRate: 55.8 }, upgraded: { winRate: 60.5 } },
        synergies: [
            { cardId: "defect_tesla_coil", winRate: 75, note: "闪电球→特斯拉触发被动", longBonus: 7 },
            { cardId: "defect_defragment", winRate: 73, note: "集中加成闪电球", longBonus: 8 },
            { cardId: "defect_capacitor", winRate: 70, note: "栏位存放闪电球", longBonus: 8 },
            { cardId: "defect_thunder", winRate: 68, note: "闪电激发附加伤害", longBonus: 8 },
            { cardId: "defect_tempest", winRate: 66, note: "闪电球叠加" },
            { cardId: "defect_barrage", winRate: 65, note: "球数增加→弹幕伤害" }
        ]
    },
        {
        id: "defect_tempest", name: "暴风雨", class: "defect", rarity: "uncommon", cost: 0, type: "skill",
        description: "消耗所有能量。每点能量生成1个闪电充能球。", image: getCardImage("暴风雨"), cssBg: getCardCssBg("skill"),
        stats: { normal: { winRate: 55.8 }, upgraded: { winRate: 62.5 } },
        synergies: [
            { cardId: "defect_core_accel", winRate: 80, note: "+2能量=+2闪电球" },
            { cardId: "defect_double_energy", winRate: 78, note: "能量翻倍→闪电球翻倍" },
            { cardId: "defect_meteor_strike", winRate: 76, note: "等离子球提供持续能量" },
            { cardId: "defect_tesla_coil", winRate: 72, note: "触发闪电球被动" },
            { cardId: "defect_defragment", winRate: 73, note: "集中加成所有闪电球" },
            { cardId: "defect_thunder", winRate: 70, note: "闪电激发附加伤害" },
            { cardId: "defect_capacitor", winRate: 68, note: "栏位存放闪电球" },
            { cardId: "defect_barrage", winRate: 66, note: "球数→弹幕伤害" },
            { cardId: "defect_supercritical", winRate: 65, note: "能量支持" },
            { cardId: "defect_voltaic", winRate: 85, note: "先暴风雨生成→电流相生复制" }
        ]
    },
    {
        id: "defect_chill", name: "冰寒", class: "defect", rarity: "uncommon", cost: 0, type: "skill",
        description: "当前每有一名敌人，就生成1个冰霜充能球。消耗。", image: getCardImage("冰寒"), cssBg: getCardCssBg("skill"),
        stats: { normal: { winRate: 58.2 }, upgraded: { winRate: 62.8 } },
        synergies: [
            { cardId: "defect_glacier", winRate: 78, note: "多敌时冰寒+冰川=大量冰霜球", multiEnemyBonus: 13 },
            { cardId: "defect_defragment", winRate: 75, note: "集中加成冰霜球", multiEnemyBonus: 12 },
            { cardId: "defect_capacitor", winRate: 73, note: "多敌时栏位需求更大", multiEnemyBonus: 13 },
            { cardId: "defect_blizzard", winRate: 72, note: "冰霜球计数转伤害", multiEnemyBonus: 14 },
            { cardId: "defect_barrage", winRate: 70, note: "球数→弹幕伤害" },
            { cardId: "defect_hailstorm", winRate: 66, note: "生成冰霜球触发AOE" }
        ]
    },
    {
        id: "defect_overclock", name: "超频", class: "defect", rarity: "uncommon", cost: 0, type: "skill",
        description: "抽2张牌。弃牌堆加入1张灼伤。", image: getCardImage("超频"), cssBg: getCardCssBg("skill"),
        stats: { normal: { winRate: 55.2 }, upgraded: { winRate: 60.8 } },
        synergies: [
            { cardId: "defect_compact", winRate: 82, note: "灼伤→燃料=+1能量+1抽牌" },
            { cardId: "defect_flak_cannon", winRate: 78, note: "灼伤=散射炮弹药" },
            { cardId: "defect_smokestack", winRate: 75, note: "生成灼伤触发AOE" },
            { cardId: "defect_waste_to_wealth", winRate: 73, note: "灼伤→随机充能球" },
            { cardId: "defect_iterate", winRate: 70, note: "灼伤触发迭代过牌" },
            { cardId: "defect_rocket_punch", winRate: 68, note: "灼伤触发降为0费" }
        ]
    },
    {
        id: "defect_boot_sequence", name: "启动流程", class: "defect", rarity: "uncommon", cost: 0, type: "skill",
        description: "固有。获得10点格挡。消耗。", image: getCardImage("启动流程"), cssBg: getCardCssBg("skill"),
        stats: { normal: { winRate: 65.2 }, upgraded: { winRate: 70.8 } },
        synergies: [
            { cardId: "defect_defragment", winRate: 75, note: "启动防御→安心叠集中" },
            { cardId: "defect_capacitor", winRate: 73, note: "启动防御→增加栏位" },
            { cardId: "defect_echo_form", winRate: 72, note: "启动防御→下回合3费回响" },
            { cardId: "defect_biased_cognition", winRate: 70, note: "启动防御→偏差爆发" },
            { cardId: "defect_creative_ai", winRate: 68, note: "启动防御→3费创造性AI" }
        ]
    },
    {
        id: "defect_white_noise", name: "白噪声", class: "defect", rarity: "uncommon", cost: 1, type: "skill",
        description: "随机能力牌加入手牌。本回合免费打出。消耗。", image: getCardImage("白噪声"), cssBg: getCardCssBg("skill"),
        stats: { normal: { winRate: 55.2 }, upgraded: { winRate: 60.8 } },
        synergies: [
            { cardId: "defect_iterate", winRate: 72, note: "打出能力牌触发抽牌" },
            { cardId: "defect_storm", winRate: 70, note: "打出能力牌生成闪电球" },
            { cardId: "defect_defragment", winRate: 65, note: "可能随机到集中" },
            { cardId: "defect_capacitor", winRate: 63, note: "可能随机到栏位" },
            { cardId: "defect_echo_form", winRate: 60, note: "可能随机到回响" }
        ]
    },
    {
        id: "defect_glass_craft", name: "玻璃工艺", class: "defect", rarity: "uncommon", cost: 1, type: "skill",
        description: "获得5点格挡。生成1个玻璃充能球。", image: getCardImage("玻璃工艺"), cssBg: getCardCssBg("skill"),
        stats: { normal: { winRate: 56.5 }, upgraded: { winRate: 61.2 } },
        synergies: [
            { cardId: "defect_spin_craft", winRate: 78, note: "旋转工艺持续生成玻璃球+推球" },
            { cardId: "defect_defragment", winRate: 75, note: "集中双倍加成玻璃球" },
            { cardId: "defect_shatter", winRate: 72, note: "激发玻璃球=AOE爆发" },
            { cardId: "defect_refract", winRate: 70, note: "双玻璃球来源" },
            { cardId: "defect_capacitor", winRate: 65, note: "栏位存放玻璃球" }
        ]
    },
    {
        id: "defect_chaos", name: "混沌", class: "defect", rarity: "uncommon", cost: 1, type: "skill",
        description: "生成1个随机充能球。", image: getCardImage("混沌"), cssBg: getCardCssBg("skill"),
        stats: { normal: { winRate: 55.2 }, upgraded: { winRate: 60.5 } },
        synergies: [
            { cardId: "defect_compile_driver", winRate: 75, note: "随机球增加种类→抽牌" },
            { cardId: "defect_capacitor", winRate: 72, note: "栏位存放随机球" },
            { cardId: "defect_barrage", winRate: 70, note: "增加球数→弹幕伤害" },
            { cardId: "defect_defragment", winRate: 68, note: "集中加成随机球" },
            { cardId: "defect_shatter", winRate: 65, note: "激发随机球" },
            { cardId: "defect_rainbow", winRate: 63, note: "双随机球来源" }
        ]
    },
    {
        id: "defect_skimming", name: "快速检索", class: "defect", rarity: "uncommon", cost: 1, type: "skill",
        description: "抽3张牌。", image: getCardImage("快速检索"), cssBg: getCardCssBg("skill"),
        stats: { normal: { winRate: 55.2 }, upgraded: { winRate: 60.8 } },
        synergies: [
            { cardId: "defect_claw", winRate: 72, note: "快速找到多张爪击" },
            { cardId: "defect_all_for_one", winRate: 70, note: "过牌找万物一心" },
            { cardId: "defect_defragment", winRate: 66, note: "过牌找关键能力" },
            { cardId: "defect_scrape", winRate: 65, note: "双重过牌体系" },
            { cardId: "defect_reboot", winRate: 60, note: "过牌叠加" }
        ]
    },
    {
        id: "defect_scavenge", name: "内存清理", class: "defect", rarity: "uncommon", cost: 1, type: "skill",
        description: "消耗一张牌。下回合获得2费。", image: getCardImage("内存清理"), cssBg: getCardCssBg("skill"),
        stats: { normal: { winRate: 53.5 }, upgraded: { winRate: 58.2 } },
        synergies: [
            { cardId: "defect_flak_cannon", winRate: 76, note: "消耗状态牌+下回合散射炮" },
            { cardId: "defect_compact", winRate: 74, note: "消耗状态牌+下回合能量" },
            { cardId: "defect_core_accel", winRate: 72, note: "消耗虚空+下回合能量叠加" },
            { cardId: "defect_spiral_drill", winRate: 65, note: "下回合能量→螺旋钻击爆发" },
            { cardId: "defect_sunder", winRate: 63, note: "下回合能量打3费分离" }
        ]
    },
    {
        id: "defect_energy_surge", name: "能量涌动", class: "defect", rarity: "uncommon", cost: 1, type: "skill",
        description: "所有玩家获得2费。消耗。", image: getCardImage("能量涌动"), cssBg: getCardCssBg("skill"),
        stats: { normal: { winRate: 56.8 }, upgraded: { winRate: 62.5 } },
        synergies: [
            { cardId: "defect_spiral_drill", winRate: 75, note: "+2能量=螺旋钻击+6/10伤" },
            { cardId: "defect_tempest", winRate: 72, note: "+2能量=+2闪电球" },
            { cardId: "defect_core_accel", winRate: 70, note: "双重能量来源" },
            { cardId: "defect_meteor_strike", winRate: 68, note: "帮助凑5费" },
            { cardId: "defect_sunder", winRate: 66, note: "帮助凑3费" }
        ]
    },
    {
        id: "defect_darkness", name: "漆黑", class: "defect", rarity: "uncommon", cost: 1, type: "skill",
        description: "生成1黑暗充能球。触发所有黑暗充能球被动。", image: getCardImage("漆黑"), cssBg: getCardCssBg("skill"),
        stats: { normal: { winRate: 56.5 }, upgraded: { winRate: 62.3 } },
        synergies: [
            { cardId: "defect_multicast", winRate: 82, note: "漆黑积累→多重激发，Boss杀手" },
            { cardId: "defect_quad_release", winRate: 80, note: "漆黑触发被动+四重激发" },
            { cardId: "defect_dualcast", winRate: 78, note: "激发黑暗球2次" },
            { cardId: "defect_shatter", winRate: 76, note: "激发所有球包括黑暗球" },
            { cardId: "defect_consuming_shadow", winRate: 75, note: "黑暗球伤害翻倍" },
            { cardId: "defect_hologram", winRate: 70, note: "回收漆黑再次打出" },
            { cardId: "defect_loop", winRate: 68, note: "自动触发黑暗球被动" },
            { cardId: "defect_defragment", winRate: 65, note: "集中加速黑暗球积累" }
        ]
    },
    {
        id: "defect_brace", name: "强撑", class: "defect", rarity: "uncommon", cost: 1, type: "skill",
        description: "获得13点格挡。弃牌堆加入2张伤口。", image: getCardImage("强撑"), cssBg: getCardCssBg("skill"),
        stats: { normal: { winRate: 60.2 }, upgraded: { winRate: 65.8 } },
        synergies: [
            { cardId: "defect_compact", winRate: 88, note: "2伤口→2燃料=+2能量+2抽牌+19格挡" },
            { cardId: "defect_flak_cannon", winRate: 78, note: "2伤口=散射炮16伤" },
            { cardId: "defect_smokestack", winRate: 85, note: "2伤口→触发2次AOE" },
            { cardId: "defect_waste_to_wealth", winRate: 80, note: "2伤口→2随机充能球" },
            { cardId: "defect_iterate", winRate: 76, note: "2伤口触发迭代过牌" },
            { cardId: "defect_rocket_punch", winRate: 70, note: "2伤口触发降费" }
        ]
    },
    {
        id: "defect_double_energy", name: "双倍能量", class: "defect", rarity: "uncommon", cost: 1, type: "skill",
        description: "将你的能量翻倍。消耗。", image: getCardImage("双倍能量"), cssBg: getCardCssBg("skill"),
        stats: { normal: { winRate: 62.5 }, upgraded: { winRate: 67.8 } },
        synergies: [
            { cardId: "defect_core_accel", winRate: 82, note: "先+2再翻倍=基数更大" },
            { cardId: "defect_spiral_drill", winRate: 80, note: "翻倍后能量→螺旋钻击翻倍" },
            { cardId: "defect_tempest", winRate: 78, note: "能量翻倍→闪电球翻倍" },
            { cardId: "defect_meteor_strike", winRate: 76, note: "翻倍帮助凑5费" },
            { cardId: "defect_supercritical", winRate: 74, note: "先+4再翻倍=+8" },
            { cardId: "defect_sunder", winRate: 72, note: "翻倍帮助打3费" }
        ]
    },
    {
        id: "defect_sync", name: "同步", class: "defect", rarity: "uncommon", cost: 1, type: "skill",
        description: "你每有一种不同的充能球，本回合获得2点集中。消耗。", image: getCardImage("同步"), cssBg: getCardCssBg("skill"),
        stats: { normal: { winRate: 55.8 }, upgraded: { winRate: 60.5 } },
        synergies: [
            { cardId: "defect_rainbow", winRate: 82, note: "1张牌3种球→同步+6集中" },
            { cardId: "defect_chaos", winRate: 78, note: "随机球增加种类" },
            { cardId: "defect_compile_driver", winRate: 75, note: "球种类越多抽牌越多" },
            { cardId: "defect_glacier", winRate: 73, note: "集中→冰霜球格挡" },
            { cardId: "defect_darkness", winRate: 72, note: "集中→黑暗球积累" },
            { cardId: "defect_fusion", winRate: 68, note: "等离子解锁第4种→+8集中" }
        ]
    },
    {
        id: "defect_compact", name: "压缩", class: "defect", rarity: "uncommon", cost: 1, type: "skill",
        description: "获得6点格挡。手牌中全部状态牌变化为燃料。", image: getCardImage("压缩"), cssBg: getCardCssBg("skill"),
        stats: { normal: { winRate: 54.2 }, upgraded: { winRate: 59.5 } },
        synergies: [
            { cardId: "defect_brace", winRate: 88, note: "2伤口→2燃料=+2能量+2抽牌" },
            { cardId: "defect_corrupt_attack", winRate: 85, note: "黏液→燃料" },
            { cardId: "defect_core_accel", winRate: 83, note: "虚空→燃料=净赚3能量" },
            { cardId: "defect_overclock", winRate: 82, note: "灼伤→燃料" },
            { cardId: "defect_quick_escape", winRate: 78, note: "晕眩→燃料" },
            { cardId: "defect_flak_cannon", winRate: 76, note: "压缩+散射炮双重利用" },
            { cardId: "defect_smokestack", winRate: 74, note: "压缩转化前触发烟囱AOE" }
        ]
    },
    {
        id: "defect_shadow_shield", name: "暗影之盾", class: "defect", rarity: "uncommon", cost: 2, type: "skill",
        description: "获得11点格挡。生成1个黑暗充能球。", image: getCardImage("暗影之盾"), cssBg: getCardCssBg("skill"),
        stats: { normal: { winRate: 56.5 }, upgraded: { winRate: 61.2 } },
        synergies: [
            { cardId: "defect_darkness", winRate: 78, note: "漆黑触发黑暗球被动+暗影生成黑暗球" },
            { cardId: "defect_multicast", winRate: 75, note: "黑暗球→多重激发" },
            { cardId: "defect_dualcast", winRate: 73, note: "激发黑暗球2次" },
            { cardId: "defect_consuming_shadow", winRate: 72, note: "黑暗球伤害翻倍" },
            { cardId: "defect_quad_release", winRate: 70, note: "4次激发黑暗球" },
            { cardId: "defect_loop", winRate: 65, note: "自动触发黑暗球被动" }
        ]
    },
    {
        id: "defect_glacier", name: "冰川", class: "defect", rarity: "uncommon", cost: 2, type: "skill",
        description: "获得6点格挡。生成2个冰霜充能球。", image: getCardImage("冰川"), cssBg: getCardCssBg("skill"),
        stats: { normal: { winRate: 72.5 }, upgraded: { winRate: 78.2 } },
        synergies: [
            { cardId: "defect_defragment", winRate: 85, note: "集中加成冰霜球" },
            { cardId: "defect_capacitor", winRate: 82, note: "栏位存放冰霜球" },
            { cardId: "defect_coolheaded", winRate: 78, note: "冰霜球+过牌" },
            { cardId: "defect_cold_snap", winRate: 75, note: "双冰霜球来源" },
            { cardId: "defect_ice_lance", winRate: 73, note: "叠加冰霜球" },
            { cardId: "defect_echo_form", winRate: 88, note: "双倍冰川=12格挡+4冰霜球" },
            { cardId: "defect_blizzard", winRate: 72, note: "冰霜球计数转伤害" },
            { cardId: "defect_hailstorm", winRate: 68, note: "生成冰霜球触发AOE" }
        ]
    },
    {
        id: "defect_fusion", name: "聚变", class: "defect", rarity: "uncommon", cost: 2, type: "skill",
        description: "生成1个等离子充能球。", image: getCardImage("聚变"), cssBg: getCardCssBg("skill"),
        stats: { normal: { winRate: 55.2 }, upgraded: { winRate: 60.8 } },
        synergies: [
            { cardId: "defect_meteor_strike", winRate: 80, note: "等离子叠加3+1=4颗" },
            { cardId: "defect_spiral_drill", winRate: 78, note: "等离子提供持续能量" },
            { cardId: "defect_tempest", winRate: 75, note: "等离子能量→暴风雨" },
            { cardId: "defect_dualcast", winRate: 73, note: "激发等离子=+2能量" },
            { cardId: "defect_multicast", winRate: 72, note: "多次激发等离子" },
            { cardId: "defect_quad_release", winRate: 70, note: "4次激发=+8能量" }
        ]
    },
        {
        id: "defect_supercritical", name: "超临界态", class: "defect", rarity: "rare", cost: 0, type: "skill",
        description: "获得4费。消耗。", image: getCardImage("超临界态"), cssBg: getCardCssBg("skill"),
        stats: { normal: { winRate: 68.5 }, upgraded: { winRate: 73.2 } },
        synergies: [
            { cardId: "defect_spiral_drill", winRate: 85, note: "+4/6能量=螺旋钻击+12/30伤" },
            { cardId: "defect_tempest", winRate: 82, note: "+4/6能量=4/6闪电球" },
            { cardId: "defect_multicast", winRate: 78, note: "能量支持多次激发" },
            { cardId: "defect_meteor_strike", winRate: 76, note: "帮助凑5费" },
            { cardId: "defect_sunder", winRate: 74, note: "帮助打3费" },
            { cardId: "defect_double_energy", winRate: 70, note: "先+4再翻倍=+8" }
        ]
    },
    {
        id: "defect_multicast", name: "多重释放", class: "defect", rarity: "rare", cost: 0, type: "skill",
        description: "激发你最右侧的充能球X次。", image: getCardImage("多重释放"), cssBg: getCardCssBg("skill"),
        stats: { normal: { winRate: 62.5 }, upgraded: { winRate: 67.8 } },
        synergies: [
            { cardId: "defect_darkness", winRate: 85, note: "黑暗球积累→多重激发X次" },
            { cardId: "defect_shadow_shield", winRate: 78, note: "提供黑暗球+多重激发" },
            { cardId: "defect_fusion", winRate: 73, note: "激发等离子X次=+2X能量" },
            { cardId: "defect_meteor_strike", winRate: 72, note: "等离子球+多重激发" },
            { cardId: "defect_glacier", winRate: 68, note: "激发冰霜球X次=5X格挡" },
            { cardId: "defect_supercritical", winRate: 63, note: "能量支持多次激发" }
        ]
    },
    {
        id: "defect_modded", name: "模组改造", class: "defect", rarity: "rare", cost: 0, type: "skill",
        description: "获得1个充能球栏位。抽1张牌。该牌耗能加1。", image: getCardImage("模组改造"), cssBg: getCardCssBg("skill"),
        stats: { normal: { winRate: 65.2 }, upgraded: { winRate: 70.8 } },
        synergies: [
            { cardId: "defect_claw", winRate: 72, note: "0费加1费仍可接受" },
            { cardId: "defect_beam_cell", winRate: 70, note: "0费→1费" },
            { cardId: "defect_capacitor", winRate: 66, note: "双重栏位来源" },
            { cardId: "defect_defragment", winRate: 65, note: "栏位+集中组合" },
            { cardId: "defect_glacier", winRate: 63, note: "栏位存放冰霜球" }
        ]
    },
    {
        id: "defect_reboot", name: "重启", class: "defect", rarity: "rare", cost: 0, type: "skill",
        description: "洗回弃牌堆所有牌。抽4张牌。消耗。", image: getCardImage("重启"), cssBg: getCardCssBg("skill"),
        stats: { normal: { winRate: 68.5 }, upgraded: { winRate: 73.2 } },
        synergies: [
            { cardId: "defect_claw", winRate: 76, note: "洗回成长后爪击再次循环" },
            { cardId: "defect_all_for_one", winRate: 74, note: "洗回弃牌堆0费牌" },
            { cardId: "defect_adaptive_strike", winRate: 72, note: "洗回复制品" },
            { cardId: "defect_follow_up", winRate: 70, note: "洗回降费后的趁势打击" },
            { cardId: "defect_darkness", winRate: 66, note: "洗回漆黑再次生成黑暗球" },
            { cardId: "defect_defragment", winRate: 65, note: "过牌找关键能力" }
        ]
    },
    {
        id: "defect_signal_boost", name: "信号增强", class: "defect", rarity: "rare", cost: 1, type: "skill",
        description: "你的下一张能力牌会额外打出一次。消耗。", image: getCardImage("信号增强"), cssBg: getCardCssBg("skill"),
        stats: { normal: { winRate: 65.8 }, upgraded: { winRate: 70.5 } },
        synergies: [
            { cardId: "defect_defragment", winRate: 88, note: "双倍碎片=+2集中" },
            { cardId: "defect_capacitor", winRate: 86, note: "双倍扩容=+4栏位" },
            { cardId: "defect_biased_cognition", winRate: 85, note: "双倍偏差=+8集中" },
            { cardId: "defect_echo_form", winRate: 83, note: "双倍回响=前2张双倍" },
            { cardId: "defect_buffer", winRate: 80, note: "双倍缓冲=2次免伤" },
            { cardId: "defect_machine_learning", winRate: 78, note: "双倍机器学习=+2抽牌" }
        ]
    },
    {
        id: "defect_genetic_algorithm", name: "遗传算法", class: "defect", rarity: "rare", cost: 1, type: "skill",
        description: "获得1点格挡。每打出一次格挡值永久+3。消耗。", image: getCardImage("遗传算法"), cssBg: getCardCssBg("skill"),
        stats: { normal: { winRate: 62.5 }, upgraded: { winRate: 67.8 } },
        synergies: [
            { cardId: "defect_hologram", winRate: 82, note: "回收遗传算法再次打出加速成长" },
            { cardId: "defect_reboot", winRate: 76, note: "洗回再次打出" },
            { cardId: "defect_echo_form", winRate: 60, note: "双倍打出+双倍成长" },
            { cardId: "defect_signal_boost", winRate: 62, note: "双倍打出=+6/8格挡" }
        ]
    },
    {
        id: "defect_ignite", name: "引火", class: "defect", rarity: "rare", cost: 1, type: "skill",
        description: "使另一名玩家生成等离子充能球。消耗。", image: getCardImage("引火"), cssBg: getCardCssBg("skill"),
        stats: { normal: { winRate: 58.5 }, upgraded: { winRate: 63.2 } },
        synergies: [
            { cardId: "defect_meteor_strike", winRate: 78, note: "联机：队友等离子+自己等离子" },
            { cardId: "defect_fusion", winRate: 75, note: "联机：双重等离子来源" }
        ]
    },
    {
        id: "defect_rainbow", name: "彩虹", class: "defect", rarity: "rare", cost: 2, type: "skill",
        description: "生成1闪电球、1冰霜球、1黑暗球。消耗。", image: getCardImage("彩虹"), cssBg: getCardCssBg("skill"),
        stats: { normal: { winRate: 62.5 }, upgraded: { winRate: 67.8 } },
        synergies: [
            { cardId: "defect_compile_driver", winRate: 82, note: "3种球→抽3张牌" },
            { cardId: "defect_sync", winRate: 80, note: "3种球→+6集中" },
            { cardId: "defect_shatter", winRate: 78, note: "激发3种球各1次" },
            { cardId: "defect_capacitor", winRate: 76, note: "栏位存放3种球" },
            { cardId: "defect_defragment", winRate: 75, note: "集中加成3种球" },
            { cardId: "defect_barrage", winRate: 73, note: "3颗球=弹幕+15/21伤" },
            { cardId: "defect_echo_form", winRate: 60, note: "双倍彩虹=6颗球" }
        ]
    },
    {
        id: "defect_voltaic", name: "电流相生", class: "defect", rarity: "rare", cost: 3, type: "skill",
        description: "生成等量于本场战斗生成过的闪电球数量的闪电球。消耗。", image: getCardImage("电流相生"), cssBg: getCardCssBg("skill"),
        stats: { normal: { winRate: 58.2 }, upgraded: { winRate: 63.5 } },
        synergies: [
            { cardId: "defect_tempest", winRate: 85, note: "暴风雨生成大量闪电球→电流相生复制" },
            { cardId: "defect_ball_lightning", winRate: 82, note: "廉价闪电球来源增加计数" },
            { cardId: "defect_lightning_rod", winRate: 78, note: "延迟闪电球增加计数" },
            { cardId: "defect_tesla_coil", winRate: 74, note: "触发所有闪电球被动" },
            { cardId: "defect_thunder", winRate: 72, note: "闪电激发附加伤害" },
            { cardId: "defect_defragment", winRate: 70, note: "集中加成所有闪电球" },
            { cardId: "defect_capacitor", winRate: 68, note: "栏位存放海量闪电球" }
        ]
    },
    {
        id: "defect_quad_release", name: "四重释放", class: "defect", rarity: "ancient", cost: 1, type: "skill",
        description: "激发你最右侧的充能球4次。", image: getCardImage("四重释放"), cssBg: getCardCssBg("skill"),
        stats: { normal: { winRate: 72.5 }, upgraded: { winRate: 78.2 } },
        synergies: [
            { cardId: "defect_darkness", winRate: 90, note: "黑暗球积累→4次激发=4倍爆发" },
            { cardId: "defect_shadow_shield", winRate: 85, note: "提供黑暗球+4次激发" },
            { cardId: "defect_fusion", winRate: 76, note: "激发等离子4次=+8能量" },
            { cardId: "defect_meteor_strike", winRate: 75, note: "等离子球+4次激发" },
            { cardId: "defect_glacier", winRate: 72, note: "激发冰霜球4次=20格挡" },
            { cardId: "defect_all_for_one", winRate: 68, note: "升级后0费可回收" }
        ]
    },
        // ==================== 能力牌 (21张) ====================
    {
        id: "defect_hailstorm", name: "冰雹风暴", class: "defect", rarity: "uncommon", cost: 1, type: "power",
        description: "回合结束时有冰霜球→对所有敌人造成6点伤害。", image: getCardImage("冰雹风暴"), cssBg: getCardCssBg("power"),
        stats: { normal: { winRate: 56.5 }, upgraded: { winRate: 61.2 } },
        synergies: [
            { cardId: "defect_glacier", winRate: 80, note: "2冰霜球→每回合触发AOE" },
            { cardId: "defect_cold_snap", winRate: 78, note: "廉价冰霜球保证触发" },
            { cardId: "defect_coolheaded", winRate: 76, note: "冰霜球+过牌维持触发" },
            { cardId: "defect_ice_lance", winRate: 75, note: "3冰霜球→稳定触发" },
            { cardId: "defect_chill", winRate: 73, note: "多敌时大量冰霜球→AOE叠加" },
            { cardId: "defect_capacitor", winRate: 70, note: "更多冰霜球更稳定" },
            { cardId: "defect_defragment", winRate: 68, note: "集中强化冰霜球" }
        ]
    },
    {
        id: "defect_iterate", name: "迭代", class: "defect", rarity: "uncommon", cost: 1, type: "power",
        description: "每回合首次抽到状态牌时抽2张牌。", image: getCardImage("迭代"), cssBg: getCardCssBg("power"),
        stats: { normal: { winRate: 62.5 }, upgraded: { winRate: 67.8 } },
        synergies: [
            { cardId: "defect_brace", winRate: 85, note: "2伤口→抽到触发迭代" },
            { cardId: "defect_core_accel", winRate: 83, note: "虚空→抽到触发迭代" },
            { cardId: "defect_overclock", winRate: 82, note: "灼伤→抽到触发迭代" },
            { cardId: "defect_corrupt_attack", winRate: 80, note: "黏液→抽到触发迭代" },
            { cardId: "defect_quick_escape", winRate: 78, note: "晕眩→抽到触发迭代" },
            { cardId: "defect_compact", winRate: 76, note: "迭代+压缩双重利用" },
            { cardId: "defect_flak_cannon", winRate: 74, note: "状态牌三用途" },
            { cardId: "defect_smokestack", winRate: 72, note: "迭代+烟囱双收益" }
        ]
    },
    {
        id: "defect_capacitor", name: "扩容", class: "defect", rarity: "uncommon", cost: 1, type: "power",
        description: "获得2个充能球栏位。", image: getCardImage("扩容"), cssBg: getCardCssBg("power"),
        stats: { normal: { winRate: 68.5 }, upgraded: { winRate: 73.2 } },
        synergies: [
            { cardId: "defect_defragment", winRate: 88, note: "栏位+集中=黄金组合" },
            { cardId: "defect_glacier", winRate: 85, note: "栏位存放冰霜球" },
            { cardId: "defect_tempest", winRate: 82, note: "栏位存放闪电球" },
            { cardId: "defect_rainbow", winRate: 80, note: "栏位存放3种球" },
            { cardId: "defect_darkness", winRate: 78, note: "栏位存放黑暗球" },
            { cardId: "defect_barrage", winRate: 76, note: "栏位→更多球→更高伤害" },
            { cardId: "defect_echo_form", winRate: 86, note: "双倍扩容=+4/+6栏位" },
            { cardId: "defect_signal_boost", winRate: 84, note: "双倍扩容" }
        ]
    },
    {
        id: "defect_storm", name: "雷暴", class: "defect", rarity: "uncommon", cost: 1, type: "power",
        description: "每当你打出一张能力牌时，生成1个闪电充能球。", image: getCardImage("雷暴"), cssBg: getCardCssBg("power"),
        stats: { normal: { winRate: 62.5 }, upgraded: { winRate: 67.8 } },
        synergies: [
            { cardId: "defect_defragment", winRate: 80, note: "打出碎片→闪电球+集中加成" },
            { cardId: "defect_capacitor", winRate: 78, note: "打出扩容→闪电球+栏位" },
            { cardId: "defect_creative_ai", winRate: 76, note: "每回合能力牌→每回合闪电球" },
            { cardId: "defect_iterate", winRate: 74, note: "打出能力触发迭代+雷暴" },
            { cardId: "defect_tesla_coil", winRate: 73, note: "触发闪电球被动" },
            { cardId: "defect_thunder", winRate: 72, note: "闪电激发附加伤害" },
            { cardId: "defect_machine_learning", winRate: 68, note: "打出机器学习→闪电球+抽牌" }
        ]
    },
    {
        id: "defect_thunder", name: "雷霆", class: "defect", rarity: "uncommon", cost: 1, type: "power",
        description: "每当你激发闪电充能球时，对被命中的敌人造成6点伤害。", image: getCardImage("雷霆"), cssBg: getCardCssBg("power"),
        stats: { normal: { winRate: 58.5 }, upgraded: { winRate: 63.2 } },
        synergies: [
            { cardId: "defect_tesla_coil", winRate: 82, note: "触发闪电球被动→雷霆附加" },
            { cardId: "defect_tempest", winRate: 80, note: "大量闪电球激发→雷霆多次触发" },
            { cardId: "defect_shatter", winRate: 78, note: "激发所有球→雷霆附加" },
            { cardId: "defect_ball_lightning", winRate: 76, note: "廉价闪电球来源" },
            { cardId: "defect_voltaic", winRate: 73, note: "海量闪电球→雷霆多次触发" },
            { cardId: "defect_storm", winRate: 72, note: "能力生成闪电球→激发→雷霆" },
            { cardId: "defect_defragment", winRate: 65, note: "集中+雷霆=双增伤" }
        ]
    },
    {
        id: "defect_loop", name: "循环", class: "defect", rarity: "uncommon", cost: 1, type: "power",
        description: "回合开始时触发最右侧充能球被动。", image: getCardImage("循环"), cssBg: getCardCssBg("power"),
        stats: { normal: { winRate: 62.5 }, upgraded: { winRate: 67.8 } },
        synergies: [
            { cardId: "defect_darkness", winRate: 78, note: "自动触发黑暗球被动=自动积累" },
            { cardId: "defect_fusion", winRate: 74, note: "自动触发等离子被动=+1能量/回合" },
            { cardId: "defect_meteor_strike", winRate: 73, note: "3等离子+循环=+3能量/回合" },
            { cardId: "defect_glacier", winRate: 72, note: "自动触发冰霜球被动=+2格挡/回合" },
            { cardId: "defect_capacitor", winRate: 70, note: "更多球=循环价值更高" },
            { cardId: "defect_defragment", winRate: 68, note: "集中加成被动效果" },
            { cardId: "defect_rainbow", winRate: 66, note: "3种球→循环可切换目标" }
        ]
    },
    {
        id: "defect_smokestack", name: "烟囱", class: "defect", rarity: "uncommon", cost: 1, type: "power",
        description: "每当你生成一张状态牌时，对所有敌人造成5点伤害。", image: getCardImage("烟囱"), cssBg: getCardCssBg("power"),
        stats: { normal: { winRate: 58.2 }, upgraded: { winRate: 63.5 } },
        synergies: [
            { cardId: "defect_brace", winRate: 85, note: "2伤口→2次AOE=10/14伤" },
            { cardId: "defect_corrupt_attack", winRate: 83, note: "黏液→AOE+12伤" },
            { cardId: "defect_core_accel", winRate: 80, note: "虚空→AOE+2能量" },
            { cardId: "defect_overclock", winRate: 78, note: "灼伤→AOE+抽牌" },
            { cardId: "defect_quick_escape", winRate: 75, note: "晕眩→AOE+6格挡" },
            { cardId: "defect_compact", winRate: 73, note: "压缩+烟囱双重利用" },
            { cardId: "defect_flak_cannon", winRate: 72, note: "烟囱AOE+散射炮消耗" },
            { cardId: "defect_iterate", winRate: 70, note: "烟囱AOE+迭代过牌" }
        ]
    },
    {
        id: "defect_subroutine", name: "子程序", class: "defect", rarity: "uncommon", cost: 1, type: "power",
        description: "当你打出一张能力牌时，获得1费。", image: getCardImage("子程序"), cssBg: getCardCssBg("power"),
        stats: { normal: { winRate: 55.8 }, upgraded: { winRate: 60.5 } },
        synergies: [
            { cardId: "defect_defragment", winRate: 78, note: "1费碎片→返还1能量=免费" },
            { cardId: "defect_capacitor", winRate: 76, note: "1费扩容→返还1能量=免费" },
            { cardId: "defect_storm", winRate: 75, note: "打出能力→返还+闪电球" },
            { cardId: "defect_creative_ai", winRate: 74, note: "每回合能力→每回合返能" },
            { cardId: "defect_iterate", winRate: 73, note: "打出能力触发迭代+返能" },
            { cardId: "defect_machine_learning", winRate: 72, note: "1费→返还1能量" },
            { cardId: "defect_echo_form", winRate: 66, note: "3费回响→返还1能量" },
            { cardId: "defect_biased_cognition", winRate: 65, note: "1费偏差→返还1能量" }
        ]
    },
    {
        id: "defect_bulk_up", name: "暴涨", class: "defect", rarity: "uncommon", cost: 2, type: "power",
        description: "失去1个充能球栏位。获得2点力量。获得2点敏捷。", image: getCardImage("暴涨"), cssBg: getCardCssBg("power"),
        stats: { normal: { winRate: 56.2 }, upgraded: { winRate: 61.5 } },
        synergies: [
            { cardId: "defect_spiral_drill", winRate: 78, note: "力量加成螺旋钻击每段伤害" },
            { cardId: "defect_claw", winRate: 75, note: "力量+爪击成长=双增伤" },
            { cardId: "defect_ball_lightning", winRate: 72, note: "力量加成7伤" },
            { cardId: "defect_cold_snap", winRate: 66, note: "力量+敏捷双加成" },
            { cardId: "defect_leap", winRate: 65, note: "敏捷+3=12/15格挡" },
            { cardId: "defect_capacitor", winRate: 60, note: "先扩容+2再暴涨-1=净+1栏位" }
        ]
    },
    {
        id: "defect_feral", name: "野性", class: "defect", rarity: "uncommon", cost: 2, type: "power",
        description: "每回合打出的第一张0费攻击牌会放回手牌。", image: getCardImage("野性"), cssBg: getCardCssBg("power"),
        stats: { normal: { winRate: 56.2 }, upgraded: { winRate: 61.5 } },
        synergies: [
            { cardId: "defect_claw", winRate: 85, note: "0费爪击每回合免费打出+成长" },
            { cardId: "defect_beam_cell", winRate: 80, note: "0费易伤每回合免费施加" },
            { cardId: "defect_go_for_the_eyes", winRate: 78, note: "0费虚弱每回合免费施加" },
            { cardId: "defect_spiral_drill", winRate: 76, note: "0费螺旋每回合免费打出" },
            { cardId: "defect_follow_up", winRate: 72, note: "降为0费后每回合免费" },
            { cardId: "defect_tesla_coil", winRate: 70, note: "0费触发闪电球被动" },
            { cardId: "defect_all_for_one", winRate: 68, note: "回收更多0费牌" }
        ]
    },
    {
        id: "defect_waste_to_wealth", name: "化废为宝", class: "defect", rarity: "rare", cost: 1, type: "power",
        description: "每当你生成状态牌时，随机生成一个充能球。", image: getCardImage("化废为宝"), cssBg: getCardCssBg("power"),
        stats: { normal: { winRate: 62.5 }, upgraded: { winRate: 67.8 } },
        synergies: [
            { cardId: "defect_brace", winRate: 85, note: "2伤口→2随机充能球+13格挡" },
            { cardId: "defect_corrupt_attack", winRate: 83, note: "黏液→随机充能球+12伤" },
            { cardId: "defect_core_accel", winRate: 80, note: "虚空→随机充能球+2能量" },
            { cardId: "defect_overclock", winRate: 78, note: "灼伤→随机充能球+抽牌" },
            { cardId: "defect_quick_escape", winRate: 75, note: "晕眩→随机充能球+6格挡" },
            { cardId: "defect_smokestack", winRate: 74, note: "烟囱AOE+化废为宝充能球" },
            { cardId: "defect_iterate", winRate: 72, note: "迭代+化废为宝+烟囱三重收益" },
            { cardId: "defect_flak_cannon", winRate: 70, note: "状态牌三用途" }
        ]
    },
    {
        id: "defect_machine_learning", name: "机器学习", class: "defect", rarity: "rare", cost: 1, type: "power",
        description: "在你的回合开始时，额外抽1张牌。", image: getCardImage("机器学习"), cssBg: getCardCssBg("power"),
        stats: { normal: { winRate: 68.5 }, upgraded: { winRate: 73.2 } },
        synergies: [
            { cardId: "defect_defragment", winRate: 78, note: "过牌找集中" },
            { cardId: "defect_capacitor", winRate: 76, note: "过牌找栏位" },
            { cardId: "defect_claw", winRate: 75, note: "过牌找更多爪击" },
            { cardId: "defect_all_for_one", winRate: 74, note: "过牌找万物一心" },
            { cardId: "defect_echo_form", winRate: 73, note: "双倍机器学习=+2抽牌" },
            { cardId: "defect_signal_boost", winRate: 72, note: "双倍机器学习" },
            { cardId: "defect_creative_ai", winRate: 70, note: "AI生成+机器学习过牌" },
            { cardId: "defect_storm", winRate: 68, note: "打出机器学习→闪电球+过牌" }
        ]
    },
    {
        id: "defect_coolant", name: "冷却剂", class: "defect", rarity: "rare", cost: 1, type: "power",
        description: "回合开始每有一种不同充能球获得2点格挡。", image: getCardImage("冷却剂"), cssBg: getCardCssBg("power"),
        stats: { normal: { winRate: 65.2 }, upgraded: { winRate: 70.8 } },
        synergies: [
            { cardId: "defect_rainbow", winRate: 82, note: "3种球→冷却剂+6/9格挡/回合" },
            { cardId: "defect_chaos", winRate: 78, note: "随机球增加种类" },
            { cardId: "defect_compile_driver", winRate: 76, note: "球种类越多抽牌越多+格挡" },
            { cardId: "defect_fusion", winRate: 74, note: "等离子解锁第4种→+8/12格挡" },
            { cardId: "defect_capacitor", winRate: 72, note: "栏位存放多种球" },
            { cardId: "defect_glacier", winRate: 70, note: "冰霜球+冷却剂双重防御" },
            { cardId: "defect_defragment", winRate: 68, note: "集中加成充能球+冷却剂格挡" }
        ]
    },
    {
        id: "defect_defragment", name: "碎片整理", class: "defect", rarity: "rare", cost: 1, type: "power",
        description: "获得1点集中。", image: getCardImage("碎片整理"), cssBg: getCardCssBg("power"),
        stats: { normal: { winRate: 72.5 }, upgraded: { winRate: 78.2 } },
        synergies: [
            { cardId: "defect_glacier", winRate: 88, note: "集中加成冰霜球每球+1格挡" },
            { cardId: "defect_capacitor", winRate: 86, note: "栏位+集中=黄金组合" },
            { cardId: "defect_ball_lightning", winRate: 83, note: "集中加成闪电球伤害" },
            { cardId: "defect_cold_snap", winRate: 80, note: "集中加成冰霜球+攻击" },
            { cardId: "defect_darkness", winRate: 78, note: "集中加速黑暗球积累" },
            { cardId: "defect_tempest", winRate: 76, note: "集中加成生成的闪电球" },
            { cardId: "defect_echo_form", winRate: 90, note: "双倍碎片=+2/+4集中" },
            { cardId: "defect_signal_boost", winRate: 88, note: "双倍碎片=+2/+4集中" },
            { cardId: "defect_coolant", winRate: 74, note: "集中+冷却剂双重防御" }
        ]
    },
    {
        id: "defect_spin_craft", name: "旋转工艺", class: "defect", rarity: "rare", cost: 1, type: "power",
        description: "在你的回合开始时，生成1个玻璃充能球。", image: getCardImage("旋转工艺"), cssBg: getCardCssBg("power"),
        stats: { normal: { winRate: 65.8 }, upgraded: { winRate: 70.5 } },
        synergies: [
            { cardId: "defect_refract", winRate: 82, note: "折射生成2玻璃球+旋转持续生成" },
            { cardId: "defect_glass_craft", winRate: 78, note: "双重玻璃球来源" },
            { cardId: "defect_shatter", winRate: 76, note: "激发玻璃球=AOE爆发" },
            { cardId: "defect_defragment", winRate: 75, note: "集中双倍加成玻璃球" },
            { cardId: "defect_capacitor", winRate: 72, note: "栏位存放玻璃球" },
            { cardId: "defect_consuming_shadow", winRate: 70, note: "快速消耗玻璃球" },
            { cardId: "defect_barrage", winRate: 68, note: "球数→弹幕伤害" }
        ]
    },
    {
        id: "defect_buffer", name: "缓冲", class: "defect", rarity: "rare", cost: 2, type: "power",
        description: "阻止下1次你受到的生命值损伤。", image: getCardImage("缓冲"), cssBg: getCardCssBg("power"),
        stats: { normal: { winRate: 68.5 }, upgraded: { winRate: 73.2 } },
        synergies: [
            { cardId: "defect_echo_form", winRate: 82, note: "双倍缓冲=2/4次免伤" },
            { cardId: "defect_signal_boost", winRate: 80, note: "双倍缓冲=2/4次免伤" },
            { cardId: "defect_defragment", winRate: 78, note: "缓冲争取回合叠集中" },
            { cardId: "defect_biased_cognition", winRate: 76, note: "缓冲保护集中衰减期" },
            { cardId: "defect_capacitor", winRate: 72, note: "缓冲保护栏位成型期" },
            { cardId: "defect_creative_ai", winRate: 70, note: "缓冲保护3费打出" }
        ]
    },
    {
        id: "defect_consuming_shadow", name: "吞噬暗影", class: "defect", rarity: "rare", cost: 2, type: "power",
        description: "生成2个黑暗充能球。回合结束时激发最左侧充能球。", image: getCardImage("吞噬暗影"), cssBg: getCardCssBg("power"),
        stats: { normal: { winRate: 62.5 }, upgraded: { winRate: 67.8 } },
        synergies: [
            { cardId: "defect_darkness", winRate: 62, note: "注意：激发最左侧可能过早激发黑暗球" },
            { cardId: "defect_glass_craft", winRate: 72, note: "玻璃球放最左侧早激发正收益" },
            { cardId: "defect_refract", winRate: 70, note: "玻璃球不怕早激发" },
            { cardId: "defect_capacitor", winRate: 68, note: "栏位≥5时消耗得起" },
            { cardId: "defect_spin_craft", winRate: 66, note: "持续生成玻璃球补充" },
            { cardId: "defect_shatter", winRate: 68, note: "打碎激发所有球+吞噬激发左侧" }
        ]
    },
    {
        id: "defect_creative_ai", name: "创造性AI", class: "defect", rarity: "rare", cost: 3, type: "power",
        description: "在你的回合开始时，将一张随机能力牌加入手牌。", image: getCardImage("创造性AI"), cssBg: getCardCssBg("power"),
        stats: { normal: { winRate: 65.2 }, upgraded: { winRate: 70.8 } },
        synergies: [
            { cardId: "defect_storm", winRate: 82, note: "每回合能力牌→每回合闪电球" },
            { cardId: "defect_iterate", winRate: 80, note: "每回合打出能力触发抽牌" },
            { cardId: "defect_subroutine", winRate: 78, note: "每回合打出能力返还1能量" },
            { cardId: "defect_defragment", winRate: 76, note: "可能随机到集中" },
            { cardId: "defect_capacitor", winRate: 75, note: "可能随机到栏位" },
            { cardId: "defect_synthesis", winRate: 74, note: "减费3费→0费打出" },
            { cardId: "defect_signal_boost", winRate: 73, note: "双倍创造性AI" },
            { cardId: "defect_echo_form", winRate: 72, note: "双倍创造性AI" }
        ]
    },
    {
        id: "defect_echo_form", name: "回响形态", class: "defect", rarity: "rare", cost: 3, type: "power",
        description: "虚无。你每回合打出的第一张牌会被打出两次。", image: getCardImage("回响形态"), cssBg: getCardCssBg("power"),
        stats: { normal: { winRate: 75.2 }, upgraded: { winRate: 82.5 } },
        synergies: [
            { cardId: "defect_defragment", winRate: 92, note: "双倍碎片=+2/+4集中" },
            { cardId: "defect_glacier", winRate: 90, note: "双倍冰川=12格挡+4冰霜球" },
            { cardId: "defect_capacitor", winRate: 88, note: "双倍扩容=+4/+6栏位" },
            { cardId: "defect_biased_cognition", winRate: 86, note: "双倍偏差=+8集中" },
            { cardId: "defect_signal_boost", winRate: 85, note: "双倍信号=下一张能力4倍" },
            { cardId: "defect_darkness", winRate: 83, note: "双倍漆黑=2黑暗球+触发4次被动" },
            { cardId: "defect_buffer", winRate: 82, note: "双倍缓冲=2/4次免伤" },
            { cardId: "defect_genetic_algorithm", winRate: 78, note: "双倍打出=双倍成长" }
        ]
    },
    {
        id: "defect_biased_cognition", name: "偏差认知", class: "defect", rarity: "ancient", cost: 1, type: "power",
        description: "获得4点集中。在你的回合开始时，失去1点集中。", image: getCardImage("偏差认知"), cssBg: getCardCssBg("power"),
        stats: { normal: { winRate: 72.5 }, upgraded: { winRate: 78.2 } },
        synergies: [
            { cardId: "defect_echo_form", winRate: 90, note: "双倍偏差=+8/+10集中，短线无敌" },
            { cardId: "defect_signal_boost", winRate: 88, note: "双倍偏差=+8集中" },
            { cardId: "defect_defragment", winRate: 80, note: "永久集中补充衰减" },
            { cardId: "defect_glacier", winRate: 78, note: "短线集中转防御" },
            { cardId: "defect_ball_lightning", winRate: 76, note: "短线集中转输出" },
            { cardId: "defect_hotfix", winRate: 73, note: "临时+2集中叠加" },
            { cardId: "defect_buffer", winRate: 68, note: "保护集中衰减期" }
        ]
    }
];

function getCardById(id) {
    return cardsDatabase.find(card => card.id === id);
}

console.log('🔵 故障机器人卡牌数据已加载');
console.log('📊 总计 ' + cardsDatabase.length + ' 张卡牌');
console.log('🖼️ 卡牌图片: ' + Object.keys(knownImages).length + ' 张');
console.log('📖 协同关系: 基于80张卡牌互相分析 + Boss机制 + 数学建模');