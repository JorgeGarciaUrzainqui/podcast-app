import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import PodcastEpisode from '../../../../../src/components/ui/organisms/PodcastEpisode';
import {
  PODCASTID_PARAM,
  PODCAST_DETAIL_PAGE_ROUTER_PATH
} from '../../../../../src/constants';

describe('Podcast Episode component', () => {
  vi.mock('react-router-dom', () => ({
    ...vi.importActual('react-router-dom'),
    useNavigate: () => vi.fn()
  }));

  const DEFAULT_PODCAST_EPISODE_TESTID = 'podcastEpisode';
  const DEFAULT_PODCAST_SIDEBAR_TESTID = 'podcastSideBar';
  const DEFAULT_PODCAST_SIDEBAR_INFO_TESTID = `${DEFAULT_PODCAST_SIDEBAR_TESTID}-podcastInfo`;
  const DEFAULT_EPISODE_PLAYER_TESTID = 'episodePlayer';

  it('should render without crash', async () => {
    const reactRouterDOM = await import('react-router-dom');

    const mockNavigate = vi.fn();
    vi.spyOn(reactRouterDOM, 'useNavigate').mockImplementation(
      () => mockNavigate
    );
    const podcastId = 'Podcast01';

    const podcastInfo = {
      podcastId,
      podcastName: 'PodCast 01',
      podcastImage: 'PodCastImage',
      podcastAuthor: 'Author 01',
      podcastSummary: 'This is the summary of the podcast'
    };
    const episodeInfo = {
      episodeId: 'Episode01',
      podcastId,
      episodeTitle: 'Episode 01',
      episodeDescription: 'This is the description of the episode',
      episodeUrl: 'Episode01'
    };

    render(
      <PodcastEpisode
        podcastId={podcastId}
        podcastInfo={podcastInfo}
        episodeInfo={episodeInfo}
      />
    );

    expect(screen.getByTestId(DEFAULT_PODCAST_EPISODE_TESTID)).toBeVisible();
    expect(screen.getByTestId(DEFAULT_PODCAST_SIDEBAR_TESTID)).toBeVisible();
    expect(screen.getByTestId(DEFAULT_EPISODE_PLAYER_TESTID)).toBeVisible();

    fireEvent.click(screen.getByTestId(DEFAULT_PODCAST_SIDEBAR_INFO_TESTID));

    const expectedURL = PODCAST_DETAIL_PAGE_ROUTER_PATH.replace(
      PODCASTID_PARAM,
      podcastId
    );
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(expectedURL, {
      state: { podcastInfo }
    });
  });
});
