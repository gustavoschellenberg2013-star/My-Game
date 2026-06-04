const stateKey = "shapeHunterStarClash:v1";

const defaultState = {
  coins: 220,
  gems: 8,
  trophies: 0,
  wins: 0,
  selectedSkin: "rookie",
  ownedSkins: ["rookie"],
  limitedStock: {
    solar: 5,
    glitch: 5,
    frost: 5
  },
  discoveredShapes: ["circle", "square", "triangle"],
  adminQueue: [],
  adminUnlocked: false,
  testMode: false,
  usedCodes: [],
  adminLog: [],
  stats: {
    bestScore: 0,
    bestCombo: 1,
    totalCoinsEarned: 0,
    totalShapesCaught: 0,
    rareCaught: 0
  },
  missions: {
    score500: 0,
    combo6: 0,
    play3: 0
  },
  claimed: []
};

const modes = [
  {
    id: "classic",
    name: "Caça Clássica",
    desc: "Pegue alvos, desvie de perigos e segure o combo.",
    reward: "8-38 moedas",
    time: 60,
    hazardRate: 0.55,
    targetRate: 1.05,
    shapes: ["circle", "square"],
    color: "#55e37b",
    hint: "Colete formas verdes e azuis. Vermelhas tiram vida."
  },
  {
    id: "rush",
    name: "Corrida Neon",
    desc: "Mais rápido, mais difícil e com pontuação maior.",
    reward: "12-48 moedas",
    time: 45,
    hazardRate: 0.95,
    targetRate: 1.28,
    shapes: ["triangle", "circle"],
    color: "#40e0d0",
    hint: "Tudo se move rápido. Use curvas curtas e não perca combo."
  },
  {
    id: "boss",
    name: "Chefão Hexa",
    desc: "Um modo pesado com ataques em ondas e bônus raro.",
    reward: "15-60 moedas",
    time: 75,
    hazardRate: 0.78,
    targetRate: 0.88,
    boss: true,
    shapes: ["square", "triangle"],
    color: "#ff4f9a",
    hint: "O chefão empurra ondas vermelhas. Pegue estrelas para contra-atacar."
  }
];

const skins = [
  { id: "rookie", name: "Rookie Blue", rarity: "Inicial", price: 0, type: "base", color: "#4aa3ff", accent: "#40e0d0", desc: "A skin inicial, limpa e rápida." },
  { id: "solar", name: "Solar Crown", rarity: "Limitada", price: 520, type: "limited", color: "#ffd447", accent: "#ff4f9a", desc: "Só 5 unidades nesta loja." },
  { id: "glitch", name: "Glitch Byte", rarity: "Limitada", price: 620, type: "limited", color: "#40e0d0", accent: "#8f7cff", desc: "Visual digital com brilho raro." },
  { id: "frost", name: "Frost Nova", rarity: "Limitada", price: 580, type: "limited", color: "#a9fff8", accent: "#4aa3ff", desc: "Só 5 unidades, efeito gelado." },
  { id: "admin", name: "ADM Única", rarity: "ADM ÚNICA", price: 35, currency: "gems", type: "adm", color: "#111217", accent: "#ffd447", desc: "Skin especial de administrador. Apenas uma compra por conta." },
  { id: "adminRuby", name: "ADM Rubi", rarity: "ADM ÚNICA", price: 48, currency: "gems", type: "adm", color: "#ff2f55", accent: "#ffd447", desc: "Skin suprema com contorno de elite." },
  { id: "coinpack", name: "Cofre Pequeno", rarity: "Moedas", price: 6, currency: "gems", type: "coins", coins: 260, color: "#ffd447", accent: "#fff2a0", desc: "Troca gemas por moedas para skins." }
];

const missions = [
  { id: "score500", label: "Fazer 500 pontos", target: 500, reward: 45 },
  { id: "combo6", label: "Alcançar combo x6", target: 6, reward: 35 },
  { id: "play3", label: "Jogar 3 partidas", target: 3, reward: 30 }
];

skins.splice(1, 0,
  { id: "lime", name: "Lime Runner", rarity: "Comum", price: 160, type: "base", color: "#55e37b", accent: "#d8ff6b", desc: "Rapida, simples e barata para comecar a colecao." },
  { id: "violet", name: "Violet Pulse", rarity: "Rara", price: 340, type: "base", color: "#8f7cff", accent: "#ff4f9a", desc: "Uma skin rara com pulso de arena." },
  { id: "toxic", name: "Toxic Pulse", rarity: "Epica", price: 760, type: "base", color: "#b8ff2f", accent: "#111217", desc: "Brilho acido para hunters agressivos." }
);

skins.splice(skins.length - 1, 0,
  { id: "admVoid", name: "ADM Void Crown", rarity: "SECRETA ADM", price: 0, type: "secret", hidden: true, color: "#05060a", accent: "#ffd447", desc: "Invisivel na loja. So o ADM pode dar." },
  { id: "admGalaxy", name: "ADM Galaxy Prime", rarity: "SECRETA ADM", price: 0, type: "secret", hidden: true, color: "#2b1bff", accent: "#40e0d0", desc: "Skin secreta com energia de galaxia." },
  { id: "admGhost", name: "ADM Ghost Shape", rarity: "SECRETA ADM", price: 0, type: "secret", hidden: true, color: "#eff7ff", accent: "#8f7cff", desc: "Skin fantasma que so existe no painel." }
);

