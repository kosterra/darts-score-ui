import React, { useContext, useState, useEffect } from 'react';

import Avatar from 'react-avatar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import X01Context from '../../../utils/x01.context';

const X01ScoreBoard = (props) => {
    const { playerId, idx } = props
    const {
        game,
        players,
        getCurrentThrowScore
    } = useContext(X01Context);

    const [ player ] = useState(players.find(player => player.id === playerId));
    const [ playerModel, setPlayerModel] = useState(game.playerModels[playerId]);
    const [ score, setScore ] = useState(game.playerModels[playerId].score);

    useEffect(() => {
		const clickEnterSubmitForm = (e) => {
			if(e.key === 'Enter') {
				document.getElementById('submit-throws').click();
			}
		}

		document.addEventListener('keyup', clickEnterSubmitForm);

		return () => {
			document.removeEventListener('keyup', clickEnterSubmitForm);
		}
	}, [])

	useEffect(() => {
        let totalScore = getCurrentThrowScore();
        let currentPlayerScore = game.playerModels[game.currentPlayerTurn].score;
        let newCurrentScore = currentPlayerScore - totalScore;
        setScore(newCurrentScore);
        setPlayerModel(game.playerModels[playerId])
    // eslint-disable-next-line
	},[ game.currentThrow ]);

    return (
        <Container>
            {players && player &&
                <Row className={`justify-content-md-center pt-2 pb-2 ${game.players.length === 2 && Number(idx) === 1 ? 'flex-row-reverse' : ''}`}>
                    <Col className="d-flex flex-column justify-content-center">
                        <Row className="align-items-center h-100">
                            <Col className="d-flex justify-content-center">
                                <div>
                                    <div className="d-flex justify-content-center display-3 fw-600 mb-2">
                                        <Avatar
                                            name={ player.firstname + ' ' + player.lastname }
                                            src={ player.profileImg }
                                            size="80"
                                            round={ true }
                                            color="#565656"
                                            textSizeRatio={ 0.2 }
                                            className="align-self-center"
                                        />
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <span className="fs-5 fw-600">{ player.nickname }</span>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <span className="fs-7">{player.firstname + ' ' + player.lastname}</span>
                                    </div>
                                    <div  className="d-flex justify-content-center">
                                        { game.startingPlayerLeg === playerId && (
                                            <i className="fas fa-circle text-blue m-02 mt-2"></i>
                                        )}
                                        { game.currentPlayerTurn === playerId && (
                                            <i className="fas fa-circle text-light-green m-02 mt-2"></i>
                                        )}
                                        { game.startingPlayerLeg !== playerId && game.currentPlayerTurn !== playerId && (
                                            <i className="fas fa-circle fc-transparent m-02 mt-2"></i>
                                        )}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="p-0">
                        <div className="d-flex justify-content-center align-items-center h-50">
                            <div className="display-3 fw-600 mt-3" >
                                { game.currentPlayerTurn === playerId ?
                                    score === 1 || score < 0 ? 'BUST' : score : playerModel.score
                                }
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center gap-3 h-50">
                            <div>
                                <div className="d-flex justify-content-center fw-600 mb-02">
                                    LEGS
                                </div>
                                {game.numberOfLegs <= 5 && game.legMode === 'Best of' &&
                                    <div className="d-flex justify-content-center fs-8">
                                        {[...Array(game.playerModels[playerId].currentSetLegsWon)].map((e, i) => (
                                            <i key={`leg-filled-${i}`} className="fas fa-circle m-01 text-gold"></i>
                                        ))}
                                        {[...Array(Math.round(game.numberOfLegs / 2) - game.playerModels[playerId].currentSetLegsWon)].map((e, i) => (
                                            <i key={`leg-unfilled-${i}`} className="far fa-circle m-01 text-gold"></i>
                                        ))}
                                    </div>
                                }
                                {game.numberOfLegs <= 4 && game.legMode === 'First to' &&
                                    <div className="d-flex justify-content-center fs-8">
                                        {[...Array(game.playerModels[playerId].currentSetLegsWon)].map((e, i) => (
                                            <i key={`set-filled-${i}`} className="fas fa-circle m-01 text-gold"></i>
                                        ))}
                                        {[...Array(game.numberOfLegs - game.playerModels[playerId].currentSetLegsWon)].map((e, i) => (
                                            <i key={`leg-unfilled-${i}`} className="far fa-circle m-01 text-gold"></i>
                                        ))}
                                    </div>
                                }
                                {((game.numberOfLegs > 4 && game.legMode === 'First to') || (game.numberOfLegs > 5 && game.legMode === 'Best of')) &&
                                    <div className="d-flex justify-content-center">
                                        <span className="text-value">{game.playerModels[playerId].currentSetLegsWon}</span>
                                    </div>
                                }
                            </div>
                            <div>
                                <div className="d-flex justify-content-center fw-600 mb-02">
                                    SETS
                                </div>
                                {game.numberOfSets <= 5 && game.setMode === 'Best of' &&
                                    <div className="d-flex justify-content-center fs-8">
                                        {[...Array(game.playerModels[playerId].setsWon)].map((e, i) => (
                                            <i key={`set-filled-${i}`} className="fas fa-circle m-01 text-gold"></i>
                                        ))}
                                        {[...Array(Math.round(game.numberOfSets / 2) - game.playerModels[playerId].setsWon)].map((e, i) => (
                                            <i key={`set-unfilled-${i}`} className="far fa-circle m-01 text-gold"></i>
                                        ))}
                                    </div>
                                }
                                {game.numberOfSets <= 4 && game.setMode === 'First to' &&
                                    <div className="d-flex justify-content-center fs-8">
                                        {[...Array(game.playerModels[playerId].setsWon)].map((e, i) => (
                                            <i key={`set-filled-${i}`} className="fas fa-circle m-01 text-gold"></i>
                                        ))}
                                        {[...Array(game.numberOfSets - game.playerModels[playerId].setsWon)].map((e, i) => (
                                            <i key={`set-unfilled-${i}`} className="far fa-circle m-01 text-gold"></i>
                                        ))}
                                    </div>
                                }
                                {((game.numberOfSets > 4 && game.setMode === 'First to') || (game.numberOfSets > 5 && game.setMode === 'Best of')) && 
                                    <div className="d-flex justify-content-center">
                                        <span className="text-value">{game.playerModels[playerId].setsWon}</span>
                                    </div>
                                }
                            </div>
                        </div>
                    </Col>
                </Row>
            }
        </Container>
    );
}

export default X01ScoreBoard