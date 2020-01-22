import createGraphQLClient from "./graphQlClient";

export default (query, variables = {}) => {
  const client = createGraphQLClient();

  const serviceResponse = {
    error: null,
    response: null
  };

  return client
    .request(query, variables)
    .then(response => ({
      ...serviceResponse,
      response
    }))
    .catch(error => ({
      ...serviceResponse,
      error
    }));
};