const shapeDex = [
  { id: "circle", name: "Circulo Verde", rarity: "Comum", coins: 0, points: 35, color: "#55e37b", shape: "circle", desc: "Forma basica para manter combo." },
  { id: "square", name: "Quadrado Azul", rarity: "Comum", coins: 0, points: 35, color: "#4aa3ff", shape: "square", desc: "Forma comum de arena." },
  { id: "triangle", name: "Triangulo Rosa", rarity: "Comum", coins: 0, points: 40, color: "#ff4f9a", shape: "triangle", desc: "Forma rapida que aparece em modos intensos." },
  { id: "coinStar", name: "Estrela Dourada", rarity: "Rara", coins: 12, points: 95, color: "#ffd447", shape: "star", desc: "Figura rara que da moedas bonus quando e cacada." },
  { id: "emeraldHex", name: "Hexa Esmeralda", rarity: "Epica", coins: 22, points: 150, color: "#40e0d0", shape: "hex", desc: "Figura epica com recompensa alta." },
  { id: "rubyShard", name: "Fragmento Rubi", rarity: "Mitica", coins: 38, points: 220, color: "#ff2f55", shape: "diamond", desc: "Muito raro. Caca isto quando aparecer." },
  { id: "voidEye", name: "Olho Void", rarity: "Secreta", coins: 75, points: 420, color: "#8f7cff", shape: "eye", desc: "So nasce por sorte extrema ou pelo painel ADM." },
  { id: "adminRelic", name: "Reliquia ADM", rarity: "ADM Secreta", coins: 150, points: 800, color: "#ffffff", shape: "relic", desc: "Figura privada. O ADM consegue spawnar manualmente." }
];

const promoCodes = {
  HUNTER500: { coins: 500, message: "+500 moedas" },
  GEMS25: { gems: 25, message: "+25 gemas" },
  SECRETADM: { skin: "admVoid", gems: 10, message: "Skin ADM Void + 10 gemas" }
};

modes.push(
  {
    id: "survival",
    name: "Sobrevivencia",
    desc: "A partida fica cada vez mais agressiva. Ideal para recordes.",
    reward: "10-55 moedas",
    time: 90,
    hazardRate: 1.05,
    targetRate: 0.92,
    shapes: ["circle", "square", "triangle"],
    color: "#55e37b",
    hint: "Sobrevive muito tempo e aproveita figuras raras para subir score."
  },
  {
    id: "hardcore",
    name: "Sem Erro",
    desc: "Levou dano, acabou. Recompensa maior para quem joga limpo.",
    reward: "18-70 moedas",
    time: 50,
    hazardRate: 1.2,
    targetRate: 1.05,
    oneHit: true,
    shapes: ["triangle", "square"],
    color: "#ff5a67",
    hint: "Uma batida termina a partida. O combo vale muito."
  },
  {
    id: "bonus",
    name: "Chuva Rara",
    desc: "Mais chance de figuras com moedas, mas com limite anti-farm.",
    reward: "8-45 moedas",
    time: 40,
    hazardRate: 0.8,
    targetRate: 1.55,
    rareBoost: true,
    shapes: ["circle", "triangle"],
    color: "#ffd447",
    hint: "Caca figuras douradas, mas nao desperdices vida."
  }
);

let data = loadState();
let currentMode = modes[0];
let shopFilter = "all";
let round = null;
let keys = new Set();
let pointer = null;
let lastFrame = 0;
let spawnTimers = { target: 0, hazard: 0, boss: 0 };

const $ = (id) => document.getElementById(id);
const gameCanvas = $("gameCanvas");
const ctx = gameCanvas.getContext("2d");
const heroCanvas = $("heroCanvas");
const hctx = heroCanvas.getContext("2d");

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(stateKey));
    return {
      ...structuredClone(defaultState),
      ...saved,
      limitedStock: { ...defaultState.limitedStock, ...(saved?.limitedStock || {}) },
      missions: { ...defaultState.missions, ...(saved?.missions || {}) },
      stats: { ...defaultState.stats, ...(saved?.stats || {}) }
    };
  } catch {
    return structuredClone(defaultState);
  }
}

function saveState() {
  localStorage.setItem(stateKey, JSON.stringify(data));
}

function showToast(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function openScreen(id) {
  document.querySelectorAll(".screen").forEach((screen) => screen.classList.toggle("active", screen.id === id));
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.open === id));
  if (id !== "gameScreen") stopRound(false);
}

function activeSkin() {
  return skins.find((skin) => skin.id === data.selectedSkin) || skins[0];
}

function updateUI() {
  $("coinsValue").textContent = data.coins;
  $("gemsValue").textContent = data.gems;
  $("trophyValue").textContent = data.trophies;
  $("winsValue").textContent = data.wins;
  $("leagueValue").textContent = getLeague(data.trophies);
  $("selectedSkinName").textContent = activeSkin().name;
  $("selectedRarity").textContent = activeSkin().rarity;
  renderHero();
  renderModes();
  renderShop();
  renderMissions();
  renderShapeIndex();
  renderAdmin();
}

