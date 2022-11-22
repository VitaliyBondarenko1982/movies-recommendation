const getUri = () => {
  return process.env.NODE_ENV === 'development' ? 'http://localhost:4000/graphql' : `${window.location.origin}/graphql`;
}

export default getUri;