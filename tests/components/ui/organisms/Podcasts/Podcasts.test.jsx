import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import Podcasts from '../../../../../src/components/ui/organisms/Podcasts/Podcasts';

describe('Podcasts component', () => {
  vi.mock('../../../../../src/hooks/usePodcasts', () => {
    return {
      default: () => ({
        podcasts: [],
        isLoading: false
      })
    };
  });

  it('should render without crash', () => {
    render(<Podcasts />);

    expect(screen.getByTestId('podcastFilter')).toBeVisible();
    expect(screen.getByTestId('podcastCardList')).toBeVisible();
  });
});
