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

class Team {
    constructor(name, players, aggression, attack, speed, defense, pace, isFavorite) {
        this.name = name;
        this.players = players;
        this.aggression = aggression;
        this.attack = attack;
        this.speed = speed;
        this.defense = defense;
        this.pace = pace;
        this.isFavorite = isFavorite;
    }
}

// Sample data for home team and away team
const homeTeamPlayers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

const awayTeamPlayers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

const homeTeam = new Team("Home Team", homeTeamPlayers, 60, 70, 80, 50, 90, true);
const awayTeam = new Team("Away Team", awayTeamPlayers, 50, 60, 70, 60, 80, false);


class Statistic {
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

class MatchSimulator {
    constructor(homeTeam, awayTeam, favoriteTeamAdvantage = 0.1) {
        this.matchStatistic = null;
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.match = this.simulateMatch();
        this.favoriteTeamAdvantage = favoriteTeamAdvantage;
        this.hasIncreasedProbability = false;
    }

    // hasIncreasedProbability = false;

    calculateTeamRating(team) {
        const aggressionRating = team.aggression / team.players.length;
        const attackRating = team.attack / team.players.length;
        const speedRating = team.speed / team.players.length;
        const defenseRating = team.defense / team.players.length;
        const paceRating = team.pace / team.players.length;

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
                }
                const stat = Math.floor(Math.random() * 10);
                switch (stat) {
                    case 0:
                        this.simulateShotsOnTarget(this.matchStatistic, homeTeamRating, awayTeamRating);
                        break;
                    case 1:
                        this.simulateFoul(this.matchStatistic, homeTeamRating, awayTeamRating);
                        break;
                    case 2:
                        this.simulateShotsOnTargetAlternate(this.matchStatistic, homeTeamRating, awayTeamRating);
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
            matchStatistic.homePossession++;
            matchStatistic.awayPossession--;
        }
    }

    simulatePossessionAlternate(matchStatistic) {
        if (matchStatistic.awayPossession < 75) {
            matchStatistic.awayPossession++;
            matchStatistic.homePossession--;
        }
    }

    // simulateGoal(matchStatistic, homeTeamRating, awayTeamRating) {
    //     let homeGoalProbability = (homeTeamRating.attack + homeTeamRating.speed) / 2;
    //     let awayGoalProbability = (awayTeamRating.attack + awayTeamRating.speed) / 2;

    //     // console.log(homeGoalProbability);
    //     // console.log(awayGoalProbability);

    //     // // Determine the chance of the favorite team scoring
    //     // let chanceToFavor = 0.6; // 60% chance for the favorite team to score
    //     // if (!this.homeTeam.isFavorite) {
    //     //     chanceToFavor = 1 - chanceToFavor; // Flip the chance for the away team
    //     // }

    //     // // if (Math.random() < chanceToFavor && !this.hasIncreasedProbability) {
    //     // //     homeGoalProbability *= 1.5; // Increase the favorite team's goal probability
    //     // //     this.hasIncreasedProbability = true; // Update flag variable
    //     // // } else /* if (Math.random() >= chanceToFavor && !this.hasIncreasedProbability) */ {
    //     // //     awayGoalProbability *= 1.5; // Increase the underdog's goal probability
    //     // //     this.hasIncreasedProbability = true; // Update flag variable
    //     // // }

    //     // if (Math.random() < homeGoalProbability / 10) {
    //     //     matchStatistic.homeGoals++;
    //     //     console.log(`Goal! ${matchStatistic.homeTeam} scored!`);
    //     // } else if (Math.random() < awayGoalProbability / 10) {
    //     //     matchStatistic.awayGoals++;
    //     //     console.log(`Goal! ${matchStatistic.awayTeam} scored!`);
    //     // } else {
    //     //     console.log("No action");
    //     // }

    //     let chanceToScore = Math.random(); // Random value between 0 and 1
    //     if (chanceToScore < 0.4) {
    //         // 40% chance for both teams to score
    //         homeGoalProbability *= 1.25;
    //         awayGoalProbability *= 1.25;
    //     } else if (chanceToScore < 0.7) {
    //         // 30% chance for only one team to score
    //         let favoriteTeam = this.homeTeam.isFavorite ? 'home' : 'away';
    //         if (Math.random() < 0.6) {
    //             // 60% chance for the favorite team to score
    //             if (favoriteTeam === 'home') {
    //                 homeGoalProbability *= 1.5;
    //             } else {
    //                 awayGoalProbability *= 1.5;
    //             }
    //         } else {
    //             // 40% chance for the underdog to score
    //             if (favoriteTeam === 'home') {
    //                 awayGoalProbability *= 1.5;
    //             } else {
    //                 homeGoalProbability *= 1.5;
    //             }
    //         }
    //     } // else 30% chance for no goals to be scored

