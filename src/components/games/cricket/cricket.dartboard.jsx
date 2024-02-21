import React, { useContext } from 'react';
import DartBoard from '../common/dartboard';
import CricketContext from '../../../utils/cricket.context';

const CricketDartBoard = () => {
  const { updateCurrentThrowDartBoard } = useContext(CricketContext);

  const setDartValue = (value) => {
    updateCurrentThrowDartBoard(value);
  }

  return (
    <DartBoard handleClick={setDartValue} />
  )
}

export default CricketDartBoard