function getLeague(trophies) {
  if (trophies >= 900) return "Mestre";
  if (trophies >= 550) return "Ouro III";
  if (trophies >= 260) return "Prata II";
  if (trophies >= 90) return "Bronze III";
  return "Bronze I";
}

function renderHero() {
  const skin = activeSkin();
  hctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
  drawGrid(hctx, heroCanvas.width, heroCanvas.height, 42, "rgba(255,255,255,0.05)");
  hctx.save();
  hctx.translate(180, 174);
  drawPlayerShape(hctx, 0, 0, 74, skin, performance.now() / 800);
  hctx.restore();
  drawSpark(hctx, 91, 95, skin.accent);
  drawSpark(hctx, 267, 94, skin.color);
  drawSpark(hctx, 282, 238, skin.accent);
}

function renderModes() {
  $("featuredModeTitle").textContent = modes[0].name;
  $("featuredModeDesc").textContent = modes[0].desc;
  $("modeGrid").innerHTML = modes.map((mode) => `
    <article class="mode-card" style="background: linear-gradient(145deg, ${mode.color}33, #1a1e27 54%);">
      <div class="mode-art">${mode.shapes.map((shape) => `<span class="shape-token ${shape}"></span>`).join("")}</div>
      <div>
        <h3>${mode.name}</h3>
        <p>${mode.desc}</p>
        <div class="mode-meta">
          <span class="chip">${mode.time}s</span>
          <span class="chip">${mode.reward}</span>
          <span class="chip">${mode.boss ? "Chefão" : "Arena"}</span>
        </div>
      </div>
      <button class="primary" data-play-mode="${mode.id}" type="button">Jogar modo</button>
    </article>
  `).join("");
}

function renderShop() {
  const items = skins.filter((skin) => !skin.hidden && (shopFilter === "all" || skin.type === shopFilter));
  $("shopGrid").innerHTML = items.map((skin) => {
    const owned = data.ownedSkins.includes(skin.id);
    const stock = skin.type === "limited" ? data.limitedStock[skin.id] : null;
    const soldOut = stock === 0 && !owned;
    const priceLabel = skin.price === 0 ? "Grátis" : `${skin.price} ${skin.currency === "gems" ? "gemas" : "moedas"}`;
    const action = skin.type === "coins" ? "Comprar cofre" : owned ? (data.selectedSkin === skin.id ? "Equipada" : "Equipar") : soldOut ? "Esgotada" : "Comprar";
    return `
      <article class="shop-card ${owned ? "owned" : ""} ${soldOut ? "locked" : ""}" style="background: linear-gradient(145deg, ${skin.color}30, #1a1e27 58%);">
        <div class="skin-preview">
          <span class="skin-body" style="background: linear-gradient(135deg, ${skin.color}, ${skin.accent});"></span>
        </div>
        <div>
          <div class="shop-meta">
            <span class="chip">${skin.rarity}</span>
            ${stock !== null ? `<span class="chip">${stock}/5 unidades</span>` : ""}
          </div>
          <h3>${skin.name}</h3>
          <p>${skin.desc}</p>
        </div>
        <button class="${owned && data.selectedSkin === skin.id ? "secondary" : "primary"}" data-buy="${skin.id}" type="button">${action} · ${priceLabel}</button>
      </article>
    `;
  }).join("");
}

function renderMissions() {
  $("missionsList").innerHTML = missions.map((mission) => {
    const progress = Math.min(data.missions[mission.id] || 0, mission.target);
    const done = progress >= mission.target;
    const claimed = data.claimed.includes(mission.id);
    return `
      <div class="mission ${done ? "done" : ""}">
        <span>${mission.label}<br><small>${progress}/${mission.target}</small></span>
        <button class="${done && !claimed ? "primary" : "secondary"}" data-claim="${mission.id}" ${done && !claimed ? "" : "disabled"} type="button">${claimed ? "OK" : `+${mission.reward}`}</button>
      </div>
    `;
  }).join("");
}

function renderShapeIndex() {
  const grid = $("shapeIndexGrid");
  if (!grid) return;
  grid.innerHTML = shapeDex.map((shape) => {
    const found = data.discoveredShapes.includes(shape.id);
    return `
      <article class="index-card ${found ? "" : "locked"}" style="background: linear-gradient(145deg, ${shape.color}30, #1a1e27 58%);">
        <div class="index-symbol">${shapePreview(shape)}</div>
        <div>
          <div class="shop-meta">
            <span class="chip">${found ? shape.rarity : "???"}</span>
            <span class="chip">${found ? `+${shape.coins} moedas` : "bloqueada"}</span>
          </div>
          <h3>${found ? shape.name : "Figura desconhecida"}</h3>
          <p>${found ? shape.desc : "Caca esta figura ou faz spawn pelo painel ADM para revelar."}</p>
        </div>
      </article>
    `;
  }).join("");
}

