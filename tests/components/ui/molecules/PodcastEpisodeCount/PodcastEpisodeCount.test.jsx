import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { PODCASTDETAIL_EPISODE_COUNT_LABEL } from '../../../../../src/constants';
import PodcastEpisodeCount from '../../../../../src/components/ui/molecules/PodcastEpisodeCount';

describe('Podcast Episode Count component', () => {
  const TEST_COUNT = 50;
  const DEFAULT_EPISODECOUNT_TESTID = 'podcastEpisodeCount';

  it('should render without crash with mandatory and default props', () => {
    render(<PodcastEpisodeCount episodeCount={TEST_COUNT} />);

    expect(screen.getByTestId(DEFAULT_EPISODECOUNT_TESTID)).toBeVisible();
    expect(
      screen.getByText(`${PODCASTDETAIL_EPISODE_COUNT_LABEL}${TEST_COUNT}`)
    ).toBeVisible();
  });

  it('should render nothing if isLoading is true ', () => {
    render(<PodcastEpisodeCount episodeCount={TEST_COUNT} isLoading />);

    expect(
      screen.queryByTestId(DEFAULT_EPISODECOUNT_TESTID)
    ).not.toBeInTheDocument();
  });
});
