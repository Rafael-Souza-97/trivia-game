async function fetchQuestions(token) {
  const ENDPOINT = `https://opentdb.com/api.php?amount=5&token=${token}`;
  try {
    const response = await fetch(ENDPOINT);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export default fetchQuestions;
