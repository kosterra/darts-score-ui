import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const AboutCard = () => {
	return (
        <Col className="d-flex justify-content-center">
            <Card bg="secondary-grey" className="rounded-0 border-0 p-0" style={{ width: "50rem" }}>
                <Card.Body className="m-0 p-0 border-0 rounded-0">
                    <Card.Title className="bg-primary-green py-3 mb-0 text-white text-center span">
                        About
                    </Card.Title>
                    <Card.Text as="div" className="d-flex flex-column align-items-center justify-content-center py-2 text-white">
                        <Row>
                            <Col className="mt-3">
                                <span className="fs-6 fw-600">
                                    Built using
                                </span>
                            </Col>
                        </Row>
                        <Row className="w-75 mb-3">
                            <Col className="mt-3">
                                <Row>
                                    <Col className="d-flex flex-column justify-content-center align-items-center">
                                        <i className="fab fa-react display-5"></i>
                                        <span className="text-center">
                                            <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React</a>
                                        </span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="mt-3">
                                <Row>
                                    <Col className="d-flex flex-column justify-content-center align-items-center">
                                        <i className="fab fa-google display-5"></i>
                                        <span className="text-center">
                                            <a href="https://fonts.google.com/" target="_blank" rel="noopener noreferrer">Google Fonts</a>
                                        </span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="mt-3">
                                <Row>
                                    <Col className="d-flex flex-column justify-content-center align-items-center">
                                        <i className="fab fa-font-awesome display-5"></i>
                                        <span className="text-center">
                                            <a href="https://fontawesome.com/" target="_blank" rel="noopener noreferrer">Font Awesome</a>
                                        </span>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="mt-4">
                                <span className="fs-6 fw-600">
                                    Contact
                                </span>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="mt-4 mb-3">
                                <Button href="mailto:rkoster@gmx.ch" variant="primary-green">
                                    <i className="fas fa-envelope me-2"></i>
                                    E-Mail
                                </Button>
                            </Col>
                        </Row>
                    </Card.Text>
                </Card.Body>               
            </Card>
        </Col>
	);
};

export default AboutCard;