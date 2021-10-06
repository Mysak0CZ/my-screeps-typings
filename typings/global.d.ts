/**
 * The main file for type definitions for game screeps.
 *
 */

/**
 * The main global game object containing all the game play information.
 */
declare const Game: {
	/**
	 * A hash containing all your construction sites with their id as hash keys.
	 */
	readonly constructionSites: { [id: string]: ConstructionSite };

	/**
	 * An object containing information about your CPU usage
	 */
	readonly cpu: {
		/** Your assigned CPU limit for the current shard. */
		readonly limit: number;

		/**
		 * An amount of available CPU time at the current game tick.
		 * Usually it is higher than `Game.cpu.limit`.
		 * @tutorial https://docs.screeps.com/cpu-limit.html
		 */
		readonly tickLimit: number;

		/**
		 * An amount of unused CPU accumulated in your bucket.
		 * @tutorial https://docs.screeps.com/cpu-limit.html#Bucket
		 */
		readonly bucket: number;

		/**
		 * An object with limits for each shard with shard names as keys.
		 * You can use setShardLimits method to re-assign them
		 * @see setShardLimits
		 */
		readonly shardLimits: { [name: string]: number };

		/**
		 * Whether full CPU is currently unlocked for your account.
		 */
		readonly unlocked: boolean;

		/**
		 * The time in milliseconds since UNIX epoch time until full CPU is unlocked for your account.
		 * This property is not defined when full CPU is not unlocked for your account or it's unlocked with a subscription.
		 */
		readonly unlockedTime?: number;

		/**
		 * Use this method to get heap statistics for your virtual machine.
		 * The return value is almost identical to the Node.js function v8.getHeapStatistics().
		 * This function returns one additional property: externally_allocated_size which is the total amount of currently allocated memory which is not included in the v8 heap but counts against this isolate's memory limit.
		 * ArrayBuffer instances over a certain size are externally allocated and will be counted here.
		 * @access This method is only available when Virtual machine is set to Isolated in your account runtime settings.
		 */
		getHeapStatistics?(): HeapStatistics;

		/**
		 * Get amount of CPU time used from the beginning of the current game tick.
		 * Always returns 0 in the Simulation mode.
		 */
		getUsed(): number;

		/**
		 * This method is only available when **Virtual machine** is set to **Isolated** in your `account runtime settings`.
		 *
		 * Reset your runtime environment and wipe all data in heap memory.
		 * @see https://screeps.com/a/#!/account/runtime
		 */
		halt(): never;

		/**
		 * Allocate CPU limits to different shards. Total amount of CPU should remain equal to Game.cpu.shardLimits.
		 * This method can be used only once per 12 hours.
		 * @param limits An object with CPU values for each shard in the same format as `Game.cpu.shardLimits`.
		 * @returns {0} `OK` - The operation has been scheduled successfully.
		 * @returns {-4} `ERR_BUSY` - 12-hours cooldown period is not over yet.
		 * @returns {-10} `ERR_INVALID_ARGS` - The argument is not a valid shard limits object.
		 */
		setShardLimits(limits: { [name: string]: number }): OK | ERR_BUSY | ERR_INVALID_ARGS;

		/**
		 * Unlock full CPU for your account for additional 24 hours.
		 * This method will consume 1 CPU unlock bound to your account (See Game.resources).
		 * If full CPU is not currently unlocked for your account, it may take some time (up to 5 minutes) before unlock is applied to your account.
		 * @returns {0} `OK` - The operation has been scheduled successfully.
		 * @returns {-6} `ERR_NOT_ENOUGH_RESOURCES` - Your account does not have enough `cpuUnlock` resource.
		 * @returns {-8} `ERR_FULL` - Your CPU is unlocked with a subscription.
		 */
		unlock(): OK | ERR_NOT_ENOUGH_RESOURCES | ERR_FULL;

		/**
		 * Generate 1 pixel resource unit for 10000 CPU from your bucket.
		 * @returns {0} `OK` - The operation has been scheduled successfully.
		 * @returns {-6} `ERR_NOT_ENOUGH_RESOURCES` - Your bucket does not have enough CPU.
		 */
		generatePixel(): OK | ERR_NOT_ENOUGH_RESOURCES;
	};

	/**
	 * A hash containing all your creeps with creep names as hash keys.
	 */
	readonly creeps: { [name: string]: Creep };

	/**
	 * A hash containing all your flags with flag names as hash keys.
	 */
	readonly flags: { [name: string]: Flag };

	/**
	 * Your Global Control Level
	 * @tutorial https://docs.screeps.com/control.html#Global-Control-Level
	 */
	readonly gcl: {
		/**
		 * The current level.
		 */
		readonly level: number;

		/**
		 * The current progress to the next level.
		 */
		readonly progress: number;

		/**
		 * The progress required to reach the next level.
		 */
		readonly progressTotal: number;
	};

	/**
	 * Your Global Power Level.
	 */
	readonly gpl: {
		/** The current level. */
		readonly level: number;
		/** The current progress to the next level. */
		readonly progress: number;
		/** The progress required to reach the next level. */
		readonly progressTotal: number;
	};

	/**
	 * A global object representing world map.
	 * Use it to navigate between rooms.
	 */
	readonly map: {
		/**
		 * List all exits available from the room with the given name.
		 * @param roomName The room name.
		 * @returns The exits information in the following format, or null if the room not found.
		 */
		describeExits(
			roomName: string
		): {
			"1": RoomName;
			"3": RoomName;
			"5": RoomName;
			"7": RoomName;
		} | null;

		/**
		 * Find the exit direction from the given room en route to another room.
		 * @param fromRoom Start room name or room object.
		 * @param toRoom Finish room name or room object.
		 * @param opts An object with the pathfinding options. See findRoute.
		 * @returns The room direction constant or one of the error codes
		 * @returns {-2} `ERR_NO_PATH` - Path can not be found.
		 * @returns {-10} `ERR_INVALID_ARGS` - The location is incorrect.
		 */
		findExit(
			fromRoom: Room | RoomName,
			toRoom: Room | RoomName,
			opts?: {
				/**
				 * This callback accepts two arguments: `function(roomName, fromRoomName)`.
				 * It can be used to calculate the cost of entering that room.
				 * You can use this to do things like prioritize your own rooms, or avoid some rooms.
				 * You can return a floating point cost or `Infinity` to block the room.
				 */
				routeCallback: (roomName: string, fromRoomName: string) => number;
			}
		): FIND_EXIT_CONSTANT | ERR_NO_PATH | ERR_INVALID_ARGS;

		/**
		 * Find route from the given room to another room.
		 * @param fromRoom Start room name or room object.
		 * @param toRoom Finish room name or room object.
		 * @param opts An object with the following options: `routeCallback` his callback accepts two arguments: function(roomName, fromRoomName). It can be used to calculate the cost of entering that room. You can use this to do things like prioritize your own rooms, or avoid some rooms. You can return a floating point cost or Infinity to block the room.
		 * @returns The route array
		 */
		findRoute(
			fromRoom: Room | RoomName,
			toRoom: Room | RoomName,
			opts?: {
				/**
				 * This callback accepts two arguments: `function(roomName, fromRoomName)`.
				 * It can be used to calculate the cost of entering that room.
				 * You can use this to do things like prioritize your own rooms, or avoid some rooms.
				 * You can return a floating point cost or `Infinity` to block the room.
				 */
				routeCallback: (roomName: string, fromRoomName: string) => number;
			}
		): { exit: FIND_EXIT_CONSTANT; room: RoomName }[] | ERR_NO_PATH;

		/**
		 * Get the linear distance (in rooms) between two rooms.
		 * You can use this function to estimate the energy cost of sending resources through terminals, or using observers and nukes.
		 * @param roomName1 The name of the first room.
		 * @param roomName2 The name of the second room.
		 * @param continuous Whether to treat the world map continuous on borders. Set to true if you want to calculate the trade or terminal send cost. Default is false.
		 * @returns A number of rooms between the given two rooms.
		 */
		getRoomLinearDistance(roomName1: RoomName, roomName2: RoomName, continuous?: boolean): number;

		/**
		 * Get a Room.Terrain object which provides fast access to static terrain data.
		 * This method works for any room in the world even if you have no access to it.
		 * @param roomName The room name.
		 * @returns Returns new Room.Terrain object.
		 */
		getRoomTerrain(roomName: string): RoomTerrain;

		/**
		 * Get terrain type at the specified room position.
		 * This method works for any room in the world even if you have no access to it.
		 * @deprecated This method is deprecated and will be removed soon. Please use a faster method Game.map.getRoomTerrain instead.
		 * @param x X position in the room.
		 * @param y Y position in the room.
		 * @param roomName The room name.
		 * @returns One of the following string values:
		 */
		getTerrainAt(x: number, y: number, roomName: string): "plain" | "swamp" | "wall";
		/**
		 * Get terrain type at the specified room position.
		 * This method works for any room in the world even if you have no access to it.
		 * @deprecated This method is deprecated and will be removed soon. Please use a faster method Game.map.getRoomTerrain instead.
		 * @param pos The position object.
		 * @returns One of the following string values:
		 */
		getTerrainAt(pos: RoomPosition): "plain" | "swamp" | "wall";

		/**
		 * Returns the world size as a number of rooms between world corners.
		 * For example, for a world with rooms from W50N50 to E50S50 this method will return 102.
		 */
		getWorldSize(): number;

		/**
		 * Check if the room is available to move into.
		 * @deprecated This method is deprecated and will be removed soon. Please use Game.map.getRoomStatus instead.
		 * @param roomName The room name.
		 * @returns A boolean value.
		 */
		isRoomAvailable(roomName: string): boolean;

		/**
		 * Gets availablity status of the room with the specified name.
		 * @see https://docs.screeps.com/start-areas.html
		 * @param roomName The room name.
		 * @returns https://docs.screeps.com/api/#Game.map.getRoomStatus
		 */
		getRoomStatus(
			roomName: string
		): { status: "normal" | "closed" | "novice" | "respawn"; timestamp: number | null } | undefined;

		/**
		 * Map visuals provide a way to show various visual debug info on the game map.
		 * You can use the `Game.map.visual` object to draw simple shapes that are visible only to you.
		 *
		 * Map visuals are not stored in the database, their only purpose is to display something in your browser.
		 * All drawings will persist for one tick and will disappear if not updated.
		 * All `Game.map.visual` calls have no added CPU cost (their cost is natural and mostly related to simple `JSON.serialize` calls).
		 * However, there is a usage limit: you cannot post more than 1000 KB of serialized data.
		 *
		 * All draw coordinates are measured in global game coordinates (`RoomPosition`).
		 */
		readonly visual: {
			/**
			 * Draw a line.
			 * @param pos1 The start position object.
			 * @param pos2 The finish position object.
			 * @param style An object with the following properties
			 * @returns The `MapVisual` object itself, so that you can chain calls.
			 */
			line(pos1: RoomPosition, pos2: RoomPosition, style?: LineStyle): typeof Game.map.visual;

			/**
			 * Draw a circle.
			 * @param pos The position object of the center.
			 * @param style An object with the following properties
			 * @returns The `MapVisual` object itself, so that you can chain calls.
			 */
			circle(pos: RoomPosition, style?: CircleStyle): typeof Game.map.visual;

			/**
			 * Draw a rectangle.
			 * @param topLeftPos The position object of the top-left corner.
			 * @param width The width of the rectangle.
			 * @param height The height of the rectangle.
			 * @param style An object with the following properties
			 * @returns The `MapVisual` object itself, so that you can chain calls.
			 */
			rect(topLeftPos: RoomPosition, width: number, height: number, style?: RectStyle): typeof Game.map.visual;

			/**
			 * Draw a polyline.
			 * @param points An array of points. Every item should be a `RoomPosition` object.
			 * @param style An object with the following properties
			 * @returns The `MapVisual` object itself, so that you can chain calls.
			 */
			poly(points: RoomPosition[], style?: PolyStyle): typeof Game.map.visual;

			/**
			 * Draw a text label. You can use any valid Unicode characters, including emoji.
			 * @see http://unicode.org/emoji/charts/emoji-style.txt
			 * @param text The text message.
			 * @param pos The position object of the label baseline.
			 * @param style An object with the following properties
			 * @returns The `MapVisual` object itself, so that you can chain calls.
			 */
			text(text: string, pos: RoomPosition, style?: TextStyle2): typeof Game.map.visual;

			/**
			 * Remove all visuals from the map.
			 * @returns The `MapVisual` object itself, so that you can chain calls.
			 */
			clear(): typeof Game.map.visual;

			/**
			 * Get the stored size of all visuals added on the map in the current tick.
			 * It must not exceed 1024,000 (1000 KB).
			 * @returns The size of the visuals in bytes.
			 */
			getSize(): number;

			/**
			 * Returns a compact representation of all visuals added on the map in the current tick.
			 * @returns A string with visuals data. There's not much you can do with the string besides store them for later.
			 */
			export(): string;

			/**
			 * Add previously exported (with `Game.map.visual.export`) map visuals to the map visual data of the current tick.
			 * @param val The string returned from `Game.map.visual.export`.
			 * @returns The `MapVisual` object itself, so that you can chain calls.
			 */
			import(val: string): typeof Game.map.visual;
		}
	};

	/**
	 * A global object representing the in-game market.
	 */
	readonly market: {
		/**
		 * Your current credits balance.
		 */
		readonly credits: number;

		/**
		 * An array of the last 100 incoming transactions to your terminals
		 */
		readonly incomingTransactions: Transaction[];

		/**
		 * An array of the last 100 outgoing transactions from your terminals
		 */
		readonly outgoingTransactions: Transaction[];

		/**
		 * An object with your active and inactive buy/sell orders on the market.
		 * @see getAllOrders for properties explanation.
		 */
		readonly orders: { [id: string]: MyOrder };

		/**
		 * Estimate the energy transaction cost of `StructureTerminal.send` and `Game.market.deal` methods.
		 * The formula: `Math.ceil( amount * ( 1 - Math.exp(-distanceBetweenRooms/30) ) )`
		 * @param amount Amount of resources to be sent.
		 * @param roomName1 The name of the first room.
		 * @param roomName2 The name of the second room.
		 * @returns The amount of energy required to perform the transaction.
		 */
		calcTransactionCost(amount: number, roomName1: RoomName, roomName2: RoomName): number;

		/**
		 * Cancel a previously created order.
		 * The 5% fee is not returned.
		 * @param orderId The order ID as provided in `Game.market.orders`.
		 * @returns {0} `OK` - The operation has been scheduled successfully.
		 * @returns {-10} `ERR_INVALID_ARGS` - The order ID is not valid.
		 */
		cancelOrder(orderId: OrderId): OK | ERR_INVALID_ARGS;

		/**
		 * Change the price of an existing order.
		 * If `newPrice` is greater than old price, you will be charged `(newPrice-oldPrice)*remainingAmount*0.05` credits.
		 * @param orderId The order ID as provided in `Game.market.orders`.
		 * @param newPrice The new order price.
		 * @returns {0} `OK` - The operation has been scheduled successfully.
		 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of the room's terminal or there is no terminal.
		 * @returns {-6} `ERR_NOT_ENOUGH_RESOURCES` - You don't have enough credits to pay a fee.
		 * @returns {-10} `ERR_INVALID_ARGS` - The arguments provided are invalid.
		 */
		changeOrderPrice(
			orderId: OrderId,
			newPrice: number
		): OK | ERR_NOT_OWNER | ERR_NOT_ENOUGH_RESOURCES | ERR_INVALID_ARGS;

		/**
		 * Create a market order in your terminal.
		 * You will be charged `price*amount*0.05` credits when the order is placed.
		 * The maximum orders count is 300 per player.
		 * You can create an order at any time with any amount, it will be automatically activated and deactivated depending on the resource/credits availability.
		 * @param params An object with the following params:
		 * @returns {0} `OK` - The operation has been scheduled successfully.
		 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of the room's terminal or there is no terminal.
		 * @returns {-6} `ERR_NOT_ENOUGH_RESOURCES` - You don't have enough credits to pay a fee.
		 * @returns {-8} `ERR_FULL` - You cannot create more than 50 orders.
		 * @returns {-10} `ERR_INVALID_ARGS` - The arguments provided are invalid.
		 */
		createOrder(params: {
			/** The order type, either `ORDER_SELL` or `ORDER_BUY`. */
			type: ORDER_SELL | ORDER_BUY;
			/**
			 * Either one of the `RESOURCE_*` constants one of account-bound resources (See `INTERSHARD_RESOURCES` constant).
			 * If your Terminal doesn't have the specified resource, the order will be temporary inactive.
			 */
			resourceType: RESOURCE_CONSTANT | INTERSHARD_RESOURCE;
			/** The price for one resource unit in credits. Can be a decimal number.*/
			price: number;
			/** The amount of resources to be traded in total. */
			totalAmount: number;
			/**
			 * The room where your order will be created.
			 * You must have your own Terminal structure in this room, otherwise the created order will be temporary inactive.
			 * This argument is not used when `resourceType` is one of account-bound resources (See `INTERSHARD_RESOURCES` constant).
			 */
			roomName?: RoomName;
		}): OK | ERR_NOT_OWNER | ERR_NOT_ENOUGH_RESOURCES | ERR_FULL | ERR_INVALID_ARGS;

		/**
		 * Execute a trade deal from your Terminal in `yourRoomName` to another player's Terminal using the specified buy/sell order.
		 * Your Terminal will be charged energy units of transfer cost regardless of the order resource type.
		 * You can use `Game.market.calcTransactionCost` method to estimate it.
		 * When multiple players try to execute the same deal, the one with the shortest distance takes precedence.
		 * You cannot execute more than 10 deals during one tick.
		 * @param orderId The order ID as provided in `Game.market.getAllOrders`.
		 * @param amount The amount of resources to transfer.
		 * @param yourRoomName The name of your room which has to contain an active Terminal with enough amount of energy. This argument is not used when the order resource type is one of account-bound resources (See `INTERSHARD_RESOURCES` constant).
		 * @returns {0} `OK` - The operation has been scheduled successfully.
		 * @returns {-1} `ERR_NOT_OWNER` - You don't have a terminal in the target room.
		 * @returns {-6} `ERR_NOT_ENOUGH_RESOURCES` - You don't have enough credits or resource units.
		 * @returns {-8} `ERR_FULL` - You cannot execute more than 10 deals during one tick.
		 * @returns {-10} `ERR_INVALID_ARGS` - The arguments provided are invalid.
		 * @returns {-11} `ERR_TIRED` - The target terminal is still cooling down.
		 */
		deal(
			orderId: OrderId,
			amount: number,
			yourRoomName: string
		): OK | ERR_NOT_OWNER | ERR_NOT_ENOUGH_RESOURCES | ERR_FULL | ERR_INVALID_ARGS | ERR_TIRED;

		/**
		 * Add more capacity to an existing order.
		 * It will affect `remainingAmount` and `totalAmount` properties.
		 * You will be charged `price*addAmount*0.05` credits.
		 * @param orderId The order ID as provided in `Game.market.orders`.
		 * @param addAmount How much capacity to add. Cannot be a negative value.
		 * @returns {0} `OK` - The operation has been scheduled successfully.
		 * @returns {-6} `ERR_NOT_ENOUGH_RESOURCES` - You don't have enough credits to pay a fee.
		 * @returns {-10} `ERR_INVALID_ARGS` - The arguments provided are invalid.
		 */
		extendOrder(orderId: OrderId, addAmount: number): OK | ERR_NOT_ENOUGH_RESOURCES | ERR_INVALID_ARGS;

		/**
		 * Get other players' orders currently active on the market. This method supports internal indexing by `resourceType`.
		 * @param filter An object or function that will filter the resulting list using the `lodash.filter` method.
		 * @see https://lodash.com/docs#filter
		 */
		getAllOrders(filter?: Partial<Order> | _.DictionaryIterator<Order, boolean>): Order[];

		/**
		 * Get daily price history of the specified resource on the market for the last 14 days.
		 * @param resourceType One of the `RESOURCE_*` constants. If undefined, returns history data for all resources.
		 * @returns Returns an array of objects with the following format:
		 */
		getHistory(
			resourceType?: RESOURCE_CONSTANT
		): readonly {
			resourceType: RESOURCE_CONSTANT;
			/** format: `"2019-06-24"` */
			date: string;
			transactions: number;
			volume: number;
			avgPrice: number;
			stddevPrice: number;
		}[];

		/**
		 * Retrieve info for specific market order.
		 * @param id The order ID.
		 * @returns An object with the order info.
		 */
		getOrderById(id: string): Order;
	};

	/**
	 * A hash containing all your power creeps with their names as hash keys.
	 * Even power creeps not spawned in the world can be accessed here.
	 */
	readonly powerCreeps: { [creep: string]: PowerCreep };

	/**
	 *
	 * An object with your global resources that are bound to the account, like like pixels or cpu unlocks.
	 * Each object key is a resource constant, values are resources amounts.
	 * @todo More specific resource types
	 */
	readonly resources: { [resource: string]: number };

	/**
	 * A hash containing all the rooms available to you with room names as hash keys.
	 * A room is visible if you have a creep or an owned structure in it.
	 */
	readonly rooms: { [roomName: string]: Room };

	/**
	 * An object describing the world shard where your script is currently being executed in.
	 */
	readonly shard: {
		/**
		 * The name of the shard.
		 */
		readonly name: string;

		/**
		 * Currently always equals to normal.
		 */
		readonly type: string;

		/**
		 * Whether this shard belongs to the PTR.
		 * @tutorial https://docs.screeps.com/ptr.html
		 */
		readonly ptr: boolean;
	};

	/**
	 * A hash containing all your spawns with spawn names as hash keys.
	 */
	readonly spawns: { [spawnName: string]: StructureSpawn };

	/**
	 * A hash containing all your structures with structure id as hash keys.
	 */
	readonly structures: { [id: string]: _allOwnedStructures };

	/**
	 * System game tick counter. It is automatically incremented on every tick.
	 * @tutorial https://docs.screeps.com/game-loop.html
	 */
	readonly time: number;

	/**
	 * Get an object with the specified unique ID.
	 * It may be a game object of any type.
	 * Only objects from the rooms which are visible to you can be accessed.
	 * @param id The unique identificator.
	 * @returns Returns an object instance or null if it cannot be found.
	 */
	getObjectById<T extends { id: string }>(id: string): T | null;
	//getObjectById(id: string): any | null;

	/**
	 * Send a custom message at your profile email.
	 * This way, you can set up notifications to yourself on any occasion within the game.
	 * You can schedule up to 20 notifications during one game tick.
	 * Not available in the Simulation Room.
	 * @param message Custom text which will be sent in the message. Maximum length is 1000 characters.
	 * @param groupInterval If set to 0 (default), the notification will be scheduled immediately. Otherwise, it will be grouped with other notifications and mailed out later using the specified time in minutes.
	 */
	notify(message: string, groupInterval?: number): void;
};

