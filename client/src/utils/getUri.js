const getUri = (mode) => {
  return mode === 'development' ? 'http://localhost:4000/graphql' : 'https://agile-mountain-16908.herokuapp.com/graphql';
}

export default getUri;