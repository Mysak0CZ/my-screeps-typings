declare const OK: 0;
declare const ERR_NOT_OWNER: -1;
declare const ERR_NO_PATH: -2;
declare const ERR_NAME_EXISTS: -3;
declare const ERR_BUSY: -4;
declare const ERR_NOT_FOUND: -5;
declare const ERR_NOT_ENOUGH_ENERGY: -6;
declare const ERR_NOT_ENOUGH_RESOURCES: -6;
declare const ERR_INVALID_TARGET: -7;
declare const ERR_FULL: -8;
declare const ERR_NOT_IN_RANGE: -9;
declare const ERR_INVALID_ARGS: -10;
declare const ERR_TIRED: -11;
declare const ERR_NO_BODYPART: -12;
declare const ERR_NOT_ENOUGH_EXTENSIONS: -6;
declare const ERR_RCL_NOT_ENOUGH: -14;
declare const ERR_GCL_NOT_ENOUGH: -15;

type OK = typeof OK;
type ERR_NOT_OWNER = typeof ERR_NOT_OWNER;
type ERR_NO_PATH = typeof ERR_NO_PATH;
type ERR_NAME_EXISTS = typeof ERR_NAME_EXISTS;
type ERR_BUSY = typeof ERR_BUSY;
type ERR_NOT_FOUND = typeof ERR_NOT_FOUND;
type ERR_NOT_ENOUGH_ENERGY = typeof ERR_NOT_ENOUGH_ENERGY;
type ERR_NOT_ENOUGH_RESOURCES = typeof ERR_NOT_ENOUGH_RESOURCES;
type ERR_INVALID_TARGET = typeof ERR_INVALID_TARGET;
type ERR_FULL = typeof ERR_FULL;
type ERR_NOT_IN_RANGE = typeof ERR_NOT_IN_RANGE;
type ERR_INVALID_ARGS = typeof ERR_INVALID_ARGS;
type ERR_TIRED = typeof ERR_TIRED;
type ERR_NO_BODYPART = typeof ERR_NO_BODYPART;
type ERR_NOT_ENOUGH_EXTENSIONS = typeof ERR_NOT_ENOUGH_EXTENSIONS;
type ERR_RCL_NOT_ENOUGH = typeof ERR_RCL_NOT_ENOUGH;
type ERR_GCL_NOT_ENOUGH = typeof ERR_GCL_NOT_ENOUGH;

declare const FIND_EXIT_TOP: 1;
declare const FIND_EXIT_RIGHT: 3;
declare const FIND_EXIT_BOTTOM: 5;
declare const FIND_EXIT_LEFT: 7;
declare const FIND_EXIT: 10;
declare const FIND_CREEPS: 101;
declare const FIND_MY_CREEPS: 102;
declare const FIND_HOSTILE_CREEPS: 103;
declare const FIND_SOURCES_ACTIVE: 104;
declare const FIND_SOURCES: 105;
declare const FIND_DROPPED_RESOURCES: 106;
declare const FIND_STRUCTURES: 107;
declare const FIND_MY_STRUCTURES: 108;
declare const FIND_HOSTILE_STRUCTURES: 109;
declare const FIND_FLAGS: 110;
declare const FIND_CONSTRUCTION_SITES: 111;
declare const FIND_MY_SPAWNS: 112;
declare const FIND_HOSTILE_SPAWNS: 113;
declare const FIND_MY_CONSTRUCTION_SITES: 114;
declare const FIND_HOSTILE_CONSTRUCTION_SITES: 115;
declare const FIND_MINERALS: 116;
declare const FIND_NUKES: 117;
declare const FIND_TOMBSTONES: 118;
declare const FIND_POWER_CREEPS: 119;
declare const FIND_MY_POWER_CREEPS: 120;
declare const FIND_HOSTILE_POWER_CREEPS: 121;
declare const FIND_DEPOSITS: 122;
declare const FIND_RUINS: 123;

type FIND_EXIT_TOP = typeof FIND_EXIT_TOP;
type FIND_EXIT_RIGHT = typeof FIND_EXIT_RIGHT;
type FIND_EXIT_BOTTOM = typeof FIND_EXIT_BOTTOM;
type FIND_EXIT_LEFT = typeof FIND_EXIT_LEFT;
type FIND_EXIT = typeof FIND_EXIT;
type FIND_CREEPS = typeof FIND_CREEPS;
type FIND_MY_CREEPS = typeof FIND_MY_CREEPS;
type FIND_HOSTILE_CREEPS = typeof FIND_HOSTILE_CREEPS;
type FIND_SOURCES_ACTIVE = typeof FIND_SOURCES_ACTIVE;
type FIND_SOURCES = typeof FIND_SOURCES;
type FIND_DROPPED_RESOURCES = typeof FIND_DROPPED_RESOURCES;
type FIND_STRUCTURES = typeof FIND_STRUCTURES;
type FIND_MY_STRUCTURES = typeof FIND_MY_STRUCTURES;
type FIND_HOSTILE_STRUCTURES = typeof FIND_HOSTILE_STRUCTURES;
type FIND_FLAGS = typeof FIND_FLAGS;
type FIND_CONSTRUCTION_SITES = typeof FIND_CONSTRUCTION_SITES;
type FIND_MY_SPAWNS = typeof FIND_MY_SPAWNS;
type FIND_HOSTILE_SPAWNS = typeof FIND_HOSTILE_SPAWNS;
type FIND_MY_CONSTRUCTION_SITES = typeof FIND_MY_CONSTRUCTION_SITES;
type FIND_HOSTILE_CONSTRUCTION_SITES = typeof FIND_HOSTILE_CONSTRUCTION_SITES;
type FIND_MINERALS = typeof FIND_MINERALS;
type FIND_NUKES = typeof FIND_NUKES;
type FIND_TOMBSTONES = typeof FIND_TOMBSTONES;
type FIND_POWER_CREEPS = typeof FIND_POWER_CREEPS;
type FIND_MY_POWER_CREEPS = typeof FIND_MY_POWER_CREEPS;
type FIND_HOSTILE_POWER_CREEPS = typeof FIND_HOSTILE_POWER_CREEPS;
type FIND_DEPOSITS = typeof FIND_DEPOSITS;
type FIND_RUINS = typeof FIND_RUINS;