/**
 * `InterShardMemory` object provides an interface for communicating between shards. Your script is executed separatedly
 * on each shard, and their `Memory` objects are isolated from each other. In order to pass messages and
 * data between shards, you need to use `InterShardMemory` instead.

 * Every shard can own raw data segment that can be accessed by all other shards. A shard can write only to its own segment,
 * other shards' data is read-only.
 *
 * This data has nothing to do with `Memory` contents, it's a separate data container.
 */
declare const InterShardMemory: {
	/**
	 * Returns the string contents of the current shard's data.
	 */
	getLocal(): string | null;

	/**
	 * Replace the current shard's data with the new value.
	 * @param value New data value in string format.
	 */
	setLocal(value: string): void;

	/**
	 * Returns the string contents of another shard's data.
	 * @param shard Shard name.
	 * @throws Error: Invalid shard
	 */
	getRemote(shard: string): string | null;
};

declare const PathFinder: {
	/**
	 * Find an optimal path between `origin` and `goal`.
	 * @param origin The start position.
	 * @param goal A goal or an array of goals. If more than one goal is supplied then the cheapest path found out of all the goals will be returned. A goal is either a RoomPosition or an object as defined below.
	 * @summary **Important**: Please note that if your goal is not walkable (for instance, a source) then you should set `range` to at least 1 or else you will waste many CPU cycles searching for a target that you can't walk on.
	 * @param opts An object containing additional pathfinding flags.
	 */
	search(
		origin: RoomPosition,
		goal:
			| RoomPosition
			| { pos: RoomPosition; range: number }
			| RoomPosition[]
			| { pos: RoomPosition; range: number }[],
		opts?: PathFinderSerachOptions
	): PathFinderPath;

	/**
	 * Specify whether to use this new experimental pathfinder in game objects methods.
	 * This method should be invoked every tick.
	 * It affects the following methods behavior: `Room.findPath`, `RoomPosition.findPathTo`, `RoomPosition.findClosestByPath`, `Creep.moveTo`.
	 * @deprecated This method is deprecated and will be removed soon.
	 * @param isEnabled Whether to activate the new pathfinder or deactivate. The default is `true`.
	 */
	use(isEnabled: boolean): void;

	readonly CostMatrix: {
		/**
		 * Creates a new CostMatrix containing 0's for all positions.
		 */
		new(): CostMatrix;

		/**
		 * Static method which deserializes a new CostMatrix using the return value of `serialize`.
		 * @param val Whatever `serialize` returned
		 */
		deserialize(val: number[]): CostMatrix;
	};
};

declare const RawMemory: {
	/**
	 * An object with asynchronous memory segments available on this tick.
	 * Each object key is the segment ID with data in string values.
	 * Use `setActiveSegments` to fetch segments on the next tick.
	 * Segments data is saved automatically in the end of the tick.
	 * The maximum size per segment is 100 KB.
	 */
	readonly segments: { [id: number]: string };

	/**
	 * An object with a memory segment of another player available on this tick.
	 * Use `setActiveForeignSegment` to fetch segments on the next tick.
	 */
	readonly foreignSegment?: {
		/** Another player's name. */
		readonly username: string;
		/** The ID of the requested memory segment. */
		readonly id: number;
		/** The segment contents. */
		readonly data: string;
	};

	/**
	 * A string with a shared memory segment available on every world shard. Maximum string length is 100 KB.
	 *
	 * **Warning**: this segment is not safe for concurrent usage!
	 * All shards have shared access to the same instance of data.
	 * When the segment contents is changed by two shards simultaneously, you may lose some data, since the segment string value is written all at once atomically.
	 * You must implement your own system to determine when each shard is allowed to rewrite the inter-shard memory, e.g. based on mutual exclusions.
	 * @see https://en.wikipedia.org/wiki/Mutual_exclusion
	 *
	 * @deprecated This property is deprecated and will be removed soon. Please use `InterShardMemory` instead.
	 */
	interShardSegment: string;

	/**
	 * Get a raw string representation of the `Memory` object.
	 */
	get(): string;

	/**
	 * Set new `Memory` value.
	 * @param value New memory value as a string.
	 */
	set(value: string): void;

	/**
	 * Request memory segments using the list of their IDs.
	 * Memory segments will become available on the next tick in `segments` object.
	 * @param ids An array of segment IDs. Each ID should be a number from 0 to 99. Maximum 10 segments can be active at the same time. Subsequent calls of `setActiveSegments` override previous ones
	 */
	setActiveSegments(ids: number[]): void;

	/**
	 * Request a memory segment of another user.
	 * The segment should be marked by its owner as public using `setPublicSegments`.
	 * The segment data will become available on the next tick in `foreignSegment` object.
	 * You can only have access to one foreign segment at the same time.
	 * @param username The name of another user. Pass `null` to clear the foreign segment.
	 * @param id The ID of the requested segment from 0 to 99. If undefined, the user's default public segment is requested as set by `setDefaultPublicSegment`.
	 */
	setActiveForeignSegment(username: string | null, id?: number): void;

	/**
	 * Set the specified segment as your default public segment. It will be returned if no `id` parameter is passed to `setActiveForeignSegment` by another user.
	 * @param id The ID of the memory segment from 0 to 99. Pass `null` to remove your default public segment.
	 */
	setDefaultPublicSegment(id: number | null): void;

	/**
	 * Set specified segments as public.
	 * Other users will be able to request access to them using `setActiveForeignSegment`.
	 * @param ids An array of segment IDs. Each ID should be a number from 0 to 99. Subsequent calls of `setPublicSegments` override previous ones.
	 */
	setPublicSegments(ids: number[]): void;

	/**
	 * Property containing Memory in it's parsed form, after it is loaded by interacting with object `Memory`.
	 * Can be used to cache Memory across ticks and prevent parsing it every tick.
	 * @private **This property is not officially documented** Use at your own risk
	 */
	_parsed?: Memory | null;
};

/* String types */
type RoomName = string;
type OrderId = string;

/** Abstract types */

interface HeapStatistics {
	total_heap_size: number;
	total_heap_size_executable: number;
	total_physical_size: number;
	total_available_size: number;
	used_heap_size: number;
	heap_size_limit: number;
	malloced_memory: number;
	peak_malloced_memory: number;
	does_zap_garbage: number;
	externally_allocated_size: number;
}

interface Transaction {
	transactionId: string;
	time: number;
	sender: { username: string };
	recipient: { username: string };
	resourceType: RESOURCE_CONSTANT | SUBSCRIPTION_TOKEN;
	amount: number;
	from: RoomName;
	to: RoomName;
	description: string;
	order?: {
		id: OrderId;
		type: ORDER_BUY | ORDER_SELL;
		price: number;
	};
}

interface Order {
	/** The unique order ID. */
	id: OrderId;
	/** The order creation time in game ticks. This property is absent for orders of the inter-shard market. */
	created?: number;
	/** The order creation time in milliseconds since UNIX epoch time. This property is absent for old orders. */
	createdTimestamp?: number;
	/** Either `ORDER_SELL` or `ORDER_BUY`. */
	type: ORDER_BUY | ORDER_SELL;
	/** Either one of the `RESOURCE_*` constants or one of account-bound resources (See `INTERSHARD_RESOURCES` constant). */
	resourceType: RESOURCE_CONSTANT | INTERSHARD_RESOURCE;
	/** The room where this order is placed. */
	roomName: RoomName;
	/** Currently available amount to trade. */
	amount: number;
	/** How many resources are left to trade via this order. */
	remainingAmount: number;
	/** The current price per unit. */
	price: number;
}

interface MyOrder extends Order {
	active: boolean;
	totalAmount: number;
}

interface PathFinderSerachOptions {
	/**
	 * Request from the pathfinder to generate a `CostMatrix` for a certain room.
	 * The callback accepts one argument, `roomName`.
	 * This callback will only be called once per room per search.
	 * If you are running multiple pathfinding operations in a single room and in a single tick you may consider caching your CostMatrix to speed up your code.
	 * If you return `false` from the callback the requested room will not be searched, and it won't count against `maxRooms`
	 */
	roomCallback?: (roomName: RoomName) => CostMatrix | boolean;

	/**
	 * Cost for walking on plain positions.
	 *
	 * The default is 1.
	 */
	plainCost?: number;

	/**
	 * Cost for walking on swamp positions.
	 *
	 * The default is 5.
	 */
	swampCost?: number;

	/**
	 * Instead of searching for a path to the goals this will search for a path away from the goals.
	 * The cheapest path that is out of `range` of every goal will be returned.
	 *
	 * The default is false.
	 */
	flee?: boolean;

	/**
	 * The maximum allowed pathfinding operations.
	 * You can limit CPU time used for the search based on ratio 1 op ~ 0.001 CPU.
	 *
	 * The default value is 2000.
	 */
	maxOps?: number;

	/**
	 * The maximum allowed rooms to search.
	 *
	 * The default is 16, maximum is 64.
	 */
	maxRooms?: number;

	/**
	 * The maximum allowed cost of the path returned.
	 * If at any point the pathfinder detects that it is impossible to find a path with a cost less than or equal to maxCost it will immediately halt the search.
	 *
	 * The default is Infinity.
	 */
	maxCost?: number;

	/**
	 * Weight to apply to the heuristic in the A* formula `F = G + weight * H`.
	 * Use this option only if you understand the underlying A* algorithm mechanics!
	 *
	 * The default value is 1.2.
	 */
	heuristicWeight?: number;
}

interface PathFinderPath {
	/** An array of RoomPosition objects. */
	path: RoomPosition[];
	/** Total number of operations performed before this path was calculated. */
	ops: number;
	/** The total cost of the path as derived from `plainCost`, `swampCost` and any given CostMatrix instances. */
	cost: number;
	/**
	 * If the pathfinder fails to find a complete path, this will be true.
	 * Note that `path` will still be populated with a partial path which represents the closest path it could find given the search parameters. */
	incomplete: boolean;
}

/**
 * Container for custom navigation cost data.
 * By default `PathFinder` will only consider terrain data (plain, swamp, wall) — if you need to route around obstacles such as buildings or creeps you must put them into a `CostMatrix`.
 * Generally you will create your `CostMatrix` from within `roomCallback`.
 * If a non-0 value is found in a room's CostMatrix then that value will be used instead of the default terrain cost.
 * You should avoid using large values in your CostMatrix and terrain cost flags.
 * For example, running `PathFinder.search` with `{ plainCost: 1, swampCost: 5 }` is faster than running it with `{plainCost: 2, swampCost: 10 }` even though your paths will be the same.
 */
interface CostMatrix {
	/** @private **This property is not officially documented** Use at your own risk! Syntax `CostMatrix._bits[x * 50 + y]` `0 ≤ value ≤ 255` */
	_bits: Uint8Array;

	/**
	 * Set the cost of a position in this CostMatrix.
	 * @param x X position in the room.
	 * @param y Y position in the room.
	 * @param cost Cost of this position. Must be a whole number. A cost of 0 will use the terrain cost for that tile. A cost greater than or equal to 255 will be treated as unwalkable.
	 */
	set(x: number, y: number, cost: number): void;

	/**
	 * Get the cost of a position in this CostMatrix.
	 * @param x X position in the room.
	 * @param y Y position in the room.
	 */
	get(x: number, y: number): number;

	/**
	 * Copy this CostMatrix into a new CostMatrix with the same data.
	 */
	clone(): CostMatrix;

	/**
	 * Returns a compact representation of this CostMatrix which can be stored via JSON.stringify.
	 */
	serialize(): number[];
}

/**
 * An object which provides fast access to room terrain data.
 * These objects can be constructed for any room in the world even if you have no access to it.
 *
 * Technically every `Room.Terrain` object is a very lightweight adapter to underlying static terrain buffers with corresponding minimal accessors.
 */
interface RoomTerrain {
	/**
	 * Get terrain type at the specified room position by `(x,y)` coordinates.
	 * Unlike the `Game.map.getTerrainAt(...)` method, this one doesn't perform any string operations and returns integer terrain type values.
	 * @param x X position in the room.
	 * @param y Y position in the room.
	 * @returns `0` - terrain is `plain`
	 * @returns `TERRAIN_MASK_WALL` - terrain is `wall`
	 * @returns `TERRAIN_MASK_SWAMP` - terrain is `swamp`
	 */
	get(x: number, y: number): 0 | typeof TERRAIN_MASK_WALL | typeof TERRAIN_MASK_SWAMP;

	/**
	 * Get copy of underlying static terrain buffer. **Current underlying representation is `Uint8Array`**.
	 *
	 * _**WARNING:** this method relies on underlying representation of terrain data.
	 * This is the fastest way to obtain terrain data of the whole room (2500 tiles), but users should keep in mind that it can be marked as deprecated anytime in the future, or return value type can be changed due to underlying data representation changing._
	 * @param destinationArray A typed array view in which terrain will be copied to.
	 * @see https://docs.screeps.com/api/#Room.Terrain.getRawBuffer
	 */
	getRawBuffer(destinationArray?: Uint8Array): Uint8Array | ERR_INVALID_ARGS;
}

/** Details of the creep being spawned currently that can be addressed by the `StructureSpawn.spawning` property. */
interface Spawning {
	/** An array with the spawn directions, see `StructureSpawn.Spawning.setDirections`. */
	readonly directions: DirectionConstant[];

	/** The name of a new creep. */
	readonly name: string;

	/** Time needed in total to complete the spawning. */
	readonly needTime: number;

	/** Remaining time to go. */
	readonly remainingTime: number;

	/** A link to the spawn. */
	readonly spawn: StructureSpawn;

	/**
	 * Cancel spawning immediately.
	 * Energy spent on spawning is not returned.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this spawn.
	 */
	cancel(): OK | ERR_NOT_OWNER;

	/**
	 * Set desired directions where the creep should move when spawned.
	 * @param directions An array with the direction constants:
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this spawn.
	 * @returns {-10} `ERR_INVALID_ARGS` - The directions is array is invalid.
	 */
	setDirections(directions: DirectionConstant[]): OK | ERR_NOT_OWNER | ERR_INVALID_ARGS;
}

interface SpawnOpts {
	/** Memory of the new creep. If provided, it will be immediately stored into `Memory.creeps[name]`. */
	memory: CreepMemory;
	/** Array of spawns/extensions from which to draw energy for the spawning process. Structures will be used according to the array order. */
	energyStructures: (StructureSpawn | StructureExtension)[];
	/** If `dryRun` is true, the operation will only check if it is possible to create a creep. */
	dryRun: boolean;
	/** Set desired directions where the creep should move when spawned. An array with the direction constants: */
	directions: DirectionConstant[];
}

interface BodyPartInfo {
	/**
	 * If the body part is boosted, this property specifies the mineral type which is used for boosting.
	 * One of the `RESOURCE_*` constants.
	 * @tutorial https://docs.screeps.com/minerals.html
	 */
	boost?: RESOURCE_T2 | RESOURCE_T3 | RESOURCE_T4 | undefined;
	/** One of the body part types constants. */
	type: BODYPART_CONSTANT;
	/** The remaining amount of hit points of this body part. */
	hits: number;
}

interface LineStyle {
	/** Line width, default is 0.1. */
	width?: number;
	/** Line color in any web format, default is `#ffffff` (white). */
	color?: string;
	/** Opacity value, default is 0.5. */
	opacity?: number;
	/** Either `undefined` (solid line), `dashed`, or `dotted`. Default is undefined. */
	lineStyle?: undefined | "dashed" | "dotted";
}

interface PolyStyle {
	/** Fill color in any web format, default is `undefined` (no fill). */
	fill?: string;
	/** Opacity value, default is 0.5. */
	opacity?: number;
	/** Stroke color in any web format, default is `#ffffff` (white). */
	stroke?: string;
	/** Stroke line width, default is 0.1. */
	strokeWidth?: number;
	/** Either `undefined` (solid line), `dashed`, or `dotted`. Default is undefined. */
	lineStyle?: undefined | "dashed" | "dotted";
}

interface CircleStyle {
	/** Circle radius, default is 0.15. */
	radius?: number;
	/** Fill color in any web format, default is `#ffffff` (white). */
	fill?: string;
	/** Opacity value, default is 0.5. */
	opacity?: number;
	/** Stroke color in any web format, default is undefined (no stroke). */
	stroke?: string;
	/** Stroke line width, default is 0.1. */
	strokeWidth?: number;
	/** Either `undefined` (solid line), `dashed`, or `dotted`. Default is undefined. */
	lineStyle?: undefined | "dashed" | "dotted";
}

interface RectStyle {
	/** Fill color in any web format, default is `#ffffff` (white). */
	fill?: string;
	/** Opacity value, default is 0.5. */
	opacity?: number;
	/** Stroke color in any web format, default is undefined (no stroke). */
	stroke?: string;
	/** Stroke line width, default is 0.1. */
	strokeWidth?: number;
	/** Either `undefined` (solid line), `dashed`, or `dotted`. Default is undefined. */
	lineStyle?: undefined | "dashed" | "dotted";
}

interface TextStyle {
	/** Font color in any web format, default is `#ffffff` (white). */
	color?: string;
	/**
	 * Either a number or a string in one of the following forms:
	 *
	 * `0.7` - relative size in game coordinates
	 *
	 * `20px` - absolute size in pixels
	 *
	 * `0.7 serif`
	 *
	 * `bold italic 1.5 Times New Roman`
	 */
	font?: number | string;
	/** Stroke color in any web format, default is undefined (no stroke). */
	stroke?: string;
	/** Stroke width, default is 0.15. */
	strokeWidth?: number;
	/** Background color in any web format, default is undefined (no background). When background is enabled, text vertical align is set to middle (default is baseline). */
	backgroundColor?: string;
	/** Background rectangle padding, default is 0.3. */
	backgroundPadding?: number;
	/** Text align, either `center`, `left`, or `right`. Default is `center`. */
	align?: "center" | "left" | "right";
	/** Opacity value, default is 1.0. */
	opacity?: number;
}

interface TextStyle2 {
	/** Font color in the following format: `#ffffff` (hex triplet). Default is #ffffff. */
	color?: string;
	/** The font family, default is `sans-serif` */
	fontFamily?: string;
	/** The font size in game coordinates, default is 10 */
	fontSize?: number;
	/** The font style ('normal', 'italic' or 'oblique') */
	fontStyle?: "normal" | "italic" | "oblique";
	/** The font variant ('normal' or 'small-caps') */
	fontVariant?: "normal" | "small-caps";
	/** Stroke color in the following format: `#ffffff` (hex triplet). Default is undefined (no stroke). */
	stroke?: string;
	/** Stroke width, default is 0.15. */
	strokeWidth?: number;
	/** Background color in the following format: `#ffffff` (hex triplet). Default is undefined (no background). When background is enabled, text vertical align is set to middle (default is baseline).*/
	backgroundColor?: string;
	/** Background rectangle padding, default is 2. */
	backgroundPadding?: number;
	/** Text align, either `center`, `left`, or `right`. Default is `center`. */
	align?: "center" | "left" | "right";
	/** Opacity value, default is 0.5. */
	opacity?: number;
}

interface _ObjectByFindConstant {
	[FIND_EXIT_TOP]: RoomPosition;
	[FIND_EXIT_RIGHT]: RoomPosition;
	[FIND_EXIT_BOTTOM]: RoomPosition;
	[FIND_EXIT_LEFT]: RoomPosition;
	[FIND_EXIT]: RoomPosition;
	[FIND_CREEPS]: Creep;
	[FIND_MY_CREEPS]: Creep;
	[FIND_HOSTILE_CREEPS]: Creep;
	[FIND_SOURCES_ACTIVE]: Source;
	[FIND_SOURCES]: Source;
	[FIND_DROPPED_RESOURCES]: Resource;
	[FIND_STRUCTURES]: _allStructures;
	[FIND_MY_STRUCTURES]: _allOwnedStructures;
	[FIND_HOSTILE_STRUCTURES]: _allOwnedStructures;
	[FIND_FLAGS]: Flag;
	[FIND_CONSTRUCTION_SITES]: ConstructionSite;
	[FIND_MY_SPAWNS]: StructureSpawn & { my: true };
	[FIND_HOSTILE_SPAWNS]: StructureSpawn & { my: false };
	[FIND_MY_CONSTRUCTION_SITES]: ConstructionSite & { my: true };
	[FIND_HOSTILE_CONSTRUCTION_SITES]: ConstructionSite & { my: false };
	[FIND_MINERALS]: Mineral;
	[FIND_NUKES]: Nuke;
	[FIND_TOMBSTONES]: Tombstone;
	[FIND_POWER_CREEPS]: PowerCreep;
	[FIND_MY_POWER_CREEPS]: PowerCreep & { my: true };
	[FIND_HOSTILE_POWER_CREEPS]: PowerCreep & { my: false };
	[FIND_DEPOSITS]: Deposit;
	[FIND_RUINS]: Ruin;
}

interface _ObjectByLookConstant {
	[LOOK_CREEPS]: Creep;
	[LOOK_ENERGY]: Resource;
	[LOOK_RESOURCES]: Resource;
	[LOOK_SOURCES]: Source;
	[LOOK_MINERALS]: Mineral;
	[LOOK_DEPOSITS]: Deposit;
	[LOOK_STRUCTURES]: Structure;
	[LOOK_FLAGS]: Flag;
	[LOOK_CONSTRUCTION_SITES]: ConstructionSite;
	[LOOK_NUKES]: Nuke;
	[LOOK_TERRAIN]: TerrainType;
	[LOOK_TOMBSTONES]: Tombstone;
	[LOOK_POWER_CREEPS]: PowerCreep;
	[LOOK_RUINS]: Ruin;
}

type allLookTypes = {
	[T in LOOK_CONSTANT]: { type: T } & { [K in T]: _ObjectByLookConstant[K] };
}[LOOK_CONSTANT];
type allLookTypesWithCoords = {
	[T in LOOK_CONSTANT]: { x: number; y: number; type: T } & {
		[K in T]: _ObjectByLookConstant[K];
	};
}[LOOK_CONSTANT];

type RoomPositionLike = RoomPosition | { pos: RoomPosition };
type Path = PathStep[];

/**
 * The data property is different for each event type
 * @see https://docs.screeps.com/api/#Room.getEventLog
 * @todo Check all types (not in official documentation)
 */
