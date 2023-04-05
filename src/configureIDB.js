// Configures the indexed database when the aplication is rendered

export const IDB_DATABASES = {
  Podcasts: {
    name: 'Podcasts',
    version: 1,
    keyPath: 'podcastId',
    upgradeFn: function (event) {
      const database = event.target.result;

      const podcastsStore = database.createObjectStore(this.name, {
        keyPath: this.keyPath
      });

      podcastsStore.createIndex('podcastName', 'podcastName', {
        unique: false
      });
      podcastsStore.createIndex('podcastImage', 'podcastImage', {
        unique: false
      });
      podcastsStore.createIndex('podcastAuthor', 'podcastAuthor', {
        unique: false
      });
      podcastsStore.createIndex('podcastSummary', 'podcastSummary', {
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
