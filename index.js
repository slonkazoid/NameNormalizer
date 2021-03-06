const { TOKEN, NAME_FORMAT, DB } = require("dotenv").config().parsed;
if (!NAME_FORMAT || NAME_FORMAT.length > 32) {
	console.error("Name format invalid, exiting.");
	process.exit(1);
}

const Keyv = require("keyv");
const db = new Keyv(DB);
const Discord = require("discord.js");
const client = new Discord.Client();

client.on("guildMemberAdd", async member => {
	let format = (await db.get(member.guild.id)) || NAME_FORMAT;
	let name = format
		.split("")
		.map(char =>
			char === "?" ? Math.floor(Math.random() * 10).toString() : char
		)
		.join("");
	member.setNickname(name);
	console.log("Member joined, assigned name '" + name + "'.");
});
client.on("message", async msg => {
	let mention = `<@!${client.user.id}>`;
	if (!msg.guild) return;
	if (!msg.content.startsWith(mention)) return;
	let args = msg.content.replace(mention, "").trim().split(" ");
	let cmd = args.shift();
	switch (cmd) {
		case "format":
			if (args.length > 0) {
				if (msg.member.hasPermission("MANAGE_GUILD")) {
					let newFormat = args.join(" ");
					if (newFormat.length > 32) {
						msg.channel.send("Invalid name format. (More than 32 characters)");
					} else {
						db.set(msg.guild.id, newFormat);
						msg.channel.send("New guild name format set.");
					}
				} else {
					msg.channel.send(
						"You are not allowed to change the name format. (Missing `Manage Server` permission)"
					);
				}
			} else {
				let currentFormat = await db.get(msg.guild.id);
				if (currentFormat) {
					msg.channel.send(
						"This guild's name format is `" +
							currentFormat.replace(/`/g, "\\`") +
							"`."
					);
				} else {
					msg.channel.send(
						"This guild uses the default name format. (`" +
							NAME_FORMAT.replace(/`/g, "\\`") +
							"`)"
					);
				}
			}
			break;
		case "reset":
			if (msg.member.hasPermission("MANAGE_GUILD")) {
				db.delete(msg.guild.id);
				msg.channel.send("Guild name format reset.");
			} else {
				msg.channel.send(
					"You are not allowed to reset the name format. (Missing `Manage Server` permission)"
				);
			}
			break;
		default:
			msg.channel.send(
				`You can see/change the name format with '${mention} format [fmt]' and reset it with '${mention} reset'.`
			);
			break;
	}
});

client.login(TOKEN);
