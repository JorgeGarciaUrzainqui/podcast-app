import { describe, expect, it, vi } from 'vitest';

import { episodesDataHandler } from '../../src/handler/episodesDataHandler';

describe('episodesDataHandler function', () => {
  const mockSetEpisodes = vi.fn();
  const mockSetIsLoading = vi.fn();

  const getAllDynamicImports = async () => {
    const persistedEpisodesMocked = await import(
      '../../src/persistance/episodes/EpisodesPersistedData'
    );
    const utilMocked = await import('../../src/persistance/util');
    const fetchedEpisodesMocked = await import(
      '../../src/fetching/fetchEpisodes'
    );

    return {
      persistedEpisodesMocked,
      utilMocked,
      fetchedEpisodesMocked
    };
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mock('../../src/persistance/episodes/EpisodesPersistedData', () => {
      return {
        persistAllEpisodes: vi.fn(),
        getAllPersistedEpisodesForPodcast: vi.fn()
      };
    });
    vi.mock('../../src/persistance/util', () => {
      return {
        saveItemTimestamp: vi.fn(),
        loadItemTimestamp: vi.fn()
      };
    });
    vi.mock('../../src/fetching/fetchEpisodes', () => {
      return {
        fetchEpisodesForPodcast: vi.fn()
      };
    });
  });

  it('should fetch episodes as there is no previous episode fetching', async () => {
    const PODCAST_ID = 'Podcast01';
    const FETCHED_EPISODES = [
      {
        episodeId: 'Episode01',
        podcastId: PODCAST_ID,
        episodeTitle: 'Episode 01'
      }
    ];

    const { persistedEpisodesMocked, utilMocked, fetchedEpisodesMocked } =
      await getAllDynamicImports();

    const loadItemTimestampMocked = vi
      .spyOn(utilMocked, 'loadItemTimestamp')
      .mockReturnValue();
    const saveItemTimestampMocked = vi
      .spyOn(utilMocked, 'saveItemTimestamp')
      .mockReturnValue();
    const fetchEpisodesForPodcastMocked = vi
      .spyOn(fetchedEpisodesMocked, 'fetchEpisodesForPodcast')
      .mockResolvedValue(FETCHED_EPISODES);
    const persistAllEpisodesMocked = vi
      .spyOn(persistedEpisodesMocked, 'persistAllEpisodes')
      .mockResolvedValue({});

    await episodesDataHandler(PODCAST_ID, mockSetEpisodes, mockSetIsLoading);

    expect(loadItemTimestampMocked).toHaveBeenCalledTimes(1);
    expect(fetchEpisodesForPodcastMocked).toHaveBeenCalledTimes(1);
    expect(persistAllEpisodesMocked).toHaveBeenCalledTimes(1);
    expect(persistAllEpisodesMocked).toHaveBeenCalledWith(FETCHED_EPISODES);
    expect(saveItemTimestampMocked).toHaveBeenCalledTimes(1);

    expect(mockSetEpisodes).toHaveBeenCalledTimes(1);
    expect(mockSetEpisodes).toHaveBeenCalledWith(FETCHED_EPISODES);
    expect(mockSetIsLoading).toHaveBeenCalledTimes(2);
  });

  it('should fetch episodes as there last fetch data happened two days ago', async () => {
    const TWO_DAYS_IN_MS = 172800000;
    const PODCAST_ID = 'Podcast01';
    const FETCHED_EPISODES = [
      {
        episodeId: 'Episode01',
        podcastId: PODCAST_ID,
        episodeTitle: 'Episode 01'
      }
    ];

    const { persistedEpisodesMocked, utilMocked, fetchedEpisodesMocked } =
      await getAllDynamicImports();

    const currentDateTime = new Date().getTime();
    const loadItemTimestampMocked = vi
      .spyOn(utilMocked, 'loadItemTimestamp')
      .mockReturnValue(currentDateTime - TWO_DAYS_IN_MS);
    const saveItemTimestampMocked = vi
      .spyOn(utilMocked, 'saveItemTimestamp')
      .mockReturnValue();
    const fetchEpisodesForPodcastMocked = vi
      .spyOn(fetchedEpisodesMocked, 'fetchEpisodesForPodcast')
      .mockResolvedValue(FETCHED_EPISODES);
    const persistAllEpisodesMocked = vi
      .spyOn(persistedEpisodesMocked, 'persistAllEpisodes')
      .mockResolvedValue({});

    await episodesDataHandler(PODCAST_ID, mockSetEpisodes, mockSetIsLoading);

    expect(loadItemTimestampMocked).toHaveBeenCalledTimes(1);
    expect(fetchEpisodesForPodcastMocked).toHaveBeenCalledTimes(1);
    expect(persistAllEpisodesMocked).toHaveBeenCalledTimes(1);
    expect(persistAllEpisodesMocked).toHaveBeenCalledWith(FETCHED_EPISODES);
    expect(saveItemTimestampMocked).toHaveBeenCalledTimes(1);

    expect(mockSetEpisodes).toHaveBeenCalledTimes(1);
    expect(mockSetEpisodes).toHaveBeenCalledWith(FETCHED_EPISODES);
    expect(mockSetIsLoading).toHaveBeenCalledTimes(2);
  });

  it('should neither set nor persist data as there was no data in fetching', async () => {
    const PODCAST_ID = 'Podcast01';

    const { persistedEpisodesMocked, utilMocked, fetchedEpisodesMocked } =
      await getAllDynamicImports();

    const loadItemTimestampMocked = vi
      .spyOn(utilMocked, 'loadItemTimestamp')
      .mockReturnValue();
    const saveItemTimestampMocked = vi
      .spyOn(utilMocked, 'saveItemTimestamp')
      .mockReturnValue();
    const fetchEpisodesForPodcastMocked = vi
      .spyOn(fetchedEpisodesMocked, 'fetchEpisodesForPodcast')
      .mockResolvedValue([]);
    const persistAllEpisodesMocked = vi
      .spyOn(persistedEpisodesMocked, 'persistAllEpisodes')
      .mockResolvedValue({});

    await episodesDataHandler(PODCAST_ID, mockSetEpisodes, mockSetIsLoading);

    expect(loadItemTimestampMocked).toHaveBeenCalledTimes(1);
    expect(fetchEpisodesForPodcastMocked).toHaveBeenCalledTimes(1);
    expect(persistAllEpisodesMocked).toHaveBeenCalledTimes(0);
    expect(saveItemTimestampMocked).toHaveBeenCalledTimes(0);

    expect(mockSetEpisodes).toHaveBeenCalledTimes(0);
    expect(mockSetIsLoading).toHaveBeenCalledTimes(2);
  });

  it('should do nothing if no podcastId is passed', async () => {
    const { persistedEpisodesMocked, utilMocked, fetchedEpisodesMocked } =
      await getAllDynamicImports();

    const loadItemTimestampMocked = vi
      .spyOn(utilMocked, 'loadItemTimestamp')
      .mockReturnValue();
    const saveItemTimestampMocked = vi
      .spyOn(utilMocked, 'saveItemTimestamp')
      .mockReturnValue();
    const fetchEpisodesForPodcastMocked = vi
      .spyOn(fetchedEpisodesMocked, 'fetchEpisodesForPodcast')
      .mockResolvedValue([]);
    const persistAllEpisodesMocked = vi
      .spyOn(persistedEpisodesMocked, 'persistAllEpisodes')
      .mockResolvedValue({});

    await episodesDataHandler(undefined, mockSetEpisodes, mockSetIsLoading);

    expect(loadItemTimestampMocked).toHaveBeenCalledTimes(0);
    expect(fetchEpisodesForPodcastMocked).toHaveBeenCalledTimes(0);
    expect(persistAllEpisodesMocked).toHaveBeenCalledTimes(0);
    expect(saveItemTimestampMocked).toHaveBeenCalledTimes(0);

    expect(mockSetEpisodes).toHaveBeenCalledTimes(0);
    expect(mockSetIsLoading).toHaveBeenCalledTimes(0);
  });

  it('should not set last episode fetch date as there was an error persisting data', async () => {
    const PODCAST_ID = 'Podcast01';
    const FETCHED_EPISODES = [
      {
        episodeId: 'Episode01',
        podcastId: PODCAST_ID,
        episodeTitle: 'Episode 01'
      }
    ];

    const { persistedEpisodesMocked, utilMocked, fetchedEpisodesMocked } =
      await getAllDynamicImports();

    const loadItemTimestampMocked = vi
      .spyOn(utilMocked, 'loadItemTimestamp')
      .mockReturnValue(0);
    const saveItemTimestampMocked = vi
      .spyOn(utilMocked, 'saveItemTimestamp')
      .mockReturnValue();
    const fetchEpisodesForPodcastMocked = vi
      .spyOn(fetchedEpisodesMocked, 'fetchEpisodesForPodcast')
      .mockResolvedValue(FETCHED_EPISODES);
    const persistAllEpisodesMocked = vi
      .spyOn(persistedEpisodesMocked, 'persistAllEpisodes')
      .mockResolvedValue({ error: 'Error persisting data' });

    await episodesDataHandler(PODCAST_ID, mockSetEpisodes, mockSetIsLoading);

    expect(loadItemTimestampMocked).toHaveBeenCalledTimes(1);
    expect(fetchEpisodesForPodcastMocked).toHaveBeenCalledTimes(1);
    expect(persistAllEpisodesMocked).toHaveBeenCalledTimes(1);
    expect(persistAllEpisodesMocked).toHaveBeenCalledWith(FETCHED_EPISODES);
    expect(saveItemTimestampMocked).toHaveBeenCalledTimes(0);

    expect(mockSetEpisodes).toHaveBeenCalledTimes(1);
    expect(mockSetEpisodes).toHaveBeenCalledWith(FETCHED_EPISODES);
    expect(mockSetIsLoading).toHaveBeenCalledTimes(2);
  });

  it('should get data persisted as last fetch happened less than one day', async () => {
    const ONE_HOUR_IN_MS = 3600000;
    const PODCAST_ID = 'Podcast03';
    const PERSISTED_EPISODES = [
      {
        episodeId: 'Episode02',
        podcastId: PODCAST_ID,
        episodeTitle: 'Episode 02'
      }
    ];

    const currentdateTime = new Date().getTime();

    const { persistedEpisodesMocked, utilMocked } =
      await getAllDynamicImports();

    const loadItemTimestampMocked = vi
      .spyOn(utilMocked, 'loadItemTimestamp')
      .mockReturnValue(currentdateTime - ONE_HOUR_IN_MS);
    const getAllPersistedEpisodesForPodcastMocked = vi
      .spyOn(persistedEpisodesMocked, 'getAllPersistedEpisodesForPodcast')
      .mockResolvedValue(PERSISTED_EPISODES);

    await episodesDataHandler(PODCAST_ID, mockSetEpisodes, mockSetIsLoading);

    expect(loadItemTimestampMocked).toHaveBeenCalledTimes(1);
    expect(getAllPersistedEpisodesForPodcastMocked).toHaveBeenCalledTimes(1);

    expect(mockSetEpisodes).toHaveBeenCalledTimes(1);
    expect(mockSetEpisodes).toHaveBeenCalledWith(PERSISTED_EPISODES);
    expect(mockSetIsLoading).toHaveBeenCalledTimes(2);
  });
});
