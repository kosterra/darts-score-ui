import React from 'react';

import CricketState from '../../utils/cricket.state';
import CricketGame from '../../components/games/cricket.game';

const CricketGamePage = () => {

  return (
    <CricketState>
      <CricketGame/>
    </CricketState>
  )
}

export default CricketGamePage;