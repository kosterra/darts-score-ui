import React, { Fragment } from 'react';

import {
    Container,
    Tab,
    Tabs,
    Row,
    Col
} from 'react-bootstrap';

import X01GameHeader from './x01.game.header';
import X01StatsScoreBoard from '../stats/x01.stats.scoreboard';
import X01StatsScoreBoardMultiple from '../stats/x01.stats.scoreboard.multiple';
import X01StatsTab from '../stats/x01.stats.tab';

const X01GameStatistics = props => {
    const {
        game,
        players
    } = props;

    return (
        <Container fluid className="p-4 pt-0 bg-transparent border-0">
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    { game.players.length === 2 &&
                        <X01StatsScoreBoard players={ players } game={ game } />
                    }
                    { game.players.length > 2 &&
                        <X01StatsScoreBoardMultiple players={ players } game={ game } />
                    }
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 6, offset: 3 }} className="px-0 rounded-2">
                    <Tabs
                        defaultActiveKey="overall"
                        justify
                    >
                        <Tab eventKey="overall" title="Overall" className="p-4 bg-secondary-grey">
                            <X01StatsTab valueKey="game" game={ game }/>
                        </Tab>

                        {[...Array(game.setsPlayed)].map((e, i) => (
                            <Tab key={`set-tab-${i}`} eventKey={`set-${i}`} title={`Set ${i+1}`} className="p-4 bg-secondary-grey">
                                <X01StatsTab valueKey={`set-${i+1}`} game={ game } />
                            </Tab>
                        ))}
                    </Tabs>
                </Col>
            </Row>
        </Container>
    )
}
    
export default X01GameStatistics;