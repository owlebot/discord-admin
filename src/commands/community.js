/* eslint-disable import/no-default-export */
import { SlashCommand } from "slash-create";

export default class CommunityCommand extends SlashCommand {
	#baseUrl = "https://api.owle.bot";
	
	#headers = {
		"X-Access-Token": process.env.OPEN_API_TOKEN,
	};

	constructor(creator) {
		super(creator, {
			name: "community",
			description: "Get the number of members in your top community.",
		} );
	}

	async run(ctx) {
		const discordUser = ctx.user;

		const url = new URL(`/v1/accounts/${discordUser.id}/user/communities`, this.#baseUrl);

		try {
			const res = await fetch(url.href, {
				headers: this.#headers,
			} );
			
			const data = await res.json();

			if (data.communities?.length > 0) {
				data.communities.sort( (a, b) => b.members - a.members);
				return ctx.send(`Your highest community has ${data.communities[0].members} members`);
			}
			return ctx.send("You don't have any community yet");
		} catch (err) {
			return ctx.send("Error communicating with Owlebot API.");
		}
	}
}
