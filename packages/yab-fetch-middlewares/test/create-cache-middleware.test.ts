import 'fake-indexeddb/auto';
import createIDBStore, { IDBCacheStorage } from '../src/cache/idb';
import { promisifyRequest } from '../src/cache/utils';

describe('IDB Store', () => {
  let idbStore: IDBCacheStorage;

  beforeEach(() => {
    idbStore = createIDBStore();
  });

  afterEach(() => {
    idbStore.request.result.close();
  });

  test('init IDB correctly', async () => {
    await idbStore.init();
    const db = idbStore.request.result;

    expect(db.name).toBe('YabDB');
    expect(db.objectStoreNames.contains('IDBCache')).toBeTruthy();
  });

  test('set data correctly', async () => {
    const url = '/github';
    const data = { id: 1, username: 'yabfetch' };
    await idbStore.set(url, data);

    const getRequest = idbStore.request.result
      .transaction('IDBCache')
      .objectStore('IDBCache')
      .get('/github');
    const result = await promisifyRequest(getRequest);

    expect(result).toMatchObject({ url, data });
  });

  test('get data correctly', async () => {
    const url = '/github';
    const data = { id: 2, username: 'yabfetch' };
    await idbStore.set(url, data);
    const result = await idbStore.get(url);

    expect(result).toMatchObject({ url, data });
  });
});
