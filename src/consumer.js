require('dotenv').config();
const amqp = require('amqplib');
const PlaylistsSongsService = require('./PlaylistsSongsService');
const MailSender = require('./MailSender');
const Listener = require('./Listener');

const init = async () => {
  const playlistsSongsService = new PlaylistsSongsService();
  const mailSender = new MailSender();
  const listener = new Listener(playlistsSongsService, mailSender);

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  await channel.assertQueue('export:playlistSongs', {
    durable: true,
  });

  channel.consume('export:playlistSongs', listener.listen, { noAck: true });
};

init();
