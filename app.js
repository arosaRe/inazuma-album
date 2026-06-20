const state = {
  mode: "players",
  players: [],
  statTables: {},
  filtered: [],
  selectedId: null,
  coaches: [],
  filteredCoaches: [],
  selectedCoachId: null,
  formations: {},
  formationConditions: {},
  filters: {
    query: "",
    team: "all",
    position: "all",
    element: "all",
    style: "all",
    season: "all",
    sort: "name_asc",
    playableOnly: true,
  },
  coachFilters: {
    query: "",
    sort: "name_asc",
    showEnemy: false,
  },
  simulator: {
    level: 300,
    awakeningCode: 9,
    equipmentLevels: {},
    equipmentLevelsByPosition: {},
  },
  comparison: {
    level: 300,
    leftPlayerId: null,
    rightPlayerId: null,
    leftAwakeningCode: 9,
    rightAwakeningCode: 9,
    equipmentSource: "base",
    selectedSide: "left",
  },
  teamBuilder: {
    selectedSlot: 0,
    coachId: null,
    slots: [],
  },
  account: {
    user: null,
    avatars: [],
    collection: null,
    authView: "login",
    pendingEmail: "",
    notice: "",
    error: "",
  },
  publicProfile: null,
  publicProfileUsername: "",
};

const labels = {
  elements: {
    fire: "Feu",
    wood: "Bois",
    wind: "Vent",
    mountain: "Montagne",
    none: "Aucun",
  },
  positions: {
    GK: "Gardien",
    DF: "Défenseur",
    MF: "Milieu",
    FW: "Attaquant",
  },
  stats: {
    tp: "TP",
    kick: "Frappe",
    technique: "Technique",
    block: "Blocage",
    catch: "Arrêt",
    speed: "Vitesse",
  },
  moveTypes: {
    shot: "Tir",
    dribble: "Dribble",
    block: "Blocage",
    save: "Arrêt",
  },
};

const coachEffectIconBases = {
  "キック加減算": "PassiveEffectIcon_AddKick",
  "キャッチ加減算": "PassiveEffectIcon_AddCatch",
  "クリティカル確率加減算": "PassiveEffectIcon_AddCriticalProbability",
  "クリティカル率加減算": "PassiveEffectIcon_AddCriticalProbability",
  "クリティカル発生率加減算": "PassiveEffectIcon_AddCriticalProbability",
  "シュートチェイン確率加減算": "PassiveEffectIcon_AddShootChainProbability",
  "スピード加減算": "PassiveEffectIcon_AddSpeed",
  "テクニック加減算": "PassiveEffectIcon_AddTechnique",
  "ファウル確率加減算": "PassiveEffectIcon_AddFoulProbability",
  "ファール率加減算": "PassiveEffectIcon_AddFoulProbability",
  "ブロック加減算": "PassiveEffectIcon_AddBlock",
  "全パラメータ加減算": "PassiveEffectIcon_AddAllParameters",
  "技威力加減算": "PassiveEffectIcon_AddMovePower",
  "技射程加減算": "PassiveEffectIcon_AddMoveRange",
  "最大TP加減算": "PassiveEffectIcon_AddMaxTP",
  "TP加減算": "PassiveEffectIcon_AddCurrentTP",
  "消費TP加減算": "PassiveEffectIcon_AddTPCost",
};

const uiAssets = {
  elements: {
    fire: "assets/elements/Icon_Element_Fire.png",
    wood: "assets/elements/Icon_Element_Forest.png",
    wind: "assets/elements/Icon_Element_Wind.png",
    mountain: "assets/elements/Icon_Element_Mountain.png",
  },
  positions: {
    FW: "assets/positions/Icon_Position_FW.png",
    MF: "assets/positions/Icon_Position_MF.png",
    DF: "assets/positions/Icon_Position_DF.png",
    GK: "assets/positions/Icon_Position_GK.png",
  },
  coachFormationSlots: {
    fw: "assets/coaches/positions/Img_FWBase.png",
    mf: "assets/coaches/positions/Img_MFBase.png",
    df: "assets/coaches/positions/Img_DFBase.png",
    gk: "assets/coaches/positions/Img_GKBase.png",
  },
  skillCards: {
    power: "assets/skill-card/Icon_SkillPower.png",
    moveTypes: {
      shot: "assets/skill-card/Icon_MoveSkill_Shoot.png",
      dribble: "assets/skill-card/Icon_MoveSkill_Dribble.png",
      block: "assets/skill-card/Icon_MoveSkill_Block.png",
      save: "assets/skill-card/Icon_MoveSkill_Catch.png",
      catch: "assets/skill-card/Icon_MoveSkill_Catch.png",
      none: "assets/skill-card/Icon_MoveSkill_None.png",
    },
  },
  ui: {
    star: "assets/ui/Icon_GradeStar.png",
  },
};

const tagIconFallbacks = {
  team: createAssetLookup({
    Raimon: "assets/tags/Icon_Tag_Team_Raimon.png",
    "雷門": "assets/tags/Icon_Tag_Team_Raimon.png",
    "Anciens de Raimon": "assets/tags/Icon_Tag_Team_RaimonVeterans.png",
    "Raimon Veterans": "assets/tags/Icon_Tag_Team_RaimonVeterans.png",
    "Royal Academy": "assets/tags/Icon_Tag_Team_Teikoku.png",
    Teikoku: "assets/tags/Icon_Tag_Team_Teikoku.png",
    "帝国": "assets/tags/Icon_Tag_Team_Teikoku.png",
    "Inazuma Japon": "assets/tags/Icon_Tag_Team_InazumaJapan.png",
    "Inazuma Japan": "assets/tags/Icon_Tag_Team_InazumaJapan.png",
    "イナズマジャパン": "assets/tags/Icon_Tag_Team_InazumaJapan.png",
    "Équipe du Japon 2026": "assets/tags/Icon_Tag_Team_JapanNationalTeam2026.png",
    "Japan National Team 2026": "assets/tags/Icon_Tag_Team_JapanNationalTeam2026.png",
    "Inazuma KFC": "assets/tags/Icon_Tag_Team_InazumaKidsFC.png",
    "稲妻KFC": "assets/tags/Icon_Tag_Team_InazumaKidsFC.png",
    "稲妻ＫＦＣ": "assets/tags/Icon_Tag_Team_InazumaKidsFC.png",
    "Jeunes Inazuma": "assets/tags/Icon_Tag_Team_YoungInazuma.png",
    "Young Inazuma": "assets/tags/Icon_Tag_Team_YoungInazuma.png",
    Kirkwood: "assets/tags/Icon_Tag_Team_Kirkwood.png",
    "木戸川清修": "assets/tags/Icon_Tag_Team_Kirkwood.png",
    "Secret Service": "assets/tags/Icon_Tag_Team_SecretService.png",
    "Sengoku Igajima": "assets/tags/Icon_Tag_Team_Shuriken.png",
    Shuriken: "assets/tags/Icon_Tag_Team_Shuriken.png",
    "戦国伊賀": "assets/tags/Icon_Tag_Team_Shuriken.png",
    Zeus: "assets/tags/Icon_Tag_Team_Zeus.png",
    "世宇子": "assets/tags/Icon_Tag_Team_Zeus.png",
    Wild: "assets/tags/Icon_Tag_Team_Wild.png",
    "野生": "assets/tags/Icon_Tag_Team_Wild.png",
    Otaku: "assets/tags/Icon_Tag_Team_Otaku.png",
    "秋葉名戸": "assets/tags/Icon_Tag_Team_Otaku.png",
    Occulte: "assets/tags/Icon_Tag_Team_Occult.png",
    Occult: "assets/tags/Icon_Tag_Team_Occult.png",
    "尾刈斗": "assets/tags/Icon_Tag_Team_Occult.png",
    "Tempête des Gémeaux": "assets/tags/Icon_Tag_Team_GeminiStorm.png",
    "Gemini Storm": "assets/tags/Icon_Tag_Team_GeminiStorm.png",
    "ジェミニストーム": "assets/tags/Icon_Tag_Team_GeminiStorm.png",
    Epsilon: "assets/tags/Icon_Tag_Team_Epsilon.png",
    "イプシロン": "assets/tags/Icon_Tag_Team_Epsilon.png",
    "The Genesis": "assets/tags/Icon_Tag_Team_Genesis.png",
    Genesis: "assets/tags/Icon_Tag_Team_Genesis.png",
    "ザ・ジェネシス": "assets/tags/Icon_Tag_Team_Genesis.png",
    Chaos: "assets/tags/Icon_Tag_Team_Chaos.png",
    "カオス": "assets/tags/Icon_Tag_Team_Chaos.png",
    "Little Gigantes": "assets/tags/Icon_Tag_Team_LittleGigant.png",
    "Little Gigant": "assets/tags/Icon_Tag_Team_LittleGigant.png",
    "リトルギガント": "assets/tags/Icon_Tag_Team_LittleGigant.png",
    "Mikage Sennou": "assets/tags/Icon_Tag_Team_Brainwashing.png",
    Brainwashing: "assets/tags/Icon_Tag_Team_Brainwashing.png",
    "御影専農": "assets/tags/Icon_Tag_Team_Brainwashing.png",
    "日本代表２０２６": "assets/tags/Icon_Tag_Team_JapanNationalTeam2026.png",
    "雷門ＯＢ": "assets/tags/Icon_Tag_Team_RaimonVeterans.png",
    "ヤングイナズマ": "assets/tags/Icon_Tag_Team_YoungInazuma.png",
    "ＳＰフィクサーズ": "assets/tags/Icon_Tag_Team_SecretService.png",
    "Diamond Dust": "assets/tags/Icon_TeamEmblem_DiamondDust.png",
    "Diamond Dust Chaos": "assets/tags/Icon_TeamEmblem_DiamondDust.png",
    DiamondDust: "assets/tags/Icon_TeamEmblem_DiamondDust.png",
    "ダイヤモンドダスト": "assets/tags/Icon_TeamEmblem_DiamondDust.png",
    "ダイヤモンドダスト カオス": "assets/tags/Icon_TeamEmblem_DiamondDust.png",
    Pirate: "assets/tags/Icon_TeamEmblem_Pirate.png",
    "Pirates Cove": "assets/tags/Icon_TeamEmblem_Pirate.png",
    "Pirates Cove Japanese Resistance": "assets/tags/Icon_TeamEmblem_Pirate.png",
    "海賊": "assets/tags/Icon_TeamEmblem_Pirate.png",
    "海王学園": "assets/tags/Icon_TeamEmblem_Pirate.png",
    Ramen: "assets/tags/Icon_TeamEmblem_Ramen.png",
    "ラーメン義勇団": "assets/tags/Icon_TeamEmblem_Ramen.png",
    "ラーメン": "assets/tags/Icon_TeamEmblem_Ramen.png",
  }),
  style: createAssetLookup({
    "Meneur de jeu": "assets/tags/Icon_Tag_Ability_Playmaker.png",
    Playmaker: "assets/tags/Icon_Tag_Ability_Playmaker.png",
    "プレイメイカー": "assets/tags/Icon_Tag_Ability_Playmaker.png",
    Buteur: "assets/tags/Icon_Tag_Ability_Striker.png",
    Striker: "assets/tags/Icon_Tag_Ability_Striker.png",
    "ストライカー": "assets/tags/Icon_Tag_Ability_Striker.png",
    Gardien: "assets/tags/Icon_Tag_Ability_Keeper.png",
    Keeper: "assets/tags/Icon_Tag_Ability_Keeper.png",
    "キーパー": "assets/tags/Icon_Tag_Ability_Keeper.png",
    "Milieu défensif": "assets/tags/Icon_Tag_Ability_Defensivehalf.png",
    "Defensive Half": "assets/tags/Icon_Tag_Ability_Defensivehalf.png",
    "ディフェンシブハーフ": "assets/tags/Icon_Tag_Ability_Defensivehalf.png",
    Stoppeur: "assets/tags/Icon_Tag_Ability_Stopper.png",
    Stopper: "assets/tags/Icon_Tag_Ability_Stopper.png",
    "ストッパー": "assets/tags/Icon_Tag_Ability_Stopper.png",
    "Second attaquant": "assets/tags/Icon_Tag_Ability_SecondTop.png",
    "Second Top": "assets/tags/Icon_Tag_Ability_SecondTop.png",
    "セカンドトップ": "assets/tags/Icon_Tag_Ability_SecondTop.png",
    "Latéral": "assets/tags/Icon_Tag_Ability_SideBack.png",
    Sideback: "assets/tags/Icon_Tag_Ability_SideBack.png",
    "サイドバック": "assets/tags/Icon_Tag_Ability_SideBack.png",
    "Tireur longue distance": "assets/tags/Icon_Tag_Ability_Longshooter.png",
    "Long Shooter": "assets/tags/Icon_Tag_Ability_Longshooter.png",
    "ロングシューター": "assets/tags/Icon_Tag_Ability_Longshooter.png",
    "Bloqueur de tir": "assets/tags/Icon_Tag_Ability_Shootblocker.png",
    "Shoot Blocker": "assets/tags/Icon_Tag_Ability_Shootblocker.png",
    "シュートブロッカー": "assets/tags/Icon_Tag_Ability_Shootblocker.png",
    Buffer: "assets/tags/Icon_Tag_Ability_Buffer.png",
  }),
  season: createAssetLookup({
    Cross: "assets/tags/Icon_Tag_Title_Cross.png",
    "Saison 1": "assets/tags/Icon_Tag_Title_InaEle1.png",
    "Inazuma Eleven 1": "assets/tags/Icon_Tag_Title_InaEle1.png",
    "イナズマイレブン1": "assets/tags/Icon_Tag_Title_InaEle1.png",
    "Saison 2": "assets/tags/Icon_Tag_Title_InaEle2.png",
    "Inazuma Eleven 2": "assets/tags/Icon_Tag_Title_InaEle2.png",
    "イナズマイレブン2": "assets/tags/Icon_Tag_Title_InaEle2.png",
    "Saison 3": "assets/tags/Icon_Tag_Title_InaEle3.png",
    "Inazuma Eleven 3": "assets/tags/Icon_Tag_Title_InaEle3.png",
    "イナズマイレブン3": "assets/tags/Icon_Tag_Title_InaEle3.png",
  }),
};

const statIconFiles = {
  tp: "Icon_Status_TP",
  kick: "Icon_Status_Kick",
  technique: "Icon_Status_Technic",
  block: "Icon_Status_Block",
  catch: "Icon_Status_Catch",
  speed: "Icon_Status_Speed",
};

const awakeningTiers = {
  0: { label: "NORMAL PLAYER", slug: "normal" },
  1: { label: "NORMAL PLAYER+", slug: "normal-plus" },
  2: { label: "GROWING PLAYER", slug: "growing" },
  3: { label: "GROWING PLAYER+", slug: "growing-plus" },
  4: { label: "ADVANCED PLAYER", slug: "advanced" },
  5: { label: "ADVANCED PLAYER+", slug: "advanced-plus" },
  6: { label: "TOP PLAYER", slug: "top" },
  7: { label: "TOP PLAYER+", slug: "top-plus" },
  8: { label: "LEGENDARY PLAYER", slug: "legendary" },
  9: { label: "LEGENDARY PLAYER+", slug: "legendary-plus" },
};
const STAT_KEYS = ["kick", "technique", "block", "catch", "speed"];
const TOTAL_POWER_STAT_COEFFICIENTS = {
  kick: 10000,
  technique: 8000,
  block: 9000,
  catch: 7000,
};
const PASSIVE_EFFECT_TOTAL_POWER_COEFFICIENTS = {
  "\u30ad\u30c3\u30af\u52a0\u6e1b\u7b97": TOTAL_POWER_STAT_COEFFICIENTS.kick,
  "\u30c6\u30af\u30cb\u30c3\u30af\u52a0\u6e1b\u7b97": TOTAL_POWER_STAT_COEFFICIENTS.technique,
  "\u30d6\u30ed\u30c3\u30af\u52a0\u6e1b\u7b97": TOTAL_POWER_STAT_COEFFICIENTS.block,
  "\u30ad\u30e3\u30c3\u30c1\u52a0\u6e1b\u7b97": TOTAL_POWER_STAT_COEFFICIENTS.catch,
};
const MOVE_POWER_EFFECT_TYPE = "\u6280\u5a01\u529b\u52a0\u6e1b\u7b97";
const MOVE_CRITICAL_EFFECT_TYPE = "\u30af\u30ea\u30c6\u30a3\u30ab\u30eb\u78ba\u7387\u52a0\u6e1b\u7b97";
const MOVE_RANGE_EFFECT_TYPE = "\u6280\u5c04\u7a0b\u52a0\u6e1b\u7b97";
const ALL_MAIN_STATS_EFFECT_TYPE = "\u5168\u30d1\u30e9\u30e1\u30fc\u30bf\u52a0\u6e1b\u7b97";
const MOVE_POWER_EFFECT_TOTAL_POWER_MULTIPLIER = 10;
const MOVE_CRITICAL_EFFECT_TOTAL_POWER_DIVISOR = 10;
const MOVE_RANGE_EFFECT_TOTAL_POWER_MULTIPLIER = 6;
const DEFAULT_EQUIPMENT_LEVEL = 1;
const MAIN_COLLECTION_SLOT_COUNT = 5;
const STORAGE_KEY = "inazuma-album-state-v2";
const LANGUAGE_STORAGE_KEY = "inazuma-album-language";
const AVAILABLE_MODES = ["players", "coaches", "simulator", "comparison", "team", "collection", "publicProfile"];
const API_BASE_URL = String(window.INAZUMA_CONFIG?.apiBaseUrl || "http://localhost:4000").replace(/\/+$/, "");
const TEAM_SIZE = 5;
const EQUIPMENT_POSITIONS = ["FW", "MF", "DF", "GK"];
const EQUIPMENT_SCREEN_ORDER = [1, 2, 3, 5, 6, 4];
const EQUIPMENT_SLOT_LABELS = {
  "シューズ": "Chaussures",
  "ミサンガ": "Bracelet",
  "すね当て": "Chaussettes",
  "リストバンド": "Poignet",
  "グローブ": "Gants",
  "ペンダント": "Pendentif",
};

const els = {
  sectionEyebrow: document.querySelector("#sectionEyebrow"),
  modeButtons: [...document.querySelectorAll(".mode-tab")],
  dbMeta: document.querySelector("#dbMeta"),
  searchInput: document.querySelector("#searchInput"),
  teamFilter: document.querySelector("#teamFilter"),
  positionFilter: document.querySelector("#positionFilter"),
  elementFilter: document.querySelector("#elementFilter"),
  styleFilter: document.querySelector("#styleFilter"),
  seasonFilter: document.querySelector("#seasonFilter"),
  sortSelect: document.querySelector("#sortSelect"),
  playableToggle: document.querySelector("#playableToggle"),
  resultCount: document.querySelector("#resultCount"),
  albumSubhead: document.querySelector("#albumSubhead"),
  playerGrid: document.querySelector("#playerGrid"),
  playerDetail: document.querySelector("#playerDetail"),
  emptyTemplate: document.querySelector("#emptyTemplate"),
  skillModal: document.querySelector("#skillModal"),
  skillModalBody: document.querySelector("#skillModalBody"),
  skillModalClose: document.querySelector("#skillModalClose"),
  authOpenButton: document.querySelector("#authOpenButton"),
  authButtonLabel: document.querySelector("#authButtonLabel"),
  authModal: document.querySelector("#authModal"),
  authModalBody: document.querySelector("#authModalBody"),
  authModalClose: document.querySelector("#authModalClose"),
};

const assetSelects = new Map();

init();

async function init() {
  bindEvents();
  try {
    const [db, coachDb, formationDb] = await Promise.all([
      loadAlbumDatabase(),
      loadCoachDatabase().catch(() => ({ coaches: [] })),
      loadFormationDatabase().catch(() => ({ formations: {}, conditions: {} })),
    ]);
    state.players = db.players || [];
    state.statTables = db.stat_tables || {};
    state.coaches = coachDb.coaches || [];
    state.formations = formationDb.formations || {};
    state.formationConditions = formationDb.conditions || {};
    state.selectedId = state.players.find((player) => player.playable)?.id || state.players[0]?.id || null;
    state.selectedCoachId = state.coaches.find((coach) => !coach.enemy_only)?.id || state.coaches[0]?.id || null;
    restoreSavedState();
    ensureTeamBuilderDefaults();
    ensureComparisonDefaults();
    els.dbMeta.textContent = `${db.playable_count || 0} joueurs jouables / ${state.coaches.filter((coach) => !coach.enemy_only).length} entraîneurs - MAJ ${db.updated_at || "inconnue"}`;
    await bootstrapAccount();
    const publicUsername = publicProfileUsernameFromUrl();
    if (publicUsername) {
      await loadPublicProfile(publicUsername);
      state.mode = "publicProfile";
    }
    hydrateFilters();
    setMode(state.mode);
    finishBoot();
  } catch (error) {
    els.dbMeta.textContent = "Erreur de chargement";
    els.playerDetail.innerHTML = `<div class="empty-state"><h2>Lecture impossible</h2><p>${escapeHtml(error.message)}</p></div>`;
    finishBoot();
  }
}

function finishBoot() {
  document.body.classList.remove("is-booting");
  document.body.classList.add("is-ready");
}

async function loadAlbumDatabase() {
  const endpoints = ["data/album.json", "api/album"];
  let lastError = null;

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, { cache: "no-store" });
      const db = await response.json();
      if (!response.ok) {
        throw new Error(db.error || "Erreur API");
      }
      return db;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("Base album introuvable");
}

async function loadCoachDatabase() {
  const endpoints = ["data/coaches.json", "api/coaches"];
  let lastError = null;

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, { cache: "no-store" });
      const db = await response.json();
      if (!response.ok) {
        throw new Error(db.error || "Erreur API");
      }
      return db;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("Base entraîneurs introuvable");
}

async function loadFormationDatabase() {
  const endpoints = ["data/formations.json", "api/formations"];
  let lastError = null;

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, { cache: "no-store" });
      const db = await response.json();
      if (!response.ok) {
        throw new Error(db.error || "Erreur API");
      }
      return db;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("Base formations introuvable");
}

function restoreSavedState() {
  const saved = readSavedState();
  if (!saved) {
    return;
  }

  if (AVAILABLE_MODES.includes(saved.mode)) {
    state.mode = saved.mode;
  }
  if (saved.filters && typeof saved.filters === "object") {
    state.filters = {
      ...state.filters,
      ...pickObject(saved.filters, ["query", "team", "position", "element", "style", "season", "sort", "playableOnly"]),
    };
    state.filters.query = String(state.filters.query || "").toLowerCase();
    state.filters.playableOnly = Boolean(state.filters.playableOnly);
  }
  if (saved.coachFilters && typeof saved.coachFilters === "object") {
    state.coachFilters = {
      ...state.coachFilters,
      ...pickObject(saved.coachFilters, ["query", "sort", "showEnemy"]),
    };
    state.coachFilters.query = String(state.coachFilters.query || "").toLowerCase();
    state.coachFilters.showEnemy = Boolean(state.coachFilters.showEnemy);
  }
  if (saved.simulator && typeof saved.simulator === "object") {
    state.simulator = {
      ...state.simulator,
      ...pickObject(saved.simulator, ["level", "awakeningCode", "equipmentLevels", "equipmentLevelsByPosition"]),
    };
    state.simulator.level = clampNumber(state.simulator.level, 1, 300);
    state.simulator.awakeningCode = Number.isFinite(Number(state.simulator.awakeningCode)) ? Number(state.simulator.awakeningCode) : 9;
    state.simulator.equipmentLevels = normalizeSavedEquipmentLevels(state.simulator.equipmentLevels);
    state.simulator.equipmentLevelsByPosition = normalizeSavedEquipmentByPosition(state.simulator.equipmentLevelsByPosition);
  }
  if (saved.comparison && typeof saved.comparison === "object") {
    state.comparison = {
      ...state.comparison,
      ...pickObject(saved.comparison, [
        "level",
        "leftPlayerId",
        "rightPlayerId",
        "leftAwakeningCode",
        "rightAwakeningCode",
        "equipmentSource",
        "selectedSide",
      ]),
    };
    state.comparison.level = clampNumber(state.comparison.level, 1, 300);
    state.comparison.leftPlayerId = state.comparison.leftPlayerId == null ? null : String(state.comparison.leftPlayerId);
    state.comparison.rightPlayerId = state.comparison.rightPlayerId == null ? null : String(state.comparison.rightPlayerId);
    state.comparison.leftAwakeningCode = Number.isFinite(Number(state.comparison.leftAwakeningCode)) ? Number(state.comparison.leftAwakeningCode) : 9;
    state.comparison.rightAwakeningCode = Number.isFinite(Number(state.comparison.rightAwakeningCode)) ? Number(state.comparison.rightAwakeningCode) : 9;
    state.comparison.equipmentSource = ["base", "simulator", "collection"].includes(state.comparison.equipmentSource)
      ? state.comparison.equipmentSource
      : "base";
    state.comparison.selectedSide = state.comparison.selectedSide === "right" ? "right" : "left";
  }
  if (saved.teamBuilder && typeof saved.teamBuilder === "object") {
    state.teamBuilder = {
      ...state.teamBuilder,
      ...pickObject(saved.teamBuilder, ["selectedSlot", "coachId", "slots"]),
    };
    state.teamBuilder.selectedSlot = clampNumber(state.teamBuilder.selectedSlot, 0, TEAM_SIZE - 1);
    state.teamBuilder.coachId = state.teamBuilder.coachId == null ? null : String(state.teamBuilder.coachId);
    state.teamBuilder.slots = normalizeSavedTeamSlots(state.teamBuilder.slots);
  }

  if (saved.selectedId != null && state.players.some((player) => String(player.id) === String(saved.selectedId))) {
    state.selectedId = String(saved.selectedId);
  }
  if (saved.selectedCoachId != null && state.coaches.some((coach) => String(coach.id) === String(saved.selectedCoachId))) {
    state.selectedCoachId = String(saved.selectedCoachId);
  }
}

function readSavedState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
  } catch {
    return null;
  }
}

function saveState() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        mode: state.mode === "publicProfile" ? "players" : state.mode,
        selectedId: state.selectedId,
        selectedCoachId: state.selectedCoachId,
        filters: state.filters,
        coachFilters: state.coachFilters,
        simulator: state.simulator,
        comparison: state.comparison,
        teamBuilder: state.teamBuilder,
      }),
    );
  } catch {
    // Ignore storage failures, the app can still work without persistence.
  }
}

function pickObject(value, keys) {
  return Object.fromEntries(keys.filter((key) => Object.prototype.hasOwnProperty.call(value, key)).map((key) => [key, value[key]]));
}

function normalizeSavedEquipmentLevels(levels) {
  if (!levels || typeof levels !== "object") {
    return {};
  }
  return Object.fromEntries(Object.entries(levels).map(([slot, level]) => [slot, clampNumber(level, 1, 300)]));
}

function normalizeSavedEquipmentByPosition(levelsByPosition) {
  if (!levelsByPosition || typeof levelsByPosition !== "object") {
    return {};
  }
  return Object.fromEntries(EQUIPMENT_POSITIONS.map((position) => [position, normalizeSavedEquipmentLevels(levelsByPosition[position])]));
}

