const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const colours = require("./colours.json");

const bot = new Discord.Client({disableEveryone: true});


bot.on("ready", async () => {
    console.log(`${bot.user.username} is online`)
    bot.user.setActivity("People die in the furnace", {url:"https://www.twitch.tv/yoda", type:"WATCHING"});
})

bot.on("message", async message => {
    if (message.author.bot || message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if (cmd === `${prefix}hello`) {
        return message.channel.send("Hello")
    }

    if (cmd === `${prefix}serverinfo`) {
        let sEmbed = new Discord.RichEmbed()
            .setColor(colours.cyan)
            .setTitle("Server Info")
            .setThumbnail(message.guild.iconURL)
            .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
            .addField("**Guild Name:**", `${message.guild.name}`)
            .addField("**Guild Owner:**", `${message.guild.owner}`)
            .addField("**Member Count:**", `\n${message.guild.memberCount}`, true)
            .addField("**Role Count:**", `${message.guild.roles.size}`, true)
            .addField("**Region**", `${message.guild.region}`)
            .setFooter(`SupremeBot | Supremacy`, bot.user.displayAvatarURL, );
        message.channel.send({embed: sEmbed});
    }

    if (cmd === `${prefix}userinfo`) {
        let uEmbed = new Discord.RichEmbed()
            .setColor(colours.red_light)
            .setTitle("User Info")
            .setThumbnail(message.author.displayAvatarURL)
            .setAuthor(`${message.author.username} Info`, message.author.displayAvatarURL)
            .addField("**Username:**", `${message.author.username}`, true)
            .addField("**Discriminator:**", `#${message.author.discriminator}`, true)
            .addField("**ID:**", `${message.author.id}`)
            .addField("**Status:**", `${message.author.presence.status}`, true)
            .addField("**In game**", `${message.author.presence.game}`, true)
            .addField("**Created At:**", `${message.author.createdAt}`)
            .setFooter(`SupremeBot | Supremacy`, bot.user.displayAvatarURL, );
        message.channel.send({embed: uEmbed});

    }

})

bot.login(botconfig.token);