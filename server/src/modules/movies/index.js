const axios = require('axios');
const { Movies } = require('./entities/Movies');
const { API_KEY, API_BASE_URL } = require('../../config');

const getPopular = async (page, language) => {
  const result = await axios
    .get(`${API_BASE_URL}movie/popular?api_key=${API_KEY}&language=${language}&page=${page}`);

  return new Movies(result.data);
}

const getDetails = (ids, language) => {
  return ids
    .map(
      id => axios.get(`${API_BASE_URL}movie/${id}?api_key=${API_KEY}&language=${language}`)
    );
}

module.exports = {
  getPopular,
  getDetails
}
