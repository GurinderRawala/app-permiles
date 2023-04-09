import { GraphQLClient } from 'graphql-request';
import { API_SERVICE_URL } from './base-url';

export const gqlClient = new GraphQLClient(`${API_SERVICE_URL}/graphql`);