type FIND_EXIT_CONSTANT = FIND_EXIT_TOP | FIND_EXIT_RIGHT | FIND_EXIT_BOTTOM | FIND_EXIT_LEFT;
type FIND_CONSTANT =
    | FIND_EXIT_TOP
    | FIND_EXIT_RIGHT
    | FIND_EXIT_BOTTOM
    | FIND_EXIT_LEFT
    | FIND_EXIT
    | FIND_CREEPS
    | FIND_MY_CREEPS
    | FIND_HOSTILE_CREEPS
    | FIND_SOURCES_ACTIVE
    | FIND_SOURCES
    | FIND_DROPPED_RESOURCES
    | FIND_STRUCTURES
    | FIND_MY_STRUCTURES
    | FIND_HOSTILE_STRUCTURES
    | FIND_FLAGS
    | FIND_CONSTRUCTION_SITES
    | FIND_MY_SPAWNS
    | FIND_HOSTILE_SPAWNS
    | FIND_MY_CONSTRUCTION_SITES
    | FIND_HOSTILE_CONSTRUCTION_SITES
    | FIND_MINERALS
    | FIND_NUKES
    | FIND_TOMBSTONES
    | FIND_POWER_CREEPS
    | FIND_MY_POWER_CREEPS
    | FIND_HOSTILE_POWER_CREEPS
    | FIND_DEPOSITS
    | FIND_RUINS;

declare const TOP: 1;
declare const TOP_RIGHT: 2;
declare const RIGHT: 3;
declare const BOTTOM_RIGHT: 4;
declare const BOTTOM: 5;
declare const BOTTOM_LEFT: 6;
declare const LEFT: 7;
declare const TOP_LEFT: 8;

type TOP = typeof TOP;
type TOP_RIGHT = typeof TOP_RIGHT;
type RIGHT = typeof RIGHT;
type BOTTOM_RIGHT = typeof BOTTOM_RIGHT;
type BOTTOM = typeof BOTTOM;
type BOTTOM_LEFT = typeof BOTTOM_LEFT;
type LEFT = typeof LEFT;
type TOP_LEFT = typeof TOP_LEFT;
type DirectionConstant = TOP | TOP_RIGHT | RIGHT | BOTTOM_RIGHT | BOTTOM | BOTTOM_LEFT | LEFT | TOP_LEFT;

declare const COLOR_RED: 1;
declare const COLOR_PURPLE: 2;
declare const COLOR_BLUE: 3;
declare const COLOR_CYAN: 4;
declare const COLOR_GREEN: 5;
declare const COLOR_YELLOW: 6;
declare const COLOR_ORANGE: 7;
declare const COLOR_BROWN: 8;
declare const COLOR_GREY: 9;
declare const COLOR_WHITE: 10;

type COLOR_CONSTANT =
    | typeof COLOR_RED
    | typeof COLOR_PURPLE
    | typeof COLOR_BLUE
    | typeof COLOR_CYAN
    | typeof COLOR_GREEN
    | typeof COLOR_YELLOW
    | typeof COLOR_ORANGE
    | typeof COLOR_BROWN
    | typeof COLOR_GREY
    | typeof COLOR_WHITE;

declare const COLORS_ALL: COLOR_CONSTANT[];

declare const LOOK_CREEPS: "creep";
declare const LOOK_ENERGY: "energy";
declare const LOOK_RESOURCES: "resource";
declare const LOOK_SOURCES: "source";
declare const LOOK_MINERALS: "mineral";
declare const LOOK_DEPOSITS: "deposit";
declare const LOOK_STRUCTURES: "structure";
declare const LOOK_FLAGS: "flag";
declare const LOOK_CONSTRUCTION_SITES: "constructionSite";
declare const LOOK_NUKES: "nuke";
declare const LOOK_TERRAIN: "terrain";
declare const LOOK_TOMBSTONES: "tombstone";
declare const LOOK_POWER_CREEPS: "powerCreep";
declare const LOOK_RUINS: "ruin";

type LOOK_CREEPS = typeof LOOK_CREEPS;
type LOOK_ENERGY = typeof LOOK_ENERGY;
type LOOK_RESOURCES = typeof LOOK_RESOURCES;
type LOOK_SOURCES = typeof LOOK_SOURCES;
type LOOK_MINERALS = typeof LOOK_MINERALS;
type LOOK_DEPOSITS = typeof LOOK_DEPOSITS;
type LOOK_STRUCTURES = typeof LOOK_STRUCTURES;
type LOOK_FLAGS = typeof LOOK_FLAGS;
type LOOK_CONSTRUCTION_SITES = typeof LOOK_CONSTRUCTION_SITES;
type LOOK_NUKES = typeof LOOK_NUKES;
type LOOK_TERRAIN = typeof LOOK_TERRAIN;
type LOOK_TOMBSTONES = typeof LOOK_TOMBSTONES;
type LOOK_POWER_CREEPS = typeof LOOK_POWER_CREEPS;
type LOOK_RUINS = typeof LOOK_RUINS;
type LOOK_CONSTANT =
    | LOOK_CREEPS
    | LOOK_ENERGY
    | LOOK_RESOURCES
    | LOOK_SOURCES
    | LOOK_MINERALS
    | LOOK_DEPOSITS
    | LOOK_STRUCTURES
    | LOOK_FLAGS
    | LOOK_CONSTRUCTION_SITES
    | LOOK_NUKES
    | LOOK_TERRAIN
    | LOOK_TOMBSTONES
    | LOOK_POWER_CREEPS
    | LOOK_RUINS;

declare const OBSTACLE_OBJECT_TYPES: [
    "spawn",
    "creep",
    "powerCreep",
    "source",
    "mineral",
    "deposit",
    "controller",
    "constructedWall",
    "extension",
    "link",
    "storage",
    "tower",
    "observer",
    "powerSpawn",
    "powerBank",
    "lab",
    "terminal",
    "nuker",
    "factory",
    "invaderCore"
];

declare const MOVE: "move";
declare const WORK: "work";
declare const CARRY: "carry";
declare const ATTACK: "attack";
declare const RANGED_ATTACK: "ranged_attack";
declare const TOUGH: "tough";
declare const HEAL: "heal";
declare const CLAIM: "claim";

type BODYPART_CONSTANT =
    | typeof MOVE
    | typeof WORK
    | typeof CARRY
    | typeof ATTACK
    | typeof RANGED_ATTACK
    | typeof TOUGH
    | typeof HEAL
    | typeof CLAIM;

declare const BODYPART_COST: {
    [bodyPart: string]: number;
    move: 50;
    work: 100;
    attack: 80;
    carry: 50;
    heal: 250;
    ranged_attack: 150;
    tough: 10;
    claim: 600;
};

