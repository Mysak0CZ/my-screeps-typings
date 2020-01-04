# Screeps-typings
TypeScript declarations for the game Screeps. In-game version 2019-12-27

> **These are not official typings for the Screeps game**

## About

For my requirements the community typings `screepers/typed-screeps` were insufficient. These typings support various things like templated getObjectById or recognition of type when using look/find functions and detection of the serialize flag in path finding options  
Also the memory definitions are in a separate file, intended to be edited by the user.

## Usage

Just drop all the files from `typings` directory to anywhere in your project and make sure other typings like `@types/screeps` aren't installed.

All functions, classes and interfaces have pretty much ctrl-c-v comments from the official [API documentation][Official API]  
The ones that don't contain everything from the documentation have either `@see` tag or `@tutorial` tag with link to the official website.

For examples see the `examples` directory

## Contribution

All Issue reports and Pull Requests are welcome! Feel free to contact me on slack: `Mysak0CZ`.

## Compatability

These typings were created with `@types/screeps` in mind. They are mostly compatable especially if you use the `examples/fixes.d.ts` optional file  
I also tested them with `bencbartlett/Overmind`. After insignificant changes it compiles without error.

## Footnote

Most typings aren't tested and there are still some `@todo`s 

[Official API]: https://docs.screeps.com/api/