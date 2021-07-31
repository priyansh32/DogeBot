const dotenv = require('dotenv');
dotenv.config();

const eris = require('eris');
const bot = new eris.Client(process.env.MeraBot_TOKEN);

const axios = require('axios');

bot.on('ready', () => {
    console.log('Doge is ready!');
});
bot.on('messageCreate', async (msg) => {
    const botWasMentioned = msg.mentions.find(
        mentionedUser => mentionedUser.id === bot.user.id,
    );

    if (botWasMentioned) {
        try {
            await msg.channel.createMessage(
                `Doge is here!`,
            );
            let dogeimage = await axios.get('https://dog.ceo/api/breeds/image/random');
            await msg.channel.createMessage(dogeimage.data.message);

        } catch (err) {
            console.warn('Failed to respond to mention.');
            console.warn(err);
        }
    }
});

bot.on('error', err => {
    console.warn(err);
});

bot.connect();
