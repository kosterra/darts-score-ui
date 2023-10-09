import React from 'react';
import {
  Container,
  Row
} from 'react-bootstrap';

import CricketState from '../../utils/cricket.state';
import CricketGame from '../../components/games/cricket.game';

const CricketGamePage = () => {

  return (
      <Container fluid className="mx-4 bg-transparent border-0">
          <Row className="justify-content-md-center align-items-center">
            <CricketState>
              <CricketGame/>
            </CricketState>
          </Row>
      </Container>
  )
}

export default CricketGamePage;