/**
 * @deprecated WORLD_WIDTH and WORLD_HEIGHT constants are deprecated, please use `Game.map.getWorldSize()` instead
 */
declare const WORLD_WIDTH: 202;
/**
 * @deprecated WORLD_WIDTH and WORLD_HEIGHT constants are deprecated, please use `Game.map.getWorldSize()` instead
 */
declare const WORLD_HEIGHT: 202;

declare const CREEP_LIFE_TIME: 1500;
declare const CREEP_CLAIM_LIFE_TIME: 600;
declare const CREEP_CORPSE_RATE: 0.2;
declare const CREEP_PART_MAX_ENERGY: 125;

declare const CARRY_CAPACITY: 50;
declare const HARVEST_POWER: 2;
declare const HARVEST_MINERAL_POWER: 1;
declare const HARVEST_DEPOSIT_POWER: 1;
declare const REPAIR_POWER: 100;
declare const DISMANTLE_POWER: 50;
declare const BUILD_POWER: 5;
declare const ATTACK_POWER: 30;
declare const UPGRADE_CONTROLLER_POWER: 1;
declare const RANGED_ATTACK_POWER: 10;
declare const HEAL_POWER: 12;
declare const RANGED_HEAL_POWER: 4;
declare const REPAIR_COST: 0.01;
declare const DISMANTLE_COST: 0.005;

declare const RAMPART_DECAY_AMOUNT: 300;
declare const RAMPART_DECAY_TIME: 100;
declare const RAMPART_HITS: 1;
declare const RAMPART_HITS_MAX: {
    [rcl: number]: number;
    2: 300000;
    3: 1000000;
    4: 3000000;
    5: 10000000;
    6: 30000000;
    7: 100000000;
    8: 300000000;
};

declare const ENERGY_REGEN_TIME: 300;
declare const ENERGY_DECAY: 1000;

declare const SPAWN_HITS: 5000;
declare const SPAWN_ENERGY_START: 300;
declare const SPAWN_ENERGY_CAPACITY: 300;
declare const CREEP_SPAWN_TIME: 3;
declare const SPAWN_RENEW_RATIO: 1.2;

declare const SOURCE_ENERGY_CAPACITY: 3000;
declare const SOURCE_ENERGY_NEUTRAL_CAPACITY: 1500;
declare const SOURCE_ENERGY_KEEPER_CAPACITY: 4000;

declare const WALL_HITS: 1;
declare const WALL_HITS_MAX: 300000000;

declare const EXTENSION_HITS: 1000;
declare const EXTENSION_ENERGY_CAPACITY: {
    [rcl: number]: number;
    0: 50;
    1: 50;
    2: 50;
    3: 50;
    4: 50;
    5: 50;
    6: 50;
    7: 100;
    8: 200;
};

declare const ROAD_HITS: 5000;
declare const ROAD_WEAROUT: 1;
declare const ROAD_WEAROUT_POWER_CREEP: 100;
declare const ROAD_DECAY_AMOUNT: 100;
declare const ROAD_DECAY_TIME: 1000;

declare const LINK_HITS: 1000;
declare const LINK_HITS_MAX: 1000;
declare const LINK_CAPACITY: 800;
declare const LINK_COOLDOWN: 1;
declare const LINK_LOSS_RATIO: 0.03;

declare const STORAGE_CAPACITY: 1000000;
declare const STORAGE_HITS: 10000;

declare const STRUCTURE_SPAWN: "spawn";
declare const STRUCTURE_EXTENSION: "extension";
declare const STRUCTURE_ROAD: "road";
declare const STRUCTURE_WALL: "constructedWall";
declare const STRUCTURE_RAMPART: "rampart";
declare const STRUCTURE_KEEPER_LAIR: "keeperLair";
declare const STRUCTURE_PORTAL: "portal";
declare const STRUCTURE_CONTROLLER: "controller";
declare const STRUCTURE_LINK: "link";
declare const STRUCTURE_STORAGE: "storage";
declare const STRUCTURE_TOWER: "tower";
declare const STRUCTURE_OBSERVER: "observer";
declare const STRUCTURE_POWER_BANK: "powerBank";
declare const STRUCTURE_POWER_SPAWN: "powerSpawn";
declare const STRUCTURE_EXTRACTOR: "extractor";
declare const STRUCTURE_LAB: "lab";
declare const STRUCTURE_TERMINAL: "terminal";
declare const STRUCTURE_CONTAINER: "container";
declare const STRUCTURE_NUKER: "nuker";
declare const STRUCTURE_FACTORY: "factory";
declare const STRUCTURE_INVADER_CORE: "invaderCore";
type STRUCTURE_CONSTANT =
    | typeof STRUCTURE_SPAWN
    | typeof STRUCTURE_EXTENSION
    | typeof STRUCTURE_ROAD
    | typeof STRUCTURE_WALL
    | typeof STRUCTURE_RAMPART
    | typeof STRUCTURE_KEEPER_LAIR
    | typeof STRUCTURE_PORTAL
    | typeof STRUCTURE_CONTROLLER
    | typeof STRUCTURE_LINK
    | typeof STRUCTURE_STORAGE
    | typeof STRUCTURE_TOWER
    | typeof STRUCTURE_OBSERVER
    | typeof STRUCTURE_POWER_BANK
    | typeof STRUCTURE_POWER_SPAWN
    | typeof STRUCTURE_EXTRACTOR
    | typeof STRUCTURE_LAB
    | typeof STRUCTURE_TERMINAL
    | typeof STRUCTURE_CONTAINER
    | typeof STRUCTURE_NUKER
    | typeof STRUCTURE_FACTORY
    | typeof STRUCTURE_INVADER_CORE;

declare const CONSTRUCTION_COST: {
    [type: string]: number;
    spawn: 15000;
    extension: 3000;
    road: 300;
    constructedWall: 1;
    rampart: 1;
    link: 5000;
    storage: 30000;
    tower: 5000;
    observer: 8000;
    powerSpawn: 100000;
    extractor: 5000;
    lab: 50000;
    terminal: 100000;
    container: 5000;
    nuker: 100000;
    factory: 100000;
};
declare const CONSTRUCTION_COST_ROAD_SWAMP_RATIO: 5;
declare const CONSTRUCTION_COST_ROAD_WALL_RATIO: 150;

/**
 * ```
 1: 200
 2: 45000
 3: 135000
 4: 405000
 5: 1215000
 6: 3645000
 7: 10935000
 ```
 */
