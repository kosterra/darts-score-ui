import React from 'react';

import {
    Col,
    Container,
    Row,
    ToggleButton
} from 'react-bootstrap';

import X01ConfigOptions from '../config_options/score.config.options';

const X01ScoreConfig = (props) => {
    const {
        onScoreChange,
        scoreOption
    } = props

    const { gameScoreOptions } = X01ConfigOptions;

    return (
        <Container className="justify-content-md-center align-items-center">
            <p className="text-center text-shade600 fs-7 fw-semibold">Starting Score</p>
            <Row xs={2} sm={3} md={5} className="d-flex justify-content-center align-items-center border-solid-grey rounded m-0 py-3 mb-3 text-white">
                {gameScoreOptions.values.map((option, idx) => (
                    <Col key={idx} className="py-1 d-flex justify-content-center align-items-center">
                        <ToggleButton
                            key={idx}
                            id={`score-option-${idx}`}
                            type="radio"
                            name="score-options"
                            value={option}
                            className={`w-100 btn btn-sm text-white btr-16 bbr-16 fs-8 fw-semibold ${Number(scoreOption) === option ? 'btn-primary' : 'btn-tertiary'}`}
                            checked={Number(scoreOption) === option}
                            onChange={(e) => onScoreChange('startingScore', e.currentTarget.value)}
                        >
                            {option}
                        </ToggleButton>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default X01ScoreConfig;