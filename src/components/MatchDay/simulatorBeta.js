import React, { useState, useEffect } from 'react';

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
        const aggressionRating = this.average('agression', team.players);
        const attackRating = this.average('attack', team.players);
        const speedRating = this.average('speed', team.players);
        const defenseRating = this.average('defense', team.players);
        const paceRating = this.average('pace', team.players);

        return {
            agression: aggressionRating,
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
                this.log(`Match over: ${this.matchStatistic.homeTeam} ${this.matchStatistic.homeGoals} - ${this.matchStatistic.awayGoals} ${this.matchStatistic.awayTeam}`);
                this.isMatchOver = true;
                clearInterval(timer)
            } else {
                if (seconds % 10 === 0) {
                    if (Math.random() < 0.5) {
                        this.simulatePossession(this.matchStatistic);
                    } else {
                        this.simulatePossessionAlternate(this.matchStatistic);
                    }
                    this.log( `${seconds} Possession: ${this.matchStatistic.homeTeam} ${this.matchStatistic.homePossession}% - ${this.matchStatistic.awayPossession}% ${this.matchStatistic.awayTeam}`);
                }
                const stat = Math.floor(Math.random() * 10);
                switch (stat) {
                    case 0:
                        this.simulateShotsOnTarget(this.matchStatistic, seconds);
                        break;
                    case 1:
                        this.simulateFoul(this.matchStatistic, homeTeamRating, awayTeamRating, seconds);
                        break;
                    case 2:
                        this.simulateShotsOnTargetAlternate(this.matchStatistic, seconds);
                        break;
                    case 3:
                        this.simulateGoal(this.matchStatistic, homeTeamRating, awayTeamRating, seconds);
                        break;
                    case 4:
                        this.simulateSubstitutions(this.matchStatistic, seconds);
                        break;
                    case 5:
                        this.simulateCornerKick(this.matchStatistic, homeTeamRating, awayTeamRating, seconds);
                        break;
                    case 6:
                        this.simulateThrowIn(this.matchStatistic, seconds);
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

    simulateGoal(matchStatistic, homeTeamRating, awayTeamRating, seconds) {
        let homeGoalProbability = (homeTeamRating.attack + homeTeamRating.speed) / 2;
        let awayGoalProbability = (awayTeamRating.attack + awayTeamRating.speed) / 2;

        let chanceToScore = Math.random(); // Random value between 0 and 1
        if (chanceToScore < 0.4) {
            // 40% chance for both teams to score
            homeGoalProbability *= 1.20;
            awayGoalProbability *= 1.20;
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
            this.log(`${seconds} Goal! ${matchStatistic.homeTeam} scored!`)
           return `Goal! ${matchStatistic.homeTeam} scored!`
        } else if (Math.random() < awayGoalProbability / 10) {
            matchStatistic.awayGoals++;
            this.log(`${seconds} Goal! ${matchStatistic.awayTeam} scored!`)
            return `Goal! ${matchStatistic.awayTeam} scored!`
        } else {
            return `${seconds} No action`
        }
    }


    simulateCornerKick(matchStatistic, homeTeamRating, awayTeamRating, seconds) {
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
            // Simulate the defending team's outcome
            let defendingChance = Math.random();
            if (defendingChance <= 0.5) {
                this.log(`${seconds} The goalkeeper catches the ball from the corner kick`);
            } else {
                this.log(`${seconds} One of the defenders clears the ball from the corner kick`);
            }
        }
    }

    simulateShotsOnTarget(matchStatistic, seconds) {
        let team = Math.floor(Math.random() * 2) === 0 ? matchStatistic.homeTeam : matchStatistic.awayTeam;

        // Increment the corresponding shots on target property in matchStatistic
        if (team === matchStatistic.homeTeam) {
            matchStatistic.homeShotsOnTarget++;
        } else {
            matchStatistic.awayShotsOnTarget++;
        }

        this.log(`${seconds} Shot on target ${team}`);

    }

    simulateThrowIn(matchStatistic, seconds) {
        const team = Math.floor(Math.random() * 2) === 0 ? matchStatistic.homeTeam : matchStatistic.awayTeam;

        if (team === matchStatistic.homeTeam) {
            matchStatistic.homeThrowIns++;
        } else {
            matchStatistic.awayThrowIns++;
        }

        this.log(`${seconds} Throw-in ${team}`);
    }

    simulateSubstitutions(matchStatistic, seconds) {
        const team = Math.floor(Math.random() * 2) === 0 ? matchStatistic.homeTeam : matchStatistic.awayTeam;

        if (team === matchStatistic.homeTeam) {
            matchStatistic.homeSubstitutions++;
        } else {
            matchStatistic.awaySubstitutions++;
        }

        this.log(`${seconds} Substitution ${team}`);
    }

    simulateShotsOnTargetAlternate(matchStatistic, seconds) {
        const team = Math.floor(Math.random() * 2) === 0 ? matchStatistic.homeTeam : matchStatistic.awayTeam;

        if (team === matchStatistic.homeTeam) {
            matchStatistic.homeShotsOnTarget++;
        } else {
            matchStatistic.awayShotsOnTarget++;
        }

        this.log(`${seconds} Alternate shot on target ${team}`);
    }

    simulateFoul(matchStatistic, homeTeamRating, awayTeamRating, seconds) {
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

        this.log(`${seconds} Foul committed by ${team}`);

        // Simulate the chance of getting a yellow or red card
        const chanceOfCard = Math.random();
        if (chanceOfCard <= aggression / 100) {
            const cardType = Math.random() < 0.9 ? 'yellow' : 'red';
            this.log(`${seconds} ${team} receives a ${cardType} card.`);

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
            this.log(`${seconds} No card given.`);
        }
    }

    log(message, seconds) {
        if (this.logCallback) {
            this.logCallback(message, seconds);
        }
    }

}

