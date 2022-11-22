const { getDetails, discoverMovie } = require('../modules/movies');
const { Movie } = require('../modules/movies/entities/Movie');
const { getList } = require('../modules/genres');

async function movies(parent, args, { locale }) {
  return await discoverMovie(args.filter, locale);
}

async function moviesByIds(parent, { ids }, { locale }) {
  const requests = getDetails(ids, locale);
  const data = await Promise.all(requests);

  return data.map(movie => new Movie(movie.data));
}

async function genres(_, {}, {locale}) {
  return await getList(locale)
}


module.exports = {
  movies,
  moviesByIds,
  genres,
}