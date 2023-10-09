import React from 'react';
import {
  Container,
  Row
} from 'react-bootstrap';

import X01State from '../../utils/x01.state';
import X01Game from '../../components/games/x01.game';

const X01GamePage = () => {

  return (
      <Container fluid className="mx-4 bg-transparent border-0">
          <Row className="justify-content-md-center align-items-center">
            <X01State>
                <X01Game/>
            </X01State>
          </Row>
      </Container>
  )
}

export default X01GamePage;
