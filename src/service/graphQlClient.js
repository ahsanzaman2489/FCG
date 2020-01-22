import { GraphQLClient } from "graphql-request";
import appConfig from "../const/app";

export default () => {
  const headers = {};
  return new GraphQLClient(appConfig.graphQl_url, {
    headers
  });
};
