import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import TextInput from '../../../../../src/components/ui/atoms/TextInput';

describe('Input of type text component', () => {
  const TEST_VALUE = 'Initial Value';
  const DEFAULT_PLACEHOLDER = '';
  const DEFAULT_TESTID = 'textInput';

  it('should render without crash with mandatory and default props', () => {
    render(<TextInput inputValue={TEST_VALUE} />);

    const textInputComponent = screen.getByTestId(DEFAULT_TESTID);

    expect(textInputComponent).toBeVisible();
    expect(textInputComponent).toHaveAttribute('type', 'text');
    expect(textInputComponent.value).toEqual(TEST_VALUE);
    expect(screen.getByPlaceholderText(DEFAULT_PLACEHOLDER)).toBeVisible();
    expect(textInputComponent).not.toHaveAttribute('readonly');
    expect(textInputComponent).not.toHaveClass();
  });

  it('should execute onInputChange function', async () => {
    const newValue = `${TEST_VALUE} with some characters`;
    let expectedValue;
    const onInputChange = vi
      .fn()
      .mockImplementation((e) => (expectedValue = e.target.value));

    render(<TextInput inputValue={TEST_VALUE} onInputChange={onInputChange} />);

    fireEvent.change(screen.getByTestId(DEFAULT_TESTID), {
      target: { value: newValue }
    });

    expect(onInputChange).toHaveBeenCalledTimes(1);
    expect(expectedValue).toBe(newValue);
  });

  it('should render placeholder', () => {
    const inputPlaceholder = 'This is a mock placeholder';

    render(
      <TextInput inputValue={TEST_VALUE} inputPlaceholder={inputPlaceholder} />
    );

    expect(screen.getByPlaceholderText(inputPlaceholder)).toBeVisible();
  });

  it('should mark component as readonly', () => {
    render(<TextInput inputValue={TEST_VALUE} isReadOnly />);

    expect(screen.getByTestId(DEFAULT_TESTID)).toHaveAttribute('readonly');
  });

  it('should render with a variant class', () => {
    const variantClass = 'MockClass';

    render(<TextInput inputValue={TEST_VALUE} variantClass={variantClass} />);

    expect(screen.getByTestId(DEFAULT_TESTID)).toHaveClass(variantClass);
  });

  it('should be accessible by prop testId', () => {
    const testId = 'MockText';

    render(<TextInput inputValue={TEST_VALUE} testId={testId} />);

    expect(screen.getByTestId(testId)).toBeVisible();
  });
});
