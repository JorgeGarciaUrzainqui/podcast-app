import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import PodcastEpisodeTableRows from '../../../../../../src/components/ui/molecules/PodcastEpisodeTable/PodcastEpisodeTableRows';

describe('Podcast Episode Table Rows component', () => {
  const TEST_EPISODE_COLUMNS = {
    episodeTitle: 'Title',
    episodeDuration: 'Duration'
  };
  const TEST_EPISODE_ROWS = [
    {
      episodeId: 'Episode01',
      episodeTitle: 'Title 01',
      episodeDuration: '30:00'
    },
    {
      episodeId: 'Episode02',
      episodeTitle: 'Title 02',
      episodeDuration: '40:00'
    }
  ];

  it('should render without crash with mandatory props', () => {
    const onClickFn = vi.fn();

    render(
      <table>
        <PodcastEpisodeTableRows
          episodeColumns={TEST_EPISODE_COLUMNS}
          episodeRows={TEST_EPISODE_ROWS}
          onClickEpisodeRow={onClickFn}
        />
      </table>
    );

    expect(screen.getAllByRole('row')).toHaveLength(2);
    expect(screen.getAllByRole('cell')).toHaveLength(4);
  });
});
