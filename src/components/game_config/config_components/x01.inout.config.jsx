import React from 'react';

import {
    Col,
    Container,
    Row,
    ToggleButton
} from 'react-bootstrap';

import SetsLegsConfigOptions from '../config_options/sets.legs.config.options';

const X01InOutConfig = (props) => {
    const {
        legInOption,
        legOutOption,
        onInOutChange,
    } = props

    const { legInOptions, legOutOptions } = SetsLegsConfigOptions;

    return (
        <Container className="justify-content-md-center align-items-center">
            <Row>
                <Col>
                    <p className="text-center text-gray-600 fs-7 fw-semibold">Starting In</p>
                    <Row xs={1} sm={1} md={1} lg={3} className="d-flex justify-content-center align-items-center border-solid-grey rounded m-0 py-3 mb-3 text-white">
                        {legInOptions.values.map((option, idx) => (
                            <Col key={idx} className="py-1 d-flex justify-content-center align-items-center">
                                <ToggleButton
                                    key={idx}
                                    id={`in-option-${idx}`}
                                    type="radio"
                                    name="in-options"
                                    value={option}
                                    className={`text-nowrap w-100 btn btn-sm text-white btr-16 bbr-16 fs-8 fw-semibold ${legInOption === option ? 'btn-primary' : 'btn-tertiary'}`}
                                    checked={legInOption === option}
                                    onChange={(e) => onInOutChange('legInMode', e.currentTarget.value)}
                                >
                                    {option}
                                </ToggleButton>
                            </Col>
                        ))}
                    </Row>
                </Col>
                <Col>
                    <p className="text-center text-gray-600 fs-7 fw-semibold">Checkout</p>
                    <Row xs={1} sm={1} md={1} lg={3} className="d-flex justify-content-center align-items-center border-solid-grey rounded m-0 py-3 mb-3 text-white">
                        {legOutOptions.values.map((option, idx) => (
                            <Col key={idx} className="py-1 d-flex justify-content-center align-items-center">
                                <ToggleButton
                                    key={idx}
                                    id={`out-option-${idx}`}
                                    type="radio"
                                    name="out-options"
                                    value={option}
                                    className={`text-nowrap w-100 btn btn-sm text-white btr-16 bbr-16 fs-8 fw-semibold ${legOutOption === option ? 'btn-primary' : 'btn-tertiary'}`}
                                    checked={legOutOption === option}
                                    onChange={(e) => onInOutChange('legOutMode', e.currentTarget.value)}
                                >
                                    {option}
                                </ToggleButton>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default X01InOutConfig;