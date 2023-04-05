/**
 * Abstract class to handle client data persistance
 */
export class PersistClass {
  constructor() {}

  async getData() {
    throw new Error('getData method should be implemented');
  }

  async getDataById(_id) {
    throw new Error('getDataById method should be implemented');
  }

  async saveData(_dataList) {
    throw new Error('saveData method should be implemented');
  }

  async saveDataById(_id, _data) {
    throw new Error('saveDataById method should be implemented');
  }
}
