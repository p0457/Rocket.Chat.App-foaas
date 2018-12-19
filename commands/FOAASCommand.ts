import { IHttp, IModify, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { ISlashCommand, SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';

export class FOASSCommand implements ISlashCommand {
    public command: string = 'foass';
    public i18nParamsExample: string = 'Slash_Command_Params_Example';
    public i18nDescription: string = 'Slash_Command_Description';
    public providesPreview: boolean = false;

    public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp): Promise<void> {
        const icon = await read.getEnvironmentReader().getSettings().getValueById('fuckingweather_icon');
        const username = await read.getEnvironmentReader().getSettings().getValueById('fuckingweather_name');

        let text = 'Fuck this error!';
        let successful = false;

        let url = 'http://foaas.com/';

        const from = '@' + context.getSender().name; // Attempt to mention
        // Check for <object> or not
        const object = context.getArguments().slice().join(' ');
        if (object !== null && object !== undefined) {
          let options = ['off', 'you', 'donut', 'shakespeare', 'linus', 'king', 'chainsaw', 'outside', 'madison', 'nugget', 'yoda'];
          options.push(object);
          const random_fu = options[Math.floor(Math.random()*options.length)];
          if (random_fu === object) {
            url += random_fu + '/' + from + '/';
          } else {
            url += random_fu + '/' + object + '/' + from + '/';
          }
        } else {
          const options = ['this', 'that', 'everything', 'everyone', 'pink', 'life', 'thanks', 'flying', 'fascinating', 'cool', 'what', 'because'];
          const random_fu = options[Math.floor(Math.random()*options.length)];
          url += random_fu + "/" + from + "/";
        }

        const response = await http.get(url, { headers: { Accept: 'application/json', 'User-Agent': 'Mozilla/5.0' } }); // Plz no blacklist
        if (response && response.content) {
          try{
            const json = JSON.parse(response.content);
            text = json.message + '\n' + json.subtitle;
            successful = true;
          }
          catch(err){
            successful = false;
            text = 'Fuck this parsing error!';
          }
        }

        const builder = modify.getCreator().startMessage()
            .setSender(context.getSender()).setRoom(context.getRoom())
            .setText(text).setUsernameAlias(username).setAvatarUrl(icon);

        if (successful === true) {
          // Respond in room
          await modify.getCreator().finish(builder);
        } else {
          // Respond back to user directly
          await modify.getNotifier().notifyUser(context.getSender(), builder.getMessage());
        }

        return;
    }
}