type RoomEvent =
	| {
		event: EVENT_ATTACK;
		objectId: string;
		data: {
			/** the target object ID */
			targetId: string;
			/** the amount of hits damaged */
			damage: number;
			/** one of the constants */
			attackType: EVENT_ATTACK_TYPE_CONSTANT;
		};
	}
	| {
		event: EVENT_OBJECT_DESTROYED;
		objectId: string;
		data: {
			/** The type of the destroyed object */
			type: "creep" | STRUCTURE_CONSTANT;
		};
	}
	| {
		event: EVENT_ATTACK_CONTROLLER;
		objectId: string;
		data: Record<string, never>;
	}
	| {
		event: EVENT_BUILD;
		objectId: string;
		data: {
			/** The target object ID */
			targetId: string;
			/** The amount of build progress gained */
			amount: number;
			/** The energy amount spent on the operation */
			energySpent: number;
		};
	}
	| {
		event: EVENT_HARVEST;
		objectId: string;
		data: {
			/** The target object ID */
			targetId: string;
			/** The amount of resource harvested */
			amount: number;
		};
	}
	| {
		event: EVENT_HEAL;
		objectId: string;
		data: {
			/** The target object ID */
			targetId: string;
			/** The amount of hits healed */
			amount: number;
			/** One of the constants */
			healType: EVENT_HEAL_TYPE_CONSTANT;
		};
	}
	| {
		event: EVENT_REPAIR;
		objectId: string;
		data: {
			/** The target object ID */
			targetId: string;
			/** The amount of hits repaired */
			amount: number;
			/** The energy amount spent on the operation */
			energySpent: number;
		};
	}
	| {
		event: EVENT_RESERVE_CONTROLLER;
		objectId: string;
		data: {
			/** The amount of reservation time gained */
			amount: number;
		};
	}
	| {
		event: EVENT_UPGRADE_CONTROLLER;
		objectId: string;
		data: {
			/** The amount of control points gained */
			amount: number;
			/** The energy amount spent on the operation */
			energySpent: number;
		};
	}
	| {
		event: EVENT_EXIT;
		objectId: string;
		data: {
			/** The name of the target room */
			room: RoomName;
			/** The coordinates in another room where the creep has appeared */
			x: number;
			/** The coordinates in another room where the creep has appeared */
			y: number;
		};
	};
type _allOwnedStructures =
	| StructureController
	| StructureExtension
	| StructureExtractor
	| StructureFactory
	| StructureInvaderCore
	| StructureKeeperLair
	| StructureLab
	| StructureLink
	| StructureNuker
	| StructureObserver
	| StructurePowerBank
	| StructurePowerSpawn
	| StructureRampart
	| StructureSpawn
	| StructureStorage
	| StructureTerminal
	| StructureTower;
type _allStructures = _allOwnedStructures | StructureContainer | StructurePortal | StructureRoad | StructureWall;
type BuildableStructureConstant =
	| typeof STRUCTURE_EXTENSION
	| typeof STRUCTURE_RAMPART
	| typeof STRUCTURE_ROAD
	| typeof STRUCTURE_SPAWN
	| typeof STRUCTURE_LINK
	| typeof STRUCTURE_WALL
	| typeof STRUCTURE_STORAGE
	| typeof STRUCTURE_TOWER
	| typeof STRUCTURE_OBSERVER
	| typeof STRUCTURE_POWER_SPAWN
	| typeof STRUCTURE_EXTRACTOR
	| typeof STRUCTURE_LAB
	| typeof STRUCTURE_TERMINAL
	| typeof STRUCTURE_CONTAINER
	| typeof STRUCTURE_NUKER;

/* Classes & objects */

/**
 * A site of a structure which is currently under construction.
 * A construction site can be created using the 'Construct' button at the left of the game field or the `Room.createConstructionSite` method.
 *
 * To build a structure on the construction site, give a worker creep some amount of energy and perform `Creep.build` action.
 *
 * You can remove enemy construction sites by moving a creep on it.
 */
declare class ConstructionSite extends RoomObject {
	/** A unique object identificator. You can use `Game.getObjectById` method to retrieve an object instance by its `id`. */
	readonly id: string;

	/** Whether this is your own construction site. */
	readonly my: boolean;

	/** An object with the creep’s owner info */
	readonly owner: {
		/** The name of the owner user. */
		readonly username: string;
	};
	/** The current construction progress. */
	readonly progress: number;

	/** The total construction progress needed for the structure to be built. */
	readonly progressTotal: number;

	/** One of the `STRUCTURE_*` constants. */
	readonly structureType: STRUCTURE_CONSTANT;

	/** @private **This property is not officially documented** Use at your own risk */
	constructor(id: string);

	/**
	 * Remove the construction site.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this construction site, and it's not in your room.
	 */
	remove(): OK | ERR_NOT_OWNER;
}

/**
 * Creeps are your units.
 * Creeps can move, harvest energy, construct structures, attack another creeps, and perform other actions.
 * Each creep consists of up to 50 body parts
 * @see https://docs.screeps.com/api/#Creep
 */
declare class Creep extends RoomObject {
	/** The link to the Room object. */
	readonly room: Room;

	/** An array describing the creep’s body. */
	readonly body: BodyPartInfo[];

	/**
	 * An alias for `Creep.store`.
	 * @deprecated This property is deprecated and will be removed soon.
	 */
	readonly carry: Store;

	/**
	 * An alias for `Creep.store.getCapacity()`.
	 * @deprecated This property is deprecated and will be removed soon.
	 */
	readonly carryCapacity: number;

	/** The movement fatigue indicator. If it is greater than zero, the creep cannot move. */
	readonly fatigue: number;

	/** The current amount of hit points of the creep. */
	readonly hits: number;

	/** The maximum amount of hit points of the creep. */
	readonly hitsMax: number;

	/** A unique object identificator. You can use `Game.getObjectById` method to retrieve an object instance by its `id`. */
	readonly id: string;

	/**
	 * A shorthand to `Memory.creeps[creep.name]`.
	 * You can use it for quick access the creep’s specific memory data object.
	 * @tutorial https://docs.screeps.com/global-objects.html#Memory-object
	 */
	readonly memory: CreepMemory;

	/** Whether it is your creep or foe. */
	readonly my: boolean;

	/** Creep’s name. You can choose the name while creating a new creep, and it cannot be changed later. This name is a hash key to access the creep via the `Game.creeps` object. */
	readonly name: string;

	/** An object with the creep’s owner info */
	readonly owner: {
		/** The name of the owner user. */
		readonly username: string;
	};

	/** The text message that the creep was saying at the last tick. */
	readonly saying: string;

	/** Whether this creep is still being spawned. */
	readonly spawning: boolean;

	/** A `Store` object that contains cargo of this creep. */
	readonly store: Store;

	/** The remaining amount of game ticks after which the creep will die. */
	readonly ticksToLive: number;

	/**
	 * Attack another creep, power creep, or structure in a short-ranged attack.
	 * Requires the `ATTACK` body part.
	 * If the target is inside a rampart, then the rampart is attacked instead.
	 * The target has to be at adjacent square to the creep.
	 * If the target is a creep with `ATTACK` body parts and is not inside a rampart, it will automatically hit back at the attacker.
	 * @param target The target object to be attacked.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this creep.
	 * @returns {-4} `ERR_BUSY` - The creep is still being spawned.
	 * @returns {-7} `ERR_INVALID_TARGET` - The target is not a valid attackable object.
	 * @returns {-9} `ERR_NOT_IN_RANGE` - The target is too far away.
	 * @returns {-12} `ERR_NO_BODYPART` - There are no `ATTACK` body parts in this creep’s body.
	 */
	attack(
		target: Creep | PowerCreep | Structure
	): OK | ERR_NOT_OWNER | ERR_BUSY | ERR_INVALID_TARGET | ERR_NOT_IN_RANGE | ERR_NO_BODYPART;

	/**
	 * Decreases the controller's downgrade timer by 300 ticks per every `CLAIM` body part, or reservation timer by 1 tick per every `CLAIM` body part.
	 * If the controller under attack is owned, it cannot be upgraded or attacked again for the next 1,000 ticks.
	 * The target has to be at adjacent square to the creep.
	 * @param target The target controller object.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this creep.
	 * @returns {-4} `ERR_BUSY` - The creep is still being spawned.
	 * @returns {-7} `ERR_INVALID_TARGET` - The target is not a valid owned or reserved controller object.
	 * @returns {-9} `ERR_NOT_IN_RANGE` - The target is too far away.
	 * @returns {-11} `ERR_TIRED` - You have to wait until the next attack is possible.
	 * @returns {-12} `ERR_NO_BODYPART` - There are not enough `CLAIM` body parts in this creep’s body.
	 */
	attackController(
		target: StructureController
	): OK | ERR_NOT_OWNER | ERR_BUSY | ERR_INVALID_TARGET | ERR_NOT_IN_RANGE | ERR_TIRED | ERR_NO_BODYPART;

	/**
	 * Build a structure at the target construction site using carried energy.
	 * Requires `WORK` and `CARRY` body parts.
	 * The target has to be within 3 squares range of the creep.
	 * @param target The target construction site to be built.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this creep.
	 * @returns {-4} `ERR_BUSY` - The creep is still being spawned.
	 * @returns {-6} `ERR_NOT_ENOUGH_RESOURCES` - The creep does not have any carried energy.
	 * @returns {-7} `ERR_INVALID_TARGET` - The target is not a valid construction site object or the structure cannot be built here (probably because of a creep at the same square).
	 * @returns {-9} `ERR_NOT_IN_RANGE` - The target is too far away.
	 * @returns {-12} `ERR_NO_BODYPART` - There are no `WORK` body parts in this creep’s body.
	 */
	build(
		target: ConstructionSite
	):
		| OK
		| ERR_NOT_OWNER
		| ERR_BUSY
		| ERR_NOT_ENOUGH_RESOURCES
		| ERR_INVALID_TARGET
		| ERR_NOT_IN_RANGE
		| ERR_NO_BODYPART;

	/**
	 * Cancel the order given during the current game tick.
	 * @param methodName The name of a creep's method to be cancelled.
	 * @returns {0} `OK` - The operation has been cancelled successfully.
	 * @returns {-5} `ERR_NOT_FOUND` - The order with the specified name is not found.
	 */
	cancelOrder(methodName: string): OK | ERR_NOT_FOUND;

	/**
	 * Claims a neutral controller under your control.
	 * Requires the `CLAIM` body part.
	 * The target has to be at adjacent square to the creep.
	 * You need to have the corresponding Global Control Level in order to claim a new room.
	 * If you don't have enough GCL, consider *reserving* this room instead.
	 * @tutorial https://docs.screeps.com/control.html#Global-Control-Level
	 * @param target The target controller object.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this creep.
	 * @returns {-4} `ERR_BUSY` - The creep is still being spawned.
	 * @returns {-7} `ERR_INVALID_TARGET` - The target is not a valid neutral controller object.
	 * @returns {-8} `ERR_FULL` - You cannot claim more than 3 rooms in the Novice Area.
	 * @returns {-9} `ERR_NOT_IN_RANGE` - The target is too far away.
	 * @returns {-12} `ERR_NO_BODYPART` - There are no `CLAIM` body parts in this creep’s body.
	 * @returns {-15} `ERR_GCL_NOT_ENOUGH` - Your Global Control Level is not enough.
	 */
	claimController(
		target: StructureController
	):
		| OK
		| ERR_NOT_OWNER
		| ERR_BUSY
		| ERR_INVALID_TARGET
		| ERR_FULL
		| ERR_NOT_IN_RANGE
		| ERR_NO_BODYPART
		| ERR_GCL_NOT_ENOUGH;

	/**
	 * Dismantles any structure that can be constructed (even hostile) returning 50% of the energy spent on its repair.
	 * Requires the `WORK` body part.
	 * If the creep has an empty `CARRY` body part, the energy is put into it; otherwise it is dropped on the ground.
	 * The target has to be at adjacent square to the creep.
	 * @param target The target structure.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this creep.
	 * @returns {-4} `ERR_BUSY` - The creep is still being spawned.
	 * @returns {-7} `ERR_INVALID_TARGET` - The target is not a valid structure object.
	 * @returns {-9} `ERR_NOT_IN_RANGE` - The target is too far away.
	 * @returns {-12} `ERR_NO_BODYPART` - There are no `WORK` body parts in this creep’s body.
	 */
	dismantle(
		target: Structure
	): OK | ERR_NOT_OWNER | ERR_BUSY | ERR_INVALID_TARGET | ERR_NOT_IN_RANGE | ERR_NO_BODYPART;

	/**
	 * Drop this resource on the ground.
	 * @param resourceType One of the `RESOURCE_*` constants.
	 * @param amount The amount of resource units to be dropped. If omitted, all the available carried amount is used.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this creep.
	 * @returns {-4} `ERR_BUSY` - The creep is still being spawned.
	 * @returns {-6} `ERR_NOT_ENOUGH_RESOURCES` - The creep does not have the given amount of resources.
	 * @returns {-10} `ERR_INVALID_ARGS` - The resourceType is not a valid `RESOURCE_*` constants.
	 */
	drop(
		resourceType: RESOURCE_CONSTANT,
		amount?: number
	): OK | ERR_NOT_OWNER | ERR_BUSY | ERR_NOT_ENOUGH_RESOURCES | ERR_INVALID_ARGS;

	/**
	 * Add one more available safe mode activation to a room controller.
	 * The creep has to be at adjacent square to the target room controller and have 1000 ghodium resource.
	 * @param controller The target room controller.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this creep.
	 * @returns {-4} `ERR_BUSY` - The creep is still being spawned.
	 * @returns {-6} `ERR_NOT_ENOUGH_RESOURCES` - The creep does not have enough ghodium.
	 * @returns {-7} `ERR_INVALID_TARGET` - The target is not a valid controller object.
	 * @returns {-9} `ERR_NOT_IN_RANGE` - The target is too far away.
	 */
	generateSafeMode(
		controller: StructureController
	): OK | ERR_NOT_OWNER | ERR_BUSY | ERR_NOT_ENOUGH_RESOURCES | ERR_INVALID_TARGET | ERR_NOT_IN_RANGE;

	/**
	 * Get the quantity of live body parts of the given type.
	 * Fully damaged parts do not count.
	 * @param type A body part type
	 * @returns A number representing the quantity of body parts.
	 */
	getActiveBodyparts(type: BODYPART_CONSTANT): number;

	/**
	 * Harvest energy from the source or resources from minerals and deposits.
	 * Requires the `WORK` body part.
	 * If the creep has an empty `CARRY` body part, the harvested resource is put into it; otherwise it is dropped on the ground.
	 * The target has to be at an adjacent square to the creep.
	 * @param target The object to be harvested.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this creep, or the room controller is owned or reserved by another player.
	 * @returns {-4} `ERR_BUSY` - The creep is still being spawned.
	 * @returns {-5} `ERR_NOT_FOUND` - Extractor not found. You must build an extractor structure to harvest minerals. https://docs.screeps.com/minerals.html
	 * @returns {-6} `ERR_NOT_ENOUGH_RESOURCES` - The target does not contain any harvestable energy or mineral.
	 * @returns {-7} `ERR_INVALID_TARGET` - The target is not a valid source or mineral object.
	 * @returns {-9} `ERR_NOT_IN_RANGE` - The target is too far away.
	 * @returns {-11} `ERR_TIRED` - The extractor or the deposit is still cooling down.
	 * @returns {-12} `ERR_NO_BODYPART` - There are no `WORK` body parts in this creep’s body.
	 */
	harvest(
		target: Source | Mineral
	):
		| OK
		| ERR_NOT_OWNER
		| ERR_BUSY
		| ERR_NOT_FOUND
		| ERR_NOT_ENOUGH_RESOURCES
		| ERR_INVALID_TARGET
		| ERR_NOT_IN_RANGE
		| ERR_TIRED
		| ERR_NO_BODYPART;

	/**
	 * Heal self or another creep.
	 * It will restore the target creep’s damaged body parts function and increase the hits counter.
	 * Requires the `HEAL` body part.
	 * The target has to be at adjacent square to the creep.
	 * @param target The target creep object.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this creep.
	 * @returns {-4} `ERR_BUSY` - The creep is still being spawned.
	 * @returns {-7} `ERR_INVALID_TARGET` - The target is not a valid creep object.
	 * @returns {-9} `ERR_NOT_IN_RANGE` - The target is too far away.
	 * @returns {-12} `ERR_NO_BODYPART` - There are no `HEAL` body parts in this creep’s body.
	 */
	heal(
		target: Creep | PowerCreep
	): OK | ERR_NOT_OWNER | ERR_BUSY | ERR_INVALID_TARGET | ERR_NOT_IN_RANGE | ERR_NO_BODYPART;

	/**
	 * Move the creep one square in the specified direction.
	 * Requires the `MOVE` body part, or another creep nearby `pulling` the creep.
	 * In case if you call `move` on a creep nearby, the `ERR_TIRED` and the `ERR_NO_BODYPART` checks will be bypassed; otherwise, the `ERR_NOT_IN_RANGE` check will be bypassed.
	 * @param direction A creep nearby, or one of the direction constants
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this creep.
	 * @returns {-4} `ERR_BUSY` - The creep is still being spawned.
	 * @returns {-9} `ERR_NOT_IN_RANGE` - The target creep is too far away
	 * @returns {-10} `ERR_INVALID_ARGS` - The provided direction is incorrect.
	 * @returns {-11} `ERR_TIRED` - The fatigue indicator of the creep is non-zero.
	 * @returns {-12} `ERR_NO_BODYPART` - There are no MOVE body parts in this creep’s body.
	 */
	move(
		direction: Creep | DirectionConstant
	): OK | ERR_NOT_OWNER | ERR_BUSY | ERR_NOT_IN_RANGE | ERR_INVALID_ARGS | ERR_TIRED | ERR_NO_BODYPART;

	/**
	 * Move the creep using the specified predefined path.
	 * Requires the `MOVE` body part.
	 * @param path A path value as returned from `Room.findPath`, `RoomPosition.findPathTo`, or `PathFinder.search` methods. Both array form and serialized string form are accepted.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this creep.
	 * @returns {-4} `ERR_BUSY` - The creep is still being spawned.
	 * @returns {-5} `ERR_NOT_FOUND` - The specified path doesn't match the creep's location.
	 * @returns {-10} `ERR_INVALID_ARGS` - `path` is not a valid path array.
	 * @returns {-11} `ERR_TIRED` - The fatigue indicator of the creep is non-zero.
	 * @returns {-12} `ERR_NO_BODYPART` - There are no `MOVE` body parts in this creep’s body.
	 */
	moveByPath(
		path: Path | string
	): OK | ERR_NOT_OWNER | ERR_BUSY | ERR_NOT_FOUND | ERR_INVALID_ARGS | ERR_TIRED | ERR_NO_BODYPART;

	/**
	 * Find the optimal path to the target within the same room and move to it.
	 * A shorthand to consequent calls of `pos.findPathTo()` and `move()` methods.
	 * If the target is in another room, then the corresponding exit will be used as a target.
	 * Requires the `MOVE` body part.
	 * @param x X position of the target in the same room.
	 * @param y Y position of the target in the same room.
	 * @param target Can be a RoomPosition object or any object containing RoomPosition. The position doesn't have to be in the same room with the creep.
	 * @param opts An object containing additional options
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this creep.
	 * @returns {-2} `ERR_NO_PATH` - No path to the target could be found.
	 * @returns {-4} `ERR_BUSY` - The creep is still being spawned.
	 * @returns {-5} `ERR_NOT_FOUND` - The creep has no memorized path to reuse.
	 * @returns {-7} `ERR_INVALID_TARGET` - The target provided is invalid.
	 * @returns {-11} `ERR_TIRED` - The fatigue indicator of the creep is non-zero.
	 * @returns {-12} `ERR_NO_BODYPART` - There are no MOVE body parts in this creep’s body.
	 */
	moveTo(
		x: number,
		y: number,
		opts?: Partial<
			findPathOpts & {
				/**
				 * This option enables reusing the path found along multiple game ticks.
				 * It allows to save CPU time, but can result in a slightly slower creep reaction behavior.
				 * The path is stored into the creep's memory to the `_move` property.
				 * The `reusePath` value defines the amount of ticks which the path should be reused for.
				 * The default value is 5.
				 * Increase the amount to save more CPU, decrease to make the movement more consistent.
				 * Set to 0 if you want to disable path reusing.
				 */
				reusePath: number;
				/**
				 * If `reusePath` is enabled and this option is set to true, the path will be stored in memory in the short serialized form using `Room.serializePath`.
				 * The default value is true.
				 */
				serializeMemory: boolean;
				/**
				 * If this option is set to true, `moveTo` method will return `ERR_NOT_FOUND` if there is no memorized path to reuse.
				 * This can significantly save CPU time in some cases.
				 * The default value is false.
				 */
				noPathFinding: boolean;
				/** Draw a line along the creep’s path using `RoomVisual.poly`. You can provide either an empty object or custom style parameters. The default style is equivalent to: */
				visualizePathStyle: PolyStyle;
			}
		>
	): OK | ERR_NOT_OWNER | ERR_NO_PATH | ERR_BUSY | ERR_NOT_FOUND | ERR_INVALID_TARGET | ERR_TIRED | ERR_NO_BODYPART;
	moveTo(
		target: RoomPositionLike,
		opts?: Partial<
			findPathOpts & {
				/**
				 * This option enables reusing the path found along multiple game ticks.
				 * It allows to save CPU time, but can result in a slightly slower creep reaction behavior.
				 * The path is stored into the creep's memory to the `_move` property.
				 * The `reusePath` value defines the amount of ticks which the path should be reused for.
				 * The default value is 5.
				 * Increase the amount to save more CPU, decrease to make the movement more consistent.
				 * Set to 0 if you want to disable path reusing.
				 */
				reusePath: number;
				/**
				 * If `reusePath` is enabled and this option is set to true, the path will be stored in memory in the short serialized form using `Room.serializePath`.
				 * The default value is true.
				 */
				serializeMemory: boolean;
				/**
				 * If this option is set to true, `moveTo` method will return `ERR_NOT_FOUND` if there is no memorized path to reuse.
				 * This can significantly save CPU time in some cases.
				 * The default value is false.
				 */
				noPathFinding: boolean;
				/** Draw a line along the creep’s path using `RoomVisual.poly`. You can provide either an empty object or custom style parameters. The default style is equivalent to: */
				visualizePathStyle: PolyStyle;
			}
		>
	): OK | ERR_NOT_OWNER | ERR_NO_PATH | ERR_BUSY | ERR_NOT_FOUND | ERR_INVALID_TARGET | ERR_TIRED | ERR_NO_BODYPART;

