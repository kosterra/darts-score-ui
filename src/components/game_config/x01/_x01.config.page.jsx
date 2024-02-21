import React from 'react';
import {
    Container,
    Row
} from 'react-bootstrap';

import X01Config from './x01.config'

const X01ConfigPage = () => {

    return (
        <Container fluid className="p-4 bg-transparent border-0">
            <Row className="justify-content-center align-items-center">
                <X01Config />
            </Row>
        </Container>
    );
};

export default X01ConfigPage;