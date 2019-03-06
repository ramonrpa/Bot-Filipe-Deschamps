module.exports = {
    run: (client, message, args) => {

        if (!message.member) return
        let user;

        if (message.mentions.users.first()) {
            user = message.mentions.users.first();
        } else {
            user = message.author;
        }
        const m = message.channel.send("Avatar");

        const member = message.guild.member(user);
        let embed = {
            "color": 15614245,
            "title": `${user.username}#${user.discriminator}`,
            "thumbnail": {
                "url": user.avatarURL
            },
            "fields": [{
                    "name": "ID:",
                    "value": `${user.id}`,
                    "inline": true
                },
                {
                    "name": "Nickname:",
                    "value": `${member.nickname}` !== null ? `${user.username}` : 'None',
                    "inline": true
                },
                {
                    "name": "Created At:",
                    "value": `${formatDate('DD/MM/YYYY, às HH:mm:ss', user.createdAt)}`,
                    "inline": true
                },
                {
                    "name": "Joined Server:",
                    "value": `${formatDate('DD/MM/YYYY, às HH:mm:ss',user.joinedAt)}`,
                    "inline": true
                },
                {
                    "name": "Bot:",
                    "value": `${user.bot}`,
                    "inline": true
                },
                {
                    "name": "Status:",
                    "value": `${user.presence.status}`,
                    "inline": true
                },{
                    "name": "Game:",
                    "value": `${user.presence.game ? user.presence.game.name : 'None'}`,
                    "inline": true
                },{
                    "name": "Roles:",
                    "value": member.roles.map(roles => `${roles.name}`).join(', '),
                    "inline": true
                },
            ]
        }
        message.channel.send({
            embed
        })
    },

    conf: {
        onlyguilds: true
    },

    get help() {
        return {
            name: 'avatar',
            category: 'Moderação',
            description: 'Retornar info do membro.',
            usage: 'avatar'
        }
    }
}

function formatDate(template, date) {
    var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
    date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
    return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
        return template.split(specs[i]).join(item)
    }, template)
}