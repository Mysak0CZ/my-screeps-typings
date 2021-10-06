/* eslint-disable @typescript-eslint/no-empty-interface */
type CreepMemory = CreepMemory_startup_feeder | CreepMemory_startup_upgrader | CreepMemory_none;

interface CreepMemory_startup_feeder {
	role: "startup_feeder";
	state: "harvest" | "feed";
	source: string | null;
	spawn: string | null;
}

interface CreepMemory_startup_upgrader {
	role: "startup_upgrader";
	state: "harvest" | "upgrade";
	source: string | null;
}

interface CreepMemory_none {
	role: "none";
}

interface Memory {
	profiller: IProfillerMemory;
	creeps: { [name: string]: CreepMemory };
	flags: { [name: string]: FlagMemory };
	rooms: { [name: string]: RoomMemory };
	spawns: { [name: string]: SpawnMemory };
}

interface IProfillerMemory {
	[symbol: string]: {
		sum: number;
		count: number;
	};
}

interface FlagMemory {}
interface RoomMemory {}
interface SpawnMemory {}