declare const CONTROLLER_LEVELS: {
    [rcl: number]: number;
    1: 200;
    2: 45000;
    3: 135000;
    4: 405000;
    5: 1215000;
    6: 3645000;
    7: 10935000;
};
declare const CONTROLLER_STRUCTURES: { [type: string]: { [rcl: number]: number } };

declare const CONTROLLER_DOWNGRADE: {
    [rcl: number]: number;
    1: 20000;
    2: 10000;
    3: 20000;
    4: 40000;
    5: 80000;
    6: 120000;
    7: 150000;
    8: 200000;
};
declare const CONTROLLER_DOWNGRADE_RESTORE: 100;
declare const CONTROLLER_DOWNGRADE_SAFEMODE_THRESHOLD: 5000;
declare const CONTROLLER_CLAIM_DOWNGRADE: 300;
declare const CONTROLLER_RESERVE: 1;
declare const CONTROLLER_RESERVE_MAX: 5000;
declare const CONTROLLER_MAX_UPGRADE_PER_TICK: 15;
declare const CONTROLLER_ATTACK_BLOCKED_UPGRADE: 1000;
declare const CONTROLLER_NUKE_BLOCKED_UPGRADE: 200;

declare const SAFE_MODE_DURATION: 20000;
declare const SAFE_MODE_COOLDOWN: 50000;
declare const SAFE_MODE_COST: 1000;

declare const TOWER_HITS: 3000;
declare const TOWER_CAPACITY: 1000;
declare const TOWER_ENERGY_COST: 10;
declare const TOWER_POWER_ATTACK: 600;
declare const TOWER_POWER_HEAL: 400;
declare const TOWER_POWER_REPAIR: 800;
declare const TOWER_OPTIMAL_RANGE: 5;
declare const TOWER_FALLOFF_RANGE: 20;
declare const TOWER_FALLOFF: 0.75;

declare const OBSERVER_HITS: 500;
declare const OBSERVER_RANGE: 10;

declare const POWER_BANK_HITS: 2000000;
declare const POWER_BANK_CAPACITY_MAX: 5000;
declare const POWER_BANK_CAPACITY_MIN: 500;
declare const POWER_BANK_CAPACITY_CRIT: 0.3;
declare const POWER_BANK_DECAY: 5000;
declare const POWER_BANK_HIT_BACK: 0.5;

declare const POWER_SPAWN_HITS: 5000;
declare const POWER_SPAWN_ENERGY_CAPACITY: 5000;
declare const POWER_SPAWN_POWER_CAPACITY: 100;
declare const POWER_SPAWN_ENERGY_RATIO: 50;

declare const EXTRACTOR_HITS: 500;
declare const EXTRACTOR_COOLDOWN: 5;

declare const LAB_HITS: 500;
declare const LAB_MINERAL_CAPACITY: 3000;
declare const LAB_ENERGY_CAPACITY: 2000;
declare const LAB_BOOST_ENERGY: 20;
declare const LAB_BOOST_MINERAL: 30;
/** The LAB_COOLDOWN constant is deprecated, please use `REACTION_TIME` instead */
declare const LAB_COOLDOWN: 10;
declare const LAB_REACTION_AMOUNT: 5;
declare const LAB_UNBOOST_ENERGY: 0;
declare const LAB_UNBOOST_MINERAL: 15;

declare const GCL_POW: 2.4;
declare const GCL_MULTIPLY: 1000000;
declare const GCL_NOVICE: 3;

declare const MODE_SIMULATION: null;
declare const MODE_WORLD: null;

declare const TERRAIN_MASK_WALL: 1;
declare const TERRAIN_MASK_SWAMP: 2;
declare const TERRAIN_MASK_LAVA: 4;
type TerrainType = "plain" | "swamp" | "wall";

declare const MAX_CONSTRUCTION_SITES: 100;
declare const MAX_CREEP_SIZE: 50;

declare const MINERAL_REGEN_TIME: 50000;
declare const MINERAL_MIN_AMOUNT: {
    [mineral: string]: number;
    H: 35000;
    O: 35000;
    L: 35000;
    K: 35000;
    Z: 35000;
    U: 35000;
    X: 35000;
};
declare const MINERAL_RANDOM_FACTOR: 2;
declare const MINERAL_DENSITY: {
    [density: number]: number;
    1: 15000;
    2: 35000;
    3: 70000;
    4: 100000;
};
declare const MINERAL_DENSITY_PROBABILITY: {
    [probability: number]: number;
    1: 0.1;
    2: 0.5;
    3: 0.9;
    4: 1.0;
};
declare const MINERAL_DENSITY_CHANGE: 0.05;

declare const DENSITY_LOW: 1;
declare const DENSITY_MODERATE: 2;
declare const DENSITY_HIGH: 3;
declare const DENSITY_ULTRA: 4;
type DENSITY_CONSTANT = typeof DENSITY_LOW | typeof DENSITY_MODERATE | typeof DENSITY_HIGH | typeof DENSITY_ULTRA;

declare const DEPOSIT_EXHAUST_MULTIPLY: 0.001;
declare const DEPOSIT_EXHAUST_POW: 1.2;
declare const DEPOSIT_DECAY_TIME: 50000;

declare const TERMINAL_CAPACITY: 300000;
declare const TERMINAL_HITS: 3000;
declare const TERMINAL_SEND_COST: 0.1;
declare const TERMINAL_MIN_SEND: 100;
declare const TERMINAL_COOLDOWN: 10;

declare const CONTAINER_HITS: 250000;
declare const CONTAINER_CAPACITY: 2000;
declare const CONTAINER_DECAY: 5000;
declare const CONTAINER_DECAY_TIME: 100;
declare const CONTAINER_DECAY_TIME_OWNED: 500;

declare const NUKER_HITS: 1000;
declare const NUKER_COOLDOWN: 100000;
declare const NUKER_ENERGY_CAPACITY: 300000;
declare const NUKER_GHODIUM_CAPACITY: 5000;
declare const NUKE_LAND_TIME: 50000;
declare const NUKE_RANGE: 10;
declare const NUKE_DAMAGE: {
    [range: number]: number;
    0: 10000000;
    2: 5000000;
};

declare const FACTORY_HITS: 1000;
declare const FACTORY_CAPACITY: 50000;

declare const TOMBSTONE_DECAY_PER_PART: 5;
declare const TOMBSTONE_DECAY_POWER_CREEP: 500;

declare const RUIN_DECAY: 500;
declare const RUIN_DECAY_STRUCTURES: {
    [structure: string]: number;
    powerBank: 10;
};

declare const PORTAL_DECAY: 30000;

declare const ORDER_SELL: "sell";
declare const ORDER_BUY: "buy";

