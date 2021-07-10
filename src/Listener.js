/* eslint-disable no-console */
class Listener {
  constructor(playlistsSongsService, mailSender) {
    this._playlistsSongsService = playlistsSongsService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());

      console.log('Getting playlist songs from database ...');
      const playlistSongs = await this._playlistsSongsService.getSongsFromPlaylist(
        playlistId,
      );

      console.log('Sending Email ...');
      const result = await this._mailSender.sendEmail(
        targetEmail,
        JSON.stringify(playlistSongs),
      );

      console.log('Email successfully sent to:', result.accepted[0]);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