function shapePreview(shape) {
  if (shape.shape === "triangle") return `<span class="shape-token triangle"></span>`;
  if (shape.shape === "star") return `<span class="shape-token" style="clip-path: polygon(50% 0, 61% 35%, 98% 35%, 68% 56%, 79% 91%, 50% 70%, 21% 91%, 32% 56%, 2% 35%, 39% 35%); background:${shape.color};"></span>`;
  if (shape.shape === "hex") return `<span class="shape-token" style="clip-path: polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0 50%); background:${shape.color};"></span>`;
  if (shape.shape === "eye") return `<span class="shape-token" style="border-radius: 50% 8px 50% 8px; background:${shape.color};"></span>`;
  if (shape.shape === "relic") return `<span class="shape-token" style="background: linear-gradient(135deg,#fff,#ffd447,#40e0d0);"></span>`;
  if (shape.shape === "diamond") return `<span class="shape-token" style="transform: rotate(45deg); background:${shape.color};"></span>`;
  return `<span class="shape-token ${shape.shape}" style="background:${shape.color};"></span>`;
}

function renderAdmin() {
  const lock = $("adminLock");
  const panel = $("adminPanel");
  if (!lock || !panel) return;
  lock.classList.toggle("hidden", data.adminUnlocked);
  panel.classList.toggle("active", data.adminUnlocked);
  $("adminShapeButtons").innerHTML = shapeDex.filter((shape) => shape.rarity !== "Comum").map((shape) => `
    <button class="secondary" data-admin-spawn="${shape.id}" type="button">${shape.name} · +${shape.coins}</button>
  `).join("");
  $("adminSecretSkins").innerHTML = skins.filter((skin) => skin.hidden).map((skin) => {
    const owned = data.ownedSkins.includes(skin.id);
    return `
      <div class="secret-row">
        <span class="secret-dot" style="background: linear-gradient(135deg, ${skin.color}, ${skin.accent});"></span>
        <span><strong>${skin.name}</strong><br><small>${skin.rarity}</small></span>
        <button class="${owned ? "secondary" : "primary"}" data-admin-skin="${skin.id}" type="button">${owned ? "Equipar" : "Dar"}</button>
      </div>
    `;
  }).join("");
  $("adminLog").value = (data.adminLog || []).slice(-12).join("\n");
}

function buyItem(id) {
  const skin = skins.find((item) => item.id === id);
  if (!skin) return;
  if (skin.type === "coins") {
    if (data.gems < skin.price) return showToast("Gemas insuficientes.");
    data.gems -= skin.price;
    data.coins += skin.coins;
    showToast(`Cofre aberto: +${skin.coins} moedas.`);
  } else if (data.ownedSkins.includes(id)) {
    data.selectedSkin = id;
    showToast(`${skin.name} equipada.`);
  } else {
    const currency = skin.currency === "gems" ? "gems" : "coins";
    if (skin.type === "limited" && data.limitedStock[id] <= 0) return showToast("Esta skin limitada esgotou.");
    if (data[currency] < skin.price) return showToast(currency === "gems" ? "Gemas insuficientes." : "Moedas insuficientes.");
    data[currency] -= skin.price;
    data.ownedSkins.push(id);
    data.selectedSkin = id;
    if (skin.type === "limited") data.limitedStock[id] -= 1;
    showToast(`${skin.name} comprada e equipada.`);
  }
  saveState();
  updateUI();
}

function claimMission(id) {
  const mission = missions.find((item) => item.id === id);
  if (!mission || data.claimed.includes(id) || (data.missions[id] || 0) < mission.target) return;
  data.claimed.push(id);
  data.coins += mission.reward;
  saveState();
  updateUI();
  showToast(`Missão concluída: +${mission.reward} moedas.`);
}

function chooseMode(id) {
  currentMode = modes.find((mode) => mode.id === id) || modes[0];
  $("gameModeName").textContent = currentMode.name;
  $("gameModeHint").textContent = currentMode.hint;
  openScreen("gameScreen");
  resetRound();
}

function resetRound() {
  const skin = activeSkin();
  round = {
    running: false,
    ended: false,
    score: 0,
    combo: 1,
    bestCombo: 1,
    hp: 100,
    time: currentMode.time,
    player: { x: gameCanvas.width / 2, y: gameCanvas.height / 2, r: 23, speed: 310, skin },
    objects: [],
    particles: []
  };
  spawnTimers = { target: 0, hazard: 0, boss: 0 };
  updateBattleHud();
  showOverlay("Preparado?", "Use WASD, setas ou arraste no celular.", "Jogar");
  drawArena(0);
}

function startRound() {
  if (!round || round.ended) resetRound();
  round.running = true;
  round.ended = false;
  lastFrame = performance.now();
  $("gameOverlay").classList.remove("active");
  requestAnimationFrame(loop);
}

function stopRound(showLobby = true) {
  if (round) round.running = false;
  if (showLobby) openScreen("lobbyScreen");
}

function endRound() {
  round.running = false;
  round.ended = true;
  const score = Math.floor(round.score);
  const reward = calculateReward(score, round.bestCombo, round.hp);
  const trophyGain = Math.max(0, Math.floor(score / 180) + (round.hp > 0 ? 4 : 0));
  data.coins += reward.coins;
  data.gems += reward.gems;
  data.trophies += trophyGain;
  data.wins += score >= 350 ? 1 : 0;
  data.stats.bestScore = Math.max(data.stats.bestScore, score);
  data.stats.bestCombo = Math.max(data.stats.bestCombo, round.bestCombo);
  data.stats.totalCoinsEarned += reward.coins;
  data.missions.score500 = Math.max(data.missions.score500, score);
  data.missions.combo6 = Math.max(data.missions.combo6, round.bestCombo);
  data.missions.play3 = Math.min(3, (data.missions.play3 || 0) + 1);
  saveState();
  updateUI();
  updateBattleHud();
  showOverlay("Fim da partida", `+${reward.coins} moedas, +${trophyGain} troféus${reward.gems ? `, +${reward.gems} gema` : ""}.`, "Jogar de novo");
}

