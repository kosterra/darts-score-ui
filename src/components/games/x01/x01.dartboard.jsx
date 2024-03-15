import { useContext, useRef } from 'react';
import { Toast } from 'primereact/toast';

import DartBoard from '../common/dartboard';
import X01Context from '../../../utils/x01.context';

const X01DartBoard = () => {
  const {
    game,
    updateCurrentThrowDartBoard,
    getCurrentThrowScore
  } = useContext(X01Context);

  const toast = useRef(null);

  const setDartValue = (value) => {
    let totalScore = getCurrentThrowScore();
    let currentPlayerScore = game.playerModels[game.currentPlayerTurn].score;

    let newCurrentScore = currentPlayerScore - totalScore;

    if (newCurrentScore <= 1) {
      toast.current.show(
        {
          severity: 'error',
          summary: 'No more darts',
          detail: 'You can\'t throw any more darts',
          life: 3000
        }
      );
      return
    }

    updateCurrentThrowDartBoard(newCurrentScore, value);
  }

  return (
    <>
      <DartBoard handleClick={setDartValue} />
      <Toast ref={toast} position="bottom-right" />
    </>
  )
}

export default X01DartBoard
