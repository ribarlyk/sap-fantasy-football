// class Team {
//     constructor(name, players) {
//       this.name = name;
//       this.players = players;
//     }

// FUNC THAT CALCULATES THE ATRIBUTES 
//     average(attribute) {
//       const sum = this.players.reduce((acc, player) => acc + player[attribute], 0);
//       return sum / this.players.length;
// }

// class Player {
//     constructor(aggression, attack, defense, pace, speed) {
//         this.aggression = aggression;
//         this.attack = attack;
//         this.defense = defense;
//         this.pace = pace;
//         this.speed = speed;
//     }
// }

export class Team {
    constructor(name, players, isFavorite) {
        this.name = name;
        this.players = players;
    }
}

// function generateSamplePlayers() {
//     let players = [];
//     for (let i = 0; i < 17; i++) {
//         const player = new Player(
//             Math.floor(Math.random() * 10),
//             Math.floor(Math.random() * 10),
//             Math.floor(Math.random() * 10),
//             Math.floor(Math.random() * 10),
//             Math.floor(Math.random() * 10)
//         );
//         players.push(player);
//     }
//     return players;
// }

// // Sample data for home team and away team
// const homeTeamPlayers = generateSamplePlayers();
// const awayTeamPlayers = generateSamplePlayers();

// const homeTeam = new Team("Home Team", homeTeamPlayers);
// const awayTeam = new Team("Away Team", awayTeamPlayers);


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
    constructor(homeTeam, awayTeam) {
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.homeTeamRating = this.calculateTeamRating(this.homeTeam);
        this.awayTeamRating = this.calculateTeamRating(this.awayTeam);
        this.favoriteTeam = this.determineFavoriteTeam();
        this.matchStatistic = null;
        this.match = this.simulateMatch();
        this.hasIncreasedProbability = false;
    }
    determineFavoriteTeam() {
        const homeTotalRating = Object.values(this.homeTeamRating).reduce((acc, val) => acc + val, 0);
        const awayTotalRating = Object.values(this.awayTeamRating).reduce((acc, val) => acc + val, 0);

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

    // hasIncreasedProbability = false;
    // FUNC THAT CALCULATES THE ATRIBUTES 
    average(attribute, players) {
        const sum = players.reduce((acc, player) => acc + player[attribute], 0);
        return sum / players.length;
    }
    // hasIncreasedProbability = false;

    calculateTeamRating(team) {
        const aggressionRating = this.average('aggression', team.players);
        const attackRating = this.average('attack', team.players);
        const speedRating = this.average('speed', team.players);
        const defenseRating = this.average('defense', team.players);
        const paceRating = this.average('pace', team.players);

        return {
            aggression: aggressionRating,
            attack: attackRating,
            speed: speedRating,
            defense: defenseRating,
            pace: paceRating,
        };
    }



    simulateMatch() {
        this.matchStatistic = new Statistic(this.homeTeam.name, this.awayTeam.name);
        let timer;
        const homeTeamRating = this.calculateTeamRating(this.homeTeam);
        const awayTeamRating = this.calculateTeamRating(this.awayTeam);

        let seconds = 0;
        timer = setInterval(() => {
            seconds++;
            if (seconds === 90) {
                console.log(`Match over: ${this.matchStatistic.homeTeam} ${this.matchStatistic.homeGoals} - ${this.matchStatistic.awayGoals} ${this.matchStatistic.awayTeam}`);
                this.isMatchOver = true;
                clearInterval(timer)
            } else {
                if (seconds % 10 === 0) {
                    if (Math.random() < 0.5) {
                        this.simulatePossession(this.matchStatistic);
                    } else {
                        this.simulatePossessionAlternate(this.matchStatistic);
                    }
                    console.log(`Possession: ${this.matchStatistic.homeTeam} ${this.matchStatistic.homePossession}% - ${this.matchStatistic.awayPossession}% ${this.matchStatistic.awayTeam}`);
                }
                const stat = Math.floor(Math.random() * 10);
                switch (stat) {
                    case 0:
                        this.simulateShotsOnTarget(this.matchStatistic);
                        break;
                    case 1:
                        this.simulateFoul(this.matchStatistic, homeTeamRating, awayTeamRating);
                        break;
                    case 2:
                        this.simulateShotsOnTargetAlternate(this.matchStatistic);
                        break;
                    case 3:
                        this.simulateGoal(this.matchStatistic, homeTeamRating, awayTeamRating);
                        break;
                    case 4:
                        this.simulateSubstitutions(this.matchStatistic);
                        break;
                    case 5:
                        this.simulateCornerKick(this.matchStatistic, homeTeamRating, awayTeamRating);
                        break;
                    case 6:
                        this.simulateThrowIn(this.matchStatistic);
                        break;
                    default:
                        break;
                }
            }
        }, 1000);
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

    simulateGoal(matchStatistic, homeTeamRating, awayTeamRating) {
        let homeGoalProbability = (homeTeamRating.attack + homeTeamRating.speed) / 2;
        let awayGoalProbability = (awayTeamRating.attack + awayTeamRating.speed) / 2;

        let chanceToScore = Math.random(); // Random value between 0 and 1
        if (chanceToScore < 0.4) {
            // 40% chance for both teams to score
            homeGoalProbability *= 1.25;
            awayGoalProbability *= 1.25;
        } else if (chanceToScore < 0.7) {
            // 30% chance for only one team to score
            let favoriteTeam = this.homeTeam.isFavorite ? 'home' : 'away';
            if (Math.random() < 0.5 + this.favoriteTeamAdvantage) {
                // Adjusted chance for the favorite team to score
                if (favoriteTeam === 'home') {
                    homeGoalProbability *= 1.25;
                } else {
                    awayGoalProbability *= 1.25;
                }
            } else {
                // Adjusted chance for the underdog to score
                if (favoriteTeam === 'away') {
                    awayGoalProbability *= 1.25;
                } else {
                    homeGoalProbability *= 1.25;
                }
            }
        } // else 30% chance for no goals to be scored

        if (Math.random() < homeGoalProbability / 10) {
            matchStatistic.homeGoals++;
            console.log(`Goal! ${matchStatistic.homeTeam} scored!`);
        } else if (Math.random() < awayGoalProbability / 10) {
            matchStatistic.awayGoals++;
            console.log(`Goal! ${matchStatistic.awayTeam} scored!`);
        } else {
            console.log("No action");
        }
    }


    simulateCornerKick(matchStatistic, homeTeamRating, awayTeamRating) {
        let team = Math.floor(Math.random() * 2) === 0 ? matchStatistic.homeTeam : matchStatistic.awayTeam;
        let scoringChance = team === matchStatistic.homeTeam
            ? homeTeamRating.attack + homeTeamRating.speed
            : awayTeamRating.attack + awayTeamRating.speed;

        // Increment the corresponding corner kick property in matchStatistic
        if (team === matchStatistic.homeTeam) {
            matchStatistic.homeCornerKicks++;
        } else {
            matchStatistic.awayCornerKicks++;
        }

        // Simulate the chance of scoring a goal
        console.log(`Corner ${team}`);

        let chanceOfGoal = Math.random();

        if (chanceOfGoal <= scoringChance / 100) {
            console.log(`GOAL!!! ${team} scores from the corner kick!`);
            if (team === matchStatistic.homeTeam) {
                matchStatistic.homeGoals++;
            } else {
                matchStatistic.awayGoals++;
            }
        } else {
            // Simulate the defending team's outcome
            let defendingChance = Math.random();
            if (defendingChance <= 0.5) {
                console.log(`The goalkeeper catches the ball from the corner kick`);
            } else {
                console.log(`One of the defenders clears the ball from the corner kick`);
            }
        }
    }

    simulateShotsOnTarget(matchStatistic) {
        let team = Math.floor(Math.random() * 2) === 0 ? matchStatistic.homeTeam : matchStatistic.awayTeam;

        // Increment the corresponding shots on target property in matchStatistic
        if (team === matchStatistic.homeTeam) {
            matchStatistic.homeShotsOnTarget++;
        } else {
            matchStatistic.awayShotsOnTarget++;
        }

        console.log(`Shot on target ${team}`);

    }

    simulateThrowIn(matchStatistic) {
        const team = Math.floor(Math.random() * 2) === 0 ? matchStatistic.homeTeam : matchStatistic.awayTeam;

        if (team === matchStatistic.homeTeam) {
            matchStatistic.homeThrowIns++;
        } else {
            matchStatistic.awayThrowIns++;
        }

        console.log(`Throw-in ${team}`);
    }

    simulateSubstitutions(matchStatistic) {
        const team = Math.floor(Math.random() * 2) === 0 ? matchStatistic.homeTeam : matchStatistic.awayTeam;

        if (team === matchStatistic.homeTeam) {
            matchStatistic.homeSubstitutions++;
        } else {
            matchStatistic.awaySubstitutions++;
        }

        console.log(`Substitution ${team}`);
    }

    simulateShotsOnTargetAlternate(matchStatistic) {
        const team = Math.floor(Math.random() * 2) === 0 ? matchStatistic.homeTeam : matchStatistic.awayTeam;

        if (team === matchStatistic.homeTeam) {
            matchStatistic.homeShotsOnTarget++;
        } else {
            matchStatistic.awayShotsOnTarget++;
        }

        console.log(`Alternate shot on target ${team}`);
    }

    simulateFoul(matchStatistic, homeTeamRating, awayTeamRating) {
        const team = Math.floor(Math.random() * 2) === 0 ? matchStatistic.homeTeam : matchStatistic.awayTeam;
        const aggression = team === matchStatistic.homeTeam
            ? homeTeamRating.aggression
            : awayTeamRating.aggression;

        // Increment the corresponding fouls property in matchStatistic
        if (team === matchStatistic.homeTeam) {
            matchStatistic.homeFouls++;
        } else {
            matchStatistic.awayFouls++;
        }

        console.log(`Foul committed by ${team}`);

        // Simulate the chance of getting a yellow or red card
        const chanceOfCard = Math.random();
        if (chanceOfCard <= aggression / 100) {
            const cardType = Math.random() < 0.9 ? 'yellow' : 'red';
            console.log(`${team} receives a ${cardType} card.`);

            if (team === matchStatistic.homeTeam) {
                if (cardType === 'yellow') {
                    matchStatistic.homeYellowCards++;
                } else {
                    matchStatistic.homeRedCards++;
                }
            } else {
                if (cardType === 'yellow') {
                    matchStatistic.awayYellowCards++;
                } else {
                    matchStatistic.awayRedCards++;
                }
            }
        } else {
            console.log(`No card given.`);
        }
    }


}

// const matchSimulator = new MatchSimulator(homeTeam, awayTeam);
// console.log(matchSimulator.match)