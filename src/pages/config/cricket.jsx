import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import CricketConfig from '../../components/game_config/cricket.config';

const CricketConfigPage = () => {

    return (
        <>
            <Container fluid className="bg-transparent border-0 p-4">
                <Row className="justify-content-md-center align-items-center">
                    <Card bg="secondary-grey" className="m-0 p-0 border-0 rounded-0" style={{ width: "50rem" }}>
                        <Card.Body className="m-0 p-0 border-0 rounded-0">
                            <Card.Title className="bg-primary-green p-3 text-white text-center">Cricket</Card.Title>
                            <Card.Text as="div" className="p-2 text-white">
                                <CricketConfig />
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </>
	);
};

export default CricketConfigPage;