function calculateReward(score, combo, hp) {
  if (data.testMode) return { coins: 999, gems: 9 };
  const modeBonus = currentMode.id === "boss" ? 8 : currentMode.id === "rush" ? 5 : 0;
  const base = Math.floor(score / 95) + Math.floor(combo / 3) + (hp > 40 ? 3 : 0) + modeBonus;
  const coins = Math.max(4, Math.min(currentMode.id === "boss" ? 60 : 48, base));
  const gems = score >= 950 && combo >= 9 ? 1 : 0;
  return { coins, gems };
}

function loop(now) {
  if (!round?.running) return;
  const dt = Math.min(0.032, (now - lastFrame) / 1000);
  lastFrame = now;
  updateRound(dt);
  drawArena(now / 1000);
  updateBattleHud();
  if (round.time <= 0 || round.hp <= 0) endRound();
  else requestAnimationFrame(loop);
}

function updateRound(dt) {
  round.time -= dt;
  movePlayer(dt);
  spawnTimers.target -= dt;
  spawnTimers.hazard -= dt;
  spawnTimers.boss -= dt;
  if (data.adminQueue.length && spawnTimers.target < 0.35) {
    spawnObject("target", false, 0, data.adminQueue.shift());
    saveState();
    spawnTimers.target = 0.8;
  }
  if (spawnTimers.target <= 0) {
    spawnObject("target");
    spawnTimers.target = 1 / currentMode.targetRate;
  }
  if (spawnTimers.hazard <= 0) {
    spawnObject("hazard");
    spawnTimers.hazard = 1 / currentMode.hazardRate;
  }
  if (currentMode.boss && spawnTimers.boss <= 0) {
    for (let i = 0; i < 6; i++) spawnObject("hazard", true, i);
    spawnTimers.boss = 6.5;
  }
  round.objects.forEach((obj) => {
    obj.x += obj.vx * dt;
    obj.y += obj.vy * dt;
    obj.life -= dt;
  });
  round.particles.forEach((p) => {
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.life -= dt;
  });
  handleCollisions();
  round.objects = round.objects.filter((obj) => obj.life > 0 && obj.x > -80 && obj.x < gameCanvas.width + 80 && obj.y > -80 && obj.y < gameCanvas.height + 80);
  round.particles = round.particles.filter((p) => p.life > 0);
}

function movePlayer(dt) {
  const p = round.player;
  let dx = 0;
  let dy = 0;
  if (keys.has("arrowup") || keys.has("w")) dy -= 1;
  if (keys.has("arrowdown") || keys.has("s")) dy += 1;
  if (keys.has("arrowleft") || keys.has("a")) dx -= 1;
  if (keys.has("arrowright") || keys.has("d")) dx += 1;
  if (pointer) {
    const rect = gameCanvas.getBoundingClientRect();
    const tx = (pointer.x - rect.left) * (gameCanvas.width / rect.width);
    const ty = (pointer.y - rect.top) * (gameCanvas.height / rect.height);
    dx += (tx - p.x) / 110;
    dy += (ty - p.y) / 110;
  }
  const len = Math.hypot(dx, dy) || 1;
  p.x = clamp(p.x + (dx / len) * p.speed * dt, p.r, gameCanvas.width - p.r);
  p.y = clamp(p.y + (dy / len) * p.speed * dt, p.r, gameCanvas.height - p.r);
}

function spawnObject(type, wave = false, index = 0, forcedShapeId = null) {
  const edge = Math.floor(Math.random() * 4);
  const from = randomEdge(edge);
  const target = wave
    ? { x: gameCanvas.width / 2 + Math.cos(index) * 140, y: gameCanvas.height / 2 + Math.sin(index) * 120 }
    : { x: Math.random() * gameCanvas.width, y: Math.random() * gameCanvas.height };
  const angle = Math.atan2(target.y - from.y, target.x - from.x);
  const speed = type === "hazard" ? random(120, currentMode.id === "rush" ? 230 : 190) : random(55, 115);
  const dexShape = type === "target" ? pickShape(forcedShapeId) : null;
  round.objects.push({
    type,
    x: from.x,
    y: from.y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    r: dexShape ? (dexShape.rarity.includes("Secreta") ? 28 : dexShape.rarity === "Mitica" ? 25 : dexShape.rarity === "Epica" ? 23 : 18) : 23,
    color: dexShape ? dexShape.color : "#ff5a67",
    shape: dexShape ? dexShape.shape : "diamond",
    shapeId: dexShape?.id,
    bonusCoins: dexShape?.coins || 0,
    points: dexShape?.points || 35,
    life: wave ? 7 : random(5.2, 8.6)
  });
}

