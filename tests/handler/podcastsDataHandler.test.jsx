import { describe, expect, it, vi } from 'vitest';

import { podcastsDataHandler } from '../../src/handler/podcastsDataHandler';

describe('podcastsDataHandler function', () => {
  const mockSetPodcasts = vi.fn();
  const mockSetIsLoading = vi.fn();

  const getAllDynamicImports = async () => {
    const persistedPodcastsMocked = await import(
      '../../src/persistance/podcasts/PodcastsPersistedData'
    );
    const utilMocked = await import('../../src/persistance/util');
    const fetchedPodcastsMocked = await import(
      '../../src/fetching/fetchPodcasts'
    );

    return {
      persistedPodcastsMocked,
      utilMocked,
      fetchedPodcastsMocked
    };
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mock('../../src/persistance/podcasts/PodcastsPersistedData', () => {
      return {
        persistAllPodcasts: vi.fn(),
        getAllPersistedPodcasts: vi.fn()
      };
    });
    vi.mock('../../src/persistance/util', () => {
      return {
        saveItemTimestamp: vi.fn(),
        loadItemTimestamp: vi.fn()
      };
    });
    vi.mock('../../src/fetching/fetchPodcasts', () => {
      return {
        fetchPodcasts: vi.fn()
      };
    });
  });

  it('should fetch podcasts as there is no previous podcast fetching', async () => {
    const FETCHED_PODCASTS = [{ podcastId: '1', podcastName: 'Podcast 01' }];

    const { persistedPodcastsMocked, utilMocked, fetchedPodcastsMocked } =
      await getAllDynamicImports();

    const loadItemTimestampMocked = vi
      .spyOn(utilMocked, 'loadItemTimestamp')
      .mockReturnValue();
    const saveItemTimestampMocked = vi
      .spyOn(utilMocked, 'saveItemTimestamp')
      .mockReturnValue();
    const fetchPodcastsMocked = vi
      .spyOn(fetchedPodcastsMocked, 'fetchPodcasts')
      .mockResolvedValue(FETCHED_PODCASTS);
    const persistAllPodcastsMocked = vi
      .spyOn(persistedPodcastsMocked, 'persistAllPodcasts')
      .mockResolvedValue({});

    await podcastsDataHandler(mockSetPodcasts, mockSetIsLoading);

    expect(loadItemTimestampMocked).toHaveBeenCalledTimes(1);
    expect(fetchPodcastsMocked).toHaveBeenCalledTimes(1);
    expect(persistAllPodcastsMocked).toHaveBeenCalledTimes(1);
    expect(persistAllPodcastsMocked).toHaveBeenCalledWith(FETCHED_PODCASTS);
    expect(saveItemTimestampMocked).toHaveBeenCalledTimes(1);

    expect(mockSetPodcasts).toHaveBeenCalledTimes(1);
    expect(mockSetPodcasts).toHaveBeenCalledWith(FETCHED_PODCASTS);
    expect(mockSetIsLoading).toHaveBeenCalledTimes(2);
  });

  it('should fetch podcasts as there last fetch data happened two days ago', async () => {
    const TWO_DAYS_IN_MS = 172800000;
    const FETCHED_PODCASTS = [{ podcastId: '1', podcastName: 'Podcast 01' }];

    const { persistedPodcastsMocked, utilMocked, fetchedPodcastsMocked } =
      await getAllDynamicImports();

    const currentDateTime = new Date().getTime();
    const loadItemTimestampMocked = vi
      .spyOn(utilMocked, 'loadItemTimestamp')
      .mockReturnValue(currentDateTime - TWO_DAYS_IN_MS);
    const saveItemTimestampMocked = vi
      .spyOn(utilMocked, 'saveItemTimestamp')
      .mockReturnValue();
    const fetchPodcastsMocked = vi
      .spyOn(fetchedPodcastsMocked, 'fetchPodcasts')
      .mockResolvedValue(FETCHED_PODCASTS);
    const persistAllPodcastsMocked = vi
      .spyOn(persistedPodcastsMocked, 'persistAllPodcasts')
      .mockResolvedValue({});

    await podcastsDataHandler(mockSetPodcasts, mockSetIsLoading);

    expect(loadItemTimestampMocked).toHaveBeenCalledTimes(1);
    expect(fetchPodcastsMocked).toHaveBeenCalledTimes(1);
    expect(persistAllPodcastsMocked).toHaveBeenCalledTimes(1);
    expect(persistAllPodcastsMocked).toHaveBeenCalledWith(FETCHED_PODCASTS);
    expect(saveItemTimestampMocked).toHaveBeenCalledTimes(1);

    expect(mockSetPodcasts).toHaveBeenCalledTimes(1);
    expect(mockSetPodcasts).toHaveBeenCalledWith(FETCHED_PODCASTS);
    expect(mockSetIsLoading).toHaveBeenCalledTimes(2);
  });

  it('should neither set nor persist data as there was no data in fetching', async () => {
    const { persistedPodcastsMocked, utilMocked, fetchedPodcastsMocked } =
      await getAllDynamicImports();

    const loadItemTimestampMocked = vi
      .spyOn(utilMocked, 'loadItemTimestamp')
      .mockReturnValue();
    const saveItemTimestampMocked = vi
      .spyOn(utilMocked, 'saveItemTimestamp')
      .mockReturnValue();
    const fetchPodcastsMocked = vi
      .spyOn(fetchedPodcastsMocked, 'fetchPodcasts')
      .mockResolvedValue([]);
    const persistAllPodcastsMocked = vi
      .spyOn(persistedPodcastsMocked, 'persistAllPodcasts')
      .mockResolvedValue({});

    await podcastsDataHandler(mockSetPodcasts, mockSetIsLoading);

    expect(loadItemTimestampMocked).toHaveBeenCalledTimes(1);
    expect(fetchPodcastsMocked).toHaveBeenCalledTimes(1);
    expect(persistAllPodcastsMocked).toHaveBeenCalledTimes(0);
    expect(saveItemTimestampMocked).toHaveBeenCalledTimes(0);

    expect(mockSetPodcasts).toHaveBeenCalledTimes(0);
    expect(mockSetIsLoading).toHaveBeenCalledTimes(2);
  });

  it('should not set last podcast fetch date as there was an error persisting data', async () => {
    const FETCHED_PODCASTS = [{ podcastId: '1', podcastName: 'Podcast 01' }];

    const { persistedPodcastsMocked, utilMocked, fetchedPodcastsMocked } =
      await getAllDynamicImports();

    const loadItemTimestampMocked = vi
      .spyOn(utilMocked, 'loadItemTimestamp')
      .mockReturnValue(0);
    const saveItemTimestampMocked = vi
      .spyOn(utilMocked, 'saveItemTimestamp')
      .mockReturnValue();
    const fetchPodcastsMocked = vi
      .spyOn(fetchedPodcastsMocked, 'fetchPodcasts')
      .mockResolvedValue(FETCHED_PODCASTS);
    const persistAllPodcastsMocked = vi
      .spyOn(persistedPodcastsMocked, 'persistAllPodcasts')
      .mockResolvedValue({ error: 'Error persisting data' });

    await podcastsDataHandler(mockSetPodcasts, mockSetIsLoading);

    expect(loadItemTimestampMocked).toHaveBeenCalledTimes(1);
    expect(fetchPodcastsMocked).toHaveBeenCalledTimes(1);
    expect(persistAllPodcastsMocked).toHaveBeenCalledTimes(1);
    expect(persistAllPodcastsMocked).toHaveBeenCalledWith(FETCHED_PODCASTS);
    expect(saveItemTimestampMocked).toHaveBeenCalledTimes(0);

    expect(mockSetPodcasts).toHaveBeenCalledTimes(1);
    expect(mockSetPodcasts).toHaveBeenCalledWith(FETCHED_PODCASTS);
    expect(mockSetIsLoading).toHaveBeenCalledTimes(2);
  });

  it('should get data persisted as last fetch happened less than one day', async () => {
    const ONE_HOUR_IN_MS = 3600000;
    const PERSISTED_PODCASTS = [{ podcastId: '3', podcastName: 'Podcast 03' }];

    const currentdateTime = new Date().getTime();

    const { persistedPodcastsMocked, utilMocked } =
      await getAllDynamicImports();

    const loadItemTimestampMocked = vi
      .spyOn(utilMocked, 'loadItemTimestamp')
      .mockReturnValue(currentdateTime - ONE_HOUR_IN_MS);
    const getAllPersistedPodcastsMocked = vi
      .spyOn(persistedPodcastsMocked, 'getAllPersistedPodcasts')
      .mockResolvedValue(PERSISTED_PODCASTS);

    await podcastsDataHandler(mockSetPodcasts, mockSetIsLoading);

    expect(loadItemTimestampMocked).toHaveBeenCalledTimes(1);
    expect(getAllPersistedPodcastsMocked).toHaveBeenCalledTimes(1);

    expect(mockSetPodcasts).toHaveBeenCalledTimes(1);
    expect(mockSetPodcasts).toHaveBeenCalledWith(PERSISTED_PODCASTS);
    expect(mockSetIsLoading).toHaveBeenCalledTimes(2);
  });
});
