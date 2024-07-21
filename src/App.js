import { useEffect } from 'react';
import './App.css';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';

const initialState = {
  marks: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  player: 1
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PLAYER':  
      return { ...state, player: action.payload };
    case 'SET_MARKS':
      return { ...state, marks: action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer);

const mapStateToProps = (state) => ({
  marks: state.marks,
  player: state.player
});

const mapDispatchToProps = (dispatch) => ({
  setMarks: (marks) => dispatch({ type: 'SET_MARKS', payload: marks }),
  setPlayer: (player) => dispatch({ type: 'SET_PLAYER', payload: player })
});

const BoardContainer = connect(mapStateToProps, mapDispatchToProps)(Board);

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BoardContainer />
      </Provider>
    </div>
  );
}

function Board({ marks, player, setMarks, setPlayer }) {
  useEffect(() => {
    const combinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    
    for (const combo of combinations) {
      const [a, b, c] = combo;
      if (marks[a] === 1 && marks[b] === 1 && marks[c] === 1) {
        setTimeout(() => alert('Player 1 wins'), 0);
        return;
      }
      if (marks[a] === 2 && marks[b] === 2 && marks[c] === 2) {
        setTimeout(() => alert('Player 2 wins'), 0);
        return;
      }
    }
  }, [marks]);

  const changeMark = (i) => {
    const newMarks = [...marks];
    if (newMarks[i] === 0) {
      newMarks[i] = player;
      setMarks(newMarks);
      setPlayer(player === 1 ? 2 : 1);
    } else {
      alert('Please select an empty block');
    }
  };

  return (
    <div className="board">
      {[0, 1, 2].map((row) => (
        <div key={row}>
          {[0, 1, 2].map((col) => (
            <Block key={row * 3 + col} mark={marks[row * 3 + col]} position={row * 3 + col} changeMark={changeMark} />
          ))}
        </div>
      ))}
    </div>
  );
}

function Block({ mark, changeMark, position }) {
  return <div className={`block mark${mark}`} onClick={() => changeMark(position)}></div>;
}

export default App;