function normalizeSavedTeamSlots(slots) {
  const safeSlots = Array.isArray(slots) ? slots : [];
  return Array.from({ length: TEAM_SIZE }, (_, index) => {
    const slot = safeSlots[index] && typeof safeSlots[index] === "object" ? safeSlots[index] : {};
    return {
      playerId: slot.playerId == null ? null : String(slot.playerId),
      level: clampNumber(slot.level ?? 300, 1, 300),
      awakeningCode: Number.isFinite(Number(slot.awakeningCode)) ? Number(slot.awakeningCode) : 9,
    };
  });
}

function ensureTeamBuilderDefaults() {
  state.teamBuilder ||= {};
  state.teamBuilder.selectedSlot = clampNumber(state.teamBuilder.selectedSlot ?? 0, 0, TEAM_SIZE - 1);
  state.teamBuilder.coachId =
    state.coaches.some((coach) => String(coach.id) === String(state.teamBuilder.coachId))
      ? String(state.teamBuilder.coachId)
      : String(state.selectedCoachId || state.coaches.find((coach) => !coach.enemy_only)?.id || state.coaches[0]?.id || "");

  const playablePlayers = state.players.filter((player) => player.playable);
  const sourceSlots = normalizeSavedTeamSlots(state.teamBuilder.slots);
  state.teamBuilder.slots = sourceSlots.map((slot, index) => {
    const player = state.players.find((item) => String(item.id) === String(slot.playerId));
    const fallback = playablePlayers[index] || playablePlayers[0] || state.players[index] || state.players[0];
    const playerId = player?.id || fallback?.id || null;
    const finalPlayer = state.players.find((item) => String(item.id) === String(playerId));
    return {
      playerId: playerId == null ? null : String(playerId),
      level: clampNumber(slot.level, 1, 300),
      awakeningCode: finalPlayer ? normalizeAwakeningCodeForPlayer(finalPlayer, slot.awakeningCode) : slot.awakeningCode,
    };
  });
}

function ensureComparisonDefaults() {
  state.comparison ||= {};
  state.comparison.equipmentSource = ["base", "simulator", "collection"].includes(state.comparison.equipmentSource)
    ? state.comparison.equipmentSource
    : "base";
  if (state.comparison.equipmentSource === "collection" && !ownedCollectionEntries().length) {
    state.comparison.equipmentSource = "base";
  }
  const selectablePlayers = comparisonSelectablePlayers();
  const selectableIds = new Set(selectablePlayers.map((player) => String(player.id)));
  const savedLeft = playerById(state.comparison.leftPlayerId);
  const savedRight = playerById(state.comparison.rightPlayerId);
  const selectedPlayer = playerById(state.selectedId);
  const selectedFallback =
    selectedPlayer && (state.comparison.equipmentSource !== "collection" || selectableIds.has(String(selectedPlayer.id)))
      ? selectedPlayer
      : null;
  const fallbackLeft =
    (savedLeft && (state.comparison.equipmentSource !== "collection" || selectableIds.has(String(savedLeft.id))) ? savedLeft : null) ||
    selectedFallback ||
    selectablePlayers[0] ||
    state.players[0] ||
    null;
  const fallbackRight =
    (savedRight && (state.comparison.equipmentSource !== "collection" || selectableIds.has(String(savedRight.id))) ? savedRight : null) ||
    selectablePlayers.find((player) => String(player.id) !== String(fallbackLeft?.id)) ||
    state.players.find((player) => String(player.id) !== String(fallbackLeft?.id)) ||
    fallbackLeft;

  state.comparison.level = clampNumber(state.comparison.level ?? state.simulator.level ?? 300, 1, 300);
  state.comparison.leftPlayerId = fallbackLeft ? String(fallbackLeft.id) : null;
  state.comparison.rightPlayerId = fallbackRight ? String(fallbackRight.id) : null;
  state.comparison.leftAwakeningCode = fallbackLeft
    ? normalizeAwakeningCodeForPlayer(fallbackLeft, state.comparison.leftAwakeningCode ?? comparisonDefaultAwakeningCode(fallbackLeft))
    : 9;
  state.comparison.rightAwakeningCode = fallbackRight
    ? normalizeAwakeningCodeForPlayer(fallbackRight, state.comparison.rightAwakeningCode ?? comparisonDefaultAwakeningCode(fallbackRight))
    : 9;
  state.comparison.selectedSide = state.comparison.selectedSide === "right" ? "right" : "left";
}

function comparisonLaunchSourceForCurrentMode() {
  if (state.mode === "comparison") {
    return state.comparison?.equipmentSource || "base";
  }
  if (state.mode === "collection") {
    return "collection";
  }
  if (state.mode === "simulator") {
    return "simulator";
  }
  return "base";
}

function bindEvents() {
  els.modeButtons.forEach((button) => {
    button.addEventListener("click", () => setMode(button.dataset.mode || "players"));
  });

  els.authOpenButton?.addEventListener("click", () => openAuthModal(state.account.user ? "profile" : "login"));
  els.authModalClose?.addEventListener("click", closeAuthModal);
  els.authModal?.addEventListener("click", (event) => {
    if (event.target === els.authModal) {
      closeAuthModal();
    }
  });

  els.searchInput.addEventListener("input", (event) => {
    const value = event.target.value.trim().toLowerCase();
    if (state.mode === "coaches") {
      state.coachFilters.query = value;
    } else {
      state.filters.query = value;
    }
    applyCurrentFilters();
  });

  for (const [key, element] of [
    ["team", els.teamFilter],
    ["position", els.positionFilter],
    ["element", els.elementFilter],
    ["style", els.styleFilter],
    ["season", els.seasonFilter],
  ]) {
    element.addEventListener("change", (event) => {
      state.filters[key] = event.target.value;
      applyCurrentFilters();
    });
  }

  els.sortSelect.addEventListener("change", (event) => {
    if (state.mode === "coaches") {
      state.coachFilters.sort = event.target.value;
    } else {
      state.filters.sort = event.target.value;
    }
    applyCurrentFilters();
  });

  els.playableToggle.addEventListener("click", () => {
    if (state.mode === "collection") {
      state.filters.playableOnly = true;
      applyCurrentFilters();
      return;
    }
    if (state.mode === "coaches") {
      state.coachFilters.showEnemy = !state.coachFilters.showEnemy;
    } else {
      state.filters.playableOnly = !state.filters.playableOnly;
    }
    applyCurrentFilters();
  });

  els.skillModalClose.addEventListener("click", closeSkillModal);
  els.skillModal.addEventListener("click", (event) => {
    if (event.target === els.skillModal) {
      closeSkillModal();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAssetSelects();
    }
    if (event.key === "Escape" && !els.skillModal.hidden) {
      closeSkillModal();
    }
    if (event.key === "Escape" && els.authModal && !els.authModal.hidden) {
      closeAuthModal();
    }
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".asset-select")) {
      closeAssetSelects();
    }
  });
}

async function apiFetch(path, options = {}) {
  const headers = { ...(options.headers || {}) };
  if (options.body && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }
  if (!headers["X-API-Lang"]) {
    headers["X-API-Lang"] = currentLanguage();
  }
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: "include",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || data.error || "Erreur API");
  }
  return data;
}

function currentLanguage() {
  let configured = String(window.INAZUMA_CONFIG?.language || "fr").toLowerCase();
  try {
    configured = String(localStorage.getItem(LANGUAGE_STORAGE_KEY) || configured).toLowerCase();
  } catch {
    // Keep the default app language when localStorage is unavailable.
  }
  return configured.startsWith("en") ? "en" : "fr";
}

async function bootstrapAccount() {
  renderAuthButton();
  await refreshSession({ silent: true });
}

async function refreshSession({ silent = false } = {}) {
  try {
    const data = await apiFetch("/api/auth/me");
    state.account.user = data.user;
    state.account.error = "";
    await Promise.all([loadAvatars(), loadCollection()]);
  } catch (error) {
    state.account.user = null;
    state.account.collection = null;
    if (!silent) {
      state.account.error = error.message;
    }
  }
  renderAuthButton();
}

async function loadAvatars() {
  try {
    const data = await apiFetch("/api/avatars");
    state.account.avatars = data.avatars || [];
  } catch {
    state.account.avatars = [];
  }
}

async function loadCollection() {
  if (!state.account.user) {
    state.account.collection = null;
    return;
  }
  const data = await apiFetch("/api/collection");
  state.account.collection = data.collection;
}

async function loadPublicProfile(username) {
  state.publicProfileUsername = username;
  state.publicProfile = null;
  try {
    const data = await apiFetch(`/api/public/profile/${encodeURIComponent(username)}`);
    state.publicProfile = data.profile;
    state.publicProfileUsername = data.profile?.username || username;
  } catch (error) {
    state.publicProfile = { error: error.message, username };
  }
}

function publicProfileUsernameFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get("publicProfile");
  if (fromQuery) {
    return fromQuery.trim();
  }
  const path = window.location.pathname.replace(/^\/+|\/+$/g, "");
  const reserved = ["", "index.html", "public", "inazuma-album", "assets", "data", "api"];
  const firstSegment = path.split("/")[0] || "";
  if (!firstSegment || reserved.includes(firstSegment) || firstSegment.includes(".") || path.includes(".")) {
    return "";
  }
  return firstSegment;
}

function renderAuthButton() {
  if (!els.authOpenButton || !els.authButtonLabel) {
    return;
  }
  const user = state.account.user;
  els.authOpenButton.classList.toggle("is-authenticated", Boolean(user));
  const avatar = els.authOpenButton.querySelector(".auth-avatar");
  if (user) {
    els.authButtonLabel.textContent = user.username;
    if (avatar) {
      avatar.innerHTML = user.avatar ? `<img src="${escapeAttr(assetPath(user.avatar))}" alt="" />` : "";
    }
  } else {
    els.authButtonLabel.textContent = "Login / Register";
    if (avatar) {
      avatar.innerHTML = "";
    }
  }
}

function openAuthModal(view = "login") {
  state.account.authView = view;
  state.account.error = "";
  state.account.notice = "";
  renderAuthModal();
  els.authModal.hidden = false;
  document.body.classList.add("modal-open");
}

function closeAuthModal() {
  if (!els.authModal) {
    return;
  }
  els.authModal.hidden = true;
  els.authModalBody.innerHTML = "";
  if (!els.skillModal || els.skillModal.hidden) {
    document.body.classList.remove("modal-open");
  }
}

function setAuthNotice(message) {
  state.account.notice = message || "";
  state.account.error = "";
}

function setAuthError(error) {
  state.account.error = error?.message || String(error || "");
  state.account.notice = "";
}

function renderAuthModal() {
  if (!els.authModalBody) {
    return;
  }
  const view = state.account.user && state.account.authView !== "deleteAccount" ? "profile" : state.account.authView;
  const notice = state.account.notice ? `<p class="auth-notice">${escapeHtml(state.account.notice)}</p>` : "";
  const error = state.account.error ? `<p class="auth-error">${escapeHtml(state.account.error)}</p>` : "";
  if (view === "register") {
    els.authModalBody.innerHTML = `
      <header class="auth-head">
        <p>Compte Inazuma Cross Album</p>
        <h2 id="authModalTitle">Register</h2>
      </header>
      <form id="registerForm" class="auth-form">
        ${notice}${error}
        <label><span>Email</span><input name="email" type="email" autocomplete="email" required /></label>
        <label><span>Username</span><input name="username" type="text" autocomplete="username" minlength="3" maxlength="24" required /></label>
        <label class="privacy-consent">
          <input name="privacyAccepted" type="checkbox" required />
          <span>J'accepte la <button class="inline-link" type="button" id="privacyPolicyButton">privacy policy</button>.</span>
        </label>
        <button class="primary-action" type="submit">Creer le compte</button>
        <button class="link-action" type="button" data-auth-view="login">J'ai deja un compte</button>
      </form>
    `;
    bindAuthViewLinks();
    els.authModalBody.querySelector("#registerForm").addEventListener("submit", handleRegister);
    els.authModalBody.querySelector("#privacyPolicyButton").addEventListener("click", openPrivacyPolicyModal);
    return;
  }
  if (view === "deleteAccount") {
    renderDeleteAccountModal(notice, error);
    return;
  }
  if (view === "verify" || view === "loginCode") {
    const isLoginCode = view === "loginCode";
    els.authModalBody.innerHTML = `
      <header class="auth-head">
        <p>${isLoginCode ? "Connexion par email" : "Verification email"}</p>
        <h2 id="authModalTitle">Code a 6 chiffres</h2>
      </header>
      <form id="verifyForm" class="auth-form" data-auth-purpose="${isLoginCode ? "login" : "register"}">
        ${notice}${error}
        <label><span>Email</span><input name="email" type="email" value="${escapeAttr(state.account.pendingEmail)}" required /></label>
        <label><span>Code</span><input name="code" type="text" inputmode="numeric" pattern="[0-9]{6}" maxlength="6" required /></label>
        <button class="primary-action" type="submit">${isLoginCode ? "Se connecter" : "Verifier"}</button>
        <button class="link-action" type="button" id="resendVerificationButton">Renvoyer le code</button>
        <button class="link-action" type="button" data-auth-view="login">Retour login</button>
      </form>
    `;
    bindAuthViewLinks();
    els.authModalBody.querySelector("#verifyForm").addEventListener("submit", handleVerify);
    els.authModalBody.querySelector("#resendVerificationButton").addEventListener("click", handleResendVerification);
    return;
  }
  if (view === "profile") {
    renderProfileModal(notice, error);
    return;
  }
  els.authModalBody.innerHTML = `
    <header class="auth-head">
      <p>Compte Inazuma Cross Album</p>
      <h2 id="authModalTitle">Login</h2>
    </header>
    <form id="loginForm" class="auth-form">
      ${notice}${error}
      <label><span>Email</span><input name="email" type="email" autocomplete="email" required /></label>
      <button class="primary-action" type="submit">Recevoir un code</button>
      <button class="link-action" type="button" data-auth-view="register">Creer un compte</button>
      <button class="link-action" type="button" data-auth-view="verify">Verifier un code</button>
    </form>
  `;
  bindAuthViewLinks();
  els.authModalBody.querySelector("#loginForm").addEventListener("submit", handleLogin);
}

function renderProfileModal(notice, error) {
  const user = state.account.user;
  if (!user) {
    state.account.authView = "login";
    renderAuthModal();
    return;
  }
  const avatars = state.account.avatars.length ? state.account.avatars : [user.avatar].filter(Boolean);
  const selectedAvatar = user.avatar || avatars[0] || "";
  els.authModalBody.innerHTML = `
    <header class="auth-head">
      <p>Profil</p>
      <h2 id="authModalTitle">${escapeHtml(user.username)}</h2>
    </header>
    <form id="profileForm" class="auth-form">
      ${notice}${error}
      <div class="profile-summary">
        <span class="profile-avatar profile-avatar-preview">${selectedAvatar ? `<img src="${escapeAttr(assetPath(selectedAvatar))}" alt="" />` : ""}</span>
        <div>
          <strong>${escapeHtml(user.username)}</strong>
          <span>${escapeHtml(user.email)}</span>
        </div>
      </div>
      <label><span>Numero serveur</span><input name="serverNumber" type="number" min="1" max="99999" value="${escapeAttr(user.serverNumber || "")}" /></label>
      <input name="avatar" type="hidden" value="${escapeAttr(selectedAvatar)}" />
      <div class="avatar-preview-grid" aria-label="Avatar">
        ${avatars
          .slice(0, 42)
          .map(
            (avatar) => `
              <button class="avatar-choice${avatar === selectedAvatar ? " is-active" : ""}" type="button" data-avatar="${escapeAttr(avatar)}" aria-pressed="${avatar === selectedAvatar ? "true" : "false"}">
                <img src="${escapeAttr(assetPath(avatar))}" alt="" />
              </button>
            `,
          )
          .join("")}
      </div>
      <button class="primary-action" type="submit">Enregistrer</button>
      <button class="secondary-action" type="button" id="logoutButton">Logout</button>
      <button class="danger-action" type="button" id="deleteAccountButton">Supprimer compte</button>
    </form>
  `;
  const avatarInput = els.authModalBody.querySelector("input[name='avatar']");
  const avatarPreview = els.authModalBody.querySelector(".profile-avatar-preview");
  els.authModalBody.querySelectorAll("[data-avatar]").forEach((button) => {
    button.addEventListener("click", () => {
      avatarInput.value = button.dataset.avatar || "";
      if (avatarPreview) {
        avatarPreview.innerHTML = avatarInput.value ? `<img src="${escapeAttr(assetPath(avatarInput.value))}" alt="" />` : "";
      }
      els.authModalBody.querySelectorAll(".avatar-choice").forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });
    });
  });
  els.authModalBody.querySelector("#profileForm").addEventListener("submit", handleProfileUpdate);
  els.authModalBody.querySelector("#logoutButton").addEventListener("click", handleLogout);
  els.authModalBody.querySelector("#deleteAccountButton").addEventListener("click", handleDeleteAccountRequest);
}

function renderDeleteAccountModal(notice, error) {
  const user = state.account.user;
  if (!user) {
    state.account.authView = "login";
    renderAuthModal();
    return;
  }
  els.authModalBody.innerHTML = `
    <header class="auth-head danger-head">
      <p>Suppression de compte</p>
      <h2 id="authModalTitle">Code a 6 chiffres</h2>
    </header>
    <form id="deleteAccountForm" class="auth-form">
      ${notice}${error}
      <p class="auth-warning">Cette action supprime votre email, username, profil et collection.</p>
      <label><span>Code recu par email</span><input name="code" type="text" inputmode="numeric" pattern="[0-9]{6}" maxlength="6" required /></label>
      <button class="danger-action" type="submit">Supprimer definitivement</button>
      <button class="link-action" type="button" data-auth-view="profile">Retour profil</button>
    </form>
  `;
  bindAuthViewLinks();
  els.authModalBody.querySelector("#deleteAccountForm").addEventListener("submit", handleDeleteAccountConfirm);
}

function bindAuthViewLinks() {
  els.authModalBody.querySelectorAll("[data-auth-view]").forEach((button) => {
    button.addEventListener("click", () => {
      state.account.authView = button.dataset.authView || "login";
      state.account.error = "";
      state.account.notice = "";
      renderAuthModal();
    });
  });
}

async function handleRegister(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  try {
    const data = await apiFetch("/api/auth/register", {
      method: "POST",
      body: {
        email: form.get("email"),
        username: form.get("username"),
        privacyAccepted: form.get("privacyAccepted") === "on",
      },
    });
    state.account.pendingEmail = String(form.get("email") || "");
    state.account.authView = "verify";
    setAuthNotice(data.message);
  } catch (error) {
    setAuthError(error);
  }
  renderAuthModal();
}

function openPrivacyPolicyModal() {
  els.skillModal.classList.remove("is-equipment-modal");
  els.skillModal.classList.add("is-privacy-modal");
  els.skillModalBody.innerHTML = `
    <header class="modal-skill-head">
      <span></span>
      <div>
        <p>Compte Inazuma Cross Album</p>
        <h2 id="skillModalTitle">Privacy policy</h2>
      </div>
    </header>
    <div class="privacy-policy-body">
      <p>Les donnees de compte servent uniquement a faire fonctionner le profil, la collection et la connexion par email.</p>
      <p>Aucune donnee n'est partagee avec des tiers ou vendue.</p>
      <p>En cas de probleme avec vos donnees, contactez <a href="mailto:tom@ownstudio.fr">tom@ownstudio.fr</a>.</p>
      <p>Pour supprimer votre profil, allez sur votre profil et cliquez sur le bouton supprimer compte. La suppression demande un code de validation a 6 chiffres envoye par email.</p>
    </div>
  `;
  els.skillModal.hidden = false;
  document.body.classList.add("modal-open");
  els.skillModalClose.focus();
}

async function handleDeleteAccountRequest() {
  try {
    const data = await apiFetch("/api/auth/delete-account/request", { method: "POST" });
    state.account.authView = "deleteAccount";
    setAuthNotice(data.message);
  } catch (error) {
    setAuthError(error);
  }
  renderAuthModal();
}

async function handleDeleteAccountConfirm(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  try {
    await apiFetch("/api/auth/delete-account/confirm", {
      method: "POST",
      body: {
        code: form.get("code"),
      },
    });
    state.account.user = null;
    state.account.collection = null;
    state.account.avatars = [];
    state.account.authView = "login";
    state.account.notice = "";
    state.account.error = "";
    renderAuthButton();
    closeAuthModal();
    applyCurrentFilters();
  } catch (error) {
    setAuthError(error);
    renderAuthModal();
  }
}

async function handleVerify(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const purpose = event.currentTarget.dataset.authPurpose || "register";
  const endpoint = purpose === "login" ? "/api/auth/verify-login" : "/api/auth/verify-email";
  try {
    const data = await apiFetch(endpoint, {
      method: "POST",
      body: {
        email: form.get("email"),
        code: form.get("code"),
      },
    });
    state.account.user = data.user;
    await Promise.all([loadAvatars(), loadCollection()]);
    renderAuthButton();
    closeAuthModal();
    applyCurrentFilters();
  } catch (error) {
    setAuthError(error);
    renderAuthModal();
  }
}

async function handleResendVerification() {
  const email = els.authModalBody.querySelector("input[name='email']")?.value || state.account.pendingEmail;
  const isLoginCode = state.account.authView === "loginCode";
  try {
    const data = await apiFetch(isLoginCode ? "/api/auth/login" : "/api/auth/resend-verification", {
      method: "POST",
      body: { email },
    });
    state.account.pendingEmail = email;
    if (data.purpose === "register") {
      state.account.authView = "verify";
    }
    setAuthNotice(data.message);
  } catch (error) {
    setAuthError(error);
  }
  renderAuthModal();
}

async function handleLogin(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  try {
    const data = await apiFetch("/api/auth/login", {
      method: "POST",
      body: {
        email: form.get("email"),
      },
    });
    state.account.pendingEmail = String(form.get("email") || "");
    state.account.authView = data.purpose === "register" ? "verify" : "loginCode";
    setAuthNotice(data.message);
  } catch (error) {
    setAuthError(error);
  }
  renderAuthModal();
}

async function handleProfileUpdate(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  try {
    const data = await apiFetch("/api/users/me/profile", {
      method: "PATCH",
      body: {
        avatar: form.get("avatar"),
        serverNumber: form.get("serverNumber") || null,
      },
    });
    state.account.user = data.user;
    setAuthNotice(data.message);
    renderAuthButton();
  } catch (error) {
    setAuthError(error);
  }
  renderAuthModal();
  applyCurrentFilters();
}

async function handleLogout() {
  try {
    await apiFetch("/api/auth/logout", { method: "POST" });
  } catch {
    // Cookie removal is still reflected client-side.
  }
  state.account.user = null;
  state.account.collection = null;
  renderAuthButton();
  closeAuthModal();
  applyCurrentFilters();
}


function setMode(mode) {
  state.mode = AVAILABLE_MODES.includes(mode) ? mode : "players";
  document.body.dataset.mode = state.mode;
  els.modeButtons.forEach((button) => {
    const active = button.dataset.mode === state.mode;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  });

  if (state.mode === "publicProfile") {
    els.sectionEyebrow.textContent = "Profil public";
    els.searchInput.placeholder = "Profil public";
    els.searchInput.value = "";
    els.albumSubhead.textContent = state.publicProfileUsername ? "/" + state.publicProfileUsername : "Profil partagé";
    setSortOptions([["name_asc", "Nom"]]);
    els.sortSelect.value = "name_asc";
  } else if (state.mode === "collection") {
    state.filters.playableOnly = true;
    els.sectionEyebrow.textContent = "Ma collection";
    els.searchInput.placeholder = "Ajouter un joueur jouable...";
    els.searchInput.value = state.filters.query;
    els.albumSubhead.textContent = "Gestion du profil, des 5 principaux et des equipements";
    setSortOptions([
      ["name_asc", "Nom"],
      ["power_desc", "Puissance"],
      ["rarity_desc", "Étoiles"],
    ]);
    els.sortSelect.value = state.filters.sort;
  } else if (state.mode === "coaches") {
    els.sectionEyebrow.textContent = "Album entraîneurs";
    els.searchInput.placeholder = "Nom, code, formation, passif...";
    els.searchInput.value = state.coachFilters.query;
    els.albumSubhead.textContent = "Lv.10 / passif max";
    setSortOptions([
      ["name_asc", "Nom"],
      ["power_desc", "Bonus global"],
      ["code_asc", "Code"],
    ]);
    els.sortSelect.value = state.coachFilters.sort;
  } else if (state.mode === "simulator") {
    els.sectionEyebrow.textContent = "Simulateur joueur";
    els.searchInput.placeholder = "Choisir un joueur, équipe, technique...";
    els.searchInput.value = state.filters.query;
    els.albumSubhead.textContent = "Stats selon niveau / eveil / equipements";
    setSortOptions([
      ["name_asc", "Nom"],
      ["power_desc", "Puissance"],
      ["rarity_desc", "Étoiles"],
    ]);
    els.sortSelect.value = state.filters.sort;
  } else if (state.mode === "comparison") {
    ensureComparisonDefaults();
    els.sectionEyebrow.textContent = "Comparaison joueurs";
    els.searchInput.placeholder = "Chercher un joueur a comparer...";
    els.searchInput.value = state.filters.query;
    els.albumSubhead.textContent = "Deux joueurs, niveau commun, eveil separe";
    setSortOptions([
      ["name_asc", "Nom"],
      ["power_desc", "Puissance"],
      ["rarity_desc", "Etoiles"],
    ]);
    els.sortSelect.value = state.filters.sort;
  } else if (state.mode === "team") {
    ensureTeamBuilderDefaults();
    els.sectionEyebrow.textContent = "Build équipe";
    els.searchInput.placeholder = "Choisir les 5 joueurs...";
    els.searchInput.value = state.filters.query;
    els.albumSubhead.textContent = "Clique un slot puis un joueur";
    setSortOptions([
      ["name_asc", "Nom"],
      ["power_desc", "Puissance"],
      ["rarity_desc", "Étoiles"],
    ]);
    els.sortSelect.value = state.filters.sort;
  } else {
    els.sectionEyebrow.textContent = "Album joueurs";
    els.searchInput.placeholder = "Nom, équipe, technique...";
    els.searchInput.value = state.filters.query;
    els.albumSubhead.textContent = "Lv.300 / éveil max / équipement Lv.1";
    setSortOptions([
      ["name_asc", "Nom"],
      ["power_desc", "Puissance"],
      ["rarity_desc", "Étoiles"],
    ]);
    els.sortSelect.value = state.filters.sort;
  }

  applyCurrentFilters();
}

function setSortOptions(options) {
  els.sortSelect.innerHTML = options
    .map(([value, label]) => `<option value="${escapeAttr(value)}">${escapeHtml(label)}</option>`)
    .join("");
}

function applyCurrentFilters() {
  if (state.mode === "publicProfile") {
    renderPublicProfileView();
    saveState();
    return;
  }
  if (state.mode === "coaches") {
    applyCoachFilters();
    return;
  }
  applyFilters();
}

