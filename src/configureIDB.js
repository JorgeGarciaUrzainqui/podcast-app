// Configures the indexed database when the aplication is rendered

export const IDB_DATABASES = {
  Podcasts: {
    name: 'Podcasts',
    version: 1,
    keyPath: 'podcastId',
    upgradeFn: function (event) {
      const database = event.target.result;

      database.createObjectStore(this.name, {
        keyPath: this.keyPath
      });
    }
  },
  Episodes: {
    name: 'Episodes',
    version: 1,
    keyPath: 'episodeId',
    podcastIndex: 'podcastId',
    upgradeFn: function (event) {
      const database = event.target.result;

      const podcastsStore = database.createObjectStore(this.name, {
        keyPath: this.keyPath
      });

      podcastsStore.createIndex(this.podcastIndex, this.podcastIndex, {
        unique: false
      });
    }
  }
};

Object.values(IDB_DATABASES).map(function (value) {
  const { name, version, upgradeFn } = value;
  const indexedDatabase = indexedDB.open(name, version);

  indexedDatabase.onupgradeneeded = upgradeFn.bind(value);
});
