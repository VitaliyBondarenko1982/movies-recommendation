const getUri = () => {
  return process.env.NODE_ENV === 'development' ? 'http://localhost:4000/api/graphql' : `${window.location.origin}/api/graphql`;
}

export default getUri;