function hydrateFilters() {
  setupAssetSelects();
  syncFilterOptions();
}

function setOptions(select, allLabel, values, labeler = (value) => value) {
  select.innerHTML = [
    `<option value="all">${escapeHtml(allLabel)}</option>`,
    ...values.map((value) => `<option value="${escapeAttr(value)}">${escapeHtml(labeler(value))}</option>`),
  ].join("");
}

function setupAssetSelects() {
  [
    { key: "team", element: els.teamFilter, tagKind: "team" },
    { key: "position", element: els.positionFilter },
    { key: "element", element: els.elementFilter },
    { key: "style", element: els.styleFilter, tagKind: "play_style" },
    { key: "season", element: els.seasonFilter, tagKind: "season" },
  ].forEach((config) => {
    const select = config.element;
    if (!select || assetSelects.has(select)) {
      return;
    }

    select.classList.add("native-asset-select");
    const shell = document.createElement("div");
    shell.className = "asset-select";
    shell.dataset.filterKey = config.key;
    shell.innerHTML = `
      <button class="asset-select-button" type="button" aria-haspopup="listbox" aria-expanded="false">
        <span class="asset-select-current"></span>
        <span class="asset-select-arrow" aria-hidden="true">▾</span>
      </button>
      <div class="asset-select-menu" role="listbox" hidden></div>
    `;

    select.insertAdjacentElement("afterend", shell);
    const button = shell.querySelector(".asset-select-button");
    const menu = shell.querySelector(".asset-select-menu");
    button.addEventListener("click", () => toggleAssetSelect(select));
    menu.addEventListener("click", (event) => {
      const option = event.target.closest("[data-asset-option]");
      if (!option) {
        return;
      }
      select.value = option.dataset.value;
      select.dispatchEvent(new Event("change", { bubbles: true }));
      closeAssetSelects();
    });

    assetSelects.set(select, { ...config, shell, button, menu });
  });
}

function refreshAssetSelect(select) {
  const control = assetSelects.get(select);
  if (!control) {
    return;
  }
  const options = [...select.options];
  const selected = select.selectedOptions[0] || options[0] || null;
  control.shell.classList.toggle("is-disabled", select.disabled);
  control.button.disabled = select.disabled;
  control.button.querySelector(".asset-select-current").innerHTML = selected
    ? renderAssetSelectOption(control, selected.value, selected.textContent, true)
    : "";
  control.menu.innerHTML = options
    .map((option) => {
      const selectedClass = option.value === select.value ? " is-selected" : "";
      return `
        <button class="asset-select-option${selectedClass}" type="button" role="option" data-asset-option data-value="${escapeAttr(option.value)}" aria-selected="${option.value === select.value ? "true" : "false"}">
          ${renderAssetSelectOption(control, option.value, option.textContent)}
        </button>
      `;
    })
    .join("");
}

function renderAssetSelectOption(control, value, label, compact = false) {
  const icon = filterOptionIcon(control, value);
  const iconHtml = icon
    ? `<span class="asset-select-icon"><img src="${escapeAttr(icon)}" alt="" /></span>`
    : `<span class="asset-select-icon is-empty" aria-hidden="true"></span>`;
  return `
    ${iconHtml}
    <span class="asset-select-label${compact ? " is-current" : ""}">${escapeHtml(label)}</span>
  `;
}

function toggleAssetSelect(select) {
  const control = assetSelects.get(select);
  if (!control || control.button.disabled) {
    return;
  }
  const open = control.menu.hidden;
  closeAssetSelects();
  control.menu.hidden = !open;
  control.shell.classList.toggle("is-open", open);
  control.button.setAttribute("aria-expanded", String(open));
}

function closeAssetSelects() {
  assetSelects.forEach((control) => {
    control.menu.hidden = true;
    control.shell.classList.remove("is-open");
    control.button.setAttribute("aria-expanded", "false");
  });
}

function filterOptionIcon(control, value) {
  if (!value || value === "all") {
    return "";
  }
  if (control.key === "position") {
    return uiAssets.positions[value] ? assetPath(uiAssets.positions[value]) : "";
  }
  if (control.key === "element") {
    return uiAssets.elements[value] ? assetPath(uiAssets.elements[value]) : "";
  }
  const tag = tagByLabel(value, control.tagKind);
  return tagIconPath(tag || value, control.tagKind);
}

function tagByLabel(value, kind) {
  return state.players
    .flatMap((player) => player.tags || [])
    .find((tag) => (!kind || tag.kind === kind) && tagLabel(tag) === value);
}

function syncFilterOptions() {
  let changed = false;
  for (let index = 0; index < 4; index += 1) {
    const passChanged = updateFilterOptionsPass();
    changed = changed || passChanged;
    if (!passChanged) {
      break;
    }
  }
  return changed;
}

function updateFilterOptionsPass() {
  let changed = false;
  const specs = [
    {
      key: "team",
      element: els.teamFilter,
      allLabel: "Toutes",
      values: (players) => uniqueTagValues(players, "team"),
    },
    {
      key: "position",
      element: els.positionFilter,
      allLabel: "Tous",
      values: (players) => uniqueValues(players.map((player) => player.position?.code).filter(Boolean)),
      labeler: (value) => `${value} - ${labels.positions[value] || value}`,
    },
    {
      key: "element",
      element: els.elementFilter,
      allLabel: "Tous",
      values: (players) => uniqueValues(players.map((player) => player.element?.code).filter(Boolean)),
      labeler: (value) => labels.elements[value] || value,
    },
    {
      key: "style",
      element: els.styleFilter,
      allLabel: "Tous",
      values: (players) => uniqueTagValues(players, "play_style"),
    },
    {
      key: "season",
      element: els.seasonFilter,
      allLabel: "Toutes",
      values: (players) => uniqueTagValues(players, "season"),
    },
  ];

  for (const spec of specs) {
    const values = spec.values(playersForFilterOptions(spec.key));
    if (state.filters[spec.key] !== "all" && !values.includes(state.filters[spec.key])) {
      state.filters[spec.key] = "all";
      changed = true;
    }
    setOptions(spec.element, spec.allLabel, values, spec.labeler);
    spec.element.value = state.filters[spec.key];
    refreshAssetSelect(spec.element);
  }

  return changed;
}

function playersForFilterOptions(excludedKey) {
  const filters = state.filters;
  return state.players.filter((player) => {
    const matchesQuery = !filters.query || searchableText(player).includes(filters.query);
    const matchesTeam = excludedKey === "team" || filters.team === "all" || hasTag(player, "team", filters.team);
    const matchesPosition = excludedKey === "position" || filters.position === "all" || player.position?.code === filters.position;
    const matchesElement = excludedKey === "element" || filters.element === "all" || player.element?.code === filters.element;
    const matchesStyle = excludedKey === "style" || filters.style === "all" || hasTag(player, "play_style", filters.style);
    const matchesSeason = excludedKey === "season" || filters.season === "all" || hasTag(player, "season", filters.season);
    const matchesPlayable = !filters.playableOnly || player.playable;
    return matchesPlayable && matchesQuery && matchesTeam && matchesPosition && matchesElement && matchesStyle && matchesSeason;
  });
}

function uniqueTagValues(players, kind) {
  return uniqueValues(
    players
      .flatMap((player) => player.tags.filter((tag) => tag.kind === kind).map(tagLabel))
      .filter(Boolean),
  );
}

function uniqueValues(values) {
  return [...new Set(values)].sort((a, b) => String(a).localeCompare(String(b), "fr"));
}

function maxBy(items, key) {
  return items.reduce((best, item) => {
    if (!best) {
      return item;
    }
    return Number(item?.[key] || 0) > Number(best?.[key] || 0) ? item : best;
  }, null);
}

function applyFilters() {
  syncFilterOptions();
  const filters = state.filters;
  state.filtered = state.players
    .filter((player) => {
      const matchesQuery = !filters.query || searchableText(player).includes(filters.query);
      const matchesTeam = filters.team === "all" || hasTag(player, "team", filters.team);
      const matchesPosition = filters.position === "all" || player.position?.code === filters.position;
      const matchesElement = filters.element === "all" || player.element?.code === filters.element;
      const matchesStyle = filters.style === "all" || hasTag(player, "play_style", filters.style);
      const matchesSeason = filters.season === "all" || hasTag(player, "season", filters.season);
      const matchesPlayable = !filters.playableOnly || player.playable;
      return matchesPlayable && matchesQuery && matchesTeam && matchesPosition && matchesElement && matchesStyle && matchesSeason;
    })
    .sort(sortPlayers(filters.sort));

  if (!state.filtered.some((player) => player.id === state.selectedId)) {
    state.selectedId = state.filtered[0]?.id || null;
  }

  renderGrid();
  renderDetail();
  saveState();
}

function applyCoachFilters() {
  const filters = state.coachFilters;
  state.filteredCoaches = state.coaches
    .filter((coach) => {
      const matchesQuery = !filters.query || searchableCoachText(coach).includes(filters.query);
      const matchesEnemy = filters.showEnemy || !coach.enemy_only;
      return matchesQuery && matchesEnemy;
    })
    .sort(sortCoaches(filters.sort));

  if (!state.filteredCoaches.some((coach) => coach.id === state.selectedCoachId)) {
    state.selectedCoachId = state.filteredCoaches[0]?.id || null;
  }

  renderCoachGrid();
  renderCoachDetail();
  saveState();
}

function searchableCoachText(coach) {
  return [
    coach.id,
    coach.code,
    coach.formation_code,
    coach.names?.fr,
    coach.names?.display_fr,
    coach.names?.jp,
    coach.passive?.name,
    coach.passive?.current_description,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function sortCoaches(sort) {
  return (a, b) => {
    if (sort === "power_desc") {
      return (b.total_power || 0) - (a.total_power || 0) || displayName(a).localeCompare(displayName(b), "fr");
    }
    if (sort === "code_asc") {
      return (a.code || 0) - (b.code || 0);
    }
    return displayName(a).localeCompare(displayName(b), "fr");
  };
}

function renderCoachGrid() {
  const count = state.filteredCoaches.length;
  const showingEnemy = state.coachFilters.showEnemy;
  els.resultCount.textContent = `${count} entraîneur${count > 1 ? "s" : ""}${showingEnemy ? "" : " disponibles"}`;
  els.playableToggle.innerHTML = `<span>Tous</span><span class="toggle-track" aria-hidden="true"><span class="toggle-thumb"></span></span>`;
  els.playableToggle.setAttribute("aria-pressed", String(showingEnemy));
  els.playableToggle.setAttribute("aria-label", showingEnemy ? "Masquer les entraîneurs adverses" : "Afficher tous les entraîneurs");

  if (!count) {
    els.playerGrid.innerHTML = "";
    return;
  }

  els.playerGrid.innerHTML = state.filteredCoaches
    .map((coach) => {
      const active = coach.id === state.selectedCoachId ? " is-active" : "";
      const enemyClass = coach.enemy_only ? " is-npc" : "";
      const portrait = imageUrl(coach, "portrait") || imageUrl(coach, "fullbody");
      return `
        <button class="album-card coach-card${active}${enemyClass}" type="button" data-coach-id="${escapeAttr(coach.id)}">
          <span class="portrait-frame coach-portrait-frame">
            ${portrait ? `<img src="${escapeAttr(portrait)}" alt="" />` : `<span>${escapeHtml(initials(displayName(coach)))}</span>`}
          </span>
          <span class="album-card-body">
            <span class="album-card-title-row">
              <strong>${escapeHtml(displayName(coach))}</strong>
              ${coach.enemy_only ? `<span class="non-playable-badge">ADV</span>` : ""}
            </span>
            <span class="mini-meta coach-mini-meta">
              <span class="coach-level-pill">Lv.${escapeHtml(coach.level || 10)}</span>
            </span>
          </span>
        </button>
      `;
    })
    .join("");

  els.playerGrid.querySelectorAll(".album-card").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedCoachId = button.dataset.coachId;
      renderCoachGrid();
      renderCoachDetail();
      saveState();
    });
  });
}

function renderCoachDetail() {
  const coach = state.coaches.find((item) => item.id === state.selectedCoachId);
  if (!coach) {
    els.playerDetail.innerHTML = els.emptyTemplate.innerHTML.replaceAll("joueur", "entraîneur");
    return;
  }
  const formation = getCoachFormation(coach);

  els.playerDetail.innerHTML = `
    <section class="coach-detail-view">
      <div class="coach-backdrop">${renderModel(coach)}</div>
      <header class="coach-game-head">
        <div>
          <p>${escapeHtml(coach.enemy_only ? "Entraîneur adverse" : "Entraîneur")}</p>
          <h2>${escapeHtml(displayName(coach))}</h2>
          <strong>Lv.${escapeHtml(coach.level || 10)}</strong>
        </div>
        <div class="coach-total">
          <span>Bonus équipe</span>
          <strong>${formatNumber(coach.total_power)}</strong>
        </div>
      </header>

      <article class="coach-game-card">
        <div class="coach-card-tab">
          <strong>${escapeHtml(formation?.name || `Formation ${coach.formation_code || "-"}`)}</strong>
          <span>Information formation</span>
        </div>

        <div class="coach-formation-row">
          ${renderFormationPitch(formation)}
          ${renderFormationRequirements(formation)}
        </div>

        ${renderCoachSkillSection("Actif - formation", "Formation passive", formation?.passive, { details: false })}
        ${renderCoachSkillSection("Passif entraîneur", "Coach passive", coach.passive)}
      </article>

    </section>
  `;

  els.playerDetail.querySelectorAll("[data-coach-skill-id]").forEach((button) => {
    button.addEventListener("click", () => {
      openCoachSkillModal(coach, button.dataset.coachSkillId);
    });
  });
}

function getCoachFormation(coach) {
  return state.formations?.[String(coach?.formation_code || "")] || null;
}

function renderFormationPitch(formation) {
  const slots = formation?.slots || [];
  if (!slots.length) {
    return `<div class="formation-pitch is-empty">Formation inconnue</div>`;
  }
  return `
    <div class="formation-pitch" aria-label="Placement formation">
      ${slots.map(renderFormationSlot).join("")}
    </div>
  `;
}

function renderFormationSlot(slot) {
  const left = formationSlotLeft(slot.x);
  const top = formationSlotTop(slot.y);
  const pos = String(slot.position || "").toLowerCase();
  const condition = slot.condition_type_jp ? " has-condition" : "";
  const slotAsset = formationPositionSlotAsset(pos);
  const assetClass = slotAsset ? " has-slot-asset" : "";
  const assetStyle = slotAsset ? `;--slot-image:url('${escapeAttr(assetPath(slotAsset))}')` : "";
  const positionIcon = slotAsset ? "" : formationSlotPositionIcon(pos, slot.position || "");
  return `
    <span class="formation-slot formation-slot-${escapeAttr(pos)}${condition}${assetClass}" style="left:${left}%;top:${top}%${assetStyle}">
      <strong>${escapeHtml(slot.number)}</strong>
      ${positionIcon ? `<em>${positionIcon}</em>` : ""}
    </span>
  `;
}

function formationSlotLeft(value) {
  return Math.min(92, Math.max(8, ((Number(value || 0) + 1) / 2) * 100));
}

function formationSlotTop(value) {
  const y = Number(value || 0);
  return Math.min(94, Math.max(8, 91.3 - y * 92.2));
}

function formationPositionSlotAsset(pos) {
  return uiAssets.coachFormationSlots[pos] || "";
}

function formationSlotPositionIcon(pos, label) {
  const code = String(pos || "").toUpperCase();
  const icon = uiAssets.positions[code];
  if (icon) {
    return `<img src="${escapeAttr(assetPath(icon))}" alt="${escapeAttr(label)}" />`;
  }
  return escapeHtml(label);
}

function renderFormationRequirements(formation) {
  const requirements = (formation?.slots || []).filter((slot) => slot.condition_type_jp || slot.condition_value_jp);
  const rows = Array.from({ length: 5 }, (_, index) =>
    requirements[index] ? renderFormationRequirement(requirements[index]) : `<div class="formation-requirement is-empty" aria-hidden="true"></div>`,
  ).join("");
  return `
    <aside class="formation-requirements">
      <h3>Conditions</h3>
      <div class="formation-requirement-list">${rows}</div>
    </aside>
  `;
}

function renderFormationRequirement(slot) {
  const label = formatFormationCondition(slot);
  const visual = renderFormationConditionVisual(slot);
  const wide = visual.includes("is-multi") ? " has-wide-condition" : "";
  return `
    <div class="formation-requirement${wide}" title="${escapeAttr(label)}">
      <strong>${escapeHtml(slot.number)}</strong>
      <span>${visual}</span>
    </div>
  `;
}

function renderFormationConditionVisual(slot) {
  if (slot.condition_type_jp === "本職ポジション") {
    const code = slot.condition_value_jp || slot.position || "";
    return renderPositionBadge({ code, fr: labels.positions[code] || code }, { compact: true });
  }
  if (slot.condition_type_jp === "タグ") {
    const tags = String(slot.condition_value_jp || "")
      .split(/[、,]/)
      .map((value) => tagFromJp(value.trim()))
      .filter(Boolean);
    const icons = tags
      .map((tag) => {
        const icon = tagIconPath(tag, "team");
        return icon ? `<img src="${escapeAttr(icon)}" alt="" title="${escapeAttr(tagLabel(tag))}" />` : "";
      })
      .filter(Boolean);
    if (icons.length) {
      return `<span class="formation-condition-token tag-chip${icons.length > 1 ? " is-multi" : ""}" title="${escapeAttr(tags.map(tagLabel).join(" / "))}">${icons.join("")}</span>`;
    }
  }
  if (slot.condition_type_jp === "属性") {
    const code = elementCodeFromJp(slot.condition_value_jp);
    if (code) {
      return `<span class="formation-condition-token element-token">${renderElementIcon(code)}</span>`;
    }
  }
  return `<span class="formation-condition-text">${escapeHtml(formatFormationCondition(slot))}</span>`;
}

function renderCoachPositionSlotAsset(code, options = {}) {
  const label = String(code || "").trim().toUpperCase();
  const asset = formationPositionSlotAsset(label.toLowerCase());
  const title = labels.positions[label] ? `${label} - ${labels.positions[label]}` : label;
  if (!asset) {
    return renderPositionBadge({ code: label, fr: labels.positions[label] || label }, { compact: Boolean(options.compact) });
  }
  return `
    <span class="coach-position-slot-asset${options.compact ? " is-compact" : ""}" title="${escapeAttr(title)}">
      <img src="${escapeAttr(assetPath(asset))}" alt="${escapeAttr(label)}" />
    </span>
  `;
}

function formatFormationCondition(slot) {
  if (slot.condition_type_jp === "本職ポジション") {
    return slot.condition_value_jp || slot.position || "-";
  }
  if (slot.condition_type_jp === "タグ") {
    return String(slot.condition_value_jp || "")
      .split(/[、,]/)
      .map((value) => translateKnownTag(value.trim()))
      .filter(Boolean)
      .join(" / ");
  }
  if (slot.condition_type_jp === "属性") {
    return translateElementJp(slot.condition_value_jp);
  }
  return slot.condition_value_jp || slot.condition_type_jp || "-";
}

function renderCoachSkillSection(title, subtitle, skill, options = {}) {
  if (!skill || !(skill.levels || []).length) {
    return "";
  }
  const currentLevel = currentSkillLevel(skill);
  const description = describeSkillLevel(currentLevel) || skill.current_description || "";
  const summary = currentLevel?.summary || skill.current_summary || null;
  const detailButton = options.details === false
    ? ""
    : `<button class="coach-detail-button" type="button" data-coach-skill-id="${escapeAttr(skill.id)}">Détails</button>`;
  return `
    <section class="coach-effect-section">
      <div class="coach-effect-title">
        <strong>${escapeHtml(title)}</strong>
        <span>${escapeHtml(subtitle)}</span>
      </div>
      <div class="coach-effect-body">
        <div class="coach-effect-main">
          <div class="coach-effect-icons">${renderEffectBadges(currentLevel?.effects || [])}</div>
          ${renderCoachPassiveText(description, summary)}
        </div>
        ${detailButton}
      </div>
    </section>
  `;
}

function renderCoachPassiveText(description, summary = null) {
  const parts = splitCoachPassiveDescription(description, summary);
  return `
    <p class="coach-passive-text">
      <span class="coach-passive-trigger">${escapeHtml(parts.trigger)}${parts.effects.length ? " :" : ""}</span>
      ${parts.effects.map((effect) => `<span class="coach-passive-effect">${escapeHtml(effect)}</span>`).join("")}
      ${parts.end ? `<span class="coach-passive-end">${escapeHtml(parts.end)}</span>` : ""}
    </p>
  `;
}

function splitCoachPassiveDescription(description, summary = null) {
  if (summary?.trigger || summary?.effects?.length || summary?.end) {
    return {
      trigger: summary.trigger || "-",
      effects: Array.isArray(summary.effects) ? summary.effects.filter(Boolean) : [],
      end: summary.end || "",
    };
  }
  const text = String(description || "").trim();
  const [mainText, endText] = text.split(/\s+Condition de fin\s*:\s*/);
  const [trigger, ...effectParts] = mainText.split(/\s*:\s*/);
  const effect = effectParts.join(" : ").replace(/\.$/, "");
  return {
    trigger: trigger || text || "-",
    effects: splitCoachPassiveEffectLines(effect),
    end: endText ? `Condition de fin : ${endText.replace(/\.$/, "")}` : "",
  };
}

function splitCoachPassiveEffectLines(effectText) {
  return String(effectText || "")
    .split(/\s+et\s+(?=(?:augmente|réduit)\b)/i)
    .map((line) => line.trim().replace(/\.$/, ""))
    .filter(Boolean);
}

function hasTag(player, kind, value) {
  return player.tags.some((tag) => tag.kind === kind && tagLabel(tag) === value);
}

