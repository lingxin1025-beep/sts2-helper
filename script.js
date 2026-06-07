// ===== 杀戮尖塔2 鸡煲卡牌搭配助手 v5.9 =====
let selected = [];
let rarityF = 'all', typeF = 'all';

const $pool = document.getElementById('cardPool');
const $hand = document.getElementById('selectedCards');
const $rec = document.getElementById('recommendResult');
const $search = document.getElementById('searchInput');
const $clear = document.getElementById('clearBtn');
const $resetBtn = document.getElementById('resetBtn');
const $selCount = document.getElementById('selectedCount');
const $recCount = document.getElementById('recCount');

var previewTimer = null;

function getTypeEmoji(t) { var m = { attack: '⚔️', skill: '🛡️', power: '⚡' }; return m[t] || '❓'; }
function getTypeColor(t) { var m = { attack: '#e74c3c', skill: '#3498db', power: '#f1c40f' }; return m[t] || '#888'; }
function getCardById(id) { for (var i = 0; i < cardsDatabase.length; i++) { if (cardsDatabase[i].id === id) return cardsDatabase[i]; } return null; }

var toastTimer;
function toast(msg) {
    var t = document.getElementById('toast');
    if (!t) { t = document.createElement('div'); t.id = 'toast'; t.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#333;color:#fff;padding:10px 24px;border-radius:8px;font-size:0.9em;z-index:999;opacity:1;transition:opacity 0.3s;pointer-events:none;'; document.body.appendChild(t); }
    t.textContent = msg; t.style.opacity = '1'; clearTimeout(toastTimer);
    toastTimer = setTimeout(function(){ t.style.opacity = '0'; }, 2000);
}

function getCardCounts() { var counts = {}; for (var i = 0; i < selected.length; i++) { var id = selected[i]; counts[id] = (counts[id] || 0) + 1; } return counts; }

// ===== 悬停预览 =====
var previewEl = null;
function getPreviewEl() { if (!previewEl) { previewEl = document.createElement('div'); previewEl.className = 'card-preview'; document.body.appendChild(previewEl); } return previewEl; }
function showPreview(e, cardData) {
    clearTimeout(previewTimer);
    previewTimer = setTimeout(function() {
        var p = getPreviewEl();
        if (cardData.image) { var img = document.createElement('img'); img.src = cardData.image; img.alt = cardData.name; p.innerHTML = ''; p.appendChild(img); }
        else { p.innerHTML = ''; var emojiDiv = document.createElement('div'); emojiDiv.className = 'preview-emoji'; emojiDiv.style.background = cardData.cssBg || '#2a2a2a'; emojiDiv.textContent = getTypeEmoji(cardData.type); p.appendChild(emojiDiv); }
        p.style.display = 'block'; movePreview(e);
    }, 600);
}
function movePreview(e) { if (!previewEl) return; var x = e.clientX + 20; var y = e.clientY - 160; if (x + 350 > window.innerWidth) x = e.clientX - 350; if (y < 0) y = 10; if (y + 460 > window.innerHeight) y = window.innerHeight - 460; previewEl.style.left = x + 'px'; previewEl.style.top = y + 'px'; }
function hidePreview() { clearTimeout(previewTimer); if (previewEl) previewEl.style.display = 'none'; }

function renderPool() {
    $pool.innerHTML = ''; var ft = $search.value.toLowerCase(); var counts = getCardCounts();
    var cards = cardsDatabase.filter(function(c) { if (rarityF !== 'all' && c.rarity !== rarityF) return false; if (typeF !== 'all' && c.type !== typeF) return false; if (ft && c.name.indexOf(ft) === -1) return false; return true; });
    for (var i = 0; i < cards.length; i++) {
        var c = cards[i]; var count = counts[c.id] || 0; var div = document.createElement('div'); div.className = 'mini-card';
        if (c.image) { var imgEl = document.createElement('img'); imgEl.src = c.image; imgEl.alt = c.name; div.appendChild(imgEl); }
        else { var emojiDiv = document.createElement('div'); emojiDiv.className = 'card-emoji'; emojiDiv.style.background = c.cssBg || '#2a2a2a'; emojiDiv.textContent = getTypeEmoji(c.type); div.appendChild(emojiDiv); }
        if (count > 0) { var badge = document.createElement('div'); badge.className = 'card-count-badge show'; badge.textContent = '×' + count; div.appendChild(badge); }
        (function(cardId, cardData) { div.addEventListener('click', function() { add(cardId); }); div.addEventListener('mouseenter', function(e) { showPreview(e, cardData); }); div.addEventListener('mousemove', function(e) { movePreview(e); }); div.addEventListener('mouseleave', hidePreview); })(c.id, c);
        $pool.appendChild(div);
    }
}

function add(id) { if (selected.length >= 40) { toast('牌库最多40张'); return; } selected.push(id); renderAll(); }
function removeOne(id) { var idx = selected.lastIndexOf(id); if (idx !== -1) { selected.splice(idx, 1); } renderAll(); }
function removeAll(id) { selected = selected.filter(function(i) { return i !== id; }); renderAll(); }

function renderHand() {
    $hand.innerHTML = ''; $selCount.textContent = selected.length;
    if (selected.length === 0) { $hand.innerHTML = '<div class="hand-empty">初始牌库已加载，点击左侧卡牌继续添加</div>'; return; }
    var counts = getCardCounts(); var rendered = {};
    for (var i = 0; i < selected.length; i++) {
        var id = selected[i]; if (rendered[id]) continue; rendered[id] = true;
        var c = getCardById(id); if (!c) continue; var count = counts[id];
        var div = document.createElement('div'); div.className = 'hand-card';
        var imgWrap = document.createElement('div'); imgWrap.className = 'hand-card-img-wrap';
        if (c.image) { var imgEl = document.createElement('img'); imgEl.src = c.image; imgEl.alt = c.name; imgWrap.appendChild(imgEl); }
        else { var emojiDiv = document.createElement('div'); emojiDiv.className = 'card-emoji'; emojiDiv.style.background = c.cssBg || '#2a2a2a'; emojiDiv.textContent = getTypeEmoji(c.type); imgWrap.appendChild(emojiDiv); }
        div.appendChild(imgWrap);
        var bottom = document.createElement('div'); bottom.className = 'hand-card-bottom';
        var minusBtn = document.createElement('button'); minusBtn.className = 'hand-card-btn remove'; minusBtn.textContent = '−'; minusBtn.title = '移除1张';
        var countEl = document.createElement('span'); countEl.className = 'hand-card-count'; countEl.textContent = count;
        var plusBtn = document.createElement('button'); plusBtn.className = 'hand-card-btn'; plusBtn.textContent = '+'; plusBtn.title = '添加1张';
        var delBtn = document.createElement('button'); delBtn.className = 'hand-card-btn remove'; delBtn.textContent = '✕'; delBtn.title = '全部移除';
        (function(cardId) { minusBtn.addEventListener('click', function(e) { e.stopPropagation(); removeOne(cardId); }); plusBtn.addEventListener('click', function(e) { e.stopPropagation(); add(cardId); }); delBtn.addEventListener('click', function(e) { e.stopPropagation(); removeAll(cardId); }); })(id);
        bottom.appendChild(minusBtn); bottom.appendChild(countEl); bottom.appendChild(plusBtn); bottom.appendChild(delBtn);
        div.appendChild(bottom);
        (function(cardData) { div.addEventListener('mouseenter', function(e) { showPreview(e, cardData); }); div.addEventListener('mousemove', function(e) { movePreview(e); }); div.addEventListener('mouseleave', hidePreview); })(c);
        $hand.appendChild(div);
    }
}

function analyzeDuplicates(counts) {
    var totalPenalty = 0, totalBonus = 0;
    for (var id in counts) { var count = counts[id]; var c = getCardById(id); if (!c || count === 1) continue;
        if (c.rarity === 'basic' && count > 1) totalPenalty += (count - 1) * 3;
        if (c.id === 'defect_claw' && count >= 2) totalBonus += count * 4;
        if (c.cost === 0 && c.type === 'attack' && c.id !== 'defect_claw' && count >= 2 && count <= 4) totalBonus += count * 1.5;
        if (c.cost >= 3 && count >= 2) totalPenalty += (count - 1) * 4;
        if (c.type === 'power' && c.id !== 'defect_defragment' && c.id !== 'defect_capacitor' && count >= 2) totalPenalty += (count - 1) * 3;
        if ((c.id === 'defect_defragment' || c.id === 'defect_capacitor') && count >= 2) totalBonus += count * 3;
        if (count >= 5) totalPenalty += (count - 4) * 2;
    }
    return { penalty: Math.round(totalPenalty), bonus: Math.round(totalBonus) };
}

function analyzeHand() {
    if (selected.length === 0) return null;
    var counts = getCardCounts(); var uniqueCards = Object.keys(counts).length; var deckSize = selected.length;
    var totalCost = 0, drawCards = 0, totalDraw = 0, energyGen = 0, totalDamage = 0, totalBlock = 0;
    var zeroCostAtk = 0, powerCount = 0, keyCards = 0;
    var typeCount = { attack: 0, skill: 0, power: 0 };
    var hasAllForOne = false, hasClaw = false, hasScrape = false, hasEcho = false, hasDefrag = false, hasCapacitor = false;
    var hasDarkness = false, hasMulticast = false;
    var clawCount = 0, basicCount = 0, highCostCount = 0, frostOrbs = 0;
    var highCostCards = 0, veryHighCostCards = 0, blockCards = 0, attackCards = 0;
    var orbSources = 0, lightningSources = 0, darkSources = 0, statusSources = 0, consumeSources = 0;
    var thunderCount = 0, teslaCount = 0, barrageCount = 0, compactCount = 0, wasteToWealthCount = 0;

    for (var id in counts) { var c = getCardById(id); if (!c) continue; var count = counts[id];
        totalCost += c.cost * count; typeCount[c.type] = (typeCount[c.type] || 0) + count;
        if (c.cost === 0 && c.type === 'attack') zeroCostAtk += count;
        if (c.type === 'power') powerCount += count;
        if (c.cost >= 2) highCostCards += count;
        if (c.cost >= 3) { highCostCount += count; veryHighCostCards += count; }
        if (c.rarity === 'basic') basicCount += count;
        if (c.type === 'skill' && (c.description || '').indexOf('格挡') !== -1) blockCards += count;
        if (c.type === 'attack') attackCards += count;
        var desc = c.description || '';
        if (desc.indexOf('抽') !== -1 || c.id === 'defect_hologram' || c.id === 'defect_all_for_one') {
            drawCards += count; var dpc = 1;
            if (c.id === 'defect_scrape') { dpc = 4 + (hasClaw && hasAllForOne ? 1 : 0) + (statusSources >= 3 ? 1 : 0); }
            else if (c.id === 'defect_hologram') { dpc = 3; }
            else if (c.id === 'defect_all_for_one') { dpc = hasClaw ? Math.min(8, zeroCostAtk * 1.5) : 2; }
            else if (c.id === 'defect_reboot') { dpc = desc.indexOf('抽6张') !== -1 ? 6 : 4; dpc += Math.floor(deckSize * 0.15); }
            else if (c.id === 'defect_skimming') { dpc = desc.indexOf('抽4张') !== -1 ? 4 : 3; }
            else if (c.id === 'defect_overclock') { dpc = desc.indexOf('抽3张') !== -1 ? 3 : 2; }
            else if (c.id === 'defect_coolheaded') { dpc = desc.indexOf('抽2张') !== -1 ? 2 : 1; }
            else if (c.id === 'defect_compile_driver') { dpc = Math.min(4, orbSources > 0 ? Math.ceil(orbSources / uniqueCards * 3) : 1); }
            else if (c.id === 'defect_machine_learning') { dpc = 3; }
            else if (desc.indexOf('抽2张') !== -1) dpc = 2; else if (desc.indexOf('抽3张') !== -1) dpc = 3;
            else if (desc.indexOf('抽4张') !== -1) dpc = 4; else if (desc.indexOf('抽5张') !== -1) dpc = 5; else if (desc.indexOf('抽6张') !== -1) dpc = 6;
            if (c.id === 'defect_compact' && statusSources >= 4) dpc += statusSources;
            else if (c.id === 'defect_compact' && statusSources >= 2) dpc += statusSources;
            totalDraw += dpc * count;
        }
        if (desc.indexOf('获得') !== -1 && desc.indexOf('费') !== -1) { if (desc.indexOf('2费') !== -1) energyGen += 2 * count; else if (desc.indexOf('3费') !== -1) energyGen += 3 * count; else if (desc.indexOf('4费') !== -1) energyGen += 4 * count; else if (desc.indexOf('6费') !== -1) energyGen += 6 * count; else energyGen += 1 * count; }
        if (desc.indexOf('能量翻倍') !== -1) energyGen += 3 * count;
        if ((c.id === 'defect_fusion' || c.id === 'defect_meteor_strike') && desc.indexOf('等离子') !== -1) energyGen += 1 * count;
        if (c.type === 'attack') { var dmgMatch = desc.match(/(\d+)点伤害/g); if (dmgMatch) { for (var d = 0; d < dmgMatch.length; d++) { var num = parseInt(dmgMatch[d]); if (!isNaN(num)) totalDamage += num * count; } } if (c.id === 'defect_barrage') totalDamage += 15 * count; if (c.id === 'defect_spiral_drill') totalDamage += 15 * count; }
        if (desc.indexOf('格挡') !== -1) { var blkMatch = desc.match(/(\d+)点格挡/g); if (blkMatch) { for (var b = 0; b < blkMatch.length; b++) { var bnum = parseInt(blkMatch[b]); if (!isNaN(bnum)) totalBlock += bnum * count; } } }
        if (desc.indexOf('冰霜') !== -1) { if (c.name === '冰川') frostOrbs += 2 * count; else if (c.name === '冰之长枪') frostOrbs += 3 * count; else frostOrbs += 1 * count; }
        if (desc.indexOf('生成') !== -1 && desc.indexOf('充能球') !== -1) orbSources += count;
        if (desc.indexOf('闪电') !== -1 && desc.indexOf('生成') !== -1) lightningSources += count;
        if (desc.indexOf('黑暗') !== -1 && desc.indexOf('生成') !== -1) darkSources += count;
        if (desc.indexOf('激发') !== -1) consumeSources += count;
        if (desc.indexOf('状态') !== -1 || desc.indexOf('黏液') !== -1 || desc.indexOf('伤口') !== -1 || desc.indexOf('虚空') !== -1 || desc.indexOf('灼伤') !== -1 || desc.indexOf('晕眩') !== -1) statusSources += count;
        if (c.id === 'defect_thunder') thunderCount += count;
        if (c.id === 'defect_tesla_coil') teslaCount += count;
        if (c.id === 'defect_barrage') barrageCount += count;
        if (c.id === 'defect_compact') compactCount += count;
        if (c.id === 'defect_waste_to_wealth') wasteToWealthCount += count;
        if (c.id === 'defect_all_for_one') hasAllForOne = true;
        if (c.id === 'defect_claw') { hasClaw = true; clawCount += count; }
        if (c.id === 'defect_scrape') hasScrape = true;
        if (c.id === 'defect_echo_form') hasEcho = true;
        if (c.id === 'defect_defragment') hasDefrag = true;
        if (c.id === 'defect_capacitor') hasCapacitor = true;
        if (c.id === 'defect_darkness') hasDarkness = true;
        if (c.id === 'defect_multicast') hasMulticast = true;
        if (c.rarity === 'rare' || c.rarity === 'ancient') keyCards += count;
    }

    var isClawDeck = hasAllForOne && hasClaw && clawCount >= 2;
    var isFrostDeck = (counts['defect_defragment'] || 0) >= 1 && (counts['defect_glacier'] || 0) >= 1;
    var isLightningDeck = (counts['defect_tempest'] || 0) >= 1 && (counts['defect_ball_lightning'] || 0) >= 2;
    var isDarkDeck = (counts['defect_darkness'] || 0) >= 1 && (counts['defect_multicast'] || 0) >= 1;
    var isStatusDeck = (counts['defect_compact'] || 0) + (counts['defect_flak_cannon'] || 0) + (counts['defect_smokestack'] || 0) >= 1;
    var isPowerDeck = (counts['defect_creative_ai'] || 0) + (counts['defect_storm'] || 0) >= 1 && powerCount >= 5;
    var isEnergyDeck = (counts['defect_core_accel'] || 0) >= 1 && ((counts['defect_spiral_drill'] || 0) + (counts['defect_tempest'] || 0) >= 1);

    var avgCost = deckSize > 0 ? totalCost / deckSize : 0;
    var drawDensity = deckSize > 0 ? (drawCards / deckSize * 100) : 0;
    var cardsPlayedPerTurn = avgCost > 0 ? Math.min(5, Math.floor(3 / avgCost) + 1) : 5;
    var avgBlockPerTurn = (totalBlock / Math.max(1, deckSize)) * cardsPlayedPerTurn;
    var basicPenalty = 0;
    if (basicCount > 3) basicPenalty += (basicCount - 3) * 5;
    if (basicCount > 7) basicPenalty += (basicCount - 7) * 8;
    var dupAnalysis = analyzeDuplicates(counts);

    var drawScore = Math.min(100, drawDensity * 2.5);
    if (compactCount >= 1 && statusSources >= 4) drawScore = Math.min(100, drawScore * 1.4); else if (compactCount >= 1 && statusSources >= 2) drawScore = Math.min(100, drawScore * 1.2);
    if (deckSize > 20 && drawDensity < 18) drawScore *= 0.7; if (deckSize > 30 && drawDensity < 22) drawScore *= 0.5; if (deckSize > 35 && drawDensity < 28) drawScore *= 0.35;
    var curveScore = 100;
    if (avgCost > 2.5) curveScore = 35; else if (avgCost > 2.0) curveScore = 60; else if (avgCost > 1.5) curveScore = 85; else if (avgCost < 0.8) curveScore = 65;
    if (energyGen > deckSize * 0.1 && avgCost > 1.8) curveScore += 12; if (highCostCount > deckSize * 0.2) curveScore -= 15;
    if (compactCount >= 1 && statusSources >= 3) curveScore = Math.min(100, curveScore + 10);
    if (wasteToWealthCount >= 1 && statusSources >= 3) curveScore = Math.min(100, curveScore + 5);

    var atkPerTurn = Math.max(1, Math.min(5, Math.floor(3 / Math.max(0.5, avgCost)) + 1));
    var atkRatio = deckSize > 0 ? attackCards / deckSize : 0;
    var baseDmgPerTurn = atkPerTurn * atkRatio * (totalDamage / Math.max(1, attackCards));
    var drawBonus = Math.min(0.30, drawDensity / 100 * 0.6);
    var energyBonus = 0; if (avgCost < 1.2) energyBonus = 0.25; else if (avgCost < 1.6) energyBonus = 0.15; else if (avgCost < 2.0) energyBonus = 0.05; if (energyGen >= 4) energyBonus += 0.10;
    var systemBonus = 0;

    // ===== 闪电流 =====
    var hasEnergySupport = (counts['defect_core_accel'] || 0) + (counts['defect_double_energy'] || 0) + (counts['defect_supercritical'] || 0) + (counts['defect_energy_surge'] || 0) >= 1;
    var hasStrongEnergy = (counts['defect_core_accel'] || 0) + (counts['defect_double_energy'] || 0) + (counts['defect_supercritical'] || 0) >= 2;
    var hasThunder = thunderCount >= 1;
    var hasTesla = teslaCount >= 1;
    var hasVoltaic = (counts['defect_voltaic'] || 0) >= 1;
    var hasBallLightning = (counts['defect_ball_lightning'] || 0) >= 2;
    var hasLightningRod = (counts['defect_lightning_rod'] || 0) >= 1;
    var hasHologram = (counts['defect_hologram'] || 0) >= 1;
    var hasTempest = (counts['defect_tempest'] || 0) >= 1;
    var lightningMultiplier = 1.0;
    if (hasTempest && lightningSources >= 3) {
        lightningMultiplier = 1.3;
        if (hasEnergySupport) { lightningMultiplier *= 1.8; if (hasStrongEnergy) lightningMultiplier *= 1.2; }
        if (hasThunder) { lightningMultiplier *= (1.4 + thunderCount * 0.2); }
        if (hasTesla) { lightningMultiplier *= 1.3; }
        if (hasVoltaic) { lightningMultiplier *= hasEnergySupport ? 2.5 : 1.5; }
        if (hasHologram) { lightningMultiplier *= 1.25; }
        if (hasBallLightning) { lightningMultiplier *= 1.15; }
        if (hasLightningRod) { lightningMultiplier *= 1.1; }
    }
    if (!hasTempest && hasBallLightning && hasTesla) { lightningMultiplier = Math.max(lightningMultiplier, 1.5); if (hasThunder) lightningMultiplier *= 1.3; }
    if (lightningMultiplier > 1.0) { systemBonus = Math.max(systemBonus, Math.min(1.5, lightningMultiplier - 1.0)); }

    // ===== 黑暗球体系 =====
    var hasDarkness2 = (counts['defect_darkness'] || 0) >= 1;
    var hasMultiDarkness = (counts['defect_darkness'] || 0) >= 2;
    var hasShadowShield = (counts['defect_shadow_shield'] || 0) >= 1;
    var hasNull = (counts['defect_null'] || 0) >= 1;
    var hasConsumingShadow = (counts['defect_consuming_shadow'] || 0) >= 1;
    var hasShatter = (counts['defect_shatter'] || 0) >= 1;
    var hasDualcast = (counts['defect_dualcast'] || 0) >= 1;
    var hasQuadRelease = (counts['defect_quad_release'] || 0) >= 1;
    var hasLoop = (counts['defect_loop'] || 0) >= 1;
    var hasSupercritical = (counts['defect_supercritical'] || 0) >= 1;
    var darkBonus = 0;
    if (hasDarkness2 && hasMulticast && darkSources >= 2) {
        darkBonus = 40;
        if (hasMultiDarkness) darkBonus += 25;
        if (hasConsumingShadow) darkBonus += 25;
        if (hasShatter) darkBonus += 35;
        if (hasQuadRelease) darkBonus += 40;
        if (hasShatter && hasQuadRelease) darkBonus += 20;
        if (hasLoop) darkBonus += 15;
        if (hasShadowShield) darkBonus += 10;
        if (hasNull) darkBonus += 8;
        if (hasDualcast) darkBonus += 12;
        if (hasSupercritical) darkBonus += 12;
        if (hasHologram) darkBonus += 10;
        if (darkSources >= 3) darkBonus += 15;
        if (darkSources >= 4) darkBonus += 15;
        if (darkSources >= 5) darkBonus += 10;
    }

    // ===== 状态流 =====
    if (isStatusDeck && statusSources >= 6 && compactCount >= 1) systemBonus = Math.max(systemBonus, 0.8);
    else if (isStatusDeck && statusSources >= 4) systemBonus = Math.max(systemBonus, 0.35);
    if ((counts['defect_flak_cannon'] || 0) >= 1 && statusSources >= 4) systemBonus = Math.max(systemBonus, 0.6);
    else if ((counts['defect_flak_cannon'] || 0) >= 1 && statusSources >= 2) systemBonus = Math.max(systemBonus, 0.25);
    if ((counts['defect_smokestack'] || 0) >= 1 && statusSources >= 3) systemBonus = Math.max(systemBonus, 0.20);
    if (wasteToWealthCount >= 1 && statusSources >= 3) systemBonus += 0.10;

    // ===== 能量流 =====
    var hasSpiralDrill = (counts['defect_spiral_drill'] || 0) >= 1;
    if (hasSpiralDrill && energyGen >= 4) systemBonus = Math.max(systemBonus, 0.8);
    else if (hasSpiralDrill && energyGen >= 2) systemBonus = Math.max(systemBonus, 0.35);

    // ===== 回响 =====
    if (hasEcho && hasDefrag && orbSources >= 4) systemBonus = Math.max(systemBonus, 0.6);

    // ===== 弹幕齐射 =====
    if (barrageCount >= 1 && orbSources >= 5) systemBonus = Math.max(systemBonus, 0.5);
    else if (barrageCount >= 1 && orbSources >= 3) systemBonus = Math.max(systemBonus, 0.2);

    // ===== 玻璃球体系 =====
    var hasRefract = (counts['defect_refract'] || 0) >= 1;
    var hasGlassCraft = (counts['defect_glass_craft'] || 0) >= 1;
    var hasSpinCraft = (counts['defect_spin_craft'] || 0) >= 1;
    var glassMultiplier = 1.0;
    if ((hasRefract || hasGlassCraft || hasSpinCraft) && orbSources >= 3) {
        glassMultiplier = 1.3;
        if (hasRefract) glassMultiplier *= 1.4;
        if (hasGlassCraft) glassMultiplier *= 1.2;
        if (hasSpinCraft) glassMultiplier *= 1.6;
        if (hasDefrag) glassMultiplier *= 1.5;
        if (hasShatter) glassMultiplier *= 1.4;
        if (hasConsumingShadow) glassMultiplier *= 1.3;
        if (hasCapacitor) glassMultiplier *= 1.2;
    }
    if (glassMultiplier > 1.0) { systemBonus = Math.max(systemBonus, Math.min(1.5, glassMultiplier - 1.0)); }

    // ===== 等离子能量体系 =====
    var hasFusion = (counts['defect_fusion'] || 0) >= 1;
    var hasMeteorStrike = (counts['defect_meteor_strike'] || 0) >= 1;
    var plasmaCount = (counts['defect_fusion'] || 0) + (counts['defect_meteor_strike'] || 0) * 3;
    var plasmaMultiplier = 1.0;
    if (plasmaCount >= 2) {
        plasmaMultiplier = 1.2 + plasmaCount * 0.05;
        if (hasFusion && hasMeteorStrike) plasmaMultiplier *= 1.4;
        if (hasDualcast) plasmaMultiplier *= 1.2;
        if (hasQuadRelease) plasmaMultiplier *= 1.5;
        if (hasMulticast) plasmaMultiplier *= 1.3;
        if (hasLoop) plasmaMultiplier *= 1.3;
        if (hasSupercritical) plasmaMultiplier *= 1.2;
        if (hasSpiralDrill) plasmaMultiplier *= 1.4;
        if (hasTempest) plasmaMultiplier *= 1.3;
    }
    if (plasmaMultiplier > 1.0) {
        curveScore = Math.min(100, Math.round(curveScore * Math.min(1.3, plasmaMultiplier)));
        systemBonus = Math.max(systemBonus, Math.min(1.2, plasmaMultiplier - 1.0));
    }

    if (isDarkDeck && hasMulticast && darkSources >= 3) { systemBonus += 0.15; }
    if (isDarkDeck && hasMulticast && darkSources >= 4) { systemBonus += 0.15; }
    var totalBonus = Math.min(1.0, drawBonus + energyBonus + systemBonus);
    var dmgScore = Math.min(100, Math.round(baseDmgPerTurn * 2.2 * (1 + totalBonus)));
    if (darkBonus > 0) { dmgScore = Math.min(100, dmgScore + darkBonus); }
    if (attackCards < 2 && systemBonus < 0.3) dmgScore = Math.min(dmgScore, 30);

    // ===== 冰霜防御体系 =====
    var hasGlacier = (counts['defect_glacier'] || 0) >= 1;
    var hasCoolheaded = (counts['defect_coolheaded'] || 0) >= 1;
    var hasColdSnap = (counts['defect_cold_snap'] || 0) >= 1;
    var hasIceLance = (counts['defect_ice_lance'] || 0) >= 1;
    var hasChill = (counts['defect_chill'] || 0) >= 1;
    var hasBlizzard = (counts['defect_blizzard'] || 0) >= 1;
    var hasHailstorm = (counts['defect_hailstorm'] || 0) >= 1;
    var hasCoolant = (counts['defect_coolant'] || 0) >= 1;

    var skillRatio = deckSize > 0 ? (typeCount.skill || 0) / deckSize : 0;
    var baseDefPerTurn = atkPerTurn * skillRatio * (totalBlock / Math.max(1, typeCount.skill || 1));
    var frostDefense = frostOrbs * (2 + (hasDefrag ? (hasEcho ? 3 : 1.5) : 0));
    var coolantBonus = (counts['defect_coolant'] || 0) >= 1 ? Math.min(orbSources, 4) * 2 : 0;
    var bufferBonus = 0; if ((counts['defect_buffer'] || 0) >= 1 && hasEcho) bufferBonus = 10; else if ((counts['defect_buffer'] || 0) >= 1) bufferBonus = 5;
    var geneticBonus = 0; if ((counts['defect_genetic_algorithm'] || 0) >= 1 && (counts['defect_hologram'] || 0) >= 1) geneticBonus = 8;

    var frostMultiplier = 1.0;
    if (isFrostDeck && hasDefrag && frostOrbs >= 3) {
        frostMultiplier = 1.5 + frostOrbs * 0.08;
        if (hasGlacier) frostMultiplier *= 1.35;
        if (hasCoolheaded) frostMultiplier *= 1.25;
        if (hasColdSnap) frostMultiplier *= 1.15;
        if (hasIceLance) frostMultiplier *= 1.3;
        if (hasChill) frostMultiplier *= 1.2;
        if (hasCoolant) frostMultiplier *= 1.3;
        if (hasBlizzard) frostMultiplier *= 1.15;
        if (hasHailstorm) frostMultiplier *= 1.2;
        if (hasCapacitor) frostMultiplier *= 1.4;
        if (hasEcho) frostMultiplier *= 1.5;
        if (hasLoop) frostMultiplier *= 1.2;
        if (hasHologram) frostMultiplier *= 1.15;
    }
    var defSystemBonus = 0;
    if (frostMultiplier > 1.0) { defSystemBonus = Math.max(defSystemBonus, Math.min(1.2, frostMultiplier - 1.0)); }

    var loopScore = 0;
    if (hasAllForOne && hasClaw && clawCount >= 3 && hasScrape && drawDensity >= 20 && defScore >= 30) loopScore = 99;
    else if (hasAllForOne && hasClaw && clawCount >= 3 && hasScrape && drawDensity >= 15) loopScore = 88;
    else if (hasAllForOne && hasClaw && clawCount >= 3 && drawDensity >= 15) loopScore = 85;
    else if (hasAllForOne && hasClaw && clawCount >= 3) loopScore = 72;
    else if (hasAllForOne && hasClaw && clawCount >= 2 && drawDensity >= 15) loopScore = 78;
    else if (hasAllForOne && hasClaw && clawCount >= 2) loopScore = 60;
    else if (hasAllForOne && hasClaw && drawDensity >= 10) loopScore = 55;
    else if (hasAllForOne && hasClaw) loopScore = 42;
    else if (hasAllForOne && zeroCostAtk >= 5 && drawDensity >= 12) loopScore = 65;
    else if (hasAllForOne && zeroCostAtk >= 5) loopScore = 48;
    else if (hasEcho && hasDefrag && hasCapacitor && orbSources >= 4 && drawDensity >= 15) loopScore = 92;
    else if (hasEcho && hasDefrag && hasCapacitor) loopScore = 78;
    else if (isStatusDeck && statusSources >= 5 && compactCount >= 1 && drawDensity >= 15) loopScore = 88;
    else if (isStatusDeck && statusSources >= 4) loopScore = 72;
    else if (isEnergyDeck && energyGen >= 5 && hasSpiralDrill && drawDensity >= 15) loopScore = 82;
    else if (isEnergyDeck && energyGen >= 5 && hasSpiralDrill) loopScore = 68;
    else if (hasDarkness2 && hasMulticast && darkSources >= 3 && drawDensity >= 10) loopScore = 78;
    else if (hasDarkness2 && hasMulticast) loopScore = 65;
    else if (hasVoltaic && lightningSources >= 5 && drawDensity >= 12) loopScore = 82;
    else if (hasVoltaic && lightningSources >= 5) loopScore = 65;
    else if (drawDensity > 35 && avgCost < 1.5) loopScore = 62;
    else loopScore = Math.min(45, drawScore * 0.5);

    var loopDefBonus = 0; if (loopScore >= 90) loopDefBonus = 0.6; else if (loopScore >= 80) loopDefBonus = 0.4; else if (loopScore >= 70) loopDefBonus = 0.2;
    var wasteToWealthDefBonus = 0; if (wasteToWealthCount >= 1 && statusSources >= 3) wasteToWealthDefBonus = 0.15;
    var totalDefBonus = Math.min(0.8, drawBonus + energyBonus + Math.max(defSystemBonus, loopDefBonus, 0) + wasteToWealthDefBonus);
    var defScore = Math.min(100, Math.round((baseDefPerTurn + frostDefense + coolantBonus + bufferBonus + geneticBonus) * 1.8 * (1 + totalDefBonus)));
    if (typeCount.skill < 2 && frostOrbs < 2 && bufferBonus === 0) defScore = Math.min(defScore, 40);

    // ===== 爪击流（移到defScore之后） =====
    if (hasClaw && hasAllForOne) {
        var clawBase = 0;
        if (clawCount >= 3 && hasScrape && drawDensity >= 20 && defScore >= 30) { clawBase = 0.9; }
        else if (clawCount >= 3 && hasScrape && drawDensity >= 15) { clawBase = 0.7; }
        else if (clawCount >= 2 && drawDensity >= 15) { clawBase = 0.5; }
        else if (clawCount >= 2) { clawBase = 0.3; }
        else { clawBase = 0.15; }
        if (defScore < 25) clawBase *= 0.5;
        systemBonus = Math.max(systemBonus, clawBase);
    }

    // ===== 协同覆盖率 =====
    var uniqueList = Object.keys(counts); var totalPairs = uniqueList.length * (uniqueList.length - 1) / 2; var synPairs = 0; var bestPair = null, bestRate = 0;
    for (var i = 0; i < uniqueList.length; i++) { for (var j = i + 1; j < uniqueList.length; j++) { var c1 = getCardById(uniqueList[i]); var c2 = getCardById(uniqueList[j]); if (!c1 || !c2) continue; var found = false;
        if (c1.synergies) { for (var k = 0; k < c1.synergies.length; k++) { if (c1.synergies[k].cardId === c2.id) { synPairs++; found = true; if (c1.synergies[k].winRate > bestRate) { bestRate = c1.synergies[k].winRate; bestPair = c1.name + ' + ' + c2.name; } break; } } }
        if (!found && c2.synergies) { for (var k = 0; k < c2.synergies.length; k++) { if (c2.synergies[k].cardId === c1.id) { synPairs++; if (c2.synergies[k].winRate > bestRate) { bestRate = c2.synergies[k].winRate; bestPair = c2.name + ' + ' + c1.name; } break; } } }
    } }
    var synCoverage = totalPairs > 0 ? (synPairs / totalPairs * 100) : 0;
    var deckSizePenalty = 0;
    if (deckSize > 18) deckSizePenalty += (deckSize - 18) * 0.5;
    if (deckSize > 28) deckSizePenalty += (deckSize - 28) * 0.7;
    if (deckSize > 35) deckSizePenalty += (deckSize - 35) * 1.2;
    var tooSmallPenalty = 0;
    if (deckSize < 8) tooSmallPenalty = (8 - deckSize) * 8;
    if (deckSize < 5) tooSmallPenalty = 50;

    var rawWinRate = (drawScore * 0.15 + curveScore * 0.12 + dmgScore * 0.18 + defScore * 0.18 + loopScore * 0.18 + synCoverage * 0.10) * 0.7 + 15;
    var finalWinRate = Math.max(0, Math.min(98, Math.round(rawWinRate - deckSizePenalty - basicPenalty - tooSmallPenalty - dupAnalysis.penalty + dupAnalysis.bonus)));

    var blockRatio = deckSize > 0 ? blockCards / deckSize : 0; var attackRatio = deckSize > 0 ? attackCards / deckSize : 0; var drawRatio = deckSize > 0 ? drawCards / deckSize : 0;
    var costBrick = 0, defBrick = 0, drawBrick = 0, atkBrick = 0;
    if (deckSize >= 7 && highCostCards >= 4) { costBrick = 1; for (var i = 0; i < 4; i++) { if (highCostCards - i <= 0) { costBrick = 0; break; } costBrick *= (highCostCards - i) / (deckSize - i); } costBrick = Math.round(costBrick * 100); }
    if (deckSize >= 7 && veryHighCostCards >= 2) { var cb2 = 1; for (var i = 0; i < 2; i++) { if (veryHighCostCards - i <= 0) { cb2 = 0; break; } cb2 *= (veryHighCostCards - i) / (deckSize - i); } costBrick = Math.max(costBrick, Math.round(cb2 * 100)); }
    if (blockRatio < 0.20 && deckSize >= 7) { var nonBlock = deckSize - blockCards; if (nonBlock >= 7) { defBrick = 1; for (var i = 0; i < 7; i++) { if (nonBlock - i <= 0) { defBrick = 0; break; } defBrick *= (nonBlock - i) / (deckSize - i); } defBrick = Math.round(defBrick * 100); } } else if (blockRatio < 0.10) defBrick = 60;
    if (drawRatio < 0.12 && deckSize > 15) { var nonDraw = deckSize - drawCards; if (nonDraw >= 5) { drawBrick = 1; for (var i = 0; i < 5; i++) { if (nonDraw - i <= 0) { drawBrick = 0; break; } drawBrick *= (nonDraw - i) / (deckSize - i); } drawBrick = Math.round(drawBrick * 100); } if (deckSize > 25) drawBrick = Math.min(80, drawBrick + 20); }
    if (attackRatio < 0.18 && deckSize >= 7) { var nonAtk = deckSize - attackCards; if (nonAtk >= 5) { atkBrick = 1; for (var i = 0; i < 5; i++) { if (nonAtk - i <= 0) { atkBrick = 0; break; } atkBrick *= (nonAtk - i) / (deckSize - i); } atkBrick = Math.round(atkBrick * 100 * 0.7); } }
    var brickProb = Math.max(costBrick, defBrick, drawBrick, atkBrick); var problemCount = (costBrick > 15 ? 1 : 0) + (defBrick > 15 ? 1 : 0) + (drawBrick > 15 ? 1 : 0) + (atkBrick > 15 ? 1 : 0);
    if (problemCount >= 3) brickProb = Math.min(95, brickProb + 20); else if (problemCount >= 2) brickProb = Math.min(95, brickProb + 10);
    var focus = hasDefrag ? (hasEcho ? 3 : 1.5) : 0; var frostPassive = Math.round(frostOrbs * (2 + focus));

    return { deckSize: deckSize, uniqueCards: uniqueCards, drawScore: Math.round(drawScore), curveScore: Math.round(curveScore), dmgScore: dmgScore, defScore: defScore, loopScore: loopScore, synCoverage: Math.round(synCoverage), finalWinRate: finalWinRate, brickProb: brickProb, bestPair: bestPair, bestRate: bestRate, avgCost: avgCost.toFixed(1), drawDensity: Math.round(drawDensity), drawCards: drawCards, totalDraw: totalDraw, zeroCostAtk: zeroCostAtk, hasAllForOne: hasAllForOne, hasClaw: hasClaw, clawCount: clawCount, typeCount: typeCount, deckSizePenalty: Math.round(deckSizePenalty), basicPenalty: Math.round(basicPenalty), dupAnalysis: dupAnalysis, energyGen: energyGen, basicCount: basicCount, highCostCount: highCostCount, avgBlockPerTurn: Math.round(avgBlockPerTurn), frostPassive: frostPassive, totalDamage: totalDamage, totalBlock: totalBlock, counts: counts, costBrick: costBrick, defBrick: defBrick, drawBrick: drawBrick, atkBrick: atkBrick, blockRatio: Math.round(blockRatio * 100), attackRatio: Math.round(attackRatio * 100), totalDmgBonus: Math.round(totalBonus * 100), totalDefBonus: Math.round(totalDefBonus * 100), isClawDeck: isClawDeck, isFrostDeck: isFrostDeck, isLightningDeck: isLightningDeck, isDarkDeck: isDarkDeck, isStatusDeck: isStatusDeck, isPowerDeck: isPowerDeck, isEnergyDeck: isEnergyDeck, orbSources: orbSources, lightningSources: lightningSources, darkSources: darkSources, statusSources: statusSources, consumeSources: consumeSources, powerCards: powerCount, nonZeroAtk: (typeCount.attack || 0) - zeroCostAtk };
}

function renderHandAnalysis() {
    var radarSection = document.getElementById('radarSection');
    var tipsSection = document.getElementById('tipsSection');
    var analysisPanel = document.getElementById('analysisPanel');
    if (selected.length === 0) { analysisPanel.style.display = 'none'; return; }
    var a = analyzeHand(); if (!a) { analysisPanel.style.display = 'none'; return; }
    analysisPanel.style.display = 'flex';
    var wrCls = a.finalWinRate >= 70 ? 'high' : a.finalWinRate >= 50 ? 'mid' : 'low';
    function bar(w, c) { return '<div class="radar-bar-outer"><div class="radar-bar-inner" style="width:' + Math.max(0, Math.min(100, w)) + '%;background:' + c + ';"></div></div>'; }
    function colorByScore(s) { if (s >= 70) return '#4caf50'; if (s >= 45) return '#ff9800'; return '#f44336'; }
    var dmgColor = colorByScore(a.dmgScore), defColor = colorByScore(a.defScore), drawColor = colorByScore(a.drawScore), curveColor = colorByScore(a.curveScore), loopColor = colorByScore(a.loopScore);
    var brickScore = Math.max(0, 100 - a.brickProb * 2), brickColor = colorByScore(brickScore);

   var survivalChecks = '';
   if (a.defScore < 20) {
    survivalChecks += '<span class="survival-badge danger">🔴 见不到Boss</span>';
   } else if (a.finalWinRate >= 80) {
    survivalChecks += '<span class="survival-badge safe">🟢 我无限了</span>';
   } else if (a.finalWinRate >= 60) {
    survivalChecks += '<span class="survival-badge safe">🟢 狠狠蠕动</span>';
   } else if (a.finalWinRate >= 35) {
    survivalChecks += '<span class="survival-badge warn">🟡 勉强蠕动</span>';
   } else if (a.finalWinRate >= 15) {
    survivalChecks += '<span class="survival-badge warn">🟡 汗流浃背</span>';
   } else {
    survivalChecks += '<span class="survival-badge danger">🔴 区完了</span>';
   }

    var tips = [];
    if (a.isClawDeck) { if (a.nonZeroAtk > 6) tips.push('⚠️ 非0费攻击偏多'); if (a.drawDensity < 20) tips.push('⚠️ 过牌不足'); if (a.deckSize > 25) tips.push('⚠️ 牌库偏大'); if (a.clawCount >= 3) tips.push('✅ 爪击密度优秀（' + a.clawCount + '张）'); }
    if (a.isFrostDeck) { if (a.orbSources < 4 && a.deckSize >= 12) tips.push('⚠️ 冰霜球来源不足'); if ((a.counts['defect_capacitor'] || 0) < 1 && a.deckSize >= 10) tips.push('💡 缺少扩容'); if (a.drawDensity < 15 && a.deckSize >= 15) tips.push('⚠️ 过牌偏少'); if (a.orbSources >= 6) tips.push('✅ 冰霜球来源充足'); }
    if (a.isLightningDeck) { if (a.lightningSources < 4 && a.deckSize >= 10) tips.push('⚠️ 闪电球来源不足'); if ((a.counts['defect_tesla_coil'] || 0) + (a.counts['defect_thunder'] || 0) === 0) tips.push('💡 缺少特斯拉线圈/雷霆'); if ((a.counts['defect_defragment'] || 0) < 1) tips.push('💡 集中可提升闪电球伤害'); }
    if (a.isDarkDeck) { if (a.darkSources < 3) tips.push('⚠️ 黑暗球来源不足'); if (a.consumeSources < 3) tips.push('⚠️ 需要激发手段'); if ((a.counts['defect_consuming_shadow'] || 0) > 0 && a.darkSources < 4) tips.push('⚠️ 吞噬暗影消耗快'); }
    if (a.isStatusDeck) { if (a.statusSources < 4) tips.push('⚠️ 状态来源不足'); if (a.basicCount > 6) tips.push('⚠️ 基础牌稀释状态引擎'); if ((a.counts['defect_compact'] || 0) === 0 && (a.counts['defect_flak_cannon'] || 0) === 0) tips.push('💡 需要压缩或散射炮'); if (a.statusSources >= 6 && (a.counts['defect_compact'] || 0) >= 1) tips.push('✅ 状态引擎运转良好'); }
    if (a.isPowerDeck) { if (a.powerCards < a.deckSize * 0.25 && a.deckSize >= 15) tips.push('⚠️ 能力占比偏低'); if (a.drawDensity < 18) tips.push('⚠️ 过牌不足'); if ((a.counts['defect_subroutine'] || 0) === 0) tips.push('💡 子程序可返还费用'); if (a.powerCards >= a.deckSize * 0.35) tips.push('✅ 能力密度优秀'); }
    if (a.isEnergyDeck) { if ((a.counts['defect_spiral_drill'] || 0) + (a.counts['defect_tempest'] || 0) === 0) tips.push('⚠️ 能量过剩无出口'); if (a.avgCost < 1.2) tips.push('✅ 能量生成充足'); }

    var hasBigSingle = false, hasAOE = false;
    for (var id in a.counts) { var cc = getCardById(id); if (!cc) continue;
        if ((cc.name === '分离' || cc.name === '超能光束' || cc.name === '陨石打击' || cc.name === '冰之长枪' || cc.name === '火箭飞拳') && a.counts[id] >= 1) hasBigSingle = true;
        if ((cc.name === '扫荡射线' || cc.name === '超能光束' || cc.name === '打碎' || cc.name === '冰雹风暴' || cc.name === '烟囱') && a.counts[id] >= 1) hasAOE = true;
    }
    if (a.isLightningDeck && (a.counts['defect_tesla_coil'] || 0) >= 1) hasAOE = true;
    if (a.loopScore >= 85) { hasBigSingle = true; hasAOE = true; }
    if (!hasBigSingle && !hasAOE && a.deckSize >= 12 && a.typeCount.attack >= 3) tips.push('⚠️ 缺少伤害终端');
    else { if (!hasBigSingle && a.deckSize >= 15 && a.typeCount.attack >= 4) tips.push('💡 缺少单体高伤'); if (!hasAOE && a.deckSize >= 12) tips.push('💡 缺少AOE清场'); }

    var themeCount = 0; if (a.isClawDeck) themeCount++; if (a.isFrostDeck) themeCount++; if (a.isLightningDeck) themeCount++; if (a.isDarkDeck) themeCount++; if (a.isStatusDeck) themeCount++; if (a.isPowerDeck) themeCount++; if (a.isEnergyDeck) themeCount++;
    if (themeCount >= 3 && a.deckSize >= 12 && !a.isClawDeck) tips.push('⚠️ 牌库主题混杂（' + themeCount + '种方向）');
    if (a.basicCount > a.deckSize * 0.4 && a.basicCount >= 8 && a.deckSize >= 10) tips.push('⚠️ 基础牌占比' + Math.round(a.basicCount / a.deckSize * 100) + '%过高');
    if (!a.isClawDeck && !a.isFrostDeck && !a.isLightningDeck && !a.isDarkDeck && !a.isStatusDeck && !a.isPowerDeck && !a.isEnergyDeck) { if (a.deckSize >= 12) { if (a.dmgScore < 35) tips.push('⚠️ 伤害偏低'); if (a.defScore < 35) tips.push('⚠️ 防御偏低'); if (a.drawScore < 35) tips.push('⚠️ 过牌偏低'); if (a.brickProb > 25) tips.push('⚠️ 鬼抽风险高'); } }
    if (a.deckSize >= 30 && a.drawDensity < 15 && !a.isClawDeck) tips.push('⚠️ 大牌库无过牌');
    if (a.totalDmgBonus >= 80) tips.push('🔥 伤害联动+' + a.totalDmgBonus + '%');
    if (a.totalDefBonus >= 60) tips.push('🛡️ 防御联动+' + a.totalDefBonus + '%');

    var jibaoScore = 0;
    if (a.isFrostDeck && a.orbSources >= 4 && a.defScore >= 60) jibaoScore += 1;
    if (a.isClawDeck && a.loopScore >= 80) jibaoScore += 1;
    if (a.isStatusDeck && a.statusSources >= 4 && a.loopScore >= 70) jibaoScore += 1;
    if ((a.counts['defect_voltaic'] || 0) >= 1 && a.lightningSources >= 4) jibaoScore += 1;
    if (a.isDarkDeck && a.darkSources >= 3 && a.loopScore >= 70) jibaoScore += 1;
    if (a.isEnergyDeck && a.energyGen >= 4 && a.loopScore >= 80) jibaoScore += 1;
    if ((a.counts['defect_echo_form'] || 0) >= 1 && (a.counts['defect_defragment'] || 0) >= 1 && (a.counts['defect_capacitor'] || 0) >= 1 && a.orbSources >= 4) jibaoScore += 1;
    var jibaoHTML = '';
    if (jibaoScore >= 1 && a.finalWinRate >= 70) {
        jibaoHTML = '<div style="text-align:center;padding:14px;margin-top:10px;background:linear-gradient(135deg, #4fc3f7 0%, #ffd54f 50%, #4fc3f7 100%);background-size:200% 200%;border-radius:10px;border:1px solid rgba(255,255,255,0.5);font-size:1.3em;font-weight:700;color:#1a1a1a;text-shadow: 0 0 2px #fff, 0 0 1px #fff;animation:pulse 1.5s infinite, shimmer 2s infinite;letter-spacing:2px;">⚡ 我已启动！⚡</div>';
    }

    radarSection.innerHTML =
        '<div class="deck-summary"><div class="big-rate ' + wrCls + '">' + a.finalWinRate + '%</div><div class="meta">预估胜率 · ' + a.deckSize + '张 · 均费' + a.avgCost + '</div></div>' +
        '<div class="radar-grid">' +
        '<div class="radar-item"><div class="radar-label">⚔️ 伤害</div>' + bar(a.dmgScore, dmgColor) + '<div class="radar-value" style="color:' + dmgColor + ';">' + Math.min(100, a.dmgScore + a.totalDmgBonus) + '</div></div>' +
        '<div class="radar-item"><div class="radar-label">🛡️ 防御</div>' + bar(a.defScore, defColor) + '<div class="radar-value" style="color:' + defColor + ';">' + Math.min(100, a.defScore + a.totalDefBonus) + '</div></div>' +
        '<div class="radar-item"><div class="radar-label">🎴 过牌</div>' + bar(a.drawScore, drawColor) + '<div class="radar-value" style="color:' + drawColor + ';">' + a.drawScore + '</div></div>' +
        '<div class="radar-item"><div class="radar-label">💎 费用</div>' + bar(a.curveScore, curveColor) + '<div class="radar-value" style="color:' + curveColor + ';">' + a.curveScore + '</div></div>' +
        '<div class="radar-item"><div class="radar-label">🔄 循环</div>' + bar(a.loopScore, loopColor) + '<div class="radar-value" style="color:' + loopColor + ';">' + a.loopScore + '</div></div>' +
        '<div class="radar-item"><div class="radar-label">🎯 稳定</div>' + bar(brickScore, brickColor) + '<div class="radar-value" style="color:' + brickColor + ';">' + brickScore + '</div></div>' +
        '</div>' +
        '<div class="survival-strip">' + survivalChecks + '</div>';

    tipsSection.innerHTML = (tips.length > 0 ? tips.join('<br>') : '') + jibaoHTML;
}

function calcRecs() {
    if (selected.length === 0 || selected.length >= 40) return [];
    var deckAnalysis = analyzeHand(); if (!deckAnalysis) return [];
    var counts = getCardCounts(); var uniqueList = Object.keys(counts); var recs = [];
    for (var i = 0; i < cardsDatabase.length; i++) { var cand = cardsDatabase[i]; if (cand.rarity === 'basic') continue;
        var totalSyn = 0, matchCount = 0;
        for (var j = 0; j < uniqueList.length; j++) { var sc = getCardById(uniqueList[j]); if (!sc) continue;
            if (sc.synergies) { for (var k = 0; k < sc.synergies.length; k++) { if (sc.synergies[k].cardId === cand.id) { totalSyn += sc.synergies[k].winRate; matchCount++; } } }
            if (cand.synergies) { for (var k = 0; k < cand.synergies.length; k++) { if (cand.synergies[k].cardId === sc.id) { totalSyn += cand.synergies[k].winRate; matchCount++; } } }
        }
        var avgSyn = matchCount > 0 ? totalSyn / matchCount : cand.stats.upgraded.winRate; var coverage = uniqueList.length > 0 ? matchCount / uniqueList.length : 0;
        var complementScore = 0; var candDesc = cand.description || ''; var existingCount = (counts[cand.id] || 0);
        if (deckAnalysis.drawBrick > 15 && candDesc.indexOf('抽') !== -1) complementScore += 25;
        if (deckAnalysis.costBrick > 15 && candDesc.indexOf('获得') !== -1 && candDesc.indexOf('费') !== -1) complementScore += 22;
        if (deckAnalysis.defBrick > 15 && candDesc.indexOf('格挡') !== -1) complementScore += 25;
        if (deckAnalysis.atkBrick > 15 && cand.type === 'attack') complementScore += 22;
        if (deckAnalysis.drawScore < 50 && candDesc.indexOf('抽') !== -1) complementScore += 18;
        if (deckAnalysis.curveScore < 60 && candDesc.indexOf('获得') !== -1 && candDesc.indexOf('费') !== -1) complementScore += 16;
        if (deckAnalysis.dmgScore < 50 && cand.type === 'attack') complementScore += 14;
        if (deckAnalysis.defScore < 50 && candDesc.indexOf('格挡') !== -1) complementScore += 14;
        if (deckAnalysis.typeCount.power < 3 && cand.type === 'power') complementScore += 12;
        if (deckAnalysis.hasAllForOne && cand.cost === 0 && cand.type === 'attack') complementScore += 18;
        if (deckAnalysis.hasClaw && cand.id === 'defect_all_for_one') complementScore += 22;
        if (deckAnalysis.hasClaw && cand.id === 'defect_scrape') complementScore += 20;
        if (deckAnalysis.hasClaw && cand.id === 'defect_claw') complementScore += 25;
        var dupPenalty = 0; if (existingCount >= 3 && cand.id !== 'defect_claw') dupPenalty = (existingCount - 2) * 6; if (existingCount >= 5 && cand.id === 'defect_claw') dupPenalty = (existingCount - 4) * 3;
        var score = avgSyn * (0.5 + 0.3 * coverage) * 0.45 + complementScore * 0.55 - dupPenalty;
        recs.push({ card: cand, score: Math.max(0, score), avgSyn: avgSyn, matchCount: matchCount, complementScore: complementScore, dupPenalty: dupPenalty, existingCount: existingCount, soloWin: cand.stats.upgraded.winRate });
    }
    recs.sort(function(a, b) { return b.score - a.score; }); return recs.slice(0, 15);
}

function renderRecs() {
    $rec.innerHTML = ''; if (selected.length === 0) { $rec.innerHTML = '<div class="hand-empty" style="grid-column:1/-1;">选择卡牌后显示推荐</div>'; $recCount.textContent = ''; return; }
    if (selected.length >= 40) { $rec.innerHTML = '<div class="hand-empty" style="grid-column:1/-1;">牌库已满(40张)</div>'; $recCount.textContent = '(已满)'; return; }
    var recs = calcRecs(); $recCount.textContent = '(' + recs.length + '个)';
    for (var i = 0; i < recs.length; i++) { var r = recs[i]; var c = r.card; var cls = r.score >= 65 ? 'high' : r.score >= 50 ? 'mid' : 'low';
        var div = document.createElement('div'); div.className = 'rec-card'; if (i === 0) div.classList.add('top');
        var imgDiv = document.createElement('div'); imgDiv.className = 'rec-card-img';
        if (c.image) { var img = document.createElement('img'); img.src = c.image; img.alt = c.name; imgDiv.appendChild(img); }
        else { var emoji = document.createElement('div'); emoji.className = 'card-emoji'; emoji.style.background = c.cssBg || '#2a2a2a'; emoji.textContent = getTypeEmoji(c.type); imgDiv.appendChild(emoji); }
        div.appendChild(imgDiv);
        var infoDiv = document.createElement('div'); infoDiv.className = 'rec-card-info';
        var dupInfo = r.existingCount > 0 ? ' · 已有' + r.existingCount + '张' : ''; var complementNote = r.complementScore >= 22 ? ' 🔥急需' : r.complementScore >= 14 ? ' 推荐' : '';
        infoDiv.innerHTML = '<div class="rec-card-rank">#' + (i + 1) + dupInfo + complementNote + ' · ' + (r.matchCount > 0 ? '与' + r.matchCount + '种牌库卡牌协同' : '补充缺失维度') + '</div>' +
            '<div class="rec-card-name">' + c.name + '</div>' +
            '<div class="rec-card-synergy"><span class="rec-card-rate ' + cls + '">' + r.score.toFixed(0) + '</span><span class="rec-card-rate-label">推荐分</span></div>' +
            '<div class="rec-card-detail"><span>组合胜率 <strong>' + r.avgSyn.toFixed(1) + '%</strong></span>' + (r.complementScore > 0 ? '<span style="color:#4fc3f7;">互补+' + r.complementScore.toFixed(0) + '</span>' : '') + (r.dupPenalty > 0 ? '<span style="color:#f44;">重复-' + r.dupPenalty.toFixed(0) + '</span>' : '') + '</div>';
        div.appendChild(infoDiv);
        (function(cardId, cardData) { div.addEventListener('click', function() { add(cardId); }); imgDiv.addEventListener('mouseenter', function(e) { showPreview(e, cardData); }); imgDiv.addEventListener('mousemove', function(e) { movePreview(e); }); imgDiv.addEventListener('mouseleave', hidePreview); })(c.id, c);
        $rec.appendChild(div);
    }
}

function renderAll() { renderPool(); renderHand(); renderHandAnalysis(); renderRecs(); }

$search.addEventListener('input', renderPool);
$clear.addEventListener('click', function() { selected = []; renderAll(); });
if ($resetBtn) { $resetBtn.addEventListener('click', function() { selected = []; var starterCards = ['defect_strike','defect_strike','defect_strike','defect_strike','defect_defend','defect_defend','defect_defend','defect_defend','defect_zap','defect_dualcast']; for (var i = 0; i < starterCards.length; i++) selected.push(starterCards[i]); renderAll(); toast('已恢复初始牌库'); }); }
document.addEventListener('keydown', function(e) { if (e.key === 'Escape') { selected = []; renderAll(); } });

document.querySelectorAll('#filterRarity .filter-chip').forEach(function(btn) { btn.addEventListener('click', function() { document.querySelectorAll('#filterRarity .filter-chip').forEach(function(b) { b.classList.remove('active'); }); btn.classList.add('active'); rarityF = btn.dataset.rarity; renderPool(); }); });
document.querySelectorAll('#filterType .filter-chip').forEach(function(btn) { btn.addEventListener('click', function() { document.querySelectorAll('#filterType .filter-chip').forEach(function(b) { b.classList.remove('active'); }); btn.classList.add('active'); typeF = btn.dataset.type; renderPool(); }); });

selected = [];
function initStarterDeck() { var starterCards = ['defect_strike','defect_strike','defect_strike','defect_strike','defect_defend','defect_defend','defect_defend','defect_defend','defect_zap','defect_dualcast']; for (var i = 0; i < starterCards.length; i++) selected.push(starterCards[i]); }
initStarterDeck(); renderAll();
console.log('🔵 鸡煲卡牌搭配助手 v5.9 已就绪');