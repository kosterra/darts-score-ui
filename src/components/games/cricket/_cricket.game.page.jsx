import React from 'react';
import {
  Container,
  Row
} from 'react-bootstrap';

import CricketState from '../../../utils/cricket.state';
import CricketGame from './cricket.game';

const CricketGamePage = () => {

  return (
    <Container fluid className="p-4 pt-0 bg-transparent border-0">
      <Row className="justify-content-md-center align-items-center">
        <CricketState>
          <CricketGame />
        </CricketState>
      </Row>
    </Container>
  )
}

export default CricketGamePage;