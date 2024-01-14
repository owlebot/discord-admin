import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { ExpressServer } from "slash-create";

import { CustomSlashCreator } from "./client.js";

const PORT = 8080;

const creator = new CustomSlashCreator( {
	applicationID: process.env.DISCORD_APP_ID,
	publicKey: process.env.DISCORD_PUBLIC_KEY,
	token: process.env.DISCORD_BOT_TOKEN,
	serverPort: PORT,
	serverHost: "0.0.0.0",
} );

const scriptDir = dirname(fileURLToPath(import.meta.url) );

creator.on("debug", (message) => console.log("LIFECYCLE: ", message) );
creator.on("warn", (message) => console.log("LIFECYCLE: ", message) );
creator.on("error", (error) => console.error("LIFECYCLE: ", error) );
creator.on("synced", () => console.log("SYNC: ", "Commands synced!") );
creator.on("commandRun", (command, _, ctx) => console.log("COMMAND: ", `${ctx.user.username}#${ctx.user.discriminator} (${ctx.user.id}) ran command ${command.commandName}`) );
creator.on("commandRegister", (command) => console.log("COMMAND: ", `Registered command ${command.commandName}`) );
creator.on("commandError", (command, error) => console.error("COMMAND: ", `Command ${command.commandName}:`, error) );

creator
	.withServer(new ExpressServer() );

await creator.registerCommandsIn(join(scriptDir, "commands") );

creator.startServer();

// slash up work so this is not needed in most cases
creator.syncCommands();

console.log("LIFECYCLE: ", `Starting server at "localhost:${PORT}/interactions"`);
