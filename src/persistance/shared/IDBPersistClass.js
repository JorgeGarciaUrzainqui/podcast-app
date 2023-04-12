import { PersistClass } from './PersistClass';

/**
 * IndexedDB class to handle client data persistance
 */
export class IDBPersistClass extends PersistClass {
  constructor(databaseName, databaseVersion, keyPath) {
    super();
    this.databaseVersion = databaseVersion;
    this.databaseName = databaseName;
    this.keyPath = keyPath;
  }

  async openDatabase() {
    return new Promise((resolve) => {
      const request = indexedDB.open(this.databaseName, this.databaseVersion);

      request.onsuccess = function (event) {
        const db = event.target.result;
        resolve(db);
      };

      request.onerror = function (_event) {
        console.error(`Unable to open IDB ${this.databaseName}`);
        resolve();
      };
    });
  }

  async getData() {
    const db = await this.openDatabase();

    return new Promise((resolve) => {
      const request = db
        .transaction([this.databaseName])
        .objectStore(this.databaseName)
        .getAll();

      request.onsuccess = (event) => {
        const dataList = event.target.result;

        if (!dataList) {
          resolve([]);
          return;
        }

        resolve(dataList);
      };

      request.onerror = (event) => {
        console.error(`Database error ${event.target.errorCode}`);
        resolve([]);
      };
    });
  }

  async getDataById(id) {
    const db = await this.openDatabase();

    return new Promise((resolve) => {
      const request = db
        .transaction([this.databaseName])
        .objectStore(this.databaseName)
        .get(id);

      request.onsuccess = (event) => {
        const data = event.target.result;

        if (!data) {
          resolve({});
          return;
        }

        resolve(data);
      };

      request.onerror = (event) => {
        console.error(`Database error ${event.target.errorCode}`);
        resolve({});
      };
    });
  }

  async getDataByProperty(property, propertyValue) {
    const db = await this.openDatabase();

    return new Promise((resolve) => {
      const request = db
        .transaction([this.databaseName])
        .objectStore(this.databaseName)
        .index(property)
        .getAll(IDBKeyRange.only(propertyValue));

      request.onsuccess = (event) => {
        const dataList = event.target.result;

        if (!dataList) {
          resolve([]);
          return;
        }

        resolve(dataList);
      };

      request.onerror = (event) => {
        console.error(`Database error ${event.target.errorCode}`);
        resolve([]);
      };
    });
  }

  async saveData(dataList) {
    const persistDataPromises = dataList.map(async function (data) {
      return this.saveDataById(data[this.keyPath], data);
    }, this);

    const persistDataResult = await Promise.all(persistDataPromises);

    return persistDataResult.some((persistData) => persistData.hasFailed)
      ? { error: 'Error saving some data' }
      : {};
  }

  async saveDataById(id, data) {
    const existingData = await this.getDataById(id);

    if (!existingData || Object.keys(existingData).length === 0) {
      return this.addData(data);
    }

    return this.updateData(existingData, data);
  }

  async addData(data) {
    const db = await this.openDatabase();

    return new Promise((resolve) => {
      const request = db
        .transaction([this.databaseName], 'readwrite')
        .objectStore(this.databaseName)
        .add(data);

      request.onsuccess = () => resolve({});
      request.onerror = () => resolve({ hasFailed: true });
    });
  }

  async updateData(data) {
    const db = await this.openDatabase();

    return new Promise((resolve) => {
      const request = db
        .transaction([this.databaseName], 'readwrite')
        .objectStore(this.databaseName)
        .put(data);

      request.onsuccess = () => resolve({});
      request.onerror = () => resolve({ hasFailed: true });
    });
  }
}