function pickShape(forcedShapeId) {
  if (forcedShapeId) return shapeDex.find((shape) => shape.id === forcedShapeId) || shapeDex[0];
  const roll = Math.random();
  const boost = currentMode.rareBoost ? 2.2 : 1;
  if (roll < 0.006 * boost) return shapeDex.find((shape) => shape.id === "voidEye");
  if (roll < 0.025 * boost) return shapeDex.find((shape) => shape.id === "rubyShard");
  if (roll < 0.07 * boost) return shapeDex.find((shape) => shape.id === "emeraldHex");
  if (roll < 0.18 * boost) return shapeDex.find((shape) => shape.id === "coinStar");
  const allowed = shapeDex.filter((shape) => currentMode.shapes.includes(shape.shape) || ["circle", "square", "triangle"].includes(shape.id));
  return allowed[Math.floor(Math.random() * allowed.length)] || shapeDex[0];
}

function randomEdge(edge) {
  if (edge === 0) return { x: random(0, gameCanvas.width), y: -40 };
  if (edge === 1) return { x: gameCanvas.width + 40, y: random(0, gameCanvas.height) };
  if (edge === 2) return { x: random(0, gameCanvas.width), y: gameCanvas.height + 40 };
  return { x: -40, y: random(0, gameCanvas.height) };
}

function handleCollisions() {
  const p = round.player;
  for (const obj of round.objects) {
    if (obj.hit) continue;
    const dist = Math.hypot(obj.x - p.x, obj.y - p.y);
    if (dist > obj.r + p.r) continue;
    obj.hit = true;
    obj.life = 0;
    burst(obj.x, obj.y, obj.color, obj.type === "target" ? 13 : 18);
    if (obj.type === "target") {
      round.score += obj.points * round.combo;
      data.stats.totalShapesCaught += 1;
      if (obj.shapeId && !data.discoveredShapes.includes(obj.shapeId)) {
        data.discoveredShapes.push(obj.shapeId);
        showToast(`Figura descoberta: ${shapeDex.find((shape) => shape.id === obj.shapeId)?.name || obj.shapeId}`);
      }
      if (obj.bonusCoins) {
        data.coins += obj.bonusCoins;
        data.stats.totalCoinsEarned += obj.bonusCoins;
        data.stats.rareCaught += 1;
        showToast(`Figura rara cacada: +${obj.bonusCoins} moedas.`);
      }
      round.combo = Math.min(12, round.combo + 1);
      round.bestCombo = Math.max(round.bestCombo, round.combo);
    } else {
      round.hp -= currentMode.oneHit ? 999 : currentMode.id === "boss" ? 18 : 14;
      round.combo = 1;
      shakeCanvas();
    }
  }
}

function burst(x, y, color, amount) {
  for (let i = 0; i < amount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = random(55, 220);
    round.particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, color, life: random(0.25, 0.7), r: random(2, 5) });
  }
}

function drawArena(t) {
  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  const gradient = ctx.createLinearGradient(0, 0, gameCanvas.width, gameCanvas.height);
  gradient.addColorStop(0, "#101722");
  gradient.addColorStop(0.5, "#111217");
  gradient.addColorStop(1, "#182130");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
  drawGrid(ctx, gameCanvas.width, gameCanvas.height, 48, "rgba(255,255,255,0.045)");

  if (currentMode.boss) {
    ctx.save();
    ctx.translate(gameCanvas.width / 2, 86);
    ctx.rotate(t * 0.7);
    drawPolygon(ctx, 0, 0, 48, 6, "#ff4f9a");
    ctx.restore();
  }

  round?.objects.forEach(drawObject);
  round?.particles.forEach((p) => {
    ctx.globalAlpha = Math.max(0, p.life / 0.7);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  });
  if (round) drawPlayerShape(ctx, round.player.x, round.player.y, round.player.r, round.player.skin, t);
}

function drawObject(obj) {
  ctx.save();
  ctx.translate(obj.x, obj.y);
  ctx.rotate((performance.now() / 700) % 6.28);
  if (obj.shape === "circle") {
    ctx.fillStyle = obj.color;
    ctx.beginPath();
    ctx.arc(0, 0, obj.r, 0, Math.PI * 2);
    ctx.fill();
  } else if (obj.shape === "triangle") {
    drawPolygon(ctx, 0, 0, obj.r + 5, 3, obj.color);
  } else if (obj.shape === "star") {
    drawStar(ctx, 0, 0, obj.r + 8, obj.r * 0.55, obj.color);
  } else if (obj.shape === "hex") {
    drawPolygon(ctx, 0, 0, obj.r + 4, 6, obj.color);
  } else if (obj.shape === "eye") {
    ctx.fillStyle = obj.color;
    ctx.scale(1.45, 0.72);
    ctx.beginPath();
    ctx.arc(0, 0, obj.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.scale(0.69, 1.38);
    ctx.fillStyle = "#101217";
    ctx.beginPath();
    ctx.arc(0, 0, obj.r * 0.35, 0, Math.PI * 2);
    ctx.fill();
  } else if (obj.shape === "relic") {
    drawStar(ctx, 0, 0, obj.r + 12, obj.r * 0.38, "#ffffff");
    drawPolygon(ctx, 0, 0, obj.r * 0.72, 4, "#ffd447");
  } else {
    drawPolygon(ctx, 0, 0, obj.r + 3, 4, obj.color);
  }
  ctx.strokeStyle = "rgba(255,255,255,0.42)";
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.restore();
}

function drawPlayerShape(context, x, y, r, skin, t) {
  context.save();
  context.translate(x, y);
  context.rotate(Math.sin(t * 3) * 0.12 + Math.PI / 4);
  context.shadowColor = skin.accent;
  context.shadowBlur = 22;
  const grad = context.createLinearGradient(-r, -r, r, r);
  grad.addColorStop(0, skin.color);
  grad.addColorStop(1, skin.accent);
  context.fillStyle = grad;
  roundRect(context, -r, -r, r * 2, r * 2, 12);
  context.fill();
  context.shadowBlur = 0;
  context.strokeStyle = "rgba(255,255,255,0.48)";
  context.lineWidth = 4;
  context.stroke();
  context.fillStyle = "rgba(255,255,255,0.9)";
  context.fillRect(-r * 0.45, -r * 0.18, r * 0.32, r * 0.32);
  context.fillRect(r * 0.14, -r * 0.18, r * 0.32, r * 0.32);
  context.restore();
}

function drawGrid(context, width, height, size, color) {
  context.strokeStyle = color;
  context.lineWidth = 1;
  for (let x = 0; x < width; x += size) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
  }
  for (let y = 0; y < height; y += size) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }
}

