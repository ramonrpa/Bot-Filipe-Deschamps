const Command = require('../strucutres/Command')

function clean(text) {
    if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

class Eval extends Command {
    constructor(client) {
        super(client)
        this.requiredArgs = true
        this.category = 'Dono'
        this.description = ''
        this.permissions = ['ADMINISTRATOR']
    }

    async run(message, args) {
        if (message.member.id == process.env.OWNERID) {
            try {
                let code = args.join(" ");
                let evaled = eval(code);
                if (typeof evaled !== "string")
                    evaled = require("util").inspect(evaled);
                message.channel.send(clean(evaled), {
                    code: "xl"
                });
            } catch (err) {
                message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
            }
        }
    }
}

module.exports = Eval
