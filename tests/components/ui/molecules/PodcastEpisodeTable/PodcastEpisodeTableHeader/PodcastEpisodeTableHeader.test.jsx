import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import PodcastEpisodeTableHeader from '../../../../../../src/components/ui/molecules/PodcastEpisodeTable/PodcastEpisodeTableHeader';

describe('Podcast Episode Table Header component', () => {
  const TEST_EPISODE_COLUMNS = {
    name: 'Name',
    duration: 'Duration'
  };

  it('should render without crash with mandatory props', () => {
    render(
      <table>
        <PodcastEpisodeTableHeader episodeColumns={TEST_EPISODE_COLUMNS} />
      </table>
    );

    expect(screen.getAllByRole('rowgroup')).toHaveLength(1);
    expect(screen.getAllByRole('row')).toHaveLength(1);

    const headerColumns = screen.getAllByRole('columnheader');

    expect(headerColumns).toHaveLength(2);
    expect(headerColumns[0].textContent).toEqual(TEST_EPISODE_COLUMNS.name);
    expect(headerColumns[1].textContent).toEqual(TEST_EPISODE_COLUMNS.duration);
  });
});