function drawSpark(context, x, y, color) {
  context.save();
  context.translate(x, y);
  context.rotate(performance.now() / 900);
  drawStar(context, 0, 0, 18, 8, color);
  context.restore();
}

function drawPolygon(context, x, y, r, sides, color) {
  context.fillStyle = color;
  context.beginPath();
  for (let i = 0; i < sides; i++) {
    const angle = -Math.PI / 2 + (i / sides) * Math.PI * 2;
    context[i ? "lineTo" : "moveTo"](x + Math.cos(angle) * r, y + Math.sin(angle) * r);
  }
  context.closePath();
  context.fill();
}

function drawStar(context, x, y, outer, inner, color) {
  context.fillStyle = color;
  context.beginPath();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 ? inner : outer;
    const angle = -Math.PI / 2 + (i / 10) * Math.PI * 2;
    context[i ? "lineTo" : "moveTo"](x + Math.cos(angle) * r, y + Math.sin(angle) * r);
  }
  context.closePath();
  context.fill();
}

function roundRect(context, x, y, w, h, r) {
  context.beginPath();
  context.moveTo(x + r, y);
  context.arcTo(x + w, y, x + w, y + h, r);
  context.arcTo(x + w, y + h, x, y + h, r);
  context.arcTo(x, y + h, x, y, r);
  context.arcTo(x, y, x + w, y, r);
  context.closePath();
}

function updateBattleHud() {
  if (!round) return;
  $("scoreValue").textContent = Math.floor(round.score);
  $("comboValue").textContent = `x${round.combo}`;
  $("timeValue").textContent = Math.max(0, Math.ceil(round.time));
  $("hpValue").textContent = Math.max(0, Math.ceil(round.hp));
}

function showOverlay(title, text, button) {
  $("overlayTitle").textContent = title;
  $("overlayText").textContent = text;
  $("startRoundBtn").textContent = button;
  $("gameOverlay").classList.add("active");
}