	/**
	 * Toggle auto notification when the creep is under attack.
	 * The notification will be sent to your account email.
	 * Turned on by default.
	 * @param enabled Whether to enable notification or disable.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this creep.
	 * @returns {-4} `ERR_BUSY` - The creep is still being spawned.
	 * @returns {-10} `ERR_INVALID_ARGS` - `enable` argument is not a boolean value.
	 */
	notifyWhenAttacked(enabled: boolean): OK | ERR_NOT_OWNER | ERR_BUSY | ERR_INVALID_ARGS;

	/**
	 * Pick up an item (a dropped piece of energy).
	 * Requires the `CARRY` body part.
	 * The target has to be at adjacent square to the creep or at the same square.
	 * @param target The target object to be picked up.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this creep.
	 * @returns {-4} `ERR_BUSY` - The creep is still being spawned.
	 * @returns {-7} `ERR_INVALID_TARGET` - The target is not a valid object to pick up.
	 * @returns {-8} `ERR_FULL` - The creep cannot receive any more resource.
	 * @returns {-9} `ERR_NOT_IN_RANGE` - The target is too far away.
	 */
	pickup(target: Resource): OK | ERR_NOT_OWNER | ERR_BUSY | ERR_INVALID_TARGET | ERR_FULL | ERR_NOT_IN_RANGE;

	/**
	 * Help another creep to follow this creep.
	 * The fatigue generated for the target's move will be added to the creep instead of the target.
	 * Requires the `MOVE` body part.
	 * The target has to be at adjacent square to the creep.
	 * The creep must move elsewhere, and the target must move towards the creep.
	 * @param target The target creep.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this creep.
	 * @returns {-4} `ERR_BUSY` - The creep is still being spawned.
	 * @returns {-7} `ERR_INVALID_TARGET` - The target provided is invalid.
	 * @returns {-9} `ERR_NOT_IN_RANGE` - The target is too far away.
	 */
	pull(target: Creep): OK | ERR_NOT_OWNER | ERR_BUSY | ERR_INVALID_TARGET | ERR_NOT_IN_RANGE;

	/**
	 * A ranged attack against another creep or structure.
	 * Requires the `RANGED_ATTACK` body part.
	 * If the target is inside a rampart, the rampart is attacked instead.
	 * The target has to be within 3 squares range of the creep.
	 * @param target The target object to be attacked.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER - You are not the owner of this creep.
	 * @returns {-4} `ERR_BUSY` - The creep is still being spawned.
	 * @returns {-7} `ERR_INVALID_TARGET` - The target is not a valid attackable object.
	 * @returns {-9} `ERR_NOT_IN_RANGE` - The target is too far away.
	 * @returns {-12} `ERR_NO_BODYPART` - There are no `RANGED_ATTACK` body parts in this creep’s body.
	 */
	rangedAttack(
		target: Creep | PowerCreep | Structure
	): OK | ERR_NOT_OWNER | ERR_BUSY | ERR_INVALID_TARGET | ERR_NOT_IN_RANGE | ERR_NO_BODYPART;

	/**
	 * Heal another creep at a distance.
	 * It will restore the target creep’s damaged body parts function and increase the hits counter.
	 * Requires the `HEAL` body part.
	 * The target has to be within 3 squares range of the creep.
	 * @param target The target creep object.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this creep.
	 * @returns {-4} `ERR_BUSY` - The creep is still being spawned.
	 * @returns {-7} `ERR_INVALID_TARGET` - The target is not a valid creep object.
	 * @returns {-9} `ERR_NOT_IN_RANGE` - The target is too far away.
	 * @returns {-12} `ERR_NO_BODYPART` - There are no `HEAL` body parts in this creep’s body.
	 */
	rangedHeal(
		target: Creep | PowerCreep
	): OK | ERR_NOT_OWNER | ERR_BUSY | ERR_INVALID_TARGET | ERR_NOT_IN_RANGE | ERR_NO_BODYPART;

	/**
	 * A ranged attack against all hostile creeps or structures within 3 squares range.
	 * Requires the `RANGED_ATTACK` body part.
	 * The attack power depends on the range to each target.
	 * Friendly units are not affected.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this creep.
	 * @returns {-4} `ERR_BUSY` - The creep is still being spawned.
	 * @returns {-12} `ERR_NO_BODYPART` - There are no `RANGED_ATTACK` body parts in this creep’s body.
	 */
	rangedMassAttack(): OK | ERR_NOT_OWNER | ERR_BUSY | ERR_NO_BODYPART;

	/**
	 * Repair a damaged structure using carried energy.
	 * Requires the `WORK` and `CARRY` body parts.
	 * The target has to be within 3 squares range of the creep.
	 * @param target The target structure to be repaired.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this creep.
	 * @returns {-4} `ERR_BUSY` - The creep is still being spawned.
	 * @returns {-6} `ERR_NOT_ENOUGH_RESOURCES` - The creep does not carry any energy.
	 * @returns {-7} `ERR_INVALID_TARGET` - The target is not a valid structure object.
	 * @returns {-9} `ERR_NOT_IN_RANGE` - The target is too far away.
	 * @returns {-12} `ERR_NO_BODYPART` - There are no `WORK` body parts in this creep’s body.
	 */
	repair(
		target: Structure
	):
		| OK
		| ERR_NOT_OWNER
		| ERR_BUSY
		| ERR_NOT_ENOUGH_RESOURCES
		| ERR_INVALID_TARGET
		| ERR_NOT_IN_RANGE
		| ERR_NO_BODYPART;

	/**
	 * Temporarily block a neutral controller from claiming by other players and restore energy sources to their full capacity.
	 * Each tick, this command increases the counter of the period during which the controller is unavailable by 1 tick per each `CLAIM` body part.
	 * The maximum reservation period to maintain is 5,000 ticks.
	 * The target has to be at adjacent square to the creep.
	 * @param target The target controller object to be reserved.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this creep.
	 * @returns {-4} `ERR_BUSY` - The creep is still being spawned.
	 * @returns {-7} `ERR_INVALID_TARGET` - The target is not a valid neutral controller object.
	 * @returns {-9} `ERR_NOT_IN_RANGE` - The target is too far away.
	 * @returns {-12} `ERR_NO_BODYPART` - There are no `CLAIM` body parts in this creep’s body.
	 */
	reserveController(
		target: StructureController
	): OK | ERR_NOT_OWNER | ERR_BUSY | ERR_INVALID_TARGET | ERR_NOT_IN_RANGE | ERR_NO_BODYPART;

	/**
	 * Display a visual speech balloon above the creep with the specified message.
	 * The message will be available for one tick.
	 * You can read the last message using the `saying` property.
	 * Any valid Unicode characters are allowed, including emoji.
	 * @see http://unicode.org/emoji/charts/emoji-style.txt
	 * @param message The message to be displayed. Maximum length is 10 characters.
	 * @param public Set to true to allow other players to see this message. Default is false.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this creep.
	 * @returns {-4} `ERR_BUSY` - The creep is still being spawned.
	 */
	say(message: string, public?: boolean): OK | ERR_NOT_OWNER | ERR_BUSY;

	/**
	 * Sign a controller with an arbitrary text visible to all players.
	 * This text will appear in the room UI, in the world map, and can be accessed via the API.
	 * You can sign unowned and hostile controllers.
	 * The target has to be at adjacent square to the creep.
	 * Pass an empty string to remove the sign.
	 * @param target The target controller object to be signed.
	 * @param text The sign text. The string is cut off after 100 characters.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-4} `ERR_BUSY` - The creep is still being spawned.
	 * @returns {-7} `ERR_INVALID_TARGET` - The target is not a valid controller object.
	 * @returns {-9} `ERR_NOT_IN_RANGE` - The target is too far away.
	 * @todo check err_not_owner
	 */
	signController(target: StructureController, text: string): OK | ERR_BUSY | ERR_INVALID_TARGET | ERR_NOT_IN_RANGE;

	/**
	 * Kill the creep immediately.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this creep.
	 * @returns {-4} `ERR_BUSY` - The creep is still being spawned.
	 */
	suicide(): OK | ERR_NOT_OWNER | ERR_BUSY;

	/**
	 * Transfer resource from the creep to another object.
	 * The target has to be at adjacent square to the creep.
	 * @param target The target object.
	 * @param resourceType One of the `RESOURCE_*` constants.
	 * @param amount The amount of resources to be transferred. If omitted, all the available carried amount is used.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this creep.
	 * @returns {-4} `ERR_BUSY` - The creep is still being spawned.
	 * @returns {-6} `ERR_NOT_ENOUGH_RESOURCES` - The creep does not have the given amount of resources.
	 * @returns {-7} `ERR_INVALID_TARGET` - The target is not a valid object which can contain the specified resource.
	 * @returns {-8} `ERR_FULL` - The target cannot receive any more resources.
	 * @returns {-9} `ERR_NOT_IN_RANGE` - The target is too far away.
	 * @returns {-10} `ERR_INVALID_ARGS` - The resourceType is not one of the `RESOURCE_*` constants, or the amount is incorrect.
	 */
	transfer(
		target: Creep | PowerCreep | Structure,
		resourceType: RESOURCE_CONSTANT,
		amount?: number
	):
		| OK
		| ERR_NOT_OWNER
		| ERR_BUSY
		| ERR_NOT_ENOUGH_RESOURCES
		| ERR_INVALID_TARGET
		| ERR_FULL
		| ERR_NOT_IN_RANGE
		| ERR_INVALID_ARGS;

	/**
	 * Upgrade your controller to the next level using carried energy.
	 * Upgrading controllers raises your Global Control Level in parallel.
	 * Requires `WORK` and `CARRY` body parts.
	 * The target has to be within 3 squares range of the creep.
	 *
	 * A fully upgraded level 8 controller can't be upgraded over 15 energy units per tick regardless of creeps abilities.
	 * The cumulative effect of all the creeps performing `upgradeController` in the current tick is taken into account.
	 * This limit can be increased by using ghodium mineral boost.
	 *
	 * Upgrading the controller raises its `ticksToDowngrade` timer by 100.
	 * The timer must be full in order for controller to be levelled up.
	 * @see https://docs.screeps.com/minerals.html
	 * @param target The target controller object to be upgraded.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this creep or the target controller.
	 * @returns {-4} `ERR_BUSY` - The creep is still being spawned.
	 * @returns {-6} `ERR_NOT_ENOUGH_RESOURCES` - The creep does not have any carried energy.
	 * @returns {-7} `ERR_INVALID_TARGET` - The target is not a valid controller object, or the controller upgrading is blocked.
	 * @returns {-9} `ERR_NOT_IN_RANGE` - The target is too far away.
	 * @returns {-12} `ERR_NO_BODYPART` - There are no `WORK` body parts in this creep’s body.
	 */
	upgradeController(
		target: StructureController
	):
		| OK
		| ERR_NOT_OWNER
		| ERR_BUSY
		| ERR_NOT_ENOUGH_RESOURCES
		| ERR_INVALID_TARGET
		| ERR_NOT_IN_RANGE
		| ERR_NO_BODYPART;

	/**
	 * Withdraw resources from a structure or tombstone.
	 * The target has to be at adjacent square to the creep.
	 * Multiple creeps can withdraw from the same object in the same tick.
	 * Your creeps can withdraw resources from hostile structures/tombstones as well, in case if there is no hostile rampart on top of it.
	 *
	 * This method should not be used to transfer resources between creeps.
	 * To transfer between creeps, use the `transfer` method on the original creep.
	 * @param target The target object.
	 * @param resourceType One of the `RESOURCE_*` constants.
	 * @param amount The amount of resources to be transferred. If omitted, all the available amount is used.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this creep, or there is a hostile rampart on top of the target.
	 * @returns {-4} `ERR_BUSY` - The creep is still being spawned.
	 * @returns {-6} `ERR_NOT_ENOUGH_RESOURCES` - The target does not have the given amount of resources.
	 * @returns {-7} `ERR_INVALID_TARGET` - The target is not a valid object which can contain the specified resource.
	 * @returns {-8} `ERR_FULL` - The creep's carry is full.
	 * @returns {-9} `ERR_NOT_IN_RANGE` - The target is too far away.
	 * @returns {-10} `ERR_INVALID_ARGS` - The resourceType is not one of the `RESOURCE_*` constants, or the amount is incorrect.
	 */
	withdraw(
		target: Structure | Tombstone | Ruin,
		resourceType: RESOURCE_CONSTANT,
		amount?: number
	):
		| OK
		| ERR_NOT_OWNER
		| ERR_BUSY
		| ERR_NOT_ENOUGH_RESOURCES
		| ERR_INVALID_TARGET
		| ERR_FULL
		| ERR_NOT_IN_RANGE
		| ERR_INVALID_ARGS;
}

/**
 * A rare resource deposit needed for producing commodities.
 * Can be harvested by creeps with a `WORK` body part.
 * Each harvest operation triggers a cooldown period, which becomes longer and longer over time.
 *
 * Learn more about deposits from this article.
 * @see https://docs.screeps.com/resources.html
 */
declare class Deposit extends RoomObject {
	/** The amount of game ticks until the next harvest action is possible. */
	readonly cooldown: number;

	/** The deposit type */
	readonly depositType: RESOURCE_MINERAL;

	/** A unique object identificator. You can use `Game.getObjectById` method to retrieve an object instance by its `id`. */
	readonly id: string;

	/** The cooldown of the last harvest operation on this deposit. */
	readonly lastCooldown: number;

	/** The amount of game ticks when this deposit will disappear. */
	readonly ticksToDecay: number;
}

/**
 * A flag.
 * Flags can be used to mark particular spots in a room.
 * Flags are visible to their owners only.
 * You cannot have more than 10,000 flags.
 */
declare class Flag extends RoomObject {
	/** Flag primary color. One of the `COLOR_*` constants. */
	readonly color: COLOR_CONSTANT;

	/** A shorthand to `Memory.flags[flag.name]`. You can use it for quick access the flag's specific memory data object. */
	readonly memory: FlagMemory;

	/** Flag’s name. You can choose the name while creating a new flag, and it cannot be changed later. This name is a hash key to access the flag via the `Game.flags` object. The maximum name length is 100 charactes. */
	readonly name: string;

	/** Flag secondary color. One of the `COLOR_*` constants. */
	readonly secondaryColor: COLOR_CONSTANT;

	/** @private **This property is not officially documented** Use at your own risk */
	constructor(
		name: string,
		color: COLOR_CONSTANT,
		secondaryColor: COLOR_CONSTANT,
		roomName: RoomName,
		x: number,
		y: number
	);

	/** Remove the flag. */
	remove(): OK;

	/**
	 * Set new color of the flag.
	 * @param color Primary color of the flag. One of the `COLOR_*` constants.
	 * @param secondaryColor Secondary color of the flag. One of the `COLOR_*` constants.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-10} `ERR_INVALID_ARGS` - `color` or `secondaryColor` is not a valid color constant.
	 */
	setColor(color: COLOR_CONSTANT, secondaryColor?: COLOR_CONSTANT): OK | ERR_INVALID_ARGS;

	/**
	 * Set new position of the flag.
	 * @param x The X position in the room.
	 * @param y The Y position in the room.
	 */
	setPosition(x: number, y: number): OK | ERR_INVALID_TARGET;
	/**
	 * Set new position of the flag.
	 * @param pos Can be a `RoomPosition` object or any object containing `RoomPosition`.
	 */
	setPosition(pos: RoomPositionLike): OK | ERR_INVALID_TARGET;
}

/**
 * A mineral deposit.
 * Can be harvested by creeps with a WORK body part using the extractor structure.
 * @tutorial https://docs.screeps.com/minerals.html
 * @see https://docs.screeps.com/api/#Mineral
 */
declare class Mineral extends RoomObject {
	/** The link to the Room object. */
	readonly room: Room;
	/** The density that this mineral deposit will be refilled to once `ticksToRegeneration` reaches 0. This is one of the `DENSITY_*` constants. */
	readonly density: DENSITY_CONSTANT;

	/** The remaining amount of resources. */
	readonly mineralAmount: number;

	/** The resource type, one of the `RESOURCE_*` constants. */
	readonly mineralType: MineableMineralConstant;

	/** A unique object identificator. You can use `Game.getObjectById` method to retrieve an object instance by its `id`. */
	readonly id: string;

	/** The remaining time after which the deposit will be refilled. */
	readonly ticksToRegeneration: number;

	/** @private **This property is not officially documented** Use at your own risk */
	constructor(id: string);
}

/**
 * A nuke landing position.
 * This object cannot be removed or modified.
 * You can find incoming nukes in the room using the `FIND_NUKES` constant.
 * @see https://docs.screeps.com/api/#Nuke
 */
declare class Nuke extends RoomObject {
	/** The link to the Room object. */
	readonly room: Room;

	/** A unique object identificator. You can use `Game.getObjectById` method to retrieve an object instance by its `id`. */
	readonly id: string;

	/** The name of the room where this nuke has been launched from. */
	readonly launchRoomName: RoomName;

	/** The remaining landing time. */
	readonly timeToLand: number;

	/** @private **This property is not officially documented** Use at your own risk */
	constructor(id: string);
}

/**
 * The base prototype for a structure that has an owner.
 * Such structures can be found using `FIND_MY_STRUCTURES` and `FIND_HOSTILE_STRUCTURES` constants.
 */
declare class OwnedStructure extends Structure {
	/** Whether this is your own structure */
	readonly my: boolean;

	/** An object with the creep’s owner info */
	readonly owner: {
		/** The name of the owner user. */
		readonly username: string;
	};
}

/**
 * Power Creeps are immortal "heroes" that are tied to your account and can be respawned in any PowerSpawn after death.
 * You can upgrade their abilities ("powers") up to your account Global Power Level (see Game.gpl).
 */
declare class PowerCreep extends RoomObject {
	/**
	 * A static method to create new Power Creep instance in your account.
	 * It will be added in an unspawned state, use spawn method to `spawn` it in the world.
	 *
	 * You need one free Power Level in your account to perform this action.
	 * @param name The name of the new power creep. The name length limit is 100 characters.
	 * @param className The class of the new power creep, one of the `POWER_CLASS` constants.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-3} `ERR_NAME_EXISTS` - A power creep with the specified name already exists.
	 * @returns {-6} `ERR_NOT_ENOUGH_RESOURCES` - You don't have free Power Levels in your account.
	 * @returns {-10} `ERR_INVALID_ARGS` - The provided power creep name is exceeds the limit, or the power creep class is invalid.
	 */
	static create(name: string, className: string): OK | ERR_NAME_EXISTS | ERR_NOT_ENOUGH_RESOURCES | ERR_INVALID_ARGS;

	/**
	 * An alias for `Creep.store`.
	 * @deprecated This property is deprecated and will be removed soon.
	 */
	readonly carry: Store;

	/**
	 * An alias for `Creep.store.getCapacity()`.
	 * @deprecated This property is deprecated and will be removed soon.
	 */
	readonly carryCapacity: number;

	/** The power creep's class, one of the `POWER_CLASS` constants. */
	readonly className: string;

	/** A timestamp when this creep is marked to be permanently deleted from the account, or undefined otherwise. */
	readonly deleteTime?: number;

	/** The current amount of hit points of the creep. */
	readonly hits: number;

	/** The maximum amount of hit points of the creep. */
	readonly hitsMax: number;

	/** A unique object identificator. You can use `Game.getObjectById` method to retrieve an object instance by its `id`. */
	readonly id: string;

	/** The power creep's level. */
	readonly level: number;

	/**
	 * A shorthand to `Memory.powerCreeps[creep.name]`.
	 * You can use it for quick access the creep’s specific memory data object.
	 * @tutorial https://docs.screeps.com/global-objects.html#Memory-object
	 */
	readonly memory: PowerCreepMemory;

	/** Whether it is your creep or foe. */
	readonly my: boolean;

	/**
	 * Power creep’s name.
	 * You can choose the name while creating a new power creep, and it cannot be changed later.
	 * This name is a hash key to access the creep via the `Game.powerCreeps` object.
	 */
	readonly name: string;

	/** An object with the creep’s owner info */
	readonly owner: {
		/** The name of the owner user. */
		readonly username: string;
	};

	/** A Store object that contains cargo of this creep. */
	readonly store: Store;

	/** Available powers, an object with power ID as a key, and the following properties: */
	readonly powers: {
		readonly [powerid: string]: {
			/** Current level of the power. */
			readonly level: number;
			/** Cooldown ticks remaining, or undefined if the power creep is not spawned in the world. */
			readonly cooldown?: number;
		};
	};

	/** The text message that the creep was saying at the last tick. */
	readonly saying: string;

	/** The name of the shard where the power creep is spawned, or undefined. */
	readonly shard?: string;

	/**
	 * The timestamp when spawning or deleting this creep will become available.
	 * Undefined if the power creep is spawned in the world.
	 */
	readonly spawnCooldownTime?: number;

	/**
	 * The remaining amount of game ticks after which the creep will die and become unspawned.
	 * Undefined if the creep is not spawned in the world.
	 */
	readonly ticksToLive?: number;

	/**
	 * Cancel the order given during the current game tick.
	 * @param methodName The name of a creep's method to be cancelled.
	 * @returns {0} `OK` - The operation has been cancelled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of the creep.
	 * @returns {-4} `ERR_BUSY` - The power creep is not spawned in the world.
	 * @returns {-5} `ERR_NOT_FOUND` - The order with the specified name is not found.
	 */
	cancelOrder(methodName: string): OK | ERR_NOT_OWNER | ERR_BUSY | ERR_NOT_FOUND;

	/**
	 * Delete the power creep permanently from your account.
	 * It should NOT be spawned in the world.
	 * The creep is not deleted immediately, but a 24-hours delete timer is started instead (see `deleteTime`).
	 * You can cancel deletion by calling `delete(true)`.
	 * @param cancel Set this to true to cancel previously scheduled deletion.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of the creep.
	 * @returns {-4} `ERR_BUSY` - The power creep is spawned in the world.
	 */
	delete(cancel?: true): OK | ERR_NOT_OWNER | ERR_BUSY;

	/**
	 * Drop this resource on the ground.
	 * @param resourceType One of the `RESOURCE_*` constants.
	 * @param amount The amount of resource units to be dropped. If omitted, all the available carried amount is used.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this creep.
	 * @returns {-4} `ERR_BUSY` - The power creep is not spawned in the world.
	 * @returns {-6} `ERR_NOT_ENOUGH_RESOURCES` - The creep does not have the given amount of energy.
	 * @returns {-10} `ERR_INVALID_ARGS` - The resourceType is not a valid `RESOURCE_*` constants.
	 */
	drop(
		resourceType: RESOURCE_CONSTANT,
		amount?: number
	): OK | ERR_NOT_OWNER | ERR_BUSY | ERR_NOT_ENOUGH_RESOURCES | ERR_INVALID_ARGS;

