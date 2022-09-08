// https://opentdb.com/api_token.php?command=request

async function fetchTrivia() {
    const ENDPOINT = 'https://opentdb.com/api_token.php?command=request';
    try {
        const response = await fetch(ENDPOINT);
        const data = await response.json();
        return data;
    } catch (error) {
        return error
    }
}

export default fetchTrivia;

// falta essa parte da API:
// https://opentdb.com/api.php?amount=${quantidade-de-perguntas-retornadas}&token=${seu-token-aqui}

// // Recomendação
// https://opentdb.com/api.php?amount=5&token=${seu-token-aqui}