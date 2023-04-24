class TeamGenerator {
    async generateTeam() {
        const response = await fetch(
            "https://api-football-v1.p.rapidapi.com/v3/teams?league=39&season=2022",
            {
                headers: {
                    "x-rapidapi-key":
                        "9a511f7146mshe0fab5844669c1dp1c1c5fjsn55edffb40906",
                    "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                },
            }
        );

        const teams = (await response.json()).response;

        const players = [];

        for (let j = 0; j < 5; j++) {
            const team = teams[Math.floor(Math.random() * teams.length)];

            if (team && team.team && team.team.id) {
                const response = await fetch(
                    `https://api-football-v1.p.rapidapi.com/v3/players?team=${team.team.id}&league=39&season=2022`,
                    {
                        headers: {
                            "x-rapidapi-key":
                                "9a511f7146mshe0fab5844669c1dp1c1c5fjsn55edffb40906",
                            "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                        },
                    }
                );

                const playersResponse = await response.json();

                for (let i = 0; i < 21; i++) {
                    const randomPlayer =
                        playersResponse.response[
                            Math.floor(
                                Math.random() * playersResponse.response.length
                            )
                        ];

                    if (randomPlayer && randomPlayer.player) {
                        const player = {
                            player: {
                                id: randomPlayer.player.id,
                                name: randomPlayer.player.name,
                                firstname: randomPlayer.player.firstname,
                                lastname: randomPlayer.player.lastname,
                                age: randomPlayer.player.age,
                                birth: {
                                    date: randomPlayer.player.birth.date,
                                    place: randomPlayer.player.birth.place,
                                    country: randomPlayer.player.birth.country,
                                },
                                nationality: randomPlayer.player.nationality,
                                height: randomPlayer.player.height,
                                weight: randomPlayer.player.weight,
                                injured: randomPlayer.player.injured,
                                photo: randomPlayer.player.photo,
                            },
                            statistics: randomPlayer.statistics,
                            agression: Math.floor(Math.random() * 10) + 1,
                            pace: Math.floor(Math.random() * 10) + 1,
                            speed: Math.floor(Math.random() * 10) + 1,
                            defense: Math.floor(Math.random() * 10) + 1,
                            attack: Math.floor(Math.random() * 10) + 1,
                            jersey: "",
                        };

                        players.push(player);
                    }
                }
            }
        }

        const teamsArray = [];
        for (let i = 1; i <= 9; i++) {
            teams[i].team.players = players.slice(i * 11, (i + 1) * 11);
            teams[i].team.wins = 0;
            teams[i].team.loses = 0;
            teams[i].team.draws = 0;
            teams[i].team.scoredgoals = 0;
            teams[i].team.conceededgoals = 0;
            teams[i].team.points = 0;
            teamsArray.push(teams[i]);
        }
        return teamsArray;
    }
}

export const teamGenerator = new TeamGenerator();