	/**
	 * Enable powers usage in this room.
	 * The room controller should be at adjacent tile.
	 * @param controller The room controller.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this creep.
	 * @returns {-7} `ERR_INVALID_TARGET` - The target is not a controller structure.
	 * @returns {-9} `ERR_NOT_IN_RANGE` - The target is too far away.
	 */
	enableRoom(controller: StructureController): OK | ERR_NOT_OWNER | ERR_INVALID_TARGET | ERR_NOT_IN_RANGE;

	/**
	 * Move the creep one square in the specified direction.
	 * @param direction A creep nearby, or one of the direction constants.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this creep.
	 * @returns {-4} `ERR_BUSY` - The power creep is not spawned in the world.
	 * @returns {-9} `ERR_NOT_IN_RANGE` - The target creep is too far away
	 * @returns {-10} `ERR_INVALID_ARGS` - The provided direction is incorrect.
	 * @returns {-11} `ERR_TIRED` - The fatigue indicator of the creep is non-zero.
	 */
	move(
		direction: Creep | DirectionConstant
	): OK | ERR_NOT_OWNER | ERR_BUSY | ERR_NOT_IN_RANGE | ERR_INVALID_ARGS | ERR_TIRED;

	/**
	 * Move the creep using the specified predefined path.
	 * @param path A path value as returned from `Room.findPath`, `RoomPosition.findPathTo`, or `PathFinder.search` methods. Both array form and serialized string form are accepted.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this creep.
	 * @returns {-4} `ERR_BUSY` - The power creep is not spawned in the world.
	 * @returns {-5} `ERR_NOT_FOUND` - The specified path doesn't match the creep's location.
	 * @returns {-10} `ERR_INVALID_ARGS` - `path` is not a valid path array.
	 * @returns {-11} `ERR_TIRED` - The fatigue indicator of the creep is non-zero.
	 */
	moveByPath(path: Path | string): OK | ERR_NOT_OWNER | ERR_BUSY | ERR_NOT_FOUND | ERR_INVALID_ARGS | ERR_TIRED;

	/**
	 * Find the optimal path to the target within the same room and move to it.
	 * A shorthand to consequent calls of `pos.findPathTo()` and `move()` methods.
	 * If the target is in another room, then the corresponding exit will be used as a target.
	 * Requires the `MOVE` body part.
	 * @param x X position of the target in the same room.
	 * @param y Y position of the target in the same room.
	 * @param target Can be a RoomPosition object or any object containing RoomPosition. The position doesn't have to be in the same room with the creep.
	 * @param opts An object containing additional options
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this creep.
	 * @returns {-2} `ERR_NO_PATH` - No path to the target could be found.
	 * @returns {-4} `ERR_BUSY` - The power creep is not spawned in the world.
	 * @returns {-5} `ERR_NOT_FOUND` - The creep has no memorized path to reuse.
	 * @returns {-7} `ERR_INVALID_TARGET` - The target provided is invalid.
	 * @returns {-11} `ERR_TIRED` - The fatigue indicator of the creep is non-zero.
	 */
	moveTo(
		x: number,
		y: number,
		opts?: Partial<
			findPathOpts & {
				/**
				 * This option enables reusing the path found along multiple game ticks.
				 * It allows to save CPU time, but can result in a slightly slower creep reaction behavior.
				 * The path is stored into the creep's memory to the `_move` property.
				 * The `reusePath` value defines the amount of ticks which the path should be reused for.
				 * The default value is 5.
				 * Increase the amount to save more CPU, decrease to make the movement more consistent.
				 * Set to 0 if you want to disable path reusing.
				 */
				reusePath: number;
				/**
				 * If `reusePath` is enabled and this option is set to true, the path will be stored in memory in the short serialized form using `Room.serializePath`.
				 * The default value is true.
				 */
				serializeMemory: boolean;
				/**
				 * If this option is set to true, `moveTo` method will return `ERR_NOT_FOUND` if there is no memorized path to reuse.
				 * This can significantly save CPU time in some cases.
				 * The default value is false.
				 */
				noPathFinding: boolean;
				/** Draw a line along the creep’s path using `RoomVisual.poly`. You can provide either an empty object or custom style parameters. The default style is equivalent to: */
				visualizePathStyle: PolyStyle;
			}
		>
	): OK | ERR_NOT_OWNER | ERR_NO_PATH | ERR_BUSY | ERR_NOT_FOUND | ERR_INVALID_TARGET | ERR_TIRED;
	moveTo(
		target: RoomPositionLike,
		opts?: Partial<
			findPathOpts & {
				/**
				 * This option enables reusing the path found along multiple game ticks.
				 * It allows to save CPU time, but can result in a slightly slower creep reaction behavior.
				 * The path is stored into the creep's memory to the `_move` property.
				 * The `reusePath` value defines the amount of ticks which the path should be reused for.
				 * The default value is 5.
				 * Increase the amount to save more CPU, decrease to make the movement more consistent.
				 * Set to 0 if you want to disable path reusing.
				 */
				reusePath: number;
				/**
				 * If `reusePath` is enabled and this option is set to true, the path will be stored in memory in the short serialized form using `Room.serializePath`.
				 * The default value is true.
				 */
				serializeMemory: boolean;
				/**
				 * If this option is set to true, `moveTo` method will return `ERR_NOT_FOUND` if there is no memorized path to reuse.
				 * This can significantly save CPU time in some cases.
				 * The default value is false.
				 */
				noPathFinding: boolean;
				/** Draw a line along the creep’s path using `RoomVisual.poly`. You can provide either an empty object or custom style parameters. The default style is equivalent to: */
				visualizePathStyle: PolyStyle;
			}
		>
	): OK | ERR_NOT_OWNER | ERR_NO_PATH | ERR_BUSY | ERR_NOT_FOUND | ERR_INVALID_TARGET | ERR_TIRED;

	/**
	 * Toggle auto notification when the creep is under attack.
	 * The notification will be sent to your account email.
	 * Turned on by default.
	 * @param enabled Whether to enable notification or disable.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this creep.
	 * @returns {-4} `ERR_BUSY` - The power creep is not spawned in the world.
	 * @returns {-10} `ERR_INVALID_ARGS` - `enable` argument is not a boolean value.
	 */
	notifyWhenAttacked(enabled: boolean): OK | ERR_NOT_OWNER | ERR_BUSY | ERR_INVALID_ARGS;

	/**
	 * Pick up an item (a dropped piece of energy).
	 * Requires the `CARRY` body part.
	 * The target has to be at adjacent square to the creep or at the same square.
	 * @param target The target object to be picked up.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this creep.
	 * @returns {-4} `ERR_BUSY` - The power creep is not spawned in the world.
	 * @returns {-7} `ERR_INVALID_TARGET` - The target is not a valid object to pick up.
	 * @returns {-8} `ERR_FULL` - The creep cannot receive any more resource.
	 * @returns {-9} `ERR_NOT_IN_RANGE` - The target is too far away.
	 */
	pickup(target: Resource): OK | ERR_NOT_OWNER | ERR_BUSY | ERR_INVALID_TARGET | ERR_FULL | ERR_NOT_IN_RANGE;

	/**
	 * Rename the power creep.
	 * It must not be spawned in the world.
	 * @param name The new name of the power creep.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of the creep.
	 * @returns {-3} `ERR_NAME_EXISTS` - A power creep with the specified name already exists.
	 * @returns {-4} `ERR_BUSY` - The power creep is spawned in the world.
	 */
	rename(name: string): OK | ERR_NOT_OWNER | ERR_NAME_EXISTS | ERR_BUSY;

	/**
	 * Instantly restore time to live to the maximum using a Power Spawn or a Power Bank nearby.
	 * It has to be at adjacent tile.
	 * @param target The target structure.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this creep.
	 * @returns {-4} `ERR_BUSY` - The power creep is not spawned in the world.
	 * @returns {-7} `ERR_INVALID_TARGET` - The target is not a valid power bank object.
	 * @returns {-9} `ERR_NOT_IN_RANGE` - The target is too far away.
	 */
	renew(
		target: StructurePowerBank | StructurePowerSpawn
	): OK | ERR_NOT_OWNER | ERR_BUSY | ERR_INVALID_TARGET | ERR_NOT_IN_RANGE;

	/**
	 * Display a visual speech balloon above the creep with the specified message.
	 * The message will be available for one tick.
	 * You can read the last message using the `saying` property.
	 * Any valid Unicode characters are allowed, including **emoji**.
	 * @param message The message to be displayed. Maximum length is 10 characters.
	 * @param public Set to true to allow other players to see this message. Default is false.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this creep.
	 * @returns {-4} `ERR_BUSY` - The power creep is not spawned in the world.
	 */
	say(message: string, public?: boolean): OK | ERR_NOT_OWNER | ERR_BUSY;

	/**
	 * Spawn this power creep in the specified Power Spawn.
	 * @param powerSpawn Your Power Spawn structure.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of the creep or the spawn.
	 * @returns {-4} `ERR_BUSY` - The power creep is already spawned in the world.
	 * @returns {-7} `ERR_INVALID_TARGET` - The specified object is not a Power Spawn.
	 * @returns {-11} `ERR_TIRED` - The power creep cannot be spawned because of the cooldown.
	 * @returns {-14} `ERR_RCL_NOT_ENOUGH` - Room Controller Level insufficient to use the spawn.
	 */
	spawn(
		powerSpawn: StructurePowerSpawn
	): OK | ERR_NOT_OWNER | ERR_BUSY | ERR_INVALID_TARGET | ERR_TIRED | ERR_RCL_NOT_ENOUGH;

	/**
	 * Kill the power creep immediately.
	 * It will not be destroyed permanently, but will become unspawned, so that you can `spawn` it again.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this creep.
	 * @returns {-4} `ERR_BUSY` - The power creep is not spawned in the world.
	 */
	suicide(): OK | ERR_NOT_OWNER | ERR_BUSY;

	/**
	 * Transfer resource from the creep to another object.
	 * The target has to be at adjacent square to the creep.
	 * @param target The target object.
	 * @param resourceType One of the `RESOURCE_*` constants.
	 * @param amount The amount of resources to be transferred. If omitted, all the available carried amount is used.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this creep.
	 * @returns {-4} `ERR_BUSY` - The power creep is not spawned in the world.
	 * @returns {-6} `ERR_NOT_ENOUGH_RESOURCES` - The creep does not have the given amount of resources.
	 * @returns {-7} `ERR_INVALID_TARGET` - The target is not a valid object which can contain the specified resource.
	 * @returns {-8} `ERR_FULL` - The target cannot receive any more resources.
	 * @returns {-9} `ERR_NOT_IN_RANGE` - The target is too far away.
	 * @returns {-10} `ERR_INVALID_ARGS` - The resourceType is not one of the `RESOURCE_*` constants, or the amount is incorrect.
	 */
	transfer(
		target: Creep | Structure,
		resourceType: RESOURCE_CONSTANT,
		amount: number
	):
		| OK
		| ERR_NOT_OWNER
		| ERR_BUSY
		| ERR_NOT_ENOUGH_RESOURCES
		| ERR_INVALID_TARGET
		| ERR_FULL
		| ERR_NOT_IN_RANGE
		| ERR_INVALID_ARGS;

	/**
	 * Upgrade the creep, adding a new power ability to it or increasing level of the existing power.
	 * You need one free Power Level in your account to perform this action.
	 * @param power The power ability to upgrade, one of the `PWR_*` constants.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of the creep.
	 * @returns {-6} `ERR_NOT_ENOUGH_RESOURCES` - You account Power Level is not enough.
	 * @returns {-8} `ERR_FULL` - The specified power cannot be upgraded on this creep's level, or the creep reached the maximum level.
	 * @returns {-10} `ERR_INVALID_ARGS` - The specified power ID is not valid.
	 */
	upgrade(power: PWR_CONSTANT): OK | ERR_NOT_OWNER | ERR_NOT_ENOUGH_RESOURCES | ERR_FULL | ERR_INVALID_ARGS;

	/**
	 * Apply one the creep's powers on the specified target.
	 * You can only use powers in rooms either without a controller, or with a **power-enabled** controller.
	 * Only one power can be used during the same tick, each `usePower` call will override the previous one.
	 * If the target has the same effect of a lower or equal level, it is overridden.
	 * If the existing effect level is higher, an error is returned.
	 * @see https://docs.screeps.com/power.html#Powers
	 * @param power The power ability to use, one of the `PWR_*` constants.
	 * @param target A target object in the room.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of the creep.
	 * @returns {-4} `ERR_BUSY` - The creep is not spawned in the world.
	 * @returns {-6} `ERR_NOT_ENOUGH_RESOURCES` - The creep doesn't have enough resources to use the power.
	 * @returns {-7} `ERR_INVALID_TARGET` - The specified target is not valid.
	 * @returns {-8} `ERR_FULL` - The target has the same active effect of a higher level.
	 * @returns {-9} `ERR_NOT_IN_RANGE` - The specified target is too far away.
	 * @returns {-10} `ERR_INVALID_ARGS` - Using powers is not enabled on the Room Controller.
	 * @returns {-11} `ERR_TIRED` - The power ability is still on cooldown.
	 * @returns {-12} `ERR_NO_BODYPART` - The creep doesn't have the specified power ability.
	 */
	usePower(
		power: PWR_CONSTANT,
		target?: RoomObject
	):
		| OK
		| ERR_NOT_OWNER
		| ERR_BUSY
		| ERR_NOT_ENOUGH_RESOURCES
		| ERR_INVALID_TARGET
		| ERR_FULL
		| ERR_NOT_IN_RANGE
		| ERR_INVALID_ARGS
		| ERR_TIRED
		| ERR_NO_BODYPART;

	/**
	 * Withdraw resources from a structure or tombstone.
	 * The target has to be at adjacent square to the creep.
	 * Multiple creeps can withdraw from the same object in the same tick.
	 * Your creeps can withdraw resources from hostile structures/tombstones as well, in case if there is no hostile rampart on top of it.
	 *
	 * This method should not be used to transfer resources between creeps.
	 * To transfer between creeps, use the `transfer` method on the original creep.
	 * @param target The target object.
	 * @param resourceType One of the `RESOURCE_*` constants.
	 * @param amount The amount of resources to be transferred. If omitted, all the available amount is used.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this creep, or there is a hostile rampart on top of the target.
	 * @returns {-4} `ERR_BUSY` - The power creep is not spawned in the world.
	 * @returns {-6} `ERR_NOT_ENOUGH_RESOURCES` - The target does not have the given amount of resources.
	 * @returns {-7} `ERR_INVALID_TARGET` - The target is not a valid object which can contain the specified resource.
	 * @returns {-8} `ERR_FULL` - The creep's carry is full.
	 * @returns {-9} `ERR_NOT_IN_RANGE` - The target is too far away.
	 * @returns {-10} `ERR_INVALID_ARGS` - The resourceType is not one of the `RESOURCE_*` constants, or the amount is incorrect.
	 */
	withdraw(
		target: Structure | Tombstone,
		resourceType: RESOURCE_CONSTANT,
		amount?: number
	):
		| OK
		| ERR_NOT_OWNER
		| ERR_BUSY
		| ERR_NOT_ENOUGH_RESOURCES
		| ERR_INVALID_TARGET
		| ERR_FULL
		| ERR_NOT_IN_RANGE
		| ERR_INVALID_ARGS;
}

declare class Resource extends RoomObject {
	/** The link to the Room object. */
	readonly room: Room;

	/** The amount of resource units containing. */
	readonly amount: number;

	/** A unique object identificator. You can use `Game.getObjectById` method to retrieve an object instance by its `id`. */
	readonly id: string;

	/** One of the `RESOURCE_*` constants. */
	readonly resourceType: RESOURCE_CONSTANT;

	/** @private **This property is not officially documented** Use at your own risk */
	constructor(id: string);
}

/**
 * An object representing the room in which your units and structures are in.
 * It can be used to look around, find paths, etc.
 * Every `RoomObject` in the room contains its linked `Room` instance in the `room` property.
 */
declare class Room {
	/** The Controller structure of this room, if present, otherwise undefined. */
	readonly controller: StructureController | undefined;

	/** Total amount of energy available in all spawns and extensions in the room. */
	readonly energyAvailable: number;

	/** Total amount of `energyCapacity` of all spawns and extensions in the room. */
	readonly energyCapacityAvailable: number;

	/**
	 * A shorthand to `Memory.rooms[room.name]`.
	 * You can use it for quick access the room’s specific memory data object.
	 * @tutorial https://docs.screeps.com/global-objects.html#Memory-object
	 */
	readonly memory: RoomMemory;

	/** The name of the room. */
	readonly name: RoomName;

	/** The Storage structure of this room, if present, otherwise undefined. */
	readonly storage: StructureStorage | undefined;

	/** The Terminal structure of this room, if present, otherwise undefined. */
	readonly terminal: StructureTerminal | undefined;

	/** A RoomVisual object for this room. You can use this object to draw simple shapes (lines, circles, text labels) in the room. */
	readonly visual: RoomVisual;

	/**
	 * Creates a new `Terrain` of room by its name.
	 * `Terrain` objects can be constructed for any room in the world even if you have no access to it.
	 */
	static readonly Terrain: new (roomName: RoomName) => RoomTerrain;

	/**
	 * erialize a path array into a short string representation, which is suitable to store in memory.
	 * @param path A path array retrieved from `Room.findPath`.
	 * @returns A serialized string form of the given path.
	 */
	static serializePath(path: Path): string;

	/**
	 * Deserialize a short string path representation into an array form.
	 * @param path A serialized path string.
	 * @returns A path array.
	 */
	static deserializePath(path: string): Path;

	/**
	 * Create new ConstructionSite at the specified location.
	 * @param x The X position.
	 * @param y The Y position.
	 * @param structureType One of the `STRUCTURE_*` constants.
	 * @param name The name of the structure, for structures that support it (currently only spawns). The name length limit is 100 characters.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - The room is claimed or reserved by a hostile player.
	 * @returns {-7} `ERR_INVALID_TARGET` - The structure cannot be placed at the specified location.
	 * @returns {-8} `ERR_FULL` - You have too many construction sites. The maximum number of construction sites per player is 100.
	 * @returns {-10} `ERR_INVALID_ARGS` - The location is incorrect.
	 * @returns {-14} `ERR_RCL_NOT_ENOUGH` - Room Controller Level insufficient. Learn more
	 * @see https://docs.screeps.com/control.html
	 */
	createConstructionSite(
		x: number,
		y: number,
		structureType: STRUCTURE_CONSTANT
	): OK | ERR_NOT_OWNER | ERR_INVALID_TARGET | ERR_FULL | ERR_INVALID_ARGS | ERR_RCL_NOT_ENOUGH;
	createConstructionSite(
		x: number,
		y: number,
		structureType: typeof STRUCTURE_SPAWN,
		name?: string
	): OK | ERR_NOT_OWNER | ERR_INVALID_TARGET | ERR_FULL | ERR_INVALID_ARGS | ERR_RCL_NOT_ENOUGH;

	/**
	 * Create new ConstructionSite at the specified location.
	 * @param pos Can be a RoomPosition object or any object containing RoomPosition.
	 * @param structureType One of the `STRUCTURE_*` constants.
	 * @param name The name of the structure, for structures that support it (currently only spawns).
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-7} `ERR_INVALID_TARGET` - The structure cannot be placed at the specified location.
	 * @returns {-8} `ERR_FULL` - You have too many construction sites. The maximum number of construction sites per player is 100.
	 * @returns {-10} `ERR_INVALID_ARGS` - The location is incorrect.
	 * @returns {-14} `ERR_RCL_NOT_ENOUGH` - Room Controller Level insufficient. Learn more
	 * @see https://docs.screeps.com/control.html
	 */
	createConstructionSite(
		pos: RoomPositionLike,
		structureType: STRUCTURE_CONSTANT
	): OK | ERR_INVALID_TARGET | ERR_FULL | ERR_INVALID_ARGS | ERR_RCL_NOT_ENOUGH;
	createConstructionSite(
		pos: RoomPositionLike,
		structureType: typeof STRUCTURE_SPAWN,
		name?: string
	): OK | ERR_INVALID_TARGET | ERR_FULL | ERR_INVALID_ARGS | ERR_RCL_NOT_ENOUGH;

	/**
	 * Create new Flag at the specified location.
	 * @param x The X position.
	 * @param y The Y position.
	 * @param name The name of a new flag. It should be unique, i.e. the `Game.flags` object should not contain another flag with the same name (hash key). If not defined, a random name will be generated. The maximum length is 100 characters.
	 * @param color The color of a new flag. Should be one of the `COLOR_*` constants. The default value is `COLOR_WHITE`.
	 * @param secondaryColor The secondary color of a new flag. Should be one of the `COLOR_*` constants. The default value is equal to `color`.
	 * @returns {string} The name of a new flag
	 * @returns {-3} `ERR_NAME_EXISTS` - There is a flag with the same name already.
	 * @returns {-8} `ERR_FULL` - You have too many flags. The maximum number of flags per player is 10000.
	 * @returns {-10} `ERR_INVALID_ARGS` - The location or the name or the color constant is incorrect.
	 */
	createFlag(
		x: number,
		y: number,
		name?: string,
		color?: COLOR_CONSTANT,
		secondaryColor?: COLOR_CONSTANT
	): string | ERR_NAME_EXISTS | ERR_FULL | ERR_INVALID_ARGS;
	/**
	 * Create new Flag at the specified location.
	 * @param pos Can be a RoomPosition object or any object containing RoomPosition.
	 * @param name The name of a new flag. It should be unique, i.e. the `Game.flags` object should not contain another flag with the same name (hash key). If not defined, a random name will be generated. The maximum length is 100 characters.
	 * @param color The color of a new flag. Should be one of the `COLOR_*` constants. The default value is `COLOR_WHITE`.
	 * @param secondaryColor The secondary color of a new flag. Should be one of the `COLOR_*` constants. The default value is equal to `color`.
	 * @returns {string} The name of a new flag
	 * @returns {-3} `ERR_NAME_EXISTS` - There is a flag with the same name already.
	 * @returns {-8} `ERR_FULL` - You have too many flags. The maximum number of flags per player is 10000.
	 * @returns {-10} `ERR_INVALID_ARGS` - The location or the name or the color constant is incorrect.
	 */
	createFlag(
		pos: RoomPositionLike,
		name?: string,
		color?: COLOR_CONSTANT,
		secondaryColor?: COLOR_CONSTANT
	): string | ERR_NAME_EXISTS | ERR_FULL | ERR_INVALID_ARGS;