function searchableText(player) {
  return [
    player.id,
    player.names?.fr,
    player.names?.display_fr,
    player.names?.jp,
    player.names?.romaji,
    player.card_title?.fr,
    player.position?.code,
    player.position?.fr,
    player.element?.fr,
    player.element?.code,
    ...player.tags.map(tagLabel),
    ...player.skills.flatMap((skill) => [skill.name, skill.current_description, skill.kind]),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function sortPlayers(sort) {
  return (a, b) => {
    if (sort === "power_desc") {
      return (b.total_power || 0) - (a.total_power || 0) || displayName(a).localeCompare(displayName(b), "fr");
    }
    if (sort === "rarity_desc") {
      return (b.rarity?.stars || 0) - (a.rarity?.stars || 0) || displayName(a).localeCompare(displayName(b), "fr");
    }
    return displayName(a).localeCompare(displayName(b), "fr");
  };
}

function collectionEntryForPlayer(playerId) {
  return (state.account.collection?.players || []).find((entry) => String(entry.playerId) === String(playerId)) || null;
}

function playerById(playerId) {
  return state.players.find((item) => String(item.id) === String(playerId)) || null;
}

function ownedCollectionEntries() {
  return (state.account.collection?.players || []).filter((entry) => entry.owned);
}

function currentCollectionEquipment() {
  return state.account.collection?.equipment || {};
}

function collectionMainSlots(collection = state.account.collection) {
  const entries = collection?.players || [];
  return Array.from({ length: MAIN_COLLECTION_SLOT_COUNT }, (_, index) => {
    const slot = collection?.mainSlots?.[index] || {};
    const legacyPlayerId = collection?.mainPlayerIds?.[index] || "";
    const playerId = slot.playerId ?? legacyPlayerId ?? "";
    const matchingEntry = entries.find((entry) => String(entry.playerId) === String(playerId));
    return {
      slot: index,
      playerId: playerId ? String(playerId) : "",
      level: clampNumber(slot.level ?? matchingEntry?.level ?? 1, 1, 300),
    };
  });
}

function collectionMainSlotsFromDom() {
  const rows = [...els.playerDetail.querySelectorAll(".main-slot-row")];
  if (!rows.length) {
    return collectionMainSlots();
  }
  return rows.map((row, index) => ({
    slot: index,
    playerId: row.querySelector("input[name='mainPlayerId']")?.value || "",
    level: clampNumber(row.querySelector("input[name='mainLevel']")?.value || 1, 1, 300),
  }));
}

function collectionCommonLevelFromSlots(mainSlots = collectionMainSlots()) {
  const filled = (mainSlots || []).filter((slot) => slot.playerId);
  if (filled.length !== MAIN_COLLECTION_SLOT_COUNT) {
    return null;
  }
  return Math.min(...filled.map((slot) => clampNumber(slot.level, 1, 300)));
}

function collectionMainSlotForPlayer(playerId, mainSlots = collectionMainSlots()) {
  return (mainSlots || []).find((slot) => slot.playerId && String(slot.playerId) === String(playerId)) || null;
}

function collectionEffectiveLevel(entry, mainSlots = collectionMainSlots()) {
  const mainSlot = collectionMainSlotForPlayer(entry?.playerId || entry?.player?.id, mainSlots);
  if (mainSlot) {
    return clampNumber(mainSlot.level, 1, 300);
  }
  return collectionCommonLevelFromSlots(mainSlots) || 1;
}

function effectiveCollectionEntry(entry, mainSlots = collectionMainSlots()) {
  return {
    ...entry,
    level: collectionEffectiveLevel(entry, mainSlots),
  };
}

function effectiveCollectionEntries(entries = ownedCollectionEntries(), mainSlots = collectionMainSlots()) {
  return (entries || []).map((entry) => effectiveCollectionEntry(entry, mainSlots));
}

function renderCollectionDetail() {
  if (!state.account.user) {
    els.playerDetail.innerHTML = `
      <section class="collection-shell">
        <div class="collection-empty">
          <h2>Connexion requise</h2>
          <p>Connectez-vous pour gerer votre profil, vos personnages principaux et votre collection.</p>
          <button id="collectionLoginButton" class="primary-action" type="button">Login / Register</button>
        </div>
      </section>
    `;
    els.playerDetail.querySelector("#collectionLoginButton")?.addEventListener("click", () => openAuthModal("login"));
    return;
  }

  const selectedPlayer =
    state.players.find((item) => item.playable && String(item.id) === String(state.selectedId)) ||
    state.filtered.find((item) => item.playable) ||
    state.players.find((item) => item.playable);
  const selectedEntry = selectedPlayer ? collectionEntryForPlayer(selectedPlayer.id) : null;
  const collection = state.account.collection || { players: [], mainSlots: [], mainPlayerIds: [], commonLevel: null, equipment: {} };
  const ownedEntries = ownedCollectionEntries();
  const mainSlots = collectionMainSlots(collection);
  const mainCount = mainSlots.filter((slot) => slot.playerId).length;
  const commonLevel = collectionCommonLevelFromSlots(mainSlots);
  const totalCapacity = collectionTotalCapacity(effectiveCollectionEntries(ownedEntries, mainSlots), collection.equipment || {});
  const collectionError = state.account.error ? `<p class="auth-error collection-error">${escapeHtml(state.account.error)}</p>` : "";

  els.playerDetail.innerHTML = `
    <section class="collection-shell">
      <header class="collection-header">
        <div class="profile-summary">
          <span class="profile-avatar">${state.account.user.avatar ? `<img src="${escapeAttr(assetPath(state.account.user.avatar))}" alt="" />` : ""}</span>
          <div>
            <strong>${escapeHtml(state.account.user.username)}</strong>
            <span>Serveur ${escapeHtml(state.account.user.serverNumber || "-")}</span>
          </div>
        </div>
        <div class="collection-kpis">
          <span><strong>${escapeHtml(ownedEntries.length)}</strong> possedes</span>
          <span><strong>${escapeHtml(mainCount)}/5</strong> principaux</span>
          <span><strong>${escapeHtml(commonLevel ?? "-")}</strong> niveau commun</span>
          <span><strong data-collection-total-capacity>${escapeHtml(formatNumber(totalCapacity))}</strong> capacité totale</span>
        </div>
      </header>
      ${collectionError}

      <div class="collection-grid-layout">
        <section class="collection-card">
          <h2>Ajouter / modifier</h2>
          ${selectedPlayer ? renderSelectedCollectionEditor(selectedPlayer, selectedEntry, mainSlots) : `<p class="empty-line">Aucun joueur jouable selectionne.</p>`}
        </section>

        <section class="collection-card">
          <h2>5 emplacements principaux</h2>
          ${renderCollectionMainSlots(ownedEntries, mainSlots)}
        </section>
      </div>

      <section class="collection-card">
        <h2>Collection</h2>
        ${renderCollectionRows(ownedEntries, mainSlots)}
      </section>

      <section class="collection-card">
        <h2>Equipements du profil</h2>
        ${renderProfileEquipmentEditor(collection.equipment || {})}
      </section>
    </section>
  `;

  bindCollectionControls();
}

function renderSelectedCollectionEditor(player, entry, mainSlots = collectionMainSlots()) {
  const rarity = entry?.rarity ?? player.awakening?.code ?? 9;
  const previewEntry = effectiveCollectionEntry({ playerId: player.id, owned: true, rarity }, mainSlots);
  const level = previewEntry.level;
  const mainSlot = collectionMainSlotForPlayer(player.id, mainSlots);
  const portrait = imageUrl(player, "portrait") || imageUrl(player, "fullbody");
  const simulated = simulateCollectionEntry(previewEntry, currentCollectionEquipment());
  const capacity = simulated ? formatNumber(simulated.total_power) : "-";
  return `
    <form id="selectedCollectionForm" class="selected-collection-form" data-player-id="${escapeAttr(player.id)}">
      <div class="selected-player-line">
        <span class="portrait-frame">${portrait ? `<img src="${escapeAttr(portrait)}" alt="" />` : `<span>${escapeHtml(initials(displayName(player)))}</span>`}</span>
        <div>
          <strong>${escapeHtml(displayName(player))}</strong>
          <span>${entry?.owned ? "Deja dans la collection" : "Joueur jouable"}</span>
          <small class="collection-capacity-inline"><span data-selected-collection-level>${mainSlot ? `Emplacement ${escapeHtml(mainSlot.slot + 1)}` : "Niveau commun"} Lv.${escapeHtml(level)}</span> - Capacité <strong data-selected-collection-capacity>${escapeHtml(capacity)}</strong></small>
        </div>
      </div>
      <div class="collection-form-grid">
        <label class="awakening-editor"><span>Éveil</span>${renderCollectionAwakeningSelect(player, "rarity", rarity)}</label>
      </div>
      <div class="collection-form-actions">
        <button class="primary-action" type="submit">${entry?.owned ? "Mettre a jour" : "Ajouter"}</button>
        <button class="compare-player-button secondary" type="button" data-collection-compare-player="${escapeAttr(player.id)}">Comparer collection</button>
      </div>
    </form>
  `;
}

function renderCollectionMainSlots(entries, mainSlots = collectionMainSlots()) {
  if (!entries.length) {
    return `<p class="empty-line">Ajoutez au moins 5 joueurs pour remplir les emplacements principaux.</p>`;
  }
  return `
    <div class="main-slots">
      ${Array.from({ length: MAIN_COLLECTION_SLOT_COUNT }, (_, index) => {
        const slot = mainSlots[index] || { slot: index, playerId: "", level: 1 };
        const selectedEntry = entries.find((entry) => String(entry.playerId) === String(slot.playerId));
        const selectedPlayer = selectedEntry?.player || summarizeLocalPlayer(selectedEntry?.playerId);
        const selectedPortrait = selectedPlayer?.portrait || selectedPlayer?.fullbody;
        return `
          <div class="main-slot-row" data-slot-index="${escapeAttr(index)}">
            <span class="main-slot-preview" data-main-slot-preview>
              ${selectedPortrait ? `<img src="${escapeAttr(assetPath(selectedPortrait))}" alt="" />` : `<strong>#${escapeHtml(index + 1)}</strong>`}
            </span>
            <div class="main-slot-picker">
              <span>Joueur</span>
              <input name="mainPlayerId" type="hidden" value="${escapeAttr(slot.playerId || "")}" />
              <button class="main-slot-button" type="button" aria-expanded="false">
                <span data-main-slot-label>${escapeHtml(selectedPlayer?.name || "Libre")}</span>
              </button>
              <div class="main-slot-menu" hidden>
                <button class="main-slot-option" type="button" data-player-id="" data-player-name="Libre" data-player-portrait="">
                  <span class="portrait-frame"><span>-</span></span>
                  <span>Libre</span>
                </button>
                ${entries
                  .map((entry) => {
                    const player = entry.player || summarizeLocalPlayer(entry.playerId);
                    const portrait = player?.portrait || player?.fullbody;
                    return `
                      <button class="main-slot-option" type="button" data-player-id="${escapeAttr(entry.playerId)}" data-player-name="${escapeAttr(player?.name || entry.playerId)}" data-player-portrait="${escapeAttr(portrait || "")}">
                        <span class="portrait-frame">${portrait ? `<img src="${escapeAttr(assetPath(portrait))}" alt="" />` : `<span>${escapeHtml(initials(player?.name || entry.playerId))}</span>`}</span>
                        <span>${escapeHtml(player?.name || entry.playerId)}</span>
                      </button>
                    `;
                  })
                  .join("")}
              </div>
            </div>
            <label>
              <span>Niveau spot</span>
              <input name="mainLevel" type="number" min="1" max="300" value="${escapeAttr(slot.level || 1)}" />
            </label>
          </div>
        `;
      }).join("")}
    </div>
    <p class="collection-hint">Le niveau reste sur l'emplacement. Les joueurs hors des 5 prennent le niveau le plus bas.</p>
  `;
}

function renderCollectionRows(entries, mainSlots = collectionMainSlots()) {
  if (!entries.length) {
    return `<p class="empty-line">Aucun joueur dans votre collection.</p>`;
  }
  return `
    <form id="collectionBulkForm" class="collection-table-form">
      <div class="collection-grid">
        ${entries
          .map((entry) => {
            const player = entry.player || summarizeLocalPlayer(entry.playerId);
            const portrait = player?.portrait || player?.fullbody;
            const effectiveEntry = effectiveCollectionEntry(entry, mainSlots);
            const mainSlot = collectionMainSlotForPlayer(entry.playerId, mainSlots);
            const simulated = simulateCollectionEntry(effectiveEntry, currentCollectionEquipment());
            const capacity = simulated ? formatNumber(simulated.total_power) : "-";
            return `
              <article class="collection-row collection-entry-card" data-player-id="${escapeAttr(entry.playerId)}">
                <span class="collection-row-player">
                  <span class="portrait-frame">${portrait ? `<img src="${escapeAttr(assetPath(portrait))}" alt="" />` : `<span>${escapeHtml(initials(player?.name || entry.playerId))}</span>`}</span>
                  <span>
                    <strong>${escapeHtml(player?.name || entry.playerId)}</strong>
                    <small>${escapeHtml(player?.position?.code || "")}</small>
                  </span>
                </span>
                <label><span>Owned</span><input name="owned" type="checkbox" checked /></label>
                <label class="awakening-editor"><span>Éveil</span>${renderCollectionAwakeningSelect(player || summarizeLocalPlayer(entry.playerId), "rarity", entry.rarity)}</label>
                <span class="collection-level"><small>Niveau</small><strong data-collection-level>${escapeHtml(`Lv.${effectiveEntry.level}`)}</strong><small data-collection-level-source>${escapeHtml(mainSlot ? `Principal #${mainSlot.slot + 1}` : "Commun")}</small></span>
                <span class="collection-capacity"><small>Capacité</small><strong data-collection-capacity>${escapeHtml(capacity)}</strong></span>
                <button class="compare-player-button secondary" type="button" data-collection-compare-player="${escapeAttr(entry.playerId)}">Comparer</button>
              </article>
            `;
          })
          .join("")}
      </div>
      <p class="collection-hint">Enregistrez ici les éveils, les joueurs possédés et les 5 emplacements principaux.</p>
      <button class="primary-action" type="submit">Enregistrer la collection</button>
    </form>
  `;
}

function collectionAwakeningCode(player, selectedValue) {
  const options = awakeningOptionsForPlayer(player);
  if (selectedValue != null && selectedValue !== "") {
    const selected = Number(selectedValue);
    if (options.some((option) => Number(option.code) === selected)) {
      return selected;
    }
  }
  const current = Number(player?.awakening?.code);
  if (options.some((option) => Number(option.code) === current)) {
    return current;
  }
  return Number(options[options.length - 1]?.code ?? 0);
}

function renderCollectionAwakeningSelect(player, name, selectedValue) {
  const selectedCode = collectionAwakeningCode(player, selectedValue);
  const selectedTier = awakeningTierInfo(selectedCode);
  return `
    <span class="collection-awakening-field">
      <span class="collection-awakening-chip awakening-ribbon-${escapeAttr(selectedTier.slug)}"></span>
      <select name="${escapeAttr(name)}" class="collection-awakening-select">
        ${awakeningOptionsForPlayer(player)
          .map((option) => `<option value="${escapeAttr(option.code)}"${Number(option.code) === selectedCode ? " selected" : ""}>${escapeHtml(option.label)}</option>`)
          .join("")}
      </select>
    </span>
  `;
}

function renderCollectionAwakeningBadge(code) {
  const tier = awakeningTierInfo(Number(code));
  return `<span class="collection-awakening-badge awakening-tier awakening-tier-${escapeAttr(tier.slug)}">${escapeHtml(tier.label)}</span>`;
}

function summarizeLocalPlayer(playerId) {
  const player = playerById(playerId);
  if (!player) {
    return null;
  }
  return {
    id: player.id,
    name: displayName(player),
    portrait: imageUrl(player, "portrait"),
    fullbody: imageUrl(player, "fullbody"),
    position: player.position,
    rarity: player.rarity,
    awakening: player.awakening,
  };
}

function renderProfileEquipmentEditor(equipment) {
  return `
    <form id="profileEquipmentForm" class="profile-equipment-form">
      ${EQUIPMENT_POSITIONS.map((position) => {
        const slots = equipmentSlotsForPosition(position);
        if (!slots.length) {
          return "";
        }
        return `
          <section class="equipment-position-row equipment-position-${escapeAttr(position.toLowerCase())}">
            <div class="equipment-position-title">
              ${renderPositionBadge({ code: position, fr: labels.positions[position] }, { compact: true })}
              <span>${escapeHtml(position)}</span>
            </div>
            <div class="equipment-position-slots">
              ${slots.map((slot) => renderProfileEquipmentSlot(position, slot, equipment?.[position]?.[slot.code])).join("")}
            </div>
          </section>
        `;
      }).join("")}
      <button class="primary-action" type="submit">Enregistrer les equipements</button>
    </form>
  `;
}

function renderProfileEquipmentSlot(position, slot, selectedLevel) {
  const levels = (slot.levels || []).map(Number);
  const selected = levels.includes(Number(selectedLevel)) ? Number(selectedLevel) : levels[0] || DEFAULT_EQUIPMENT_LEVEL;
  const icon = equipmentIcon(slot, position, selected);
  return `
    <label class="equipment-modal-slot">
      <span class="equipment-modal-picture">${icon ? `<img src="${escapeAttr(icon)}" alt="" />` : ""}</span>
      <span class="equipment-modal-name">${escapeHtml(equipmentSlotLabel(slot))}</span>
      <select data-equipment-position="${escapeAttr(position)}" data-equipment-slot="${escapeAttr(slot.code)}">
        ${levels.map((level) => `<option value="${escapeAttr(level)}"${level === selected ? " selected" : ""}>Lv.${escapeHtml(level)}</option>`).join("")}
      </select>
    </label>
  `;
}

function bindCollectionControls() {
  els.playerDetail.querySelector("#selectedCollectionForm")?.addEventListener("submit", handleSelectedCollectionSave);
  els.playerDetail.querySelector("#collectionBulkForm")?.addEventListener("submit", handleCollectionBulkSave);
  els.playerDetail.querySelector("#profileEquipmentForm")?.addEventListener("submit", handleEquipmentSave);
  els.playerDetail.querySelectorAll("[data-collection-compare-player]").forEach((button) => {
    button.addEventListener("click", () => {
      const playerId = button.dataset.collectionComparePlayer;
      const row = button.closest(".collection-row");
      const selectedForm = button.closest("#selectedCollectionForm");
      const mainSlots = collectionMainSlotsFromDom();
      const entry = row
        ? collectionEntryFromRow(row, mainSlots)
        : effectiveCollectionEntry(
            {
              playerId,
              owned: true,
              rarity: selectedForm?.querySelector("select[name='rarity']")?.value ?? collectionEntryForPlayer(playerId)?.rarity,
            },
            mainSlots,
          );
      launchComparisonForPlayer(playerId, "collection", {
        level: entry.level,
        awakeningCode: entry.rarity,
      });
    });
  });
  els.playerDetail.querySelectorAll(".collection-awakening-select").forEach((select) => {
    select.addEventListener("change", () => {
      const chip = select.closest(".collection-awakening-field")?.querySelector(".collection-awakening-chip");
      if (!chip) {
        return;
      }
      [...chip.classList].forEach((className) => {
        if (className.startsWith("awakening-ribbon-")) {
          chip.classList.remove(className);
        }
      });
      chip.classList.add(`awakening-ribbon-${awakeningTierInfo(select.value).slug}`);
    });
  });
  bindMainSlotPickers();
  bindCollectionCapacityControls();
}

function bindMainSlotPickers() {
  const closeAllMenus = (except = null) => {
    els.playerDetail.querySelectorAll(".main-slot-menu").forEach((menu) => {
      if (menu !== except) {
        menu.hidden = true;
        menu.closest(".main-slot-picker")?.querySelector(".main-slot-button")?.setAttribute("aria-expanded", "false");
      }
    });
  };

  els.playerDetail.querySelectorAll(".main-slot-row").forEach((row) => {
    const button = row.querySelector(".main-slot-button");
    const menu = row.querySelector(".main-slot-menu");
    const input = row.querySelector("input[name='mainPlayerId']");
    const label = row.querySelector("[data-main-slot-label]");
    const preview = row.querySelector("[data-main-slot-preview]");
    button?.addEventListener("click", (event) => {
      event.stopPropagation();
      if (!menu) {
        return;
      }
      const willOpen = menu.hidden;
      closeAllMenus(willOpen ? menu : null);
      menu.hidden = !willOpen;
      button.setAttribute("aria-expanded", String(willOpen));
      if (willOpen) {
        setTimeout(() => document.addEventListener("click", () => closeAllMenus(), { once: true }), 0);
      }
    });
    menu?.querySelectorAll(".main-slot-option").forEach((option) => {
      option.addEventListener("click", () => {
        const playerId = option.dataset.playerId || "";
        const playerName = option.dataset.playerName || "Libre";
        const portrait = option.dataset.playerPortrait || "";
        if (input) {
          input.value = playerId;
        }
        if (label) {
          label.textContent = playerName;
        }
        if (preview) {
          preview.innerHTML = portrait
            ? `<img src="${escapeAttr(assetPath(portrait))}" alt="" />`
            : `<strong>#${escapeHtml(Number(row.dataset.slotIndex || 0) + 1)}</strong>`;
        }
        closeAllMenus();
        refreshCollectionDerivedValues();
      });
    });
  });

}

function bindCollectionCapacityControls() {
  const selectedForm = els.playerDetail.querySelector("#selectedCollectionForm");
  if (selectedForm) {
    selectedForm.querySelector("select[name='rarity']")?.addEventListener("change", refreshSelectedCollectionCapacity);
  }

  els.playerDetail.querySelectorAll(".main-slot-row input[name='mainLevel']").forEach((control) => {
    control.addEventListener("input", refreshCollectionDerivedValues);
  });

  els.playerDetail.querySelectorAll(".collection-row").forEach((row) => {
    const refresh = () => {
      refreshCollectionDerivedValues();
    };
    row.querySelector("select[name='rarity']")?.addEventListener("change", refresh);
    row.querySelector("input[name='owned']")?.addEventListener("change", refresh);
  });
  refreshCollectionDerivedValues();
}

function collectionEntryFromRow(row, mainSlots = collectionMainSlotsFromDom()) {
  const entry = {
    playerId: row.dataset.playerId,
    owned: row.querySelector("input[name='owned']")?.checked !== false,
    rarity: row.querySelector("select[name='rarity']")?.value,
  };
  return effectiveCollectionEntry(entry, mainSlots);
}

function refreshSelectedCollectionCapacity(mainSlots = collectionMainSlotsFromDom()) {
  const selectedForm = els.playerDetail.querySelector("#selectedCollectionForm");
  if (!selectedForm) {
    return;
  }
  const entry = effectiveCollectionEntry(
    {
      playerId: selectedForm.dataset.playerId,
      owned: true,
      rarity: selectedForm.querySelector("select[name='rarity']")?.value,
    },
    mainSlots,
  );
  const target = selectedForm.querySelector("[data-selected-collection-capacity]");
  const levelTarget = selectedForm.querySelector("[data-selected-collection-level]");
  const mainSlot = collectionMainSlotForPlayer(entry.playerId, mainSlots);
  if (levelTarget) {
    levelTarget.textContent = `${mainSlot ? `Emplacement ${mainSlot.slot + 1}` : "Niveau commun"} Lv.${entry.level}`;
  }
  if (target) {
    const simulated = simulateCollectionEntry(entry, currentCollectionEquipment());
    target.textContent = simulated ? formatNumber(simulated.total_power) : "-";
  }
}

function refreshCollectionDerivedValues() {
  const mainSlots = collectionMainSlotsFromDom();
  els.playerDetail.querySelectorAll(".collection-row").forEach((row) => refreshCollectionRowCapacity(row, mainSlots));
  refreshSelectedCollectionCapacity(mainSlots);
  refreshCollectionCapacitySummary(mainSlots);
}

function refreshCollectionRowCapacity(row, mainSlots = collectionMainSlotsFromDom()) {
  const target = row.querySelector("[data-collection-capacity]");
  const levelTarget = row.querySelector("[data-collection-level]");
  const sourceTarget = row.querySelector("[data-collection-level-source]");
  const entry = collectionEntryFromRow(row, mainSlots);
  const mainSlot = collectionMainSlotForPlayer(entry.playerId, mainSlots);
  if (levelTarget) {
    levelTarget.textContent = `Lv.${entry.level}`;
  }
  if (sourceTarget) {
    sourceTarget.textContent = mainSlot ? `Principal #${mainSlot.slot + 1}` : "Commun";
  }
  if (target) {
    const simulated = simulateCollectionEntry(entry, currentCollectionEquipment());
    target.textContent = simulated ? formatNumber(simulated.total_power) : "-";
  }
}

function refreshCollectionCapacitySummary(mainSlots = collectionMainSlotsFromDom()) {
  const target = els.playerDetail.querySelector("[data-collection-total-capacity]");
  if (!target) {
    return;
  }
  const rows = [...els.playerDetail.querySelectorAll(".collection-row")];
  if (!rows.length) {
    target.textContent = formatNumber(collectionTotalCapacity(effectiveCollectionEntries(ownedCollectionEntries(), mainSlots), currentCollectionEquipment()));
    return;
  }
  const total = rows.reduce((sum, row) => {
    const entry = collectionEntryFromRow(row, mainSlots);
    if (!entry.owned) {
      return sum;
    }
    const simulated = simulateCollectionEntry(entry, currentCollectionEquipment());
    return sum + Number(simulated?.total_power || 0);
  }, 0);
  target.textContent = formatNumber(total);
}

async function handleSelectedCollectionSave(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const playerId = event.currentTarget.dataset.playerId;
  try {
    const data = await apiFetch(`/api/collection/${encodeURIComponent(playerId)}`, {
      method: "PUT",
      body: {
        owned: true,
        rarity: form.get("rarity"),
      },
    });
    state.account.collection = data.collection;
    state.account.error = "";
    applyCurrentFilters();
  } catch (error) {
    state.account.error = error.message;
    renderCollectionDetail();
  }
}

async function handleCollectionBulkSave(event) {
  event.preventDefault();
  const rows = [...els.playerDetail.querySelectorAll(".collection-row")];
  const players = rows.map((row) => ({
    playerId: row.dataset.playerId,
    owned: row.querySelector("input[name='owned']").checked,
    rarity: row.querySelector("select[name='rarity']").value,
  }));
  const mainSlots = collectionMainSlotsFromDom();
  const filledMainSlots = mainSlots.filter((slot) => slot.playerId);
  const uniqueMainPlayerIds = new Set(filledMainSlots.map((slot) => slot.playerId));
  if (filledMainSlots.length !== 0 && filledMainSlots.length !== MAIN_COLLECTION_SLOT_COUNT) {
    state.account.error = "Choisissez exactement 5 emplacements principaux, ou laissez-les tous libres.";
    renderCollectionDetail();
    return;
  }
  if (uniqueMainPlayerIds.size !== filledMainSlots.length) {
    state.account.error = "Un joueur ne peut occuper qu'un seul emplacement principal.";
    renderCollectionDetail();
    return;
  }
  try {
    const data = await apiFetch("/api/collection", {
      method: "PUT",
      body: { players, mainSlots },
    });
    state.account.collection = data.collection;
    state.account.error = "";
    applyCurrentFilters();
  } catch (error) {
    state.account.error = error.message;
    renderCollectionDetail();
  }
}

async function handleEquipmentSave(event) {
  event.preventDefault();
  const equipment = {};
  els.playerDetail.querySelectorAll("[data-equipment-slot]").forEach((select) => {
    const position = select.dataset.equipmentPosition;
    const slot = select.dataset.equipmentSlot;
    equipment[position] ||= {};
    equipment[position][slot] = Number(select.value);
  });
  try {
    const data = await apiFetch("/api/collection/equipment", {
      method: "PUT",
      body: { equipment },
    });
    state.account.collection = data.collection;
    state.account.error = "";
    applyCurrentFilters();
  } catch (error) {
    state.account.error = error.message;
    renderCollectionDetail();
  }
}

function renderPublicProfileView() {
  const profile = state.publicProfile;
  const entries = profile?.collection || [];
  const equipment = profile?.equipment || {};
  els.resultCount.textContent = `${entries.length} joueur${entries.length > 1 ? "s" : ""}`;
  els.playableToggle.disabled = true;
  els.playableToggle.innerHTML = `<span>Public</span>`;
  els.playableToggle.setAttribute("aria-pressed", "false");
  els.playableToggle.setAttribute("aria-label", "Profil public");
  els.playerGrid.innerHTML = entries
        .map((entry) => {
          const player = entry.player || summarizeLocalPlayer(entry.playerId);
          const portrait = player?.portrait || player?.fullbody;
          const simulated = simulateCollectionEntry(entry, equipment);
          const capacity = simulated ? formatNumber(simulated.total_power) : "-";
          return `
            <button class="album-card" type="button" data-id="${escapeAttr(entry.playerId)}">
              <span class="portrait-frame">${portrait ? `<img src="${escapeAttr(assetPath(portrait))}" alt="" />` : `<span>${escapeHtml(initials(player?.name || entry.playerId))}</span>`}</span>
              <span class="album-card-body">
                <span class="album-card-title-row"><strong>${escapeHtml(player?.name || entry.playerId)}</strong></span>
                <span class="mini-meta">${renderCollectionAwakeningBadge(entry.rarity)}<span>Lv.${escapeHtml(entry.level || "-")}</span><span>Capacité ${escapeHtml(capacity)}</span></span>
              </span>
            </button>
          `;
    })
    .join("");
  renderPublicProfileDetail();
}

function renderPublicProfileDetail() {
  const profile = state.publicProfile;
  if (!profile) {
    els.playerDetail.innerHTML = `<div class="empty-state"><h2>Profil public</h2><p>Chargement...</p></div>`;
    return;
  }
  if (profile.error) {
    els.playerDetail.innerHTML = `<div class="empty-state"><h2>Profil introuvable</h2><p>${escapeHtml(profile.error)}</p></div>`;
    return;
  }
  const profileEquipment = profile.equipment || {};
  const totalCapacity = collectionTotalCapacity(profile.collection || [], profileEquipment);
  els.playerDetail.innerHTML = `
    <section class="collection-shell public-profile-shell">
      <header class="collection-header">
        <div class="profile-summary">
          <span class="profile-avatar">${profile.avatar ? `<img src="${escapeAttr(assetPath(profile.avatar))}" alt="" />` : ""}</span>
          <div>
            <strong>${escapeHtml(profile.username)}</strong>
            <span>Serveur ${escapeHtml(profile.serverNumber || "-")}</span>
          </div>
        </div>
        <div class="collection-kpis">
          <span><strong>${escapeHtml((profile.collection || []).length)}</strong> possedes</span>
          <span><strong>${escapeHtml((profile.mainPlayerIds || []).length)}/5</strong> principaux</span>
          <span><strong>${escapeHtml(profile.commonLevel ?? "-")}</strong> niveau commun</span>
          <span><strong>${escapeHtml(formatNumber(totalCapacity))}</strong> capacité totale</span>
        </div>
      </header>
      <section class="collection-card">
        <h2>5 principaux</h2>
        ${profile.mainPlayers?.length ? renderPublicEntries(profile.mainPlayers, profileEquipment) : `<p class="empty-line">Aucun groupe principal public.</p>`}
      </section>
      <section class="collection-card">
        <h2>Collection publique</h2>
        ${profile.collection?.length ? renderPublicEntries(profile.collection, profileEquipment) : `<p class="empty-line">Aucune collection publique.</p>`}
      </section>
    </section>
  `;
}

function renderPublicEntries(entries, equipment = {}) {
  return `
    <div class="public-entry-grid">
      ${entries
        .map((entry) => {
          const player = entry.player || summarizeLocalPlayer(entry.playerId);
          const portrait = player?.portrait || player?.fullbody;
          const simulated = simulateCollectionEntry(entry, equipment);
          const capacity = simulated ? formatNumber(simulated.total_power) : "-";
          return `
            <article class="public-entry-card">
              <span class="portrait-frame">${portrait ? `<img src="${escapeAttr(assetPath(portrait))}" alt="" />` : `<span>${escapeHtml(initials(player?.name || entry.playerId))}</span>`}</span>
              <div>
                <strong>${escapeHtml(player?.name || entry.playerId)}</strong>
                <span>${renderCollectionAwakeningBadge(entry.rarity)} Lv.${escapeHtml(entry.level || "-")}</span>
                <small class="collection-capacity-inline">Capacité <strong>${escapeHtml(capacity)}</strong></small>
              </div>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}


function renderGrid() {
  const count = state.filtered.length;
  const modeLabel = state.mode === "simulator" ? "personnage" : state.mode === "team" ? "choix" : "joueur";
  const comparisonIds =
    state.mode === "comparison"
      ? new Set([state.comparison.leftPlayerId, state.comparison.rightPlayerId].filter(Boolean).map(String))
      : new Set();
  els.playableToggle.disabled = false;
  els.resultCount.textContent = `${count} ${modeLabel}${count > 1 ? "s" : ""}${state.filters.playableOnly ? " jouable" + (count > 1 ? "s" : "") : ""}`;
  const showingAll = !state.filters.playableOnly;
  if (state.mode === "collection") {
    els.playableToggle.disabled = true;
    els.playableToggle.innerHTML = `<span>Jouables</span>`;
    els.playableToggle.setAttribute("aria-pressed", "false");
    els.playableToggle.setAttribute("aria-label", "Collection limit?e aux joueurs jouables");
  } else {
    els.playableToggle.innerHTML = `<span>Tous</span><span class="toggle-track" aria-hidden="true"><span class="toggle-thumb"></span></span>`;
    els.playableToggle.setAttribute("aria-pressed", String(showingAll));
    els.playableToggle.setAttribute("aria-label", showingAll ? "Afficher seulement les joueurs jouables" : "Afficher tous les joueurs");
  }

  if (!count) {
    els.playerGrid.innerHTML = "";
    return;
  }

  els.playerGrid.innerHTML = state.filtered
    .map((player) => {
      const active =
        player.id === state.selectedId ||
        (state.mode === "team" && teamSelectedPlayerIds().includes(String(player.id))) ||
        (state.mode === "comparison" && comparisonIds.has(String(player.id)))
          ? " is-active"
          : "";
      const npcClass = player.playable ? "" : " is-npc";
      const collectionEntry = collectionEntryForPlayer(player.id);
      const collectionClass = state.mode === "collection" && collectionEntry?.owned ? " is-owned" : "";
      const portrait = imageUrl(player, "portrait") || imageUrl(player, "fullbody");
      const compareSource = comparisonLaunchSourceForCurrentMode();
      return `
        <article class="album-card album-player-card${active}${npcClass}${collectionClass}">
          <button class="album-card-main" type="button" data-id="${escapeAttr(player.id)}">
            <span class="portrait-frame">
              ${portrait ? `<img src="${escapeAttr(portrait)}" alt="" />` : `<span>${escapeHtml(initials(displayName(player)))}</span>`}
            </span>
            <span class="album-card-body">
              <span class="album-card-title-row">
                <strong>${escapeHtml(displayName(player))}</strong>
                ${state.mode === "collection" && collectionEntry?.owned ? `<span class="non-playable-badge owned-badge">OK</span>` : player.playable ? "" : `<span class="non-playable-badge">NPC</span>`}
              </span>
              <span class="mini-meta">
                ${renderTeamLogo(player)}
                <span class="card-badges">
                  ${renderElementIcon(player.element?.code)}
                  ${renderPositionBadge(player.position, { compact: true })}
                </span>
                <span class="card-stars">${renderStars(player.rarity?.stars)}</span>
              </span>
            </span>
          </button>
          <button class="album-compare-pill" type="button" data-grid-compare-player="${escapeAttr(player.id)}" data-grid-compare-source="${escapeAttr(compareSource)}" title="Comparer">VS</button>
        </article>
      `;
    })
    .join("");

  els.playerGrid.querySelectorAll("[data-grid-compare-player]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      launchComparisonForPlayer(button.dataset.gridComparePlayer, button.dataset.gridCompareSource || "base", {
        keepLevel: state.mode === "comparison",
      });
    });
  });

  els.playerGrid.querySelectorAll(".album-card-main").forEach((button) => {
    button.addEventListener("click", () => {
      if (state.mode === "team") {
        assignTeamSlot(button.dataset.id);
      } else if (state.mode === "comparison") {
        assignComparisonSide(button.dataset.id);
      } else {
        state.selectedId = button.dataset.id;
      }
      renderGrid();
      renderDetail();
      saveState();
    });
  });
}

