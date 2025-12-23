import ScoreConfigOptions from "../components/game_config/config_options/score.config.options";
import SetsLegsConfigOptions from "../components/game_config/config_options/sets.legs.config.options";
import PlayerConfigOptions from "../components/game_config/config_options/player.config.options";

const EliminationModel = {
    gameIsRunning: true,
    isSoloGame: false,
    hasWinner: false,
    targetScore: ScoreConfigOptions.gameScoreOptions.eliminationDefault,
    gameInMode: SetsLegsConfigOptions.legInOptions.default,
    gameOutMode: SetsLegsConfigOptions.legOutOptions.default,
    numberOfPlayers: PlayerConfigOptions.numberOfPlayerOptions.default,
    players: [],
    startingPlayer: '',
    currentPlayerTurn: '',
    currentThrow: ['', '', ''],
    playerModels: {}
}

const EliminationPlayerModel = {
    hasWonGame: false,
    score: 0,
    allThrows: {
        darts: 0,
        rounds: 0
    }
}

const EliminationModels = {
    EliminationModel,
    EliminationPlayerModel
}

export default EliminationModels;