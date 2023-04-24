export function fetchData(url, options) {
    return fetch(
        `https://api-football-v1.p.rapidapi.com/v3/players?league=39&season=2022&` +
            url,
        options
    )
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .catch((error) => {
            console.error(
                "There was a problem with the fetch operation:",
                error
            );
            throw error;
        });
}
