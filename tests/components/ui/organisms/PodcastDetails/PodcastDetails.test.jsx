import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import PodcastDetails from '../../../../../src/components/ui/organisms/PodcastDetails';
import {
  EPISODEID_PARAM,
  PODCASTID_PARAM,
  PODCAST_EPISODE_PAGE_ROUTER_PATH
} from '../../../../../src/constants';

describe('Podcast Details component', () => {
  const DEFAULT_PODCAST_DETAILS_TESTID = 'podcastDetails';
  const DEFAULT_PODCAST_SIDEBAR_TESTID = 'podcastSideBar';
  const DEFAULT_PODCAST_EPISODE_COUNT_TESTID = 'podcastEpisodeCount';
  const DEFAULT_PODCAST_EPISODE_TABLE_TESTID = 'podcastEpisodeTable';

  const TEST_PODCAST_ID = 'Podcast01';
  const TEST_EPISODE_ID = 'Episode01';
  const TEST_PODCAST_INFO = {
    podcastId: TEST_PODCAST_ID,
    podcastName: 'Podcast 01',
    podcastImage: 'PodcastImageURL',
    podcastAuthor: 'Author 01',
    podcastSummary: 'This is is the summary of the Podcast 01'
  };
  const TEST_EPISODE_INFO = {
    episodeId: TEST_EPISODE_ID,
    podcastId: TEST_PODCAST_ID,
    episodeTitle: 'Episode 01',
    episodeDate: '01/01/2023',
    episodeDuration: '03:30'
  };

  vi.mock('react-router-dom', () => ({
    ...vi.importActual('react-router-dom'),
    useNavigate: () => vi.fn()
  }));

  it('should render without crash', async () => {
    const reactRouterDOM = await import('react-router-dom');
    const mockNavigate = vi.fn();
    vi.spyOn(reactRouterDOM, 'useNavigate').mockImplementation(
      () => mockNavigate
    );

    render(
      <PodcastDetails
        podcastInfo={TEST_PODCAST_INFO}
        episodes={[TEST_EPISODE_INFO]}
      />
    );

    expect(screen.getByTestId(DEFAULT_PODCAST_DETAILS_TESTID)).toBeVisible();
    expect(screen.getByTestId(DEFAULT_PODCAST_SIDEBAR_TESTID)).toBeVisible();
    expect(
      screen.getByTestId(DEFAULT_PODCAST_EPISODE_COUNT_TESTID)
    ).toBeVisible();
    expect(
      screen.getByTestId(DEFAULT_PODCAST_EPISODE_TABLE_TESTID)
    ).toBeVisible();

    const rowColumns = screen.getAllByRole('cell');

    fireEvent.click(rowColumns[0]);

    const expectedURL = PODCAST_EPISODE_PAGE_ROUTER_PATH.replace(
      PODCASTID_PARAM,
      TEST_PODCAST_ID
    ).replace(EPISODEID_PARAM, TEST_EPISODE_ID);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(expectedURL, {
      state: { episodeInfo: TEST_EPISODE_INFO, podcastInfo: TEST_PODCAST_INFO }
    });
  });
});