	/**
	 * Find all objects of the specified type in the room.
	 * @param type One of the `FIND_*` constants.
	 * @param opts An object with additional options:
	 */
	find<T extends FIND_CONSTANT>(
		type: T,
		opts?: {
			/** Only the objects which pass the filter using the Lodash.filter method will be used. */
			filter: Partial<_ObjectByFindConstant[T]> | _.DictionaryIterator<_ObjectByFindConstant[T], boolean>;
		}
	): _ObjectByFindConstant[T][];

	/**
	 * Find the exit direction en route to another room.
	 * Please note that this method is not required for inter-room movement, you can simply pass the target in another room into `Creep.moveTo` method.
	 * @param room Another room name or room object.
	 * @returns {FIND_EXIT_CONSTANT} The room direction constant
	 * @returns {-2} `ERR_NO_PATH` - Path can not be found.
	 * @returns {-10} `ERR_INVALID_ARGS` - The location is incorrect.
	 */
	findExitTo(room: RoomName | Room): FIND_EXIT_CONSTANT | ERR_NO_PATH | ERR_INVALID_ARGS;

	/**
	 * Find an optimal path inside the room between fromPos and toPos using `Jump Point Search algorithm`.
	 * @param fromPos The start position.
	 * @param toPos The end position.
	 * @param opts An object containing additonal pathfinding flags
	 * @returns An array with path steps
	 */
	findPath(fromPos: RoomPosition, toPos: RoomPosition, opts?: Partial<findPathOpts & { serialize: false }>): Path;
	findPath(fromPos: RoomPosition, toPos: RoomPosition, opts?: Partial<findPathOpts> & { serialize: true }): string;

	/**
	 * Returns an array of events happened on the previous tick in this room.
	 * @param raw If this parameter is false or undefined, the method returns an object parsed using `JSON.parse` which incurs some CPU cost on the first access (the return value is cached on subsequent calls). If raw is truthy, then raw JSON in string format is returned.
	 * @returns An array of events.
	 */
	getEventLog(raw?: false): RoomEvent[];
	getEventLog(raw: true): string;

	/**
	 * Creates a RoomPosition object at the specified location.
	 * @param x The X position.
	 * @param y The Y position.
	 * @returns A RoomPosition object or null if it cannot be obtained.
	 */
	getPositionAt(x: number, y: number): RoomPosition | null;

	/**
	 * Get a `Room.Terrain` object which provides fast access to static terrain data.
	 * This method works for any room in the world even if you have no access to it.
	 * @returns Returns new `Room.Terrain` object.
	 */
	getTerrain(): RoomTerrain;

	/**
	 * Get the list of objects at the specified room position.
	 * @param x X position in the room.
	 * @param y Y position in the room.
	 * @returns An array with objects at the specified position
	 */
	lookAt(x: number, y: number): allLookTypes[];
	/**
	 * Get the list of objects at the specified room position.
	 * @param target Can be a RoomPosition object or any object containing RoomPosition.
	 * @returns An array with objects at the specified position
	 */
	lookAt(target: RoomPositionLike): allLookTypes[];

	/**
	 * Get the list of objects at the specified room area.
	 * @param top The top Y boundary of the area.
	 * @param left The left X boundary of the area.
	 * @param bottom The bottom Y boundary of the area.
	 * @param right The right X boundary of the area.
	 * @param asArray Set to true if you want to get the result as a plain array.
	 */
	lookAtArea(
		top: number,
		left: number,
		bottom: number,
		right: number,
		asArray?: false
	): { [y: number]: { [x: number]: allLookTypes[] } };
	lookAtArea(top: number, left: number, bottom: number, right: number, asArray: true): allLookTypesWithCoords[];

	/**
	 * Get an object with the given type at the specified room position.
	 * @param type One of the `LOOK_*` constants.
	 * @param x X position in the room.
	 * @param y Y position in the room.
	 * @returns An array of objects of the given type at the specified position if found.
	 */
	lookForAt<T extends LOOK_CONSTANT>(type: T, x: number, y: number): _ObjectByLookConstant[T][];
	/**
	 * Get an object with the given type at the specified room position.
	 * @param type One of the `LOOK_*` constants.
	 * @param target Can be a RoomPosition object or any object containing RoomPosition.
	 * @returns An array of objects of the given type at the specified position if found.
	 */
	lookForAt<T extends LOOK_CONSTANT>(type: T, target: RoomPositionLike): _ObjectByLookConstant[T][];

	/**
	 * Get the list of objects with the given type at the specified room area.
	 * @param type One of the `LOOK_*` constants.
	 * @param top The top Y boundary of the area.
	 * @param left The left X boundary of the area.
	 * @param bottom The bottom Y boundary of the area.
	 * @param right The right X boundary of the area.
	 * @param asArray Set to true if you want to get the result as a plain array.
	 */
	lookForAtArea<T extends LOOK_CONSTANT>(
		type: T,
		top: number,
		left: number,
		bottom: number,
		right: number,
		asArray?: false
	): { [y: number]: { [x: number]: _ObjectByLookConstant[T][] | undefined } };
	lookForAtArea<T extends LOOK_CONSTANT>(
		type: T,
		top: number,
		left: number,
		bottom: number,
		right: number,
		asArray: true
	): (_ObjectByLookConstant[T] & { x: number; y: number })[];
}

/**
 * Any object with a position in a room.
 * Almost all game objects prototypes are derived from `RoomObject`.
 */
declare class RoomObject {
	/** Applied effects, an array of objects with the following properties: */
	readonly effects: readonly {
		/** Effect ID of the applied effect. Can be either natural effect ID or Power ID. */
		effect: number;
		/** Power level of the applied effect. Absent if the effect is not a Power effect. */
		level?: number;
		/** How many ticks will the effect last. */
		ticksRemaining: number;
	}[];

	/** An object representing the position of this object in the room. */
	readonly pos: RoomPosition;

	/** The link to the Room object. May be undefined in case if an object is a flag or a construction site and is placed in a room that is not visible to you. */
	readonly room: Room | undefined;

	/** @private **This property is not officially documented** Use at your own risk */
	constructor(x: number, y: number, room: RoomName);
}

/**
 * An object representing the specified position in the room.
 * Every `RoomObject` in the room contains `RoomPosition` as the `pos` property.
 * The position object of a custom location can be obtained using the `Room.getPositionAt` method or using the constructor.
 */
declare class RoomPosition {
	/** The name of the room. */
	roomName: RoomName;

	/** X position in the room. */
	x: number;

	/** Y position in the room. */
	y: number;

	/**
	 * You can create new `RoomPosition` object using its constructor.
	 * @param x X position in the room.
	 * @param y X position in the room.
	 * @param roomName The room name.
	 */
	constructor(x: number, y: number, roomName: RoomName);

	/**
	 * Create new ConstructionSite at the specified location.
	 * @param structureType One of the STRUCTURE_* constants.
	 * @param name The name of the structure, for structures that support it (currently only spawns).
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-7} `ERR_INVALID_TARGET` - The structure cannot be placed at the specified location.
	 * @returns {-8} `ERR_FULL` - You have too many construction sites. The maximum number of construction sites per player is 100.
	 * @returns {-10} `ERR_INVALID_ARGS` - The location is incorrect.
	 * @returns {-14} `ERR_RCL_NOT_ENOUGH` - Room Controller Level insufficient. Learn more
	 * @see https://docs.screeps.com/control.html
	 */
	createConstructionSite(
		structureType: STRUCTURE_CONSTANT
	): OK | ERR_INVALID_TARGET | ERR_FULL | ERR_INVALID_ARGS | ERR_RCL_NOT_ENOUGH;
	createConstructionSite(
		structureType: "spawn",
		name?: string
	): OK | ERR_INVALID_TARGET | ERR_FULL | ERR_INVALID_ARGS | ERR_RCL_NOT_ENOUGH;

	/**
	 * Create new Flag at the specified location.
	 * @param name The name of a new flag. It should be unique, i.e. the `Game.flags` object should not contain another flag with the same name (hash key). If not defined, a random name will be generated.
	 * @param color The color of a new flag. Should be one of the `COLOR_*` constants. The default value is `COLOR_WHITE`.
	 * @param secondaryColor The secondary color of a new flag. Should be one of the `COLOR_*` constants. The default value is equal to `color`.
	 * @returns {string} The name of a new flag
	 * @returns {-3} `ERR_NAME_EXISTS` - There is a flag with the same name already.
	 * @returns {-10} `ERR_INVALID_ARGS` - The location or the color constant is incorrect.
	 */
	createFlag(
		name?: string,
		color?: COLOR_CONSTANT,
		secondaryColor?: COLOR_CONSTANT
	): string | ERR_NAME_EXISTS | ERR_INVALID_ARGS;

	/**
	 * Find an object with the shortest path from the given position.
	 * Uses `Jump Point Search algorithm` and `Dijkstra's algorithm`.
	 * @see http://en.wikipedia.org/wiki/Jump_point_search
	 * @see http://en.wikipedia.org/wiki/Dijkstra
	 * @param type One of the `FIND_*` constants.
	 * @param opts An object containing pathfinding options
	 * @returns The closest object if found, null otherwise.
	 */
	findClosestByPath<T extends FIND_CONSTANT>(
		type: T,
		opts?: Partial<
			findPathOpts & {
				/** Only the objects which pass the filter using the Lodash.filter method will be used. */
				filter: Partial<_ObjectByFindConstant[T]> | _.DictionaryIterator<_ObjectByFindConstant[T], boolean>;
				/**
				 * One of the following constants:
				 *
				 * `astar` is faster when there are relatively few possible targets;
				 *
				 * `dijkstra` is faster when there are a lot of possible targets or when the closest target is nearby.
				 *
				 * The default value is determined automatically using heuristics.
				 */
				algorithm: "astar" | "dijkstra";
			}
		>
	): _ObjectByFindConstant[T] | null;
	/**
	 * Find an object with the shortest path from the given position.
	 * Uses `Jump Point Search algorithm` and `Dijkstra's algorithm`.
	 * @see http://en.wikipedia.org/wiki/Jump_point_search
	 * @see http://en.wikipedia.org/wiki/Dijkstra
	 * @param objects An array of room's objects or RoomPosition objects that the search should be executed against.
	 * @param opts An object containing pathfinding options
	 * @returns The closest object if found, null otherwise.
	 */
	findClosestByPath<T extends RoomPositionLike>(
		objects: T[],
		opts?: Partial<
			findPathOpts & {
				/** Only the objects which pass the filter using the Lodash.filter method will be used. */
				filter: Partial<T> | _.DictionaryIterator<T, boolean>;
				/**
				 * One of the following constants:
				 *
				 * `astar` is faster when there are relatively few possible targets;
				 *
				 * `dijkstra` is faster when there are a lot of possible targets or when the closest target is nearby.
				 *
				 * The default value is determined automatically using heuristics.
				 */
				algorithm: "astar" | "dijkstra";
			}
		>
	): T | null;

	/**
	 * Find an object with the shortest linear distance from the given position.
	 * @param type One of the `FIND_*` constants.
	 * @param opts An object containing one of the following options:
	 * @returns The closest object if found, null otherwise.
	 */
	findClosestByRange<T extends FIND_CONSTANT>(
		type: T,
		opts?: {
			/** Only the objects which pass the filter using the Lodash.filter method will be used. */
			filter: Partial<_ObjectByFindConstant[T]> | _.DictionaryIterator<_ObjectByFindConstant[T], boolean>;
		}
	): _ObjectByFindConstant[T] | null;
	/**
	 * Find an object with the shortest linear distance from the given position.
	 * @param objects An array of room's objects or RoomPosition objects that the search should be executed against.
	 * @param opts An object containing one of the following options:
	 * @returns The closest object if found, null otherwise.
	 */
	findClosestByRange<T extends RoomPositionLike>(
		objects: T[],
		opts?: {
			/** Only the objects which pass the filter using the Lodash.filter method will be used. */
			filter: Partial<T> | _.DictionaryIterator<T, boolean>;
		}
	): T | null;

	/**
	 * Find all objects in the specified linear range.
	 * @param type One of the `FIND_*` constants.
	 * @param range The range distance.
	 * @param opts An object containing one of the following options:
	 * @returns An array with the objects found.
	 */
	findInRange<T extends FIND_CONSTANT>(
		type: T,
		range: number,
		opts?: {
			/** Only the objects which pass the filter using the Lodash.filter method will be used. */
			filter: Partial<_ObjectByFindConstant[T]> | _.DictionaryIterator<_ObjectByFindConstant[T], boolean>;
		}
	): _ObjectByFindConstant[T][];
	/**
	 * Find all objects in the specified linear range.
	 * @param objects An array of room's objects or RoomPosition objects that the search should be executed against.
	 * @param range The range distance.
	 * @param opts An object containing one of the following options:
	 * @returns An array with the objects found.
	 */
	findInRange<T extends RoomPositionLike>(
		objects: T[],
		range: number,
		opts?: {
			/** Only the objects which pass the filter using the Lodash.filter method will be used. */
			filter: Partial<T> | _.DictionaryIterator<T, boolean>;
		}
	): T[];

	/**
	 * Find an optimal path to the specified position using `Jump Point Search algorithm`.
	 * This method is a shorthand for `Room.findPath`.
	 * If the target is in another room, then the corresponding exit will be used as a target.
	 * @param x X position in the room.
	 * @param y Y position in the room.
	 * @param opts An object containing pathfinding options flags
	 * @returns An array with path steps in the following format:
	 */
	findPathTo(x: number, y: number, opts?: Partial<findPathOpts & { serialize: false }>): Path;
	findPathTo(x: number, y: number, opts?: Partial<findPathOpts> & { serialize: true }): string;
	/**
	 * Find an optimal path to the specified position using `Jump Point Search algorithm`.
	 * This method is a shorthand for `Room.findPath`.
	 * If the target is in another room, then the corresponding exit will be used as a target.
	 * @param target Can be a RoomPosition object or any object containing RoomPosition.
	 * @param opts An object containing pathfinding options flags
	 * @returns An array with path steps in the following format:
	 */
	findPathTo(target: RoomPositionLike, opts?: Partial<findPathOpts & { serialize: false }>): Path;
	findPathTo(target: RoomPositionLike, opts?: Partial<findPathOpts> & { serialize: true }): string;

	/**
	 * Get linear direction to the specified position.
	 * @param x X position in the room.
	 * @param y Y position in the room.
	 * @returns A number representing one of the direction constants.
	 */
	getDirectionTo(x: number, y: number): DirectionConstant;
	/**
	 * Get linear direction to the specified position.
	 * @param target Can be a RoomPosition object or any object containing RoomPosition.
	 * @returns A number representing one of the direction constants.
	 */
	getDirectionTo(target: RoomPositionLike): DirectionConstant;

	/**
	 * Get linear range to the specified position.
	 * @param x Get linear range to the specified position.
	 * @param y Get linear range to the specified position.
	 * @returns A number of squares to the given position.
	 */
	getRangeTo(x: number, y: number): number;
	/**
	 * Get linear range to the specified position.
	 * @param target Can be a RoomPosition object or any object containing RoomPosition.
	 * @returns A number of squares to the given position.
	 */
	getRangeTo(target: RoomPositionLike): number;

	/**
	 * Check whether this position is in the given range of another position.
	 * @param x X position in the same room.
	 * @param y Y position in the same room.
	 * @param range The range distance.
	 * @returns A boolean value.
	 */
	inRangeTo(x: number, y: number, range: number): boolean;
	/**
	 * Check whether this position is in the given range of another position.
	 * @param target The target position.
	 * @param range The range distance.
	 * @returns A boolean value.
	 */
	inRangeTo(target: RoomPositionLike, range: number): boolean;

	/**
	 * Check whether this position is the same as the specified position.
	 * @param x X position in the room.
	 * @param y Y position in the room.
	 * @returns A boolean value.
	 */
	isEqualTo(x: number, y: number): boolean;
	/**
	 * Check whether this position is the same as the specified position.
	 * @param target Can be a RoomPosition object or any object containing RoomPosition.
	 * @returns A boolean value.
	 */
	isEqualTo(target: RoomPositionLike): boolean;

	/**
	 * Check whether this position is on the adjacent square to the specified position.
	 * The same as `inRangeTo(target, 1)`.
	 * @param x X position in the room.
	 * @param y Y position in the room.
	 * @returns A boolean value.
	 */
	isNearTo(x: number, y: number): boolean;
	/**
	 * Check whether this position is on the adjacent square to the specified position.
	 * The same as `inRangeTo(target, 1)`.
	 * @param target Can be a RoomPosition object or any object containing RoomPosition.
	 * @returns A boolean value.
	 */
	isNearTo(target: RoomPositionLike): boolean;

	/**
	 * Get the list of objects at the specified room position.
	 * @returns An array with objects at the specified position in the following format:
	 */
	look(): allLookTypes[];

	/**
	 * Get an object with the given type at the specified room position.
	 * @param type One of the `LOOK_*` constants.
	 * @returns An array of objects of the given type at the specified position if found.
	 */
	lookFor<T extends LOOK_CONSTANT>(type: T): _ObjectByLookConstant[T][];
}

interface findPathOpts {
	/** Treat squares with creeps as walkable. Can be useful with too many moving creeps around or in some other cases. The default value is false. */
	ignoreCreeps: boolean;

	/** Treat squares with destructible structures (constructed walls, ramparts, spawns, extensions) as walkable. The default value is false. */
	ignoreDestructibleStructures: boolean;

	/** gnore road structures. Enabling this option can speed up the search. The default value is false. This is only used when the new PathFinder is enabled. */
	ignoreRoads: boolean;

	/**
	 * You can use this callback to modify a `CostMatrix` for any room during the search.
	 * The callback accepts two arguments, `roomName` and `costMatrix`.
	 * Use the costMatrix instance to make changes to the positions costs.
	 * If you return a new matrix from this callback, it will be used instead of the built-in cached one.
	 * This option is only used when the new `PathFinder` is enabled.
	 */
	costCallback: (roomName: string, costMatrix: CostMatrix) => CostMatrix;

	/**
	 * An array of the room's objects or RoomPosition objects which should be treated as walkable tiles during the search.
	 * This option cannot be used when the new `PathFinder` is enabled (use `costCallback` option instead).
	 */
	ignore: RoomPositionLike[];

	/**
	 * An array of the room's objects or RoomPosition objects which should be treated as obstacles during the search.
	 * This option cannot be used when the new `PathFinder` is enabled (use `costCallback` option instead).
	 */
	avoid: RoomPositionLike[];

	/** The maximum limit of possible pathfinding operations. You can limit CPU time used for the search based on ratio 1 op ~ 0.001 CPU. The default value is 2000. */
	maxOps: number;

	/** Weight to apply to the heuristic in the A formula `F = G + weight` H. Use this option only if you understand the underlying A* algorithm mechanics! The default value is 1. */
	heuristicWeight: number;

	/** If true, the result path will be serialized using Room.serializePath. The default is false. */
	serialize: boolean;

	/** The maximum allowed rooms to search. The default is 16, maximum is 64. This is only used when the new `PathFinder` is enabled. */
	maxRooms: number;

	/** Find a path to a position in specified linear range of target. The default is 0. */
	range: number;

	/** Cost for walking on plain positions. The default is 1. */
	plainCost: number;

	/** Cost for walking on swamp positions. The default is 5. */
	swampCost: number;
}

interface PathStep {
	x: number;
	y: number;
	dx: number;
	dy: number;
	direction: DirectionConstant;
}

/**
 * Room visuals provide a way to show various visual debug info in game rooms.
 * You can use the `RoomVisual` object to draw simple shapes that are visible only to you.
 * Every existing `Room` object already contains the `visual` property, but you also can create new `RoomVisual` objects for any room (even without visibility) using the constructor.
 *
 * Room visuals are not stored in the database, their only purpose is to display something in your browser.
 * All drawings will persist for one tick and will disappear if not updated.
 * All `RoomVisual` API calls have no added CPU cost (their cost is natural and mostly related to simple `JSON.serialize` calls).
 * However, there is a usage limit: you cannot post more than 500 KB of serialized data per one room (see `getSize` method).
 *
 * All draw coordinates are measured in game coordinates and centered to tile centers, i.e. (10,10) will point to the center of the creep at `x:10; y:10` position.
 * Fractional coordinates are allowed.
 */
declare class RoomVisual {
	/** The name of the room. */
	readonly roomName: string | undefined;

	/**
	 * You can directly create new `RoomVisual` object in any room, even if it's invisible to your script.
	 * @param roomName The room name. If undefined, visuals will be posted to all rooms simultaneously.
	 */
	constructor(roomName?: RoomName);

	/**
	 * Draw a line.
	 * @param x1 The start X coordinate.
	 * @param y1 The start Y coordinate.
	 * @param x2 The finish X coordinate.
	 * @param y2 The finish Y coordinate.
	 * @param style An object with the following properties
	 * @returns The `RoomVisual` object itself, so that you can chain calls.
	 */
	line(x1: number, y1: number, x2: number, y2: number, style?: LineStyle): RoomVisual;
	/**
	 * Draw a line.
	 * @param pos1 The start position object.
	 * @param pos2 The finish position object.
	 * @param style An object with the following properties
	 * @returns The `RoomVisual` object itself, so that you can chain calls.
	 */
	line(pos1: RoomPosition, pos2: RoomPosition, style?: LineStyle): RoomVisual;

	/**
	 * Draw a circle.
	 * @param x The X coordinate of the center.
	 * @param y The Y coordinate of the center.
	 * @param style An object with the following properties
	 * @returns The `RoomVisual` object itself, so that you can chain calls.
	 */
	circle(x: number, y: number, style?: CircleStyle): RoomVisual;
	/**
	 * Draw a circle.
	 * @param pos The position object of the center.
	 * @param style An object with the following properties
	 * @returns The `RoomVisual` object itself, so that you can chain calls.
	 */
	circle(pos: RoomPosition, style?: CircleStyle): RoomVisual;

	/**
	 * Draw a rectangle.
	 * @param x The X coordinate of the top-left corner.
	 * @param y The Y coordinate of the top-left corner.
	 * @param width The width of the rectangle.
	 * @param height The height of the rectangle.
	 * @param style An object with the following properties
	 * @returns The `RoomVisual` object itself, so that you can chain calls.
	 */
	rect(x: number, y: number, width: number, height: number, style?: RectStyle): RoomVisual;
	/**
	 * Draw a rectangle.
	 * @param topLeftPos The position object of the top-left corner.
	 * @param width The width of the rectangle.
	 * @param height The height of the rectangle.
	 * @param style An object with the following properties
	 * @returns The `RoomVisual` object itself, so that you can chain calls.
	 */
	rect(topLeftPos: RoomPosition, width: number, height: number, style?: RectStyle): RoomVisual;

