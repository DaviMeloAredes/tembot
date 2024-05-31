import { CommandInteraction, CacheType, ApplicationCommandOptionType, TextChannel, EmbedBuilder, Embed } from "discord.js";
import { InteractionGeneric, InteractionOption } from "../interfaces/Interaction.generic";
import loggerAdapter from "../adapters/Logger.adapter";

class Announce implements InteractionGeneric {
    name: string;
    type: number;
    description: string;
    options?: InteractionOption[] | undefined;

    constructor () {
        this.name = 'anunciar';
        this.type = 1;
        this.description = 'Anunciar alguma coisa.'
        this.options = [
            {
                name: 'conteudo',
                description: 'O conteúdo do anúncio.',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'canal',
                description: 'O canal para onde o anúncio será enviado.',
                type: ApplicationCommandOptionType.Channel,
                required: true
            }
        ]
    }

    async response(interaction: CommandInteraction<CacheType>): Promise<any> {
        try {
            return await new Promise((resolve, reject) => {
                const channelId = interaction.options.get('canal')?.channel?.id;
                const content = interaction.options.get('conteudo')?.value;

                const channel = interaction.guild?.channels.cache.get(`${channelId}`);

                if (!channel?.isTextBased) return;

                const embed = new EmbedBuilder()
                    .setTitle(`📢 • ${content}`)
                    .setColor('Blue')
                    .setDescription(`- por: ${interaction.member}`);

                (<TextChannel>channel).send({ embeds: [ embed ] });

                resolve(interaction.reply(`Message sent.`));
            });
        } catch (e: any) {
            return loggerAdapter.log((e as Error), 'error');
        }
    }
}

export default new Announce();