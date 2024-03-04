import { useContext, useState, useEffect, Fragment } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { FaUndo } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa6";

import CricketContext from '../../../utils/cricket.context';
import CricketService from '../../../services/cricket.service';
import CricketDartBoard from './cricket.dartboard';
import ScoreInputBoardHelp from '../common/score.input.board.help';

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

    const keyfilterPattern = /^[SDT0-9]{1,3}$/;

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

    const validateInput = (event, validatePattern) => {
        const target = event.target;
        // validatePattern is the result of the regex against the whole input string
        if (validatePattern) {
            let throwIndex = Number(target.name.split('-')[1]) - 1;
            if (target.value.length > 0) {
                updateCurrentThrowManual(score, target.value, throwIndex);
            } else {
                updateCurrentThrowManual(score, '', throwIndex);
            }
        }
    };

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


    return (
        <Fragment>
            {!game.hasWinner && (
                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="col col-12 col-md-8 col-xl-5 col-xxl-4 d-flex justify-content-center justify-content-xxl-start">
                            <CricketDartBoard />
                        </div>
                        <div className="col col-12 col-md-4 col-xl-3 col-xxl-2 d-flex flex-column justify-content-start gap-3">
                            <div className="d-flex flex-column gap-1">
                                <ScoreInputBoardHelp />
                                <form className="mt-1" onSubmit={submitHandler}>
                                    <div className="d-flex flex-column gap-3">
                                        <div className="d-flex flex-column gap-2">
                                            <div className="p-inputgroup flex-1">
                                                <InputText
                                                    name="d-1"
                                                    placeholder="D1"
                                                    value={game.currentThrow[0]}
                                                    keyfilter={keyfilterPattern}
                                                    validateOnly
                                                    onInput={validateInput}
                                                    className="focused-bg-only"
                                                />
                                                <Button
                                                    type="button"
                                                    icon="pi pi-times"
                                                    className="p-button-danger"
                                                    onClick={() => updateCurrentThrowManual(score, '', 0)}
                                                />
                                            </div>
                                            {(game.currentThrow[1].trim() !== ''
                                                || (game.currentThrow[1].trim() === '' &&
                                                    (!checkIfAllSectionsClosed(sectionHit) || !checkIfScoreIsHighestScore(score))))
                                                && (
                                                    <div className="p-inputgroup flex-1">
                                                        <InputText
                                                            name="d-2"
                                                            placeholder="D2"
                                                            value={game.currentThrow[1]}
                                                            keyfilter={keyfilterPattern}
                                                            validateOnly
                                                            onInput={validateInput}
                                                            className="focused-bg-only"
                                                        />
                                                        <Button
                                                            type="button"
                                                            icon="pi pi-times"
                                                            className="p-button-danger"
                                                            onClick={() => updateCurrentThrowManual(score, '', 1)}
                                                        />
                                                    </div>
                                                )}
                                            {(game.currentThrow[2].trim() !== ''
                                                || (game.currentThrow[2].trim() === '' &&
                                                    (!checkIfAllSectionsClosed(sectionHit) || !checkIfScoreIsHighestScore(score))))
                                                && (
                                                    <div className="p-inputgroup flex-1">
                                                        <InputText
                                                            name="d-3"
                                                            placeholder="D3"
                                                            value={game.currentThrow[2]}
                                                            keyfilter={keyfilterPattern}
                                                            validateOnly
                                                            onInput={validateInput}
                                                            className="focused-bg-only"
                                                        />
                                                        <Button
                                                            type="button"
                                                            icon="pi pi-times"
                                                            className="p-button-danger"
                                                            onClick={() => updateCurrentThrowManual(score, '', 2)}
                                                        />
                                                    </div>
                                                )}
                                        </div>
                                        <div className="d-flex gap-2">
                                            {loading.validateThrow ? (
                                                <Button disabled>
                                                    <ProgressSpinner
                                                        style={{ width: '20px', height: '20px' }}
                                                        strokeWidth="8"
                                                        fill="var(--surface-ground)"
                                                        animationDuration=".8s"
                                                    />
                                                    <span className="visually-hidden">Loading...</span>
                                                </Button>
                                            ) : (
                                                <Button
                                                    id="submitThrows"
                                                    type="submit"
                                                    severity="primary"
                                                >
                                                    <FaPaperPlane />
                                                </Button>
                                            )}
                                            {game.allThrows.length !== 0 && (
                                                <Button
                                                    id="submitReturn"
                                                    severity="danger"
                                                    type="submit"
                                                >
                                                    <FaUndo />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default CricketScoreInputBoard