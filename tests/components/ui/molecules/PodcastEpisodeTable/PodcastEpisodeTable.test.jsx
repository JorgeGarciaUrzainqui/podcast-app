import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import PodcastEpisodeTable from '../../../../../src/components/ui/molecules/PodcastEpisodeTable';

describe('Podcast Episode Table component', () => {
  const TEST_EPISODE_ROWS = [
    {
      episodeId: 'Episode01',
      episodeTitle: 'Title 01',
      episodeDate: '2/11/2023',
      episodeDuration: '30:00'
    },
    {
      episodeId: 'Episode02',
      episodeTitle: 'Title 02',
      episodeDate: '30/01/2022',
      episodeDuration: '40:00'
    },
    {
      episodeId: 'Episode03',
      episodeTitle: 'Title 03',
      episodeDate: '15/02/2023',
      episodeDuration: '05:00'
    }
  ];
  const DEFAULT_PODCAST_EPISODE_TABLE_ID = 'podcastEpisodeTable';

  it('should render without crash with mandatory and default props', () => {
    const onClickFn = vi.fn();
    render(
      <PodcastEpisodeTable
        episodes={TEST_EPISODE_ROWS}
        onClickEpisodeRow={onClickFn}
      />
    );

    expect(screen.getByTestId(DEFAULT_PODCAST_EPISODE_TABLE_ID)).toBeVisible();

    expect(screen.getAllByRole('columnheader')).toHaveLength(3);
    expect(screen.getAllByRole('row')).toHaveLength(4);
    expect(screen.getAllByRole('cell')).toHaveLength(9);
  });

  it('should render nothing if isLoading is true', () => {
    const onClickFn = vi.fn();
    render(
      <PodcastEpisodeTable
        episodes={TEST_EPISODE_ROWS}
        onClickEpisodeRow={onClickFn}
        isLoading
      />
    );

    expect(
      screen.queryByTestId(DEFAULT_PODCAST_EPISODE_TABLE_ID)
    ).not.toBeInTheDocument();
  });
});
