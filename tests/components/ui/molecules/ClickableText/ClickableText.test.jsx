import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import ClickableText from '../../../../../src/components/ui/molecules/ClickableText';

describe('Clickable Text component', () => {
  const TEST_TEXT = 'Test Text';
  const onClickFn = vi.fn();

  const DEFAULT_COMPONENT_TESTID = 'clickableText';
  const CONTAINER_TESTID_EXT = '-container';
  const TEXT_TESTID_EXT = '-text';
  const DEFAULT_CONTAINER_TESTID = `${DEFAULT_COMPONENT_TESTID}${CONTAINER_TESTID_EXT}`;
  const DEFAULT_TEXT_TESTID = `${DEFAULT_COMPONENT_TESTID}${TEXT_TESTID_EXT}`;

  beforeEach(() => {
    onClickFn.mockClear();
  });

  it('should render without crash with mandatory and default props', () => {
    render(<ClickableText onClickText={onClickFn} text={TEST_TEXT} />);

    expect(screen.getByTestId(DEFAULT_TEXT_TESTID)).toBeVisible();
    expect(screen.getByTestId(DEFAULT_CONTAINER_TESTID)).toBeVisible();

    fireEvent.click(screen.getByTestId(DEFAULT_CONTAINER_TESTID));

    expect(onClickFn).toHaveBeenCalledTimes(1);
  });

  it('should propagate variant class', () => {
    const variantClass = 'MockClass';

    render(
      <ClickableText
        onClickText={onClickFn}
        text={TEST_TEXT}
        variantClass={variantClass}
      />
    );

    expect(screen.getByTestId(DEFAULT_CONTAINER_TESTID)).toHaveClass(
      variantClass
    );
  });

  it('should propagate testId', () => {
    const testId = 'mockTestId';
    render(
      <ClickableText onClickText={onClickFn} text={TEST_TEXT} testId={testId} />
    );

    expect(screen.getByTestId(`${testId}${CONTAINER_TESTID_EXT}`)).toBeVisible();
    expect(screen.getByTestId(`${testId}${TEXT_TESTID_EXT}`)).toBeVisible();
  });
});
