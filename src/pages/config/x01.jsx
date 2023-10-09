import React from 'react';
import {
    Container,
    Row
} from 'react-bootstrap';

import X01Config from '../../components/game_config/x01.config'

const X01ConfigPage = () => {

    return (
        <Container className="m-4 bg-transparent border-0">
            <Row className="justify-content-md-center align-items-center">
                <X01Config />
            </Row>
        </Container>
	);
};

export default X01ConfigPage;