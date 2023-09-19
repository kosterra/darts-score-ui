import React, { useContext } from 'react';
import DartBoard from './dartboard';
import X01Context from '../../../utils/x01.context';

import { toast } from 'react-toastify';

const X01DartBoard = () => {
  const { game, updateCurrentThrowDartBoard, getCurrentThrowScore} = useContext(X01Context);

  const setDartValue = (value) => {
    let totalScore = getCurrentThrowScore();
    let currentPlayerScore = game.playerModels[game.currentPlayerTurn].score ;

    let newCurrentScore = currentPlayerScore - totalScore;

    if (newCurrentScore <= 1) {
      toast.error("You can't throw any more darts");
      return
    }
    
    updateCurrentThrowDartBoard(newCurrentScore, value);
  }

  return (
    <DartBoard handleClick={ setDartValue }/>
  )
}

export default X01DartBoard