    //     if (Math.random() < homeGoalProbability / 10) {
    //         matchStatistic.homeGoals++;
    //         console.log(`Goal! ${matchStatistic.homeTeam} scored!`);
    //     } else if (Math.random() < awayGoalProbability / 10) {
    //         matchStatistic.awayGoals++;
    //         console.log(`Goal! ${matchStatistic.awayTeam} scored!`);
    //     } else {
    //         console.log("No action");
    //     }

    // }

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
    

    // simulateGoal(matchStatistic) {
    //     let homeTeamChance = 0.5;
    //     let awayTeamChance = 0.5;

    //     // Modify goal-scoring chances based on favorite team
    //     if (this.homeTeam.isFavorite) {
    //         homeTeamChance += this.favoriteTeamAdvantage;
    //         awayTeamChance -= this.favoriteTeamAdvantage;
    //     } else if (this.awayTeam.isFavorite) {
    //         awayTeamChance += this.favoriteTeamAdvantage;
    //         homeTeamChance -= this.favoriteTeamAdvantage;
    //     }

    //     const randomNumber = Math.random();
    //     const scoringTeam = randomNumber < homeTeamChance ? matchStatistic.homeTeam : matchStatistic.awayTeam;

    //     // Increment the goals property in matchStatistic
    //     if (scoringTeam === matchStatistic.homeTeam) {
    //         matchStatistic.homeGoals++;
    //     } else {
    //         matchStatistic.awayGoals++;
    //     }

    //     // Log the goal event with the team who scored
    //     console.log(`Goal: ${scoringTeam}`);
    // }

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

    simulateShotsOnTarget(matchStatistic, homeTeamRating, awayTeamRating) {
        let team = Math.floor(Math.random() * 2) === 0 ? matchStatistic.homeTeam : matchStatistic.awayTeam;
        let scoringChance = team === matchStatistic.homeTeam
            ? homeTeamRating.attack + homeTeamRating.speed
            : awayTeamRating.attack + awayTeamRating.speed;

        // Increment the corresponding shots on target property in matchStatistic
        if (team === matchStatistic.homeTeam) {
            matchStatistic.homeShotsOnTarget++;
        } else {
            matchStatistic.awayShotsOnTarget++;
        }

        console.log(`Shot on target ${team}`);

        // // Simulate the chance of scoring a goal
        // const chanceOfGoal = Math.random();
        // if (chanceOfGoal <= scoringChance / 100) {
        //     console.log(`GOAL!!! ${team} scores from the shot on target!`);
        //     if (team === matchStatistic.homeTeam) {
        //         matchStatistic.homeGoals++;
        //     } else {
        //         matchStatistic.awayGoals++;
        //     }
        // } else {
        //     console.log(`No goal. The goalkeeper saves the shot.`);
        // }
    }

    simulateThrowIn(matchStatistic) {
        const team = Math.floor(Math.random() * 2) === 0 ? matchStatistic.homeTeam : matchStatistic.awayTeam;

        // Increment the corresponding throw-ins property in matchStatistic
        if (team === matchStatistic.homeTeam) {
            matchStatistic.homeThrowIns++;
        } else {
            matchStatistic.awayThrowIns++;
        }

        console.log(`Throw-in ${team}`);
    }

    simulateSubstitutions(matchStatistic) {
        const team = Math.floor(Math.random() * 2) === 0 ? matchStatistic.homeTeam : matchStatistic.awayTeam;

        // Increment the corresponding substitutions property in matchStatistic
        if (team === matchStatistic.homeTeam) {
            matchStatistic.homeSubstitutions++;
        } else {
            matchStatistic.awaySubstitutions++;
        }

        console.log(`Substitution ${team}`);
    }

    simulateShotsOnTargetAlternate(matchStatistic, homeTeamRating, awayTeamRating) {
        const team = Math.floor(Math.random() * 2) === 0 ? matchStatistic.homeTeam : matchStatistic.awayTeam;
        const scoringChance = team === matchStatistic.homeTeam
            ? homeTeamRating.attack + homeTeamRating.speed
            : awayTeamRating.attack + awayTeamRating.speed;

        // Increment the corresponding shots on target property in matchStatistic
        if (team === matchStatistic.homeTeam) {
            matchStatistic.homeShotsOnTarget++;
        } else {
            matchStatistic.awayShotsOnTarget++;
        }

        console.log(`Alternate shot on target ${team}`);

        // // Simulate the chance of scoring a goal
        // const chanceOfGoal = Math.random();
        // if (chanceOfGoal <= scoringChance / 100) {
        //     console.log(`GOAL!!! ${team} scores from the alternate shot on target!`);
        //     if (team === matchStatistic.homeTeam) {
        //         matchStatistic.homeGoals++;
        //     } else {
        //         matchStatistic.awayGoals++;
        //     }
        // } else {
        //     console.log(`No goal. The goalkeeper saves the alternate shot.`);
        // }
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


const matchSimulator = new MatchSimulator(homeTeam, awayTeam);
console.log(matchSimulator.match)