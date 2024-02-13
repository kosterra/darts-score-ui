import React, { useContext, useState, useEffect, Fragment } from 'react';

import CricketContext from '../../utils/cricket.context';
import CricketService from '../../services/cricket.service';

import CricketDartBoard from './cricket.dartboard';
import ScoreInputBoardModal from './score.input.board.modal';

import {
    Container,
    Row,
    Col,
    Form,
    InputGroup,
    Spinner,
    Modal,
    Button
} from 'react-bootstrap';

const CricketScoreInputBoard = () => {
    const {
        game,
        updateCurrentThrowManual,
        onClickValidateThrow,
        getCurrentThrowScore,
        getCurrentSectionHit,
        onClickReturnToPreviousPlayer,
        checkIfAllSectionsClosed,
        checkIfScoreIsHighestScore,
        loading
    } = useContext(CricketContext);

    const [score, setScore] = useState(game.startingScore);
    const [sectionHit, setSectionHit] = useState(game.playerModels[game.currentPlayerTurn].sectionHit);
    const [submit, setSubmit] = useState(false);

    useEffect(() => {
        const clickEnterSubmitForm = (e) => {
            if (e.key === 'Enter') {
                document.getElementById('submit-throws').click();
            }
        }

        document.addEventListener('keyup', clickEnterSubmitForm);

        return () => {
            document.removeEventListener('keyup', clickEnterSubmitForm);
        }
    }, []);

    useEffect(() => {
        setSectionHit(getCurrentSectionHit());
        setScore(getCurrentThrowScore());
        // eslint-disable-next-line
    }, [game.currentThrow]);

    useEffect(() => {
        if (submit) {
            setSubmit(false);
            CricketService.updateCricket(game);
        }
        // eslint-disable-next-line
    }, [game.currentPlayerTurn, game.hasWinner]);

    const handlers = {
        submitThrows: handleSubmitThrows,
        submitReturn: handleSubmitReturn,
    }

    const submitHandler = (e) => {
        const { id } = e.nativeEvent.submitter;
        handlers[id](e);
    };

    function handleSubmitThrows(e) {
        e.preventDefault();
        onClickValidateThrow(score, sectionHit);
        setSubmit(true);
        e.target.reset();
    }

    function handleSubmitReturn(e) {
        e.preventDefault();
        onClickReturnToPreviousPlayer();
        setSubmit(true);
        e.target.reset();
    }

    const onChange = (e) => {
        let throwIndex = Number(e.target.name.split('-')[1]) - 1;
        updateCurrentThrowManual(e.target.value, throwIndex);
    };

    return (
        <Fragment>
            {!game.hasWinner && (
                <Container fluid className="mt-3">
                    <Row className="gap-5 justify-content-center">
                        <Col className="d-flex justify-content-end col-6">
                            <CricketDartBoard />
                        </Col>
                        <Col className="col-4">
                            <ScoreInputBoardModal />
                            <Form className="mt-1" onSubmit={submitHandler}>
                                <div>
                                    <div>
                                        <div>
                                            <Fragment>
                                                <InputGroup className="mb-3 w-50">
                                                    <Form.Control
                                                        placeholder="D1"
                                                        aria-label="D1"
                                                        aria-describedby="d1-input"
                                                        value={game.currentThrow[0]}
                                                        onChange={onChange}
                                                        minLength={3}
                                                        maxLength={3}
                                                    />
                                                    <Button variant="red" id="d1-input">
                                                        <i onClick={() => updateCurrentThrowManual('', 0)} className="fas fa-minus-circle"></i>
                                                    </Button>
                                                </InputGroup>
                                            </Fragment>
                                        </div>
                                        <div>
                                            {(game.currentThrow[1].trim() !== ''
                                                || (game.currentThrow[1].trim() === '' &&
                                                (!checkIfAllSectionsClosed(sectionHit) || !checkIfScoreIsHighestScore(score))))
                                                && (
                                                    <Fragment>
                                                        <InputGroup className="mb-3 w-50">
                                                            <Form.Control
                                                                placeholder="D2"
                                                                aria-label="D2"
                                                                aria-describedby="d2-input"
                                                                value={game.currentThrow[1]}
                                                                onChange={onChange}
                                                                minLength={3}
                                                                maxLength={3}
                                                            />
                                                            <Button variant="red" id="d2-input">
                                                                <i onClick={() => updateCurrentThrowManual('', 1)} className="fas fa-minus-circle delete-dart-input"></i>
                                                            </Button>
                                                        </InputGroup>
                                                    </Fragment>
                                                )}
                                        </div>
                                        <div>
                                            {(game.currentThrow[2].trim() !== ''
                                                || (game.currentThrow[2].trim() === '' &&
                                                (!checkIfAllSectionsClosed(sectionHit) || !checkIfScoreIsHighestScore(score))))
                                                && (
                                                    <Fragment>
                                                        <InputGroup className="mb-3 w-50">
                                                            <Form.Control
                                                                placeholder="D3"
                                                                aria-label="D3"
                                                                aria-describedby="d3-input"
                                                                value={game.currentThrow[2]}
                                                                onChange={onChange}
                                                                minLength={3}
                                                                maxLength={3}
                                                            />
                                                            <Button variant="red" id="d3-input">
                                                                <i onClick={() => updateCurrentThrowManual('', 2)} className="fas fa-minus-circle delete-dart-input"></i>
                                                            </Button>
                                                        </InputGroup>
                                                    </Fragment>
                                                )}
                                        </div>
                                    </div>
                                    <div className="d-flex gap-2">
                                        {loading.validateThrow ? (
                                            <Button disabled>
                                                <Spinner as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />
                                                <span className="visually-hidden">Loading...</span>
                                            </Button>
                                        ) : (
                                            <Button
                                                id="submitThrows"
                                                type="submit"
                                                variant="primary"
                                            >
                                                <i className="fas fa-paper-plane" title='Send'></i>
                                            </Button>
                                        )}
                                        {game.allThrows.length !== 0 && (
                                            <Button
                                                id="submitReturn"
                                                variant="red"
                                                type="submit"
                                            >
                                                <i className="fas fa-undo-alt" title='Undo'></i>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            )}
        </Fragment>
    )
}

export default CricketScoreInputBoard