function renderDetail() {
  if (state.mode === "publicProfile") {
    renderPublicProfileDetail();
    return;
  }
  if (state.mode === "collection") {
    renderCollectionDetail();
    return;
  }
  if (state.mode === "simulator") {
    renderSimulatorDetail();
    return;
  }
  if (state.mode === "comparison") {
    renderComparisonDetail();
    return;
  }
  if (state.mode === "team") {
    renderTeamBuilderDetail();
    return;
  }

  const player = state.players.find((item) => item.id === state.selectedId);
  if (!player) {
    els.playerDetail.innerHTML = els.emptyTemplate.innerHTML;
    return;
  }

  els.playerDetail.innerHTML = `
    <section class="game-view element-bg-${escapeAttr(player.element?.code || "none")}">
      <div class="bolt bolt-one"></div>
      <div class="bolt bolt-two"></div>

      <div class="player-side">
        <div class="screen-label">Détail joueur</div>
        <p class="card-title">${escapeHtml(player.card_title?.fr || player.names?.jp || "")}</p>
        <h2>${escapeHtml(displayName(player))}</h2>

        <div class="identity-strip">
          ${renderElementBadge(player.element)}
          ${renderPositionBadge(player.position)}
          ${renderStars(player.rarity?.stars)}
        </div>

        <div class="tag-icons">${player.tags.map(renderTagChip).join("")}</div>

        <div class="character-info-grid">
          <div class="stats-block">
            ${renderStats(player.stats)}
          </div>

          <div class="field-zone">
            <span>Zones</span>
            ${renderPositionGrid(player.preferred_areas || [])}
          </div>
        </div>

        <div class="skills-panel">
          ${renderSkills(player.skills || [])}
        </div>

        <div class="detail-action-row">
          <button class="compare-player-button" type="button" data-compare-player="${escapeAttr(player.id)}" data-compare-source="base">Comparer ce joueur</button>
          ${ownedCollectionEntries().length ? `<button class="compare-player-button secondary" type="button" data-compare-player="${escapeAttr(player.id)}" data-compare-source="collection">Comparer collection</button>` : ""}
        </div>
      </div>

      <div class="model-side">
        <div class="model-art">
          ${renderModel(player)}
        </div>
        <div class="power-readout">
          <span>Capacité totale</span>
          <strong>${formatNumber(player.total_power)}</strong>
        </div>
        <div class="level-readout">Lv.300</div>
        <div class="awakening-ribbon">${escapeHtml(player.awakening?.label || "LEGENDARY PLAYER+")}</div>
        <div class="equipment-chip">Equipement Lv.${escapeHtml(player.equipment?.level || 1)}</div>
      </div>
    </section>
  `;

  els.playerDetail.querySelectorAll(".skill-card").forEach((button) => {
    button.addEventListener("click", () => {
      openSkillModal(player, button.dataset.skillId);
    });
  });
  bindCompareButtons();
}

function renderTeamBuilderDetail() {
  ensureTeamBuilderDefaults();
  const slots = teamSlots();
  const selected = slots[state.teamBuilder.selectedSlot] || slots[0];
  const selectedPlayer = selected?.player || state.players.find((player) => player.id === state.selectedId);
  const coach = teamCoach();
  const formation = getCoachFormation(coach);
  const filledSlots = slots.filter((slot) => slot.player).length;
  const totals = aggregateTeamStats(slots);

  els.playerDetail.innerHTML = `
    <section class="team-builder-view">
      <header class="team-builder-hero">
        <div>
          <p class="team-builder-kicker">Build équipe</p>
          <h2>Composition 5 joueurs</h2>
          <span>${filledSlots}/${TEAM_SIZE} joueurs sélectionnés</span>
        </div>
        <div class="team-power-card">
          <span>Puissance équipe</span>
          <strong>${formatNumber(totals.power)}</strong>
        </div>
      </header>

      <section class="team-builder-grid">
        <div class="team-roster" aria-label="Joueurs sélectionnés">
          ${slots.map(renderTeamSlotCard).join("")}
        </div>

        <aside class="team-summary-panel">
          <section class="team-coach-panel">
            <label>
              <span>Coach</span>
              <select id="teamCoachSelect">
                ${state.coaches
                  .filter((item) => !item.enemy_only)
                  .map(
                    (item) => `<option value="${escapeAttr(item.id)}"${String(item.id) === String(coach?.id) ? " selected" : ""}>${escapeHtml(displayName(item))}</option>`,
                  )
                  .join("")}
              </select>
            </label>
            ${coach ? renderTeamCoachCard(coach, formation) : ""}
          </section>

          <section class="team-total-stats">
            <h3>Total stats joueurs</h3>
            ${renderTeamTotals(totals.stats)}
          </section>
        </aside>
      </section>

      <section class="team-lower-grid">
        <article class="team-equipment-panel">
          <header>
            <div>
              <span>Equipements</span>
              <strong>${selectedPlayer ? escapeHtml(selectedPlayer.position?.code || "-") : "Slot vide"}</strong>
            </div>
            <button id="teamEquipmentConfigButton" class="equipment-config-button" type="button"${selectedPlayer ? "" : " disabled"}>Configurer mes equipements</button>
          </header>
          <div class="equipment-controls">
            ${selectedPlayer ? equipmentSlotsForPlayer(selectedPlayer).map((slot) => renderEquipmentControl(selectedPlayer, slot, selectedPlayer.position?.code)).join("") : ""}
          </div>
        </article>

        <article class="team-passives-panel">
          <header>
            <span>Passifs joueurs</span>
            <strong>Débloqués et verrouillés</strong>
          </header>
          ${renderTeamSkillSummary(slots)}
        </article>
      </section>
    </section>
  `;

  bindTeamBuilderControls(slots);
}

function teamSlots() {
  ensureTeamBuilderDefaults();
  return state.teamBuilder.slots.map((slot, index) => {
    const player = state.players.find((item) => String(item.id) === String(slot.playerId)) || null;
    const normalizedAwakening = player ? normalizeAwakeningCodeForPlayer(player, slot.awakeningCode) : slot.awakeningCode;
    if (player && normalizedAwakening !== slot.awakeningCode) {
      state.teamBuilder.slots[index].awakeningCode = normalizedAwakening;
    }
    return {
      ...slot,
      index,
      player,
      simulated: player
        ? simulatePlayerWithConfig(player, {
            level: slot.level,
            awakeningCode: normalizedAwakening,
          })
        : null,
    };
  });
}

function teamCoach() {
  return state.coaches.find((coach) => String(coach.id) === String(state.teamBuilder.coachId)) || state.coaches.find((coach) => !coach.enemy_only) || null;
}

function teamSelectedPlayerIds() {
  return (state.teamBuilder.slots || []).map((slot) => String(slot.playerId || "")).filter(Boolean);
}

function assignTeamSlot(playerId) {
  ensureTeamBuilderDefaults();
  const index = clampNumber(state.teamBuilder.selectedSlot, 0, TEAM_SIZE - 1);
  const player = state.players.find((item) => String(item.id) === String(playerId));
  if (!player) {
    return;
  }
  state.teamBuilder.slots[index] = {
    ...state.teamBuilder.slots[index],
    playerId: String(player.id),
    awakeningCode: normalizeAwakeningCodeForPlayer(player, state.teamBuilder.slots[index]?.awakeningCode ?? 9),
  };
  state.selectedId = String(player.id);
}

function setComparisonPlayer(side, playerId) {
  ensureComparisonDefaults();
  const player = playerById(playerId);
  if (!player) {
    return;
  }
  const prefix = side === "right" ? "right" : "left";
  state.comparison[`${prefix}PlayerId`] = String(player.id);
  state.comparison[`${prefix}AwakeningCode`] = normalizeAwakeningCodeForPlayer(
    player,
    comparisonDefaultAwakeningCode(player),
  );
  state.comparison.selectedSide = prefix;
}

function assignComparisonSide(playerId) {
  const side = state.comparison.selectedSide === "right" ? "right" : "left";
  setComparisonPlayer(side, playerId);
  state.selectedId = String(playerId);
  state.comparison.selectedSide = side === "left" ? "right" : "left";
}

function launchComparisonForPlayer(playerId, source = "base", options = {}) {
  const player = playerById(playerId);
  if (!player) {
    return;
  }
  state.comparison.equipmentSource = ["base", "simulator", "collection"].includes(source) ? source : "base";
  if (state.comparison.equipmentSource === "collection" && !ownedCollectionEntries().length) {
    state.comparison.equipmentSource = "base";
  }
  const collectionEntry = state.comparison.equipmentSource === "collection" ? collectionEntryForPlayer(player.id) : null;
  const launchPlayer = collectionEntry || state.comparison.equipmentSource !== "collection"
    ? player
    : comparisonSelectablePlayers()[0] || player;
  const launchLevel =
    options.level ??
    (options.keepLevel ? state.comparison.level : null) ??
    (state.comparison.equipmentSource === "base" ? 300 : comparisonDefaultLevel(launchPlayer));
  state.comparison.level = clampNumber(launchLevel, 1, 300);
  state.comparison.leftPlayerId = String(launchPlayer.id);
  state.comparison.leftAwakeningCode = normalizeAwakeningCodeForPlayer(
    launchPlayer,
    options.awakeningCode ?? comparisonDefaultAwakeningCode(launchPlayer),
  );

  const selectable = comparisonSelectablePlayers();
  const currentRight = playerById(state.comparison.rightPlayerId);
  const fallbackRight =
    currentRight && String(currentRight.id) !== String(launchPlayer.id) && (state.comparison.equipmentSource !== "collection" || collectionEntryForPlayer(currentRight.id))
      ? currentRight
      : selectable.find((item) => String(item.id) !== String(launchPlayer.id)) || launchPlayer;
  state.comparison.rightPlayerId = fallbackRight ? String(fallbackRight.id) : String(launchPlayer.id);
  state.comparison.rightAwakeningCode = fallbackRight
    ? normalizeAwakeningCodeForPlayer(fallbackRight, comparisonDefaultAwakeningCode(fallbackRight))
    : state.comparison.leftAwakeningCode;
  state.comparison.selectedSide = "right";
  state.selectedId = String(launchPlayer.id);
  setMode("comparison");
  saveState();
}

function bindCompareButtons() {
  els.playerDetail.querySelectorAll("[data-compare-player]").forEach((button) => {
    button.addEventListener("click", () => {
      const source = button.dataset.compareSource || "base";
      launchComparisonForPlayer(button.dataset.comparePlayer, source);
    });
  });
}

function updateTeamSlot(index, updates) {
  ensureTeamBuilderDefaults();
  const slot = state.teamBuilder.slots[index];
  if (!slot) {
    return;
  }
  const player = state.players.find((item) => String(item.id) === String(slot.playerId));
  if (updates.level != null) {
    slot.level = clampNumber(updates.level, 1, 300);
  }
  if (updates.awakeningCode != null) {
    slot.awakeningCode = player ? normalizeAwakeningCodeForPlayer(player, updates.awakeningCode) : Number(updates.awakeningCode);
  }
}

function renderTeamSlotCard(slot) {
  const player = slot.player;
  const simulated = slot.simulated;
  const active = slot.index === state.teamBuilder.selectedSlot ? " is-selected" : "";
  if (!player || !simulated) {
    return `
      <article class="team-slot-card is-empty${active}">
        <button class="team-slot-pick" type="button" data-team-slot="${escapeAttr(slot.index)}">
          <span class="team-slot-number">${escapeHtml(slot.index + 1)}</span>
          <strong>Choisir un joueur</strong>
          <small>Clique ici puis sélectionne un joueur à gauche</small>
        </button>
      </article>
    `;
  }
  const portrait = imageUrl(player, "portrait") || imageUrl(player, "fullbody");
  const awakening = awakeningTierInfo(simulated.awakening.code);
  return `
    <article class="team-slot-card${active}">
      <button class="team-slot-pick" type="button" data-team-slot="${escapeAttr(slot.index)}">
        <span class="team-slot-number">${escapeHtml(slot.index + 1)}</span>
        <span class="portrait-frame">
          ${portrait ? `<img src="${escapeAttr(portrait)}" alt="" />` : `<span>${escapeHtml(initials(displayName(player)))}</span>`}
        </span>
        <span class="team-slot-info">
          <strong>${escapeHtml(displayName(player))}</strong>
          <span>${renderTeamLogo(player)} ${renderElementIcon(player.element?.code)} ${renderPositionBadge(player.position, { compact: true })} ${renderStars(player.rarity?.stars)}</span>
          <em>${formatNumber(simulated.total_power)} pts</em>
        </span>
      </button>
      <div class="team-slot-controls">
        <label>
          <span>Lv.</span>
          <input data-team-level="${escapeAttr(slot.index)}" type="number" min="1" max="300" value="${escapeAttr(simulated.level)}" />
        </label>
        <input class="team-level-range" data-team-level-range="${escapeAttr(slot.index)}" type="range" min="1" max="300" value="${escapeAttr(simulated.level)}" />
        <label class="team-awakening-control">
          <span>Éveil</span>
          <span class="team-awakening-select awakening-ribbon-${escapeAttr(awakening.slug)}">
            <select data-team-awakening="${escapeAttr(slot.index)}">
              ${awakeningOptionsForPlayer(player)
                .map((option) => `<option value="${escapeAttr(option.code)}"${Number(option.code) === Number(simulated.awakening.code) ? " selected" : ""}>${escapeHtml(option.label)}</option>`)
                .join("")}
            </select>
          </span>
        </label>
      </div>
    </article>
  `;
}

function renderTeamCoachCard(coach, formation) {
  const portrait = imageUrl(coach, "portrait") || imageUrl(coach, "fullbody");
  return `
    <div class="team-coach-card">
      <div class="team-coach-identity">
        <span class="portrait-frame coach-portrait-frame">
          ${portrait ? `<img src="${escapeAttr(portrait)}" alt="" />` : `<span>${escapeHtml(initials(displayName(coach)))}</span>`}
        </span>
        <div>
          <strong>${escapeHtml(displayName(coach))}</strong>
          <span>${escapeHtml(formation?.name || `Formation ${coach.formation_code || "-"}`)}</span>
        </div>
      </div>
      <div class="team-formation-mini">
        ${renderFormationPitch(formation)}
      </div>
      <div class="team-coach-passives">
        ${renderCoachSkillSection("Formation", "Actif", formation?.passive, { details: false })}
        ${renderCoachSkillSection("Coach", "Passif", coach.passive, { details: false })}
      </div>
    </div>
  `;
}

function aggregateTeamStats(slots) {
  const stats = { tp: 0, kick: 0, technique: 0, block: 0, catch: 0, speed: 0 };
  let power = 0;
  for (const slot of slots) {
    if (!slot.simulated) {
      continue;
    }
    power += Number(slot.simulated.total_power || 0);
    for (const key of Object.keys(stats)) {
      stats[key] += Number(slot.simulated.stats?.[key] || 0);
    }
  }
  const coach = teamCoach();
  power += Number(coach?.total_power || 0);
  return { stats, power };
}

function renderTeamTotals(stats) {
  return `
    <div class="team-stat-grid">
      ${Object.entries(stats)
        .map(
          ([key, value]) => `
            <div class="team-stat-pill">
              <span>${renderStatIcon(key)}</span>
              <em>${escapeHtml(labels.stats[key] || key)}</em>
              <strong>${formatNumber(value)}</strong>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderTeamSkillSummary(slots) {
  const rows = slots
    .filter((slot) => slot.simulated)
    .flatMap((slot) =>
      (slot.simulated.skills || [])
        .filter((skill) => skill.kind === "passive")
        .map((skill) => ({ slot, skill })),
    );
  if (!rows.length) {
    return `<p class="team-empty-note">Aucun passif trouvé.</p>`;
  }
  return `
    <div class="team-skill-list">
      ${rows
        .map(({ slot, skill }) => {
          const locked = skill.locked ? " is-locked" : "";
          return `
            <button class="team-skill-row${locked}" type="button" data-team-skill-slot="${escapeAttr(slot.index)}" data-team-skill-id="${escapeAttr(skill.id)}">
              <span class="skill-kind-badge">P</span>
              <span>
                <strong>${escapeHtml(skill.name || "Passif")}</strong>
                <em>${escapeHtml(displayName(slot.player))} - ${skill.locked ? escapeHtml(skill.locked_reason || "Non débloqué") : `Lv.${escapeHtml(skill.current_level || "-")}`}</em>
              </span>
            </button>
          `;
        })
        .join("")}
    </div>
  `;
}

function bindTeamBuilderControls(slots) {
  els.playerDetail.querySelectorAll("[data-team-slot]").forEach((button) => {
    button.addEventListener("click", () => {
      state.teamBuilder.selectedSlot = clampNumber(button.dataset.teamSlot, 0, TEAM_SIZE - 1);
      const slot = state.teamBuilder.slots[state.teamBuilder.selectedSlot];
      if (slot?.playerId) {
        state.selectedId = String(slot.playerId);
      }
      renderGrid();
      renderTeamBuilderDetail();
      saveState();
    });
  });

  els.playerDetail.querySelectorAll("[data-team-level]").forEach((input) => {
    input.addEventListener("change", (event) => {
      updateTeamSlot(Number(event.target.dataset.teamLevel), { level: event.target.value });
      renderTeamBuilderDetail();
      saveState();
    });
  });

  els.playerDetail.querySelectorAll("[data-team-level-range]").forEach((input) => {
    input.addEventListener("input", (event) => {
      updateTeamSlot(Number(event.target.dataset.teamLevelRange), { level: event.target.value });
      renderTeamBuilderDetail();
      saveState();
    });
  });

  els.playerDetail.querySelectorAll("[data-team-awakening]").forEach((select) => {
    select.addEventListener("change", (event) => {
      updateTeamSlot(Number(event.target.dataset.teamAwakening), { awakeningCode: event.target.value });
      renderTeamBuilderDetail();
      saveState();
    });
  });

  els.playerDetail.querySelector("#teamCoachSelect")?.addEventListener("change", (event) => {
    state.teamBuilder.coachId = String(event.target.value);
    renderTeamBuilderDetail();
    saveState();
  });

  els.playerDetail.querySelectorAll("[data-equipment-slot]").forEach((select) => {
    select.addEventListener("change", (event) => {
      const position = event.target.dataset.equipmentPosition || "";
      const slot = event.target.dataset.equipmentSlot || "";
      setEquipmentLevel(position, slot, event.target.value);
      renderTeamBuilderDetail();
      saveState();
    });
  });

  els.playerDetail.querySelector("#teamEquipmentConfigButton")?.addEventListener("click", () => {
    const player = slots[state.teamBuilder.selectedSlot]?.player;
    if (player) {
      openEquipmentModal(player);
    }
  });

  els.playerDetail.querySelectorAll("[data-team-skill-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const slot = slots[Number(button.dataset.teamSkillSlot)];
      if (slot?.simulated) {
        openSkillModal(slot.simulated, button.dataset.teamSkillId);
      }
    });
  });
}

function comparisonEquipmentLevelsByPosition() {
  if (state.comparison.equipmentSource === "collection") {
    return currentCollectionEquipment();
  }
  if (state.comparison.equipmentSource === "simulator") {
    syncSimulatorEquipmentState();
    return state.simulator.equipmentLevelsByPosition;
  }
  return {};
}

function comparisonEquipmentSourceLabel() {
  if (state.comparison.equipmentSource === "collection") {
    return "Equipements collection";
  }
  if (state.comparison.equipmentSource === "simulator") {
    return "Equipements simulateur";
  }
  return "Equipements Lv.1";
}

function comparisonEquipmentToolbarLabel(left, right) {
  if (state.comparison.equipmentSource === "simulator") {
    return "Equipements du simulateur actifs";
  }
  if (state.comparison.equipmentSource === "collection") {
    return "Equipements de collection actifs";
  }
  const leftSummary = equipmentSummary(left?.equipment || {});
  const rightSummary = equipmentSummary(right?.equipment || {});
  return leftSummary === rightSummary ? leftSummary : `${leftSummary} / ${rightSummary}`;
}

function comparisonDefaultLevel(player) {
  if (state.comparison.equipmentSource === "simulator" && String(player?.id) === String(state.selectedId)) {
    return state.simulator.level;
  }
  if (state.comparison.equipmentSource === "collection") {
    const entry = collectionEntryForPlayer(player?.id);
    if (entry) {
      return effectiveCollectionEntry(entry).level;
    }
  }
  return state.comparison.level || 300;
}

function comparisonDefaultAwakeningCode(player) {
  if (state.comparison.equipmentSource === "simulator" && String(player?.id) === String(state.selectedId)) {
    return state.simulator.awakeningCode;
  }
  if (state.comparison.equipmentSource === "collection") {
    const entry = collectionEntryForPlayer(player?.id);
    if (entry?.rarity != null) {
      return Number(entry.rarity);
    }
  }
  return player?.awakening?.code ?? 9;
}

function renderComparisonDetail() {
  ensureComparisonDefaults();
  const leftPlayer = playerById(state.comparison.leftPlayerId);
  const rightPlayer = playerById(state.comparison.rightPlayerId);
  if (!leftPlayer || !rightPlayer) {
    els.playerDetail.innerHTML = els.emptyTemplate.innerHTML;
    return;
  }

  const leftAwakeningCode = normalizeAwakeningCodeForPlayer(leftPlayer, state.comparison.leftAwakeningCode);
  const rightAwakeningCode = normalizeAwakeningCodeForPlayer(rightPlayer, state.comparison.rightAwakeningCode);
  state.comparison.leftAwakeningCode = leftAwakeningCode;
  state.comparison.rightAwakeningCode = rightAwakeningCode;

  const config = {
    level: state.comparison.level,
    equipmentLevelsByPosition: comparisonEquipmentLevelsByPosition(),
  };
  const left = simulatePlayerWithConfig(leftPlayer, { ...config, awakeningCode: leftAwakeningCode });
  const right = simulatePlayerWithConfig(rightPlayer, { ...config, awakeningCode: rightAwakeningCode });

  els.playerDetail.innerHTML = `
    <section class="comparison-view">
      <div class="comparison-toolbar">
        <div>
          <p class="comparison-kicker">Comparaison joueurs</p>
          <h2>Lv.${escapeHtml(state.comparison.level)} commun</h2>
          <span>${escapeHtml(comparisonEquipmentToolbarLabel(left, right))}</span>
        </div>
        <label class="comparison-level-control">
          <span>Niveau commun</span>
          <div class="sim-level-control">
            <input id="comparisonLevelInput" type="number" min="1" max="300" step="1" value="${escapeAttr(state.comparison.level)}" />
            <input id="comparisonLevelRange" type="range" min="1" max="300" step="1" value="${escapeAttr(state.comparison.level)}" />
          </div>
        </label>
      </div>

      <div class="comparison-source-tabs" aria-label="Source des equipements">
        ${renderComparisonSourceButton("base", "Equipements Lv.1")}
        ${renderComparisonSourceButton("simulator", "Equipements simulateur")}
        ${ownedCollectionEntries().length ? renderComparisonSourceButton("collection", "Collection") : ""}
        ${
          state.comparison.equipmentSource === "simulator"
            ? `<button id="comparisonEquipmentConfigButton" class="comparison-config-button" type="button">Configurer mes equipements</button>`
            : ""
        }
      </div>

      <div class="comparison-control-grid">
        ${renderComparisonControls("left", left)}
        ${renderComparisonControls("right", right)}
      </div>

      <div class="comparison-player-grid">
        ${renderComparisonPlayerCard("left", left, right)}
        ${renderComparisonPlayerCard("right", right, left)}
      </div>
    </section>
  `;

  bindComparisonControls({ left, right });
}

