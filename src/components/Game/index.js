import React from 'react';
import styled from 'react-emotion';
import Box from '../Box';
const Layout = styled('div')`
  display: flex;
  flex-direction: column;
  max-width: 300px;
`;
const Table = styled('div')`
  > div:last-child {
    border-bottom: 1px solid orange;
  }
`;
const EachRow = styled('div')`
  display: flex;
  border-top: 1px solid orange;
  > span:last-child {
    border-right: 1px solid orange;
  }
`;
const Controls = styled('div')`
  border: 1px solid red;
  padding: 10px;
  display: flex;
`;
const Button = styled('button')`
  flex: 1;
  border: 1px solid red;
  padding: 5px;
`;

const GameOver = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid red;
    min-width: 250px;
    min-height: 250px;
}

`;
/* eslint-disable */

const initialValues = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];
export default class Game2048 extends React.Component {
  constructor(props) {
    super(props);
    // to set initial values in two positions
    let { rowNo: row1, columnNo: col1 } = this.placeValueInRandomPosition(7, 0);
    let { rowNo: row2, columnNo: col2 } = this.placeValueInRandomPosition(
      15,
      8,
    );
    initialValues[row1][col1] = 2;
    initialValues[row2][col2] = 2;
    this.state = {
      values: initialValues,
      rows: 4,
      columns: 4,
      gameOver: false,
    };
  }

  generateBoxes = values => {
    return values.map((row, rindex) => (
      <EachRow>
        {row.map((column, cindex) => (
          <Box value={column} id={`${rindex}-${cindex}`} />
        ))}
      </EachRow>
    ));
  };
  moveLeftAlgorithm = () => {
    const { values, rows, columns } = this.state;
    let i = 0;
    let j = 1;
    let alreadyVisited = {
      i: -1,
      j: -1,
    };
    while (i < rows) {
      while (j < columns) {
        if (!values[i][j]) {
          //if square doesnt have any value , do nothing;
          j++;
        } else if (
          values[i][j] === values[i][j - 1] &&
          alreadyVisited.i !== i &&
          alreadyVisited.j !== j
        ) {
          // previous square and current square are holding the same value
          values[i][j - 1] = 2 * values[i][j - 1];
          values[i][j] = 0;
          alreadyVisited = {
            i: i,
            j: j - 1,
          };
          j++;
        } else if (values[i][j - 1] === 0) {
          // if the recent previous square is empty ,  move the current square to the recent previous with empty value
          values[i][j - 1] = values[i][j];
          values[i][j] = 0;
          j = j - 1;
        } else if (values[i][j - 1] !== values[i][j]) {
          // do nothing;
          j++;
        } else {
          j++;
        }
      }
      i++;
      j = 1;
      alreadyVisited = {
        i: -1,
        j: -1,
      };
    }
    return values;
  };
  moveRightAlgorithm = () => {
    const { values, rows, columns } = this.state;
    let i = 0;
    let j = columns - 1;
    let alreadyVisited = {
      i: -1,
      j: -1,
    };
    while (i < rows) {
      while (j >= 0) {
        if (!values[i][j]) {
          //if square doesnt have any value , do nothing;
          j--;
        } else if (
          values[i][j] === values[i][j + 1] &&
          alreadyVisited.i !== i &&
          alreadyVisited.j !== j
        ) {
          // previous square and current square are holding the same value
          values[i][j + 1] = 2 * values[i][j + 1];
          values[i][j] = 0;
          alreadyVisited = {
            i: i,
            j: j + 1,
          };
          j--;
        } else if (values[i][j + 1] === 0) {
          // if the recent previous square is empty ,  move the current square to the recent previous with empty value
          values[i][j + 1] = values[i][j];
          values[i][j] = 0;
          j = j + 1;
        } else if (values[i][j + 1] !== values[i][j]) {
          // do nothing;
          j--;
        } else {
          j--;
        }
      }
      i++;
      j = columns - 1;
      alreadyVisited = {
        i: -1,
        j: -1,
      };
    }
    return values;
  };
  moveDownAlgorithm = () => {
    const { values, rows, columns } = this.state;
    let i = rows - 2;
    let j = 0;
    let alreadyVisited = {
      i: -1,
      j: -1,
    };
    while (j < columns) {
      while (i >= 0 && i <= rows - 2) {
        if (!values[i][j]) {
          //if square doesnt have any value , do nothing;
          i--;
        } else if (i + 1 >= rows) {
          i--;
        } else if (
          values[i][j] === values[i + 1][j] &&
          alreadyVisited.i !== i &&
          alreadyVisited.j !== j
        ) {
          // previous square and current square are holding the same value
          values[i + 1][j] = 2 * values[i + 1][j];
          values[i][j] = 0;
          alreadyVisited = {
            i: i + 1,
            j: j,
          };
          i--;
        } else if (values[i + 1][j] === 0) {
          // if the recent previous square is empty ,  move the current square to the recent previous with empty value
          values[i + 1][j] = values[i][j];
          values[i][j] = 0;
          i = i + 1;
        } else if (values[i + 1][j] !== values[i][j]) {
          // do nothing;
          i--;
        } else {
          i--;
        }
      }

      j++;
      i = rows - 2;
      alreadyVisited = {
        i: -1,
        j: -1,
      };
    }
    return values;
  };
  moveUpAlgorithm = () => {
    const { values, rows, columns } = this.state;
    let i = 1;
    let j = 0;
    let alreadyVisited = {
      i: -1,
      j: -1,
    };
    while (j < columns) {
      while (i >= 0 && i <= rows - 1) {
        if (!values[i][j]) {
          //if square doesnt have any value , do nothing;
          i++;
        } else if (i - 1 < 0) {
          i++;
        } else if (
          values[i][j] === values[i - 1][j] &&
          alreadyVisited.i !== i &&
          alreadyVisited.j !== j
        ) {
          // previous square and current square are holding the same value
          values[i - 1][j] = 2 * values[i - 1][j];
          values[i][j] = 0;
          alreadyVisited = {
            i: i - 1,
            j: j,
          };
          i++;
        } else if (values[i - 1][j] === 0) {
          // if the recent previous square is empty ,  move the current square to the recent previous with empty value
          values[i - 1][j] = values[i][j];
          values[i][j] = 0;
          i = i - 1;
        } else if (values[i - 1][j] !== values[i][j]) {
          // do nothing;
          i++;
        } else {
          i++;
        }
      }

      j++;
      i = 1;
      alreadyVisited = {
        i: -1,
        j: -1,
      };
    }
    return values;
  };
  moveLeft = () => {
    let values = this.moveLeftAlgorithm();
    this.placeInEmptyPosition(values);
    this.setState({
      values: values,
    });
  };
  moveRight = () => {
    const values = this.moveRightAlgorithm();
    this.placeInEmptyPosition(values);
    this.setState({
      values: values,
    });
  };
  moveUp = () => {
    const values = this.moveUpAlgorithm();
    this.placeInEmptyPosition(values);
    this.setState({
      values: values,
    });
  };
  moveDown = () => {
    const values = this.moveDownAlgorithm();
    this.placeInEmptyPosition(values);
    this.setState({
      values: values,
    });
  };
  findEmptyPlaces = values => {
    const { rows, columns } = this.state;
    let emptyPlaces = [];
    for (let i = 0; i < rows; i += 1) {
      for (let j = 0; j < columns; j += 1) {
        if (values[i][j] === 0) emptyPlaces.push({ i, j });
      }
    }

    return emptyPlaces; // indices of empty positions
  };
  placeValueInRandomPosition = (max = 0, min = 0) => {
    let position = parseInt(Math.random() * (max - min) + min);
    let rowNo = parseInt(position / 4);
    let columnNo = position % 4;
    return { rowNo, columnNo };
  };
  placeInEmptyPosition(values = []) {
    let emptyPlaces = this.findEmptyPlaces(values);
    if (emptyPlaces.length === 0) {
      this.setState({
        gameOver: true,
      });
    }
    let emptyPlacesIndexFixed = parseInt(Math.random() * emptyPlaces.length);
    let { i = null, j = null } = emptyPlaces[emptyPlacesIndexFixed] || {};
    if (i && j) values[i][j] = 2;
  }
  render() {
    return (
      <Layout>
        {this.state.gameOver ? (
          <GameOver>Game over</GameOver>
        ) : (
          <Table>{this.generateBoxes(this.state.values)}</Table>
        )}
        <Controls>
          <Button onClick={this.moveLeft}> LEFT </Button>
          <Button onClick={this.moveRight}> RIGHT </Button>
          <Button onClick={this.moveUp}>UP</Button>
          <Button onClick={this.moveDown}>DOWN</Button>
        </Controls>
      </Layout>
    );
  }
}
