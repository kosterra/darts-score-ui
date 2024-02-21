import React from 'react';

import {
    Col,
    Container,
    Dropdown,
    Row
} from 'react-bootstrap';

import SetsLegsConfigOptions from '../../../game_config/config_options/sets.legs.config.options';

const SetsLegsConfig = (props) => {
    const {
        onSetsLegsChange,
        setModeOption,
        legModeOption,
        numberOfSetsOption,
        numberOfLegsOption
    } = props

    const {
        setLegModeOptions,
        ftSetNumberOptions,
        ftLegNumberOptions,
        boSetNumberOptions,
        boLegNumberOptions
    } = SetsLegsConfigOptions;

    return (
        <Container className="justify-content-md-center align-items-center">
            <Row className="mb-3">
                <Col>
                    <p className="text-center text-shade600 fs-7 fw-semibold">Sets</p>
                    <Row xs={1} sm={1} md={2} lg={2} className="d-flex justify-content-center align-items-center border-solid-grey rounded m-0 py-3">
                        <Col className="py-1 d-flex justify-content-center align-items-center">
                            <Dropdown className="w-100" onSelect={(e) => onSetsLegsChange('setMode', e)}>
                                <Dropdown.Toggle
                                    id="dropdown-set-mode"
                                    variant="tertiary"
                                    className="w-100 fs-8 fw-semibold"
                                >
                                    {setModeOption}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="w-100">
                                    {setLegModeOptions.values.map((option, idx) => (
                                        <Dropdown.Item
                                            key={idx}
                                            id={`leg-mode-option-${idx}`}
                                            as="button"
                                            active={setModeOption === option}
                                            eventKey={option}
                                            className="w-100 fs-8 fw-semibold">
                                            {option}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                        <Col className="py-1 d-flex justify-content-center align-items-center">
                            <Dropdown
                                id="dropdown-item-button"
                                title={numberOfSetsOption + (numberOfSetsOption <= 1 ? ' set' : ' sets')}
                                variant="tertiary"
                                onSelect={(e) => onSetsLegsChange('numberOfSets', e)}
                                className="w-100 fs-8 fw-semibold"
                            >
                                <Dropdown.Toggle
                                    id="dropdown-number-of-sets"
                                    variant="tertiary"
                                    className="w-100 fs-8 fw-semibold"
                                >
                                    {numberOfSetsOption + (numberOfSetsOption <= 1 ? ' set' : ' sets')}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="w-100">
                                    {setModeOption === 'First to' && ftSetNumberOptions.values.map((option, idx) => (
                                        <Dropdown.Item
                                            key={idx}
                                            id={`number-of-sets-option-${idx}`}
                                            active={Number(numberOfSetsOption) === option}
                                            eventKey={option}
                                            className="w-100 fs-8 fw-semibold"
                                        >
                                            {option} set{option > 1 && 's'}
                                        </Dropdown.Item>
                                    ))}
                                    {setModeOption === 'Best of' && boSetNumberOptions.values.map((option, idx) => (
                                        <Dropdown.Item
                                            key={idx}
                                            id={`number-of-sets-option-${idx}`}
                                            active={Number(numberOfSetsOption) === option}
                                            eventKey={option}
                                            className="w-100 fs-8 fw-semibold"
                                        >
                                            {option} set{option > 1 && 's'}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <p className="text-center text-shade600 fs-7 fw-semibold">Legs</p>
                    <Row xs={1} sm={1} md={2} lg={2} className="d-flex justify-content-center align-items-center border-solid-grey rounded m-0 py-3">
                        <Col className="py-1 d-flex justify-content-center align-items-center">
                            <Dropdown className="w-100" onSelect={(e) => onSetsLegsChange('legMode', e)}>
                                <Dropdown.Toggle
                                    id="dropdown-leg-mode"
                                    variant="tertiary"
                                    className="w-100 fs-8 fw-semibold"
                                >
                                    {legModeOption}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="w-100">
                                    {setLegModeOptions.values.map((option, idx) => (
                                        <Dropdown.Item
                                            key={idx}
                                            id={`leg-mode-option-${idx}`}
                                            active={legModeOption === option}
                                            eventKey={option}
                                            className="w-100 fs-8 fw-semibold">
                                            {option}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                        <Col className="py-1 d-flex justify-content-center align-items-center">
                            <Dropdown
                                id="dropdown-item-button"
                                title={numberOfLegsOption + (numberOfLegsOption <= 1 ? ' leg' : ' legs')}
                                variant="tertiary"
                                onSelect={(e) => onSetsLegsChange('numberOfLegs', e)}
                                className="w-100 fs-8 fw-semibold"
                            >
                                <Dropdown.Toggle
                                    id="dropdown-number-of-legs"
                                    variant="tertiary"
                                    className="w-100 fs-8 fw-semibold"
                                >
                                    {numberOfLegsOption + (numberOfLegsOption <= 1 ? ' leg' : ' legs')}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="w-100">
                                    {legModeOption === 'First to' && ftLegNumberOptions.values.map((option, idx) => (
                                        <Dropdown.Item
                                            key={idx}
                                            id={`number-of-legs-option-${idx}`}
                                            active={Number(numberOfLegsOption) === option}
                                            eventKey={option}
                                            className="w-100 fs-8 fw-semibold"
                                        >
                                            {option} leg{option > 1 && 's'}
                                        </Dropdown.Item>
                                    ))}
                                    {legModeOption === 'Best of' && boLegNumberOptions.values.map((option, idx) => (
                                        <Dropdown.Item
                                            key={idx}
                                            id={`number-of-legs-option-${idx}`}
                                            active={Number(numberOfLegsOption) === option}
                                            eventKey={option}
                                            className="w-100 fs-8 fw-semibold"
                                        >
                                            {option} leg{option > 1 && 's'}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default SetsLegsConfig;