import React from 'react';
import { useParams } from "react-router-dom";
import { Container, Row } from 'react-bootstrap';

import PlayerStats from '../components/stats/player.stats';
import PlayerVSStats from '../components/stats/player.vs.stats';
import X01EditList from '../components/admin/x01.edit.list';
import CricketEditList from '../components/admin/cricket.edit.list';

const StatsPage = () => {

  const { id } = useParams();

  function StatsContent() {
      switch (id) {
          case 'players':
              return <PlayerStats />;
          case 'vs':
              return <PlayerVSStats />;
          case 'x01':
              return <X01EditList
                        deleteActive={ false }
                        showStatusFilter={ false }
                        staticStatusValue="2"
                    />;
          case 'cricket':
              return <CricketEditList
                        deleteActive={ false }
                        showStatusFilter={ false }
                        staticStatusValue="2"
                    />;
          default:
              return <PlayerStats />;
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
