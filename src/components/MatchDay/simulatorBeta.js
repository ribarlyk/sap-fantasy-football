export class Team {
    constructor(name, players, isFavorite) {
        this.name = name;
        this.players = players;
    }
}

export class Statistic {
    constructor(homeTeam, awayTeam) {
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.homeGoals = 0;
        this.awayGoals = 0;
        this.homePossession = 50;
        this.awayPossession = 50;
        this.homeShotsOnTarget = 0;
        this.awayShotsOnTarget = 0;
        this.homeFouls = 0;
        this.awayFouls = 0;
        this.homeYellowCards = 0;
        this.awayYellowCards = 0;
        this.homeRedCards = 0;
        this.awayRedCards = 0;
        this.homeSubstitutions = 0;
        this.awaySubstitutions = 0;
        this.homeCornerKicks = 0;
        this.awayCornerKicks = 0;
        this.homeThrowIns = 0;
        this.awayThrowIns = 0;
    }
}

export default class MatchSimulator {
    constructor(homeTeam, awayTeam, logCallback) {
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.homeTeamRating = this.calculateTeamRating(this.homeTeam);
        this.awayTeamRating = this.calculateTeamRating(this.awayTeam);
        this.favoriteTeam = this.determineFavoriteTeam();
        this.matchStatistic = null;
        this.match = this.simulateMatch();
        this.hasIncreasedProbability = false;
        this.logCallback = logCallback;
    }
    determineFavoriteTeam() {
        const homeTotalRating = Object.values(this.homeTeamRating).reduce(
            (acc, val) => acc + val,
            0
        );
        const awayTotalRating = Object.values(this.awayTeamRating).reduce(
            (acc, val) => acc + val,
            0
        );

        if (homeTotalRating > awayTotalRating) {
            this.homeTeam.isFavorite = true;
            this.awayTeam.isFavorite = false;
            return this.homeTeam;
        } else {
            this.homeTeam.isFavorite = false;
            this.awayTeam.isFavorite = true;
            return this.awayTeam;
        }
    }

    average(attribute, players) {
        const sum = players?.reduce(
            (acc, player) => acc + player[attribute],
            0
        );
        return sum / players?.length;
    }

    calculateTeamRating(team) {
        const aggressionRating = this.average("agression", team.players);
        const attackRating = this.average("attack", team.players);
        const speedRating = this.average("speed", team.players);
        const defenseRating = this.average("defense", team.players);
        const paceRating = this.average("pace", team.players);

        return {
            agression: aggressionRating,
            attack: attackRating,
            speed: speedRating,
            defense: defenseRating,
            pace: paceRating,
        };
    }

    simulateMatch() {
        this.matchStatistic = new Statistic(
            this.homeTeam.name,
            this.awayTeam.name
        );
        let timer;
        const homeTeamRating = this.calculateTeamRating(this.homeTeam);
        const awayTeamRating = this.calculateTeamRating(this.awayTeam);

        let seconds = 0;
        timer = setInterval(() => {
            seconds++;
            if (seconds === 90) {
                this.log(
                    `Match over: ${this.matchStatistic.homeTeam} ${this.matchStatistic.homeGoals} - ${this.matchStatistic.awayGoals} ${this.matchStatistic.awayTeam}`
                );
                this.isMatchOver = true;
                clearInterval(timer);
            } else {
                if (seconds % 10 === 0) {
                    if (Math.random() < 0.5) {
                        this.simulatePossession(this.matchStatistic);
                    } else {
                        this.simulatePossessionAlternate(this.matchStatistic);
                    }
                    this.log(
                        `${seconds} Possession: ${this.matchStatistic.homeTeam} ${this.matchStatistic.homePossession}% - ${this.matchStatistic.awayPossession}% ${this.matchStatistic.awayTeam}`
                    );
                }
                const stat = Math.floor(Math.random() * 10);
                switch (stat) {
                    case 0:
                        this.simulateShotsOnTarget(
                            this.matchStatistic,
                            seconds
                        );
                        break;
                    case 1:
                        this.simulateFoul(
                            this.matchStatistic,
                            homeTeamRating,
                            awayTeamRating,
                            seconds
                        );
                        break;
                    case 2:
                        this.simulateShotsOnTargetAlternate(
                            this.matchStatistic,
                            seconds
                        );
                        break;
                    case 3:
                        this.simulateGoal(
                            this.matchStatistic,
                            homeTeamRating,
                            awayTeamRating,
                            seconds
                        );
                        break;
                    case 4:
                        this.simulateSubstitutions(
                            this.matchStatistic,
                            seconds
                        );
                        break;
                    case 5:
                        this.simulateCornerKick(
                            this.matchStatistic,
                            homeTeamRating,
                            awayTeamRating,
                            seconds
                        );
                        break;
                    case 6:
                        this.simulateThrowIn(this.matchStatistic, seconds);
                        break;
                    default:
                        break;
                }
            }
        }, 200);
    }