function renderComparisonControls(side, simulated) {
  const sideLabel = side === "right" ? "Droite" : "Gauche";
  const selected = state.comparison.selectedSide === side ? " is-selected" : "";
  return `
    <article class="comparison-control-card${selected}">
      <header>
        <strong>${escapeHtml(sideLabel)}</strong>
        <button type="button" data-comparison-side-button="${escapeAttr(side)}">Changer ce joueur</button>
      </header>
      <label>
        <span>Joueur</span>
        <select data-comparison-player="${escapeAttr(side)}">
          ${renderComparisonPlayerOptions(simulated.id)}
        </select>
      </label>
      <label>
        <span>Eveil</span>
        ${renderComparisonAwakeningPicker(side, simulated, simulated.awakening.code)}
      </label>
    </article>
  `;
}

function renderComparisonSourceButton(source, label) {
  return `
    <button
      class="${state.comparison.equipmentSource === source ? "is-active" : ""}"
      type="button"
      data-comparison-source="${escapeAttr(source)}"
    >${escapeHtml(label)}</button>
  `;
}

function renderComparisonPlayerOptions(selectedId) {
  const players = comparisonSelectablePlayers();
  return players
    .map((player) => {
      const label = `${displayName(player)}${teamLabel(player) ? ` - ${teamLabel(player)}` : ""}`;
      return `<option value="${escapeAttr(player.id)}"${String(player.id) === String(selectedId) ? " selected" : ""}>${escapeHtml(label)}</option>`;
    })
    .join("");
}

function comparisonSelectablePlayers() {
  if (state.comparison?.equipmentSource === "collection") {
    const owned = ownedCollectionEntries()
      .map((entry) => playerById(entry.playerId))
      .filter(Boolean);
    if (owned.length) {
      return owned.slice().sort((a, b) => displayName(a).localeCompare(displayName(b), "fr"));
    }
  }
  const playable = state.players.filter((player) => player.playable);
  return (playable.length ? playable : state.players).slice().sort((a, b) => displayName(a).localeCompare(displayName(b), "fr"));
}

function renderComparisonAwakeningPicker(side, player, selectedCode) {
  const options = awakeningOptionsForPlayer(player);
  const selected = options.find((option) => Number(option.code) === Number(selectedCode)) || options[0] || awakeningTierInfo(selectedCode);
  return `
    <div class="awakening-picker comparison-awakening-picker">
      <button
        class="awakening-picker-button awakening-ribbon-${escapeAttr(selected.slug)}"
        type="button"
        aria-haspopup="listbox"
        aria-expanded="false"
        data-comparison-awakening-button="${escapeAttr(side)}"
      >
        <span class="awakening-picker-chip awakening-ribbon-${escapeAttr(selected.slug)}"></span>
        <span>${escapeHtml(selected.label)}</span>
      </button>
      <div class="awakening-menu" role="listbox" hidden data-comparison-awakening-menu="${escapeAttr(side)}">
        ${options
          .map(
            (option) => `
              <button
                class="awakening-choice${Number(option.code) === Number(selectedCode) ? " is-selected" : ""}"
                type="button"
                role="option"
                aria-selected="${Number(option.code) === Number(selectedCode) ? "true" : "false"}"
                data-comparison-awakening-code="${escapeAttr(option.code)}"
                data-comparison-awakening-side="${escapeAttr(side)}"
              >
                <span class="awakening-choice-chip awakening-ribbon-${escapeAttr(option.slug)}"></span>
                <span>${escapeHtml(option.label)}</span>
              </button>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderComparisonPlayerCard(side, simulated, other) {
  const player = playerById(simulated.id) || simulated;
  const portrait = imageUrl(player, "portrait") || imageUrl(player, "fullbody");
  const totalDelta = comparisonDelta(simulated.total_power, other?.total_power);
  return `
    <article class="comparison-player-card comparison-${escapeAttr(side)}">
      <header class="comparison-player-head">
        <span class="portrait-frame">
          ${portrait ? `<img src="${escapeAttr(portrait)}" alt="" />` : `<span>${escapeHtml(initials(displayName(player)))}</span>`}
        </span>
        <div>
          <p>${escapeHtml(player.card_title?.fr || player.names?.jp || "")}</p>
          <h3>${escapeHtml(displayName(player))}</h3>
          <div class="comparison-identity">
            ${renderTeamLogo(player)}
            ${renderElementIcon(player.element?.code)}
            ${renderPositionBadge(player.position, { compact: true })}
            ${renderStars(player.rarity?.stars)}
          </div>
        </div>
      </header>

      <div class="comparison-hero-row">
        <div class="comparison-art">${renderModel(player)}</div>
        <div class="comparison-total-card">
          <span>Capacite totale</span>
          <strong>${formatNumber(simulated.total_power)}</strong>
          ${renderComparisonDelta(totalDelta)}
          <em class="awakening-ribbon-${escapeAttr(simulated.awakening.slug)}">${escapeHtml(simulated.awakening.label)}</em>
        </div>
      </div>

      <section class="comparison-block">
        <h4>Stats</h4>
        <div class="comparison-stat-list">
          ${renderComparisonStats(simulated, other)}
        </div>
      </section>

      <section class="comparison-block">
        <h4>Capacites</h4>
        <div class="comparison-skill-list">
          ${renderComparisonSkillRows(simulated, side)}
        </div>
      </section>
    </article>
  `;
}

function renderComparisonStats(simulated, other) {
  return ["tp", "kick", "technique", "block", "catch", "speed"]
    .map((key) => {
      const current = Number(simulated.stats?.[key] || 0);
      const delta = comparisonDelta(current, other?.stats?.[key]);
      return `
        <div class="comparison-stat-row">
          <span>${renderStatIcon(key)} ${escapeHtml(labels.stats[key] || key)}</span>
          <strong>${formatNumber(current)}</strong>
          ${renderComparisonDelta(delta)}
        </div>
      `;
    })
    .join("");
}

function renderComparisonSkillRows(simulated, side) {
  const ordered = orderedSkillsForComparison(simulated.skills || []);
  if (!ordered.length) {
    return `<p class="empty-line">Aucune capacite.</p>`;
  }
  return ordered
    .map((skill) => {
      const icon = skill.kind === "move" ? renderMoveTypeIcon(skill.type?.code) : `<span class="passive-mark">P</span>`;
      const typeLabel = skill.kind === "move" ? "Technique" : "Passif";
      const locked = skill.locked ? " is-locked" : "";
      return `
        <button class="comparison-skill-row${locked}" type="button" data-comparison-skill-side="${escapeAttr(side)}" data-comparison-skill-id="${escapeAttr(skill.id)}">
          <span class="comparison-skill-icon">${icon}</span>
          <span class="comparison-skill-main">
            <strong>${escapeHtml(skill.name || typeLabel)}</strong>
            <em>${escapeHtml(skill.locked ? skill.locked_reason || "Non debloque" : `Lv.${skill.current_level || "-"}`)}</em>
          </span>
          <small>${escapeHtml(skill.kind === "move" ? `${typeLabel} / TP ${formatNumber(skill.tp_cost || 0)} / ${formatNumber(skill.power || 0)}` : typeLabel)}</small>
        </button>
      `;
    })
    .join("");
}

function orderedSkillsForComparison(skills) {
  const awakeningPassives = [];
  const levelPassives = [];
  const moves = [];

  skills.forEach((skill, index) => {
    if (skill.kind === "move") {
      moves.push({ skill, index });
    } else if (isAwakeningPassive(skill)) {
      awakeningPassives.push({ skill, index });
    } else {
      levelPassives.push({ skill, index });
    }
  });

  awakeningPassives.sort((a, b) => currentAwakeningCode(a.skill) - currentAwakeningCode(b.skill) || a.index - b.index);
  levelPassives.sort((a, b) => firstPlayerUnlockLevel(a.skill) - firstPlayerUnlockLevel(b.skill) || a.index - b.index);
  moves.sort((a, b) => firstPlayerUnlockLevel(a.skill) - firstPlayerUnlockLevel(b.skill) || a.index - b.index);
  return [...awakeningPassives, ...levelPassives, ...moves].map(({ skill }) => skill);
}

function comparisonDelta(current, other) {
  if (other == null || !Number.isFinite(Number(other))) {
    return null;
  }
  return Number(current || 0) - Number(other || 0);
}

function renderComparisonDelta(delta) {
  if (delta == null || !Number.isFinite(Number(delta))) {
    return `<span class="comparison-delta is-even">=</span>`;
  }
  const value = Number(delta);
  const className = value > 0 ? "is-positive" : value < 0 ? "is-negative" : "is-even";
  const prefix = value > 0 ? "+" : "";
  return `<span class="comparison-delta ${className}">${escapeHtml(prefix + formatNumber(value))}</span>`;
}

function bindComparisonControls(simulatedBySide) {
  const updateLevel = (value) => {
    state.comparison.level = clampNumber(value, 1, 300);
    renderComparisonDetail();
    saveState();
  };

  els.playerDetail.querySelector("#comparisonLevelInput")?.addEventListener("change", (event) => updateLevel(event.target.value));
  els.playerDetail.querySelector("#comparisonLevelInput")?.addEventListener("input", (event) => updateLevel(event.target.value));
  els.playerDetail.querySelector("#comparisonLevelRange")?.addEventListener("input", (event) => updateLevel(event.target.value));

  els.playerDetail.querySelectorAll("[data-comparison-side-button]").forEach((button) => {
    button.addEventListener("click", () => {
      state.comparison.selectedSide = button.dataset.comparisonSideButton === "right" ? "right" : "left";
      renderComparisonDetail();
      saveState();
    });
  });

  els.playerDetail.querySelectorAll("[data-comparison-source]").forEach((button) => {
    button.addEventListener("click", () => {
      state.comparison.equipmentSource = button.dataset.comparisonSource || "base";
      if (state.comparison.equipmentSource === "collection") {
        for (const side of ["left", "right"]) {
          const player = playerById(state.comparison[`${side}PlayerId`]);
          const collectionEntry = collectionEntryForPlayer(player?.id);
          if (player && collectionEntry) {
            state.comparison[`${side}AwakeningCode`] = normalizeAwakeningCodeForPlayer(player, collectionEntry.rarity);
          }
          if (side === "left" && collectionEntry) {
            state.comparison.level = effectiveCollectionEntry(collectionEntry).level;
          }
        }
      }
      renderComparisonDetail();
      renderGrid();
      saveState();
    });
  });

  els.playerDetail.querySelector("#comparisonEquipmentConfigButton")?.addEventListener("click", () => {
    const player = playerById(state.comparison.leftPlayerId) || playerById(state.comparison.rightPlayerId) || playerById(state.selectedId);
    if (player) {
      openEquipmentModal(player);
    }
  });

  els.playerDetail.querySelectorAll("[data-comparison-player]").forEach((select) => {
    select.addEventListener("change", (event) => {
      const side = event.target.dataset.comparisonPlayer === "right" ? "right" : "left";
      setComparisonPlayer(side, event.target.value);
      state.selectedId = String(event.target.value);
      renderGrid();
      renderComparisonDetail();
      saveState();
    });
  });

  els.playerDetail.querySelectorAll("[data-comparison-awakening-button]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const side = button.dataset.comparisonAwakeningButton === "right" ? "right" : "left";
      const menu = els.playerDetail.querySelector(`[data-comparison-awakening-menu="${side}"]`);
      if (!menu) {
        return;
      }
      const isOpen = !menu.hidden;
      els.playerDetail.querySelectorAll("[data-comparison-awakening-menu]").forEach((item) => {
        item.hidden = true;
      });
      els.playerDetail.querySelectorAll("[data-comparison-awakening-button]").forEach((item) => item.setAttribute("aria-expanded", "false"));
      menu.hidden = isOpen;
      button.setAttribute("aria-expanded", String(!isOpen));
    });
  });

  els.playerDetail.querySelectorAll("[data-comparison-awakening-menu]").forEach((menu) => {
    menu.addEventListener("click", (event) => event.stopPropagation());
  });

  els.playerDetail.querySelectorAll("[data-comparison-awakening-code]").forEach((button) => {
    button.addEventListener("click", () => {
      const side = button.dataset.comparisonAwakeningSide === "right" ? "right" : "left";
      const player = playerById(state.comparison[`${side}PlayerId`]);
      state.comparison[`${side}AwakeningCode`] = player ? normalizeAwakeningCodeForPlayer(player, button.dataset.comparisonAwakeningCode) : Number(button.dataset.comparisonAwakeningCode);
      renderComparisonDetail();
      saveState();
    });
  });

  document.addEventListener(
    "click",
    () => {
      els.playerDetail.querySelectorAll("[data-comparison-awakening-menu]").forEach((item) => {
        item.hidden = true;
      });
      els.playerDetail.querySelectorAll("[data-comparison-awakening-button]").forEach((item) => item.setAttribute("aria-expanded", "false"));
    },
    { once: true },
  );

  els.playerDetail.querySelectorAll("[data-comparison-skill-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const side = button.dataset.comparisonSkillSide === "right" ? "right" : "left";
      const simulated = simulatedBySide[side];
      if (simulated) {
        openSkillModal(simulated, button.dataset.comparisonSkillId);
      }
    });
  });
}

function renderSimulatorDetail() {
  const player = state.players.find((item) => item.id === state.selectedId);
  if (!player) {
    els.playerDetail.innerHTML = els.emptyTemplate.innerHTML;
    return;
  }

  syncSimulatorEquipmentDefaults(player);
  const simulated = simulatePlayer(player);
  const equipmentSlots = equipmentSlotsForPlayer(player);

  els.playerDetail.innerHTML = `
    <section class="simulator-panel" aria-label="Paramètres de simulation">
      <div class="simulator-main-controls">
        <label>
          <span>Niveau joueur</span>
          <div class="sim-level-control">
            <input id="simLevelInput" type="number" min="1" max="300" step="1" value="${escapeAttr(simulated.level)}" />
            <input id="simLevelRange" type="range" min="1" max="300" step="1" value="${escapeAttr(simulated.level)}" />
          </div>
        </label>
        <label>
          <span>Éveil</span>
          ${renderAwakeningPicker(player, simulated.awakening.code)}
        </label>
      </div>
      <div class="equipment-controls">
        ${equipmentSlots.map((slot) => renderEquipmentControl(player, slot, player.position?.code)).join("")}
      </div>
      <div class="simulator-actions">
        <button class="compare-player-button" type="button" data-compare-player="${escapeAttr(player.id)}" data-compare-source="simulator">Comparer ce joueur</button>
        <button id="equipmentConfigButton" class="equipment-config-button" type="button">Configurer mes equipements</button>
      </div>
    </section>

    <section class="game-view simulator-view element-bg-${escapeAttr(player.element?.code || "none")}">
      <div class="bolt bolt-one"></div>
      <div class="bolt bolt-two"></div>

      <div class="player-side">
        <div class="screen-label simulator-label">Simulation joueur</div>
        <p class="card-title">${escapeHtml(player.card_title?.fr || player.names?.jp || "")}</p>
        <h2>${escapeHtml(displayName(player))}</h2>

        <div class="identity-strip">
          ${renderElementBadge(player.element)}
          ${renderPositionBadge(player.position)}
          ${renderStars(player.rarity?.stars)}
        </div>

        <div class="tag-icons">${player.tags.map(renderTagChip).join("")}</div>

        <div class="character-info-grid">
          <div class="stats-block">
            ${renderStats(simulated.stats)}
          </div>

          <div class="field-zone">
            <span>Zones</span>
            ${renderPositionGrid(player.preferred_areas || [])}
          </div>
        </div>

        <div class="skills-panel">
          ${renderSkills(simulated.skills || [])}
        </div>
      </div>

      <div class="model-side">
        <div class="model-art">
          ${renderModel(player)}
        </div>
        <div class="power-readout">
          <span>Capacité totale</span>
          <strong>${formatNumber(simulated.total_power)}</strong>
        </div>
        <div class="level-readout">Lv.${escapeHtml(simulated.level)}</div>
        <div class="awakening-ribbon awakening-ribbon-${escapeAttr(simulated.awakening.slug)}">${escapeHtml(simulated.awakening.label)}</div>
        <div class="equipment-chip">${escapeHtml(equipmentSummary(simulated.equipment))}</div>
      </div>
    </section>
  `;

  bindSimulatorControls(player);
  els.playerDetail.querySelectorAll(".skill-card").forEach((button) => {
    button.addEventListener("click", () => {
      openSkillModal(simulated, button.dataset.skillId);
    });
  });
  bindCompareButtons();
}

function bindSimulatorControls(player) {
  const levelInput = els.playerDetail.querySelector("#simLevelInput");
  const levelRange = els.playerDetail.querySelector("#simLevelRange");
  const awakeningButton = els.playerDetail.querySelector("#simAwakeningButton");
  const awakeningMenu = els.playerDetail.querySelector("#simAwakeningMenu");

  const updateLevel = (value) => {
    state.simulator.level = clampNumber(value, 1, 300);
    renderSimulatorDetail();
    saveState();
  };
  levelInput?.addEventListener("change", (event) => updateLevel(event.target.value));
  levelRange?.addEventListener("input", (event) => updateLevel(event.target.value));

  const closeAwakeningMenu = (event) => {
    if (!awakeningMenu || !awakeningButton || awakeningMenu.hidden) {
      return;
    }
    if (!awakeningMenu.contains(event.target) && !awakeningButton.contains(event.target)) {
      awakeningMenu.hidden = true;
      awakeningButton.setAttribute("aria-expanded", "false");
      document.removeEventListener("click", closeAwakeningMenu);
    }
  };

  awakeningButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!awakeningMenu) {
      return;
    }
    const isOpen = !awakeningMenu.hidden;
    awakeningMenu.hidden = isOpen;
    awakeningButton.setAttribute("aria-expanded", String(!isOpen));
    document.removeEventListener("click", closeAwakeningMenu);
    if (isOpen) {
      return;
    }
    setTimeout(() => document.addEventListener("click", closeAwakeningMenu), 0);
  });

  awakeningMenu?.addEventListener("click", (event) => event.stopPropagation());

  awakeningMenu?.querySelectorAll("[data-awakening-code]").forEach((button) => {
    button.addEventListener("click", (event) => {
      state.simulator.awakeningCode = Number(event.currentTarget.dataset.awakeningCode);
      document.removeEventListener("click", closeAwakeningMenu);
      renderSimulatorDetail();
      saveState();
    });
  });

  awakeningButton?.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && awakeningMenu && !awakeningMenu.hidden) {
      awakeningMenu.hidden = true;
      awakeningButton.setAttribute("aria-expanded", "false");
      document.removeEventListener("click", closeAwakeningMenu);
      awakeningButton.focus();
    }
  });

  els.playerDetail.querySelectorAll("[data-equipment-slot]").forEach((select) => {
    select.addEventListener("change", (event) => {
      const position = event.target.dataset.equipmentPosition || player.position?.code || "";
      const slot = event.target.dataset.equipmentSlot;
      setEquipmentLevel(position, slot, event.target.value);
      renderSimulatorDetail();
      saveState();
    });
  });

  els.playerDetail.querySelector("#equipmentConfigButton")?.addEventListener("click", () => {
    openEquipmentModal(player);
  });
}

