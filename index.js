const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('Escanea el código QR con tu aplicación de WhatsApp.');
});

client.on('authenticated', () => {
    console.log('Autenticado con éxito.');
});

client.on('ready', () => {
    console.log('El cliente está listo.');
});

client.on('message', message => {
    if (message.body.toLowerCase() === 'hola') {
        message.reply('Hola, soy un bot de WhatsApp.');
    }
});

client.initialize();