    simulatePossession(matchStatistic) {
        if (matchStatistic.homePossession < 75) {
            matchStatistic.homePossession += 5;
            matchStatistic.awayPossession -= 5;
        }
    }

    simulatePossessionAlternate(matchStatistic) {
        if (matchStatistic.awayPossession < 75) {
            matchStatistic.awayPossession += 5;
            matchStatistic.homePossession -= 5;
        }
    }

    simulateGoal(matchStatistic, homeTeamRating, awayTeamRating, seconds) {
        let homeGoalProbability =
            (homeTeamRating.attack + homeTeamRating.speed) / 2;
        let awayGoalProbability =
            (awayTeamRating.attack + awayTeamRating.speed) / 2;

        let chanceToScore = Math.random();
        if (chanceToScore < 0.5) {
            homeGoalProbability *= 1.2;
            awayGoalProbability *= 1.2;
        } else if (chanceToScore < 0.7) {
            let favoriteTeam = this.homeTeam.isFavorite ? "home" : "away";
            if (Math.random() < 0.5 + this.favoriteTeamAdvantage) {
                if (favoriteTeam === "home") {
                    homeGoalProbability *= 1.25;
                } else {
                    awayGoalProbability *= 1.25;
                }
            } else {
                if (favoriteTeam === "away") {
                    awayGoalProbability *= 1.25;
                } else {
                    homeGoalProbability *= 1.25;
                }
            }
        }

        if (Math.random() < homeGoalProbability / 10) {
            matchStatistic.homeGoals++;
            this.log(`${seconds} Goal! ${matchStatistic.homeTeam} scored!`);
            return `Goal! ${matchStatistic.homeTeam} scored!`;
        } else if (Math.random() < awayGoalProbability / 10) {
            matchStatistic.awayGoals++;
            this.log(`${seconds} Goal! ${matchStatistic.awayTeam} scored!`);
            return `Goal! ${matchStatistic.awayTeam} scored!`;
        } else {
            return `${seconds} No action`;
        }
    }

    simulateCornerKick(
        matchStatistic,
        homeTeamRating,
        awayTeamRating,
        seconds
    ) {
        let team =
            Math.floor(Math.random() * 2) === 0
                ? matchStatistic.homeTeam
                : matchStatistic.awayTeam;
        let scoringChance =
            team === matchStatistic.homeTeam
                ? homeTeamRating.attack + homeTeamRating.speed
                : awayTeamRating.attack + awayTeamRating.speed;

        if (team === matchStatistic.homeTeam) {
            matchStatistic.homeCornerKicks++;
        } else {
            matchStatistic.awayCornerKicks++;
        }

        this.log(`${seconds} Corner ${team}`);

        let chanceOfGoal = Math.random();

        if (chanceOfGoal <= scoringChance / 100) {
            this.log(`${seconds} GOAL!!! ${team} scores from the corner kick!`);
            if (team === matchStatistic.homeTeam) {
                matchStatistic.homeGoals++;
            } else {
                matchStatistic.awayGoals++;
            }
        } else {
            let defendingChance = Math.random();
            if (defendingChance <= 0.5) {
                this.log(
                    `${seconds} The goalkeeper catches the ball from the corner kick`
                );
            } else {
                this.log(
                    `${seconds} One of the defenders clears the ball from the corner kick`
                );
            }
        }
    }

