import React from 'react';
import { useParams } from "react-router-dom";
import { Container, Row } from 'react-bootstrap';

import PlayerStats from '../components/stats/player.stats';
import X01Stats from '../components/stats/x01.stats';
import CricketStats from '../components/stats/cricket.stats';

const StatsPage = () => {

  const { id } = useParams();

  function StatsContent() {
      switch (id) {
          case 'players':
              return <PlayerStats />;
          case 'x01':
              return <X01Stats emptyText="No stats found. Not yet implemented!"/>;
          case 'cricket':
              return <CricketStats emptyText="No stats found. Not yet implemented!"/>;
          default:
              return <X01Stats emptyText="No stats found. Not yet implemented!"/>;
      }
  }

  return (
    <Container fluid className="p-4 bg-transparent border-0">
        <Row className="justify-content-md-center align-items-center">
            <StatsContent />
        </Row>
    </Container>
  )
}

export default StatsPage