type ORDER_SELL = typeof ORDER_SELL;
type ORDER_BUY = typeof ORDER_BUY;

declare const MARKET_FEE: 0.05;

declare const MARKET_MAX_ORDERS: 300;
/** 30 days */
declare const MARKET_ORDER_LIFE_TIME: 2592000000;

declare const FLAGS_LIMIT: 10000;

declare const SUBSCRIPTION_TOKEN: "token";
type SUBSCRIPTION_TOKEN = typeof SUBSCRIPTION_TOKEN;

declare const RESOURCE_ENERGY: "energy";
declare const RESOURCE_POWER: "power";
type RESOURCE_ENERGY = typeof RESOURCE_ENERGY;
type RESOURCE_POWER = typeof RESOURCE_POWER;

declare const RESOURCE_HYDROGEN: "H";
declare const RESOURCE_OXYGEN: "O";
declare const RESOURCE_UTRIUM: "U";
declare const RESOURCE_LEMERGIUM: "L";
declare const RESOURCE_KEANIUM: "K";
declare const RESOURCE_ZYNTHIUM: "Z";
declare const RESOURCE_CATALYST: "X";
declare const RESOURCE_GHODIUM: "G";
type RESOURCE_T0 =
    | typeof RESOURCE_HYDROGEN
    | typeof RESOURCE_OXYGEN
    | typeof RESOURCE_UTRIUM
    | typeof RESOURCE_LEMERGIUM
    | typeof RESOURCE_KEANIUM
    | typeof RESOURCE_ZYNTHIUM
    | typeof RESOURCE_CATALYST
    | typeof RESOURCE_GHODIUM;

declare const RESOURCE_SILICON: "silicon";
declare const RESOURCE_METAL: "metal";
declare const RESOURCE_BIOMASS: "biomass";
declare const RESOURCE_MIST: "mist";
type RESOURCE_MINERAL =
    | typeof RESOURCE_SILICON
    | typeof RESOURCE_METAL
    | typeof RESOURCE_BIOMASS
    | typeof RESOURCE_MIST;

declare const RESOURCE_HYDROXIDE: "OH";
declare const RESOURCE_ZYNTHIUM_KEANITE: "ZK";
declare const RESOURCE_UTRIUM_LEMERGITE: "UL";
type RESOURCE_T1 = typeof RESOURCE_HYDROXIDE | typeof RESOURCE_ZYNTHIUM_KEANITE | typeof RESOURCE_UTRIUM_LEMERGITE;

declare const RESOURCE_UTRIUM_HYDRIDE: "UH";
declare const RESOURCE_UTRIUM_OXIDE: "UO";
declare const RESOURCE_KEANIUM_HYDRIDE: "KH";
declare const RESOURCE_KEANIUM_OXIDE: "KO";
declare const RESOURCE_LEMERGIUM_HYDRIDE: "LH";
declare const RESOURCE_LEMERGIUM_OXIDE: "LO";
declare const RESOURCE_ZYNTHIUM_HYDRIDE: "ZH";
declare const RESOURCE_ZYNTHIUM_OXIDE: "ZO";
declare const RESOURCE_GHODIUM_HYDRIDE: "GH";
declare const RESOURCE_GHODIUM_OXIDE: "GO";
type RESOURCE_T2 =
    | typeof RESOURCE_UTRIUM_HYDRIDE
    | typeof RESOURCE_UTRIUM_OXIDE
    | typeof RESOURCE_KEANIUM_HYDRIDE
    | typeof RESOURCE_KEANIUM_OXIDE
    | typeof RESOURCE_LEMERGIUM_HYDRIDE
    | typeof RESOURCE_LEMERGIUM_OXIDE
    | typeof RESOURCE_ZYNTHIUM_HYDRIDE
    | typeof RESOURCE_ZYNTHIUM_OXIDE
    | typeof RESOURCE_GHODIUM_HYDRIDE
    | typeof RESOURCE_GHODIUM_OXIDE;

declare const RESOURCE_UTRIUM_ACID: "UH2O";
declare const RESOURCE_UTRIUM_ALKALIDE: "UHO2";
declare const RESOURCE_KEANIUM_ACID: "KH2O";
declare const RESOURCE_KEANIUM_ALKALIDE: "KHO2";
declare const RESOURCE_LEMERGIUM_ACID: "LH2O";
declare const RESOURCE_LEMERGIUM_ALKALIDE: "LHO2";
declare const RESOURCE_ZYNTHIUM_ACID: "ZH2O";
declare const RESOURCE_ZYNTHIUM_ALKALIDE: "ZHO2";
declare const RESOURCE_GHODIUM_ACID: "GH2O";
declare const RESOURCE_GHODIUM_ALKALIDE: "GHO2";
type RESOURCE_T3 =
    | typeof RESOURCE_UTRIUM_ACID
    | typeof RESOURCE_UTRIUM_ALKALIDE
    | typeof RESOURCE_KEANIUM_ACID
    | typeof RESOURCE_KEANIUM_ALKALIDE
    | typeof RESOURCE_LEMERGIUM_ACID
    | typeof RESOURCE_LEMERGIUM_ALKALIDE
    | typeof RESOURCE_ZYNTHIUM_ACID
    | typeof RESOURCE_ZYNTHIUM_ALKALIDE
    | typeof RESOURCE_GHODIUM_ACID
    | typeof RESOURCE_GHODIUM_ALKALIDE;

declare const RESOURCE_CATALYZED_UTRIUM_ACID: "XUH2O";
declare const RESOURCE_CATALYZED_UTRIUM_ALKALIDE: "XUHO2";
declare const RESOURCE_CATALYZED_KEANIUM_ACID: "XKH2O";
declare const RESOURCE_CATALYZED_KEANIUM_ALKALIDE: "XKHO2";
declare const RESOURCE_CATALYZED_LEMERGIUM_ACID: "XLH2O";
declare const RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE: "XLHO2";
declare const RESOURCE_CATALYZED_ZYNTHIUM_ACID: "XZH2O";
declare const RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE: "XZHO2";
declare const RESOURCE_CATALYZED_GHODIUM_ACID: "XGH2O";
declare const RESOURCE_CATALYZED_GHODIUM_ALKALIDE: "XGHO2";
type RESOURCE_T4 =
    | typeof RESOURCE_CATALYZED_UTRIUM_ACID
    | typeof RESOURCE_CATALYZED_UTRIUM_ALKALIDE
    | typeof RESOURCE_CATALYZED_KEANIUM_ACID
    | typeof RESOURCE_CATALYZED_KEANIUM_ALKALIDE
    | typeof RESOURCE_CATALYZED_LEMERGIUM_ACID
    | typeof RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE
    | typeof RESOURCE_CATALYZED_ZYNTHIUM_ACID
    | typeof RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE
    | typeof RESOURCE_CATALYZED_GHODIUM_ACID
    | typeof RESOURCE_CATALYZED_GHODIUM_ALKALIDE;

