/* eslint-disable @typescript-eslint/no-empty-interface */
/* This file is ment to be modified */
interface Memory {
	creeps: { [name: string]: CreepMemory };
	flags: { [name: string]: FlagMemory };
	rooms: { [name: string]: RoomMemory };
	spawns: { [name: string]: SpawnMemory };
	powerCreeps: { [name: string]: PowerCreepMemory };
}

interface CreepMemory {}
interface FlagMemory {}
interface RoomMemory {}
interface SpawnMemory {}
interface PowerCreepMemory {}
