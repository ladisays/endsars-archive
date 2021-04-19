import React from 'react';

const Cell = ({ children, ...props }) => <td {...props}>{children}</td>;

const spacerStyles = {
  border: 0,
  margin: 0,
  padding: 0,
  fontSize: '1px',
  lineHeight: '1px',
  maxHeight: '1px'
};

const CellSpacer = ({ span, width, height, ...props }) => (
  <Grid.Cell
    colSpan={span}
    width={width}
    height={height}
    style={spacerStyles}
    {...props}>
    <div>&nbsp;</div>
  </Grid.Cell>
);

const Row = ({ children, ...props }) => (
  <tr {...props}>
    {React.Children.map(children, (child) => {
      if ([Cell, CellSpacer].includes(child.type)) return child;
      return <Cell>{child}</Cell>;
    })}
  </tr>
);

const Grid = ({ children, ...props }) => (
  <table
    role="presentation"
    border={0}
    cellPadding={0}
    cellSpacing={0}
    width="100%"
    {...props}>
    <tbody>
      {React.Children.map(children, (child) => {
        if (!child) return null;
        if (child.type === Row) return child;
        if (child.type === Cell) return <Row>{child}</Row>;
        return (
          <Row>
            <Cell>{child}</Cell>
          </Row>
        );
      })}
    </tbody>
  </table>
);

export const GridText = ({ children }) => (
  <Grid>
    <Grid.Row>
      <Grid.CellSpacer width={64} />
      <Grid.Cell
        style={{
          color: '#212529 !important',
          fontSize: '16px',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'
        }}>
        {children}
      </Grid.Cell>
      <Grid.CellSpacer width={64} />
    </Grid.Row>
    <Grid.Row>
      <Grid.CellSpacer span={3} height={12} />
    </Grid.Row>
  </Grid>
);

Grid.Cell = Cell;
Grid.Row = Row;
Grid.CellSpacer = CellSpacer;

export default Grid;