declare const RESOURCE_OPS: "ops";

declare const RESOURCE_UTRIUM_BAR: "utrium_bar";
declare const RESOURCE_LEMERGIUM_BAR: "lemergium_bar";
declare const RESOURCE_ZYNTHIUM_BAR: "zynthium_bar";
declare const RESOURCE_KEANIUM_BAR: "keanium_bar";
declare const RESOURCE_GHODIUM_MELT: "ghodium_melt";
declare const RESOURCE_OXIDANT: "oxidant";
declare const RESOURCE_REDUCTANT: "reductant";
declare const RESOURCE_PURIFIER: "purifier";
declare const RESOURCE_BATTERY: "battery";
declare const RESOURCE_COMPOSITE: "composite";
declare const RESOURCE_CRYSTAL: "crystal";
declare const RESOURCE_LIQUID: "liquid";
declare const RESOURCE_WIRE: "wire";
declare const RESOURCE_SWITCH: "switch";
declare const RESOURCE_TRANSISTOR: "transistor";
declare const RESOURCE_MICROCHIP: "microchip";
declare const RESOURCE_CIRCUIT: "circuit";
declare const RESOURCE_DEVICE: "device";
declare const RESOURCE_CELL: "cell";
declare const RESOURCE_PHLEGM: "phlegm";
declare const RESOURCE_TISSUE: "tissue";
declare const RESOURCE_MUSCLE: "muscle";
declare const RESOURCE_ORGANOID: "organoid";
declare const RESOURCE_ORGANISM: "organism";
declare const RESOURCE_ALLOY: "alloy";
declare const RESOURCE_TUBE: "tube";
declare const RESOURCE_FIXTURES: "fixtures";
declare const RESOURCE_FRAME: "frame";
declare const RESOURCE_HYDRAULICS: "hydraulics";
declare const RESOURCE_MACHINE: "machine";
declare const RESOURCE_CONDENSATE: "condensate";
declare const RESOURCE_CONCENTRATE: "concentrate";
declare const RESOURCE_EXTRACT: "extract";
declare const RESOURCE_SPIRIT: "spirit";
declare const RESOURCE_EMANATION: "emanation";
declare const RESOURCE_ESSENCE: "essence";
type RESOURCE_FABRICATED =
    | typeof RESOURCE_UTRIUM_BAR
    | typeof RESOURCE_LEMERGIUM_BAR
    | typeof RESOURCE_ZYNTHIUM_BAR
    | typeof RESOURCE_KEANIUM_BAR
    | typeof RESOURCE_GHODIUM_MELT
    | typeof RESOURCE_OXIDANT
    | typeof RESOURCE_REDUCTANT
    | typeof RESOURCE_PURIFIER
    | typeof RESOURCE_BATTERY
    | typeof RESOURCE_COMPOSITE
    | typeof RESOURCE_CRYSTAL
    | typeof RESOURCE_LIQUID
    | typeof RESOURCE_WIRE
    | typeof RESOURCE_SWITCH
    | typeof RESOURCE_TRANSISTOR
    | typeof RESOURCE_MICROCHIP
    | typeof RESOURCE_CIRCUIT
    | typeof RESOURCE_DEVICE
    | typeof RESOURCE_CELL
    | typeof RESOURCE_PHLEGM
    | typeof RESOURCE_TISSUE
    | typeof RESOURCE_MUSCLE
    | typeof RESOURCE_ORGANOID
    | typeof RESOURCE_ORGANISM
    | typeof RESOURCE_ALLOY
    | typeof RESOURCE_TUBE
    | typeof RESOURCE_FIXTURES
    | typeof RESOURCE_FRAME
    | typeof RESOURCE_HYDRAULICS
    | typeof RESOURCE_MACHINE
    | typeof RESOURCE_CONDENSATE
    | typeof RESOURCE_CONCENTRATE
    | typeof RESOURCE_EXTRACT
    | typeof RESOURCE_SPIRIT
    | typeof RESOURCE_EMANATION
    | typeof RESOURCE_ESSENCE;

type RESOURCE_CONSTANT =
    | RESOURCE_ENERGY
    | RESOURCE_POWER
    | RESOURCE_T0
    | RESOURCE_MINERAL
    | RESOURCE_T1
    | RESOURCE_T2
    | RESOURCE_T3
    | RESOURCE_T4
    | typeof RESOURCE_OPS
    | RESOURCE_FABRICATED;

type MineableMineralConstant = RESOURCE_T0;

type MineralConstant = RESOURCE_T0 | RESOURCE_T1 | RESOURCE_T2 | RESOURCE_T3 | RESOURCE_T4;

/** @see https://docs.screeps.com/minerals.html */
declare const REACTIONS: { [mineral1: string]: { [mineral2: string]: string } };

/** @see https://docs.screeps.com/minerals.html */
declare const BOOSTS: { [bodyPart: string]: { [mineral: string]: { [action: string]: number } } };

/** @see https://docs.screeps.com/minerals.html */
declare const REACTION_TIME: { [mineral: string]: number };

/** 10 days */
declare const PORTAL_UNSTABLE: 864000000;
/** 12 days */
declare const PORTAL_MIN_TIMEOUT: 1036800000;
/** 22 days */
declare const PORTAL_MAX_TIMEOUT: 1900800000;

declare const POWER_BANK_RESPAWN_TIME: 50000;

declare const INVADERS_ENERGY_GOAL: 100000;

declare const SYSTEM_USERNAME: "Screeps";

/** @deprecated `SIGN_NOVICE_AREA` and `SIGN_RESPAWN_AREA` constants are deprecated, please use `SIGN_PLANNED_AREA` instead */
declare const SIGN_NOVICE_AREA: "A new Novice or Respawn Area is being planned somewhere in this sector. Please make sure all important rooms are reserved.";
/** @deprecated `SIGN_NOVICE_AREA` and `SIGN_RESPAWN_AREA` constants are deprecated, please use `SIGN_PLANNED_AREA` instead */
declare const SIGN_RESPAWN_AREA: "A new Novice or Respawn Area is being planned somewhere in this sector. Please make sure all important rooms are reserved.";
declare const SIGN_PLANNED_AREA: "A new Novice or Respawn Area is being planned somewhere in this sector. Please make sure all important rooms are reserved.";

