/**
 * Renders a table component
 *
 * @param {Object} props - props of the component
 * @param {JSX.Element} props.children - the component to render inside the table
 * @param {string} [props.variantClass] - Optional. Allows to inject css classes to the component.
 * @param {string} [props.testId] - Optional. For testing purposes only. Indicates the data-testid to be used.
 * @returns JSX.Element the table component
 */
const Table = ({ children, variantClass, testId }) => {
  return (
    <table className={variantClass} data-testid={testId}>
      {children}
    </table>
  );
};

Table.defaultProps = {
  variantClass: '',
  testId: 'table'
};

export default Table;