export const MatchSimulatorComponent = ({ homeTeam, awayTeam }) => {
    const [matchSimulator, setMatchSimulator] = useState(null);
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const logCallback = (message) => {
            setLogs((prevLogs) => [...prevLogs, message]);
        };
        setMatchSimulator(new MatchSimulator(homeTeam, awayTeam, logCallback));
    }, [homeTeam, awayTeam]);

    return (
        <div>
            {matchSimulator && (
                <>
                    <div>{matchSimulator.homeTeam.name} vs {matchSimulator.awayTeam.name}</div>
                    <div>{matchSimulator.matchStatistic.homeGoals} - {matchSimulator.matchStatistic.awayGoals}</div>
                    <h3>Logs:</h3>
                    <ul>
                        {logs.map((log, index) => (
                            <li key={index}>{log}</li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

// const matchSimulator = new MatchSimulator(homeTeam, awayTeam);
// console.log(matchSimulator.match)

// import React, { useState, useEffect } from 'react';

// export const Team = ({ name, players, isFavorite }) => {
//   return { name, players, isFavorite };
// };

// const Statistic = ({ homeTeam, awayTeam }) => {
//   const [homeGoals, setHomeGoals] = useState(0);
//   const [awayGoals, setAwayGoals] = useState(0);
//   const [homePossession, setHomePossession] = useState(50);
//   const [awayPossession, setAwayPossession] = useState(50);
//   const [homeShotsOnTarget, setHomeShotsOnTarget] = useState(0);
//   const [awayShotsOnTarget, setAwayShotsOnTarget] = useState(0);
//   const [homeFouls, setHomeFouls] = useState(0);
//   const [awayFouls, setAwayFouls] = useState(0);
//   const [homeYellowCards, setHomeYellowCards] = useState(0);
//   const [awayYellowCards, setAwayYellowCards] = useState(0);
//   const [homeRedCards, setHomeRedCards] = useState(0);
//   const [awayRedCards, setAwayRedCards] = useState(0);
//   const [homeSubstitutions, setHomeSubstitutions] = useState(0);
//   const [awaySubstitutions, setAwaySubstitutions] = useState(0);
//   const [homeCornerKicks, setHomeCornerKicks] = useState(0);
//   const [awayCornerKicks, setAwayCornerKicks] = useState(0);
//   const [homeThrowIns, setHomeThrowIns] = useState(0);
//   const [awayThrowIns, setAwayThrowIns] = useState(0);

//   return {
//     homeTeam,
//     awayTeam,
//     homeGoals,
//     awayGoals,
//     homePossession,
//     awayPossession,
//     homeShotsOnTarget,
//     awayShotsOnTarget,
//     homeFouls,
//     awayFouls,
//     homeYellowCards,
//     awayYellowCards,
//     homeRedCards,
//     awayRedCards,
//     homeSubstitutions,
//     awaySubstitutions,
//     homeCornerKicks,
//     awayCornerKicks,
//     homeThrowIns,
//     awayThrowIns,
//     setHomeGoals,
//     setAwayGoals,
//     setHomePossession,
//     setAwayPossession,
//     setHomeShotsOnTarget,
//     setAwayShotsOnTarget,
//     setHomeFouls,
//     setAwayFouls,
//     setHomeYellowCards,
//     setAwayYellowCards,
//     setHomeRedCards,
//     setAwayRedCards,
//     setHomeSubstitutions,
//     setAwaySubstitutions,
//     setHomeCornerKicks,
//     setAwayCornerKicks,
//     setHomeThrowIns,
//     setAwayThrowIns,
//   };
// };

// export const MatchSimulator = ({ homeTeam, awayTeam }) => {
//   const [matchStatistic, setMatchStatistic] = useState(null);
//   const [isMatchOver, setIsMatchOver] = useState(false);

//   const average = (attribute, players) => {
//     const sum = players.reduce((acc, player) => acc + player[attribute], 0);
//     return sum / players.length;
//   };

//   const calculateTeamRating = (team) => {
//     const aggressionRating = average('aggression', team.players);
//     const attackRating = average('attack', team.players);
//     const speedRating = average('speed', team.players);
//     const defenseRating = average('defense', team.players);
//     const paceRating = average('pace', team.players);

//     return {
//         aggression: aggressionRating,
//         attack: attackRating,
//         speed: speedRating,
//         defense: defenseRating,
//         pace: paceRating,
        
//         }
//     }
        
//         const simulateMatch = () => {
//         const homeTeamRating = calculateTeamRating(homeTeam);
//         const awayTeamRating = calculateTeamRating(awayTeam);
        
//         const homeGoals = Math.round(
//             homeTeamRating.attack * homeTeamRating.pace * (homeTeamRating.aggression / awayTeamRating.defense)
//           );
//           const awayGoals = Math.round(
//             awayTeamRating.attack * awayTeamRating.pace * (awayTeamRating.aggression / homeTeamRating.defense)
//           );
          
//           const homeShotsOnTarget = Math.round(homeGoals * 1.2);
//           const awayShotsOnTarget = Math.round(awayGoals * 1.2);
          
//           const homeFouls = Math.round(homeTeamRating.aggression * 3);
//           const awayFouls = Math.round(awayTeamRating.aggression * 3);
          
//           const homeYellowCards = Math.round(homeTeamRating.aggression * 0.4);
//           const awayYellowCards = Math.round(awayTeamRating.aggression * 0.4);
          
//           const homeRedCards = Math.round(homeTeamRating.aggression * 0.05);
//           const awayRedCards = Math.round(awayTeamRating.aggression * 0.05);
          
//           const homeSubstitutions = Math.round(homeTeam.players.length * 0.2);
//           const awaySubstitutions = Math.round(awayTeam.players.length * 0.2);
          
//           const homeCornerKicks = Math.round(homeTeamRating.attack * 0.8);
//           const awayCornerKicks = Math.round(awayTeamRating.attack * 0.8);
          
//           const homeThrowIns = Math.round(homeTeamRating.speed * 0.5);
//           const awayThrowIns = Math.round(awayTeamRating.speed * 0.5);
          
//           setMatchStatistic({
//             homeTeam,
//             awayTeam,
//             homeGoals,
//             awayGoals,
//             homePossession: Math.round(Math.random() * 100),
//             awayPossession: Math.round(Math.random() * 100),
//             homeShotsOnTarget,
//             awayShotsOnTarget,
//             homeFouls,
//             awayFouls,
//             homeYellowCards,
//             awayYellowCards,
//             homeRedCards,
//             awayRedCards,
//             homeSubstitutions,
//             awaySubstitutions,
//             homeCornerKicks,
//             awayCornerKicks,
//             homeThrowIns,
//             awayThrowIns,
//           });
//           setIsMatchOver(true);
//         }
// }