    simulateShotsOnTarget(matchStatistic, seconds) {
        let team =
            Math.floor(Math.random() * 2) === 0
                ? matchStatistic.homeTeam
                : matchStatistic.awayTeam;

        if (team === matchStatistic.homeTeam) {
            matchStatistic.homeShotsOnTarget++;
        } else {
            matchStatistic.awayShotsOnTarget++;
        }

        this.log(`${seconds} Shot on target ${team}`);
    }

    simulateThrowIn(matchStatistic, seconds) {
        const team =
            Math.floor(Math.random() * 2) === 0
                ? matchStatistic.homeTeam
                : matchStatistic.awayTeam;

        if (team === matchStatistic.homeTeam) {
            matchStatistic.homeThrowIns++;
        } else {
            matchStatistic.awayThrowIns++;
        }

        this.log(`${seconds} Throw-in ${team}`);
    }

    simulateSubstitutions(matchStatistic, seconds) {
        if(matchStatistic.homeSubstitutions > 5 || matchStatistic.awaySubstitutions > 5 ) {
            return
        }

        const team =
            Math.floor(Math.random() * 2) === 0
                ? matchStatistic.homeTeam
                : matchStatistic.awayTeam;

        if (team === matchStatistic.homeTeam) {
            matchStatistic.homeSubstitutions++;
        } else {
            matchStatistic.awaySubstitutions++;
        }

        this.log(`${seconds} Substitution ${team}`);
    }

    simulateShotsOnTargetAlternate(matchStatistic, seconds) {
        const team =
            Math.floor(Math.random() * 2) === 0
                ? matchStatistic.homeTeam
                : matchStatistic.awayTeam;

        if (team === matchStatistic.homeTeam) {
            matchStatistic.homeShotsOnTarget++;
        } else {
            matchStatistic.awayShotsOnTarget++;
        }

        this.log(`${seconds} Alternate shot on target ${team}`);
    }

    simulateFoul(matchStatistic, homeTeamRating, awayTeamRating, seconds) {

        const team =
            Math.floor(Math.random() * 2) === 0
                ? matchStatistic.homeTeam
                : matchStatistic.awayTeam;
        const aggression =
            team === matchStatistic.homeTeam
                ? homeTeamRating.agression
                : awayTeamRating.agression;

        if (team === matchStatistic.homeTeam) {
            matchStatistic.homeFouls++;
        } else {
            matchStatistic.awayFouls++;
        }
        this.log(`${seconds} Foul committed by ${team}`);
        const chanceOfCard = Math.random();
        if (chanceOfCard.toFixed(2) <= (aggression / 10).toFixed(2)) {
            const cardType = Math.random() < 0.9 ? "yellow" : "red";
            this.log(`${seconds} ${team} receives a ${cardType} card.`);

            if (team === matchStatistic.homeTeam) {
                if (cardType === "yellow") {
                    matchStatistic.homeYellowCards++;
                } else {
                    matchStatistic.homeRedCards++;
                }
            } else {
                if (cardType === "yellow") {
                    matchStatistic.awayYellowCards++;
                } else {
                    matchStatistic.awayRedCards++;
                }
            }
        } else {
            this.log(`${seconds} No card given.`);
        }
    }

    log(message, seconds) {
        if (this.logCallback) {
            this.logCallback(message, seconds);
        }
    }
}