function shakeCanvas() {
  gameCanvas.animate([
    { transform: "translateX(0)" },
    { transform: "translateX(-8px)" },
    { transform: "translateX(8px)" },
    { transform: "translateX(0)" }
  ], { duration: 160, easing: "ease-out" });
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function random(min, max) {
  return min + Math.random() * (max - min);
}

document.addEventListener("click", (event) => {
  const open = event.target.closest("[data-open]");
  const play = event.target.closest("[data-play-mode]");
  const buy = event.target.closest("[data-buy]");
  const claim = event.target.closest("[data-claim]");
  const tab = event.target.closest("[data-filter]");
  const adminMoney = event.target.closest("[data-admin-money]");
  const adminSpawn = event.target.closest("[data-admin-spawn]");
  const adminSkin = event.target.closest("[data-admin-skin]");
  const copyCode = event.target.closest("[data-copy-code]");
  if (open) openScreen(open.dataset.open);
  if (play) chooseMode(play.dataset.playMode);
  if (buy) buyItem(buy.dataset.buy);
  if (claim) claimMission(claim.dataset.claim);
  if (adminMoney) adminAddMoney(adminMoney.dataset.adminMoney);
  if (adminSpawn) adminQueueShape(adminSpawn.dataset.adminSpawn);
  if (adminSkin) adminGiveSkin(adminSkin.dataset.adminSkin);
  if (copyCode) {
    $("promoInput").value = copyCode.dataset.copyCode;
    showToast(`Codigo pronto: ${copyCode.dataset.copyCode}`);
  }
  if (tab) {
    shopFilter = tab.dataset.filter;
    document.querySelectorAll(".tab").forEach((button) => button.classList.toggle("active", button === tab));
    renderShop();
  }
});

function adminLog(message) {
  data.adminLog = data.adminLog || [];
  data.adminLog.push(`${new Date().toLocaleTimeString()} - ${message}`);
  data.adminLog = data.adminLog.slice(-30);
}

function adminAddMoney(command) {
  if (!data.adminUnlocked) return showToast("Entra no painel ADM primeiro.");
  const [field, rawValue] = command.split(":");
  const value = Number(rawValue);
  data[field] = Math.max(0, (data[field] || 0) + value);
  adminLog(`${field} ${value > 0 ? "+" : ""}${value}`);
  saveState();
  updateUI();
}

function adminQueueShape(id) {
  if (!data.adminUnlocked) return showToast("Entra no painel ADM primeiro.");
  data.adminQueue.push(id);
  const shape = shapeDex.find((item) => item.id === id);
  if (shape && !data.discoveredShapes.includes(id)) data.discoveredShapes.push(id);
  adminLog(`spawn preparado: ${shape?.name || id}`);
  saveState();
  updateUI();
  showToast(`${shape?.name || id} vai spawnar na proxima partida.`);
}

function adminGiveSkin(id) {
  if (!data.adminUnlocked) return showToast("Entra no painel ADM primeiro.");
  const skin = skins.find((item) => item.id === id);
  if (!skin) return;
  if (!data.ownedSkins.includes(id)) data.ownedSkins.push(id);
  data.selectedSkin = id;
  adminLog(`skin secreta dada/equipada: ${skin.name}`);
  saveState();
  updateUI();
  showToast(`${skin.name} equipada pelo ADM.`);
}

function redeemCode() {
  const code = $("promoInput").value.trim().toUpperCase();
  const reward = promoCodes[code];
  if (!reward) return showToast("Codigo invalido.");
  if (data.usedCodes.includes(code)) return showToast("Este codigo ja foi usado.");
  data.usedCodes.push(code);
  if (reward.coins) data.coins += reward.coins;
  if (reward.gems) data.gems += reward.gems;
  if (reward.skin && !data.ownedSkins.includes(reward.skin)) data.ownedSkins.push(reward.skin);
  adminLog(`codigo resgatado: ${code}`);
  saveState();
  updateUI();
  showToast(`Codigo resgatado: ${reward.message}`);
}

$("quickPlayBtn").addEventListener("click", () => chooseMode("classic"));
$("featuredPlayBtn").addEventListener("click", () => chooseMode("classic"));
$("homeBtn").addEventListener("click", () => openScreen("lobbyScreen"));
let brandClicks = 0;
$("homeBtn").addEventListener("click", () => {
  brandClicks += 1;
  clearTimeout($("homeBtn").brandTimer);
  $("homeBtn").brandTimer = setTimeout(() => brandClicks = 0, 1200);
  if (brandClicks >= 5) {
    brandClicks = 0;
    openScreen("adminScreen");
  }
});
$("exitGameBtn").addEventListener("click", () => stopRound(true));
$("restartBtn").addEventListener("click", resetRound);
$("startRoundBtn").addEventListener("click", startRound);
$("adminLoginBtn").addEventListener("click", () => {
  const code = $("adminCodeInput").value.trim().toUpperCase();
  if (code !== "SHAPE-ADM") return showToast("Codigo ADM errado.");
  data.adminUnlocked = true;
  adminLog("painel ADM desbloqueado");
  saveState();
  updateUI();
  showToast("Painel ADM desbloqueado.");
});
$("redeemBtn").addEventListener("click", redeemCode);
$("unlockAllBtn").addEventListener("click", () => {
  if (!data.adminUnlocked) return showToast("Entra no painel ADM primeiro.");
  skins.forEach((skin) => {
    if (skin.type !== "coins" && !data.ownedSkins.includes(skin.id)) data.ownedSkins.push(skin.id);
  });
  data.discoveredShapes = shapeDex.map((shape) => shape.id);
  adminLog("desbloqueou todas skins e figuras");
  saveState();
  updateUI();
});
$("restockBtn").addEventListener("click", () => {
  if (!data.adminUnlocked) return showToast("Entra no painel ADM primeiro.");
  Object.keys(data.limitedStock).forEach((key) => data.limitedStock[key] = 5);
  adminLog("repor limitadas 5/5");
  saveState();
  updateUI();
});
$("toggleTestBtn").addEventListener("click", () => {
  if (!data.adminUnlocked) return showToast("Entra no painel ADM primeiro.");
  data.testMode = !data.testMode;
  adminLog(`modo teste ${data.testMode ? "ativado" : "desativado"}`);
  saveState();
  updateUI();
  showToast(data.testMode ? "Modo teste ligado." : "Modo teste desligado.");
});
$("exportBtn").addEventListener("click", () => {
  $("adminLog").value = JSON.stringify(data, null, 2);
  showToast("Progresso exportado no campo de log.");
});
$("resetDataBtn").addEventListener("click", () => {
  if (!confirm("Reiniciar moedas, skins e troféus?")) return;
  data = structuredClone(defaultState);
  saveState();
  updateUI();
  showToast("Progresso reiniciado.");
});

window.addEventListener("keydown", (event) => keys.add(event.key.toLowerCase()));
window.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "a") openScreen("adminScreen");
});
window.addEventListener("keyup", (event) => keys.delete(event.key.toLowerCase()));
gameCanvas.addEventListener("pointerdown", (event) => {
  pointer = { x: event.clientX, y: event.clientY };
  gameCanvas.setPointerCapture(event.pointerId);
});
gameCanvas.addEventListener("pointermove", (event) => {
  if (pointer) pointer = { x: event.clientX, y: event.clientY };
});
gameCanvas.addEventListener("pointerup", () => {
  pointer = null;
});

setInterval(renderHero, 80);
updateUI();
resetRound();
