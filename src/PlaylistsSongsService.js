const { Pool } = require('pg');

class PlaylistsSongsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistById(playlistId) {
    const query = {
      text: 'SELECT id, name FROM playlists WHERE id = $1',
      values: [playlistId],
    };

    const { rows } = await this._pool.query(query);
    return rows[0];
  }

  async getSongsFromPlaylist(playlistId) {
    const query = {
      text: `SELECT songs.id, songs.title, songs.performer
        FROM playlist_songs AS pls
        JOIN songs ON songs.id = pls.song_id
        WHERE pls.playlist_id = $1`,
      values: [playlistId],
    };

    const { rows } = await this._pool.query(query);
    return rows;
  }
}

module.exports = PlaylistsSongsService;
