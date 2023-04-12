import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import MockTableChildren from './__mock__/MockTableChildren';
import Table from '../../../../../src/components/ui/atoms/Table';

describe('Table component', () => {
  const DEFAULT_TESTID = 'table';
  const CHILDREN_TESTID = 'mockTableChildren';

  it('should render without crash with mandatory and default props', () => {
    render(
      <Table>
        <MockTableChildren testId={CHILDREN_TESTID} />
      </Table>
    );

    const tableComponent = screen.getByTestId(DEFAULT_TESTID);

    expect(tableComponent).toBeVisible();
    expect(tableComponent).not.toHaveClass();
    expect(screen.getByTestId(CHILDREN_TESTID)).toBeVisible();
    expect(screen.getAllByRole('cell')).toHaveLength(3);
  });

  it('should render with a variant class', () => {
    const variantClass = 'MockClass';

    render(
      <Table variantClass={variantClass}>
        <MockTableChildren />
      </Table>
    );

    expect(screen.getByTestId(DEFAULT_TESTID)).toHaveClass(variantClass);
  });

  it('should be accessible by prop testId', () => {
    const testId = 'MockTable';

    render(
      <Table testId={testId}>
        <MockTableChildren />
      </Table>
    );

    expect(screen.getByTestId(testId)).toBeVisible();
  });
});
