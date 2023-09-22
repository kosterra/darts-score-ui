import React from 'react';
import { useParams } from "react-router-dom";
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Container, Row } from 'react-bootstrap';

import StatsSidebar from '../components/navigation/stats.sidebar';

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
      <div className="d-flex">
            <ProSidebarProvider>
                <StatsSidebar />
                <Container fluid className="bg-transparent border-0 m-4">
                    <Row className="justify-content-md-center align-items-center">
                        <StatsContent />
                    </Row>
                </Container>
            </ProSidebarProvider>
        </div>
  )
}

export default StatsPage
