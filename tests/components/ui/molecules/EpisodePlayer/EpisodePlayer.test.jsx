import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { EPISODE_AUDIO_FALLBACK_MSG } from '../../../../../src/constants';
import EpisodePlayer from '../../../../../src/components/ui/molecules/EpisodePlayer';

describe('Episode Player component', () => {
  const TEST_EPISODE_INFO = {
    episodeTitle: 'Episode Title',
    episodeDescription: 'Episode Description',
    episodeUrl: 'EpisodeURL'
  };

  const DEFAULT_EPISODEPLAYER_TESTID = 'episodePlayer';
  const DEFAULT_EPISODEPLAYER_DESCRIPTION_TESTID = `${DEFAULT_EPISODEPLAYER_TESTID}-description-paragraph`;
  const DEFAULT_EPISODEPLAYER_TITLE_TESTID = `${DEFAULT_EPISODEPLAYER_TESTID}-title`;
  const DEFAULT_EPISODEPLAYER_PLAYER_TESTID = `${DEFAULT_EPISODEPLAYER_TESTID}-player`;

  it('should render nothing if episodeInfo is not present', () => {
    render(<EpisodePlayer />);

    expect(
      screen.queryByTestId(DEFAULT_EPISODEPLAYER_TESTID)
    ).not.toBeInTheDocument();
  });

  it('should render without crash with episodeInfo props', () => {
    render(<EpisodePlayer episodeInfo={TEST_EPISODE_INFO} />);

    expect(screen.getByTestId(DEFAULT_EPISODEPLAYER_TESTID)).toBeVisible();
    expect(
      screen.getByTestId(DEFAULT_EPISODEPLAYER_DESCRIPTION_TESTID)
    ).toBeVisible();
    expect(
      screen.getByTestId(DEFAULT_EPISODEPLAYER_TITLE_TESTID)
    ).toBeVisible();
    expect(
      screen.getByTestId(DEFAULT_EPISODEPLAYER_PLAYER_TESTID)
    ).toBeVisible();
    expect(
      screen.getByText(
        `${EPISODE_AUDIO_FALLBACK_MSG} ${TEST_EPISODE_INFO.episodeUrl}`
      )
    ).toBeVisible();
  });
});