declare const EVENT_ATTACK: 1;
declare const EVENT_OBJECT_DESTROYED: 2;
declare const EVENT_ATTACK_CONTROLLER: 3;
declare const EVENT_BUILD: 4;
declare const EVENT_HARVEST: 5;
declare const EVENT_HEAL: 6;
declare const EVENT_REPAIR: 7;
declare const EVENT_RESERVE_CONTROLLER: 8;
declare const EVENT_UPGRADE_CONTROLLER: 9;
declare const EVENT_EXIT: 10;
declare const EVENT_POWER: 11;
declare const EVENT_TRANSFER: 12;

type EVENT_ATTACK = typeof EVENT_ATTACK;
type EVENT_OBJECT_DESTROYED = typeof EVENT_OBJECT_DESTROYED;
type EVENT_ATTACK_CONTROLLER = typeof EVENT_ATTACK_CONTROLLER;
type EVENT_BUILD = typeof EVENT_BUILD;
type EVENT_HARVEST = typeof EVENT_HARVEST;
type EVENT_HEAL = typeof EVENT_HEAL;
type EVENT_REPAIR = typeof EVENT_REPAIR;
type EVENT_RESERVE_CONTROLLER = typeof EVENT_RESERVE_CONTROLLER;
type EVENT_UPGRADE_CONTROLLER = typeof EVENT_UPGRADE_CONTROLLER;
type EVENT_EXIT = typeof EVENT_EXIT;
type EVENT_POWER = typeof EVENT_POWER;
type EVENT_TRANSFER = typeof EVENT_TRANSFER;
type EVENT_CONSTANT =
    | EVENT_ATTACK
    | EVENT_OBJECT_DESTROYED
    | EVENT_ATTACK_CONTROLLER
    | EVENT_BUILD
    | EVENT_HARVEST
    | EVENT_HEAL
    | EVENT_REPAIR
    | EVENT_RESERVE_CONTROLLER
    | EVENT_UPGRADE_CONTROLLER
    | EVENT_EXIT
    | EVENT_POWER
    | EVENT_TRANSFER;

declare const EVENT_ATTACK_TYPE_MELEE: 1;
declare const EVENT_ATTACK_TYPE_RANGED: 2;
declare const EVENT_ATTACK_TYPE_RANGED_MASS: 3;
declare const EVENT_ATTACK_TYPE_DISMANTLE: 4;
declare const EVENT_ATTACK_TYPE_HIT_BACK: 5;
declare const EVENT_ATTACK_TYPE_NUKE: 6;
type EVENT_ATTACK_TYPE_CONSTANT =
    | typeof EVENT_ATTACK_TYPE_MELEE
    | typeof EVENT_ATTACK_TYPE_RANGED
    | typeof EVENT_ATTACK_TYPE_RANGED_MASS
    | typeof EVENT_ATTACK_TYPE_DISMANTLE
    | typeof EVENT_ATTACK_TYPE_HIT_BACK
    | typeof EVENT_ATTACK_TYPE_NUKE;

declare const EVENT_HEAL_TYPE_MELEE: 1;
declare const EVENT_HEAL_TYPE_RANGED: 2;
type EVENT_HEAL_TYPE_CONSTANT = typeof EVENT_HEAL_TYPE_MELEE | typeof EVENT_HEAL_TYPE_RANGED;

declare const POWER_LEVEL_MULTIPLY: 1000;
declare const POWER_LEVEL_POW: 2;
/** 8 hours */
declare const POWER_CREEP_SPAWN_COOLDOWN: 28800000;
/** 1 day */
declare const POWER_CREEP_DELETE_COOLDOWN: 86400000;
declare const POWER_CREEP_MAX_LEVEL: 25;
declare const POWER_CREEP_LIFE_TIME: 5000;

declare const POWER_CLASS: Readonly<{
    OPERATOR: "operator";
}>;

declare const PWR_GENERATE_OPS: 1;
declare const PWR_OPERATE_SPAWN: 2;
declare const PWR_OPERATE_TOWER: 3;
declare const PWR_OPERATE_STORAGE: 4;
declare const PWR_OPERATE_LAB: 5;
declare const PWR_OPERATE_EXTENSION: 6;
declare const PWR_OPERATE_OBSERVER: 7;
declare const PWR_OPERATE_TERMINAL: 8;
declare const PWR_DISRUPT_SPAWN: 9;
declare const PWR_DISRUPT_TOWER: 10;
declare const PWR_DISRUPT_SOURCE: 11;
declare const PWR_SHIELD: 12;
declare const PWR_REGEN_SOURCE: 13;
declare const PWR_REGEN_MINERAL: 14;
declare const PWR_DISRUPT_TERMINAL: 15;
declare const PWR_OPERATE_POWER: 16;
declare const PWR_FORTIFY: 17;
declare const PWR_OPERATE_CONTROLLER: 18;
declare const PWR_OPERATE_FACTORY: 19;
type PWR_CONSTANT = 
| typeof PWR_GENERATE_OPS
| typeof PWR_OPERATE_SPAWN
| typeof PWR_OPERATE_TOWER
| typeof PWR_OPERATE_STORAGE
| typeof PWR_OPERATE_LAB
| typeof PWR_OPERATE_EXTENSION
| typeof PWR_OPERATE_OBSERVER
| typeof PWR_OPERATE_TERMINAL
| typeof PWR_DISRUPT_SPAWN
| typeof PWR_DISRUPT_TOWER
| typeof PWR_DISRUPT_SOURCE
| typeof PWR_SHIELD
| typeof PWR_REGEN_SOURCE
| typeof PWR_REGEN_MINERAL
| typeof PWR_DISRUPT_TERMINAL
| typeof PWR_OPERATE_POWER
| typeof PWR_FORTIFY
| typeof PWR_OPERATE_CONTROLLER
| typeof PWR_OPERATE_FACTORY;

declare const EFFECT_INVULNERABILITY: 1001;
declare const EFFECT_COLLAPSE_TIMER: 1002;

