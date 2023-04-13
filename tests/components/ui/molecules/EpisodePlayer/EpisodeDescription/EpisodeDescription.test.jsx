import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import EpisodeDescription from '../../../../../../src/components/ui/molecules/EpisodePlayer/EpisodeDescription';

describe('Episode Description component', () => {
  const TEST_STRING_DESCRIPTION = 'This is my description';
  const TEST_HTML_STRING_DESCRIPTION = '<h1>This is my HTML description<h1>';
  const DEFAULT_DESCRIPTION_PARAGRAPH_TESTID = 'episodeDescription-paragraph';
  const DEFAULT_DESCRIPTION_DOCUMENTCONTAINER_TESTID =
    'episodeDescription-document';

  it('should render nothing if episodeDescription is not present', () => {
    render(<EpisodeDescription />);

    expect(
      screen.queryByTestId(DEFAULT_DESCRIPTION_PARAGRAPH_TESTID)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId(DEFAULT_DESCRIPTION_DOCUMENTCONTAINER_TESTID)
    ).not.toBeInTheDocument();
  });

  it('should render without crash with string description', () => {
    render(<EpisodeDescription episodeDescription={TEST_STRING_DESCRIPTION} />);

    expect(
      screen.getByTestId(DEFAULT_DESCRIPTION_PARAGRAPH_TESTID)
    ).toBeVisible();
    expect(
      screen.queryByTestId(DEFAULT_DESCRIPTION_DOCUMENTCONTAINER_TESTID)
    ).not.toBeInTheDocument();
  });

  it('should render without crash with document description', () => {
    render(
      <EpisodeDescription episodeDescription={TEST_HTML_STRING_DESCRIPTION} />
    );

    expect(
      screen.getByTestId(DEFAULT_DESCRIPTION_DOCUMENTCONTAINER_TESTID)
    ).toBeVisible();
    expect(
      screen.queryByTestId(DEFAULT_DESCRIPTION_PARAGRAPH_TESTID)
    ).not.toBeInTheDocument();
  });
});
