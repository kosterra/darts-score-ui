import React from 'react';
import {
    Container,
    Row
} from 'react-bootstrap';

import CricketConfig from '../../components/game_config/cricket.config';

const CricketConfigPage = () => {

    return (
        <Container className="m-4 bg-transparent border-0">
            <Row className="justify-content-md-center align-items-center">
                <CricketConfig />
            </Row>
        </Container>
	);
};

export default CricketConfigPage;