	/**
	 * Draw a polyline.
	 * @param points An array of points. Every item should be either an array with 2 numbers (i.e. `[10,15]`), or a `RoomPosition` object.
	 * @param style An object with the following properties
	 * @returns The `RoomVisual` object itself, so that you can chain calls.
	 */
	poly(points: ([number, number] | RoomPosition)[], style?: PolyStyle): RoomVisual;

	/**
	 * Draw a text label. You can use any valid Unicode characters, including emoji.
	 * @see http://unicode.org/emoji/charts/emoji-style.txt
	 * @param text The text message.
	 * @param x The X coordinate of the label baseline point.
	 * @param y The Y coordinate of the label baseline point.
	 * @param style An object with the following properties
	 * @returns The `RoomVisual` object itself, so that you can chain calls.
	 */
	text(text: string, x: number, y: number, style?: TextStyle): RoomVisual;
	/**
	 * Draw a text label. You can use any valid Unicode characters, including emoji.
	 * @see http://unicode.org/emoji/charts/emoji-style.txt
	 * @param text The text message.
	 * @param pos The position object of the label baseline.
	 * @param style An object with the following properties
	 * @returns The `RoomVisual` object itself, so that you can chain calls.
	 */
	text(text: string, pos: RoomPosition, style?: TextStyle): RoomVisual;

	/**
	 * Remove all visuals from the room.
	 * @returns The `RoomVisual` object itself, so that you can chain calls.
	 */
	clear(): RoomVisual;

	/**
	 * Get the stored size of all visuals added in the room in the current tick.
	 * It must not exceed 512,000 (500 KB).
	 * @returns The size of the visuals in bytes.
	 */
	getSize(): number;

	/**
	 * Returns a compact representation of all visuals added in the room in the current tick.
	 * @returns A string with visuals data. There's not much you can do with the string besides store them for later.
	 */
	export(): string;

	/**
	 * Add previously exported (with `RoomVisual.export`) room visuals to the room visual data of the current tick.
	 * @param val The string returned from `RoomVisual.export`.
	 * @returns The `RoomVisual` object itself, so that you can chain calls.
	 */
	import(val: string): this;
}

/**
 * A destroyed structure. This is a walkable object.
 */
declare class Ruin extends RoomObject {
	/** The time when the structure has been destroyed. */
	readonly destroyTime: number;

	/** A unique object identificator. You can use `Game.getObjectById` method to retrieve an object instance by its `id`. */
	readonly id: string;

	/** A `Store` object that contains resources of this structure. */
	readonly store: Store;

	/** An object containing basic data of the destroyed structure. */
	readonly structure: Structure;

	/** The amount of game ticks before this ruin decays. */
	readonly ticksToDecay: number;
}

/**
 * An energy source object.
 * Can be harvested by creeps with a `WORK` body part.
 * @see https://docs.screeps.com/api/#Source
 */
declare class Source extends RoomObject {
	/** The link to the Room object. */
	readonly room: Room;

	/** The remaining amount of energy. */
	readonly energy: number;

	/** The total amount of energy in the source. */
	readonly energyCapacity: number;

	/** A unique object identificator. You can use `Game.getObjectById` method to retrieve an object instance by its `id`. */
	readonly id: string;

	/** The remaining time after which the source will be refilled. */
	readonly ticksToRegeneration: number;

	/** @private **This property is not officially documented** Use at your own risk */
	constructor(id: string);
}

/**
 * An object that can contain resources in its cargo.
 *
 * There are two types of stores in the game: general purpose stores and limited stores.
 *
 * * General purpose stores can contain any resource within its capacity (e.g. creeps, containers, storages, terminals).
 * * Limited stores can contain only a few types of resources needed for that particular object (e.g. spawns, extensions, labs, nukers).
 *
 * The `Store` prototype is the same for both types of stores, but they have different behavior depending on the `resource` argument in its methods.
 *
 * You can get specific resources from the store by addressing them as object properties.
 */
declare class Store {
	/**
	 * Returns capacity of this store for the specified resource.
	 * For a general purpose store, it returns total capacity if `resource` is undefined.
	 * @param resource The type of the resource.
	 * @returns Returns capacity number, or `null` in case of an invalid `resource` for this store type.
	 */
	getCapacity(): number;
	getCapacity(resource?: RESOURCE_CONSTANT): number | null;

	/**
	 * Returns free capacity for the store.
	 * For a limited store, it returns the capacity available for the specified resource if `resource` is defined and valid for this store.
	 * @param resource The type of the resource.
	 * @returns Returns available capacity number, or `null` in case of an invalid `resource` for this store type.
	 */
	getFreeCapacity(resource?: RESOURCE_CONSTANT): number | null;

	/**
	 * Returns the capacity used by the specified resource.
	 * For a general purpose store, it returns total used capacity if `resource` is undefined.
	 * @param resource The type of the resource.
	 * @returns Returns used capacity number, or null in case of a not valid resource for this store type. [NOTE: this is not true, always returns number]
	 */
	getUsedCapacity(resource?: RESOURCE_CONSTANT): number;
}

declare class Structure extends RoomObject {
	/** The link to the Room object. */
	readonly room: Room;

	/** The current amount of hit points of the structure. */
	readonly hits: number;

	/** The total amount of hit points of the structure. */
	readonly hitsMax: number;

	/** A unique object identificator. You can use `Game.getObjectById` method to retrieve an object instance by its `id`. */
	readonly id: string;

	/** One of the `STRUCTURE_*` constants. */
	readonly structureType: STRUCTURE_CONSTANT;

	/** @private **This property is not officially documented** Use at your own risk */
	constructor(id: string);

	/**
	 * Destroy this structure immediately.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this structure, and it's not in your room.
	 * @returns {-4} `ERR_BUSY` - Hostile creeps are in the room.
	 */
	destroy(): OK | ERR_NOT_OWNER | ERR_BUSY;

	/**
	 * Check whether this structure can be used.
	 * If room controller level is insufficient, then this method will return false, and the structure will be highlighted with red in the game.
	 */
	isActive(): boolean;

	/**
	 * Toggle auto notification when the structure is under attack.
	 * The notification will be sent to your account email.
	 *
	 * Turned on by default.
	 * @param enabled Whether to enable notification or disable.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this structure.
	 * @returns {-10} `ERR_INVALID_ARGS` - `enable` argument is not a boolean value.
	 */
	notifyWhenAttacked(enabled: boolean): OK | ERR_NOT_OWNER | ERR_INVALID_ARGS;
}

/**
 * A small container that can be used to store resources.
 * This is a walkable structure.
 * All dropped resources automatically goes to the container at the same tile.
 * @see https://docs.screeps.com/api/#StructureContainer
 */
declare class StructureContainer extends Structure {
	/**
	 * A `Store` object that contains cargo of this structure.
	 */
	readonly store: Store;

	/** One of the `STRUCTURE_*` constants. */
	readonly structureType: typeof STRUCTURE_CONTAINER;

	/**
	 * An alias for `.store.getCapacity()`.
	 * @deprecated This property is deprecated and will be removed soon.
	 */
	readonly storeCapacity: number;

	/** The amount of game ticks when this container will lose some hit points. */
	readonly ticksToDecay: number;
}

/**
 * Claim this structure to take control over the room.
 * The controller structure cannot be damaged or destroyed.
 *
 * It can be addressed by `Room.controller` property.
 * @see https://docs.screeps.com/api/#StructureController
 */
declare class StructureController extends OwnedStructure {
	/** One of the `STRUCTURE_*` constants. */
	readonly structureType: typeof STRUCTURE_CONTROLLER;

	/** Whether using power is enabled in this room. Use `PowerCreep.enableRoom` to turn powers on. */
	readonly isPowerEnabled: boolean;

	/** Current controller level, from 0 to 8. */
	readonly level: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

	/** The current progress of upgrading the controller to the next level. */
	readonly progress: number;

	/** The progress needed to reach the next level. */
	readonly progressTotal: number;

	/** An object with the controller reservation info if present: */
	readonly reservation:
		| {
			/** The name of a player who reserved this controller. */
			readonly username: string;
			/** The amount of game ticks when the reservation will end. */
			readonly ticksToEnd: number;
		}
		| undefined;

	/** How many ticks of safe mode remaining, or undefined. */
	readonly safeMode: number | undefined;

	/** Safe mode activations available to use. */
	readonly safeModeAvailable: number;

	/** During this period in ticks new safe mode activations will be blocked, undefined if cooldown is inactive. */
	readonly safeModeCooldown: number | undefined;

	/** An object with the controller sign info if present: */
	readonly sign:
		| {
			/** The name of a player who signed this controller. */
			username: string;
			/** The sign text. */
			text: string;
			/** The sign time in game ticks. */
			time: number;
			/** The sign real date. */
			datetime: Date;
		}
		| undefined;

	/**
	 * The amount of game ticks when this controller will lose one level.
	 * This timer is set to 50% on level upgrade or downgrade, and it can be increased by using `Creep.upgradeController`.
	 * Must be full to upgrade the controller to the next level.
	 */
	readonly ticksToDowngrade: number;

	/** The amount of game ticks while this controller cannot be upgraded due to attack. Safe mode is also unavailable during this period. */
	readonly upgradeBlocked: number | undefined;

	/**
	 * Activate safe mode if available.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this controller.
	 * @returns {-4} `ERR_BUSY` - There is another room in safe mode already.
	 * @returns {-6} `ERR_NOT_ENOUGH_RESOURCES` - There is no safe mode activations available.
	 * @returns {-11} `ERR_TIRED` - The previous safe mode is still cooling down, or the controller is `upgradeBlocked`, or the controller is downgraded for 50% plus 5000 ticks or more.
	 */
	activateSafeMode(): OK | ERR_NOT_OWNER | ERR_BUSY | ERR_NOT_ENOUGH_RESOURCES | ERR_TIRED;

	/**
	 * Make your claimed controller neutral again.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this controller.
	 */
	unclaim(): OK | ERR_NOT_OWNER;
}

/**
 * Contains energy which can be spent on spawning bigger creeps.
 * Extensions can be placed anywhere in the room, any spawns will be able to use them regardless of distance.
 * @see https://docs.screeps.com/api/#StructureExtension
 */
declare class StructureExtension extends OwnedStructure {
	/** One of the `STRUCTURE_*` constants. */
	readonly structureType: typeof STRUCTURE_EXTENSION;

	/**
	 * An alias for `.store[RESOURCE_ENERGY]`.
	 * @deprecated This property is deprecated and will be removed soon.
	 */
	readonly energy: number;

	/**
	 * An alias for `.store.getCapacity(RESOURCE_ENERGY)`.
	 * The total amount of energy the extension can contain.
	 * @deprecated This property is deprecated and will be removed soon.
	 */
	readonly energyCapacity: number;

	/** A `Store` object that contains cargo of this structure. */
	readonly store: Store;
}

/**
 * Allows to harvest a mineral deposit.
 * Learn more about minerals from this article.
 * @tutorial https://docs.screeps.com/minerals.html
 * @see https://docs.screeps.com/api/#StructureExtractor
 */
declare class StructureExtractor extends OwnedStructure {
	/** One of the `STRUCTURE_*` constants. */
	readonly structureType: typeof STRUCTURE_EXTRACTOR;

	/** The amount of game ticks until the next harvest action is possible. */
	readonly cooldown: number;
}

/**
 * Produces trade commodities from base minerals and other commodities.
 * Learn more about commodities from this article.
 * @see https://docs.screeps.com/resources.html#Commodities
 */
declare class StructureFactory extends OwnedStructure {
	/** The amount of game ticks the factory has to wait until the next production is possible. */
	readonly cooldown: number;

	/**
	 * The factory's level.
	 * Can be set by applying the `PWR_OPERATE_FACTORY` power to a newly built factory.
	 * Once set, the level cannot be changed.
	 */
	readonly level: number;

	/**
	 * A `Store` object that contains cargo of this structure.
	 */
	readonly store: Store;

	/**
	 * An alias for `.store.getCapacity()`.
	 * @deprecated This property is deprecated and will be removed soon.
	 */
	readonly storeCapacity: number;

	/**
	 * Produces the specified commodity. All ingredients should be available in the factory store.
	 * @param resourceType One of the `RESOURCE_*` constants.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this structure.
	 * @returns {-4} `ERR_BUSY` - The factory is not operated by the `PWR_OPERATE_FACTORY` power.
	 * @returns {-6} `ERR_NOT_ENOUGH_RESOURCES` - The structure does not have the required amount of resources.
	 * @returns {-7} `ERR_INVALID_TARGET` - The factory cannot produce the commodity of this level.
	 * @returns {-8} `ERR_FULL` - The factory cannot contain the produce.
	 * @returns {-10} `ERR_INVALID_ARGS` - The arguments provided are incorrect.
	 * @returns {-11} `ERR_TIRED` - The factory is still cooling down.
	 * @returns {-14} `ERR_RCL_NOT_ENOUGH` - Your Room Controller level is insufficient to use the factory.
	 */
	produce(
		resourceType: RESOURCE_CONSTANT
	):
		| OK
		| ERR_NOT_OWNER
		| ERR_BUSY
		| ERR_NOT_ENOUGH_RESOURCES
		| ERR_INVALID_TARGET
		| ERR_FULL
		| ERR_INVALID_ARGS
		| ERR_TIRED
		| ERR_RCL_NOT_ENOUGH;
}

/**
 * This NPC structure is a control center of NPC Strongholds...
 * @see https://docs.screeps.com/api/#StructureInvaderCore
 */
declare class StructureInvaderCore extends OwnedStructure {
	/** The level of the stronghold. The amount and quality of the loot depends on the level. */
	readonly level: number;

	/** Shows the timer for a not yet deployed stronghold, undefined otherwise. */
	readonly ticksToDeploy?: number;
}

/**
 * Non-player structure.
 * Spawns NPC Source Keepers that guards energy sources and minerals in some rooms.
 * This structure cannot be destroyed.
 * @see https://docs.screeps.com/api/#StructureKeeperLair
 */
declare class StructureKeeperLair extends OwnedStructure {
	/** One of the `STRUCTURE_*` constants. */
	readonly structureType: typeof STRUCTURE_KEEPER_LAIR;

	/** Time to spawning of the next Source Keeper. */
	readonly ticksToSpawn: number;
}

/**
 * Produces mineral compounds from base minerals, boosts and unboosts creeps.
 * Learn more about minerals from this article.
 * @tutorial https://docs.screeps.com/minerals.html
 * @see https://docs.screeps.com/api/#StructureLab
 */
declare class StructureLab extends OwnedStructure {
	/** One of the `STRUCTURE_*` constants. */
	readonly structureType: typeof STRUCTURE_LAB;

	/** The amount of game ticks the lab has to wait until the next reaction or unboost operation is possible. */
	readonly cooldown: number;

	/**
	 * An alias for `.store[RESOURCE_ENERGY]`.
	 * @deprecated This property is deprecated and will be removed soon.
	 */
	readonly energy: number;

	/**
	 * An alias for `.store.getCapacity(RESOURCE_ENERGY)`.
	 * @deprecated This property is deprecated and will be removed soon.
	 */
	readonly energyCapacity: number;

	/**
	 * An alias for `lab.store[lab.mineralType]`.
	 * @deprecated This property is deprecated and will be removed soon.
	 */
	readonly mineralAmount: number;

	/** The type of minerals containing in the lab. Labs can contain only one mineral type at the same time. */
	readonly mineralType: MineralConstant;

	/**
	 * An alias for `lab.store.getCapacity(lab.mineralType || yourMineral)`.
	 * @deprecated This property is deprecated and will be removed soon.
	 */
	readonly mineralCapacity: number;

	/** A `Store` object that contains cargo of this structure. */
	readonly store: Store;

	/**
	 * Boosts creep body parts using the containing mineral compound.
	 * The creep has to be at adjacent square to the lab.
	 * @param creep The target creep.
	 * @param bodyPartsCount The number of body parts of the corresponding type to be boosted. Body parts are always counted left-to-right for `TOUGH`, and right-to-left for other types. If undefined, all the eligible body parts are boosted.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this lab.
	 * @returns {-5} `ERR_NOT_FOUND` - The mineral containing in the lab cannot boost any of the creep's body parts.
	 * @returns {-6} `ERR_NOT_ENOUGH_RESOURCES` - The lab does not have enough energy or minerals.
	 * @returns {-7} `ERR_INVALID_TARGET` - The targets is not valid creep object.
	 * @returns {-9} `ERR_NOT_IN_RANGE` - The targets are too far away.
	 * @returns {-14} `ERR_RCL_NOT_ENOUGH` - Room Controller Level insufficient to use this structure.
	 */
	boostCreep(
		creep: Creep,
		bodyPartsCount?: number
	):
		| OK
		| ERR_NOT_OWNER
		| ERR_NOT_FOUND
		| ERR_NOT_ENOUGH_RESOURCES
		| ERR_INVALID_TARGET
		| ERR_NOT_IN_RANGE
		| ERR_RCL_NOT_ENOUGH;

	/**
	 * Breaks mineral compounds back into reagents.
	 * The same output labs can be used by many source labs.
	 * @param lab1 The first result lab.
	 * @param lab2 The second result lab.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this lab.
	 * @returns {-6} `ERR_NOT_ENOUGH_RESOURCES` - The source lab do not have enough resources.
	 * @returns {-7} `ERR_INVALID_TARGET` - The targets are not valid lab objects.
	 * @returns {-8} `ERR_FULL` - One of targets cannot receive any more resource.
	 * @returns {-9} `ERR_NOT_IN_RANGE` - The targets are too far away.
	 * @returns {-10} `ERR_INVALID_ARGS` - The reaction cannot be reversed into this resources.
	 * @returns {-11} `ERR_TIRED` - The lab is still cooling down.
	 * @returns {-14} `ERR_RCL_NOT_ENOUGH` - Room Controller Level insufficient to use this structure.
	 */
	reverseReaction(
		lab1: StructureLab,
		lab2: StructureLab
	):
		| OK
		| ERR_NOT_OWNER
		| ERR_NOT_ENOUGH_RESOURCES
		| ERR_INVALID_TARGET
		| ERR_FULL
		| ERR_NOT_IN_RANGE
		| ERR_INVALID_ARGS
		| ERR_TIRED
		| ERR_RCL_NOT_ENOUGH;

	/**
	 * Produce mineral compounds using reagents from two other labs.
	 * The same input labs can be used by many output labs.
	 * @param lab1 The first source lab.
	 * @param lab2 The second source lab.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this lab.
	 * @returns {-6} `ERR_NOT_ENOUGH_RESOURCES` - The source lab do not have enough resources.
	 * @returns {-7} `ERR_INVALID_TARGET` - The targets are not valid lab objects.
	 * @returns {-8} `ERR_FULL` - The target cannot receive any more resource.
	 * @returns {-9} `ERR_NOT_IN_RANGE` - The targets are too far away.
	 * @returns {-10} `ERR_INVALID_ARGS` - The reaction cannot be run using this resources.
	 * @returns {-11} `ERR_TIRED` - The lab is still cooling down.
	 * @returns {-14} `ERR_RCL_NOT_ENOUGH` - Room Controller Level insufficient to use this structure.
	 */
	runReaction(
		lab1: StructureLab,
		lab2: StructureLab
	):
		| OK
		| ERR_NOT_OWNER
		| ERR_NOT_ENOUGH_RESOURCES
		| ERR_INVALID_TARGET
		| ERR_FULL
		| ERR_NOT_IN_RANGE
		| ERR_INVALID_ARGS
		| ERR_TIRED
		| ERR_RCL_NOT_ENOUGH;

	/**
	 * Immediately remove boosts from the creep and drop 50% of the mineral compounds used to boost it onto the ground regardless of the creep's remaining time to live.
	 * The creep has to be at adjacent square to the lab.
	 * Unboosting requires cooldown time equal to the total sum of the reactions needed to produce all the compounds applied to the creep.
	 * @param creep The target creep.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this lab, or the target creep.
	 * @returns {-5} `ERR_NOT_FOUND` - The target has no boosted parts.
	 * @returns {-7} `ERR_INVALID_TARGET` - The target is not a valid Creep object.
	 * @returns {-9} `ERR_NOT_IN_RANGE` - The target is too far away.
	 * @returns {-11} `ERR_TIRED` - The lab is still cooling down.
	 * @returns {-14} `ERR_RCL_NOT_ENOUGH` - Room Controller Level insufficient to use this structure.
	 */
	unboostCreep(
		creep: Creep
	): OK | ERR_NOT_OWNER | ERR_NOT_FOUND | ERR_INVALID_TARGET | ERR_NOT_IN_RANGE | ERR_TIRED | ERR_RCL_NOT_ENOUGH;
}

/**
 * Remotely transfers energy to another Link in the same room.
 * @see https://docs.screeps.com/api/#StructureLink
 */
declare class StructureLink extends OwnedStructure {
	/** One of the `STRUCTURE_*` constants. */
	readonly structureType: typeof STRUCTURE_LINK;

	/** The amount of game ticks the link has to wait until the next transfer is possible. */
	readonly cooldown: number;

	/**
	 * An alias for `.store[RESOURCE_ENERGY]`.
	 * @deprecated This property is deprecated and will be removed soon.
	 */
	readonly energy: number;

	/**
	 * An alias for `.store.getCapacity(RESOURCE_ENERGY)`.
	 * @deprecated This property is deprecated and will be removed soon.
	 */
	readonly energyCapacity: number;

	/**
	 * A `Store` object that contains cargo of this structure.
	 */
	readonly store: Store;

	/**
	 * Remotely transfer energy to another link at any location in the same room.
	 * @param target The target object.
	 * @param amount The amount of energy to be transferred. If omitted, all the available energy is used.¨
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this link.
	 * @returns {-6} `ERR_NOT_ENOUGH_RESOURCES` - The structure does not have the given amount of energy.
	 * @returns {-7} `ERR_INVALID_TARGET` - The target is not a valid StructureLink object.
	 * @returns {-8} `ERR_FULL` - The target cannot receive any more energy.
	 * @returns {-9} `ERR_NOT_IN_RANGE` - The target is too far away.
	 * @returns {-10} `ERR_INVALID_ARGS` - The energy amount is incorrect.
	 * @returns {-11} `ERR_TIRED` - The link is still cooling down.
	 * @returns {-14} `ERR_RCL_NOT_ENOUGH` - Room Controller Level insufficient to use this link.
	 */
	transferEnergy(
		target: StructureLink,
		amount?: number
	):
		| OK
		| ERR_NOT_OWNER
		| ERR_NOT_ENOUGH_RESOURCES
		| ERR_INVALID_TARGET
		| ERR_FULL
		| ERR_NOT_IN_RANGE
		| ERR_INVALID_ARGS
		| ERR_TIRED
		| ERR_RCL_NOT_ENOUGH;
}

