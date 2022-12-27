const getUri = () => {
  const isDev = process.env.NODE_ENV === 'development';

  return isDev
    ? 'http://localhost:4000/api/graphql'
    : `${window.location.origin}/api/graphql`;
};

export default getUri;
