import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import ClickableContainer from '../../../../../src/components/ui/atoms/ClickableContainer';

describe('Clickable container component', () => {
  const DEFAULT_TESTID = 'clickableContainer';

  const MOCK_COMPONENT_TEXT = 'Test Component';
  const MOCK_COMPONENT_TESTID = 'MockTestId';
  const MockComponent = () => (
    <p data-testid={MOCK_COMPONENT_TESTID}>{MOCK_COMPONENT_TEXT}</p>
  );

  it('should render without crash with mandatory and default props', () => {
    render(
      <ClickableContainer>
        <MockComponent />
      </ClickableContainer>
    );

    const clickableContainerComponent = screen.getByTestId(DEFAULT_TESTID);
    const mockComponent = screen.getByTestId(MOCK_COMPONENT_TESTID);

    expect(clickableContainerComponent).toBeVisible();
    expect(clickableContainerComponent).not.toHaveClass();
    expect(mockComponent).toBeVisible();
    expect(mockComponent.textContent).toEqual(MOCK_COMPONENT_TEXT);
  });

  it('should execute onContainerClick when clicked ', () => {
    const onContainerClick = vi.fn();

    render(
      <ClickableContainer onContainerClick={onContainerClick}>
        <MockComponent />
      </ClickableContainer>
    );

    fireEvent.click(screen.getByTestId(DEFAULT_TESTID));

    expect(onContainerClick).toHaveBeenCalledTimes(1);
  });

  it('should render with a variant class', () => {
    const variantClass = 'MockClass';

    render(
      <ClickableContainer variantClass={variantClass}>
        <MockComponent />
      </ClickableContainer>
    );

    expect(screen.getByTestId(DEFAULT_TESTID)).toHaveClass(variantClass);
  });

  it('should be accessible by prop testId', () => {
    const testId = 'MockText';

    render(
      <ClickableContainer testId={testId}>
        <MockComponent />
      </ClickableContainer>
    );

    expect(screen.getByTestId(testId)).toBeVisible();
  });
});