/**
 * Launches a nuke to another room dealing huge damage to the landing area.
 * Each launch has a cooldown and requires energy and ghodium resources.
 * Launching creates a Nuke object at the target room position which is visible to any player until it is landed.
 * Incoming nuke cannot be moved or cancelled.
 * Nukes cannot be launched from or to novice rooms.
 * Resources placed into a StructureNuker cannot be withdrawn.
 * @see https://docs.screeps.com/api/#StructureNuker
 */
declare class StructureNuker extends OwnedStructure {
	/** One of the `STRUCTURE_*` constants. */
	readonly structureType: typeof STRUCTURE_NUKER;

	/**
	 * An alias for `.store[RESOURCE_ENERGY]`.
	 * @deprecated This property is deprecated and will be removed soon.
	 */
	readonly energy: number;

	/**
	 * An alias for `.store.getCapacity(RESOURCE_ENERGY)`.
	 * @deprecated This property is deprecated and will be removed soon.
	 */
	readonly energyCapacity: number;

	/**
	 * An alias for `.store[RESOURCE_GHODIUM]`.
	 * @deprecated This property is deprecated and will be removed soon.
	 */
	readonly ghodium: number;

	/**
	 * An alias for `.store.getCapacity(RESOURCE_GHODIUM)`.
	 * This property is deprecated and will be removed soon.
	 */
	readonly ghodiumCapacity: number;

	/** The amount of game ticks until the next launch is possible. */
	readonly cooldown: number;

	/** A `Store` object that contains cargo of this structure. */
	readonly store: Store;

	/**
	 * Launch a nuke to the specified position.
	 * @param pos The target room position.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this structure.
	 * @returns {-6} `ERR_NOT_ENOUGH_RESOURCES` - The structure does not have enough energy and/or ghodium.
	 * @returns {-7} `ERR_INVALID_TARGET` - The nuke can't be launched to the specified RoomPosition (see Start Areas).
	 * @returns {-9} `ERR_NOT_IN_RANGE` - The target room is out of range.
	 * @returns {-10} `ERR_INVALID_ARGS` - The target is not a valid RoomPosition.
	 * @returns {-11} `ERR_TIRED` - This structure is still cooling down.
	 * @returns {-14} `ERR_RCL_NOT_ENOUGH` - Room Controller Level insufficient to use this structure.
	 */
	launchNuke(
		pos: RoomPosition
	):
		| OK
		| ERR_NOT_OWNER
		| ERR_NOT_ENOUGH_RESOURCES
		| ERR_INVALID_TARGET
		| ERR_NOT_IN_RANGE
		| ERR_INVALID_ARGS
		| ERR_TIRED
		| ERR_RCL_NOT_ENOUGH;
}

/**
 * Provides visibility into a distant room from your script.
 * @see https://docs.screeps.com/api/#StructureObserver
 */
declare class StructureObserver extends OwnedStructure {
	/** One of the `STRUCTURE_*` constants. */
	readonly structureType: typeof STRUCTURE_OBSERVER;

	/**
	 * Provide visibility into a distant room from your script.
	 * The target room object will be available on the next tick.
	 * @param roomName The name of the target room.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this structure.
	 * @returns {-9} `ERR_NOT_IN_RANGE` - Room `roomName` is not in observing range.
	 * @returns {-10} `ERR_INVALID_ARGS` - `roomName` argument is not a valid room name value.
	 * @returns {-14} `ERR_RCL_NOT_ENOUGH` - Room Controller Level insufficient to use this structure.
	 */
	observeRoom(roomName: RoomName): OK | ERR_NOT_OWNER | ERR_NOT_IN_RANGE | ERR_INVALID_ARGS | ERR_RCL_NOT_ENOUGH;
}

/**
 * Non-player structure.
 * Contains power resource which can be obtained by destroying the structure.
 * Hits the attacker creep back on each attack.
 * Learn more about power from this article.
 * @tutorial https://docs.screeps.com/power.html
 * @see https://docs.screeps.com/api/#StructurePowerBank
 */
declare class StructurePowerBank extends OwnedStructure {
	/** One of the `STRUCTURE_*` constants. */
	readonly structureType: typeof STRUCTURE_POWER_BANK;

	/** The amount of power containing. */
	readonly power: number;

	/** The amount of game ticks when this structure will disappear. */
	readonly ticksToDecay: number;
}

/**
 * Processes power into your account, and spawns power creeps with special unique powers (in development).
 * Learn more about power from this article.
 * @tutorial https://docs.screeps.com/power.html
 * @see https://docs.screeps.com/api/#StructurePowerSpawn
 */
declare class StructurePowerSpawn extends OwnedStructure {
	/** One of the `STRUCTURE_*` constants. */
	readonly structureType: typeof STRUCTURE_POWER_SPAWN;

	/**
	 * An alias for `.store[RESOURCE_ENERGY]`.
	 * @deprecated This property is deprecated and will be removed soon.
	 */
	readonly energy: number;

	/**
	 * An alias for `.store.getCapacity(RESOURCE_ENERGY)`.
	 * @deprecated This property is deprecated and will be removed soon.
	 */
	readonly energyCapacity: number;

	/**
	 * An alias for `.store[RESOURCE_POWER]`.
	 * @deprecated This property is deprecated and will be removed soon.
	 */
	readonly power: number;

	/**
	 * An alias for `.store.getCapacity(RESOURCE_POWER)`.
	 * @deprecated This property is deprecated and will be removed soon.
	 */
	readonly powerCapacity: number;

	/**
	 * A `Store` object that contains cargo of this structure.
	 */
	readonly store: Store;

	/**
	 * Register power resource units into your account.
	 * Registered power allows to develop power creeps skills.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this structure.
	 * @returns {-6} `ERR_NOT_ENOUGH_RESOURCES` - The structure does not have enough energy or power resource units.
	 * @returns {-14} `ERR_RCL_NOT_ENOUGH` - Room Controller Level insufficient to use this structure.
	 */
	processPower(): OK | ERR_NOT_OWNER | ERR_NOT_ENOUGH_RESOURCES | ERR_RCL_NOT_ENOUGH;
}

/**
 * A non-player structure.
 * Instantly teleports your creeps to a distant room acting as a room exit tile.
 * Portals appear randomly in the central room of each sector.
 * @see https://docs.screeps.com/api/#StructurePortal
 */
declare class StructurePortal extends Structure {
	/** One of the `STRUCTURE_*` constants. */
	readonly structureType: typeof STRUCTURE_PORTAL;

	/**
	 * If this is an **inter-room** portal, then this property contains a `RoomPosition` object leading to the point in the destination room.
	 *
	 * If this is an **inter-shard** portal, then this property contains an object with `shard` and `room` string properties.
	 * Exact coordinates are undetermined, the creep will appear at any free spot in the destination room
	 */
	readonly destination: RoomPosition | { shard: string; room: string };

	/** The amount of game ticks when the portal disappears, or undefined when the portal is stable. */
	readonly ticksToDecay: number | undefined;
}

/**
 * Blocks movement of hostile creeps, and defends your creeps and structures on the same tile.
 * Can be used as a controllable gate.
 * @see https://docs.screeps.com/api/#StructureRampart
 */
declare class StructureRampart extends OwnedStructure {
	/** One of the `STRUCTURE_*` constants. */
	readonly structureType: typeof STRUCTURE_RAMPART;

	/** If false (default), only your creeps can step on the same square. If true, any hostile creeps can pass through. */
	readonly isPublic: boolean;

	/** The amount of game ticks when this rampart will lose some hit points. */
	readonly ticksToDecay: number;

	/**
	 * Make this rampart public to allow other players' creeps to pass through.
	 * @param isPublic Whether this rampart should be public or non-public.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this structure.
	 */
	setPublic(isPublic: boolean): OK | ERR_NOT_OWNER;
}

/**
 * Decreases movement cost to 1.
 * Using roads allows creating creeps with less `MOVE` body parts.
 * You can also build roads on top of natural terrain walls which are otherwise impassable.
 * @see https://docs.screeps.com/api/#StructureRoad
 */
declare class StructureRoad extends Structure {
	/** One of the `STRUCTURE_*` constants. */
	readonly structureType: typeof STRUCTURE_ROAD;

	/** The amount of game ticks when this road will lose some hit points. */
	readonly ticksToDecay: number;
}

/**
 * Spawn is your colony center.
 * This structure can create, renew, and recycle creeps.
 * All your spawns are accessible through `Game.spawns` hash list.
 * Spawns auto-regenerate a little amount of energy each tick, so that you can easily recover even if all your creeps died.
 * @see https://docs.screeps.com/api/#StructureSpawn
 */
declare class StructureSpawn extends OwnedStructure {
	/** One of the `STRUCTURE_*` constants. */
	readonly structureType: typeof STRUCTURE_SPAWN;

	/**
	 * An alias for `.store[RESOURCE_ENERGY]`.
	 * @deprecated This property is deprecated and will be removed soon.
	 */
	readonly energy: number;

	/**
	 * An alias for `.store.getCapacity(RESOURCE_ENERGY)`.
	 * @deprecated This property is deprecated and will be removed soon.
	 */
	readonly energyCapacity: number;

	/**
	 * A shorthand to `Memory.spawns[spawn.name]`. You can use it for quick access the spawn’s specific memory data object.
	 * @tutorial https://docs.screeps.com/global-objects.html#Memory-object
	 */
	readonly memory: SpawnMemory;

	/**
	 * Spawn’s name.
	 * You choose the name upon creating a new spawn, and it cannot be changed later.
	 * This name is a hash key to access the spawn via the `Game.spawns` object.
	 */
	readonly name: string;

	/** If the spawn is in process of spawning a new creep, this object will contain a `StructureSpawn.Spawning` object, or null otherwise. */
	readonly spawning: Spawning | null;

	/** A `Store` object that contains cargo of this structure. */
	readonly store: Store;

	/**
	 * Check if a creep can be created.
	 * @deprecated This method is deprecated and will be removed soon. Please use `StructureSpawn.spawnCreep` with `dryRun` flag instead.
	 *
	 * *No, i am not writing full comment for this large **deprecated** function. Just no.*
	 */
	canCreateCreep(
		body: BODYPART_CONSTANT[],
		name?: string
	): OK | ERR_NOT_OWNER | ERR_NAME_EXISTS | ERR_BUSY | ERR_NOT_ENOUGH_ENERGY | ERR_INVALID_ARGS | ERR_RCL_NOT_ENOUGH;

	/**
	 * Start the creep spawning process.
	 * The required energy amount can be withdrawn from all spawns and extensions in the room.
	 * @deprecated This method is deprecated and will be removed soon. Please use `StructureSpawn.spawnCreep` instead.
	 *
	 * *No, i am not writing full comment for this large **deprecated** function. Just no.*
	 */
	createCreep(
		body: BODYPART_CONSTANT[],
		name?: string,
		memory?: CreepMemory
	):
		| string
		| ERR_NOT_OWNER
		| ERR_NAME_EXISTS
		| ERR_BUSY
		| ERR_NOT_ENOUGH_ENERGY
		| ERR_INVALID_ARGS
		| ERR_RCL_NOT_ENOUGH;

	/**
	 * Start the creep spawning process.
	 * The required energy amount can be withdrawn from all spawns and extensions in the room.
	 * @param body An array describing the new creep’s body. Should contain 1 to 50 elements
	 * @param name The name of a new creep. The name length limit is 100 characters. It must be a unique creep name, i.e. the `Game.creeps` object should not contain another creep with the same name (hash key).
	 * @param opts An object with additional options for the spawning process.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this spawn.
	 * @returns {-3} `ERR_NAME_EXISTS` - There is a creep with the same name already.
	 * @returns {-4} `ERR_BUSY` - The spawn is already in process of spawning another creep.
	 * @returns {-6} `ERR_NOT_ENOUGH_ENERGY` - The spawn and its extensions contain not enough energy to create a creep with the given body.
	 * @returns {-10} `ERR_INVALID_ARGS` - Body is not properly described or name was not provided.
	 * @returns {-14} `ERR_RCL_NOT_ENOUGH` - Your Room Controller level is insufficient to use this spawn.
	 */
	spawnCreep(
		body: BODYPART_CONSTANT[],
		name: string,
		opts?: Partial<SpawnOpts>
	): OK | ERR_NOT_OWNER | ERR_NAME_EXISTS | ERR_BUSY | ERR_NOT_ENOUGH_ENERGY | ERR_INVALID_ARGS | ERR_RCL_NOT_ENOUGH;

	/**
	 * Kill the creep and drop up to 100% of resources spent on its spawning and boosting depending on remaining life time.
	 * The target should be at adjacent square.
	 * Energy return is limited to 125 units per body part.
	 * @param target The target creep object.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this spawn or the target creep.
	 * @returns {-7} `ERR_INVALID_TARGET` - The specified target object is not a creep.
	 * @returns {-9} `ERR_NOT_IN_RANGE` - The target creep is too far away.
	 * @returns {-14} `ERR_RCL_NOT_ENOUGH` - Your Room Controller level is insufficient to use this spawn.
	 */
	recycleCreep(target: Creep): OK | ERR_NOT_OWNER | ERR_INVALID_TARGET | ERR_NOT_IN_RANGE | ERR_RCL_NOT_ENOUGH;

	/**
	 * Increase the remaining time to live of the target creep.
	 * The target should be at adjacent square.
	 * The target should not have `CLAIM` body parts.
	 * The spawn should not be busy with the spawning process.
	 * Each execution increases the creep's timer by amount of ticks according to this formula:
	 *
	 * `floor(600/body_size)`
	 *
	 * Energy required for each execution is determined using this formula:
	 *
	 * `ceil(creep_cost/2.5/body_size)
	 *
	 * Renewing a creep removes all of its boosts.`
	 * @param target The target creep object.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of the spawn, or the creep.
	 * @returns {-4} `ERR_BUSY` - The spawn is spawning another creep.
	 * @returns {-6} `ERR_NOT_ENOUGH_ENERGY` - The spawn does not have enough energy.
	 * @returns {-7} `ERR_INVALID_TARGET` - The specified target object is not a creep, or the creep has `CLAIM` body part.
	 * @returns {-8} `ERR_FULL` - The target creep's time to live timer is full.
	 * @returns {-9} `ERR_NOT_IN_RANGE` - The target creep is too far away.
	 * @returns {-14} `ERR_RCL_NOT_ENOUGH` - Your Room Controller level is insufficient to use this spawn.
	 */
	renewCreep(
		target: Creep
	):
		| OK
		| ERR_NOT_OWNER
		| ERR_BUSY
		| ERR_NOT_ENOUGH_ENERGY
		| ERR_INVALID_TARGET
		| ERR_FULL
		| ERR_NOT_IN_RANGE
		| ERR_RCL_NOT_ENOUGH;
}

/**
 * A structure that can store huge amount of resource units.
 * Only one structure per room is allowed that can be addressed by `Room.storage` property.
 * @see https://docs.screeps.com/api/#StructureStorage
 */
declare class StructureStorage extends OwnedStructure {
	/** One of the `STRUCTURE_*` constants. */
	readonly structureType: typeof STRUCTURE_STORAGE;

	/** A `Store` object that contains cargo of this structure. */
	readonly store: Store;

	/**
	 * An alias for `.store.getCapacity()`.
	 * @deprecated This property is deprecated and will be removed soon.
	 */
	readonly storeCapacity: number;
}

/**
 * Sends any resources to a Terminal in another room.
 * The destination Terminal can belong to any player.
 * Each transaction requires additional energy (regardless of the transfer resource type) that can be calculated using `Game.market.calcTransactionCost` method.
 * For example, sending 1000 mineral units from W0N0 to W10N5 will consume 742 energy units.
 * You can track your incoming and outgoing transactions using the `Game.market` object.
 * Only one Terminal per room is allowed that can be addressed by `Room.terminal` property.
 *
 * Terminals are used in the Market system.
 * @tutorial https://docs.screeps.com/market.html
 * @see https://docs.screeps.com/api/#StructureTerminal
 */
declare class StructureTerminal extends OwnedStructure {
	/** One of the `STRUCTURE_*` constants. */
	readonly structureType: typeof STRUCTURE_TERMINAL;

	/** The remaining amount of ticks while this terminal cannot be used to make `StructureTerminal.send` or `Game.market.deal` calls. */
	readonly cooldown: number;

	/** A `Store` object that contains cargo of this structure. */
	readonly store: Store;

	/**
	 * An alias for `.store.getCapacity()`.
	 * @deprecated This property is deprecated and will be removed soon.
	 */
	readonly storeCapacity: number;

	/**
	 * Sends resource to a Terminal in another room with the specified name.
	 * @param resourceType One of the `RESOURCE_*` constants.
	 * @param amount The amount of resources to be sent.
	 * @param destination The name of the target room. You don't have to gain visibility in this room.
	 * @param description The description of the transaction. It is visible to the recipient. The maximum length is 100 characters.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this structure.
	 * @returns {-6} `ERR_NOT_ENOUGH_RESOURCES` - The structure does not have the required amount of resources.
	 * @returns {-10} `ERR_INVALID_ARGS` - The arguments provided are incorrect.
	 * @returns {-11} `ERR_TIRED` - The terminal is still cooling down.
	 */
	send(
		resourceType: RESOURCE_CONSTANT,
		amount: number,
		destination: RoomName,
		description?: string
	): OK | ERR_NOT_OWNER | ERR_NOT_ENOUGH_RESOURCES | ERR_INVALID_ARGS | ERR_TIRED;
}

/**
 * Remotely attacks or heals creeps, or repairs structures.
 * Can be targeted to any object in the room.
 * However, its effectiveness linearly depends on the distance.
 * Each action consumes energy.
 * @see https://docs.screeps.com/api/#StructureTower
 */
declare class StructureTower extends OwnedStructure {
	/** One of the `STRUCTURE_*` constants. */
	readonly structureType: typeof STRUCTURE_TOWER;

	/**
	 * An alias for `.store[RESOURCE_ENERGY]`.
	 * @deprecated This property is deprecated and will be removed soon.
	 */
	readonly energy: number;

	/**
	 * An alias for `.store.getCapacity(RESOURCE_ENERGY)`.
	 * @deprecated This property is deprecated and will be removed soon.
	 */
	readonly energyCapacity: number;

	/** A `Store` object that contains cargo of this structure. */
	readonly store: Store;

	/**
	 * Remotely attack any creep, power creep or structure in the room.
	 * @param target The target creep.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this structure.
	 * @returns {-6} `ERR_NOT_ENOUGH_ENERGY` - The tower does not have enough energy.
	 * @returns {-7} `ERR_INVALID_TARGET` - The target is not a valid attackable object.
	 * @returns {-14} `ERR_RCL_NOT_ENOUGH` - Room Controller Level insufficient to use this structure.
	 */
	attack(
		target: Creep | PowerCreep | Structure
	): OK | ERR_NOT_OWNER | ERR_NOT_ENOUGH_ENERGY | ERR_INVALID_TARGET | ERR_RCL_NOT_ENOUGH;

	/**
	 * Remotely heal any creep or power creep in the room.
	 * @param target The target creep.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this structure.
	 * @returns {-6} `ERR_NOT_ENOUGH_ENERGY` - The tower does not have enough energy.
	 * @returns {-7} `ERR_INVALID_TARGET` - The target is not a valid creep object.
	 * @returns {-14} `ERR_RCL_NOT_ENOUGH` - Room Controller Level insufficient to use this structure.
	 */
	heal(
		target: Creep | PowerCreep
	): OK | ERR_NOT_OWNER | ERR_NOT_ENOUGH_ENERGY | ERR_INVALID_TARGET | ERR_RCL_NOT_ENOUGH;

	/**
	 * repair(target)
	 * @param target The target structure.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this structure.
	 * @returns {-6} `ERR_NOT_ENOUGH_ENERGY` - The tower does not have enough energy.
	 * @returns {-7} `ERR_INVALID_TARGET` - The target is not a valid repairable object.
	 * @returns {-14} `ERR_RCL_NOT_ENOUGH` - Room Controller Level insufficient to use this structure.
	 */
	repair(target: Structure): OK | ERR_NOT_OWNER | ERR_NOT_ENOUGH_ENERGY | ERR_INVALID_TARGET | ERR_RCL_NOT_ENOUGH;
}

/** Blocks movement of all creeps.
 * Players can build destructible walls in controlled rooms.
 * Some rooms also contain indestructible walls separating novice and respawn areas from the rest of the world or dividing novice / respawn areas into smaller sections.
 * Indestructible walls have no hits property.
 * @see https://docs.screeps.com/api/#StructureWall
 */
declare class StructureWall extends Structure {
	/** One of the `STRUCTURE_*` constants. */
	readonly structureType: typeof STRUCTURE_WALL;

	/** @private **This property is not officially documented** Use at your own risk */
	constructor(id: string);

	/**
	 * Destroy this structure immediately.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this structure, and it's not in your room.
	 * @returns {-4} `ERR_BUSY` - Hostile creeps are in the room.
	 */
	destroy(): OK | ERR_NOT_OWNER | ERR_BUSY;

	/**
	 * Check whether this structure can be used.
	 * If room controller level is insufficient, then this method will return false, and the structure will be highlighted with red in the game.
	 */
	isActive(): boolean;

	/**
	 * Toggle auto notification when the structure is under attack.
	 * The notification will be sent to your account email.
	 *
	 * Turned on by default.
	 * @param enabled Whether to enable notification or disable.
	 * @returns {0} `OK` - The operation has been scheduled successfully.
	 * @returns {-1} `ERR_NOT_OWNER` - You are not the owner of this structure.
	 * @returns {-10} `ERR_INVALID_ARGS` - `enable` argument is not a boolean value.
	 */
	notifyWhenAttacked(enabled: boolean): OK | ERR_NOT_OWNER | ERR_INVALID_ARGS;
}

/**
 * A remnant of dead creeps. This is a walkable object.
 */
declare class Tombstone extends RoomObject {
	/** An object containing the deceased creep or power creep. */
	readonly creep: Creep | PowerCreep;

	/** Time of death. */
	readonly deathTime: number;

	/** A unique object identificator. You can use `Game.getObjectById` method to retrieve an object instance by its `id`. */
	readonly id: string;

	/** A `Store` object that contains cargo of this structure. */
	readonly store: Store;

	/** @private **This property is not officially documented** Use at your own risk */
	constructor(id: string);
}

/**
 * A global plain object which can contain arbitrary data.
 * You can access it both using the API and the Memory UI in the game editor.
 * Learn how to work with memory from this article.
 * @tutorial http://docs.screeps.com/global-objects.html#Memory-object
 */
declare const Memory: Memory;
