import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import StandardPageTemplate from '../../../../src/components/templates/StandardPageTemplate';
import MockHeader from './__mocks__/MockHeader';
import MockBody from './__mocks__/MockBody';

describe('Standard Page Template component', () => {
  const DEFAULT_TESTID = 'standardPageTemplate';

  it('should render without crash with mandatory and default props', () => {
    render(
      <StandardPageTemplate
        headerPage={<MockHeader />}
        bodyPage={<MockBody />}
      />
    );

    expect(screen.getByTestId(DEFAULT_TESTID)).toBeVisible();
    expect(screen.getByTestId(DEFAULT_TESTID)).not.toHaveClass();
    expect(screen.getByTestId(DEFAULT_TESTID).children).toHaveLength(2);
  });

  it('should propagate testId', () => {
    const tesId = 'mockTestId';

    render(
      <StandardPageTemplate
        headerPage={<MockHeader />}
        bodyPage={<MockBody />}
        testId={tesId}
      />
    );

    expect(screen.getByTestId(tesId)).toBeVisible();
  });

  it('should propagate variamntClass', () => {
    const variantClass = 'mockClass';

    render(
      <StandardPageTemplate
        headerPage={<MockHeader />}
        bodyPage={<MockBody />}
        variantClass={variantClass}
      />
    );

    expect(screen.getByTestId(DEFAULT_TESTID)).toHaveClass(variantClass);
  });
});