function renderAwakeningPicker(player, selectedCode) {
  const options = awakeningOptionsForPlayer(player);
  const selected = options.find((option) => Number(option.code) === Number(selectedCode)) || options[0] || awakeningTierInfo(selectedCode);
  return `
    <div class="awakening-picker">
      <button
        id="simAwakeningButton"
        class="awakening-picker-button awakening-ribbon-${escapeAttr(selected.slug)}"
        type="button"
        aria-haspopup="listbox"
        aria-expanded="false"
      >
        <span class="awakening-picker-chip awakening-ribbon-${escapeAttr(selected.slug)}"></span>
        <span>${escapeHtml(selected.label)}</span>
      </button>
      <div id="simAwakeningMenu" class="awakening-menu" role="listbox" hidden>
        ${options
          .map(
            (option) => `
              <button
                class="awakening-choice${Number(option.code) === Number(selectedCode) ? " is-selected" : ""}"
                type="button"
                role="option"
                aria-selected="${Number(option.code) === Number(selectedCode) ? "true" : "false"}"
                data-awakening-code="${escapeAttr(option.code)}"
              >
                <span class="awakening-choice-chip awakening-ribbon-${escapeAttr(option.slug)}"></span>
                <span>${escapeHtml(option.label)}</span>
              </button>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function simulatePlayer(player) {
  const level = clampNumber(state.simulator.level, 1, 300);
  const awakeningCode = normalizeAwakeningCodeForPlayer(player, state.simulator.awakeningCode);
  return simulatePlayerWithConfig(player, { level, awakeningCode });
}

function simulatePlayerWithConfig(player, config = {}) {
  const level = clampNumber(config.level ?? 300, 1, 300);
  const awakeningCode = normalizeAwakeningCodeForPlayer(player, config.awakeningCode ?? 9);
  const stats = computeSimulatorStats(player, level, awakeningCode, config.equipmentLevelsByPosition ?? state.simulator.equipmentLevelsByPosition);
  const skills = simulateSkills(player.skills || [], level, awakeningCode);
  const rawSkillBonus = skills.reduce((total, skill) => total + (skill.total_power_bonus || 0), 0);
  const passiveEffectBonus = passiveEffectTotalPowerBonus(skills);
  const awakening = awakeningTierInfo(awakeningCode);
  const totalPower = stats.total_power_stat + rawSkillBonus + passiveEffectBonus;

  return {
    ...player,
    level,
    awakening: {
      code: awakeningCode,
      label: awakening.label,
      slug: awakening.slug,
    },
    equipment: {
      position: player.position?.code || "",
      levels: stats.source.equipment_levels,
      bonuses: stats.equipment_bonus,
      slots: stats.equipment_slots,
    },
    stats,
    skills,
    total_power_breakdown: {
      stats: stats.total_power_stat,
      skills: rawSkillBonus,
      passive_effects: passiveEffectBonus,
    },
    total_power: totalPower,
  };
}


function simulateCollectionEntry(entry, equipmentLevelsByPosition = currentCollectionEquipment()) {
  const player = playerById(entry?.playerId || entry?.player?.id);
  if (!player) {
    return null;
  }
  const level = clampNumber(entry?.level || 1, 1, 300);
  const awakeningCode = normalizeAwakeningCodeForPlayer(player, entry?.rarity ?? player.awakening?.code ?? 9);
  return simulatePlayerWithConfig(player, { level, awakeningCode, equipmentLevelsByPosition });
}

function collectionTotalCapacity(entries = ownedCollectionEntries(), equipmentLevelsByPosition = currentCollectionEquipment()) {
  return (entries || []).reduce((total, entry) => {
    if (entry?.owned === false) {
      return total;
    }
    const simulated = simulateCollectionEntry(entry, equipmentLevelsByPosition);
    return total + Number(simulated?.total_power || 0);
  }, 0);
}

function computeSimulatorStats(player, level, awakeningCode, equipmentLevelsByPosition = state.simulator.equipmentLevelsByPosition) {
  const growth = state.statTables.growth_patterns?.[String(player.growth_pattern_code)]?.[String(level)] || {};
  const coefficients = state.statTables.awakening_coefficients?.[String(awakeningCode)] || {};
  const equipment = equipmentBonusForPlayer(player, equipmentLevelsByPosition);
  const stats = {};

  for (const key of STAT_KEYS) {
    const base = Number(growth[key] || 0);
    const coefficient = Number(coefficients[key] || 10000);
    stats[key] = Math.floor((base * coefficient) / 10000) + Number(equipment.bonuses[key] || 0);
  }
  stats.tp = Number(growth.tp || 0);
  stats.stat_total = stats.tp + stats.kick + stats.technique + stats.block + stats.catch + stats.speed;
  stats.total_power_stat = totalPowerStatFromStats(stats);
  stats.equipment_slots = equipment.slots;
  stats.equipment_bonus = equipment.bonuses;
  stats.source = {
    level,
    awakening_code: awakeningCode,
    equipment_levels: equipmentLevelsForPositionFromSource(player.position?.code || "", equipmentLevelsByPosition),
  };
  return stats;
}

function totalPowerStatFromStats(stats) {
  return Object.entries(TOTAL_POWER_STAT_COEFFICIENTS).reduce((total, [key, coefficient]) => {
    return total + Math.floor((Number(stats[key] || 0) * coefficient) / 10000);
  }, 0);
}

function passiveEffectTotalPowerBonus(skills) {
  return (skills || []).reduce((total, skill) => {
    if (skill.kind !== "passive" || skill.locked) {
      return total;
    }
    return total + (skill.effects || []).reduce((effectTotal, effect) => {
      return effectTotal + passiveEffectTotalPowerValue(effect);
    }, 0);
  }, 0);
}

function passiveEffectTotalPowerValue(effect) {
  const amount = Number(effect?.amount || 0);
  if (!amount) {
    return 0;
  }
  const effectType = effect?.effect_type_jp || "";
  const statCoefficient = PASSIVE_EFFECT_TOTAL_POWER_COEFFICIENTS[effectType];
  if (statCoefficient) {
    return Math.floor((amount * statCoefficient) / 10000);
  }
  if (effectType === ALL_MAIN_STATS_EFFECT_TYPE) {
    return Object.values(TOTAL_POWER_STAT_COEFFICIENTS).reduce((total, coefficient) => {
      return total + Math.floor((amount * coefficient) / 10000);
    }, 0);
  }
  if (effectType === MOVE_POWER_EFFECT_TYPE) {
    return amount * MOVE_POWER_EFFECT_TOTAL_POWER_MULTIPLIER;
  }
  if (effectType === MOVE_CRITICAL_EFFECT_TYPE) {
    return Math.floor(amount / MOVE_CRITICAL_EFFECT_TOTAL_POWER_DIVISOR);
  }
  if (effectType === MOVE_RANGE_EFFECT_TYPE) {
    return amount * MOVE_RANGE_EFFECT_TOTAL_POWER_MULTIPLIER;
  }
  return 0;
}

function equipmentBonusForPlayer(player, equipmentLevelsByPosition = state.simulator.equipmentLevelsByPosition) {
  const position = player.position?.code || "";
  const slots = equipmentSlotsForPlayer(player);
  const byPosition = state.statTables.equipment?.[position] || {};
  const bonuses = Object.fromEntries(STAT_KEYS.map((key) => [key, 0]));

  for (const slot of slots) {
    const selectedLevel = selectedEquipmentLevelFromSource(position, slot, equipmentLevelsByPosition);
    const row = byPosition[slot.code]?.[String(selectedLevel)] || {};
    for (const key of STAT_KEYS) {
      bonuses[key] += Number(row[key] || 0);
    }
  }

  return {
    slots: slots.length,
    bonuses,
  };
}

function simulateSkills(skills, playerLevel, awakeningCode) {
  return skills
    .map((skill) => {
      if (skill.kind === "move") {
        if (Number(skill.unlock_level || 1) > playerLevel) {
          const firstLevel = firstLockedSkillLevel(skill) || {};
          return {
            ...skill,
            locked: true,
            locked_reason: `Déblocage Lv.${formatNumber(skill.unlock_level || 1)}`,
            current_level: firstLevel.level || 1,
            current_description: firstLevel.description || skill.current_description || "",
            power: firstLevel.power || skill.power || 0,
            tp_cost: firstLevel.tp_cost || skill.tp_cost || 0,
            total_power_bonus: 0,
          };
        }
        return { ...skill };
      }

      const eligibleLevels = (skill.levels || []).filter((level) => {
        const playerUnlocks = (level.unlock_player_level || []).map(Number).filter(Boolean);
        const awakeningUnlocks = (level.unlock_awakening_code || []).map(Number).filter(Boolean);
        const byPlayer = playerUnlocks.length && playerUnlocks.some((unlock) => unlock <= playerLevel);
        const byAwakening = awakeningUnlocks.length && awakeningUnlocks.some((unlock) => unlock <= awakeningCode);
        const openLevel = !playerUnlocks.length && !awakeningUnlocks.length;
        return byPlayer || byAwakening || openLevel;
      });
      if (!eligibleLevels.length) {
        const firstLevel = firstLockedSkillLevel(skill);
        return {
          ...skill,
          locked: true,
          locked_reason: firstLevel ? passiveUnlockText(firstLevel).replace(/\s-\s$/, "") : "Non débloqué",
          current_level: firstLevel?.level || skill.current_level || "-",
          current_description: firstLevel?.description || skill.current_description || "",
          total_power_bonus: 0,
        };
      }
      const current = maxBy(eligibleLevels, "level") || {};
      return {
        ...skill,
        current_level: current.level || skill.current_level || null,
        current_description: current.description || skill.current_description || "",
        effects: current.effects || [],
        total_power_bonus: Number(current.total_power_bonus || 0),
      };
    })
    .filter(Boolean);
}

function firstLockedSkillLevel(skill) {
  return (skill.levels || [])
    .slice()
    .sort((a, b) => Number(a.level || 0) - Number(b.level || 0))[0];
}

function equipmentSlotsForPlayer(player) {
  return equipmentSlotsForPosition(player.position?.code);
}

function equipmentSlotsForPosition(position) {
  return sortEquipmentSlots(state.statTables.equipment_slots?.[position] || []);
}

function sortEquipmentSlots(slots) {
  return [...slots].sort((a, b) => {
    const aOrder = EQUIPMENT_SCREEN_ORDER.indexOf(Number(a.order || 0));
    const bOrder = EQUIPMENT_SCREEN_ORDER.indexOf(Number(b.order || 0));
    const safeA = aOrder === -1 ? Number.MAX_SAFE_INTEGER : aOrder;
    const safeB = bOrder === -1 ? Number.MAX_SAFE_INTEGER : bOrder;
    return safeA - safeB || Number(a.order || 0) - Number(b.order || 0);
  });
}

function equipmentSlotLabel(slot) {
  return EQUIPMENT_SLOT_LABELS[slot.code] || slot.fr || slot.jp || slot.code;
}

function syncSimulatorEquipmentDefaults(player) {
  state.simulator.level = clampNumber(state.simulator.level, 1, 300);
  state.simulator.awakeningCode = normalizeAwakeningCodeForPlayer(player, state.simulator.awakeningCode);
  syncSimulatorEquipmentState();
  ensureEquipmentDefaultsForPosition(player.position?.code || "");
}

function syncSimulatorEquipmentState() {
  state.simulator.equipmentLevelsByPosition ||= {};
  const legacy = state.simulator.equipmentLevels || {};
  for (const position of EQUIPMENT_POSITIONS) {
    state.simulator.equipmentLevelsByPosition[position] ||= {};
    for (const slot of equipmentSlotsForPosition(position)) {
      if (state.simulator.equipmentLevelsByPosition[position][slot.code] == null) {
        state.simulator.equipmentLevelsByPosition[position][slot.code] = Number(legacy[slot.code] || DEFAULT_EQUIPMENT_LEVEL);
      }
    }
  }
}

function ensureEquipmentDefaultsForPosition(position) {
  if (!position) {
    return;
  }
  state.simulator.equipmentLevelsByPosition ||= {};
  state.simulator.equipmentLevelsByPosition[position] ||= {};
  for (const slot of equipmentSlotsForPosition(position)) {
    if (state.simulator.equipmentLevelsByPosition[position][slot.code] == null) {
      state.simulator.equipmentLevelsByPosition[position][slot.code] = DEFAULT_EQUIPMENT_LEVEL;
    }
  }
}

function equipmentLevelsForPosition(position) {
  syncSimulatorEquipmentState();
  ensureEquipmentDefaultsForPosition(position);
  return equipmentLevelsForPositionFromSource(position, state.simulator.equipmentLevelsByPosition);
}

function equipmentLevelsForPositionFromSource(position, levelsByPosition = {}) {
  const source = levelsByPosition || {};
  const bySlot = source[position] || {};
  const result = {};
  for (const slot of equipmentSlotsForPosition(position)) {
    result[slot.code] = normalizeEquipmentLevel(slot, bySlot[slot.code]);
  }
  return result;
}

function normalizeEquipmentLevel(slot, value) {
  const requested = Number(value || DEFAULT_EQUIPMENT_LEVEL);
  const levels = (slot.levels || []).map(Number);
  if (levels.includes(requested)) {
    return requested;
  }
  return levels.reduce((best, level) => (Math.abs(level - requested) < Math.abs(best - requested) ? level : best), levels[0] || DEFAULT_EQUIPMENT_LEVEL);
}

function setEquipmentLevel(position, slotCode, level) {
  if (!position || !slotCode) {
    return;
  }
  syncSimulatorEquipmentState();
  state.simulator.equipmentLevelsByPosition[position] ||= {};
  state.simulator.equipmentLevelsByPosition[position][slotCode] = Number(level) || DEFAULT_EQUIPMENT_LEVEL;
}

function renderEquipmentControl(player, slot, position = player.position?.code || "") {
  const selected = selectedEquipmentLevel(position, slot);
  const icon = equipmentIcon(slot, position, selected);
  return `
    <label class="equipment-control">
      <span class="equipment-label">
        ${icon ? `<img src="${escapeAttr(icon)}" alt="" />` : ""}
        <span>${escapeHtml(equipmentSlotLabel(slot))}</span>
      </span>
      <select data-equipment-position="${escapeAttr(position)}" data-equipment-slot="${escapeAttr(slot.code)}">
        ${(slot.levels || [])
          .map((level) => `<option value="${escapeAttr(level)}"${Number(level) === selected ? " selected" : ""}>Lv.${escapeHtml(level)}</option>`)
          .join("")}
      </select>
    </label>
  `;
}

function selectedEquipmentLevel(position, slot) {
  syncSimulatorEquipmentState();
  ensureEquipmentDefaultsForPosition(position);
  return selectedEquipmentLevelFromSource(position, slot, state.simulator.equipmentLevelsByPosition);
}

function selectedEquipmentLevelFromSource(position, slot, levelsByPosition = {}) {
  const source = levelsByPosition || {};
  return normalizeEquipmentLevel(slot, source[position]?.[slot.code]);
}

function equipmentSummary(equipment) {
  const levels = Object.values(equipment.levels || {}).map(Number).filter(Boolean);
  if (!levels.length) {
    return "Equipement -";
  }
  const allSame = levels.every((level) => level === levels[0]);
  return allSame ? `Equipement Lv.${levels[0]}` : `Equipement ${levels.map((level) => `Lv.${level}`).join(" / ")}`;
}

function equipmentIcon(slot, position, level = DEFAULT_EQUIPMENT_LEVEL) {
  const order = Number(slot.order || 0);
  if (!position || !order) {
    return null;
  }
  const grade = equipmentGradeForLevel(level);
  return assetPath(`assets/equipment/Icon_Equipment_${position}_${String(order).padStart(2, "0")}_${String(grade).padStart(4, "0")}.png`);
}

function equipmentGradeForLevel(level) {
  return Math.min(6, Math.max(1, Math.floor((Number(level || DEFAULT_EQUIPMENT_LEVEL) - 1) / 50) + 1));
}

function openEquipmentModal(player) {
  syncSimulatorEquipmentState();
  els.skillModal.classList.add("is-equipment-modal");
  els.skillModalBody.innerHTML = `
    <header class="modal-skill-head equipment-modal-head">
      <span class="equipment-modal-icon">${renderPositionBadge(player.position, { compact: true })}</span>
      <div>
        <p>Simulation</p>
        <h2 id="skillModalTitle">Configurer mes equipements</h2>
      </div>
    </header>
    <div class="equipment-modal-body">
      ${EQUIPMENT_POSITIONS.map(renderEquipmentPositionRow).join("")}
    </div>
  `;
  els.skillModal.hidden = false;
  document.body.classList.add("modal-open");
  bindEquipmentModalControls(player);
  els.skillModalClose.focus();
}

function renderEquipmentPositionRow(position) {
  ensureEquipmentDefaultsForPosition(position);
  const slots = equipmentSlotsForPosition(position);
  const levels = Object.values(equipmentLevelsForPosition(position)).map(Number).filter(Boolean);
  const average = levels.length ? Math.round(levels.reduce((total, level) => total + level, 0) / levels.length) : DEFAULT_EQUIPMENT_LEVEL;
  return `
    <section class="equipment-position-row equipment-position-${escapeAttr(position.toLowerCase())}">
      <div class="equipment-position-title">
        ${renderPositionBadge({ code: position, fr: labels.positions[position] }, { compact: true })}
        <span>${escapeHtml(position)}</span>
        <small>Moy. Lv.${escapeHtml(average)}</small>
      </div>
      <div class="equipment-position-slots">
        ${slots.map((slot) => renderEquipmentModalSlot(position, slot)).join("")}
      </div>
    </section>
  `;
}

function renderEquipmentModalSlot(position, slot) {
  const selected = selectedEquipmentLevel(position, slot);
  const icon = equipmentIcon(slot, position, selected);
  return `
    <label class="equipment-modal-slot">
      <span class="equipment-modal-picture">
        ${icon ? `<img src="${escapeAttr(icon)}" alt="" />` : ""}
      </span>
      <span class="equipment-modal-name">${escapeHtml(equipmentSlotLabel(slot))}</span>
      <select data-equipment-position="${escapeAttr(position)}" data-equipment-slot="${escapeAttr(slot.code)}">
        ${(slot.levels || [])
          .map((level) => `<option value="${escapeAttr(level)}"${Number(level) === selected ? " selected" : ""}>Lv.${escapeHtml(level)}</option>`)
          .join("")}
      </select>
    </label>
  `;
}

function bindEquipmentModalControls(player) {
  els.skillModalBody.querySelectorAll("[data-equipment-slot]").forEach((select) => {
    select.addEventListener("change", (event) => {
      const position = event.target.dataset.equipmentPosition || "";
      const slotCode = event.target.dataset.equipmentSlot || "";
      setEquipmentLevel(position, slotCode, event.target.value);
      const slot = equipmentSlotsForPosition(position).find((item) => item.code === slotCode);
      const image = event.target.closest(".equipment-modal-slot")?.querySelector("img");
      if (slot && image) {
        image.src = equipmentIcon(slot, position, event.target.value);
      }
      if (state.mode === "team") {
        renderTeamBuilderDetail();
      } else if (state.mode === "comparison") {
        renderComparisonDetail();
      } else {
        renderSimulatorDetail();
      }
      saveState();
    });
  });
}

function awakeningOptionsForPlayer(player) {
  const initial = Number.isFinite(Number(player.rarity?.initial_awakening_code)) ? Number(player.rarity.initial_awakening_code) : 0;
  const availableCodes = Object.keys(state.statTables.awakening_coefficients || awakeningTiers).map(Number);
  const codes = availableCodes
    .filter((code) => Number.isFinite(code) && code >= initial)
    .sort((a, b) => a - b);
  return codes.map((code) => {
    const tier = awakeningTierInfo(code);
    return {
      code,
      label: tier.label,
      slug: tier.slug,
    };
  });
}

function normalizeAwakeningCodeForPlayer(player, code) {
  const options = awakeningOptionsForPlayer(player).map((option) => Number(option.code));
  const requestedNumber = Number(code);
  const requested = Number.isFinite(requestedNumber) ? requestedNumber : options[0];
  if (options.includes(requested)) {
    return requested;
  }
  return options.find((option) => option > requested) ?? options[0] ?? 0;
}

function clampNumber(value, min, max) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return min;
  }
  return Math.min(max, Math.max(min, Math.round(number)));
}

function renderStats(stats) {
  const rows = ["tp", "kick", "technique", "block", "catch", "speed"];
  return rows
    .map((key) => {
      const statKey = key === "block" ? "block" : key;
      const iconKey = key === "block" ? "block" : key;
      const iconFile = statIconFiles[iconKey] || statIconFiles.kick;
      return `
        <div class="stat-line">
          <img src="${escapeAttr(assetPath(`assets/stats/${iconFile}.png`))}" alt="" />
          <span>${escapeHtml(labels.stats[key])}</span>
          <strong>${formatNumber(stats?.[statKey] || 0)}</strong>
        </div>
      `;
    })
    .join("");
}

function renderStatIcon(key) {
  const filename = statIconFiles[key] || statIconFiles.kick;
  return `<img src="${escapeAttr(assetPath(`assets/stats/${filename}.png`))}" alt="" />`;
}

function currentSkillLevel(skill) {
  const levels = skill?.levels || [];
  if (!levels.length) {
    return null;
  }
  const wanted = Number(skill.current_level || levels[levels.length - 1]?.level || 1);
  return levels.find((level) => Number(level.level || 0) === wanted) || levels[levels.length - 1];
}

function renderEffectBadges(effects) {
  if (!effects?.length) {
    return `<span class="effect-badge passive-only"><span class="passive-mark">P</span></span>`;
  }
  return effects
    .map((effect) => {
      const amount = effectAmount(effect);
      const negative = Number(effect.raw_amount || 0) < 0;
      const longValue = String(amount).replace(/[^0-9]/g, "").length >= 5;
      return `
      <span class="effect-badge${negative ? " is-negative" : ""}${longValue ? " is-long-value" : ""}" title="${escapeAttr(describeCoachEffect(effect))}">
        ${effectIcon(effect)}
        <strong>${escapeHtml(amount)}</strong>
      </span>
    `;
    })
    .join("");
}

function effectIcon(effect) {
  const assetName = effectAssetName(effect);
  if (assetName) {
    return coachEffectIcon(assetName);
  }
  if (isMovePowerEffect(effect?.effect_type || "")) {
    return coachEffectIcon(effectAmountVariant("PassiveEffectIcon_AddMovePower", effect));
  }
  const moveCode = moveTypeCodeFromJp(effect.target_move || "");
  if (moveCode) {
    return renderMoveTypeIcon(moveCode);
  }
  const elementCode = elementCodeFromJp(effect.target_move || "");
  if (elementCode) {
    return renderElementIcon(elementCode);
  }
  return coachEffectIcon("PassiveEffectIcon_AddCriticalProbability_01");
}

function coachEffectIcon(key) {
  const filename = String(key || "").endsWith(".png") ? key : `${key}.png`;
  return `<img class="coach-effect-asset" src="${escapeAttr(assetPath(`assets/coaches/effects/${filename}`))}" alt="" />`;
}

function effectAmountVariant(baseName, effect) {
  const raw = Number(effect?.raw_amount || 0);
  return `${baseName}_${raw < 0 ? "00" : "01"}.png`;
}

function effectAssetName(effect) {
  const baseName = coachEffectIconBases[effect?.effect_type || ""];
  return baseName ? effectAmountVariant(baseName, effect) : null;
}

function isMovePowerEffect(type) {
  return type === "\u6280\u5a01\u529b\u52a0\u6e1b\u7b97";
}

function effectStatKey(effect) {
  return effectAssetName(effect);
}

function effectAmount(effect) {
  const raw = Number(effect?.raw_amount || 0);
  const value = scaledEffectAmount(raw, effect?.effect_type || "");
  const text = Number.isInteger(value) ? String(Math.abs(value)) : String(Math.abs(value)).replace(".", ",");
  return effect?.effect_type?.includes("率") ? `${text}%` : text;
}

function scaledEffectAmount(raw, type) {
  if (type.includes("率")) {
    return Math.round((raw / 100) * 100) / 100;
  }
  return raw;
}

function describeSkillLevel(level) {
  if (level?.description) {
    return level.description;
  }
  const effects = level?.effects || [];
  if (!effects.length) {
    return level?.description || "";
  }
  const condition = translateConditionCode(effects[0]?.activation_condition);
  const effectText = effects.map(describeCoachEffect).join(" ; ");
  const endCode = effects[0]?.end_condition;
  const endText = endCode ? ` Condition de fin : ${translateConditionCode(endCode)}.` : "";
  return `${condition} : ${effectText}.${endText}`;
}

function describeCoachEffect(effect) {
  const raw = Number(effect?.raw_amount || 0);
  const sign = raw < 0 ? "-" : "+";
  const amount = effectAmount(effect);
  const target = translateEffectTarget(effect?.target_players || "");
  const type = effect?.effect_type || "";

  if (type === "技威力加減算") {
    return `${target} : ${translateMovePowerLabel(effect?.target_move || "")} ${sign}${amount}`;
  }

  return `${target} : ${effectStatLabel(type)} ${sign}${amount}`;
}

function translateConditionCode(code) {
  const condition = state.formationConditions?.[String(code || "")];
  const kind = condition?.kind_jp || "";
  const map = {
    "試合開始時": "Au coup d'envoi",
    "ターン開始時": "Au début du tour",
    "特定プレイヤーのドリブル技使用後": "Après une technique de dribble réussie",
    "特定プレイヤーのドリブルブロック技使用後": "Après une technique de dribble ou de blocage réussie",
    "特定プレイヤーのキーパー技使用後": "Après une technique d'arrêt réussie",
    "特定エリア内": "Dans une zone précise",
    "特定エリア外": "Hors d'une zone précise",
    "試合開始時特定プレイヤー人数": "Au coup d'envoi si assez de joueurs correspondent",
    "特定プレイヤーのゴール時": "Lorsqu'un joueur marque",
  };
  return map[kind] || (code ? `Condition ${code}` : "Condition inconnue");
}

function translateEffectTarget(raw) {
  let base = "Cible";
  if (raw.includes("味方")) {
    base = "Alliés";
  } else if (raw.includes("敵")) {
    base = "Adversaires";
  } else if (raw.includes("自分")) {
    base = "Ce joueur";
  }

  const positions = [...raw.matchAll(/ポジション\[([A-Z]+)\]/g)].map((match) => match[1]);
  const tags = [...raw.matchAll(/タグ\[([^\]]+)\]/g)].map((match) => translateKnownTag(match[1]));
  const elements = [...raw.matchAll(/属性\[([^\]]+)\]/g)].map((match) => translateElementJp(match[1]));

  if (base === "Alliés" && positions.length === 1) {
    base = `Alliés recommandés au poste de ${positionLongName(positions[0])}`;
  } else if (base === "Alliés" && positions.length > 1) {
    base = `Alliés recommandés aux postes ${positions.map(positionLongName).join(" / ")}`;
  }

  const details = [];
  if (tags.length) {
    details.push(`tag ${tags.map((tag) => `[${tag}]`).join(" ou ")}`);
  }
  if (elements.length) {
    details.push(`affinité ${elements.join(" ou ")}`);
  }
  return details.length ? `${base} (${details.join(", ")})` : base;
}

function effectStatLabel(type) {
  const map = {
    "キック加減算": "Frappe",
    "テクニック加減算": "Technique",
    "ブロック加減算": "Blocage",
    "キャッチ加減算": "Arrêt",
    "スピード加減算": "Vitesse",
    "TP加減算": "TP max",
    "最大TP加減算": "TP max",
    "クリティカル率加減算": "Taux critique",
    "ファール率加減算": "Taux de faute",
  };
  return map[type] || type || "Effet";
}

function translateMovePowerLabel(value) {
  const move = translateMoveJp(value);
  if (move) {
    return `Puissance des techniques de ${move}`;
  }
  const element = elementCodeFromJp(value);
  if (element) {
    return `Puissance des techniques d'affinité ${labels.elements[element]}`;
  }
  return "Puissance des techniques";
}

function translateMoveJp(value) {
  const content = bracketContent(value);
  const map = {
    "シュート": "tir",
    "ドリブル": "dribble",
    "ブロック": "blocage",
    "キャッチ": "arrêt",
    "キーパー": "arrêt",
  };
  return map[content] || "";
}

function moveTypeCodeFromJp(value) {
  const content = bracketContent(value);
  const map = {
    "シュート": "shot",
    "ドリブル": "dribble",
    "ブロック": "block",
    "キャッチ": "save",
    "キーパー": "save",
  };
  return map[content] || null;
}

function elementCodeFromJp(value) {
  const content = bracketContent(value) || value;
  const map = {
    "火": "fire",
    "林": "wood",
    "風": "wind",
    "山": "mountain",
  };
  return map[content] || null;
}

function bracketContent(value) {
  const match = String(value || "").match(/\[([^\]]+)\]/);
  return match ? match[1] : String(value || "");
}

function translateElementJp(value) {
  return labels.elements[elementCodeFromJp(value)] || value || "-";
}

function translateKnownTag(value) {
  const map = {
    "雷門": "Raimon",
    "イナズマジャパン": "Inazuma Japan",
    "稲妻KFC": "Inazuma KFC",
    "帝国": "Royal Academy",
    "尾刈斗": "Occulte",
    "野生": "Wild",
    "御影専農": "Brainwashing",
    "秋葉名戸": "Otaku",
    "戦国伊賀": "Shuriken",
    "木戸川清修": "Kirkwood",
    "カオス": "Chaos",
    "ジェミニストーム": "Tempête des Gémeaux",
    "イプシロン": "Epsilon",
    "リトルギガント": "Little Gigantes",
    "日本代表２０２６": "Équipe du Japon 2026",
    "雷門ＯＢ": "Anciens de Raimon",
    "ザ・ジェネシス": "The Genesis",
    "ヤングイナズマ": "Jeunes Inazuma",
    "ＳＰフィクサーズ": "Secret Service",
    "ダイヤモンドダスト": "Diamond Dust",
    "ダイヤモンドダスト カオス": "Diamond Dust Chaos",
    "海賊": "Pirate",
    "海王学園": "Pirates Cove",
    "ラーメン義勇団": "Ramen",
    "プレイメイカー": "Meneur de jeu",
    "ストライカー": "Buteur",
    "ディフェンシブハーフ": "Milieu défensif",
    "ストッパー": "Stoppeur",
  };
  return map[value] || value || "-";
}

function tagFromJp(value) {
  const translated = translateKnownTag(value);
  const found = state.players
    .flatMap((player) => player.tags || [])
    .find((tag) => tag.jp === value || tag.fr === translated || tagLabel(tag) === translated || tagLabel(tag) === value);
  return found || { jp: value, fr: translated, kind: "team" };
}

function positionLongName(code) {
  const map = {
    FW: "Attaquant",
    MF: "Milieu",
    DF: "Défenseur",
    GK: "Gardien",
  };
  return map[code] || code || "-";
}

function describeSkillLevel(level) {
  if (level?.description) {
    return level.description;
  }
  const effects = level?.effects || [];
  if (!effects.length) {
    return level?.description || "";
  }
  const condition = translateConditionCode(effects[0]?.activation_condition);
  const effectText = joinFrench(effects.map(describeCoachEffect));
  const endCode = effects[0]?.end_condition;
  const endText = endCode ? ` Condition de fin : ${translateEndConditionCode(endCode)}.` : "";
  return `${condition} : ${effectText}.${endText}`;
}

function describeCoachEffect(effect) {
  const raw = Number(effect?.raw_amount || 0);
  const amount = effectAmount(effect);
  const verb = raw < 0 ? "réduit" : "augmente";
  const target = parseEffectTarget(effect?.target_players || "");
  const type = effect?.effect_type || "";

  if (type === "技威力加減算") {
    const move = translateMoveJp(effect?.target_move || "") || "technique";
    if (target.self) {
      return `${verb} la puissance de ses techniques de ${move} de ${amount}`;
    }
    return `${verb} la puissance des techniques de ${move} ${target.complement} de ${amount}`;
  }

  const stat = effectStatLabel(type);
  if (target.self) {
    return `${verb} sa statistique ${statWithDe(stat)} de ${amount}`;
  }
  return `${verb} la statistique ${statWithDe(stat)} ${target.complement} de ${amount}`;
}

function translateConditionCode(code) {
  const condition = state.formationConditions?.[String(code || "")];
  if (!condition) {
    return code ? `Condition ${code}` : "Condition inconnue";
  }
  const kind = condition.kind_jp || "";
  const setting = condition.setting_1 || "";
  const count = condition.setting_2 || "";

  if (kind === "試合開始時") {
    return "Au début du match";
  }
  if (kind === "ターン開始時") {
    return setting ? `Au début du tour ${setting}` : "Au début du tour";
  }
  if (kind === "試合開始時特定プレイヤー人数") {
    return `Au début du match, si au moins ${count || "?"} ${conditionTargetPhrase(setting)} correspondent`;
  }
  if (kind === "特定プレイヤーのゴール時") {
    return goalConditionPhrase(setting);
  }
  if (kind === "特定プレイヤーのシュートが止められた時") {
    return stoppedShotConditionPhrase(setting);
  }
  if (kind === "特定プレイヤーのドリブル技使用後") {
    return techniqueSuccessConditionPhrase(setting, "dribble");
  }
  if (kind === "特定プレイヤーのドリブルブロック技使用後") {
    return techniqueSuccessConditionPhrase(setting, "dribble ou de blocage");
  }
  if (kind === "特定プレイヤーのキーパー技使用後") {
    return techniqueSuccessConditionPhrase(setting, "gardien");
  }
  if (kind === "特定プレイヤーのシュートチェイン後") {
    return shotChainConditionPhrase(setting);
  }
  if (kind === "特定エリア内") {
    return areaInPhrase(setting);
  }
  if (kind === "特定エリア外") {
    return areaOutPhrase(setting);
  }
  return kind || `Condition ${code}`;
}

function translateEndConditionCode(code) {
  const condition = state.formationConditions?.[String(code || "")];
  if (!condition) {
    return translateConditionCode(code);
  }
  const kind = condition.kind_jp || "";
  const setting = condition.setting_1 || "";
  if (kind === "特定エリア内") {
    return areaInEndPhrase(setting);
  }
  if (kind === "特定エリア外") {
    return areaOutEndPhrase(setting);
  }
  return translateConditionCode(code);
}