declare const INVADER_CORE_HITS: 100000;
declare const INVADER_CORE_CREEP_SPAWN_TIME: {
    [level: number]: number;
    0: 0;
    1: 0;
    2: 6;
    3: 3;
    4: 2;
    5: 1;
};
declare const INVADER_CORE_EXPAND_TIME: {
    [level: number]: number;
    1: 4000;
    2: 3500;
    3: 3000;
    4: 2500;
    5: 2000;
};
declare const INVADER_CORE_CONTROLLER_POWER: 2;
declare const INVADER_CORE_CONTROLLER_DOWNGRADE: 5000;
declare const STRONGHOLD_RAMPART_HITS: {
    [level: number]: number;
    0: 0;
    1: 100000;
    2: 200000;
    3: 500000;
    4: 1000000;
    5: 2000000;
};
declare const STRONGHOLD_DECAY_TICKS: 75000;

declare const POWER_INFO: Readonly<{
    [PWR_GENERATE_OPS]: {
        className: typeof POWER_CLASS.OPERATOR;
        level: [0, 2, 7, 14, 22];
        cooldown: 50;
        effect: [1, 2, 4, 6, 8];
    };
    [PWR_OPERATE_SPAWN]: {
        className: typeof POWER_CLASS.OPERATOR;
        level: [0, 2, 7, 14, 22];
        cooldown: 300;
        duration: 1000;
        range: 3;
        ops: 100;
        effect: [0.9, 0.7, 0.5, 0.35, 0.2];
    };
    [PWR_OPERATE_TOWER]: {
        className: typeof POWER_CLASS.OPERATOR;
        level: [0, 2, 7, 14, 22];
        cooldown: 10;
        duration: 100;
        range: 3;
        ops: 10;
        effect: [1.1, 1.2, 1.3, 1.4, 1.5];
    };
    [PWR_OPERATE_STORAGE]: {
        className: typeof POWER_CLASS.OPERATOR;
        level: [0, 2, 7, 14, 22];
        cooldown: 800;
        duration: 1000;
        range: 3;
        ops: 100;
        effect: [500000, 1000000, 2000000, 4000000, 7000000];
    };
    [PWR_OPERATE_LAB]: {
        className: typeof POWER_CLASS.OPERATOR;
        level: [0, 2, 7, 14, 22];
        cooldown: 50;
        duration: 1000;
        range: 3;
        ops: 10;
        effect: [2, 4, 6, 8, 10];
    };
    [PWR_OPERATE_EXTENSION]: {
        className: typeof POWER_CLASS.OPERATOR;
        level: [0, 2, 7, 14, 22];
        cooldown: 50;
        range: 3;
        ops: 2;
        effect: [0.2, 0.4, 0.6, 0.8, 1.0];
    };
    [PWR_OPERATE_OBSERVER]: {
        className: typeof POWER_CLASS.OPERATOR;
        level: [0, 2, 7, 14, 22];
        cooldown: 400;
        duration: [200, 400, 600, 800, 1000];
        range: 3;
        ops: 10;
    };
    [PWR_OPERATE_TERMINAL]: {
        className: typeof POWER_CLASS.OPERATOR;
        level: [0, 2, 7, 14, 22];
        cooldown: 500;
        duration: 1000;
        range: 3;
        ops: 100;
        effect: [0.9, 0.8, 0.7, 0.6, 0.5];
    };
    [PWR_DISRUPT_SPAWN]: {
        className: typeof POWER_CLASS.OPERATOR;
        level: [0, 2, 7, 14, 22];
        cooldown: 5;
        range: 20;
        ops: 10;
        duration: [1, 2, 3, 4, 5];
    };
    [PWR_DISRUPT_TOWER]: {
        className: typeof POWER_CLASS.OPERATOR;
        level: [0, 2, 7, 14, 22];
        cooldown: 0;
        duration: 5;
        range: 50;
        ops: 10;
        effect: [0.9, 0.8, 0.7, 0.6, 0.5];
    };
    [PWR_DISRUPT_SOURCE]: {
        className: typeof POWER_CLASS.OPERATOR;
        level: [0, 2, 7, 14, 22];
        cooldown: 100;
        range: 3;
        ops: 100;
        duration: [100, 200, 300, 400, 500];
    };
    [PWR_SHIELD]: {
        className: typeof POWER_CLASS.OPERATOR;
        level: [0, 2, 7, 14, 22];
        effect: [5000, 10000, 15000, 20000, 25000];
        duration: 50;
        cooldown: 20;
        energy: 100;
    };
    [PWR_REGEN_SOURCE]: {
        className: typeof POWER_CLASS.OPERATOR;
        level: [10, 11, 12, 14, 22];
        cooldown: 100;
        duration: 300;
        range: 3;
        effect: [50, 100, 150, 200, 250];
        period: 15;
    };
    [PWR_REGEN_MINERAL]: {
        className: typeof POWER_CLASS.OPERATOR;
        level: [10, 11, 12, 14, 22];
        cooldown: 100;
        duration: 100;
        range: 3;
        effect: [2, 4, 6, 8, 10];
        period: 10;
    };
    [PWR_DISRUPT_TERMINAL]: {
        className: typeof POWER_CLASS.OPERATOR;
        level: [20, 21, 22, 23, 24];
        cooldown: 8;
        duration: 10;
        range: 50;
        ops: [50, 40, 30, 20, 10];
    };
    [PWR_FORTIFY]: {
        className: typeof POWER_CLASS.OPERATOR;
        level: [0, 2, 7, 14, 22];
        cooldown: 5;
        range: 3;
        ops: 5;
        duration: [1, 2, 3, 4, 5];
    };
    [PWR_OPERATE_POWER]: {
        className: typeof POWER_CLASS.OPERATOR;
        level: [10, 11, 12, 14, 22];
        cooldown: 800;
        range: 3;
        duration: 1000;
        ops: 200;
        effect: [1, 2, 3, 4, 5];
    };
    [PWR_OPERATE_CONTROLLER]: {
        className: typeof POWER_CLASS.OPERATOR;
        level: [20, 21, 22, 23, 24];
        cooldown: 800;
        range: 3;
        duration: 1000;
        ops: 200;
        effect: [10, 20, 30, 40, 50];
    };
    [PWR_OPERATE_FACTORY]: {
        className: typeof POWER_CLASS.OPERATOR;
        level: [0, 2, 7, 14, 22];
        cooldown: 800;
        range: 3;
        duration: 1000;
        ops: 100;
    };
}>;

declare const BODYPARTS_ALL: BODYPART_CONSTANT[];

declare const RESOURCES_ALL: RESOURCE_CONSTANT[];

declare const INTERSHARD_RESOURCES: [SUBSCRIPTION_TOKEN];

declare const COMMODITIES: Readonly<{
    [type: string]: Readonly<{
        amount: number;
        cooldown:number;
        components: Readonly<{
            [type: string]: number;
        }>
    }>;
}>;
