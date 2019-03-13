const mapping = (function(object) {
    let numbers = [];
    for(let key in object) {
        numbers.push({regex: new RegExp(key, 'ig'), replacement: object[key]
     });
    };
    return numbers;
})({"0": ":zero:", "1": ":one:", "2": ":two:", "3": ":three:", "4": ":four:", "5": ":five:", "6": ":six:", "7": ":seven:", "8": ":eight:", "9": ":nine:"});


module.exports = async function onGuildMemberRemove(member) {
  const channel = process.env.GREETCHANNEL && member.guild.channels.get(process.env.GREETCHANNEL)
  if (!channel) return;
  let count = member.guild.memberCount.toString(); 
  let category = member.guild.channels.find(chan => chan.name === "Contador de Membros")
  if (!category) category = await member.guild.createChannel('Contador de Membros','category')
  let channelMember = await member.guild.channels.find(chan => chan.parentID === category.id)
  if (!channelMember){
    channelMember = member.guild.createChannel(`${count} Membros`, 'voice').then(async chan => {
      await chan.setParent(category.id)
      await chan.overwritePermissions(member.guild.roles.find('name', '@everyone'),{
        'CONNECT': false
      })
    }).catch(console.error);
  }else{
    channelMember.setName(`${count} Membros`)
  }
  mapping.forEach(r => count = count.replace(r.regex, r.replacement));
  channel.setTopic(`Temos ${count} membros no servidor!`); 
}

