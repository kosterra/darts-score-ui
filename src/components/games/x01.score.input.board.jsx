import React, { useContext, useState, useEffect, Fragment } from 'react';

import X01Context from '../../utils/x01.context';
import X01Service from '../../services/x01.service';

import X01DartBoard from './x01.dartboard';
import Checkout from './x01.checkout';
import checkout from '../../utils/checkout';
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

const X01ScoreInputBoard = () => {
    const {
        game,
        updateCurrentThrowManual,
        onClickValidateThrow,
        getCurrentThrowScore,
        onClickReturnToPreviousPlayer,
        loading
    } = useContext(X01Context);

    const [score, setScore] = useState(game.startingScore);
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
        let totalScore = getCurrentThrowScore();
        let currentPlayerScore = game.playerModels[game.currentPlayerTurn].score;
        let newCurrentScore = currentPlayerScore - totalScore;
        setScore(newCurrentScore);

        // eslint-disable-next-line
    }, [game.currentThrow]);

    useEffect(() => {
        if (submit) {
            setSubmit(false);
            X01Service.updateX01(game);
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
        onClickValidateThrow(score);
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
        updateCurrentThrowManual(score, e.target.value, throwIndex);
    };

    return (
        <Fragment>
            {!game.hasWinner && (
                <Container fluid className="mt-4">
                    <Row className="gap-5 justify-content-center">
                        <Col className="d-flex justify-content-end col-6">
                            <X01DartBoard />
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
                                                        name="d-1"
                                                        placeholder="D1"
                                                        aria-label="D1"
                                                        aria-describedby="d1-input"
                                                        value={game.currentThrow[0]}
                                                        onChange={onChange}
                                                        minLength={3}
                                                        maxLength={3}
                                                    />
                                                    <Button variant="red" id="d1-input" onClick={() => updateCurrentThrowManual(score, '', 0)}>
                                                        <i className="fas fa-minus-circle"></i>
                                                    </Button>
                                                </InputGroup>
                                            </Fragment>
                                        </div>
                                        <div>
                                            {((score !== 1 && score > 0) ||
                                                game.currentThrow[1].trim() !== '' ||
                                                (game.currentThrow[1].trim() === '' && game.currentThrow[2].trim() !== '')) && (
                                                    <Fragment>
                                                        <InputGroup className="mb-3 w-50">
                                                            <Form.Control
                                                                name="d-2"
                                                                placeholder="D2"
                                                                aria-label="D2"
                                                                aria-describedby="d2-input"
                                                                value={game.currentThrow[1]}
                                                                onChange={onChange}
                                                                minLength={3}
                                                                maxLength={3}
                                                            />
                                                            <Button variant="red" id="d2-input" onClick={() => updateCurrentThrowManual(score, '', 1)}>
                                                                <i className="fas fa-minus-circle delete-dart-input"></i>
                                                            </Button>
                                                        </InputGroup>
                                                    </Fragment>
                                                )}
                                        </div>
                                        <div>
                                            {((score !== 1 && score > 0) || game.currentThrow[2].trim() !== '') && (
                                                <Fragment>
                                                    <InputGroup className="mb-3 w-50">
                                                        <Form.Control
                                                            name="d-3"
                                                            placeholder="D3"
                                                            aria-label="D3"
                                                            aria-describedby="d3-input"
                                                            value={game.currentThrow[2]}
                                                            onChange={onChange}
                                                            minLength={3}
                                                            maxLength={3}
                                                        />
                                                        <Button variant="red" id="d3-input" onClick={() => updateCurrentThrowManual(score, '', 2)}>
                                                            <i className="fas fa-minus-circle delete-dart-input"></i>
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
                                        {game.currentLegThrows.length !== 0 && (
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
                            {checkout[score] && (
                                <Checkout score={score} />
                            )}
                        </Col>
                    </Row>
                </Container>
            )}
        </Fragment>
    )
}

export default X01ScoreInputBoard