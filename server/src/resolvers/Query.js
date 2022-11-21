const { getPopular, getDetails } = require('../modules/movies');
const { Movie } = require('../modules/movies/entities/Movie');

async function movies(parent, args, { locale }) {
  return await getPopular(args.page, locale);
}

async function moviesByIds(parent, { ids }, { locale }) {
  const requests = getDetails(ids, locale);
  const data = await Promise.all(requests);

  return data.map(movie => new Movie(movie.data));
}

module.exports = {
  movies,
  moviesByIds
}