function parseEffectTarget(raw) {
  const text = String(raw || "");
  const self = text.includes("自分");
  const enemy = text.includes("敵") && !self;
  const positions = [...text.matchAll(/(?:推奨)?ポジション\[([A-Z]+)\]/g)].map((match) => match[1]);
  const tags = [...text.matchAll(/タグ\[([^\]]+)\]/g)].map((match) => translateKnownTag(match[1]));
  const elements = [...text.matchAll(/属性\[([^\]]+)\]/g)].map((match) => translateElementJp(match[1]));
  return {
    self,
    enemy,
    positions,
    tags,
    elements,
    complement: targetComplement({ self, enemy, positions, tags, elements }),
  };
}

function targetComplement({ self, enemy, positions, tags, elements }) {
  if (self) {
    return "de ce joueur";
  }
  const side = enemy ? "adverses" : "alliés";
  let phrase = groupByPositions(positions, side) || (enemy ? "des adversaires" : "des alliés");
  if (elements.length) {
    phrase += ` d'élément ${joinFrench(elements)}`;
  }
  if (tags.length) {
    phrase += ` possédant le tag ${tags.map((tag) => `[${tag}]`).join(" ou ")}`;
  }
  return phrase;
}

function groupByPositions(positions, side) {
  const unique = [...new Set(positions)];
  if (!unique.length) {
    return "";
  }
  const names = unique.map((code) => positionGroupName(code));
  return `des ${joinFrench(names)} ${side}`;
}

function positionGroupName(code) {
  const map = {
    FW: "attaquants",
    MF: "milieux",
    DF: "défenseurs",
    GK: "gardiens",
  };
  return map[code] || code;
}

function conditionTargetPhrase(raw) {
  const parsed = parseEffectTarget(raw);
  if (parsed.self) {
    return parsed.positions.length ? `joueur au poste ${parsed.positions.join("/")}` : "joueur";
  }
  return parsed.complement.replace(/^des /, "").replace(/^de /, "");
}

function goalConditionPhrase(setting) {
  if (setting.includes("自分")) {
    return "Lorsque ce joueur marque un but";
  }
  if (setting.includes("敵") && setting.includes("味方")) {
    return "Lorsqu'un joueur marque un but";
  }
  if (setting.includes("敵")) {
    return "Lorsqu'un adversaire marque un but";
  }
  if (setting.includes("味方")) {
    return "Lorsqu'un allié marque un but";
  }
  return "Lorsqu'un joueur marque un but";
}

function stoppedShotConditionPhrase(setting) {
  if (setting.includes("自分")) {
    return "Lorsque le tir de ce joueur est arrêté";
  }
  if (setting.includes("敵")) {
    return "Chaque fois qu'un tir adverse est arrêté";
  }
  if (setting.includes("味方")) {
    return "Chaque fois qu'un tir allié est arrêté";
  }
  return "Chaque fois qu'un tir est arrêté";
}

function techniqueSuccessConditionPhrase(setting, moveLabel) {
  const target = parseEffectTarget(setting);
  if (target.self) {
    return `Chaque fois que sa propre technique de ${moveLabel} réussit`;
  }
  if (target.enemy || target.positions.length || target.tags.length || target.elements.length) {
    return `Chaque fois qu'une technique de ${moveLabel} ${target.complement.replace(/^des /, "d'un ")} réussit`;
  }
  if (setting.includes("味方")) {
    return `Chaque fois qu'une technique de ${moveLabel} d'un allié réussit`;
  }
  return `Chaque fois qu'une technique de ${moveLabel} réussit`;
}

function shotChainConditionPhrase(setting) {
  if (setting.includes("自分")) {
    return "Chaque fois qu'il déclenche un tir en chaîne";
  }
  if (setting.includes("敵")) {
    return "Chaque fois qu'un adversaire déclenche un tir en chaîne";
  }
  return "Chaque fois qu'un allié déclenche un tir en chaîne";
}

function areaInPhrase(setting) {
  const area = translateArea(setting);
  return area ? `Dans ${area}` : "Dans la zone indiquée";
}

function areaOutPhrase(setting) {
  const area = translateArea(setting);
  return area ? `Hors de ${area}` : "Hors de la zone indiquée";
}

function areaInEndPhrase(setting) {
  const area = translateArea(setting);
  return area ? `lorsque ce joueur entre dans ${area}` : "lorsque ce joueur entre dans la zone indiquée";
}

function areaOutEndPhrase(setting) {
  const area = translateArea(setting);
  return area ? `lorsque ce joueur quitte ${area}` : "lorsque ce joueur quitte la zone indiquée";
}

function translateArea(value) {
  const map = {
    "敵ペナルティエリア": "la surface de réparation adverse",
    "味方ペナルティエリア": "sa propre surface de réparation",
    "敵陣地": "le camp adverse",
    "味方陣地": "son propre camp",
  };
  return map[value] || "";
}

function effectStatKey(effect) {
  return effectAssetName(effect);
}

function scaledEffectAmount(raw, type) {
  if (String(type || "").includes("率")) {
    return Math.round((raw / 100) * 100) / 100;
  }
  return raw;
}

function isCoachStatBoostEffect(type) {
  return Boolean(type) && type !== "技威力加減算" && !String(type || "").includes("率") && !String(type || "").includes("確率");
}

function effectStatLabel(type) {
  const map = {
    "キック加減算": "Frappe",
    "テクニック加減算": "Technique",
    "ブロック加減算": "Blocage",
    "キャッチ加減算": "Arrêt",
    "スピード加減算": "Vitesse",
    "TP加減算": "TP max",
    "最大TP加減算": "TP max",
    "クリティカル率加減算": "taux critique",
    "ファール率加減算": "taux de faute",
  };
  return map[type] || type || "Effet";
}

function statWithDe(stat) {
  return /^[AaÂÀÁÄÉÈÊIiOoUu]/.test(stat) ? `d'${stat}` : `de ${stat}`;
}

function translateMovePowerLabel(value) {
  const move = translateMoveJp(value);
  if (move) {
    return `Puissance des techniques de ${move}`;
  }
  const element = elementCodeFromJp(value);
  if (element) {
    return `Puissance des techniques d'élément ${labels.elements[element]}`;
  }
  return "Puissance des techniques";
}

function translateMoveJp(value) {
  const content = bracketContent(value);
  const map = {
    "シュート": "tir",
    "ドリブル": "dribble",
    "ブロック": "blocage",
    "キャッチ": "arrêt",
    "キーパー": "gardien",
  };
  if (map[content]) {
    return map[content];
  }
  const element = elementCodeFromJp(value);
  return element ? `élément ${labels.elements[element]}` : "";
}

function moveTypeCodeFromJp(value) {
  const content = bracketContent(value);
  const map = {
    "シュート": "shot",
    "ドリブル": "dribble",
    "ブロック": "block",
    "キャッチ": "save",
    "キーパー": "save",
  };
  return map[content] || null;
}

function elementCodeFromJp(value) {
  const content = bracketContent(value) || value;
  const map = {
    "火": "fire",
    "林": "wood",
    "風": "wind",
    "山": "mountain",
  };
  return map[content] || null;
}

function translateElementJp(value) {
  return labels.elements[elementCodeFromJp(value)] || value || "-";
}

function translateKnownTag(value) {
  const map = {
    "雷門": "Raimon",
    "新生雷門": "Nouveau Raimon",
    "イナズマジャパン": "Inazuma Japan",
    "稲妻KFC": "Inazuma KFC",
    "稲妻ＫＦＣ": "Inazuma KFC",
    "帝国": "Royal Academy",
    "尾刈斗": "Occulte",
    "野生": "Wild",
    "御影専農": "Brainwashing",
    "秋葉名戸": "Otaku",
    "戦国伊賀": "Shuriken",
    "木戸川清修": "Kirkwood",
    "世宇子": "Zeus",
    "エイリア": "Alius",
    "カオス": "Chaos",
    "ジェミニストーム": "Tempête des Gémeaux",
    "イプシロン": "Epsilon",
    "リトルギガント": "Little Gigantes",
    "日本代表２０２６": "Équipe du Japon 2026",
    "雷門ＯＢ": "Anciens de Raimon",
    "ザ・ジェネシス": "The Genesis",
    "ヤングイナズマ": "Jeunes Inazuma",
    "ＳＰフィクサーズ": "Secret Service",
    "ダイヤモンドダスト": "Diamond Dust",
    "ダイヤモンドダスト カオス": "Diamond Dust Chaos",
    "海賊": "Pirate",
    "海王学園": "Pirates Cove",
    "ラーメン義勇団": "Ramen",
    "プレイメイカー": "Meneur de jeu",
    "ストライカー": "Buteur",
    "ディフェンシブハーフ": "Milieu défensif",
    "ストッパー": "Stoppeur",
    "セカンドトップ": "Second attaquant",
    "サイドバック": "Latéral",
    "ロングシューター": "Tireur longue distance",
    "シュートブロッカー": "Bloqueur de tir",
    "キーパー": "Gardien",
    "モチベーター": "Motivateur",
  };
  return map[value] || value || "-";
}

function positionLongName(code) {
  const map = {
    FW: "Attaquant",
    MF: "Milieu",
    DF: "Défenseur",
    GK: "Gardien",
  };
  return map[code] || code || "-";
}

function joinFrench(items) {
  const values = items.filter(Boolean);
  if (values.length <= 1) {
    return values[0] || "";
  }
  return `${values.slice(0, -1).join(", ")} et ${values[values.length - 1]}`;
}

function renderSkills(skills) {
  if (!skills.length) {
    return `<p class="empty-line">Aucune technique ou capacité.</p>`;
  }
  const awakeningPassives = [];
  const levelPassives = [];
  const moves = [];

  skills.forEach((skill, index) => {
    if (skill.kind === "move") {
      moves.push({ skill, index });
      return;
    }
    if (isAwakeningPassive(skill)) {
      awakeningPassives.push({ skill, index });
      return;
    }
    levelPassives.push({ skill, index });
  });

  awakeningPassives.sort((a, b) => currentAwakeningCode(a.skill) - currentAwakeningCode(b.skill) || a.index - b.index);
  levelPassives.sort((a, b) => firstPlayerUnlockLevel(a.skill) - firstPlayerUnlockLevel(b.skill) || a.index - b.index);
  moves.sort((a, b) => firstPlayerUnlockLevel(a.skill) - firstPlayerUnlockLevel(b.skill) || a.index - b.index);

  return [
    ...awakeningPassives.map(({ skill }) => renderAwakeningPassiveCard(skill)),
    ...levelPassives.map(({ skill }) => renderSkill(skill)),
    ...moves.map(({ skill }) => renderSkill(skill)),
  ].join("");
}

function renderSkill(skill) {
  if (skill.kind === "move") {
    return renderMoveSkillCard(skill);
  }
  return renderPassiveSimpleCard(skill);
}

function isAwakeningPassive(skill) {
  return skill.kind === "passive" && (skill.levels || []).some((level) => (level.unlock_awakening_code || []).length);
}

function firstPlayerUnlockLevel(skill) {
  const levels = (skill.levels || [])
    .flatMap((level) => level.unlock_player_level || [])
    .map(Number)
    .filter((level) => Number.isFinite(level) && level > 0);
  if (levels.length) {
    return Math.min(...levels);
  }
  const fallback = Number(skill.unlock_level);
  return Number.isFinite(fallback) && fallback > 0 ? fallback : Number.MAX_SAFE_INTEGER;
}

function awakeningTierInfo(code) {
  return awakeningTiers[code] || { label: `EVEIL ${formatNumber(code)}`, slug: "unknown" };
}

function awakeningCodeForLevel(level) {
  return Number((level.unlock_awakening_code || [0])[0] || 0);
}

function currentAwakeningCode(skill) {
  const maxLevel = Number(skill.current_level || 0);
  const eligible = (skill.levels || [])
    .filter((level) => (level.unlock_awakening_code || []).length)
    .filter((level) => !maxLevel || Number(level.level || 0) <= maxLevel)
    .sort((a, b) => Number(b.level || 0) - Number(a.level || 0));
  return eligible.length ? awakeningCodeForLevel(eligible[0]) : 0;
}

function modalSkillLevels(skill) {
  if (!isAwakeningPassive(skill)) {
    return (skill.levels || []).map((level) => ({ level, tier: null, awakeningCode: 0 }));
  }
  return (skill.levels || [])
    .filter((level) => (level.unlock_awakening_code || []).length)
    .map((level) => {
      const awakeningCode = awakeningCodeForLevel(level);
      return {
        level,
        awakeningCode,
        tier: awakeningTierInfo(awakeningCode),
      };
    })
    .sort((a, b) => b.awakeningCode - a.awakeningCode || b.level.level - a.level.level);
}

function renderMoveSkillCard(skill) {
  return `
    <button class="skill-card skill-move technique-card${skill.locked ? " is-locked" : ""}" type="button" data-skill-id="${escapeAttr(skill.id)}">
      <span class="skill-level">Lv.${escapeHtml(skill.current_level || "-")}</span>
      <span class="skill-frame">
        <span class="skill-title-line">
          <span class="skill-element-icon">${renderElementIcon(skill.element?.code)}</span>
          <strong>${escapeHtml(skill.name)}</strong>
        </span>
        <span class="skill-info-line">
          <span class="skill-type-badge">${renderMoveTypeIcon(skill.type?.code)}</span>
          <span class="skill-tp">
            <span><strong>TP</strong> ${formatNumber(skill.tp_cost || 0)}</span>
            <span class="skill-green-bar"><span></span></span>
          </span>
          <span class="skill-power">
            <img src="${escapeAttr(assetPath(uiAssets.skillCards.power))}" alt="" />
            <strong>${formatNumber(skill.power || 0)}</strong>
          </span>
        </span>
        ${skill.locked ? `<span class="locked-note">${escapeHtml(skill.locked_reason || "Non débloqué")}</span>` : ""}
      </span>
    </button>
  `;
}

function renderAwakeningPassiveCard(skill) {
  return `
    <button class="skill-card skill-passive awakening-passive-card${skill.locked ? " is-locked" : ""}" type="button" data-skill-id="${escapeAttr(skill.id)}">
      <span class="skill-level">Lv.${escapeHtml(skill.current_level || "-")}</span>
      <span class="passive-mark">P</span>
      <span class="skill-name">
        <strong>${escapeHtml(skill.name)}</strong>
        ${skill.locked ? `<small>${escapeHtml(skill.locked_reason || "Non débloqué")}</small>` : ""}
      </span>
    </button>
  `;
}

function renderPassiveSimpleCard(skill) {
  return `
    <button class="skill-card skill-passive${skill.locked ? " is-locked" : ""}" type="button" data-skill-id="${escapeAttr(skill.id)}">
      <span class="skill-level">Lv.${escapeHtml(skill.current_level || "-")}</span>
      <span class="passive-mark">P</span>
      <span class="skill-name">
        <strong>${escapeHtml(skill.name)}</strong>
        <small>${escapeHtml(skill.locked ? skill.locked_reason || "Non débloqué" : skill.unlock_level ? `Déblocage Lv.${skill.unlock_level}` : "Passif")}</small>
      </span>
    </button>
  `;
}

function renderPassiveSkillCard(skill) {
  return `
    <button class="skill-card skill-passive" type="button" data-skill-id="${escapeAttr(skill.id)}">
      <span class="skill-level">Lv.${escapeHtml(skill.current_level || "-")}</span>
      <span class="skill-frame passive-frame">
        <span class="skill-title-line">
          <span class="skill-element-icon passive-element-icon"><span class="passive-mark">P</span></span>
          <strong>${escapeHtml(skill.name)}</strong>
        </span>
        <span class="skill-info-line passive-info-line">
          <span class="skill-type-badge passive-type-badge"><span class="passive-mark">P</span></span>
          <span class="skill-passive-summary">
            <span>${escapeHtml(skill.unlock_level ? `Déblocage Lv.${formatNumber(skill.unlock_level)}` : "Déblocage spécial")}</span>
            <strong>${escapeHtml(skill.total_power_bonus ? `Bonus ${formatNumber(skill.total_power_bonus)}` : "Passif")}</strong>
          </span>
        </span>
      </span>
    </button>
  `;
}

function openSkillModal(player, skillId) {
  const skill = player.skills.find((item) => item.id === skillId);
  if (!skill) {
    return;
  }

  els.skillModal.classList.remove("is-equipment-modal");
  const icon = skill.kind === "move" ? renderMoveTypeIcon(skill.type?.code) : `<span class="passive-mark">P</span>`;
  const kindLabel = skill.kind === "move" ? "Technique" : "Passif";
  const levels = modalSkillLevels(skill)
    .map((row) => `
      <li class="${row.tier ? "awakening-level-detail" : ""}">
        <strong>Lv.${escapeHtml(row.level.level)}</strong>
        <span>
          ${row.tier ? `<b class="awakening-tier awakening-tier-${escapeAttr(row.tier.slug)}">${escapeHtml(row.tier.label)}</b>` : ""}
          ${skill.kind === "passive" && !row.tier ? `<em>${escapeHtml(passiveUnlockText(row.level))}</em>` : ""}
          <span class="skill-level-description">${escapeHtml(row.level.description || "")}</span>
        </span>
      </li>
    `)
    .join("");

  els.skillModalBody.innerHTML = `
    <header class="modal-skill-head">
      ${icon}
      <div>
        <p>${escapeHtml(kindLabel)} - ${escapeHtml(displayName(player))}</p>
        <h2 id="skillModalTitle">${escapeHtml(skill.name)}</h2>
      </div>
      <span class="skill-level modal-current-level">Lv.${escapeHtml(skill.current_level || "-")}</span>
    </header>
    <div class="skill-detail modal-skill-detail">
      <p>${escapeHtml(skill.current_description || "")}</p>
      <ol>${levels}</ol>
    </div>
  `;
  els.skillModal.hidden = false;
  document.body.classList.add("modal-open");
  els.skillModalClose.focus();
}

function openCoachSkillModal(coach, skillId) {
  const formation = getCoachFormation(coach);
  const skills = [formation?.passive, ...(coach.skills || [])].filter(Boolean);
  const skill = skills.find((item, index, items) => item.id === skillId && items.findIndex((other) => other.id === item.id) === index);
  if (!skill) {
    return;
  }

  els.skillModal.classList.remove("is-equipment-modal");
  els.skillModal.classList.add("is-coach-skill-modal");
  const currentLevel = currentSkillLevel(skill);
  const levels = (skill.levels || [])
    .map((level) => {
      const active = Number(level.level || 0) === Number(skill.current_level || currentLevel?.level || 0);
      return `
        <li class="coach-skill-level-row${active ? " is-current" : ""}">
          <strong>Niv.${escapeHtml(level.level || "-")}</strong>
          <span class="coach-skill-level-content">
            <span class="coach-modal-icons">${renderEffectBadges(level.effects || [])}</span>
            <div class="skill-level-description">${renderCoachPassiveText(describeSkillLevel(level), level.summary || null)}</div>
          </span>
        </li>
      `;
    })
    .join("");

  els.skillModalBody.innerHTML = `
    <header class="modal-skill-head coach-modal-head">
      <span class="passive-mark">P</span>
      <div>
        <p>Passif - ${escapeHtml(displayName(coach))}</p>
        <h2 id="skillModalTitle">${escapeHtml(skill.name || "Passif entraîneur")}</h2>
      </div>
      <span class="skill-level modal-current-level">Niv.${escapeHtml(skill.current_level || currentLevel?.level || "-")}</span>
    </header>
    <div class="skill-detail modal-skill-detail coach-modal-detail">
      ${renderCoachPassiveText(
        describeSkillLevel(currentLevel) || skill.current_description || "",
        currentLevel?.summary || skill.current_summary || null
      )}
      <ol>${levels}</ol>
    </div>
  `;
  els.skillModal.hidden = false;
  document.body.classList.add("modal-open");
  els.skillModalClose.focus();
}

function closeSkillModal() {
  els.skillModal.hidden = true;
  els.skillModal.classList.remove("is-equipment-modal");
  els.skillModal.classList.remove("is-coach-skill-modal");
  els.skillModalBody.innerHTML = "";
  document.body.classList.remove("modal-open");
}

function passiveUnlockText(level) {
  const playerLevels = (level.unlock_player_level || []).map(formatNumber);
  const awakeningLevels = (level.unlock_awakening_code || []).map(formatNumber);
  const coachLevels = (level.unlock_coach_level || []).map(formatNumber);
  const parts = [];
  if (coachLevels.length) {
    parts.push(`Entraîneur Lv.${coachLevels.join("/")}`);
  }
  if (playerLevels.length) {
    parts.push(`Joueur Lv.${playerLevels.join("/")}`);
  }
  if (awakeningLevels.length) {
    parts.push(`Éveil ${awakeningLevels.join("/")}`);
  }
  return parts.length ? `${parts.join(" + ")} - ` : "";
}

function renderModel(player) {
  const fullbody = imageUrl(player, "fullbody");
  const portrait = imageUrl(player, "portrait");
  if (fullbody) {
    return `<img class="fullbody" src="${escapeAttr(fullbody)}" alt="" />`;
  }
  if (portrait) {
    return `<img class="portrait-large" src="${escapeAttr(portrait)}" alt="" />`;
  }
  return `<span class="model-fallback">${escapeHtml(initials(displayName(player)))}</span>`;
}

function renderPositionGrid(areas) {
  const areaByCode = new Map();
  for (const area of areas) {
    if (area.field_area_code) {
      areaByCode.set(Number(area.field_area_code), area);
    }
  }
  const layout = [
    { code: 1, row: "1", col: "1" },
    { code: 2, row: "1", col: "2 / span 2" },
    { code: 3, row: "1", col: "4" },
    { code: 4, row: "2 / span 2", col: "1" },
    { code: 5, row: "2", col: "2 / span 2" },
    { code: 6, row: "2 / span 2", col: "4" },
    { code: 7, row: "3", col: "2 / span 2" },
    { code: 8, row: "4", col: "1" },
    { code: 9, row: "4", col: "2 / span 2" },
    { code: 10, row: "4", col: "4" },
    { code: 11, row: "5", col: "2 / span 2" },
  ];
  const cells = layout.map((cell) => {
    const area = areaByCode.get(cell.code);
    return `
      <span
        class="zone-cell ${area ? `rank-${escapeAttr(String(area.rank || "").toLowerCase())}` : "rank-empty"}"
        style="grid-row:${escapeAttr(cell.row)};grid-column:${escapeAttr(cell.col)}"
        title="${escapeAttr(area ? `${area.name || ""} ${area.rank || ""}` : "")}"
      >${escapeHtml(area?.rank || "")}</span>
    `;
  });
  return `<div class="position-grid">${cells.join("")}</div>`;
}

function renderTagChip(tag) {
  const label = tagLabel(tag);
  const iconPath = tagIconPath(tag);
  const icon = iconPath ? `<img src="${escapeAttr(iconPath)}" alt="" />` : `<span>${escapeHtml(initials(label))}</span>`;
  return `<span class="tag-chip tag-${escapeAttr(tag.kind || "tag")}" title="${escapeAttr(label)}">${icon}</span>`;
}

function renderElementBadge(element) {
  const code = element?.code || "none";
  return `
    <span class="element-badge element-${escapeAttr(code)}" title="${escapeAttr(element?.fr || labels.elements[code] || code)}">
      ${renderElementIcon(code)}
    </span>
  `;
}

function renderElementIcon(code) {
  const icon = uiAssets.elements[code];
  if (!icon) {
    return `<span class="element-initial">?</span>`;
  }
  return `<img class="element-icon" src="${assetPath(icon)}" alt="" />`;
}

function renderPositionBadge(position, options = {}) {
  const code = position?.code || "?";
  const icon = uiAssets.positions[code];
  const safe = icon ? code.toLowerCase() : null;
  const label = `${code} ${position?.fr || labels.positions[code] || ""}`.trim();
  if (icon && safe) {
    return `
      <span class="position-badge position-${escapeAttr(safe)}${options.compact ? " is-compact" : ""}" title="${escapeAttr(label)}">
        <img src="${assetPath(icon)}" alt="${escapeAttr(code)}" />
      </span>
    `;
  }
  return `<span class="position-badge position-unknown">${escapeHtml(options.compact ? code : label)}</span>`;
}

function renderMoveTypeIcon(type) {
  const icon = uiAssets.skillCards.moveTypes[type] || uiAssets.skillCards.moveTypes.shot;
  return `<img class="move-type-icon" src="${assetPath(icon)}" alt="" />`;
}

function renderStars(count) {
  const total = Math.max(0, Number(count) || 0);
  if (!total) {
    return `<span class="stars">?</span>`;
  }
  return `<span class="stars">${Array.from({ length: total }, () => `<img src="${assetPath(uiAssets.ui.star)}" alt="" />`).join("")}</span>`;
}

function imageUrl(player, kind) {
  return assetPath(player.images?.[kind]?.url || null);
}

function assetPath(value) {
  if (!value) {
    return null;
  }
  return String(value).replace(/^\/+/, "");
}

function createAssetLookup(entries) {
  return Object.entries(entries).reduce((lookup, [key, value]) => {
    lookup.set(normalizeAssetLookupKey(key), value);
    return lookup;
  }, new Map());
}

function normalizeAssetLookupKey(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[’'`]/g, "")
    .replace(/[\s_.\-・]/g, "");
}

function tagIconPath(tagOrValue, preferredKind) {
  if (tagOrValue && typeof tagOrValue === "object" && tagOrValue.icon) {
    return assetPath(tagOrValue.icon);
  }
  const fallback = fallbackTagIconPath(tagOrValue, preferredKind);
  return fallback ? assetPath(fallback) : "";
}

function fallbackTagIconPath(tagOrValue, preferredKind) {
  const tag = tagOrValue && typeof tagOrValue === "object" ? tagOrValue : null;
  const values = tag
    ? [tag.fr, tag.jp, tag.slug, tag.en, tag.name, tag.label, tagLabel(tag)]
    : [tagOrValue];
  const kinds = [preferredKind || tag?.kind, "team", "style", "season"].filter(Boolean);
  for (const kind of [...new Set(kinds)]) {
    const lookup = tagIconFallbacks[kind];
    if (!lookup) {
      continue;
    }
    for (const value of values) {
      const icon = lookup.get(normalizeAssetLookupKey(value));
      if (icon) {
        return icon;
      }
    }
  }
  return "";
}

function displayName(player) {
  return player.names?.fr || player.names?.display_fr || player.names?.jp || `Personnage ${player.code}`;
}

function teamLabel(player) {
  return tagLabel(teamTag(player));
}

function teamTag(player) {
  return player.tags.find((tag) => tag.kind === "team");
}

function renderTeamLogo(player) {
  const tag = teamTag(player);
  const label = tagLabel(tag) || player.position?.fr || "";
  const icon = tagIconPath(tag, "team");
  if (icon) {
    return `
      <span class="album-card-team team-logo" title="${escapeAttr(label)}">
        <img src="${escapeAttr(icon)}" alt="${escapeAttr(label)}" />
      </span>
    `;
  }
  return `<span class="album-card-team">${escapeHtml(label)}</span>`;
}

function tagLabel(tag) {
  return tag?.fr || tag?.jp || tag?.slug || "";
}

function initials(value) {
  return String(value || "?")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString("fr-FR");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}
