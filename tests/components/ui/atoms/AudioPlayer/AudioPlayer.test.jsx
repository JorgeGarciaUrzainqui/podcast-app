import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import AudioPlayer from '../../../../../src/components/ui/atoms/AudioPlayer';

describe('AudioPlayer component', () => {
  const TEST_AUDIOPLAYER_SRC = 'AudioPlayerSrc';
  const DEFAULT_TESTID = 'audioPlayer';
  const DEFAULT_MESSAGE = 'This is a fallback message';

  it('should render without crash with mandatory and default props', () => {
    render(
      <AudioPlayer audioSrc={TEST_AUDIOPLAYER_SRC}>
        <p>{DEFAULT_MESSAGE}</p>
      </AudioPlayer>
    );

    const audioComponent = screen.getByTestId(DEFAULT_TESTID);

    expect(audioComponent).toBeVisible();
    expect(audioComponent).toHaveAttribute('src', TEST_AUDIOPLAYER_SRC);
    expect(audioComponent).not.toHaveClass();
    expect(audioComponent).toHaveAttribute('controls');
    expect(audioComponent).toHaveAttribute('preload', 'auto');
    expect(screen.getByText(DEFAULT_MESSAGE)).toBeVisible();
  });

  it('should not have attribute controls', () => {
    render(
      <AudioPlayer audioSrc={TEST_AUDIOPLAYER_SRC} audioControls={false}>
        <p>{DEFAULT_MESSAGE}</p>
      </AudioPlayer>
    );

    expect(screen.getByTestId(DEFAULT_TESTID)).not.toHaveAttribute('controls');
  });

  it('should not have attribute controls', () => {
    render(
      <AudioPlayer audioSrc={TEST_AUDIOPLAYER_SRC} preloadAudio="none">
        <p>{DEFAULT_MESSAGE}</p>
      </AudioPlayer>
    );

    expect(screen.getByTestId(DEFAULT_TESTID)).toHaveAttribute(
      'preload',
      'none'
    );
  });

  it('should render with a variant class', () => {
    const variantClass = 'MockClass';

    render(
      <AudioPlayer audioSrc={TEST_AUDIOPLAYER_SRC} variantClass={variantClass}>
        <p>{DEFAULT_MESSAGE}</p>
      </AudioPlayer>
    );

    expect(screen.getByTestId(DEFAULT_TESTID)).toHaveClass(variantClass);
  });

  it('should be accessible by prop testId', () => {
    const testId = 'MockAudioPlayer';

    render(
      <AudioPlayer audioSrc={TEST_AUDIOPLAYER_SRC} testId={testId}>
        <p>{DEFAULT_MESSAGE}</p>
      </AudioPlayer>
    );
    expect(screen.getByTestId(testId)).toBeVisible();
  });
});
